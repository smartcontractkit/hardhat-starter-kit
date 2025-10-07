require("hardhat-preprocessor");
const fs = require("fs");

/**
 * Loads Solidity import remappings from a `remappings.txt` file.
 *
 * Each line in `remappings.txt` should be in the format:
 *   <alias>=<path>
 * For example:
 *   @openzeppelin/=node_modules/@openzeppelin/
 *
 * This function:
 *   1. Reads all lines from `./remappings.txt`.
 *   2. Splits each line into an alias (`from`) and its target path (`to`).
 *   3. Stores the mappings in an object for quick lookup.
 *
 * @returns {Object} An object mapping import aliases to their resolved paths.
 */
function loadRemappings() {
    const lines = fs.readFileSync("./remappings.txt", "utf-8").split(/\r?\n|\r/);
    const map = {};
    for (const line of lines) {
        const [from, to] = line.split("=");
        map[from] = to;
    }
    return map;
}

/**
 * Configures a Hardhat preprocessor to apply Solidity import remappings.
 *
 * This function:
 *   1. Loads alias-to-path mappings from `remappings.txt` via `loadRemappings()`.
 *   2. Returns a configuration object compatible with the `hardhat-preprocessor` plugin.
 *   3. For each line of a Solidity file, if the line is an `import` statement, it checks
 *      whether any alias (`from`) appears in the line. If so, the alias is replaced with
 *      its corresponding path (`to`).
 *   4. Provides the full remappings in `settings` for reference or debugging.
 *
 * Example:
 *   If `remappings.txt` contains:
 *     @openzeppelin/=node_modules/@openzeppelin/
 *
 *   Then this import:
 *     import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
 *
 *   Will be rewritten to:
 *     import "node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
 *
 * @returns {Object} A Hardhat preprocessor configuration with an `eachLine` hook
 *                   that rewrites import paths according to defined remappings.
 */
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