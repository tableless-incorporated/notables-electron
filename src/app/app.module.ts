import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TreeNodeComponent } from './sidebar/treenode.component';
import { MiddlebarComponent } from './middlebar/middlebar.component';
import { MainbarComponent } from './mainbar/mainbar.component';
import { CustomPipesModule } from 'ngx-custom-pipes';
import { NgxMdModule } from 'ngx-md';
import { Md2txtPipe } from './md2txt.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    MiddlebarComponent,
    MainbarComponent,
    Md2txtPipe,
    TreeNodeComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
