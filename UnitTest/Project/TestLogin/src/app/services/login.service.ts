import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  login(username : string, password:string):boolean{
    if(username =='admin' && password =='admin')
    {
      localStorage.setItem('user',username)
      return true
    }
    return false
  }
  
  // isAuthenticated():boolean{
  //   const token = localStorage.getItem('user')
  //   if(!token || token === '' || token === undefined){
  //     return false
  //   }
  //   return true
  // }

  logout(){
    // localStorage.clear()
    localStorage.removeItem('user')
  }

  getUsername():string{
    return localStorage.getItem('user') ?? ''
  }
}
