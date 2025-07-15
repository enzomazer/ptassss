const router = require("express").Router();

const veiculoController = require('../controllers/veiculoController');

router.post("/cadastro", veiculoController.cadastrar);

router.get("/todos", veiculoController.buscar);

module.exports = router;