import "./index.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import store, { RootState } from "./store/store";
import { TestConfirmation } from "./components/TestConfirmation";
import { Test } from "./components/Test";

function App() {
  const testState = useSelector(
    (state: RootState) => state.testSlice.testState
  );
  return (
    <div className="App">
      {testState == "active" || testState == "finished" ? (
        <Test />
      ) : (
        <TestConfirmation />
      )}
    </div>
  );
}

export default App;
