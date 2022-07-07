const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const model = require('../models')
const User = model.onboarding
const {
    UnauthenticatedError
} = require('../errors')

const currentUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async(err, decodedToken) => {
            if (err) {
                UnauthenticatedError('Not Authorized')
                req.user = null;
                next();
            } else {
                let user = await User.findOne({
                    where: {
                        id: decodedToken.id
                    }
                });
                req.user = user;
                next();
            }
        });
    } else {
        req.user = null;
        next();
    }
};

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({
        id
    }, process.env.JWT_SECRET, {expiresIn: maxAge});
};

const comparePassword = async (candidatePassword, user) => {
    const isMatch = await bcrypt.compare(candidatePassword, user.password)
    return isMatch
}

const hash = parseInt(process.env.ENCRYPTION_NUMBER);
const hashPassword = async (pwd) => {
    const salt = await bcrypt.genSalt(hash);
    return await bcrypt.hash(pwd, salt);
};

module.exports = {
    currentUser,
    createToken,
    comparePassword,
    hashPassword
}