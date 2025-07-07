const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  signatureVersion: 'v4',
});

const getSignedUrl = async (req, res) => {
  const { fileName, fileType } = req.query;

  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: fileName,
    Expires: 300,
    ContentType: fileType,
  };

  try {
    const uploadUrl = await s3.getSignedUrlPromise('putObject', params);
    res.json({ uploadUrl });
  } catch (err) {
    res.status(500).json({ error: 'Error generating signed URL' });
  }
};

const getViewUrl = async (image) => {

  if (!image) {
    return;
  }

  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: image,
    Expires: 300, // صالح لمدة 5 دقائق
  };

  const url = await s3.getSignedUrlPromise('getObject', params);
  return url;
};

module.exports = {
    getSignedUrl,
    getViewUrl
}