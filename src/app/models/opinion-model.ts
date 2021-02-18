export class OpinionModel {
  /**
   *
   */
  constructor(
    public mejor_mes: number,
    public alojamiento: number,
    public accesibilidad: number,
    public precio: number,
    public clima: number,
    public comida: number,
    public conexion_internet: number,
    public id_lugar?: number,
    public id_opinion?: number,
    public latitud?: number,
    public longitud?: number
  ) {}
}
