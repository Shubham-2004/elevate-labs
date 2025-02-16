import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeaValidationComponent } from './idea-validation.component';

describe('IdeaValidationComponent', () => {
  let component: IdeaValidationComponent;
  let fixture: ComponentFixture<IdeaValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdeaValidationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdeaValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
