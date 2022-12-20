import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function App() {
  const editorRef = useRef(null);

  const save = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
      // TODO parse til md -> display i UI textare -> gem i localstorage
      document.getElementById('text')
    }
  };

  const load = () => {
      // TODO load fra localstorage -> parse til html -> display i UI editor
      return 'todo';
  }

  return (
      <>
        <Editor
            tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
            onInit={(evt, editor) => editorRef.current = editor}
            initialValue='<p>This is the initial content of the editor.</p>'
            init={{
              height: 500,
              menubar: false,
              plugins: [
                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
              ],
              toolbar: 'undo redo | blocks | ' +
                  'bold italic | bullist numlist outdent indent | ' +
                  'removeformat | help',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
        />
        <button onClick={save}>Log editor content</button>

          <textarea id='textareaOutputTinymce'>

          </textarea>
      </>
  );
}
