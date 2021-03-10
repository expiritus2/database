const express = require('express');
const { upload } = require('../middlewares/file-upload');

const router = express.Router();

router.post('/api/files/upload', upload.fields([{ name: 'files' }, { name: 'photos' }]), (req, res) => {
    const files = req.files.files.map(({ bucket, key, location }) => ({ bucket, key, location }));
    const photos = req.files.photos.map(({ bucket, key, location }) => ({ bucket, key, location }));
    res.send({ files, photos });
});

module.exports = {
    filesRouter: router,
}