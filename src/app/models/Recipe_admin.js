const {date } = require("../../lib/utils")
const db = require("../../config/db")

module.exports = {
    all(callback){
        db.query(`
        SELECT recipes.*, chefs.name AS chef_name
        FROM recipes
        LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
        ORDER BY recipes.created_at DESC
        `, function(err, results){
            if( err ) throw `Database Error! ${err}`

            callback(results.rows)
        })
    },
    async create(data, userId){
        const query = `
        INSERT INTO recipes(
            chef_id,
            title,
            ingredients,
            preparation,
            information,
            created_at,
            updated_at,
            user_id
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING id
        `
        const values = [
            data.chef,
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            date(Date.now()).iso,
            date(Date.now()).iso,
            userId
        ]

       return db.query(query, values)
    },
    find(id, callback){
        db.query(`
        SELECT recipes.*, chefs.name AS chef_name 
        FROM recipes 
        LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
        WHERE recipes.id = $1`, [id], function(err, results){
            if(err) throw `DataBase Erros! ${err}`

            callback(results.rows[0])
        })
    },
    update(data, callback){
        const query = `
        UPDATE recipes SET
        chef_id = ($1),
        title = ($2),
        ingredients = ($3),
        preparation = ($4),
        information = ($5),
        updated_at = ($6)
        WHERE id = $7
        `
        const values = [
            data.chef,
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            date(Date.now()).iso,
            data.id
        ]

        db.query(query, values, function(err, results){
            if (err) throw `Database Erros! ${err}`

            callback()
        })
    },
    async delete(id, callback){
        db.query(`DELETE FROM recipes WHERE id = $1`, [id], function(err, results){
            if (err) throw `Database Error! ${err}`

            return callback()
        })
    },
    async chefsSelectOptions(){
        return db.query(`SELECT name, id FROM chefs`)
    }
}