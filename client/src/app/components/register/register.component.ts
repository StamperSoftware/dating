import {Component, inject, input, output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {User} from "../../../../types/types";
import {AccountService} from "../../../../services/account.service";

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
    cancelEvent = output();
    model:any = {};
    updateField(newValue:string, field:string){
        this.model[field] = newValue;
    }
    register(){
        this.accountService.register(this.model).subscribe({
            next: () =>this.cancelEvent.emit(),
            error:(err) => console.log(err),
        })
    }
}
