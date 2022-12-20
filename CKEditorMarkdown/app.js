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
import { htmlToMarkdown, markdownToHtml } from './bidirectionalHtmlMdParser';

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
let editorDom;
const matImgStreng =
	'\'<img class="Wirisformula" style="max-width:none;vertical-align:-4px;" src="data:image/svg+xml;charset=utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Awrs%3D%22http%3A%2F%2Fwww.wiris.com%2Fxml%2Fmathml-extension%22%20height%3D%2240%22%20width%3D%2251%22%20wrs%3Abaseline%3D%2236%22%3E%3C!--MathML%3A%20%3Cmath%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F1998%2FMath%2FMathML%22%3E%3Cmsqrt%3E%3Cmsup%3E%3Cmn%3E3%3C%2Fmn%3E%3Cmsup%3E%3Cmn%3E3%3C%2Fmn%3E%3Cmsup%3E%3Cmn%3E3%3C%2Fmn%3E%3Cmsup%3E%3Cmn%3E3%3C%2Fmn%3E%3Cmsup%3E%3Cmn%3E3%3C%2Fmn%3E%3Cmn%3E3%3C%2Fmn%3E%3C%2Fmsup%3E%3C%2Fmsup%3E%3C%2Fmsup%3E%3C%2Fmsup%3E%3C%2Fmsup%3E%3C%2Fmsqrt%3E%3C%2Fmath%3E--%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%2F%3E%3C%2Fdefs%3E%3Cpolyline%20fill%3D%22none%22%20points%3D%2212%2C-34%2011%2C-34%205%2C0%202%2C-13%22%20stroke%3D%22%23000000%22%20stroke-linecap%3D%22square%22%20stroke-width%3D%221%22%20transform%3D%22translate(0.5%2C37.5)%22%2F%3E%3Cpolyline%20fill%3D%22none%22%20points%3D%225%2C0%202%2C-13%200%2C-12%22%20stroke%3D%22%23000000%22%20stroke-linecap%3D%22square%22%20stroke-width%3D%221%22%20transform%3D%22translate(0.5%2C37.5)%22%2F%3E%3Cline%20stroke%3D%22%23000000%22%20stroke-linecap%3D%22square%22%20stroke-width%3D%221%22%20x1%3D%2212.5%22%20x2%3D%2249.5%22%20y1%3D%223.5%22%20y2%3D%223.5%22%2F%3E%3Ctext%20font-family%3D%22Arial%22%20font-size%3D%2216%22%20text-anchor%3D%22middle%22%20x%3D%2218.5%22%20y%3D%2236%22%3E3%3C%2Ftext%3E%3Ctext%20font-family%3D%22Arial%22%20font-size%3D%2212%22%20text-anchor%3D%22middle%22%20x%3D%2226.5%22%20y%3D%2229%22%3E3%3C%2Ftext%3E%3Ctext%20font-family%3D%22Arial%22%20font-size%3D%2210%22%20text-anchor%3D%22middle%22%20x%3D%2233.5%22%20y%3D%2223%22%3E3%3C%2Ftext%3E%3Ctext%20font-family%3D%22Arial%22%20font-size%3D%228%22%20text-anchor%3D%22middle%22%20x%3D%2238.5%22%20y%3D%2219%22%3E3%3C%2Ftext%3E%3Ctext%20font-family%3D%22Arial%22%20font-size%3D%228%22%20text-anchor%3D%22middle%22%20x%3D%2242.5%22%20y%3D%2215%22%3E3%3C%2Ftext%3E%3Ctext%20font-family%3D%22Arial%22%20font-size%3D%228%22%20text-anchor%3D%22middle%22%20x%3D%2246.5%22%20y%3D%2211%22%3E3%3C%2Ftext%3E%3C%2Fsvg%3E" data-mathml="«math xmlns=¨http://www.w3.org/1998/Math/MathML¨»«msqrt»«msup»«mn»3«/mn»«msup»«mn»3«/mn»«msup»«mn»3«/mn»«msup»«mn»3«/mn»«msup»«mn»3«/mn»«mn»3«/mn»«/msup»«/msup»«/msup»«/msup»«/msup»«/msqrt»«/math»" alt="square root of 3 to the power of 3 to the power of 3 to the power of 3 to the power of 3 cubed end exponent end exponent end exponent end exponent end root" role="math" width="51" height="40" align="middle">\'\t\t);\n';

ClassicEditor.create(document.querySelector('#editor'), {
	plugins: plugins,
	toolbar: toolbar,
	table: {
		defaultHeadings: { rows: 1 },
		contentToolbar: ['tableColumn', 'tableRow']
	}
})
	.then(newEditor => {
		editorDom = document.getElementsByClassName(
			'ck ck-content ck-editor__editable ck-rounded-corners ck-editor__editable_inline ck-blurred'
		);
		editor = newEditor;
		// editor.setData(matImgStreng)
		editorDom[0].innerHTML = matImgStreng;
		// console.log(
		// 	'toolbar names ',
		// 	editor.plugins._context.ui.componentFactory._components
		// );
		CKEditorInspector.attach(editor);
	})
	.catch(error => {
		console.error(error.stack);
	});

// Test that the html is parsed to markdown and the other way around
// through local storage
document.querySelector('#saveData').addEventListener('click', async () => {
	//const editorData = editor.getData();
	const editorData = editorDom[0].innerHTML;
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
