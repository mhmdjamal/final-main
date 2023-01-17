import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SectorsService } from 'src/app/core/services/sectors.service';
import { StartupsService } from 'src/app/core/services/startups.service';
import { UploadService } from 'src/app/core/services/upload.service';
import { Cities } from '../../../../shared/cities';

@Component({
  selector: 'app-add-startup',
  templateUrl: './add-startup.component.html',
  styleUrls: ['./add-startup.component.css']
})
export class AddStartupComponent implements OnInit {
  formGroup: FormGroup;
  imgSrc: any;
  sectors: any;
  jordanCities: any;

  constructor(
    private formBuilder: FormBuilder,
    private _startupService: StartupsService,
    private _uploadService: UploadService,
    private _sectorService: SectorsService,
    private location: Location
  ) {
    this.formGroup = this.formBuilder.group({
      city: null,
      emailAddress: [null, [Validators.email, Validators.required]],
      logo: null,
      name: [null, [Validators.required]],
      numberOfEmployees: null,
      sectors: [null, [Validators.required]],
      websiteUrl: [null, [Validators.required]],
      yearOfEstablish: null,
      description: null
    });
  }
  ngOnInit(): void {
    this.getAllSectors();
    this.jordanCities = Cities;
  }

  getAllSectors(): void {
    this._sectorService.getAll().subscribe((result: any) => {
      if (result) {
        console.log(result);

        this.sectors = result;
      }
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
    this._startupService
      .create({
        name: this.formGroup.controls['name'].value,
        emailAddress: this.formGroup.controls['emailAddress'].value,
        websiteUrl: this.formGroup.controls['websiteUrl'].value,
        sectors: this.formGroup.controls['sectors'].value,
        city: this.formGroup.controls['city'].value,
        numberOfEmployees: this.formGroup.controls['numberOfEmployees'].value,
        logo: this.formGroup.controls['logo'].value,
        yearOfEstablish: this.formGroup.controls['yearOfEstablish'].value,
        description: this.formGroup.controls['description'].value
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
