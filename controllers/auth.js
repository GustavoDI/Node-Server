const bcryptjs = require("bcryptjs");
const Usuario = require('../models/usuario.model');
const { response } = require("express");
const { generarJWT } = require("../helpers/generar-jwt");

const login = async (req, res = response)=>{

    const { correo, password} = req.body;

    try {
        // verificar si email existe
        const usuario = await Usuario.findOne({correo});
        if (!usuario) {
            return res.status(400).json({
                msg:'Usuario o password no es valido.'
            });
        }
        // usuario activo
        if (usuario.estado === false) {
            return res.status(400).json({
                msg:'Usuario o password no son correctos  - estado false'
            });
        }
        // verificar contraseña
        const validarPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validarPassword) {
            return res.status(400).json({
                msg:'Usuario o password no son correctos  - password'
            });
        }
        // crar JWT
        const token  = await generarJWT(usuario.id);


        res.json({
            msg:"login ok",
            usuario,
            token
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:'Hable con el administrador'
        })
    }

}

module.exports = {
    login
}