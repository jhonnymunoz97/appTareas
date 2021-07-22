

export class ListaTareas{
    
    constructor(){
        this.loadLocalStorage();
    }

    get getListaTarea(){
        return this.listaTareas
    }

    addTarea(tarea){
        this.listaTareas.push(tarea)
        this.addLocalStorage(this.getListaTarea)
    }

    deleteTarea(id){
        this.listaTareas = this.listaTareas.filter(tarea => tarea.id != id)
        this.addLocalStorage(this.getListaTarea)
    }

    marcarCompletado(id){
        for(const tarea of this.listaTareas){
            if(tarea.id == id){
                tarea.estado = !tarea.estado
                break;
            }
        }
        this.addLocalStorage(this.getListaTarea)
    }

    deleteCompletados(){
        this.listaTareas = this.listaTareas.filter(tarea => !tarea.estado )
        this.addLocalStorage(this.getListaTarea)
    }

    countPendign(){
        let cont = 0
        this.listaTareas.filter(tarea => {
            if(!tarea.estado) cont++
        })   
        return cont;
    }

    addLocalStorage(tareas){
        localStorage.setItem('tarea', JSON.stringify(tareas));
    }

    loadLocalStorage(){
        this.listaTareas = (localStorage.getItem('tarea')) ? JSON.parse(localStorage.getItem('tarea')) : []
    }

}