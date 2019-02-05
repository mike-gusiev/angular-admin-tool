import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  constructor(private http: HttpClient) {
  }

  getImages(): Observable<any> {
    return this.http.get(environment.mainApi + 'account/' + environment.userName + '/images')
      .pipe(map(data => data));
  }

  uploadImages(body: File, description: string): Observable<any> {
    return this.http.post(environment.mainApi + `/upload?title=${body.name}&description=${description}`, body)
      .pipe(map(data => data));
  }

  deleteImage(id): Observable<any> {
    return this.http
      .delete(environment.mainApi +
        'account/' + environment.userName +
        '/' + environment.uploadType
        + `/${id}`)
      .pipe(map((data) => data));
  }
}
