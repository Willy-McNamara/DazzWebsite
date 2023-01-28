const mongoose = require('mongoose');
const models = require('./model.js');
const sharp = require('sharp'); // sharp is a package for resizing images
const { uploadFile } = require('./s3.js');

const handleAdminUpload = async (req, res) => {
  const type = req.params.type === 'mp3' ? req.params.type : 'png'
  const model = type === 'mp3' ? models.Spicy : models.Icy;

  const file = req.file
  const title = req.body.title
  const description = req.body.description

  console.log('logging information from our AdminUpload post. here is type, title, desciption, and file :', type, title, description, file);

  // make file into buffer for s3 upload, if png resize
  const fileBuffer = type === 'mp3' ? req.file.buffer : await sharp(file.buffer).resize({ height: 1920, width: 1080, fit: "contain" }).toBuffer();

  // ADD TO DATABASE
  new model({
    dazzleID: '',
    title: req.body.title,
    desc: req.body.description,
  }).save()
    .then((dbRes) => {
      console.log('successfully added info to db in handleAdminUpload controller. here is dbRes :', dbRes)
      return uploadFile(fileBuffer, dbRes._id.toString(), file.mimetype)
    })
    .then((s3Res) => {
      console.log('response from s3 upload :', s3Res);
      res.send('successful upload to s3');
    })
    .catch((err) => {
      console.log('error in AdminUpload controller, here is err :', err);
      res.send(err);
    })
}

module.exports = {handleAdminUpload}