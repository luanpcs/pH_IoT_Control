const mongoose = require('mongoose')

const ModeloDataLog = new mongoose.Schema
    (
        {
            user: { type: String },
            password: { type: String },
        }
    );

const ModeloLogin = new mongoose.Schema
    (
        {
            user: { type: String },
            password: { type: String },
        }
    );

const ModeloDevice = new mongoose.Schema
    (
        {
            id: { type: String },
        }
    );

const ModeloLogins = mongoose.model('login', ModeloLogin);
const ModeloDevices = mongoose.model('device', ModeloDevice); 
const ModeloDataLogs = mongoose.model('dataLog', ModeloDataLog); 

module.exports = {ModeloLogins, ModeloDevices, ModeloDataLogs};


