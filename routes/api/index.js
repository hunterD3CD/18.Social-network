// ------------------------------------------------------ package up all of the API routes--------------------------------------------------
// -----------------------collecting the packaged group of routes and prefixing them with the path " /users " or " /thoughts"--------------------------------------
const router = require('express').Router();
const userRoutes = require("./user-routes");
const thoughtRoutes = require("./thought-routes");

router.use("/users", userRoutes);
router.use("/thoughts", thoughtRoutes);

module.exports = router;
