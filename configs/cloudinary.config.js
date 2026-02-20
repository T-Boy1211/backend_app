const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storag-cloudinary');
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_secret: process.env.CLOUD_SECRET,
  api_key: process.env.CLOUD_KEY,
  secure: true
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'Strategies',
    allow_format: ['jpg', 'jpeg', 'png', 'webp']
  }
});

module.exports = { cloudinary, storage }