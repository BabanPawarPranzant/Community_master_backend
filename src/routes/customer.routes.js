const express = require("express");
const router = express.Router();

const controller = require("../controllers/customer.controller");
const upload = require("../middlewares/upload.middleware");

router.get("/",controller.getAll);

router.get("/:id",controller.getById);

// router.post("/",upload.single("profile_picture"),controller.create);
router.post(
"/",
upload.fields([
{ name: "profile_picture", maxCount: 1 },
{ name: "document", maxCount: 10 }
]),
controller.create
);

router.put("/:id",upload.single("profile_picture"),controller.update);

router.delete("/:id",controller.delete);

module.exports = router;