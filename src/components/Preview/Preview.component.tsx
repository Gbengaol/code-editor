import React, { useEffect, useRef } from "react";
import "./Preview.scss";

interface PreviewProps {
  code: string;
  errorMessage: string;
}

const html = `
    <html>
      <head>
      </head>
      <body>
      <div id="root">
      </div>
      <script>
      const handleError = (error) => {
        const root = document.querySelector("#root");
        root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>'+ error +'</div>';
        console.error(error);
      }
        window.addEventListener("error", (event) => {
            event.preventDefault()
            handleError(event.error)
        })
        
        window.addEventListener("message", (event) => {
          try {
            eval(event.data)
          } catch (error) {
            handleError(error)
          }
        }, false)
      </script>
      </body>
    </html>
  `;

export const Preview: React.FC<PreviewProps> = ({ code, errorMessage }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcDoc = html;
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, "*");
    }, 50);
  }, [code]);

  return (
    <div className="iframeWrapper">
      <iframe
        sandbox="allow-scripts"
        ref={iframe}
        title="Preview"
        srcDoc={html}
      />
      {errorMessage && <div className="previewError">{errorMessage}</div>}
    </div>
  );
};
