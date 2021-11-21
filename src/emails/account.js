const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = async (email, name) => {
  sgMail.send({
    to: email,
    from: 'nhatnguyen522000@gmail.com',
    subject: 'Hello my name is Nguyen',
    text: `Welcome to the app, ${name}. Let me know how you get along with the app`,
  });
};

module.exports = {
  sendWelcomeEmail,
};
