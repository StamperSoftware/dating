import {Component, inject} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AccountService} from "../../../../services/account.service";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {TitleCasePipe} from "@angular/common";

@Component({
    selector: 'app-nav',
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        BsDropdownModule,
        RouterLink,
        RouterLinkActive,
        TitleCasePipe,
    ],
    templateUrl: './nav.component.html',
    styleUrl: './nav.component.css'
})
export class NavComponent {
    router = inject(Router);
    private toastr = inject(ToastrService)
    accountService = inject(AccountService);
    usernameControl = new FormControl<string>("");
    passwordControl = new FormControl<string>('');
    
    handleLogin() {
        const username = this.usernameControl.value ?? '';
        const password = this.passwordControl.value ?? '';
        this.accountService.login(username, password)
            .subscribe({
                next : response => {
                    this.router.navigateByUrl('/members');
                    this.passwordControl.setValue("");
                },
                error : response => {
                    this.toastr.error(response.error)
                },
            });
    }
    
    handleLogout() {
        this.accountService.logout();
        this.router.navigate(['/']);
    }
    
}
