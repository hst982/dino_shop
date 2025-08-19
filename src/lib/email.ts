import nodemailer from 'nodemailer'

// Tạo transporter cho Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail', // hoặc 'outlook', 'yahoo', etc.
  auth: {
    user: process.env.EMAIL_USER, // email của bạn
    pass: process.env.EMAIL_PASS, // app password hoặc password
  },
})

// Hàm gửi email xác thực
export async function sendVerificationEmail(email: string, token: string) {
  try {
    const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Xác thực tài khoản - DinoShop',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #f8f9fa; padding: 20px; text-align: center;">
            <h1 style="color: #333; margin: 0;">Xác thực tài khoản</h1>
          </div>
          <div style="padding: 20px; background-color: white;">
            <p>Xin chào!</p>
            <p>Cảm ơn bạn đã đăng ký tài khoản tại DinoShop. Để hoàn tất quá trình đăng ký, vui lòng click vào nút bên dưới để xác thực email của bạn:</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${verificationUrl}" 
                 style="background-color: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                Xác thực tài khoản
              </a>
            </div>
            
            <p>Hoặc bạn có thể copy và paste link sau vào trình duyệt:</p>
            <p style="word-break: break-all; color: #007bff;">${verificationUrl}</p>
            
            <p><strong>Lưu ý:</strong> Link này sẽ hết hạn sau 24 giờ.</p>
            
            <p>Nếu bạn không thực hiện yêu cầu này, vui lòng bỏ qua email này.</p>
            
            <p>Trân trọng,<br>Đội ngũ DinoShop</p>
          </div>
          <div style="background-color: #f8f9fa; padding: 15px; text-align: center; color: #666; font-size: 12px;">
            <p>Email này được gửi tự động, vui lòng không trả lời.</p>
          </div>
        </div>
      `,
    }

    const info = await transporter.sendMail(mailOptions)
    console.log('Email sent successfully:', info.messageId)
    return true
  } catch (error) {
    console.error('Email sending error:', error)
    return false
  }
}

// Hàm gửi email reset password
export async function sendResetPasswordEmail(email: string, token: string) {
  try {
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Đặt lại mật khẩu - DinoShop',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #f8f9fa; padding: 20px; text-align: center;">
            <h1 style="color: #333; margin: 0;">Đặt lại mật khẩu</h1>
          </div>
          <div style="padding: 20px; background-color: white;">
            <p>Xin chào!</p>
            <p>Bạn đã yêu cầu đặt lại mật khẩu cho tài khoản DinoShop. Click vào nút bên dưới để tạo mật khẩu mới:</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" 
                 style="background-color: #dc3545; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                Đặt lại mật khẩu
              </a>
            </div>
            
            <p>Hoặc bạn có thể copy và paste link sau vào trình duyệt:</p>
            <p style="word-break: break-all; color: #007bff;">${resetUrl}</p>
            
            <p><strong>Lưu ý:</strong> Link này sẽ hết hạn sau 1 giờ.</p>
            
            <p>Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.</p>
            
            <p>Trân trọng,<br>Đội ngũ DinoShop</p>
          </div>
          <div style="background-color: #f8f9fa; padding: 15px; text-align: center; color: #666; font-size: 12px;">
            <p>Email này được gửi tự động, vui lòng không trả lời.</p>
          </div>
        </div>
      `,
    }

    const info = await transporter.sendMail(mailOptions)
    console.log('Reset password email sent successfully:', info.messageId)
    return true
  } catch (error) {
    console.error('Reset password email sending error:', error)
    return false
  }
} 