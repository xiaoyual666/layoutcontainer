import SplitterResizer from "./SplitterResizer"
import { TYPE_CELL } from "./Constants";

function moveLeadingRegionVertically(state, offset, emitter) {
    if (offset === 0) return offset
    return offset > 0 ? SplitterResizer.moveBottomSplitter(state, offset, emitter) : moveTopSplitter(state, offset, emitter)
}

function moveLeadingRegionHorizontally(state, offset, emitter) {
    if (offset === 0) return offset
    return offset > 0 ? SplitterResizer.moveLeadingSplitter(state, offset, emitter) : offset
}

function moveLeadingRegion(state, offsets, emitter) {
    if (!state || state.type === TYPE_CELL) return offsets
    return [
        moveLeadingRegionHorizontally(state, offsets[0], emitter),
        moveLeadingRegionVertically(state, offsets[1], emitter)
    ]
}

function moveTopRegionVertically(state, offset, emitter) {
    if (offset === 0) return offset
    return offset > 0 ? SplitterResizer.moveTopSplitter(state, offset, emitter) : offset
}

function moveTopRegion(state, offsets, emitter) {
    if (!state || state.type === TYPE_CELL) return offsets
    return [
        offsets[0],
        moveTopRegionVertically(state, offsets[1], emitter)
    ]
}

function moveBottomRegionVertically(state, offset, emitter) {
    if (offset === 0) return offset
    return offset > 0 ? offset : SplitterResizer.moveBottomSplitter(state, offset, emitter)
}


function moveBottomRegion(state, offsets, emitter) {
    if (!state || state.type === TYPE_CELL) return offsets
    return [
        offsets[0],
        moveBottomRegionVertically(state, offsets[1], emitter)
    ]
}


function moveTrailingRegionVertically(state, offset, emitter) {
    if (offset === 0) return offset
    return offset > 0 ? SplitterResizer.moveBottomSplitter(state, offset, emitter) : SplitterResizer.moveTopSplitter(state, offset, emitter)
}

function moveTrailingRegionHorizontally(state, offset, emitter) {
    if (offset === 0) return offset
    return offset > 0 ? offset : SplitterResizer.moveTrailingSplitter(state, offset, emitter)
}

function moveTrailingRegion(state, offsets, emitter) {
    if (!state || state.type === TYPE_CELL) return offsets
    return [
        moveTrailingRegionHorizontally(state, offsets[0], emitter),
        moveTrailingRegionVertically(state, offsets[1], emitter)
    ]
}

function moveCenterRegionHorizontally(state, offset, emitter) {
    if (offset ===0 ) return offset
    return offset > 0 ? SplitterResizer.moveTrailingSplitter(state, offset, emitter): SplitterResizer.moveLeadingSplitter(state, offset, emitter)
}

function moveCenterRegionVertically(state, offset, emitter) {
    if (offset === 0) return offset
    return offset > 0 ? SplitterResizer.moveBottomSplitter(state, offset, emitter) : SplitterResizer.moveTopSplitter(state, offset, emitter)
}

function moveCenterRegion(state, offsets, emitter) {
    return [
        moveCenterRegionHorizontally(state, offsets[0], emitter),
        moveCenterRegionVertically(state, offsets[1], emitter)
    ]
}

export default {moveTopRegion, moveLeadingRegion, moveCenterRegion, moveTrailingRegion, moveBottomRegion}