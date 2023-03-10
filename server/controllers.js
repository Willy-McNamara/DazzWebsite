const mongoose = require('mongoose');
const models = require('./model.js');
const sharp = require('sharp'); // sharp is a package for resizing images
const { uploadFile, deleteFile } = require('./s3.js');

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

const handleDazzleUpload = async (req, res) => {
  const type = req.params.type === 'mp3' ? req.params.type : 'png'
  const model = type === 'mp3' ? models.Spicy : models.Icy;

  const file = req.file
  const title = req.body.title
  const description = req.body.description

  console.log('logging information from our AdminUpload post. here is type, title, desciption, and file :', type, title, description, file);

  // make file into buffer for s3 upload, if png resize
  const fileBuffer = type === 'mp3' ? req.file.buffer : await sharp(file.buffer).resize({ height: 1920, width: 1080, fit: "contain" }).toBuffer();

  // store secondaryId in accessible scope to grab after AWS upload
  let secondaryId;

  // ADD TO DATABASE
  new model({
    dazzleID: '',
    title: req.body.title,
    desc: req.body.description,
  }).save()
    .then((dbRes) => {
      secondaryId = dbRes._id.toString();
      console.log('successfully added info to db in handleDazzleUpload controller. here is dbRes :', dbRes)
      return uploadFile(fileBuffer, dbRes._id.toString(), file.mimetype)
    })
    .then((s3Res) => {
      console.log('logging s3Res', s3Res)
      // now add to dazzle schema
      return new models.Dazzle({
        spicyID: type === 'mp3' ? secondaryId : req.body.mainID,
        icyID: type === 'png' ? secondaryId : req.body.mainID,
        dazzleTitle: req.body.title,
        dazzleDesc: req.body.origDescription + req.body.description,
      }).save()
    })
    .then((dbResDazz) => {
      console.log('response from dazz Save :', dbResDazz);
      res.status(201);
    })
    .catch((err) => {
      console.log('error in DazzleUpload controller, here is err :', err);
      res.send(err);
    })
}

const handleRetrieve = (req, res) => {
  const model = req.params.type === 'icy' ? models.Icy : models.Spicy;
  model.find()
    .then((dbRes) => {
      console.log('dbRes iin handleRetrieve :', dbRes)
      res.send(dbRes)
    })
    .catch((err) => {
      console.log('err in handle retrieve, here is err :', err);
      res.send(err);
    })
}

const handleGetDazzles = (req, res) => {
  models.Dazzle.find()
    .then((dbRes) => {
      console.log('handleGetDazzles dbRes', dbRes)
      res.send(dbRes);
    })
    .catch((err) => {
      console.log('handleGetDazzles err', err)
      res.send(404);
    })
}

const handleDelete = (req, res) => {
  // first delete record from database, then aws, then send success
  const model = req.params.type === 'icy' ? models.Icy : models.Spicy;
  model.findByIdAndDelete(req.params.id)
    .then((dbRes) => {
      console.log('here is response from aws in handleDelete :', dbRes)
      return deleteFile(req.params.id);
    })
    .then((awsRes) => {
      res.status(204).send('successful delete')
    })
    .catch((err) => {
      res.send(err);
    })
}

module.exports = {handleAdminUpload, handleRetrieve, handleDelete, handleDazzleUpload, handleGetDazzles}