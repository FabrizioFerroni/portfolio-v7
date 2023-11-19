export interface Proyects {
  proyectos: Proyect[];
}

export interface Proyect {
  titulo: string;
  descripcion: string;
  tags: string[];
  imagen: string;
  is_online: boolean;
  is_private: boolean;
  url_proyecto: string;
  url_github: string;
  categoria: string;
}
