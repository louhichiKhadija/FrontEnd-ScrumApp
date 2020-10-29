import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclineInvitationComponent } from './decline-invitation.component';

describe('DeclineInvitationComponent', () => {
  let component: DeclineInvitationComponent;
  let fixture: ComponentFixture<DeclineInvitationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeclineInvitationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeclineInvitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
