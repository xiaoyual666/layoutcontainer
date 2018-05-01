Layout Container
----
Layout Container is the resizing engine that can automatically calculates the correct position of cooresponding regions of the container when user change the position of the splitter in the container.
User could achieve the drag-resize behavior by providing the drag offsets to this engine and it will update the data accordingly. Also, event will be emitted to notify consumer the change in the data model. See demo:

### Live Demo: https://xiaoyual666.github.io/layoutcontainer/

Installation
------------
```shell
> npm i layoutcontainer
```

Concepts
------------
## 1. Container, Region and Cell
A layout container contains at most 5 regions:<br>
![regions](https://github.com/xiaoyual666/layoutcontainer/blob/master/imgs/regions.png)

Each region could be either a cell or a layout container, thus we have the flexibility to build complete layout structure.
## 2. Splitter
Splitters are the edges that seperate different regions within a container. We will handle the resizing of corresponding regions when you move the splitters:<br>
![splitters](https://github.com/xiaoyual666/layoutcontainer/blob/master/imgs/splitters.png)

## 3. Path
Path is an array of strings that represent the regions.
For example, the path for trailing splitter or trailing cell in side a center region of a root container is:
```javascript
let path = ["center","trailing"]
```
Easy as 1-2-3
--------------

## 1. Prepare data
use data to represent layout structure.
### data structure for container
```javascript
{
  id: "unique id for this container"
  path: ["center"] // ex. this is the center region of its parent container
  top: dataForTopCell // this can either be a container or a cell
  leading: dataForLeadingCell // this can either be a container or a cell
  center: dataForCenterCell // this can either be a container or a cell
  trailing: dataForTrailingCell // this can either be a container or a cell
  bottom: dataForBottomCell // this can either be a container or a cell
}
```
### data structure for cell
```javascript
{
  id: "unique id for this cell"
  path: ["center"] // ex. this is the center region of its parent container
  x: 10,
  y: 50,
  width: 100,
  height: 100,
  availableHorizontalSpace: 90,  // ex. when resizing, the width will be reduced no more than 90px
  availableVerticalSpace: 80 // ex. when resizing, the height will be reduced no more than 80
}
```
### data example:
```javascript
let rootStructureData = {
      id: "container 1"
      path: [] 
      top: {
          id: "cell_1",
          path: ["top"],
          x: 100,
          y: 200,
          width: 300,
          height: 400,
          availbleHorizontalSpace: 50,
          availableVerticalSpace: 50
      }
      center:{
          id: "cell_2",
          path: ["center"],
          x: 100,
          y: 600,
          width: 300,
          height: 400,
          availbleHorizontalSpace: 50,
          availableVerticalSpace: 50
      }
    }
```
## 2. Create LayoutContainer instance
```javascript
const LayoutContainer = require("Layoutcontainer")
let rootContainer = LayoutContainer(rootStructureData)
```
## 3. Resize
```javascript
rootContainer.resizeBySplitter(["top"], [100,200])
```
API
----
## 1. constructor
we pass data representing the structure of layout into constructor to get the instance
```javascript
let layoutContainer = new LayoutContainer()
```

### for data representing container, the details of object is:
| properties        | type           | description  |
| ------------- |-------------| -----|
| id     | String | unique string that used to identify the container |
| path      | Array<String>      |   array of strings to locate the region or splitter |
| top | container or cell      |  top region of the container |
| leading | container or cell      |  leading region of the container |
| center | container or cell      |  center region of the container |
| trailing | container or cell      |  trailing region of the container |
| bottom | container or cell      |  bottom region of the container |
  
### for data representing cell, the details of object is:
| properties        | type           | description  |
| ------------- |-------------| -----|
| id     | String | unique string that used to identify the container |
| path      | Array<String>      |   array of strings to locate the region or splitter |
| x | Number      | x position of cell |
| y | Number     |  y position of cell |
| width |Number     | width of cell |
| height | Number   |  height of cell |
| availableHorizontalSpace | Number      |  how much pixel could this cell be reduced horizontally when resizing |
| availableVerticalSpace | Number      |  how much pixel could this cell be reduced vertically when resizing |
  
## 2. resizeBySplitter( path, offsets )
resize corresponding regions by dragging a specific splitter defined by path.

| Parameter|type| Description|
|----|----|----|
| path | Array<String> | array of string that represents the splitter. Ex. ["center", "top"]|
| offsets | [Number, Number] | dragging offset. offsets[0] is the x offset, offsets[1] is the y offset.

Example:
```javascript
layoutContainer.resizeBySplitter(["leading"], [10,30]) // drag the leading splitter 
```

## 2. resizeByEdge( edge, offset )
resize entire layout container by dragging edge of it.

| Parameter|type| Description|
|----|----|----|
| edge | "top"  or "bottom"  or "left" or "right" | string that represents the edge |
| offset | Number | dragging offset. Ex. if you move the left edge, offset will be the x offset.

Example:
```javascript
layoutContainer.resizeByEdge("left",  50) // drag the left edge from left to right by 50px.
```

## 3. Event
if you are using library like React or Vue, you may not need this. Because the data will be reactive.
However, we still provide event for you to listen to the change of the model, and you could update the view accordingly.

| Event Name | Fired When |
| ---- |---- |
| resizing | when x or y or width or height changed on a cell |

| Event Data | Description |
| ---- |---- |
| state | the data representing the current resized cell |
| key | indicates which property is changed, it is useful when you want to optimize the updating logic for you view |

Example: (more detail could be fould in the example folder)
```javascript
const LayoutContainer = require("layoutcontainer")

let rootData = getRootData(), // provide root data, you need to implement this function
    layoutContainer = new LayoutContainer(rootData),
    view = generateViewForLayout(rootData) // you could initialize the view according to the data structure

LayoutContainer.on("resizing", ({state, key}) => {
    updateViewForCellByState(state) // you could implement logic to update the view manually if you dont use MVVM library.
})

```

