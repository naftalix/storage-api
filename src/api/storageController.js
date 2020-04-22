const fs = require('fs');
const path = require('path');
const CONFIG = require('../config/appConfig');
const { v4: uuidv4 } = require('uuid');

const getDataPath = (dataId) => {
    var dataPath = path.join(__dirname,CONFIG.STORAGEPATH,dataId);
    return dataPath;
}

const getBodyData = (req) => {
    
}

const addData = async function (data) {

    try {
        const dataId = uuidv4();
        const destination = getDataPath(dataId);
        await fs.promises.writeFile(destination, data);
        console.log(`File uuid ${dataId} saves successfully`);
        return uuid;

    } catch (err) {
        console.error(err);        
    }
}

const getData = async function (dataId) {

    try {
        const destination = getDataPath(dataId);
        const data = await fs.promises.readFile(destination);
        console.log(`File uuid ${dataId} retrieved successfully`);
        return data;

    } catch (err) {
        console.error(err);        
    }
}

const updateData = async function (dataId, data) {

    try {
        const destination = getDataPath(dataId);
        await fs.promises.writeFile(destination, data);
        console.log(`File uuid ${dataId} updated successfully`);

    } catch (err) {
        console.error(err);        
    }
}

const deleteData = async function (dataId) {

    try {
        const destination = getDataPath(dataId);
        const data = await fs.promises.unlink(destination);
        console.log(`File uuid ${dataId} deleted successfully`);
    } catch (err) {
        console.error(err);        
    }
}

module.exports.addData = addData;
module.exports.getData = getData;
module.exports.updateData = updateData;
module.exports.deleteData = deleteData;


const create = async function (req, res) {
    const body = req.body;

    if (!body.unique_key && !body.email && !body.phone) {
        return ReE(res, 'Please enter an email or phone number to register.');
    } else if (!body.password) {
        return ReE(res, 'Please enter a password to register.');
    } else {
        let err, user;

        [err, user] = await to(authService.createUser(body));

        if (err) return ReE(res, err, 422);
        return ReS(res, { message: 'Successfully created new user.', user: user.toWeb(), token: user.getJWT() }, 201);
    }
}

const get = async function (req, res) {
    let user = req.user;

    return ReS(res, { user: user.toWeb() });
}

const update = async function (req, res) {
    let err, user, data
    user = req.user;
    data = req.body;
    user.set(data);

    [err, user] = await to(user.save());
    if (err) {
        if (err.message == 'Validation error') err = 'The email address or phone number is already in use';
        return ReE(res, err);
    }
    return ReS(res, { message: 'Updated User: ' + user.email });
}

const remove = async function (req, res) {
    let user, err;
    user = req.user;

    [err, user] = await to(user.destroy());
    if (err) return ReE(res, 'error occured trying to delete user');

    return ReS(res, { message: 'Deleted User' }, 204);
}
