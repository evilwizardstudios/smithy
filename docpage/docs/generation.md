# Overview
  Smithy uses Generator objects to procedurally generate object hierarchies, both in the
  Editor [Object Assembler](./editor/adapter#object-assembler-panel) and at runtime.
  When Generators are instanced, they build a reference collection of [<i class="fa fa-plug"></i> <b>Plug Nodes</b>](./editor/node#plugs) . When needed, Generators are passed one or more GameObjects. The Generator then searches this object for [<i class="fa fa-plus-square"></i> <b>Socket Nodes</b>](./editor/node#sockets).

  If any are found, the Generator finds [<i class="fa fa-plug"></i> <b>Plug Nodes</b>](./editor/node#plugs)  that share [<i class="fa fa-tags"></i> <b>Tags</b>](./editor/node#tags) with the Socket Node. The Generator will then make a selection from these Plugs, based on [selection weight](./editor/node#plug-weight). The selected Plug's GameObject is instantiated as a child of the Socket object, and the Plug and Socket are [aligned](./editor/node#rotation) and [connected](./editor/node#position) in world space.

  The Generator then checks the instanced Plug object for Sockets as well. If any are found, the process begins again, as long as the initial Socket object is still above its [maximum generation depth](./editor/adapter#generation-depth).

# Generator Class
---
```
public class Generator(IEnumerable<string> resourcePaths, int seed)
```
---
  The runtime Generator class is named ```Generator```, and is the only class that actually handles the recursive procedural generation routine. Generators are objects, instanced like so:

```
Generator myGenerator = new Generator();
```

This will instantiate a new Generator object with an unseeded Random provider, and will create a plug reference collection of **all** Smithy-enabled objects in the *Resources* folder. These properties can be changed by supplying the following parameters:

# Parameters
## Random Seed
  Generators can be provided with an ```int``` value as a [random seed](https://en.wikipedia.org/wiki/Random_seed). Generators that share the same seed and operating with the same inputs will generate consistent results every time.

```
int mySeedValue = 42;
var myGenerator = new Generator(mySeedValue);
```

  Seeds can be set and tested in the [Editor Object Assembler](./editor/adapter#generation-seed).

  A seed value of 0 will result in an unseeded Random generator.

## Resource Paths
  By default, Generators reference every Smithy-enabled object in a project's *Resources* folder. However, Generators can also be passed an ```IEnumerable<string>``` collection. These strings are paths relative to the *Resources* folder of your Unity project, and will limit the plug reference collection the Generator is able to create:

```
var resourcePaths = new[]{"/Level1/A", "/Level1/B", "/Level1/C"};
var myGenerator = new Generator(resourcePaths);
```

In the example above, the Generator will **only** look for [<i class="fa fa-plug"></i><b>Plug Nodes</b>](./editor/node#plugs)  from the *Resources/Level1/A*, *Resources/Level1/B*, and *Resources/Level1/C* folders. This is useful in limiting the scope of objects that can be generated, as well as increasing generation performance.

## Generation Options
  Generators can be passed an array of ```GenerationOption[]```, that modify the Generator's behavior. These options will affect every ```Generate``` call the Generator makes. These same options can be passed on a [per-call basis](#generate).

### GenerationOptions.DisableJitter
  Prevent Node [jitter](./editor/node#generation-jitter) from being applied on instantiation.

### GenerationOptions.DisableMaterialSelection
  Prevent Node [material selection](./editor/node#material-options) from being applied on instantiation. All Plug objects will instantiate with their default materials.

### GenerationOptions.ForceFillSockets
  Ignore Socket [Fill Probability](./editor/node#socket-probability). All sockets in the hierarchy will be filled with Plugs.

### GenerationOptions.IgnoreSelectionWeight
  Ignore Plug [Selection Weight](./editor/node#plug-weight). All plugs will have an equal possibility of selection.

  <div class="panel panel-default">
    <div class="panel-body">
    This can, in the case of very large selection sets, reduce the performance impact of generation. If your project has no use for weighted selections, you should always use this option.
    </div>
  </div>

# Methods
## Generate
---
```
public GameObject Generate(GameObject baseGameObject)

public GameObject Generate(GameObject baseGameObject, GenerationOptions[] options)
```
---

  The Generator recursively instantiates a ```GameObject``` hierarchy, staring from the provided GameObject. It will continue until all [<i class="fa fa-plus-square"></i><b>Socket Nodes</b>](./editor/node#sockets) have been [checked](./editor/node#socket-probability), or, the hierarchy reaches its [maximum generation depth](./editor/adapter#generation-depth).

  This method returns a ```GameObject```, an instance of the ```baseGameObject``` parameter. In most cases, ```baseGameObject``` will be a prefab, although any ```GameObject``` can be passed.

```
  var myGenerator = new Generator();
  var myGameObject = Resources.Load<GameObject>("baseObject");

  var myProceduralObject = myGenerator.Generate(myGameObject);
```

  If the ```GameObject``` exists in the hierarchy, the Generator will not instantiate a new copy. Plugs will be generated for the extant copy.
```
public GameObject activeBaseObject;

void Start()
{
  var myGenerator = new Generator();

  myGenerator.Generate(activeBaseObject);     //This will still return a reference to "activeBaseObject".
}
```

Keep in mind that in most projects, creating a new generator *for each* ```Generate``` call is performance expensive, and is almost always unnecessary.

Additionally, ```Generate``` can be passed an array of ```GenerationOption[]``` that operates in the same way the [Generator instantiation parameter does](#generation-options), but only over the single ```Generate``` call.

## Include
---
```
public void Include(IEnumerable<GameObject> includedAssets)
```
---

  The Generator will search the supplied ```IEnumerable<GameObject>``` for [<i class="fa fa-plug"></i><b>Plug Nodes</b>](./editor/node#plugs) and add them the the Generator's Plug reference collection. Future Generate calls will also include these Plugs.

```
var morePlugs = GameObject.FindGameObjectsWithTag("Some_Tag");
var myGenerator = new Generator("/Foo");

myGenerator.Include(morePlugs);
```
### Asset Bundles

AssetBundle Assets can be added to Generator selection sets by first loading the AssetBundle content then using ```Include``` to add it to the Generator. As Generators can't be created from AssetBundles, this is currently the only way to generate from bundled content.

To build a Generator that selects from **only** AssetBundle Assets, first create a new Generator with a Resource Path parameter that leads to an empty *Resource* folder. Then, ```Include``` the loaded AssetBundle content, like so:
```
var myLoadedAssetBundle = AssetBundle.LoadFromFile(Path.Combine(Application.streamingAssetsPath, "myassetBundle"));

var myLoadedAssets = myLoadedAssetBundle.LoadAllAssets<GameObject>;

var myGenerator = new Generator("/EmptyFolder");
myGenerator.Include(myLoadedAssets);
```


## Exclude
---
```
public void Exclude(IEnumerable<GameObject> excludedAssets)
```
---

  Any [<i class="fa fa-plug"></i><b>Plug Nodes</b>](./editor/node#plugs) in the ```excludedAssets``` collection will be removed from the Generator's Plug reference collection, if they exist.

```
var oldPlugs = GameObject.FindGameObjectsWithTag("Level1");

myGenerator.Exclude(oldPlugs);
```

  ``Exclude`` is best used when managing Generators that operate over large reference collections, or very specific ones (such as selection sets based on achievements or player progress). Use ```Exclude``` when it would be overly difficult, performance-intensive, or time-consuming to instantiate a new Generator with the appropriate Plug reference collection.

## Set Depth
---
```
public void SetDepth(int depth)
```
---

  Sets the Generator's [maximum generation depth](./editor/adapter#generation-depth) to the supplied ```int```. Used when tying generation depth to a runtime-specific variable, or set of variables. Very useful in setting generation depth based on performance settings, for example.

```
int depth;

if (Application.platform == RuntimePlatform.Windows)
{
  depth = 20;
}
else
{
  depth = 5;
}

var myGenerator = new Generator();  
myGenerator.SetDepth(myDepth);
```
