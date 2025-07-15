const path = require("path");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const client = new PrismaClient();

class usuarioController {
    static async cadastrar(req, res) {
        
        console.log(req.body);

        const { nome, email, senha } = req.body;

        const jaexiste = await client.usuario.findUnique({
            where: { email: email},
        });

        if (jaexiste == null) {
            const salt = bcryptjs.genSaltSync(8);
        const hashSenha = bcryptjs.hashSync(senha, salt);

     
        const usuario = await client.usuario.create({
            data: {
                nome,
                email,
                senha: hashSenha,
            },
        });

        res.json({
            usuarioId: usuario.id,
        });
    }
    else {
        res.json(
            "email já existe"
        );
    }
        

    }

    static async login(req, res) {
        const { email, senha } = req.body;

        const usuario = await client.usuario.findUnique({
            where: { email: email},
        });

        if (usuario == null) {
            return res.json({
                msg: "Usuário não encontrado!",
            });
        }

        const senhaCorreta = bcryptjs.compareSync(senha, usuario.senha);

        if (!senhaCorreta) {
            res.json({
                msg: "Senha incorreta!",
            });
            return
        }

        const token = jwt.sign({ id: usuario.id }, process.env.SENHA_SERVIDOR, { expiresIn: "2h" });
        res.json({
            msg: "Autenticado!",
            token: token,
        });
    }

    static async verificaAutenticacao(req, res, next){
        const authHeader = req.headers["authorization"];
        if(authHeader){
            const token  = authHeader.split(" ")[1];

            jwt.verify(token, process.env.SENHA_SERVIDOR, (err, payload) =>{
            if(err){
                return res.json({
                msg: "token invalido"
            });
            }
            req.usuarioId = payload.id;
            next();
        })
        return
        }
        res.json({
            msg: "token não encontrado"
        });

        
    }
    static async verificaAdmin(req, res, next){
        if (req.usuarioId == null ) {
            return res.json({
            msg: "Você não esstá autenticado"
        });
        }

        const usuario = await client.usuario.findUnique({
        where: {
            id: req.usuarioId,
        },
    })
    if (!usuario.isAdmin) {
        res.json({
        msg: 
        "Acesso negado, você não é admin",
    });
    }

    next()
        
    }
}

module.exports = usuarioController