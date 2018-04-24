import { TYPE_CELL } from "./Constants"

function findVerticalSpace(state) {
    if (!state) return 0
    if (state.type === TYPE_CELL) return state.availableVerticalSpace
    let verticalSpace = 0
    if (state.top) verticalSpace += findVerticalSpace(state.top)
    if (state.bottom) verticalSpace += findVerticalSpace(state.bottom)
    verticalSpace += findVerticalSpaceBetweenTopBottom(state)
    return verticalSpace
}

function findHorizontalSpace(state) {
    if (!state) return 0
    if (state.type === TYPE_CELL) return state.availableHorizontalSpace
    let horizontalSpace = 0,
        horizontalSpaceForTopBottom = 0,
        horizontalSpaceForLeadingCenterTrailing =0
    
    if (state.top && state.bottom) {
        horizontalSpaceForTopBottom = Math.min(findHorizontalSpace(state.top), findHorizontalSpace(state.bottom))
    } else if (state.top) {
        horizontalSpaceForTopBottom = findHorizontalSpace(state.top) 
    } else if (state.bottom) {
        borizontalSpaceForTopBottom = findHorizontalSpace(state.bottom)
    } else {
        horizontalSpaceForTopBottom = Number.POSITIVE_INFINITY
    }

    if (state.leading) horizontalSpaceForLeadingCenterTrailing += findHorizontalSpace(state.leading)
    if (state.center) horizontalSpaceForLeadingCenterTrailing += findHorizontalSpace(state.center)
    if (state.trailing) horizontalSpaceForLeadingCenterTrailing += findHorizontalSpace(state.trailing)

    if (!state.leading && !state.center && !state.trailing) horizontalSpaceForLeadingCenterTrailing = Number.POSITIVE_INFINITY
    horizontalSpace = Math.min(horizontalSpaceForTopBottom, horizontalSpaceForLeadingCenterTrailing)

    if (horizontalSpace === Number.POSITIVE_INFINITY) return 0
    return horizontalSpace

}

function findVerticalSpaceBelowTop(state) {
    let verticalSpace = findVerticalSpaceBetweenTopBottom(state)
    if (state.bottom) verticalSpace += findVerticalSpace(state.bottom)
    return verticalSpace
}

function findVerticalSpaceAboveBottom(state) {
    let verticalSpace = findVerticalSpaceBetweenTopBottom(state)
    if (state.top) verticalSpace += findVerticalSpace(state.top)
    return verticalSpace
}

function findVerticalSpaceBetweenTopBottom(state) {
    let verticalSpace = Number.POSITIVE_INFINITY
    if (!state.leading && !state.center && !state.trailing) return 0
    if (state.leading) verticalSpace = Math.min(verticalSpace, findVerticalSpace(state.leading))
    if (state.center) verticalSpace = Math.min(verticalSpace, findVerticalSpace(state.center))
    if (state.trailing) verticalSpace = Math.min(verticalSpace, findVerticalSpace(state.trailing))
    return verticalSpace
}

function findHorizontalSpaceAfterLeading(state) {
    let horizontalSpace = 0
    if (state.center) horizontalSpace += findHorizontalSpace(state.center)
    if (state.trailing) horizontalSpace += findHorizontalSpace(state.trailing)
    return horizontalSpace
}

function findHorizontalSpaceBeforeTrailing(state) {
    let horizontalSpace = 0
    if (state.center) horizontalSpace += findHorizontalSpace(state.center)
    if (state.leading) horizontalSpace += findHorizontalSpace(state.leading)
    return horizontalSpace
}

export default {
    findVerticalSpace,
    findHorizontalSpace,
    findVerticalSpaceBelowTop,
    findVerticalSpaceAboveBottom,
    findVerticalSpaceBetweenTopBottom,
    findHorizontalSpaceAfterLeading,
    findHorizontalSpaceBeforeTrailing
}



