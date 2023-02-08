import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';

@Component({
  selector: 'app-dynamic-comp',
  template: `
    <div class="card">
      <div class="header">
        <h1 class="title">Dynamic Component</h1>
      </div>
      <div class="content">
        <p>{{ content }}</p>
        <button (click)="changeContent()" class="btn btn-default">
          change contentS
        </button>
      </div>
    </div>
  `,
})
export class DynamicComponent {
  content = 'This is a dynamic component.';

  changeContent(): void {
    this.content = 'My new content text.';
  }
}

@NgModule({
  declarations: [DynamicComponent],
  imports: [CommonModule],
  exports: [DynamicComponent],
})
export class DynamicComponentModule {}

export const dynConfig = {
  module: DynamicComponentModule,
  component: DynamicComponent,
};
