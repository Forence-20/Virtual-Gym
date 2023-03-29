import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { Pose } from "@mediapipe/pose";
import React, { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";

import * as poseAll from "@mediapipe/pose";
import * as cam from "@mediapipe/camera_utils";
import Webcam from "react-webcam";
import { workoutImages } from "../../../workoutposedata/workoutImages";
import { workoutInstructions } from "../../../workoutposedata/workoutInstructions";
import useState from "react-usestateref";
import DropDown from "../../../components/DropDown/DropDown";
import { fstore } from "../../../firebaseconfig/firebaseconfig";
import RotateDevice from "../../../components/RotateDevice/RotateDevice";
import {
  beginner_exercise_pack,
  inter_exercise_pack,
  adv_exercise_pack,
} from "./workoutData";
import "./workout-Practice.css";

const radians_to_degrees = (rad) => (rad * 180.0) / Math.PI;
function find_angle(p1, p2, p3) {
  //angle between 3 points
  let angle_radians =
    Math.atan2(p3.y - p2.y, p3.x - p2.x) - Math.atan2(p1.y - p2.y, p1.x - p2.x);
  let angle_degrees = radians_to_degrees(angle_radians);
  if (angle_degrees > 180.0) {
    angle_degrees = 360 - angle_degrees;
  }
  return angle_degrees;
}

function workout_Practice() {
  async function addRecentData() {
    if (counterRef.current > 0) {
      try {
        const dataRef = doc(fstore, "users", localStorage.getItem("id"));
        await updateDoc(dataRef, {
          recentData: arrayUnion({
            pose_name: prevPoseRef.current,
            level: level,
            time: Date().toString(),
            repetition: counterRef.current,
          }),
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const level = params.get("level");

  var exercise_pack = beginner_exercise_pack;

  if (level == "Beginner") {
    exercise_pack = beginner_exercise_pack;
  } else if (level == "Intermediate") {
    exercise_pack = inter_exercise_pack;
  } else if (level == "Advanced") {
    exercise_pack = adv_exercise_pack;
  }

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const connect = window.drawConnectors;
  const land = window.drawLandmarks;
  var camera = null;
  var poseResults;
  var current_exercise;
  var stage;
  var angle_deg;

  stage = null;
  const [counter, setCounter, counterRef] = useState(0);
  const [currentPose, setCurrentPose, currentPoseRef] = useState(
    exercise_pack.at(0).name
  );
  const [prevPose, setPrevPose, prevPoseRef] = useState();
  const [toggleImage, setToggleImage] = useState(true);

  const handleUpdate = async () => {
    console.log(parseInt(localStorage.getItem(currentPoseRef.current)) + 1);
    try {
      const dataRef = doc(fstore, "users", localStorage.getItem("id"));

      console.log(currentPoseRef.current);

      console.log(dataRef);

      await updateDoc(dataRef, {
        [`${level}.${currentPoseRef.current}`]:
          parseInt(localStorage.getItem(currentPoseRef.current)) + 1,
      });
      localStorage.setItem(
        currentPoseRef.current,
        parseInt(localStorage.getItem(currentPoseRef.current)) + 1
      );
    } catch (err) {
      console.log(err);
    }
  };

  function incrementCounter() {
    setCounter((prevCounter) => prevCounter + 1);
    handleUpdate();
  }
  function resetCounter() {
    setCounter(0);
  }

  useEffect(() => {
    addRecentData();
    resetCounter();
    setPrevPose(currentPose);
  }, [currentPose]);

  useEffect(() => {
    return () => {
      addRecentData();
      camera?.stop();
    };
  }, []);

  function onResults(results) {
    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");
    try {
      canvasCtx.save();

      canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

      canvasCtx.drawImage(
        results.image,
        0,
        0,
        canvasElement.width,
        canvasElement.height
      );

      canvasCtx.save();
      canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
      canvasCtx.globalCompositeOperation = "source-in";
      canvasCtx.fillStyle = "#ff5500";
      canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);

      // Only overwrite missing pixels.
      canvasCtx.globalCompositeOperation = "destination-atop";
      canvasCtx.drawImage(
        results.image,
        0,
        0,
        canvasElement.width,
        canvasElement.height
      );
      window.drawConnectors;
      canvasCtx.globalCompositeOperation = "source-over";
      connect(canvasCtx, results.poseLandmarks, poseAll.POSE_CONNECTIONS, {
        color: "#ff5500",
        lineWidth: 4,
      });
      land(canvasCtx, results.poseLandmarks, {
        color: "#42ff52",
        lineWidth: 2,
      });
      canvasCtx.restore();

      poseResults = results.poseWorldLandmarks;
      current_exercise = exercise_pack.find(
        (current_exercise) => current_exercise.name === currentPoseRef.current
      );

      angle_deg = find_angle(
        poseResults[current_exercise.pose_landmark_1],
        poseResults[current_exercise.pose_landmark_2],
        poseResults[current_exercise.pose_landmark_3]
      );

      if (angle_deg > current_exercise.max_angle) {
        stage = "down";
      }
      if (angle_deg < current_exercise.min_angle && stage === "down") {
        stage = "up";

        incrementCounter();
        console.error(current_exercise.name);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const pose = new Pose({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
      },
    });

    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });
    pose.onResults(onResults);

    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null
    ) {
      camera = new cam.Camera(webcamRef.current.video, {
        onFrame: async () => {
          await pose.send({ image: webcamRef.current.video });
        },
        width: 640,
        height: 480,
      });
      camera.start();
    }
  }, []);

  if (window.innerWidth < 640) {
    return <RotateDevice />;
  } else {
    return (
      <div className="workout-Practice">
        <h2 className="workout_practice_heading">Workout - {level}</h2>
        <div className="dropdown_container">
          <div className="dropdown_style">
            <DropDown
              exercise_pack={exercise_pack}
              currentPose={currentPose}
              setCurrentPose={setCurrentPose}
            />
          </div>
        </div>
        <div className="flexbox_container">
          <div className="workout_camera_and_canvas">
            <Webcam ref={webcamRef} width="640px" height="480px" />{" "}
            <div className="workout_canvas_container">
              <canvas ref={canvasRef} width="640px" height="480px"></canvas>
            </div>
          </div>
          <div className="counter">
            {counter}
          </div>
          {toggleImage ? (
            <div className="workout_pose_image_container">
              <img
                alt=""
                src={workoutImages[currentPose]}
                onClick={() => {
                  setToggleImage(false);
                }}
              />
            </div>
          ) : (
            <div className="workout_pose_text_container">
              <textarea
                onClick={() => {
                  setToggleImage(true);
                }}
                value={workoutInstructions[currentPose]}
                readOnly={true}
                spellCheck={false}
              ></textarea>
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default workout_Practice;
