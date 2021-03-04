const multer = require('multer');
const express = require('express');

const multerConfig = () => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads');
        },
        filename: (req, file, cb) => {
            let filename = Date.now() + '_' + file.originalname.split(' ').join('_');
            cb(null, filename);
        }
    });

    return multer({ storage }).single('file');
};

function uploadCtrl() {
    const router = express.Router();
    
    router.post('/', multerConfig(), (req, res) => {
        const url = `${req.protocol}://${req.get('host')}/${req.file.path}`;
        res.status(200).json({
            downloadURL: url
        });
    });

    return router;
}

module.exports = uploadCtrl;