// Email verification constants
export const EMAIL_VERIFICATION_EXPIRES_HOURS = 24
export const EMAIL_VERIFICATION_EXPIRES_MS = EMAIL_VERIFICATION_EXPIRES_HOURS * 60 * 60 * 1000

// Password hashing
export const PASSWORD_SALT_ROUNDS = 12

// API messages
export const API_MESSAGES = {
  REGISTRATION: {
    SUCCESS: 'Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản.',
    MISSING_FIELDS: 'Thiếu thông tin bắt buộc',
    USER_EXISTS_EMAIL: 'Email đã tồn tại',
    SERVER_ERROR: 'Lỗi server, vui lòng thử lại sau',
  }
} as const

// Form validation messages
export const VALIDATION_MESSAGES = {
  USERNAME: {
    REQUIRED: 'Tên người dùng là bắt buộc'
  },
  EMAIL: {
    REQUIRED: 'Email là bắt buộc',
    INVALID: 'Email không đúng định dạng'
  },
  PASSWORD: {
    REQUIRED: 'Mật khẩu là bắt buộc',
    MIN_LENGTH: 'Mật khẩu phải có ít nhất 8 ký tự',
    UPPERCASE: 'Mật khẩu phải có ít nhất 1 ký tự in hoa (không dấu)',
    LOWERCASE: 'Mật khẩu phải có ít nhất 1 ký tự thường (không dấu)',
    NUMBER: 'Mật khẩu phải có ít nhất 1 số',
    SPECIAL: 'Mật khẩu phải có ít nhất 1 ký tự đặc biệt',
    NO_ACCENTS: 'Mật khẩu không được chứa ký tự có dấu'
  },
  RE_PASSWORD: {
    REQUIRED: 'Nhập lại mật khẩu là bắt buộc',
    MISMATCH: 'Mật khẩu không khớp!'
  }
} as const 