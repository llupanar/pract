import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolSubscriptionsComponent } from './pool-subscriptions.component';

describe('PoolSubscriptionsComponent', () => {
  let component: PoolSubscriptionsComponent;
  let fixture: ComponentFixture<PoolSubscriptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PoolSubscriptionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PoolSubscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
