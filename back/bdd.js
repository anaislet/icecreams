const { Sequelize, QueryTypes } = require('sequelize')

// const sequelize = new Sequelize('icecream', 'postgres', 'postgres', { host: 'localhost', port: 5432, dialect: 'postgres' })
const sequelize = new Sequelize('icecreams', 'icecreams', 'berthillon', { host: 'localhost', port: 5432, dialect: 'postgres' })

async function getAllIcecreams() {
    const sql = 'SELECT * FROM flavors;'

    const icecreams = await sequelize.query(sql, {type: QueryTypes.SELECT})
    console.log(icecreams)
    return icecreams
}

module.exports = { getAllIcecreams }