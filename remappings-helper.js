require("hardhat-preprocessor");
const fs = require("fs");

function loadRemappings() {
    const lines = fs.readFileSync("./remappings.txt", "utf-8").split(/\r?\n|\r/);
    const map = {};
    for (const line of lines) {
        const [from, to] = line.split("=");
        map[from] = to;
    }
    return map;
}

function remapImportPaths(){
    const remap = loadRemappings();
    return {
        eachLine: () => ({
            transform: (line) => {
                const text = line.trim();
                if (text.startsWith("import ")) {
                    for (const [from, to] of Object.entries(remap)) {
                        if (text.includes(from)) {
                            return line.replace(from, to);
                        }
                    }
                }
                return line;
            },
            settings: { remappings: remap },
        }),
    };
}

module.exports={remapImportPaths}