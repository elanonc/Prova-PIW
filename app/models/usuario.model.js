const mongoose = require("mongoose");

module.exports = function(){
    let schema = mongoose.Schema({
        nome: {
            type: String,
            required: true
        },
        email: {
            type: String,
            require:true
        },
        funcao: {
            type: Number,
            require:true
        },
        senha: {
            type: String,
            require:true
        }
    });
    return mongoose.model("Usuario", schema);
}();