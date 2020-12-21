import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacksList2Component } from './packs-list2-component.component';

describe('PacksList2ComponentComponent', () => {
  let component: PacksList2Component;
  let fixture: ComponentFixture<PacksList2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacksList2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PacksList2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
