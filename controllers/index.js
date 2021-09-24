const router = require("express").Router();

const apiRoutes = require("./api");
const homeRoutes = require("./homeRoutes");
const profileRoutes = require("./profileRoutes");


// router.use('/', homeRoutes);
// router.use('/api', apiRoutes);
// router.use('/', profileRoutes);

module.exports = router;
