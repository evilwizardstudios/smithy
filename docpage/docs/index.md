# Welcome

  Current version: *ALPHA 0.2.3*, NYR

##Foreward
  I would like to extend my sincere thanks for purchasing the Smithy Procedural Asset Framework.
  If you have any issues or questions not covered in these documents, please [contact me](#contact) and I will do my best to resolve the problem as quickly as possible.

<div class="well">
  If you have a pressing issue please don’t go to the forums first, as I might not see it right away.
</div>

  If you didn’t yet buy this asset, I hope that exploring this manual will convince you of its usefulness in your Unity workflow. If not, I hope it’s at least an enjoyable read and might give you a few new ideas for your own projects.

  I plan to continue to develop and extend this system, and am constantly looking for feedback and ideas. If Smithy is missing something that you’d like to see please comment on the [Unity Forums thread](#).

  Thanks again, and if you create anything using Smithy, I’d love to take a look!

## Using this Site
  Nearly every control in the Smithy editor links back to this site. If at any time in the Unity editor you need more information, hold  <span class="label label-default">ALT</span> and hover over an element. If it becomes highlighted (the cursor will also turn into a link pointer) click it, and a browser window will be opened to the relevant help page.

  ![Help Mode Activated](./img/help.gif)

  Otherwise, the site navigation is located at the top of the window, and in-page navigation is on the left-hand side of every page. [Teal](#using-this-site) links can will lead you to further information about the topic.

# Overview
  Smithy is a tool that helps you create assets procedurally, rather than manually.
  Smithy works through a component called a [Smithy Adapter](editor/adapter). This adapter sits on a GameObject - any GameObject - and holds [Nodes](editor/node). Nodes are grouped into [Plugs](editor/node#plug) (they connect to other objects) and [Sockets](editor/node#socket) (they accept plugs). Nodes can sit anywhere in space relative to the GameObject's Transform, but Smithy is focused around adding nodes directly to object Meshes.

![Adding Nodes to an Object](/img/add_nodes.gif)

  Nodes take a number of parameters, set in the adapter's [custom inspector](editor/adapter#inspector). These include where and how sockets and plugs link together.

  In your code, you'll create [Generator objects](/generation#generation-class), you can pass these a GameObject with an Adapter. Smithy will find the socket nodes on that adapter, and select and instantiate objects that contain matching plug nodes. These plug objects are aligned and positioned with respect to the socket nodes (so nodes on mesh surfaces will seem to be physically connected together -- think LEGO).

![Generation Example](/img/simple_generation.gif)

  This process happens recursively. Smithy checks newly instantiated objects for socket nodes, then generates plug objects for them as well, creating a GameObject hierarchy as simple or complex as you could want.

![Generation Example](/img/recursive_generation.gif)

  Smithy *only* manages the instantiation, parenting, and positioning of GameObjects (and, optionally, Materials). It doesn't interact with, or require, any other component. This means you can use Smithy to create object hierarchies with complex component behavior through scripts, other Asset utilities, and Unity's built-in component menu. Procedural AI behavior, game items, dynamic maps, vehicles, creatures, and anything else that can potentially be created by the computer, can be handled by Smithy.

![Quest generation example](/img/procedural_quest.gif)

  Smithy is probably best explained by way of example, and there are a few thouroughly-explained demos in this documentation:

## Demos and Tutorials

- To get started quickly, try the [Quick-Start Guide](/demos_tutorials/quick_start)
- The [Floating Island Demo](/demos_tutorials/floating_island) will teach you how to generate complex scenery that looks hand-made, using only a few meshes and textures. The tutorial focuses on how to prepare assets and Smithy Adapters, and how to use [jitter](/editor/node/#generation-jitter) and [Material options](/editor/node/material-options) for maximum effect.
- The [FPS Arsenal Demo](/demos_tutorials/fps_arsenal) will teach you how to use Smithy and your own component scripts to create a [Borderlands](http://borderlandsthegame.com/)-style procedural gun generator for an FPS game. The tutorial focuses on how to design and implement custom component scripts so Smithy produces output that has the values and behavior you want.
- The [RPG Hero](/demos_tutorials/rpg_hero) example will teach you how to use Smithy in a more abstract way, and create 2D RPG characters with stats and fluff, as well as procedurally generated dialogue and quests. The tutorial focuses on using Smithy on GameObjects without meshes, and how to combine Smithy with other procedural generation techniques to give even more depth to procedurally created assets.

<div class="well">
  The source code and downloadable package for each demo is available on its page.
</div>  

# Installation and Setup
  The Smithy Asset package can be downloaded from the [Unity Asset Store](#) and, from there, imported into an existing project. The package contains two folders of content, Smithy and Gizmos. Both are **required**.

  Smithy requires no additional setup, and you can immediately begin adding [Adapters](editor/adapter) and [Nodes](editor/node). However, if it's your first time using Smithy, reading the [Quick Start Tutorial](/demos_tutorials/quick_start) is strongly recommended.

# Contact

| | | |
|:---:|:---:|:---:|
<button type="button" class="btn btn-info btn-sm"><i class="fa fa-twitter fa-5x"></i></button> | <button type="button" class="btn btn-primary btn-sm"><i class="fa fa-envelope fa-5x"></i></button> | <button type="button" class="btn btn-success btn-sm"><i class="fa fa-home fa-5x"></i></button> |
Twitter | E-Mail | Smithy Homepage
<button type="button" class="btn btn-default btn-sm"><i class="fa fa-cube fa-5x"></i></button> | <button type="button" class="btn btn-warning btn-sm"><i class="fa fa-shopping-cart fa-5x"></i></button> | <button type="button" class="btn btn-danger btn-sm"><i class="fa fa-exclamation-triangle fa-5x"></i></button> |
Unity Forums Thread | Asset Store Page | Report a Problem
