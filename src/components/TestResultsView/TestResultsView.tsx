import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export const TestResultsView = () => {
  const questions = useSelector(
    (state: RootState) => state.testSlice.questions
  );
  return (
    <div className="test-results_view d-flex flex-column justify-content-center">
      {questions.map((e, i) => {
        return (
          <div className="question_result" key={i}>
            <p>{e.questionText}</p>
            <span>
              Ваш ответ:{" "}
              {e.type == "multiple-choice" || e.type == "single-choice" ? (
                <>
                  {(e?.givenAnswer as string[])?.map((answer, i) => (
                    <span key={i}>
                      {e.givenAnswer
                        ? e.givenAnswer.length > 1
                          ? i < e.givenAnswer.length - 1
                            ? `${answer}, `
                            : answer
                          : answer
                        : answer}
                    </span>
                  ))}
                </>
              ) : (
                <span>{e.givenAnswer}</span>
              )}
            </span>
          </div>
        );
      })}
    </div>
  );
};
