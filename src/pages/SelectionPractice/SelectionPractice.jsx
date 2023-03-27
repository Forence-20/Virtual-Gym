import React, { useState } from "react";
import { Button, Card, Dropdown, DropdownButton } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import lotus from "../../assets/lotus.png";
import resistanceband from "../../assets/resistanceband.png";
import "./SelectionPractice.css";
export default function SelectionPractice() {
  const navigate = useNavigate();
  const [PilatesLearnRoute, setPilatesLearnRoute] = useState(
    "/pilates-practice-beginner"
  );
  return (

    <div className="SelectionPractice">
      <div className="practice_select_container">
        <div className="pilates_practice_select">
          <Card className="pilates_card">
            <Card.Img
              className="pilates_card_img"
              variant="top"
              src={resistanceband}
            />
            <Card.Body>
              <Card.Title className="pilates_card_title">
                Practice Pilates
              </Card.Title>
              <Card.Text className="pilates_card_text">
                Practice pilates from beginner to advanced.
              </Card.Text>
              <div className="pilates_card_selector">
                <DropdownButton
                  className="pilates_dropdown"
                  title={
                    PilatesLearnRoute.substring(18).charAt(0).toUpperCase() +
                    PilatesLearnRoute.substring(18).slice(1)
                  }
                  onSelect={(e) => {
                    setPilatesLearnRoute(e);
                  }}
                >
                  <Dropdown.Item eventKey="/pilates-practice-beginner">
                    {" "}
                    Beginner
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="/pilates-practice-intermediate">
                    {" "}
                    Intermediate
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="/pilates-practice-advanced">
                    Advanced
                  </Dropdown.Item>
                </DropdownButton>
                <Button
                  variant="warning"
                  onClick={() => navigate(PilatesLearnRoute)}
                >
                  Go
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>

      {/* <MinimalFooter /> */}
    </div>
    

  );
}
