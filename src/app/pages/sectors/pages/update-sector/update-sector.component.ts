import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SectorsService } from 'src/app/core/services/sectors.service';
import { UploadService } from 'src/app/core/services/upload.service';

@Component({
  selector: 'app-update-sector',
  templateUrl: './update-sector.component.html',
  styleUrls: ['./update-sector.component.css']
})
export class UpdateSectorComponent implements OnInit {
  key: string = '';
  formGroup: FormGroup;
  imgSrc: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private _sectorsService: SectorsService,
    private _uploadService: UploadService,
    private location: Location,
    private formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      logo: null,
      name: [null, [Validators.required]],
      color: [null, [Validators.required]],
      categoryName: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(result => {
      if (result['key']) {
        this.key = result['key'];
        this.getById();
      }
    });
  }

  getById() {
    this._sectorsService.getById(this.key).subscribe((result: any) => {
      this.formGroup = this.formBuilder.group({
        logo: result['logo'],
        name: [result['name'], [Validators.required]],
        color: [result['color'], [Validators.required]],
        categoryName: [result['categoryName'], [Validators.required]]
      });
      this.imgSrc = result['logo'];
    });
  }

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

  onUpdateClicked() {
    if (this.formGroup.invalid) {
      this.validateFormGroup();
    } else {
      if (this.formGroup.controls['logo'].value) {
        this.upload();
      } else {
        this.updateStartup();
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
      this.updateStartup();
    });
  }

  updateStartup() {
    this._sectorsService
      .update(this.key, {
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
