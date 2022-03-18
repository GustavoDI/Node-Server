const { response, request } = require('express');

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
    const { nombre, edad} = req.body

    res.json({
        msg: "post api",
        // body
        nombre,
        edad
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