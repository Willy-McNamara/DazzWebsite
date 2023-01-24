const express = require('express')
const path = require('path');
const cors = require('cors')
const morgan = require('morgan')

const app = express()

/* ===== MIDDLEWARE ===== */
app.use(cors())
app.use(morgan())
app.use(express.json());
app.use(express.static(path.join('../public')));

/* ===== ROUTING ===== */

// send dummy data songs
app.get('/playDummyData/:title', (req,res)=> {
  console.log('playDummyData triggered! here is __dirname :', __dirname)
  res.sendFile(__dirname + `/dummySongs/${req.params.title}`)
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