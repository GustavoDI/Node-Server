const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario.model')

const validarJWT = async (req = request, res = response, next)=>{
    const token =  req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        // leyendo el usuario que corresponde al uid 
        // esta parte significa que se encuentra un usuario
        const usuario = await Usuario.findById(uid);
        // console.log( 'mostrando datos del usuario',usuario); // ok
        //  si no existe el usuario
        if (!usuario) {
            return res.status(401).json({
                msg:' Token no valido - usuario no existe'
            })
        }
        
        if (!usuario.estado) {
            return res.status(401).json({
                msg:' Token no valido - usuario estado false'
            })
        }
        req.usuario = usuario;

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg:' Token no válido catch'
        });
    }
    // console.log(token);
    
}

module.exports = {
    validarJWT
}