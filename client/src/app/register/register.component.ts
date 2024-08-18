import {Component, inject, input, output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {User} from "../../../types/types";
import {AccountService} from "../../../services/account.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
    accountService = inject(AccountService);
    private toastr = inject(ToastrService);
    cancelEvent = output();
    model:any = {};
    
    updateField(newValue:string, field:string){
        this.model[field] = newValue;
    }
    register(){
        this.accountService.register(this.model).subscribe({
            next: () => this.cancelEvent.emit(),
            error:(err) => {
                this.toastr.error('Bad Request')
            },
        })
    }
}
