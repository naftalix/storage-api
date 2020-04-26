const fs = require('fs');
const pe = require('parse-error');
const path = require('path');
const utils = require('util');
const CONFIG = require('../config/appConfig');
const { v4: uuidv4 } = require('uuid');
const _ = require('lodash');

const getDataPath = (dataId) => {
    var dataPath = path.join(__dirname, '../../', CONFIG.STORAGEPATH, dataId);
    return dataPath;
}

const createDataFile = (req) => {
    const file = _.values(req.files)[0];
    var id = req.params.dataID;
    const uuid = id ? id : uuidv4();
    return { data: file, dataId: uuid };
}


const getStoragedFile = async (req) => {
    const dataId = req.params.dataID;
    const destination = getDataPath(dataId);

    var isFileExist = await utils.promisify(fs.exists)(destination);
    if(isFileExist){
        return destination;
    }
    return null;
}

const addData = async function (req, res) {

    try {
        if (!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {

            const dataFile = createDataFile(req);
            const destination = getDataPath(dataFile.dataId);
            await dataFile.data.mv(destination);
            console.log(`File uuid ${dataFile.dataId} saves successfully`);

            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    id: dataFile.dataId,
                    mimetype: dataFile.data.mimetype,
                    size: dataFile.data.size
                }
            });
        }

    } catch (err) {
        console.log("Internal Error", pe(err));
        res.status(500).send("Internal Error");
    }
}

const getData = async function (req, res) {

    try {
        const destination = await getStoragedFile(req);
        if (!destination) {
            res.send({
                status: false,
                message: 'File Not Exist'
            });
        }
        else {
            const data = await fs.promises.readFile(destination);
            console.log(`File uuid ${req.params.dataID} retrieved successfully`);
            res.writeHead(200, {
                "Content-Type": "application/octet-stream",
                "Content-Disposition": `attachment; filename=${req.params.dataID}`
            });
            res.write(data);
            res.end();
            console.log(`File uuid ${req.params.dataID} sent successfully`);

        }
    } catch (err) {
        console.log("Internal Error", pe(err));
        res.status(500).send("Internal Error");
    }
}

const updateData = async function (req, res) {

    try {
        const destination = await getStoragedFile(req);
        if (!req.files || !destination) {
            res.send({
                status: false,
                message: 'No file updated'
            });
        }
        else {
            const dataFile = createDataFile(req);
            await dataFile.data.mv(destination);
            console.log(`File uuid ${dataFile.dataId} updated successfully`);
            res.send({
                status: true,
                message: 'File is updated',
                data: {
                    id: dataFile.dataId,
                    size: dataFile.data.size
                }
            });
        }
    } catch (err) {
        console.log("Internal Error", pe(err));
        res.status(500).send("Internal Error");
    }
}

const deleteData = async function (req, res) {

    try {
        const destination = await getStoragedFile(req);
        if (!destination) {
            res.send({
                status: false,
                message: 'File Not Exist'
            });
        }
        else {
            await fs.promises.unlink(destination);
            console.log(`File uuid ${req.params.dataID} deleted successfully`);
            res.send({
                status: true,
                message: 'File is deleted',
                data: {
                    id: dataFile.dataId,
                    size: dataFile.data.size
                }
            });
        }
    } catch (err) {
        console.log("Internal Error", pe(err));
        res.status(500).send("Internal Error");
    }
}

module.exports.addData = addData;
module.exports.getData = getData;
module.exports.updateData = updateData;
module.exports.deleteData = deleteData;


