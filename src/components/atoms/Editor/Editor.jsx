import "quill/dist/quill.snow.css"; // Import Quill's default "snow" theme for styling.

import { ImageIcon, XIcon } from "lucide-react"; // Icons for UI elements.
import Quill from "quill"; // Quill library for rich text editing.
import { useEffect, useRef, useState } from "react"; // React hooks.
import { MdSend } from "react-icons/md"; // Send message icon.
import { PiTextAa } from 'react-icons/pi'; // Toolbar visibility toggle icon.

import { Button } from "@/components/ui/button"; // Custom Button component.

import { ToolTip } from "../ToolTip/ToolTip"; // Tooltip wrapper component.


export const MessageEditor = function ({ onSubmit }) {

  const [image, setImage] = useState(null); // Holds the uploaded image file.
  const [isToolbarVisible, setIsToolbarVisible] = useState(false); // Tracks toolbar visibility.

  const containerRef = useRef(); // Ref for the editor container div.
  const quillRef = useRef(); // Ref for the Quill instance.
  const imageInputRef = useRef(null); // Ref for the hidden image file input.

  const toggleToolbar = () => {
    setIsToolbarVisible(!isToolbarVisible); // Toggle visibility state.
    const toolbar = containerRef.current.querySelector(".ql-toolbar"); // Find the toolbar in the DOM.
    if (toolbar) {
      toolbar.classList.toggle("hidden"); // Toggle the `hidden` class to show/hide it.
    }
  };
  
  useEffect(() => {
    if (!containerRef.current) return; // Ensure the editor container exists.
  
    const editorContainer = document.createElement("div"); // Create a new div for the editor.
    containerRef.current.appendChild(editorContainer); // Append it to the container.
  
    const quill = new Quill(editorContainer, {
      theme: "snow", // Use the "snow" theme.
      modules: {
        toolbar: [
          ["bold", "italic", "underline", "strike"], // Text formatting options.
          ["link"], // Insert hyperlinks.
          [{ list: "ordered" }, { list: "bullet" }], // Ordered/unordered lists.
          ["clean"], // Remove formatting.
        ],
        keyboard: {
          bindings: {
            enter: {
              key: "Enter",
              handler: () => {
                return; // Override default behavior to prevent message submission on "Enter".
              },
            },
            shift_enter: {
              key: "Enter",
              shiftKey: true,
              handler: () => {
                quill.insertText(quill.getSelection()?.index || 0, "\n"); // Insert a newline.
              },
            },
          },
        },
      },
    });
  
    quillRef.current = quill; // Store the Quill instance in the ref.
  }, []);
  

  return (
    <div className='flex flex-col'>

      <div
          className='flex flex-col border border-slate-300 rounded-md overflow-hidden focus-within:shadow-sm focus-within:border-slate-400 bg-white '>

          <div className='h-full ql-custom' ref={containerRef} />
          {
              image && (
                  <div
                      className='p-2'
                  >
                      <div className='relative size-[60px] flex items-center justify-center group/image'>
                          <button
                              className='hidden group-hover/image:flex rounded-full bg-black/70 hover:bg-black absolute -top-2.5 -right-2.5 text-white size-6 z-[5] border-2 border-white items-center justify-center'
                              onClick={() => {
                                  setImage(null);
                                  imageInputRef.current.value = '';
                              }}
                          >
                              <XIcon className='size-4' />
                          </button>
                          <img 
                              src={URL.createObjectURL(image)}
                              className='rounded-xl overflow-hidden border object-cover'
                          />
                      </div>
                  </div>
              )
          }

          <div className='flex px-2 pb-2 z-[5]'>
              <ToolTip label={!isToolbarVisible ? 'Show toolbar' : 'Hide toolbar'} side='bottom' align='center'>
                  <Button
                      size="iconSm"
                      variant="ghost"
                      disabled={false}
                      onClick={toggleToolbar}
                  >
                      <PiTextAa className='size-4' />
                  </Button>
              </ToolTip>

              <ToolTip label="Image">
                  <Button
                      size="iconSm"
                      variant="ghost"
                      disabled={false}
                      onClick={() => { imageInputRef.current.click(); }}
                  >
                      <ImageIcon className='size-4' />
                  </Button>
              </ToolTip>

              <input 
                  type="file"
                  className='hidden'
                  ref={imageInputRef}
                  onChange={(e) => setImage(e.target.files[0])}
              />

              <ToolTip label="Send Message">
                  <Button
                      size="iconSm"
                      className="ml-auto bg-[#007a6a] hover:bg-[#007a6a]/80 text-white"

                      onClick={() => {
                        const messageContent = JSON.stringify(quillRef.current?.getContents()); // Get Quill content.
                        onSubmit({ body: messageContent, image }); // Pass content and image to `onSubmit`.
                        quillRef.current?.setText(""); // Clear the editor.
                        setImage(null); // Reset image.
                        imageInputRef.current.value = ""; // Clear file input.
                      }}
                      
                      disabled={false}
                  >
                      <MdSend className='size-4' />
                  </Button>
              </ToolTip>
          </div>
      </div>

      <p
          className='p-2 text-[10px] text-mutes-foreground flex justify-end'
      >
          <strong>Shift + return</strong> &nbsp; to add a new line
      </p>
    </div>
  );
};
