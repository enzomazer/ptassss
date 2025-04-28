const path = require("path")
const { PrismaClient } = require('@prisma/client')

const client = new PrismaClient();

class veiculoController {
    static formCadastro(req, res) {
        res.render("formVeiculo")
    }

    static async cadastrar(req, res) {
        const {modelo,placa,ano,cor} = req.body

        const veiculo = await client.veiculo.create({
            data:{
            modelo,
            cor,
            placa,
            ano: parseInt(ano)
            
        }})
        res.redirect({veiculo})
    }

    static async buscarTodos(req, res) {
        const veiculos = await client.veiculo.findMany({})
        res.render("usuarios")
}}

module.exports = veiculoController;
