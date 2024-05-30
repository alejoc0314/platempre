import {
  Directive,
  ElementRef,
  forwardRef,
  HostListener,
  Input,
  OnDestroy,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MAT_INPUT_VALUE_ACCESSOR } from '@angular/material';
import { Subscription } from 'rxjs';
import { formatNumber } from '@angular/common';

@Directive({
  selector: 'input[localizedNumericInput]',
  providers: [
    {
      provide: MAT_INPUT_VALUE_ACCESSOR,
      useExisting: LocalizedNumericInputDirective,
    },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LocalizedNumericInputDirective),
      multi: true,
    },
  ],
})
export class LocalizedNumericInputDirective
  implements ControlValueAccessor, OnDestroy
{
  locale = 'en';
  decimalMarker: string;
  private _value: string | null;

  constructor(private element: ElementRef<HTMLInputElement>) {}

  get value(): string | null {
    return this._value;
  }

  @Input('value')
  set value(value: string | null) {
    this._value = value;
    this.formatValue(value);
  }

  @HostListener('input', ['$event.target.value'])
  input(value: string) {
    const regExp = new RegExp(`[^\\d${this.decimalMarker}-]`, 'g');
    const [integer, decimal] = value
      .replace(regExp, '')
      .split(this.decimalMarker);

    this._value = decimal ? integer.concat('.', decimal) : integer;

    if (this.isLastCharacterDecimalSeparator(value)) {
      this._value = value;
    }
  }

  @HostListener('blur')
  onBlur() {
    this.formatValue(this._value);
  }

  @HostListener('focus')
  onFocus() {
    this.unFormatValue();
  }

  writeValue(value: string | null) {
    this._value = value;
    this.formatValue(value);
  }

  registerOnTouched() {}

  isLastCharacterDecimalSeparator(value: string): boolean {
    return isNaN(parseInt(value[value.length - 1]));
  }

  private formatValue(value: string | null) {
    if (value === null) {
      this.element.nativeElement.value = '';
      return;
    }

    if (this.isLastCharacterDecimalSeparator(value)) {
      this.element.nativeElement.value = value;
      return;
    }

    const [thousandSeparator, decimalMarker] = formatNumber(
      1000.99,
      this.locale
    ).replace(/\d/g, '');
    this.decimalMarker = decimalMarker;

    const [integer, decimal] = value.split('.');

    this.element.nativeElement.value = integer.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      thousandSeparator
    );

    if (decimal) {
      this.element.nativeElement.value =
        this.element.nativeElement.value.concat(decimalMarker, decimal);
    }
  }

  private unFormatValue() {
    const value = this.element.nativeElement.value;
    if (this.isLastCharacterDecimalSeparator(value)) {
      return;
    }
    const regExp = new RegExp(`[^\\d${this.decimalMarker}-]`, 'g');
    const [integer, decimal] = value
      .replace(regExp, '')
      .split(this.decimalMarker);

    this._value = integer.concat('.', decimal);
    if (value) {
      this.element.nativeElement.value = this._value;
    } else {
      this.element.nativeElement.value = '';
    }
  }

  ngOnDestroy() {
    console.log('fuck it');
  }
}
