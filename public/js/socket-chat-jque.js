//referencias
const divUsuarios = document.querySelector('#divUsuarios');
const formEnviar = document.querySelector('#formEnviar');
const txtMensaje = document.querySelector('#txtMensaje');
const divChatbox = document.querySelector('#divChatbox');

var params = new URLSearchParams(window.location.search);
var usuario = params.get('nombre')
var sala = params.get('sala')

// Funciones para rederizar usuarios
const renderizarUsuarios = (personas)=>{
    let html = `
    <li>
        <a href="javascript:void(0)" class="active"> Chat de <span> ${params.get('sala')}</span></a>
    </li>
    `;
    
    for(let i = 0 ; i < personas.length; i++){
        html +=`
            <li>
                <a data-id="${personas[i].id}" href="javascript:void(chatClick('${ personas[i].id}'))"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>${personas[i].nombre} <small class="text-success">online</small></span></a>
            </li>
        `
    }
    divUsuarios.innerHTML = html;
};

//listeners
function chatClick(id) {
    if(id){
        console.log(id);
    }
}
formEnviar.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(txtMensaje.value.trim().length === 0){
        return;
    };
    socket.emit('crearMensaje', {
            nombre: usuario,
            mensaje: txtMensaje.value,
        }, function(mensaje) {
            txtMensaje.value='';
            txtMensaje.focus();
            renderizarMensajes(mensaje,true);
            scrollBottom();
        });
})
function renderizarMensajes(mensaje,yo){
    let fecha = new Date(mensaje.fecha);
    let hora = fecha.getHours() + ':' + fecha.getMinutes();
    let html='';
    let adminClass ='info';
    if(mensaje.nombre == 'Administrador'){
        adminClass='danger';
    }
    if(yo){
        html = `
        <li class="reverse">
            <div class="chat-content">
                <h5>${mensaje.nombre}</h5>
                <div class="box bg-light-inverse">${mensaje.mensaje}</div>
            </div>
            <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>
            <div class="chat-time">${hora}</div>
        </li>
        `;
    }else{
        html = `
        <li class="animated fadeIn">
        <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>
        <div class="chat-content">
            <h5>${mensaje.nombre}</h5>
            <div class="box bg-light-${adminClass}" >${mensaje.mensaje}.</div>
        </div>
        <div class="chat-time">${hora}</div>
        </li>
        `;
    }
    
    
    let div = document.createElement('div')
    div.innerHTML=html;
    divChatbox.appendChild(div);
}
function scrollBottom() {

    // selectors
    divChatbox.scrollTop = divChatbox.scrollHeight;


}
