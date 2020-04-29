const fs = require('fs');
const pe = require('parse-error');
const DataModel = require('../models/DataModel');


const addData = async function (req, res) {

    try {
        if (!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {

            const dataFile = new DataModel(req);
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
        const isDataExist = await DataModel.isDataExist(req.params.dataID);
        if (!isDataExist) {
            res.send({
                status: false,
                message: 'File Not Exist'
            });
        }
        else {
            const destination = DataModel.generatePath(req.params.dataID);
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
        const isDataExist = await DataModel.isDataExist(req.params.dataID);
        if (!req.files || !isDataExist) {
            res.send({
                status: false,
                message: 'No file updated'
            });
        }
        else {
            const dataFile = new DataModel(req);
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
        const isDataExist = await DataModel.isDataExist(req.params.dataID);
        if (!isDataExist) {
            res.send({
                status: false,
                message: 'File Not Exist'
            });
        }
        else {
            const destination = DataModel.generatePath(req.params.dataID);
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


