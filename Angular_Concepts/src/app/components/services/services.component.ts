import { Component } from '@angular/core';
import { LoggerService } from '../../services/logger.service';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {
  constructor(private logger: LoggerService, private heroService: HeroService) {}

  /**
   * Logs a message using LoggerService.
   */
  logMessage(): void {
    this.logger.log('This is a message from ServicesComponent');
  }

  /**
   * Fetches heroes using HeroService.
   */
  fetchHeroes(): void {
    this.heroService.getHeroes();
  }
}
