export interface ProductResponse {
  id: string;
  name: string;
  description: string;
  logo: string;
  date_release: Date;
  date_revision: Date;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  logo: string;
  releaseDate: Date;
  revisionDate: Date;
}

export interface ProductForm {
  id: string;
  name: string;
  description: string;
  logo: string;
  releaseDate: Date;
  revisionDate: Date;
}
