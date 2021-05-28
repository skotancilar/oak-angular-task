import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import Image from '../modules/images/image-list/image.model';

@Injectable({ providedIn: 'root' })
export class ImageService {
  private dbPath: string = '/imageDetails';
  imageDetailList!: AngularFireList<Image>;

  constructor(private firebase: AngularFireDatabase) {
    this.imageDetailList = firebase.list(this.dbPath);
  }

  insertImageDetails(imageDetails: Image) {
    this.imageDetailList.push(imageDetails);
  }
  getAllImages(): AngularFireList<Image> {
    return this.imageDetailList;
  }

  deleteImage(key: string): Promise<void> {
    return this.imageDetailList.remove(key);
  }
}
