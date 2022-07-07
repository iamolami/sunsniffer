const mongoose = require('mongoose')
const assert = require('assert')
const {StatusCodes} = require('http-status-codes')

const suggestionCtrl = {

    getData: async(req, res, next) => {

        try {
            let results = [];
            mongoose.connect(process.env.MONGO_URI, (err, db) => {
                assert.equal(null, err);
                const cursor = db
                    .collection('sunsnifferCollection')
                    .find();
                cursor.forEach((doc, err) => {
                    assert.equal(null, err);
                    results.push(doc);
                }, () => {
                    db.close();
                    res
                        .status(StatusCodes.OK)
                        .json({results: results})
                });
            })

        } catch (err) {
            return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json({message: err.message, success: false});
        }
    },

    suggestions: async(req, res, next) => {

        try {
            let results = [];
            const q = req.query.q;
            const latitude = req.query.latitude;
            const longitude = req.query.longitude;

            mongoose.connect(process.env.MONGO_URI, async (err, db) => {
                assert.equal(null, err);
                const cursor = await db
                    .collection('sunsnifferCollection')
                    .find({
                        name: {
                            $regex: new RegExp('^' + q + '.*', 'i')
                        },
                        lat: latitude,
                        long: longitude
                    })
                    .sort({name: 1});
                cursor.forEach((doc, err) => {
                    assert.equal(null, err);
                    results.push(doc);
                }, () => {
                    db.close();
                    res
                        .status(StatusCodes.OK)
                        .json({suggestions: results})
                });
            })

        } catch (err) {
            return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json({message: err.message, success: false});
        }
    }
}

module.exports = suggestionCtrl