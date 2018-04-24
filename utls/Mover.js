import {TYPE_CELL} from "./Constants"

function _move(state, offset, key, emitter) {
    if (!state || offset === 0) return;
    if (state.type === TYPE_CELL) {
        state[key] += offset;
        if (emitter) {
            emitter.emit("resizing", {
                state: state,
                key: key
            })
        }
    } else {
        _move(state.top, offset, key, emitter);
        _move(state.leading, offset, key, emitter);
        _move(state.center, offset, key, emitter);
        _move(state.trailing, offset, key, emitter);
        _move(state.bottom, offset, key, emitter);
    }
}

function moveVertically(state, offset, emitter) {
    _move(state, offset, "y", emitter)
}

function moveHorizontally(state, offset, emitter) {
    _move(state, offset, "x", emitter)
}

export { moveVertically, moveHorizontally }