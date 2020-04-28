const fs = require('fs');
const path = require('path');
const utils = require('util');
const CONFIG = require('../config/appConfig');
const { v4: uuidv4 } = require('uuid');
const _ = require('lodash');


class DataModel{

    constructor(req){
        const dataFile = createDataFile(req);
        this.data = dataFile.data;
        this.dataId = dataFile.dataId;
        this.dataPath = dataFile.dataPath;
    }
    
    get destination(){
        return this.dataPath;
    }

    set destination(dataId){
        const dataPath = generatePath(dataId);  
        this.dataPath = dataPath;
    }

    static createDataFile = (req) => {
        const file = _.values(req.files)[0];
        const id = req.params.dataID;
        const dataId = id ? id : uuidv4();
        const dataPath = generatePath(dataId);

        return { 
            data: file,
            dataId: dataId,
            dataPath: dataPath
         };
    }

    static generatePath = (dataId) => {
        var dataPath = path.join(__dirname, '../../', CONFIG.STORAGEPATH, dataId);
        return dataPath;
    }    

    static isDataExist = async (dataId) => {
        const dataPath = generatePath(dataId);  
        var isFileExist = await utils.promisify(fs.exists)(dataPath);
        if(isFileExist){
            return true;
        }
        return false;
    }
}

module.exports = DataModel