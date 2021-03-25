// same as graffiti controller but for use in mobile so theres no need for authentication
let router = require("express").Router();
let sequelize = require("../db");
const MobileGraffiti = sequelize.import("../models/mobileGraffiti");
const Image = sequelize.import("../models/image.js");
const multer = require("multer");

// image upload storage
const Storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "./images");
  },
  filename(req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
  },
});

// // image upload
// const upload = multer({
//   storage: Storage,
//   limits: { fileSize: 100000 },
// });

// router.post("/upload", upload.single("fileData"), (req, res) => {
//   if (!req.errors) {
//     console.log(req);
//    let fileData = fs.readFile(req.file.path,(err, contents)=> {
//       if (err) {
//       console.log('Error: ', err);
//      }else{
//       console.log('File contents ',contents);
//      }
//     Image.create({
//       type: req.file.mimetype,
//       name: req.file.originalname,
//       data: fileData,
//     }).then((photo) => console.log(photo));

//       // if (!req.errors) {
//       //   res.status(200).json({
//       //     message: "success!",
//       //   });
//       // } else {
//       //   if (req.errors instanceof multer.MulterError) {
//       //     // A Multer error occurred when uploading.
//       //     alert("Multer Error:", err);
//       //   } else if (req.error) {
//       //     // An unknown error occurred when uploading.
//       //     alert("Unknown error:", err);
//       //   }
//       // }
//     // );
//   }
// }})

// Graffiti.sync({ force: true });
//create graffiti
router.post("/create", (req, res) => {
  console.log("hitting mobile create");
  if (!req.errors) {
    const newGraffiti = {
      title: req.body.title,
      image: req.body.image,
      info: req.body.info,
      lat: req.body.lat,
      lng: req.body.lng,
    };
    MobileGraffiti.create(newGraffiti)
      .then((graffiti) => res.status(200).json(graffiti))
      .catch((err) => res.json(req.errors));
  } else {
    res.status(500).json(req.errors);
  }
});

///get all graffitis for one user
router.get("/getall", (req, res) => {
  let userid = req.user.id;

  Graffiti.findAll({
    where: { owner: userid },
  })
    .then((graffiti) => res.status(200).json(graffiti))
    .catch((err) => res.status(500).json({ error: err }));
});

///get item by id
router.get("/get/:id", (req, res) => {
  Graffiti.findOne({
    where: { id: req.params.id },
  })
    .then((graffiti) => res.status(200).json(graffiti))
    .catch((err) => res.status(500).json({ error: err }));
});

//update graffiti
router.put("/update/:id", (req, res) => {
  if (!req.errors) {
    Graffiti.update(req.body, { where: { id: req.params.id } })
      .then((graffiti) => res.status(200).json(graffiti))
      .catch((err) => res.json(req.errors));
  } else {
    res.status(500).json(req.errors);
  }
});

//delete graffiti
router.delete("/delete/:id", (req, res) => {
  let data = req.params.id;
  let userid = req.user.id;

  Graffiti.destroy({
    where: { id: data, owner: userid },
  }).then((data) => res.send("YOU DESTROYED ART")),
    (err) => res.send(500, err.message);
});

module.exports = router;
