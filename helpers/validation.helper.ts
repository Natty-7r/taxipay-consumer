export const isEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isPhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^\+?[0-9]{10,15}$/;
  return phoneRegex.test(phone);
};

export const isUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const isEmpty = (value: any): boolean => {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
};

export const isStrongPassword = (password: string): boolean => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  return (
    password.length >= minLength &&
    hasUpperCase &&
    hasLowerCase &&
    hasNumbers &&
    hasSpecialChar
  );
};

export interface ValidationError {
  field: string;
  message: string;
}

export const validateForm = <T extends Record<string, any>>(
  data: T,
  rules: Record<keyof T, (value: any) => string | null>
): ValidationError[] => {
  const errors: ValidationError[] = [];
  
  for (const [field, validator] of Object.entries(rules)) {
    const error = validator(data[field]);
    if (error) {
      errors.push({ field, message: error });
    }
  }
  
  return errors;
};

export const isValidAmount = (amount: number): boolean => {
  return amount > 0 && amount <= 1000000;
};

export const isValidNID = (nid: string): boolean => {
  const nidRegex = /^[0-9]{8,15}$/;
  return nidRegex.test(nid);
};