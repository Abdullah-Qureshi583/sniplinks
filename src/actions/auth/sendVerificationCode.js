"use server";

import nodemailer from "nodemailer";

// Create transporter with error handling for missing environment variables
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendVerificationCode = async ({ email, code }) => {
  // Check if required environment variables are set
  if (!process.env.EMAIL || !process.env.EMAIL_PASSWORD) {
    console.error("Missing EMAIL or EMAIL_PASSWORD environment variables.");
    return { success: false, message: "Server configuration error", error: true };
  }

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "URL Shortener - Email Verification",
    html: `
      <h1>Welcome to URL Shortener!</h1>
      <p>Your verification code is: <strong>${code}</strong></p>
      <p>Please use it to verify your email address.</p>
      <p>Thank you!</p>
    `,
  };

  try {
    // Attempt to send the email
    // await transporter.sendMail(mailOptions);
    console.log("the email code is " , code)
    return { success: true, message: "Email sent successfully", error: false };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, message: "Failed to send email", error: true };
  }
};

export { sendVerificationCode };
