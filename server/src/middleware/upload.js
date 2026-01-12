const multer = require('multer');
const sharp = require('sharp');
const AppError = require('../utils/appError');
const path = require('path');

// Multer storage
const multerStorage = multer.memoryStorage();

// Multer filter
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.uploadPlayerPhoto = upload.single('avatar');

exports.resizePlayerPhoto = async (req, res, next) => {
  if (!req.file) return next();
  
  req.file.filename = `player-${req.user.id}-${Date.now()}.jpeg`;
  
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`uploads/players/${req.file.filename}`);
  
  next();
};