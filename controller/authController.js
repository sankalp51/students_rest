const bcrypt = require('bcrypt');
const User = require('../model/userModel');

const authenticateUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email) {
            return res.status(404).send('valid email is required');
        }
        else if (!password) {
            return res.status(401).send('password is required');
        }

        const emailExists = await User.findOne({ Email: email });
        if (!emailExists) return res.status(400).send('no such account exists');

        const validPassword = await bcrypt.compare(password, emailExists.Password);
        if (!validPassword) {
            return res.status(401).send('invalid password');
        }

        res.status(200).send('login successful!');
    }
    catch (err) {
        res.status(500).send('internal server error');
    }

}

const registerUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email) {
            return res.status(400).send('valid email is required');
        }
        else if (!password) {
            return res.status(500).send("password is required");
        }

        const existsEmail = await User.findOne({ Email: email });
        if (existsEmail) return res.status(400).send('email already exists');

        const pwd = await bcrypt.hash(password, 10);
        const user = new User({
            Email: email,
            Password: pwd,
            RegisterDate: new Date().toLocaleDateString()
        });

        await user.save();
        res.status(200).send('new user successfully created');

    }
    catch (err) {

    }
}

module.exports = { authenticateUser, registerUser };