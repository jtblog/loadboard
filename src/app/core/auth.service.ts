import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  user$: Observable<User>
  currentUser: any = {}

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router) {

                this.afAuth.authState.subscribe(user => {
                  if (user) {
                    const usr = user.toJSON()
                    Object.keys(usr).forEach((key) => {
                      this.currentUser[key] = usr[key]
                    })
                    //localStorage.setItem('user', JSON.stringify(this.currentUser))
                    this.getUser(user)
                    this.router.navigate(["home"])
                  } else {
                    //localStorage.setItem('user', null);
                    /*JSON.parse(localStorage.getItem('user'));*/
                  }
                })

                this.user$ = this.afAuth.authState.pipe(
                  switchMap(user => {
                    if (user) {
                      const usr = user.toJSON()
                      Object.keys(usr).forEach((key) => {
                        this.currentUser[key] = usr[key]
                      })
                      //localStorage.setItem('user', JSON.stringify(this.currentUser))
                      this.getUser(user)
                      this.router.navigate(["home"])
                      return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
                    } else {
                      //localStorage.setItem('user', null)
                      return of(null)
                    }
            
                  })
                );
              }
  
  getUser(user){
    var query = this.afs.collection("users", ref => ref.where("uid", "==", user.uid)).valueChanges()
    query.subscribe(
      users => {
        Object.keys(users[0]).forEach((key) => {
          this.currentUser[key] = users[0][key]
        })
      }
    )
  }

  signInWithEmail(eml, pwd, schema){
    const req = this.afAuth.auth.signInWithEmailAndPassword(eml, pwd)
    req.then((credential) => {
        const usr = credential.user.toJSON()
        Object.keys(usr).forEach((key) => {
          this.currentUser[key] = usr[key]
        })
        this.updateUserData(credential.user, schema)
      }).catch(err => {
      });
    return req
  }

  createUserWithEmailAndPassword(eml, pwd){
    const req = this.afAuth.auth.createUserWithEmailAndPassword(eml, pwd)
    req.then((UserCredential) => {
      }).catch(err => {
      });
    return req
  }

  updateUserData(user: firebase.User, schema: any) {
    var query = this.afs.collection("users", ref => ref.where("uid", "==", user.uid)).valueChanges()
    //var query = this.afs.doc<User>(`users/${user.uid}`).valueChanges()
    query.subscribe(
      users => {
        Object.keys(users[0]).forEach((key) => {
          this.currentUser[key] = users[0][key]
        })
      }
    )
    const userRef: AngularFirestoreDocument<any> = this.afs.doc<User>(`users/${user.uid}`)
    const data: User = {
      uid: user.uid,
      email: user.email,
      roles: {
        guest: true,
        client: true
      },
      activities: this.isNullOrUndefinedOrEmpty(this.currentUser["activities"]) ? {} : this.currentUser["activities"],
      balance: this.isNullOrUndefinedOrEmpty(this.currentUser["balance"]) ? 0 : this.currentUser["balance"],
      betslips: this.isNullOrUndefinedOrEmpty(this.currentUser["betslips"]) ? {} : this.currentUser["betslips"],
      displayName: this.isNullOrUndefinedOrEmpty(user.displayName) ? "Client" : user.displayName,
      phoneNumber: user.phoneNumber,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      transactions: {}
    }
    if(!this.isNullOrUndefinedOrEmpty(schema)){
      data.displayName = schema.firstName + " " + schema.lastName
      data.phoneNumber = schema.phoneNumber
      user.sendEmailVerification()
      //data.password = schema.password
      Object.keys(schema).forEach((key) => {
        this.currentUser[key] = schema[key]
      })
    }
    //localStorage.setItem('user', JSON.stringify(this.currentUser))
    return userRef.set(data, { merge: true})
  }

  thenary_operator_map(){

  }

  quad_operator(){

  }

  signOut(){
    this.afAuth.auth.signOut();
    this.currentUser = {}
    this.router.navigate(['signin']);
  }

  canRead(user: User): boolean {
    const allowed = ["admin", "client", "guest"]
    return this.checkAuthorization(user, allowed)
  }

  canEdit(user: User): boolean {
    const allowed = ["admin", "client"]
    return this.checkAuthorization(user, allowed)
  }

  canDelete(user: User): boolean {
    const allowed = ["admin"]
    return this.checkAuthorization(user, allowed)
  }

  private checkAuthorization(user: User, allowedRoles: string[]): boolean{
    if(!user) return false
    for(const role of allowedRoles){
      if(user.roles[role]){
        return true
      }
    }
    return false
  }

  isNullOrUndefinedOrEmpty(_in){
    switch(_in){
      case null:
        return true;
        break;
      case undefined:
        return true;
        break;
      case "null":
        return true;
        break;
      case "undefined":
        return true;
        break;
      case {}:
        return true;
        break;
      case []:
        return true;
        break;
      default:
        if(typeof _in == "string"){
          if(_in.trim() == "" || _in.split(" ").join("") == ""){
            return true;
          }else{
            return false;
          }
        }else if(typeof _in == "undefined"){
          return true;
        }else if(_in == {}){
          return true;
        }else if(JSON.stringify(_in) == "{}"){
          if(Object.keys(_in).length > 0 ){
            return false;
          }else{
            return true;
          }
        }else{
          return false;
        }
        break;
      }
  }

  /*getUser(){
    //return this.currentUser == undefined || this.currentUser == null ? JSON.parse(localStorage.getItem('user')): this.currentUser
    return this.currentUser
  }*/

}
