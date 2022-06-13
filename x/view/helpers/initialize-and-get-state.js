export function initializeAndGetState({ initialValue, stateIndex, stateMap }) {
    const initialized = stateMap.has(stateIndex);
    if (!initialized)
        stateMap.set(stateIndex, [initialValue, undefined]);
    return stateMap.get(stateIndex);
}
//# sourceMappingURL=initialize-and-get-state.js.map