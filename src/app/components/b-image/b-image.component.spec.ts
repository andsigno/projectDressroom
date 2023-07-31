import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BImageComponent } from './b-image.component';

describe('BImageComponent', () => {
  let component: BImageComponent;
  let fixture: ComponentFixture<BImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
