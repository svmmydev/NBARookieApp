import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';
import { provideAuth } from '@angular/fire/auth';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAXvJ5pNG-wzLDP6LDHwRlL0osWyb7Wv9Q",
  authDomain: "nbarookieapp-fad2e.firebaseapp.com",
  projectId: "nbarookieapp-fad2e",
  storageBucket: "nbarookieapp-fad2e.firebasestorage.app",
  messagingSenderId: "133109009732",
  appId: "1:133109009732:web:b55b7d54f5095bd6b0db11",
  measurementId: "G-ZMZ16YJQM4"
};

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth())
  ],
});
