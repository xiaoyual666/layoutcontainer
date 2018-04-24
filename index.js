import EventEmitter from "events"
import ResizeDetector from "./utls/ResizeDetector"
import RegionResizer from "./utls/RegionResizer"
import SplitterResizer from "./utls/SplitterResizer"
import BorderResizer from "./utls/BorderResizer"

import { TYPE_CELL } from "./utls/Constants"

export default class {

    constructor(state) {
        this._rootContainerState = state
        this._flattenedStates = this._flattenContainerState()
        this._eventEmitter = new EventEmitter()
    }

    _flattenContainerState () {
        let flattenContainerStates = {}
        let callback = function(parent, curr) {
            flattenContainerStates[curr.id] = {
                data: curr,
                parent: parent
            }
        }
        this.traverse({
            onCellVisited: callback,
            onContainerVisited: callback
        })
        return flattenContainerStates
    }

    getRootContainerState() {
        return this._rootContainerState
    }

    getStateByPath(path) {
        let state = this._rootContainerState
        path.forEach((region) => state = state[region])
        return state
    }

    on(type, callback) {
        return this._eventEmitter.on(type, callback)
    }

    traverse (option) {
        let _traverse = function(parent, state) {
            if (!state) return
            if ( state.type === TYPE_CELL) {
                if (typeof option.onCellVisited === "function") {
                    option.onCellVisited.call(this, parent, state)
                }
            } else {
                _traverse(state, state.top)
                _traverse(state, state.leading)
                _traverse(state, state.center)
                _traverse(state, state.trailing)
                _traverse(state, state.bottom)
                
                if (typeof option.onContainerVisited === "function") {
                    option.onContainerVisited.call(this, parent, state)
                }
            }
        }
        _traverse(null, this._rootContainerState)
    }

    _resizeByRegion (state, region, offsets) {
        if (!state) return;

        switch(region) {
            case "top":
                offsets = RegionResizer.moveTopRegion(state, offsets, this._eventEmitter)
                break
            case "leading":
                offsets = RegionResizer.moveLeadingRegion(state, offsets, this._eventEmitter)
                break
            case "center":
                offsets = RegionResizer.moveCenterRegion(state, offsets, this._eventEmitter)
                break
            case "trailing":
                offsets = RegionResizer.moveTrailingRegion(state, offsets, this._eventEmitter)
                break
            case "bottom":
                offsets = RegionResizer.moveBottomRegion(state, offsets, this._eventEmitter)
                break
        }

        let parentState = this._flattenedStates[state.id].parent,
            currentStateRegion = state.path[state.path.length - 1]

        this._resizeByRegion(parentState, currentStateRegion, offsets)
    }

    _resizeBySplitter (parentState, region, offsets) {
        let offsetRemainX = offsets[0],
            offsetRemainY = offsets[1]

        switch(region) {
            case "leading":
                offsetRemainY = 0
                offsetRemainX = SplitterResizer.moveLeadingSplitter(parentState, offsetRemainX, this._eventEmitter)
                break
            case "top":
                offsetRemainX = 0
                offsetRemainY = SplitterResizer.moveTopSplitter(parentState, offsetRemainY, this._eventEmitter)
                break
            case "trailing":
                offsetRemainY = 0
                offsetRemainX = SplitterResizer.moveTrailingSplitter(parentState, offsetRemainX, this._eventEmitter)
                break
            case "bottom":
                offsetRemainX = 0
                offsetRemainY = SplitterResizer.moveBottomSplitter(parentState, offsetRemainY, this._eventEmitter)
                break
        }
        
        return [offsetRemainX, offsetRemainY]
    }

    resizeBySplitter (path, offsets) {
        let pathLen = path.length,
            region = path[pathLen - 1],
            parentState = this._rootContainerState,
            leafState = this._rootContainerState

        path.forEach(function(key, index) {
            if (index != pathLen - 1) {
                leafState = parentState = parentState[key]
            } else {
                leafState = leafState[key]
            }
        })
        let remainOffsets = this._resizeBySplitter(parentState, region, offsets)
        this._resizeByRegion(parentState, region, remainOffsets)
        this._resizeBySplitter(parentState, region, remainOffsets)
    }

    resizeByEdge (edge, offset) {
        switch(edge) {
            case "top":
                BorderResizer.moveTopBorder(this._rootContainerState, offset, this._eventEmitter)
                break;
            case "bottom":
                BorderResizer.moveBottomBorder(this._rootContainerState, offset, this._eventEmitter)
                break;
            case "left":
                BorderResizer.moveLeftBorder(this._rootContainerState, offset, this._eventEmitter)
                break;
            case "right":
                BorderResizer.moveRightBorder(this._rootContainerState, offset, this._eventEmitter)
                break;
        }
    } 
}