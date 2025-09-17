export function otpEmail(otp: string) {
    return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Ngobrolin - Email Verification</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f4f4f4; font-family:Arial, sans-serif;">
    <table width="100%" cellspacing="0" cellpadding="0" style="background-color:#f4f4f4; padding:40px 0;">
      <tr>
        <td align="center">
          <table width="600" cellspacing="0" cellpadding="0" style="background-color:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 2px 6px rgba(0,0,0,0.1);">
            <!-- Header -->
            <tr>
              <td style="background-color:#2563eb; padding:20px; text-align:center;">
                <h1 style="margin:0; color:#ffffff; font-size:24px;">🔒 Verify Your Account</h1>
              </td>
            </tr>
            <!-- Body -->
            <tr>
              <td style="padding:30px 40px; text-align:left; color:#333333;">
                <p style="font-size:16px; margin-bottom:20px;">
                  Hello 👋,<br/><br/>
                  To complete your sign-in, please use the following One-Time Password (OTP). 
                  This code is valid for <b>5 minutes</b>.
                </p>

                <div style="text-align:center; margin:30px 0;">
                  <span style="display:inline-block; padding:15px 30px; font-size:24px; font-weight:bold; letter-spacing:4px; color:#2563eb; border:2px dashed #2563eb; border-radius:8px;">
                    ${otp}
                  </span>
                </div>

                <p style="font-size:14px; color:#666666; margin-top:20px;">
                  If you didn’t request this code, you can safely ignore this email.
                </p>
              </td>
            </tr>
            <!-- Footer -->
            <tr>
              <td style="background-color:#f9fafb; padding:15px 20px; text-align:center; font-size:12px; color:#999999;">
                © ${new Date().getFullYear()} Ngobrolin. All rights reserved.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `
}
