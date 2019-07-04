const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
	.BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const join = require('path').join;
const pathResolve = require('path').resolve;
const PRODUCTION = process.env.NODE_ENV ?
    process.env.NODE_ENV.toLowerCase() === 'production' : false;

module.exports = (env, options) => {
	const config = {
		entry: './src/index.app.tsx',
		output: {
		filename: '[name].bundle.js',
		publicPath: '/',
			chunkFilename: '[name].bundle.js',
			path: pathResolve(__dirname, 'dist'),
		},
		module: {
			rules: [
				{
					test: /\.(ts|tsx|js)?$/,
					exclude: /node_modules/,
					use: [
						{
							loader: 'babel-loader',
						},
					],
				},
				{
					test: /\.(html)$/,
					use: {
						loader: 'html-loader',
					},
				},
				{
					test: /\.p?css$/,
					use: [
						'style-loader',
						{
							loader: 'css-loader',
							options: {
								importLoaders: 1,
								modules: true,
								localIdentName: '[path]_[local]',
								sourceMap: true,
							},
						},
						'postcss-loader',
					],
				},
				{
					test: /\.(gif|png|jpe?g)$/i,
					use: ['file-loader'],
				},
				{
					test: /\.less$/,
					use: [
						'style-loader',
						'css-loader',
						{
							loader: 'less-loader',
							options: {
								javascriptEnabled: true,
							},
						},
					],
				},
				{
					test: /\.svg$/,
					use: {
						loader: 'url-loader',
						options: {
							limit: 10000, // 10kb
						},
					},
				},
			],
		},
		optimization: {
			splitChunks: {
				cacheGroups: {
					commons: {
						test: /[\\/]node_modules[\\/]/,
						name: 'vendors',
						chunks: 'all',
					},
				},
			},
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: './src/index.html',
				filename: './index.html',
				chunksSortMode: 'none',
			}),
			new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /ko/),
		],
		devServer: {
			contentBase: join(__dirname, 'dist'),
			compress: true,
			port: 3030,
			historyApiFallback: true,
		},
		resolve: {
			alias: {
				'@': pathResolve('src/'),
			},
			modules: ['node_modules'],
			extensions: ['.ts', '.tsx', '.js', '.json', '.less'],
		},
	}
	
	if(options.mode === 'development') {
		config.plugins.push(new BundleAnalyzerPlugin({
			openAnalyzer: PRODUCTION ? false : true,
		}))
	}

	return config;
};
