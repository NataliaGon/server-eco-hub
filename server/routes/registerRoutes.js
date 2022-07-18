const express = require("express");
const router = express.Router();
const login = require("./login");
const addSpot = require("./addSpot");
const addSubscriber = require("./addSubscriber");
const writeFile = require("./writeFile");
const getSpotByTypeKey = require("./getSpotByTypeKey");
const getNews = require("./getNews");
const getOneNews = require("./getOneNews");
const getSpots = require('./getSpots');
const getNewsStatistic = require("./getNewsStatistic");
const test = require("./test");

router.post("/login", login);
router.post("/add-spot", addSpot);
router.post("/add-subscriber", addSubscriber);
router.post("/write-file", writeFile);
router.get("/get-spots", getSpots);
router.get("/ping", test);
router.get("/get-spot-by-type-key", getSpotByTypeKey);
router.get("/get-all-news", getNews);
router.get("/get-one-news", getOneNews);
router.get("/get-news-statistic", getNewsStatistic);

module.exports = router;
