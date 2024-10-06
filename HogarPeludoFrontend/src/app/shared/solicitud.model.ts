
//definimos el modelo de la solicitud backend
export class SolicitudModel{
     constructor(public id_solicitud:string,public id_mascota:string,public nombre_solicitante:string,public identificacion:string,public telefono:string,public direccion:string,public fecha:string,public estado:string){
     }
}