const { response, request } = require('express');
const Usuario = require('../models/usuario.model');
const bcryptjs = require('bcryptjs');



const usuariosGet = async(req =  request, res = response) => {

    // const query = req.query;
    // const {q, nombre = 'No name', apikey, page = 1} = req.query;
    const {limite = 5, desde= 0} = req.query;
    const query =  {estado : true}
    // const  usuarios =  await Usuario.find(query)
        // .skip(Number(desde))
        // .limit(Number(limite))
    //     const total = await Usuario.countDocuments(query);

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
        ]);

    res.json({
        // resp
        total,
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
const usuariosDelete = async (req, res = response) => {
    const {id} = req.params;
    // Borrar fisicamente desde la base de de datos (esto no se hace)
    // const usuario =await Usuario.findByIdAndDelete(id)
    // const uid = req.uid
    //  lo que se debe hacer 
    const usuario = await Usuario.findByIdAndUpdate(id, {estado:false});
    // const usuarioAutenticado =  usuario;
    res.json({
        usuario, 
        // usuarioAutenticado
    });
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