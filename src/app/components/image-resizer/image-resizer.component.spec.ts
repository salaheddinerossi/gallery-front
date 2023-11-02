import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageResizerComponent } from './image-resizer.component';

describe('ImageResizerComponent', () => {
  let component: ImageResizerComponent;
  let fixture: ComponentFixture<ImageResizerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImageResizerComponent]
    });
    fixture = TestBed.createComponent(ImageResizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
