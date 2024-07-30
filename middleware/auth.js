const User = require('../models/user');

const authenticate = async (req, res, next) => {
    const userId = req.headers['user-id']; // Simulating authentication via header

    if (!userId) {
        return res.status(401).send('Authentication required');
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(401).send('Invalid user');
        }
        req.user = user;
        next();
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = authenticate;
