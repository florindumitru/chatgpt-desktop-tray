import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerZIP } from '@electron-forge/maker-zip';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerDeb } from '@electron-forge/maker-deb';
import { MakerRpm } from '@electron-forge/maker-rpm';
import { MakerFlatpak } from '@electron-forge/maker-flatpak';
import { MakerDMG } from '@electron-forge/maker-dmg';
import { WebpackPlugin } from '@electron-forge/plugin-webpack';

import { mainConfig } from './webpack.main.config';

const config: ForgeConfig = {
    packagerConfig: {
        icon: "./icons/icon",
        asar: true
    },
    rebuildConfig: {},
    makers: [
        new MakerZIP({}, ['darwin', 'mas', 'win32', 'linux']),
        new MakerSquirrel({
            iconUrl: "https://raw.githubusercontent.com/link00000000/gptray/use-electron-forge/icons/icon.ico",
            setupIcon: "./icons/installers/squirrel/icon.ico"
        }),
        new MakerDMG({
            icon: "./icons/installers/dmg/icon.icns"
        }),
        new MakerRpm({
            options: {
                icon: "./icons/installers/rpm/icon.png",
            },
        }),
        new MakerDeb({
            options: {
                icon: "./icons/installers/deb/icon.png"
            }
        }),
        new MakerFlatpak({
            options: {
                icon: "./icons/installers/flatpak/icon.png",
                files: [],
                categories: ["Network"]
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
