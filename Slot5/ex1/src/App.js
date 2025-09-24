import { Exercise1 } from "./components/exercise1";
import { Exercise2 } from "./components/exercise2";
import { Exercise3 } from "./components/exercise3";

function App() {
  return (
    <>
      <h1>Hello <strong>JSX</strong>!</h1>
      <p>Bài tập trên lớp: </p>
      <Exercise1 />
      <Exercise2 />
      <Exercise3 />
    </>
  );
}

export default App;
