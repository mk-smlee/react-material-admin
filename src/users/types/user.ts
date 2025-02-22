export interface User {
  id: string;
  avatar?: string;
  disabled: boolean;
  email: string;
  firstName: string;
  gender?: "F" | "M";
  lastName: string;
  role: string;
}
