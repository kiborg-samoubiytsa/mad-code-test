import { useState, FC, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store/store";
import { durationToMinutes } from "../helpers/formalizeDateToMinutes";
import { stopTest } from "../store/testSlice";

const Timer: FC = () => {
  const dispatch = useAppDispatch();

  const intervalId = useRef<NodeJS.Timer | null>(null);

  const maxTimeMinutes = useSelector(
    (state: RootState) => state.testSlice.maxTimeMinutes
  );

  const testState = useSelector(
    (state: RootState) => state.testSlice.testState
  );

  const now = new Date();

  const [timeLeft, setTimeLeft] = useState<number>(
    localStorage.getItem("end_time")
      ? JSON.parse(localStorage.getItem("end_time") as string) - now.getTime()
      : now.getTime() + maxTimeMinutes * 60 * 1000 - now.getTime()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((e) => e - 1000);
    }, 1000);
    intervalId.current = interval;
    return () => {
      if (intervalId.current) {
        clearInterval(interval);
      }
    };
  }, []);

  useEffect(() => {
    if (testState == "finished") {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    }
  }, [testState]);

  useEffect(() => {
    if (timeLeft <= 0) {
      dispatch(stopTest());
    }
  }, [timeLeft]);

  console.log(timeLeft);
  return (
    <div className="timer">
      <span>{durationToMinutes(timeLeft)}</span>
    </div>
  );
};
export default Timer;
