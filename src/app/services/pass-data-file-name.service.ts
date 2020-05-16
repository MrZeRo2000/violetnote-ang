import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PassDataFileNameService {
  private readonly LOCAL_STORAGE_FILE_NAME_KEY = 'passDataFileName';

  private fileName: string;

  public getFileName(): string {
    return this.fileName;
  }

  constructor() {
    this.readLocalFileName();
  }

  private readLocalFileName(): void {
    this.fileName = localStorage.getItem(this.LOCAL_STORAGE_FILE_NAME_KEY);
  }

  private writeLocalFileName(): void {
    if (this.fileName) {
      localStorage.setItem(this.LOCAL_STORAGE_FILE_NAME_KEY, this.fileName);
    } else {
      localStorage.removeItem(this.LOCAL_STORAGE_FILE_NAME_KEY);
    }
  }

}
