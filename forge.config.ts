import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';
import { MakerDeb } from '@electron-forge/maker-deb';
import { MakerRpm } from '@electron-forge/maker-rpm';
import { WebpackPlugin } from '@electron-forge/plugin-webpack';

import { mainConfig } from './webpack.main.config';

const config: ForgeConfig = {
    packagerConfig: {
        icon: "./icons/icon",
        asar: true
    },
    rebuildConfig: {},
    makers: [
        new MakerSquirrel({
            iconUrl: "https://raw.githubusercontent.com/link00000000/gptray/use-electron-forge/icons/icon.ico",
            setupIcon: "./installers/squirrel/icon.ico"
        }),
        new MakerZIP({}, ['darwin', 'mas', 'win32', 'linux']),
        new MakerRpm({
            options: {
                icon: "./installers/rpm/icon.png",
            },
        }),
        new MakerDeb({
            options: {
                icon: "./installers/deb/icon.png"
            }
        })
    ],
    plugins: [
        new WebpackPlugin({
            mainConfig,
            renderer: {
                config: {},
                entryPoints: [
                    // This is required by electron-forge, otherwise the build will hang
                    {
                        name: "dummy-renderer",
                        preload: {
                            js: "./src/renderer.ts"
                        }
                    }
                ]
            }
        })
    ]
};

export default config;
