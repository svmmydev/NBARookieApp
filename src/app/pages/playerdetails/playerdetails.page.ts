import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonButtons, IonButton, IonIcon, IonList, IonCardHeader, IonCardTitle, IonItem, IonCardSubtitle } from '@ionic/angular/standalone';

@Component({
  selector: 'app-playerdetails',
  templateUrl: './playerdetails.page.html',
  styleUrls: ['./playerdetails.page.scss'],
  imports: [IonCardSubtitle, IonCardTitle, IonCardHeader, IonIcon, IonButton, IonButtons, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class PlayerdetailsPage implements OnInit {

  constructor() { }

  ngOnInit() { }

}
