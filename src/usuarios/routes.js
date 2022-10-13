const { Router } = require('express');
const { isAuth } = require('../middlewares/isAuth');
const router = Router();

const UsuariosController = require('./controller');
const usersController = new UsuariosController();

router.post('/create', (req, res) => usersController.create(req, res));
router.post('/auth', (req, res) => usersController.auth(req, res));
router.get('/list', (req, res) => usersController.list(req, res));
router.get('/profile', isAuth, (req, res) => usersController.profile(req, res));

module.exports = router;