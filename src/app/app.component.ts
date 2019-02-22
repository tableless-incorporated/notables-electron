import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebaseui from 'firebaseui';
import { auth } from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  ui: firebaseui.auth.AuthUI;
  pendingRequest = false;
  title = 'note';

  selectedNote: any;

  constructor(public db: AngularFirestore, public afAuth: AngularFireAuth) {
    this.db.firestore.enablePersistence();
    this.ui = new firebaseui.auth.AuthUI(this.afAuth.auth);
    if (this.ui.isPendingRedirect()) {
      this.pendingRequest = true;
      this.login();
    }
  }

  onSelectedNote($event) {
    this.selectedNote = $event;
  }

  login() {
    const uiConfig = {
      signInFlow: 'popup',
      signInOptions: [
        {
          provider: auth.GoogleAuthProvider.PROVIDER_ID,
          requireDisplayName: false
        },
      ],
      callbacks: {
        signInSuccessWithAuthResult(authResult, redirectUrl) {
          // User successfully signed in.
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.
          return false;
        },
      }
    };
    this.ui.start('#firebaseui-auth-container', uiConfig);
    /*
        this.afAuth.auth.signInWithEmailAndPassword('nicolas@thomasson.fr', "123456");*/
  }
}
