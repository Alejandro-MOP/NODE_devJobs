const Vacante = require('../models/Vacantes');

exports.mostrarTrabajos = async (req, res, next) => {
    try {
        const vacantes = await Vacante.find().lean();

        if(!vacantes) return next();

        res.status(200).render('home', {
            nombrePagina: 'devJobs',
            tagline: 'Encuentra y Pública Trabajos para Desarrolladores Web',
            barra: true,
            boton: true,
            vacantes
        });

    } catch (error) {
        console.error(`Hubo un error: ${error}`);
    }

}