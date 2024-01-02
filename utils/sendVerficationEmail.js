
const sendEmail = require('./sendEmail');
const sendVerificationEmail = async ({
  name,
  email,
  verificationToken,
  origin,
}) => {
  const verifyEmail = `${origin}/verify-email?token=${verificationToken}&email=${email}`;

  const message = `
    <h1>Hello ${name},</h1>
    <p>Please click the link below to verify your email:</p>
    <a href="${verifyEmail}">Verify Email</a>
  `;

  return sendEmail({
    to: email,
    subject: 'Email Confirmation',
    html: message,
  });
};

module.exports = sendVerificationEmail;
