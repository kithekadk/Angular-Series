import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ExponentialStrengthPipe } from '../../pipes/exponential-strength.pipe';

@Component({
  selector: 'app-pipes',
  standalone: true,
  imports: [CommonModule, ExponentialStrengthPipe],
  templateUrl: './pipes.component.html',
  styleUrl: './pipes.component.css'
})
export class PipesComponent {
  today: Date = new Date(); // Date for DatePipe example
  name: string = 'Angular Concepts'; // Name for UpperCase and LowerCase pipes
  amount: number = 1234.56; // Currency example
  pi: number = 3.14159265359; // DecimalPipe example
  birthday: Date = new Date(1990, 1, 15); // Chaining pipes example
}
