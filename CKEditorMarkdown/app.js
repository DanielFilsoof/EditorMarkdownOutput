import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Markdown from '@ckeditor/ckeditor5-markdown-gfm/src/markdown';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import { List } from '@ckeditor/ckeditor5-list';
import Image from '@ckeditor/ckeditor5-image/src/image';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import { ImageInsert } from '@ckeditor/ckeditor5-image';

const plugins = [
	Essentials,
	Paragraph,
	Bold,
	Italic,
	Markdown,
	Table,
	TableToolbar,
	List,
	Image,
	ImageInsert,
	Heading
];

// find toolbar names for plugins in editor object like so: editor.plugins._context.ui.componentFactory._components.<entries>
const toolbar = [
	'Heading',
	'Bold',
	'Italic',
	'bulletedList',
	'numberedList',
	'|',
	'insertTable',
	'|',
	'insertImage',
	'|',
	'undo',
	'redo'
];

let editor;

ClassicEditor.create(document.querySelector('#editor'), {
	plugins: plugins,
	toolbar: toolbar,
	table: {
		defaultHeadings: { rows: 1 },
		contentToolbar: ['tableColumn', 'tableRow']
	}
})
	.then(newEditor => {
		console.log('Editor was initialized', newEditor);
		editor = newEditor;
		console.log(
			'toolbar names ',
			editor.plugins._context.ui.componentFactory._components
		);
	})
	.catch(error => {
		console.error(error.stack);
	});

// Test that the html is parsed to markdown and the other way around
// through local storage
document.querySelector('#saveData').addEventListener('click', () => {
	const editorData = editor.getData();
	document.querySelector('#markdown-output').value = editorData;
	window.localStorage.setItem('editorContent', editorData);
});

document.querySelector('#loadData').addEventListener('click', () => {
	// load data to editorData
	const editorData = window.localStorage.getItem('editorContent');
	console.log('editorData fra local storage: ', editorData);
	document.querySelector('#markdown-output').value = editorData;
	editor.setData(editorData);
});
