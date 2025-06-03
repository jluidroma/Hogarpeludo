import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsolicitudComponent } from './addsolicitud.component';

describe('AddsolicitudComponent', () => {
  let component: AddsolicitudComponent;
  let fixture: ComponentFixture<AddsolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddsolicitudComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddsolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
