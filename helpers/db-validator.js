const Role = require('../models/rol.model');
const Usuario = require('../models/usuario.model')

const esRolValido = async(rol ='')=>{
    const existeRol = await Role.findOne({rol});
    if (!existeRol) {
        throw new Error (`El rol ${rol} no esta registrado en la bd`)
    }
}

const emailExiste =  async (correo = '') =>{
    const existeEmail = await Usuario.findOne({correo});
    if (existeEmail) {
        throw new Error (`El email ${correo} ya está registrado`);
    }
}

const existeUsuarioPorID = async (id = '')=>{
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error (`El ID ${id} no está registrado`);
    }
}



module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorID
}