import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagePropertiesComponent } from './image-properties.component';

describe('ImagePropertiesComponent', () => {
  let component: ImagePropertiesComponent;
  let fixture: ComponentFixture<ImagePropertiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImagePropertiesComponent]
    });
    fixture = TestBed.createComponent(ImagePropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
