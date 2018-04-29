### Live Demo: https://xiaoyual666.github.io/layoutcontainer/

installation
------------
```shell
> npm i layoutcontainer
```

Concepts
------------
##1. Container, Region and Cell
A layout container contains at most 5 regions:<br>
<img width="450" src="https://github.com/xiaoyual666/layoutcontainer/blob/master/imgs/regions.png" alt="regions">

Each region could be either a cell or a layout container, thus we have the flexibility to build complete layout structure.
##2. Splitter
Splitters are the edges that seperate different regions within a container. We will handle the resizing of corresponding regions when you move the splitters.
<img width="450" src="https://github.com/xiaoyual666/layoutcontainer/blob/master/imgs/splitters.png" alt="splitters">
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
rootContainer.resizeBySplitter(["top", [100,200]])
```
