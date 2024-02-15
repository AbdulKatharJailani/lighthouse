import brevo from '@getbrevo/brevo'
let defaultClient = brevo.ApiClient.instance;
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

let apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY;

let apiInstance = new brevo.TransactionalEmailsApi();
let sendSmtpEmail = new brevo.SendSmtpEmail();

const zipFilePath = 'reports.zip';
const zipFileContent = fs.readFileSync(zipFilePath, { encoding: 'base64' });
sendSmtpEmail.subject = "Weekly Lighthouse Report";
sendSmtpEmail.htmlContent = "<html><body><h1>Common: LightHouse Report</h1></body></html>";
sendSmtpEmail.sender = {"email": "rassic07@gmail.com" };
sendSmtpEmail.to = [
  { "email": "abdulkathar@superbotics.in" }
];
sendSmtpEmail.attachment = [{
    name: 'reports.zip',
    content: zipFileContent, 
    type: 'application/zip',
}]

apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
  console.log('email sent successfully');
}, function (error) {
  console.error(error);
});