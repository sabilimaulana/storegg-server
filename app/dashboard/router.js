var express = require("express");
const { isLoginAdmin } = require("../middlewares/auth");
var router = express.Router();

const { index } = require("./controller");

/* GET home page. */
router.use(isLoginAdmin);
router.get("/", index);

module.exports = router;
