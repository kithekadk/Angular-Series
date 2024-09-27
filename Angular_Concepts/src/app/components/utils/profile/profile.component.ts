import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  userId: string | null = '';

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.userId = params['id']; // Access the route parameter
    });
  }
}
