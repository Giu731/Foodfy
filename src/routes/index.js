const express = require('express')
const routes = express.Router()
const admin = require('./admin')
const foodfy = require('../app/controllers/foodfy')


routes.get("/", foodfy.home)
routes.get("/sobre", foodfy.sobre)
routes.get("/receitas", foodfy.receitas)
routes.get("/search", foodfy.search)
routes.get("/receitas/:id", foodfy.show)
routes.get("/chefs", foodfy.showChefs)

routes.use('/admin', admin)



module.exports = routes