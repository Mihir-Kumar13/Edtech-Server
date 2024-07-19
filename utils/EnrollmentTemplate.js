export const generateEnrollmentEmail = (
  courseName,
  studentName,
  startDate,
  duration,
  instructorName,
  courseUrl,
  companyName,
  companyAddress
) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Course Enrollment Confirmation</title>
    <style>
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes slideIn {
        from { transform: translateY(20px); }
        to { transform: translateY(0); }
      }
      body {
        font-family: 'Helvetica Neue', Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #121212;
        color: #ffffff;
      }
      .container {
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
        background-color: #1e1e1e;
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
        border-radius: 10px;
        overflow: hidden;
        animation: fadeIn 1s ease-in-out;
      }
      .header {
        background-color: #2196f3;
        color: #ffffff;
        text-align: center;
        padding: 20px 0;
        border-bottom: 5px solid #1976d2;
        animation: slideIn 1s ease-in-out;
      }
      .content {
        padding: 20px;
        animation: slideIn 1s ease-in-out;
      }
      .footer {
        background-color: #1e1e1e;
        text-align: center;
        padding: 10px 0;
        font-size: 12px;
        color: #777;
        border-top: 1px solid #333;
        animation: fadeIn 1s ease-in-out;
      }
      .button {
        display: inline-block;
        background-color: #2196f3;
        color: #ffffff;
        padding: 15px 30px;
        text-decoration: none;
        border-radius: 5px;
        margin-top: 20px;
        transition: background-color 0.3s ease, transform 0.3s ease;
        animation: slideIn 1s ease-in-out;
      }
      .button:hover {
        background-color: #1976d2;
        transform: translateY(-2px);
      }
      .course-details {
        margin: 20px 0;
        border-left: 4px solid #2196f3;
        padding-left: 15px;
        animation: fadeIn 1s ease-in-out;
      }
      .course-details h3 {
        margin: 10px 0;
        color: #ffffff;
      }
      .course-details p {
        margin: 5px 0;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Welcome to ${courseName}!</h1>
      </div>
      <div class="content">
        <p>Dear ${studentName},</p>
        <p>Congratulations on your successful enrollment in <strong>${courseName}</strong>! We are excited to have you on board.</p>
        <div class="course-details">
          <h3>Course Details:</h3>
          <p><strong>Start Date:</strong> ${startDate}</p>
          <p><strong>Duration:</strong> ${duration}</p>
          <p><strong>Instructor:</strong> ${instructorName}</p>
        </div>
        <p>Please click the button below to access the course and get started:</p>
        <a href="${courseUrl}" class="button">Access Course</a>
        <p>If you have any questions, feel free to reply to this email or contact our support team.</p>
        <p>Happy learning!</p>
        <p>Best regards,<br>${companyName}</p>
      </div>
      <div class="footer">
        <p>&copy; 2024 ${companyName}. All rights reserved.</p>
        <p>${companyAddress}</p>
      </div>
    </div>
  </body>
  </html>
  `;
};

export const generateOtpEmail = (
  otp,
  username,
  companyName,
  supportEmail,
  companyAddress
) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your OTP Code</title>
    <style>
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes slideIn {
        from { transform: translateY(20px); }
        to { transform: translateY(0); }
      }
      body {
        font-family: 'Helvetica Neue', Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
        color: #333;
      }
      .container {
        width: 100%;
        max-width: 600px;
        margin: 20px auto;
        background-color: #ffffff;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        overflow: hidden;
        animation: fadeIn 1s ease-in-out;
      }
      .header {
        background-color: #1a73e8;
        color: #ffffff;
        text-align: center;
        padding: 30px 0;
        border-bottom: 5px solid #0c47a1;
        animation: slideIn 1s ease-in-out;
      }
      .header h1 {
        margin: 0;
        font-size: 24px;
        font-weight: bold;
      }
      .content {
        padding: 40px 30px;
        animation: slideIn 1s ease-in-out;
      }
      .content p {
        margin: 0 0 20px;
        font-size: 16px;
        line-height: 1.5;
      }
      .otp-code {
        font-size: 36px;
        font-weight: bold;
        color: #1a73e8;
        text-align: center;
        margin: 20px 0;
        animation: fadeIn 1s ease-in-out;
      }
      .button {
        display: block;
        width: 100%;
        max-width: 200px;
        margin: 30px auto 0;
        padding: 15px 0;
        background-color: #1a73e8;
        color: #ffffff;
        text-align: center;
        text-decoration: none;
        border-radius: 5px;
        transition: background-color 0.3s ease, transform 0.3s ease;
        animation: slideIn 1s ease-in-out;
      }
      .button:hover {
        background-color: #0c47a1;
        transform: translateY(-2px);
      }
      .footer {
        background-color: #f4f4f4;
        text-align: center;
        padding: 20px 0;
        font-size: 14px;
        color: #777;
        border-top: 1px solid #ddd;
        animation: fadeIn 1s ease-in-out;
      }
      .footer p {
        margin: 5px 0;
      }
      .footer a {
        color: #1a73e8;
        text-decoration: none;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Your OTP Code</h1>
      </div>
      <div class="content">
        <p>Hi ${username},</p>
        <p>We received a request to access your account. Use the following OTP to complete the process:</p>
        <div class="otp-code">${otp}</div>
        <p>This OTP is valid for 10 minutes. If you did not request this code, please contact our support team immediately.</p>
        <a href="mailto:${supportEmail}" class="button">Contact Support</a>
        <p>Thank you,<br>${companyName}</p>
      </div>
      <div class="footer">
        <p>&copy; 2024 ${companyName}. All rights reserved.</p>
        <p>${companyAddress}</p>
      </div>
    </div>
  </body>
  </html>
  `;
};
