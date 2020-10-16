const Vacante = require('../models/Vacantes');

exports.formularioNuevaVacante = (req, res) => {

    res.render('nueva-vacante', {
        nombrePagina: 'Nueva Vacante',
        tagline: 'Llena el formulario y publica tu vacante'
    });
}


exports.agregarVacante = async (req, res) => {

    const vacante = new Vacante(req.body);

    vacante.skills = req.body.skills.split(',');
    // console.log(vacante);

    const nuevaVacante = await vacante.save();

    res.redirect(`/vacantes/${nuevaVacante.url}`);

}