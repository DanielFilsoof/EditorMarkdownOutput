import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import { Link } from '@ckeditor/ckeditor5-link';
import { List } from '@ckeditor/ckeditor5-list';
import Image from '@ckeditor/ckeditor5-image/src/image';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import { ImageInsert } from '@ckeditor/ckeditor5-image';
import MathType from '@wiris/mathtype-ckeditor5';
import CKEditorInspector from '@ckeditor/ckeditor5-inspector';

// md -> html
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

// html -> md
import rehypeParse from 'rehype-parse';
import rehypeRemark from 'rehype-remark';
import remarkStringify from 'remark-stringify';

import rehypeRaw from 'rehype-raw';
import {toHtml} from 'hast-util-to-html';
import showdown from "showdown";

const plugins = [
	Essentials,
	Paragraph,
	Bold,
	Italic,
	Table,
	TableToolbar,
	Link,
	List,
	Image,
	ImageInsert,
	Heading,
	MathType
];

// find toolbar names for plugins in editor object like so: editor.plugins._context.ui.componentFactory._components.<entries>
const toolbar = [
	'Heading',
	'Bold',
	'Italic',
	'link',
	'bulletedList',
	'numberedList',
	'|',
	'insertTable',
	'|',
	'insertImage',
	'|',
	'MathType',
	'ChemType',
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
		CKEditorInspector.attach(editor);
	})
	.catch(error => {
		console.error(error.stack);
	});

// Test that the html is parsed to markdown and the other way around
// through local storage
document.querySelector('#saveData').addEventListener('click', async () => {
	const editorData = editor.getData();
	//const editorData = document.getElementsByClassName('ck ck-content ck-editor__editable ck-rounded-corners ck-editor__editable_inline ck-blurred')[0].innerHTML;
	const editorDataToMd = await htmlToMarkdown(editorData);
	document.querySelector('#markdown-output').value = editorDataToMd;
	window.localStorage.setItem('editorContent', editorDataToMd);
});

document.querySelector('#loadData').addEventListener('click', async () => {
	// load data to editorData
	const editorDataMd = window.localStorage.getItem('editorContent');
	const editorDataHtml = await markdownToHtml(editorDataMd);
	document.querySelector('#markdown-output').value = editorDataMd;
	editor.setData(editorDataHtml);
});

async function htmlToMarkdown(html) {
	const converter = new showdown.Converter({tables: true});
	converter.setFlavor('github');
debugger
	return converter.makeMarkdown(html);
}

async function markdownToHtml(markdown) {
	const html = await unified()
		.use(remarkParse) // Parse markdown content to a syntax tree
		.use(remarkGfm)
		.use(remarkRehype)
		.use(rehypeStringify) // Serialize HTML syntax tree
		.process(markdown);

	return String(html);
}
