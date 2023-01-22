const express = require('express')
const path = require('path');
const cors = require('cors')
const morgan = require('morgan')

const app = express()

/* ===== MIDDLEWARE ===== */
app.use(cors())
app.use(express.json());
app.use(express.static(path.join('../public')));

/* ===== ROUTING ===== */




/* ===== SET TO LISTEN ===== */

const PORT = process.env.PORT || 3009;
app.listen(PORT, () => {
  console.log(`Web server running on: http://localhost:${PORT}`);
});