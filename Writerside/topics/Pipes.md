# Pipes



Angular Pipes are a powerful feature in Angular for transforming data right in your templates. This guide will help both beginners and experienced developers understand how to use Angular Pipes in their projects effectively.

### What Are Angular Pipes?
Angular Pipes allow you to write display-value transformations that you can declare in your HTML. The purpose of pipes is to transform data for the view layer without modifying the original data source. Common use cases include formatting dates, numbers, and texts, or filtering and sorting lists.
### Pure and Impure Pipes
Angular categorizes pipes as either **pure** or **impure**. Pure pipes only execute when it detects a pure change to the input value (like primitives or object reference changes). Impure pipes execute on every component change detection cycle.

- **Pure Pipe** example:
  ```typescript
  @Pipe({
  name: 'myPurePipe',
  pure: true
  })
  ```

- **Impure Pipe** example:
  ```typescript
  @Pipe({
  name: 'myImpurePipe',
  pure: false
  })
  ```
  
### Basic Usage
To apply a pipe, you use the pipe operator (`|`) within the template expression, followed by the pipe name. Here’s a simple example:

```html
<!-- Default date pipe to format a date -->
<p>{{ today | date }}</p>
```
{style="note"}

### Common Built-in Pipes
Angular comes with several built-in pipes:
- **DatePipe**: Formats a date value according to locale rules.
- **UpperCasePipe**: Transforms text to uppercase.
- **LowerCasePipe**: Transforms text to lowercase.
- **CurrencyPipe**: Transforms a number to a currency string.
- **DecimalPipe**: Transforms a number into a decimal number string, with a specified number of digits before and after the decimal point.

### Creating a Custom Pipe
For custom transformations, Angular allows you to create your own pipes. Here’s a brief on creating and using a custom pipe:

1. **Generate Pipe**: Use Angular CLI to generate a new pipe.
   ```bash
   ng generate pipe <pipename>
   ```
    - Or the short hand way
> `ng g p <pipename>`
   {style="note"}

2. **Implement Pipe Logic**:
   Edit the generated pipe file. For example, to create a pipe that raises a value to a power:
   ```typescript
   import { Pipe, PipeTransform } from '@angular/core';

   @Pipe({name: 'exponentialStrength'})
   export class ExponentialStrengthPipe implements PipeTransform {
       transform(value: number, exponent?: number): number {
           return Math.pow(value, isNaN(exponent) ? 1 : exponent);
       }
   }
   ```

3. **Use Your Custom Pipe**:
   You can now use your custom pipe in any template:
   ```html
   <p>{{ 2 | exponentialStrength:10 }}</p>
   ```

### Chaining Pipes
You can chain pipes together to perform multiple transformations. Here’s how to chain pipes:
```html
<!-- Chaining pipes -->
<p>{{ birthday | date | uppercase }}</p>
```
{style="note"}

