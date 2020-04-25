const express = require('express'); 
const router = express.Router();
const storageController = require('../api/storageController');

router.get('/:dataID', storageController.getData);
router.post('/store', storageController.addData);
router.put('/:dataID', storageController.updateData);
router.delete('/:dataID', storageController.deleteData);

module.exports = router;
