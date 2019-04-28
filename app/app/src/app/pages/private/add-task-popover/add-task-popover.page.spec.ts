import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskPopoverPage } from './add-task-popover.page';

describe('AddTaskPopoverPage', () => {
  let component: AddTaskPopoverPage;
  let fixture: ComponentFixture<AddTaskPopoverPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTaskPopoverPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaskPopoverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
