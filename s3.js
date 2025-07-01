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
    Expires: 60,
    ContentType: fileType,
  };

  try {
    const uploadUrl = await s3.getSignedUrlPromise('putObject', params);
    res.json({ uploadUrl });
  } catch (err) {
    res.status(500).json({ error: 'Error generating signed URL' });
  }
};

const getViewUrl = async (req, res) => {
  const { fileName } = req.query;

  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: fileName,
    Expires: 6000, // صالح لمدة دقيقة
  };

  const url = await s3.getSignedUrlPromise('getObject', params);
  res.json({ url });
};

module.exports = {
    getSignedUrl,
    getViewUrl
}