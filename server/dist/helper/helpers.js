"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allPresent = exports.present = void 0;
function present(value) {
    if (value !== null && value !== undefined)
        return true;
}
exports.present = present;
function allPresent(obj) {
    const keys = Object.keys(obj);
    for (const key of keys) {
        if (!present(obj[key])) {
            return false;
        }
        return true;
    }
}
exports.allPresent = allPresent;
//# sourceMappingURL=helpers.js.map