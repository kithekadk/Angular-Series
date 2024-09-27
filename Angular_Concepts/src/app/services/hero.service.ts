import { Injectable } from '@angular/core';
import { LoggerService } from './logger.service';

/**
 * HeroService that fetches hero-related data and logs using LoggerService.
 */
@Injectable({
  providedIn: 'root'
})
export class HeroService {
  constructor(private logger: LoggerService) {}

  /**
   * Mock method to fetch heroes.
   * Logs a message using LoggerService.
   */
  getHeroes(): void {
    this.logger.log('Fetching heroes...');
    // Logic to fetch heroes goes here (e.g., HTTP call).
  }
}
