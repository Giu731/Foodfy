const db = require('../../config/db')
const fs = require('fs')
const Recipe = require('../models/Recipe_admin')
const File = require('../models/File')
const { FileSystemLoader } = require('nunjucks')

module.exports = {
    async all(){
        const results = await db.query(`SELECT * FROM users
        ORDER BY name`)
        return results.rows
    },
    async findOne(filters){
        let query = "SELECT * FROM users"

        Object.keys(filters).map(key => {
            query = `${query}
            ${key}
            `
            Object.keys(filters[key]).map(field => {
                query = `${query} ${field} = '${filters[key][field]}'`
            })
        })
        
        const results = await db.query(query)
        return results.rows[0]
        
    },
    async create(data, token, expiration){
        const query = `
        INSERT INTO users (
            name, 
            email,
            password,
            reset_token,
            reset_token_expires,
            is_admin
        ) VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id
        `
        const values = [
            data.name,
            data.email,
            token,
            token,
            expiration,
            data.is_admin
        ]

        const results = await db.query(query, values)
        return results.rows[0].id
    },
    async update(id, fields){
        let query = "UPDATE users SET"

        Object.keys(fields).map((key, index, array) => {
            if((index + 1) < array.length ){
                query = `${query}
                ${key} = '${fields[key]}',
                `
            }else{
                query = `${query}
                ${key} = '${fields[key]}'
                WHERE id = ${id}
                `
            }
        })

        await db.query(query)
        return
    },
    async delete(id){
        let results = await db.query("SELECT * FROM recipes WHERE user_id = $1", [id])
        const recipes = results.rows

        const resultsFile = recipes.map(recipe => File.takeFiles(recipe.id))
        let promiseResults = await Promise.all(resultsFile)
        console.log(promiseResults)

        await db.query('DELETE FROM users WHERE id = $1', [id])
        promiseResults.map( results => {
            results.rows.map( file => {
                console.log(file),
                File.deleteFromRecipeFiles(file.file_id),
                File.deleteFromFiles(file.file_id)
            })
        })
        
    }
}