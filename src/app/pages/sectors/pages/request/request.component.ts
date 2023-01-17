import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SectorsService } from 'src/app/core/services/sectors.service';
import { UploadService } from 'src/app/core/services/upload.service';
@Component({
  selector: 'app-request.',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  formGroup: FormGroup;
  imgSrc: any;
  constructor(
    private formBuilder: FormBuilder,
    private _sectorsService: SectorsService,
    private _uploadService: UploadService,
    private location: Location
  ) {
    this.formGroup = this.formBuilder.group({
      logo: null,
      name: [null, [Validators.required]],
      color: [null, [Validators.required]],
      categoryName: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {}

  getErrorMessage(control: any) {
    if (control && control.errors) {
      if (control.hasError('required')) {
        return 'You must enter a value';
      }
      if (control.hasError('email')) {
        return 'Not a valid email';
      }
    }
    return '';
  }

  onAddClicked() {
    if (this.formGroup.invalid) {
      this.validateFormGroup();
    } else {
      if (this.formGroup.controls['logo'].value) {
        this.upload();
      } else {
        this.createStartup();
      }
    }
  }
  upload() {
    this._uploadService
      .upload(this.formGroup.controls['logo'].value)
      .subscribe(file => {
        if (file?.metadata) {
          this.getDownloadURL();
        }
      });
  }

  getDownloadURL() {
    this._uploadService.getDownloadURL().subscribe(url => {
      console.log();
      this.formGroup.controls['logo'].setValue(url);
      this.createStartup();
    });
  }
  createStartup() {
    this._sectorsService
      .createRequest({
        name: this.formGroup.controls['name'].value,
        logo: this.formGroup.controls['logo'].value,
        color: this.formGroup.controls['color'].value,
        categoryName: this.formGroup.controls['categoryName'].value
      })
      .then(() => {
        this.location.back();
      });
  }

  onFileInputChange($event: any) {
    console.log($event);
    this.formGroup.controls['logo'].setValue($event.target.files[0]);

    const reader = new FileReader();
    reader.onload = e => (this.imgSrc = reader.result);
    reader.readAsDataURL(this.formGroup.controls['logo'].value);
  }

  validateFormGroup() {
    Object.keys(this.formGroup.controls).forEach(filed => {
      const control = this.formGroup.get(filed);
      control?.markAsTouched({ onlySelf: true });
    });
  }
}
