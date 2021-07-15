const aws = require('aws-sdk');

const s3 = new aws.S3({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
});

module.exports = {
    s3,
}