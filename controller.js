import { createUser } from './databaseFunctions.js';

export const createUserApi = (req, res) => {
    // Logic to create a user
    const { name, email } = req.body;
    createUser(name, email).then(userId => {
        res.status(200).json({ id: userId, name, email });
    }).catch(err => {
        res.status(500).json({ error: err.message });
    });
}