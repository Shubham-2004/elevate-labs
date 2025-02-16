import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPagePreviewComponent } from './landing-page-preview.component';

describe('LandingPagePreviewComponent', () => {
  let component: LandingPagePreviewComponent;
  let fixture: ComponentFixture<LandingPagePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingPagePreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingPagePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
