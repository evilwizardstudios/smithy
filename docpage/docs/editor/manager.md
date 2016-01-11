# Overview
  Smithy requires no global configuration and all of its controls are contained within [Adapters](adapter), but Smithy comes with two management windows designed to make using Smithy even easier.

  The management tools are located in the Unity Editor menu bar, under <span class="label label-default">Window</span> <i class="fa fa-long-arrow-right"></i> <span class="label label-default">Smithy</span>

# Smithy Manager
![Smithy Manager](../img/window_manager.png)
  The Smithy Manger contains Smithy's automated repair tools, as well as a report generator that can export information about [adapters](adapter) and [nodes](node).

  Accessed from the Unity Editor menu bar under <span class="label label-default">Window</span> <i class="fa fa-long-arrow-right"></i> <span class="label label-default">Smithy</span> <i class="fa fa-long-arrow-right"></i> <span class="label label-default">Smithy Manager</span> or by pressing  <span class="label label-default">Ctrl</span> + <span class="label label-default">Shift</span> + <span class="label label-default">M</span>

## Contact Links
  Links to contact methods, Unity Forum and Asset Store pages, and this documentation can be found on the left side of this window. Clicking any of these links will open a new browser window. The same links can be found [at this documentation's index page](../#contact).

## Object Browser
![Object Browser](../img/panel_object-browser.png)

  The Object Browser will find and list all prefabs that contain a [Smithy adapter](adapter). Clicking one of the objects in this panel will select the prefab in the [Unity Project View](http://docs.unity3d.com/Manual/ProjectView.html)

  If an object in your project is not appearing in the object browser, check to make sure it has an adapter component, and is saved as a prefab. If that still doesn't work, open the [repair](#diagnose-and-repair) panel.

## Diagnose and Repair
![Repair Window](../img/panel_diagnose-repair.png)

  Smithy will [warn you about](adapter#warning-panel) about configurations that could result in suboptimal [generation](../generation) or nodes that fail to generate under any circumstances.

  This tool searches all Smithy-enabled prefabs and lists those warnings. On the right side of the report, there are two wrench icons:

### Standard Repair
<button type="button" class="btn btn-success btn-sm"><i class="fa fa-wrench fa-5x"></i></button>  Smithy will attempt to repair all assets with outstanding issues.

Specifically:
- It will remove missing materials from [material options](node#material-options) lists,
- It will remove plug tags that aren't attributed to any socket
- It will remove socket tags that aren't attributed to any plug

### Aggressive Repair
<button type="button" class="btn btn-danger btn-sm"><i class="fa fa-wrench fa-5x"></i></button>  Smithy will attempt to repair all assets with outstanding issues. It will destroy nodes that cannot spawn.

Aggressive repair will repair the same issues that standard repair does, but it will also destroy any nodes that have not been assigned tags, or whose tags have been deleted from the project's tag array. It will also destroy nodes that have been rendered tagless because of the removal of orphaned tags.

<div class="well">
  Nodes deleted in this manner are not recoverable with Unity's Undo function.
</div>

## Generate Report
![Report Window](../img/panel_report.png)

  The report window will generate a detailed report of all saved adapters, their nodes, and details about each node. Please remember that Smithy cannot select an adapter [unless it is saved in a GameObject prefab](../generator#resource-paths).

  The report in this window can be saved as an HTML file by clicking the <button type="button" class="btn btn-success btn-xs"><i class="fa fa-download fa-lg"></i></button> button.

# Probability Preset Manager
![Probability Preset Manager Window](../img/window_preset-manager.png)

  The Probability Preset Manager is a tool to achieve consistent [generation](../generation) results over any number of [plugs](node/#plug-weight) and [sockets](socket-fill-probability). In this window you are able to add, edit, and delete presets that contain selection weight and percentage values.

  When editing [nodes](#node), these values can be assigned instantly by clicking the preset icon.

---

Clicking the <button type="button" class="btn btn-success btn-xs"><i class="fa fa-check fa-lg"></i></button> button in the bottom right corner of the window will save the current preset list for use in the project.

The <button type="button" class="btn btn-danger btn-xs"><i class="fa fa-repeat fa-lg"></i></button> button in the lower left corner will revert the preset list to the default list that comes with the Smithy Asset.

Clicking the <button type="button" class="btn btn-danger btn-xs"><i class="fa fa-times fa-lg"></i></button> in the window bar will exit the manager and discard any unsaved changes.

---

  Accessed from the Unity Editor menu bar under <span class="label label-default">Window</span> <i class="fa fa-long-arrow-right"></i> <span class="label label-default">Smithy</span> <i class="fa fa-long-arrow-right"></i> <span class="label label-default">Preset Manager</span> or by pressing  <span class="label label-default">Ctrl</span> + <span class="label label-default">Shift</span> + <span class="label label-default">R</span>


## Presets

  Presets hold a selection weight and a fill probability. When saved, they will appear in [node generation probability panels](node#generation-probability). Clicking their icon will set plug nodes to the preset weight value, and selection nodes to the preset fill probability.

  Presets are usually displayed in Smithy by their icon, and icons can be set by clicking the <button type="button" class="btn btn-default btn-xs"><i class="fa fa-pencil fa-lg"></i></button> button that is superimposed on the preset icon. Doing so will open the following window:

---

  ![Preset Icon Window](../img/window_preset-icon.png)

  The first row of sliders set the red, green, and blue values for the icon's foreground color.

  The second row sets the red, green, and blue values for the icon's background color.

  The lower panel of this window sets a [Font Awesome glyph](https://fortawesome.github.io/Font-Awesome/) as the preset's icon.

---

  To add a new preset to your project, click the <button type="button" class="btn btn-info btn-xs"><i class="fa fa-plus fa-lg"></i></button> button.

## Visualizer
![Preset Weight Visualizer](../img/panel_visualizer.png)

 *The visualizer updates automatically as you add, remove, or edit presets.*

  The right half of the preset manager window is a selection weight visualizer. Smithy simulates 10,000 selections (by default) and reports how often each preset was selected. By hovering over a column of the bar chart Smithy will report how often that preset has been selected, and the relative probability of that preset being selected.

  The integer input in the upper right-hand corner represents the number of selections the simulation makes while updating. Higher values result in more accurate results, but are more performance-intensive and may result in lag when using this manager.
