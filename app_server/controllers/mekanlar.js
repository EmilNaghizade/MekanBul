var express = require('express');
var router = express.Router();

const anaSayfa = function(req, res) {
    res.render('anasayfa', { 
      "baslik": 'Anasayfa',
      "sayfaBaslik": {
        "siteAd": "MekanBul",
        "slogan": "Civardaki Mekanları Keşfet!"
      },
      "mekanlar": [
        {
          "ad": "Starbucks",
          "adres": "Centrum Garden AVM",
          "puan": "4",
          "imkanlar": ["Dünya Kahveleri","Kekler","Pastalar"],
          "mesafe": "10km"
        }
        ,
        {
          "ad": "Gloria Jeans",
          "adres": "Sdü Doğu Kampüsü",
          "puan": "3",
          "imkanlar": ["Kahve","Çay","Pasta"],
          "mesafe": "5km"
        }
      ]
    }
    );
  }

  const mekanBilgisi = function(req, res) {
    res.render('mekanbilgisi',
    {
      "baslik": "Mekan Bilgisi",
      "mekanBaslik": "Starbucks",
      "mekanDetay": {
        "ad": "Starbucks",
        "adres": "Centrum Garden AVM",
        "puan": "4",
        "imkanlar": ["Dünya Kahveleri","Kekler","Pastalar"],
        "koordinatlar": {
          "enlem": "37.78209",
          "boylam": "30.56254"
        },
        "saatler": [{
          "gunler": "Pazartesi-Cuma",
          "acilis": "9.00",
          "kapanis": "23.00",
          "kapali": false
        },
        {
          "gunler": "Cumartesi-Pazar",
          "acilis": "10.00",
          "kapanis": "22.00",
          "kapali": false
        }
      ],
      "yorumlar": [
        {
          "yorumYapan": "Emil Naghizade",
          "puan": "4",
          "tarih": "20 ekim 2022",
          "yorumMetni": "Kahveler iyi."
        },
        {
          "yorumYapan": "Ceyhun Boran",
          "puan": "2",
          "tarih": "18 eylül 2022",
          "yorumMetni": "Hizmet seviyesi aşırı kötü."
        },

      ]
      }
    });
  }

  const yorumEkle = function(req, res,) {
    res.render('yorumekle', { title: 'Yorum ekle' });
  }




  module.exports={

    anaSayfa,
    mekanBilgisi,
    yorumEkle


    
  }