const express = require('express');
const { upload } = require('../../middlewares/file-upload');
const requireAuth = require('../../middlewares/require-auth');

const router = express.Router();

router.post('/api/files/upload', requireAuth, upload.fields([{ name: 'files' }, { name: 'photos' }]), (req, res) => {
    let uploadedFiles = [];
    let uploadedPhotos = [];

    if (req.files.files) {
        uploadedFiles = req.files.files.map(({ location }) => location);
    }

    if (req.files.photos) {
        uploadedPhotos = req.files.photos.map(({ location }) => location);
    }

    res.send({ files: uploadedFiles, photos: uploadedPhotos });
});

module.exports = {
    filesRouter: router,
}