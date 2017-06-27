const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');
const path = require('path');

// The [devPath] is the location in your dev server in which
// you have installed the app.
// The default location is "http://localhost/photo-sphere-browser/dist/"
// If you used a different name for the project folder, you need
// to update this string.
const devPath = '/';

// [prodPath] is path to the folder in which the app is located
// on a production werb server. By default the app is expected to be placed
// in the website root. In case the app is not placed in website root,
// here you can override the default value...
const prodPath = '/';

// the development build is placed in "dev" folder, while
// the production build is placed inside the "dist" folder
const buildFolder = process.argv.indexOf('-p') !== -1 ? 'dist/' : 'dev/';

// don't change the following line
const appRootPath = process.argv.indexOf('-p') !== -1 ? prodPath : devPath;

module.exports = {
	// Defining JavaScript files, which act as entry points to application
	// > usually each is responsible for a separate sub-page
	// > Values listed here are used in [plugin] section, where we link subpages
	//   to coresponding entry points - search for [excludeChunks] & [chunks]
	entry: {
		app: './src/app.js'
	},
	output: {
		// here we need to set an absolute path - we're resolve path at runtime
		path: path.resolve(__dirname, buildFolder),
		// by specifying the [publicPath],
		// all JS and CSS files are linked
		// via absolute path (not relative)
		publicPath: appRootPath,
		filename: '[name].bundle.js' // the [name] will be replaced by the name of entry JavaScript File
	},
	module: {
		rules: [
			{
				// this [test] is applied to [require] statements in [app.js] file
				// ... so CSS needs to be required from JavaScript in order for WebPack to procerss it
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					// in case the ExtractTextPlugin doesn't  extract the CSS,
					// then the output of 'css-loader' will be forwarded to
					// to fallback loader
					fallback: 'style-loader',
					use: [
						// loaders are execure starting from bottom - the last in the list
						'css-loader', // translates CSS into CommonJS  
						'sass-loader' // compiles Sass to CSS 
					]
				})
			},
			// all JS files should be processed by Babel
			{
				test: /\.js$/,
				exclude: /node_modules/, // skip the Node modules loader
				use: 'babel-loader'
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				use: [
					`file-loader?outputPath=img/&publicPath=${appRootPath}&hash=sha512&digest=hex&name=[name].[ext]?[hash]`
				]
			},
			{
				// the following line makes webpack copy varius files required from app.js
				// into the output folder
				test: /\.(ashx|php|config|txt)$/i,
				use: [
					'file-loader?name=[name].[ext]?[hash]&publicPath=${appRootPath}&useRelativePath=true'
				]
			}
		]
	},
	plugins: [
		// Generates index.html based on the given template
		new HtmlWebpackPlugin({
			title: "This title is set from config file",
			template: './src/index.ejs',  // load a custom template
			minify: {
				// collapseWhitespace: true
			},
			hash: true // cache busting for JS and CSS files - a hash will be added to after ".js" and ".css"
		}),
		new ExtractTextPlugin({
			filename:"app.css", // here we configure how the resulting CSS file will be named
			disable: false,
			allChunks: true
		}),
		new webpack.DefinePlugin({
			'BASE_URL': JSON.stringify(appRootPath)
		})
	]
}