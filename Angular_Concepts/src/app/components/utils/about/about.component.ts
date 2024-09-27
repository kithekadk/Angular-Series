import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  constructor(private router: Router) {}

  goToProfile(id: string) {
    this.router.navigate(['profile', id]); // Relative path, uses `navigate()`
  }

  goToHome() {
    this.router.navigateByUrl('/home'); // Absolute path, uses `navigateByUrl()`
  }
}
