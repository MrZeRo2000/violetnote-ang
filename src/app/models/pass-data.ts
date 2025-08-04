
export interface ServiceError {
  errorCode?: number;
  errorMessage?: string;
}

export interface PassData extends ServiceError {

}

export interface PassDataPersistRequest {
  fileName?: string;
  password?: string;
  passData?: PassData;
}
