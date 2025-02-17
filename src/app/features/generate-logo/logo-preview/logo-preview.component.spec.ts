import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoPreviewComponent } from './logo-preview.component';

describe('LogoPreviewComponent', () => {
  let component: LogoPreviewComponent;
  let fixture: ComponentFixture<LogoPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoPreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
