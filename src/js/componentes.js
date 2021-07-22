import {Tarea} from './clases';
import {listaTareas} from '../index'


//Referencia en el Html

const divTarea = document.querySelector('.todo-list')
const inputTarea = document.querySelector('.new-todo')
const btnAllComplete = document.querySelector('.clear-completed')
const btnAll = document.getElementById('btnAll')
const btnPending = document.getElementById('btnPending')
const btnCompleted = document.getElementById('btnCompleted')
const countPending = document.getElementById('count-pending')
const anchorFiltros = document.querySelectorAll('.filtro')

export const createTareaHtlm = (tarea) =>{
    const htmlTarea = `
    <li class="${ (tarea.estado) ? 'completed' : '' }" data-id="${tarea.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${ (tarea.estado) ? 'checked' : '' }>
            <label>${tarea.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>
    `;
    const div = document.createElement('div');
    div.innerHTML = htmlTarea;
    divTarea.append(div.firstElementChild)

    return div.firstElementChild;

}


// Métodos del componente
function clearTareasHtml(){
    for(let i=divTarea.children.length-1; i>=0; i--) divTarea.removeChild(divTarea.children[i])
}

function addClassFiler(anchor){
    anchorFiltros.forEach(element => element.classList.remove('selected'))
    console.log(anchor);
    anchor.classList.add('selected');
}

function allTareasHtml(){
    clearTareasHtml()
    for(let i = 0; i<listaTareas.getListaTarea.length; i++) 
        createTareaHtlm(listaTareas.getListaTarea[i])
}

function filterTareasHtml(filtro){
    clearTareasHtml()
    for(let i = 0; i<listaTareas.getListaTarea.length; i++){
        if(listaTareas.getListaTarea[i].estado == filtro) 
            createTareaHtlm(listaTareas.getListaTarea[i])
    }
}

// Eventos de escucha
inputTarea.addEventListener('keyup',(event)=>{
    if(event.keyCode === 13 && inputTarea.value.length > 0){  
        const newTarea = new Tarea(inputTarea.value)
        localStorage.setItem('idTarea',JSON.stringify(Tarea.contId))
        listaTareas.addTarea(newTarea)
        inputTarea.value = ''
        createTareaHtlm(newTarea)
    }
    countPending.innerHTML = listaTareas.countPendign()
})

divTarea.addEventListener('click',(event)=>{
    const element = event.target.localName //input, label, button
    const elementContainer = event.target.parentElement.parentElement
    const idElement = elementContainer.getAttribute('data-id');
    if(element === 'input'){
        listaTareas.marcarCompletado(idElement);
        elementContainer.classList.toggle('completed')   
    }
    if(element === 'button' ) {
        listaTareas.deleteTarea(idElement)
        divTarea.removeChild(elementContainer)
    }
    countPending.innerHTML = listaTareas.countPendign()
})

btnAllComplete.addEventListener('click',()=>{
    listaTareas.deleteCompletados()
    for(let i=divTarea.children.length-1; i>=0; i--){
        const element = divTarea.children[i];
        if(element.classList.contains('completed')) divTarea.removeChild(element)
    }
    countPending.innerHTML = listaTareas.countPendign()
})

btnAll.addEventListener('click',()=>{
    addClassFiler(btnAll)
    allTareasHtml()           
})

btnPending.addEventListener('click',()=>{
    addClassFiler(btnPending)
    filterTareasHtml(false)    
})

btnCompleted.addEventListener('click',()=>{
    addClassFiler(btnCompleted)
    filterTareasHtml(true)
})