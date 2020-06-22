const User = require('../models/User')
const Recipe_admin = require('../models/Recipe_admin')
const user = require('../validators/user')

function OnlyLoggedInUser(req, res, next){
    if(!req.session.userId)
        return res.redirect('/admin/users/login')

    next()
}

async function OnlyAdmin(req, res, next){
    if(req.session.userId){
        const id = req.session.userId
        const user = await User.findOne({where: {id}})

        if(user.is_admin==false){
            return res.redirect('/admin/users/')
        }else{
            next()
        }
    }else{
        return res.redirect('/admin/users/login')
    }

    next()
}

async function OwnerUserRecipe(req, res, next){
    const recipeId = req.params.id
    console.log(recipeId)
    Recipe_admin.find(recipeId, function(recipe){
        if(!req.session.userId){
            return res.redirect('/admin/users/login')
        }else if( req.session.is_admin == true){
            next()
        }else if(req.session.userId != recipe.user_id){
            return res.redirect('/admin/recipes')
        }else{
            next()
        }

    })
}

async function OwnerUser(req, res, next){
    const userEditId = req.params.id
    const id = req.session.userId
    const userLogged = await User.findOne({where :{id}})
    if( userLogged.is_admin == true || userEditId == id ){
        next()
    }else{
        return res.redirect('/admin/users/')
    }
}

async function DoNotDeleteAdmin(req, res, next){
    const userDeleteId = req.body.id
    console.log(userDeleteId)
    const id = req.session.userId
    const userLogged = await User.findOne({where :{id}})
    if( userLogged.is_admin == true && userDeleteId != id ){
        next()
    }else{
        return res.redirect('/admin/users/')
    }
}

module.exports = {
    OnlyLoggedInUser,
    OnlyAdmin,
    OwnerUserRecipe,
    OwnerUser,
    DoNotDeleteAdmin
}