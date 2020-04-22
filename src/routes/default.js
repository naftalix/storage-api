const express = require('express'); 
const router = express.Router();

router.get('/', function (req, res) {
    res.statusCode = 200;//send the appropriate status code
    res.json({ status: "success", message: "Storage API", data: {} })
});

module.exports = router;
