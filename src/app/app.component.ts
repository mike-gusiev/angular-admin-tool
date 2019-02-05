import { Component } from '@angular/core';
import { environment } from '@env/environment';

@Component({
  selector: 'at-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public navbar: any[] = environment.navbar;
}
