const Role = require('../models/rol.model');

const esRolValido = async(rol ='')=>{
    const existeRol = await Role.findOne({rol});
    if (!existeRol) {
        throw new Error (`El rol ${rol} no esta registrado en la bd`)
    }
}

module.exports = {
    esRolValido
}