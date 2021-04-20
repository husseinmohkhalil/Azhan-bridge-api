const { Error } = require('mongoose');
const product = require('../models/productModel');
const base = require('./baseController');

exports.deleteMe = async (req, res, next) => {
    try {
        await product.findByIdAndUpdate(req.product.id, {
            active: false
        });

        res.status(204).json({
            status: 'success',
            data: null
        });


    } catch (error) {
        next(error);
    }
};

exports.CreateProduct = async (req, res, next) => {
    try {
        const checkIfExists = await product.find({ "name": req.body.name });

        if (checkIfExists.length > 0) {
            return    res.status(500).json({
                status: 'error',
                data: 'product already exists'
            });
        }

        const doc = await product.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                doc
            }
        });
    } catch (error) {
        if (error.message === 500) {
            res.status(500).json({
                status: 'error',
                data: 'product already exists'
            });
        } else {
            next(error);

        }

    }

};

exports.getAllProducts = base.getAll(product);
exports.getProduct = base.getOne(product);

// Don't update password on this 
exports.updateProduct = base.updateOne(product);
// exports.CreateProduct = base.createOne(product);
exports.deleteProduct = base.deleteOne(product);