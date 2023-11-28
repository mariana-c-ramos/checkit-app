const tasksModel = require('../models/tasksModel');

const getAll = (req,res) => {
    return res.status(200).json({ message : 'Controller working.'})
};

module.exports = {
    getAll
};