import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule, FirebaseAuth } from '@angular/fire';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MiddlebarComponent } from './middlebar/middlebar.component';
import { MainbarComponent } from './mainbar/mainbar.component';
import { CustomPipesModule } from 'ngx-custom-pipes';
import { NgxMdModule } from 'ngx-md';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentsModule } from './components/components.module';
import { MatCardModule, MatInputModule, MatTreeModule, MatIconModule } from '@angular/material';
import { FirefakeService } from './firefake.service';
import { FirebaseService } from './firebase.service';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    MiddlebarComponent,
    MainbarComponent,
   // TreeNodeComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxMdModule.forRoot(),
    CustomPipesModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ComponentsModule,
    MatCardModule,
    MatInputModule,
    MatTreeModule,
    MatIconModule,
  ],
  providers: [{
    provide: 'DataService',
    deps: [ AngularFirestore, AngularFireAuth],
    useFactory: (db: AngularFirestore, afAuth: AngularFireAuth) => {
      return new FirebaseService(db, afAuth);
    }
    // useClass: FirefakeService
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
