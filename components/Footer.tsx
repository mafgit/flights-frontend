import Link from "next/link";

const Footer = () => {
  return (
    <div className="bg-foreground-black  p-8 py-12">
      <div className="max-w-[1200px] mx-auto flex gap-4 justify-evenly items-start">
        <div className="">
          <h4 className="font-semibold text-lg">List of links</h4>
          <ul className="flex flex-col gap-2 mt-2">
            <li className="cursor-pointer">
              <Link href={"/"}>Link to home</Link>
            </li>
            <li className="cursor-pointer">
              <Link href={"/"}>Link to home</Link>
            </li>
            <li className="cursor-pointer">
              <Link href={"/"}>Link to home</Link>
            </li>
          </ul>
        </div>

        <div className="">
          <h4 className="font-semibold text-lg">List of links</h4>
          <ul className="flex flex-col gap-2 mt-2">
            <li className="cursor-pointer">
              <Link href={"/"}>Link to home</Link>
            </li>
            <li className="cursor-pointer">
              <Link href={"/"}>Link to home</Link>
            </li>
            <li className="cursor-pointer">
              <Link href={"/"}>Link to home</Link>
            </li>
            <li className="cursor-pointer">
              <Link href={"/"}>Link to home</Link>
            </li>
            <li className="cursor-pointer">
              <Link href={"/"}>Link to home</Link>
            </li>
          </ul>
        </div>

        <div className="">
          <h4 className="font-semibold text-lg">List of links</h4>
          <ul className="flex flex-col gap-2 mt-2">
            <li className="cursor-pointer">
              <Link href={"/"}>Link to home</Link>
            </li>
            <li className="cursor-pointer">
              <Link href={"/"}>Link to home</Link>
            </li>
            <li className="cursor-pointer">
              <Link href={"/"}>Link to home</Link>
            </li>
            <li className="cursor-pointer">
              <Link href={"/"}>Link to home</Link>
            </li>
            <li className="cursor-pointer">
              <Link href={"/"}>Link to home</Link>
            </li>
          </ul>
        </div>

        <div className="">
          <h4 className="font-semibold text-lg">List of links</h4>
          <ul className="flex flex-col gap-2 mt-2">
            <li className="cursor-pointer">
              <Link href={"/"}>Link to home</Link>
            </li>
            <li className="cursor-pointer">
              <Link href={"/"}>Link to home</Link>
            </li>
            <li className="cursor-pointer">
              <Link href={"/"}>Link to home</Link>
            </li>
            <li className="cursor-pointer">
              <Link href={"/"}>Link to home</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center mt-6">
        <p className="italic">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam, cu!
        </p>
      </div>
    </div>
  );
};

export default Footer;
