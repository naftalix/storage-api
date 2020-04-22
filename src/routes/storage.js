const express = require('express'); 
const router = express.Router();
const storageController = require('../api/storageController');

router.get('/add', (req, res) => { 
    res.send('About me page');
});

router.get('/how-to-use', (req, res) => {
     res.send('How to use');
});

module.exports = router;
