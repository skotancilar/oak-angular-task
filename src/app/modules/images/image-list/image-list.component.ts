import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/shared/image.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.scss'],
})
export class ImageListComponent implements OnInit {
  imageList!: any[];
  showButton!: any;
  isImageFetched = false;
  error = {
    status: false,
    message: '',
  };
  constructor(
    private imageService: ImageService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.imageService.imageDetailList.snapshotChanges().subscribe(
      (list) => {
        this.imageList = list.map((item) =>
          Object.assign({ key: item.payload.key }, item.payload.val())
        );
        this.isImageFetched = true;
        console.log(this.imageList);
      },
      (err) => {
        this.error.status = true;
      }
    );
  }

  onDeleteImage(key: string) {
    this.imageService
      .deleteImage(key)
      .then(() => {
        this.imageService.getAllImages();
        this.toastr.info('Image Deleted');
      })
      .catch((err) => console.log(err));
  }
}
