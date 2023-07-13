import Image from "next/image";
import Link from "next/link";

import { FaLinkedin, FaGithub } from "react-icons/fa";
import { GiWorld } from "react-icons/gi";

export default function Footer() {
  return (
    <div className="w-full bg-gray-300 py-5">
      <div className="container mx-auto px-5 flex flex-col items-center gap-1">
        <Image src="/logo.png" alt="Logo Fullstack week" width={182} height={32} />
        <p className="text-base font-medium text-grayPrimary">
          Todos os direitos reservados.
        </p>
        <ul className="flex items-center justify-center gap-2">
          <li>
            <Link
              href="https://www.linkedin.com/in/wellyngtonkuhn"
              target="_blank"
              title="Linkedin"
            >
              <FaLinkedin />
            </Link>
          </li>
          <li>
            <Link href="https://github.com/Wellyngtonkuhn" target="_blank" title="Github">
              <FaGithub />
            </Link>
          </li>
          <li>
            <Link
              href="https://portfolio-wellyngtonkuhn.vercel.app/"
              target="_blank"
              title="Portfolio"
            >
              <GiWorld />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
