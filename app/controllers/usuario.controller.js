const Usuario = require("../models/usuario.model");

const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

module.exports.inserirUsuario = function(req, res){
    let usuario = new Usuario ({
        nome: req.body.nome,
        email: req.body.email,
        funcao: req.body.funcao,
        senha: bcrypt.hashSync(req.body.senha, 10)
    })

    let promise = Usuario.create(usuario);

    promise.then(
        function(usuario) {
            res.status(201).json({
                id: usuario._id,
                nome: usuario.nome, 
                email: usuario.email,
                funcao: usuario.funcao
            });
        }
    ).catch(
        function(error){
            res.status(400).json(error)
        }
    )
}