import { Router } from 'express';
import * as controllerUsuario from '../controllers/usuario.controller';

const router = Router();

router.get('/', controllerUsuario.getUsuarios);
router.get('/:id', controllerUsuario.getUsuarioById);
router.post('/', controllerUsuario.createUsuario);
router.put('/:username', controllerUsuario.updateUsuario);
router.delete('/:id', controllerUsuario.deleteUsuario);

export const usuarioRoutes = router;