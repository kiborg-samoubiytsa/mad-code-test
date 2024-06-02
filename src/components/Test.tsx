import { useSelector } from "react-redux";
import { QuestionView } from "./QuestionView/QuestionView";
import { TestNavigation } from "./TestNavigation";
import Timer from "./Timer";
import { RootState } from "../store/store";
import { SubmitView } from "./SubmitView/SubmitView";
import { TestResultsView } from "./TestResultsView/TestResultsView";

export const Test = () => {
  const isTestTimeLimited = useSelector(
    (state: RootState) => state.testSlice.isTimeLimited
  );
  const showSubmitView = useSelector(
    (state: RootState) => state.testSlice.showSubmitView
  );
  const testState = useSelector(
    (state: RootState) => state.testSlice.testState
  );
  return (
    <div className="test">
      {testState == "finished" ? (
        <TestResultsView />
      ) : (
        <>
          <div className="test_header">
            <h1 className="heading">Тестирование</h1>
            {isTestTimeLimited ? <Timer /> : <></>}
          </div>
          <TestNavigation />
          {showSubmitView ? <SubmitView /> : <QuestionView />}
        </>
      )}
    </div>
  );
};
