const express = require('express')
const routes = express.Router()
const multer = require('../app/middlewares/multer')

const users = require('./users')
const recipes = require('../app/controllers/recipes_admin')
const chefs = require('../app/controllers/chefs_admin')

const ProfileController = require('../app/controllers/ProfileController')
const UserValidator = require('../app/validators/user')
const SessionValidator = require('../app/validators/session')
const {OnlyLoggedInUser, OnlyAdmin, OwnerUserRecipe} = require('../app/middlewares/session')

routes.use("/users", users)

routes.get("/recipes", OnlyLoggedInUser, recipes.index)
routes.get("/recipes/create", recipes.create)
routes.get("/recipes/:id", recipes.show)
routes.get("/recipes/:id/edit", OwnerUserRecipe, recipes.edit)

routes.get("/chefs", OnlyLoggedInUser, chefs.index)
routes.get("/chefs/create", OnlyAdmin, chefs.create)
routes.get("/chefs/:id", chefs.show)
routes.get("/chefs/:id/edit", chefs.edit)

routes.post("/recipes", multer.array("photos", 5), recipes.post)
routes.put("/recipes", multer.array("photos", 5), recipes.put)
routes.delete("/recipes", OwnerUserRecipe, recipes.delete)

routes.post("/chefs", multer.array("avatar", 1), chefs.post)
routes.put("/chefs", multer.array("avatar", 1), chefs.put)
routes.delete("/chefs", chefs.delete)

// Rotas de perfil de um usuário logado
routes.get('/profile', OnlyLoggedInUser, UserValidator.show, ProfileController.index) // Mostrar o formulário com dados do usuário logado
routes.put('/profile', OnlyLoggedInUser, SessionValidator.update, ProfileController.put)// Editar o usuário logado

module.exports = routes