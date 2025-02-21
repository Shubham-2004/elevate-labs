import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogogenerateComponent } from './logogenerate.component';

describe('LogogenerateComponent', () => {
  let component: LogogenerateComponent;
  let fixture: ComponentFixture<LogogenerateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogogenerateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogogenerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
