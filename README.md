    dispatch(setIsTimeLimited(true));
    dispatch(setMaxTimeMinutes(maxTimeMinutes));
    dispatch(setEndTime(now.getTime() + maxTimeMinutes * 1000 * 60));
    dispatch(setQuestions(testQuestions as QuestionWithAnswer[]));
    dispatch(startTest());
