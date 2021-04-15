const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const s3 = new aws.S3({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
});

const upload = multer({
    storage: multerS3({
        s3,
        bucket: process.env.AWS_S3_BUCKET_NAME,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key: function (req, file, cb) {
            cb(null, `${Date.now().toString()}-${file.originalname}`)
        }
    })
});

module.exports = {
    upload,
    s3,
}