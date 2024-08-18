import { HttpInterceptorFn } from '@angular/common/http';
import {NavigationExtras, Router} from "@angular/router";
import {inject} from "@angular/core";
import {ToastrService} from "ngx-toastr";
import {catchError} from "rxjs";

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    const router = inject(Router);
    const toastr = inject(ToastrService);
    console.log("interceptor")
    return next(req).pipe(
        catchError(error => {
            console.log('interceptor')
            if (error) {
                switch(error.status) {
                    case 400: {
                        if (error.error.errors) {
                            const modalStateErrors = [];
                            for (const key in error.error.errors) {
                                if (error.error.errors[key]) {
                                    modalStateErrors.push(error.error.errors[key]);
                                }
                            }
                            throw modalStateErrors.flat();
                        } else {
                            toastr.error(error.error, error.status)
                        }
                        break;
                    }
                    case 401:{
                        toastr.error("Unauthorized", error.status);
                        break;
                    }
                    case 404:
                        console.log('test')
                        router.navigateByUrl("/not-found");
                        break;
                    
                    case 500:{
                        const navigationExtras : NavigationExtras = {state:{error:error.error}};
                        router.navigateByUrl("/server-error", navigationExtras);
                        break;
                    }
                    default:
                        toastr.error("Unexpected error, please refresh page and try again.")
                        break;
                }
                
            }
            
            throw error;
        })
    );
};
