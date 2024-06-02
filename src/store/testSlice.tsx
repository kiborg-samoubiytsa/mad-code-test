import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type QuestionWithAnswer = {
  type: "short-answer" | "long-answer";
  questionText: string;
  givenAnswer?: string;
};
export type QuestionWithChoice = {
  type: "single-choice" | "multiple-choice";
  questionText: string;
  choices: {
    text: string;
  }[];
  givenAnswer?: string[];
};

interface InitialState {
  currentQuestionIndex: number;
  testState: "idle" | "active" | "finished";
  isTimeLimited: boolean;
  showSubmitView: boolean;
  maxTimeMinutes: number;
  endTime: number;
  questions: (QuestionWithChoice | QuestionWithAnswer)[];
}
const initialState: InitialState = {
  currentQuestionIndex: 0,
  testState: localStorage.getItem("test_state")
    ? JSON.parse(localStorage.getItem("test_state") as string)
    : false,
  maxTimeMinutes: 0,
  endTime: 0,
  showSubmitView: false,
  questions: localStorage.getItem("questions")
    ? JSON.parse(localStorage.getItem("questions") as string)
    : [],
  isTimeLimited: localStorage.getItem("is_time_limited")
    ? JSON.parse(localStorage.getItem("is_time_limited") as string)
    : false,
};

const testSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    startTest(state) {
      state.testState = "active";
      localStorage.setItem("test_state", JSON.stringify("active"));
    },
    setIsTimeLimited(state, action: PayloadAction<boolean>) {
      state.isTimeLimited = action.payload;
      localStorage.setItem("is_time_limited", JSON.stringify(action.payload));
    },
    stopTest(state) {
      state.testState = "finished";
      localStorage.setItem("test_state", JSON.stringify("finished"));
    },
    setMaxTimeMinutes(state, action: PayloadAction<number>) {
      state.maxTimeMinutes = action.payload;
    },
    setEndTime(state, action: PayloadAction<number>) {
      state.endTime = action.payload;
      localStorage.setItem("end_time", JSON.stringify(action.payload));
    },
    setCurrentQuestionIndex(state, action: PayloadAction<number>) {
      state.currentQuestionIndex = action.payload;
    },
    setQuestions(
      state,
      action: PayloadAction<(QuestionWithChoice | QuestionWithAnswer)[]>
    ) {
      state.questions = action.payload;
      localStorage.setItem("questions", JSON.stringify(action.payload));
    },
    setShowSubmitView(state, action: PayloadAction<boolean>) {
      state.showSubmitView = action.payload;
    },
  },
});
export const {
  startTest,
  stopTest,
  setMaxTimeMinutes,
  setEndTime,
  setCurrentQuestionIndex,
  setQuestions,
  setIsTimeLimited,
  setShowSubmitView,
} = testSlice.actions;
export default testSlice.reducer;
