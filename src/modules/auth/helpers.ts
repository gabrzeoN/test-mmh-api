import { v4 as uuidv4 } from "uuid";
import { emailService } from "../../services/email.js";

function sendAccConfirmationEmail(to: string, name: string) {
  const tokenTemp: string = uuidv4();
  const text = `Prezado(a) ${name},
\nPara confirmar seu email e adicionar uma senha, acesse o link: ${tokenTemp}
\nCaso não tenha se registrado, favor ignorar este email!
  `;
  const message = {
    from: emailService.from,
    to,
    subject: "Confirm your email",
    text,
    html: `<p>Prezado(a) ${name}, <br><br>Para confirmar seu email e adicionar uma senha, acesse o link: ${tokenTemp}<br><br>Caso não tenha se registrado, favor ignorar este email!</p>`
  };
  emailService.transport.sendMail(message, emailService.sendMailCallback);
  return tokenTemp;
}

// async function sendResetYourPassword(to: string, name: string) {
//   const tokenTemp = uuidv4();
//   const text = `Prezado(a) ${name},
// \nPara resetar sua senha, acesse o link: ${tokenTemp}
// \nCaso não tenha solicitado a troca de senha, favor ignorar este email!
//   `;
//   const message = {
//     from: "g.cari@appstorm.com.br",
//     to: "g.cari@appstorm.com.br",
//     subject: "Reset your password",
//     text,
//     html: `<p>Prezado(a) ${name}, <br><br>Para resetar sua senha, acesse o link: ${tokenTemp}<br><br>Caso não tenha solicitado a troca de senha, favor ignorar este email!</p>`
//   };
//   sendGrid.sendEmail(message);
//   return tokenTemp;
// }

async function sendResetYourPassword(to: string, name: string) {
  const tokenTemp: string = uuidv4();
  const text = `Prezado(a) ${name},
\nPara resetar sua senha, acesse o link: ${tokenTemp}
\nCaso não tenha solicitado a troca de senha, favor ignorar este email!
  `;
  const message = {
    from: emailService.from,
    to,
    subject: "Reset your password",
    text,
    html: `<p>Prezado(a) ${name}, <br><br>Para resetar sua senha, acesse o link: ${tokenTemp}<br><br>Caso não tenha solicitado a troca de senha, favor ignorar este email!</p>`
  };
  emailService.transport.sendMail(message, emailService.sendMailCallback);
  return tokenTemp;
}

function sendPasswordResetedSuccessfully(to: string, name: string) {
  const tokenTemp: string = uuidv4();
  const text = `Prezado(a) ${name},
\nSua senha foi resetada com sucesso!
  `;

  const message = {
    from: emailService.from,
    to,
    subject: "Password reseted successfully",
    text,
    html: `<p>Prezado(a) ${name}, <br><br>Sua senha foi resetada com sucesso!`
  };
  emailService.transport.sendMail(message, (error: object | null) => {
    console.log("email_ERROR", error);
  });

  return tokenTemp;
}

const email = {
  sendAccConfirmationEmail,
  sendResetYourPassword,
  sendPasswordResetedSuccessfully
};

export default email;
