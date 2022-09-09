import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppartementEditComponent } from './appartement-edit.component';

describe('AppartementEditComponent', () => {
  let component: AppartementEditComponent;
  let fixture: ComponentFixture<AppartementEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppartementEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppartementEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
