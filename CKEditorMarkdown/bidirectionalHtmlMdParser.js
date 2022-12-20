import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import rehypeRemark from 'rehype-remark';
import { toHtml } from 'hast-util-to-html';
import { toMdast } from 'hast-util-to-mdast';
import remarkGfm from 'remark-gfm';
import remarkStringify from 'remark-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';

export async function htmlToMarkdown(html) {
	const md = await unified()
		.use(rehypeParse)
		.use(rehypeRemark, {
			handlers: {
				// alternativt kan attributen 'data-mdast="ignore"' indsættes
				// i elementet
				img(h, node) {
					if (node.properties.dataMathml) {
						return h(node, 'html', toHtml(node));
					} else {
						return h(node, 'markdown', toMdast(node));
					}
				}
			}
		})
		.use(remarkGfm)
		.use(remarkStringify)
		.process(html);

	// TODO sanitize

	return String(md);
}

export async function markdownToHtml(markdown) {
	const html = await unified()
		.use(remarkParse)
		.use(remarkGfm)
		.use(remarkRehype, { allowDangerousHtml: true })
		.use(rehypeRaw)
		.use(rehypeStringify, { allowDangerousHtml: true })
		.process(markdown);

	// TODO sanitize
	return String(html);
}
