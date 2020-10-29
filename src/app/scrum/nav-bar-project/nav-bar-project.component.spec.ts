import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarProjectComponent } from './nav-bar-project.component';

describe('NavBarProjectComponent', () => {
  let component: NavBarProjectComponent;
  let fixture: ComponentFixture<NavBarProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavBarProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
