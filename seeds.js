const { hash } = require('bcryptjs')
const faker = require('faker')

const User = require('./src/app/models/User')
const Chefs = require('./src/app/models/Chef_admin')
const Recipe = require('./src/app/models/Recipe_admin')
const File = require('./src/app/models/File')

let usersIds = []
let chefsIds = []
let filesIds = []
const totalUsers = 5
const totalFiles = 20
const totalChefs = 5
const totalRecipes = 5

async function createUsers(){
    const users = []
    const password = await hash('1234', 8) //senha pré-determinada para os cinco primeiros users
    
    while(users.length < totalUsers){
        users.push({
            name: faker.name.firstName(),
            email: faker.internet.email(),
            password,
            is_admin: faker.random.boolean()
        })
    }

    const usersPromise = users.map(user => User.create(user, password, ""))
    usersIds = await Promise.all(usersPromise)
}

async function createChefs(){
    let files = []    

    while(files.length < totalFiles){
        files.push({
            name: faker.image.image(),
            path: `public/images/placeholder.png`
        })
    }

    const filesPromise = files.map(file => File.create({filename:file.name, path:file.path}))
    filesIds = await (await Promise.all(filesPromise)).map(file => file.rows[0].id)
    

    let chefs = []

    while(chefs.length < totalChefs){
        chefs.push({
            name: faker.name.firstName(),
            file_id: filesIds[Math.floor(Math.random() * totalFiles)]
        })
    }

    const chefsPromise = chefs.map(chef => Chefs.create(chef, chef.file_id))
    chefsIds = await (await Promise.all(chefsPromise)).map(chef => chef.rows[0].id)

}

async function createRecipe(){
    let recipes = []

    while(recipes.length < totalRecipes){
        recipes.push({
            chef: chefsIds[Math.floor(Math.random() * totalChefs)],
            title: faker.name.title(),
            ingredients:  [faker.random.arrayElement(faker.lorem.sentences(3))],
            preparation: [faker.random.arrayElement(faker.lorem.sentences(3))],
            information: faker.lorem.sentences(Math.floor(Math.random() * 3)),
            user_id: usersIds[Math.floor(Math.random() * totalUsers)]
        })
    }

    const recipesPromise = recipes.map(recipe => Recipe.create(recipe, recipe.user_id))
    recipesIds =  await (await Promise.all(recipesPromise)).map(recipe => recipe.rows[0].id)


    let recipes_files = []

    while(recipes_files.length < 20){
        recipes_files.push({
            recipe_id: recipesIds[Math.floor(Math.random() * totalRecipes)],
            file_id: filesIds[Math.floor(Math.random() * totalFiles)]
        })
    }

    const recipes_filesPromise = recipes_files.map(recipe_file => 
        File.linkToRecipeFile(recipe_file.file_id, recipe_file.recipe_id))
    await Promise.all(recipes_filesPromise)
}

async function init(){
    await createUsers(),
    await createChefs(),
    await createRecipe()
}

init()