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

  constructor(
    private authService: AuthService
  ) {
    // Register custom icons used throughout the app
    addIcons({star, starOutline, camera, shareSocial, logOutOutline});

    // Run any app-wide initial setup
    this.initializeApp();
  }


  /**
  * ngOnInit
  * Subscribes to Firebase user state and updates the current user signal accordingly.
  * This allows reactive access to user info throughout the app.
  */
  ngOnInit(): void {
      this.authService.user$.subscribe((user) => {
        if (user) {
          // Set authenticated user info into the currentUserSig signal
          this.authService.currentUserSig.set({
            uid: user.uid!,
            email: user.email!,
            username: user.displayName!
          });
        } else {
          // If user is logged out, clear signal
          this.authService.currentUserSig.set(null);
        }

        // Log user for debugging purposes
        console.log('Current user: ',this.authService.currentUserSig())
      });
  }


  /**
  * initializeApp
  * Configures platform-specific behaviors on app startup.
  * - Disables overlay for StatusBar so content doesn't go underneath it.
  */
  initializeApp() {
    StatusBar.setOverlaysWebView({ overlay: false })
      .catch(err => console.warn('El overlayView no es soportado en web'));
  }
}
