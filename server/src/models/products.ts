import Mongoose from 'mongoose'

const { Schema } = Mongoose;

const ProductSchema = new Schema({
    name: {
        type: String
    },
    slug: {
        type: String
    },
    category: {
        type: String
    },
    detail: {
        type: String
    },
    image: {
        type: String
    },
    rating: {
        type: String
    },
    age: {
        type: String
    },
    price: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    }
})

module.exports = Mongoose.model('Product', ProductSchema);