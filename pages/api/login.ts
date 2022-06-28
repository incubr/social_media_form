import type { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";
import nodemailer from "nodemailer";

const GOOGLE_SECRET_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";
const GOOGLE_SECRET_KEY = process.env.GOOGLE_SECRET_KEY || "";
const REDIRECT_URI = process.env.REDIRECT_URI || "";

const create_Message = (user: any, questions: any): string => {
  const structure_questions = () => {
    const names = [
      { key: "brand", title: "Brand Name: " },
      { key: "purpose", title: "Purpose of the post: " },
      { key: "target", title: "Target audience: " },
      { key: "prefer", title: "Type of post: " },
      { key: "post_description", title: "Post description: " },
      { key: "context", title: "Write up/Context: " },
      { key: "hashtags", title: "Hashtags: " },
      { key: "reference", title: "References: " },
      { key: "combination", title: "Color combination: " },
    ];

    let return_string = "";

    for (let value of names) {
      return_string += `<li>${value.title} ${questions?.[value.key]}</li>`;
    }
    return return_string;
  };

  return `
  <ul>
    <li>Name: ${user.profileObj.givenName} ${user.profileObj.familyName}</li>
    <li>Email: ${user.profileObj.email}</li>
  </ul>
  <ol start="1">
    ${structure_questions()}
  </ol>
  `;
};

let transporter = nodemailer.createTransport({
  host: "smtpout.secureserver.net",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const send_Email = async (user: any, questions: any) => {
  const message = create_Message(user, questions);
  const reciver_Email = user.profileObj.email;

  let sent: any = await transporter.sendMail({
    from: `"Incubr Tech. Pvt." <${process.env.NEXT_PUBLIC_SENDER_EMAIL}>`,
    to: reciver_Email,
    subject: "Thank you for connecting with us.",
    text: "Thank you for connecting with us. We received your valuable inquiry and will get back to you within 24 hours.",
    priority: "high",
  });

  let office = await transporter.sendMail({
    from: `"Incubr Tech. Pvt." <${process.env.NEXT_PUBLIC_SENDER_EMAIL}>`,
    to: process.env.NEXT_PUBLIC_OFFICE_RECIVERS?.split(","),
    subject: "Social media form inquiry Incubr Tech. Pvt.",
    priority: "high",
    html: message,
  });

  console.log("Message sent: %s", sent.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(sent));
};

export const client = new google.auth.OAuth2(
  GOOGLE_SECRET_ID,
  GOOGLE_SECRET_KEY,
  REDIRECT_URI
);

interface loginData {
  authUrl?: string;
  success: boolean;
  error?: string;
  user?: any;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<loginData>
) => {
  if (req.method === "POST") {
    const { user, questions } = req.body;
    send_Email(user, questions);
    return res.status(200).json({ success: true });
  }
  return res.status(200).json({ success: true });
};

export default handler;
