export class VoluntarioModel{
     constructor(
          public id:string,
          public nombre:string,
          public apellido:string,
          public email:string,
          public telefono:string,
          public disponibilidad:string,
          public imagenUrl:string, 
          public id_refugio:string
     ){
     }
}