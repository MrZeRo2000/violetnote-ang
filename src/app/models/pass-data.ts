
export enum PassDataMode {
  PDM_VIEW,
  PDM_EDIT,
}


export interface ServiceError {
  errorCode?: number;
  errorMessage?: string;
}

export interface PassNote {
  system: string,
  user: string,
  password: string,
  url?: string,
  info?: string,
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

