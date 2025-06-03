export class usuarioModel {
  constructor(
    public uid: string,
    public email: string,
    public nombreCompleto: string,
    public telefono: string,
    public direccion: string,
    public rol: string
  ) {}
}
