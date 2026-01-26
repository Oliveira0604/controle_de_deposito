import User from '../models/User.js'
import { validateName, validatePassword } from '../helpers/validation.js';
import { formatName } from '../helpers/formatting.js';

import bcrypt from 'bcrypt';

export const loginPage = (req, res) => {
    res.render('auth/login')
}

export const registerPage = (req, res) => {
    res.render('auth/register')
}

export const registerSave = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body

    // uso do helper de validateName
    const nameError = validateName(name);

    // formata o nome para o padrão esperado
    const formattedName = formatName(name)

    // se alguma das condições não forem atentida da a flash message e renderiza a mesma página
    if (nameError) {
        req.flash('message', nameError);
        return res.render('auth/register')
    }

    // formata o email 
    const formattedEmail = email.trim().toLowerCase()

    // faz a busca de um email parecido no banco
    const emailExists = await User.findOne({ where: { email: formattedEmail } });


    // verifica se existr algum usuário com o mesmo email
    if (emailExists) {
        req.flash('message', 'Esse email já esta cadastrado')
        return res.render('auth/register')
    }

    // verifica se a senha atende ao padrão
    const passwordError = validatePassword(password, confirmPassword);

    if (passwordError) {
        req.flash('message', passwordError);
        return res.render('auth/register')
    }

    // prepara o algoritmo do hash
    const salt = await bcrypt.genSalt(10);

    // criptografa a senha
    const hashedPassword = await bcrypt.hash(password, salt)

    console.log(formattedName)

    const user = {
        name: formattedName,
        email: formattedEmail,
        password: hashedPassword
    }

    try {
        await User.create(user)
        req.flash('message', 'Conta criada com sucesso!')
        res.render('auth/login')

    } catch (error) {
        console.log(error)
        req.flash('message', 'Erro ao criar a conta')
        return res.render('auth/register')
    }

}