import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwgroupsComponent } from './swgroups.component';

describe('SwgroupsComponent', () => {
  let component: SwgroupsComponent;
  let fixture: ComponentFixture<SwgroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SwgroupsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SwgroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
