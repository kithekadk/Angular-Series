import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-ngrx',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './ngrx.component.html',
  styleUrl: './ngrx.component.css'
})
export class NgrxComponent {

}
