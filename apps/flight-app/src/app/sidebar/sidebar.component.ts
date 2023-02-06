import {
  RouterLinkWithHref,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar-cmp',
  standalone: true,
  imports: [RouterLinkWithHref, RouterLinkActive, RouterOutlet],
  templateUrl: 'sidebar.component.html',
})
export class SidebarComponent {}
