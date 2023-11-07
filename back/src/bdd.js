const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize('icecreams', 'icecreams', 'berthillon', { host: 'db', port: 5432, dialect: 'postgres' })

const Flavors = sequelize.define('Flavors', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    },
    alcool: {
        type: DataTypes.BOOLEAN
    },
    kcal: {
        type: DataTypes.INTEGER
    },
    matgr: {
        type: DataTypes.FLOAT
    },
    protein: {
        type: DataTypes.INTEGER
    },
    glucide: {
        type: DataTypes.INTEGER
    },
    gluten: {
        type: DataTypes.BOOLEAN
    },
    icecream: {
        type: DataTypes.BOOLEAN
    },
    sorbet: {
        type: DataTypes.BOOLEAN
    },
    category: {
        type: DataTypes.STRING
    },
    color: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'flavors',
    timestamps: false
})

const Compositions = sequelize.define('Compositions', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    flavor1: {
        type: DataTypes.INTEGER
    },
    flavor2: {
        type: DataTypes.INTEGER
    },
    flavor3: {
        type: DataTypes.INTEGER
    },
    count: {
        type: DataTypes.INTEGER
    },
}, {
    tableName: 'compositions',
    timestamps: false
})

async function getAllIcecreams(type, gluten, alcool, category) {
    const where = {}
    if(type == "Icecream") {
        where.icecream = true
    }
    else if(type == "Sorbet") {
        where.sorbet = true
    }
    if(gluten == "true") {
        where.gluten = true
    }
    else if(gluten == "false") {
        where.gluten = false
    }
    if(alcool == "true") {
        where.alcool = true
    }
    else if(alcool == "false") {
        where.alcool = false
    }
    if(category != "All" && category != undefined) {
        where.category = category
    }
    const icecreams = await Flavors.findAll({where: where})
    return icecreams
}

async function postIcecream(flavor1, flavor2, flavor3) {
    const flavors = [flavor1, flavor2, flavor3].map(f => parseInt(f))
    const sortedFlavors = flavors.sort()

    const icecreamsSearch = await Compositions.findAll({where: {
        flavor1: sortedFlavors[0],
        flavor2: sortedFlavors[1],
        flavor3: sortedFlavors[2],
    }})

    if(icecreamsSearch.length == 0) {
        const icecreams = await Compositions.create({
            flavor1: sortedFlavors[0],
            flavor2: sortedFlavors[1],
            flavor3: sortedFlavors[2],
            count: 1
        })
        return {'count': 1}
    }
    else {
        const icecreams = await Compositions.update({
            count: icecreamsSearch[0].count + 1
        },{
            where: {
                id: icecreamsSearch[0].id
            }
        })
        return {'count': icecreamsSearch[0].count + 1}
    }
}

async function getAllCategories() {
    const categories = await Flavors.findAll({attributes: ['category'], group: 'category'})
    return categories
}

module.exports = { getAllIcecreams, postIcecream, getAllCategories }