import { Directive, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
  selector: '[ssValidatePassword]',
  providers: [{provide: NG_VALIDATORS, useExisting: PasswordValidatorDirective, multi: true}]
})
export class PasswordValidatorDirective implements Validator, OnChanges {

  private static _validateLength(password: string): boolean {
    return password.length > 6 || password.length <= 32;
  }

  private static _validateCharTypes(password: string): boolean {
    // check for uppercase
    if (password.toUpperCase() === password) {
      return false;
    }
    // check for lowercase
    if (password.toLowerCase() === password) {
      return false;
    }
    // check digit
    return /\d/.test(password);

  }

  ngOnChanges(changes: SimpleChanges): void {
    // do nothing
  }

  validate(control: AbstractControl): { [key: string]: any; } {
    const password: string = control.value;
    if (password
      && PasswordValidatorDirective._validateLength(password)
      && PasswordValidatorDirective._validateCharTypes(password)) {
      return null;
    }
    return {
      ssValidatePassword: false
    };
  }

}
