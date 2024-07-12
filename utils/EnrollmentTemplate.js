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
