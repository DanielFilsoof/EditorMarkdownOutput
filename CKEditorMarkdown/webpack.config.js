// webpack.config.js

'use strict';

const path = require('path');
const { styles } = require('@ckeditor/ckeditor5-dev-utils');

module.exports = {
	// https://webpack.js.org/configuration/entry-context/
	entry: './app.js',

	// https://webpack.js.org/configuration/output/
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},

	module: {
		rules: [
			{
				test: /[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
				use: ['raw-loader']
			},
			{
				// specifify regex to target /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/ and @wiris/mathtype-html-integration-devkit/styles/styles.css
				test: /.css$/,
				use: [
					{
						loader: 'style-loader',
						options: {
							injectType: 'singletonStyleTag',
							attributes: {
								'data-cke': true
							}
						}
					},
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: styles.getPostCssConfig({
								themeImporter: {
									themePath: require.resolve(
										'@ckeditor/ckeditor5-theme-lark'
									)
								},
								minify: true
							})
						}
					}
				]
			}
		]
	},

	// Useful for debugging.
	devtool: 'source-map',

	// By default webpack logs warnings if the bundle is bigger than 200kb.
	performance: { hints: false }
};
