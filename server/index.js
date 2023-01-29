const express = require('express')
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const multer = require('multer'); // multer for letting us recieve the FormData (pngs and mp3s from the client!)
const db = require('./db.js');
const fs = require('fs');
const controllers = require('./controllers.js');
const { getFileStream, deleteFile } = require('./s3.js');

const app = express()

/* ===== MIDDLEWARE ===== */
app.use(cors())
app.use(morgan())
app.use(express.json());
app.use(express.static(path.join('../public')));

// this sets up the file to temporary live in local memory while we send it off to s3 and our db
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

/* ===== ROUTING ===== */

// send dummy data songs
app.get('/playDummyData/:title', (req,res)=> {
  res.sendFile(__dirname + `/dummySongs/${req.params.title}`)
})

// grab icys or spicys from db
app.get('/adminGall/:type', (req, res) => {
  console.log('get adminGall reached server. here are req.params :', req.params);
  req.params.type = req.params.type === 'icy' ? 'spicy' : 'icy';
  controllers.handleRetrieve(req, res);
})

// get all dazzles!
app.get('/dazzles', (req, res) => {
  controllers.handleGetDazzles(req, res);
})

// stream requested file from s3
app.get('/stream/:key', (req, res) => {
  getFileStream(req.params.key)
    .then((s3res) => {
      console.log('s3res on stream :', s3res)
      s3res.Body.pipe(res);
    })
    .catch((err) => {
      console.log('err sending stream response :', err)
      res.send(err);
    })
})

// route for uploads of unpaired, single icys/spicys
app.post('/AdminUpload/:type', upload.single('file'), (req, res) => {
  controllers.handleAdminUpload(req, res);
})

// route for adding a dazzle!
app.post('/dazzleUpload/:type', upload.single('file'), (req, res) => {
  console.log('req.params, and req.body in dazzleUpload:', req.params, req.body)
  controllers.handleDazzleUpload(req, res)
})
// delete route
app.delete('/:type/:id', (req, res) => {
  //
  console.log('logging req.params in app.delete', req.params)
  controllers.handleDelete(req, res);
})

/* ======= ======== ======== CATCH ALL ROUTE ======== ======== ====== */

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public'));
});

/* ===== SET TO LISTEN ===== */

const PORT = process.env.PORT || 3009;
app.listen(PORT, () => {
  console.log(`Web server running on: http://localhost:${PORT}`);
});