import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import * as types from '../types/types'

@Injectable({providedIn: 'root'})
export class UsersService {
    private readonly url = 'https://localhost:5001/api/users';
    http = inject(HttpClient)
    
    getUsers(next:any){
        this.http.get(this.url)
            .subscribe({
                next,
                error: error => console.log(error),
                complete: () => console.log('completed'),
            })
    }
}
