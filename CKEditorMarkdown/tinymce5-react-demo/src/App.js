import React, {useRef, useState} from 'react';
import { Editor } from '@tinymce/tinymce-react';
import {htmlToMarkdown, markdownToHtml} from "./bidirectionalHtmlMdParser";

export default function App() {
    const editorRef = useRef(null);
    const textAreaRef = useRef(null);
    const [editorContent, setEditorContent] = useState('');

    const save = async () => {
        if (editorRef.current) {
            // const editorContent = editorRef.current.getContent()
            const editorContent = document.getElementsByClassName('tox-edit-area__iframe')[0].contentDocument.body.innerHTML

            const editorContentInMd = await htmlToMarkdown(
                editorContent
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

    const handleEditorChange = (content, editor) => {
        setEditorContent(content);
    };

    console.log(editorRef.current)
  return (
      <>
        <Editor
            onInit={(evt, editor) => editorRef.current = editor}
            tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
            onEditorChange={handleEditorChange}
            initialValue="<p>This is the initial content of the editor.</p>"
            init={{
                external_plugins: {
                    //tiny_mce_wiris: "node_modules/@wiris/mathtype-tinymce5/plugin.min.js",
                    tiny_mce_wiris: 'https://www.wiris.net/demo/plugins/tiny_mce/plugin.js',
                },
              height: 500,
              menubar: false,
              plugins: [
                'autolink lists image searchreplace',
                'media table paste wordcount hr'
              ],
                lists_indent_on_tab: false,
              toolbar: 'undo redo | formatselect | ' +
                  'bold italic | ' +
                  'bullist numlist | ' +
                  'table image hr ' +
                  'tiny_mce_wiris_formulaEditor tiny_mce_wiris_formulaEditorChemistry | ',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
            value={editorContent}
        />
          <button onClick={save}>Gem</button>
          <button onClick={load}>Indl??s</button>

          <textarea id="textareaOutputTinymce" ref={textAreaRef} />
      </>
  );
}
