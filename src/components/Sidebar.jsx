"use client"
import Link from "next/link";
import { TfiMenu } from "react-icons/tfi";
import { useState } from "react";
import { TfiClose } from "react-icons/tfi";
import "@/styles/Sidebar.css"

function Sidebar() {
  const [sidebar, setSidebar] = useState(false);

  return (
    <>
      <TfiMenu className="icon"  onClick={() => setSidebar(!sidebar)} />
      {sidebar && (
        <div className="sidebar">
          <div className="close-modal" onClick={() => (setSidebar(!sidebar))}><TfiClose /></div>
          <ul>
            <li>
              <Link href="/"className="link">Home</Link>
            </li>
            <li>
              <Link href="/about"className="link">About</Link>
            </li>
            <li>
              <Link href="/blog"className="link">Blog</Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

export default Sidebar;
