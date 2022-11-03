const controller = require("../controllers/consulta.controller");

const auth = require("../controllers/auth.controller");

module.exports = function(app){
    app.post("/consultas", controller.inserirConsulta);
    app.get("/consultas", controller.listarConsulta);
}