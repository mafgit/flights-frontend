import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="bg-foreground-opposite  p-8 py-12">
      <div className="max-w-[1200px] mx-auto flex gap-4 justify-evenly items-start">
        <div className="">
          <h4 className="font-semibold text-lg text-primary-shade">
            List of links
          </h4>
          <ul className="flex flex-col gap-2 mt-2">
            <li className="cursor-pointer hover:underline">
              <Link href={"/"}>Link to home long</Link>
            </li>
            <li className="cursor-pointer hover:underline">
              <Link href={"/"}>Link to home</Link>
            </li>
            <li className="cursor-pointer hover:underline">
              <Link href={"/"}>Link to home</Link>
            </li>
          </ul>
        </div>

        <div className="">
          <h4 className="font-semibold text-lg text-primary-shade">
            List of links
          </h4>
          <ul className="flex flex-col gap-2 mt-2">
            <li className="cursor-pointer hover:underline">
              <Link href={"/"}>Link to home</Link>
            </li>
            <li className="cursor-pointer hover:underline">
              <Link href={"/"}>Link to home long</Link>
            </li>
            <li className="cursor-pointer hover:underline">
              <Link href={"/"}>Link to home</Link>
            </li>
            <li className="cursor-pointer hover:underline">
              <Link href={"/"}>Link to home</Link>
            </li>
          </ul>
        </div>

        <div className="">
          <h4 className="font-semibold text-lg text-primary-shade">
            List of links
          </h4>
          <ul className="flex flex-col gap-2 mt-2">
            <li className="cursor-pointer hover:underline">
              <Link href={"/"}>Link to home</Link>
            </li>
            <li className="cursor-pointer hover:underline">
              <Link href={"/"}>Link to home</Link>
            </li>
            <li className="cursor-pointer hover:underline">
              <Link href={"/"}>Link to home long</Link>
            </li>
            <li className="cursor-pointer hover:underline">
              <Link href={"/"}>Link to home</Link>
            </li>
            <li className="cursor-pointer hover:underline">
              <Link href={"/"}>Link to home long</Link>
            </li>
          </ul>
        </div>

        <div className="">
          <h4 className="font-semibold text-lg text-primary-shade">
            List of links
          </h4>
          <ul className="flex gap-4 mt-2">
            <li className="cursor-pointer">
              <Link href={"/"}>
                <FaInstagram className="text-pink-700 text-3xl" />
              </Link>
            </li>
            <li className="cursor-pointer">
              <Link href={"/"}>
                <FaFacebook className="text-blue-600 text-3xl" />
              </Link>
            </li>
            <li className="cursor-pointer">
              <Link href={"/"}>
                <FaTwitter className="text-blue-300 text-3xl" />
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center mt-6">
        <p className="italic text-primary-shade font-semibold">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam, cu!
        </p>
      </div>
    </div>
  );
};

export default Footer;
