import {Component} from '@angular/core';
import {RegisterComponent} from "../components/register/register.component";

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [RegisterComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent {
    
    registerMode = false;
    
    registerToggle() {
        this.registerMode = !this.registerMode; 
    }
    handleCancelRegister(){
        this.registerMode = false;
    }
}
