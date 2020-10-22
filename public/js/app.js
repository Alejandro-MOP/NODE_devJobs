document.addEventListener('DOMContentLoaded', () => {
    const skills = document.querySelector('.lista-conocimientos');

    if (skills) {
        skills.addEventListener('click', agregarSkills);

        //editando, llamar la funcion para leer los datos previos del helper
        skillsSeleccionados();
    }
});

const skills = new Set();

const agregarSkills = e => {
    // console.log(e.target)
    if(e.target.tagName === 'LI'){
        if(e.target.classList.contains('activo')){
            skills.delete(e.target.textContent);
            e.target.classList.remove('activo');
        } else {
            skills.add(e.target.textContent);
            e.target.classList.add('activo');
        }
    }
    // console.log(skills);
    const skillsArray = [...skills];
    document.querySelector('#skills').value = skillsArray;

}


const skillsSeleccionados = () => {
    const seleccionadas = Array.from(document.querySelectorAll('.lista-conocimientos .activo'));
    //console.log(seleccionadas);

    seleccionadas.forEach(seleccionada => {skills.add(seleccionada.textContent)})
    //inyectarlo en el input hidden de editar vacante
    const skillsArray = [...skills];
    document.querySelector('#skills').value = skillsArray;
}