import React, { useState } from "react";
import { Button, Card, Dropdown, DropdownButton } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import lotus from "../../assets/lotus.png";
import resistanceband from "../../assets/resistanceband.png";
import "./SelectionPractice.css";
export default function SelectionPractice() {
  const navigate = useNavigate();
  const [workoutLearnRoute, setworkoutLearnRoute] = useState(
    "/workout-practice?level=Beginner"
  );
  return (
    <div className="SelectionPractice">
      <div className="practice_select_container">
        <div className="workout_practice_select">
          <Card className="workout_card">
            <Card.Img
              className="workout_card_img"
              variant="top"
              src={resistanceband}
            />
            <Card.Body>
              <Card.Title className="workout_card_title">
                Practice workout
              </Card.Title>
              <Card.Text className="workout_card_text">
                Practice workout from beginner to advanced.
              </Card.Text>
              <div className="workout_card_selector">
                <DropdownButton
                  className="workout_dropdown"
                  title={workoutLearnRoute.substring(23).slice(1)}
                  onSelect={(e) => {
                    setworkoutLearnRoute(e);
                  }}
                >
                  <Dropdown.Item eventKey="/workout-practice?level=Beginner">
                    {" "}
                    Beginner
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="/workout-practice?level=Intermediate">
                    {" "}
                    Intermediate
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="/workout-practice?level=Advanced">
                    Advanced
                  </Dropdown.Item>
                </DropdownButton>
                <Button
                  variant="warning"
                  onClick={() => navigate(workoutLearnRoute)}
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
