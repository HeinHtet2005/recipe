const nodemailer = require("nodemailer");
const ejs = require("ejs");

const sendEmail = async ({ viewFileName, data, from, to, subject }) => {
  try {
    var transport = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
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
