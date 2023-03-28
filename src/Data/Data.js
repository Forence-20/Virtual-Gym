// Sidebar imports
import {
  UilEstate,
  UilClipboardAlt,
  UilUsersAlt,
  UilPackage,
  UilChart,
  UilUsdSquare,
  UilMoneyWithdrawal,
} from "@iconscout/react-unicons";

import { FaBatteryQuarter } from "react-icons/fa";

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
    title: "Beginner Level",
    color: {
      backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%",
      boxShadow: "0px 10px 20px 0px #e0c6f5",
    },
    barValue: 70,
    value: "25,970",
    png: FaBatteryQuarter,
    series: [
      {
        name: "Begineer",
        data: [
          {
            x: "Right Curl",
            y: 0,
          },
          {
            x: "Left Curl",
            y: 0,
          },
          {
            x: "Lateral Raises",
            y: 0,
          },
        ],
      },
    ],
  },
  {
    title: "Revenue",
    color: {
      backGround: "linear-gradient(180deg, #ff9190 0%, #fc929D 100%)",
      boxShadow: "0px 10px 20px 0px #FDC0C7",
    },
    barValue: 80,
    value: "14,270",
    png: UilMoneyWithdrawal,
    series: [
      {
        name: "Revenue",
        data: [10, 100, 50, 70, 80, 30, 40],
      },
    ],
  },
  {
    title: "Expenses",
    color: {
      backGround:
        "linear-gradient(rgb(248,212,154) -146.42%, rgb(255,202,113) -46.42%)",
      boxShadow: "0px 10px 20px 0px #F9D59B",
    },
    barValue: 60,
    value: "4,270",
    png: UilClipboardAlt,
    series: [
      {
        name: "Expenses",
        data: [10, 25, 15, 30, 12, 15, 20],
      },
    ],
  },
];
