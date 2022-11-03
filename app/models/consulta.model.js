let mongoose = require("mongoose");

module.exports = function(){
    let schema = mongoose.Schema({
        uid: { // id do usuario
            type: String,
            required: true
        }, 
        mid: { // id do medico
            type: String,
            required: true
        },
    });
    return mongoose.model("Consulta", schema);
}();