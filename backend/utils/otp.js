export const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

export const FIVE_MIN = 5 * 60 * 1000;
export const RESEND_COOLDOWN = 60 * 1000; // 60s
export const MAX_OTP_ATTEMPTS = 3;