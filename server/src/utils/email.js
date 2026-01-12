// H:\Mayuresh\KHELO\server\src\utils\email.js

const sendEmail = async (options) => {
  // detailed logging to console instead of actually sending mail for now
  console.log('--- EMAIL SIMULATION ---');
  console.log(`To: ${options.email}`);
  console.log(`Subject: ${options.subject}`);
  console.log(`Message: ${options.message}`);
  console.log('------------------------');
};

module.exports = sendEmail;