const express = require("express");
const router = express.Router();
const ctrlMekanlar = require("../controllers/mekanlar");
const ctrlYorumlar = require("../controllers/yorumlar");
// Mekanlar icin
router
  .route("/mekanlar")
  .get(ctrlMekanlar.mekanlariListele)
  .post(ctrlMekanlar.mekanEkle);

router
  .route("/mekanlar/:mekanid")
  .get(ctrlMekanlar.mekanGetir)
  .put(ctrlMekanlar.mekanGuncelle)
  .delete(ctrlMekanlar.mekanSil);

// Yorumlar icin
router.route("/mekanlar/:mekanid/yorumlar").post(ctrlYorumlar.yorumEkle);

router
  .route("/mekanlar/:mekanid/yorumlar/:yorumid")
  .get(ctrlYorumlar.yorumGetir)
  .put(ctrlYorumlar.yorumGuncelle)
  .delete(ctrlYorumlar.yorumSil);

module.exports = router;
