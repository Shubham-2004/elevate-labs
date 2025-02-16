import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoDesignerComponent } from './logo-designer.component';

describe('LogoDesignerComponent', () => {
  let component: LogoDesignerComponent;
  let fixture: ComponentFixture<LogoDesignerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoDesignerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoDesignerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
