const mongoose = require('mongoose');

const icySchema = new mongoose.Schema({
  dazzleID: String,
  title: String,
  desc: String,
});

const spicySchema = new mongoose.Schema({
  dazzleID: String,
  title: String,
  desc: String,
});

const dazzleSchema = new mongoose.Schema({
  spicyID: String, // _id for spicy
  icyID: String, // _id for icy
  dazzleTitle: String,
  dazzleDesc: String, // concatted icy and spicy descriptions
});

const Icy = mongoose.model('Icy', icySchema);
const Spicy = mongoose.model('Spicy', spicySchema);
const Dazzle = mongoose.model('Dazzle', dazzleSchema);

module.exports = {Icy, Spicy, Dazzle};