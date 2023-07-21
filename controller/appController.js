const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
require("dotenv").config();
const { confige } = require("../secret");
// const { EMAIL, PASS } = require("../env");

//send email from testing account
const singup = async (req, res) => {
  console.log("sign up");
  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
  let message = {
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "success register with us.", // plain text body
    html: "<b>success register with us.</b>", // html body
  };

  transporter
    .sendMail(message)
    .then((info) => {
      return res.status(201).json({
        msg: "you should receive an email",
        info: info.messageId,
        preview: nodemailer.getTestMessageUrl(info),
      });
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

// send mail from real email account
const getbill = (req, res) => {
  console.log("get bill");
  const { userEmail } = req.body;

  let config = {
    service: "gmail",
    auth: {
      user: confige.EMAIL,
      pass:confige.PASS,
    },
  };

  let transporter = nodemailer.createTransport(config);

  let MailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Mailgen",
      link: "http://mailgen.js/",
    },
  });

  let response = {
    body: {
      name: "Moti Gabay",
      intro: "Your bill has arrived",
      table: {
        data: [
          {
            item: "Nodemailer Stack Book",
            description: "A Backend application",
            price: "$10.99",
          },
        ],
      },
      outro: "Looking forward to do more business",
    },
  };

  let mail = MailGenerator.generate(response);

  let message = {
    from:confige.EMAIL,
    to: confige.EMAIL,
    subject: "place Order",
    html: mail,
  };

  transporter.sendMail(message).then(() => {
    return res
      .status(201)
      .json({
        msg: "you should received an email ",
      })
      .catch((error) => {
        return res.status(500).json({ error });
      });
  });
  // res.status(201).json("getbill success");
};

module.exports = {
  singup,
  getbill,
};
