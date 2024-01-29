export interface SignUpResponse {
  isSignUpComplete: boolean;
  userId: string;
  nextStep: string; // Reemplaza 'any' con el tipo correcto para 'nextStep'
}
