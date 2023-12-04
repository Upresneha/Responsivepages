import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Testd3Component } from './testd3.component';

describe('Testd3Component', () => {
  let component: Testd3Component;
  let fixture: ComponentFixture<Testd3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Testd3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Testd3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
