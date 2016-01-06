# Overview
  Smithy Adapters are [Components](http://docs.unity3d.com/Manual/UsingComponents.html) that contain [Nodes](node), and are required for [procedurally generating objects](../generation).

  Adapters are added by clicking <span class="label label-default">Add Component</span> in the GameObject inspector, and selecting <span class="label label-default">Smithy</span> <i class="fa fa-long-arrow-right"></i> <span class="label label-default">Add Smithy Adapter</span>

  <div class="panel panel-info">
  <div class="panel-body">
  Please note that Smithy can only load and instantiate Prefabs that are located in the */Assets/Resources* folder of your Project, or [Asset Bundles](./generation#methods) that have already been loaded.
  </div>
  </div>


# Inspector
  Adapters are equipped with a custom inspector, which is the principal point of access for working with [Nodes](node). Once a Smithy Adapter component is added to a GameObject, it will appear in that GameObject's component inspector.

  Very narrow inspector layouts may make some UI components overlap. If this is the case, widen the inspector window to a comfortable width.


## Navigation
![Inspector Navigation Panel](./img/inspector_nav.png)
  The Navigation panel accesses the Information Panel, the Node Editor, and the Object Assembler.

  ![Navigation Panel](./img/nav_panel.png)

  The Node Editor and Object Assembler are only available when the GameObject is active in the hierarchy. If the GameObject is saved as a prefab, these options will be disabled.

### Saving
  Smithy uses asset labels and prefab assets during procedural generation. Therefore, GameObjects must be saved as prefabs before they can be used by Smithy.

  Correctly saved and labeled prefabs are crucial to Smithy's operation, so each Adapter is able to manage the saving of it's linked prefab. Simply activate the autosave in the save menu once a prefab has been linked.

  <div class="panel panel-warning">
  <div class="panel-body">
  For best results, let Smithy manage the saving and updating of prefabs with that have Smithy Adapters. Smithy will ensure that these prefabs are labeled correctly prior to building, and useable in generation. Manually saving and updating Smithy prefabs is not recommended - it may work, but can't be guaranteed.  
  </div>
  </div>

---

  The top right corner of the navigation panel contains the Save indicator. The icon changes based on state:

Indicator | Status | Description
:-------- | :----: | :----------
<button type="button" class="btn btn-warning btn-sm"><i class="fa fa-save fa-4x"></i></button> | **Unsaved**<br>*(no prefab)* | This GameObject has not been saved as a prefab. Clicking this icon will allow you to save the GameObject and create a prefab connection.
<button type="button" class="btn btn-success btn-sm"><i class="fa fa-save fa-4x"></i></button> | **Unsaved** | This GameObject has a prefab connection but has unsaved changes. Clicking this icon will save changes to the prefab, or, allow you to activate Smithy's autosave feature.
<button type="button" class="btn btn-danger btn-sm"><i class="fa fa-ellipsis-h fa-4x"></i></button> | **Saving** | This GameObject is currently saving any changes. This should only take a brief moment, but allow it to save before starting a build or entering Game mode.
<button type="button" class="btn btn-primary btn-sm"><i class="fa fa-check-circle fa-4x"></i></button> | **Prefab OK** *(autosave off)* | This GameObject has a prefab connection that is current with any changes made. Autosave is not on and the GameObject will need to be saved manually. Click to **activate** autosave.
<button type="button" class="btn btn-info btn-sm"><i class="fa fa-check-circle fa-4x"></i></button> | **Prefab OK** *(autosave on)* | This GameObject has a prefab connection that is current with any changes made. Autosave is on. Click to **deactivate** autosave.

---

## Information Panel
![Information Panel](./img/panel_info.png)
  The information panel is the first navigation panel option and provides an at-a-glance display of all critical Node information. The information panel is comprised of a warning panel, a generation depth counter, and a tag list panel.  

### Warning Panel
  The warning panel will display any issues that might affect the operation of this adapter or its nodes. It has two states:

   |
  :-----: | :-----:
<button type="button" class="btn btn-success btn-sm"><i class="fa fa-check fa-5x"></i></button> &nbsp;&nbsp;&nbsp;**Valid** |<button type="button" class="btn btn-danger btn-sm"><i class="fa fa-hashtag fa-5x"></i></button> &nbsp;&nbsp;&nbsp;**Problems Detected** *(where # is the number of issues)*

Issues that Smithy detects are arranged into three categories:

Warning | Important | Critical
:------- | :--------- | :--------
<button type="button" class="btn btn-warning btn-sm"><i class="fa fa-exclamation-triangle fa-3x"></i></button> | <button type="button" class="btn btn-danger btn-sm" style="background-color:#d35400;"><i class="fa fa-exclamation-triangle fa-3x"></i></button> | <button type="button" class="btn btn-danger btn-sm style="background-color:#e74c3c;""><i class="fa fa-exclamation-triangle fa-3x"></i></button>
These will not cause problems with generation, but may potentially produce undesirable results | These issues are will generate poor or unexpected results, but will not cause errors | This issues are serious and will throw errors or prevent any Nodes on this adapter from being detected.

Alt-clicking the warning icon will open the relevant [troubleshooting](../troubleshooting) link in a new browser window.

### Generation Depth Panel
  Displays the [maximum generation depth](#generation-depth) for this adapter.

### Tag List Panel
  Displays a list of all Tags present on the Adapter's nodes. Tags present on Plugs will be shown in <span class="label label-info">blue</span>, and Tags present on Sockets will be shown in <span class="label label-success">teal</span>.

  Clicking a tag will open the Tag Search popup window:
  ![Tag Search Popup](./img/popup_tag-search.png)
  This will list all Smithy-enabled objects with matching tags, as well as the specific nodes that are set to the same tag.

---

## Node Editor Panel
![Inspector Node Editor Panel](./img/inspector_node-editor.png)

  The node editor panel is used for adding, editing, and deleting Plug and Socket nodes. It consists of the Generation Depth Panel, Node Palette, and Layer Panel.

### Generation Depth
![Generation Depth Panel](./img/panel_generation-depth.png)

  The generation depth panel sets an ```int``` value the maximum number depth of children this adapter can generate, if it is the base object.

  In other words, a base object with a maximum generation depth of *n* can have a GameObject hierarchy that is, at most, *n* levels deep.

  For example:

  depth = 2 | depth = 3 | depth = 5
  ---- | ---- | ----
  ![Depth 2](../img/depth-2.png)<br>*(13 GameObjects at Width = 3)* | ![Depth 3](../img/depth-3.png)<br>*(40 GameObjects at Width = 3)* | ![Depth 5](../img/depth-5.png)<br>*(364 GameObjects at Width = 3)*

  <div class="panel panel-danger">
  <div class="panel-body">
  Please keep in mind that while generation depth cannot be set to infinity, it can be set very high, and Nodes can be structured to produce hierarchies that expand exponentially. Generation calls that produce very deep hierarchies - especially multiple calls per frame - will *severely* impact performance.
  </div>
  </div>

  The default maximum generation depth is **5**


### Node Palette
  The Node Palette contains the controls to add, move, adjust, and delete nodes.

#### Add Node Tab
![Node Palette](../img/panel_add-node-palette)

  From left to right, the tabs under the add node tab switch the add mode to Plug, Socket, and Clone. Moving the mouse over the object mesh in the [Scene View Window](http://docs.unity3d.com/Manual/UsingTheSceneView.html) will draw a magenta dot - this is the placement point for new nodes. Left click the mouse, and a new node of the selected node type will be at the placement point.

  Please note that Smithy won't allow snapping to points where nodes already exist on the same [layer](#node-layers) (you'll have to add a new layer.)

<div class="well">
Clone mode clones the node that is currently selected in the Layer Panel and adds it at the placement point, or as an unanchored node.
</div>

  Smithy manages an automatically-generated MeshCollider specifically for adding and moving nodes around object models, so you can add nodes directly to the surface of your mesh. To help with placement, the Node Palette includes several mesh snapping options:

   Vertex | Triangle Center | Midpoint | Off
   ---- | ---- | ---- | ----
   Snaps the placement point to the vertex nearest the mouse cursor | Snaps the placement point to the centroid of the face triangle under the mouse cursor | Snaps the placement point to the midpoint of the edge nearest the mouse cursor | Disables snapping. The placement point will appear at the intersection of a ray fired from the mouse position.

  However, having a mesh isn't necessary, and Smithy will operate on meshless GameObjects. This is useful for creating nodes that handle pure code functions like AI behavior, mesh-agnostic particle effects, audio modifiers, and anything else that is useful for procedural generation but does not necessitate a mesh.

  Either way, clicking the <button type="button" class="btn btn-primary btn-sm"><i class="fa fa-unlink fa-lg"></i></button> button will add a new node to (0,0,0).

#### Edit Node Tab

#### Delete Node Tab

#### Palette Information Panel

### Node Layers

#### Node Layer Window

---

## Object Assembler Panel

### Socket View Panel

### Plug Selector

### Generating in Editor Mode

#### Generation Seed

#### Save As Fixed Object
