import { handleError } from "./middlewares/error.middleware";
import { logRequest } from "./middlewares/logger.middleware";
import {usuarioRoutes} from '../src/routes/usuario.routes'
import {pedidoRoutes} from '../src/routes/pedido.routes'

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')


const app = express();
const PORT = process.env.PORT;


//Middlwares
app.use(cors({
  origin: '*', // Permitir todas las solicitudes CORS
}));
app.use(express.json());
app.use(morgan('dev'))
app.use(logRequest);
app.use(handleError);

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/pedidos', pedidoRoutes);


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});