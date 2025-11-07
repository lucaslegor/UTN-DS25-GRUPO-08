import 'dotenv/config';
import cookieParser from "cookie-parser";
import { handleError } from "./middlewares/error.middleware";
import { logRequest } from "./middlewares/logger.middleware";
import usuariosRoutes from './routes/usuario.routes'
import { solicitudesRoutes } from "./routes/solicitudes.routes";
import { polizaRoutes } from "./routes/poliza.routes";
import { productoRoutes } from "./routes/producto.routes";
import { emailRoutes } from "./routes/email.routes";
import authRoutes from './routes/auth.routes'
import express from "express";
import path from 'path';
import cors from "cors";
import morgan from "morgan";

const app = express();
const PORT = process.env.PORT || 3001;

// CORS: permitir múltiples orígenes (p. ej., 5173 y 5174) o configurables por env
const corsOriginsEnv = process.env.CORS_ORIGINS || process.env.FRONTEND_URL || "http://localhost:5173,http://localhost:5174";
const allowedOrigins = corsOriginsEnv.split(',').map((s) => s.trim()).filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // requests sin Origin (p. ej., curl/postman)
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error(`Not allowed by CORS: ${origin}`));
  },
  credentials: true,
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"],
}));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(logRequest);

// Static files for uploaded images and polizas
app.use('/uploads', express.static(path.resolve(process.cwd(), 'uploads')));

app.get('/health', (_req, res) => res.json({ ok: true }));

//AUTH
app.use("/api/auth", authRoutes);

//RUTAS
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/solicitudes", solicitudesRoutes);
app.use("/api/polizas", polizaRoutes);
app.use("/api/productos", productoRoutes);
app.use("/api/email", emailRoutes);


app.use(handleError);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
