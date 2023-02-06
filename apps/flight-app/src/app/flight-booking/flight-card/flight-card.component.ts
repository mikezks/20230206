// src/app/flight-card/flight-card.component.ts

import { DatePipe, NgClass, NgIf, NgStyle } from '@angular/common';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  OnInit,
  SimpleChanges,
  ElementRef,
  NgZone,
} from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { CityPipe } from '../../shared/pipes/city.pipe';
import { StatusColorPipe } from '../../shared/pipes/status-color.pipe';
import { Flight } from '../flight';

@Component({
  selector: 'app-flight-card',
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    NgStyle,
    DatePipe,
    RouterLinkWithHref,
    CityPipe,
    StatusColorPipe,
  ],
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.scss'],
})
export class FlightCardComponent implements OnInit, OnChanges {
  @Input() item: Flight | null = null;
  @Input() selected = false;
  @Output() selectedChange = new EventEmitter<boolean>();

  constructor(private element: ElementRef, private zone: NgZone) {
    console.log('ctor', this.item);
  }

  ngOnInit() {
    console.log('ngOnInit', this.item);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges', this.item);

    if (changes['item']) {
      console.log('ngOnChanges: item');
    }
    if (changes['selected']) {
      console.log('ngOnChanges: selected');
    }
  }

  select() {
    this.selected = true;
    this.selectedChange.emit(true);
  }

  deselect() {
    this.selected = false;
    this.selectedChange.emit(false);
  }

  blink() {
    // Dirty Hack used to visualize the change detector
    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        // let originalColor = this.element.nativeElement.firstChild.style.backgroundColor;
        this.element.nativeElement.firstChild.style.backgroundColor = 'crimson';
        //              ^----- DOM-Element
      });

      setTimeout(() => {
        this.element.nativeElement.firstChild.style.backgroundColor = this
          .selected
          ? 'rgb(204, 197, 185)'
          : 'white';
      }, 1000);
    });

    return null;
  }
}
