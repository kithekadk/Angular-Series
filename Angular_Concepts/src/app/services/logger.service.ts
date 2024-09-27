import { Injectable } from '@angular/core';

/**
 * Logger Service for logging messages to the console.
 * @providedIn: 'root' - This means the service is available globally in the application.
 */
@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  /**
   * Logs a message to the console.
   * @param message - The message to log.
   */
  log(message: string): void {
    console.log('LoggerService:', message);
  }
}
