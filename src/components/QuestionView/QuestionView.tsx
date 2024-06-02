import { useSelector } from "react-redux";
import { QuestionText } from "./QuestionText";
import { RootState } from "../../store/store";
import { QuestionAnswerField } from "./QuestionAnswerField";
import { Form } from "react-bootstrap";

export const QuestionView = () => {
  const questions = useSelector(
    (state: RootState) => state.testSlice.questions
  );
  const currentQuestionIndex = useSelector(
    (state: RootState) => state.testSlice.currentQuestionIndex
  );

  return (
    <Form className="question_view">
      <QuestionText text={questions[currentQuestionIndex]?.questionText} />
      <QuestionAnswerField
        questionType={questions[currentQuestionIndex]?.type}
        question={questions[currentQuestionIndex]}
        questionIndex={currentQuestionIndex}
        questions={questions}
      />
    </Form>
  );
};
