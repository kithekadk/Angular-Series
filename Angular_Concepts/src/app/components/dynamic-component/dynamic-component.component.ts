import { AfterViewInit, Component, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { DynamicInsertionDirective } from '../../dynamic-insertion.directive';
import { AlertComponent } from '../utils/alert/alert.component';

@Component({
  selector: 'app-dynamic-component',
  standalone: true,
  imports: [DynamicInsertionDirective],
  templateUrl: './dynamic-component.component.html',
  styleUrl: './dynamic-component.component.css'
})
export class DynamicComponentComponent implements AfterViewInit {
  @ViewChild(DynamicInsertionDirective, { static: true }) insertionPoint!: DynamicInsertionDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngAfterViewInit(): void {
    // Optional: Auto-load a component on init if required.
    // this.loadComponent();
  }

  loadComponent(): void {
    const viewContainerRef = this.insertionPoint.viewContainerRef;
    viewContainerRef.clear();

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const componentRef = viewContainerRef.createComponent<AlertComponent>(componentFactory);

    componentRef.instance.message = 'This is your first dynamic component!';
  }
}
