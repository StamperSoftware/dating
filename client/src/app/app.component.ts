import {Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {AngularJSUrlCodec} from "@angular/common/upgrade";
import {UsersService} from "../../services/users.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  
    http = inject(HttpClient)
    usersService = inject(UsersService)
    title = 'Stamper Software Dating';
    users:any;
    ngOnInit() {
        this.usersService.getUsers((users:any) => this.users=users)
    }

}
