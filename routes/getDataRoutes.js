const mongoose = require('mongoose')
const assert = require('assert')
const {StatusCodes} = require('http-status-codes')
const express = require('express');
const router = express.Router();

router.get("/", (_req, res) => {

    try {
        const suggestions = [];

        mongoose.connect(process.env.MONGO_URI, (err, db) => {
            assert.equal(null, err);
            const cursor = db
                .collection('sunsnifferCollection')
                .find()
                .sort({name: 1});
            cursor.forEach((doc, err) => {
                assert.equal(null, err);
                suggestions.push(doc);
            }, () => {
                db.close();
                res
                    .status(StatusCodes.OK)
                    .json(suggestions)
                console.log(suggestions.length)
            });
        })

    } catch (err) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({message: err.message, success: false});
    }
})

module.exports = router