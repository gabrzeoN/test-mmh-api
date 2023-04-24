import nodemailer from "nodemailer";
import dotenv from "dotenv";
import * as err from "../utils/errorUtil.js";
dotenv.config();

(function checkEnvFileForEmailService() {
  if (
    !process.env.EMAIL_CONTACT ||
    !process.env.EMAIL_PORT ||
    !process.env.EMAIL_HOST ||
    !process.env.EMAIL_AUTH_USER ||
    !process.env.EMAIL_AUTH_PASS
  ) {
    throw err.serviceUnavailableError("env file not configured for email service");
  }
}());

const from = process.env.EMAIL_CONTACT;
const transport = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: +process.env.EMAIL_PORT,
  secure: +process.env.EMAIL_PORT === 465 ? true : false,
  auth: {
    user: process.env.EMAIL_AUTH_USER,
    pass: process.env.EMAIL_AUTH_PASS,
  },
});

const sendMailCallback = (error: object | null, response: object | null) => {
  if(error){
    console.log("Email not sent!", error);
  }
  if(response){
    console.log("Email sent!", response);
  }
};

export const emailService = {
  transport,
  from,
  sendMailCallback,
};

// import sgMail from "@sendgrid/mail";
// import util from "util";

// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// async function sendEmail(msg: any) {
//   try{
//     await sgMail.send(msg);
//     console.log("Email sent!");
//   } catch(e) {
//     console.log(util.inspect(e, {showHidden: false, depth: null, colors: true}));
//   }
// }

// export const sendGrid = {
//   sendEmail,
// };
