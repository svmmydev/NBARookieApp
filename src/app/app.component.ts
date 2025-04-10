import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { camera, shareSocial, starOutline, logOutOutline, star } from 'ionicons/icons';
import { AuthService } from './services/auth.service';
import { StatusBar } from '@capacitor/status-bar';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService) {
    addIcons({star, starOutline, camera, shareSocial, logOutOutline});
    this.initializeApp();
  }

  ngOnInit(): void {
      this.authService.user$.subscribe((user) => {
        if (user) {
          this.authService.currentUserSig.set({
            uid: user.uid!,
            email: user.email!,
            username: user.displayName!
          });
        } else {
          this.authService.currentUserSig.set(null);
        }
        console.log('Current user: ',this.authService.currentUserSig())
      });
  }

  initializeApp() {
    StatusBar.setOverlaysWebView({ overlay: false })
      .catch(err => console.warn('El overlayView no es soportado en web'));
  }
}
