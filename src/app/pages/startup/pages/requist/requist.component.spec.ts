import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequistComponent } from './requist.component';

describe('RequistComponent', () => {
  let component: RequistComponent;
  let fixture: ComponentFixture<RequistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
