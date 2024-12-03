* [Installation FVTT Windows Nodejs + module](#installation)
* [Passage à Git pour le module](#passage-a-gitlab-pour-le-module)

# Installation

* Installer FoundryVTT sur PC Windows
* en mode nodejs
* avec conversion de module en YAML

**Le code**

```
D:\fvtt\node20\node.exe D:\fvtt\foundryvtt12\resources\app\main.js --dataPath=D:\fvtt\foundryvtt12donnees

ipconfig

cd D:\fvtt\foundryvtt12donnees\Data\modules\my-new-module

D:\fvtt\node20\npm init

set PATH=%PATH%;D:\fvtt\node20

D:\fvtt\node20\npm install @foundryvtt/foundryvtt-cli --save-dev

D:\fvtt\node20\npm run pushLDBtoYAML
```

package.json

```
{
  "name": "mon-module-a-moi",
  "version": "1.0.0",
  "description": "Vive CSB !",
  "main": "index.js",
  "scripts": {
    "pushLDBtoYAML": "D:/fvtt/node20/node D:/fvtt/foundryvtt12donnees/Data/modules/my-new-module/outils/pushLDBtoYAML.mjs",
    "pullYAMLtoLDB": "D:/fvtt/node20/node D:/fvtt/foundryvtt12donnees/Data/modules/my-new-module/outils/pullYAMLtoLDB.mjs"
  },
  "author": "vonv",
  "license": "MIT",
  "devDependencies": {
    "@foundryvtt/foundryvtt-cli": "^1.0.3"
  }
}
```


pullYAMLtoLDB.mjs

```
import { compilePack } from '@foundryvtt/foundryvtt-cli';
import { promises as fs } from 'fs';

const MODULE_ID = process.cwd();
const yaml = true;

const packs = await fs.readdir('./src/packs');
for (const pack of packs) {
  if (pack === '.gitattributes') continue;
  console.log('Packing ' + pack);
  await compilePack(
    `${MODULE_ID}/src/packs/${pack}`,
    `${MODULE_ID}/packs/${pack}`,
    { yaml }
  );
}
```

pullLDBtoYAML.mjs

```
import { extractPack } from "@foundryvtt/foundryvtt-cli";
import { promises as fs } from "fs";
import path from "path";

const MODULE_ID = process.cwd();
const yaml = true;
const log = true;

const packs = await fs.readdir("./packs");
for (const pack of packs) {
  if (pack === ".gitattributes") continue;
  console.log("Unpacking " + pack);
  const directory = `./src/packs/${pack}`;
  try {
    for (const file of await fs.readdir(directory)) {
      await fs.unlink(path.join(directory, file));
    }
  } catch (error) {
    if (error.code === "ENOENT") console.log("No files inside of " + pack);
    else console.log(error);
  }
  await extractPack(
    `${MODULE_ID}/packs/${pack}`,
    `${MODULE_ID}/src/packs/${pack}`,
    {
      yaml,
      transformName,
      log
    }
  );
}
/**
 * Prefaces the document with its type
 * @param {object} doc - The document data
 */
function transformName(doc) {
  const safeFileName = doc.name.replace(/[^a-zA-Z0-9А-я]/g, "_");
  const type = doc._key.split("!")[1];
  const prefix = ["actors", "items"].includes(type) ? doc.type : type;

  return `${doc.name ? `${prefix}_${safeFileName}_${doc._id}` : doc._id}.${
    yaml ? "yml" : "json"
  }`;
}
```


![](https://gitlab.com/vonv/fvtt-csb-vonv-sys-bor/-/raw/main/manuel/foundryvtt-install-windows-nodejs-to-yaml-0010.jpg){width=70%}

![](https://gitlab.com/vonv/fvtt-csb-vonv-sys-bor/-/raw/main/manuel/foundryvtt-install-windows-nodejs-to-yaml-0020.jpg){width=70%}

![](https://gitlab.com/vonv/fvtt-csb-vonv-sys-bor/-/raw/main/manuel/foundryvtt-install-windows-nodejs-to-yaml-0030.jpg){width=70%}

![](https://gitlab.com/vonv/fvtt-csb-vonv-sys-bor/-/raw/main/manuel/foundryvtt-install-windows-nodejs-to-yaml-0040.jpg){width=70%}

![](https://gitlab.com/vonv/fvtt-csb-vonv-sys-bor/-/raw/main/manuel/foundryvtt-install-windows-nodejs-to-yaml-0050.jpg){width=70%}

![](https://gitlab.com/vonv/fvtt-csb-vonv-sys-bor/-/raw/main/manuel/foundryvtt-install-windows-nodejs-to-yaml-0060.jpg){width=70%}

![](https://gitlab.com/vonv/fvtt-csb-vonv-sys-bor/-/raw/main/manuel/foundryvtt-install-windows-nodejs-to-yaml-0070.jpg){width=70%}

![](https://gitlab.com/vonv/fvtt-csb-vonv-sys-bor/-/raw/main/manuel/foundryvtt-install-windows-nodejs-to-yaml-0080.jpg){width=70%}

![](https://gitlab.com/vonv/fvtt-csb-vonv-sys-bor/-/raw/main/manuel/foundryvtt-install-windows-nodejs-to-yaml-0090.jpg){width=70%}

![](https://gitlab.com/vonv/fvtt-csb-vonv-sys-bor/-/raw/main/manuel/foundryvtt-install-windows-nodejs-to-yaml-0100.jpg){width=70%}

![](https://gitlab.com/vonv/fvtt-csb-vonv-sys-bor/-/raw/main/manuel/foundryvtt-install-windows-nodejs-to-yaml-0110.jpg){width=70%}

![](https://gitlab.com/vonv/fvtt-csb-vonv-sys-bor/-/raw/main/manuel/foundryvtt-install-windows-nodejs-to-yaml-0120.jpg){width=70%}

![](https://gitlab.com/vonv/fvtt-csb-vonv-sys-bor/-/raw/main/manuel/foundryvtt-install-windows-nodejs-to-yaml-0130.jpg){width=70%}

![](https://gitlab.com/vonv/fvtt-csb-vonv-sys-bor/-/raw/main/manuel/foundryvtt-install-windows-nodejs-to-yaml-0140.jpg){width=70%}

![](https://gitlab.com/vonv/fvtt-csb-vonv-sys-bor/-/raw/main/manuel/foundryvtt-install-windows-nodejs-to-yaml-0150.jpg){width=70%}

![](https://gitlab.com/vonv/fvtt-csb-vonv-sys-bor/-/raw/main/manuel/foundryvtt-install-windows-nodejs-to-yaml-0160.jpg){width=70%}

![](https://gitlab.com/vonv/fvtt-csb-vonv-sys-bor/-/raw/main/manuel/foundryvtt-install-windows-nodejs-to-yaml-0170.jpg){width=70%}

![](https://gitlab.com/vonv/fvtt-csb-vonv-sys-bor/-/raw/main/manuel/foundryvtt-install-windows-nodejs-to-yaml-0180.jpg){width=70%}

![](https://gitlab.com/vonv/fvtt-csb-vonv-sys-bor/-/raw/main/manuel/foundryvtt-install-windows-nodejs-to-yaml-0190.jpg){width=70%}

![](https://gitlab.com/vonv/fvtt-csb-vonv-sys-bor/-/raw/main/manuel/foundryvtt-install-windows-nodejs-to-yaml-0200.jpg){width=70%}

![](https://gitlab.com/vonv/fvtt-csb-vonv-sys-bor/-/raw/main/manuel/foundryvtt-install-windows-nodejs-to-yaml-0210.jpg){width=70%}

![](https://gitlab.com/vonv/fvtt-csb-vonv-sys-bor/-/raw/main/manuel/foundryvtt-install-windows-nodejs-to-yaml-0220.jpg){width=70%}

![](https://gitlab.com/vonv/fvtt-csb-vonv-sys-bor/-/raw/main/manuel/foundryvtt-install-windows-nodejs-to-yaml-0230.jpg){width=70%}

![](https://gitlab.com/vonv/fvtt-csb-vonv-sys-bor/-/raw/main/manuel/foundryvtt-install-windows-nodejs-to-yaml-0231.jpg){width=70%}

![](https://gitlab.com/vonv/fvtt-csb-vonv-sys-bor/-/raw/main/manuel/foundryvtt-install-windows-nodejs-to-yaml-0240.jpg){width=70%}

![](https://gitlab.com/vonv/fvtt-csb-vonv-sys-bor/-/raw/main/manuel/foundryvtt-install-windows-nodejs-to-yaml-0250.jpg){width=70%}

![](https://gitlab.com/vonv/fvtt-csb-vonv-sys-bor/-/raw/main/manuel/foundryvtt-install-windows-nodejs-to-yaml-0260.jpg){width=70%}

![](https://gitlab.com/vonv/fvtt-csb-vonv-sys-bor/-/raw/main/manuel/foundryvtt-install-windows-nodejs-to-yaml-0270.jpg){width=70%}

![](https://gitlab.com/vonv/fvtt-csb-vonv-sys-bor/-/raw/main/manuel/foundryvtt-install-windows-nodejs-to-yaml-0280.jpg){width=70%}

![](https://gitlab.com/vonv/fvtt-csb-vonv-sys-bor/-/raw/main/manuel/foundryvtt-install-windows-nodejs-to-yaml-0290.jpg){width=70%}

![](https://gitlab.com/vonv/fvtt-csb-vonv-sys-bor/-/raw/main/manuel/foundryvtt-install-windows-nodejs-to-yaml-0300.jpg){width=70%}

![](https://gitlab.com/vonv/fvtt-csb-vonv-sys-bor/-/raw/main/manuel/foundryvtt-install-windows-nodejs-to-yaml-0310.jpg){width=70%}

![](https://gitlab.com/vonv/fvtt-csb-vonv-sys-bor/-/raw/main/manuel/foundryvtt-install-windows-nodejs-to-yaml-0320.jpg){width=70%}

![](https://gitlab.com/vonv/fvtt-csb-vonv-sys-bor/-/raw/main/manuel/foundryvtt-install-windows-nodejs-to-yaml-0330.jpg){width=70%}

![](https://gitlab.com/vonv/fvtt-csb-vonv-sys-bor/-/raw/main/manuel/foundryvtt-install-windows-nodejs-to-yaml-0340.jpg){width=70%}

![](https://gitlab.com/vonv/fvtt-csb-vonv-sys-bor/-/raw/main/manuel/foundryvtt-install-windows-nodejs-to-yaml-0350.jpg){width=70%}

![](https://gitlab.com/vonv/fvtt-csb-vonv-sys-bor/-/raw/main/manuel/foundryvtt-install-windows-nodejs-to-yaml-0360.jpg){width=70%}

# Passage à GitLab pour le module

![](https://gitlab.com/vonv/fvtt-csb-vonv-sys-bor/-/raw/main/manuel/fvttaideauxdebutants0001.jpg){width=70%}

![](https://gitlab.com/vonv/fvtt-csb-vonv-sys-bor/-/raw/main/manuel/fvttaideauxdebutants0002.jpg){width=70%}

![](https://gitlab.com/vonv/fvtt-csb-vonv-sys-bor/-/raw/main/manuel/fvttaideauxdebutants0003.jpg){width=70%}

![](https://gitlab.com/vonv/fvtt-csb-vonv-sys-bor/-/raw/main/manuel/fvttaideauxdebutants0004.jpg){width=70%}

![](https://gitlab.com/vonv/fvtt-csb-vonv-sys-bor/-/raw/main/manuel/fvttaideauxdebutants0005.jpg){width=70%}

![](https://gitlab.com/vonv/fvtt-csb-vonv-sys-bor/-/raw/main/manuel/fvttaideauxdebutants0006.jpg){width=70%}

![](https://gitlab.com/vonv/fvtt-csb-vonv-sys-bor/-/raw/main/manuel/fvttaideauxdebutants0007.jpg){width=70%}

![](https://gitlab.com/vonv/fvtt-csb-vonv-sys-bor/-/raw/main/manuel/fvttaideauxdebutants0008.jpg){width=70%}

![](https://gitlab.com/vonv/fvtt-csb-vonv-sys-bor/-/raw/main/manuel/fvttaideauxdebutants0009.jpg){width=70%}

![](https://gitlab.com/vonv/fvtt-csb-vonv-sys-bor/-/raw/main/manuel/fvttaideauxdebutants0010.jpg){width=70%}

![](https://gitlab.com/vonv/fvtt-csb-vonv-sys-bor/-/raw/main/manuel/fvttaideauxdebutants0011.jpg){width=70%}

![](https://gitlab.com/vonv/fvtt-csb-vonv-sys-bor/-/raw/main/manuel/fvttaideauxdebutants0012.jpg){width=70%}

![](https://gitlab.com/vonv/fvtt-csb-vonv-sys-bor/-/raw/main/manuel/fvttaideauxdebutants0013.jpg){width=70%}

![](https://gitlab.com/vonv/fvtt-csb-vonv-sys-bor/-/raw/main/manuel/fvttaideauxdebutants0014.jpg){width=70%}

![](https://gitlab.com/vonv/fvtt-csb-vonv-sys-bor/-/raw/main/manuel/fvttaideauxdebutants0015.jpg){width=70%}

![](https://gitlab.com/vonv/fvtt-csb-vonv-sys-bor/-/raw/main/manuel/fvttaideauxdebutants0016.jpg){width=70%}

![](https://gitlab.com/vonv/fvtt-csb-vonv-sys-bor/-/raw/main/manuel/fvttaideauxdebutants0017.jpg){width=70%}

![](https://gitlab.com/vonv/fvtt-csb-vonv-sys-bor/-/raw/main/manuel/fvttaideauxdebutants0018.jpg){width=70%}

![](https://gitlab.com/vonv/fvtt-csb-vonv-sys-bor/-/raw/main/manuel/fvttaideauxdebutants0019.jpg){width=70%}

![](https://gitlab.com/vonv/fvtt-csb-vonv-sys-bor/-/raw/main/manuel/fvttaideauxdebutants0020.jpg){width=70%}
