//definimos el modelo del backend
export class MascotaModel{
     constructor(
          public id:string,
          public nombre:string,
          public sexo:string,
          public raza:string,
          public edad:string,
          public talla:string,
          public id_refugio:string,
          public imagen:string,
          public estado_adopcion:string,
     ){
     }
}