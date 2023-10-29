const { Timestamp } = require('mongodb');
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

const ModeloConfigs = new mongoose.Schema
    (
        {
            hora: {type: String, required: true},
            data: {type: Date, required: true},
            local: {type: String, required: true}
        }
    );

const ModeloLogins = mongoose.model('login', ModeloLogin);
const ModeloDevices = mongoose.model('device', ModeloDevice); 
const ModeloDataLogs = mongoose.model('dataLog', ModeloDataLog); 
const ModeloConfiguracoes = mongoose.model('configuracoes', ModeloConfigs);

module.exports = {ModeloLogins, ModeloDevices, ModeloDataLogs, ModeloConfiguracoes};


