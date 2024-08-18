import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../types/types";
import {map} from "rxjs";

@Injectable({providedIn: 'root'})
export class AccountService {
    private http = inject(HttpClient);
    baseUrl = "https://localhost:5001/api/account";
    currentUser = signal<User|null>(null);
    
    login(username:string,password:string){
        return this.http.post<User>(`${this.baseUrl}/login`, {username,password}).pipe(
            map(user => {
                if (user) {
                    localStorage.setItem("user", JSON.stringify(user));
                    this.currentUser.set(user);
                }
                return user;
            })
        );
    }
    register(model:{username:string,password:string}){
        const {username, password} = model;
        return this.http.post<User>(`${this.baseUrl}/register`, {username,password}).pipe(
            map(user => {
                if (user) {
                    localStorage.setItem("user", JSON.stringify(user));
                    this.currentUser.set(user);
                }
                return user;
            })
        );
    }
    
    logout() {
        localStorage.removeItem("user");
        this.currentUser.set(null);
    }
}
