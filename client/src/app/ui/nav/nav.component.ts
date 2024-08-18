import {Component, inject} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AccountService} from "../../../../services/account.service";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";

@Component({
    selector: 'app-nav',
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule, 
        BsDropdownModule,
    ],
    templateUrl: './nav.component.html',
    styleUrl: './nav.component.css'
})
export class NavComponent {
    
    accountService = inject(AccountService);
    usernameControl = new FormControl<string>("");
    passwordControl = new FormControl<string>('');
    
    handleLogin() {
        const username = this.usernameControl.value ?? '';
        const password = this.passwordControl.value ?? '';
        this.accountService.login(username, password)
            .subscribe({
                next : response => {

                    this.passwordControl.setValue("");
                },
                error : response => console.log(response),
            });
    }
    
    handleLogout() {
        this.accountService.logout();
    }
    
}
