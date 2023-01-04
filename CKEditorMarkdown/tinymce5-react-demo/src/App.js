import React, {useRef, useState} from 'react';
import { Editor } from '@tinymce/tinymce-react';
import {htmlToMarkdown, markdownToHtml} from "./bidirectionalHtmlMdParser";

export default function App() {
    const editorRef = useRef(null);
    const textAreaRef = useRef(null);
    const [editorContent, setEditorContent] = useState('');

    const save = async () => {
        if (editorRef.current) {
            const editorContentInMd = await htmlToMarkdown(
                editorRef.current.getContent()
            );
            window.localStorage.setItem('editorContent', editorContentInMd);
            document.getElementById('text');
            textAreaRef.current.innerText = editorContentInMd;
        }
    };

    const load = async () => {
        const editorContentMd = window.localStorage.getItem('editorContent');
        const editorContentHtml = await markdownToHtml(editorContentMd);

        setEditorContent(editorContentHtml);
    };
    console.log(editorRef.current)
  return (
      <>
        <Editor
            onInit={(evt, editor) => editorRef.current = editor}
            tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
            initialValue="<p>This is the initial content of the editor.</p>"
            init={{
                external_plugins: {
                    //tiny_mce_wiris: "node_modules/@wiris/mathtype-tinymce5/plugin.min.js",
                    tiny_mce_wiris: 'https://www.wiris.net/demo/plugins/tiny_mce/plugin.js',
                },
              height: 500,
              menubar: false,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
              ],
              toolbar: 'undo redo | formatselect | ' +
                  'bold italic backcolor | alignleft aligncenter ' +
                  'alignright alignjustify | bullist numlist outdent indent | ' +
                  'tiny_mce_wiris_formulaEditor tiny_mce_wiris_formulaEditorChemistry | ' +
                  'removeformat | help',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
            value={editorContent}
        />
          <button onClick={save}>Gem</button>
          <button onClick={load}>Indlæs</button>

          <textarea id="textareaOutputTinymce" ref={textAreaRef} />
      </>
  );
}
