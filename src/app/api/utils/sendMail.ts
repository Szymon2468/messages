import { NextRequest } from 'next/server';

const mail = require('@sendgrid/mail');
mail.setApiKey(
  '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'
);

export const sendMail = async (email: string, link: string) => {
  const message = {
    to: email,
    from: 'biuro@gancle-studio.pl',
    subject: 'Password Reset',
    text: 'bubu',
    html: link
  };

  await mail
    .send(message)
    .then((r: any) => {
      console.log('Email sent', r);
    })
    .catch((error: Error) => {
      console.error(error);
      console.log('zesralo sie');
    });

  return message;
};
