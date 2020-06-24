const { hash } = require('bcryptjs')
const crypto = require('crypto')
const mailer = require('../../lib/mailer')
const User = require('../models/User')


module.exports = {
    login(req, res){
        req.session.userId = req.user.id
        console.log(req.session.userId)
        req.session.is_admin = req.user.is_admin
        return res.redirect("/admin/profile")
    },
    loginForm(req, res){
        return res.render("admin/session/login")
    },
    logout(req, res){
        req.session.destroy()
        return res.redirect("/admin/users/login")
    },
    resetForm(req, res){
        console.log(req.query.token)
        return res.render('admin/session/password-reset', {token: req.query.token})
    },
    async reset(req, res){
        const user = req.user
        const {password, token } = req.body
        try{
            const newPassword = await hash(password, 8)

            await User.update(user.id, {
                password: newPassword,
                reset_token: " ",
                reset_token_expires: " "
            })

            return res.render('admin/session/login', {
                user: req.body,
                success: "Senha atualizada com sucesso."
            })
        }catch(err){
            console.error(err)
            return res.render('admin/session/password-reset', {
                user: req.body,
                token,
                error: "Erro inesperado, tente novamente"
            })
        }
    },
    forgotForm(req, res){
        return res.render("admin/session/forgot-password.njk")
    },
    async forgot(req, res){
        try{
            const user = req.user
            const token = crypto.randomBytes(20).toString("hex")

            let now = new Date()
            now = now.setHours(now.getHours() + 1)

            await User.update(user.id, {
                reset_token: token,
                reset_token_expires: now
            })

            await mailer.sendMail({
                to: user.email,
                from: 'noreply@foodfy.com.br',
                subject: "Recuperação de senha",
                html: `<h2>Esqueceu a senha?</h2>
                <p>Clique no link abaixo para criar uma nova senha</p>
                <p>
                    <a href="http://localhost:3000/admin/users/password-reset?token=${token}" target="_blank">
                    Recuperar senha
                    </a>
                </p>
                `
            })

            return res.render('admin/session/forgot-password', {
                success: "Verifique seu email para continuar o processo."
            })
        }catch(err){
            return res.render('admin/session/forgot-password', {
                user: req.body,
                error: `Algo deu errado, tente novamente. ${err}`
            })
        }
    }
}