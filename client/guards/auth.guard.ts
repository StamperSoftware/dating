import { CanActivateFn } from '@angular/router';
import {inject} from "@angular/core";
import {AccountService} from "../services/account.service";
import {ToastrService} from "ngx-toastr";

export const authGuard: CanActivateFn = (route, state) => {
    const accountService = inject(AccountService);
    const toastr = inject(ToastrService);
    
    if (accountService.currentUser()) {
        return true;
    } else {
        toastr.error("Must login to continue");
        return false;
    }
};
