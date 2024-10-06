//definimos el modelo del backend
export class MascotaModel{
     constructor(public id:string,public nombre:string,public sexo:string,public raza:string,public edad:string,public talla:string,public imagenUrl:string,public estado_adopcion:string){
     }
}