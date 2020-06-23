const Chef_admin = require("../models/Chef_admin")
const File = require("../models/File")

module.exports = {
    index(req, res){
        Chef_admin.all(async function(chefs){
            let chefResults = []
            for(chef of chefs){
                const resultsShowFile = await File.showFiles(chef.file_id)

                let files = resultsShowFile.rows
                files = files.map(file => ({
                    ...file,
                    src: `${req.protocol}://${req.headers.host}${file.path.replace("public","")}`
                }))

                const chefFinal = {
                    ...chef,
                    avatar: files[0].src,
                    avatarUrl: files[0].path,
                }
        
                chefResults.push(chefFinal)
            }
            return res.render ("admin/chefs/index", { chefResults})
        })
    },
    create(req, res){
        return res.render('admin/chefs/create.njk')
    },
    async post(req, res){
        const keys = Object.keys(req.body)
        for(key of keys){
            if(req.body[key]==""){
                return res.send("Por favor, preencha todos os campos.")
            }
        }
        
        console.log(req.files)
        if(req.files.length == 0){
            return res.send ("Por favor, selecione ao menos um arquivo")
        }

        const filesPromise = req.files.map(file => File.create({...file}))
        const resultsFile = await (await Promise.all(filesPromise)).map(file => file.rows[0].id)
        const fileId = resultsFile[0]

        console.error

        const chefResults = await Chef_admin.create(req.body, fileId)
        const chef = chefResults.rows[0]

        return res.redirect(`/admin/chefs/${chef.id}`)

    },
    show(req, res){
        Chef_admin.find(req.params.id, async function(chef){
            if(!chef) return res.send("Chef not found")

            const resultsFileChef = await File.showFiles(chef.file_id)
            let files = resultsFileChef.rows
            files = files.map(file => ({
                ...file,
                src: `${req.protocol}://${req.headers.host}${file.path.replace("public","")}`
            }))
            console.log(files[0].src)
            chef = {
                ...chef,
                avatar: files[0].src,
                avatarUrl: files[0].path,
                avatarId: files[0].id
                
            }
            console.log(chef)

            Chef_admin.showRecipes(req.params.id, async function(recipes){
                let recipeResults = []
                for(recipe of recipes){
                    const resultsFile = await File.takeFiles(recipe.id)
                    const fileId = resultsFile.rows[0].file_id

                    const resultsShowFile = await File.showFiles(fileId)

                    let files = resultsShowFile.rows
                    files = files.map(file => ({
                        ...file,
                        src: `${req.protocol}://${req.headers.host}${file.path.replace("public","")}`
                    }))

                    const recipeFinal = {
                        ...recipe,
                        image: files
                    }
            
                    recipeResults.push(recipeFinal)
                }
                chef = {
                    ...chef,
                    total_recipes: recipeResults.length
                }
                return res.render("admin/chefs/show", {chef, recipes: recipeResults})

            })
            

        })
    },
    edit(req, res){
        Chef_admin.find(req.params.id, async function(chef){
            if(!chef) return res.send("Chef not found")

            const resultsFileChef = await File.showFiles(chef.file_id)
            let files = resultsFileChef.rows
            files = files.map(file => ({
                ...file,
                src: `http://localhost:3000${file.path.replace("public","")}`
            }))

            return res.render("admin/chefs/edit", {chef, files})
        })
    },
    async put(req, res){
        
        const keys = Object.keys(req.body)
        for(key of keys){
            if(req.body[key]=="" && key != "removed_files"){
                return res.send("Por favor, preencha todos os campos.")
            }
        }       
        if(req.files.length !=0 ){
            const newFilesPromise = req.files.map(file => File.create({...file}))
            const resultsFile = await (await Promise.all(newFilesPromise)).map(file => file.rows[0].id)
            newFileId = resultsFile[0]
            req.body.file_id = newFileId
            
            await Chef_admin.update(req.body)
            
            
        }

        if(req.body.removed_files){
            console.log("passei por aqui")
            const removedFiles = req.body.removed_files.split(",")
            const lastIndex = removedFiles.length - 1

            removedFiles.splice(lastIndex, 1)
            const removedFilesPromise = removedFiles.map(id => File.deleteFromFiles(id))

            await Promise.all(removedFilesPromise)
        }
            
        return res.redirect(`/admin/chefs/${req.body.id}`)
        
        
    },
    delete(req, res){
        //check for recipes
        Chef_admin.showRecipes(req.body.id, function(recipes){
            if(recipes.length != 0 ) return res.render('admin/chefs/edit',{
                chef: req.body,
                error: "Não é possível deletar chefs com receitas. Seus dados não foram alterados."
            })

            Chef_admin.delete(req.body.id, function(){
                return res.redirect("/admin/chefs")
            })

        })
    }
    
}
