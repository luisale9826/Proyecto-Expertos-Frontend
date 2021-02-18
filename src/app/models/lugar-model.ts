export class LugarModel {
  /**
   *
   */
  constructor(
    public nombre: string,
    public descripcion: string,
    public categoria: string,
    public latitud: number,
    public longitud: number,
    public url_foto?: string,
    public url_video?: string,
    public id_lugar?: number
  ) {}
}
