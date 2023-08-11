export interface Proyects {
  proyects: Content[];
}

export interface Content {
  title: string;
  description: string;
  tags: Tag[];
  image: string;
  is_online: boolean;
  is_private: boolean;
  url_proyecto: string;
  url_github: string;
  category: string;
}

export enum Tag {
  Online = 'Online',
  Typescript = 'Typescript',
}
