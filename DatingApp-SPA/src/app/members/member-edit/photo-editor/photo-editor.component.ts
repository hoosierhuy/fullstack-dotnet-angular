import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

import { PhotoModel } from '../../../_models/photo.model';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../_services/auth.service';
import { UserService } from '../../../_services/user.service';
import { AlertifyService } from '../../../_services/alertify.service';


@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() photos: PhotoModel[];
  @Output() getMemberPhotoChange = new EventEmitter<string>();

   uploader: FileUploader;
   hasBaseDropZoneOver = false;
   baseUrl = environment.apiUrl;
   currentMain: PhotoModel;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private alertifyService: AlertifyService
  ) { }

  ngOnInit() {
    this.initializeUploader();
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: `${this.baseUrl}users/${this.authService.decodedToken.nameid}/photos`,
      authToken: `Bearer ${localStorage.getItem('token')}`,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });
    // Handle CORS issue uploading photos to Cloudinary
    this.uploader.onAfterAddingFile = file => file.withCredentials = false;

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: PhotoModel = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          description: res.description,
          isMain: res.isMain
        };

        this.photos.push(photo);
      }
    };
  }

  setMainPhoto(photo: PhotoModel) {
    this.userService.setMainPhoto$(this.authService.decodedToken.nameid, photo.id)
      .subscribe(() => {
          this.currentMain = this.photos.filter(p => p.isMain === true)[0];
          this.currentMain.isMain = false;
          photo.isMain = true;
          this.authService.changeMemberPhoto(photo.url);
          this.authService.currentUser.photoUrl = photo.url;
          localStorage.setItem('user', JSON.stringify(this.authService.currentUser));
        },
          error => this.alertifyService.error(error)
      );
  }

  deletePhoto(id: number) {
    this.alertifyService.confirm('Are you sure you want to delete this photo?', () => {
      this.userService.deletePhoto(this.authService.decodedToken.nameid, id)
        .subscribe(() => {
          this.photos.splice(this.photos.findIndex(p => p.id === id), 1);
          this.alertifyService.success('Photo has been successfully deleted.');
        }, error => this.alertifyService.error('Failed to delete photo'));
    });
  }

}
