import * as firebase from 'firebase';

import { WindowRef } from './window-ref.service';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';

import { SharedModule } from './shared/shared.module';

import { LabResolver } from './lab.resolver';
import { LabStorageService } from './lab-storage.service';
import { LabTemplateService, InMemoryLabTemplateService } from './lab-template.service';
import { LabExecutionService } from './lab-execution.service';
import { OutputFilesService } from './output-files.service';
import { LoginService } from './login.service';
import { UserService } from 'app/user/user.service';
import { AuthService, FirebaseAuthService, OfflineAuthService } from './auth';
import { LocationHelper } from './util/location-helper';

import { AppComponent } from './app.component';

import { APP_ROUTES } from './app.routes';

import { environment } from '../environments/environment';
import { DATABASE } from './app.tokens';
import { DbRefBuilder } from './firebase/db-ref-builder';

// We need to export this factory function to make AoT happy
export function databaseFactory() {
  return firebase.initializeApp(environment.firebaseConfig).database();
}

const AnimationsModule = [environment.testing ? NoopAnimationsModule : BrowserAnimationsModule];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ... AnimationsModule,
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    RouterModule.forRoot(APP_ROUTES, { preloadingStrategy: PreloadAllModules }),
    SlimLoadingBarModule.forRoot(),
    SharedModule
  ],
  providers: [
    LoginService,
    LabStorageService,
    LabExecutionService,
    OutputFilesService,
    LabResolver,
    { provide: LabTemplateService, useClass: InMemoryLabTemplateService },
    UserService,
    DbRefBuilder,
    { provide: DATABASE, useFactory: databaseFactory },
    { provide: AuthService, useClass: environment.offline ? OfflineAuthService : FirebaseAuthService },
    LocationHelper,
    WindowRef
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
