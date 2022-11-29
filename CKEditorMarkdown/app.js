// app.js

import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Markdown from '@ckeditor/ckeditor5-markdown-gfm/src/markdown';

let editor;

ClassicEditor
    .create( document.querySelector( '#editor' ), {
        plugins: [ Essentials, Paragraph, Bold, Italic, Markdown ],
        toolbar: [ 'bold', 'italic' ]
    } )
    .then( newEditor => {
        console.log( 'Editor was initialized', newEditor );
        editor = newEditor;
    } )
    .catch( error => {
        console.error( error.stack );
    } );

document.querySelector( '#saveData' ).addEventListener( 'click', () => {
    const editorData = editor.getData();
    console.log(editorData);
} );
