import React, { useEffect, useState } from "react";
import "./Cards.css";
import { CardsData } from "../../Data/Data";
import Card from "../Card/Card";
import { doc, getDoc } from "firebase/firestore";
import { fstore } from "../../firebaseconfig/firebaseconfig";

const Cards = () => {
  const [data, setData] = useState();

  const fetchData = async () => {
    const docRef = doc(fstore, "users", localStorage.getItem("id"));
    const docSnap = await getDoc(docRef);

    const TitleArray = [
      "Beginner Level",
      "Intermediate Level",
      "Advanced Level",
    ];
    const colorArray = [
      {
        backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%",
        boxShadow: "0px 10px 20px 0px #e0c6f5",
      },
      {
        backGround: "linear-gradient(180deg, #ff9190 0%, #fc929D 100%)",
        boxShadow: "0px 10px 20px 0px #FDC0C7",
      },
      {
        backGround:
          "linear-gradient(rgb(248,212,154) -146.42%, rgb(255,202,113) -46.42%)",
        boxShadow: "0px 10px 20px 0px #F9D59B",
      },
    ];

    const pngArray = [];

    const seriesArray = [];

    for (let index = 0; index < 3; index++) {
      console.log(docSnap.data());
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="Cards">
      {CardsData.map((card, id) => {
        return (
          <div className="parentContainer" key={id}>
            <Card
              key={id}
              title={card.title}
              color={card.color}
              barValue={card.barValue}
              value={card.value}
              png={card.png}
              series={card.series}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Cards;
