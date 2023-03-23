//2
var generator = require("generate-password");
var nodemailer = require("nodemailer");

exports.mailOptions = async (req, res) => {
  const from = req.body.mail;
  const to = "teestsafa@gmail.com";
  const subject = req.body.subject;
  const text = req.body.text + req.body.country;

  var passwords = generator.generateMultiple(1, {
    length: 10,
    uppercase: false,
    strict: true,
    symbols: true
  });
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "safa@gmail.com",
      pass: "********"
    }
  });
  var mailOptions = {
    from,
    to,
    subject,
    text
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
