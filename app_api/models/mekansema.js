var mongoose = require("mongoose");

const saatSema = new mongoose.Schema({
  gunler: {
    type: String,
    required: true,
  },
  acilis: String,
  kapanis: String,
  kapali: {
    type: Boolean,
  },
});

const yorumSema = new mongoose.Schema({
  yorumYapan: {
    type: String,
    required: true,
  },
  puan: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  yorumMetni: {
    type: String,
    required: true,
  },
  tarih: {
    type: Date,
    default: Date.now,
  },
});

const mekanSema = new mongoose.Schema({
  ad: {
    type: String,
    required: true,
  },
  adres: {
    type: String,
    required: true,
  },
  puan: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
    required: true,
  },
  imkanlar: [String],
  koordinat: {
    type: [Number],
    index: "2dsphere",
    required: true,
  },
  saatler: [saatSema],
  yorumlar: [yorumSema],
});

mongoose.model("mekan", mekanSema, "mekanlar");
