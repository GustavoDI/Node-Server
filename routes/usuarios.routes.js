
const {Router} = require('express') ;
const { check } = require('express-validator');
const router = Router();

// const {validarCampos} = require('../middlewares/validar-campos');
// const { validarJWT } = require('../middlewares/validar-jwt');
// const { adminRole, tieneRol } = require('../middlewares/validar-roles');
const {validarCampos, validarJWT, adminRole, tieneRol }= require('../middlewares/index')

const {esRolValido, emailExiste, existeUsuarioPorID}= require('../helpers/db-validator');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios.controller');


router.get('/', usuariosGet);

router.put('/:id',[
    check('id', 'No un ID válido').isMongoId(),
    check('id',).custom(existeUsuarioPorID),
    check('rol').custom(esRolValido),
    validarCampos
], usuariosPut);

router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(emailExiste),
    check('password', 'El password es requerido').isLength({min:6}),
    // check('rol', 'No es un rol permitido').isIn(["ADMIN_ROLE","USER_ROLE"]),
    check('rol').custom(esRolValido),
    validarCampos
] ,usuariosPost);

router.delete('/:id',[
    validarJWT,
    // adminRole, 
    tieneRol('ADMIN_ROLE','USER_ROLE','VENTAS_ROLE'),
    check('id', 'No es un Id válido').isMongoId(),
    check('id').custom(existeUsuarioPorID),
    validarCampos
], usuariosDelete);

router.patch('/', usuariosPatch);



module.exports = router;