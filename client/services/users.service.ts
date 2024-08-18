import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {User} from "../types/types";

@Injectable({providedIn: 'root'})
export class UsersService {
    private readonly url = 'https://localhost:5001/api/users';
    http = inject(HttpClient)
    
    getUsers(next:any){
        this.http.get<User>(this.url)
            .subscribe({
                next,
                error: error => console.log(error),
                complete: () => console.log('completed'),
            })
    }
}
