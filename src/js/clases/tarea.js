export class Tarea{

    
    static contId = 1

    constructor(tarea){
        this.id = Tarea.contId;
        this.tarea = tarea;
        this.estado = false;
        this.fecha = new Date();
        Tarea.contId++;
    }

    get getId(){
        return this.id;
    }

    get getTarea(){
        return this.tarea;
    }

    get getFeha(){
        return this.fecha;
    }

    set setEstado(estado){
        this.estado = estado
    }

    get getEstado(){
        return this.estado;
    }
}