import User from '../models/User.js'

import bcrypt from 'bcrypt';

export const loginPage = (req, res) => {
    res.render('auth/login')
}

export const registerPage = (req, res) => {
    res.render('auth/register')
}

export const registerSave = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body

    // tirando os espaços do inicio e final
    const trimmedName = name ? name.trim() : '';

    // verificando se o nome é vázio
    if (trimmedName === '') {
        req.flash('message', 'O nome é obrigatório')
        return res.render('auth/register')
    }

    // verifica se o nome tem menos de 3 letras
    if (trimmedName.length < 3) {
        req.flash('message', 'O nome precisa ter 3 letras ou mais')
        res.render('auth/register')
    }

    // verifica se o nome tem símbolos ou números
    if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(trimmedName)) {
        req.flash('message', 'O nome não deve conter números ou símbolos.');
        return res.render('auth/register');
    }

    // Faz a formatação do nome para sempre ter a primeira letra maiúscula
    const finalName = trimmedName.split(' ').map(name =>
        name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
    ).join(' ');

    // faz a busca de um email parecido no banco

    const checkEmail = await User.findOne({ where: { email: email } });


    // verifica se existr algum usuário com o mesmo email
    if (checkEmail) {
        req.flash('message', 'Esse email já esta cadastrado')
        return res.render('auth/register')
    }

    // verifica se as senhas são iguais
    if (password != confirmPassword) {
        req.flash('message', 'As senhas não conhecidem')
        return res.render('auth/register')
    }

    // criando os padrões Regex para verificar letras maiúsculas, minúsculas e caracteres especiais e se tem 8 ou mais caracteres
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasSymbols = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isLengthValid = password.length >= 8;

    // verifica se atende a todas as condições
    if (!hasUpperCase || !hasLowerCase || !hasSymbols || !isLengthValid) {
        req.flash('message', 'A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas e símbolos.')
        res.render('auth/register')
    }

    // prepara o algoritmo do hash
    const salt = await bcrypt.genSalt(10);

    // criptografa a senha
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = {
        name: finalName,
        email: email,
        password: hashedPassword
    }

    try {
        await User.create(user)
        req.flash('message', 'Conta criada com sucesso!')
        res.render('auth/login')

    } catch (error) {
        console.log(error)
    }

}