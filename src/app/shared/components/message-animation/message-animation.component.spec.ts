import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageAnimationComponent } from './message-animation.component';

describe('MessageAnimationComponent', () => {
  let component: MessageAnimationComponent;
  let fixture: ComponentFixture<MessageAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageAnimationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MessageAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
