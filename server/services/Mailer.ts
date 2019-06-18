import nodemailer from 'nodemailer';

export default class Mailer {

  public async sendMail(mailOptions: object) {

    try {

      const transporter = await this.createTransporter();

      return await transporter.sendMail(mailOptions);

    } catch (error) {

      throw error;

    }
  }

  private async createTransporter() {

    const smtp = {
      username: process.env.EMAIL_ADDRESS,
      password: process.env.EMAIL_PASSWORD,
      server: 'smtp.gmail.com',
      port: 465,
    };

    try {

      const transporter = await nodemailer.createTransport({
        auth: {
          pass: smtp.password,
          user: smtp.username,
        },
        host: smtp.server,
        port: smtp.port,
        secure: true,
      });

      return transporter;

    } catch (ex) {

      throw ex;

    }
  }
}
