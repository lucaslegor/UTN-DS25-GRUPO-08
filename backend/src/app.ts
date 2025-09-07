import { handleError } from "./middlewares/error.middleware";
import { logRequest } from "./middlewares/logger.middleware";
import {usuariosRoutes} from './routes/usuario.routes'
import { pedidoRoutes } from "./routes/pedido.routes";
import { polizaRoutes } from "./routes/poliza.routes";
import { productoRoutes } from "./routes/producto.routes";
import carritoRoutes from './routes/carrito.routes';
import { pagoRoutes } from "./routes/pago.routes";

import 'dotenv/config';
import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json()); 
app.use(morgan("dev"));
app.use(logRequest);
app.get('/health', (_req, res) => res.json({ ok: true }));

//RUTAS
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/pedidos", pedidoRoutes);
app.use("/api/polizas", polizaRoutes);
app.use("/api/productos", productoRoutes);
app.use('/api/cart', carritoRoutes);
app.use('/api/pagos', pagoRoutes);


app.use(handleError);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
