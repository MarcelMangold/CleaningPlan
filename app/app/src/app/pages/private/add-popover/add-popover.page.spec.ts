import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPopoverPage } from './add-popover.page';

describe('AddPopoverPage', () => {
  let component: AddPopoverPage;
  let fixture: ComponentFixture<AddPopoverPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPopoverPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPopoverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
