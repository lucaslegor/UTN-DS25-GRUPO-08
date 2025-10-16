import 'dotenv/config';
import cookieParser from "cookie-parser";
import { handleError } from "./middlewares/error.middleware";
import { logRequest } from "./middlewares/logger.middleware";
import usuariosRoutes from './routes/usuario.routes'
import  pedidoRoutes  from "./routes/pedido.routes";
import { polizaRoutes } from "./routes/poliza.routes";
import { productoRoutes } from "./routes/producto.routes";
import carritoRoutes from './routes/carrito.routes';
import { pagoRoutes } from "./routes/pago.routes";
import authRoutes from './routes/auth.routes'
import express from "express";
import path from 'path';
import cors from "cors";
import morgan from "morgan";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"]
}));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(logRequest);
// Static files for uploaded polizas
app.use('/uploads', express.static(path.resolve(process.cwd(), 'uploads')));
app.get('/health', (_req, res) => res.json({ ok: true }));

//AUTH

app.use("/api/auth", authRoutes);
app.use("/api/usuarios", usuariosRoutes);

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
