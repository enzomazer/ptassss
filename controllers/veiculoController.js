const path = require("path")

class veiculoController {
    static formCadastro(req, res) {
        res.sendFile(path.join(__dirname, "../", "views", "formVeiculo.html"));
    }

    static cadastrar(req, res) {
        const {modelo,placa,ano,cor} = req.body

        const veiculo = client.veiculo.create({data:{
            modelo,
            placa,
            ano parseInt(ano),
            cor
        }})
        res.send(veiculo.id)
    }

    static buscarTodos(req, res) {}
}

module.exports = veiculoController;
