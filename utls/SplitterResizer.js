import { TYPE_CELL } from "./Constants"
import BorderResizer from "./BorderResizer"
import ResizeDetector from "./ResizeDetector"
import { moveVertically, moveHorizontally} from "./Mover"

function moveTopSplitter(state, offset, emitter) {
    if (!state || offset === 0 || state.type === TYPE_CELL) return offset

    let offsetRemain = offset,
        offsetCanUse = 0,
        availableVerticalSpace = 0
    
        if (offsetRemain > 0) {
            availableVerticalSpace = ResizeDetector.findVerticalSpaceBetweenTopBottom(state)
            offsetCanUse = Math.min(availableVerticalSpace, offsetRemain)
            offsetRemain -= offsetCanUse

            BorderResizer.moveBottomBorder(state.top, offsetCanUse, emitter)
            BorderResizer.moveTopBorder(state.leading, offsetCanUse, emitter)
            BorderResizer.moveTopBorder(state.center, offsetCanUse, emitter)
            BorderResizer.moveTopBorder(state.trailing, offsetCanUse, emitter)

            availableVerticalSpace = ResizeDetector.findVerticalSpace(state.bottom)
            offsetCanUse = Math.min(availableVerticalSpace, offsetRemain)
            offsetRemain -= offsetCanUse

            BorderResizer.moveBottomBorder(state.top, offsetCanUse, emitter)
            BorderResizer.moveTopBorder(state.bottom, offsetCanUse, emitter)

            moveVertically(state.leading, offsetCanUse, emitter)
            moveVertically(state.center, offsetCanUse, emitter)
            moveVertically(state.trailing, offsetCanUse, emitter)

        } else {
            availableVerticalSpace = ResizeDetector.findVerticalSpace(state.top)
            offsetCanUse = - Math.min(availableVerticalSpace, - offsetRemain)
            offsetRemain -= offsetCanUse

            BorderResizer.moveBottomBorder(state.top, offsetCanUse, emitter)
            BorderResizer.moveTopBorder(state.leading, offsetCanUse, emitter)
            BorderResizer.moveTopBorder(state.center, offsetCanUse, emitter)
            BorderResizer.moveTopBorder(state.trailing, offsetCanUse, emitter)
        }

    return offsetRemain
}

function moveLeadingSplitter(state, offset, emitter) {
    if (!state || offset === 0 || state.type === TYPE_CELL) return offset
    let offsetRemain = offset,
        offsetCanUse = 0,
        availableHorizontalSpace = 0

    if (offsetRemain > 0) {
        if (state.center) {
            availableHorizontalSpace = ResizeDetector.findHorizontalSpace(state.center)
            offsetCanUse = Math.min(offsetRemain, availableHorizontalSpace)
            offsetRemain -= offsetCanUse

            BorderResizer.moveRightBorder(state.leading, offsetCanUse, emitter)
            BorderResizer.moveLeftBorder(state.center, offsetCanUse, emitter)
        }

        if (state.trailing) {
            availableHorizontalSpace = ResizeDetector.findHorizontalSpace(state.trailing)
            offsetCanUse = Math.min(offsetRemain, availableHorizontalSpace)
            offsetRemain -= offsetCanUse

            BorderResizer.moveRightBorder(state.leading, offsetCanUse, emitter)
            BorderResizer.moveLeftBorder(state.trailing, offsetCanUse, emitter)

            moveHorizontally(state.center, offsetCanUse, emitter)
        }
    } else {
        availableHorizontalSpace = ResizeDetector.findHorizontalSpace(state.leading)
        offsetCanUse = - Math.min(availableHorizontalSpace, -offsetRemain)
        offsetRemain -= offsetCanUse

        BorderResizer.moveRightBorder(state.leading, offsetCanUse, emitter)
        if (state.center) {
            BorderResizer.moveLeftBorder(state.center, offsetCanUse, emitter)
        } else {
            BorderResizer.moveLeftBorder(state.trailing, offsetCanUse, emitter)
        }
    }
    return offsetRemain
}

function moveTrailingSplitter(state, offset, emitter) {
    if (!state || offset === 0 || state.type === TYPE_CELL) return offset;

    let offsetRemain = offset,
        offsetCanUse = 0,
        availableHorizontalSpace = 0;

    if (offsetRemain < 0) {

        if (state.center) {
            availableHorizontalSpace = ResizeDetector.findHorizontalSpace(state.center);
            offsetCanUse = -Math.min(-offsetRemain, availableHorizontalSpace);
            offsetRemain = offsetRemain - offsetCanUse;
            BorderResizer.moveLeftBorder(state.trailing, offsetCanUse, emitter);
            BorderResizer.moveRightBorder(state.center, offsetCanUse, emitter);
        }

        if (state.leading) {
            availableHorizontalSpace = ResizeDetector.findHorizontalSpace(state.leading);
            offsetCanUse = -Math.min(-offsetRemain, availableHorizontalSpace);
            offsetRemain = offsetRemain - offsetCanUse;
            BorderResizer.moveRightBorder(state.leading, offsetCanUse, emitter);
            BorderResizer.moveLeftBorder(state.trailing, offsetCanUse, emitter);
            moveHorizontally(state.center, offsetCanUse, emitter);
        }

    } else {
        availableHorizontalSpace = ResizeDetector.findHorizontalSpace(state.trailing);
        offsetCanUse = Math.min(offsetRemain, availableHorizontalSpace);
        offsetRemain = offsetRemain - offsetCanUse;
        BorderResizer.moveLeftBorder(state.trailing, offsetCanUse, emitter);
        if (state.center) {
            BorderResizer.moveRightBorder(state.center, offsetCanUse, emitter);
        } else {
            BorderResizer.moveRightBorder(state.leading, offsetCanUse, emitter);
        }
    }
    return offsetRemain
}

function moveBottomSplitter(state, offset, emitter) {
    if (!state || offset === 0 || state.type === TYPE_CELL) return offset

    let offsetRemain = offset,
        offsetCanUse = 0,
        availableVerticalSpace = 0

    if (offsetRemain < 0) {

        availableVerticalSpace = ResizeDetector.findVerticalSpaceBetweenTopBottom(state);

        offsetCanUse = - Math.min(availableVerticalSpace, -offsetRemain);
        offsetRemain = offsetRemain - offsetCanUse;

        BorderResizer.moveTopBorder(state.bottom, offsetCanUse, emitter);
        BorderResizer.moveBottomBorder(state.leading, offsetCanUse, emitter);
        BorderResizer.moveBottomBorder(state.center, offsetCanUse, emitter);
        BorderResizer.moveBottomBorder(state.trailing, offsetCanUse, emitter);

        availableVerticalSpace = ResizeDetector.findVerticalSpace(state.top);
        if (availableVerticalSpace === Number.POSITIVE_INFINITY) {
            availableVerticalSpace = 0;
        }
        offsetCanUse = - Math.min(availableVerticalSpace, -offsetRemain);
        offsetRemain = offsetRemain - offsetCanUse;
        BorderResizer.moveBottomBorder(state.top, offsetCanUse, emitter);
        BorderResizer.moveTopBorder(state.bottom, offsetCanUse, emitter);
        moveVertically(state.leading, offsetCanUse, emitter)
        moveVertically(state.center, offsetCanUse, emitter)
        moveVertically(state.trailing, offsetCanUse, emitter)

    } else {

        availableVerticalSpace = ResizeDetector.findVerticalSpace(state.bottom);
        offsetCanUse = Math.min(availableVerticalSpace, offsetRemain);
        offsetRemain = offsetRemain - offsetCanUse;
        BorderResizer.moveTopBorder(state.bottom, offsetCanUse, emitter);
        BorderResizer.moveBottomBorder(state.leading, offsetCanUse, emitter);
        BorderResizer.moveBottomBorder(state.center, offsetCanUse, emitter);
        BorderResizer.moveBottomBorder(state.trailing, offsetCanUse, emitter);
    }
    return offsetRemain;
}


export default { moveTopSplitter, moveBottomSplitter, moveLeadingSplitter, moveTrailingSplitter }