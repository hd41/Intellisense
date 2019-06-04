import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RespPageComponent } from './resp-page.component';

describe('RespPageComponent', () => {
  let component: RespPageComponent;
  let fixture: ComponentFixture<RespPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RespPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RespPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
