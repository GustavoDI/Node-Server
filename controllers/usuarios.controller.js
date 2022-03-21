const { response, request } = require('express');
const Usuario = require('../models/usuario.model');
const bcrypt = require('bcryptjs');
const bcryptjs = require('bcryptjs');

const usuariosGet = (req =  request, res = response) => {

    // const query = req.query;
    const {q, nombre = 'No name', apikey, page = 1} = req.query;
    res.json({
        q, nombre, apikey, page
        
    });
}

const usuariosPut = (req, res = response) => {
    const id = req.params.id 

    res.json({
        id ,
        msg: "put api"
    })
}

const usuariosPost = (req, res =  response) => {
    // const body = req.body;
    // const usuario =  new Usuario(body);

    const {nombre, correo, password, rol} = req.body;
    const usuario =  new Usuario({nombre, correo, password, rol});

    // verificar si el correo existe
    const salt  = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);
    
    // encriptar contraseña

    // guardar en BD
    usuario.save();

    res.json({
        // msg: "post api",
        usuario
        
    })
}
const usuariosDelete = (req, res) => {
    res.json({
        ok:true,
        msg:"delete api"
    })
}

const usuariosPatch = (req, res) => {
    res.json({
        ok:true,
        msg:"patch api"
    })
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch

}