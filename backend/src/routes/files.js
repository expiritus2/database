const express = require('express');
const { upload } = require('../middlewares/file-upload');
const requireAuth = require('../middlewares/require-auth');

const router = express.Router();

router.post('/api/files/upload', requireAuth, upload.fields([{ name: 'files' }, { name: 'photos' }]), (req, res) => {
    const files = req.files.files.map(({ location }) => location);
    const photos = req.files.photos.map(({ location }) => location);
    res.send({ files, photos });
});

module.exports = {
    filesRouter: router,
}