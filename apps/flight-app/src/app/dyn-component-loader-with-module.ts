import {
  Compiler,
  Injectable,
  Injector,
  NgModuleFactory,
  Type,
  ViewContainerRef,
} from '@angular/core';

export interface DynConfig {
  module: Type<unknown>;
  component: Type<unknown>;
}

const dynamicComponents: Record<
  string,
  () => Promise<{ dynConfig: DynConfig }>
> = {
  'dynamic-component': () => import('./dyn-component-with-module'),
};

@Injectable({
  providedIn: 'root',
})
export class DynCompLoaderService {
  constructor(private compiler: Compiler) {}

  async load(dynCompName: string, vc: ViewContainerRef, injector: Injector) {
    const { component, module } = (await dynamicComponents[dynCompName]())
      .dynConfig;
    const moduleFactory = await (module instanceof NgModuleFactory
      ? module
      : this.compiler.compileModuleAsync(module));
    const moduleRef = moduleFactory.create(injector);
    const compfactory =
      moduleRef.componentFactoryResolver.resolveComponentFactory(component);
    vc.createComponent(compfactory);
  }
}
