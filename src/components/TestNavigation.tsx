import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useAppDispatch } from "../store/store";
import { setCurrentQuestionIndex, setShowSubmitView } from "../store/testSlice";
import { useEffect } from "react";

export const TestNavigation = () => {
  const dispatch = useAppDispatch();
  const questions = useSelector(
    (state: RootState) => state.testSlice.questions
  );
  const currentQuestionIndex = useSelector(
    (state: RootState) => state.testSlice.currentQuestionIndex
  );
  const setQuestionIndex = (index: number) => {
    dispatch(setShowSubmitView(false));
    dispatch(setCurrentQuestionIndex(index));
  };
  useEffect(() => {
    console.log(questions);
  }, [questions]);
  return (
    <div className="test_navigation">
      {questions.map((e, i) => {
        return currentQuestionIndex == i ? (
          <span
            key={i}
            className="navigation_item-active"
            onClick={() => setQuestionIndex(i)}
          ></span>
        ) : e.givenAnswer ? (
          <span
            key={i}
            className="navigation_item-checked"
            onClick={() => setQuestionIndex(i)}
          ></span>
        ) : (
          <span
            key={i}
            className="navigation_item"
            onClick={() => setQuestionIndex(i)}
          ></span>
        );
      })}
    </div>
  );
};
