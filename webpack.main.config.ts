import type { Configuration } from 'webpack';
import CopyPlugin from "copy-webpack-plugin";

export const mainConfig: Configuration = {
    entry: './src/index.ts',
    module: {
        rules: [
            // Add support for native node modules
            {
                // We're specifying native_modules in the test because the asset relocator loader generates a
                // "fake" .node file which is really a cjs file.
                test: /native_modules[/\\].+\.node$/,
                use: 'node-loader',
            },
            {
                test: /[/\\]node_modules[/\\].+\.(m?js|node)$/,
                parser: { amd: false },
                use: {
                    loader: '@vercel/webpack-asset-relocator-loader',
                    options: {
                        outputAssetBase: 'native_modules',
                    },
                },
            },
            {
                test: /\.tsx?$/,
                exclude: /(node_modules|\.webpack)/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true,
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: "src/assets",
                    to: "assets"
                }
            ]
        })
    ]
};
