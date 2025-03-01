const formulario = document.getElementById('formulario');
const usuario = document.getElementById('usuario');
const areaForm = document.getElementById('area-comentario');
const btnAgregaComentario = document.getElementById('btn-agregar-comentario');

// Contadores input tipo texto usuario y el textarea del comentario
const maxCaracteresUsuario = 10;
const contadorCaracteresUsuario = document.getElementById('contador-caracteres-usuario');

const contadorCaracteres = document.getElementById('contador-caracteres');
const maxCaracteres = 280;

const spanContadorComentarios = document.getElementById('contador-comentarios');
let contadorComentarios = Number(spanContadorComentarios.textContent);

// Parsear nuestro array del localStorage
let comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];


document.addEventListener("DOMContentLoaded", () => {
    muestraComentarios(comentarios);
});


usuario.addEventListener('input', () => {
    const caracteresUsadosUsuario = usuario.value.length;

    if (caracteresUsadosUsuario > maxCaracteresUsuario) {
        usuario.value = usuario.value.substring(0, maxCaracteresUsuario);
    }

    contadorCaracteresUsuario.textContent = `${usuario.value.length} / ${maxCaracteresUsuario}`;
});


areaForm.addEventListener('input', () => {
    const caracteresUsados = areaForm.value.length;

    if (caracteresUsados > maxCaracteres) {
        areaForm.value = areaForm.value.substring(0, maxCaracteres);
    }
    
    contadorCaracteres.textContent = `${areaForm.value.length} / ${maxCaracteres}`;

});

formulario.addEventListener('input', () =>{
    if(usuario.value === "" || areaForm.value === ""){
        btnAgregaComentario.disabled = true;
    } else {
        btnAgregaComentario.disabled = false;
    }
})

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    const contenidoComentario = areaForm.value;
    creaObjComentario(usuario.value, contenidoComentario);
    muestraComentarios(comentarios);
    areaForm.value = "";
    usuario.value = "";
    spanContadorComentarios.textContent = ++contadorComentarios;
    contadorCaracteres.textContent = `0 / ${maxCaracteres}`;
    contadorCaracteresUsuario.textContent = `0 / ${maxCaracteresUsuario}`;
    btnAgregaComentario.disabled = true;

})

function creaObjComentario(nombreUsuario, textoComentario) {
    const ahora = new Date();
    const tiempoFormateado = formatearHora(ahora);

    let objComentario = {
        nombre: nombreUsuario,
        contenidoComentario: textoComentario,
        fecha: ahora.toLocaleDateString(),
        hora: tiempoFormateado
    };

    comentarios.unshift(objComentario);
    
    localStorage.setItem("comentarios", JSON.stringify(comentarios));
}

function muestraComentarios(arrComentarios) {
    const contenedorComentarios = document.getElementById('contenedor-comentarios');
    contenedorComentarios.innerHTML = "";

    arrComentarios.forEach((comentario, index) => {
        let nuevoComentario = document.createElement("div");
        nuevoComentario.classList.add("caja-comentario");
        nuevoComentario.setAttribute("data-index", index);

        nuevoComentario.innerHTML = `
            <h3>${comentario.nombre}</h3>
            <p>${comentario.contenidoComentario}</p>
            <div class="contenedor-fecha-hora">
                <span>${comentario.fecha}</span>
                <span>${comentario.hora}</span>
            </div>
            <button class="btn-eliminar button-40">Eliminar</button>
        `;

        nuevoComentario.querySelector(".btn-eliminar").addEventListener("click", () => {
            eliminaComentario(index);
        });

        contenedorComentarios.appendChild(nuevoComentario);
    });
}

function eliminaComentario(index) {
    const confirmacion = confirm("¿Seguro que deseas eliminar el comentario?");
    if (confirmacion) {
        comentarios.splice(index, 1);
        localStorage.setItem("comentarios", JSON.stringify(comentarios));

        if (contadorComentarios > 0){
            spanContadorComentarios.textContent = --contadorComentarios;
        }

        muestraComentarios(comentarios);
    }
}


function formatearHora(dateObj){
    let formateoHora = new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });

    return formateoHora.format(dateObj);   
}   