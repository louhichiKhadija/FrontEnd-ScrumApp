import { FormGroup } from "@angular/forms";
// custom validator to check that two fields match
export function MatchValue(
  password: string,
  confirmation: string
) {
  return (formGroup: FormGroup) => {
    const firstControl = formGroup.controls[password];
    const secondControl = formGroup.controls[confirmation];
    // return null if controls haven't initialised yet
   
    if (secondControl.errors && !secondControl.errors.matchValueError) {
      return null;
    }
    if (firstControl.value !== secondControl.value) {
      secondControl.setErrors({ matchValueError: true });
    } else {
      secondControl.setErrors(null);
    }
  };
}