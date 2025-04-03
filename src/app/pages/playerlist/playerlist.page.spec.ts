import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayerlistPage } from './playerlist.page';

describe('PlayerlistPage', () => {
  let component: PlayerlistPage;
  let fixture: ComponentFixture<PlayerlistPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerlistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
