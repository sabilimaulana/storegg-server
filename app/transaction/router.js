var express = require("express");
const { isLoginAdmin } = require("../middlewares/auth");
var router = express.Router();

const { index, actionStatus } = require("./controller");

router.use(isLoginAdmin);
router.get("/", index);
router.put("/status/:id", actionStatus);

module.exports = router;
