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

exports.mostrarVacante = async (req, res, next) => {

    const vacante = await Vacante.findOne({ url: req.params.url }).lean();

    if(!vacante) return next();

    res.render('vacante',{
        vacante,
        nombrePagina: vacante.titulo,
        barra: true
    });
}