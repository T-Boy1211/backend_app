const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/adminAuth.controller');
const profile = require('../controllers/adminProfie.controller');
const product = require('../controllers/product.controller')

router.post('/signup', signup);
router.post('/login', login);
router.get('/product', product.getAllProducts)
router.get('/product/male', product.getMaleProducts)
router.get('/product/female', product.getFemallProducts)
router.get('/product/kid', product.getKiidProducts)
router.get('/:username', profile.getProfile );
router.put('/:username', profile.updateProfile);
router.delete('/:username', profile.deleteProfile);

module.exports = router;
