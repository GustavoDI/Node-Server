
const {Router} = require('express') ;
const { check } = require('express-validator');
const router = Router();

const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios.controller');

const {esRolValido}= require('../helpers/db-validator')
const {validarCampos} = require('../middlewares/validar-campos');

router.get('/', usuariosGet);

router.put('/:id', usuariosPut);

router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es valido').isEmail(),
    check('password', 'El password es requerido').isLength({min:6}),
    // check('rol', 'No es un rol permitido').isIn(["ADMIN_ROLE","USER_ROLE"]),
    check('rol').custom(esRolValido),
    validarCampos
] ,usuariosPost);

router.delete('/', usuariosDelete);

router.patch('/', usuariosPatch);



module.exports = router;