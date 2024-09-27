import { Component, OnInit, ViewContainerRef, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentFactoryResolver } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-concept',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './concept.component.html',
  styleUrl: './concept.component.css'
})
export class ConceptComponent implements OnInit {
  topic: string | null = null;
  private viewContainerRef = inject(ViewContainerRef);
  private resolver = inject(ComponentFactoryResolver);

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.topic = params.get('topic');
      this.loadConceptComponent(this.topic);
    });
  }

  async loadConceptComponent(topic: string | null) {
    this.viewContainerRef.clear();

    switch (topic) {
      case 'pipes':
        const { PipesComponent } = await import('../pipes/pipes.component');
        this.viewContainerRef.createComponent(this.resolver.resolveComponentFactory(PipesComponent));
        break;
      case 'forms':
        const { FormsComponent } = await import('../forms/forms.component');
        this.viewContainerRef.createComponent(this.resolver.resolveComponentFactory(FormsComponent));
        break;
      case 'services':
        const { ServicesComponent } = await import('../services/services.component');
        this.viewContainerRef.createComponent(this.resolver.resolveComponentFactory(ServicesComponent));
        break;
      case 'signals':
        const { SignalsComponent } = await import('../signals/signals.component');
        this.viewContainerRef.createComponent(this.resolver.resolveComponentFactory(SignalsComponent));
        break;
      case 'routing':
        const { RoutingComponent } = await import('../routing/routing.component');
        this.viewContainerRef.createComponent(this.resolver.resolveComponentFactory(RoutingComponent));
        break;
      case 'observables':
        const { ObservablesComponent } = await import('../observables/observables.component');
        this.viewContainerRef.createComponent(this.resolver.resolveComponentFactory(ObservablesComponent));
        break;
      case 'ngrx':
        const { NgrxComponent } = await import('../ngrx/ngrx.component');
        this.viewContainerRef.createComponent(this.resolver.resolveComponentFactory(NgrxComponent));
        break;
      case 'animations':
        const { AnimationsComponent } = await import('../animations/animations.component');
        this.viewContainerRef.createComponent(this.resolver.resolveComponentFactory(AnimationsComponent));
        break;
      case 'httpclient':
        const { HTTPClientComponent } = await import('../httpclient/httpclient.component');
        this.viewContainerRef.createComponent(this.resolver.resolveComponentFactory(HTTPClientComponent));
        break;
      case 'dynamicc':
        const { DynamicComponentComponent } = await import('../dynamic-component/dynamic-component.component');
        this.viewContainerRef.createComponent(this.resolver.resolveComponentFactory(DynamicComponentComponent));
        break;
      case 'lifecycle':
        const { LifecycleComponent } = await import('../lifecycle/lifecycle.component');
        this.viewContainerRef.createComponent(this.resolver.resolveComponentFactory(LifecycleComponent));
        break;
      default:
        break;
    }
  }
}
