const { response } = require("express");
const { request } = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");


const adminRole = (req = request, res = response, next)=>{
    // como sabemos que nuestra req contiene la informaciion del usuario 
    if (!req.usuario) {
        return res.status(500).json({
            msg:'se debe verificar el role'
        });
    }

    // entonces desde la req queremos extraer lo que queremos validar 
    // en este caso el nombre y el rol
    const {rol, nombre} = req.usuario;

    if (rol !== 'ADMIN_ROL') {
        return res.status(400).json({
            msg:`${nombre} no es administrador y no puede realizar esta acción`
        });
    }

    next();
}

const tieneRol = (...roles)=>{
    return (req = request, res = response, next)=>{

        if (!req.usuario) {
            return res.status(500).json({
                msg:'se debe verificar el role'
            });
        }

        if (!roles.includes(req.usuario.rol)) {
            return res.status(401).json({
                msg:'El servicio requiere uno de estos roles'
            })
        }

        next();
    }


    
}
module.exports = {
    adminRole,
    tieneRol 
}