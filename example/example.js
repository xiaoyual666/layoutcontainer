import LayoutContainer from "./../index"
import data1 from "./data1"
import data2 from "./data2"
import data3 from "./data3"
let containerDom = document.querySelector(".main-container")

let layoutContainer = new LayoutContainer(data2)
let widgetsMap = {}
let edges = {}

const SPLITTER_INSET = 10
const SPLITTER_WIDTH = 3
const EDGE_WIDTH = 3

function createCell(state) {
    let cell = document.createElement("div")
    cell.classList.add("layout-cell")
    cell.setAttribute("data-layout-path", state.path.join(","))
    cell.style.position = "absolute"
    return cell
}

function createSplitter(state) {
    let region = state.path[state.path.length - 1]
    if (region === "center") return null;

    let splitter = document.createElement("div")
    splitter.classList.add("layout-splitter")
    splitter.classList.add(`layout-splitter-${region}`)
    splitter.setAttribute("data-layout-path", state.path.join(","))
    splitter.style.position = "absolute"
    return splitter
}

function createEdges(layoutContainer) {
    let minX = Number.POSITIVE_INFINITY,
        minY = Number.POSITIVE_INFINITY,
        maxX = Number.NEGATIVE_INFINITY,
        maxY = Number.NEGATIVE_INFINITY

    layoutContainer.traverse({
        onCellVisited: (parent, curr) => {
            minX = Math.min(minX, curr.x)
            maxX = Math.max(maxX, curr.x + curr.width)
            minY = Math.min(minY, curr.y)
            maxY = Math.max(maxY, curr.y + curr.height)
        }
    })

    edges.top = creatEdge("top", minX, minY-EDGE_WIDTH, maxX-minX, EDGE_WIDTH*2, containerDom)
    edges.bottom = creatEdge("bottom", minX, maxY-EDGE_WIDTH, maxX-minX, EDGE_WIDTH*2, containerDom)
    edges.left = creatEdge("left", minX-EDGE_WIDTH, minY, EDGE_WIDTH*2, maxY-minY, containerDom)
    edges.right = creatEdge("right", maxX-EDGE_WIDTH, minY, EDGE_WIDTH*2, maxY-minY, containerDom)
}

function creatEdge(edgeName, x,y,width,height, container) {
    let edge = document.createElement("div")  
    edge.classList.add("layout-outer-edge")
    edge.setAttribute("data-edge", edgeName)
    edge.style.position = "absolute"
    edge.style.left = `${x}px`
    edge.style.top = `${y}px`
    edge.style.width = `${width}px`
    edge.style.height = `${height}px`
    container.appendChild(edge)
    return edge
}

function updateCell(cell, state) {
    cell.style.left = state.x + "px"
    cell.style.left = state.x + "px"
    cell.style.top = state.y + "px"
    cell.style.width = state.width + "px"
    cell.style.height = state.height + "px"
}

function updateCursor(path) {
    let region = path[path.length-1]
    if (region === "top" || region === "bottom") {
        document.body.style.cursor = "ns-resize"
    } else {
        document.body.style.cursor = "ew-resize"
    }
}

function resetCursor() {
    document.body.style.cursor = "auto"
}

function updateSplitter(splitter, state) {
    let region = state.path[state.path.length - 1]
    switch(region) {
        case "top":
            splitter.style.top = state.y + state.height - SPLITTER_WIDTH + "px"
            splitter.style.left = state.x + SPLITTER_INSET + "px"
            splitter.style.width = state.width - SPLITTER_INSET*2 + "px"
            splitter.style.height = SPLITTER_WIDTH*2 + "px"
            break
        case "leading":
            splitter.style.top = state.y + SPLITTER_INSET + "px"
            splitter.style.left = state.x + state.width - SPLITTER_WIDTH + "px"
            splitter.style.width = SPLITTER_WIDTH*2 + "px"
            splitter.style.height = state.height - SPLITTER_INSET*2 + "px"
            break
        case "trailing":
            splitter.style.top = state.y  + SPLITTER_INSET + "px"
            splitter.style.left = state.x - SPLITTER_WIDTH + "px"
            splitter.style.width = SPLITTER_WIDTH*2 + "px"
            splitter.style.height = state.height - SPLITTER_INSET*2 + "px"
            break
        case "bottom":
            splitter.style.top = state.y - SPLITTER_WIDTH + "px"
            splitter.style.left = state.x + SPLITTER_INSET + "px"
            splitter.style.width = state.width - SPLITTER_INSET*2 + "px"
            splitter.style.height = SPLITTER_WIDTH*2 + "px"
            break
    }
}

layoutContainer.traverse({
    onCellVisited(parent, current) {
        let cell = createCell(current),
            splitter = createSplitter(current)
        
        updateCell(cell, current)
        containerDom.appendChild(cell)
        if (splitter) {
            updateSplitter(splitter, current)
            containerDom.appendChild(splitter)
        }
        widgetsMap[current.id] = {cell, splitter }
    }
})

createEdges(layoutContainer)

layoutContainer.on("resizing", ({ state, key } = event) => {
    updateSplitter(widgetsMap[state.id].splitter, state)
    updateCell(widgetsMap[state.id].cell, state)
})

window.drag = function(path, x, y) {
    layoutContainer.resizeBySplitter(path, [x,y])
}

let isDragging = false, oldPosition, path

function handleMoseDown(event) {
    if (event.target.classList.contains("layout-splitter")) {
        isDragging = true
        oldPosition = [event.pageX, event.pageY]
        path = event.target.dataset.layoutPath.split(",")
        event.target.classList.add("layout-splitter-moving")
        containerDom.classList.add("moving")
        updateCursor(path)
    }
}
function handleMouseDrag(event) {
    event.stopImmediatePropagation()
    let newPosition = [event.pageX, event.pageY]
    layoutContainer.resizeBySplitter(path, [newPosition[0] - oldPosition[0], newPosition[1] - oldPosition[1]])
    oldPosition = newPosition
}
function handleMouseUp(event) {
    if (!isDragging) return
    isDragging = false
    resetCursor()
    widgetsMap[layoutContainer.getStateByPath(path).id].splitter.classList.remove("layout-splitter-moving")
    containerDom.classList.remove("moving")
    document.removeEventListener("mousemove", handleMouseDrag, true)
    document.removeEventListener("mouseup", handleMouseUp, true)
}
function handleMouseMove(event) {
    if (!isDragging) return
    document.addEventListener("mousemove", handleMouseDrag, true)
    document.addEventListener("mouseup", handleMouseUp, true)
}
document.addEventListener("mousedown", handleMoseDown)
document.addEventListener("mousemove", handleMouseMove)
document.addEventListener("mouseup", handleMouseUp)