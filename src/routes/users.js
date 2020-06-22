const express = require('express')
const routes = express.Router()

const SessionController = require('../app/controllers/SessionController')
const UserController = require('../app/controllers/UserController')
const UserValidator = require('../app/validators/user')
const SessionValidator = require('../app/validators/session')

const {OnlyLoggedInUser, OnlyAdmin, OwnerUser, DoNotDeleteAdmin} = require('../app/middlewares/session')


// login/logout
routes.get('/login', SessionController.loginForm)
routes.post('/login', SessionValidator.login, SessionController.login)
routes.post('/logout', SessionController.logout)

// reset password/forgot
routes.get('/forgot-password', SessionController.forgotForm)
routes.get('/password-reset', SessionController.resetForm)
routes.post('/forgot-password', SessionValidator.forgot, SessionController.forgot)
routes.post('/password-reset', SessionValidator.reset, SessionController.reset)

// user register
routes.get('/register', UserController.registerForm)
routes.post('/register', UserValidator.post, UserController.post)

// Rotas que o administrador irá acessar para gerenciar usuários
routes.get('/', OnlyLoggedInUser, UserController.list) //Mostrar a lista de usuários cadastrados
routes.get('/:id', OwnerUser, UserController.edit) 

routes.get('/create', OnlyAdmin, UserController.create) // Redirecionamento do botão NOVO

routes.post('/', UserController.post) //Cadastrar um usuário
routes.put('/', UserValidator.update, UserController.put) // Editar um usuário
routes.delete('/', DoNotDeleteAdmin, UserController.delete) // Deletar um usuário



module.exports = routes