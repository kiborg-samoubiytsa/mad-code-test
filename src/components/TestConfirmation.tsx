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
        questionText: "Какие из этих челов крутые",
        type: "multiple-choice",
        choices: [
          { text: "иван золо" },
          { text: "крипер2004" },
          { text: "каша" },
        ],
      },
      {
        questionText: "Какой из них самый крутой",
        type: "single-choice",
        choices: [
          { text: "иван золо" },
          { text: "крипер2004" },
          { text: "каша" },
        ],
      },
      {
        questionText: "Какой из них самый крутой",
        type: "single-choice",
        choices: [
          { text: "иван золо" },
          { text: "крипер2004" },
          { text: "каша" },
        ],
      },
    ];
    const now = new Date();
    dispatch(setIsTimeLimited(true));
    dispatch(setMaxTimeMinutes(maxTimeMinutes)); //можно получать из запроса
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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
          doloribus iusto nobis perferendis officiis quidem, repellendus error
          est quibusdam neque? Possimus facilis sint error voluptatibus non
          repudiandae, veniam fugiat quis. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Harum doloribus iusto nobis perferendis
          officiis quidem, repellendus error est quibusdam neque? Possimus
          facilis sint error voluptatibus non repudiandae, veniam fugiat quis.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
          doloribus iusto nobis perferendis officiis quidem, repellendus error
          est quibusdam neque? Possimus facilis sint error voluptatibus non
          repudiandae, veniam fugiat quis. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Harum doloribus iusto nobis perferendis
          officiis quidem, repellendus error est quibusdam neque? Possimus
          facilis sint error voluptatibus non repudiandae, veniam fugiat quis.
        </p>
        <Button variant="flat" size="lg" onClick={() => configureTest()}>
          Подтвердить
        </Button>
      </div>
    </>
  );
};
