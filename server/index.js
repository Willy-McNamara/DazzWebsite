const express = require('express')
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const multer = require('multer'); // multer for letting us recieve the FormData (pngs and mp3s from the client!)
const db = require('./db.js');
const controllers = require('./controllers.js');

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
  console.log('playDummyData triggered! here is __dirname :', __dirname)
  res.sendFile(__dirname + `/dummySongs/${req.params.title}`)
})

// route for uploads of unpaired, single icys/spicys
app.post('/AdminUpload/:type', upload.single('file'), (req, res) => {
  console.log('AdminUpload route hit. here is req.params.type', req.params.type);
  controllers.handleAdminUpload(req, res);
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