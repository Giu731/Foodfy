const User = require('../models/User')
const {compare} = require('bcryptjs')

function checkAllFields(body){
    const keys = Object.keys(body)
    for(key of keys){
        if(body[key]=="" && key != "is_admin"){
            return {
                user: body,
                error: 'Por favor, preencha todos os campos'
            }
        }
    }
}

async function login(req, res, next){
    const {email, password} = req.body
    const user = await User.findOne({where: {email}})

    if(!user) return res.render('admin/session/login', {
        user: req.body,
        error: "Usuário não cadastrado.",
    })

    if(user.is_admin == true){
        req.session.is_admin = user.is_admin
    }
    const passed = await compare(password, user.password)
    if(!passed) return res.render('admin/session/login', {
        user: req.body,
        error: "Senha incorreta."
    })
    console.log(req.session.is_admin)
    req.user = user
    next()
}

async function reset(req, res, next){
    const {email, password, passwordRepeat, token} = req.body
    const user = await User.findOne({where: {email}})

    if(!user) return res.render('admin/session/password-reset',{
        user: req.body,
        token,
        error: "Usuário não cadastrado"
    })

    if(!password) return res.render('admin/session/password-reset', {
        user: req.body,
        token,
        error: "Por favor, digite a nova senha"
    })

    if(password != passwordRepeat) return res.render('admin/session/password-reset', {
        user: req.body,
        token,
        error: "A senha e sua repetição são diferentes"
    })

    if(token != user.reset_token ) return res.render('admin/session/password-reset', {
        user: req.body,
        token,
        error: "Token inválido! Solicite uma nova recuperação de senha."
    })

    let now = new Date()
    now = now.setHours(now.getHours())

    if( now > user.reset_token_expires ) return res.render('admin/session/password-reset', {
        user: req.body,
        token,
        error: "Token expirado. Por favor, solicite uma nova recuperação de senha."
    })

    req.user = user
    next()
}

async function update(req, res, next){
    const fillAllFields = checkAllFields(req.body)
    if(fillAllFields){
        return res.render('admin/profile/showProfile', fillAllFields)
    }

    console.log(req.body)
    const {id, password } = req.body
    if(!password) return res.render('admin/profile/showProfile', {
        user: req.body,
        error: "Coloque sua senha, para atualizar o cadastro"
    })
    
    const user = await User.findOne({where: {id}})
    console.log(user)

    const passed = await compare(password, user.password)
    if(!passed) return res.render('admin/profile/showProfile', {
        user: req.body,
        error: "Senha incorreta"
    })

    req.user = user
    next()
}

async function forgot(req, res, next){
    const {email} = req.body

    try{
        let user = await User.findOne({where: {email}})
        if(!user) return res.render('admin/session/forgot-password', {
            user: req.body,
            error: "Email não cadastrado."
        })

        req.user = user

        next()
    }catch(err){
        console.error(err)
    }
}



module.exports = {
    login,
    reset,
    update,
    forgot
}