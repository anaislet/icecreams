const { Sequelize, QueryTypes } = require('sequelize')

// const sequelize = new Sequelize('icecream', 'postgres', 'postgres', { host: 'localhost', port: 5432, dialect: 'postgres' })
const sequelize = new Sequelize('icecreams', 'icecreams', 'berthillon', { host: 'localhost', port: 5432, dialect: 'postgres' })

async function getAllIcecreams(type, gluten, alcool) {
    let typeQuery = ""
    let glutenQuery = ""
    let alcoolQuery  = ""
    if(type == "Icecream") {
        typeQuery = " AND icecream = true"
    }
    else if (type == "Sorbet") {
        typeQuery = " AND sorbet = true"
    }
    if(gluten == "true") {
        glutenQuery = " AND gluten = true"
    }
    else if (gluten == "false") {
        glutenQuery = " AND gluten = false"
    }
    if(alcool == "true") {
        alcoolQuery = " AND alcool = true"
    }
    else if (alcool == "false") {
        alcoolQuery = " AND alcool = false"
    }
    const sql = `SELECT * FROM flavors WHERE 1=1${typeQuery}${glutenQuery}${alcoolQuery};`

    const icecreams = await sequelize.query(sql, {type: QueryTypes.SELECT})
    return icecreams
}

async function postIcecream(flavor1, flavor2, flavor3) {
    const flavors = [flavor1, flavor2, flavor3].map(f => parseInt(f))
    const sortedFlavors = flavors.sort()

    const sql1 = `SELECT * FROM compositions WHERE flavor1 = ${sortedFlavors[0]} AND flavor2 = ${sortedFlavors[1]} AND flavor3 = ${sortedFlavors[2]}`
    const icecreamsSearch = await sequelize.query(sql1, {type: QueryTypes.SELECT})

    if(icecreamsSearch.length == 0) {
        const sql2 = `INSERT INTO compositions VALUES (DEFAULT, ${sortedFlavors[0]}, ${sortedFlavors[1]}, ${sortedFlavors[2]}, 1);`
        const icecreams = await sequelize.query(sql2, {type: QueryTypes.INSERT})
        return {'count': 1}
    }
    else {
        const sql3 = `UPDATE compositions SET count = ${icecreamsSearch[0].count + 1}`
        const icecreams = await sequelize.query(sql3, {type: QueryTypes.UPDATE})
        return {'count': icecreamsSearch[0].count + 1}
    }
}

module.exports = { getAllIcecreams, postIcecream }