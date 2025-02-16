import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageEditorComponent } from './landing-page-editor.component';

describe('LandingPageEditorComponent', () => {
  let component: LandingPageEditorComponent;
  let fixture: ComponentFixture<LandingPageEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingPageEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingPageEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
