// Sidebar imports
import {
  UilEstate,
  UilClipboardAlt,
  UilUsersAlt,
  UilPackage,
  UilChart,
} from "@iconscout/react-unicons";

import { FaBatteryQuarter, FaBatteryHalf, FaBatteryFull } from "react-icons/fa";

// Sidebar Data
export const SidebarData = [
  {
    icon: UilEstate,
    heading: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: UilClipboardAlt,
    heading: "Practice",
    path: "/selection-practice",
  },
  {
    icon: UilUsersAlt,
    heading: "Customers",
  },
  {
    icon: UilPackage,
    heading: "Products",
  },
  {
    icon: UilChart,
    heading: "Analytics",
  },
];

export const CardsData = [
  {
    title: "Beginner",
    color: {
      backGround:
        "linear-gradient(rgb(231 201 255) 0%, rgb(196, 132, 243) 100%)",
      boxShadow: "0px 10px 20px 0px #e0c6f5",
    },
    barValue: 70,
    value: "25,970",
    png: FaBatteryQuarter,
  },
  {
    title: "Intermediate",
    color: {
      backGround:
        "linear-gradient(rgb(255 205 204) 0%, rgb(252, 146, 157) 100%)",
      boxShadow: "0px 10px 20px 0px #FDC0C7",
    },
    barValue: 80,
    value: "14,270",
    png: FaBatteryHalf,
  },
  {
    title: "Advanced",
    color: {
      backGround: "linear-gradient(rgb(237 222 110) 0%, rgb(150 157 53) 100%)",
      boxShadow: "0px 10px 20px 0px #F9D59B",
    },
    barValue: 60,
    value: "4,270",
    png: FaBatteryFull,
  },
];
