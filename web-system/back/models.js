const mongoose = require('mongoose')

const ModeloAlerta = new mongoose.Schema
    (
        {
            alert: { type: String },
            timestamp: { type: String },
        }
    );

const ModeloReg = new mongoose.Schema
    (
        {
            log: { type: String },
            timestamp: { type: String },
        }
    );

const ModeloLogin = new mongoose.Schema
    (
        {
            user: { type: String },
            password: { type: String },
        }
    );

const ModeloAlertas = mongoose.model('alertas', ModeloAlerta);
const ModeloRegs = mongoose.model('registros', ModeloReg);
const ModeloLogins = mongoose.model('login', ModeloLogin);

module.exports = { ModeloLogins, ModeloAlertas, ModeloRegs };


