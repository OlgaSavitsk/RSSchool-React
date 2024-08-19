export interface UncontrolledForm {
  name: string;
  age: number;
  email: string;
  password: string;
  confirm: string;
  gender: string;
  acceptTerms?: boolean;
  image: string | null;
  country: string;
}

export interface ControlledForm extends UncontrolledForm {}

export type Countries = {
  label: string;
  value: string;
};
