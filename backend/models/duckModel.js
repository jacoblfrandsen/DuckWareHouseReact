const mongoose = require('mongoose')

const DuckSchema = mongoose.Schema({
    color: {
        require: true,
        type: String
    },
    size: {
        require: true,
        type: String
    },
    price: {
        require: true,
        type: Number
    },
    quantity: {
        require: true,
        type: Number
    },
    deleted: {
        require: true,
        type: Boolean
    }
})

const Duck = mongoose.model('Duck', DuckSchema)

module.exports = Duck