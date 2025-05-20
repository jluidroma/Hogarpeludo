import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRefugioComponent } from './add-refugio.component';

describe('AddRefugioComponent', () => {
  let component: AddRefugioComponent;
  let fixture: ComponentFixture<AddRefugioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddRefugioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRefugioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
