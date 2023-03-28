import React, { useState } from "react";
import "./Sidebar.css";
import Logo from "../../../src/assets/logo.png";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { SidebarData } from "../../Data/Data";
import { UilSignOutAlt, UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";

const Sidebar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const [selected, setSelected] = useState(0);
  const [expanded, setExpanded] = useState(true);

  const sidebarVarients = {
    true: {
      left: "0",
    },
    false: {
      left: "-60%",
    },
  };

  return (
    <>
      <div
        className="bars"
        style={expanded ? { left: "60%" } : { left: "5%" }}
        onClick={() => setExpanded(!expanded)}
      >
        <UilBars />
      </div>
      <motion.div
        className="Sidebar"
        variants={sidebarVarients}
        animate={window.innerWidth <= 768 ? `${expanded}` : ""}
      >
        {/* logo */}
        <div className="logo">
          <img src={Logo} alt="" />
          <span>
            Sh<span>o</span>ps
          </span>
        </div>
        {/* menu */}
        <div className="menu">
          {SidebarData.map((item, index) => {
            return (
              <div
                className={selected === index ? "menuItem active" : "menuItem"}
                key={index}
                onClick={() => {
                  setSelected(index)
                  
                  navigate(item?.path)
                }}
              >
                <item.icon />
                <span>{item.heading}</span>
              </div>
            );
          })}
          <div className="menuItem">
            <UilSignOutAlt onClick={async()=>{
              try {
                await logout();
                window.open("/login", "_top")
               
              } catch {
                setError("Failed to log out");
              }
            }} />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
