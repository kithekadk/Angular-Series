# Components Communication

In Angular applications, **components** often need to communicate with each other to share data or trigger events. This communication is primarily between **parent** and **child components**. Angular provides several ways to facilitate this interaction, including:

- `@Input` Decorator (for passing data from parent to child)
- `@Output` Decorator with `EventEmitter` (for passing data from child to parent)
- `@ViewChild` (for direct reference of a child component)
- **Services** (for sharing data across multiple components)

Below is a detailed explanation of each of these methods with relatable examples.


## 1. `@Input` Decorator

The `@Input` decorator is used to pass data from a **parent component** to a **child component**.

### Example: {id="example_1"}

#### Parent Component (HTML):
```html
<!-- Binding the 'parentData' variable to the 'inputData' property of the child component -->
<app-child [inputData]="parentData"></app-child>
```

#### Parent Component (TS):
```Typescript
@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html'
})
export class ParentComponent {
  parentData = 'Data from Parent';
}
```

#### Child Component (TS):
```Typescript
@Component({
  selector: 'app-child',
  templateUrl: './child.component.html'
})
export class ChildComponent {
  @Input() inputData!: string;  // Receive data from parent
}
```

## 2. `@Output` Decorator and `EventEmitter`

The `@Output` decorator in Angular allows communication from the **child component** to the **parent component**. This is achieved by emitting custom events that the parent can listen to and react upon. It works in conjunction with the `EventEmitter` class, which facilitates event emission.

### How It Works:
- The child component defines an event using `@Output` and `EventEmitter`.
- The parent component binds to this event in its template and specifies the event handler function.

### Example:

#### Child Component (TypeScript):
In the child component, we define an event and emit it when needed:
```typescript
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html'
})
export class ChildComponent {
  @Output() dataEmitter = new EventEmitter<string>();

  sendData() {
    this.dataEmitter.emit('Data from Child');
  }
}
```
- Here, the dataEmitter is an instance of `EventEmitter`, and it emits the string **Data from Child** when the `sendData` function is called.

#### Child Component (HTML):
```HTML
<button (click)="sendData()">Send Data to Parent</button>

```
#### Parent Component (HTML): {id="parent-component-html_1"}
- The parent component listens for the event using  event binding.
- When the event is emitted by the child, the parent handles it with the receiveData method.
```HTML
<app-child (dataEmitter)="receiveData($event)"></app-child>
```

#### Parent Component (TypeScript): 
```Typescript
@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html'
})
export class ParentComponent {
  receiveData(data: string) {
    console.log('Data received from child:', data);
  }
}

```

## 3. `@ViewChild` Decorator

The `@ViewChild` decorator allows a parent component to access a child component's properties and methods or specific DOM elements from within the parent component. This is helpful when the parent needs direct access to child components after they are initialized.

### Example: {id="example_2"}

In this example, the parent component uses `@ViewChild` to interact with the child component by accessing its properties and calling its methods.

### Child Component (TypeScript): {id="child-component-typescript_1"}
```typescript
@Component({
  selector: 'app-child',
  templateUrl: './child.component.html'
})
export class ChildComponent {
  childProperty: string = 'Child Property';

  childMethod() {
    console.log('Child Method Called');
  }
}
```

#### Parent Component (TypeScript):  {id="parent-component-typescript_1"}
```Typescript
import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { ChildComponent } from './child.component';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html'
})
export class ParentComponent implements AfterViewInit {
  // Access the ChildComponent using ViewChild
  @ViewChild(ChildComponent) childComponent!: ChildComponent;

  ngAfterViewInit() {
    // Access child component's property
    console.log(this.childComponent.childProperty); 

    // Call child component's method
    this.childComponent.childMethod();
  }
}

```

## 4. Sharing Data Using Services
Angular services provide a way to share data across multiple components, even if they are not in a direct parent-child relationship. Services are commonly used when multiple unrelated components need to share state or logic.

### Example {id="example_3"}
#### Data Service (TypeScript):
```Typescript
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataSubject = new BehaviorSubject<string>('Initial Data');
  currentData = this.dataSubject.asObservable();

  changeData(newData: string) {
    this.dataSubject.next(newData);
  }
}

```

### Component 1 (TypeScript):
```Typescript
@Component({
  selector: 'app-component1',
  template: '<button (click)="sendData()">Send Data</button>'
})
export class Component1 {
  constructor(private dataService: DataService) {}

  sendData() {
    this.dataService.changeData('Data from Component 1');
  }
}
```

### Component 2 (TypeScript):
```Typescript
@Component({
  selector: 'app-component2',
  template: '<p>Data: {{data}}</p>'
})
export class Component2 implements OnInit {
  data!: string;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.currentData.subscribe(data => this.data = data);
  }
}

```