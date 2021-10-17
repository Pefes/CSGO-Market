import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastOpenedItemComponent } from './last-opened-item.component';

describe('LastOpenedItemComponent', () => {
  let component: LastOpenedItemComponent;
  let fixture: ComponentFixture<LastOpenedItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LastOpenedItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LastOpenedItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
