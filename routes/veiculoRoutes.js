const express = require("express")
const router = express.Router()
const veiculoController = require("../controllers/veiculoController.js")

router.get("/cadastro", veiculoController.formCadastro);

router.post("/cadastro", veiculoController.cadastrar);

router.get("/todos", veiculoController.buscarTodos)

module.exports = router
