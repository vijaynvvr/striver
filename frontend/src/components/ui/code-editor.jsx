import React from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-c_cpp';

import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-github';

const CodeEditor = ({ language, value, onChange }) => {
    return (
      <AceEditor
        mode={language.toLowerCase()}
        theme="monokai" // You can change the theme as per your preference
        onChange={onChange}
        value={value}
        fontSize={14}
        width="50vw"
        height="300px" // Adjust the height as needed
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        setOptions={{
          useWorker: false,
          showLineNumbers: true,
          tabSize: 2,
        }}
      />
    );
  };
  
  export default CodeEditor;  