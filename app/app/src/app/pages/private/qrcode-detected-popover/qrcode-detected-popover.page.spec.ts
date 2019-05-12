import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QrcodeDetectedPopoverPage } from './qrcode-detected-popover.page';

describe('QrcodeDetectedPopoverPage', () => {
  let component: QrcodeDetectedPopoverPage;
  let fixture: ComponentFixture<QrcodeDetectedPopoverPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrcodeDetectedPopoverPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QrcodeDetectedPopoverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
