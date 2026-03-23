// const express = require("express");
// const router = express.Router();
// const controller = require("../controllers/property.controller");
// const upload = require("../middlewares/upload.middleware");

// router.get("/", controller.getAll);
// router.get("/by-community/:community_id", controller.getByCommunity);
// router.get("/:id", controller.getById);    
// router.post("/", upload.single("property_image"), controller.create);
// router.put("/:id", upload.single("property_image"), controller.update);
// router.delete("/:id", controller.delete);

// module.exports = router;







//functions called

const express = require("express");
const router = express.Router();
const controller = require("../controllers/property.controller");
const upload = require("../middlewares/upload.middleware");

router.get("/", controller.getAll);

router.post("/", upload.single("profile_picture"), controller.create);

router.get("/by-community/:community_id", controller.getByCommunity);
router.get("/:id", controller.getById);
router.put("/:id", upload.single("profile_picture"), controller.update);

router.delete("/:id", controller.delete);

module.exports = router;