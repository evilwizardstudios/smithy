# Overview
  Nodes are the "connection points" that Smithy uses to assemble GameObjects into new hierarchies. Multiple nodes can exist on a single adapter, and a Smithy-adapted GameObject might be host to one or hundreds of individual nodes, each with [parameters](#node-settings-window) that control when and how they are used in [procedural generation](../generation)

## Type
  There are two types of nodes: Plugs and Sockets.

  Plugs *attach to* Sockets, and Sockets *accept* plugs.

### Plugs
<button type="button" class="btn btn-info btn-sm" style="margin:0 auto; display:block;"><i class="fa fa-plug fa-4x"></i></button>

<div class="well">
  Plugs <i>plug in</i> to sockets. That's pretty much all you have to remember.
</div>

  Smithy actually largely ignores GameObjects during [generation](../generation), and instead only searches plugs. This means that your Smithy-adapted prefabs won't be selected, but its plugs will, and the prefab will be instantiated to get the plug. Keep this in mind when creating assets and assigning weights. Multiple plugs on a single GameObject means multiple points of connection, but in terms of *that specific GameObject being selected* the weights are cumulative.

  In other words, a **GameObject** that has ten identical plugs of weight 2 has an effective total selection weight of 20.

  Realistically, this will be in issue only in some projects, and even then very rarely. Just keep this in mind if you want a GameObject with many plugs to generate only very rarely.

### Sockets
<button type="button" class="btn btn-success btn-sm" style="margin:0 auto; display:block;"><i class="fa fa-plus-square fa-4x"></i></button>

<div class="well">
  Sockets <i>accept</i> plugs, just like the ones you've got on your wall.
</div>

You can have as many sockets as you want on a GameObject, but each socket can only hold one plug. However, plug objects themselves can hold other sockets (which can hold plugs). For more information, [consult the generation page](../generation).

## Tags
  Tags control which sockets and plugs are able to link together. Smithy uses the same tag system that already [exists within Unity](http://docs.unity3d.com/Manual/Tags.html). However, Smithy ignores tags on GameObjects and only considers tags on nodes themselves.

  To add and remove tags from a node, click the <button type="button" class="btn btn-info btn-xs"><i class="fa fa-tag fa-lg"></i></button> on the Node Editor [Node Pill](adapter#node-pills) to open the [Tag Manager Window](manager#tag-manager), or assign tags in the [Node Settings Window](#node-settings-window).

  During [generation](../generation) Smithy will take a socket node and look for any plug nodes that have one or more matching tags. Therefore:

  - For plugs to be used, they must share one or more tags with a socket.
  - For sockets to be filled, they must share one or more tags with at least one plug.

![Example tag relationships](../img/tag-relationships.png)

  Smithy will [automatically notify you](adapter#warning-panel) about nodes that are missing tags. Also, the [Smithy Manager's Diagnose function](manager#diagnose_and_repair) will alert you to any tags that exist only on sockets or only on tags (and are therefore prevented from generating).

  The Manager's [aggressive repair function](manager#aggressive-repair) can find an eliminate nodes with orphaned tags, as well.

## Generation Probability
  Selection is extremely important to procedural generation, and Smithy includes tools to carefully manage how frequently plugs are selected and how often sockets are filled.

### Socket Fill Probability
  Socket fill probability is fairly straightforward - it is a percentage that determines how often the socket will generate a plug. Sockets with low values will rarely generate a plug, whereas sockets with a 100% socket fill probability will *always* generate a plug.

  When using [Probability Presets](manager#probability-preset-manager), sockets use the [Percentage](manager#percenatge) preset value.

### Plug Weight
  During plug [generation](../generation) for a socket node, Smithy collects all plugs that have [tags](#tags) that match the socket's tags. From this collection, Smithy makes a selection based on weight.

  Weight values refer to how likely it is that a plug will be chosen, with higher weights being picked more frequently. A weight of 2 will be selected twice as often as a weight of 1, and a weight of 4 twice as often as a weight of 2.  

   Weights can be thought of as instances of a selection in an array of all cumulative selections. This is shown more clearly in a sample set with a cumulative weight of 22:

  Item | Weight | Selection Frequency
  --- | --- | ---
  A | 1 | 4.6%
  B | 2 | 9.1%
  C | 4 | 18.41%
  D | 5 | 22.3%
  E | 10 | 45.75%

  If this is confusing, **don't panic**! The [Probability Preset Manager](manager/#probability-preset-manager) has visual tools that will help you determine socket fill probabilities and plug weights that are perfect for your project, and [as you'll see below](#presets), you'll never have to individually set these numbers (although you can if you want)

---

# Node Settings Window
  The Node Settings Window is activated by the <button type="button" class="btn btn-primary btn-xs"><i class="fa fa-gear fa-lg"></i></button> button on the [Node Editor Node Pill](adapter#node-pills) and [Object Assembler Socket Pill](adapter#socket-view-panel). It contains controls for fine-tuning nodes, as well as adding special generation options for specific nodes.

  Node [type](#type) can be set by clicking the node type icon in the top-left corner of the window.

## Name
  Click the <button type="button" class="btn btn-default btn-xs"><i class="fa fa-pencil fa-lg"></i></button> button to set the name of the Node. Nodes, by default, are named based on their ```Vector3``` position offset from the Adapter's transform origin.
<div class="well">
  It is <b>strongly recommended</b> to name nodes when working with complex node structures.
</div>

## Position

  Nodes are configured in relation to the origin of the Transform of the GameObject their connected to. This means that properties of a node like position, connection vector, rotation, and scale are properties **relative to** the Transform. If the Transform is translated, rotated or scaled, the nodes will be modified likewise.

  For this reason, the Position value can be more correctly thought of as a position *offset* from the Transform origin.

  Changing the values here will move the node position in world space relative to the Transform origin.

## Rotation

  To-do.

## Scale

  To-do.

## Connection Vector

  The connection vector is the vector of attachment between plugs and sockets. [Generated](#../generation) plug objects will be oriented so that their connection vectors (in world space) are inverse vectors.

  In short: generated plugs will be oriented so that their connection vector and the socket connection vectors are pointing towards each other, like so:

![Connection Vector Explanation](../img/connection-vectors)

  To avoid gimbal lock, the connection vector is a ```Vector4```. It can be set directly in this window, or it can be set in the Node Editor's [Adjust Connection Angle Tab](adapter#edit-node-tab), or by using a snap option.

### Connection Angle Snap Options

| | | | | | |
:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
<button type="button" class="btn btn-primary btn-sm"><i class="fa fa-arrow-up fa-3x"></i></button> | <button type="button" class="btn btn-primary btn-sm"><i class="fa fa-arrow-down fa-3x"></i></button> | <button type="button" class="btn btn-primary btn-sm"><i class="fa fa-arrow-left fa-3x"></i></button> | <button type="button" class="btn btn-primary btn-sm"><i class="fa fa-arrow-right fa-3x"></i></button> | <button type="button" class="btn btn-primary btn-sm"><h4>&nbsp;&nbsp;&nbsp;**F**&nbsp;&nbsp;&nbsp;</h4></button> | <button type="button" class="btn btn-primary btn-sm"><h4>&nbsp;&nbsp;&nbsp;**N**&nbsp;&nbsp;&nbsp;</h4></button> | <button type="button" class="btn btn-primary btn-sm"><h4>&nbsp;&nbsp;&nbsp;**B**&nbsp;&nbsp;&nbsp;</h4></button> | <button type="button" class="btn btn-primary btn-sm"><h4>&nbsp;&nbsp;&nbsp;**C**&nbsp;&nbsp;&nbsp;</h4></button>
World Up | World Down | World Left | World Right | World Forward | World Backward | Nearest Surface Normal | Align to Object Center

Clicking any of these options will directly set the node's connection vector.

## Tag Manager
![Tag Manager](../img/tag-manager.png)

  The Tag Manager can quickly add and remove [tags](#tags) from a node.

  The left panel contains all the tags available in the project. Clicking one will assign that tag to the current node.

  The right panel contains all tags assigned to the current node. Clicking a tag in this panel will remove it from the node.

  Use the <button type="button" class="btn btn-info btn-xs"><i class="fa fa-filter fa-lg"></i></button> filter text box to filter tags by name. You can also click the <button type="button" class="btn btn-primary btn-xs"><i class="fa fa-list-alt fa-lg"></i></button> toggle to hide and show the default Unity tags (Untagged, Respawn, Finish, EditorOnly, MainCamera, Player, and GameController)

  Clicking the <button type="button" class="btn btn-primary btn-xs"><i class="fa fa-tag fa-lg"></i>+</button> button will open a pop-up that will allow you to add a new tag within the Node Settings Window.

## Probability Settings
  This control sets the [socket fill probability](#socket-fill-probability) or [plug selection weight](#plug-weight).

### Presets
  These presets hold the percentage and weight values set in the [preset manager](manager/presets). Clicking a preset icon will assign its value to the currently selected node.

## Generation Jitter
  "Jitter" in Smithy is a maximum allowed deviation value. Generated objects will be affected anywhere from 0% to the maximum of the jitter value. For example, a size jitter of 1% would cause all generated instances of this node's GameObject to scale up by 0-1%.

![Jitter Examples](../img/jitter-examples.png)

  Small amounts of jitter are **extremely** useful in making procedurally generated assets look hand-crafted.

<div class="well">
  In Smithy, all Jitter is <b>additive</b>. Smithy will add jitter values from the socket to the values from its plug, and use the sum as the new maximum deviation when calculating jitter.
</div>

  Jitter can be disabled during [generator instantiation](../generation#parameters).

### Position Jitter
  How far the generated object can deviate from the node position. Uniform scaling adds the same value to all axes, while individual scaling can generate different values for each axis.

### Rotation Jitter
  How far the generated object can deviate from the its default transform rotation. This is applied **after** the [connection vectors](#connection-vectors) are aligned after instantiation. Uniform scaling adds the same value to all axes, while individual scaling can generate different values for each axis.

### Size Jitter
  How far the generated object can deviate from its default scale. This is applied **after** scaling based on the parent object's scale. Uniform scaling scales the object by a percentage, whereas individual scaling applies a scale modifier per axis.

## Material Options
  Additional materials (and weights) can be added to any node. On generation, these materials are selected by weight and applied to the plug object.

  Like jitter, material options are **additive**. Smithy will collect materials from both the plug and the socket before applying the material to the plug. This is useful if the socket should determine the plug object's material (e.g. keeping materials consistent across an object)

![Material Option Example](../img/panel_material-options.png)

  The material options panel includes a control to set the weight of the default material. Default, in this case, means the material the plug is assigned as a prefab. The defauly weight is ```100```.

  Materials can be added by clicking the <button type="button" class="btn btn-success btn-xs"><i class="fa fa-circle fa-lg"></i>+</button> button. It will open the following window:

![Material Select Window](../img/window_material-select.png)

  From here, click a material to assign it to the node. Each material selection will have its own listing in the material options panel.

  The input field sets the material option's selection weight, which operates identically to the [plug selection weight](#plug-weight). Clicking the <button type="button" class="btn btn-primary btn-xs"><i class="fa fa-th fa-lg"></i></button> button will set a [probability preset](manager#presets) weight value for the material, and clicking the <button type="button" class="btn btn-primary btn-xs"><i class="fa fa-bar-chart fa-lg"></i></button> button will open the [Probability Preset Manager](manager/probability-preset-manager).
