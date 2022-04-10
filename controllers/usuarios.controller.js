const { response, request } = require('express');
const Usuario = require('../models/usuario.model');
const bcryptjs = require('bcryptjs');


const usuariosGet = async(req =  request, res = response) => {

    // const query = req.query;
    // const {q, nombre = 'No name', apikey, page = 1} = req.query;
    const {limite = 5, desde= 0} = req.query;
    const  usuarios =  await Usuario.find()
        .skip(desde)
        .limit(Number(limite));
    res.json({
        usuarios
        
    });
}

const usuariosPut = async(req, res = response) => {
    const id = req.params.id;
    const {_id, password, google, correo, ...resto} = req.body;

    //validar contra bd
    if (password) {
        //encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }
    const usuario = await Usuario.findByIdAndUpdate( id, resto);


    res.json({
        msg: "put api",
        id ,
        usuario
    })
}

const usuariosPost = async(req, res =  response) => {
    

    const {nombre, correo, password, rol} = req.body;
    const usuario =  new Usuario({nombre, correo, password, rol});

    // verificar si el correo existe
    // const existeEmail = await Usuario.findOne({correo});
    // if (existeEmail) {
    //     return res.status(400).json({
    //         msg: 'mail no corresponde'
    //     });
    // }
    // encriptar contraseña
    const salt  = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

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