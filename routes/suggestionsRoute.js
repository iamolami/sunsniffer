const express = require('express');
const router = express.Router();
const suggestionsCtrl = require('../controllers/suggestionsCtrl');

router.route('/get-data').get(suggestionsCtrl.getData);
router.route('/suggestions').get(suggestionsCtrl.suggestions);

module.exports = router;