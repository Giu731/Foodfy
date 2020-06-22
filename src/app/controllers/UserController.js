const User = require('../models/User')
const crypto = require('crypto')
const mailer = require('../../lib/mailer')

module.exports = {
    registerForm(req, res){
        return res.render("admin/user/register")
    },
    create(req, res){
        return res.render('admin/user/create')
    },
    async post(req, res){
        const token = crypto.randomBytes(20).toString("hex")
        let now = new Date()
        now = now.setHours(now.getHours()+1)

        const userId = await User.create(req.body, token, now)
        req.session.userId = userId

        const user = req.body
        

        await mailer.sendMail({
            to: user.email,
            from: 'noreply@foodfy.com.br',
            subject: 'Foodfy - Validando sua conta',
            html: `<h2>Bem-vindo(a) à família Foodfy</h2>
            <p>Vimos que você início o cadastro de sua conta.
            Sua senha atual é ${token}. Para continuar o processo, clique no link abaixo</p>
            <p>
                <a href = "http:/localhost:3000/admin/users/password-reset?token=${token}" taget="_blank">
                Validar conta</a>
            </p>
            `
        })
        return res.render('admin/user/register', {
            success: "Verifique seu e-mail para continuar seu cadastro"
        })
    },
    async list(req, res){
        console.log(req.session.userId)
        const users = await User.all()
        return res.render('admin/user/indexList.njk', {users})
    },
    async edit(req, res){
        const id = req.params.id
        const user = await User.findOne({where: {id}})
        return res.render('admin/user/edit', {user})
    },
    async put(req, res){
        const user = req.userEdited
        try{
            let {name, email, is_admin } = req.body

            await User.update(user.id, {
                name, 
                email,
                is_admin
            })
            return res.render ('admin/user/edit', {
                user: req.body,
                success: "Conta atualizada com sucesso"
            })
        }catch(err){
            console.error(err)
            return res.render('admin/user/edit', {
                user: req.body,
                error: "Algum erro aconteceu"
            })
        }
    },
    async delete(req, res){
        try{
            await User.delete(req.body.id)

            return res.redirect('/admin/users/')
        }catch(err){
            console.error(err)
            return res.render('admin/user/indexList', {
                user: req.body,
                error: "Erro ao deletar a conta."
            })
        }
    }
}