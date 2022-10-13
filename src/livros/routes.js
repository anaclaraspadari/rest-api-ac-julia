const { Router } = require('express');
const router = Router();

const LivrosController = require('./controller');
const {isAuth}=require('../middlewares/isAuth')
const controller = new LivrosController();

router.post('/create', isAuth, (req, res) => controller.create(req, res));
router.post('/insert-livrogen/:id', isAuth, (req, res) => controller.insertLivroGenero(req, res));
router.get('/detail/:id', isAuth, (req, res) => controller.detail(req, res));
router.get('/list', isAuth, (req, res) => controller.list(req, res));
router.put('/update/:id', isAuth, (req, res) => controller.update(req, res));
router.delete('/delete/:id', isAuth, (req, res) => controller.delete(req, res));
router.delete('/delete-livrogen/:id/genero/:generoIdGenero', isAuth, (req, res) => controller.deleteLivroGenero(req, res));

module.exports = router;
