const aws = require('aws-sdk');

class AwsS3 {
    constructor() {
        this.s3 = new aws.S3({
            accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
        });
        this.files = [];
    }

    setFiles(files) {
        this.files = files;
        return this;
    }

    async upload(options = {}) {
        return new Promise(async (resolve) => {
            const results = [];

            for await (const file of this.files) {
                const buffer = Buffer.from(file.data, 'base64');
                const data = await this.s3.upload({
                    Bucket: process.env.AWS_S3_BUCKET_NAME,
                    Key: `${new Date().getTime()}-${file.filename}`,
                    Body: buffer,
                    ACL: 'public-read',
                    ContentType: file.contentType,
                    ContentEncoding: 'base64',
                    ...options,
                }).promise();
                results.push({
                    contentType: file.contentType,
                    filename: file.filename,
                    size: file.size,
                    url: data.Location,
                    fileType: file.fileType,
                });
            }

            resolve(results);
        })
    }

    async deleteObject(url) {
        return new Promise((resolve) => {
            const key = url.split('/').pop();
            this.s3.deleteObject({
                Bucket: process.env.AWS_S3_BUCKET_NAME,
                Key: key,
            }, (err, data) => {
                if (err) throw new Error();
                resolve(data);
            });
        });
    }
}

module.exports = new AwsS3();