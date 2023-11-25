const mongoose = require('mongoose')

const ModeloLogin = new mongoose.Schema
    (
        {
            user: { type: String },
            password: { type: String },
        }
    );

const ModelopHSave = new mongoose.Schema
    (
        {
            value: { type: Number },
            timestamp: { type: String },
        }
    );

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


const ModeloLogins = mongoose.model('login', ModeloLogin);
const ModelopHSaves = mongoose.model('pHSave', ModelopHSave);
const ModeloAlertas = mongoose.model('alertas', ModeloAlerta);
const ModeloRegs = mongoose.model('registros', ModeloReg);

module.exports = { ModeloLogins, ModelopHSaves, ModeloAlertas, ModeloRegs };

