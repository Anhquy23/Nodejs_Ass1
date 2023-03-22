import mongoose from "mongoose";

const producstSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
    desc: {
        type: String,
        require: true,
    },
    status: {
        type: Boolean,
    },
    quantity: {
        type: Number,
        require: true,
    },
})

export default mongoose.model('products', producstSchema);