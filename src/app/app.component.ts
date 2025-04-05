import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { camera, shareSocial, starOutline } from 'ionicons/icons';
import { IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonList,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonIcon,
  IonButtons
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, IonButtons, IonIcon, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonList, IonButton, IonContent, IonHeader, IonTitle, IonToolbar],
})
export class AppComponent {

  constructor() {
    addIcons({starOutline, camera, shareSocial});
  }

}
