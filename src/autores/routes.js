const { Router } = require('express');
const router = Router();

const AutorController = require('./controller');
const {isAuth}=require('../middlewares/isAuth');
const controller = new AutorController();

router.post('/create', isAuth, (req, res) => controller.create(req, res));
router.get('/detail/:id', isAuth, (req, res) => controller.detail(req, res));
router.get('/list', isAuth, (req, res) => controller.list(req, res));
router.put('/update/:id', isAuth, (req, res) => controller.update(req, res));
router.delete('/delete/:id', isAuth, (req, res) => controller.delete(req, res));

module.exports = router;
