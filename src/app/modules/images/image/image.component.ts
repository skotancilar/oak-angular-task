import { Component, OnInit } from '@angular/core';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ImageService } from 'src/app/shared/image.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent implements OnInit {
  imageSrc: string = '/assets/image-placeholder.png';
  selectedImage: any = null;
  isUploading: boolean = false;

  percentage!: Observable<any>;

  imageForm = new FormGroup({
    caption: new FormControl('', Validators.required),
    imageUrl: new FormControl('', Validators.required),
  });

  constructor(
    private storage: AngularFireStorage,
    private imageService: ImageService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.resetForm();
  }

  onSave(formValue: any) {
    if (this.imageForm.valid) {
      let filePath = `images/${
        this.selectedImage.name
      }_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.isUploading = true;
      this.storage
        .upload(filePath, this.selectedImage)
        .snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              formValue['imageUrl'] = url;
              this.imageService.insertImageDetails(formValue);
              this.toastr.success('Image Has Been Saved');
              this.isUploading = false;
              this.resetForm();
            });
          })
        )
        .subscribe(
          (res) => {},
          (err) => {
            this.isUploading = false;
          }
        );
    }
  }

  onCancel() {
    this.router.navigate(['/images/list']);
  }

  UploadImage(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => (this.imageSrc = e.target.result);
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
      this.toastr.success('Image uploaded successfully');
    } else {
      this.imageSrc = '/assets/image-placeholder.png';
      this.selectedImage = null;
      this.toastr.error('We could not upload the image ❌');
    }
  }

  resetForm() {
    this.imageForm.reset();
    this.imageForm.setValue({
      caption: '',
      imageUrl: '',
    });
    this.imageSrc = '/assets/image-placeholder.png';
  }
}
