import { login, register } from '../services/AuthService.js'

export const loginPage = (req, res) => {
    res.render('auth/login')
}

export const loginPost = async (req, res) => {

    try {
        const user = await login(req);
        // a session em userid recebe o id so usuário e o servidor inicia a sessão criando um id de sessão único.
        req.session.userid = user.id
        req.session.save(() => {
            res.redirect('/products/dashboard')
        })
    } catch (error) {
        console.log(`Erro ao fazer o login: ${error}`)

        req.flash('message', error.message)
        return res.render('auth/login');
    }
}

export const registerPage = (req, res) => {
    res.render('auth/register')
}

export const registerSave = async (req, res) => {
    try {
        await register(req, res)
    } catch (error) {
        console.log(error)
        req.flash('message', 'Erro ao criar a conta')
        return res.render('auth/register')
    }

}