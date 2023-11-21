const userModel = require('../models/user');
const Joi = require('joi');

async function register(req, res) {
    const schema = Joi.object({
        name: Joi.string().required(),
        username: Joi.string().required(),
        profile_picture: Joi.string().dataUri().max(5000000).allow('').optional(),
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send({ success: false, message: error.details[0].message });

    const { name, username, profile_picture } = req.body;

    const user = await userModel.where('username', '==', username).get();
    if (!user.empty) return res.status(400).send({ success: false, message: 'Username already exists' });

    const userData = { name, username };
    if (profile_picture) userData.profile_picture = profile_picture;

    const newUserRef = await userModel.add(userData);
    const newUserDocument = await newUserRef.get();
    const newUser = { id: newUserDocument.id, ...newUserDocument.data() };

    res.status(201).send({ success: true, message: 'User registered successfully', data: newUser });
}

async function updateUser(req, res) {
    const schema = Joi.object({
        name: Joi.string().optional(),
        username: Joi.string().optional(),
        profile_picture: Joi.string().dataUri().max(5000000).allow('').optional(),
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send({ success: false, message: error.details[0].message });

    const user = await userModel.doc(req.params.id).get();
    if (!user.exists) return res.status(404).send({ success: false, message: 'User not found' });

    const updateData = { ...req.body };
    if (updateData.profile_picture === undefined) delete updateData.profile_picture;

    await userModel.doc(req.params.id).update(updateData);
    const updatedUserDocument = await userModel.doc(req.params.id).get();
    const updatedUser = { id: updatedUserDocument.id, ...updatedUserDocument.data() };

    res.send({ success: true, message: 'User updated successfully', data: updatedUser });
}

async function getUser(req, res) {
    const user = await userModel.doc(req.params.id).get();
    if (!user.exists) return res.status(404).send({ success: false, message: 'User not found' });
    res.send({ success: true, message: 'User data fetched successfully', user: user.data() });
}

module.exports = {
    register,
    getUser,
    updateUser
};
