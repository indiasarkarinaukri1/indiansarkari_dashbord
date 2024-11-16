import JoditEditor from "jodit-react";

const JoditEditorComponent = ({ content, setContent, editor }) => {
  const config = {
    placeholder: "Start Typing...",
    enter: "P", // Use paragraph tags on enter
    cleanHTML: {
      replaceNBSP: false, // Keeps non-breaking spaces
      removeEmptyElements: false, // Keeps empty elements that may be styled
    },
    // You can add other configuration options as needed
  };

  return (
    <div>
      <JoditEditor
        ref={editor}
        value={content}
        // config={config}
        onChange={(newContent) => setContent(newContent)}
      />
    </div>
  );
};

export default JoditEditorComponent;
