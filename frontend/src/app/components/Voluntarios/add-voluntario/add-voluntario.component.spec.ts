import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVoluntarioComponent } from './add-voluntario.component';

describe('AddVoluntarioComponent', () => {
  let component: AddVoluntarioComponent;
  let fixture: ComponentFixture<AddVoluntarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddVoluntarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddVoluntarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
