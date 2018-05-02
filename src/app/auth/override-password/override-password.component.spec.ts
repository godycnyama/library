import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverridePasswordComponent } from './override-password.component';

describe('OverridePasswordComponent', () => {
  let component: OverridePasswordComponent;
  let fixture: ComponentFixture<OverridePasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverridePasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverridePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
