import nodemailer from "nodemailer";
import config from "../config/config.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: config.GMAIL_USER_APP,
    pass: config.GMAIL_PASS_APP,
  },
});

export default async (userMail, subject, html) => {
  return await transporter.sendMail({
    from: "<DecorateMe>",
    to: userMail,
    subject,
    html,
  });
};
