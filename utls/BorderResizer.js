import {TYPE_CELL} from "./Constants"
import { moveVertically, moveHorizontally } from "./Mover"
import ResizeDetector from "./ResizeDetector"

function moveBottomBorder (state, offset, emitter) {
    if (!state || offset === 0) return
    if (state.type === TYPE_CELL) {
        state.height += offset
        state.availableVerticalSpace += offset
        if (emitter) {
            emitter.emit("resizing", {
                state: state,
                key: "height"
            })
        }
        return 0
    } else {
        let offsetRemain = offset,
            offsetCanUse = 0,
            availableVerticalSpace = 0

        if (offsetRemain < 0) {

            // eat space on bottom region
            availableVerticalSpace = ResizeDetector.findVerticalSpace(state.bottom)
            offsetCanUse = -Math.min(availableVerticalSpace, -offsetRemain)
            offsetRemain = offsetRemain - offsetCanUse
            moveBottomBorder(state.bottom, offsetCanUse, emitter)

            if (offsetRemain === 0) return offsetRemain

            availableVerticalSpace = ResizeDetector.findVerticalSpaceBetweenTopBottom(state)
            offsetCanUse = -Math.min(availableVerticalSpace, -offsetRemain)
            offsetRemain = offsetRemain - offsetCanUse
            moveBottomBorder(state.leading, offsetCanUse, emitter)
            moveBottomBorder(state.center, offsetCanUse, emitter)
            moveBottomBorder(state.trailing, offsetCanUse, emitter)
            moveVertically(state.bottom, offsetCanUse, emitter)

            // eat space on the top region.
            if (state.top) {
                availableVerticalSpace = ResizeDetector.findVerticalSpace(state.top)
                offsetCanUse = -Math.min(availableVerticalSpace, -offsetRemain)
                offsetRemain = offsetRemain - offsetCanUse
                moveBottomBorder(state.top, offsetCanUse, emitter)
                moveVertically(state.leading, offsetCanUse, emitter)
                moveVertically(state.center, offsetCanUse, emitter)
                moveVertically(state.trailing, offsetCanUse, emitter)
                moveVertically(state.bottom, offsetCanUse, emitter)
            }
            return offsetRemain

        } else {
            if (state.bottom) {
                moveBottomBorder(state.bottom, offset, emitter)
            } else if (state.leading || state.center || state.trailing) {
                moveBottomBorder(state.leading, offset, emitter)
                moveBottomBorder(state.center, offset, emitter)
                moveBottomBorder(state.trailing, offset, emitter)
            } else {
                moveBottomBorder(state.top, offset, emitter)
            }
            return 0
        }
    }
}

function moveLeftBorder (state, offset, emitter) {
    if (!state || offset === 0) return
    if (state.type === TYPE_CELL) {
        state.x += offset
        state.width -= offset
        state.availableHorizontalSpace -= offset
        if (emitter) {
            emitter.emit("resizing", {
                state: state,
                key: "x"
            })
            emitter.emit("resizing", {
                state: state,
                key: "width"
            })

        }
        return 0
    } else {
        let offsetRemain = offset,
            offsetCanUse = 0,
            availableHorizontalSpace =0,
            availableHorizontalSpaceForCLT = 0,
            availableHorizontalSpaceForLeading = 0,
            availableHorizontalSpaceForCenter = 0,
            availableHorizontalSpaceForTrailing = 0

        if (offset > 0) {
            availableHorizontalSpace = ResizeDetector.findHorizontalSpace(state)
            if (availableHorizontalSpace === 0 || offsetRemain === 0) return offsetRemain

            if (state.leading) {
                availableHorizontalSpaceForLeading = ResizeDetector.findHorizontalSpace(state.leading)
                offsetCanUse = Math.min(availableHorizontalSpaceForLeading, availableHorizontalSpace, offsetRemain)
                offsetRemain = offsetRemain - offsetCanUse
                availableHorizontalSpace -= offsetCanUse

                moveLeftBorder(state.top, offsetCanUse, emitter)
                moveLeftBorder(state.leading, offsetCanUse, emitter)
                moveLeftBorder(state.bottom, offsetCanUse, emitter)
            }
            if (availableHorizontalSpace === 0 || offsetRemain === 0) return offsetRemain
            if (state.center) {
                availableHorizontalSpaceForCenter = ResizeDetector.findHorizontalSpace(state.center)
                offsetCanUse = Math.min(availableHorizontalSpace,availableHorizontalSpaceForCenter, offsetRemain)
                offsetRemain = offsetRemain - offsetCanUse
                availableHorizontalSpace -= offsetCanUse

                moveLeftBorder(state.top, offsetCanUse, emitter)
                moveLeftBorder(state.bottom, offsetCanUse, emitter)
                moveLeftBorder(state.center, offsetCanUse, emitter)
                moveHorizontally(state.leading, offsetCanUse, emitter)
            }
            if (availableHorizontalSpace === 0 || offsetRemain === 0) return offsetRemain
            if (state.trailing) {
                availableHorizontalSpaceForTrailing = ResizeDetector.findHorizontalSpace(state.trailing)
                offsetCanUse = Math.min(availableHorizontalSpace, availableHorizontalSpaceForTrailing, offsetRemain)
                offsetRemain = offsetRemain - offsetCanUse
                availableHorizontalSpace -= offsetCanUse
                moveLeftBorder(state.top, offsetCanUse, emitter)
                moveLeftBorder(state.bottom, offsetCanUse, emitter)
                moveLeftBorder(state.trailing, offsetCanUse, emitter)
                moveHorizontally(state.leading, offsetCanUse, emitter)
                moveHorizontally(state.center, offsetCanUse, emitter)
            }
            return offsetRemain

        } else {
            moveLeftBorder(state.top, offset, emitter)
            if (state.leading) {
                moveLeftBorder(state.leading, offset, emitter)
            } else if (state.center) {
                moveLeftBorder(state.center, offset, emitter)
            } else {
                moveLeftBorder(state.trailing, offset, emitter)
            }
            moveLeftBorder(state.bottom, offset, emitter)
            return 0
        }
    }
}

function moveRightBorder(state, offset, emitter) {
    if (!state || offset === 0) return offset
    if (state.type === TYPE_CELL) {
        state.width += offset
        state.availableHorizontalSpace += offset
        if (emitter) {
            emitter.emit("resizing", {
                state: state,
                key: "width"
            })
        }
        return offset
    } else {
        let offsetRemain = offset,
            offsetCanUse = 0,
            availableHorizontalSpace =0,
            availableHorizontalSpaceForCLT = 0,
            availableHorizontalSpaceForLeading = 0,
            availableHorizontalSpaceForCenter = 0,
            availableHorizontalSpaceForTrailing = 0

        if (offset < 0) {
            availableHorizontalSpace = ResizeDetector.findHorizontalSpace(state)
            if (availableHorizontalSpace === 0 || offsetRemain === 0) return offsetRemain
            if (state.trailing) {
                availableHorizontalSpaceForTrailing = ResizeDetector.findHorizontalSpace(state.trailing)
                offsetCanUse = -Math.min(availableHorizontalSpaceForTrailing, availableHorizontalSpace, -offsetRemain)
                offsetRemain = offsetRemain - offsetCanUse
                availableHorizontalSpace += offsetCanUse

                moveRightBorder(state.top, offsetCanUse, emitter)
                moveRightBorder(state.trailing, offsetCanUse, emitter)
                moveRightBorder(state.bottom, offsetCanUse, emitter)
            }
            if (availableHorizontalSpace === 0 || offsetRemain === 0) return offsetRemain
            if (state.center) {
                availableHorizontalSpaceForCenter = ResizeDetector.findHorizontalSpace(state.center)
                offsetCanUse = -Math.min(availableHorizontalSpace,availableHorizontalSpaceForCenter, -offsetRemain)
                offsetRemain = offsetRemain - offsetCanUse
                availableHorizontalSpace += offsetCanUse

                moveRightBorder(state.top, offsetCanUse, emitter)
                moveRightBorder(state.bottom, offsetCanUse, emitter)
                moveRightBorder(state.center, offsetCanUse, emitter)
                moveHorizontally(state.trailing, offsetCanUse, emitter)
            }
            if (availableHorizontalSpace === 0 || offsetRemain === 0) return offsetRemain
            if (state.leading) {
                availableHorizontalSpaceForLeading = ResizeDetector.findHorizontalSpace(state.leading)
                offsetCanUse = -Math.min(availableHorizontalSpace, availableHorizontalSpaceForLeading, -offsetRemain)
                offsetRemain = offsetRemain - offsetCanUse
                availableHorizontalSpace += offsetCanUse
                moveRightBorder(state.top, offsetCanUse, emitter)
                moveRightBorder(state.bottom, offsetCanUse, emitter)
                moveRightBorder(state.leading, offsetCanUse, emitter)
                moveHorizontally(state.trailing, offsetCanUse, emitter)
                moveHorizontally(state.center, offsetCanUse, emitter)
            }
            return offsetRemain

        // drag -> right
        } else {
            moveRightBorder(state.top, offset, emitter)
            if (state.trailing) {
                moveRightBorder(state.trailing, offset, emitter)
            } else if (state.center) {
                moveRightBorder(state.center, offset, emitter)
            } else {
                moveRightBorder(state.leading, offset, emitter)
            }
            moveRightBorder(state.bottom, offset, emitter)
            return 0
        }
    }
}

function moveTopBorder (state, offset, emitter) {
    if (!state || offset === 0) return
    if (state.type === TYPE_CELL) {
        state.y += offset
        state.height -= offset
        state.availableVerticalSpace -= offset
        if (emitter) {
            emitter.emit("resizing", {
                state: state,
                key: "y"
            })
            emitter.emit("resizing", {
                state: state,
                key: "height"
            })
        }
        return 0
    } else {
        let offsetRemain = offset,
            offsetCanUse = 0,
            availableVerticalSpace = 0

        if (offsetRemain > 0) {

            if (state.top) {
                availableVerticalSpace = ResizeDetector.findVerticalSpace(state.top)
                offsetCanUse = Math.min(availableVerticalSpace, offsetRemain)
                offsetRemain = offsetRemain - offsetCanUse
                moveTopBorder(state.top, offsetCanUse, emitter)
            }

            if (offsetRemain === 0) return offsetRemain

            availableVerticalSpace = ResizeDetector.findVerticalSpaceBetweenTopBottom(state)
            offsetCanUse = Math.min(availableVerticalSpace, offsetRemain)
            offsetRemain = offsetRemain - offsetCanUse
            moveTopBorder(state.leading, offsetCanUse, emitter)
            moveTopBorder(state.center, offsetCanUse, emitter)
            moveTopBorder(state.trailing, offsetCanUse, emitter)
            moveVertically(state.top, offsetCanUse, emitter)

            // eat space in bottom region
            if (state.bottom) {
                availableVerticalSpace = ResizeDetector.findVerticalSpace(state.bottom)
                offsetCanUse = Math.min(availableVerticalSpace, offsetRemain)
                offsetRemain = offsetRemain - offsetCanUse
                moveTopBorder(state.bottom, offsetCanUse, emitter)
                moveVertically(state.leading, offsetCanUse, emitter)
                moveVertically(state.center, offsetCanUse, emitter)
                moveVertically(state.trailing, offsetCanUse, emitter)
                moveVertically(state.top, offsetCanUse, emitter)
            }
            return offsetRemain

        // drag -> up
        } else {
            if (state.top) {
                moveTopBorder(state.top, offset, emitter)
            } else if (state.leading || state.center || state.trailing) {
                moveTopBorder(state.leading, offset, emitter)
                moveTopBorder(state.center, offset, emitter)
                moveTopBorder(state.trailing, offset, emitter)
            } else {
                moveTopBorder(state.bottom, offset, emitter)
            }
            return 0
        }
    }
}

export default { moveBottomBorder, moveLeftBorder, moveTopBorder, moveRightBorder }

