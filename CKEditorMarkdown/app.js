import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor'
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials'
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph'
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold'
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic'
import Markdown from '@ckeditor/ckeditor5-markdown-gfm/src/markdown'
import Table from '@ckeditor/ckeditor5-table/src/table'
import { Link } from '@ckeditor/ckeditor5-link'

const plugins = [Essentials, Paragraph, Bold, Italic, Markdown, Table, Link]

// find toolbar names for plugins in editor object like so: editor.plugins._context.ui.componentFactory._components.<entries>
const toolbar = [
	'Bold',
	'Italic',
	'link',
	'|',
	'insertTable',
	'tableColumn',
	'tableRow',
	'|',
	'undo',
	'redo'
]

let editor

ClassicEditor.create(document.querySelector('#editor'), {
	plugins: plugins,
	toolbar: toolbar,
	table: {
		defaultHeadings: { rows: 1 }
	}
})
	.then(newEditor => {
		console.log('Editor was initialized', newEditor)
		editor = newEditor
		console.log(
			'toobar names ',
			editor.plugins._context.ui.componentFactory._components
		)
	})
	.catch(error => {
		console.error(error.stack)
	})

document.querySelector('#saveData').addEventListener('click', () => {
	const editorData = editor.getData()
	console.log(editorData)
	document.querySelector('#markdown-output').value = editorData
})
