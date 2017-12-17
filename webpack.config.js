require('babel-polyfill');

const
    path = require('path'),
    UglifyJSPlugin = require('uglifyjs-webpack-plugin')
;

module.exports = {
    entry: {
        main: './app/Resources/assets/scripts/main.js',
        data: [
            'babel-polyfill',
        ],
    },
    output: {
        filename: '[name].min.js',
        path: path.resolve(__dirname, 'web/dist/scripts')
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            'presets': [
                                ['env', {
                                    'targets': {
                                        'browsers': ['last 2 versions', 'ie >= 11']
                                    }
                                }]
                            ]
                        }
                    },
                    {
                        loader: 'jshint-loader',
                        options: {
                            emitErrors: false,
                            failOnHint: false,
                            reporter: function(errors) { }
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new UglifyJSPlugin()
    ]
};
