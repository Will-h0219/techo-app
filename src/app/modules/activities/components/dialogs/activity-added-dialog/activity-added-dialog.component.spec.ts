import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityAddedDialogComponent } from './activity-added-dialog.component';

describe('ActivityAddedDialogComponent', () => {
  let component: ActivityAddedDialogComponent;
  let fixture: ComponentFixture<ActivityAddedDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityAddedDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityAddedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
