import {AttributesForm} from '../components/attributes-form/attributes-form';

export enum PassDataMode {
  PDM_VIEW,
  PDM_EDIT,
}


export interface ServiceError {
  errorCode?: number;
  errorMessage?: string;
}

export interface Attribute {
  name: string;
  value: string;
}

export interface PassNote {
  system: string,
  user: string,
  password: string,
  url?: string,
  info?: string,
  attributes?: Attribute[],
}

export interface PassCategory {
  categoryName: string,
  noteList: Array<PassNote>
}

export interface PassData extends ServiceError {
  categoryList: Array<PassCategory>
}

export interface PassDataPersistRequest {
  fileName?: string;
  password?: string;
  passData?: PassData;
}

export interface PassDataSearchResult {
  categoryName: string;
  passNote: PassNote;
}
