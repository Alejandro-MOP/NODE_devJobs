const Vacante = require('../models/Vacantes');

exports.formularioNuevaVacante = (req, res) => {

    res.render('nueva-vacante', {
        nombrePagina: 'Nueva Vacante',
        tagline: 'Llena el formulario y publica tu vacante'
    });
}


exports.agregarVacante = async (req, res) => {

    try {
        const vacante = new Vacante(req.body);

        vacante.skills = req.body.skills.split(',');

        const nuevaVacante = await vacante.save();

        res.status(201).redirect(`/vacantes/${nuevaVacante.url}`);

    } catch (error) {
        console.error(`Hubo un error: ${error}`);
    }
}

exports.mostrarVacante = async (req, res, next) => {

    try {
        const vacante = await Vacante.findOne({ url: req.params.url }).lean();

        if (!vacante) return next();

        res.status(200).render('vacante', {
            vacante,
            nombrePagina: vacante.titulo,
            barra: true
        });

    } catch (error) {
        console.error(`Hubo un error: ${error}`);
    }
}


exports.formEditarVacante = async (req, res, next) => {
    try {
        const vacante = await Vacante.findOne({ url: req.params.url }).lean();

        if (!vacante) return next();

        res.status(200).render('editar-vacante', {
            vacante,
            nombrePagina: `Editar - ${vacante.titulo}`
        });

    } catch (error) {
        console.error(`Hubo un error: ${error}`);
    }
}

exports.editarVacante = async (req, res) => {
    try {
        const vacanteActualizada = req.body;

        vacanteActualizada.skills = req.body.skills.split(',');

        const vacante = await Vacante.findOneAndUpdate({ url: req.params.url }, vacanteActualizada, {
            new: true,
            runValidators: true
        });
        res.status(200).redirect(`/vacantes/${vacante.url}`);

    } catch (error) {
        console.error(`Hubo un error: ${error}`);
    }
}