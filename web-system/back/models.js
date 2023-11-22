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

const ModeloAlerta = new mongoose.Schema
    (
        {
            alert: { type: String },
            timestamp: { type: String },
        }
    );

const ModeloLogins = mongoose.model('login', ModeloLogin);
const ModeloAlertas = mongoose.model('alertas', ModeloAlerta);
const ModeloDataLogs = mongoose.model('dataLog', ModeloDataLog);

module.exports = { ModeloLogins, ModeloAlertas, ModeloDataLogs };


