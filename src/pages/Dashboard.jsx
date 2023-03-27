import React, { useEffect } from "react";
import "../App.css";
import MainDash from "../components/MainDash/MainDash";
import { fstore } from "../firebaseconfig/firebaseconfig";
import { query, getDocs, collection, where } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";

var returnedData;

const Dashboard = () => {
  const { currentUser } = useAuth();

  useEffect(() => {
    const getData = async () => {
      const q = query(
        collection(fstore, "users"),
        where("uid", "==", currentUser.uid)
      );
      const docs = await getDocs(q);
      returnedData = Object.assign(
        docs.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      )[0];
      localStorage.setItem("Left Curl", returnedData["Left Curl"]);
      localStorage.setItem("Squats", returnedData["Squats"]);
      localStorage.setItem("Lateral Raise", returnedData["Lateral Raise"]);
      localStorage.setItem("Right Curl", returnedData["Right Curl"]);
      localStorage.setItem("Lunges", returnedData["Lunges"]);
      localStorage.setItem("Side Lunge", returnedData["Side Lunge"]);
      localStorage.setItem("Plie Squat", returnedData["Plie Squat"]);
      localStorage.setItem("Tricep Kickback", returnedData["Tricep Kickback"]);

      localStorage.setItem("id", returnedData.id);
    };

    getData();
  }, []);
  return <MainDash />;
};

export default Dashboard;
