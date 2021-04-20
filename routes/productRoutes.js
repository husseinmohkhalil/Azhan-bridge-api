const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const productController = require('../controllers/productController');

router.delete('/deleteMe', productController.deleteMe);


router
    .route('/')
    .get(productController.getAllProducts)
    .post(auth, productController.CreateProduct);


router
    .route('/:id')
    .get(productController.getProduct)
    .patch(auth, productController.updateProduct)
    .delete(auth, productController.deleteProduct);

module.exports = router;