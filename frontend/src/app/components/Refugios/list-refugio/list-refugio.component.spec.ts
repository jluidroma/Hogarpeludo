import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRefugioComponent } from './list-refugio.component';

describe('ListRefugioComponent', () => {
  let component: ListRefugioComponent;
  let fixture: ComponentFixture<ListRefugioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListRefugioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListRefugioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
