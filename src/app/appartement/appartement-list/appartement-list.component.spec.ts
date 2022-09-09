import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppartementListComponent } from './appartement-list.component';

describe('AppartementListComponent', () => {
  let component: AppartementListComponent;
  let fixture: ComponentFixture<AppartementListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppartementListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppartementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
