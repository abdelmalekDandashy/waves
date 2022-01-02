const {
    User
} = require('../models/user');
require('dotenv').config();

const {
    Strategy: JwtStrategy,
    ExtractJwt
} = require('passport-jwt');

const jwtOptions = {
    secretOrKey: process.env.DB_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

const jwtVerify = async (payload, done) => {
    try {
        const user = await User.findById(payload.sub);
        if (!user) {
            console.log('no user');
            return done(null, false)
        }
        console.log('user');
        done(null, user)
    } catch (error) {
        console.log('error');
        done(error, false)
    }
}


const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify)

module.exports = {
    jwtStrategy
}