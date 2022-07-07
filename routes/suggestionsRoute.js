const express = require('express');
const router = express.Router();
const suggestionsCtrl = require('../controllers/suggestionsCtrl');

router.route('/get-data').get(suggestionsCtrl.getData);

module.exports = router;