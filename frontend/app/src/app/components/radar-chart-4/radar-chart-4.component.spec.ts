import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadarChart4Component } from './radar-chart-4.component';

describe('RadarChart4Component', () => {
  let component: RadarChart4Component;
  let fixture: ComponentFixture<RadarChart4Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RadarChart4Component]
    });
    fixture = TestBed.createComponent(RadarChart4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
