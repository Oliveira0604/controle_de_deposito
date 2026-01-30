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
        await register(req)
        req.flash('message', 'Conta criada com sucesso!')
        return res.render('auth/login')
    } catch (error) {
        console.log(error)
        req.flash('message', error.message)
        return res.render('auth/register')
    }

}

export const logOut = (req, res) => {
    req.session.destroy()
    res.redirect('/auth/login')
}