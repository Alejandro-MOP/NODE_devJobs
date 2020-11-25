const Usuarios = require('../models/Usuarios');

exports.formCrearCuenta = (req, res) => {
    res.render('crear-cuenta', {
        nombrePagina: 'Crea tu cuenta en devJobs',
        tagline: 'Comienza a publicar tus vacantes gratis, solo debes crear una cuenta!'

    })
}

exports.crearUsuario = async (req, res, next) => {

    try {
        const usuario = new Usuarios(req.body);

        const nuevoUsuario = await usuario.save();

        if (!nuevoUsuario)  return next();

        res.status(201).redirect('iniciar-sesion');

        console.log(nuevoUsuario);

    } catch (error) {
        console.error(`Hubo un error: ${error}`);
    }

}