const User = require('../models/User')

module.exports = {
    async index(req, res){
        const{user} = req
        console.log(user)
        return res.render("admin/profile/showProfile", { user })
    },
    async put(req, res){
        const {user} = req
        try{
            let {name, email } = req.body

            await User.update(user.id, {
                name, 
                email
            })
            return res.render ('admin/profile/showProfile', {
                user: req.body,
                success: "Conta atualizada com sucesso"
            })
        }catch(err){
            console.error(err)
            return res.render('admin/profile/showProfile', {
                user: req.body,
                error: "Algum erro aconteceu"
            })
        }
    }
}