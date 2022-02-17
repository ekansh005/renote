import Split from "react-split";
import List from "./components/List";
import Detail from "./components/Detail";

function App() {
  return (
    <Split
      className="split"
      sizes={[25, 75]}
      minSize={100}
      expandToMin={false}
      gutterSize={10}
      gutterAlign="center"
      snapOffset={30}
      dragInterval={1}
      direction="horizontal"
      cursor="col-resize"
    >
      <List />
      <Detail />
    </Split>
  );
}

export default App;
