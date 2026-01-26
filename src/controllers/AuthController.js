import User from '../models/User.js'
import { validateName, validatePassword } from '../helpers/validation.js';
import { formatName } from '../helpers/formatting.js';

import bcrypt from 'bcrypt';

import { login, register } from '../services/AuthService.js'

export const loginPage = (req, res) => {
    res.render('auth/login')
}

export const loginPost = async (req, res) => {

    try {
        await login(req, res);

    } catch (error) {
        console.log(`Erro ao fazer o login: ${error}`)
        req.flash('message', 'Erro ao fazer o login')
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