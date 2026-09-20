const nodemailer = require("nodemailer");
const ejs = require("ejs");

const sendEmail = async ({ viewFileName, data, from, to, subject }) => {
  try {
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "f1da90c35b095b",
        pass: "3855db00c6cd7f",
      },
    });

    const dataString = await ejs.renderFile(
      "./views/" + viewFileName + ".ejs",
      data,
    );

    transport.sendMail(
      {
        from,
        to,
        subject,
        html: dataString,
      },
      (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log("Message sent: %s", info.messageId);
      },
    );
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = sendEmail;
