import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  public showMenu: boolean = false;

  constructor() {}

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
}
