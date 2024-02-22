import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { getAuth, provideAuth } from '@angular/fire/auth';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"simple-crm-af52a","appId":"1:436386836199:web:53bb2e36aef4ae43ac7c42","storageBucket":"simple-crm-af52a.appspot.com","apiKey":"AIzaSyAvQLfQKPLFq_a4oNFe00gqYKUE9ljc0no","authDomain":"simple-crm-af52a.firebaseapp.com","messagingSenderId":"436386836199"}))),
  importProvidersFrom(provideFirestore(() => getFirestore())),
  importProvidersFrom(provideStorage(() => getStorage())),
  importProvidersFrom(provideAuth(() => getAuth()))]
};
