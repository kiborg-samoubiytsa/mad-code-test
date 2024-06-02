import { Button } from "react-bootstrap";
import { useAppDispatch } from "../store/store";
import {
  startTest,
  setMaxTimeMinutes,
  setEndTime,
  setQuestions,
  QuestionWithChoice,
  setIsTimeLimited,
} from "../store/testSlice";
import { QuestionWithAnswer } from "../store/testSlice";

export const TestConfirmation = () => {
  const dispatch = useAppDispatch();

  const configureTest = () => {
    const maxTimeMinutes = 1;
    const testQuestions: (QuestionWithAnswer | QuestionWithChoice)[] = [
      { questionText: "Сколько собак в конюшне?", type: "short-answer" },
      { questionText: "Сколько коней в псарне?", type: "long-answer" },
      {
        questionText: "Кто?",
        type: "multiple-choice",
        choices: [{ text: "Он" }, { text: "Виталий" }, { text: "Никто" }],
      },
      {
        questionText: "Сколько?",
        type: "single-choice",
        choices: [{ text: "семь" }, { text: "банан" }, { text: "синий" }],
      },
    ];
    const now = new Date();
    //можно получать из запроса, это просто мок понятное дело
    dispatch(setIsTimeLimited(true));
    dispatch(setMaxTimeMinutes(maxTimeMinutes));
    dispatch(setEndTime(now.getTime() + maxTimeMinutes * 1000 * 60));
    dispatch(setQuestions(testQuestions as QuestionWithAnswer[]));
    dispatch(startTest());
  };
  return (
    <>
      <style type="text/css">
        {`
    .btn-flat {
        background-color: red;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
    
    .btn-lg {
        padding: 10px 16px 10px 16px ;
        font-size: 1.5rem;
    }
    `}
      </style>
      <div className="test_confirmation">
        <p className="test_description">
          Невероятно долгий текст описывающий что будет в тесте. УУУУ совсем уже
          с этими ЕГЭ отупели, выбирают как обезьянки из трех вариантов(цитата
          если что) Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Dignissimos ipsa velit nam aperiam doloribus asperiores quaerat ea
          provident voluptates blanditiis quis, distinctio deleniti est, harum
          non repudiandae modi? Sed, optio.
        </p>
        <Button variant="flat" size="lg" onClick={() => configureTest()}>
          Подтвердить
        </Button>
      </div>
    </>
  );
};
