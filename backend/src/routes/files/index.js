const express = require('express');
const { upload } = require('../../middlewares/file-upload');
const requireAuth = require('../../middlewares/require-auth');

const router = express.Router();

router.post('/api/files/upload', requireAuth, upload.fields([{ name: 'files' }, { name: 'photos' }, { name: 'test' }, { name: 'logo' }]), (req, res) => {
    let uploadedFiles = [];
    let uploadedPhotos = [];
    let uploadedTest = [];
    let uploadLogo = null;

    if (req.files.files) {
        uploadedFiles = req.files.files.map(({ location }) => location);
    }

    if (req.files.photos) {
        uploadedPhotos = req.files.photos.map(({ location }) => location);
    }

    if (req.files.test) {
        uploadedTest = req.files.test.map(({ location }) => location);
    }

    if (req.files.logo && req.files.logo[0]) {
        uploadLogo = req.files.logo[0].location;
    }

    res.send({ files: uploadedFiles, photos: uploadedPhotos, test: uploadedTest, logo: uploadLogo });
});

module.exports = {
    filesRouter: router,
}