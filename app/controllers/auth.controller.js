const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario.model");

module.exports.logar = function(req, res){
    Usuario.findOne({email: req.body.email})
        .then(
            function(usuarios){
                if(bcrypt.compareSync(req.body.senha, usuarios.senha)){
                    let token = jwt.sign({usuarios: usuarios}, "secret");
                    console.log(token);
                    res.status(201).json({
                        id: usuarios._id,
                        funcao: usuarios.funcao,
                        token: token
                    });
                } else {
                    res.status(401).send("Login Inválido");
                }
        }).catch(
            function(error){
                res.status(401).send("Login Inválido");
            })
}

module.exports.checar = function(req, res, next){
    let token = req.headers.token;
    jwt.verify(token, "secret", function(err, decoded){
        if(err){
            res.status(401).send("Token inválido!")
        } else {
            next();
        }
    })
}