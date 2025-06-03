import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddusuarioComponent } from './addusuario.component';

describe('AddusuarioComponent', () => {
  let component: AddusuarioComponent;
  let fixture: ComponentFixture<AddusuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddusuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddusuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
