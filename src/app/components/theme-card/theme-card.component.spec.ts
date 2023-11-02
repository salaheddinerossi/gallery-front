import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeCardComponent } from './theme-card.component';

describe('ThemeCardComponent', () => {
  let component: ThemeCardComponent;
  let fixture: ComponentFixture<ThemeCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThemeCardComponent]
    });
    fixture = TestBed.createComponent(ThemeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
