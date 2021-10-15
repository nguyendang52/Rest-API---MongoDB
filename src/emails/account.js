const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

sgMail.send({
  to: 'nhatnguyenstorage52@gmail.com',
  from: 'nhatnguyen522000@gmail.com',
  subject: 'This is my first creation',
  text: 'I hope this one actually get to you',
});
const sendWelcomeEmail = async (email, name) => {
  sgMail.send({
    to: email,
    from: 'nhatnguyen522000@gmail.com',
    subject: 'WELCOME TO HREO APP',
    text: `Welcome to the app, ${name}. Let me know how you get along with the app`,
  });
};

module.exports = {
  sendWelcomeEmail,
};
