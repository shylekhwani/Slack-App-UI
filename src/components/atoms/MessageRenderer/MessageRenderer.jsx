import Quill from "quill"; 
import { useEffect, useRef, useState } from "react"; 

export const MessageRenderer = function ({ value }) {
  // A ref to hold the HTML container where Quill content will be rendered.
  const rendererRef = useRef(null);

  // State to track whether the provided content is empty.
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    // Ensure the `rendererRef` is properly initialized before proceeding.
    if (!rendererRef.current) return;

    // Create a Quill instance with a temporary, detached `div` as the editor container.
    const quill = new Quill(document.createElement("div"), {
      theme: "snow", 
    });

    quill.disable(); // Disable editing to make the Quill instance read-only.
    
    const content = JSON.parse(value); // Parse the incoming `value` (expected to be JSON stringified Quill content).
    quill.setContents(content); // Set the parsed content to the Quill editor.

    // Determine if the content is empty by checking the trimmed text length.
    const isContentEmpty = quill.getText().trim().length === 0;
    setIsEmpty(isContentEmpty); // Update the state accordingly.

    // Update the `innerHTML` of the `rendererRef` with Quill's rendered HTML.
    rendererRef.current.innerHTML = quill.root.innerHTML;
  }, [value]); // Re-run this effect whenever the `value` changes.

  // If the content is empty, return `null` to render nothing.
  if (isEmpty) return null;

  // Render the container with the Quill content.
  return (
    <div
      ref={rendererRef} // Attach the `rendererRef` to this `div`.
      className="ql-editor ql-renderer" // Use Quill's styling for consistency.
    />
  );
};
