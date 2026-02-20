const Product = require('../models/product.model');

exports.createProduct = async (req, res) => {
  const { price, description, brand } = req.body;

  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Image file is required' });
    }
    const image = req.file.path;

    const newProduct = new Product.create({
      image,
      brand,
      price,
      description,
      // features: features.split(',').map(feature => {
      //   const [key, value] = feature.split(':');
      //   return { key: key.trim(), value: value.trim() };
      // })
    });
    res.status(201).json({ message: 'Product successfully created', product: newProduct });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMaleProducts = async (req, res) => {
  try {
    const maleProducts = await Product.find({ gender });
    if (gender === male) {
      res.status(200).json(maleProducts);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFemallProducts = async (req, res) => {
  try {
    const femaleProducts = await Product.find({ gender });
    if (gender === female) {
      res.status(200).json(femaleProducts);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getKiidProducts = async (req, res) => {
  try {
    const kidProducts = await Product.find({ gender });
    if (gender === kid) {
      res.status(200).json(kidProducts);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
