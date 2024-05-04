export function present(value: any) {
    if(value !== null && value !== undefined) return true;
}

export function allPresent(obj) {
    const keys = Object.keys(obj);

    for (const key of keys) {
        if (!present(obj[key])) {
            return false;
        }

        return true;
    }
}