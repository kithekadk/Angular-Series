# Components And Data Binding

- A **component** is a single unit of a user interface.
- An **application** is built by combining different components.
- Executing the `ng new` command creates a new component, which will act as the root component.

### Each component has:
- An `HTML template`: Defines the structure of the component or what will be rendered.
- A `CSS file`: Defines the styling.
- A `TypeScript file`: Defines behavior.
- A `testing specification file`: Used for writing unit tests.

## Creating A Component
### Through the Terminal:
- To create a new component, run:
- > `ng generate component <componentname>` 
- Or the short hand way
- > `ng g c <componentname>`
  > 
## Component Decorator
- A component is a normal class, but to convert it into a component, we add the **@Component** decorator, which takes an object with the following properties:

### 1. Selector:
- Used like a CSS selector to select an element.

### Example: {id="example_1"}
- selector: 'app-home'

### 2. TemplateUrl:
- Link to the component template or HTML page.
- An alternative is using **template**.

### 3. StylesUrl:
- An array that contains the links to the styles the component uses.
- An alternative is using **styles**.

### 4. Standalone:
- A feature that allows a component to import its dependencies directly without needing NgModule
- Takes in a boolean value, true or false

### 5. Imports:
- An array that takes in a list of all dependencies including, directives, pipes, components etc.

## Data Binding
- **Data binding** creates communication between the component and the HTML, making the DOM interactive.

### Text Interpolation
- **Interpolation** displays string values dynamically into the HTML template using double curly braces - {{}}.

### Example: {id="example_2"}
- In the template file: `<p>Programming language: {{language}}</p>`
- in the component file, have a property language in the class i.e 
```typescript
  export class FirstComponent {
    language = 'TypeScript'
  }
```
## Property Binding

- **Property binding** is used to set the value of a property for an element or directive.

### Example: {id="example_3"}
- In the component:
- 
- - in the component file, have a property language in the class i.e

```typescript
export class FirstComponent {
    imageLink = 'linktoimage';
    disabled = true;
}
```

- In the template: `<td [attr.colspan]="colspanValue">A cell</td>`

  

## Class Binding

- **Class binding** is used to add or remove CSS classes on an element.
- Classes can be added dynamically based on component data.

### Example: {id="example_4"}
- In the component:
```typescript
export class FirstComponent {
    isSpecial = true;
}
```
- In the template: `<div [class.special]="isSpecial">This div is special</div>`
- You can bind multiple classes using an object eg. `<div [ngClass]="{ special: isSpecial, 'another-class': anotherCondition }"></div>`


## Style Binding

- **Style binding** is used to set inline styles of HTML elements dynamically.
- Similar to class binding, you can bind to style properties.

### Example: {id="example_5"}
- In the component:
```typescript
export class FirstComponent {
    isActive = true;
}
```
- In the template: `<div [style.color]="isActive ? 'red' : 'green'">This text is styled</div>`
- You can also bind multiple styles using an object: `<div [ngStyle]="{ 'font-weight': isActive ? 'bold' : 'normal', 'font-size': '20px' }"></div>`




## Two-Way Data Binding

- **Two-way binding** allows data to flow both ways between the component and the view.
- Angular's `ngModel` directive facilitates this.

### Example:
- In the component:
```typescript
export class FirstComponent {
    name = 'Angular';
}
```
- In the template: 
```html
    <input [(ngModel)]="name">
    <p>Hello, {{name}}!</p>
```



