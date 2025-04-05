import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayerdetailsPage } from './playerdetails.page';

describe('PlayerdetailsPage', () => {
  let component: PlayerdetailsPage;
  let fixture: ComponentFixture<PlayerdetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerdetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
