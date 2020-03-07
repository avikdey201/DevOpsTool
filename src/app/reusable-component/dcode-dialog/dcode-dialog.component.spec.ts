import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcodeDialogComponent } from './dcode-dialog.component';

describe('DcodeDialogComponent', () => {
  let component: DcodeDialogComponent;
  let fixture: ComponentFixture<DcodeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcodeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcodeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
