import { FC } from "react";

interface Props {
  text: string;
}

export const QuestionText: FC<Props> = ({ text }) => {
  return <h2 className="question_text">{text}</h2>;
};
