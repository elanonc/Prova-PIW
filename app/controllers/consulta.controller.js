const Consulta = require("../models/consulta.model");
const Usuario = require("../models/usuario.model");

const jwt = require("jsonwebtoken");

module.exports.inserirConsulta = function(req, res){

    let token = req.headers.token;
    let payload = jwt.decode(token);

    // let promise = Consulta.create({
    //     uid: req.body.uid,
    //     mid: req.body.mid
    // });

    if(payload.usuarios.funcao == 1){
        let promise = Consulta.create({
            uid: req.body.uid,
            mid: req.body.mid
        });

        promise.then(
            function(consulta_){
                Usuario.findById(consulta_.uid).exec().then(
                    function(usuario){
                        console.log(usuario);
                        if(usuario.funcao == 2){
                            res.status(201).json({
                                id_consulta: consulta_._id,
                                id_usuario: consulta_.uid,
                                id_medico: consulta_.mid
                            });
                        } else {
                            res.status(403).json("Não autorizado!!!");
                        }
                    }
                ).catch(
                    function(error){
                    res.status(404).json("Usuario não encontrado!");
                });
            }
        ).catch(function(error){
            res.status(404).json("Usuario não encontrado!");
        })
    } else{
        res.status(403).json("Não autorizado!!!");
    }
} 

module.exports.listarConsulta = function(req, res){
    let token = req.headers.token;
    let payload = jwt.decode(token);

    if(payload.usuarios.funcao == 1){
        let promise = Consulta.find().exec();
        promise.then(
            function(consultas){
                res.status(200).json(consultas);
            }
        ).catch(
            function(error){
                res.status(400).json(error);
        })
    } else {
        let promise = Consulta.find({uid: payload.usuarios.uid}).exec();
        promise.then(
            function(consultas){
                res.status(200).json(consultas);
            }
        ).catch(
            function(error){
                res.status(400).json(error);
            }
        )
    }
}
