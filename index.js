
const formulario = document.getElementById('formulario');
const areaForm = document.getElementById('area-comentario');
const btnAgregaComentario = document.getElementById('btn-agregar-comentario');

const contenedorComentarios = document.getElementById('contenedor-comentarios');

areaForm.addEventListener('input', () => {
    btnAgregaComentario.disabled = areaForm.value === "";
});

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    const contenidoComentario = areaForm.value;
    agregaComentario(creaComentario(contenidoComentario));
    areaForm.value = "";
    btnAgregaComentario.disabled = true;

})

function eliminaComentario(event){
    const comentario = event.target.parentElement;
    comentario.remove();
}

function agregaComentario(comentario){
    contenedorComentarios.append(comentario);
}

function creaComentario(textoComentario){
    
    const ahora = new Date();
    const tiempoFormateado = formatearHora(ahora);

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
    spanFecha.textContent = ahora.toLocaleDateString();
    spanHora.textContent = tiempoFormateado;
    btnEliminarComentario.textContent = "Elimina Comentario";

    btnEliminarComentario.addEventListener('click', eliminaComentario);

    contenedorFechaHora.append(spanFecha, spanHora);

    cajaComentario.append(tituloComentario, parrafoComentario, contenedorFechaHora, btnEliminarComentario);

    return cajaComentario;
}

function formatearHora(dateObj){
    let formateoHora = new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });

    return formateoHora.format(dateObj);   
}