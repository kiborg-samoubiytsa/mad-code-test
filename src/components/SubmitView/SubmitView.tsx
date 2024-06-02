import { useAppDispatch } from "../../store/store";
import { stopTest } from "../../store/testSlice";

export const SubmitView = () => {
  const dispatch = useAppDispatch();

  const submitAttempt = () => {
    dispatch(stopTest());
  };
  return (
    <div className="submit_view">
      <p>Вы можете завершить тест</p>
      <div
        className="answer_confirm_button mb-3"
        onClick={() => submitAttempt()}
      >
        Завершить
      </div>
    </div>
  );
};
