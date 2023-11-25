const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('./models.js').ModeloLogins;

const { ModeloLogins, ModelopHSaves, ModeloAlertas, ModeloRegs } = require('./models')

{ // Login
    router.post('/register', async (req, res) => {
        try {
            const { user, password } = req.body;

            // Verifique se o usuário já existe no banco de dados
            const existingUser = await User.findOne({ user });

            if (existingUser) {
                return res.status(400).json({ message: 'Usuário já registrado.' });
            }

            // Hash da senha antes de salvar no banco de dados
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new User({ user, password: hashedPassword });
            await newUser.save();

            res.status(200).json({ message: 'Registro bem-sucedido.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao registrar usuário.' });
        }
    });

    router.post('/login', async (req, res) => {
        try {
            const { user, password } = req.body;

            const userRecord = await User.findOne({ user });

            if (!userRecord) {
                return res.status(401).json({ message: 'Usuário não encontrado.' });
            }

            const passwordMatch = await bcrypt.compare(password, userRecord.password);

            if (!passwordMatch) {
                return res.status(401).json({ message: 'Senha incorreta.' });
            }

            res.status(200).json({ message: 'Login bem-sucedido.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao fazer login.' });
        }
    });

    router.get('/login', async (req, res) => {
        try {
            const logins = await ModeloLogins.find();
            res.status(200).json(logins);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao buscar dados.' });
        }
    });
}

{ // Alertas
    router.post('/alertas', async (req, res) => {
        try {
            const { alert, timestamp } = req.body;
            const model = new ModeloAlertas({ alert, timestamp });
            await model.save();
            res.status(200).json({ message: 'Dados enviados com sucesso!' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao enviar dados.' });
        }
    }
    );

    router.get('/alertas', async (req, res) => {
        try {
            const alertas = await ModeloAlertas.find();
            res.status(200).json(alertas);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao buscar dados.' });
        }
    });
}

{ // Registros
    router.post('/registros', async (req, res) => {
        try {
            const { log, timestamp } = req.body;
            const model = new ModeloRegs({ log, timestamp });
            await model.save();
            res.status(200).json({ message: 'Dados enviados com sucesso!' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao enviar dados.' });
        }
    }
    );

    router.get('/registros', async (req, res) => {
        try {
            const alertas = await ModeloRegs.find();
            res.status(200).json(alertas);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao buscar dados.' });
        }
    });
}

{ // pH
    router.post('/savePH', async (req, res) => {
        try {
            const { value, timestamp } = req.body;
            const model = new ModelopHSaves({ value, timestamp });
            await model.save();
            res.status(200).json({ message: 'Dados enviados com sucesso!' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao enviar dados.' });
        }
    }
    );

    router.get('/savePH', async (req, res) => {
        try {
            const phData = await ModelopHSaves.find(); 
            res.status(200).json(phData); 
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao buscar dados.' });
        }
    });
}

module.exports = router;