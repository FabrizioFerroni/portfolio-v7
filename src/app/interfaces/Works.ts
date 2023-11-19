export interface Works {
  trabajos: Work[];
}

export interface Work {
  title: string;
  empresa: string;
  descripcion: string;
  duracion: string;
  fecha_desde_hasta: string;
  actual: boolean;
}
