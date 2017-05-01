import { Directive, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
  selector: '[validatePhoneNumber]',
  providers: [{provide: NG_VALIDATORS, useExisting: PhoneNumberValidatorDirective, multi: true}]
})
export class PhoneNumberValidatorDirective implements Validator, OnChanges {

  private static _validatePrefix(prefix: string): boolean {
    return prefix.length === 0 || prefix === '32';
  }

  private static _validateOperator(operator: string): boolean {
    return operator === '468'
      || operator.startsWith('47')
      || operator.startsWith('48')
      || operator.startsWith('49');
  }

  private static _validateNumber(number: string): boolean {
    return true;
  }

  private static _splitNumber(phoneNumber: string): Array<string> {
    const cleanNumber = phoneNumber.replace(/\s/g, '');
    let tmp;
    if (cleanNumber.startsWith('+')) {
      tmp = cleanNumber.replace(/^\+(\d{2})(\d{3})(\d{6})$/, '$1|$2|$3');
    } else if (cleanNumber.startsWith('00')) {
      tmp = cleanNumber.replace(/^00(\d{2})(\d{3})(\d{6})$/, '$1|$2|$3');
    } else {
      tmp = cleanNumber.replace(/^0()(\d{3})(\d{6})$/, '$1|$2|$3');
    }
    return tmp.split('|');
  }

  ngOnChanges(changes: SimpleChanges): void {
    //do nothing
  }

  validate(control: AbstractControl): { [key: string]: any; } {
    let phoneNumber: string = control.value;
    if (!phoneNumber) {
      return {
        validatePhoneNumber: false
      };
    }
    let [prefix, operator, number] = PhoneNumberValidatorDirective._splitNumber(phoneNumber);
    if (PhoneNumberValidatorDirective._validatePrefix(prefix)
      && PhoneNumberValidatorDirective._validateOperator(operator)
      && PhoneNumberValidatorDirective._validateNumber(number)) {
      return null;
    }
    return {
      validatePhoneNumber: false
    };
  }

}
