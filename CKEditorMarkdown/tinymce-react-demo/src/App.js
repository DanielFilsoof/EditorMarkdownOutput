import React, { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { htmlToMarkdown, markdownToHtml } from './bidirectionalHtmlMdParser';

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
			<h1>TinyMCE6</h1>
			<Editor
				//apiKey="qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc"
				tinymceScriptSrc={
					process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'
				}
				value={editorContent}
				onInit={(evt, editor) => editorRef.current = editor}
				initialValue="<p>This is the initial content of the editor.</p>"
				init={{
					external_plugins: {
						tiny_mce_wiris: 'node_modules/@wiris/mathtype-tinymce6/plugin.min.js',
						//tiny_mce_wiris: 'https://www.wiris.net/demo/plugins/tiny_mce/plugin.js',
					},
					extended_valid_elements: '*[.*]',
					height: 500,
					menubar: false,
					plugins: [
						'advlist',
						'autolink',
						'lists',
						'link',
						'image',
						'charmap',
						'anchor',
						'searchreplace',
						'visualblocks',
						'code',
						'fullscreen',
						'insertdatetime',
						'media',
						'table',
						'preview',
						'help',
						'wordcount',
					],
					toolbar:
						'undo redo | blocks | ' +
						'bold italic | bullist numlist outdent indent | ' +
						'tiny_mce_wiris_formulaEditor tiny_mce_wiris_formulaEditorChemistry' +
						'removeformat | help',
					content_style:
						'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
				}}
			/>
			<button onClick={save}>Gem</button>
			<button onClick={load}>Indlæs</button>

			<textarea id="textareaOutputTinymce" ref={textAreaRef} />
		</>
	);
}
