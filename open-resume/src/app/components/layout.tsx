"use client";
import React, { PropsWithChildren, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./sidebare";

const Layout = (props: PropsWithChildren) => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="grid min-h-screen grid-rows-header bg-zinc-100">
     

      <div className="grid md:grid-cols-sidebar ">
        <div className="shadow-md bg-zinc-50">
          <Sidebar open={showSidebar} setOpen={setShowSidebar} />
        </div>
        {props.children}
      </div>
    </div>
  );
};

export default Layout;

