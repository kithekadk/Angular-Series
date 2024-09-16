# Directives

- These are classes that add additional behavior to DOM elements in Angular applications. They can help in manipulating the DOM, applying CSS styles, handling user input etc

## Types of Directives
1. `Component Directives` - Most common directives. Components are directives with templates.
2. `Attribute Directives` - Change the appearance or behaviour of an element, component or another directive, e.g. `ngStyle`, `ngClass`
3. `Structural Directives` - Makes changes in the layout of the DOM. Dynamically adding or removing element from the DOM, e.g. `ngIf`, `ngFor`

## Built-in attribute directives
- NgClass - Adds/removes a set of CSS classes.
- NgStyle - Adds/removes a set of HTML styles.
- NgModel - Adds 2-way data binding to and HTML form element

## Adding and Removing classes with NgClass
NB. If you want to add/remove a single class, use class binding. i.e, In the template file;
```html
<div [class] = "className">...</div>
```
```Typescript
export class classBinding {
  className = 'flex';
}
```

- From version 17 onwards, using NgClass requires importing it to the desired component's imports list.

### Using `NgClass` with an expression
- On the element you'd like to style, add [ngClass] and set it equal to an expression.
- Example:
```html
<div [ngClass] = "isMobile ? 'visible' : 'hidden'">Initially visible</div>
```
> This toggles the visibility of the div to be visible when isMobile has a value of true.
{style="note"}
  
### Using `ngClass` with a method
- Add the method in the component class. e.g,
```Typescript
setColor(){
success:boolean = true;

    return {
        'bg-green-600': this.success,
        'bg-red-500': !this.success
    }
}
```
- In the template file;
```html
    <div [ngClass]="setColor()">This elements color will be dynamically set</div>
```

## Working  with `NgStyle` 
- Add it to the component's imports list.
 
### Using Inline Style Binding

- Example;
#### Component; {id="component_1"}
```Typescript
    isHighlighted: boolean = true;

    getStyles() {
        return {
            'background-color': this.isHighlighted ? 'yellow' : 'orange',
            'font-size': this.isHighlighted ? '20px' : '14px',
            'padding': '10px'
        };
    }
```
#### Template {id="template_1"}
```html
<div [ngStyle]="getStyles()">
  This div has dynamic inline styles!
</div>

```

## Using Direct Style Binding
### Component;
```Typescript
    dynamicColor: string = 'blue';
    dynamicFontSize: string = '16px';
```

### Template
```html
<p [ngStyle]="{ 'color': dynamicColor, 'font-size': dynamicFontSize }">
  This text will have dynamically applied color and font size.
</p>
```

## Working with `NgModel`
- Add it to the component's imports list.
- NgModel can be used to both display and update properties when the user makes changes

- To work with ngModel, add an `[(ngModel)]` binding on an html form element
- Example, Component file;
```Typescript
  name = "John Doe" 
```
- Template file
```html
    <input type="text" [(ngModel)] = "name">
```

# Built-in structural directives

Angular provides several built-in structural directives that help you control the layout of your application by adding or removing elements in the DOM. These directives include `*ngIf`, `*ngFor`, and `*ngSwitch`. Below is a detailed guide on each of these directives with examples.

## 1. `*ngIf`

The `*ngIf` directive conditionally includes or excludes an element from the DOM based on the boolean expression provided.

### Description {id="description_1"}

- **Purpose**: To conditionally display or hide elements.
- **Syntax**: `*ngIf="condition"`

### Example {id="example_1"}

```html
<div *ngIf="isVisible">
  This element is visible only if 'isVisible' is true.
</div>
```

## 2. `*ngFor`
The `*ngFor` directive is used to iterate over a collection and create a new instance of the template for each item in the collection.

### Description {id="description_2"}

- **Purpose**: To repeat elements based on the number of items in a collection.
- **Syntax**: `*ngFor="let todo of todos"`

### Example {id="example_2"}
- Component;
```Typescript
    todos: string[] = ['Code', 'Eat', 'Sleep'];
```
- Template;
```html
    <ul>
        <li *ngFor="let todo of todos">
            {{ todo }}
        </li>
    </ul>
```
### Getting the index of an item 
- In the *ngFor, add a semicolon and let i=index to the shorthand.
```html
<div *ngFor="let todo of todos; let i=index">{{ i + 1 }} - {{ todo.name }}</div>
```

### Tracking items with *ngFor trackBy
- This reduces the number of calls your application makes to the serve by tracking changes to an item list. 
- The `trackBy` property can change and re-render items that have changed instead of the entire list of items

#### How
1. Add a method to the component that returns the value NgFor should track e.g unique value column such as Id. 
If the browser has already rendered `Id`, Angular keeps track of it and doesn't re-query the server for the same `Id`.

#### Example {id="example_3"}
```Typescript
  todos: { id: number, name: string }[] = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' }
  ];

  trackByItemId(index: number, todo: { id: number, name: string }): number{
    return todo.id;
  }
```

Template
```HTML
<ul>
  <li *ngFor="let item of items; trackBy: trackByItemId">
    {{ item.name }}
  </li>
</ul>
```

## 3. `*ngSwitch`
The `*ngSwitch` directive allows you to conditionally display one of multiple elements based on the value of an expression.
- To use the directives, add the NgSwitch, NgSwitchCase and NgSwitchDefault to the component's imports list.
### Description

- **Purpose**: To choose between multiple elements based on a condition.
- **Syntax**: 
> `*ngSwitch="expression"`
> `*ngSwitchCase="value"`
> `*ngSwitchDefault`
{style="note"}

### Example 
- Component;
```Typescript
     color: string = 'red';
```
- Template;
```html
    <div [ngSwitch]="color">
        <div *ngSwitchCase="'red'">The color is red</div>
        <div *ngSwitchCase="'blue'">The color is blue</div>
        <div *ngSwitchDefault>The color is not red or blue</div>
    </div>
```




