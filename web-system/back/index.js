const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const router = require('./routes')

const URI_MONGO = "mongodb+srv://admin:admin@phcontroler.hcykjja.mongodb.net/?retryWrites=true&w=majority"
const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors())

mongoose.connect(URI_MONGO)
  .then(() => console.log("Conectado ao banco"))
  .catch(err => console.log(err))

app.use(router);

app.listen(port, () => {
  console.log(`Servidor em execução na porta ${port}`);
});