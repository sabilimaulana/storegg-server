var express = require("express");
const { isLoginAdmin } = require("../middlewares/auth");
var router = express.Router();
const multer = require("multer");
const os = require("os");

const { signup } = require("./controller");

router.post("/signup", multer({ dest: os.tmpdir() }).single("image"), signup);

module.exports = router;
