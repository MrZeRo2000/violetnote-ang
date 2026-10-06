import { environment } from '../../environments/environment';
import {HttpInterceptorFn} from "@angular/common/http";
import {delay} from "rxjs";

export const delayInterceptor: HttpInterceptorFn = (req, next) => {
  if (!environment.production && !req.url.includes('/assets/') && (environment.httpDelay > 0)) {
    return next(req).pipe(delay(environment.httpDelay));
  }

  return next(req);
};
