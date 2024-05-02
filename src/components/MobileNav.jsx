import { GoCheckbox, GoHome } from "react-icons/go";
import { HiOutlineDocument } from "react-icons/hi2";
import { FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const MobileNavOptions = [
  {
    title: "Home",
    icon: <GoHome size={22} color="#000AFF" />,
    to: "/",
  },
  {
    title: "Applied Jobs",
    icon: <GoCheckbox size={22} color="#000AFF" />,
    to: "/employee/applied",
  },
  {
    title: "Saved jobs",
    icon: <HiOutlineDocument size={22} color="#000AFF" />,
    to: "/employee/saved",
  },
  {
    title: "Profile",
    icon: <FiUser size={22} color="#000AFF" />,
    to: "/employee/about",
  },
];

const MobileNav = () => {
  const navigate = useNavigate()
  return (
    <div className="w-screen bg-[#F8F9FA] flex items-center justify-between px-6 py-4 box-border fixed bottom-0 shadow-lg z-[10000]">
      {MobileNavOptions?.map((e,i) => (
        <span className="flex flex-col gap-1 items-center justify-center text-black text-[10px]" key={"nav"+i} onClick={()=>{
          navigate(e?.to)
        }}>
          {e?.icon} {e?.title}
        </span>
      ))}
    </div>
  );
};

export default MobileNav;
