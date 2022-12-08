const axios = require("axios");
var apiSecenekleri = {
  // sunucu: "http://localhost:3000",
  sunucu: "https://mekanbul.xalturwik.repl.co/",
  apiYolu: "/api/mekanlar/",
};
var mesafeyiFormatla = function (mesafe) {
  var yeniMesafe, birim;
  if (mesafe > 1) {
    yeniMesafe = parseFloat(mesafe).toFixed(1);
    birim = "km";
  } else {
    yeniMesafe = parseInt(mesafe * 1000, 10);
    birim = "m";
  }
  return yeniMesafe + birim;
};
var express = require("express");
const { default: mongoose } = require("mongoose");
var router = express.Router();
var anaSayfaOlustur = function (res, mekanListesi) {
  var mesaj;
  //gelen mekanListesi eğer dizi tipinde değilse hata ver
  console.log(mekanListesi);
  if (!Array.isArray(mekanListesi)) {
    mesaj = "API HATASI: Bir şeyler ters gitti.";
    mekanListesi = [];
  } else {
    //Eğer belirlenen mesafe içind mekan bulunamadıysa bilgilendir
    if (!mekanListesi.length) {
      mesaj = "Civarda herhangi bir mekan bulunamadı.";
    }
  }
  res.render("anasayfa", {
    baslik: "Anasayfa",
    sayfaBaslik: {
      siteAd: "MekanBul",
      slogan: "Civardaki Mekanları Keşfet!",
    },
    mekanlar: mekanListesi,
    mesaj: mesaj,
  });
};
const anaSayfa = function (req, res, next) {
  axios
    .get(apiSecenekleri.sunucu + apiSecenekleri.apiYolu, {
      params: {
        enlem: req.query.enlem ? req.query.enlem : 37,
        boylam: req.query.boylam ? req.query.boylam : 30.5,
      },
    })
    .then(function (response) {
      var i, mekanlar;
      mekanlar = response.data;
      for (i = 0; i < mekanlar.length; i++) {
        mekanlar[i].mesafe = mesafeyiFormatla(mekanlar[i].mesafe);
      }
      anaSayfaOlustur(res, mekanlar);
    })
    .catch(function (hata) {
      anaSayfaOlustur(res, hata);
    });
};

var detaySayfasiOlustur = function (res, mekanDetaylari) {
  mekanDetaylari.koordinat = {
    enlem: mekanDetaylari.koordinat[0],
    boylam: mekanDetaylari.koordinat[1],
  };
  res.render("mekanbilgisi", {
    mekanBaslik: mekanDetaylari.ad,
    mekanDetay: mekanDetaylari,
  });
};
var hataGoster = function (res, hata) {
  var mesaj;
  if (hata.response.status == 404) {
    mesaj = "404, Sayfa Bulunamadı!";
  } else {
    mesaj = hata.response.status + " hatası";
  }
  res.status(hata.response.status);
  res.render("error", {
    mesaj: mesaj,
  });
};
const mekanBilgisi = function (req, res) {
  axios
    .get(apiSecenekleri.sunucu + apiSecenekleri.apiYolu + req.params.mekanid)
    .then(function (response) {
      req.session.mekanAdi = response.data.ad;
      detaySayfasiOlustur(res, response.data);
    })
    .catch(function (hata) {
      hataGoster(res, hata);
    });
};

const yorumEkle = function (req, res, next) {
  var mekanAdi = req.session.mekanAdi;
  mekanid = req.params.mekanid;
  if (!mekanAdi) res.redirect("/mekan/" + mekanid);
  else
    res.render("yorumekle", {
      baslik: mekanAdi + " mekanına yorum ekle",
    });
};

const yorumumuEkle = function (req, res) {
  var gonderilenYorum, mekanid;
  mekanid = req.params.mekanid;
  if (!req.body.adsoyad || !req.body.yorum) {
    res.redirect("/mekan/" + mekanid + "/yorum/yeni?hata=evet");
  } else {
    gonderilenYorum = {
      yorumYapan: req.body.adsoyad,
      puan: parseInt(req.body.puan, 10),
      yorumMetni: req.body.yorum,
    };
    axios
      .post(
        apiSecenekleri.sunucu + apiSecenekleri.apiYolu + mekanid + "/yorumlar",
        gonderilenYorum
      )
      .then(function () {
        res.redirect("/mekan/" + mekanid);
      })
      .catch(function (hata) {
        hataGoster(req, res, hata);
      });
  }
};

var yorumSema = new mongoose.Schema({
  yorumYapan: { type: String, required: true },
  puan: { type: Number, default: 0, min: 0, max: 5 },
  yorumMetni: { type: String, required: true },
  tarih: { type: Date, default: Date.now },
});

module.exports = {
  anaSayfa,
  mekanBilgisi,
  yorumEkle,
  yorumumuEkle,
};
