export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

export const validatePhone = (phone) => {
  const cleanPhone = String(phone).replace(/\D/g, '');
  return cleanPhone.length >= 10;
};

export const validateName = (name) => {
  return typeof name === 'string' && name.trim().length >= 2;
};

export const validateCardNumber = (num) => {
  const cleanNum = String(num).replace(/\s+/g, '');
  return /^\d{16}$/.test(cleanNum);
};

export const validateExpiry = (exp) => {
  return /^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(exp);
};

export const validateCVV = (cvv) => {
  return /^\d{3,4}$/.test(cvv);
};
