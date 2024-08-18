import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {RegisterComponent} from "./register/register.component";
import {MemberListComponent} from "./members/list/list.component";
import {MemberDetailComponent} from "./members/detail/detail.component";
import {ListsComponent} from "./lists/lists.component";
import {MessagesComponent} from "./messages/messages.component";
import {authGuard} from "../../guards/auth.guard";

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {
        path: '',
        runGuardsAndResolvers: "always",
        canActivate:[authGuard],
        children : [
            {path: 'register', component: RegisterComponent},
            {path: 'members', component: MemberListComponent, canActivate:[authGuard]},
            {path: 'members/:id', component: MemberDetailComponent, canActivate:[authGuard]},
            {path: 'lists', component: ListsComponent},
            {path: 'messages', component: MessagesComponent},
        ]
    },
    {path: '**', component: HomeComponent, pathMatch: 'full'},
];
