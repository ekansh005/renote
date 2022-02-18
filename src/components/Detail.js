import * as React from "react";
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});

export default function Detail(props) {
  const [selectedTab, setSelectedTab] = React.useState("write");

  const toggleTab = () => {
    setSelectedTab(selectedTab === "write" ? "preview" : "write");
  };

  return (
    <div className="container">
      <ReactMde
        minEditorHeight={78}
        heightUnits="vh"
        value={(props.selectedNote && props.selectedNote.content) || ""}
        onChange={props.onChange}
        selectedTab={selectedTab}
        onTabChange={toggleTab}
        generateMarkdownPreview={(markdown) => Promise.resolve(converter.makeHtml(markdown))}
      />
    </div>
  );
}
