import React, { useEffect } from 'react';
import '../App.css';
import MainDash from '../components/MainDash/MainDash';
import { fstore } from '../firebaseconfig/firebaseconfig';
import { query, getDocs, collection, where } from 'firebase/firestore';
import { useAuth } from "../contexts/AuthContext";

var returnedData;

const Dashboard = () => {
  const { currentUser } = useAuth();

  useEffect(() => {
    const getData = async () => {
      const q = query(
        collection(fstore, 'users'),
        where('uid', '==', currentUser.uid)
      );
      const docs = await getDocs(q);
      returnedData = Object.assign(
        docs.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      )[0];
      localStorage.setItem('Left Curl', returnedData['Left Curl']);
      localStorage.setItem('Squats', returnedData['Squats']);
      localStorage.setItem('Lateral Raise', returnedData['Lateral Raise']);
      localStorage.setItem('Right Curl', returnedData['Right Curl']);
      localStorage.setItem('Lunges', returnedData['Lunges']);
      localStorage.setItem('Side Lunge', returnedData['Side Lunge']);
      localStorage.setItem('Plie Squat', returnedData['Plie Squat']);
      localStorage.setItem('Tricep Kickback', returnedData['Tricep Kickback']);

      localStorage.setItem('chair', returnedData.chair);
      localStorage.setItem('cobra', returnedData.cobra);
      localStorage.setItem('goddess_pose', returnedData.goddess_pose);
      localStorage.setItem('triangle', returnedData.triangle);
      localStorage.setItem('tree', returnedData.tree);
      localStorage.setItem('camel', returnedData.camel);
      localStorage.setItem('plank', returnedData.plank);
      localStorage.setItem('upward_dog', returnedData.upward_dog);
      localStorage.setItem('warrior1', returnedData.warrior1);
      localStorage.setItem('warrior2', returnedData.warrior2);
      localStorage.setItem('bound_ankle', returnedData.bound_ankle);
      localStorage.setItem('bridge', returnedData.bridge);
      localStorage.setItem('down_dog', returnedData.down_dog);
      localStorage.setItem('gate', returnedData.gate);
      localStorage.setItem('half_moon', returnedData.half_moon);

      localStorage.setItem('id', returnedData.id);

    };

    getData();
  }, []);
  return (


      <MainDash />


  );
};

export default Dashboard;
