const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('./models.js').ModeloLogins;

const { ModeloDevices, ModeloLogins, ModeloDataLogs } = require('./models')
{
    router.post('/devices', async (req, res) => {
        try {
            const {alert, dec} = req.body;
            const model = new ModeloDevices({alert, dec});
            console.log(model)
            await model.save();
            res.status(200).json({ message: 'Dados enviados com sucesso!' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao enviar dados.' });
        }
    }
    );

    router.get('/devices', async (req, res) => {
        try {
            const devices = await ModeloDevices.find(); 
            res.status(200).json(devices); 
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao buscar dados.' });
        }
    });
}

{ // phDatas
    router.post('/savePH', async (req, res) => {
        try {
            const {id} = req.body;
            const model2 = new ModeloDevices({id});
            console.log(model2)
            await model2.save();
            res.status(200).json({ message: 'Dados enviados com sucesso!' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao enviar dados.' });
        }
    }
    );

    router.get('/savePH', async (req, res) => {
        try {
            const phData = await ModeloDataLogs.find(); // Recupere todos os registros do modelo
            res.status(200).json(phData); // Envie a lista de dispositivos como resposta
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao buscar dados.' });
        }
    });
}

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
}

/* router.get('/login', async (req, res) => {
    try {
        const logins = await ModeloLogins.find();
        res.status(200).json(logins); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar dados.' });
    }
}); */





module.exports = router;