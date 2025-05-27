import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVoluntarioComponent } from './list-voluntario.component';

describe('ListVoluntarioComponent', () => {
  let component: ListVoluntarioComponent;
  let fixture: ComponentFixture<ListVoluntarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListVoluntarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListVoluntarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
