const multer = require('multer');

// Set up multer storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

// Set up multer upload middleware
const upload = multer({ storage: storage });

module.exports = upload.array('images');