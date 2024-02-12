import { inject, Injectable } from '@angular/core';
import { getDownloadURL, getStorage, ref, Storage, uploadBytes, UploadResult } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  storage = inject(Storage);

  constructor() { }

  async uploadImage(file: File) {
    const fileName = `images/${file.name}`;
    const storageRef = this.storageRef(fileName);

    const uploadTask = await uploadBytes(storageRef, file);
    return await this.downloadUrl(uploadTask);
  }

  private async downloadUrl(uploadResult: UploadResult) {
    const downloadUrl = await getDownloadURL(uploadResult.ref);
    return downloadUrl;
  }

  private storageRef(fileName: string) {
    const storage = getStorage();
    return ref(storage, fileName);
  }
}
