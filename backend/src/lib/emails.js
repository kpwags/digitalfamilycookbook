const requestResetPasswordEmail = (name, resetToken) => `
  <div className="email" style="
    border: 1px solid black;
    padding: 20px;
    font-family: sans-serif;
    line-height: 2;
    font-size: 20px;">
      <h2>Hello ${name},</h2>
      <p>A request was made to reset your password. Please <a href="${
  process.env.DFC_FRONTEND_URL
}/reset-password?resetToken=${resetToken}">click here to reset your password</a> or copy the following link into your browser</p>
      <p>${process.env.DFC_FRONTEND_URL}/reset-password?resetToken=${resetToken}</p>
      <p>If you did not request a reset, please disregard and delete this email.</p>
      <p>Thanks,<br/>${process.env.DFC_SITE_TITLE}</p>
  </div>
`;

exports.requestResetPasswordEmail = requestResetPasswordEmail;
