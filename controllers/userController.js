const userModel = require('../models/user');
const Joi = require('joi');

async function register(req, res) {
    const schema = Joi.object({
        name: Joi.string().required(),
        username: Joi.string().required(),
        profile_picture: Joi.string().dataUri().max(5000000),
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { name, username, profile_picture } = req.body;

    const user = await userModel.where('username', '==', username).get();
    if (!user.empty) return res.status(400).send('Username already exists');

    const newUser = await userModel.add({ name, username, profile_picture });
    res.status(201).send(newUser.id);
}

async function getUser(req, res) {
    const user = await userModel.doc(req.params.id).get();
    if (!user.exists) return res.status(404).send('User not found');
    res.send(user.data());
}

async function updateUser(req, res) {
    const user = await userModel.doc(req.params.id).get();
    if (!user.exists) return res.status(404).send('User not found');
    await userModel.doc(req.params.id).update(req.body);
    res.send('User updated');
}

module.exports = {
    register,
    getUser,
    updateUser
};
