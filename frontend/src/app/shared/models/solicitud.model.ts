export class SolicitudModel{
     constructor(
          public id: string,
          public id_mascota:string,
          public id_solicitante: string,
          public fecha_solicitud: string,
          public estado: string,
          public fecha_aprobacion: string
     ){}
}