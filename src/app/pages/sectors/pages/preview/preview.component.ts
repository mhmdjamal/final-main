import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Sectors } from 'src/app/core/interfaces/sector.interface';
import { SectorsService } from 'src/app/core/services/sectors.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  key: string = '';
  sector: Sectors = {
    color: '',
    name: '',
    categoryName: '',
    logo: ''
  };
  loading = true;
  constructor(
    private activatedRoute: ActivatedRoute,
    private _sectorsService: SectorsService
  ) {}

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
      if (result) {
        this.sector = result;
        this.loading = false;
      }
    });
  }
}
