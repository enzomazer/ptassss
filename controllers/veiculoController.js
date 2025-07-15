const path = require("path");

const { PrismaClient } = require("@prisma/client");
const client = new PrismaClient();

class veiculoController {

    static async cadastrar(req, res) {

        const { modelo, placa, ano, cor } = req.body;

        const veiculo = await client.veiculo.create({
            data: {
                modelo,
                placa,
                ano:parseInt(ano),
                cor
            }
        });

        res.json({
            veiculoId: veiculo.id,
        });

    }

    static async buscar(req, res) {
        const id = req.params.idveiculo
        let veiculo;

        if(id != null){
            veiculos = await client.veiculo.findMany({
                where: {
                    id: parseInt(id)
                },
            });
        }
        else{
            veiculo = await client.veiculo.findMany({});
        }
        
        res.json({
            veiculo,
        })
    }
}

module.exports = veiculoController