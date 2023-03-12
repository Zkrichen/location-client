import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePaeComponent } from './home-pae.component';

describe('HomePaeComponent', () => {
  let component: HomePaeComponent;
  let fixture: ComponentFixture<HomePaeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePaeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePaeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
