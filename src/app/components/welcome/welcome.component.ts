import { CommonModule } from '@angular/common';
import {
  Component,
  WritableSignal,
  signal,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Card } from '../../models/card.model';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
})
export class WelcomeComponent {

}
