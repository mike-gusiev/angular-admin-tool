import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest, HttpHeaders,
} from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

export class AddHeaderInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${environment.token}`,
    });
    const clonedRequest = req.clone({headers});
    return next.handle(clonedRequest);
  }
}
