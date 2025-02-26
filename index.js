
const formulario = document.getElementById('formulario');
const areaForm = document.getElementById('area-comentario');
const btnAgregaComentario = document.getElementById('btn-agregar-comentario');

const contenedorComentarios = document.getElementById('contenedor-comentarios');



formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    const contenidoComentario = areaForm.value;
    if(contenidoComentario === ""){
        console.log("Boton deshabilitado");
    }else {
        creaComentario(contenidoComentario);
        areaForm.value = "";
    }

})

function creaComentario(textoComentario){
    
    const tituloComentario = document.createElement("h3");
    const cajaComentario = document.createElement("div");
    const parrafoComentario = document.createElement("p");
    const contenedorFechaHora = document.createElement("div");
    const spanFecha = document.createElement("span");
    const spanHora = document.createElement("span");
    let btnEliminarComentario = document.createElement("button");

    cajaComentario.classList.add('caja-comentario');
    contenedorFechaHora.classList.add('contenedor-fecha-hora')
    btnEliminarComentario.classList.add("btn-eliminar");
    
    tituloComentario.textContent = "Anonimo";
    parrafoComentario.textContent = textoComentario;
    spanFecha.textContent = "";
    spanHora.textContent = "";
    btnEliminarComentario.textContent = "Elimina Comentario"

    contenedorFechaHora.append(spanFecha, spanHora);

    cajaComentario.append(tituloComentario, parrafoComentario, contenedorFechaHora, btnEliminarComentario);

    return cajaComentario;
}