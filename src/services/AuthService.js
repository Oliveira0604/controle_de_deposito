import User from '../models/User.js'
import { validateName, validatePassword } from '../helpers/validation.js';
import { formatName } from '../helpers/formatting.js';

import bcrypt from 'bcrypt';

export const login = async (req, res) => {
    const { email, password } = req.body;

    // faz a busca no banco para verificar se o usuário existe
    const user = await User.findOne({ where: { email: email } })

    // se não exister, renderiza a página de login novamente
    if (!user) {
        req.flash('message', 'Usuario não encotrado')
        return res.render('auth/login')
    }

    // verifica se a senha salva no banco e a senha informada são iguais
    const passwordMatch = await bcrypt.compare(password, user.password);

    // se não forem, da a mensagem e renderiza a página de login
    if (!passwordMatch) {
        req.flash('message', 'Email ou senha incorretos')
        return res.render('auth/login')
    }

    // a session em userid recebe o id so usuário e o servidor inicia a sessão criando um id de sessão único.
    req.session.userid = user.id;
    req.session.save(() => {
        res.redirect('/products/dashboard')
    })

}

export const register = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

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
    const formattedEmail = email.trim().toLowerCase();

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

    await User.create(user)
    req.flash('message', 'Conta criada com sucesso!')
    res.render('auth/login')

}