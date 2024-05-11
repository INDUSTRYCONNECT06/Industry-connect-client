import { useNavigate } from "react-router-dom";
import mixpanel from "mixpanel-browser";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-main-blue-01 w-full py-10 md:py-20 flex flex-col items-center justify-center text-center">
      <section className="flex m-8 items-center gap-2 md:gap-14 md:flex-row flex-col">
        <span
          className="text-md text-[#FEFEFE] font-light mb-5 md:mb-5 cursor-pointer underline"
          onClick={() => {
            window.open(
              "https://www.linkedin.com/in/industry-connect-4a6119300"
            );
            mixpanel.track("Connect with us footer");
          }}
        >
          Connect with us
        </span>
        <span
          className="text-md text-[#FEFEFE] font-light mb-5 md:mb-5 cursor-pointer underline"
          onClick={() => {
            mixpanel.track(" Privacy Policy footer");
            window.open("/privacy-policy")
          }}
        >
          Privacy Policy
        </span>
        <span
          className="text-md text-[#FEFEFE] font-light mb-5 md:mb-5 cursor-pointer underline"
          onClick={() => {
            mixpanel.track("Terms & Conditions footer");
            window.open("/terms-conditions")
          }}
        >
          Terms & Conditions
        </span>
      </section>

      <span className="text-xs md:text-lg text-[#FEFEFE] font-light">
        © 2023 INDUSTRY CONNECT. All Rights Reserved.
      </span>
    </div>
  );
};

export default Footer;
