const mongoose = require('mongoose')

const connectDB = () => {
    return new Promise((resolve, reject) => {

        if (process.env.NODE_ENV === 'test') {
            const Mockgoose = require('mockgoose').Mockgoose;
            const mockgoose = new Mockgoose(mongoose);

            mockgoose
                .prepareStorage()
                .then(() => {
                    mongoose
                        .connect(process.env.MONGO_URI, {useNewUrlParser: true})
                        .then((_res, err) => {
                            if (err) 
                                return reject(err);
                            resolve();
                        })
                })
        } else {
            mongoose
                .connect(process.env.MONGO_URI, {useNewUrlParser: true})
                .then((_res, err) => {
                    if (err) 
                        return reject(err);
                    resolve();
                })
        }

    })
}

const closeDB = () => {
    return mongoose.disconnect();
}

module.exports = {
    connectDB,
    closeDB
}