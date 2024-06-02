import { FC, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import {
  QuestionWithAnswer,
  QuestionWithChoice,
  setCurrentQuestionIndex,
  setQuestions,
  setShowSubmitView,
  stopTest,
} from "../../store/testSlice";
import { RootState, useAppDispatch } from "../../store/store";
import { useSelector } from "react-redux";

interface Props {
  questionType:
    | "short-answer"
    | "long-answer"
    | "single-choice"
    | "multiple-choice";
  question: QuestionWithAnswer | QuestionWithChoice;
  questionIndex: number;
  questions: (QuestionWithAnswer | QuestionWithChoice)[];
}

export const QuestionAnswerField: FC<Props> = ({
  questionType,
  question,
  questionIndex,
  questions,
}) => {
  const showSubmitView = useSelector(
    (state: RootState) => state.testSlice.showSubmitView
  );

  const dispatch = useAppDispatch();

  const [givenAnswer, setGivenAnswer] = useState<string | string[] | null>(
    question?.givenAnswer ||
      (questionType == "long-answer" || questionType == "short-answer"
        ? ""
        : []) ||
      null
  );

  useEffect(() => {
    console.log(givenAnswer);
    setGivenAnswer(question?.givenAnswer || null);
  }, [questionIndex]);

  const answerField = (
    questionType:
      | "short-answer"
      | "long-answer"
      | "single-choice"
      | "multiple-choice"
  ) => {
    switch (questionType) {
      case "short-answer":
        return (
          <Form.Control
            className="text-input"
            as={"input"}
            defaultValue={(question?.givenAnswer as string) || ""}
            onChange={(e) => setGivenAnswer(e.target.value)}
          ></Form.Control>
        );
      case "long-answer":
        return (
          <Form.Control
            as={"textarea"}
            defaultValue={(question?.givenAnswer as string) || ""}
            onChange={(e) => setGivenAnswer(e.target.value)}
          ></Form.Control>
        );
      case "multiple-choice":
        return (
          <div className="choices_group mb-3">
            {(question as QuestionWithChoice).choices.map((e, i) => (
              <div className="d-flex" key={`${questionIndex}-${e.text}`}>
                <Form.Check
                  type="checkbox"
                  className="checkbox-input"
                  id="default-checkbox"
                  value={e.text}
                  defaultChecked={
                    question.givenAnswer
                      ? (question.givenAnswer as string[]).includes(e.text)
                      : false
                  }
                  onChange={(el) => {
                    el.target.checked
                      ? setGivenAnswer(
                          givenAnswer
                            ? [...(givenAnswer as string[]), el.target.value]
                            : [el.target.value]
                        )
                      : setGivenAnswer(
                          (givenAnswer as string[]).filter((e, i) => {
                            return e != el.target.value;
                          })
                        );
                  }}
                  radioGroup={`checkbox-${questionIndex}`}
                  name={`checkbox-${questionIndex}`}
                ></Form.Check>
                <Form.Label style={{ marginTop: "5px" }}>{e.text}</Form.Label>
              </div>
            ))}
          </div>
        );
      case "single-choice":
        return (
          <div className="choices_group mb-3">
            {(question as QuestionWithChoice).choices.map((e, i) => (
              <div className="d-flex" key={`${questionIndex}-${e.text}`}>
                <Form.Check
                  type="radio"
                  value={e.text}
                  defaultChecked={
                    question.givenAnswer
                      ? (question.givenAnswer as string[]).includes(e.text)
                      : false
                  }
                  onChange={(el) => {
                    el.target.checked
                      ? setGivenAnswer([el.target.value])
                      : setGivenAnswer(
                          question.givenAnswer
                            ? (givenAnswer as string[]).filter((e, i) => {
                                return e != el.target.value;
                              })
                            : []
                        );
                  }}
                  name={`checkbox-${questionIndex}`}
                  id="default-radio"
                  radioGroup={`radio-${questionIndex}`}
                ></Form.Check>
                <Form.Label style={{ marginTop: "5px" }}>{e.text}</Form.Label>
              </div>
            ))}
          </div>
        );
    }
  };

  const handleCurrentQuestionChange = () => {
    if (
      !questions.some((e, i) => !e.givenAnswer && i != questions.length - 1) &&
      questionIndex >= questions.length - 1
    ) {
      dispatch(setShowSubmitView(true));
    } else {
      if (questionIndex + 1 < questions.length) {
        dispatch(setCurrentQuestionIndex(questionIndex + 1));
      }
    }
  };

  const confirmAnswer = () => {
    if (questionType == "long-answer" || questionType == "short-answer") {
      dispatch(
        setQuestions(
          questions.map((e, i) => {
            if (i == questionIndex) {
              return {
                ...(e as QuestionWithAnswer),
                givenAnswer: givenAnswer as string,
              };
            }
            return e;
          })
        )
      );
    }
    if (questionType == "single-choice" || questionType == "multiple-choice") {
      dispatch(
        setQuestions(
          questions.map((e, i) => {
            if (i == questionIndex) {
              return {
                ...(e as QuestionWithChoice),
                givenAnswer: givenAnswer as string[],
              };
            }
            return e;
          })
        )
      );
    }
    handleCurrentQuestionChange();
    setGivenAnswer(null);
  };

  return (
    <div className="answer_field">
      {answerField(questionType)}
      <div
        className="answer_confirm_button mb-3"
        onClick={() => confirmAnswer()}
      >
        Подтвердить
      </div>
    </div>
  );
};
