const express = require('express'); 
const router = express.Router();

router.get('/how-to-use', (req, res) => {
     res.send('How to use');
});

module.exports = router;
