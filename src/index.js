import './styles.css';

import {Tarea,ListaTareas} from './js/clases'
import {createTareaHtlm,} from './js/componentes'

export const listaTareas = new ListaTareas()
listaTareas.getListaTarea.forEach(tarea => createTareaHtlm(tarea));
Tarea.contId = (localStorage.getItem('idTarea')) ? JSON.parse(localStorage.getItem('idTarea')) : Tarea.contId
//console.log(listaTareas.getListaTarea);