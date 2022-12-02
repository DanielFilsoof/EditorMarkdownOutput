import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Markdown from '@ckeditor/ckeditor5-markdown-gfm/src/markdown';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import { Link } from '@ckeditor/ckeditor5-link';
import { List } from '@ckeditor/ckeditor5-list';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize';
import LinkImage from '@ckeditor/ckeditor5-link/src/linkimage';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import { Alignment } from '@ckeditor/ckeditor5-alignment';
import { ImageInsert } from '@ckeditor/ckeditor5-image';
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';

const plugins = [
	Essentials,
	Paragraph,
	Bold,
	Italic,
	Underline,
	Markdown,
	Table,
	TableToolbar,
	Link,
	List,
	Image,
	ImageInsert,
	ImageToolbar,
	ImageCaption,
	ImageStyle,
	ImageResize,
	LinkImage,
	Heading,
	Alignment,
	MediaEmbed
];

// find toolbar names for plugins in editor object like so: editor.plugins._context.ui.componentFactory._components.<entries>
const toolbar = [
	'Heading',
	'Bold',
	'Italic',
	'underline',
	'alignment',
	'link',
	'bulletedList',
	'numberedList',
	'|',
	'insertTable',
	// 'tableColumn',
	// 'tableRow',
	'|',
	'insertImage',
	'mediaEmbed',
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
	},
	image: {
		toolbar: [
			'imageStyle:block',
			'imageStyle:side',
			'|',
			'toggleImageCaption',
			'imageTextAlternative',
			'|',
			'linkImage'
		]
	}
})
	.then(newEditor => {
		console.log('Editor was initialized', newEditor);
		editor = newEditor;
		console.log(
			'toobar names ',
			editor.plugins._context.ui.componentFactory._components
		);
	})
	.catch(error => {
		console.error(error.stack);
	});

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
