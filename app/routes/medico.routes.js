const controller = require("../controllers/medico.controller");

module.exports = function(app){
    app.post("/medicos", controller.inserirMedico);
    app.get("/medicos/:id/consultas", controller.listarConsultasDoMedico);
}