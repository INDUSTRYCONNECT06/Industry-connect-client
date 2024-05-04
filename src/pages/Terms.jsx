import React from "react";

const Terms = () => {
  return (
    <div className="container mx-auto px-10 py-8 min-h-[60vh]">
      <h1 className="text-3xl font-bold mb-4">Terms and Conditions</h1>
      <p>
        Welcome to the Industry Connect family! Here are a few ground rules we
        all agree to follow:
      </p>

      <ol className="list-decimal pl-6 mb-6">
        <li>
          Age Check: You've gotta be at least 18 to dive into the job pool here.
          Let's keep it legal, folks!
        </li>
        <li>
          You are responsible for the accuracy of the information you provide in
          your job applications.
        </li>
        <li>
          Industry Connect reserves the right to modify or terminate services at
          any time without prior notice.
        </li>
        <li>
          We are not responsible for the actions or decisions of employers or
          other users on our platform.
        </li>
        <li>
          Any misuse or abuse of our platform will result in immediate
          termination of your account.
        </li>
      </ol>

      <p>
        Got questions or need a boost? Email us at{" "}
        <a href="mailto:industryconnect06@gmail.com" className="text-blue-500">
          industryconnect06@gmail.com
        </a>
        ! We're here to make job hunting as fun as a game night with friends –
        full of laughs, support, and good vibes!
      </p>
    </div>
  );
};

export default Terms;
