import { Router } from "express";
import { login } from "../services/auth.service";
import { validate } from "../middlewares/validation.middleware";
import { loginSchema } from "../validations/auth.validation";

const router = Router();

router.post("/login", validate(loginSchema), async (req, res, next) => {
  try {
    const result = await login(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

export default router;
