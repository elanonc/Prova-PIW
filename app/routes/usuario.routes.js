const controller = require("../controllers/usuario.controller");

const auth = require("../controllers/auth.controller");

module.exports = function(app){
    app.post("/usuarios/signin", auth.logar);
    app.post("/usuarios", controller.inserirUsuario);
}