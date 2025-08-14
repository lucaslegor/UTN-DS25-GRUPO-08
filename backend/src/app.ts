import { handleError } from "./middlewares/error.middleware";
import { logRequest } from "./middlewares/logger.middleware";
import { usuarioRoutes } from "../src/routes/usuario.routes";
import { pedidoRoutes } from "../src/routes/pedido.routes";
import { polizaRoutes } from "../src/routes/poliza.routes"; 

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "*", // Permitir todas las solicitudes CORS
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(logRequest);

app.use("/api/usuarios", usuarioRoutes);
app.use("/api/pedidos", pedidoRoutes);
app.use("/api/polizas", polizaRoutes); 

app.use(handleError);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
