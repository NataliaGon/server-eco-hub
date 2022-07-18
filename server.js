const express = require("express");
const router = require("./server/routes/registerRoutes");
const mongoose = require("mongoose");
const fs = require("fs");
const uniqid = require("uniqid");
const sgMail = require("@sendgrid/mail");
const { OrganizationModel, OrganizationModelCopy } = require("./server/models/ngo");
const { BusinessModel, BusinessModelCopy, BusinessNewModel } = require("./server/models/business");
const { MediaModel, MediaModelCopy } = require("./server/models/media");
const { GovernmentModel, GovernmentModelCopy } = require("./server/models/government");
const { HotSpotModel, HotSpotModelCopy } = require("./server/models/hotSpot");
const { NewsModel } = require("./server/models/news");

// const dataToChange = require("./src/data/business.json");



const { NEXT_PUBLIC_SENDGRID_API_KEY } = process.env;
sgMail.setApiKey(NEXT_PUBLIC_SENDGRID_API_KEY);

require("dotenv").config();

const cors = require("cors");
const path = require("path");
const port = process.env.PORT || 8080;

const app = express();

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "build")));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.enable("trust proxy");

app.use(cors());
app.use("/", router);

app.get("*", function (req, res) {
  if (
    !req.secure &&
    (process.env.NEXT_PUBLIC_VERSION === "production" ||
      process.env.NEXT_PUBLIC_VERSION === "staging")
  ) {
    res.redirect("https://" + req.headers.host + req.url);
  }
  // res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port);

mongoose.connect(process.env.NEXT_PUBLIC_MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

// const data = require("./src/data/business.json");
// const dataSend = require("./src/data/file.json");

//write file with key
//let dataNew = Object.values(data);
// dataNew.forEach((item) => (item.key = uniqid()));

// const dataUpdated = dataNew.reduce((obj, item) => {
//   return {
//     ...obj,
//     [item.key]: item,
//   };
// }, {});
// fs.writeFileSync("countries.json", JSON.stringify(dataUpdated));


/* <loc>https://www.ecohubmap.com/en/map/?key=${orgToFile.key}&amp;companyType=NGO&amp;companyCountry=${orgToFile.country}&amp;${orgToFile.name.replace(" ", "-")}</loc>\ */ 
//write map file
// BusinessModel.find({}, function (err, docs) {
//   const orgsToFile = docs.filter((doc) => doc.key);

//   let urls = "";

//   for (let orgToFile of orgsToFile) {

//     urls +=
//       // eslint-disable-next-line no-multi-str
//       `
//    <url>\  
//       <loc>https://www.ecohubmap.com/en/map/?key=${orgToFile.key}&amp;companyType=business&amp;companyCountry=${orgToFile.country}&amp;${orgToFile.name?.replace(/ /g, "-").replace(/&/g, "&amp;")}</loc> \    
//       <lastmod>2021-06-12</lastmod>\
//       <priority>0.9</priority>\
//    </url>\
// `;
//   }
//   const fileValue = `<?xml version="1.0" encoding="UTF-8"?>\
// <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\
// ${urls}
// </urlset> `;

//   fs.writeFileSync("map.xml", fileValue);
// });

// NewsModel.find({}, function (err, docs) {
//   const orgsToFile = docs.filter((doc) => doc.key);

//   let urls = "";

//   for (let orgToFile of orgsToFile) {
//     urls +=
//       // eslint-disable-next-line no-multi-str
//       `
//    <url>\
//       <loc>https://www.ecohubmap.com/en/the-news?key=${orgToFile.key}}&amp;${orgToFile?.title?.replace(/ /g, "-").replace(/&/g, "&amp;")}</loc>\
//      <lastmod>2022-06-02</lastmod>\
//       <priority>0.8</priority>\
//    </url>\
// `;
//   }
//   const fileValue = `<?xml version="1.0" encoding="UTF-8"?>\
// <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\
// ${urls}
// </urlset> `;

//   fs.writeFileSync("map.xml", fileValue);
// });

// GovernmentModel.find({}, function (err, docs) {
//   const updatedModel = docs.filter(doc => doc.location && doc.location?.lat && doc.location?.lng).map((doc) => {
//     doc.loc = [doc.location?.lng, doc.location?.lat];
//     doc.date = doc.date || new Date;
//     doc.key = doc.key || uniqid();
//     return doc;
//   });
//   GovernmentModel.deleteMany().then((a) => {
//     try {
//       GovernmentModel
//         .insertMany(updatedModel)
//         .then(() => console.log("file uploaded"));
//     } catch (e) {
//       console.log("file wasn't uploaded");
//     }
//   });
// });

// GovernmentModel.find({}, { _id: 0 }, function (err, docs) {

//   GovernmentModelCopy.insertMany(docs)
// })

// OrganizationModel.find({}, function (err, docs) {
//   docs.forEach((doc, index) => {
//     const double = docs.find((item) => (item.key === doc.key && item._id !== doc._id));
//     docs.splice(docs.indexOf(double), 1)
//   }
//   );
//   console.log(docs.length);
//   OrganizationModel.deleteMany().then((a) => {
//     try {
//       OrganizationModel
//         .insertMany(docs)
//         .then(() => console.log("file uploaded"));
//     } catch (e) {
//       console.log("file wasn't uploaded");
//     }
//   });
// });

// GovernmentModel.find({ description: "" }, { _id: 0, __v: 0, status: 0, loc: 0, location: 0, logo: 0 }, function (err, docs) {
  // const data = docs.map((doc) => {
  //   doc.loc = [doc.location?.lng, doc.location?.lat];
  //   doc.date = doc.date || new Date;
  //   doc.key = doc.key || uniqid();
  //   return doc
  // });
  // const dataUpdated = data.reduce((obj, item) => {
  //   return {
  //     ...obj,
  //     [item.key]: item,
  //   };
  // }, {});

//   fs.writeFileSync("government.json", JSON.stringify(docs));
// });

// let dataNew = Object.values(org);

// dataNew.forEach((doc, index) => {
//   const double = dataNew.find((item) => (item.name === doc.name && item.key !== doc.key));

//   if (doc?.logo) {
//     dataNew.splice(dataNew.indexOf(double), 1)
//   } //   if (double?.logo) {
//     dataNew.splice(dataNew.indexOf(doc), 1)
//   }

// }
// )
// console.log(dataNew.length);
// const dataUpdated = dataNew.reduce((obj, item) => {
//   if (!item.key) {
//     item.key = uniqid();
//   }
//   if (!item.loc) {
//     item.loc = [item.location?.lng, item.location?.lat];
//   }
//   if (!item.date) {
//     item.date = new Date;
//   }

//   return {
//     ...obj,
//     [item.key]: item,
//   };
// }, {});

// fs.writeFileSync("countries2.json", JSON.stringify(dataUpdated));

// BusinessNewModel.updateMany({ country: "Reunion" },
//   { $set: { status: 'done' } }

// ).then((doc) => {
//   console.log(doc)
// });


// const dataUpdated = Object.values(dataNew).reduce((obj, item) => {


//   item.loc = [parseFloat(item.loc[0]), parseFloat(item.loc[1])];


//   return {
//     ...obj,
//     [item.key]: item,
//   };
// }, {});
// fs.writeFileSync("countries2.json", JSON.stringify(dataUpdated));

// const a = Object.values(dataToChange);
// a.forEach(element => {

//   element.loc = [parseFloat(element.location?.lng), parseFloat(element.location?.lat)];
//   element.date = element.date || new Date;
// });


// const dataUpdated = a.reduce((obj, item) => {
//   return {
//     ...obj,
//     [item.key]: item,
//   };
// }, {});

// fs.writeFileSync("countries.json", JSON.stringify(dataUpdated));
// OrganizationModel.find({ country: "Australia" }, function (err, docs) {
//   const orgsToFile = docs.filter((doc) => doc.key);

//   let urls = "";

//   for (let orgToFile of orgsToFile) {
//     urls +=
//       // eslint-disable-next-line no-multi-str
//       `
//       <li>
//    <a href = "https://www.ecohubmap.com/en/map?key=${orgToFile.key}&amp;companyType=NGO&amp;companyCountry=Australia&amp;${orgToFile.name}" >\
//    ${orgToFile.name}
//    </a></li>\
// `;
//   }
//   //   const fileValue = `<?xml version="1.0" encoding="UTF-8"?>\
//   // <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\
//   // ${urls}
//   // </urlset> `;

//   fs.writeFileSync("map.html", urls);
// });
