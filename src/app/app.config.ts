import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "ring-of-fire-499b8", appId: "1:834096788062:web:0d9725fe09ed8df6ae3acf", storageBucket: "ring-of-fire-499b8.firebasestorage.app", apiKey: "AIzaSyBQ7V_QfpBVA-QUPWSTZkNR6oY09JzRZNY", authDomain: "ring-of-fire-499b8.firebaseapp.com", messagingSenderId: "834096788062" })), provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase()), provideFirebaseApp(() => initializeApp({ projectId: "ring-of-fire-499b8", appId: "1:834096788062:web:0d9725fe09ed8df6ae3acf", storageBucket: "ring-of-fire-499b8.firebasestorage.app", apiKey: "AIzaSyBQ7V_QfpBVA-QUPWSTZkNR6oY09JzRZNY", authDomain: "ring-of-fire-499b8.firebaseapp.com", messagingSenderId: "834096788062" })), provideFirestore(() => getFirestore())]
};
