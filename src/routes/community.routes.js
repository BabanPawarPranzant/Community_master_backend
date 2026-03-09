const express = require("express");
const router = express.Router();
const controller = require("../controllers/community.controller");
const upload = require("../middlewares/upload.middleware");

//
router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", upload.single("profile_image"), controller.create);
router.put("/:id", upload.single("profile_image"), controller.update);
router.delete("/:id", controller.delete);

module.exports = router;