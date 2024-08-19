const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const copyPlugin = require('copy-webpack-plugin');

module.exports = env => {
    return {
        mode: 'development',
        entry: {
            app: path.resolve(__dirname, 'src/js/index.js')
        },
        snapshot: {
            managedPaths: []
        },
        watchOptions: {
            followSymlinks: true
        },
        resolve: {
            symlinks: false,
            extensions: ['.js', '.jsx']
        },
        output: {
            publicPath: '/',
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].bundle.js',
            assetModuleFilename: 'images/[name][ext]',
            clean: true
        },
        target: 'web',
        devServer: {
            static: path.resolve(__dirname, 'src'),
            port: 8080,
            open: false,
            hot: true,
            compress: true,
            historyApiFallback: true
        },
        devtool: 'source-map',
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: [
                        /node_modules\/(?!@ocdla\/global-components)/,
                        /dev_modules\/(?!@ocdla\/global-components)/
                    ],
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                                '@babel/preset-react'
                            ]
                        }
                    }
                },
                {
                    test: /\.html$/i,
                    exclude: [
                        /node_modules\/(?!@ocdla\/global-components)/,
                        /dev_modules\/(?!@ocdla\/global-components)/
                    ],
                    use: ['html-loader']
                },
                {
                    test: /\.css$/i,
                    exclude: [
                        /node_modules\/(?!@ocdla\/global-components)/,
                        /dev_modules\/(?!@ocdla\/global-components)/
                    ],
                    use: ['style-loader', 'css-loader', 'postcss-loader']
                },
                {
                    test: /\.(svg|eot|ttf|woff|woff2)$/i,
                    exclude: [
                        /node_modules\/(?!@ocdla\/global-components)/,
                        /dev_modules\/(?!@ocdla\/global-components)/
                    ],
                    type: 'asset/resource'
                },
                {
                    test: /\.(png|jpg|gif)$/i,
                    exclude: [
                        /node_modules\/(?!@ocdla\/global-components)/,
                        /dev_modules\/(?!@ocdla\/global-components)/
                    ],
                    type: 'asset/resource'
                },
                {
                    test: /\.xml$/i,
                    exclude: [
                        /node_modules\/(?!@ocdla\/global-components)/,
                        /dev_modules\/(?!@ocdla\/global-components)/
                    ],
                    type: 'asset/source'
                }
            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                USE_MOCK: JSON.stringify(env.USE_MOCK || false),
                APP_TYPE: JSON.stringify(env.APP_TYPE || false)
            }),
            new htmlWebpackPlugin({
                template: path.resolve(__dirname, 'src/index.html'),
                chunks: ['app'],
                inject: 'body',
                filename: 'index.html'
            }),
            new copyPlugin({
                patterns: [
                    // {
                    //     from: path.resolve(__dirname, 'src/images'),
                    //     to: path.resolve(__dirname, 'dist/images')
                    // }
                    'src/.nojekyll'
                ]
            })
        ]
    };
};
