const Medico = require("../models/medico.model");
const Consulta = require("../models/consulta.model");

const jwt = require("jsonwebtoken");

module.exports.inserirMedico = function(req, res){
    let medico = new Medico ({
        nome: req.body.nome,
        crm: req.body.crm
    })

    let promise = Medico.create(medico);

    promise.then(
        function(medico) {
            res.status(201).json({
                id_medico: medico._id,
                nome: medico.nome, 
                crm: medico.crm
            });
        }
    ).catch(
        function(error){
            res.status(400).json(error)
        }
    )
}

module.exports.listarConsultasDoMedico = function(req, res) {
    let id_medico = req.params.id;
    
    let token = req.headers.token;
    let payload = jwt.decode(token);

    console.log(payload.usuarios.funcao);

    if(payload.usuarios.funcao == 1){
        let promise = Consulta.find({mid: id_medico}).exec();
        promise.then(
            function(consultas){
                res.status(200).json(consultas);
            }
        ).catch(
            function(error){
                res.status(400).json(error);
            }
        )
    } else {
        res.status(403).json("Não autorizado!!!");
    }
}