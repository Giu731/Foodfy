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

async function post(req, res, next){
    const fillAllFields = checkAllFields(req.body)
    if(fillAllFields){
        return res.render('admin/user/register', fillAllFields)
    }

    let{ email } = req.body
    const user = await User.findOne({
        where: {email}
    })
    if(user) return res.render('admin/user/register', {
        user:req.body,
        error: 'Email já cadastrado'
    })

    next()

}

async function show(req, res, next){
    const {userId: id} = req.session
    const user = await User.findOne({where: {id}})

    if(!user) return res.render('admin/user/register', {
        error: "Usuário não encontrado"
    })

    req.user = user
    next()
}

async function update(req, res, next){
    const fillAllFields = checkAllFields(req.body)
    if(fillAllFields){
        return res.render('admin/user/edit', fillAllFields)
    }
    const id = req.body.id
    const user = await User.findOne({where: {id}})

    req.userEdited = user
    console.log(user)
    next()
}

module.exports = {
    post,
    show, 
    update
}