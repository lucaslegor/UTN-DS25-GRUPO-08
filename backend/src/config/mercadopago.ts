import mercadopago from "mercadopago";
import dotenv from "dotenv";

dotenv.config();

mercadopago.configurations.setAccessToken(process.env.MERCADOPAGO_ACCESS_TOKEN);

export default mercadopago;
