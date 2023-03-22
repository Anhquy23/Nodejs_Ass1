import Joi from "joi";
import products from "../model/products";

const productsSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    desc : Joi.string().required(),
    status : Joi.boolean(),
    quantity: Joi.number().required(),
})

export const create = async (req, res) => {
    try {
        const body = req.body;
        const { error } = productsSchema.validate(body);
        if (error) {
            return res.json({
                message: error.details[0].message
            })
        }
        const product = await products.create(body);
        if(product.lenght === 0) {
            return res.status(400).json({
                message: 'Thêm sản phẩm thất bại'
            });
        }
        return res.status(200).json({
            message: 'Thêm sản phẩm thành công',
            product
        })
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}

export const getAll = async (req, res) => {
    try {
        const product = await products.find();
        if(product.lenght === 0) {
            return res.status(200).json({
                message: 'Không có sản phẩm'
            });
        }
        return res.status(200).json(product)
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}

export const get = async (req, res) => {
    try {
        const id = req.params.id
        const product = await products.find({_id: id});
        if(product.lenght === 0) {
            return res.status(400).json({
                message: 'Không có sản phẩm'
            });
        }
        return res.status(200).json(product)
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}

export const remove = async (req, res) => {
    try {
        const id = req.params.id
        const product = await products.findByIdAndDelete(id);
        return res.status(200).json({
            message: 'Xóa sản phẩm thành công',
            product
        })
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}

export const update = async (req, res) => {
    try {
        const body = req.body;
        const id = req.params.id;
        const product = await products.findOneAndUpdate({_id: id}, body, {new: true});
        if(product.lenght === 0) {
            return res.status(400).json({
                message: 'Cập nhật sản phẩm thất bại'
            });
        }
        return res.status(200).json({
            message: 'Cập nhật sản phẩm thành công',
            product
        })
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}