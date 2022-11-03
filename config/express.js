let express = require("express")
let routes_usuarios = require("../app/routes/usuario.routes");
let routes_medicos = require("../app/routes/medico.routes");
let routes_consultas = require("../app/routes/consulta.routes");

function setup(){
    let app = express();
    app.set("port", 3000);
    app.use(express.static('./public'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    routes_usuarios(app);
    routes_medicos(app);
    routes_consultas(app);
    return app;
}

module.exports.setup = setup;   