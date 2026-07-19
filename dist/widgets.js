//#region node_modules/svelte/src/internal/disclose-version.js
if (typeof window !== "undefined") ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add("5");
//#endregion
//#region node_modules/svelte/src/constants.js
var HYDRATION_ERROR = {};
var UNINITIALIZED = Symbol("uninitialized");
var NAMESPACE_HTML = "http://www.w3.org/1999/xhtml";
var NAMESPACE_SVG = "http://www.w3.org/2000/svg";
var NAMESPACE_MATHML = "http://www.w3.org/1998/Math/MathML";
//#endregion
//#region node_modules/svelte/src/internal/shared/utils.js
var is_array = Array.isArray;
var index_of = Array.prototype.indexOf;
var includes = Array.prototype.includes;
var array_from = Array.from;
var object_keys = Object.keys;
var define_property = Object.defineProperty;
var get_descriptor = Object.getOwnPropertyDescriptor;
var get_descriptors = Object.getOwnPropertyDescriptors;
var object_prototype = Object.prototype;
var array_prototype = Array.prototype;
var get_prototype_of = Object.getPrototypeOf;
var is_extensible = Object.isExtensible;
/**
* @param {any} thing
* @returns {thing is Function}
*/
function is_function(thing) {
	return typeof thing === "function";
}
var noop = () => {};
/** @param {Array<() => void>} arr */
function run_all(arr) {
	for (var i = 0; i < arr.length; i++) arr[i]();
}
/**
* TODO replace with Promise.withResolvers once supported widely enough
* @template [T=void]
*/
function deferred() {
	/** @type {(value: T) => void} */
	var resolve;
	/** @type {(reason: any) => void} */
	var reject;
	return {
		promise: new Promise((res, rej) => {
			resolve = res;
			reject = rej;
		}),
		resolve,
		reject
	};
}
var CLEAN = 1024;
var DIRTY = 2048;
var MAYBE_DIRTY = 4096;
var INERT = 8192;
var DESTROYED = 16384;
/** Set once a reaction has run for the first time */
var REACTION_RAN = 32768;
/** Effect is in the process of getting destroyed. Can be observed in child teardown functions */
var DESTROYING = 1 << 25;
/**
* 'Transparent' effects do not create a transition boundary.
* This is on a block effect 99% of the time but may also be on a branch effect if its parent block effect was pruned
*/
var EFFECT_TRANSPARENT = 65536;
var EFFECT_PRESERVED = 1 << 19;
var USER_EFFECT = 1 << 20;
var EFFECT_OFFSCREEN = 1 << 25;
/**
* Tells that we marked this derived and its reactions as visited during the "mark as (maybe) dirty"-phase.
* Will be lifted during execution of the derived and during checking its dirty state (both are necessary
* because a derived might be checked but not executed). This is a pure performance optimization flag and
* should not be used for any other purpose!
*/
var WAS_MARKED = 65536;
var REACTION_IS_UPDATING = 1 << 21;
var ASYNC = 1 << 22;
var ERROR_VALUE = 1 << 23;
var STATE_SYMBOL = Symbol("$state");
var LEGACY_PROPS = Symbol("legacy props");
var LOADING_ATTR_SYMBOL = Symbol("");
var ATTRIBUTES_CACHE = Symbol("attributes");
var CLASS_CACHE = Symbol("class");
var STYLE_CACHE = Symbol("style");
var TEXT_CACHE = Symbol("text");
/** allow users to ignore aborted signal errors if `reason.name === 'StaleReactionError` */
var STALE_REACTION = new class StaleReactionError extends Error {
	name = "StaleReactionError";
	message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}();
var IS_XHTML = !!globalThis.document?.contentType && /* @__PURE__ */ globalThis.document.contentType.includes("xml");
/**
* `%name%(...)` can only be used during component initialisation
* @param {string} name
* @returns {never}
*/
function lifecycle_outside_component(name) {
	throw new Error(`https://svelte.dev/e/lifecycle_outside_component`);
}
//#endregion
//#region node_modules/svelte/src/internal/client/errors.js
/**
* Cannot create a `$derived(...)` with an `await` expression outside of an effect tree
* @returns {never}
*/
function async_derived_orphan() {
	throw new Error(`https://svelte.dev/e/async_derived_orphan`);
}
/**
* Keyed each block has duplicate key `%value%` at indexes %a% and %b%
* @param {string} a
* @param {string} b
* @param {string | undefined | null} [value]
* @returns {never}
*/
function each_key_duplicate(a, b, value) {
	throw new Error(`https://svelte.dev/e/each_key_duplicate`);
}
/**
* `%rune%` cannot be used inside an effect cleanup function
* @param {string} rune
* @returns {never}
*/
function effect_in_teardown(rune) {
	throw new Error(`https://svelte.dev/e/effect_in_teardown`);
}
/**
* Effect cannot be created inside a `$derived` value that was not itself created inside an effect
* @returns {never}
*/
function effect_in_unowned_derived() {
	throw new Error(`https://svelte.dev/e/effect_in_unowned_derived`);
}
/**
* `%rune%` can only be used inside an effect (e.g. during component initialisation)
* @param {string} rune
* @returns {never}
*/
function effect_orphan(rune) {
	throw new Error(`https://svelte.dev/e/effect_orphan`);
}
/**
* Maximum update depth exceeded. This typically indicates that an effect reads and writes the same piece of state
* @returns {never}
*/
function effect_update_depth_exceeded() {
	throw new Error(`https://svelte.dev/e/effect_update_depth_exceeded`);
}
/**
* Failed to hydrate the application
* @returns {never}
*/
function hydration_failed() {
	throw new Error(`https://svelte.dev/e/hydration_failed`);
}
/**
* Cannot do `bind:%key%={undefined}` when `%key%` has a fallback value
* @param {string} key
* @returns {never}
*/
function props_invalid_value(key) {
	throw new Error(`https://svelte.dev/e/props_invalid_value`);
}
/**
* Property descriptors defined on `$state` objects must contain `value` and always be `enumerable`, `configurable` and `writable`.
* @returns {never}
*/
function state_descriptors_fixed() {
	throw new Error(`https://svelte.dev/e/state_descriptors_fixed`);
}
/**
* Cannot set prototype of `$state` object
* @returns {never}
*/
function state_prototype_fixed() {
	throw new Error(`https://svelte.dev/e/state_prototype_fixed`);
}
/**
* Updating state inside `$derived(...)`, `$inspect(...)` or a template expression is forbidden. If the value should not be reactive, declare it without `$state`
* @returns {never}
*/
function state_unsafe_mutation() {
	throw new Error(`https://svelte.dev/e/state_unsafe_mutation`);
}
/**
* A `<svelte:boundary>` `reset` function cannot be called while an error is still being handled
* @returns {never}
*/
function svelte_boundary_reset_onerror() {
	throw new Error(`https://svelte.dev/e/svelte_boundary_reset_onerror`);
}
/**
* Reading a derived belonging to a now-destroyed effect may result in stale values
*/
function derived_inert() {
	console.warn(`https://svelte.dev/e/derived_inert`);
}
/**
* Hydration failed because the initial UI does not match what was rendered on the server. The error occurred near %location%
* @param {string | undefined | null} [location]
*/
function hydration_mismatch(location) {
	console.warn(`https://svelte.dev/e/hydration_mismatch`);
}
/**
* A `<svelte:boundary>` `reset` function only resets the boundary the first time it is called
*/
function svelte_boundary_reset_noop() {
	console.warn(`https://svelte.dev/e/svelte_boundary_reset_noop`);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/hydration.js
/** @import { TemplateNode } from '#client' */
/**
* Use this variable to guard everything related to hydration code so it can be treeshaken out
* if the user doesn't use the `hydrate` method and these code paths are therefore not needed.
*/
var hydrating = false;
/** @param {boolean} value */
function set_hydrating(value) {
	hydrating = value;
}
/**
* The node that is currently being hydrated. This starts out as the first node inside the opening
* <!--[--> comment, and updates each time a component calls `$.child(...)` or `$.sibling(...)`.
* When entering a block (e.g. `{#if ...}`), `hydrate_node` is the block opening comment; by the
* time we leave the block it is the closing comment, which serves as the block's anchor.
* @type {TemplateNode}
*/
var hydrate_node;
/** @param {TemplateNode | null} node */
function set_hydrate_node(node) {
	if (node === null) {
		hydration_mismatch();
		throw HYDRATION_ERROR;
	}
	return hydrate_node = node;
}
function hydrate_next() {
	return set_hydrate_node(/* @__PURE__ */ get_next_sibling(hydrate_node));
}
/** @param {TemplateNode} node */
function reset(node) {
	if (!hydrating) return;
	if (/* @__PURE__ */ get_next_sibling(hydrate_node) !== null) {
		hydration_mismatch();
		throw HYDRATION_ERROR;
	}
	hydrate_node = node;
}
function next(count = 1) {
	if (hydrating) {
		var i = count;
		var node = hydrate_node;
		while (i--) node = /* @__PURE__ */ get_next_sibling(node);
		hydrate_node = node;
	}
}
/**
* Skips or removes (depending on {@link remove}) all nodes starting at `hydrate_node` up until the next hydration end comment
* @param {boolean} remove
*/
function skip_nodes(remove = true) {
	var depth = 0;
	var node = hydrate_node;
	while (true) {
		if (node.nodeType === 8) {
			var data = node.data;
			if (data === "]") {
				if (depth === 0) return node;
				depth -= 1;
			} else if (data === "[" || data === "[!" || data[0] === "[" && !isNaN(Number(data.slice(1)))) depth += 1;
		}
		var next = /* @__PURE__ */ get_next_sibling(node);
		if (remove) node.remove();
		node = next;
	}
}
/**
*
* @param {TemplateNode} node
*/
function read_hydration_instruction(node) {
	if (!node || node.nodeType !== 8) {
		hydration_mismatch();
		throw HYDRATION_ERROR;
	}
	return node.data;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/equality.js
/** @import { Equals } from '#client' */
/** @type {Equals} */
function equals(value) {
	return value === this.v;
}
/**
* @param {unknown} a
* @param {unknown} b
* @returns {boolean}
*/
function safe_not_equal(a, b) {
	return a != a ? b == b : a !== b || a !== null && typeof a === "object" || typeof a === "function";
}
/** @type {Equals} */
function safe_equals(value) {
	return !safe_not_equal(value, this.v);
}
//#endregion
//#region node_modules/svelte/src/internal/flags/index.js
/** True if experimental.async=true */
var async_mode_flag = false;
/** True if we're not certain that we only have Svelte 5 code in the compilation */
var legacy_mode_flag = false;
//#endregion
//#region node_modules/svelte/src/internal/shared/clone.js
/** @import { Snapshot } from './types' */
/**
* In dev, we keep track of which properties could not be cloned. In prod
* we don't bother, but we keep a dummy array around so that the
* signature stays the same
* @type {string[]}
*/
var empty = [];
/**
* @template T
* @param {T} value
* @param {boolean} [skip_warning]
* @param {boolean} [no_tojson]
* @returns {Snapshot<T>}
*/
function snapshot(value, skip_warning = false, no_tojson = false) {
	return clone(value, /* @__PURE__ */ new Map(), "", empty, null, no_tojson);
}
/**
* @template T
* @param {T} value
* @param {Map<T, Snapshot<T>>} cloned
* @param {string} path
* @param {string[]} paths
* @param {null | T} [original] The original value, if `value` was produced from a `toJSON` call
* @param {boolean} [no_tojson]
* @returns {Snapshot<T>}
*/
function clone(value, cloned, path, paths, original = null, no_tojson = false) {
	if (typeof value === "object" && value !== null) {
		var unwrapped = cloned.get(value);
		if (unwrapped !== void 0) return unwrapped;
		if (value instanceof Map) return new Map(value);
		if (value instanceof Set) return new Set(value);
		if (is_array(value)) {
			var copy = Array(value.length);
			cloned.set(value, copy);
			if (original !== null) cloned.set(original, copy);
			for (var i = 0; i < value.length; i += 1) {
				var element = value[i];
				if (i in value) copy[i] = clone(element, cloned, path, paths, null, no_tojson);
			}
			return copy;
		}
		if (get_prototype_of(value) === object_prototype) {
			/** @type {Snapshot<any>} */
			copy = {};
			cloned.set(value, copy);
			if (original !== null) cloned.set(original, copy);
			for (var key of Object.keys(value)) copy[key] = clone(value[key], cloned, path, paths, null, no_tojson);
			return copy;
		}
		if (value instanceof Date) return structuredClone(value);
		if (typeof value.toJSON === "function" && !no_tojson) return clone(
			/** @type {T & { toJSON(): any } } */
			value.toJSON(),
			cloned,
			path,
			paths,
			value
		);
	}
	if (value instanceof EventTarget) return value;
	try {
		return structuredClone(value);
	} catch (e) {
		return value;
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/context.js
/** @import { ComponentContext, DevStackEntry, Effect } from '#client' */
/** @type {ComponentContext | null} */
var component_context = null;
/** @param {ComponentContext | null} context */
function set_component_context(context) {
	component_context = context;
}
/**
* @param {Record<string, unknown>} props
* @param {any} runes
* @param {Function} [fn]
* @returns {void}
*/
function push(props, runes = false, fn) {
	component_context = {
		p: component_context,
		i: false,
		c: null,
		e: null,
		s: props,
		x: null,
		r: active_effect,
		l: legacy_mode_flag && !runes ? {
			s: null,
			u: null,
			$: []
		} : null
	};
}
/**
* @template {Record<string, any>} T
* @param {T} [component]
* @returns {T}
*/
function pop(component) {
	var context = component_context;
	var effects = context.e;
	if (effects !== null) {
		context.e = null;
		for (var fn of effects) create_user_effect(fn);
	}
	if (component !== void 0) context.x = component;
	context.i = true;
	component_context = context.p;
	return component ?? {};
}
/** @returns {boolean} */
function is_runes() {
	return !legacy_mode_flag || component_context !== null && component_context.l === null;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/task.js
/** @type {Array<() => void>} */
var micro_tasks = [];
function run_micro_tasks() {
	var tasks = micro_tasks;
	micro_tasks = [];
	run_all(tasks);
}
/**
* @param {() => void} fn
*/
function queue_micro_task(fn) {
	if (micro_tasks.length === 0 && !is_flushing_sync) {
		var tasks = micro_tasks;
		queueMicrotask(() => {
			if (tasks === micro_tasks) run_micro_tasks();
		});
	}
	micro_tasks.push(fn);
}
/**
* Synchronously run any queued tasks.
*/
function flush_tasks() {
	while (micro_tasks.length > 0) run_micro_tasks();
}
/**
* @param {unknown} error
*/
function handle_error(error) {
	var effect = active_effect;
	if (effect === null) {
		/** @type {Derived} */ active_reaction.f |= ERROR_VALUE;
		return error;
	}
	if ((effect.f & 32768) === 0 && (effect.f & 4) === 0) throw error;
	invoke_error_boundary(error, effect);
}
/**
* @param {unknown} error
* @param {Effect | null} effect
*/
function invoke_error_boundary(error, effect) {
	if (effect !== null && (effect.f & 16384) !== 0) return;
	while (effect !== null) {
		if ((effect.f & 128) !== 0) {
			if ((effect.f & 32768) === 0) throw error;
			try {
				/** @type {Boundary} */ effect.b.error(error);
				return;
			} catch (e) {
				error = e;
			}
		}
		effect = effect.parent;
	}
	throw error;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/status.js
/** @import { Derived, Signal } from '#client' */
var STATUS_MASK = ~(DIRTY | MAYBE_DIRTY | CLEAN);
/**
* @param {Signal} signal
* @param {number} status
*/
function set_signal_status(signal, status) {
	signal.f = signal.f & STATUS_MASK | status;
}
/**
* Set a derived's status to CLEAN or MAYBE_DIRTY based on its connection state.
* @param {Derived} derived
*/
function update_derived_status(derived) {
	if ((derived.f & 512) !== 0 || derived.deps === null) set_signal_status(derived, CLEAN);
	else set_signal_status(derived, MAYBE_DIRTY);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/utils.js
/** @import { Derived, Effect, Value } from '#client' */
/**
* @param {Value[] | null} deps
*/
function clear_marked(deps) {
	if (deps === null) return;
	for (const dep of deps) {
		if ((dep.f & 2) === 0 || (dep.f & 65536) === 0) continue;
		dep.f ^= WAS_MARKED;
		clear_marked(
			/** @type {Derived} */
			dep.deps
		);
	}
}
/**
* @param {Effect} effect
* @param {Set<Effect>} dirty_effects
* @param {Set<Effect>} maybe_dirty_effects
*/
function defer_effect(effect, dirty_effects, maybe_dirty_effects) {
	if ((effect.f & 2048) !== 0) dirty_effects.add(effect);
	else if ((effect.f & 4096) !== 0) maybe_dirty_effects.add(effect);
	clear_marked(effect.deps);
	set_signal_status(effect, CLEAN);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/store.js
/**
* We set this to `true` when updating a store so that we correctly
* schedule effects if the update takes place inside a `$:` effect
*/
var legacy_is_updating_store = false;
/**
* Whether or not the prop currently being read is a store binding, as in
* `<Child bind:x={$y} />`. If it is, we treat the prop as mutable even in
* runes mode, and skip `binding_property_non_reactive` validation
*/
var is_store_binding = false;
/**
* Returns a tuple that indicates whether `fn()` reads a prop that is a store binding.
* Used to prevent `binding_property_non_reactive` validation false positives and
* ensure that these props are treated as mutable even in runes mode
* @template T
* @param {() => T} fn
* @returns {[T, boolean]}
*/
function capture_store_binding(fn) {
	var previous_is_store_binding = is_store_binding;
	try {
		is_store_binding = false;
		return [fn(), is_store_binding];
	} finally {
		is_store_binding = previous_is_store_binding;
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
/**
* @template T
* @param {() => T} fn
*/
function without_reactive_context(fn) {
	var previous_reaction = active_reaction;
	var previous_effect = active_effect;
	set_active_reaction(null);
	set_active_effect(null);
	try {
		return fn();
	} finally {
		set_active_reaction(previous_reaction);
		set_active_effect(previous_effect);
	}
}
//#endregion
//#region node_modules/svelte/src/reactivity/create-subscriber.js
/**
* Returns a `subscribe` function that integrates external event-based systems with Svelte's reactivity.
* It's particularly useful for integrating with web APIs like `MediaQuery`, `IntersectionObserver`, or `WebSocket`.
*
* If `subscribe` is called inside an effect (including indirectly, for example inside a getter),
* the `start` callback will be called with an `update` function. Whenever `update` is called, the effect re-runs.
*
* If `start` returns a cleanup function, it will be called when the effect is destroyed.
*
* If `subscribe` is called in multiple effects, `start` will only be called once as long as the effects
* are active, and the returned teardown function will only be called when all effects are destroyed.
*
* It's best understood with an example. Here's an implementation of [`MediaQuery`](https://svelte.dev/docs/svelte/svelte-reactivity#MediaQuery):
*
* ```js
* import { createSubscriber } from 'svelte/reactivity';
* import { on } from 'svelte/events';
*
* export class MediaQuery {
* 	#query;
* 	#subscribe;
*
* 	constructor(query) {
* 		this.#query = window.matchMedia(`(${query})`);
*
* 		this.#subscribe = createSubscriber((update) => {
* 			// when the `change` event occurs, re-run any effects that read `this.current`
* 			const off = on(this.#query, 'change', update);
*
* 			// stop listening when all the effects are destroyed
* 			return () => off();
* 		});
* 	}
*
* 	get current() {
* 		// This makes the getter reactive, if read in an effect
* 		this.#subscribe();
*
* 		// Return the current state of the query, whether or not we're in an effect
* 		return this.#query.matches;
* 	}
* }
* ```
* @param {(update: () => void) => (() => void) | void} start
* @since 5.7.0
*/
function createSubscriber(start) {
	let subscribers = 0;
	let version = source(0);
	/** @type {(() => void) | void} */
	let stop;
	return () => {
		if (effect_tracking()) {
			get(version);
			render_effect(() => {
				if (subscribers === 0) stop = untrack(() => start(() => increment(version)));
				subscribers += 1;
				return () => {
					queue_micro_task(() => {
						subscribers -= 1;
						if (subscribers === 0) {
							stop?.();
							stop = void 0;
							increment(version);
						}
					});
				};
			});
		}
	};
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/boundary.js
/** @import { Effect, Source, TemplateNode, } from '#client' */
/**
* @typedef {{
* 	 onerror?: ((error: unknown, reset: () => void) => void) | null;
*   failed?: ((anchor: Node, error: () => unknown, reset: () => () => void) => void) | null;
*   pending?: ((anchor: Node) => void) | null;
* }} BoundaryProps
*/
var flags = EFFECT_TRANSPARENT | EFFECT_PRESERVED;
/**
* @param {TemplateNode} node
* @param {BoundaryProps} props
* @param {((anchor: Node) => void)} children
* @param {((error: unknown) => unknown) | undefined} [transform_error]
* @returns {void}
*/
function boundary(node, props, children, transform_error) {
	new Boundary(node, props, children, transform_error);
}
var Boundary = class {
	/** @type {Boundary | null} */
	parent;
	is_pending = false;
	/**
	* API-level transformError transform function. Transforms errors before they reach the `failed` snippet.
	* Inherited from parent boundary, or defaults to identity.
	* @type {(error: unknown) => unknown}
	*/
	transform_error;
	/** @type {TemplateNode} */
	#anchor;
	/** @type {TemplateNode | null} */
	#hydrate_open = hydrating ? hydrate_node : null;
	/** @type {BoundaryProps} */
	#props;
	/** @type {((anchor: Node) => void)} */
	#children;
	/** @type {Effect} */
	#effect;
	/** @type {Effect | null} */
	#main_effect = null;
	/** @type {Effect | null} */
	#pending_effect = null;
	/** @type {Effect | null} */
	#failed_effect = null;
	/** @type {DocumentFragment | null} */
	#offscreen_fragment = null;
	#local_pending_count = 0;
	#pending_count = 0;
	#pending_count_update_queued = false;
	/** @type {Set<Effect>} */
	#dirty_effects = /* @__PURE__ */ new Set();
	/** @type {Set<Effect>} */
	#maybe_dirty_effects = /* @__PURE__ */ new Set();
	/**
	* A source containing the number of pending async deriveds/expressions.
	* Only created if `$effect.pending()` is used inside the boundary,
	* otherwise updating the source results in needless `Batch.ensure()`
	* calls followed by no-op flushes
	* @type {Source<number> | null}
	*/
	#effect_pending = null;
	#effect_pending_subscriber = createSubscriber(() => {
		this.#effect_pending = source(this.#local_pending_count);
		return () => {
			this.#effect_pending = null;
		};
	});
	/**
	* @param {TemplateNode} node
	* @param {BoundaryProps} props
	* @param {((anchor: Node) => void)} children
	* @param {((error: unknown) => unknown) | undefined} [transform_error]
	*/
	constructor(node, props, children, transform_error) {
		this.#anchor = node;
		this.#props = props;
		this.#children = (anchor) => {
			var effect = active_effect;
			effect.b = this;
			effect.f |= 128;
			children(anchor);
		};
		this.parent = active_effect.b;
		this.transform_error = transform_error ?? this.parent?.transform_error ?? ((e) => e);
		this.#effect = block(() => {
			if (hydrating) {
				const comment = this.#hydrate_open;
				hydrate_next();
				const server_rendered_pending = comment.data === "[!";
				if (comment.data.startsWith("[?")) {
					const serialized_error = JSON.parse(comment.data.slice(2));
					this.#hydrate_failed_content(serialized_error);
				} else if (server_rendered_pending) this.#hydrate_pending_content();
				else this.#hydrate_resolved_content();
			} else this.#render();
		}, flags);
		if (hydrating) this.#anchor = hydrate_node;
	}
	#hydrate_resolved_content() {
		try {
			this.#main_effect = branch(() => this.#children(this.#anchor));
		} catch (error) {
			this.error(error);
		}
	}
	/**
	* @param {unknown} error The deserialized error from the server's hydration comment
	*/
	#hydrate_failed_content(error) {
		const failed = this.#props.failed;
		if (!failed) return;
		this.#failed_effect = branch(() => {
			failed(this.#anchor, () => error, () => () => {});
		});
	}
	#hydrate_pending_content() {
		const pending = this.#props.pending;
		if (!pending) return;
		this.is_pending = true;
		this.#pending_effect = branch(() => pending(this.#anchor));
		queue_micro_task(() => {
			var fragment = this.#offscreen_fragment = document.createDocumentFragment();
			var anchor = create_text();
			fragment.append(anchor);
			this.#main_effect = this.#run(() => {
				return branch(() => this.#children(anchor));
			});
			if (this.#pending_count === 0) {
				this.#anchor.before(fragment);
				this.#offscreen_fragment = null;
				pause_effect(this.#pending_effect, () => {
					this.#pending_effect = null;
				});
				this.#resolve(current_batch);
			}
		});
	}
	#render() {
		try {
			this.is_pending = this.has_pending_snippet();
			this.#pending_count = 0;
			this.#local_pending_count = 0;
			this.#main_effect = branch(() => {
				this.#children(this.#anchor);
			});
			if (this.#pending_count > 0) {
				var fragment = this.#offscreen_fragment = document.createDocumentFragment();
				move_effect(this.#main_effect, fragment);
				const pending = this.#props.pending;
				this.#pending_effect = branch(() => pending(this.#anchor));
			} else this.#resolve(current_batch);
		} catch (error) {
			this.error(error);
		}
	}
	/**
	* @param {Batch} batch
	*/
	#resolve(batch) {
		this.is_pending = false;
		batch.transfer_effects(this.#dirty_effects, this.#maybe_dirty_effects);
	}
	/**
	* Defer an effect inside a pending boundary until the boundary resolves
	* @param {Effect} effect
	*/
	defer_effect(effect) {
		defer_effect(effect, this.#dirty_effects, this.#maybe_dirty_effects);
	}
	/**
	* Returns `false` if the effect exists inside a boundary whose pending snippet is shown
	* @returns {boolean}
	*/
	is_rendered() {
		return !this.is_pending && (!this.parent || this.parent.is_rendered());
	}
	has_pending_snippet() {
		return !!this.#props.pending;
	}
	/**
	* @template T
	* @param {() => T} fn
	*/
	#run(fn) {
		var previous_effect = active_effect;
		var previous_reaction = active_reaction;
		var previous_ctx = component_context;
		set_active_effect(this.#effect);
		set_active_reaction(this.#effect);
		set_component_context(this.#effect.ctx);
		try {
			Batch.ensure();
			return fn();
		} catch (e) {
			handle_error(e);
			return null;
		} finally {
			set_active_effect(previous_effect);
			set_active_reaction(previous_reaction);
			set_component_context(previous_ctx);
		}
	}
	/**
	* Updates the pending count associated with the currently visible pending snippet,
	* if any, such that we can replace the snippet with content once work is done
	* @param {1 | -1} d
	* @param {Batch} batch
	*/
	#update_pending_count(d, batch) {
		if (!this.has_pending_snippet()) {
			if (this.parent) this.parent.#update_pending_count(d, batch);
			return;
		}
		this.#pending_count += d;
		if (this.#pending_count === 0) {
			this.#resolve(batch);
			if (this.#pending_effect) pause_effect(this.#pending_effect, () => {
				this.#pending_effect = null;
			});
			if (this.#offscreen_fragment) {
				this.#anchor.before(this.#offscreen_fragment);
				this.#offscreen_fragment = null;
			}
		}
	}
	/**
	* Update the source that powers `$effect.pending()` inside this boundary,
	* and controls when the current `pending` snippet (if any) is removed.
	* Do not call from inside the class
	* @param {1 | -1} d
	* @param {Batch} batch
	*/
	update_pending_count(d, batch) {
		this.#update_pending_count(d, batch);
		this.#local_pending_count += d;
		if (!this.#effect_pending || this.#pending_count_update_queued) return;
		this.#pending_count_update_queued = true;
		queue_micro_task(() => {
			this.#pending_count_update_queued = false;
			if (this.#effect_pending) internal_set(this.#effect_pending, this.#local_pending_count);
		});
	}
	get_effect_pending() {
		this.#effect_pending_subscriber();
		return get(this.#effect_pending);
	}
	/** @param {unknown} error */
	error(error) {
		if (!this.#props.onerror && !this.#props.failed) throw error;
		if (current_batch?.is_fork) {
			if (this.#main_effect) current_batch.skip_effect(this.#main_effect);
			if (this.#pending_effect) current_batch.skip_effect(this.#pending_effect);
			if (this.#failed_effect) current_batch.skip_effect(this.#failed_effect);
			current_batch.oncommit(() => {
				this.#handle_error(error);
			});
		} else this.#handle_error(error);
	}
	/**
	* @param {unknown} error
	*/
	#handle_error(error) {
		if (this.#main_effect) {
			destroy_effect(this.#main_effect);
			this.#main_effect = null;
		}
		if (this.#pending_effect) {
			destroy_effect(this.#pending_effect);
			this.#pending_effect = null;
		}
		if (this.#failed_effect) {
			destroy_effect(this.#failed_effect);
			this.#failed_effect = null;
		}
		if (hydrating) {
			set_hydrate_node(this.#hydrate_open);
			next();
			set_hydrate_node(skip_nodes());
		}
		var onerror = this.#props.onerror;
		let failed = this.#props.failed;
		var did_reset = false;
		var calling_on_error = false;
		const reset = () => {
			if (did_reset) {
				svelte_boundary_reset_noop();
				return;
			}
			did_reset = true;
			if (calling_on_error) svelte_boundary_reset_onerror();
			if (this.#failed_effect !== null) pause_effect(this.#failed_effect, () => {
				this.#failed_effect = null;
			});
			this.#run(() => {
				this.#render();
			});
		};
		/** @param {unknown} transformed_error */
		const handle_error_result = (transformed_error) => {
			try {
				calling_on_error = true;
				onerror?.(transformed_error, reset);
				calling_on_error = false;
			} catch (error) {
				invoke_error_boundary(error, this.#effect && this.#effect.parent);
			}
			if (failed) this.#failed_effect = this.#run(() => {
				try {
					return branch(() => {
						var effect = active_effect;
						effect.b = this;
						effect.f |= 128;
						failed(this.#anchor, () => transformed_error, () => reset);
					});
				} catch (error) {
					invoke_error_boundary(error, this.#effect.parent);
					return null;
				}
			});
		};
		queue_micro_task(() => {
			/** @type {unknown} */
			var result;
			try {
				result = this.transform_error(error);
			} catch (e) {
				invoke_error_boundary(e, this.#effect && this.#effect.parent);
				return;
			}
			if (result !== null && typeof result === "object" && typeof result.then === "function")
 /** @type {any} */ result.then(
				handle_error_result,
				/** @param {unknown} e */
				(e) => invoke_error_boundary(e, this.#effect && this.#effect.parent)
			);
			else handle_error_result(result);
		});
	}
};
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/async.js
/** @import { Blocker, Effect, Source, Value } from '#client' */
/**
* @param {Blocker[]} blockers
* @param {Array<() => any>} sync
* @param {Array<() => Promise<any>>} async
* @param {(values: Value[]) => any} fn
*/
function flatten(blockers, sync, async, fn) {
	const d = is_runes() ? derived : derived_safe_equal;
	var pending = blockers.filter((b) => !b.settled);
	var deriveds = sync.map(d);
	if (async.length === 0 && pending.length === 0) {
		fn(deriveds);
		return;
	}
	var parent = active_effect;
	var restore = capture();
	var blocker_promise = pending.length === 1 ? pending[0].promise : pending.length > 1 ? Promise.all(pending.map((b) => b.promise)) : null;
	/**
	* @param {Source[]} async
	*/
	function finish(async) {
		if ((parent.f & 16384) !== 0) return;
		restore();
		try {
			fn([...deriveds, ...async]);
		} catch (error) {
			invoke_error_boundary(error, parent);
		}
		unset_context();
	}
	var decrement_pending = increment_pending();
	if (async.length === 0) {
		/** @type {Promise<any>} */ blocker_promise.then(() => finish([])).finally(decrement_pending);
		return;
	}
	function run() {
		Promise.all(async.map((expression) => /* @__PURE__ */ async_derived(expression))).then(finish).catch((error) => invoke_error_boundary(error, parent)).finally(decrement_pending);
	}
	if (blocker_promise) blocker_promise.then(() => {
		restore();
		run();
		unset_context();
	});
	else run();
}
/**
* Captures the current effect context so that we can restore it after
* some asynchronous work has happened (so that e.g. `await a + b`
* causes `b` to be registered as a dependency).
*/
function capture() {
	var previous_effect = active_effect;
	var previous_reaction = active_reaction;
	var previous_component_context = component_context;
	var previous_batch = current_batch;
	return function restore(activate_batch = true) {
		set_active_effect(previous_effect);
		set_active_reaction(previous_reaction);
		set_component_context(previous_component_context);
		if (activate_batch && (previous_effect.f & 16384) === 0) {
			previous_batch?.activate();
			previous_batch?.apply();
		}
	};
}
function unset_context(deactivate_batch = true) {
	set_active_effect(null);
	set_active_reaction(null);
	set_component_context(null);
	if (deactivate_batch) current_batch?.deactivate();
}
/**
* @returns {(skip?: boolean) => void}
*/
function increment_pending() {
	var effect = active_effect;
	var boundary = effect.b;
	var batch = current_batch;
	var blocking = !!boundary?.is_rendered();
	boundary?.update_pending_count(1, batch);
	batch.increment(blocking, effect);
	return () => {
		boundary?.update_pending_count(-1, batch);
		batch.decrement(blocking, effect);
	};
}
/**
* @template V
* @param {() => V} fn
* @returns {Derived<V>}
*/
/*#__NO_SIDE_EFFECTS__*/
function derived(fn) {
	var flags = 2 | DIRTY;
	if (active_effect !== null) active_effect.f |= EFFECT_PRESERVED;
	return {
		ctx: component_context,
		deps: null,
		effects: null,
		equals,
		f: flags,
		fn,
		reactions: null,
		rv: 0,
		v: UNINITIALIZED,
		wv: 0,
		parent: active_effect,
		ac: null
	};
}
var OBSOLETE = Symbol("obsolete");
/**
* @template V
* @param {() => V | Promise<V>} fn
* @param {string} [label]
* @param {string} [location] If provided, print a warning if the value is not read immediately after update
* @returns {Promise<Source<V>>}
*/
/*#__NO_SIDE_EFFECTS__*/
function async_derived(fn, label, location) {
	let parent = active_effect;
	if (parent === null) async_derived_orphan();
	var promise = void 0;
	var signal = source(UNINITIALIZED);
	var should_suspend = !active_reaction;
	/** @type {Set<ReturnType<typeof deferred<V>>>} */
	var deferreds = /* @__PURE__ */ new Set();
	async_effect(() => {
		var effect = active_effect;
		/** @type {ReturnType<typeof deferred<V>>} */
		var d = deferred();
		promise = d.promise;
		try {
			Promise.resolve(fn()).then(d.resolve, (e) => {
				if (e !== STALE_REACTION) d.reject(e);
			}).finally(unset_context);
		} catch (error) {
			d.reject(error);
			unset_context();
		}
		var batch = current_batch;
		if (should_suspend) {
			if ((effect.f & 32768) !== 0) var decrement_pending = increment_pending();
			if (parent.b?.is_rendered()) batch.async_deriveds.get(effect)?.reject(OBSOLETE);
			else for (const d of deferreds.values()) d.reject(OBSOLETE);
			deferreds.add(d);
			batch.async_deriveds.set(effect, d);
		}
		/**
		* @param {any} value
		* @param {unknown} error
		*/
		const handler = (value, error = void 0) => {
			decrement_pending?.();
			deferreds.delete(d);
			if (error === OBSOLETE) return;
			batch.activate();
			if (error) {
				signal.f |= ERROR_VALUE;
				internal_set(signal, error);
			} else {
				if ((signal.f & 8388608) !== 0) signal.f ^= ERROR_VALUE;
				internal_set(signal, value);
			}
			batch.deactivate();
		};
		d.promise.then(handler, (e) => handler(null, e || "unknown"));
	});
	teardown(() => {
		for (const d of deferreds) d.reject(OBSOLETE);
	});
	return new Promise((fulfil) => {
		/** @param {Promise<V>} p */
		function next(p) {
			function go() {
				if (p === promise) fulfil(signal);
				else next(promise);
			}
			p.then(go, go);
		}
		next(promise);
	});
}
/**
* @template V
* @param {() => V} fn
* @returns {Derived<V>}
*/
/*#__NO_SIDE_EFFECTS__*/
function user_derived(fn) {
	const d = /* @__PURE__ */ derived(fn);
	if (!async_mode_flag) push_reaction_value(d);
	return d;
}
/**
* @template V
* @param {() => V} fn
* @returns {Derived<V>}
*/
/*#__NO_SIDE_EFFECTS__*/
function derived_safe_equal(fn) {
	const signal = /* @__PURE__ */ derived(fn);
	signal.equals = safe_equals;
	return signal;
}
/**
* @param {Derived} derived
* @returns {void}
*/
function destroy_derived_effects(derived) {
	var effects = derived.effects;
	if (effects !== null) {
		derived.effects = null;
		for (var i = 0; i < effects.length; i += 1) destroy_effect(effects[i]);
	}
}
/**
* @template T
* @param {Derived} derived
* @returns {T}
*/
function execute_derived(derived) {
	var value;
	var prev_active_effect = active_effect;
	var parent = derived.parent;
	if (!is_destroying_effect && parent !== null && derived.v !== UNINITIALIZED && (parent.f & 24576) !== 0) {
		derived_inert();
		return derived.v;
	}
	set_active_effect(parent);
	try {
		derived.f &= ~WAS_MARKED;
		destroy_derived_effects(derived);
		value = update_reaction(derived);
	} finally {
		set_active_effect(prev_active_effect);
	}
	return value;
}
/**
* @param {Derived} derived
* @returns {void}
*/
function update_derived(derived) {
	var value = execute_derived(derived);
	if (!derived.equals(value)) {
		derived.wv = increment_write_version();
		if (!current_batch?.is_fork || derived.deps === null) {
			if (current_batch !== null) {
				current_batch.capture(derived, value, true);
				previous_batch?.capture(derived, value, true);
			} else derived.v = value;
			if (derived.deps === null) {
				set_signal_status(derived, CLEAN);
				return;
			}
		}
	}
	if (is_destroying_effect) return;
	if (batch_values !== null) {
		if (effect_tracking() || current_batch?.is_fork) batch_values.set(derived, value);
	} else update_derived_status(derived);
}
/**
* @param {Derived} derived
*/
function freeze_derived_effects(derived) {
	if (derived.effects === null) return;
	for (const e of derived.effects) if (e.teardown || e.ac) {
		e.teardown?.();
		if (e.ac !== null) without_reactive_context(() => {
			/** @type {AbortController} */ e.ac.abort(STALE_REACTION);
			e.ac = null;
		});
		if (e.fn !== null) e.teardown = noop;
		remove_reactions(e, 0);
		destroy_effect_children(e);
	}
}
/**
* @param {Derived} derived
*/
function unfreeze_derived_effects(derived) {
	if (derived.effects === null) return;
	for (const e of derived.effects) if (e.teardown && e.fn !== null) update_effect(e);
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/batch.js
/** @import { Fork } from 'svelte' */
/** @import { Derived, Effect, Reaction, Source, Value } from '#client' */
/** @type {Batch | null} */
var first_batch = null;
/** @type {Batch | null} */
var last_batch = null;
/** @type {Batch | null} */
var current_batch = null;
/**
* This is needed to avoid overwriting inputs
* @type {Batch | null}
*/
var previous_batch = null;
/**
* When time travelling (i.e. working in one batch, while other batches
* still have ongoing work), we ignore the real values of affected
* signals in favour of their values within the batch
* @type {Map<Value, any> | null}
*/
var batch_values = null;
/** @type {Effect | null} */
var last_scheduled_effect = null;
var is_flushing_sync = false;
var is_processing = false;
/**
* During traversal, this is an array. Newly created effects are (if not immediately
* executed) pushed to this array, rather than going through the scheduling
* rigamarole that would cause another turn of the flush loop.
* @type {Effect[] | null}
*/
var collected_effects = null;
/**
* An array of effects that are marked during traversal as a result of a `set`
* (not `internal_set`) call. These will be added to the next batch and
* trigger another `batch.process()`
* @type {Effect[] | null}
* @deprecated when we get rid of legacy mode and stores, we can get rid of this
*/
var legacy_updates = null;
var flush_count = 0;
var uid = 1;
var Batch = class Batch {
	id = uid++;
	/** True as soon as `#process` was called */
	#started = false;
	linked = true;
	/** @type {Batch | null} */
	#prev = null;
	/** @type {Batch | null} */
	#next = null;
	/** @type {Map<Effect, ReturnType<typeof deferred<any>>>} */
	async_deriveds = /* @__PURE__ */ new Map();
	/**
	* The current values of any signals that are updated in this batch.
	* Tuple format: [value, is_derived] (note: is_derived is false for deriveds, too, if they were overridden via assignment)
	* They keys of this map are identical to `this.#previous`
	* @type {Map<Value, [any, boolean]>}
	*/
	current = /* @__PURE__ */ new Map();
	/**
	* The values of any signals (sources and deriveds) that are updated in this batch _before_ those updates took place.
	* They keys of this map are identical to `this.#current`
	* @type {Map<Value, any>}
	*/
	previous = /* @__PURE__ */ new Map();
	/**
	* When the batch is committed (and the DOM is updated), we need to remove old branches
	* and append new ones by calling the functions added inside (if/each/key/etc) blocks
	* @type {Set<(batch: Batch) => void>}
	*/
	#commit_callbacks = /* @__PURE__ */ new Set();
	/**
	* If a fork is discarded, we need to destroy any effects that are no longer needed
	* @type {Set<(batch: Batch) => void>}
	*/
	#discard_callbacks = /* @__PURE__ */ new Set();
	/**
	* The number of async effects that are currently in flight
	*/
	#pending = 0;
	/**
	* Async effects that are currently in flight, _not_ inside a pending boundary
	* @type {Map<Effect, number>}
	*/
	#blocking_pending = /* @__PURE__ */ new Map();
	/**
	* A deferred that resolves when the batch is committed, used with `settled()`
	* TODO replace with Promise.withResolvers once supported widely enough
	* @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
	*/
	#deferred = null;
	/**
	* The root effects that need to be flushed
	* @type {Effect[]}
	*/
	#roots = [];
	/**
	* Effects created while this batch was active.
	* @type {Effect[]}
	*/
	#new_effects = [];
	/**
	* Deferred effects (which run after async work has completed) that are DIRTY
	* @type {Set<Effect>}
	*/
	#dirty_effects = /* @__PURE__ */ new Set();
	/**
	* Deferred effects that are MAYBE_DIRTY
	* @type {Set<Effect>}
	*/
	#maybe_dirty_effects = /* @__PURE__ */ new Set();
	/**
	* A map of branches that still exist, but will be destroyed when this batch
	* is committed — we skip over these during `process`.
	* The value contains child effects that were dirty/maybe_dirty before being reset,
	* so they can be rescheduled if the branch survives.
	* @type {Map<Effect, { d: Effect[], m: Effect[] }>}
	*/
	#skipped_branches = /* @__PURE__ */ new Map();
	/**
	* Inverse of #skipped_branches which we need to tell prior batches to unskip them when committing
	* @type {Set<Effect>}
	*/
	#unskipped_branches = /* @__PURE__ */ new Set();
	is_fork = false;
	#decrement_queued = false;
	constructor() {
		if (last_batch === null) first_batch = last_batch = this;
		else {
			last_batch.#next = this;
			this.#prev = last_batch;
		}
		last_batch = this;
	}
	#is_deferred() {
		if (this.is_fork) return true;
		for (const effect of this.#blocking_pending.keys()) {
			var e = effect;
			var skipped = false;
			while (e.parent !== null) {
				if (this.#skipped_branches.has(e)) {
					skipped = true;
					break;
				}
				e = e.parent;
			}
			if (!skipped) return true;
		}
		return false;
	}
	/**
	* Add an effect to the #skipped_branches map and reset its children
	* @param {Effect} effect
	*/
	skip_effect(effect) {
		if (!this.#skipped_branches.has(effect)) this.#skipped_branches.set(effect, {
			d: [],
			m: []
		});
		this.#unskipped_branches.delete(effect);
	}
	/**
	* Remove an effect from the #skipped_branches map and reschedule
	* any tracked dirty/maybe_dirty child effects
	* @param {Effect} effect
	* @param {(e: Effect) => void} callback
	*/
	unskip_effect(effect, callback = (e) => this.schedule(e)) {
		var tracked = this.#skipped_branches.get(effect);
		if (tracked) {
			this.#skipped_branches.delete(effect);
			for (var e of tracked.d) {
				set_signal_status(e, DIRTY);
				callback(e);
			}
			for (e of tracked.m) {
				set_signal_status(e, MAYBE_DIRTY);
				callback(e);
			}
		}
		this.#unskipped_branches.add(effect);
	}
	#process() {
		this.#started = true;
		if (flush_count++ > 1e3) {
			this.#unlink();
			infinite_loop_guard();
		}
		for (const e of this.#dirty_effects) {
			this.#maybe_dirty_effects.delete(e);
			set_signal_status(e, DIRTY);
			this.schedule(e);
		}
		for (const e of this.#maybe_dirty_effects) {
			set_signal_status(e, MAYBE_DIRTY);
			this.schedule(e);
		}
		const roots = this.#roots;
		this.#roots = [];
		this.apply();
		/** @type {Effect[]} */
		var effects = collected_effects = [];
		/** @type {Effect[]} */
		var render_effects = [];
		/**
		* @type {Effect[]}
		* @deprecated when we get rid of legacy mode and stores, we can get rid of this
		*/
		var updates = legacy_updates = [];
		for (const root of roots) try {
			this.#traverse(root, effects, render_effects);
		} catch (e) {
			reset_all(root);
			if (!this.#is_deferred()) this.discard();
			throw e;
		}
		current_batch = null;
		if (updates.length > 0) {
			var batch = Batch.ensure();
			for (const e of updates) batch.schedule(e);
		}
		collected_effects = null;
		legacy_updates = null;
		if (this.#is_deferred()) {
			this.#defer_effects(render_effects);
			this.#defer_effects(effects);
			for (const [e, t] of this.#skipped_branches) reset_branch(e, t);
			if (updates.length > 0)
 /** @type {Batch} */ current_batch.#process();
			return;
		}
		const earlier_batch = this.#find_earlier_batch();
		if (earlier_batch) {
			this.#defer_effects(render_effects);
			this.#defer_effects(effects);
			earlier_batch.#merge(this);
			return;
		}
		this.#dirty_effects.clear();
		this.#maybe_dirty_effects.clear();
		for (const fn of this.#commit_callbacks) fn(this);
		this.#commit_callbacks.clear();
		previous_batch = this;
		flush_queued_effects(render_effects);
		flush_queued_effects(effects);
		previous_batch = null;
		this.#deferred?.resolve();
		var next_batch = current_batch;
		if (this.#pending === 0 && (this.#roots.length === 0 || next_batch !== null)) {
			this.#unlink();
			if (async_mode_flag) {
				this.#commit();
				current_batch = next_batch;
			}
		}
		if (this.#roots.length > 0) if (next_batch !== null) {
			const batch = next_batch;
			batch.#roots.push(...this.#roots.filter((r) => !batch.#roots.includes(r)));
		} else next_batch = this;
		if (next_batch !== null) next_batch.#process();
	}
	/**
	* Traverse the effect tree, executing effects or stashing
	* them for later execution as appropriate
	* @param {Effect} root
	* @param {Effect[]} effects
	* @param {Effect[]} render_effects
	*/
	#traverse(root, effects, render_effects) {
		root.f ^= CLEAN;
		var effect = root.first;
		while (effect !== null) {
			var flags = effect.f;
			var is_branch = (flags & 96) !== 0;
			if (!(is_branch && (flags & 1024) !== 0 || (flags & 8192) !== 0 || this.#skipped_branches.has(effect)) && effect.fn !== null) {
				if (is_branch) effect.f ^= CLEAN;
				else if ((flags & 4) !== 0) effects.push(effect);
				else if (async_mode_flag && (flags & 16777224) !== 0) render_effects.push(effect);
				else if (is_dirty(effect)) {
					if ((flags & 16) !== 0) this.#maybe_dirty_effects.add(effect);
					update_effect(effect);
				}
				var child = effect.first;
				if (child !== null) {
					effect = child;
					continue;
				}
			}
			while (effect !== null) {
				var next = effect.next;
				if (next !== null) {
					effect = next;
					break;
				}
				effect = effect.parent;
			}
		}
	}
	#find_earlier_batch() {
		var batch = this.#prev;
		while (batch !== null) {
			if (!batch.is_fork) {
				for (const [value, [, is_derived]] of this.current) if (batch.current.has(value) && !is_derived) return batch;
			}
			batch = batch.#prev;
		}
		return null;
	}
	/**
	* @param {Batch} batch
	*/
	#merge(batch) {
		for (const [source, value] of batch.current) {
			if (!this.previous.has(source) && batch.previous.has(source)) this.previous.set(source, batch.previous.get(source));
			this.current.set(source, value);
		}
		for (const [effect, deferred] of batch.async_deriveds) {
			const d = this.async_deriveds.get(effect);
			if (d) deferred.promise.then(d.resolve).catch(d.reject);
		}
		batch.async_deriveds.clear();
		this.transfer_effects(batch.#dirty_effects, batch.#maybe_dirty_effects);
		/**
		* mark all effects that depend on `batch.current`, except the
		* async effects that we just resolved (TODO unless they depend
		* on values in this batch that are NOT in the later batch?).
		* Through this we also will populate the correct #skipped_branches,
		* oncommit callbacks etc, so we don't need to merge them separately.
		* @param {Value} value
		*/
		const mark = (value) => {
			var reactions = value.reactions;
			if (reactions === null) return;
			if ((value.f & 2) !== 0 && (value.f & 6144) === 0) return;
			for (const reaction of reactions) {
				var flags = reaction.f;
				if ((flags & 2) !== 0) mark(reaction);
				else {
					var effect = reaction;
					if (flags & 4194320 && !this.async_deriveds.has(effect)) {
						this.#maybe_dirty_effects.delete(effect);
						set_signal_status(effect, DIRTY);
						this.schedule(effect);
					}
				}
			}
		};
		for (const source of this.current.keys()) mark(source);
		this.oncommit(() => batch.discard());
		batch.#unlink();
		current_batch = this;
		this.#process();
	}
	/**
	* @param {Effect[]} effects
	*/
	#defer_effects(effects) {
		for (var i = 0; i < effects.length; i += 1) defer_effect(effects[i], this.#dirty_effects, this.#maybe_dirty_effects);
	}
	/**
	* Associate a change to a given source with the current
	* batch, noting its previous and current values
	* @param {Value} source
	* @param {any} value
	* @param {boolean} [is_derived]
	*/
	capture(source, value, is_derived = false) {
		if (source.v !== UNINITIALIZED && !this.previous.has(source)) this.previous.set(source, source.v);
		if ((source.f & 8388608) === 0) {
			this.current.set(source, [value, is_derived]);
			batch_values?.set(source, value);
		}
		if (!this.is_fork) source.v = value;
	}
	activate() {
		current_batch = this;
	}
	deactivate() {
		current_batch = null;
		batch_values = null;
	}
	flush() {
		try {
			is_processing = true;
			current_batch = this;
			this.#process();
		} finally {
			flush_count = 0;
			last_scheduled_effect = null;
			collected_effects = null;
			legacy_updates = null;
			is_processing = false;
			current_batch = null;
			batch_values = null;
			old_values.clear();
		}
	}
	discard() {
		for (const fn of this.#discard_callbacks) fn(this);
		this.#discard_callbacks.clear();
		for (const deferred of this.async_deriveds.values()) deferred.reject(OBSOLETE);
		this.#unlink();
		this.#deferred?.resolve();
	}
	/**
	* @param {Effect} effect
	*/
	register_created_effect(effect) {
		this.#new_effects.push(effect);
	}
	#commit() {
		for (let batch = first_batch; batch !== null; batch = batch.#next) {
			var is_earlier = batch.id < this.id;
			/** @type {Source[]} */
			var sources = [];
			for (const [source, [value, is_derived]] of this.current) {
				if (batch.current.has(source)) {
					var batch_value = batch.current.get(source)[0];
					if (is_earlier && value !== batch_value) batch.current.set(source, [value, is_derived]);
					else continue;
				}
				sources.push(source);
			}
			if (is_earlier) for (const [effect, deferred] of this.async_deriveds) {
				const d = batch.async_deriveds.get(effect);
				if (d) deferred.promise.then(d.resolve).catch(d.reject);
			}
			var current = [...batch.current.keys()].filter((source) => !batch.current.get(source)[1]);
			if (!batch.#started || current.length === 0) continue;
			var others = current.filter((source) => !this.current.has(source));
			if (others.length === 0) {
				if (is_earlier) batch.discard();
			} else if (sources.length > 0) {
				if (is_earlier) for (const unskipped of this.#unskipped_branches) batch.unskip_effect(unskipped, (e) => {
					if ((e.f & 4194320) !== 0) batch.schedule(e);
					else batch.#defer_effects([e]);
				});
				batch.activate();
				/** @type {Set<Value>} */
				var marked = /* @__PURE__ */ new Set();
				/** @type {Map<Reaction, boolean>} */
				var checked = /* @__PURE__ */ new Map();
				for (var source of sources) mark_effects(source, others, marked, checked);
				checked = /* @__PURE__ */ new Map();
				var current_unequal = [...batch.current].filter(([c, v1]) => {
					const v2 = this.current.get(c);
					if (!v2) return true;
					return v2[0] !== v1[0] || v2[1] !== v1[1];
				}).map(([c]) => c);
				if (current_unequal.length > 0) {
					for (const effect of this.#new_effects) if ((effect.f & 155648) === 0 && depends_on(effect, current_unequal, checked)) if ((effect.f & 4194320) !== 0) {
						set_signal_status(effect, DIRTY);
						batch.schedule(effect);
					} else batch.#dirty_effects.add(effect);
				}
				if (batch.#roots.length > 0 && !batch.#decrement_queued) {
					batch.apply();
					for (var root of batch.#roots) batch.#traverse(root, [], []);
					batch.#roots = [];
				}
				batch.deactivate();
			}
		}
	}
	/**
	* @param {boolean} blocking
	* @param {Effect} effect
	*/
	increment(blocking, effect) {
		this.#pending += 1;
		if (blocking) {
			let blocking_pending_count = this.#blocking_pending.get(effect) ?? 0;
			this.#blocking_pending.set(effect, blocking_pending_count + 1);
		}
	}
	/**
	* @param {boolean} blocking
	* @param {Effect} effect
	*/
	decrement(blocking, effect) {
		this.#pending -= 1;
		if (blocking) {
			let blocking_pending_count = this.#blocking_pending.get(effect) ?? 0;
			if (blocking_pending_count === 1) this.#blocking_pending.delete(effect);
			else this.#blocking_pending.set(effect, blocking_pending_count - 1);
		}
		if (this.#decrement_queued) return;
		this.#decrement_queued = true;
		queue_micro_task(() => {
			this.#decrement_queued = false;
			if (this.linked) this.flush();
		});
	}
	/**
	* @param {Set<Effect>} dirty_effects
	* @param {Set<Effect>} maybe_dirty_effects
	*/
	transfer_effects(dirty_effects, maybe_dirty_effects) {
		for (const e of dirty_effects) this.#dirty_effects.add(e);
		for (const e of maybe_dirty_effects) this.#maybe_dirty_effects.add(e);
		dirty_effects.clear();
		maybe_dirty_effects.clear();
	}
	/** @param {(batch: Batch) => void} fn */
	oncommit(fn) {
		this.#commit_callbacks.add(fn);
	}
	/** @param {(batch: Batch) => void} fn */
	ondiscard(fn) {
		this.#discard_callbacks.add(fn);
	}
	settled() {
		return (this.#deferred ??= deferred()).promise;
	}
	static ensure() {
		if (current_batch === null) {
			const batch = current_batch = new Batch();
			if (!is_processing && !is_flushing_sync) queue_micro_task(() => {
				if (!batch.#started) batch.flush();
			});
		}
		return current_batch;
	}
	apply() {
		if (!async_mode_flag || !this.is_fork && this.#prev === null && this.#next === null) {
			batch_values = null;
			return;
		}
		batch_values = /* @__PURE__ */ new Map();
		for (const [source, [value]] of this.current) batch_values.set(source, value);
		for (let batch = first_batch; batch !== null; batch = batch.#next) {
			if (batch === this || batch.is_fork) continue;
			var intersects = false;
			if (batch.id < this.id) for (const [source, [, is_derived]] of batch.current) {
				if (is_derived) continue;
				if (this.current.has(source)) {
					intersects = true;
					break;
				}
			}
			if (!intersects) {
				for (const [source, previous] of batch.previous) if (!batch_values.has(source)) batch_values.set(source, previous);
			}
		}
	}
	/**
	*
	* @param {Effect} effect
	*/
	schedule(effect) {
		last_scheduled_effect = effect;
		if (effect.b?.is_pending && (effect.f & 16777228) !== 0 && (effect.f & 32768) === 0) {
			effect.b.defer_effect(effect);
			return;
		}
		var e = effect;
		while (e.parent !== null) {
			e = e.parent;
			var flags = e.f;
			if (collected_effects !== null && e === active_effect) {
				if (async_mode_flag) return;
				if ((active_reaction === null || (active_reaction.f & 2) === 0) && !legacy_is_updating_store) return;
			}
			if ((flags & 96) !== 0) {
				if ((flags & 1024) === 0) return;
				e.f ^= CLEAN;
			}
		}
		this.#roots.push(e);
	}
	#unlink() {
		if (!this.linked) return;
		var prev = this.#prev;
		var next = this.#next;
		if (prev === null) first_batch = next;
		else prev.#next = next;
		if (next === null) last_batch = prev;
		else next.#prev = prev;
		this.linked = false;
	}
};
/**
* Synchronously flush any pending updates.
* Returns void if no callback is provided, otherwise returns the result of calling the callback.
* @template [T=void]
* @param {(() => T) | undefined} [fn]
* @returns {T}
*/
function flushSync(fn) {
	var was_flushing_sync = is_flushing_sync;
	is_flushing_sync = true;
	try {
		var result;
		if (fn) {
			if (current_batch !== null && !current_batch.is_fork) current_batch.flush();
			result = fn();
		}
		while (true) {
			flush_tasks();
			if (current_batch === null) return result;
			current_batch.flush();
		}
	} finally {
		is_flushing_sync = was_flushing_sync;
	}
}
function infinite_loop_guard() {
	try {
		effect_update_depth_exceeded();
	} catch (error) {
		invoke_error_boundary(error, last_scheduled_effect);
	}
}
/** @type {Set<Effect> | null} */
var eager_block_effects = null;
/**
* @param {Array<Effect>} effects
* @returns {void}
*/
function flush_queued_effects(effects) {
	var length = effects.length;
	if (length === 0) return;
	var i = 0;
	while (i < length) {
		var effect = effects[i++];
		if ((effect.f & 24576) === 0 && is_dirty(effect)) {
			eager_block_effects = /* @__PURE__ */ new Set();
			update_effect(effect);
			if (effect.deps === null && effect.first === null && effect.nodes === null && effect.teardown === null && effect.ac === null) unlink_effect(effect);
			if (eager_block_effects?.size > 0) {
				old_values.clear();
				for (const e of eager_block_effects) {
					if ((e.f & 24576) !== 0) continue;
					/** @type {Effect[]} */
					const ordered_effects = [e];
					let ancestor = e.parent;
					while (ancestor !== null) {
						if (eager_block_effects.has(ancestor)) {
							eager_block_effects.delete(ancestor);
							ordered_effects.push(ancestor);
						}
						ancestor = ancestor.parent;
					}
					for (let j = ordered_effects.length - 1; j >= 0; j--) {
						const e = ordered_effects[j];
						if ((e.f & 24576) !== 0) continue;
						update_effect(e);
					}
				}
				eager_block_effects.clear();
			}
		}
	}
	eager_block_effects = null;
}
/**
* This is similar to `mark_reactions`, but it only marks async/block effects
* depending on `value` and at least one of the other `sources`, so that
* these effects can re-run after another batch has been committed
* @param {Value} value
* @param {Source[]} sources
* @param {Set<Value>} marked
* @param {Map<Reaction, boolean>} checked
*/
function mark_effects(value, sources, marked, checked) {
	if (marked.has(value)) return;
	marked.add(value);
	if (value.reactions !== null) for (const reaction of value.reactions) {
		const flags = reaction.f;
		if ((flags & 2) !== 0) mark_effects(reaction, sources, marked, checked);
		else if ((flags & 4194320) !== 0 && (flags & 2048) === 0 && depends_on(reaction, sources, checked)) {
			set_signal_status(reaction, DIRTY);
			schedule_effect(reaction);
		}
	}
}
/**
* @param {Reaction} reaction
* @param {Source[]} sources
* @param {Map<Reaction, boolean>} checked
*/
function depends_on(reaction, sources, checked) {
	const depends = checked.get(reaction);
	if (depends !== void 0) return depends;
	if (reaction.deps !== null) for (const dep of reaction.deps) {
		if (includes.call(sources, dep)) return true;
		if ((dep.f & 2) !== 0 && depends_on(dep, sources, checked)) {
			checked.set(dep, true);
			return true;
		}
	}
	checked.set(reaction, false);
	return false;
}
/**
* @param {Effect} effect
* @returns {void}
*/
function schedule_effect(effect) {
	/** @type {Batch} */ current_batch.schedule(effect);
}
/**
* Mark all the effects inside a skipped branch CLEAN, so that
* they can be correctly rescheduled later. Tracks dirty and maybe_dirty
* effects so they can be rescheduled if the branch survives.
* @param {Effect} effect
* @param {{ d: Effect[], m: Effect[] }} tracked
*/
function reset_branch(effect, tracked) {
	if ((effect.f & 32) !== 0 && (effect.f & 1024) !== 0) return;
	if ((effect.f & 2048) !== 0) tracked.d.push(effect);
	else if ((effect.f & 4096) !== 0) tracked.m.push(effect);
	set_signal_status(effect, CLEAN);
	var e = effect.first;
	while (e !== null) {
		reset_branch(e, tracked);
		e = e.next;
	}
}
/**
* Mark an entire effect tree clean following an error
* @param {Effect} effect
*/
function reset_all(effect) {
	set_signal_status(effect, CLEAN);
	var e = effect.first;
	while (e !== null) {
		reset_all(e);
		e = e.next;
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/sources.js
/** @import { Derived, Effect, Source, Value } from '#client' */
/** @type {Set<Effect>} */
var eager_effects = /* @__PURE__ */ new Set();
/** @type {Map<Source, any>} */
var old_values = /* @__PURE__ */ new Map();
var eager_effects_deferred = false;
/**
* @template V
* @param {V} v
* @param {Error | null} [stack]
* @returns {Source<V>}
*/
function source(v, stack) {
	return {
		f: 0,
		v,
		reactions: null,
		equals,
		rv: 0,
		wv: 0
	};
}
/**
* @template V
* @param {V} v
* @param {Error | null} [stack]
*/
/*#__NO_SIDE_EFFECTS__*/
function state(v, stack) {
	const s = source(v, stack);
	push_reaction_value(s);
	return s;
}
/**
* @template V
* @param {V} initial_value
* @param {boolean} [immutable]
* @returns {Source<V>}
*/
/*#__NO_SIDE_EFFECTS__*/
function mutable_source(initial_value, immutable = false, trackable = true) {
	const s = source(initial_value);
	if (!immutable) s.equals = safe_equals;
	if (legacy_mode_flag && trackable && component_context !== null && component_context.l !== null) (component_context.l.s ??= []).push(s);
	return s;
}
/**
* @template V
* @param {Source<V>} source
* @param {V} value
* @param {boolean} [should_proxy]
* @returns {V}
*/
function set(source, value, should_proxy = false) {
	if (active_reaction !== null && (!untracking || (active_reaction.f & 131072) !== 0) && is_runes() && (active_reaction.f & 4325394) !== 0 && (current_sources === null || !current_sources.has(source))) state_unsafe_mutation();
	return internal_set(source, should_proxy ? proxy(value) : value, legacy_updates);
}
/**
* @template V
* @param {Source<V>} source
* @param {V} value
* @param {Effect[] | null} [updated_during_traversal]
* @returns {V}
*/
function internal_set(source, value, updated_during_traversal = null) {
	if (!source.equals(value)) {
		old_values.set(source, is_destroying_effect ? value : source.v);
		var batch = Batch.ensure();
		batch.capture(source, value);
		if ((source.f & 2) !== 0) {
			const derived = source;
			if ((source.f & 2048) !== 0) execute_derived(derived);
			if (batch_values === null) update_derived_status(derived);
		}
		source.wv = increment_write_version();
		mark_reactions(source, DIRTY, updated_during_traversal);
		if (is_runes() && active_effect !== null && (active_effect.f & 1024) !== 0 && (active_effect.f & 96) === 0) if (untracked_writes === null) set_untracked_writes([source]);
		else untracked_writes.push(source);
		if (!batch.is_fork && eager_effects.size > 0 && !eager_effects_deferred) flush_eager_effects();
	}
	return value;
}
function flush_eager_effects() {
	eager_effects_deferred = false;
	for (const effect of eager_effects) {
		if ((effect.f & 1024) !== 0) set_signal_status(effect, MAYBE_DIRTY);
		let dirty;
		try {
			dirty = is_dirty(effect);
		} catch {
			dirty = true;
		}
		if (dirty) update_effect(effect);
	}
	eager_effects.clear();
}
/**
* Silently (without using `get`) increment a source
* @param {Source<number>} source
*/
function increment(source) {
	set(source, source.v + 1);
}
/**
* @param {Value} signal
* @param {number} status should be DIRTY or MAYBE_DIRTY
* @param {Effect[] | null} updated_during_traversal
* @returns {void}
*/
function mark_reactions(signal, status, updated_during_traversal) {
	var reactions = signal.reactions;
	if (reactions === null) return;
	var runes = is_runes();
	var length = reactions.length;
	for (var i = 0; i < length; i++) {
		var reaction = reactions[i];
		var flags = reaction.f;
		if (!runes && reaction === active_effect) continue;
		var not_dirty = (flags & DIRTY) === 0;
		if (not_dirty) set_signal_status(reaction, status);
		if ((flags & 131072) !== 0) eager_effects.add(reaction);
		else if ((flags & 2) !== 0) {
			var derived = reaction;
			batch_values?.delete(derived);
			if ((flags & 65536) === 0) {
				if (flags & 512 && (active_effect === null || (active_effect.f & 2097152) === 0)) reaction.f |= WAS_MARKED;
				mark_reactions(derived, MAYBE_DIRTY, updated_during_traversal);
			}
		} else if (not_dirty) {
			var effect = reaction;
			if ((flags & 16) !== 0 && eager_block_effects !== null) eager_block_effects.add(effect);
			if (updated_during_traversal !== null) updated_during_traversal.push(effect);
			else schedule_effect(effect);
		}
	}
}
/**
* @template T
* @param {T} value
* @returns {T}
*/
function proxy(value) {
	if (typeof value !== "object" || value === null || STATE_SYMBOL in value) return value;
	const prototype = get_prototype_of(value);
	if (prototype !== object_prototype && prototype !== array_prototype) return value;
	/** @type {Map<any, Source<any>>} */
	var sources = /* @__PURE__ */ new Map();
	var is_proxied_array = is_array(value);
	var version = /* @__PURE__ */ state(0);
	var stack = null;
	var parent_version = update_version;
	/**
	* Executes the proxy in the context of the reaction it was originally created in, if any
	* @template T
	* @param {() => T} fn
	*/
	var with_parent = (fn) => {
		if (update_version === parent_version) return fn();
		var reaction = active_reaction;
		var version = update_version;
		set_active_reaction(null);
		set_update_version(parent_version);
		var result = fn();
		set_active_reaction(reaction);
		set_update_version(version);
		return result;
	};
	if (is_proxied_array) sources.set("length", /* @__PURE__ */ state(
		/** @type {any[]} */
		value.length,
		stack
	));
	return new Proxy(value, {
		defineProperty(_, prop, descriptor) {
			if (!("value" in descriptor) || descriptor.configurable === false || descriptor.enumerable === false || descriptor.writable === false) state_descriptors_fixed();
			var s = sources.get(prop);
			if (s === void 0) with_parent(() => {
				var s = /* @__PURE__ */ state(descriptor.value, stack);
				sources.set(prop, s);
				return s;
			});
			else set(s, descriptor.value, true);
			return true;
		},
		deleteProperty(target, prop) {
			var s = sources.get(prop);
			if (s === void 0) {
				if (prop in target) {
					const s = with_parent(() => /* @__PURE__ */ state(UNINITIALIZED, stack));
					sources.set(prop, s);
					increment(version);
				}
			} else {
				set(s, UNINITIALIZED);
				increment(version);
			}
			return true;
		},
		get(target, prop, receiver) {
			if (prop === STATE_SYMBOL) return value;
			var s = sources.get(prop);
			var exists = prop in target;
			if (s === void 0 && (!exists || get_descriptor(target, prop)?.writable)) {
				s = with_parent(() => {
					return /* @__PURE__ */ state(proxy(exists ? target[prop] : UNINITIALIZED), stack);
				});
				sources.set(prop, s);
			}
			if (s !== void 0) {
				var v = get(s);
				return v === UNINITIALIZED ? void 0 : v;
			}
			return Reflect.get(target, prop, receiver);
		},
		getOwnPropertyDescriptor(target, prop) {
			var descriptor = Reflect.getOwnPropertyDescriptor(target, prop);
			if (descriptor && "value" in descriptor) {
				var s = sources.get(prop);
				if (s) descriptor.value = get(s);
			} else if (descriptor === void 0) {
				var source = sources.get(prop);
				var value = source?.v;
				if (source !== void 0 && value !== UNINITIALIZED) return {
					enumerable: true,
					configurable: true,
					value,
					writable: true
				};
			}
			return descriptor;
		},
		has(target, prop) {
			if (prop === STATE_SYMBOL) return true;
			var s = sources.get(prop);
			var has = s !== void 0 && s.v !== UNINITIALIZED || Reflect.has(target, prop);
			if (s !== void 0 || active_effect !== null && (!has || get_descriptor(target, prop)?.writable)) {
				if (s === void 0) {
					s = with_parent(() => {
						return /* @__PURE__ */ state(has ? proxy(target[prop]) : UNINITIALIZED, stack);
					});
					sources.set(prop, s);
				}
				if (get(s) === UNINITIALIZED) return false;
			}
			return has;
		},
		set(target, prop, value, receiver) {
			var s = sources.get(prop);
			var has = prop in target;
			if (is_proxied_array && prop === "length") for (var i = value; i < s.v; i += 1) {
				var other_s = sources.get(i + "");
				if (other_s !== void 0) set(other_s, UNINITIALIZED);
				else if (i in target) {
					other_s = with_parent(() => /* @__PURE__ */ state(UNINITIALIZED, stack));
					sources.set(i + "", other_s);
				}
			}
			if (s === void 0) {
				if (!has || get_descriptor(target, prop)?.writable) {
					s = with_parent(() => /* @__PURE__ */ state(void 0, stack));
					set(s, proxy(value));
					sources.set(prop, s);
				}
			} else {
				has = s.v !== UNINITIALIZED;
				var p = with_parent(() => proxy(value));
				set(s, p);
			}
			var descriptor = Reflect.getOwnPropertyDescriptor(target, prop);
			if (descriptor?.set) descriptor.set.call(receiver, value);
			if (!has) {
				if (is_proxied_array && typeof prop === "string") {
					var ls = sources.get("length");
					var n = Number(prop);
					if (Number.isInteger(n) && n >= ls.v) set(ls, n + 1);
				}
				increment(version);
			}
			return true;
		},
		ownKeys(target) {
			get(version);
			var own_keys = Reflect.ownKeys(target).filter((key) => {
				var source = sources.get(key);
				return source === void 0 || source.v !== UNINITIALIZED;
			});
			for (var [key, source] of sources) if (source.v !== UNINITIALIZED && !(key in target)) own_keys.push(key);
			return own_keys;
		},
		setPrototypeOf() {
			state_prototype_fixed();
		}
	});
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/operations.js
/** @import { Effect, TemplateNode } from '#client' */
/** @type {Window} */
var $window;
/** @type {boolean} */
var is_firefox;
/** @type {() => Node | null} */
var first_child_getter;
/** @type {() => Node | null} */
var next_sibling_getter;
/**
* Initialize these lazily to avoid issues when using the runtime in a server context
* where these globals are not available while avoiding a separate server entry point
*/
function init_operations() {
	if ($window !== void 0) return;
	$window = window;
	is_firefox = /Firefox/.test(navigator.userAgent);
	var element_prototype = Element.prototype;
	var node_prototype = Node.prototype;
	var text_prototype = Text.prototype;
	first_child_getter = get_descriptor(node_prototype, "firstChild").get;
	next_sibling_getter = get_descriptor(node_prototype, "nextSibling").get;
	if (is_extensible(element_prototype)) {
		/** @type {any} */ element_prototype[CLASS_CACHE] = void 0;
		/** @type {any} */ element_prototype[ATTRIBUTES_CACHE] = null;
		/** @type {any} */ element_prototype[STYLE_CACHE] = void 0;
		element_prototype.__e = void 0;
	}
	if (is_extensible(text_prototype))
 /** @type {any} */ text_prototype[TEXT_CACHE] = void 0;
}
/**
* @param {string} value
* @returns {Text}
*/
function create_text(value = "") {
	return document.createTextNode(value);
}
/**
* @template {Node} N
* @param {N} node
*/
/*@__NO_SIDE_EFFECTS__*/
function get_first_child(node) {
	return first_child_getter.call(node);
}
/**
* @template {Node} N
* @param {N} node
*/
/*@__NO_SIDE_EFFECTS__*/
function get_next_sibling(node) {
	return next_sibling_getter.call(node);
}
/**
* Don't mark this as side-effect-free, hydration needs to walk all nodes
* @template {Node} N
* @param {N} node
* @param {boolean} is_text
* @returns {TemplateNode | null}
*/
function child(node, is_text) {
	if (!hydrating) return /* @__PURE__ */ get_first_child(node);
	var child = /* @__PURE__ */ get_first_child(hydrate_node);
	if (child === null) child = hydrate_node.appendChild(create_text());
	else if (is_text && child.nodeType !== 3) {
		var text = create_text();
		child?.before(text);
		set_hydrate_node(text);
		return text;
	}
	if (is_text) merge_text_nodes(child);
	set_hydrate_node(child);
	return child;
}
/**
* Don't mark this as side-effect-free, hydration needs to walk all nodes
* @param {TemplateNode} node
* @param {boolean} [is_text]
* @returns {TemplateNode | null}
*/
function first_child(node, is_text = false) {
	if (!hydrating) {
		var first = /* @__PURE__ */ get_first_child(node);
		if (first instanceof Comment && first.data === "") return /* @__PURE__ */ get_next_sibling(first);
		return first;
	}
	if (is_text) {
		if (hydrate_node?.nodeType !== 3) {
			var text = create_text();
			hydrate_node?.before(text);
			set_hydrate_node(text);
			return text;
		}
		merge_text_nodes(hydrate_node);
	}
	return hydrate_node;
}
/**
* Don't mark this as side-effect-free, hydration needs to walk all nodes
* @param {TemplateNode} node
* @param {number} count
* @param {boolean} is_text
* @returns {TemplateNode | null}
*/
function sibling(node, count = 1, is_text = false) {
	let next_sibling = hydrating ? hydrate_node : node;
	var last_sibling;
	while (count--) {
		last_sibling = next_sibling;
		next_sibling = /* @__PURE__ */ get_next_sibling(next_sibling);
	}
	if (!hydrating) return next_sibling;
	if (is_text) {
		if (next_sibling?.nodeType !== 3) {
			var text = create_text();
			if (next_sibling === null) last_sibling?.after(text);
			else next_sibling.before(text);
			set_hydrate_node(text);
			return text;
		}
		merge_text_nodes(next_sibling);
	}
	set_hydrate_node(next_sibling);
	return next_sibling;
}
/**
* @template {Node} N
* @param {N} node
* @returns {void}
*/
function clear_text_content(node) {
	node.textContent = "";
}
/**
* Returns `true` if we're updating the current block, for example `condition` in
* an `{#if condition}` block just changed. In this case, the branch should be
* appended (or removed) at the same time as other updates within the
* current `<svelte:boundary>`
*/
function should_defer_append() {
	if (!async_mode_flag) return false;
	if (eager_block_effects !== null) return false;
	return (active_effect.f & REACTION_RAN) !== 0;
}
/**
* Branching here is intentional and load-bearing for perf. `createElement(tag)`
* hits a fast path in Blink that `createElementNS(NAMESPACE_HTML, tag)` doesn't,
* and passing an explicit `undefined` as the trailing options arg measurably
* slows both APIs. Funnelling every case through a single `createElementNS(ns,
* tag, options)` call would be smaller but slower on the HTML path.
*
* @template {keyof HTMLElementTagNameMap | string} T
* @param {T} tag
* @param {string} [namespace]
* @param {string} [is]
* @returns {T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] : Element}
*/
function create_element(tag, namespace, is) {
	if (namespace == null || namespace === "http://www.w3.org/1999/xhtml") return is ? document.createElement(tag, { is }) : document.createElement(tag);
	return is ? document.createElementNS(namespace, tag, { is }) : document.createElementNS(namespace, tag);
}
/**
* Browsers split text nodes larger than 65536 bytes when parsing.
* For hydration to succeed, we need to stitch them back together
* @param {Text} text
*/
function merge_text_nodes(text) {
	if (text.nodeValue.length < 65536) return;
	let next = text.nextSibling;
	while (next !== null && next.nodeType === 3) {
		next.remove();
		/** @type {string} */ text.nodeValue += next.nodeValue;
		next = text.nextSibling;
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/effects.js
/** @import { Blocker, ComponentContext, ComponentContextLegacy, Derived, Effect, TemplateNode, TransitionManager } from '#client' */
/**
* @param {'$effect' | '$effect.pre' | '$inspect'} rune
*/
function validate_effect(rune) {
	if (active_effect === null) {
		if (active_reaction === null) effect_orphan(rune);
		effect_in_unowned_derived();
	}
	if (is_destroying_effect) effect_in_teardown(rune);
}
/**
* @param {Effect} effect
* @param {Effect} parent_effect
*/
function push_effect(effect, parent_effect) {
	var parent_last = parent_effect.last;
	if (parent_last === null) parent_effect.last = parent_effect.first = effect;
	else {
		parent_last.next = effect;
		effect.prev = parent_last;
		parent_effect.last = effect;
	}
}
/**
* @param {number} type
* @param {null | (() => void | (() => void))} fn
* @returns {Effect}
*/
function create_effect(type, fn) {
	var parent = active_effect;
	if (parent !== null && (parent.f & 8192) !== 0) type |= INERT;
	/** @type {Effect} */
	var effect = {
		ctx: component_context,
		deps: null,
		nodes: null,
		f: type | DIRTY | 512,
		first: null,
		fn,
		last: null,
		next: null,
		parent,
		b: parent && parent.b,
		prev: null,
		teardown: null,
		wv: 0,
		ac: null
	};
	current_batch?.register_created_effect(effect);
	/** @type {Effect | null} */
	var e = effect;
	if ((type & 4) !== 0) if (collected_effects !== null) collected_effects.push(effect);
	else Batch.ensure().schedule(effect);
	else if (fn !== null) {
		try {
			update_effect(effect);
		} catch (e) {
			destroy_effect(effect);
			throw e;
		}
		if (e.deps === null && e.teardown === null && e.nodes === null && e.first === e.last && (e.f & 524288) === 0) {
			e = e.first;
			if ((type & 16) !== 0 && (type & 65536) !== 0 && e !== null) e.f |= EFFECT_TRANSPARENT;
		}
	}
	if (e !== null) {
		e.parent = parent;
		if (parent !== null) push_effect(e, parent);
		if (active_reaction !== null && (active_reaction.f & 2) !== 0 && (type & 64) === 0) {
			var derived = active_reaction;
			(derived.effects ??= []).push(e);
		}
	}
	return effect;
}
/**
* Internal representation of `$effect.tracking()`
* @returns {boolean}
*/
function effect_tracking() {
	return active_reaction !== null && !untracking;
}
/**
* @param {() => void} fn
*/
function teardown(fn) {
	const effect = create_effect(8, null);
	set_signal_status(effect, CLEAN);
	effect.teardown = fn;
	return effect;
}
/**
* Internal representation of `$effect(...)`
* @param {() => void | (() => void)} fn
*/
function user_effect(fn) {
	validate_effect("$effect");
	var flags = active_effect.f;
	if (!active_reaction && (flags & 32) !== 0 && component_context !== null && !component_context.i) {
		var context = component_context;
		(context.e ??= []).push(fn);
	} else return create_user_effect(fn);
}
/**
* @param {() => void | (() => void)} fn
*/
function create_user_effect(fn) {
	return create_effect(4 | USER_EFFECT, fn);
}
/**
* Internal representation of `$effect.root(...)`
* @param {() => void | (() => void)} fn
* @returns {() => void}
*/
function effect_root(fn) {
	Batch.ensure();
	const effect = create_effect(64 | EFFECT_PRESERVED, fn);
	return () => {
		destroy_effect(effect);
	};
}
/**
* An effect root whose children can transition out
* @param {() => void} fn
* @returns {(options?: { outro?: boolean }) => Promise<void>}
*/
function component_root(fn) {
	Batch.ensure();
	const effect = create_effect(64 | EFFECT_PRESERVED, fn);
	return (options = {}) => {
		return new Promise((fulfil) => {
			if (options.outro) pause_effect(effect, () => {
				destroy_effect(effect);
				fulfil(void 0);
			});
			else {
				destroy_effect(effect);
				fulfil(void 0);
			}
		});
	};
}
/**
* @param {() => void | (() => void)} fn
* @returns {Effect}
*/
function effect(fn) {
	return create_effect(4, fn);
}
/**
* @param {() => void | (() => void)} fn
* @returns {Effect}
*/
function async_effect(fn) {
	return create_effect(ASYNC | EFFECT_PRESERVED, fn);
}
/**
* @param {() => void | (() => void)} fn
* @returns {Effect}
*/
function render_effect(fn, flags = 0) {
	return create_effect(8 | flags, fn);
}
/**
* @param {(...expressions: any) => void | (() => void)} fn
* @param {Array<() => any>} sync
* @param {Array<() => Promise<any>>} async
* @param {Blocker[]} blockers
*/
function template_effect(fn, sync = [], async = [], blockers = []) {
	flatten(blockers, sync, async, (values) => {
		create_effect(8, () => {
			fn(...values.map(get));
		});
	});
}
/**
* @param {(() => void)} fn
* @param {number} flags
*/
function block(fn, flags = 0) {
	return create_effect(16 | flags, fn);
}
/**
* @param {(() => void)} fn
*/
function branch(fn) {
	return create_effect(32 | EFFECT_PRESERVED, fn);
}
/**
* @param {Effect} effect
*/
function execute_effect_teardown(effect) {
	var teardown = effect.teardown;
	if (teardown !== null) {
		const previously_destroying_effect = is_destroying_effect;
		const previous_reaction = active_reaction;
		set_is_destroying_effect(true);
		set_active_reaction(null);
		try {
			teardown.call(null);
		} finally {
			set_is_destroying_effect(previously_destroying_effect);
			set_active_reaction(previous_reaction);
		}
	}
}
/**
* @param {Effect} signal
* @param {boolean} remove_dom
* @returns {void}
*/
function destroy_effect_children(signal, remove_dom = false) {
	var effect = signal.first;
	signal.first = signal.last = null;
	while (effect !== null) {
		const controller = effect.ac;
		if (controller !== null) without_reactive_context(() => {
			controller.abort(STALE_REACTION);
		});
		var next = effect.next;
		if ((effect.f & 64) !== 0) effect.parent = null;
		else destroy_effect(effect, remove_dom);
		effect = next;
	}
}
/**
* @param {Effect} signal
* @returns {void}
*/
function destroy_block_effect_children(signal) {
	var effect = signal.first;
	while (effect !== null) {
		var next = effect.next;
		if ((effect.f & 32) === 0) destroy_effect(effect);
		effect = next;
	}
}
/**
* @param {Effect} effect
* @param {boolean} [remove_dom]
* @returns {void}
*/
function destroy_effect(effect, remove_dom = true) {
	var removed = false;
	if ((remove_dom || (effect.f & 262144) !== 0) && effect.nodes !== null && effect.nodes.end !== null) {
		remove_effect_dom(effect.nodes.start, effect.nodes.end);
		removed = true;
	}
	effect.f |= DESTROYING;
	destroy_effect_children(effect, remove_dom && !removed);
	remove_reactions(effect, 0);
	var transitions = effect.nodes && effect.nodes.t;
	if (transitions !== null) for (const transition of transitions) transition.stop();
	execute_effect_teardown(effect);
	effect.f ^= DESTROYING;
	effect.f |= DESTROYED;
	var parent = effect.parent;
	if (parent !== null && parent.first !== null) unlink_effect(effect);
	effect.next = effect.prev = effect.teardown = effect.ctx = effect.deps = effect.fn = effect.nodes = effect.ac = effect.b = null;
}
/**
*
* @param {TemplateNode | null} node
* @param {TemplateNode} end
*/
function remove_effect_dom(node, end) {
	while (node !== null) {
		/** @type {TemplateNode | null} */
		var next = node === end ? null : /* @__PURE__ */ get_next_sibling(node);
		node.remove();
		node = next;
	}
}
/**
* Detach an effect from the effect tree, freeing up memory and
* reducing the amount of work that happens on subsequent traversals
* @param {Effect} effect
*/
function unlink_effect(effect) {
	var parent = effect.parent;
	var prev = effect.prev;
	var next = effect.next;
	if (prev !== null) prev.next = next;
	if (next !== null) next.prev = prev;
	if (parent !== null) {
		if (parent.first === effect) parent.first = next;
		if (parent.last === effect) parent.last = prev;
	}
}
/**
* When a block effect is removed, we don't immediately destroy it or yank it
* out of the DOM, because it might have transitions. Instead, we 'pause' it.
* It stays around (in memory, and in the DOM) until outro transitions have
* completed, and if the state change is reversed then we _resume_ it.
* A paused effect does not update, and the DOM subtree becomes inert.
* @param {Effect} effect
* @param {() => void} [callback]
* @param {boolean} [destroy]
*/
function pause_effect(effect, callback, destroy = true) {
	/** @type {TransitionManager[]} */
	var transitions = [];
	pause_children(effect, transitions, true);
	var fn = () => {
		if (destroy) destroy_effect(effect);
		if (callback) callback();
	};
	var remaining = transitions.length;
	if (remaining > 0) {
		var check = () => --remaining || fn();
		for (var transition of transitions) transition.out(check);
	} else fn();
}
/**
* @param {Effect} effect
* @param {TransitionManager[]} transitions
* @param {boolean} local
*/
function pause_children(effect, transitions, local) {
	if ((effect.f & 8192) !== 0) return;
	effect.f ^= INERT;
	var t = effect.nodes && effect.nodes.t;
	if (t !== null) {
		for (const transition of t) if (transition.is_global || local) transitions.push(transition);
	}
	var child = effect.first;
	while (child !== null) {
		var sibling = child.next;
		if ((child.f & 64) === 0) {
			var transparent = (child.f & 65536) !== 0 || (child.f & 32) !== 0 && (effect.f & 16) !== 0;
			pause_children(child, transitions, transparent ? local : false);
		}
		child = sibling;
	}
}
/**
* The opposite of `pause_effect`. We call this if (for example)
* `x` becomes falsy then truthy: `{#if x}...{/if}`
* @param {Effect} effect
*/
function resume_effect(effect) {
	resume_children(effect, true);
}
/**
* @param {Effect} effect
* @param {boolean} local
*/
function resume_children(effect, local) {
	if ((effect.f & 8192) === 0) return;
	effect.f ^= INERT;
	if ((effect.f & 1024) === 0) {
		set_signal_status(effect, DIRTY);
		Batch.ensure().schedule(effect);
	}
	var child = effect.first;
	while (child !== null) {
		var sibling = child.next;
		var transparent = (child.f & 65536) !== 0 || (child.f & 32) !== 0;
		resume_children(child, transparent ? local : false);
		child = sibling;
	}
	var t = effect.nodes && effect.nodes.t;
	if (t !== null) {
		for (const transition of t) if (transition.is_global || local) transition.in();
	}
}
/**
* @param {Effect} effect
* @param {DocumentFragment} fragment
*/
function move_effect(effect, fragment) {
	if (!effect.nodes) return;
	/** @type {TemplateNode | null} */
	var node = effect.nodes.start;
	var end = effect.nodes.end;
	while (node !== null) {
		/** @type {TemplateNode | null} */
		var next = node === end ? null : /* @__PURE__ */ get_next_sibling(node);
		fragment.append(node);
		node = next;
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/legacy.js
/**
* @type {Set<Value> | null}
* @deprecated
*/
var captured_signals = null;
//#endregion
//#region node_modules/svelte/src/internal/client/runtime.js
/** @import { Derived, Effect, Reaction, Source, Value } from '#client' */
/**
* True if updating in an effect context that is reactive (i.e. not branch/root effects)
*/
var is_updating_effect = false;
var is_destroying_effect = false;
/** @param {boolean} value */
function set_is_destroying_effect(value) {
	is_destroying_effect = value;
}
/** @type {null | Reaction} */
var active_reaction = null;
var untracking = false;
/** @param {null | Reaction} reaction */
function set_active_reaction(reaction) {
	active_reaction = reaction;
}
/** @type {null | Effect} */
var active_effect = null;
/** @param {null | Effect} effect */
function set_active_effect(effect) {
	active_effect = effect;
}
/**
* When sources are created within a reaction, reading and writing
* them within that reaction should not cause a re-run
* @type {null | Set<Source>}
*/
var current_sources = null;
/** @param {Value} value */
function push_reaction_value(value) {
	if (active_reaction !== null && (!async_mode_flag || (active_reaction.f & 2) !== 0)) (current_sources ??= /* @__PURE__ */ new Set()).add(value);
}
/**
* The dependencies of the reaction that is currently being executed. In many cases,
* the dependencies are unchanged between runs, and so this will be `null` unless
* and until a new dependency is accessed — we track this via `skipped_deps`
* @type {null | Value[]}
*/
var new_deps = null;
var skipped_deps = 0;
/**
* Tracks writes that the effect it's executed in doesn't listen to yet,
* so that the dependency can be added to the effect later on if it then reads it
* @type {null | Source[]}
*/
var untracked_writes = null;
/** @param {null | Source[]} value */
function set_untracked_writes(value) {
	untracked_writes = value;
}
/**
* @type {number} Used by sources and deriveds for handling updates.
* Version starts from 1 so that unowned deriveds differentiate between a created effect and a run one for tracing
**/
var write_version = 1;
/** @type {number} Used to version each read of a source of derived to avoid duplicating depedencies inside a reaction */
var read_version = 0;
var update_version = read_version;
/** @param {number} value */
function set_update_version(value) {
	update_version = value;
}
function increment_write_version() {
	return ++write_version;
}
/**
* Determines whether a derived or effect is dirty.
* If it is MAYBE_DIRTY, will set the status to CLEAN
* @param {Reaction} reaction
* @returns {boolean}
*/
function is_dirty(reaction) {
	var flags = reaction.f;
	if ((flags & 2048) !== 0) return true;
	if (flags & 2) reaction.f &= ~WAS_MARKED;
	if ((flags & 4096) !== 0) {
		var dependencies = reaction.deps;
		var length = dependencies.length;
		for (var i = 0; i < length; i++) {
			var dependency = dependencies[i];
			if (is_dirty(dependency)) update_derived(dependency);
			if (dependency.wv > reaction.wv) return true;
		}
		if ((flags & 512) !== 0 && batch_values === null) set_signal_status(reaction, CLEAN);
	}
	return false;
}
/**
* @param {Value} signal
* @param {Effect} effect
* @param {boolean} [root]
*/
function schedule_possible_effect_self_invalidation(signal, effect, root = true) {
	var reactions = signal.reactions;
	if (reactions === null) return;
	if (!async_mode_flag && current_sources !== null && current_sources.has(signal)) return;
	for (var i = 0; i < reactions.length; i++) {
		var reaction = reactions[i];
		if ((reaction.f & 2) !== 0) schedule_possible_effect_self_invalidation(reaction, effect, false);
		else if (effect === reaction) {
			if (root) set_signal_status(reaction, DIRTY);
			else if ((reaction.f & 1024) !== 0) set_signal_status(reaction, MAYBE_DIRTY);
			schedule_effect(reaction);
		}
	}
}
/** @param {Reaction} reaction */
function update_reaction(reaction) {
	var previous_deps = new_deps;
	var previous_skipped_deps = skipped_deps;
	var previous_untracked_writes = untracked_writes;
	var previous_reaction = active_reaction;
	var previous_sources = current_sources;
	var previous_component_context = component_context;
	var previous_untracking = untracking;
	var previous_update_version = update_version;
	var flags = reaction.f;
	new_deps = null;
	skipped_deps = 0;
	untracked_writes = null;
	active_reaction = (flags & 96) === 0 ? reaction : null;
	current_sources = null;
	set_component_context(reaction.ctx);
	untracking = false;
	update_version = ++read_version;
	if (reaction.ac !== null) {
		without_reactive_context(() => {
			/** @type {AbortController} */ reaction.ac.abort(STALE_REACTION);
		});
		reaction.ac = null;
	}
	try {
		reaction.f |= REACTION_IS_UPDATING;
		var fn = reaction.fn;
		var result = fn();
		reaction.f |= REACTION_RAN;
		var deps = reaction.deps;
		var is_fork = current_batch?.is_fork;
		if (new_deps !== null) {
			var i;
			if (!is_fork) remove_reactions(reaction, skipped_deps);
			if (deps !== null && skipped_deps > 0) {
				deps.length = skipped_deps + new_deps.length;
				for (i = 0; i < new_deps.length; i++) deps[skipped_deps + i] = new_deps[i];
			} else reaction.deps = deps = new_deps;
			if (effect_tracking() && (reaction.f & 512) !== 0) for (i = skipped_deps; i < deps.length; i++) (deps[i].reactions ??= []).push(reaction);
		} else if (!is_fork && deps !== null && skipped_deps < deps.length) {
			remove_reactions(reaction, skipped_deps);
			deps.length = skipped_deps;
		}
		if (is_runes() && untracked_writes !== null && !untracking && deps !== null && (reaction.f & 6146) === 0) for (i = 0; i < untracked_writes.length; i++) schedule_possible_effect_self_invalidation(untracked_writes[i], reaction);
		if (previous_reaction !== null && previous_reaction !== reaction) {
			read_version++;
			if (previous_reaction.deps !== null) for (let i = 0; i < previous_skipped_deps; i += 1) previous_reaction.deps[i].rv = read_version;
			if (previous_deps !== null) for (const dep of previous_deps) dep.rv = read_version;
			if (untracked_writes !== null) if (previous_untracked_writes === null) previous_untracked_writes = untracked_writes;
			else previous_untracked_writes.push(...untracked_writes);
		}
		if ((reaction.f & 8388608) !== 0) reaction.f ^= ERROR_VALUE;
		return result;
	} catch (error) {
		return handle_error(error);
	} finally {
		reaction.f ^= REACTION_IS_UPDATING;
		new_deps = previous_deps;
		skipped_deps = previous_skipped_deps;
		untracked_writes = previous_untracked_writes;
		active_reaction = previous_reaction;
		current_sources = previous_sources;
		set_component_context(previous_component_context);
		untracking = previous_untracking;
		update_version = previous_update_version;
	}
}
/**
* @template V
* @param {Reaction} signal
* @param {Value<V>} dependency
* @returns {void}
*/
function remove_reaction(signal, dependency) {
	let reactions = dependency.reactions;
	if (reactions !== null) {
		var index = index_of.call(reactions, signal);
		if (index !== -1) {
			var new_length = reactions.length - 1;
			if (new_length === 0) reactions = dependency.reactions = null;
			else {
				reactions[index] = reactions[new_length];
				reactions.pop();
			}
		}
	}
	if (reactions === null && (dependency.f & 2) !== 0 && (new_deps === null || !includes.call(new_deps, dependency))) {
		var derived = dependency;
		if ((derived.f & 512) !== 0) {
			derived.f ^= 512;
			derived.f &= ~WAS_MARKED;
		}
		if (derived.v !== UNINITIALIZED) update_derived_status(derived);
		if (derived.ac !== null) without_reactive_context(() => {
			/** @type {AbortController} */ derived.ac.abort(STALE_REACTION);
			derived.ac = null;
			set_signal_status(derived, DIRTY);
		});
		freeze_derived_effects(derived);
		remove_reactions(derived, 0);
	}
}
/**
* @param {Reaction} signal
* @param {number} start_index
* @returns {void}
*/
function remove_reactions(signal, start_index) {
	var dependencies = signal.deps;
	if (dependencies === null) return;
	for (var i = start_index; i < dependencies.length; i++) remove_reaction(signal, dependencies[i]);
}
/**
* @param {Effect} effect
* @returns {void}
*/
function update_effect(effect) {
	var flags = effect.f;
	if ((flags & 16384) !== 0) return;
	set_signal_status(effect, CLEAN);
	var previous_effect = active_effect;
	var was_updating_effect = is_updating_effect;
	active_effect = effect;
	is_updating_effect = (flags & 96) === 0;
	try {
		if ((flags & 16777232) !== 0) destroy_block_effect_children(effect);
		else destroy_effect_children(effect);
		execute_effect_teardown(effect);
		var teardown = update_reaction(effect);
		effect.teardown = typeof teardown === "function" ? teardown : null;
		effect.wv = write_version;
	} finally {
		is_updating_effect = was_updating_effect;
		active_effect = previous_effect;
	}
}
/**
* @template V
* @param {Value<V>} signal
* @returns {V}
*/
function get(signal) {
	var is_derived = (signal.f & 2) !== 0;
	captured_signals?.add(signal);
	if (active_reaction !== null && !untracking) {
		if (!(active_effect !== null && (active_effect.f & 16384) !== 0) && (current_sources === null || !current_sources.has(signal))) {
			var deps = active_reaction.deps;
			if ((active_reaction.f & 2097152) !== 0) {
				if (signal.rv < read_version) {
					signal.rv = read_version;
					if (new_deps === null && deps !== null && deps[skipped_deps] === signal) skipped_deps++;
					else if (new_deps === null) new_deps = [signal];
					else new_deps.push(signal);
				}
			} else {
				active_reaction.deps ??= [];
				if (!includes.call(active_reaction.deps, signal)) active_reaction.deps.push(signal);
				var reactions = signal.reactions;
				if (reactions === null) signal.reactions = [active_reaction];
				else if (!includes.call(reactions, active_reaction)) reactions.push(active_reaction);
			}
		}
	}
	if (is_destroying_effect && old_values.has(signal)) return old_values.get(signal);
	if (is_derived) {
		var derived = signal;
		if (is_destroying_effect) {
			var value = derived.v;
			if ((derived.f & 1024) === 0 && derived.reactions !== null || depends_on_old_values(derived)) value = execute_derived(derived);
			old_values.set(derived, value);
			return value;
		}
		var should_connect = (derived.f & 512) === 0 && !untracking && active_reaction !== null && (is_updating_effect || (active_reaction.f & 512) !== 0);
		var is_new = (derived.f & REACTION_RAN) === 0;
		if (is_dirty(derived)) {
			if (should_connect) derived.f |= 512;
			update_derived(derived);
		}
		if (should_connect && !is_new) {
			unfreeze_derived_effects(derived);
			reconnect(derived);
		}
	}
	if (batch_values?.has(signal)) return batch_values.get(signal);
	if ((signal.f & 8388608) !== 0) throw signal.v;
	return signal.v;
}
/**
* (Re)connect a disconnected derived, so that it is notified
* of changes in `mark_reactions`
* @param {Derived} derived
*/
function reconnect(derived) {
	derived.f |= 512;
	if (derived.deps === null) return;
	for (const dep of derived.deps) {
		(dep.reactions ??= []).push(derived);
		if ((dep.f & 2) !== 0 && (dep.f & 512) === 0) {
			unfreeze_derived_effects(dep);
			reconnect(dep);
		}
	}
}
/** @param {Derived} derived */
function depends_on_old_values(derived) {
	if (derived.v === UNINITIALIZED) return true;
	if (derived.deps === null) return false;
	for (const dep of derived.deps) {
		if (old_values.has(dep)) return true;
		if ((dep.f & 2) !== 0 && depends_on_old_values(dep)) return true;
	}
	return false;
}
/**
* When used inside a [`$derived`](https://svelte.dev/docs/svelte/$derived) or [`$effect`](https://svelte.dev/docs/svelte/$effect),
* any state read inside `fn` will not be treated as a dependency.
*
* ```ts
* $effect(() => {
*   // this will run when `data` changes, but not when `time` changes
*   save(data, {
*     timestamp: untrack(() => time)
*   });
* });
* ```
* @template T
* @param {() => T} fn
* @returns {T}
*/
function untrack(fn) {
	var previous_untracking = untracking;
	try {
		untracking = true;
		return fn();
	} finally {
		untracking = previous_untracking;
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/events.js
/**
* Used on elements, as a map of event type -> event handler,
* and on events themselves to track which element handled an event
*/
var event_symbol = Symbol("events");
/** @type {Set<string>} */
var all_registered_events = /* @__PURE__ */ new Set();
/** @type {Set<(events: Array<string>) => void>} */
var root_event_handles = /* @__PURE__ */ new Set();
/**
* @param {string} event_name
* @param {Element} element
* @param {EventListener} [handler]
* @returns {void}
*/
function delegated(event_name, element, handler) {
	(element[event_symbol] ??= {})[event_name] = handler;
}
/**
* @param {Array<string>} events
* @returns {void}
*/
function delegate(events) {
	for (var i = 0; i < events.length; i++) all_registered_events.add(events[i]);
	for (var fn of root_event_handles) fn(events);
}
var last_propagated_event = null;
/**
* @this {EventTarget}
* @param {Event} event
* @returns {void}
*/
function handle_event_propagation(event) {
	var handler_element = this;
	var owner_document = handler_element.ownerDocument;
	var event_name = event.type;
	var path = event.composedPath?.() || [];
	var current_target = path[0] || event.target;
	last_propagated_event = event;
	var path_idx = 0;
	var handled_at = last_propagated_event === event && event[event_symbol];
	if (handled_at) {
		var at_idx = path.indexOf(handled_at);
		if (at_idx !== -1 && (handler_element === document || handler_element === window)) {
			event[event_symbol] = handler_element;
			return;
		}
		var handler_idx = path.indexOf(handler_element);
		if (handler_idx === -1) return;
		if (at_idx <= handler_idx) path_idx = at_idx;
	}
	current_target = path[path_idx] || event.target;
	if (current_target === handler_element) return;
	define_property(event, "currentTarget", {
		configurable: true,
		get() {
			return current_target || owner_document;
		}
	});
	var previous_reaction = active_reaction;
	var previous_effect = active_effect;
	set_active_reaction(null);
	set_active_effect(null);
	try {
		/**
		* @type {unknown}
		*/
		var throw_error;
		/**
		* @type {unknown[]}
		*/
		var other_errors = [];
		while (current_target !== null) {
			if (current_target === handler_element) break;
			try {
				var delegated = current_target[event_symbol]?.[event_name];
				if (delegated != null && (!current_target.disabled || event.target === current_target)) delegated.call(current_target, event);
			} catch (error) {
				if (throw_error) other_errors.push(error);
				else throw_error = error;
			}
			if (event.cancelBubble) break;
			path_idx++;
			current_target = path_idx < path.length ? path[path_idx] : null;
		}
		if (throw_error) {
			for (let error of other_errors) queueMicrotask(() => {
				throw error;
			});
			throw throw_error;
		}
	} finally {
		event[event_symbol] = handler_element;
		delete event.currentTarget;
		set_active_reaction(previous_reaction);
		set_active_effect(previous_effect);
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/reconciler.js
var policy = globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", { 
/** @param {string} html */
createHTML: (html) => {
	return html;
} });
/** @param {string} html */
function create_trusted_html(html) {
	return policy?.createHTML(html) ?? html;
}
/**
* @param {string} html
*/
function create_fragment_from_html(html) {
	var elem = create_element("template");
	elem.innerHTML = create_trusted_html(html.replaceAll("<!>", "<!---->"));
	return elem.content;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/template.js
/** @import { Effect, EffectNodes, TemplateNode } from '#client' */
/** @import { TemplateStructure } from './types' */
/**
* @param {TemplateNode} start
* @param {TemplateNode | null} end
*/
function assign_nodes(start, end) {
	var effect = active_effect;
	if (effect.nodes === null) effect.nodes = {
		start,
		end,
		a: null,
		t: null
	};
}
/**
* @param {string} content
* @param {number} flags
* @returns {() => Node | Node[]}
*/
/*#__NO_SIDE_EFFECTS__*/
function from_html(content, flags) {
	var is_fragment = (flags & 1) !== 0;
	var use_import_node = (flags & 2) !== 0;
	/** @type {Node} */
	var node;
	/**
	* Whether or not the first item is a text/element node. If not, we need to
	* create an additional comment node to act as `effect.nodes.start`
	*/
	var has_start = !content.startsWith("<!>");
	return () => {
		if (hydrating) {
			assign_nodes(hydrate_node, null);
			return hydrate_node;
		}
		if (node === void 0) {
			node = create_fragment_from_html(has_start ? content : "<!>" + content);
			if (!is_fragment) node = /* @__PURE__ */ get_first_child(node);
		}
		var clone = use_import_node || is_firefox ? document.importNode(node, true) : node.cloneNode(true);
		if (is_fragment) {
			var start = /* @__PURE__ */ get_first_child(clone);
			var end = clone.lastChild;
			assign_nodes(start, end);
		} else assign_nodes(clone, clone);
		return clone;
	};
}
/**
* Don't mark this as side-effect-free, hydration needs to walk all nodes
* @param {any} value
*/
function text(value = "") {
	if (!hydrating) {
		var t = create_text(value + "");
		assign_nodes(t, t);
		return t;
	}
	var node = hydrate_node;
	if (node.nodeType !== 3) {
		node.before(node = create_text());
		set_hydrate_node(node);
	} else merge_text_nodes(node);
	assign_nodes(node, node);
	return node;
}
/**
* @returns {TemplateNode | DocumentFragment}
*/
function comment() {
	if (hydrating) {
		assign_nodes(hydrate_node, null);
		return hydrate_node;
	}
	var frag = document.createDocumentFragment();
	var start = document.createComment("");
	var anchor = create_text();
	frag.append(start, anchor);
	assign_nodes(start, anchor);
	return frag;
}
/**
* Assign the created (or in hydration mode, traversed) dom elements to the current block
* and insert the elements into the dom (in client mode).
* @param {Text | Comment | Element} anchor
* @param {DocumentFragment | Element} dom
*/
function append(anchor, dom) {
	if (hydrating) {
		var effect = active_effect;
		if ((effect.f & 32768) === 0 || effect.nodes.end === null) effect.nodes.end = hydrate_node;
		hydrate_next();
		return;
	}
	if (anchor === null) return;
	anchor.before(dom);
}
/**
* Subset of delegated events which should be passive by default.
* These two are already passive via browser defaults on window, document and body.
* But since
* - we're delegating them
* - they happen often
* - they apply to mobile which is generally less performant
* we're marking them as passive by default for other elements, too.
*/
var PASSIVE_EVENTS = ["touchstart", "touchmove"];
/**
* Returns `true` if `name` is a passive event
* @param {string} name
*/
function is_passive_event(name) {
	return PASSIVE_EVENTS.includes(name);
}
/**
* @param {Element} text
* @param {string} value
* @returns {void}
*/
function set_text(text, value) {
	var str = value == null ? "" : typeof value === "object" ? `${value}` : value;
	if (str !== (text[TEXT_CACHE] ??= text.nodeValue)) {
		/** @type {any} */ text[TEXT_CACHE] = str;
		text.nodeValue = `${str}`;
	}
}
/**
* Mounts a component to the given target and returns the exports and potentially the props (if compiled with `accessors: true`) of the component.
* Transitions will play during the initial render unless the `intro` option is set to `false`.
*
* @template {Record<string, any>} Props
* @template {Record<string, any>} Exports
* @param {ComponentType<SvelteComponent<Props>> | Component<Props, Exports, any>} component
* @param {MountOptions<Props>} options
* @returns {Exports}
*/
function mount(component, options) {
	return _mount(component, options);
}
/**
* Hydrates a component on the given target and returns the exports and potentially the props (if compiled with `accessors: true`) of the component
*
* @template {Record<string, any>} Props
* @template {Record<string, any>} Exports
* @param {ComponentType<SvelteComponent<Props>> | Component<Props, Exports, any>} component
* @param {{} extends Props ? {
* 		target: Document | Element | ShadowRoot;
* 		props?: Props;
* 		events?: Record<string, (e: any) => any>;
*  	context?: Map<any, any>;
* 		intro?: boolean;
* 		recover?: boolean;
*		transformError?: (error: unknown) => unknown;
* 	} : {
* 		target: Document | Element | ShadowRoot;
* 		props: Props;
* 		events?: Record<string, (e: any) => any>;
*  	context?: Map<any, any>;
* 		intro?: boolean;
* 		recover?: boolean;
*		transformError?: (error: unknown) => unknown;
* 	}} options
* @returns {Exports}
*/
function hydrate(component, options) {
	init_operations();
	options.intro = options.intro ?? false;
	const target = options.target;
	const was_hydrating = hydrating;
	const previous_hydrate_node = hydrate_node;
	try {
		var anchor = /* @__PURE__ */ get_first_child(target);
		while (anchor && (anchor.nodeType !== 8 || anchor.data !== "[")) anchor = /* @__PURE__ */ get_next_sibling(anchor);
		if (!anchor) throw HYDRATION_ERROR;
		set_hydrating(true);
		set_hydrate_node(anchor);
		const instance = _mount(component, {
			...options,
			anchor
		});
		set_hydrating(false);
		return instance;
	} catch (error) {
		if (error instanceof Error && error.message.split("\n").some((line) => line.startsWith("https://svelte.dev/e/"))) throw error;
		if (error !== HYDRATION_ERROR) console.warn("Failed to hydrate: ", error);
		if (options.recover === false) hydration_failed();
		init_operations();
		clear_text_content(target);
		set_hydrating(false);
		return mount(component, options);
	} finally {
		set_hydrating(was_hydrating);
		set_hydrate_node(previous_hydrate_node);
	}
}
/** @type {Map<EventTarget, Map<string, number>>} */
var listeners = /* @__PURE__ */ new Map();
/**
* @template {Record<string, any>} Exports
* @param {ComponentType<SvelteComponent<any>> | Component<any>} Component
* @param {MountOptions} options
* @returns {Exports}
*/
function _mount(Component, { target, anchor, props = {}, events, context, intro = true, transformError }) {
	init_operations();
	/** @type {Exports} */
	var component = void 0;
	var unmount = component_root(() => {
		var anchor_node = anchor ?? target.appendChild(create_text());
		boundary(anchor_node, { pending: () => {} }, (anchor_node) => {
			push({});
			var ctx = component_context;
			if (context) ctx.c = context;
			if (events)
 /** @type {any} */ props.$$events = events;
			if (hydrating) assign_nodes(anchor_node, null);
			component = Component(anchor_node, props) || {};
			if (hydrating) {
				/** @type {Effect & { nodes: EffectNodes }} */ active_effect.nodes.end = hydrate_node;
				if (hydrate_node === null || hydrate_node.nodeType !== 8 || hydrate_node.data !== "]") {
					hydration_mismatch();
					throw HYDRATION_ERROR;
				}
			}
			pop();
		}, transformError);
		/** @type {Set<string>} */
		var registered_events = /* @__PURE__ */ new Set();
		/** @param {Array<string>} events */
		var event_handle = (events) => {
			for (var i = 0; i < events.length; i++) {
				var event_name = events[i];
				if (registered_events.has(event_name)) continue;
				registered_events.add(event_name);
				var passive = is_passive_event(event_name);
				for (const node of [target, document]) {
					var counts = listeners.get(node);
					if (counts === void 0) {
						counts = /* @__PURE__ */ new Map();
						listeners.set(node, counts);
					}
					var count = counts.get(event_name);
					if (count === void 0) {
						node.addEventListener(event_name, handle_event_propagation, { passive });
						counts.set(event_name, 1);
					} else counts.set(event_name, count + 1);
				}
			}
		};
		event_handle(array_from(all_registered_events));
		root_event_handles.add(event_handle);
		return () => {
			for (var event_name of registered_events) for (const node of [target, document]) {
				var counts = listeners.get(node);
				var count = counts.get(event_name);
				if (--count == 0) {
					node.removeEventListener(event_name, handle_event_propagation);
					counts.delete(event_name);
					if (counts.size === 0) listeners.delete(node);
				} else counts.set(event_name, count);
			}
			root_event_handles.delete(event_handle);
			if (anchor_node !== anchor) anchor_node.parentNode?.removeChild(anchor_node);
		};
	});
	mounted_components.set(component, unmount);
	return component;
}
/**
* References of the components that were mounted or hydrated.
* Uses a `WeakMap` to avoid memory leaks.
*/
var mounted_components = /* @__PURE__ */ new WeakMap();
/**
* Unmounts a component that was previously mounted using `mount` or `hydrate`.
*
* Since 5.13.0, if `options.outro` is `true`, [transitions](https://svelte.dev/docs/svelte/transition) will play before the component is removed from the DOM.
*
* Returns a `Promise` that resolves after transitions have completed if `options.outro` is true, or immediately otherwise (prior to 5.13.0, returns `void`).
*
* ```js
* import { mount, unmount } from 'svelte';
* import App from './App.svelte';
*
* const app = mount(App, { target: document.body });
*
* // later...
* unmount(app, { outro: true });
* ```
* @param {Record<string, any>} component
* @param {{ outro?: boolean }} [options]
* @returns {Promise<void>}
*/
function unmount(component, options) {
	const fn = mounted_components.get(component);
	if (fn) {
		mounted_components.delete(component);
		return fn(options);
	}
	return Promise.resolve();
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/branches.js
/** @import { Effect, TemplateNode } from '#client' */
/**
* @typedef {{ effect: Effect, fragment: DocumentFragment }} Branch
*/
/**
* @template Key
*/
var BranchManager = class {
	/** @type {TemplateNode} */
	anchor;
	/** @type {Map<Batch, Key>} */
	#batches = /* @__PURE__ */ new Map();
	/**
	* Map of keys to effects that are currently rendered in the DOM.
	* These effects are visible and actively part of the document tree.
	* Example:
	* ```
	* {#if condition}
	* 	foo
	* {:else}
	* 	bar
	* {/if}
	* ```
	* Can result in the entries `true->Effect` and `false->Effect`
	* @type {Map<Key, Effect>}
	*/
	#onscreen = /* @__PURE__ */ new Map();
	/**
	* Similar to #onscreen with respect to the keys, but contains branches that are not yet
	* in the DOM, because their insertion is deferred.
	* @type {Map<Key, Branch>}
	*/
	#offscreen = /* @__PURE__ */ new Map();
	/**
	* Keys of effects that are currently outroing
	* @type {Set<Key>}
	*/
	#outroing = /* @__PURE__ */ new Set();
	/**
	* Whether to pause (i.e. outro) on change, or destroy immediately.
	* This is necessary for `<svelte:element>`
	*/
	#transition = true;
	/**
	* @param {TemplateNode} anchor
	* @param {boolean} transition
	*/
	constructor(anchor, transition = true) {
		this.anchor = anchor;
		this.#transition = transition;
	}
	/**
	* @param {Batch} batch
	*/
	#commit = (batch) => {
		if (!this.#batches.has(batch)) return;
		var key = this.#batches.get(batch);
		var onscreen = this.#onscreen.get(key);
		if (onscreen) {
			resume_effect(onscreen);
			this.#outroing.delete(key);
		} else {
			var offscreen = this.#offscreen.get(key);
			if (offscreen) {
				resume_effect(offscreen.effect);
				this.#onscreen.set(key, offscreen.effect);
				this.#offscreen.delete(key);
				/** @type {TemplateNode} */ offscreen.fragment.lastChild.remove();
				this.anchor.before(offscreen.fragment);
				onscreen = offscreen.effect;
			}
		}
		for (const [b, k] of this.#batches) {
			this.#batches.delete(b);
			if (b === batch) break;
			const offscreen = this.#offscreen.get(k);
			if (offscreen) {
				destroy_effect(offscreen.effect);
				this.#offscreen.delete(k);
			}
		}
		for (const [k, effect] of this.#onscreen) {
			if (k === key || this.#outroing.has(k)) continue;
			const on_destroy = () => {
				if (Array.from(this.#batches.values()).includes(k)) {
					var fragment = document.createDocumentFragment();
					move_effect(effect, fragment);
					fragment.append(create_text());
					this.#offscreen.set(k, {
						effect,
						fragment
					});
				} else destroy_effect(effect);
				this.#outroing.delete(k);
				this.#onscreen.delete(k);
			};
			if (this.#transition || !onscreen) {
				this.#outroing.add(k);
				pause_effect(effect, on_destroy, false);
			} else on_destroy();
		}
	};
	/**
	* @param {Batch} batch
	*/
	#discard = (batch) => {
		this.#batches.delete(batch);
		const keys = Array.from(this.#batches.values());
		for (const [k, branch] of this.#offscreen) if (!keys.includes(k)) {
			destroy_effect(branch.effect);
			this.#offscreen.delete(k);
		}
	};
	/**
	*
	* @param {any} key
	* @param {null | ((target: TemplateNode) => void)} fn
	*/
	ensure(key, fn) {
		var batch = current_batch;
		var defer = should_defer_append();
		if (fn && !this.#onscreen.has(key) && !this.#offscreen.has(key)) if (defer) {
			var fragment = document.createDocumentFragment();
			var target = create_text();
			fragment.append(target);
			this.#offscreen.set(key, {
				effect: branch(() => fn(target)),
				fragment
			});
		} else this.#onscreen.set(key, branch(() => fn(this.anchor)));
		this.#batches.set(batch, key);
		if (defer) {
			for (const [k, effect] of this.#onscreen) if (k === key) batch.unskip_effect(effect);
			else batch.skip_effect(effect);
			for (const [k, branch] of this.#offscreen) if (k === key) batch.unskip_effect(branch.effect);
			else batch.skip_effect(branch.effect);
			batch.oncommit(this.#commit);
			batch.ondiscard(this.#discard);
		} else {
			if (hydrating) this.anchor = hydrate_node;
			this.#commit(batch);
		}
	}
};
/**
* `onMount`, like [`$effect`](https://svelte.dev/docs/svelte/$effect), schedules a function to run as soon as the component has been mounted to the DOM.
* Unlike `$effect`, the provided function only runs once.
*
* It must be called during the component's initialisation (but doesn't need to live _inside_ the component;
* it can be called from an external module). If a function is returned _synchronously_ from `onMount`,
* it will be called when the component is unmounted.
*
* `onMount` functions do not run during [server-side rendering](https://svelte.dev/docs/svelte/svelte-server#render).
*
* @template T
* @param {() => NotFunction<T> | Promise<NotFunction<T>> | (() => any)} fn
* @returns {void}
*/
function onMount(fn) {
	if (component_context === null) lifecycle_outside_component("onMount");
	if (legacy_mode_flag && component_context.l !== null) init_update_callbacks(component_context).m.push(fn);
	else user_effect(() => {
		const cleanup = untrack(fn);
		if (typeof cleanup === "function") return cleanup;
	});
}
/**
* Legacy-mode: Init callbacks object for onMount/beforeUpdate/afterUpdate
* @param {ComponentContext} context
*/
function init_update_callbacks(context) {
	var l = context.l;
	return l.u ??= {
		a: [],
		b: [],
		m: []
	};
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/if.js
/** @import { TemplateNode } from '#client' */
/**
* @param {TemplateNode} node
* @param {(branch: (fn: (anchor: Node) => void, key?: number | false) => void) => void} fn
* @param {boolean} [elseif] True if this is an `{:else if ...}` block rather than an `{#if ...}`, as that affects which transitions are considered 'local'
* @returns {void}
*/
function if_block(node, fn, elseif = false) {
	/** @type {TemplateNode | undefined} */
	var marker;
	if (hydrating) {
		marker = hydrate_node;
		hydrate_next();
	}
	var branches = new BranchManager(node);
	var flags = elseif ? EFFECT_TRANSPARENT : 0;
	/**
	* @param {number | false} key
	* @param {null | ((anchor: Node) => void)} fn
	*/
	function update_branch(key, fn) {
		if (hydrating) {
			var data = read_hydration_instruction(marker);
			if (key !== parseInt(data.substring(1))) {
				var anchor = skip_nodes();
				set_hydrate_node(anchor);
				branches.anchor = anchor;
				set_hydrating(false);
				branches.ensure(key, fn);
				set_hydrating(true);
				return;
			}
		}
		branches.ensure(key, fn);
	}
	block(() => {
		var has_branch = false;
		fn((fn, key = 0) => {
			has_branch = true;
			update_branch(key, fn);
		});
		if (!has_branch) update_branch(-1, null);
	}, flags);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/blocks/each.js
/** @import { EachItem, EachOutroGroup, EachState, Effect, EffectNodes, MaybeSource, Source, TemplateNode, TransitionManager, Value } from '#client' */
/** @import { Batch } from '../../reactivity/batch.js'; */
/**
* @param {any} _
* @param {number} i
*/
function index(_, i) {
	return i;
}
/**
* Pause multiple effects simultaneously, and coordinate their
* subsequent destruction. Used in each blocks
* @param {EachState} state
* @param {Effect[]} to_destroy
* @param {null | Node} controlled_anchor
*/
function pause_effects(state, to_destroy, controlled_anchor) {
	/** @type {TransitionManager[]} */
	var transitions = [];
	var length = to_destroy.length;
	/** @type {EachOutroGroup} */
	var group;
	var remaining = to_destroy.length;
	for (var i = 0; i < length; i++) {
		let effect = to_destroy[i];
		pause_effect(effect, () => {
			if (group) {
				group.pending.delete(effect);
				group.done.add(effect);
				if (group.pending.size === 0) {
					var groups = state.outrogroups;
					destroy_effects(state, array_from(group.done));
					groups.delete(group);
					if (groups.size === 0) state.outrogroups = null;
				}
			} else remaining -= 1;
		}, false);
	}
	if (remaining === 0) {
		var fast_path = transitions.length === 0 && controlled_anchor !== null;
		if (fast_path) {
			var anchor = controlled_anchor;
			var parent_node = anchor.parentNode;
			clear_text_content(parent_node);
			parent_node.append(anchor);
			state.items.clear();
		}
		destroy_effects(state, to_destroy, !fast_path);
	} else {
		group = {
			pending: new Set(to_destroy),
			done: /* @__PURE__ */ new Set()
		};
		(state.outrogroups ??= /* @__PURE__ */ new Set()).add(group);
	}
}
/**
* @param {EachState} state
* @param {Effect[]} to_destroy
* @param {boolean} remove_dom
*/
function destroy_effects(state, to_destroy, remove_dom = true) {
	/** @type {Set<Effect> | undefined} */
	var preserved_effects;
	if (state.pending.size > 0) {
		preserved_effects = /* @__PURE__ */ new Set();
		for (const keys of state.pending.values()) for (const key of keys) preserved_effects.add(
			/** @type {EachItem} */
			state.items.get(key).e
		);
	}
	for (var i = 0; i < to_destroy.length; i++) {
		var e = to_destroy[i];
		if (preserved_effects?.has(e)) {
			e.f |= EFFECT_OFFSCREEN;
			move_effect(e, document.createDocumentFragment());
		} else destroy_effect(to_destroy[i], remove_dom);
	}
}
/** @type {TemplateNode} */
var offscreen_anchor;
/**
* @template V
* @param {Element | Comment} node The next sibling node, or the parent node if this is a 'controlled' block
* @param {number} flags
* @param {() => V[]} get_collection
* @param {(value: V, index: number) => any} get_key
* @param {(anchor: Node, item: MaybeSource<V>, index: MaybeSource<number>) => void} render_fn
* @param {null | ((anchor: Node) => void)} fallback_fn
* @returns {void}
*/
function each(node, flags, get_collection, get_key, render_fn, fallback_fn = null) {
	var anchor = node;
	/** @type {Map<any, EachItem>} */
	var items = /* @__PURE__ */ new Map();
	if ((flags & 4) !== 0) {
		var parent_node = node;
		anchor = hydrating ? set_hydrate_node(/* @__PURE__ */ get_first_child(parent_node)) : parent_node.appendChild(create_text());
	}
	if (hydrating) hydrate_next();
	/** @type {Effect | null} */
	var fallback = null;
	var each_array = /* @__PURE__ */ derived_safe_equal(() => {
		var collection = get_collection();
		return is_array(collection) ? collection : collection == null ? [] : array_from(collection);
	});
	/** @type {V[]} */
	var array;
	/** @type {Map<Batch, Set<any>>} */
	var pending = /* @__PURE__ */ new Map();
	var first_run = true;
	/**
	* @param {Batch} batch
	*/
	function commit(batch) {
		if ((state.effect.f & 16384) !== 0) return;
		state.pending.delete(batch);
		state.fallback = fallback;
		reconcile(state, array, anchor, flags, get_key);
		if (fallback !== null) if (array.length === 0) if ((fallback.f & 33554432) === 0) resume_effect(fallback);
		else {
			fallback.f ^= EFFECT_OFFSCREEN;
			move(fallback, null, anchor);
		}
		else pause_effect(fallback, () => {
			fallback = null;
		});
	}
	/**
	* @param {Batch} batch
	*/
	function discard(batch) {
		state.pending.delete(batch);
	}
	/** @type {EachState} */
	var state = {
		effect: block(() => {
			array = get(each_array);
			var length = array.length;
			/** `true` if there was a hydration mismatch. Needs to be a `let` or else it isn't treeshaken out */
			let mismatch = false;
			if (hydrating) {
				if (read_hydration_instruction(anchor) === "[!" !== (length === 0)) {
					anchor = skip_nodes();
					set_hydrate_node(anchor);
					set_hydrating(false);
					mismatch = true;
				}
			}
			var keys = /* @__PURE__ */ new Set();
			var batch = current_batch;
			var defer = should_defer_append();
			for (var index = 0; index < length; index += 1) {
				if (hydrating && hydrate_node.nodeType === 8 && hydrate_node.data === "]") {
					anchor = hydrate_node;
					mismatch = true;
					set_hydrating(false);
				}
				var value = array[index];
				var key = get_key(value, index);
				var item = first_run ? null : items.get(key);
				if (item) {
					if (item.v) internal_set(item.v, value);
					if (item.i) internal_set(item.i, index);
					if (defer) batch.unskip_effect(item.e);
				} else {
					item = create_item(items, first_run ? anchor : offscreen_anchor ??= create_text(), value, key, index, render_fn, flags, get_collection);
					if (!first_run) item.e.f |= EFFECT_OFFSCREEN;
					items.set(key, item);
				}
				keys.add(key);
			}
			if (length === 0 && fallback_fn && !fallback) if (first_run) fallback = branch(() => fallback_fn(anchor));
			else {
				fallback = branch(() => fallback_fn(offscreen_anchor ??= create_text()));
				fallback.f |= EFFECT_OFFSCREEN;
			}
			if (length > keys.size) each_key_duplicate("", "", "");
			if (hydrating && length > 0) set_hydrate_node(skip_nodes());
			if (!first_run) {
				pending.set(batch, keys);
				if (defer) {
					for (const [key, item] of items) if (!keys.has(key)) batch.skip_effect(item.e);
					batch.oncommit(commit);
					batch.ondiscard(discard);
				} else commit(batch);
			}
			if (mismatch) set_hydrating(true);
			get(each_array);
		}),
		flags,
		items,
		pending,
		outrogroups: null,
		fallback
	};
	first_run = false;
	if (hydrating) anchor = hydrate_node;
}
/**
* Skip past any non-branch effects (which could be created with `createSubscriber`, for example) to find the next branch effect
* @param {Effect | null} effect
* @returns {Effect | null}
*/
function skip_to_branch(effect) {
	while (effect !== null && (effect.f & 32) === 0) effect = effect.next;
	return effect;
}
/**
* Add, remove, or reorder items output by an each block as its input changes
* @template V
* @param {EachState} state
* @param {Array<V>} array
* @param {Element | Comment | Text} anchor
* @param {number} flags
* @param {(value: V, index: number) => any} get_key
* @returns {void}
*/
function reconcile(state, array, anchor, flags, get_key) {
	var is_animated = (flags & 8) !== 0;
	var length = array.length;
	var items = state.items;
	var current = skip_to_branch(state.effect.first);
	/** @type {undefined | Set<Effect>} */
	var seen;
	/** @type {Effect | null} */
	var prev = null;
	/** @type {undefined | Set<Effect>} */
	var to_animate;
	/** @type {Effect[]} */
	var matched = [];
	/** @type {Effect[]} */
	var stashed = [];
	/** @type {V} */
	var value;
	/** @type {any} */
	var key;
	/** @type {Effect | undefined} */
	var effect;
	/** @type {number} */
	var i;
	if (is_animated) for (i = 0; i < length; i += 1) {
		value = array[i];
		key = get_key(value, i);
		effect = items.get(key).e;
		if ((effect.f & 33554432) === 0) {
			effect.nodes?.a?.measure();
			(to_animate ??= /* @__PURE__ */ new Set()).add(effect);
		}
	}
	for (i = 0; i < length; i += 1) {
		value = array[i];
		key = get_key(value, i);
		effect = items.get(key).e;
		if (state.outrogroups !== null) for (const group of state.outrogroups) {
			group.pending.delete(effect);
			group.done.delete(effect);
		}
		if ((effect.f & 8192) !== 0) {
			resume_effect(effect);
			if (is_animated) {
				effect.nodes?.a?.unfix();
				(to_animate ??= /* @__PURE__ */ new Set()).delete(effect);
			}
		}
		if ((effect.f & 33554432) !== 0) {
			effect.f ^= EFFECT_OFFSCREEN;
			if (effect === current) move(effect, null, anchor);
			else {
				var next = prev ? prev.next : current;
				if (effect === state.effect.last) state.effect.last = effect.prev;
				if (effect.prev) effect.prev.next = effect.next;
				if (effect.next) effect.next.prev = effect.prev;
				link(state, prev, effect);
				link(state, effect, next);
				move(effect, next, anchor);
				prev = effect;
				matched = [];
				stashed = [];
				current = skip_to_branch(prev.next);
				continue;
			}
		}
		if (effect !== current) {
			if (seen !== void 0 && seen.has(effect)) {
				if (matched.length < stashed.length) {
					var start = stashed[0];
					var j;
					prev = start.prev;
					var a = matched[0];
					var b = matched[matched.length - 1];
					for (j = 0; j < matched.length; j += 1) move(matched[j], start, anchor);
					for (j = 0; j < stashed.length; j += 1) seen.delete(stashed[j]);
					link(state, a.prev, b.next);
					link(state, prev, a);
					link(state, b, start);
					current = start;
					prev = b;
					i -= 1;
					matched = [];
					stashed = [];
				} else {
					seen.delete(effect);
					move(effect, current, anchor);
					link(state, effect.prev, effect.next);
					link(state, effect, prev === null ? state.effect.first : prev.next);
					link(state, prev, effect);
					prev = effect;
				}
				continue;
			}
			matched = [];
			stashed = [];
			while (current !== null && current !== effect) {
				(seen ??= /* @__PURE__ */ new Set()).add(current);
				stashed.push(current);
				current = skip_to_branch(current.next);
			}
			if (current === null) continue;
		}
		if ((effect.f & 33554432) === 0) matched.push(effect);
		prev = effect;
		current = skip_to_branch(effect.next);
	}
	if (state.outrogroups !== null) {
		for (const group of state.outrogroups) if (group.pending.size === 0) {
			destroy_effects(state, array_from(group.done));
			state.outrogroups?.delete(group);
		}
		if (state.outrogroups.size === 0) state.outrogroups = null;
	}
	if (current !== null || seen !== void 0) {
		/** @type {Effect[]} */
		var to_destroy = [];
		if (seen !== void 0) {
			for (effect of seen) if ((effect.f & 8192) === 0) to_destroy.push(effect);
		}
		while (current !== null) {
			if ((current.f & 8192) === 0 && current !== state.fallback) to_destroy.push(current);
			current = skip_to_branch(current.next);
		}
		var destroy_length = to_destroy.length;
		if (destroy_length > 0) {
			var controlled_anchor = (flags & 4) !== 0 && length === 0 ? anchor : null;
			if (is_animated) {
				for (i = 0; i < destroy_length; i += 1) to_destroy[i].nodes?.a?.measure();
				for (i = 0; i < destroy_length; i += 1) to_destroy[i].nodes?.a?.fix();
			}
			pause_effects(state, to_destroy, controlled_anchor);
		}
	}
	if (is_animated) queue_micro_task(() => {
		if (to_animate === void 0) return;
		for (effect of to_animate) effect.nodes?.a?.apply();
	});
}
/**
* @template V
* @param {Map<any, EachItem>} items
* @param {Node} anchor
* @param {V} value
* @param {unknown} key
* @param {number} index
* @param {(anchor: Node, item: V | Source<V>, index: number | Value<number>, collection: () => V[]) => void} render_fn
* @param {number} flags
* @param {() => V[]} get_collection
* @returns {EachItem}
*/
function create_item(items, anchor, value, key, index, render_fn, flags, get_collection) {
	var v = (flags & 1) !== 0 ? (flags & 16) === 0 ? /* @__PURE__ */ mutable_source(value, false, false) : source(value) : null;
	var i = (flags & 2) !== 0 ? source(index) : null;
	return {
		v,
		i,
		e: branch(() => {
			render_fn(anchor, v ?? value, i ?? index, get_collection);
			return () => {
				items.delete(key);
			};
		})
	};
}
/**
* @param {Effect} effect
* @param {Effect | null} next
* @param {Text | Element | Comment} anchor
*/
function move(effect, next, anchor) {
	if (!effect.nodes) return;
	var node = effect.nodes.start;
	var end = effect.nodes.end;
	var dest = next && (next.f & 33554432) === 0 ? next.nodes.start : anchor;
	while (node !== null) {
		var next_node = /* @__PURE__ */ get_next_sibling(node);
		dest.before(node);
		if (node === end) return;
		node = next_node;
	}
}
/**
* @param {EachState} state
* @param {Effect | null} prev
* @param {Effect | null} next
*/
function link(state, prev, next) {
	if (prev === null) state.effect.first = next;
	else prev.next = next;
	if (next === null) state.effect.last = prev;
	else next.prev = prev;
}
/**
* @param {Element | Text | Comment} node
* @param {() => string | TrustedHTML} get_value
* @param {boolean} [is_controlled]
* @param {boolean} [svg]
* @param {boolean} [mathml]
* @param {boolean} [skip_warning]
* @returns {void}
*/
function html(node, get_value, is_controlled = false, svg = false, mathml = false, skip_warning = false) {
	var anchor = node;
	/** @type {string | TrustedHTML} */
	var value = "";
	if (is_controlled) {
		var parent_node = node;
		if (hydrating) anchor = set_hydrate_node(/* @__PURE__ */ get_first_child(parent_node));
	}
	template_effect(() => {
		var effect = active_effect;
		if (value === (value = get_value() ?? "")) {
			if (hydrating) hydrate_next();
			return;
		}
		if (is_controlled && !hydrating) {
			effect.nodes = null;
			parent_node.innerHTML = value;
			if (value !== "") assign_nodes(/* @__PURE__ */ get_first_child(parent_node), parent_node.lastChild);
			return;
		}
		if (effect.nodes !== null) {
			remove_effect_dom(effect.nodes.start, effect.nodes.end);
			effect.nodes = null;
		}
		if (value === "") return;
		if (hydrating) {
			hydrate_node.data;
			/** @type {TemplateNode | null} */
			var next = hydrate_next();
			var last = next;
			while (next !== null && (next.nodeType !== 8 || next.data !== "")) {
				last = next;
				next = /* @__PURE__ */ get_next_sibling(next);
			}
			if (next === null) {
				hydration_mismatch();
				throw HYDRATION_ERROR;
			}
			assign_nodes(hydrate_node, last);
			anchor = set_hydrate_node(next);
			return;
		}
		var wrapper = create_element(svg ? "svg" : mathml ? "math" : "template", svg ? NAMESPACE_SVG : mathml ? NAMESPACE_MATHML : void 0);
		wrapper.innerHTML = value;
		/** @type {DocumentFragment | Element} */
		var node = svg || mathml ? wrapper : 		/** @type {HTMLTemplateElement} */ wrapper.content;
		assign_nodes(/* @__PURE__ */ get_first_child(node), node.lastChild);
		if (svg || mathml) while (/* @__PURE__ */ get_first_child(node)) anchor.before(/* @__PURE__ */ get_first_child(node));
		else anchor.before(node);
	});
}
//#endregion
//#region node_modules/svelte/src/internal/client/timing.js
/** @import { Raf } from '#client' */
var now = () => performance.now();
/** @type {Raf} */
var raf = {
	tick: (_) => requestAnimationFrame(_),
	now: () => now(),
	tasks: /* @__PURE__ */ new Set()
};
//#endregion
//#region node_modules/svelte/src/internal/client/loop.js
/** @import { TaskCallback, Task, TaskEntry } from '#client' */
/**
* @returns {void}
*/
function run_tasks() {
	const now = raf.now();
	raf.tasks.forEach((task) => {
		if (!task.c(now)) {
			raf.tasks.delete(task);
			task.f();
		}
	});
	if (raf.tasks.size !== 0) raf.tick(run_tasks);
}
/**
* Creates a new task that runs on each raf frame
* until it returns a falsy value or is aborted
* @param {TaskCallback} callback
* @returns {Task}
*/
function loop(callback) {
	/** @type {TaskEntry} */
	let task;
	if (raf.tasks.size === 0) raf.tick(run_tasks);
	return {
		promise: new Promise((fulfill) => {
			raf.tasks.add(task = {
				c: callback,
				f: fulfill
			});
		}),
		abort() {
			raf.tasks.delete(task);
		}
	};
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/transitions.js
/** @import { AnimateFn, Animation, AnimationConfig, EachItem, Effect, EffectNodes, TransitionFn, TransitionManager } from '#client' */
/**
* Converts a property to the camel-case format expected by Element.animate(), KeyframeEffect(), and KeyframeEffect.setKeyframes().
* @param {string} style
* @returns {string}
*/
function css_property_to_camelcase(style) {
	if (style === "float") return "cssFloat";
	if (style === "offset") return "cssOffset";
	if (style.startsWith("--")) return style;
	const parts = style.split("-");
	if (parts.length === 1) return parts[0];
	return parts[0] + parts.slice(1).map(
		/** @param {any} word */
		(word) => word[0].toUpperCase() + word.slice(1)
	).join("");
}
/**
* @param {string} css
* @returns {Keyframe}
*/
function css_to_keyframe(css) {
	/** @type {Keyframe} */
	const keyframe = {};
	const parts = css.split(";");
	for (const part of parts) {
		const [property, value] = part.split(":");
		if (!property || value === void 0) break;
		const formatted_property = css_property_to_camelcase(property.trim());
		keyframe[formatted_property] = value.trim();
	}
	return keyframe;
}
/** @param {number} t */
var linear = (t) => t;
/** @type {Effect | null} */
var animation_effect_override = null;
/**
* Called inside keyed `{#each ...}` blocks (as `$.animation(...)`). This creates an animation manager
* and attaches it to the block, so that moves can be animated following reconciliation.
* @template P
* @param {Element} element
* @param {() => AnimateFn<P | undefined>} get_fn
* @param {(() => P) | null} get_params
*/
function animation(element, get_fn, get_params) {
	var nodes = (animation_effect_override ?? active_effect).nodes;
	/** @type {DOMRect} */
	var from;
	/** @type {DOMRect} */
	var to;
	/** @type {Animation | undefined} */
	var animation;
	/** @type {null | { position: string, width: string, height: string, transform: string }} */
	var original_styles = null;
	nodes.a ??= {
		element,
		measure() {
			from = this.element.getBoundingClientRect();
		},
		apply() {
			animation?.abort();
			to = this.element.getBoundingClientRect();
			if (from.left !== to.left || from.right !== to.right || from.top !== to.top || from.bottom !== to.bottom) {
				const options = get_fn()(this.element, {
					from,
					to
				}, get_params?.());
				animation = animate(this.element, options, void 0, 1, () => {}, () => {
					animation?.abort();
					animation = void 0;
				});
			}
		},
		fix() {
			if (element.getAnimations().length) return;
			var { position, width, height } = getComputedStyle(element);
			if (position !== "absolute" && position !== "fixed") {
				var style = element.style;
				original_styles = {
					position: style.position,
					width: style.width,
					height: style.height,
					transform: style.transform
				};
				style.position = "absolute";
				style.width = width;
				style.height = height;
				var to = element.getBoundingClientRect();
				if (from.left !== to.left || from.top !== to.top) {
					var transform = `translate(${from.left - to.left}px, ${from.top - to.top}px)`;
					style.transform = style.transform ? `${style.transform} ${transform}` : transform;
				}
			}
		},
		unfix() {
			if (original_styles) {
				var style = element.style;
				style.position = original_styles.position;
				style.width = original_styles.width;
				style.height = original_styles.height;
				style.transform = original_styles.transform;
			}
		}
	};
	nodes.a.element = element;
}
/**
* Animates an element, according to the provided configuration
* @param {Element} element
* @param {AnimationConfig | ((opts: { direction: 'in' | 'out' }) => AnimationConfig)} options
* @param {Animation | undefined} counterpart The corresponding intro/outro to this outro/intro
* @param {number} t2 The target `t` value — `1` for intro, `0` for outro
* @param {(() => void)} on_begin Called just before beginning the animation
* @param {(() => void)} on_finish Called after successfully completing the animation
* @returns {Animation}
*/
function animate(element, options, counterpart, t2, on_begin, on_finish) {
	var is_intro = t2 === 1;
	if (is_function(options)) {
		/** @type {Animation} */
		var a;
		var aborted = false;
		queue_micro_task(() => {
			if (aborted) return;
			a = animate(element, options({ direction: is_intro ? "in" : "out" }), counterpart, t2, on_begin, on_finish);
		});
		return {
			abort: () => {
				aborted = true;
				a?.abort();
			},
			deactivate: () => a.deactivate(),
			reset: () => a.reset(),
			t: () => a.t()
		};
	}
	counterpart?.deactivate();
	if (!options?.duration && !options?.delay) {
		on_begin();
		on_finish();
		return {
			abort: noop,
			deactivate: noop,
			reset: noop,
			t: () => t2
		};
	}
	const { delay = 0, css, tick, easing = linear } = options;
	var keyframes = [];
	if (is_intro && counterpart === void 0) {
		if (tick) tick(0, 1);
		if (css) {
			var styles = css_to_keyframe(css(0, 1));
			keyframes.push(styles, styles);
		}
	}
	var get_t = () => 1 - t2;
	var animation = element.animate(keyframes, {
		duration: delay,
		fill: "forwards"
	});
	animation.onfinish = () => {
		animation.cancel();
		on_begin();
		var t1 = counterpart?.t() ?? 1 - t2;
		counterpart?.abort();
		var delta = t2 - t1;
		var duration = options.duration * Math.abs(delta);
		var keyframes = [];
		if (duration > 0) {
			/**
			* Whether or not the CSS includes `overflow: hidden`, in which case we need to
			* add it as an inline style to work around a Safari <18 bug
			* TODO 6.0 remove this, if possible
			*/
			var needs_overflow_hidden = false;
			if (css) {
				var n = Math.ceil(duration / (1e3 / 60));
				for (var i = 0; i <= n; i += 1) {
					var t = t1 + delta * easing(i / n);
					var styles = css_to_keyframe(css(t, 1 - t));
					keyframes.push(styles);
					needs_overflow_hidden ||= styles.overflow === "hidden";
				}
			}
			if (needs_overflow_hidden)
 /** @type {HTMLElement} */ element.style.overflow = "hidden";
			get_t = () => {
				var time = animation.currentTime;
				return t1 + delta * easing(time / duration);
			};
			if (tick) loop(() => {
				if (animation.playState !== "running") return false;
				var t = get_t();
				tick(t, 1 - t);
				return true;
			});
		}
		animation = element.animate(keyframes, {
			duration,
			fill: "forwards"
		});
		animation.onfinish = () => {
			get_t = () => t2;
			tick?.(t2, 1 - t2);
			on_finish();
		};
	};
	return {
		abort: () => {
			if (animation) {
				animation.cancel();
				animation.effect = null;
				animation.onfinish = noop;
			}
		},
		deactivate: () => {
			on_finish = noop;
		},
		reset: () => {
			if (t2 === 0) tick?.(1, 0);
		},
		t: () => get_t()
	};
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/css.js
/**
* @param {Node} anchor
* @param {{ hash: string, code: string }} css
*/
function append_styles$1(anchor, css) {
	effect(() => {
		var root = anchor.getRootNode();
		var target = root.host ? root : 		/** @type {Document} */ root.head ?? root.ownerDocument.head;
		if (!target.querySelector("#" + css.hash)) {
			const style = create_element("style");
			style.id = css.hash;
			style.textContent = css.code;
			target.appendChild(style);
		}
	});
}
//#endregion
//#region node_modules/svelte/src/internal/shared/attributes.js
var whitespace = [..." 	\n\r\f\xA0\v﻿"];
/**
* @param {any} value
* @param {string | null} [hash]
* @param {Record<string, boolean>} [directives]
* @returns {string | null}
*/
function to_class(value, hash, directives) {
	var classname = value == null ? "" : "" + value;
	if (hash) classname = classname ? classname + " " + hash : hash;
	if (directives) {
		for (var key of Object.keys(directives)) if (directives[key]) classname = classname ? classname + " " + key : key;
		else if (classname.length) {
			var len = key.length;
			var a = 0;
			while ((a = classname.indexOf(key, a)) >= 0) {
				var b = a + len;
				if ((a === 0 || whitespace.includes(classname[a - 1])) && (b === classname.length || whitespace.includes(classname[b]))) classname = (a === 0 ? "" : classname.substring(0, a)) + classname.substring(b + 1);
				else a = b;
			}
		}
	}
	return classname === "" ? null : classname;
}
/**
*
* @param {Record<string,any>} styles
* @param {boolean} important
*/
function append_styles(styles, important = false) {
	var separator = important ? " !important;" : ";";
	var css = "";
	for (var key of Object.keys(styles)) {
		var value = styles[key];
		if (value != null && value !== "") css += " " + key + ": " + value + separator;
	}
	return css;
}
/**
* @param {string} name
* @returns {string}
*/
function to_css_name(name) {
	if (name[0] !== "-" || name[1] !== "-") return name.toLowerCase();
	return name;
}
/**
* @param {any} value
* @param {Record<string, any> | [Record<string, any>, Record<string, any>]} [styles]
* @returns {string | null}
*/
function to_style(value, styles) {
	if (styles) {
		var new_style = "";
		/** @type {Record<string,any> | undefined} */
		var normal_styles;
		/** @type {Record<string,any> | undefined} */
		var important_styles;
		if (Array.isArray(styles)) {
			normal_styles = styles[0];
			important_styles = styles[1];
		} else normal_styles = styles;
		if (value) {
			value = String(value).replaceAll(/\s*\/\*.*?\*\/\s*/g, "").trim();
			/** @type {boolean | '"' | "'"} */
			var in_str = false;
			var in_apo = 0;
			var in_comment = false;
			var reserved_names = [];
			if (normal_styles) reserved_names.push(...Object.keys(normal_styles).map(to_css_name));
			if (important_styles) reserved_names.push(...Object.keys(important_styles).map(to_css_name));
			var start_index = 0;
			var name_index = -1;
			const len = value.length;
			for (var i = 0; i < len; i++) {
				var c = value[i];
				if (in_comment) {
					if (c === "/" && value[i - 1] === "*") in_comment = false;
				} else if (in_str) {
					if (in_str === c) in_str = false;
				} else if (c === "/" && value[i + 1] === "*") in_comment = true;
				else if (c === "\"" || c === "'") in_str = c;
				else if (c === "(") in_apo++;
				else if (c === ")") in_apo--;
				if (!in_comment && in_str === false && in_apo === 0) {
					if (c === ":" && name_index === -1) name_index = i;
					else if (c === ";" || i === len - 1) {
						if (name_index !== -1) {
							var name = to_css_name(value.substring(start_index, name_index).trim());
							if (!reserved_names.includes(name)) {
								if (c !== ";") i++;
								var property = value.substring(start_index, i).trim();
								new_style += " " + property + ";";
							}
						}
						start_index = i + 1;
						name_index = -1;
					}
				}
			}
		}
		if (normal_styles) new_style += append_styles(normal_styles);
		if (important_styles) new_style += append_styles(important_styles, true);
		new_style = new_style.trim();
		return new_style === "" ? null : new_style;
	}
	return value == null ? null : String(value);
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/class.js
/**
* @param {Element} dom
* @param {boolean | number} is_html
* @param {string | null} value
* @param {string} [hash]
* @param {Record<string, any>} [prev_classes]
* @param {Record<string, any>} [next_classes]
* @returns {Record<string, boolean> | undefined}
*/
function set_class(dom, is_html, value, hash, prev_classes, next_classes) {
	var prev = dom[CLASS_CACHE];
	if (hydrating || prev !== value || prev === void 0) {
		var next_class_name = to_class(value, hash, next_classes);
		if (!hydrating || next_class_name !== dom.getAttribute("class")) if (next_class_name == null) dom.removeAttribute("class");
		else if (is_html) dom.className = next_class_name;
		else dom.setAttribute("class", next_class_name);
		/** @type {any} */ dom[CLASS_CACHE] = value;
	} else if (next_classes && prev_classes !== next_classes) for (var key in next_classes) {
		var is_present = !!next_classes[key];
		if (prev_classes == null || is_present !== !!prev_classes[key]) dom.classList.toggle(key, is_present);
	}
	return next_classes;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/style.js
/**
* @param {Element & ElementCSSInlineStyle} dom
* @param {Record<string, any>} prev
* @param {Record<string, any>} next
* @param {string} [priority]
*/
function update_styles(dom, prev = {}, next, priority) {
	for (var key in next) {
		var value = next[key];
		if (prev[key] !== value) if (next[key] == null) dom.style.removeProperty(key);
		else dom.style.setProperty(key, value, priority);
	}
}
/**
* @param {Element & ElementCSSInlineStyle} dom
* @param {string | null} value
* @param {Record<string, any> | [Record<string, any>, Record<string, any>]} [prev_styles]
* @param {Record<string, any> | [Record<string, any>, Record<string, any>]} [next_styles]
*/
function set_style(dom, value, prev_styles, next_styles) {
	var prev = dom[STYLE_CACHE];
	if (hydrating || prev !== value) {
		var next_style_attr = to_style(value, next_styles);
		if (!hydrating || next_style_attr !== dom.getAttribute("style")) if (next_style_attr == null) dom.removeAttribute("style");
		else dom.style.cssText = next_style_attr;
		/** @type {any} */ dom[STYLE_CACHE] = value;
	} else if (next_styles) if (Array.isArray(next_styles)) {
		update_styles(dom, prev_styles?.[0], next_styles[0]);
		update_styles(dom, prev_styles?.[1], next_styles[1], "important");
	} else update_styles(dom, prev_styles, next_styles);
	return next_styles;
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/attributes.js
/** @import { Blocker, Effect } from '#client' */
var IS_CUSTOM_ELEMENT = Symbol("is custom element");
var IS_HTML = Symbol("is html");
var LINK_TAG = IS_XHTML ? "link" : "LINK";
/**
* @param {Element} element
* @param {string} attribute
* @param {string | null} value
* @param {boolean} [skip_warning]
*/
function set_attribute(element, attribute, value, skip_warning) {
	var attributes = get_attributes(element);
	if (hydrating) {
		attributes[attribute] = element.getAttribute(attribute);
		if (attribute === "src" || attribute === "srcset" || attribute === "href" && element.nodeName === LINK_TAG) {
			if (!skip_warning);
			return;
		}
	}
	if (attributes[attribute] === (attributes[attribute] = value)) return;
	if (attribute === "loading") element[LOADING_ATTR_SYMBOL] = value;
	if (value == null) element.removeAttribute(attribute);
	else if (typeof value !== "string" && get_setters(element).includes(attribute)) element[attribute] = value;
	else element.setAttribute(attribute, value);
}
/**
*
* @param {Element} element
*/
function get_attributes(element) {
	return element[ATTRIBUTES_CACHE] ??= {
		[IS_CUSTOM_ELEMENT]: element.nodeName.includes("-"),
		[IS_HTML]: element.namespaceURI === NAMESPACE_HTML
	};
}
/** @type {Map<string, string[]>} */
var setters_cache = /* @__PURE__ */ new Map();
/** @param {Element} element */
function get_setters(element) {
	var cache_key = element.getAttribute("is") || element.nodeName;
	var setters = setters_cache.get(cache_key);
	if (setters) return setters;
	setters_cache.set(cache_key, setters = []);
	var descriptors;
	var proto = element;
	var element_proto = Element.prototype;
	while (element_proto !== proto) {
		descriptors = get_descriptors(proto);
		for (var key in descriptors) if (descriptors[key].set && key !== "innerHTML" && key !== "textContent" && key !== "innerText") setters.push(key);
		proto = get_prototype_of(proto);
	}
	return setters;
}
//#endregion
//#region node_modules/svelte/src/internal/client/reactivity/props.js
/** @import { Derived, Effect, Source } from './types.js' */
/**
* This function is responsible for synchronizing a possibly bound prop with the inner component state.
* It is used whenever the compiler sees that the component writes to the prop, or when it has a default prop_value.
* @template V
* @param {Record<string, unknown>} props
* @param {string} key
* @param {number} flags
* @param {V | (() => V)} [fallback]
* @returns {(() => V | ((arg: V) => V) | ((arg: V, mutation: boolean) => V))}
*/
function prop(props, key, flags, fallback) {
	var runes = !legacy_mode_flag || (flags & 2) !== 0;
	var bindable = (flags & 8) !== 0;
	var lazy = (flags & 16) !== 0;
	var fallback_value = fallback;
	var fallback_dirty = true;
	var fallback_signal = void 0;
	var get_fallback = () => {
		if (lazy && runes) {
			fallback_signal ??= /* @__PURE__ */ derived(fallback);
			return get(fallback_signal);
		}
		if (fallback_dirty) {
			fallback_dirty = false;
			fallback_value = lazy ? untrack(fallback) : fallback;
		}
		return fallback_value;
	};
	/** @type {((v: V) => void) | undefined} */
	let setter;
	if (bindable) {
		var is_entry_props = STATE_SYMBOL in props || LEGACY_PROPS in props;
		setter = get_descriptor(props, key)?.set ?? (is_entry_props && key in props ? (v) => props[key] = v : void 0);
	}
	/** @type {V} */
	var initial_value;
	var is_store_sub = false;
	if (bindable) [initial_value, is_store_sub] = capture_store_binding(() => props[key]);
	else initial_value = props[key];
	if (initial_value === void 0 && fallback !== void 0) {
		initial_value = get_fallback();
		if (setter) {
			if (runes) props_invalid_value(key);
			setter(initial_value);
		}
	}
	/** @type {() => V} */
	var getter;
	if (runes) getter = () => {
		var value = props[key];
		if (value === void 0) return get_fallback();
		fallback_dirty = true;
		return value;
	};
	else getter = () => {
		var value = props[key];
		if (value !== void 0) fallback_value = void 0;
		return value === void 0 ? fallback_value : value;
	};
	if (runes && (flags & 4) === 0) return getter;
	if (setter) {
		var legacy_parent = props.$$legacy;
		return (function(value, mutation) {
			if (arguments.length > 0) {
				if (!runes || !mutation || legacy_parent || is_store_sub)
 /** @type {Function} */ setter(mutation ? getter() : value);
				return value;
			}
			return getter();
		});
	}
	var overridden = false;
	var d = ((flags & 1) !== 0 ? derived : derived_safe_equal)(() => {
		overridden = false;
		return getter();
	});
	if (bindable) get(d);
	var parent_effect = active_effect;
	return (function(value, mutation) {
		if (arguments.length > 0) {
			const new_value = mutation ? get(d) : runes && bindable ? proxy(value) : value;
			set(d, new_value);
			overridden = true;
			if (fallback_value !== void 0) fallback_value = new_value;
			return value;
		}
		if (is_destroying_effect && overridden || (parent_effect.f & 16384) !== 0) return d.v;
		return get(d);
	});
}
//#endregion
//#region node_modules/svelte/src/legacy/legacy-client.js
/** @import { ComponentConstructorOptions, ComponentType, SvelteComponent, Component } from 'svelte' */
/**
* Takes the same options as a Svelte 4 component and the component function and returns a Svelte 4 compatible component.
*
* @deprecated Use this only as a temporary solution to migrate your imperative component code to Svelte 5.
*
* @template {Record<string, any>} Props
* @template {Record<string, any>} Exports
* @template {Record<string, any>} Events
* @template {Record<string, any>} Slots
*
* @param {ComponentConstructorOptions<Props> & {
* 	component: ComponentType<SvelteComponent<Props, Events, Slots>> | Component<Props>;
* }} options
* @returns {SvelteComponent<Props, Events, Slots> & Exports}
*/
function createClassComponent(options) {
	return new Svelte4Component(options);
}
/**
* Support using the component as both a class and function during the transition period
* @typedef  {{new (o: ComponentConstructorOptions): SvelteComponent;(...args: Parameters<Component<Record<string, any>>>): ReturnType<Component<Record<string, any>, Record<string, any>>>;}} LegacyComponentType
*/
var Svelte4Component = class {
	/** @type {any} */
	#events;
	/** @type {Record<string, any>} */
	#instance;
	/**
	* @param {ComponentConstructorOptions & {
	*  component: any;
	* }} options
	*/
	constructor(options) {
		var sources = /* @__PURE__ */ new Map();
		/**
		* @param {string | symbol} key
		* @param {unknown} value
		*/
		var add_source = (key, value) => {
			var s = /* @__PURE__ */ mutable_source(value, false, false);
			sources.set(key, s);
			return s;
		};
		const props = new Proxy({
			...options.props || {},
			$$events: {}
		}, {
			get(target, prop) {
				return get(sources.get(prop) ?? add_source(prop, Reflect.get(target, prop)));
			},
			has(target, prop) {
				if (prop === LEGACY_PROPS) return true;
				get(sources.get(prop) ?? add_source(prop, Reflect.get(target, prop)));
				return Reflect.has(target, prop);
			},
			set(target, prop, value) {
				set(sources.get(prop) ?? add_source(prop, value), value);
				return Reflect.set(target, prop, value);
			}
		});
		this.#instance = (options.hydrate ? hydrate : mount)(options.component, {
			target: options.target,
			anchor: options.anchor,
			props,
			context: options.context,
			intro: options.intro ?? false,
			recover: options.recover,
			transformError: options.transformError
		});
		if (!async_mode_flag && (!options?.props?.$$host || options.sync === false)) flushSync();
		this.#events = props.$$events;
		for (const key of Object.keys(this.#instance)) {
			if (key === "$set" || key === "$destroy" || key === "$on") continue;
			define_property(this, key, {
				get() {
					return this.#instance[key];
				},
				/** @param {any} value */
				set(value) {
					this.#instance[key] = value;
				},
				enumerable: true
			});
		}
		this.#instance.$set = (next) => {
			Object.assign(props, next);
		};
		this.#instance.$destroy = () => {
			unmount(this.#instance);
		};
	}
	/** @param {Record<string, any>} props */
	$set(props) {
		this.#instance.$set(props);
	}
	/**
	* @param {string} event
	* @param {(...args: any[]) => any} callback
	* @returns {any}
	*/
	$on(event, callback) {
		this.#events[event] = this.#events[event] || [];
		/** @param {any[]} args */
		const cb = (...args) => callback.call(this, ...args);
		this.#events[event].push(cb);
		return () => {
			this.#events[event] = this.#events[event].filter(
				/** @param {any} fn */
				(fn) => fn !== cb
			);
		};
	}
	$destroy() {
		this.#instance.$destroy();
	}
};
//#endregion
//#region node_modules/svelte/src/internal/client/dom/elements/custom-element.js
/**
* @typedef {Object} CustomElementPropDefinition
* @property {string} [attribute]
* @property {boolean} [reflect]
* @property {'String'|'Boolean'|'Number'|'Array'|'Object'} [type]
*/
/** @type {any} */
var SvelteElement;
if (typeof HTMLElement === "function") SvelteElement = class extends HTMLElement {
	/** The Svelte component constructor */
	$$ctor;
	/** Slots */
	$$s;
	/** @type {any} The Svelte component instance */
	$$c;
	/** Whether or not the custom element is connected */
	$$cn = false;
	/** @type {Record<string, any>} Component props data */
	$$d = {};
	/** `true` if currently in the process of reflecting component props back to attributes */
	$$r = false;
	/** @type {Record<string, CustomElementPropDefinition>} Props definition (name, reflected, type etc) */
	$$p_d = {};
	/** @type {Record<string, EventListenerOrEventListenerObject[]>} Event listeners */
	$$l = {};
	/** @type {Map<EventListenerOrEventListenerObject, Function>} Event listener unsubscribe functions */
	$$l_u = /* @__PURE__ */ new Map();
	/** @type {any} The managed render effect for reflecting attributes */
	$$me;
	/** @type {ShadowRoot | null} The ShadowRoot of the custom element */
	$$shadowRoot = null;
	/**
	* @param {*} $$componentCtor
	* @param {*} $$slots
	* @param {ShadowRootInit | undefined} shadow_root_init
	*/
	constructor($$componentCtor, $$slots, shadow_root_init) {
		super();
		this.$$ctor = $$componentCtor;
		this.$$s = $$slots;
		if (shadow_root_init) this.$$shadowRoot = this.attachShadow(shadow_root_init);
	}
	/**
	* @param {string} type
	* @param {EventListenerOrEventListenerObject} listener
	* @param {boolean | AddEventListenerOptions} [options]
	*/
	addEventListener(type, listener, options) {
		this.$$l[type] = this.$$l[type] || [];
		this.$$l[type].push(listener);
		if (this.$$c) {
			const unsub = this.$$c.$on(type, listener);
			this.$$l_u.set(listener, unsub);
		}
		super.addEventListener(type, listener, options);
	}
	/**
	* @param {string} type
	* @param {EventListenerOrEventListenerObject} listener
	* @param {boolean | AddEventListenerOptions} [options]
	*/
	removeEventListener(type, listener, options) {
		super.removeEventListener(type, listener, options);
		if (this.$$c) {
			const unsub = this.$$l_u.get(listener);
			if (unsub) {
				unsub();
				this.$$l_u.delete(listener);
			}
		}
	}
	async connectedCallback() {
		this.$$cn = true;
		if (!this.$$c) {
			await Promise.resolve();
			if (!this.$$cn || this.$$c) return;
			/** @param {string} name */
			function create_slot(name) {
				/**
				* @param {Element} anchor
				*/
				return (anchor) => {
					const slot = create_element("slot");
					if (name !== "default") slot.name = name;
					append(anchor, slot);
				};
			}
			/** @type {Record<string, any>} */
			const $$slots = {};
			const existing_slots = get_custom_elements_slots(this);
			for (const name of this.$$s) if (name in existing_slots) if (name === "default" && !this.$$d.children) {
				this.$$d.children = create_slot(name);
				$$slots.default = true;
			} else $$slots[name] = create_slot(name);
			for (const attribute of this.attributes) {
				const name = this.$$g_p(attribute.name);
				if (!(name in this.$$d)) this.$$d[name] = get_custom_element_value(name, attribute.value, this.$$p_d, "toProp");
			}
			for (const key in this.$$p_d) if (!(key in this.$$d) && this[key] !== void 0) {
				this.$$d[key] = this[key];
				delete this[key];
			}
			this.$$c = createClassComponent({
				component: this.$$ctor,
				target: this.$$shadowRoot || this,
				props: {
					...this.$$d,
					$$slots,
					$$host: this
				}
			});
			this.$$me = effect_root(() => {
				render_effect(() => {
					this.$$r = true;
					for (const key of object_keys(this.$$c)) {
						if (!this.$$p_d[key]?.reflect) continue;
						this.$$d[key] = this.$$c[key];
						const attribute_value = get_custom_element_value(key, this.$$d[key], this.$$p_d, "toAttribute");
						if (attribute_value == null) this.removeAttribute(this.$$p_d[key].attribute || key);
						else this.setAttribute(this.$$p_d[key].attribute || key, attribute_value);
					}
					this.$$r = false;
				});
			});
			for (const type in this.$$l) for (const listener of this.$$l[type]) {
				const unsub = this.$$c.$on(type, listener);
				this.$$l_u.set(listener, unsub);
			}
			this.$$l = {};
		}
	}
	/**
	* @param {string} attr
	* @param {string} _oldValue
	* @param {string} newValue
	*/
	attributeChangedCallback(attr, _oldValue, newValue) {
		if (this.$$r) return;
		attr = this.$$g_p(attr);
		this.$$d[attr] = get_custom_element_value(attr, newValue, this.$$p_d, "toProp");
		this.$$c?.$set({ [attr]: this.$$d[attr] });
	}
	disconnectedCallback() {
		this.$$cn = false;
		Promise.resolve().then(() => {
			if (!this.$$cn && this.$$c) {
				this.$$c.$destroy();
				this.$$me();
				this.$$c = void 0;
			}
		});
	}
	/**
	* @param {string} attribute_name
	*/
	$$g_p(attribute_name) {
		return object_keys(this.$$p_d).find((key) => this.$$p_d[key].attribute === attribute_name || !this.$$p_d[key].attribute && key.toLowerCase() === attribute_name) || attribute_name;
	}
};
/**
* @param {string} prop
* @param {any} value
* @param {Record<string, CustomElementPropDefinition>} props_definition
* @param {'toAttribute' | 'toProp'} [transform]
*/
function get_custom_element_value(prop, value, props_definition, transform) {
	const type = props_definition[prop]?.type;
	value = type === "Boolean" && typeof value !== "boolean" ? value != null : value;
	if (!transform || !props_definition[prop]) return value;
	else if (transform === "toAttribute") switch (type) {
		case "Object":
		case "Array": return value == null ? null : JSON.stringify(value);
		case "Boolean": return value ? "" : null;
		case "Number": return value == null ? null : value;
		default: return value;
	}
	else switch (type) {
		case "Object":
		case "Array": return value && JSON.parse(value);
		case "Boolean": return value;
		case "Number": return value != null ? +value : value;
		default: return value;
	}
}
/**
* @param {HTMLElement} element
*/
function get_custom_elements_slots(element) {
	/** @type {Record<string, true>} */
	const result = {};
	element.childNodes.forEach((node) => {
		result[node.slot || "default"] = true;
	});
	return result;
}
/**
* @internal
*
* Turn a Svelte component into a custom element.
* @param {any} Component  A Svelte component function
* @param {Record<string, CustomElementPropDefinition>} props_definition  The props to observe
* @param {string[]} slots  The slots to create
* @param {string[]} exports  Explicitly exported values, other than props
* @param {ShadowRootInit | undefined} shadow_root_init  Options passed to shadow DOM constructor
* @param {(ce: new () => HTMLElement) => new () => HTMLElement} [extend]
*/
function create_custom_element(Component, props_definition, slots, exports, shadow_root_init, extend) {
	let Class = class extends SvelteElement {
		constructor() {
			super(Component, slots, shadow_root_init);
			this.$$p_d = props_definition;
		}
		static get observedAttributes() {
			return object_keys(props_definition).map((key) => (props_definition[key].attribute || key).toLowerCase());
		}
	};
	object_keys(props_definition).forEach((prop) => {
		define_property(Class.prototype, prop, {
			get() {
				return this.$$c && prop in this.$$c ? this.$$c[prop] : this.$$d[prop];
			},
			set(value) {
				value = get_custom_element_value(prop, value, props_definition);
				this.$$d[prop] = value;
				var component = this.$$c;
				if (component) if (get_descriptor(component, prop)?.get) component[prop] = value;
				else component.$set({ [prop]: value });
			}
		});
	});
	exports.forEach((property) => {
		define_property(Class.prototype, property, { get() {
			return this.$$c?.[property];
		} });
	});
	if (extend) Class = extend(Class);
	Component.element = Class;
	return Class;
}
//#endregion
//#region src/assets/logos/hifk.svg
var hifk_default = "data:image/svg+xml,%3csvg%20width='225'%20height='256'%20viewBox='0%200%20225%20256'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M112.566%200C115.192%202.48596%20135.578%2021.0049%20161.646%2022.2023C181.816%2023.1292%20212.205%208.19682%20212.205%208.19682C212.205%208.19682%20244.308%2080.9229%20206.195%20159.321C173.058%20227.482%20112.456%20256.002%20112.456%20256.002C112.39%20256.002%2051.7886%20227.482%2018.6513%20159.321C-19.4621%2080.9229%2012.6412%208.19682%2012.6412%208.19682C12.6412%208.19682%2043.0298%2023.1292%2063.2005%2022.2023C89.2681%2021.0049%20109.655%202.48596%20112.281%200H112.566Z'%20fill='%230B1E53'/%3e%3cpath%20d='M112.566%200C115.192%202.48596%20135.578%2021.0049%20161.646%2022.2023C181.816%2023.1292%20212.205%208.19682%20212.205%208.19682C212.205%208.19682%20244.308%2080.9229%20206.195%20159.321C173.058%20227.482%20112.456%20256.002%20112.456%20256.002H112.39C112.39%20256.002%2051.7886%20227.482%2018.6513%20159.321C-19.4621%2080.9229%2012.6412%208.19682%2012.6412%208.19682C12.6412%208.19682%2043.0298%2023.1292%2063.2005%2022.2023C89.2681%2021.0049%20109.655%202.48596%20112.281%200H112.566Z'%20fill='%230B1E53'/%3e%3cpath%20d='M196.799%2022.0237C201.259%2020.4289%20205.247%2018.8125%20208.361%2017.48C208.878%2019.0014%20209.45%2020.769%20210.05%2022.7651C212.378%2030.5244%20215.098%2041.6589%20216.672%2055.1565C219.825%2082.2099%20218.357%20118.592%20200.021%20156.311C184.006%20189.252%20161.322%20212.673%20142.577%20227.878C133.238%20235.455%20124.902%20240.97%20118.9%20244.589C116.196%20246.221%20113.978%20247.459%20112.374%20248.32C110.906%20247.482%20108.668%20246.231%20105.946%20244.589C99.9441%20240.97%2091.6088%20235.455%2082.2694%20227.878C63.5245%20212.673%2040.8399%20189.252%2024.8257%20156.311C6.48911%20118.592%205.0212%2082.2094%208.17463%2055.1565C9.7479%2041.6589%2012.4681%2030.5244%2014.7973%2022.7651C15.3961%2020.769%2015.9678%2019.0014%2016.4854%2017.48C19.5986%2018.8125%2023.5874%2020.4299%2028.0478%2022.0237C38.2736%2025.6793%2051.9973%2029.6015%2063.5152%2029.0725C86.1948%2028.0306%20104.642%2015.2759%20112.737%208.70279C119.343%2014.7048%20138.146%2028.0067%20161.332%2029.0725C172.849%2029.6015%20186.573%2025.6793%20196.799%2022.0237Z'%20fill='%23A0ACAF'/%3e%3cpath%20d='M155.348%2034.0708C136.348%2031.6686%20120.819%2022.1886%20112.606%2015.7628C102.919%2022.9555%2085.2151%2033.5829%2063.7669%2034.568C51.104%2035.1503%2036.5142%2030.8919%2026.201%2027.2056C23.9745%2026.4094%2021.8624%2025.6083%2019.9124%2024.8375C17.6846%2032.3458%2015.1262%2042.9723%2013.6315%2055.7951C11.4342%2074.6429%2011.5531%2098.0877%2018.3258%20123.302C76.0364%20115.031%20125.575%2081.4122%20155.348%2034.0708ZM55.3931%20193.599C65.5574%20205.895%2076.1581%20215.84%2085.7277%20223.603C94.8213%20230.98%20102.936%20236.352%20108.78%20239.877C110.124%20240.687%20111.348%20241.401%20112.416%20242.014C113.496%20241.402%20114.718%20240.69%20116.066%20239.876C121.91%20236.352%20130.025%20230.98%20139.119%20223.603C157.426%20208.753%20179.51%20185.932%20195.081%20153.902C206.729%20129.942%20211.357%20106.528%20212.298%2085.8282C175.27%20138.693%20119.877%20177.713%2055.3931%20193.599Z'%20fill='%230B1E53'/%3e%3cpath%20d='M212.472%2075.7733C212.404%2068.6859%20211.937%2061.9895%20211.216%2055.7951C209.72%2042.9724%20207.162%2032.3458%20204.934%2024.8376C202.984%2025.6083%20200.872%2026.4094%20198.645%2027.2056C188.444%2030.8523%20174.058%2035.0559%20161.49%2034.5822C131.183%2084.3166%2079.8495%20119.794%2019.8561%20128.629C22.3736%20136.92%2025.6199%20145.375%2029.7652%20153.902C36.1747%20167.086%2043.6883%20178.706%2051.5868%20188.856C118.608%20173.035%20175.815%20131.758%20212.472%2075.7733Z'%20fill='white'/%3e%3cpath%20d='M199.04%2081.0927C197.329%2081.0927%20195.913%2079.698%20195.883%2077.9833C195.853%2076.2382%20197.246%2074.7941%20198.987%2074.7652L199.043%2074.7643C200.754%2074.7643%20202.17%2076.1589%20202.201%2077.8727C202.231%2079.6158%20200.838%2081.0609%20199.097%2081.0917L199.04%2081.0927ZM161.665%20121.343C161.301%20121.349%20160.971%20121.209%20160.681%20120.926C160.268%20120.522%20160.023%20119.715%20161.196%20118.165C162.448%20116.53%20162.216%20115.189%20160.369%20113.384L135.194%2088.7767C133.914%2087.5244%20132.97%2086.8036%20131.925%2086.8197C131.456%2086.827%20130.953%2086.9807%20130.382%2087.2919C130.105%2087.4534%20129.846%2087.6335%20129.595%2087.8092C129.04%2088.1963%20128.56%2088.5305%20128.057%2088.5383C127.72%2088.5437%20127.407%2088.3979%20127.097%2088.0964C126.762%2087.7681%20126.677%2087.3526%20126.843%2086.8618C126.984%2086.4502%20127.301%2085.9897%20127.785%2085.4925C128.738%2084.5153%20129.781%2083.5591%20130.789%2082.6342C131.815%2081.6936%20132.877%2080.7198%20133.866%2079.7049C135.183%2078.3532%20136.459%2076.8984%20137.586%2075.6143C138.411%2074.6742%20139.124%2073.8619%20139.661%2073.3094C140.763%2072.1795%20141.517%2071.672%20142.109%2071.6627C142.415%2071.6583%20142.685%2071.7806%20142.959%2072.0483C143.726%2072.799%20143.047%2074.0058%20142.281%2075.0872C141.014%2076.8235%20141.323%2077.6867%20144.225%2080.5226L153.363%2089.4564C153.741%2089.8263%20154.021%2089.9002%20154.189%2089.8978C154.308%2089.8958%20154.411%2089.8542%20154.487%2089.7759C155.045%2089.2034%20154.834%2087.7519%20154.325%2084.2452C154.112%2082.7692%20153.845%2080.9332%20153.558%2078.6356C152.775%2072.2768%20152.015%2068.8146%20151.233%2068.0531C150.983%2067.807%20150.687%2067.6842%20150.354%2067.6891C149.933%2067.6954%20149.44%2067.9049%20148.889%2068.3106C148.096%2068.8807%20147.404%2069.1855%20146.889%2069.1939C146.607%2069.1978%20146.375%2069.1151%20146.202%2068.9462C145.175%2067.9396%20145.819%2066.9947%20146.667%2066.1226C147.193%2065.5829%20147.774%2065.0832%20148.387%2064.5532C149.115%2063.9249%20149.941%2063.2138%20150.831%2062.2992C152.184%2060.9109%20152.965%2059.9841%20153.72%2059.0866C154.35%2058.3374%20154.946%2057.6297%20155.807%2056.7459C156.986%2055.5382%20157.618%2055.086%20158.14%2055.0777C158.44%2055.0733%20158.712%2055.2123%20159.05%2055.5426C159.699%2056.1773%20159.939%2056.7435%20157.823%2059.2578C154.411%2063.4385%20156.237%2077.1352%20157.272%2078.1453C157.678%2078.5426%20158.243%2078.6934%20159.755%2079.0956C160.492%2079.2923%20161.408%2079.5351%20162.638%2079.8952L184.541%2085.955C185.062%2086.091%20185.518%2086.2241%20185.945%2086.3479C187%2086.6548%20187.91%2086.9195%20189.252%2087.0614C189.52%2087.0957%20189.781%2087.1099%20190.03%2087.1065C190.967%2087.0918%20191.646%2086.8173%20192.188%2086.5501C192.297%2086.4972%20192.4%2086.4434%20192.499%2086.3925C192.91%2086.1806%20193.264%2085.9981%20193.623%2085.9927C193.959%2085.9873%20194.272%2086.137%20194.605%2086.462C194.976%2086.8251%20195.024%2087.3095%20194.746%2087.8997C194.554%2088.3078%20194.211%2088.7625%20193.697%2089.29C193.002%2090.002%20192.112%2090.8227%20191.169%2091.6898C190.028%2092.741%20188.735%2093.9326%20187.508%2095.1907C186.606%2096.1151%20185.759%2097.0978%20184.94%2098.0476C184.12%2098.9994%20183.272%2099.983%20182.368%20100.911C181.648%20101.651%20181.041%20102.015%20180.513%20102.023C180.205%20102.028%20179.923%20101.908%20179.675%20101.667C179.112%20101.116%20179.343%20100.543%20179.564%2099.9899C179.809%2099.3821%20180.061%2098.7538%20179.354%2098.0633C178.589%2097.3131%20177.577%2096.9456%20172.596%2095.6101C169.271%2094.719%20166.746%2094.0089%20164.717%2093.4383C161.187%2092.4449%20159.416%2091.9463%20158.522%2091.96C158.174%2091.9653%20157.945%2092.0461%20157.774%2092.2208C157.462%2092.5403%20157.33%2092.7718%20157.332%2092.9945C157.335%2093.2333%20157.494%2093.4941%20157.849%2093.8406L167.605%20103.378C169.563%20105.293%20170.793%20106.032%20171.99%20106.014C172.515%20106.006%20173.054%20105.841%20173.642%20105.513C174.761%20104.864%20175.36%20104.609%20175.779%20104.603C176.03%20104.599%20176.232%20104.684%20176.432%20104.88C177.055%20105.49%20176.818%20106.606%20175.855%20107.594C174.958%20108.514%20173.986%20109.398%20173.047%20110.252C172.087%20111.125%20171.094%20112.028%20170.159%20112.989C168.98%20114.198%20167.851%20115.468%20166.762%20116.697C165.675%20117.922%20164.551%20119.188%20163.377%20120.394C162.77%20121.016%20162.195%20121.335%20161.665%20121.343ZM145.702%20133.954C143.991%20133.954%20142.575%20132.559%20142.545%20130.845C142.53%20130%20142.845%20129.2%20143.431%20128.592C144.017%20127.983%20144.804%20127.641%20145.649%20127.627L145.705%20127.626C147.416%20127.626%20148.832%20129.02%20148.862%20130.735C148.893%20132.479%20147.5%20133.923%20145.758%20133.953L145.702%20133.954ZM114.072%20155.926C113.718%20155.926%20113.431%20155.728%20113.168%20155.301C112.572%20154.337%20113.22%20153.682%20113.97%20152.924C115.039%20151.841%20116.371%20150.494%20114.582%20147.597L96.1613%20117.766C95.2255%20116.251%2094.2286%20114.891%2092.3291%20114.891C92.1537%20114.891%2091.9699%20114.903%2091.7818%20114.926C91.4153%20114.99%2091.0361%20115.143%2090.6696%20115.291C90.2078%20115.476%2089.7724%20115.651%2089.3746%20115.651H89.3717C88.969%20115.651%2088.6587%20115.466%2088.4256%20115.085C88.1349%20114.617%2088.1769%20114.152%2088.5541%20113.661C88.863%20113.258%2089.3951%20112.835%2090.2796%20112.288C92.0994%20111.161%2093.9818%20110.071%2095.9751%20108.919C98.3539%20107.544%20101.05%20105.987%20104.172%20104.054C107.791%20101.813%20109.906%20100.369%20111.606%2099.2084C112.696%2098.4646%20113.637%2097.822%20114.669%2097.1834C115.435%2096.7092%20116.015%2096.4777%20116.441%2096.4777C116.813%2096.4777%20117.09%2096.6476%20117.314%2097.0107L122.465%20105.352C122.953%20106.141%20123.175%20106.759%20123.145%20107.239C123.115%20107.69%20122.875%20108.039%20122.388%20108.34C122.125%20108.504%20121.838%20108.583%20121.511%20108.583C120.538%20108.583%20119.371%20107.86%20118.021%20107.024C117.76%20106.862%20117.494%20106.698%20117.219%20106.532C115.472%20105.477%20113.561%20104.501%20111.419%20104.501C110.04%20104.501%20108.73%20104.899%20107.409%20105.716C104.704%20107.393%20104.565%20108.139%20105.511%20109.671L113.381%20122.417C113.515%20122.632%20113.769%20122.747%20114.114%20122.747C114.56%20122.747%20115.11%20122.557%20115.664%20122.215C118.153%20120.673%20119.244%20118.612%20118.817%20116.254C118.703%20115.642%20118.581%20115.124%20118.474%20114.668C118.136%20113.214%20117.965%20112.485%20118.818%20111.958C119.092%20111.788%20119.345%20111.706%20119.591%20111.706C120.075%20111.706%20120.507%20112.024%20120.911%20112.681C121.43%20113.52%20121.909%20114.433%20122.416%20115.4C122.955%20116.424%20123.51%20117.484%20124.148%20118.518C124.888%20119.716%20125.719%20120.911%20126.523%20122.066C127.33%20123.225%20128.164%20124.423%20128.906%20125.627C129.148%20126.019%20129.229%20126.465%20129.13%20126.884C129.036%20127.285%20128.791%20127.625%20128.442%20127.84C128.221%20127.978%20128.002%20128.044%20127.774%20128.044C127.073%20128.044%20126.339%20127.408%20125.227%20126.446C124.722%20126.007%20124.148%20125.51%20123.459%20124.968C122.462%20124.201%20121.67%20123.874%20120.818%20123.874C119.909%20123.874%20118.875%20124.262%20117.466%20125.134C116.248%20125.891%20115.839%20126.395%20116.102%20126.821L125.128%20141.436C125.911%20142.705%20126.986%20143.376%20128.236%20143.376C128.868%20143.376%20129.554%20143.207%20130.274%20142.874C130.464%20142.787%20130.657%20142.687%20130.85%20142.588C131.409%20142.301%20131.986%20142.004%20132.496%20142.004C132.918%20142.004%20133.247%20142.205%20133.501%20142.616C133.766%20143.044%20133.72%20143.498%20133.362%20143.966C133.071%20144.347%20132.576%20144.745%20131.806%20145.223C130.151%20146.248%20128.663%20147.073%20127.225%20147.872C125.784%20148.672%20124.423%20149.427%20122.911%20150.362C121.729%20151.095%20120.61%20151.875%20119.427%20152.701C118.248%20153.524%20117.03%20154.374%20115.746%20155.168C115.035%20155.608%20114.522%20155.926%20114.072%20155.926ZM101.895%20162.232C100.184%20162.232%2098.7678%20160.838%2098.737%20159.123C98.7063%20157.379%20100.099%20155.934%20101.841%20155.905L101.895%20155.904C103.607%20155.904%20105.024%20157.299%20105.055%20159.013C105.086%20160.757%20103.694%20162.201%20101.952%20162.231L101.895%20162.232ZM72.3689%20175.657C71.9086%20175.654%2071.5988%20175.449%2071.4194%20175.032C70.8286%20173.645%2072.1226%20172.846%2073.3731%20172.072C74.8074%20171.213%2074.8123%20170.002%2073.3932%20166.678L59.5961%20134.356C58.9017%20132.728%2058.4423%20131.65%2056.8771%20131.488L56.754%20131.487C56.3108%20131.484%2055.8353%20131.548%2055.4527%20131.6L55.3872%20131.609C54.9777%20131.665%2054.5911%20131.718%2054.2564%20131.716C53.9065%20131.713%2053.4169%20131.657%2053.2204%20131.197C52.7669%20130.134%2053.6544%20129.657%2054.9562%20129.098C55.2196%20128.985%2055.6183%20128.846%2056.171%20128.652C57.4352%20128.211%2059.5502%20127.472%2062.7162%20126.116C65.5916%20124.886%2067.4944%20123.934%2068.8832%20123.24C69.6871%20122.838%2070.3224%20122.52%2070.8775%20122.281C71.4903%20122.02%2071.979%20121.893%2072.3704%20121.896C72.8493%20121.899%2073.1767%20122.101%2073.3453%20122.496C73.6791%20123.278%2072.6372%20124.237%2071.7166%20125.082C71.5572%20125.227%2071.4023%20125.37%2071.2587%20125.507C69.9573%20126.829%2070.0995%20127.866%2070.9415%20129.84L85.4159%20163.75C85.9637%20165.033%2086.6654%20165.607%2087.6926%20165.614C88.0718%20165.617%2088.4549%20165.544%2088.8131%20165.464C89.3815%20165.338%2089.9312%20165.215%2090.4282%20165.218C91.2066%20165.223%2091.7232%20165.551%2092.0085%20166.219C92.1825%20166.627%2092.1229%20166.986%2091.8258%20167.315C91.5712%20167.596%2091.1363%20167.862%2090.4575%20168.153C89.9024%20168.39%2089.2344%20168.631%2088.388%20168.935C86.9264%20169.459%2084.9253%20170.179%2082.05%20171.41C79.1746%20172.642%2077.2722%20173.592%2075.8829%20174.287C75.0791%20174.69%2074.4433%20175.008%2073.8872%20175.245C73.2251%20175.528%2072.7423%20175.659%2072.3689%20175.657ZM112.39%20216.059L107.343%20204.605L95.9057%20199.552L107.343%20194.497L112.39%20183.044L117.436%20194.497L128.874%20199.552L117.436%20204.605L112.39%20216.059ZM97.0003%2051.2959L95.396%2059.0239H96.8625L97.123%2059.0254C97.9947%2059.0254%2099.0796%2059.0254%2099.5052%2058.0706C99.6264%2057.8167%2099.7066%2057.6302%2099.7681%2057.4883C99.7931%2057.4306%2099.8121%2057.3846%2099.8307%2057.3449C99.8756%2057.3161%2099.9338%2057.2838%20100.009%2057.2392C100.177%2057.1404%20100.405%2057.0043%20100.72%2056.8017C101.434%2056.3525%20104.013%2056.3525%20105.253%2056.3525H105.69L106.116%2056.3535H111.857C109.922%2059.2309%20107.311%2063.7497%20105.792%2066.5254C103.324%2071.0588%20100.25%2076.7016%20100.031%2080.2299C99.9934%2080.7775%20100.135%2081.2258%20100.45%2081.5644C100.982%2082.137%20101.865%2082.252%20103.115%2082.252C104.388%2082.252%20106.311%2082.252%20106.452%2080.4619C107.092%2072.4447%20111.62%2061.8177%20117.219%2055.1932L117.444%2054.9275V51.2959H97.0003ZM86.7529%2063.8911L86.7519%2064.4304C85.8557%2065.9127%2084.6335%2067.3558%2082.4614%2067.3558C79.4424%2067.3558%2078.0683%2064.1246%2078.0683%2061.1228C78.0683%2060.8341%2078.1142%2054.0662%2082.1052%2054.0662C83.3826%2054.0662%2084.3438%2054.4068%2085.0416%2055.11C86.7803%2056.857%2086.7661%2060.5938%2086.7529%2063.8911ZM82.3593%2050.7919C76.6072%2050.7919%2072.1002%2055.4506%2072.1002%2061.3973C72.1002%2066.22%2074.9105%2071.0872%2081.1889%2071.0872C83.3786%2071.0872%2085.1945%2070.5141%2086.618%2069.3813C86.5423%2071.8335%2086.2921%2074.201%2085.5048%2076.0332C84.7787%2077.7396%2083.0234%2078.8866%2081.1381%2078.8866C80.1725%2078.8866%2079.4654%2078.6444%2079.0363%2078.1653C78.5755%2077.6505%2078.4011%2076.8313%2078.5193%2075.7293L78.5613%2075.3407L78.3195%2075.0363C77.6632%2074.2093%2076.7538%2073.8076%2075.5419%2073.8076C74.0343%2073.8076%2072.6079%2075.3368%2072.6079%2076.9547C72.6079%2078.7702%2073.6913%2080.2138%2075.9269%2081.3707C77.3592%2082.0988%2079.2748%2082.252%2080.6289%2082.252C85.0479%2082.252%2088.8728%2079.6608%2090.61%2075.4934C92.3545%2071.3505%2092.7205%2066.8097%2092.7205%2063.7311C92.7205%2055.1453%2089.2344%2050.7919%2082.3593%2050.7919ZM59.5169%2079.0246C57.4626%2079.0246%2054.6151%2077.1127%2054.6151%2073.5232C54.6151%2071.0187%2055.8861%2068.9599%2058.1198%2067.8138C61.7257%2069.7439%2064.063%2071.3035%2064.063%2074.2553C64.063%2077.0638%2062.1934%2079.0246%2059.5169%2079.0246ZM59.0077%2054.0192C62.66%2054.0192%2062.9444%2057.1443%2062.9444%2058.1025C62.9444%2060.0746%2062.2579%2061.437%2060.5304%2062.8116C58.1921%2061.3773%2055.5822%2059.7511%2055.5822%2057.5539C55.5822%2056.3217%2056.5873%2054.0192%2059.0077%2054.0192ZM63.8182%2064.6766C65.8364%2063.4815%2068.6071%2061.2226%2068.6071%2057.8274C68.6071%2053.686%2064.8488%2050.7924%2059.4676%2050.7924C53.5439%2050.7924%2049.7162%2053.8778%2049.7162%2058.652C49.7162%2062.3291%2052.1815%2064.4387%2054.5946%2065.9396C50.9823%2067.6773%2048.4443%2070.9428%2048.4443%2074.1168C48.4443%2079.1343%2052.5895%2082.2515%2059.2623%2082.2515C65.9713%2082.2515%2069.9803%2077.6505%2069.9803%2073.2027C69.9803%2069.3147%2067.5736%2066.8816%2063.8182%2064.6766ZM44.0716%2078.9645L43.9811%2078.9478C43.6473%2078.8881%2043.4455%2078.8509%2042.7816%2078.044L42.7617%2078.019L42.7398%2077.995C42.4061%2077.6412%2042.3374%2076.6278%2042.3374%2075.2159V50.7924H40.4723C39.9674%2050.7924%2039.4773%2051.0713%2038.9597%2051.3659C38.8234%2051.4432%2038.6913%2051.5191%2038.5363%2051.5974C36.3688%2052.8007%2034.7498%2053.2994%2031.0083%2053.9165L30.2132%2054.0466V54.8541C30.2132%2055.4937%2030.2132%2056.4602%2031.0302%2056.9505L31.2874%2057.1051L31.5857%2057.0831C32.0876%2057.0474%2032.5735%2056.9975%2033.0376%2056.9495C33.7294%2056.8781%2034.3822%2056.8115%2034.9266%2056.8115H34.9554L34.9835%2056.8096C35.04%2056.8066%2035.0969%2056.8047%2035.1515%2056.8047C35.543%2056.8047%2035.7268%2056.8942%2035.7514%2056.9162C35.987%2057.2901%2036.2674%2058.4279%2036.2674%2061.7179V75.2615C36.2674%2076.6101%2036.2674%2077.5845%2035.9652%2077.9045L35.9433%2077.9275L35.9236%2077.9525C35.3452%2078.6562%2034.7598%2078.7545%2034.2898%2078.8353L34.1247%2078.8641C33.5156%2079.0016%2033.1796%2079.4113%2033.1796%2080.0205V80.8436C33.1796%2081.5003%2033.6437%2081.977%2034.3184%2081.976C34.7149%2081.9603%2035.3074%2081.929%2035.9631%2081.8948C37.2066%2081.8297%2038.7539%2081.7479%2039.505%2081.7479C40.1273%2081.7479%2040.9203%2081.7988%2041.8376%2081.8585C42.4397%2081.8972%2043.0996%2081.9403%2043.8172%2081.976L43.8401%2081.977H43.8639C44.5021%2081.977%2044.9661%2081.5003%2044.9661%2080.8436V80.0205C44.9661%2079.4524%2044.6233%2079.0472%2044.0716%2078.9645Z'%20fill='%23A0ACAF'/%3e%3c/svg%3e";
//#endregion
//#region src/assets/logos/hpk.svg
var hpk_default = "data:image/svg+xml,%3csvg%20width='256'%20height='256'%20viewBox='0%200%20256%20256'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M0%20128C0%2057.3071%2057.3071%200%20128%200C198.695%200%20256.002%2057.3071%20256.002%20128C256.002%20198.691%20198.695%20256%20128%20256C57.3071%20256%200%20198.691%200%20128Z'%20fill='%23231F20'/%3e%3cpath%20d='M27.07%20128.002C27.07%2072.2633%2072.2557%2027.0758%20127.997%2027.0758C183.738%2027.0758%20228.923%2072.2633%20228.923%20128.002C228.923%20183.742%20183.738%20228.929%20127.997%20228.929C72.2557%20228.929%2027.07%20183.742%2027.07%20128.002Z'%20fill='%23F58427'/%3e%3cpath%20d='M16.7664%20128.002C16.7664%2066.5677%2066.5658%2016.7683%20127.998%2016.7683C189.434%2016.7683%20239.233%2066.5677%20239.233%20128.002C239.233%20189.432%20189.434%20239.235%20127.998%20239.235C66.5658%20239.235%2016.7664%20189.432%2016.7664%20128.002ZM23.0802%20128C23.0802%20185.947%2070.0542%20232.919%20128%20232.919C185.945%20232.919%20232.921%20185.947%20232.921%20128C232.921%2070.0543%20185.945%2023.0803%20128%2023.0803C70.0542%2023.0803%2023.0802%2070.0543%2023.0802%20128Z'%20fill='white'/%3e%3cpath%20d='M202.7%2071.5046C208.848%2080.6225%20215.042%20104.675%20203.755%20119.722C200.13%20124.554%20193.138%20128.852%20192.191%20130.025C192.191%20130.025%20244.789%20161.273%20171.891%20205.279L163.98%20183.415C163.98%20183.415%20189.162%20172.786%20189.162%20156.042C189.162%20140.564%20169.302%20137.767%20169.302%20137.767V155.793H147.037V111.922C147.037%20111.922%20154.818%20112.142%20159.564%20110.927C163.549%20109.907%20169.302%20106.883%20169.302%20106.883V122.396C169.302%20122.396%20200.829%20118.195%20187.513%2088.7546L202.7%2071.5046Z'%20fill='%23231F20'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M151.28%2057.7421C167.521%2057.7421%20175.785%2067.3098%20176.736%2080.6251C177.755%2094.891%20166.956%20106.152%20151.28%20107.018C150.509%20107.06%20131.132%20107.018%20131.132%20107.018V155.791H110.988V57.7157L151.28%2057.7421ZM133.023%2087.4221H148.258C151.627%2087.4221%20154.218%2084.8419%20154.221%2081.588C154.225%2078.3324%20152.84%2075.7416%20148.258%2075.7416H133.023V87.4221Z'%20fill='%23231F20'/%3e%3cpath%20d='M90.0179%20183.625C84.6688%20180.984%2061.1228%20162.148%2061.3785%20130.301L78.6496%20130.348V155.794H101.446V89.0037H78.6496V108.084H61.6871C61.7824%20107.615%2061.9252%20107.173%2062.091%20106.594C64.1527%2099.3332%2066.6323%2094.6984%2070.1631%2089.0037L57.3398%2071.013C57.3398%2071.013%2038.7759%2092.4269%2038.7001%20123.92C38.5608%20182.924%2078.9759%20203.503%2084.2879%20205.389L90.0179%20183.625Z'%20fill='%23231F20'/%3e%3cpath%20d='M202.662%20118.633C213.161%20104.512%20208.856%2085.4824%20202.5%2073.5145L189.107%2088.7258C197.891%20109.074%20186.07%20121.291%20167.924%20123.679V108.815L166.483%20109.489C160.018%20112.443%20155.427%20113.134%20148.395%20113.127V154.147H167.924V135.918C178.43%20137.393%20190.519%20143.19%20190.519%20155.766C190.519%20168.813%20176.222%20178.9%20165.684%20183.862L172.601%20202.962C207.553%20181.459%20211.769%20163.501%20208.06%20151.271C205.344%20142.315%20198.036%20134.127%20190.128%20129.411C190.722%20128.673%20198.817%20123.808%20202.662%20118.633ZM210.678%20150.475C217.981%20176.619%20187.017%20197.462%20171.166%20207.031L162.24%20182.385C171.954%20178.282%20187.788%20168.358%20187.788%20155.766C187.788%20144.043%20175.153%20140.158%20170.659%20139.146V156.884H145.662V110.337C157.314%20110.665%20160.646%20109.602%20170.659%20104.343V120.483C186.341%20117.157%20194.013%20106.182%20185.894%2088.2372L202.835%2068.9961C211.91%2082.4543%20217.157%20104.493%20204.838%20120.258C201.56%20124.455%20198.311%20126.668%20194.705%20129.411C194.705%20129.411%20207.381%20138.673%20210.678%20150.475Z'%20fill='white'/%3e%3cpath%20d='M175.36%2080.4037C174.819%2069.3987%20166.918%2058.8329%20151.28%2058.8329L112.346%2058.8082V154.144H129.755V105.075C129.755%20105.075%20150.428%20105.117%20151.194%20105.075C166.195%20104.246%20176.018%2093.8672%20175.36%2080.4037ZM178.092%2080.2697C178.833%2095.3803%20167.699%20107.003%20151.345%20107.906C150.698%20107.943%20136.936%20107.92%20132.489%20107.911V156.878H109.611V56.071L151.28%2056.0975C171.085%2056.0975%20177.524%2068.6597%20178.092%2080.2697ZM130.284%2090.1565V73.0053H148.259C154.638%2073.0053%20157.073%2076.7918%20157.07%2081.5888C157.066%2086.3824%20153.432%2090.1565%20148.259%2090.1565H130.284ZM133.023%2087.4211H148.259C151.627%2087.4211%20154.218%2084.8419%20154.221%2081.588C154.225%2078.3306%20152.839%2075.7407%20148.259%2075.7407H133.023V87.4211Z'%20fill='white'/%3e%3cpath%20d='M63.468%20106.439H77.2736L77.2718%2087.36H102.804V156.885H77.2718L77.2736%20131.433L62.7414%20131.396C62.9794%20148.646%2074.3936%20174.112%2091.6153%20182.62L85.2222%20206.896C51.0433%20192.479%2037.3241%20157.522%2037.3241%20123.639C37.3241%20104.693%2044.7842%2083.0903%2057.4364%2068.5298L71.7958%2088.6739C67.937%2094.8977%2065.5102%2099.3473%2063.468%20106.439ZM60.0025%20130.015L60.013%20128.653L80.0072%20128.708V154.146H100.068V90.0936H80.0072V109.174H59.9989C61.5068%20101.848%2064.6108%2095.1464%2068.5137%2088.7815L57.2671%2073.0024C46.4931%2087.0567%2040.1%20106.06%2040.0594%20123.646C39.9289%20178.121%2074.7904%20199.299%2083.3563%20203.246L88.4144%20184.033C81.3846%20179.809%2059.7555%20160.901%2060.0025%20130.015Z'%20fill='white'/%3e%3c/svg%3e";
//#endregion
//#region src/assets/logos/ilves.svg
var ilves_default = "data:image/svg+xml,%3csvg%20width='265'%20height='256'%20viewBox='0%200%20265%20256'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M251.034%2042.6845C239.528%2044.7399%20231.883%2035.7566%20220.838%2040.6218C214.618%2046.3632%20216.502%2054.7803%20213.954%2062.3139C213.966%2066.9174%20207.095%2070.8637%20210.743%2075.1968C220.679%2085.5344%20223.787%20100.883%20237.785%20107.715C230.819%20110.687%20227.383%20111.373%20224.637%20110.687C230.475%20115.839%20235.627%20133.7%20242.481%20137.986C239.764%20139.751%20232.866%20139.073%20229.788%20139.881C234.94%20145.033%20237.188%20153.537%20238.608%20160.108C239.891%20166.68%20240.075%20170.983%20235.284%20175.943C233.221%20175.842%20233.145%20171.919%20230.819%20172.51C230.635%20179.263%20221.546%20193.803%20222.233%20202.391C218.111%20197.925%20215.839%20197.809%20215.839%20197.809C214.451%20204.911%20212.372%20211.748%20209.601%20218.323C207.423%20219.529%20205.056%20217.716%20202.654%20217.828C200.247%20225.495%20201.969%20229.868%20203.686%20237.769C189.26%20238.798%20182.39%20231.241%20178.27%20224.373C166.592%20230.554%20166.248%20240.515%20167.623%20251.163C159.379%20249.101%20154.328%20247.732%20151.025%20243.461C148.478%20239.246%20147.364%20234.455%20147.819%20229.019C144.388%20229.287%20140.778%20231.068%20137.648%20232.77C135.748%20234.178%20135.231%20236.042%20135.06%20238.107C135.128%20241.953%20137.656%20245.068%20138.262%20248.287C125.984%20249.394%20114.24%20245.683%20106.376%20235.997C100.712%20234.242%2094.957%20231.249%2091.3561%20225.679C89.9998%20232.96%2074.9209%20248.323%2060.4628%20246.354C67.0225%20234.585%2067.8242%20227.601%2068.1477%20218.525C58.4021%20220.251%2057.3708%20232.96%2037.107%20236.05C41.2285%20217.846%2033.3291%20196.553%2040.5426%20187.966C35.3903%20184.187%2021.0426%20196.083%2013.9245%20197.583C13.6345%20188.862%2015.6261%20181.245%2018.8583%20173.563C21.6492%20168.155%2028.1602%20163.368%2024.5326%20156.287C22.7059%20149.999%2015.5507%20145.452%2010.7327%20141.003C12.6309%20139.595%2018.6725%20139.351%2016.5359%20134.993C14.1978%20130.978%209.81565%20127.828%206.45604%20124.312C13.9244%20121.51%2013.9244%20120.892%2018.4064%20114.705C23.9736%2094.9088%2028.5329%2091.9661%2041.2942%2083.1551C33.2522%2071.4013%2038.6643%2048.7961%2035.7464%2043.0075C29.3346%2033.8447%2017.4397%2037.2131%209.76555%2030.5449C10.6889%2028.33%208.93514%2026.2314%209.02806%2023.6876C11.9659%2022.7428%2011.0046%2018.9128%2013.868%2017.6256C13.0668%2015.0287%2016.4994%2014.8317%2016.0426%2012.2972C17.2651%2011.5208%2019.0485%2011.2838%2019.6371%209.62447C19.1225%207.70969%2019.228%205.8528%2020.507%204.31894C21.9226%202.78313%2023.6671%204.33256%2025.1825%204.58115C30.6924%209.29365%2032.8664%2015.7828%2039.5847%2018.8257C50.1874%2016.2357%2062.9521%2015.4636%2072.5912%2020.5853C82.4064%2023.9858%2090.0528%2032.9905%20100.855%2033.9012C107.574%2033.1661%20114.655%2033.386%20120.997%2034.5803C128.806%2033.2755%20136.551%2032.2476%20144.674%2033.1364C160.36%2030.5264%20171.179%2016.5967%20187.225%2014.9426C196.859%2011.8895%20206.332%2015.2963%20215.031%2017.755C221.85%2018.8038%20224.804%2010.8509%20231.051%2010.5366C237.278%209.12193%20244.363%209.68576%20249.835%2012.2004C250.309%2015.7653%20244.432%2021.4318%20250.379%2023.7333C251.284%2024.3356%20252.582%2023.9016%20253.682%2024.0193C254.259%2025.5887%20251.558%2028.3159%20254.466%2029.5705C254.351%2030.8777%20255.26%2031.6862%20256.168%2032.5638C257.751%2032.7419%20259.936%2032.017%20260.454%2034.1381C259.908%2038.2692%20254.865%2041.7923%20251.034%2042.6845ZM263.998%2033.2717C263.61%2031.6833%20262.338%2029.0403%20258.179%2028.9342L258.319%2027.2588L257.054%2026.713C257.355%2025.6807%20257.662%2024.2718%20257.107%2022.7618L256.326%2020.633L254.071%2020.3917C253.515%2020.3318%20252.887%2020.3489%20252.256%2020.3887C252.137%2020.3965%20252.018%2020.4048%20251.9%2020.4097L251.696%2020.3304C251.556%2020.2759%20251.448%2020.2268%20251.367%2020.1849C251.467%2019.5822%20251.912%2018.4715%20252.194%2017.7657C252.919%2015.9521%20253.741%2013.8957%20253.452%2011.7197L253.187%209.72516L251.359%208.88503C247.434%207.08117%20242.802%206.12767%20237.963%206.12767C235.426%206.12767%20232.926%206.3923%20230.53%206.91478C226.649%207.22807%20223.824%209.50966%20221.542%2011.3529C219.354%2013.1193%20217.928%2014.2017%20216.252%2014.2017C216.098%2014.2017%20215.94%2014.1925%20215.778%2014.1745C214.997%2013.9522%20214.21%2013.7235%20213.417%2013.4924C207.661%2011.818%20201.708%2010.0861%20195.319%2010.0861C192.191%2010.0861%20189.296%2010.5011%20186.482%2011.3534C177.5%2012.377%20170.202%2016.7762%20163.14%2021.0324C157.001%2024.7335%20151.195%2028.2332%20144.548%2029.4547C142.537%2029.2529%20140.515%2029.1546%20138.383%2029.1546C132.72%2029.1546%20127.319%2029.8386%20121.027%2030.8767C117.109%2030.1815%20112.96%2029.8293%20108.681%2029.8293C106.05%2029.8293%20103.411%2029.965%20100.83%2030.2346C95.479%2029.6805%2090.8064%2026.7018%2085.8647%2023.5523C82.1743%2021.1997%2078.3603%2018.7688%2074.0526%2017.232C68.8429%2014.5252%2062.5454%2013.1529%2055.3295%2013.1529C50.491%2013.1529%2045.3558%2013.7634%2040.0468%2014.9684C37.3989%2013.4501%2035.5853%2011.1082%2033.5227%208.44379C31.7986%206.21669%2030.0157%203.91372%2027.5541%201.80873L26.8088%201.15102L25.8028%200.986099C25.6889%200.959343%2025.3713%200.833811%2025.1606%200.750137C24.3613%200.43344%2023.2663%200%2021.9635%200C20.3688%200%2018.9371%200.638237%2017.8241%201.84616L17.7044%201.98239C16.6108%203.29442%2015.5021%205.39065%2015.7293%208.37325C15.7195%208.37762%2015.7103%208.38152%2015.7011%208.38589C15.2131%208.60481%2014.66%208.85291%2014.0869%209.21729L12.0175%2010.5313L12.3312%2012.2743C11.765%2012.8309%2010.5648%2014.014%2010.201%2015.81C9.03876%2017.0034%208.48806%2018.4093%208.1091%2019.3759C7.99964%2019.6566%207.84446%2020.0531%207.73013%2020.2725L5.47531%2020.9978L5.38191%2023.5543C5.3211%2025.2146%205.72682%2026.6089%206.05325%2027.7297C6.1953%2028.2186%206.41032%2028.9571%206.39816%2029.1405L5.38434%2031.5714L7.37256%2033.2989C11.4634%2036.8541%2016.4269%2038.0046%2020.8057%2039.0199C25.6262%2040.1378%2029.8045%2041.1064%2032.5711%2044.8415C33.1744%2046.4479%2033.0858%2051.2694%2033.0143%2055.1758C32.8577%2063.6955%2032.6674%2074.0467%2036.4736%2082.0532C25.4841%2089.6977%2020.4943%2094.0906%2015.0716%20113.09C14.8726%20113.366%2014.6829%20113.63%2014.5014%20113.882C11.1739%20118.513%2011.044%20118.694%205.17418%20120.896L0%20122.838L3.81836%20126.834C4.98153%20128.051%206.23567%20129.205%207.44846%20130.322C9.57339%20132.28%2011.5933%20134.139%2012.9325%20136.114C12.5317%20136.28%2012.0705%20136.446%2011.7314%20136.568C10.6398%20136.96%209.51064%20137.366%208.56006%20138.071L5.02143%20140.695L8.25747%20143.683C9.43474%20144.77%2010.7409%20145.861%2012.0038%20146.915C15.9025%20150.169%2019.9339%20153.535%2021.029%20157.305L21.1263%20157.641L21.2853%20157.951C22.8002%20160.907%2021.6901%20162.958%2018.5951%20167.273C17.5492%20168.733%2016.4673%20170.24%2015.6159%20171.89L15.4953%20172.148C11.6069%20181.39%209.99712%20189.271%2010.2778%20197.704L10.4218%20202.049L14.6765%20201.153C17.8902%20200.476%2021.7961%20198.327%2025.9317%20196.05C28.7547%20194.496%2032.0428%20192.687%2034.6956%20191.672C33.2357%20197.019%2033.6886%20203.713%2034.1892%20211.115C34.7092%20218.802%2035.2983%20227.515%2033.5485%20235.244L32.3668%20240.463L37.6573%20239.657C50.8748%20237.641%2056.8965%20231.643%2061.2932%20227.263C62.3114%20226.248%2063.2241%20225.339%2064.1168%20224.574C63.5033%20230.483%2061.949%20236.192%2057.2759%20244.578L54.6723%20249.248L59.9705%20249.97C60.9746%20250.106%2062.0079%20250.176%2063.0416%20250.176C75.5042%20250.175%2087.133%20240.508%2092.2853%20232.406C95.3909%20235.278%2099.3533%20237.505%20104.255%20239.146C111.485%20247.525%20122.041%20252.124%20134.113%20252.124C135.584%20252.124%20137.09%20252.056%20138.59%20251.92L142.592%20251.56L141.848%20247.611C141.519%20245.865%20140.833%20244.311%20140.169%20242.808C139.459%20241.2%20138.787%20239.677%20138.714%20238.212C138.85%20236.823%20139.146%20236.263%20139.653%20235.833C141.147%20235.027%20142.675%20234.252%20144.163%20233.667C144.497%20237.871%20145.748%20241.784%20147.902%20245.348L148.139%20245.693C152.318%20251.096%20158.681%20252.688%20166.738%20254.703L171.927%20256L171.242%20250.695C169.986%20240.979%20170.613%20234.144%20177.177%20229.335C183.132%20237.521%20190.987%20241.512%20201.089%20241.512C202.019%20241.512%20202.981%20241.477%20203.945%20241.408L208.146%20241.108L207.252%20236.994C207%20235.836%20206.749%20234.754%20206.509%20233.725C205.441%20229.128%20204.712%20225.994%20205.374%20222.038C206.147%20222.227%20206.994%20222.387%20207.924%20222.387C209.165%20222.387%20210.324%20222.093%20211.37%20221.515L212.473%20220.903L212.963%20219.739C215.152%20214.544%20216.94%20209.133%20218.3%20203.593C218.683%20203.956%20219.101%20204.377%20219.551%20204.865L226.712%20212.624L225.87%20202.1C225.552%20198.136%20228.126%20191.741%20230.396%20186.099C231.408%20183.585%20232.354%20181.234%20233.079%20179.07C233.655%20179.355%20234.325%20179.549%20235.104%20179.588L236.758%20179.669L237.908%20178.478C244.065%20172.104%20243.489%20166.071%20242.189%20159.409L242.174%20159.337C240.993%20153.874%20239.411%20147.941%20236.574%20142.929C239.517%20142.746%20242.396%20142.392%20244.468%20141.046L249.27%20137.929L244.416%20134.893C241.533%20133.09%20238.401%20126.903%20235.638%20121.444C234.278%20118.758%20232.956%20116.146%20231.588%20113.848C233.676%20113.287%20236.139%20112.384%20239.217%20111.071L246.56%20107.939L239.385%20104.436C231.69%20100.68%20227.58%2093.822%20223.23%2086.5609C220.408%2081.8508%20217.491%2076.9817%20213.472%2072.7712C213.225%2072.4545%20213.215%2072.1183%20214.82%2069.6057C215.968%2067.8081%20217.375%2065.6039%20217.578%2062.9696C218.462%2060.1627%20218.815%2057.3859%20219.157%2054.6951C219.736%2050.1437%20220.198%2046.5029%20222.885%2043.7212C224.457%2043.1053%20226.028%2042.8051%20227.67%2042.8051C230.412%2042.8051%20233.186%2043.6336%20236.123%2044.5117C239.467%2045.5114%20243.258%2046.6444%20247.507%2046.6444C248.906%2046.6444%20250.308%2046.5204%20251.675%2046.2762L251.861%2046.2382C256.434%2045.1728%20263.246%2040.8631%20264.072%2034.6158L264.161%2033.9371L263.998%2033.2717Z'%20fill='white'/%3e%3cpath%20d='M194.506%2053.9899C195.377%2052.5192%20196.278%2050.999%20197.758%2049.9375C198.368%2045.7879%20200.425%2042.5212%20203.269%2041.1902L203.348%2041.1717L204.848%2041.1459L204.521%2041.484C201.62%2044.4885%20201.246%2048.9368%20200.885%2053.2392C200.783%2054.4511%20200.679%2055.7047%20200.518%2056.9024L200.503%2057.0133L200.4%2057.0566C200.103%2057.1812%20199.786%2057.2979%20199.461%2057.4176C197.915%2057.9863%20196.316%2058.5739%20195.971%2060.2927L195.936%2060.3695C195.277%2061.2637%20193.963%2061.8645%20192.666%2061.8645C192.106%2061.8645%20191.585%2061.7555%20191.116%2061.5415L191.073%2061.5147C190.164%2060.7636%20189.285%2059.8042%20189.652%2058.3857L189.684%2058.2626L189.809%2058.2427C192.217%2057.8549%20193.329%2055.9776%20194.506%2053.9899ZM190.902%2045.9119C190.172%2046.5113%20189.482%2047.0775%20189.845%2048.1375L189.875%2048.2242L189.827%2048.3029C189.218%2049.2886%20188.218%2049.415%20187.415%2049.415C187.274%2049.415%20187.133%2049.4106%20186.991%2049.4034L186.839%2049.3966L186.809%2049.2472C186.358%2046.9914%20187.025%2044.397%20189.533%2043.6868L191.979%2043.3438L192.032%2043.4956C192.428%2044.6578%20191.618%2045.3242%20190.902%2045.9119ZM179.381%2055.8351C180.551%2057.6243%20182.206%2058.3409%20183.942%2058.9738C184.125%2059.0079%20184.33%2059.0283%20184.539%2059.0283C185.162%2059.0283%20185.695%2058.8469%20186.258%2058.6552C186.753%2058.4869%20187.264%2058.3132%20187.835%2058.2743L188.047%2058.2597L188.043%2058.4718C188.012%2060.3836%20189.117%2062.1763%20190.929%2063.1639L196.835%2062.7003L196.69%2063.0048C195.982%2064.4827%20195.164%2065.9927%20193.647%2066.7862L193.595%2066.8129L193.537%2066.8071C189.871%2066.4306%20186.952%2064.0964%20184.128%2061.8392C181.183%2059.4842%20178.138%2057.0488%20174.276%2056.9078L174.184%2056.9044L173.051%2055.4211L173.148%2055.3024C175.83%2051.9958%20178.748%2048.6668%20182.306%2047.457L182.479%2047.3981L182.549%2047.5679C183.237%2049.2555%20181.989%2050.424%20180.782%2051.5546C179.449%2052.8029%20178.19%2053.9816%20179.381%2055.8351ZM54.5764%2052.061C54.1507%2055.5091%2053.7824%2058.4903%2057.9618%2060.515C58.5124%2060.1929%2059.0665%2060.0363%2059.6532%2060.0363C60.5055%2060.0363%2061.2941%2060.371%2062.0574%2060.6945C62.8105%2061.0136%2063.5222%2061.3162%2064.2801%2061.3162C64.6868%2061.3162%2065.0716%2061.2277%2065.4555%2061.0467L65.5513%2061.0015L65.6408%2061.0574C66.7291%2061.7351%2066.8429%2062.602%2066.747%2063.2106C66.5354%2064.5503%2065.1645%2065.7563%2064.0169%2066.0414L63.5378%2066.0662C62.9243%2066.0929%2062.3444%2066.1178%2061.7645%2066.1178C59.7977%2066.1178%2057.7239%2065.8439%2055.8884%2063.8566C53.0542%2061.1576%2052.9097%2057.2483%2052.7691%2053.4679C52.6548%2050.387%2052.537%2047.2011%2050.9331%2044.7492L50.9098%2044.6991C50.4106%2043.0597%2050.0443%2040.8384%2051.1365%2039.5658L51.1958%2039.4967L51.2868%2039.4977C52.6621%2039.5147%2053.3864%2040.4502%2054.0874%2041.3551C54.6274%2042.0527%2055.1854%2042.7732%2056.0455%2043.0558C58.242%2043.0057%2059.3964%2044.5435%2060.4939%2046.0365C61.5704%2047.5008%2062.5877%2048.8843%2064.5613%2048.8843L64.7326%2048.8819L64.7919%2048.9577C66.4211%2051.0365%2065.9142%2053.5525%2065.4238%2055.9859C65.2365%2056.9151%2065.0595%2057.7922%2064.9996%2058.6387L64.9943%2058.7063L64.949%2058.7564C64.4669%2059.2808%2063.9065%2059.5581%2063.3266%2059.5581C62.4067%2059.5581%2061.5296%2058.86%2061.0382%2057.7348C60.6422%2056.9472%2060.6388%2055.9655%2060.6359%2055.0154C60.6325%2053.8736%2060.6291%2052.7927%2060.0113%2051.9909C59.3998%2052.1909%2059.2422%2052.742%2059.0612%2053.3745C58.8831%2053.9986%2058.6808%2054.706%2057.9262%2054.9463L57.8158%2054.9818L57.7326%2054.901C56.4838%2053.696%2056.4624%2051.9462%2056.4415%2050.2537C56.4186%2048.3754%2056.3953%2046.4349%2054.7038%2045.1846L54.2908%2045.6594C55.1076%2047.76%2054.8376%2049.9458%2054.5764%2052.061ZM216.137%2037.8451C208.082%2044.7186%20211.994%2056.3303%20208.366%2064.9818C207.813%2068.6319%20203.32%2071.0467%20202.622%2074.3558C214.639%2081.9098%20217.838%2097.928%20228.143%20107.202C221.273%20105.485%20209.252%20106.172%20198.435%2098.1314C203.103%20109.799%20216.449%20106.886%20222.457%20116.537C227.974%20121.593%20228.647%20128.725%20231.708%20134.855C225.951%20135.644%20222.2%20129.319%20217.083%20127.485C212.114%20126.13%20202.742%20120.522%20202.742%20120.522C206.445%20128.015%20213.578%20135.241%20221.527%20137.987C230.648%20144.906%20233.922%20155.36%20233.904%20166.145C227.061%20163.792%20225.604%20155.093%20218.483%20152.537C214.019%20152.616%20208.908%20149.448%20205.833%20144.169C204.535%20156.422%20221.155%20156.063%20224.364%20166.657C229.074%20176.81%20221.114%20185.194%20218.59%20194.101C216.803%20193.993%20216.211%20191.668%20215.498%20190.169C214.638%20184.139%20212.403%20178.063%20206.369%20174.871C201.891%20174.124%20198.469%20170.955%20194.716%20168.48C195.96%20176.77%20206.937%20179.875%20209.553%20188.006C211.61%20195.665%20207.352%20211.472%20206.665%20211.485C204.115%20207.063%20204.974%20201.208%20200.516%20197.713C196.495%20195.585%20191.304%20193.409%20189.434%20188.701L188.834%20189.674C189.265%20198.666%20202.931%20202.205%20200.083%20212.217C197.797%20218.991%20195.469%20227.413%20198.483%20234.711C195.881%20235.169%20193.574%20232.942%20191.219%20231.816C181.095%20226.496%20184.12%20214.832%20175.969%20208.379C175.804%20206.734%20175.024%20205.372%20173.902%20204.087C172.158%20207.836%20176.583%20215.993%20175.478%20219.586C174.894%20225.505%20166.193%20226.825%20163.82%20232.637L161.967%20240.571C155.54%20234.499%20155.909%20224.187%20157.277%20215.919C156.529%20212.427%20148.681%20203.633%20146.87%20206.207C150.429%20209.374%20151.489%20214.99%20150.06%20219.686C147.766%20225.979%20137.824%20226.848%20133.004%20230.161C131.611%20233.773%20129.226%20225.008%20130.135%20211.79C128.882%20220.201%20122.012%20222.949%20130.396%20242.495C124.337%20241.708%20119.637%20236.089%20118.302%20230.477C116.238%20222.475%20118.604%20212.334%20110.612%20207.184C109.393%20208.168%20110.655%20209.588%20110.677%20210.824C108.78%20216.285%20108.825%20222.879%20112.275%20227.629L112.676%20230.92C105.111%20230.433%2098.085%20225.472%2093.9869%20219.017C91.6294%20213.835%2091.1595%20206.562%2092.7089%20200.901C92.3557%20200.289%2091.6065%20200.714%2091.0549%20200.585C83.9781%20208.405%2090.9435%20221.749%2084.2821%20229.766C82.6213%20233.024%2070.8991%20240.742%2067.0594%20241.153C73.9284%20230.849%2068.0897%20214.705%2073.8501%20198.965C73.6171%20197.387%2074.3385%20195.45%2073.151%20194.304C68.5772%20199.88%2066.5033%20206.992%2063.9391%20213.632C62.3945%20215.653%2059.7748%20215.148%2058.0153%20216.69C54.8235%20222.793%2048.9468%20228.528%2042.7929%20230.147C43.8388%20227.106%2044.4469%20222.631%2044.5262%20219.262C45.8047%20209.895%2040.9851%20201.392%2043.4472%20192.9C44.9694%20185.658%2053.1091%20187.509%2056.4561%20182.435C54.2893%20180.342%2050.7852%20180.335%2047.8187%20179.631C37.2373%20179.54%2025.9788%20186.87%2017.2572%20191.008C15.9374%20177.582%2039.3506%20158.962%2037.5545%20158.375C32.033%20156.959%2026.0415%20152.187%2023.8169%20146.729C27.9874%20145.559%2031.7114%20146.386%2034.9543%20143.238C37.5934%20140.925%2039.265%20138.285%2040.7964%20135.509C39.7359%20133.81%2038.7478%20136.233%2037.5059%20135.911C28.8757%20137.435%2021.0459%20133.587%2015.9111%20126.738L15.8819%20125.09C21.438%20124.581%2029.405%20128.358%2033.9852%20123.125C39.3919%20118.015%2041.6507%20109.663%2049.1672%20107.333C49.8371%20106.359%2051.5446%20105.78%2051.1068%20104.345C49.2825%20102.11%2048.3835%20105.767%2046.8783%20106.068C37.2947%20108.09%2032.8979%20119.916%2022.7379%20120.367C21.8398%20116.123%2026.3923%20113.228%2027.4927%20109.36C29.2484%2099.7115%2036.1501%2089.7664%2045.4856%2085.3433C41.1501%2073.1221%2044.6571%2061.5186%2044.2227%2048.4046C43.6272%2041.8873%2039.3846%2034.954%2032.7574%2033.1458C28.0137%2032.9541%2023.9322%2031.3769%2019.782%2029.7312C20.2413%2028.4868%2022.4645%2029.8903%2022.0879%2028.0421C20.9077%2027.3761%2019.5111%2026.0267%2019.0825%2025.1403C19.8122%2023.6162%2021.0751%2025.1062%2022.0368%2025.0892C22.9145%2024.2491%2021.8029%2023.513%2021.653%2022.7595L24.3248%2022.3698C24.8584%2021.4669%2023.4019%2020.6681%2022.9052%2019.7842C22.4902%2019.5847%2022.6201%2019.1703%2022.6124%2018.7587C26.3256%2018.8993%2027.4333%2023.3457%2030.6212%2024.9389L31.5713%2024.2355C29.7349%2021.3823%2024.4683%2018.7942%2025.486%2014.1055C28.4588%2015.1524%2030.9292%2018.9567%2033.849%2020.8982C37.069%2024.2773%2043.0843%2022.5916%2047.0583%2021.9728C57.9642%2020.958%2068.9051%2021.9344%2076.8672%2029.3527C82.0818%2034.5026%2088.2056%2038.4902%2094.809%2040.2941C91.158%2042.653%2089.0992%2048.6235%2086.1127%2051.3133C84.5434%2051.8912%2082.5975%2050.6881%2081.8147%2049.0531C77.0278%2034.6402%2061.1555%2030.5883%2048.5012%2029.8479C51.7251%2033.5019%2057.2077%2032.7191%2061.4303%2034.5692C70.0658%2037.3042%2078.3885%2045.6774%2079.9199%2054.7201C78.7056%2055.9781%2077.5648%2057.5777%2075.708%2057.4045C74.6654%2056.7356%2074.3731%2055.71%2073.6706%2054.8286C72.9049%2034.5746%2050.2229%2037.9249%2038.9254%2028.3666L38.9439%2029.397C43.4161%2033.7154%2047.0827%2039.0793%2048.4224%2045.0324C48.8082%2055.3321%2049.823%2066.1693%2059.4659%2071.5653C57.3483%2076.1368%2050.74%2079.3436%2052.0734%2084.8856C52.647%2090.1653%2046.4313%2092.335%2046.0299%2096.8763C53.4253%2095.4421%2052.666%2087.3481%2055.6719%2082.4863C61.3919%2075.5856%2065.5737%2067.1992%2072.83%2061.7828C84.8323%2062.0343%2090.8914%2047.1986%20100.019%2041.233C103.596%2041.5511%20107.274%2041.2014%20110.992%2040.0251C117.828%2038.05%20121.721%2044.5775%20128.539%2041.6421C132.766%2039.7818%20139.355%2039.3912%20143.649%2041.3779C144.838%2041.5959%20145.984%2041.717%20147.096%2041.7564C156.378%2048.518%20164.842%2059.365%20176.671%2059.6267C180.366%2062.7217%20184.258%2065.265%20188.345%2067.3228C198.486%2069.6194%20194.436%2081.5756%20201.182%2086.2667C202.203%2085.7685%20201.704%2084.7464%20201.827%2083.9189C198.239%2079.1048%20197.652%2073%20195.564%2067.5402C195.899%2067.1219%20196.93%2067.1043%20196.572%2066.218C204.995%2060.7115%20199.917%2049.2584%20205.36%2042.293C208.006%2036.4757%20215.422%2036.2772%20217.665%2030.8798C215.802%2030.4998%20214.588%2031.7574%20213.086%2032.2648C210.778%2033.8857%20207.664%2032.635%20207.477%2029.7516C202.366%2028.1925%20196.968%2029.9355%20192.321%2031.322C184.956%2038.39%20174.297%2037.8198%20166.79%2044.615C166.182%2045.244%20166.615%2046.4042%20167.168%2046.6013C176.112%2039.506%20187.066%2037.2536%20196.585%2031.591C198.707%2031.1415%20201.585%2030.7479%20203.528%2031.8133C195.373%2036.9023%20186.428%2040.081%20178.346%2045.4439C173.913%2047.3081%20171.626%2054.0123%20166.333%2053.8984C161.885%2048.8785%20154.864%2047.1602%20151.176%2041.5166C164.487%2039.4607%20172.645%2025.4818%20185.572%2022.5085C198.307%2020.0192%20212.89%2021.0699%20223.261%2028.7894C227.799%2018.9328%20234.175%2014.1274%20242.224%2014.8114C243.469%2015.2701%20242.204%2020.581%20242.217%2021.337C238.789%2022.3669%20233.294%2023.7407%20229.139%2027.0385C230.173%2027.2258%20242.287%2024.5414%20242.287%2024.5414C241.74%2024.6884%20240.241%2025.4015%20240.396%2026.4981C241.303%2027.2375%20243.624%2026.3726%20245.011%2027.1042C244.341%2028.1467%20242.204%2027.7031%20241.749%2029.1537C242.945%2030.7815%20247.358%2031.6664%20247.358%2031.6664C246.686%2032.5022%20245.82%2034.1669%20247.14%2034.9676C248.411%2036.8693%20251.757%2035.7119%20252.138%2037.8349C239.196%2044.3129%20228.416%2028.9056%20216.137%2037.8451ZM256.168%2032.5638C255.26%2031.6862%20254.351%2030.8777%20254.466%2029.5705C251.558%2028.3159%20254.259%2025.5887%20253.682%2024.0193C252.582%2023.9016%20251.284%2024.3356%20250.379%2023.7333C244.432%2021.4318%20250.309%2015.7653%20249.835%2012.2004C244.363%209.68576%20237.278%209.12193%20231.051%2010.5366C224.804%2010.8509%20221.85%2018.8038%20215.031%2017.755C206.332%2015.2963%20196.859%2011.8895%20187.225%2014.9426C171.179%2016.5967%20160.36%2030.5264%20144.674%2033.1364C136.551%2032.2476%20128.806%2033.2755%20120.997%2034.5803C114.655%2033.386%20107.574%2033.1661%20100.855%2033.9012C90.0528%2032.9905%2082.4064%2023.9858%2072.5912%2020.5853C62.9521%2015.4636%2050.1874%2016.2357%2039.5847%2018.8257C32.8664%2015.7828%2030.6924%209.29365%2025.1825%204.58115C23.6671%204.33256%2021.9226%202.78313%2020.507%204.31894C19.228%205.8528%2019.1225%207.70969%2019.6371%209.62447C19.0485%2011.2838%2017.2651%2011.5208%2016.0426%2012.2972C16.4994%2014.8317%2013.0668%2015.0287%2013.868%2017.6256C11.0046%2018.9128%2011.9659%2022.7428%209.02806%2023.6876C8.93514%2026.2314%2010.6889%2028.33%209.76555%2030.5449C17.4397%2037.2131%2029.3346%2033.8447%2035.7464%2043.0075C38.6643%2048.7961%2033.2522%2071.4013%2041.2942%2083.1551C28.5329%2091.9661%2023.9736%2094.9088%2018.4064%20114.705C13.9244%20120.892%2013.9244%20121.51%206.45604%20124.312C9.81565%20127.828%2014.1978%20130.978%2016.5359%20134.993C18.6725%20139.351%2012.6309%20139.595%2010.7327%20141.003C15.5507%20145.452%2022.7059%20149.999%2024.5326%20156.287C28.1602%20163.368%2021.6492%20168.155%2018.8583%20173.563C15.6261%20181.245%2013.6345%20188.862%2013.9245%20197.583C21.0426%20196.083%2035.3903%20184.187%2040.5426%20187.966C33.3291%20196.553%2041.2285%20217.846%2037.107%20236.05C57.3708%20232.96%2058.4021%20220.251%2068.1477%20218.525C67.8242%20227.601%2067.0225%20234.585%2060.4628%20246.354C74.9209%20248.323%2089.9998%20232.96%2091.3561%20225.679C94.957%20231.249%20100.712%20234.242%20106.376%20235.997C114.24%20245.683%20125.984%20249.394%20138.262%20248.287C137.656%20245.068%20135.128%20241.953%20135.06%20238.107C135.231%20236.042%20135.748%20234.178%20137.648%20232.77C140.778%20231.068%20144.388%20229.287%20147.819%20229.019C147.364%20234.455%20148.478%20239.246%20151.025%20243.461C154.328%20247.732%20159.379%20249.101%20167.623%20251.163C166.248%20240.515%20166.592%20230.554%20178.27%20224.373C182.39%20231.241%20189.26%20238.798%20203.686%20237.769C201.969%20229.868%20200.247%20225.495%20202.654%20217.828C205.056%20217.716%20207.423%20219.529%20209.601%20218.323C212.372%20211.748%20214.451%20204.911%20215.839%20197.809C215.839%20197.809%20218.111%20197.925%20222.233%20202.391C221.546%20193.803%20230.635%20179.263%20230.819%20172.51C233.145%20171.919%20233.221%20175.842%20235.284%20175.943C240.075%20170.983%20239.891%20166.68%20238.608%20160.108C237.188%20153.537%20234.94%20145.033%20229.788%20139.881C232.866%20139.073%20239.764%20139.751%20242.481%20137.986C235.627%20133.7%20230.475%20115.839%20224.637%20110.687C227.383%20111.373%20230.819%20110.687%20237.785%20107.715C223.787%20100.883%20220.679%2085.5344%20210.743%2075.1968C207.095%2070.8637%20213.966%2066.9174%20213.954%2062.3139C216.502%2054.7803%20214.618%2046.3632%20220.838%2040.6218C231.883%2035.7566%20239.528%2044.7399%20251.034%2042.6845C254.865%2041.7923%20259.908%2038.2692%20260.454%2034.1381C259.936%2032.017%20257.751%2032.7419%20256.168%2032.5638Z'%20fill='black'/%3e%3cpath%20d='M229.591%2033.2818C229.652%2032.8002%20229.031%2032.6046%20229.226%2031.9829C233.42%2032.1838%20238.304%2032.5803%20242.185%2034.4357C242.942%2034.5603%20244.032%2033.9921%20244.461%2035.0146C239.47%2036.3383%20235.207%2032.2218%20229.591%2033.2818ZM233.809%2026.9561C234.562%2030.7215%20239.819%2028.8442%20241.439%2031.1515C237.932%2030.8694%20234.474%2029.624%20230.851%2030.6495C229.504%2028.3372%20232.944%2028.5513%20233.809%2026.9561ZM199.35%20150.603L199.408%20153.9C196.314%20153.749%20197.339%20149.54%20195.658%20147.645C192.978%20143.777%20188.453%20140.282%20190.144%20134.895C187.154%20132.818%20184.099%20131.016%20180.517%20130.459C178.575%20133.31%20178.016%20136.754%20175.727%20139.474C182.53%20143.41%20190.459%20148.973%20195.12%20156.242C192.299%20156.017%20190.17%20152.07%20187.462%20150.469C183.215%20147.175%20178.417%20143.894%20173.434%20141.782C171.67%20143.118%20170.354%20146.438%20167.927%20145.176C167.212%20143.609%20169.665%20142.396%20170.119%20140.879C161.819%20137.657%20152.41%20133.972%20143.372%20135.712C143.786%20131.857%20150.876%20132.626%20150.876%20132.626C151.893%20131.245%20152.722%20132.112%20153.824%20132.23C153.416%20132.581%20153.358%20133.132%20153.228%20133.547C159.497%20134.536%20165.369%20136.426%20171.441%20137.901C173.045%20135.263%20173.679%20132.297%20174.245%20129.264C168.256%20128.612%20161.926%20128.036%20155.758%20128.899C160.668%20130.806%20166.366%20130.569%20171.017%20133.236L171.035%20134.267C169.194%20135.123%20167.848%20132.743%20166.06%20132.705C159.469%20132.957%20153.436%20129.765%20146.88%20132.01C146.285%20129.409%20143.243%20132.21%20142.92%20129.467C142.898%20128.162%20144.225%20125.528%20141.816%20125.227C140.919%20125.037%20139.813%20124.644%20139.52%20123.619C139.58%20123.067%20139.223%20122.318%20139.834%20121.964C145.115%20125.306%20149.183%20118.298%20154.605%20118.065C159.047%20116.682%20164.131%20116.662%20167.998%20113.846C168.723%20112.116%20166.056%20112.711%20166.984%20110.909C170.229%20111.746%20172.221%20115.696%20176.251%20114.389C177.005%20110.254%20173.105%20107.299%20171.122%20103.898C172.629%20103.666%20173.279%20105.441%20174.454%20105.834C176.037%20102.027%20171.602%2099.9054%20171.678%2096.3312C173.519%2095.5431%20174.587%2097.7235%20175.947%2096.8761C176.171%2097.9711%20177.339%2097.9502%20177.968%2098.4888C178.22%2097.2478%20176.684%2095.8321%20176.244%2094.2598C174.624%2091.9515%20171.519%2091.1819%20170.853%2088.4449C178.524%2091.0598%20182.448%2099.3722%20184.085%20106.627L184.23%20114.868C188.015%20115.214%20191.627%20117.488%20193.875%20120.333C190.34%20118.54%20186.542%20117.439%20182.285%20117.582C181.345%20118.834%20179.605%20121.475%20177.997%20119.923L177.718%20119.653C178.304%20121.704%20179.246%20124.505%20179.498%20127.18C183.167%20128.764%20187.231%20129.38%20190.442%20132.279C190.801%20129.181%20188.622%20126.402%20186.995%20123.752C187.194%20123.267%20188.086%20123.251%20188.3%20123.729C190.883%20125.95%20191.963%20128.818%20193.384%20131.541C194.072%20131.665%20194.618%20131.45%20195.021%20130.893C194.845%20128.698%20194.124%20126.718%20192.925%20124.953L194.924%20125.262C199.383%20132.809%20194.889%20142.987%20199.35%20150.603ZM151.09%20144.852C150.609%20144.928%20150.394%20144.383%20150.117%20144.181L150.1%20143.22C151.323%20142.512%20151.766%20144.222%20151.09%20144.852ZM151.654%20137.902C152.475%20137.613%20153.102%20138.152%20153.321%20138.836C153.613%20139.861%20152.305%20139.677%20151.69%20139.894C150.86%20139.565%20151.33%20138.938%20151.661%20138.245L151.654%20137.902ZM148.656%20139.259C149.611%20138.83%20150.045%20140.128%20149.366%20140.553C149.093%20140.695%20148.882%20140.425%20148.673%20140.221L148.656%20139.259ZM145.428%20143.301C146.053%20143.634%20146.201%20144.25%20146.145%20144.937C145.8%20144.875%20145.39%20145.019%20145.177%20144.611C145.238%20144.128%20144.883%20143.517%20145.428%20143.301ZM145.354%20138.973L145.691%20138.625C146.175%20138.823%20147.723%20140.925%20145.725%20140.618C145.101%20140.285%20145.5%20139.52%20145.354%20138.973ZM142.302%20133.462C142.029%20133.535%20141.818%20133.266%20141.678%20133.131L141.66%20132.1L142.623%20132.083C142.494%20132.566%20142.915%20133.178%20142.302%20133.462ZM182.443%20166.013C182.366%20165.466%20182.697%20164.704%20182.071%20164.371C180.557%20164.192%20181%20165.97%20180.464%20166.736C182.325%20171.031%20182.067%20175.845%20181.729%20180.249C180.242%20177.662%20180.702%20172.432%20177.253%20171.738C175.936%20174.921%20173.578%20177.643%20171.153%20180.432C172.074%20178.08%20173.096%20173.665%20171.667%20170.53C168.296%20174.163%20167.142%20178.921%20163.628%20182.212C163.384%20180.156%20166.655%20178.587%20164.49%20176.564C161.383%20179.573%20158.271%20181.275%20154.378%20182.512C153.517%20182.5%20152.669%20182.504%20151.827%20182.513C151.239%20182.797%20150.656%20183.038%20150.097%20183.227C148.292%20183.22%20146.422%20183.115%20144.696%20182.664C139.399%20182.756%20134.369%20182.591%20129.32%20180.818C120.496%20179.119%20111.742%20181.332%20104.309%20184.553C97.6078%20186.32%2091.9894%20183.326%2085.7995%20182.885C84.5833%20182.493%2083.7519%20181.637%2082.9789%20180.647C81.6513%20180.256%2080.5786%20179.124%2080.1252%20177.259C79.9087%20177.078%2079.685%20176.903%2079.4403%20176.743C79.4213%20175.644%2078.2285%20174.292%2077.3854%20173.138C75.5266%20165.064%2075.6599%20156.954%2079.306%20149.402C82.2146%20142.826%2089.1932%20149.092%2094.7303%20147.484C107.485%20150.01%20113.473%20134.928%20125.905%20138.696C137.182%20143.171%20148.478%20152.66%20161.97%20146.31C166.72%20150.762%20167.311%20157.072%20167.9%20163.313C169.073%20163.567%20168.979%20162.196%20169.52%20161.636C169.455%20157.928%20170.956%20155.974%20168.38%20148.074C169.926%20150.993%20171.019%20153.023%20171.019%20153.023C171.682%20151.706%20170.211%20146.165%20170.211%20146.165C171.036%20146.152%20172.458%20148.875%20173.576%20150.023L173.834%20145.073C178.683%20150.135%20174.652%20156.531%20180.686%20159.793C181.921%20155.716%20178.504%20152.892%20177.549%20149.336C187.153%20152.398%20182.341%20164.092%20186.17%20170.896C184.45%20170.789%20183.027%20167.995%20182.443%20166.013ZM159.804%20191.486C156.136%20193.887%20150.464%20195.565%20146.297%20193.027C142.86%20192.879%20140.281%20194.711%20137.128%20195.178C137.763%20192.214%20141.665%20191.39%20144.329%20190.451C147.285%20190.605%20150.277%20192.751%20153.2%20190.982C146.508%20185.396%20136.58%20191.273%20129.097%20187.762C126.022%20188.64%20123.105%20190.821%20119.581%20189.578C117.326%20190.304%20118.997%20187.595%20117.204%20187.282C104.982%20191.618%2085.4303%20192.275%2075.3023%20182.764L77.9064%20183.366C92.4487%20193.83%20110.876%20182.927%20127.771%20186.479C134.383%20187.464%20142.38%20185.058%20148.202%20188.046C152.027%20186.743%20154.634%20190.408%20157.761%20188.566C160.703%20187.829%20163.324%20184.554%20165.939%20184.784C164.956%20187.48%20162.182%20189.932%20159.804%20191.486ZM126.455%20205.602C122.431%20207.253%20126.465%20213.984%20121.923%20213.583C121.04%20210.3%20122.552%20206.356%20119.141%20203.737C116.6%20203.849%20114.167%20202.175%20113.165%20199.926C112.09%20197.333%20112.114%20194.79%20112.683%20191.964C113.922%20192.148%20113.745%20193.801%20114.983%20193.916L117.261%20190.579C117.198%20190.857%20117.182%20193.878%20118.642%20194.883C120.487%20194.301%20120.44%20191.623%20122.574%20191.793C122.805%20193.301%20123.256%20195.559%20125.247%20195.387C127.104%20195.56%20126.976%20192.195%20128.852%20193.331C129.021%20195.114%20127.136%20197.346%20129.287%20198.613C131.884%20197.812%20131.682%20194.106%20133.448%20192.976C134.378%20198.563%20130.751%20203.741%20126.455%20205.602ZM87.0317%20139.375C86.0666%20139.116%2085.9693%20137.538%2086.3108%20137.396L86.6479%20137.045C87.4778%20137.374%2087.9804%20138.602%2087.0317%20139.375ZM87.6608%20139.982C88.553%20139.966%2089.8548%20139.738%2090.0143%20140.971C89.685%20141.801%2089.5001%20143.041%2088.4051%20143.267C87.7079%20142.66%2086.9247%20141.093%2087.6608%20139.982ZM90.6482%20137.937L92.5771%20138.248L92.6053%20139.894C92.131%20140.246%2090.0664%20140.009%2090.6662%20138.968L90.6482%20137.937ZM100.859%20140.439C101.199%20140.226%20101.99%20142.203%20101.248%20143.042C100.226%20143.54%2099.5216%20142.454%2099.2336%20141.772L100.859%20140.439ZM96.6197%20144.536L95.9324%20144.547C95.2868%20143.048%2096.8669%20143.02%2097.1972%20142.19C98.3063%20142.79%2097.9269%20144.651%2096.6197%20144.536ZM98.5807%20139.791C98.553%20139.756%2098.5223%20139.723%2098.4912%20139.689C97.942%20139.827%2097.3869%20140.12%2096.951%20140.85C95.925%20141.143%2096.1084%20139.834%2095.8929%20139.219C96.0204%20138.737%2095.5981%20138.125%2096.2111%20137.84L97.2419%20137.822C96.9982%20138.735%2097.9668%20139.135%2098.4912%20139.689C98.5126%20139.684%2098.534%20139.679%2098.5559%20139.674C98.3219%20138.574%2098.7982%20136.912%20100.528%20137.147C101.206%20139.943%2099.9146%20139.363%2098.5559%20139.674C98.5637%20139.713%2098.571%20139.753%2098.5807%20139.791ZM67.0939%20170.021C64.3269%20172.886%2062.3887%20176.01%2061.0062%20179.402C58.189%20175.465%2060.2954%20170.207%2061.4625%20166.203L60.0712%20165.196C58.3048%20166.395%2059.8707%20169.459%2057.541%20169.843C56.2562%20167.118%2057.0112%20163.12%2056.6877%20160.308C55.2103%20162.257%2053.0552%20164.769%2051.5768%20166.65C51.9845%20162.453%2054.053%20158.912%2056.3263%20155.368C56.2051%20152.347%2057.6042%20149.85%2057.4812%20146.759C55.292%20147.279%2052.5629%20148.357%2050.6019%20150.178C49.7734%20149.919%2049.9719%20149.501%2050.2356%20148.879C54.0242%20145.516%2059.3035%20144.873%2062.3172%20140.424C66.5846%20140.83%2069.8114%20136.79%2074.1313%20136.301C74.3167%20135.13%2073.8069%20133.491%2073.0314%20132.336L67.4797%20133.12C67.8996%20129.609%2075.3013%20132.503%2072.6014%20127.397L72.5848%20126.435C69.2831%20126.219%2064.6212%20126.78%2061.0689%20127.942C53.6662%20132.881%2048.7863%20140.591%2046.9334%20148.593C44.9466%20141.071%2048.2478%20133.387%2050.5328%20126.477C51.8477%20123.157%2054.6168%20120.429%2056.6264%20117.439L57.5877%20117.422C55.9882%20120.268%2052.0511%20123.016%2053.8287%20126.42L62.27%20118.028L61.9208%20117.691C62.1158%20117.069%2062.8091%20117.469%2063.2192%20117.325L63.2372%20118.355L58.4016%20124.69C60.2638%20125.071%2061.6639%20122.642%2063.6497%20122.264C63.4765%20124.19%2061.2037%20123.887%2060.4102%20125.618C64.0399%20124.936%2068.4955%20124.378%2072.5381%20123.757C73.5568%20123.052%2072.8446%20121.622%2073.5169%20120.786C72.1202%20119.505%2069.8056%20120.714%2068.2114%20119.917L68.1759%20117.924C69.9632%20117.962%2072.5921%20119.016%2074.7759%20118.154C75.4492%20117.385%2075.4312%20116.356%2075.691%20115.458C73.2717%20114.607%2070.636%20113.211%2067.7692%20114.291C66.5447%20114.931%2065.7445%20116.387%2064.1639%20116.346C63.1233%20111.83%2057.3464%20115.366%2053.9702%20114.876C52.3362%20115.66%2050.6272%20116.171%2048.7056%20116.272L48.6993%20115.929C48.4784%20115.109%2051.3632%20115.059%2052.2992%20113.6C54.2524%20103.466%2063.2946%2094.1017%2073.3535%2091.7963C74.5229%2091.8444%2075.959%2091.4757%2076.93%2092.0089C74.0068%2093.7772%2071.7257%2096.9087%2070.1952%2099.7526C71.9042%2099.3109%2074.846%2098.5719%2077.057%2099.289C75.5514%2099.5901%2072.83%20101.149%2071.5579%20103.026C75.0464%20102.141%2078.4814%20102.15%2082.077%20103.461C82.7391%20105.991%2079.6835%20104.121%2078.8093%20105.167C74.9613%20105.165%2070.3281%20107.377%2068.7548%20111.663C72.6646%20111.32%2078.1112%20116.378%2080.5548%20110.769L82.2035%20110.741C82.4881%20111.286%2081.8182%20112.259%2081.626%20113.087L80.9503%20113.717C85.4385%20114.944%2089.3989%20117.554%2093.6235%20119.473C95.1413%20119.859%2096.0846%20118.812%2097.1709%20118.038C99.526%20119.095%2098.0704%20122.35%20100.566%20123.612L100.915%20123.949L101.923%20122.625C100.882%20122.026%20100.795%20120.996%20100.845%20119.965C101.109%20119.343%20101.735%20119.743%20102.144%20119.599C102.771%20120.069%20102.374%20120.901%20103.204%20121.229C103.825%20121.425%20104.092%20120.939%20104.498%20120.588L104.475%20119.283L106.124%20119.255C105.797%20120.222%20106.774%20121.099%20106.169%20121.864C105.691%20122.01%20105.475%20121.465%20105.196%20121.196C104.383%20121.896%20104.063%20123.207%20104.212%20123.891C103.188%20124.253%20102.161%20124.476%20101.281%20125.247L101.293%20125.935C97.3232%20126.759%2095.5918%20121.981%2092.2784%20121.145C89.5055%20123.667%2094.8076%20124.331%2095.3977%20126.656C96.0535%20128.774%2097.7065%20129.088%2099.3761%20130.228C97.7343%20130.668%2098.464%20133.06%2098.8269%20134.223C99.3221%20134.969%2099.6792%20135.787%20100.515%20136.46C96.8391%20138.378%2096.1702%20135.505%2092.5314%20135.637C88.4226%20136.396%2083.1866%20135.526%2080.4205%20138.46C80.169%20139.768%2080.871%20140.651%2081.0967%20141.745C78.6566%20143.642%2077.0648%20139.067%2074.7822%20138.215C69.9972%20139.604%2064.0423%20140.875%2062.072%20146.061C61.5486%20147.581%2060.6185%20149.317%2061.4717%20151.019C64.6582%20148.559%2067.6305%20145.69%2070.96%20143.571C71.5623%20146.583%2068.6784%20150.618%2069.7647%20153.828C71.93%20151.937%2071.932%20148.088%2074.9326%20146.799C73.5359%20149.435%2072.076%20152.415%2072.8154%20155.424C74.144%20152.79%2075.0552%20149.888%2076.9359%20147.451C76.9062%20149.651%2074.6178%20152.37%2074.1143%20155.057C72.6058%20163.054%2071.1575%20174.553%2078.4678%20180.057C73.5018%20178.976%2070.3806%20173.329%2067.0939%20170.021ZM77.7541%2080.1773C81.8858%2084.6392%2089.1932%2082.1762%2094.2949%2083.1871C95.9615%2084.1187%2097.5168%2082.7867%2098.8794%2082.076C97.6545%2086.7004%20105.297%2087.6661%20104.976%2092.8933L106.647%2094.1688C108.344%2092.9711%20110.291%2090.3952%20110.574%2090.8029C110.44%2091.0802%20110.719%2091.2821%20110.927%2091.4159L111.889%2091.3983C111.575%2093.0529%20111.328%2094.7059%20111.014%2096.3604L113.991%2097.6822C112.97%2098.2494%20111.383%2097.8656%20110.368%2098.7072C111.485%2099.7181%20113.263%2099.2754%20114.381%20100.286C113.435%20101.264%20111.511%20101.229%20110.076%20101.666C110.446%20103.172%20112.909%20102.648%20112.462%20104.579C111.642%20104.799%20110.822%20105.088%20109.859%20104.969L109.946%20109.913C108.025%20110.153%20108.122%20107.746%20107.209%20106.663C106.682%20104.061%20108.148%20100.647%20107.084%2098.6731C106.959%2098.6751%20106.84%2098.6819%20106.723%2098.6902L106.836%2098.8215C105.906%20100.482%20104.427%20100.133%20102.917%20100.02C102.582%20100.163%20102.225%20100.298%20101.824%20100.413C102.262%20101.986%20103.78%20103.082%20103.266%20105.083C99.774%20105.832%2097.0897%20105.534%2093.9762%20104.284C93.6848%20103.327%2094.3012%20103.247%2094.9837%20102.961C95.3009%20101.444%2092.3553%20101.907%2091.3035%20100.689C90.3164%2099.2632%2087.7128%2099.6529%2087.9488%2097.4501C90.0114%2097.5513%2092.5922%2099.7049%2094.9205%2099.3201C93.0543%2097.9405%2090.4575%2096.3575%2089.253%2094.0375C86.3473%2091.7759%2085.4361%2087.3119%2083.3058%2084.6699C83.4051%2084.646%2083.5072%2084.629%2083.6069%2084.6076C80.0668%2083.1389%2076.5691%2086.3249%2073.2717%2087.1261L72.5751%2086.5199L77.1353%2084.1046C75.0522%2082.8354%2070.5231%2087.0366%2070.8685%2083.2523C72.7147%2082.7386%2075.1199%2082.7658%2076.4781%2081.8483C74.7462%2081.0544%2072.6233%2081.4343%2070.8277%2080.9177C72.8621%2079.3697%2075.3393%2079.6018%2077.7541%2080.1773ZM89.2501%2057.8548L90.2284%2058.7995C87.7892%2060.7658%2086.3876%2063.1262%2083.7329%2064.5462C83.3384%2061.5992%2086.5302%2059.4815%2089.2501%2057.8548ZM101.328%2072.8271C106.517%2074.9345%20107.793%2081.0962%20109.525%2085.8744L108.496%2085.8924C106.912%2081.7296%20103.943%2076.9718%2099.7191%2075.1218C99.075%2073.6215%20101.138%2073.7232%20101.328%2072.8271ZM107.576%2052.9311C116.879%2050.6393%20124.406%2056.7602%20133.692%2053.4375C138.918%2053.6895%20143.615%2055.1874%20147.92%2057.7915C140.779%2058.0542%20133.074%2053.4477%20125.789%2057.216C118.712%2057.2029%20112.303%2052.1615%20105.012%2055.5868L103.707%2055.6097C103.672%2053.618%20106.286%2053.8471%20107.576%2052.9311ZM136.401%20133.84L138.044%20133.538C138.265%20134.357%20137.726%20134.986%20137.043%20135.204C136.692%20134.797%20136.206%20134.461%20136.401%20133.84ZM135.926%20126.291C136.116%20125.326%20136.507%20124.152%20137.889%20124.608C137.901%20125.296%20138.06%20126.598%20136.887%20126.275L135.926%20126.291ZM135.434%20137.498C136.438%20136.912%20136.813%20137.819%20136.813%20137.819C136.481%20138.443%20136.492%20139.06%20135.457%20138.803C135.457%20138.803%20134.205%20137.771%20135.434%20137.498ZM135.302%20129.944C136.016%20131.443%20134.289%20130.855%20133.677%20131.278L133.401%20131.282L133.367%20129.291C133.972%20128.525%20135.151%20129.191%20135.302%20129.944ZM132.938%20124.351C133.336%20123.52%20134.163%20123.712%20134.918%20123.699C135.971%20124.917%20134.194%20125.566%20133.584%20125.989C133.71%20125.299%20132.471%20125.184%20132.938%20124.351ZM123.953%2081.9816C130.904%2082.616%20133.272%2072.6811%20140.649%2074.1337C142.098%2074.5195%20144.228%2074.5511%20145.599%2074.321C146.154%2074.7238%20146.372%2075.3373%20146.245%2075.959C140.378%2074.412%20134.88%2078.2868%20131.188%2083.1608C129.012%2084.5035%20125.979%2083.8015%20123.966%2082.6685L123.953%2081.9816ZM113.714%2081.8172C112.545%2081.769%20113.392%2083.0582%20112.782%2083.4819L113.062%2083.8205L112.112%2084.5244C110.436%2078.9878%20107.463%2074.0253%20104.287%2069.1337L104.892%2068.4366C108.459%2071.9465%20109.567%2076.4625%20112.38%2080.1909L113.324%2079.2131C111.792%2074.087%20109.374%2069.3201%20106.479%2064.8362L107.154%2064.1371C112.717%2068.025%20112.906%2074.8236%20114.995%2080.4891C116.144%2079.3697%20114.783%2076.1643%20117.61%2076.8016C118.745%2078.7747%20119.832%2082.0531%20118.014%2084.0778C116.576%2084.3775%20115.077%2085.1598%20114.425%2083.1097C114.619%2082.488%20114.064%2082.2229%20113.714%2081.8172ZM112.225%20130.346C112.021%20130.487%20109.754%20130.39%20110.548%20128.727C111.568%20128.091%20111.194%20126.38%20112.854%20127.038C114.176%20127.908%20113.379%20129.571%20112.225%20130.346ZM109.524%20125.103C110.138%20124.888%20109.549%20122.699%20111.143%20123.427C111.981%20124.237%20111.721%20125.066%20110.84%20125.767L109.524%20125.103ZM109.679%20134.033C109.725%20132.796%20110.409%20132.508%20111.648%20132.624C112.615%20133.018%20112.643%20134.599%20111.687%20134.959C110.865%20135.042%20109.833%20134.993%20109.679%20134.033ZM109.747%20137.947C110.506%20138.973%20110.347%20140.822%20109.118%20141.255C107.959%20141.757%20108.006%20140.519%20107.448%20139.98C107.448%20139.98%20108.103%20137.943%20109.747%20137.947ZM107.479%20122.186C108.716%20122.164%20109.004%20122.915%20108.82%20124.155L106.553%20124.193C105.855%20123.519%20106.659%20122.337%20107.479%20122.186ZM106.925%20125.836C108.176%20126.638%20107.027%20127.758%20106.976%20128.789L106.646%20129.131C106.755%20129.226%20106.869%20129.318%20106.988%20129.408C106.986%20129.422%20106.983%20129.436%20106.982%20129.451C107.858%20130.062%20109.1%20129.857%20108.946%20131.366C108.755%20132.263%20108.214%20132.82%20107.326%20133.044L106.708%20133.054C105.804%20131.916%20106.846%20130.675%20106.982%20129.451C106.859%20129.365%20106.743%20129.264%20106.64%20129.139L106.646%20129.131C105.856%20128.448%20105.341%20127.629%20105.563%20126.478C105.969%20126.128%20106.304%20125.641%20106.925%20125.836ZM103.023%20130.507L104.671%20130.478C104.544%20131.1%20104.972%20131.985%20104.362%20132.477C103.744%20132.556%20102.644%20132.439%20103.039%20131.469L103.023%20130.507ZM104.168%20141C103.136%20140.947%20103.458%20139.775%20103.173%20139.092C104.54%20138.726%20105.595%20140.15%20104.168%20141ZM103.108%20135.452C103.238%20134.969%20102.815%20134.357%20103.429%20134.141L104.39%20134.125C104.843%20136.384%20106.583%20133.743%20107.704%20135.028C107.996%20135.984%20107.379%20136.065%20106.766%20136.351C105.637%20134.72%20104.43%20136.391%20103.108%20135.452ZM116.318%20136.527L115.357%20136.543C114.454%20136.01%20115.543%20135.441%20115.603%20134.891C116.357%20134.808%20116.633%20134.941%20116.988%20135.553C117.063%20135.965%20116.868%20136.587%20116.318%20136.527ZM116.93%20132.257L116.912%20131.225L118.561%20131.199C118.431%20131.681%20118.855%20132.292%20118.24%20132.51C117.758%20132.449%20117.146%20132.802%20116.93%20132.257ZM121.155%20130.191C121.688%20129.288%20122.257%20130.378%20122.809%20130.506C122.953%20130.915%20122.689%20131.538%20122.139%20131.479L121.177%20131.495L121.155%20130.191ZM121.893%20133.131L122.877%20134.42L121.932%20135.468C121.108%20135.412%20120.887%20134.524%20120.874%20133.837L121.893%20133.131ZM126.11%20130.723C126.094%20129.83%20124.701%20128.755%20126.414%20128.45C126.627%20128.859%20127.037%20128.714%20127.382%20128.777C127.117%20129.4%20127.746%20130.008%20128.428%20129.721C127.678%20130.077%20127.353%20131.113%20126.11%20130.723ZM126.888%20135.999L126.575%20137.654L125.258%20137.057C125.518%20136.161%20125.775%20135.125%20126.888%20135.999ZM125.045%20124.832C125.734%20124.89%20126.552%20124.531%20126.706%20125.491C126.924%20126.174%20126.387%20126.87%20126.047%20127.151L125.698%20126.814L125.361%20127.163C124.613%20127.657%20124.506%20125.46%20125.045%20124.832ZM126.488%20132.708C126.501%20133.464%20126.244%20134.43%20125.206%20134.036L125.177%20132.387L126.488%20132.708ZM128.529%20119.826C128.227%20118.182%20129.286%20115.896%20127.482%20114.897C124.203%20115.985%20120.663%20117.833%20119.006%20121.297C117.677%20123.861%20117.881%20127.706%20116.54%20129.584C113.044%20129.989%20116.346%20126.29%20114.805%20124.669C114.6%20120.756%20109.137%20118.721%20109.688%20114.865C114.124%20109.154%20123.13%20109.546%20129.748%20110.873C131.478%20111.598%20133.849%20113.618%20132.445%20115.773C131.164%20117.169%20130.513%20119.31%20128.529%20119.826ZM130.421%20133.67C131.656%20133.579%20130.717%20134.902%20131.48%20135.301C131.074%20135.651%20131.023%20136.683%20130.192%20136.285C129.77%20135.743%20129.827%20134.986%20129.814%20134.3L130.421%20133.67ZM128.639%20126.075L128.606%20124.084C129.907%20123.924%20130.394%20124.259%20130.621%20125.423L128.639%20126.075ZM130.981%20126.379L131.015%20128.37C130.401%20128.587%20130.047%20128.043%20129.698%20127.706C129.339%20126.818%20130.082%20126.051%20130.981%20126.379ZM135.828%20120.659L135.788%20118.393C137.194%20120.224%20138.59%20117.519%20140.052%20118.662C139.598%20120.182%20137.116%20119.675%20135.828%20120.659ZM140.602%20130.47C140.198%20130.957%20140.426%20132.19%20139.321%20131.866C138.899%20131.324%20138.954%20130.566%20139.636%20130.211L140.602%20130.47ZM140.562%20128.203L139.944%20128.214L139.915%20126.566C140.734%20126.276%20141.997%20127.766%20140.562%20128.203ZM140.07%20135.426C140.833%20135.824%20141.762%20136.568%20140.379%20137.412C138.843%20137.255%20139.53%20135.984%20140.07%20135.426ZM139.818%20140.719C141.178%20139.872%20141.773%20142.472%20140.186%20142.02C139.563%20141.825%20139.896%20141.199%20139.818%20140.719ZM143.113%20120.876C142.702%20120.884%20142.29%20120.959%20142.077%20120.551C141.855%20119.593%20143.372%20119.91%20143.697%20118.874C144.259%20119.551%20144.35%20120.924%20143.113%20120.876ZM146.662%20119.509C146.248%20119.379%20145.636%20119.802%20145.352%20119.188L145.34%20118.57C145.956%20118.421%20147.059%20118.608%20146.662%20119.509ZM158.283%2084.6791C162.664%2083.7796%20166.242%2080.1437%20170.067%2078.8404C170.226%2080.1432%20167.843%2081.4217%20166.484%2082.201L172.397%2082.4408C171.688%2085.1335%20167.595%2082.8684%20165.838%2084.5482L170.531%2085.7708C169.178%2087.0317%20166.828%2086.1789%20165.236%2085.5202C163.807%2082.3168%20162.283%2085.5032%20160.641%2085.9444C160.606%2086.2013%20160.529%2086.447%20160.428%2086.6863L160.837%2086.6552C160.355%2088.1239%20159.168%2089.4651%20157.745%2090.639C157.605%2091.0607%20157.571%2091.4995%20157.724%2091.9729C154.779%2096.4898%20149.357%2096.79%20146.677%20100.685C150.533%20101.167%20153.924%2098.6342%20157.546%2097.5406C158.1%2097.8048%20157.768%2098.4289%20157.843%2098.8405C154.647%20100.683%20151.309%20102.321%20147.399%20102.664C145.53%20105.857%20141.464%20105.103%20138.504%20104.812C137.88%20104.479%20136.71%20104.362%20137.171%20103.186C139.171%20103.632%20140.888%20103.602%20142.46%20103.093C143.065%20102.328%20143.25%20101.156%20144.068%20100.729C141.786%2099.9448%20139.175%20101.186%20137.023%2099.918C136.724%2099.4739%20136.394%2099.0112%20136.012%2098.5826L135.968%2098.5904C134.675%2098.7899%20133.962%2097.563%20133.082%2096.7019C132.593%2096.5633%20132.08%2096.4908%20132.347%2095.7402C136.985%2093.8731%20136.564%2088.1506%20141.136%2086.284C143.309%2084.8727%20142.509%2082.2754%20144.061%2080.6676C145.825%2087.2331%20153.586%2083.1817%20158.283%2084.6791ZM162.086%2058.5752C164.648%2059.6294%20167.899%2060.9473%20170.688%2059.3871C170.71%2060.6228%20169.634%2061.9475%20168.47%2062.1046C165.792%2062.2885%20162.977%2062.3386%20161.829%2059.5414C162.238%2059.3283%20162.092%2058.9187%20162.086%2058.5752ZM247.14%2034.9676C245.82%2034.1669%20246.686%2032.5022%20247.358%2031.6664C247.358%2031.6664%20242.945%2030.7815%20241.749%2029.1537C242.204%2027.7031%20244.341%2028.1467%20245.011%2027.1042C243.624%2026.3726%20241.303%2027.2375%20240.396%2026.4981C240.241%2025.4015%20241.74%2024.6884%20242.287%2024.5414C242.287%2024.5414%20230.173%2027.2258%20229.139%2027.0385C233.294%2023.7407%20238.789%2022.3669%20242.217%2021.337C242.204%2020.581%20243.469%2015.2701%20242.224%2014.8114C234.175%2014.1274%20227.799%2018.9328%20223.261%2028.7894C212.89%2021.0699%20198.307%2020.0192%20185.572%2022.5085C172.645%2025.4818%20164.487%2039.4607%20151.176%2041.5166C154.864%2047.1602%20161.885%2048.8785%20166.333%2053.8984C171.626%2054.0123%20173.913%2047.3081%20178.346%2045.4439C186.428%2040.081%20195.373%2036.9023%20203.528%2031.8133C201.585%2030.7479%20198.707%2031.1415%20196.585%2031.591C187.066%2037.2536%20176.112%2039.506%20167.168%2046.6013C166.615%2046.4042%20166.182%2045.244%20166.79%2044.615C174.297%2037.8198%20184.956%2038.39%20192.321%2031.322C196.968%2029.9355%20202.366%2028.1925%20207.477%2029.7516C207.664%2032.635%20210.778%2033.8857%20213.086%2032.2648C214.588%2031.7574%20215.802%2030.4998%20217.665%2030.8798C215.422%2036.2772%20208.006%2036.4757%20205.36%2042.293C199.917%2049.2584%20204.995%2060.7115%20196.572%2066.218C196.93%2067.1043%20195.899%2067.1219%20195.564%2067.5402C197.652%2073%20198.239%2079.1048%20201.827%2083.9189C201.704%2084.7464%20202.203%2085.7685%20201.182%2086.2667C194.436%2081.5756%20198.486%2069.6194%20188.345%2067.3228C184.258%2065.265%20180.366%2062.7217%20176.671%2059.6267C164.842%2059.365%20156.378%2048.518%20147.096%2041.7564C145.984%2041.717%20144.838%2041.5959%20143.649%2041.3779C139.355%2039.3912%20132.766%2039.7818%20128.539%2041.6421C121.721%2044.5775%20117.828%2038.05%20110.992%2040.0251C107.274%2041.2014%20103.596%2041.5511%20100.019%2041.233C90.8914%2047.1986%2084.8323%2062.0343%2072.83%2061.7828C65.5737%2067.1992%2061.3919%2075.5856%2055.6719%2082.4863C52.666%2087.3481%2053.4253%2095.4421%2046.0299%2096.8763C46.4313%2092.335%2052.647%2090.1653%2052.0734%2084.8856C50.74%2079.3436%2057.3483%2076.1368%2059.4659%2071.5653C49.823%2066.1693%2048.8082%2055.3321%2048.4224%2045.0324C47.0827%2039.0793%2043.4161%2033.7154%2038.9439%2029.397L38.9254%2028.3666C50.2229%2037.9249%2072.9049%2034.5746%2073.6706%2054.8286C74.3731%2055.71%2074.6654%2056.7356%2075.708%2057.4045C77.5648%2057.5777%2078.7056%2055.9781%2079.9199%2054.7201C78.3885%2045.6774%2070.0658%2037.3042%2061.4303%2034.5692C57.2077%2032.7191%2051.7251%2033.5019%2048.5012%2029.8479C61.1555%2030.5883%2077.0278%2034.6402%2081.8147%2049.0531C82.5975%2050.6881%2084.5434%2051.8912%2086.1127%2051.3133C89.0992%2048.6235%2091.158%2042.653%2094.809%2040.2941C88.2056%2038.4902%2082.0818%2034.5026%2076.8672%2029.3527C68.9051%2021.9344%2057.9642%2020.958%2047.0583%2021.9728C43.0843%2022.5916%2037.069%2024.2773%2033.849%2020.8982C30.9292%2018.9567%2028.4588%2015.1524%2025.486%2014.1055C24.4683%2018.7942%2029.7349%2021.3823%2031.5713%2024.2355L30.6212%2024.9389C27.4333%2023.3457%2026.3256%2018.8993%2022.6124%2018.7587C22.6201%2019.1703%2022.4902%2019.5847%2022.9052%2019.7842C23.4019%2020.6681%2024.8584%2021.4669%2024.3248%2022.3698L21.653%2022.7595C21.8029%2023.513%2022.9145%2024.2491%2022.0368%2025.0892C21.0751%2025.1062%2019.8122%2023.6162%2019.0825%2025.1403C19.5111%2026.0267%2020.9077%2027.3761%2022.0879%2028.0421C22.4645%2029.8903%2020.2413%2028.4868%2019.782%2029.7312C23.9322%2031.3769%2028.0137%2032.9541%2032.7574%2033.1458C39.3846%2034.954%2043.6272%2041.8873%2044.2227%2048.4046C44.6571%2061.5186%2041.1501%2073.1221%2045.4856%2085.3433C36.1501%2089.7664%2029.2484%2099.7115%2027.4927%20109.36C26.3923%20113.228%2021.8398%20116.123%2022.7379%20120.367C32.8979%20119.916%2037.2947%20108.09%2046.8783%20106.068C48.3835%20105.767%2049.2825%20102.11%2051.1068%20104.345C51.5446%20105.78%2049.8371%20106.359%2049.1672%20107.333C41.6507%20109.663%2039.3919%20118.015%2033.9852%20123.125C29.405%20128.358%2021.438%20124.581%2015.8819%20125.09L15.9111%20126.738C21.0459%20133.587%2028.8757%20137.435%2037.5059%20135.911C38.7478%20136.233%2039.7359%20133.81%2040.7964%20135.509C39.265%20138.285%2037.5934%20140.925%2034.9543%20143.238C31.7114%20146.386%2027.9874%20145.559%2023.8169%20146.729C26.0415%20152.187%2032.033%20156.959%2037.5545%20158.375C39.3506%20158.962%2015.9374%20177.582%2017.2572%20191.008C25.9788%20186.87%2037.2373%20179.54%2047.8187%20179.631C50.7852%20180.335%2054.2893%20180.342%2056.4561%20182.435C53.1091%20187.509%2044.9694%20185.658%2043.4472%20192.9C40.9851%20201.392%2045.8047%20209.895%2044.5262%20219.262C44.4469%20222.631%2043.8388%20227.106%2042.7929%20230.147C48.9468%20228.528%2054.8235%20222.793%2058.0153%20216.69C59.7748%20215.148%2062.3945%20215.653%2063.9391%20213.632C66.5033%20206.992%2068.5772%20199.88%2073.151%20194.304C74.3385%20195.45%2073.6171%20197.387%2073.8501%20198.965C68.0897%20214.705%2073.9284%20230.849%2067.0594%20241.153C70.8991%20240.742%2082.6213%20233.024%2084.2821%20229.766C90.9435%20221.749%2083.9781%20208.405%2091.0549%20200.585C91.6065%20200.714%2092.3557%20200.289%2092.7089%20200.901C91.1595%20206.562%2091.6294%20213.835%2093.9869%20219.017C98.085%20225.472%20105.111%20230.433%20112.676%20230.92L112.275%20227.629C108.825%20222.879%20108.78%20216.285%20110.677%20210.824C110.655%20209.588%20109.393%20208.168%20110.612%20207.184C118.604%20212.334%20116.238%20222.475%20118.302%20230.477C119.637%20236.089%20124.337%20241.708%20130.396%20242.495C122.012%20222.949%20128.882%20220.201%20130.135%20211.79C129.226%20225.008%20131.611%20233.773%20133.004%20230.161C137.824%20226.848%20147.766%20225.979%20150.06%20219.686C151.489%20214.99%20150.429%20209.374%20146.87%20206.207C148.681%20203.633%20156.529%20212.427%20157.277%20215.919C155.909%20224.187%20155.54%20234.499%20161.967%20240.571L163.82%20232.637C166.193%20226.825%20174.894%20225.505%20175.478%20219.586C176.583%20215.993%20172.158%20207.836%20173.902%20204.087C175.024%20205.372%20175.804%20206.734%20175.969%20208.379C184.12%20214.832%20181.095%20226.496%20191.219%20231.816C193.574%20232.942%20195.881%20235.169%20198.483%20234.711C195.469%20227.413%20197.797%20218.991%20200.083%20212.217C202.931%20202.205%20189.265%20198.666%20188.834%20189.674L189.434%20188.701C191.304%20193.409%20196.495%20195.585%20200.516%20197.713C204.974%20201.208%20204.115%20207.063%20206.665%20211.485C207.352%20211.472%20211.61%20195.665%20209.553%20188.006C206.937%20179.875%20195.96%20176.77%20194.716%20168.48C198.469%20170.955%20201.891%20174.124%20206.369%20174.871C212.403%20178.063%20214.638%20184.139%20215.498%20190.169C216.211%20191.668%20216.803%20193.993%20218.59%20194.101C221.114%20185.194%20229.074%20176.81%20224.364%20166.657C221.155%20156.063%20204.535%20156.422%20205.833%20144.169C208.908%20149.448%20214.019%20152.616%20218.483%20152.537C225.604%20155.093%20227.061%20163.792%20233.904%20166.145C233.922%20155.36%20230.648%20144.906%20221.527%20137.987C213.578%20135.241%20206.445%20128.015%20202.742%20120.522C202.742%20120.522%20212.114%20126.13%20217.083%20127.485C222.2%20129.319%20225.951%20135.644%20231.708%20134.855C228.647%20128.725%20227.974%20121.593%20222.457%20116.537C216.449%20106.886%20203.103%20109.799%20198.435%2098.1314C209.252%20106.172%20221.273%20105.485%20228.143%20107.202C217.838%2097.928%20214.639%2081.9098%20202.622%2074.3558C203.32%2071.0467%20207.813%2068.6319%20208.366%2064.9818C211.994%2056.3303%20208.082%2044.7186%20216.137%2037.8451C228.416%2028.9056%20239.196%2044.3129%20252.138%2037.8349C251.757%2035.7119%20248.411%2036.8693%20247.14%2034.9676Z'%20fill='%23FFCB04'/%3e%3cpath%20d='M242.185%2034.4357C238.304%2032.5803%20233.42%2032.1838%20229.226%2031.9829C229.031%2032.6046%20229.652%2032.8002%20229.591%2033.2818C235.207%2032.2218%20239.47%2036.3383%20244.461%2035.0146C244.032%2033.9921%20242.942%2034.5603%20242.185%2034.4357Z'%20fill='black'/%3e%3cpath%20d='M241.439%2031.1515C239.819%2028.8442%20234.562%2030.7215%20233.809%2026.9561C232.944%2028.5513%20229.504%2028.3372%20230.851%2030.6495C234.474%2029.624%20237.932%2030.8694%20241.439%2031.1515Z'%20fill='black'/%3e%3cpath%20d='M191.301%2061.1977C191.713%2061.3821%20192.172%2061.475%20192.666%2061.475C193.829%2061.475%20195%2060.953%20195.598%2060.1722C196.004%2058.274%20197.769%2057.625%20199.326%2057.0524C199.608%2056.9488%20199.885%2056.8471%20200.147%2056.7401C200.298%2055.5852%20200.399%2054.3768%20200.497%2053.2064C200.851%2048.9925%20201.216%2044.64%20203.93%2041.5508L203.397%2041.5606C200.672%2042.8556%20198.705%2046.0347%20198.131%2050.0759L198.119%2050.1595L198.05%2050.2077C196.597%2051.2225%20195.704%2052.7306%20194.84%2054.1885C193.637%2056.2215%20192.498%2058.1451%20190%2058.6048C189.811%2059.5174%20190.196%2060.2788%20191.301%2061.1977Z'%20fill='%23FFCB04'/%3e%3cpath%20d='M190%2058.6048C192.498%2058.1451%20193.637%2056.2215%20194.84%2054.1885C195.704%2052.7306%20196.597%2051.2225%20198.05%2050.2077L198.119%2050.1595L198.131%2050.0759C198.705%2046.0347%20200.672%2042.8556%20203.397%2041.5606L203.93%2041.5508C201.216%2044.64%20200.851%2048.9925%20200.497%2053.2064C200.399%2054.3768%20200.298%2055.5852%20200.147%2056.7401C199.885%2056.8471%20199.608%2056.9488%20199.326%2057.0524C197.769%2057.625%20196.004%2058.274%20195.598%2060.1722C195%2060.953%20193.829%2061.475%20192.666%2061.475C192.172%2061.475%20191.713%2061.3821%20191.301%2061.1977C190.196%2060.2788%20189.811%2059.5174%20190%2058.6048ZM189.684%2058.2626L189.652%2058.3857C189.285%2059.8042%20190.164%2060.7636%20191.073%2061.5147L191.116%2061.5415C191.585%2061.7555%20192.106%2061.8645%20192.666%2061.8645C193.963%2061.8645%20195.277%2061.2637%20195.936%2060.3695L195.971%2060.2927C196.316%2058.5739%20197.915%2057.9863%20199.461%2057.4176C199.786%2057.2979%20200.103%2057.1812%20200.4%2057.0566L200.503%2057.0133L200.518%2056.9024C200.679%2055.7047%20200.783%2054.4511%20200.885%2053.2392C201.246%2048.9368%20201.62%2044.4885%20204.521%2041.484L204.848%2041.1459L203.348%2041.1717L203.269%2041.1902C200.425%2042.5212%20198.368%2045.7879%20197.758%2049.9375C196.278%2050.999%20195.377%2052.5192%20194.506%2053.9899C193.329%2055.9776%20192.217%2057.8549%20189.809%2058.2427L189.684%2058.2626Z'%20fill='%23FFD401'/%3e%3cpath%20d='M195.021%20141.869L194.923%20141.996L194.78%20141.924C193.2%20141.136%20193.081%20140.519%20192.762%20138.869L192.683%20138.465L192.709%20138.409C192.83%20138.138%20193.036%20137.777%20193.427%20137.777C193.654%20137.777%20193.864%20137.9%20194.086%20138.031C194.248%20138.125%20194.415%20138.224%20194.588%20138.272L194.686%20138.3L194.719%20138.395C194.783%20138.577%20194.861%20138.767%20194.941%20138.96C195.32%20139.881%20195.751%20140.926%20195.021%20141.869ZM177.382%20120.031L175.443%20117.001L175.523%20116.894C175.954%20116.315%20176.365%20116.022%20176.747%20116.022C176.959%20116.022%20177.263%20116.113%20177.511%20116.546C177.98%20117.366%20177.996%20118.986%20177.542%20119.758L177.382%20120.031ZM174.189%2099.0268L173.821%2098.6225L174.361%2098.7033C176.464%2099.0161%20178.37%20100.61%20179.872%20103.311C180.57%20104.788%20180.788%20106.85%20180.998%20108.843C181.095%20109.767%20181.196%20110.722%20181.342%20111.592L181.366%20111.732L181.24%20111.797C181.056%20111.893%20180.864%20111.86%20180.73%20111.772L180.751%20113L180.381%20112.427C179.249%20110.672%20178.491%20108.469%20177.76%20106.338C176.838%20103.66%20175.886%20100.89%20174.189%2099.0268ZM174.73%20126.315L174.72%20126.496L156.194%20126.819L156.452%20123.763L156.609%20123.744C159.354%20123.418%20162.553%20123.238%20165.62%20123.238C167.692%20123.238%20169.688%20123.321%20171.398%20123.477L171.827%20123.078C169.604%20121.702%20166.755%20121.061%20162.894%20121.061C160.823%20121.061%20158.712%20121.238%20156.67%20121.41C156.09%20121.459%20155.517%20121.507%20154.953%20121.55L154.836%20121.559L154.032%20120.272L154.203%20120.171C158.204%20117.79%20163.101%20117.314%20167.837%20116.854C168.797%20116.761%20169.755%20116.668%20170.707%20116.56L170.812%20116.548L170.879%20116.63C173.009%20119.262%20174.949%20122.257%20174.73%20126.315ZM153.906%20127.128L153.742%20127.136C153.231%20127.164%20152.636%20127.193%20152.039%20127.193C150.62%20127.193%20148.7%20127.053%20148.26%20125.865C147.934%20125.705%20147.782%20125.868%20147.498%20126.236C147.216%20126.599%20146.859%20127.059%20146.153%20126.993L145.853%20126.965L146.001%20126.703C147.339%20124.341%20150.2%20124.068%20152.235%20124.068C152.893%20124.068%20153.518%20124.101%20154.041%20124.132L154.246%20124.145L153.906%20127.128ZM153.598%20129.024C153.398%20129.442%20152.833%20129.5%20152.252%20129.5C152.061%20129.5%20151.859%20129.493%20151.653%20129.486C151.445%20129.479%20151.233%20129.472%20151.027%20129.472C150.527%20129.472%20149.921%20129.511%20149.67%20129.818L149.537%20129.981L148.862%20129.331L149.062%20129.197C149.62%20128.825%20150.57%20128.774%20151.427%20128.774C151.65%20128.774%20151.872%20128.778%20152.085%20128.781C152.282%20128.785%20152.471%20128.787%20152.649%20128.787C152.993%20128.787%20153.222%20128.775%20153.391%20128.748L153.758%20128.689L153.598%20129.024ZM145.978%20123.993C147.392%20122.389%20150.185%20121.55%20152.214%20121.55L152.339%20121.551L152.362%20121.938C151.265%20122.091%20150.276%20122.607%20149.319%20123.106C148.334%20123.621%20147.315%20124.152%20146.151%20124.315L145.631%20124.387L145.978%20123.993ZM194.924%20125.262L192.925%20124.953C194.124%20126.718%20194.845%20128.698%20195.021%20130.893C194.618%20131.45%20194.072%20131.665%20193.384%20131.541C191.963%20128.818%20190.883%20125.95%20188.3%20123.729C188.086%20123.251%20187.194%20123.267%20186.995%20123.752C188.622%20126.402%20190.801%20129.181%20190.442%20132.279C187.231%20129.38%20183.167%20128.764%20179.498%20127.18C179.246%20124.505%20178.304%20121.704%20177.718%20119.653L177.997%20119.923C179.605%20121.475%20181.345%20118.834%20182.285%20117.582C186.542%20117.439%20190.34%20118.54%20193.875%20120.333C191.627%20117.488%20188.015%20115.214%20184.23%20114.868L184.085%20106.627C182.448%2099.3722%20178.524%2091.0598%20170.853%2088.4449C171.519%2091.1819%20174.624%2091.9515%20176.244%2094.2598C176.684%2095.8321%20178.22%2097.2478%20177.968%2098.4888C177.339%2097.9502%20176.171%2097.9711%20175.947%2096.8761C174.587%2097.7235%20173.519%2095.5431%20171.678%2096.3312C171.602%2099.9054%20176.037%20102.027%20174.454%20105.834C173.279%20105.441%20172.629%20103.666%20171.122%20103.898C173.105%20107.299%20177.005%20110.254%20176.251%20114.389C172.221%20115.696%20170.229%20111.746%20166.984%20110.909C166.056%20112.711%20168.723%20112.116%20167.998%20113.846C164.131%20116.662%20159.047%20116.682%20154.605%20118.065C149.183%20118.298%20145.115%20125.306%20139.834%20121.964C139.223%20122.318%20139.58%20123.067%20139.52%20123.619C139.813%20124.644%20140.919%20125.037%20141.816%20125.227C144.225%20125.528%20142.898%20128.162%20142.92%20129.467C143.243%20132.21%20146.285%20129.409%20146.88%20132.01C153.436%20129.765%20159.469%20132.957%20166.06%20132.705C167.848%20132.743%20169.194%20135.123%20171.035%20134.267L171.017%20133.236C166.366%20130.569%20160.668%20130.806%20155.758%20128.899C161.926%20128.036%20168.256%20128.612%20174.245%20129.264C173.679%20132.297%20173.045%20135.263%20171.441%20137.901C165.369%20136.426%20159.497%20134.536%20153.228%20133.547C153.358%20133.132%20153.416%20132.581%20153.824%20132.23C152.722%20132.112%20151.893%20131.245%20150.876%20132.626C150.876%20132.626%20143.786%20131.857%20143.372%20135.712C152.41%20133.972%20161.819%20137.657%20170.119%20140.879C169.665%20142.396%20167.212%20143.609%20167.927%20145.176C170.354%20146.438%20171.67%20143.118%20173.434%20141.782C178.417%20143.894%20183.215%20147.175%20187.462%20150.469C190.17%20152.07%20192.299%20156.017%20195.12%20156.242C190.459%20148.973%20182.53%20143.41%20175.727%20139.474C178.016%20136.754%20178.575%20133.31%20180.517%20130.459C184.099%20131.016%20187.154%20132.818%20190.144%20134.895C188.453%20140.282%20192.978%20143.777%20195.658%20147.645C197.339%20149.54%20196.314%20153.749%20199.408%20153.9L199.35%20150.603C194.889%20142.987%20199.383%20132.809%20194.924%20125.262Z'%20fill='black'/%3e%3cpath%20d='M182.252%2047.8885C178.913%2049.1003%20176.121%2052.2624%20173.546%2055.4289L174.382%2056.523C178.329%2056.703%20181.4%2059.1592%20184.371%2061.5351C187.135%2063.7452%20189.992%2066.0302%20193.517%2066.4135C194.797%2065.7218%20195.553%2064.4418%20196.191%2063.1415L190.846%2063.5613L190.796%2063.5341C188.893%2062.5203%20187.706%2060.676%20187.655%2058.6829C187.216%2058.7408%20186.81%2058.8785%20186.384%2059.0239C185.815%2059.2171%20185.226%2059.4175%20184.539%2059.4175C184.307%2059.4175%20184.071%2059.3942%20183.838%2059.3479C182.009%2058.6829%20180.291%2057.9372%20179.054%2056.0467C177.687%2053.9193%20179.19%2052.5124%20180.516%2051.2705C181.631%2050.2265%20182.687%2049.238%20182.252%2047.8885Z'%20fill='%23FFCB04'/%3e%3cpath%20d='M179.054%2056.0467C180.291%2057.9372%20182.009%2058.6829%20183.838%2059.3479C184.071%2059.3942%20184.307%2059.4175%20184.539%2059.4175C185.226%2059.4175%20185.815%2059.2171%20186.384%2059.0239C186.81%2058.8785%20187.216%2058.7408%20187.655%2058.6829C187.706%2060.676%20188.893%2062.5203%20190.796%2063.5341L190.846%2063.5613L196.191%2063.1415C195.553%2064.4418%20194.797%2065.7218%20193.517%2066.4135C189.992%2066.0302%20187.135%2063.7452%20184.371%2061.5351C181.4%2059.1592%20178.329%2056.703%20174.382%2056.523L173.546%2055.4289C176.121%2052.2624%20178.913%2049.1003%20182.252%2047.8885C182.687%2049.238%20181.631%2050.2265%20180.516%2051.2705C179.19%2052.5124%20177.687%2053.9193%20179.054%2056.0467ZM180.782%2051.5546C181.989%2050.424%20183.237%2049.2555%20182.549%2047.5679L182.479%2047.3981L182.306%2047.457C178.748%2048.6668%20175.83%2051.9958%20173.148%2055.3024L173.051%2055.4211L174.184%2056.9044L174.276%2056.9078C178.138%2057.0488%20181.183%2059.4842%20184.128%2061.8392C186.952%2064.0964%20189.871%2066.4306%20193.537%2066.8071L193.595%2066.8129L193.647%2066.7862C195.164%2065.9927%20195.982%2064.4827%20196.69%2063.0048L196.835%2062.7003L190.929%2063.1639C189.117%2062.1763%20188.012%2060.3836%20188.043%2058.4718L188.047%2058.2597L187.835%2058.2743C187.264%2058.3132%20186.753%2058.4869%20186.258%2058.6552C185.695%2058.8469%20185.162%2059.0283%20184.539%2059.0283C184.33%2059.0283%20184.125%2059.0079%20183.942%2058.9738C182.206%2058.3409%20180.551%2057.6243%20179.381%2055.8351C178.19%2053.9816%20179.449%2052.8029%20180.782%2051.5546Z'%20fill='%23FFD401'/%3e%3cpath%20d='M194.385%20138.616C194.203%20138.55%20194.038%20138.453%20193.889%20138.367C193.714%20138.263%20193.548%20138.166%20193.427%20138.166C193.383%20138.166%20193.256%20138.166%20193.089%20138.513L193.144%20138.795C193.449%20140.373%20193.539%20140.839%20194.804%20141.5C195.264%20140.764%20194.917%20139.923%20194.581%20139.108C194.512%20138.941%20194.444%20138.776%20194.385%20138.616Z'%20fill='%23FFCB04'/%3e%3cpath%20d='M194.804%20141.5C193.539%20140.839%20193.449%20140.373%20193.144%20138.795L193.089%20138.513C193.256%20138.166%20193.383%20138.166%20193.427%20138.166C193.548%20138.166%20193.714%20138.263%20193.889%20138.367C194.038%20138.453%20194.203%20138.55%20194.385%20138.616C194.444%20138.776%20194.512%20138.941%20194.581%20139.108C194.917%20139.923%20195.264%20140.764%20194.804%20141.5ZM194.719%20138.395L194.686%20138.3L194.588%20138.272C194.415%20138.224%20194.248%20138.125%20194.086%20138.031C193.864%20137.9%20193.654%20137.777%20193.427%20137.777C193.036%20137.777%20192.83%20138.138%20192.709%20138.409L192.683%20138.465L192.762%20138.869C193.081%20140.519%20193.2%20141.136%20194.78%20141.924L194.923%20141.996L195.021%20141.869C195.751%20140.926%20195.32%20139.881%20194.941%20138.96C194.861%20138.767%20194.783%20138.577%20194.719%20138.395Z'%20fill='%23FFD401'/%3e%3cpath%20d='M189.613%2044.067C187.424%2044.6887%20186.804%2046.9776%20187.163%2049.0213C187.247%2049.0237%20187.331%2049.0257%20187.415%2049.0257C188.43%2049.0257%20189.045%2048.7698%20189.448%2048.1724C189.067%2046.9148%20189.909%2046.2236%20190.655%2045.6111C191.322%2045.0638%20191.902%2044.5866%20191.708%2043.7746L189.613%2044.067Z'%20fill='%23FFCB04'/%3e%3cpath%20d='M190.655%2045.6111C189.909%2046.2236%20189.067%2046.9148%20189.448%2048.1724C189.045%2048.7698%20188.43%2049.0257%20187.415%2049.0257C187.331%2049.0257%20187.247%2049.0237%20187.163%2049.0213C186.804%2046.9776%20187.424%2044.6887%20189.613%2044.067L191.708%2043.7746C191.902%2044.5866%20191.322%2045.0638%20190.655%2045.6111ZM191.979%2043.3438L189.533%2043.6868C187.025%2044.397%20186.358%2046.9914%20186.809%2049.2472L186.839%2049.3966L186.991%2049.4034C187.133%2049.4106%20187.274%2049.415%20187.415%2049.415C188.218%2049.415%20189.218%2049.2886%20189.827%2048.3029L189.875%2048.2242L189.845%2048.1375C189.482%2047.0775%20190.172%2046.5113%20190.902%2045.9119C191.618%2045.3242%20192.428%2044.6578%20192.032%2043.4956L191.979%2043.3438Z'%20fill='%23FFD401'/%3e%3cpath%20d='M177.978%20162.815C177.736%20165.325%20177.426%20167.563%20176.068%20169.535L175.799%20169.926L175.717%20169.459C175.517%20168.333%20175.211%20167.231%20174.915%20166.167C174.059%20163.09%20173.251%20160.186%20174.898%20156.85L174.952%20156.742H175.073C177.447%20156.749%20177.525%20158.689%20177.596%20160.399C177.63%20161.239%20177.665%20162.107%20177.959%20162.712L177.983%20162.761L177.978%20162.815ZM143.919%20167.031C142.464%20166.299%20143.747%20165.039%20143.869%20164.078C146.071%20160.396%20147.305%20156.321%20147.569%20151.783L148.576%20150.46C151.74%20150.612%20155.479%20148.347%20158.134%20150.98C156.187%20157.404%20151.528%20166.004%20143.919%20167.031ZM139.479%20180.298C137.972%20180.531%20136.789%20179.658%20135.542%20179.062C133.985%20176.479%20138.141%20174.481%20139.691%20172.738L139.479%20180.298ZM128.916%20141.94C130.315%20143.359%20139.863%20143.329%20135.985%20149.374C134.364%20150.914%20132.613%20153.007%20131.481%20155.087C128.677%20151.838%20128.309%20146.555%20128.916%20141.94ZM129.257%20177.178L125.617%20177.243C125.041%20175.74%20126.11%20174.006%20126.842%20172.618L128.473%20171.628C128.711%20173.48%20129.497%20175.114%20129.257%20177.178ZM120.881%20153.898C120.527%20149.438%20117.237%20145.855%20118.39%20141.094C120.7%20139.611%20124.091%20140.994%20126.975%20140.944C126.655%20146.171%20126.956%20151.593%20124.212%20155.833C122.988%20156.54%20121.519%20155.054%20120.881%20153.898ZM122.309%20176.682L117.982%20176.757C118.634%20174.684%20118.98%20170.9%20121.508%20170.102C121.751%20172.295%20122.542%20174.274%20122.309%20176.682ZM114.018%20154.361C111.914%20151.855%20110.414%20148.586%20110.556%20144.872C112.171%20142.989%20114.413%20141.507%20116.76%20142.153C116.838%20146.617%20115.879%20150.688%20114.018%20154.361ZM110.473%20179.499L108.826%20179.529C109.671%20176.834%20109.327%20172.856%20112.334%20171.911C113.818%20174.358%20115.769%20179.819%20110.473%20179.499ZM102.388%20149.273C103.949%20148.217%20105.721%20147.362%20107.569%20146.916C108.848%20149.436%20109.598%20152.995%20108.41%20155.764C104.5%20156.176%20105.573%20150.661%20102.388%20149.273ZM101.305%20181.652C99.2488%20181.962%2098.5303%20180.19%2097.9557%20178.757C97.6989%20175.806%2097.7821%20172.714%20100.089%20171.093C100.691%20174.105%20103.688%20176.527%20105.522%20179.243C106.05%20181.913%20102.805%20181.077%20101.305%20181.652ZM88.2408%20153.506C88.1527%20152.408%2088.4733%20151.098%2087.8394%20150.216C89.9425%20148.667%2093.3342%20150.119%2096.0818%20150.072C98.3678%20155.115%2099.7674%20160.518%20100.69%20166.136C93.8815%20165.705%2090.5316%20158.823%2088.2408%20153.506ZM177.549%20149.336C178.504%20152.892%20181.921%20155.716%20180.686%20159.793C174.652%20156.531%20178.683%20150.135%20173.834%20145.073L173.576%20150.023C172.458%20148.875%20171.036%20146.152%20170.211%20146.165C170.211%20146.165%20171.682%20151.706%20171.019%20153.023C171.019%20153.023%20169.926%20150.993%20168.38%20148.074C170.956%20155.974%20169.455%20157.928%20169.52%20161.636C168.979%20162.196%20169.073%20163.567%20167.9%20163.313C167.311%20157.072%20166.72%20150.762%20161.97%20146.31C148.478%20152.66%20137.182%20143.171%20125.905%20138.696C113.473%20134.928%20107.485%20150.01%2094.7303%20147.484C89.1932%20149.092%2082.2146%20142.826%2079.306%20149.402C75.6599%20156.954%2075.5266%20165.064%2077.3854%20173.138C78.2285%20174.292%2079.4213%20175.644%2079.4403%20176.743C79.685%20176.903%2079.9087%20177.078%2080.1252%20177.259C80.0576%20176.98%2079.9984%20176.69%2079.96%20176.378C79.814%20175.9%2079.7377%20175.419%2079.2507%20175.085C82.2211%20175.995%2085.9334%20174.844%2088.2422%20173.292C90.9607%20175.512%2090.8201%20179.223%2094.35%20180.744L94.3612%20181.43C91.3567%20182.511%2089.0863%20179.652%2086.2793%20180.252C85.1405%20180.819%2083.9879%20180.945%2082.9789%20180.647C83.7519%20181.637%2084.5833%20182.493%2085.7995%20182.885C91.9894%20183.326%2097.6078%20186.32%20104.309%20184.553C111.742%20181.332%20120.496%20179.119%20129.32%20180.818C134.369%20182.591%20139.399%20182.756%20144.696%20182.664C143.4%20182.325%20142.185%20181.793%20141.14%20180.956C144.869%20178.144%20150.269%20176.538%20152.865%20171.82C155.392%20170.951%20156.284%20174.784%20158.224%20175.711C157.483%20178.788%20154.613%20181.166%20151.827%20182.513C152.669%20182.504%20153.517%20182.5%20154.378%20182.512C158.271%20181.275%20161.383%20179.573%20164.49%20176.564C166.655%20178.587%20163.384%20180.156%20163.628%20182.212C167.142%20178.921%20168.296%20174.163%20171.667%20170.53C173.096%20173.665%20172.074%20178.08%20171.153%20180.432C173.578%20177.643%20175.936%20174.921%20177.253%20171.738C180.702%20172.432%20180.242%20177.662%20181.729%20180.249C182.067%20175.845%20182.325%20171.031%20180.464%20166.736C181%20165.97%20180.557%20164.192%20182.071%20164.371C182.697%20164.704%20182.366%20165.466%20182.443%20166.013C183.027%20167.995%20184.45%20170.789%20186.17%20170.896C182.341%20164.092%20187.153%20152.398%20177.549%20149.336Z'%20fill='black'/%3e%3cpath%20d='M180.338%20111.602L180.327%20111L180.633%20111.197C180.698%20111.238%20180.758%20111.291%20180.816%20111.344C180.853%20111.376%20180.889%20111.409%20180.922%20111.433C180.793%20110.613%20180.7%20109.735%20180.611%20108.884C180.404%20106.923%20180.19%20104.895%20179.527%20103.488C178.601%20101.827%20177.056%2099.7907%20174.85%2099.201C176.369%20101.098%20177.262%20103.695%20178.127%20106.212C178.768%20108.076%20179.428%20109.996%20180.338%20111.602Z'%20fill='%23FFCB04'/%3e%3cpath%20d='M179.527%20103.488C180.19%20104.895%20180.404%20106.923%20180.611%20108.884C180.7%20109.735%20180.793%20110.613%20180.922%20111.433C180.889%20111.409%20180.853%20111.376%20180.816%20111.344C180.758%20111.291%20180.698%20111.238%20180.633%20111.197L180.327%20111L180.338%20111.602C179.428%20109.996%20178.768%20108.076%20178.127%20106.212C177.262%20103.695%20176.369%20101.098%20174.85%2099.201C177.056%2099.7907%20178.601%20101.827%20179.527%20103.488ZM180.381%20112.427L180.751%20113L180.73%20111.772C180.864%20111.86%20181.056%20111.893%20181.24%20111.797L181.366%20111.732L181.342%20111.592C181.196%20110.722%20181.095%20109.767%20180.998%20108.843C180.788%20106.85%20180.57%20104.788%20179.872%20103.311C178.37%20100.61%20176.464%2099.0161%20174.361%2098.7033L173.821%2098.6225L174.189%2099.0268C175.886%20100.89%20176.838%20103.66%20177.76%20106.338C178.491%20108.469%20179.249%20110.672%20180.381%20112.427Z'%20fill='%23FFD401'/%3e%3cpath%20d='M175.917%20117.02L177.342%20119.248C177.576%20118.517%20177.516%20117.338%20177.173%20116.739C176.871%20116.211%20176.449%20116.35%20175.917%20117.02Z'%20fill='%23FFCB04'/%3e%3cpath%20d='M177.342%20119.248L175.917%20117.02C176.449%20116.35%20176.871%20116.211%20177.173%20116.739C177.516%20117.338%20177.576%20118.517%20177.342%20119.248ZM177.511%20116.546C177.263%20116.113%20176.959%20116.022%20176.747%20116.022C176.365%20116.022%20175.954%20116.315%20175.523%20116.894L175.443%20117.001L177.382%20120.031L177.542%20119.758C177.996%20118.986%20177.98%20117.366%20177.511%20116.546Z'%20fill='%23FFD401'/%3e%3cpath%20d='M175.193%20157.133C173.684%20160.29%20174.464%20163.095%20175.289%20166.062C175.547%20166.985%20175.811%20167.935%20176.008%20168.911C177.086%20167.125%20177.367%20165.092%20177.585%20162.832C177.278%20162.159%20177.242%20161.273%20177.207%20160.415C177.136%20158.692%20177.076%20157.2%20175.193%20157.133Z'%20fill='%23FFCB04'/%3e%3cpath%20d='M176.008%20168.911C175.811%20167.935%20175.547%20166.985%20175.289%20166.062C174.464%20163.095%20173.684%20160.29%20175.193%20157.133C177.076%20157.2%20177.136%20158.692%20177.207%20160.415C177.242%20161.273%20177.278%20162.159%20177.585%20162.832C177.367%20165.092%20177.086%20167.125%20176.008%20168.911ZM177.596%20160.399C177.525%20158.689%20177.447%20156.749%20175.073%20156.742H174.952L174.898%20156.85C173.251%20160.186%20174.059%20163.09%20174.915%20166.167C175.211%20167.231%20175.517%20168.333%20175.717%20169.459L175.799%20169.926L176.068%20169.535C177.426%20167.563%20177.736%20165.325%20177.978%20162.815L177.983%20162.761L177.959%20162.712C177.665%20162.107%20177.63%20161.239%20177.596%20160.399Z'%20fill='%23FFD401'/%3e%3cpath%20d='M167.874%20117.242C163.249%20117.691%20158.469%20118.156%20154.573%20120.404L155.041%20121.153C155.566%20121.112%20156.099%20121.068%20156.637%20121.022C158.687%20120.85%20160.807%20120.672%20162.894%20120.672C166.957%20120.672%20169.931%20121.375%20172.25%20122.886L172.458%20123.022L171.536%20123.881L171.45%20123.873C169.732%20123.713%20167.716%20123.627%20165.619%20123.627C162.626%20123.627%20159.507%20123.799%20156.813%20124.112L156.617%20126.423L174.349%20126.113C174.493%20122.319%20172.666%20119.47%20170.644%20116.958C169.726%20117.062%20168.8%20117.151%20167.874%20117.242Z'%20fill='%23FFCB04'/%3e%3cpath%20d='M174.349%20126.113L156.617%20126.423L156.813%20124.112C159.507%20123.799%20162.626%20123.627%20165.619%20123.627C167.716%20123.627%20169.732%20123.713%20171.45%20123.873L171.536%20123.881L172.458%20123.022L172.25%20122.886C169.931%20121.375%20166.957%20120.672%20162.894%20120.672C160.807%20120.672%20158.687%20120.85%20156.637%20121.022C156.099%20121.068%20155.566%20121.112%20155.041%20121.153L154.573%20120.404C158.469%20118.156%20163.249%20117.691%20167.874%20117.242C168.8%20117.151%20169.726%20117.062%20170.644%20116.958C172.666%20119.47%20174.493%20122.319%20174.349%20126.113ZM170.812%20116.548L170.707%20116.56C169.755%20116.668%20168.797%20116.761%20167.837%20116.854C163.101%20117.314%20158.204%20117.79%20154.203%20120.171L154.032%20120.272L154.836%20121.559L154.953%20121.55C155.517%20121.507%20156.09%20121.459%20156.67%20121.41C158.712%20121.238%20160.823%20121.061%20162.894%20121.061C166.755%20121.061%20169.604%20121.702%20171.827%20123.078L171.398%20123.477C169.688%20123.321%20167.692%20123.238%20165.62%20123.238C162.553%20123.238%20159.354%20123.418%20156.609%20123.744L156.452%20123.763L156.194%20126.819L174.72%20126.496L174.73%20126.315C174.949%20122.257%20173.009%20119.262%20170.879%20116.63L170.812%20116.548Z'%20fill='%23FFD401'/%3e%3cpath%20d='M145.642%2096.4426C144.471%2096.2568%20143.756%2094.6894%20143.598%2093.5242C143.989%2092.3494%20144.788%2090.8233%20145.881%2090.5305C146.732%2092.0259%20148.712%2095.2211%20145.642%2096.4426ZM144.061%2080.6676C142.509%2082.2754%20143.309%2084.8727%20141.136%2086.284C136.564%2088.1506%20136.985%2093.8731%20132.347%2095.7402C132.08%2096.4908%20132.593%2096.5633%20133.082%2096.7019C132.937%2096.5599%20132.788%2096.4271%20132.63%2096.3127C134.686%2096.0019%20137.09%2094.5989%20138.647%2093.2679C138.54%2095.0547%20140.14%2096.195%20140.375%2097.8398L136.012%2098.5826C136.394%2099.0112%20136.724%2099.4739%20137.023%2099.918C139.175%20101.186%20141.786%2099.9448%20144.068%20100.729C143.25%20101.156%20143.065%20102.328%20142.46%20103.093C140.888%20103.602%20139.171%20103.632%20137.171%20103.186C136.71%20104.362%20137.88%20104.479%20138.504%20104.812C141.464%20105.103%20145.53%20105.857%20147.399%20102.664C151.309%20102.321%20154.647%20100.683%20157.843%2098.8405C157.768%2098.4289%20158.1%2097.8048%20157.546%2097.5406C153.924%2098.6342%20150.533%20101.167%20146.677%20100.685C149.357%2096.79%20154.779%2096.4898%20157.724%2091.9729C157.571%2091.4995%20157.605%2091.0607%20157.745%2090.639C156.089%2092.006%20154.111%2093.1462%20152.537%2093.9859C152.973%2091.3682%20151.362%2089.61%20150.773%2087.4223L160.428%2086.6863C160.529%2086.447%20160.606%2086.2013%20160.641%2085.9444C162.283%2085.5032%20163.807%2082.3168%20165.236%2085.5202C166.828%2086.1789%20169.178%2087.0317%20170.531%2085.7708L165.838%2084.5482C167.595%2082.8684%20171.688%2085.1335%20172.397%2082.4408L166.484%2082.201C167.843%2081.4217%20170.226%2080.1432%20170.067%2078.8404C166.242%2080.1437%20162.664%2083.7796%20158.283%2084.6791C153.586%2083.1817%20145.825%2087.2331%20144.061%2080.6676Z'%20fill='black'/%3e%3cpath%20d='M168.47%2062.1046C169.634%2061.9475%20170.71%2060.6228%20170.688%2059.3871C167.899%2060.9473%20164.648%2059.6294%20162.086%2058.5752C162.092%2058.9187%20162.238%2059.3283%20161.829%2059.5414C162.977%2062.3386%20165.792%2062.2885%20168.47%2062.1046Z'%20fill='black'/%3e%3cpath%20d='M157.761%20188.566C154.634%20190.408%20152.027%20186.743%20148.202%20188.046C142.38%20185.058%20134.383%20187.464%20127.771%20186.479C110.876%20182.927%2092.4487%20193.83%2077.9064%20183.366L75.3023%20182.764C85.4303%20192.275%20104.982%20191.618%20117.204%20187.282C118.997%20187.595%20117.326%20190.304%20119.581%20189.578C123.105%20190.821%20126.022%20188.64%20129.097%20187.762C136.58%20191.273%20146.508%20185.396%20153.2%20190.982C150.277%20192.751%20147.285%20190.605%20144.329%20190.451C141.665%20191.39%20137.763%20192.214%20137.128%20195.178C140.281%20194.711%20142.86%20192.879%20146.297%20193.027C150.464%20195.565%20156.136%20193.887%20159.804%20191.486C162.182%20189.932%20164.956%20187.48%20165.939%20184.784C163.324%20184.554%20160.703%20187.829%20157.761%20188.566Z'%20fill='black'/%3e%3cpath%20d='M152.537%2093.9859C154.111%2093.1462%20156.089%2092.006%20157.745%2090.639C159.168%2089.4651%20160.355%2088.1239%20160.837%2086.6552L160.428%2086.6863L150.773%2087.4223C151.362%2089.61%20152.973%2091.3682%20152.537%2093.9859Z'%20fill='white'/%3e%3cpath%20d='M148.576%20150.46L147.569%20151.783C147.305%20156.321%20146.071%20160.396%20143.869%20164.078C143.747%20165.039%20142.464%20166.299%20143.919%20167.031C151.528%20166.004%20156.187%20157.404%20158.134%20150.98C155.479%20148.347%20151.74%20150.612%20148.576%20150.46Z'%20fill='white'/%3e%3cpath%20d='M158.224%20175.711C156.284%20174.784%20155.392%20170.951%20152.865%20171.82C150.269%20176.538%20144.869%20178.144%20141.14%20180.956C142.185%20181.793%20143.4%20182.325%20144.696%20182.664C146.422%20183.115%20148.292%20183.22%20150.097%20183.227C150.656%20183.038%20151.239%20182.797%20151.827%20182.513C154.613%20181.166%20157.483%20178.788%20158.224%20175.711Z'%20fill='white'/%3e%3cpath%20d='M146.544%20126.569C146.818%20126.477%20147%20126.242%20147.19%20125.997C147.413%20125.709%20147.644%20125.412%20148.029%20125.412C148.182%20125.412%20148.342%20125.46%20148.517%20125.561L148.583%20125.6L148.606%20125.673C148.837%20126.434%20149.96%20126.803%20152.039%20126.803C152.564%20126.803%20153.09%20126.781%20153.557%20126.756L153.812%20124.509C153.341%20124.482%20152.8%20124.457%20152.234%20124.457C149.364%20124.457%20147.542%20125.13%20146.544%20126.569Z'%20fill='%23FFCB04'/%3e%3cpath%20d='M153.557%20126.756C153.09%20126.781%20152.564%20126.803%20152.039%20126.803C149.96%20126.803%20148.837%20126.434%20148.606%20125.673L148.583%20125.6L148.517%20125.561C148.342%20125.46%20148.182%20125.412%20148.029%20125.412C147.644%20125.412%20147.413%20125.709%20147.19%20125.997C147%20126.242%20146.818%20126.477%20146.544%20126.569C147.542%20125.13%20149.364%20124.457%20152.234%20124.457C152.8%20124.457%20153.341%20124.482%20153.812%20124.509L153.557%20126.756ZM152.235%20124.068C150.2%20124.068%20147.339%20124.341%20146.001%20126.703L145.853%20126.965L146.153%20126.993C146.859%20127.059%20147.216%20126.599%20147.498%20126.236C147.782%20125.868%20147.934%20125.705%20148.26%20125.865C148.7%20127.053%20150.62%20127.193%20152.039%20127.193C152.636%20127.193%20153.231%20127.164%20153.742%20127.136L153.906%20127.128L154.246%20124.145L154.041%20124.132C153.518%20124.101%20152.893%20124.068%20152.235%20124.068Z'%20fill='%23FFD401'/%3e%3cpath%20d='M152.649%20128.787C152.471%20128.787%20152.282%20128.785%20152.085%20128.781C151.872%20128.778%20151.65%20128.774%20151.427%20128.774C150.57%20128.774%20149.62%20128.825%20149.062%20129.197L148.862%20129.331L149.537%20129.981L149.67%20129.818C149.921%20129.511%20150.527%20129.472%20151.027%20129.472C151.233%20129.472%20151.445%20129.479%20151.653%20129.486C151.859%20129.493%20152.061%20129.5%20152.252%20129.5C152.833%20129.5%20153.398%20129.442%20153.598%20129.024L153.758%20128.689L153.391%20128.748C153.222%20128.775%20152.993%20128.787%20152.649%20128.787Z'%20fill='%23FFD401'/%3e%3cpath%20d='M151.69%20139.894C152.305%20139.677%20153.613%20139.861%20153.321%20138.836C153.102%20138.152%20152.475%20137.613%20151.654%20137.902L151.661%20138.245C151.33%20138.938%20150.86%20139.565%20151.69%20139.894Z'%20fill='black'/%3e%3cpath%20d='M150.397%20122.137C149.07%20122.412%20147.693%20122.972%20146.728%20123.801C147.579%20123.576%20148.369%20123.163%20149.139%20122.761C149.55%20122.547%20149.966%20122.329%20150.397%20122.137Z'%20fill='%23FFCB04'/%3e%3cpath%20d='M150.397%20122.137C149.966%20122.329%20149.55%20122.547%20149.139%20122.761C148.369%20123.163%20147.579%20123.576%20146.728%20123.801C147.693%20122.972%20149.07%20122.412%20150.397%20122.137ZM149.319%20123.106C150.276%20122.607%20151.265%20122.091%20152.362%20121.938L152.339%20121.551L152.214%20121.55C150.185%20121.55%20147.392%20122.389%20145.978%20123.993L145.631%20124.387L146.151%20124.315C147.315%20124.152%20148.334%20123.621%20149.319%20123.106Z'%20fill='%23FFD401'/%3e%3cpath%20d='M150.1%20143.22L150.117%20144.181C150.394%20144.383%20150.609%20144.928%20151.09%20144.852C151.766%20144.222%20151.323%20142.512%20150.1%20143.22Z'%20fill='black'/%3e%3cpath%20d='M149.366%20140.553C150.045%20140.128%20149.611%20138.83%20148.656%20139.259L148.673%20140.221C148.882%20140.425%20149.093%20140.695%20149.366%20140.553Z'%20fill='black'/%3e%3cpath%20d='M125.789%2057.216C133.074%2053.4477%20140.779%2058.0542%20147.92%2057.7915C143.615%2055.1874%20138.918%2053.6895%20133.692%2053.4375C124.406%2056.7602%20116.879%2050.6393%20107.576%2052.9311C106.286%2053.8471%20103.672%2053.618%20103.707%2055.6097L105.012%2055.5868C112.303%2052.1615%20118.712%2057.2029%20125.789%2057.216Z'%20fill='black'/%3e%3cpath%20d='M143.598%2093.5242C143.756%2094.6894%20144.471%2096.2568%20145.642%2096.4426C148.712%2095.2211%20146.732%2092.0259%20145.881%2090.5305C144.788%2090.8233%20143.989%2092.3494%20143.598%2093.5242Z'%20fill='white'/%3e%3cpath%20d='M131.188%2083.1608C134.88%2078.2868%20140.378%2074.412%20146.245%2075.959C146.372%2075.3373%20146.154%2074.7238%20145.599%2074.321C144.228%2074.5511%20142.098%2074.5195%20140.649%2074.1337C133.272%2072.6811%20130.904%2082.616%20123.953%2081.9816L123.966%2082.6685C125.979%2083.8015%20129.012%2084.5035%20131.188%2083.1608Z'%20fill='black'/%3e%3cpath%20d='M145.34%20118.57L145.352%20119.188C145.636%20119.802%20146.248%20119.379%20146.662%20119.509C147.059%20118.608%20145.956%20118.421%20145.34%20118.57Z'%20fill='black'/%3e%3cpath%20d='M145.725%20140.618C147.723%20140.925%20146.175%20138.823%20145.691%20138.625L145.354%20138.973C145.5%20139.52%20145.101%20140.285%20145.725%20140.618Z'%20fill='black'/%3e%3cpath%20d='M145.177%20144.611C145.39%20145.019%20145.8%20144.875%20146.145%20144.937C146.201%20144.25%20146.053%20143.634%20145.428%20143.301C144.883%20143.517%20145.238%20144.128%20145.177%20144.611Z'%20fill='black'/%3e%3cpath%20d='M142.077%20120.551C142.29%20120.959%20142.702%20120.884%20143.113%20120.876C144.35%20120.924%20144.259%20119.551%20143.697%20118.874C143.372%20119.91%20141.855%20119.593%20142.077%20120.551Z'%20fill='black'/%3e%3cpath%20d='M141.66%20132.1L141.678%20133.131C141.818%20133.266%20142.029%20133.535%20142.302%20133.462C142.915%20133.178%20142.494%20132.566%20142.623%20132.083L141.66%20132.1Z'%20fill='black'/%3e%3cpath%20d='M139.915%20126.566L139.944%20128.214L140.562%20128.203C141.997%20127.766%20140.734%20126.276%20139.915%20126.566Z'%20fill='black'/%3e%3cpath%20d='M138.647%2093.2679C137.09%2094.5989%20134.686%2096.0019%20132.63%2096.3127C132.788%2096.4271%20132.937%2096.5599%20133.082%2096.7019C133.962%2097.563%20134.675%2098.7899%20135.968%2098.5904L136.012%2098.5826L140.375%2097.8398C140.14%2096.195%20138.54%2095.0547%20138.647%2093.2679Z'%20fill='white'/%3e%3cpath%20d='M139.818%20140.719C141.178%20139.872%20141.773%20142.472%20140.186%20142.02C139.563%20141.825%20139.896%20141.199%20139.818%20140.719Z'%20fill='black'/%3e%3cpath%20d='M139.321%20131.866C140.426%20132.19%20140.198%20130.957%20140.602%20130.47L139.636%20130.211C138.954%20130.566%20138.899%20131.324%20139.321%20131.866Z'%20fill='black'/%3e%3cpath%20d='M140.379%20137.412C138.843%20137.255%20139.53%20135.984%20140.07%20135.426C140.833%20135.824%20141.762%20136.568%20140.379%20137.412Z'%20fill='black'/%3e%3cpath%20d='M140.052%20118.662C138.59%20117.519%20137.194%20120.224%20135.788%20118.393L135.828%20120.659C137.116%20119.675%20139.598%20120.182%20140.052%20118.662Z'%20fill='black'/%3e%3cpath%20d='M135.542%20179.062C136.789%20179.658%20137.972%20180.531%20139.479%20180.298L139.691%20172.738C138.141%20174.481%20133.985%20176.479%20135.542%20179.062Z'%20fill='white'/%3e%3cpath%20d='M137.889%20124.608C136.507%20124.152%20136.116%20125.326%20135.926%20126.291L136.887%20126.275C138.06%20126.598%20137.901%20125.296%20137.889%20124.608Z'%20fill='black'/%3e%3cpath%20d='M138.044%20133.538L136.401%20133.84C136.206%20134.461%20136.692%20134.797%20137.043%20135.204C137.726%20134.986%20138.265%20134.357%20138.044%20133.538Z'%20fill='black'/%3e%3cpath%20d='M135.457%20138.803C136.492%20139.06%20136.481%20138.443%20136.813%20137.819C136.813%20137.819%20136.438%20136.912%20135.434%20137.498C134.205%20137.771%20135.457%20138.803%20135.457%20138.803Z'%20fill='black'/%3e%3cpath%20d='M135.985%20149.374C139.863%20143.329%20130.315%20143.359%20128.916%20141.94C128.309%20146.555%20128.677%20151.838%20131.481%20155.087C132.613%20153.007%20134.364%20150.914%20135.985%20149.374Z'%20fill='white'/%3e%3cpath%20d='M133.584%20125.989C134.194%20125.566%20135.971%20124.917%20134.918%20123.699C134.163%20123.712%20133.336%20123.52%20132.938%20124.351C132.471%20125.184%20133.71%20125.299%20133.584%20125.989Z'%20fill='black'/%3e%3cpath%20d='M133.677%20131.278C134.289%20130.855%20136.016%20131.443%20135.302%20129.944C135.151%20129.191%20133.972%20128.525%20133.367%20129.291L133.401%20131.282L133.677%20131.278Z'%20fill='black'/%3e%3cpath%20d='M129.748%20110.873C123.13%20109.546%20114.124%20109.154%20109.688%20114.865C109.137%20118.721%20114.6%20120.756%20114.805%20124.669C116.346%20126.29%20113.044%20129.989%20116.54%20129.584C117.881%20127.706%20117.677%20123.861%20119.006%20121.297C120.663%20117.833%20124.203%20115.985%20127.482%20114.897C129.286%20115.896%20128.227%20118.182%20128.529%20119.826C130.513%20119.31%20131.164%20117.169%20132.445%20115.773C133.849%20113.618%20131.478%20111.598%20129.748%20110.873Z'%20fill='black'/%3e%3cpath%20d='M129.287%20198.613C127.136%20197.346%20129.021%20195.114%20128.852%20193.331C126.976%20192.195%20127.104%20195.56%20125.247%20195.387C123.256%20195.559%20122.805%20193.301%20122.574%20191.793C120.44%20191.623%20120.487%20194.301%20118.642%20194.883C117.182%20193.878%20117.198%20190.857%20117.261%20190.579L114.983%20193.916C113.745%20193.801%20113.922%20192.148%20112.683%20191.964C112.114%20194.79%20112.09%20197.333%20113.165%20199.926C114.167%20202.175%20116.6%20203.849%20119.141%20203.737C122.552%20206.356%20121.04%20210.3%20121.923%20213.583C126.465%20213.984%20122.431%20207.253%20126.455%20205.602C130.751%20203.741%20134.378%20198.563%20133.448%20192.976C131.682%20194.106%20131.884%20197.812%20129.287%20198.613Z'%20fill='black'/%3e%3cpath%20d='M131.48%20135.301C130.717%20134.902%20131.656%20133.579%20130.421%20133.67L129.814%20134.3C129.827%20134.986%20129.77%20135.743%20130.192%20136.285C131.023%20136.683%20131.074%20135.651%20131.48%20135.301Z'%20fill='black'/%3e%3cpath%20d='M131.015%20128.37L130.981%20126.379C130.082%20126.051%20129.339%20126.818%20129.698%20127.706C130.047%20128.043%20130.401%20128.587%20131.015%20128.37Z'%20fill='black'/%3e%3cpath%20d='M128.606%20124.084L128.639%20126.075L130.621%20125.423C130.394%20124.259%20129.907%20123.924%20128.606%20124.084Z'%20fill='black'/%3e%3cpath%20d='M127.382%20128.777C127.037%20128.714%20126.627%20128.859%20126.414%20128.45C124.701%20128.755%20126.094%20129.83%20126.11%20130.723C127.353%20131.113%20127.678%20130.077%20128.428%20129.721C127.746%20130.008%20127.117%20129.4%20127.382%20128.777Z'%20fill='black'/%3e%3cpath%20d='M126.842%20172.618C126.11%20174.006%20125.041%20175.74%20125.617%20177.243L129.257%20177.178C129.497%20175.114%20128.711%20173.48%20128.473%20171.628L126.842%20172.618Z'%20fill='white'/%3e%3cpath%20d='M126.047%20127.151C126.387%20126.87%20126.924%20126.174%20126.706%20125.491C126.552%20124.531%20125.734%20124.89%20125.045%20124.832C124.506%20125.46%20124.613%20127.657%20125.361%20127.163L125.698%20126.814L126.047%20127.151Z'%20fill='black'/%3e%3cpath%20d='M126.888%20135.999C125.775%20135.125%20125.518%20136.161%20125.258%20137.057L126.575%20137.654L126.888%20135.999Z'%20fill='black'/%3e%3cpath%20d='M118.39%20141.094C117.237%20145.855%20120.527%20149.438%20120.881%20153.898C121.519%20155.054%20122.988%20156.54%20124.212%20155.833C126.956%20151.593%20126.655%20146.171%20126.975%20140.944C124.091%20140.994%20120.7%20139.611%20118.39%20141.094Z'%20fill='white'/%3e%3cpath%20d='M126.488%20132.708L125.177%20132.387L125.206%20134.036C126.244%20134.43%20126.501%20133.464%20126.488%20132.708Z'%20fill='black'/%3e%3cpath%20d='M122.809%20130.506C122.257%20130.378%20121.688%20129.288%20121.155%20130.191L121.177%20131.495L122.139%20131.479C122.689%20131.538%20122.953%20130.915%20122.809%20130.506Z'%20fill='black'/%3e%3cpath%20d='M121.932%20135.468L122.877%20134.42L121.893%20133.131L120.874%20133.837C120.887%20134.524%20121.108%20135.412%20121.932%20135.468Z'%20fill='black'/%3e%3cpath%20d='M117.982%20176.757L122.309%20176.682C122.542%20174.274%20121.751%20172.295%20121.508%20170.102C118.98%20170.9%20118.634%20174.684%20117.982%20176.757Z'%20fill='white'/%3e%3cpath%20d='M118.014%2084.0778C119.832%2082.0531%20118.745%2078.7747%20117.61%2076.8016C114.783%2076.1643%20116.144%2079.3697%20114.995%2080.4891C112.906%2074.8236%20112.717%2068.025%20107.154%2064.1371L106.479%2064.8362C109.374%2069.3201%20111.792%2074.087%20113.324%2079.2131L112.38%2080.1909C109.567%2076.4625%20108.459%2071.9465%20104.892%2068.4366L104.287%2069.1337C107.463%2074.0253%20110.436%2078.9878%20112.112%2084.5244L113.062%2083.8205L112.782%2083.4819C113.392%2083.0582%20112.545%2081.769%20113.714%2081.8172C114.064%2082.2229%20114.619%2082.488%20114.425%2083.1097C115.077%2085.1598%20116.576%2084.3775%20118.014%2084.0778Z'%20fill='black'/%3e%3cpath%20d='M118.24%20132.51C118.855%20132.292%20118.431%20131.681%20118.561%20131.199L116.912%20131.225L116.93%20132.257C117.146%20132.802%20117.758%20132.449%20118.24%20132.51Z'%20fill='black'/%3e%3cpath%20d='M115.603%20134.891C115.543%20135.441%20114.454%20136.01%20115.357%20136.543L116.318%20136.527C116.868%20136.587%20117.063%20135.965%20116.988%20135.553C116.633%20134.941%20116.357%20134.808%20115.603%20134.891Z'%20fill='black'/%3e%3cpath%20d='M110.556%20144.872C110.414%20148.586%20111.914%20151.855%20114.018%20154.361C115.879%20150.688%20116.838%20146.617%20116.76%20142.153C114.413%20141.507%20112.171%20142.989%20110.556%20144.872Z'%20fill='white'/%3e%3cpath%20d='M98.6787%2090.3241C100.087%2092.2224%2099.1705%2094.8498%2097.4786%2096.3219L96.5182%2096.338C95.5146%2094.0204%2096.4326%2091.4625%2098.6787%2090.3241ZM70.8685%2083.2523C70.5231%2087.0366%2075.0522%2082.8354%2077.1353%2084.1046L72.5751%2086.5199L73.2717%2087.1261C76.5691%2086.3249%2080.0668%2083.1389%2083.6069%2084.6076C87.581%2083.7597%2092.2689%2084.7253%2095.3244%2087.0842C93.9156%2088.9644%2089.87%2091.9071%2090.7467%2094.915C90.1926%2094.6859%2089.7006%2094.3863%2089.253%2094.0375C90.4575%2096.3575%2093.0543%2097.9405%2094.9205%2099.3201C92.5922%2099.7049%2090.0114%2097.5513%2087.9488%2097.4501C87.7128%2099.6529%2090.3164%2099.2632%2091.3035%20100.689C92.3553%20101.907%2095.3009%20101.444%2094.9837%20102.961C94.3012%20103.247%2093.6848%20103.327%2093.9762%20104.284C97.0897%20105.534%2099.774%20105.832%20103.266%20105.083C103.78%20103.082%20102.262%20101.986%20101.824%20100.413C102.225%20100.298%20102.582%20100.163%20102.917%20100.02C102.912%20100.02%20102.908%20100.02%20102.904%20100.02C103.78%2098.9732%20103.528%2096.5598%20103.712%2095.1816L106.723%2098.6902C106.84%2098.6819%20106.959%2098.6751%20107.084%2098.6731C108.148%20100.647%20106.682%20104.061%20107.209%20106.663C108.122%20107.746%20108.025%20110.153%20109.946%20109.913L109.859%20104.969C110.822%20105.088%20111.642%20104.799%20112.462%20104.579C112.909%20102.648%20110.446%20103.172%20110.076%20101.666C111.511%20101.229%20113.435%20101.264%20114.381%20100.286C113.263%2099.2754%20111.485%2099.7181%20110.368%2098.7072C111.383%2097.8656%20112.97%2098.2494%20113.991%2097.6822L111.014%2096.3604C111.328%2094.7059%20111.575%2093.0529%20111.889%2091.3983L110.927%2091.4159C110.719%2091.2821%20110.44%2091.0802%20110.574%2090.8029C110.291%2090.3952%20108.344%2092.9711%20106.647%2094.1688L104.976%2092.8933C105.297%2087.6661%2097.6545%2086.7004%2098.8794%2082.076C97.5168%2082.7867%2095.9615%2084.1187%2094.2949%2083.1871C89.1932%2082.1762%2081.8858%2084.6392%2077.7541%2080.1773C75.3393%2079.6018%2072.8621%2079.3697%2070.8277%2080.9177C72.6233%2081.4343%2074.7462%2081.0544%2076.4781%2081.8483C75.1199%2082.7658%2072.7147%2082.7386%2070.8685%2083.2523Z'%20fill='black'/%3e%3cpath%20d='M112.854%20127.038C111.194%20126.38%20111.568%20128.091%20110.548%20128.727C109.754%20130.39%20112.021%20130.487%20112.225%20130.346C113.379%20129.571%20114.176%20127.908%20112.854%20127.038Z'%20fill='black'/%3e%3cpath%20d='M108.826%20179.529L110.473%20179.499C115.769%20179.819%20113.818%20174.358%20112.334%20171.911C109.327%20172.856%20109.671%20176.834%20108.826%20179.529Z'%20fill='white'/%3e%3cpath%20d='M111.687%20134.959C112.643%20134.599%20112.615%20133.018%20111.648%20132.624C110.409%20132.508%20109.725%20132.796%20109.679%20134.033C109.833%20134.993%20110.865%20135.042%20111.687%20134.959Z'%20fill='black'/%3e%3cpath%20d='M111.143%20123.427C109.549%20122.699%20110.138%20124.888%20109.524%20125.103L110.84%20125.767C111.721%20125.066%20111.981%20124.237%20111.143%20123.427Z'%20fill='black'/%3e%3cpath%20d='M108.496%2085.8924L109.525%2085.8744C107.793%2081.0962%20106.517%2074.9345%20101.328%2072.8271C101.138%2073.7232%2099.075%2073.6215%2099.7191%2075.1218C103.943%2076.9718%20106.912%2081.7296%20108.496%2085.8924Z'%20fill='black'/%3e%3cpath%20d='M109.118%20141.255C110.347%20140.822%20110.506%20138.973%20109.747%20137.947C108.103%20137.943%20107.448%20139.98%20107.448%20139.98C108.006%20140.519%20107.959%20141.757%20109.118%20141.255Z'%20fill='black'/%3e%3cpath%20d='M107.479%20122.186C106.659%20122.337%20105.855%20123.519%20106.553%20124.193L108.82%20124.155C109.004%20122.915%20108.716%20122.164%20107.479%20122.186Z'%20fill='black'/%3e%3cpath%20d='M106.708%20133.054L107.326%20133.044C108.214%20132.82%20108.755%20132.263%20108.946%20131.366C109.1%20129.857%20107.858%20130.062%20106.982%20129.451C106.846%20130.675%20105.804%20131.916%20106.708%20133.054Z'%20fill='black'/%3e%3cpath%20d='M106.982%20129.451C106.983%20129.436%20106.986%20129.422%20106.988%20129.408C106.869%20129.318%20106.755%20129.226%20106.646%20129.131L106.64%20129.139C106.743%20129.264%20106.859%20129.365%20106.982%20129.451Z'%20fill='black'/%3e%3cpath%20d='M106.646%20129.131L106.976%20128.789C107.027%20127.758%20108.176%20126.638%20106.925%20125.836C106.304%20125.641%20105.969%20126.128%20105.563%20126.478C105.341%20127.629%20105.856%20128.448%20106.646%20129.131Z'%20fill='black'/%3e%3cpath%20d='M107.569%20146.916C105.721%20147.362%20103.949%20148.217%20102.388%20149.273C105.573%20150.661%20104.5%20156.176%20108.41%20155.764C109.598%20152.995%20108.848%20149.436%20107.569%20146.916Z'%20fill='white'/%3e%3cpath%20d='M106.766%20136.351C107.379%20136.065%20107.996%20135.984%20107.704%20135.028C106.583%20133.743%20104.843%20136.384%20104.39%20134.125L103.429%20134.141C102.815%20134.357%20103.238%20134.969%20103.108%20135.452C104.43%20136.391%20105.637%20134.72%20106.766%20136.351Z'%20fill='black'/%3e%3cpath%20d='M102.904%20100.02C102.908%20100.02%20102.912%20100.02%20102.917%20100.02C104.427%20100.133%20105.906%20100.482%20106.836%2098.8215L106.723%2098.6902L103.712%2095.1816C103.528%2096.5598%20103.78%2098.9732%20102.904%20100.02Z'%20fill='white'/%3e%3cpath%20d='M66.3294%20150.993C66.0896%20151.797%2065.7957%20152.591%2065.5121%20153.359C64.7994%20155.285%2064.0634%20157.278%2064.1515%20159.555L64.1617%20159.813L61.1625%20159.08L61.1426%20158.952C60.5627%20155.218%2063.717%20152.657%2066.02%20150.786L66.5089%20150.389L66.3294%20150.993ZM54.6997%20130.096C54.6549%20130.277%2054.6204%20130.445%2054.5878%20130.603C54.4467%20131.29%2054.3329%20131.844%2053.5589%20132.37L53.8571%20132.658L48.7749%20138.95L48.6231%20138.814C48.0451%20138.299%2048.4426%20137.715%2048.7335%20137.288C49.0959%20136.756%2049.2229%20136.491%2048.915%20136.194L48.8094%20136.092L48.8785%20135.963C50.2562%20133.377%2052.3553%20131.61%2054.3854%20129.901L54.8446%20129.514L54.6997%20130.096ZM66.4919%2099.81C64.9892%20101.884%2063.5696%20103.843%2061.2083%20103.843C60.9251%20103.843%2060.6298%20103.814%2060.3316%20103.755L60.1482%20103.72L60.1764%20103.535C60.6663%20100.315%2064.1223%2096.8722%2067.4259%2096.3108L69.6681%2096.2694L69.2298%2096.6245C68.1873%2097.47%2067.3252%2098.66%2066.4919%2099.81ZM63.5759%20112.223L56.0117%20112.355L55.9961%20112.174C55.8166%20110.095%2057.7698%20107.441%2059.6355%20106.362L59.6793%20106.336L61.0064%20106.313L59.3864%20109.7C59.5508%20109.729%2059.7143%20109.743%2059.8743%20109.743C61.2603%20109.743%2062.3408%20108.695%2063.4835%20107.585C64.7639%20106.343%2066.0998%20105.05%2067.9674%20105.162L68.3084%20105.182L63.5759%20112.223ZM77.4809%20126.782C78.3478%20126.505%2079.2454%20126.371%2080.2242%20126.371C82.3681%20126.371%2084.4395%20127.032%2086.2667%20127.614C86.598%20127.72%2086.921%20127.823%2087.2353%20127.919L87.5388%20128.012L86.5931%20128.99L77.3963%20129.86L77.3433%20126.826L77.4809%20126.782ZM77.747%20121.828C78.4602%20121.637%2079.204%20121.54%2079.9581%20121.54C82.6668%20121.54%2085.1682%20122.738%2087.587%20123.896L87.9207%20124.056L87.9441%20125.368L78.1396%20123.852C77.5612%20123.798%2077.5982%20123.16%2077.6254%20122.695C77.6385%20122.465%2077.6522%20122.228%2077.6094%20122.067L77.5588%20121.879L77.747%20121.828ZM79.528%20116.873C79.8943%20116.461%2080.2728%20116.035%2080.4655%20115.631L80.5234%20115.511L80.6562%20115.521C82.1827%20115.639%2084.0357%20116.333%2084.4989%20117.575L84.5256%20117.649L84.495%20117.72C84.387%20117.969%2084.2517%20118.204%2084.1204%20118.429C83.8421%20118.91%2083.5794%20119.363%2083.5901%20119.922L83.5945%20120.145L78.6757%20119.572L78.6256%20119.504C77.9776%20118.619%2078.7657%20117.732%2079.528%20116.873ZM85.8323%20118.101L85.9135%20118.048C86.1227%20117.978%2086.346%20117.942%2086.5781%20117.942C87.7792%20117.942%2089.0479%20118.877%2090.068%20119.628L90.2836%20119.787L90.1016%20119.97C89.8263%20120.168%2089.6297%20120.622%2089.4405%20121.063C89.1715%20121.686%2088.8937%20122.331%2088.3196%20122.331C88.1012%20122.331%2087.8701%20122.234%2087.6143%20122.034C86.5727%20121.953%2085.646%20121.325%2085.2947%20120.457C84.9775%20119.673%2085.1736%20118.814%2085.8323%20118.101ZM92.2966%20127.015L91.9483%20127.169C91.672%20126.782%2091.2122%20126.634%2090.7258%20126.476C89.9951%20126.24%2089.1676%20125.972%2089.1924%20124.765L89.2016%20124.343L89.5164%20124.623C89.8243%20124.897%2090.2271%20125.137%2090.6168%20125.368C91.3626%20125.812%2092.1341%20126.27%2092.2966%20127.015ZM92.1623%20130.206C92.0203%20130.208%2091.8709%20130.216%2091.7162%20130.224C91.5056%20130.235%2091.2847%20130.246%2091.0541%20130.246C90.4387%20130.246%2089.6195%20130.174%2088.7458%20129.613L88.6582%20129.556L88.6417%20128.634L88.7633%20128.583C88.9506%20128.504%2089.1535%20128.464%2089.3665%20128.464C90.1882%20128.464%2091.0668%20129.051%2091.8413%20129.569C91.9853%20129.665%2092.1263%20129.759%2092.264%20129.847L92.8055%20130.195L92.1623%20130.206ZM91.2191%20133.517C90.6883%20133.61%2090.0296%20133.66%2089.3125%20133.66C88.1002%20133.66%2086.8091%20133.525%2085.5774%20133.269L85.4256%20133.238L85.4076%20132.27L87.5812%20132.232L87.6284%20132.26C87.9392%20132.446%2088.8027%20132.618%2089.638%20132.784C90.197%20132.895%2090.7744%20133.01%2091.2371%20133.138L91.2191%20133.517ZM84.0683%20133.498C83.521%20134.123%2082.4741%20134.123%2081.5503%20134.123H81.383C80.4577%20134.123%2079.4093%20134.123%2078.844%20134.708L78.7015%20134.855L78.5614%20134.706C78.0958%20134.206%2078.1216%20133.529%2078.1469%20132.874C78.1596%20132.54%2078.1722%20132.224%2078.1221%20131.934L78.0837%20131.71L84.3904%20131.6L84.4132%20131.772C84.5169%20132.55%2084.404%20133.114%2084.0683%20133.498ZM74.1143%20155.057C74.6178%20152.37%2076.9062%20149.651%2076.9359%20147.451C75.0552%20149.888%2074.144%20152.79%2072.8154%20155.424C72.076%20152.415%2073.5359%20149.435%2074.9326%20146.799C71.932%20148.088%2071.93%20151.937%2069.7647%20153.828C68.6784%20150.618%2071.5623%20146.583%2070.96%20143.571C67.6305%20145.69%2064.6582%20148.559%2061.4717%20151.019C60.6185%20149.317%2061.5486%20147.581%2062.072%20146.061C64.0423%20140.875%2069.9972%20139.604%2074.7822%20138.215C77.0648%20139.067%2078.6566%20143.642%2081.0967%20141.745C80.871%20140.651%2080.169%20139.768%2080.4205%20138.46C83.1866%20135.526%2088.4226%20136.396%2092.5314%20135.637C96.1702%20135.505%2096.8391%20138.378%20100.515%20136.46C99.6792%20135.787%2099.3221%20134.969%2098.8269%20134.223C98.464%20133.06%2097.7343%20130.668%2099.3761%20130.228C97.7065%20129.088%2096.0535%20128.774%2095.3977%20126.656C94.8076%20124.331%2089.5055%20123.667%2092.2784%20121.145C95.5918%20121.981%2097.3232%20126.759%20101.293%20125.935L101.281%20125.247C102.161%20124.476%20103.188%20124.253%20104.212%20123.891C104.063%20123.207%20104.383%20121.896%20105.196%20121.196C105.475%20121.465%20105.691%20122.01%20106.169%20121.864C106.774%20121.099%20105.797%20120.222%20106.124%20119.255L104.475%20119.283L104.498%20120.588C104.092%20120.939%20103.825%20121.425%20103.204%20121.229C102.374%20120.901%20102.771%20120.069%20102.144%20119.599C101.735%20119.743%20101.109%20119.343%20100.845%20119.965C100.795%20120.996%20100.882%20122.026%20101.923%20122.625L100.915%20123.949L100.566%20123.612C98.0704%20122.35%2099.526%20119.095%2097.1709%20118.038C96.0846%20118.812%2095.1413%20119.859%2093.6235%20119.473C89.3989%20117.554%2085.4385%20114.944%2080.9503%20113.717L81.626%20113.087C81.8182%20112.259%2082.4881%20111.286%2082.2035%20110.741L80.5548%20110.769C78.1112%20116.378%2072.6646%20111.32%2068.7548%20111.663C70.3281%20107.377%2074.9613%20105.165%2078.8093%20105.167C79.6835%20104.121%2082.7391%20105.991%2082.077%20103.461C78.4814%20102.15%2075.0464%20102.141%2071.5579%20103.026C72.83%20101.149%2075.5514%2099.5901%2077.057%2099.289C74.846%2098.5719%2071.9042%2099.3109%2070.1952%2099.7526C71.7257%2096.9087%2074.0068%2093.7772%2076.93%2092.0089C75.959%2091.4757%2074.5229%2091.8444%2073.3535%2091.7963C63.2946%2094.1017%2054.2524%20103.466%2052.2992%20113.6C51.3632%20115.059%2048.4784%20115.109%2048.6993%20115.929L48.7056%20116.272C50.6272%20116.171%2052.3362%20115.66%2053.9702%20114.876C57.3464%20115.366%2063.1233%20111.83%2064.1639%20116.346C65.7445%20116.387%2066.5447%20114.931%2067.7692%20114.291C70.636%20113.211%2073.2717%20114.607%2075.691%20115.458C75.4312%20116.356%2075.4492%20117.385%2074.7759%20118.154C72.5921%20119.016%2069.9632%20117.962%2068.1759%20117.924L68.2114%20119.917C69.8056%20120.714%2072.1202%20119.505%2073.5169%20120.786C72.8446%20121.622%2073.5568%20123.052%2072.5381%20123.757C68.4955%20124.378%2064.0399%20124.936%2060.4102%20125.618C61.2037%20123.887%2063.4765%20124.19%2063.6497%20122.264C61.6639%20122.642%2060.2638%20125.071%2058.4016%20124.69L63.2372%20118.355L63.2192%20117.325C62.8091%20117.469%2062.1158%20117.069%2061.9208%20117.691L62.27%20118.028L53.8287%20126.42C52.0511%20123.016%2055.9882%20120.268%2057.5877%20117.422L56.6264%20117.439C54.6168%20120.429%2051.8477%20123.157%2050.5328%20126.477C48.2478%20133.387%2044.9466%20141.071%2046.9334%20148.593C48.7863%20140.591%2053.6662%20132.881%2061.0689%20127.942C64.6212%20126.78%2069.2831%20126.219%2072.5848%20126.435L72.6014%20127.397C75.3013%20132.503%2067.8996%20129.609%2067.4797%20133.12L73.0314%20132.336C73.8069%20133.491%2074.3167%20135.13%2074.1313%20136.301C69.8114%20136.79%2066.5846%20140.83%2062.3172%20140.424C59.3035%20144.873%2054.0242%20145.516%2050.2356%20148.879C49.9719%20149.501%2049.7734%20149.919%2050.6019%20150.178C52.5629%20148.357%2055.292%20147.279%2057.4812%20146.759C57.6042%20149.85%2056.2051%20152.347%2056.3263%20155.368C54.053%20158.912%2051.9845%20162.453%2051.5768%20166.65C53.0552%20164.769%2055.2103%20162.257%2056.6877%20160.308C57.0112%20163.12%2056.2562%20167.118%2057.541%20169.843C59.8707%20169.459%2058.3048%20166.395%2060.0712%20165.196L61.4625%20166.203C60.2954%20170.207%2058.189%20175.465%2061.0062%20179.402C62.3887%20176.01%2064.3269%20172.886%2067.0939%20170.021C70.3806%20173.329%2073.5018%20178.976%2078.4678%20180.057C71.1575%20174.553%2072.6058%20163.054%2074.1143%20155.057Z'%20fill='black'/%3e%3cpath%20d='M104.362%20132.477C104.972%20131.985%20104.544%20131.1%20104.671%20130.478L103.023%20130.507L103.039%20131.469C102.644%20132.439%20103.744%20132.556%20104.362%20132.477Z'%20fill='black'/%3e%3cpath%20d='M104.168%20141C103.136%20140.947%20103.458%20139.775%20103.173%20139.092C104.54%20138.726%20105.595%20140.15%20104.168%20141Z'%20fill='black'/%3e%3cpath%20d='M100.089%20171.093C97.7821%20172.714%2097.6989%20175.806%2097.9557%20178.757C98.5303%20180.19%2099.2488%20181.962%20101.305%20181.652C102.805%20181.077%20106.05%20181.913%20105.522%20179.243C103.688%20176.527%20100.691%20174.105%20100.089%20171.093Z'%20fill='white'/%3e%3cpath%20d='M101.248%20143.042C101.99%20142.203%20101.199%20140.226%20100.859%20140.439L99.2336%20141.772C99.5216%20142.454%20100.226%20143.54%20101.248%20143.042Z'%20fill='black'/%3e%3cpath%20d='M97.2419%20137.822L96.2111%20137.84C95.5981%20138.125%2096.0204%20138.737%2095.8929%20139.219C96.1084%20139.834%2095.925%20141.143%2096.951%20140.85C97.3869%20140.12%2097.942%20139.827%2098.4912%20139.689C97.9668%20139.135%2096.9982%20138.735%2097.2419%20137.822Z'%20fill='black'/%3e%3cpath%20d='M98.5807%20139.791C98.571%20139.753%2098.5637%20139.713%2098.5559%20139.674C98.534%20139.679%2098.5126%20139.684%2098.4912%20139.689C98.5223%20139.723%2098.553%20139.756%2098.5807%20139.791Z'%20fill='black'/%3e%3cpath%20d='M98.5559%20139.674C98.3219%20138.574%2098.7982%20136.912%20100.528%20137.147C101.206%20139.943%2099.9146%20139.363%2098.5559%20139.674Z'%20fill='black'/%3e%3cpath%20d='M97.4786%2096.3219C99.1705%2094.8498%20100.087%2092.2224%2098.6787%2090.3241C96.4326%2091.4625%2095.5146%2094.0204%2096.5182%2096.338L97.4786%2096.3219Z'%20fill='white'/%3e%3cpath%20d='M96.0818%20150.072C93.3342%20150.119%2089.9425%20148.667%2087.8394%20150.216C88.4733%20151.098%2088.1527%20152.408%2088.2408%20153.506C90.5316%20158.823%2093.8815%20165.705%20100.69%20166.136C99.7674%20160.518%2098.3678%20155.115%2096.0818%20150.072Z'%20fill='white'/%3e%3cpath%20d='M95.9324%20144.547L96.6197%20144.536C97.9269%20144.651%2098.3063%20142.79%2097.1972%20142.19C96.8669%20143.02%2095.2868%20143.048%2095.9324%20144.547Z'%20fill='black'/%3e%3cpath%20d='M95.3244%2087.0842C92.2689%2084.7253%2087.581%2083.7597%2083.6069%2084.6076C83.5072%2084.629%2083.4051%2084.646%2083.3058%2084.6699C85.4361%2087.3119%2086.3473%2091.7759%2089.253%2094.0375C89.7006%2094.3863%2090.1926%2094.6859%2090.7467%2094.915C89.87%2091.9071%2093.9156%2088.9644%2095.3244%2087.0842Z'%20fill='white'/%3e%3cpath%20d='M86.2793%20180.252C89.0863%20179.652%2091.3567%20182.511%2094.3612%20181.43L94.35%20180.744C90.8201%20179.223%2090.9607%20175.512%2088.2422%20173.292C85.9334%20174.844%2082.2211%20175.995%2079.2507%20175.085C79.7377%20175.419%2079.814%20175.9%2079.96%20176.378C79.9984%20176.69%2080.0576%20176.98%2080.1252%20177.259C80.5786%20179.124%2081.6513%20180.256%2082.9789%20180.647C83.9879%20180.945%2085.1405%20180.819%2086.2793%20180.252Z'%20fill='white'/%3e%3cpath%20d='M92.6053%20139.894L92.5771%20138.248L90.6482%20137.937L90.6662%20138.968C90.0664%20140.009%2092.131%20140.246%2092.6053%20139.894Z'%20fill='black'/%3e%3cpath%20d='M90.8457%20126.106C90.9853%20126.151%2091.1298%20126.198%2091.2738%20126.253C91.0228%20126.062%2090.7241%20125.885%2090.4181%20125.703C90.1505%20125.544%2089.8776%20125.382%2089.6266%20125.204C89.773%20125.759%2090.2585%20125.916%2090.8457%20126.106Z'%20fill='%23FFCB04'/%3e%3cpath%20d='M90.4181%20125.703C90.7241%20125.885%2091.0228%20126.062%2091.2738%20126.253C91.1298%20126.198%2090.9853%20126.151%2090.8457%20126.106C90.2585%20125.916%2089.773%20125.759%2089.6266%20125.204C89.8776%20125.382%2090.1505%20125.544%2090.4181%20125.703ZM89.2016%20124.343L89.1924%20124.765C89.1676%20125.972%2089.9951%20126.24%2090.7258%20126.476C91.2122%20126.634%2091.672%20126.782%2091.9483%20127.169L92.2966%20127.015C92.1341%20126.27%2091.3626%20125.812%2090.6168%20125.368C90.2271%20125.137%2089.8243%20124.897%2089.5164%20124.623L89.2016%20124.343Z'%20fill='%23FFD401'/%3e%3cpath%20d='M89.0361%20128.899L89.0444%20129.339C89.7999%20129.797%2090.5126%20129.857%2091.054%20129.857C91.2253%20129.857%2091.3912%20129.85%2091.5507%20129.842C90.7179%20129.287%2089.7469%20128.695%2089.0361%20128.899Z'%20fill='%23FFCB04'/%3e%3cpath%20d='M91.054%20129.857C90.5126%20129.857%2089.7999%20129.797%2089.0444%20129.339L89.0361%20128.899C89.7469%20128.695%2090.7179%20129.287%2091.5507%20129.842C91.3912%20129.85%2091.2253%20129.857%2091.054%20129.857ZM91.8413%20129.569C91.0668%20129.051%2090.1882%20128.464%2089.3665%20128.464C89.1535%20128.464%2088.9506%20128.504%2088.7633%20128.583L88.6417%20128.634L88.6582%20129.556L88.7458%20129.613C89.6195%20130.174%2090.4387%20130.246%2091.0541%20130.246C91.2847%20130.246%2091.5056%20130.235%2091.7162%20130.224C91.8709%20130.216%2092.0203%20130.208%2092.1623%20130.206L92.8055%20130.195L92.264%20129.847C92.1263%20129.759%2091.9853%20129.665%2091.8413%20129.569Z'%20fill='%23FFD401'/%3e%3cpath%20d='M90.2284%2058.7995L89.2501%2057.8548C86.5302%2059.4815%2083.3384%2061.5992%2083.7329%2064.5462C86.3876%2063.1262%2087.7892%2060.7658%2090.2284%2058.7995Z'%20fill='black'/%3e%3cpath%20d='M87.4797%20132.622L85.8038%20132.652L85.8082%20132.919C86.968%20133.149%2088.1764%20133.27%2089.3128%20133.27C89.5502%20133.27%2089.7808%20133.265%2090.0026%20133.254C89.8562%20133.224%2089.7083%20133.195%2089.5619%20133.166C88.694%20132.993%2087.8718%20132.83%2087.4797%20132.622Z'%20fill='%23FFCB04'/%3e%3cpath%20d='M89.3128%20133.27C88.1764%20133.27%2086.968%20133.149%2085.8082%20132.919L85.8038%20132.652L87.4797%20132.622C87.8718%20132.83%2088.694%20132.993%2089.5619%20133.166C89.7083%20133.195%2089.8562%20133.224%2090.0026%20133.254C89.7808%20133.265%2089.5502%20133.27%2089.3128%20133.27ZM87.6284%20132.26L87.5812%20132.232L85.4076%20132.27L85.4256%20133.238L85.5774%20133.269C86.8091%20133.525%2088.1002%20133.66%2089.3125%20133.66C90.0296%20133.66%2090.6883%20133.61%2091.2191%20133.517L91.2371%20133.138C90.7744%20133.01%2090.197%20132.895%2089.638%20132.784C88.8027%20132.618%2087.9392%20132.446%2087.6284%20132.26Z'%20fill='%23FFD401'/%3e%3cpath%20d='M87.6992%20121.65L87.7625%20121.654L87.8116%20121.693C88.012%20121.858%2088.1828%20121.942%2088.3195%20121.942C88.6376%20121.942%2088.8643%20121.416%2089.0833%20120.908C89.253%20120.513%2089.4287%20120.106%2089.6816%20119.827C88.7126%20119.117%2087.5844%20118.332%2086.5779%20118.332C86.4057%20118.332%2086.2398%20118.356%2086.0841%20118.402C85.551%20119%2085.3987%20119.676%2085.656%20120.311C85.9586%20121.06%2086.7798%20121.598%2087.6992%20121.65Z'%20fill='%23FFCB04'/%3e%3cpath%20d='M86.0841%20118.402C86.2398%20118.356%2086.4057%20118.332%2086.5779%20118.332C87.5844%20118.332%2088.7126%20119.117%2089.6816%20119.827C89.4287%20120.106%2089.253%20120.513%2089.0833%20120.908C88.8643%20121.416%2088.6376%20121.942%2088.3195%20121.942C88.1828%20121.942%2088.012%20121.858%2087.8116%20121.693L87.7625%20121.654L87.6992%20121.65C86.7798%20121.598%2085.9586%20121.06%2085.656%20120.311C85.3987%20119.676%2085.551%20119%2086.0841%20118.402ZM87.6143%20122.034C87.8701%20122.234%2088.1012%20122.331%2088.3196%20122.331C88.8937%20122.331%2089.1715%20121.686%2089.4405%20121.063C89.6297%20120.622%2089.8263%20120.168%2090.1016%20119.97L90.2836%20119.787L90.068%20119.628C89.0479%20118.877%2087.7792%20117.942%2086.5781%20117.942C86.346%20117.942%2086.1227%20117.978%2085.9135%20118.048L85.8323%20118.101C85.1736%20118.814%2084.9775%20119.673%2085.2947%20120.457C85.646%20121.325%2086.5727%20121.953%2087.6143%20122.034Z'%20fill='%23FFD401'/%3e%3cpath%20d='M88.4051%20143.267C89.5001%20143.041%2089.685%20141.801%2090.0143%20140.971C89.8548%20139.738%2088.553%20139.966%2087.6608%20139.982C86.9247%20141.093%2087.7079%20142.66%2088.4051%20143.267Z'%20fill='black'/%3e%3cpath%20d='M78.1878%20123.465L87.5466%20124.913L87.5359%20124.303L87.4192%20124.247C85.0393%20123.108%2082.5782%20121.929%2079.9581%20121.929C79.2979%20121.929%2078.6465%20122.007%2078.019%20122.16C78.036%20122.337%2078.0248%20122.529%2078.0141%20122.717C77.9825%20123.254%2078.0044%20123.448%2078.1878%20123.465Z'%20fill='%23FFCB04'/%3e%3cpath%20d='M78.0141%20122.717C78.0248%20122.529%2078.036%20122.337%2078.019%20122.16C78.6465%20122.007%2079.2979%20121.929%2079.9581%20121.929C82.5782%20121.929%2085.0393%20123.108%2087.4192%20124.247L87.5359%20124.303L87.5466%20124.913L78.1878%20123.465C78.0044%20123.448%2077.9825%20123.254%2078.0141%20122.717ZM77.6254%20122.695C77.5982%20123.16%2077.5612%20123.798%2078.1396%20123.852L87.9441%20125.368L87.9207%20124.056L87.587%20123.896C85.1682%20122.738%2082.6668%20121.54%2079.9581%20121.54C79.204%20121.54%2078.4602%20121.637%2077.747%20121.828L77.5588%20121.879L77.6094%20122.067C77.6522%20122.228%2077.6385%20122.465%2077.6254%20122.695Z'%20fill='%23FFD401'/%3e%3cpath%20d='M86.6479%20137.045L86.3108%20137.396C85.9693%20137.538%2086.0666%20139.116%2087.0317%20139.375C87.9804%20138.602%2087.4778%20137.374%2086.6479%20137.045Z'%20fill='black'/%3e%3cpath%20d='M86.4137%20128.616L86.8184%20128.197C86.599%20128.129%2086.3757%20128.058%2086.1485%20127.985C84.3481%20127.411%2082.3073%20126.76%2080.2242%20126.76C79.3379%20126.76%2078.5225%20126.875%2077.7373%20127.11L77.7782%20129.433L86.4137%20128.616Z'%20fill='%23FFCB04'/%3e%3cpath%20d='M80.2242%20126.76C82.3073%20126.76%2084.3481%20127.411%2086.1485%20127.985C86.3757%20128.058%2086.599%20128.129%2086.8184%20128.197L86.4137%20128.616L77.7782%20129.433L77.7373%20127.11C78.5225%20126.875%2079.3379%20126.76%2080.2242%20126.76ZM86.5931%20128.99L87.5388%20128.012L87.2353%20127.919C86.921%20127.823%2086.598%20127.72%2086.2667%20127.614C84.4395%20127.032%2082.3681%20126.371%2080.2242%20126.371C79.2454%20126.371%2078.3478%20126.505%2077.4809%20126.782L77.3433%20126.826L77.3963%20129.86L86.5931%20128.99Z'%20fill='%23FFD401'/%3e%3cpath%20d='M83.2084%20119.709C83.257%20119.144%2083.5241%20118.683%2083.7839%20118.234C83.8958%20118.041%2084.0106%20117.842%2084.1049%20117.639C83.6841%20116.676%2082.1406%20116.057%2080.7541%20115.92C80.5293%20116.332%2080.1689%20116.738%2079.8191%20117.132C79.0402%20118.009%2078.5489%20118.637%2078.8943%20119.205L83.2084%20119.709Z'%20fill='%23FFCB04'/%3e%3cpath%20d='M79.8191%20117.132C80.1689%20116.738%2080.5293%20116.332%2080.7541%20115.92C82.1406%20116.057%2083.6841%20116.676%2084.1049%20117.639C84.0106%20117.842%2083.8958%20118.041%2083.7839%20118.234C83.5241%20118.683%2083.257%20119.144%2083.2084%20119.709L78.8943%20119.205C78.5489%20118.637%2079.0402%20118.009%2079.8191%20117.132ZM78.6757%20119.572L83.5945%20120.145L83.5901%20119.922C83.5794%20119.363%2083.8421%20118.91%2084.1204%20118.429C84.2517%20118.204%2084.387%20117.969%2084.495%20117.72L84.5256%20117.649L84.4989%20117.575C84.0357%20116.333%2082.1827%20115.639%2080.6562%20115.521L80.5234%20115.511L80.4655%20115.631C80.2728%20116.035%2079.8943%20116.461%2079.528%20116.873C78.7657%20117.732%2077.9776%20118.619%2078.6256%20119.504L78.6757%20119.572Z'%20fill='%23FFD401'/%3e%3cpath%20d='M78.5341%20132.092C78.5565%20132.354%2078.5458%20132.626%2078.536%20132.89C78.5156%20133.415%2078.4962%20133.915%2078.7287%20134.287C79.418%20133.734%2080.4576%20133.734%2081.3829%20133.734H81.5503C82.3914%20133.734%2083.3449%20133.734%2083.7754%20133.241C84.0104%20132.973%2084.0989%20132.565%2084.0469%20131.995L78.5341%20132.092Z'%20fill='%23FFCB04'/%3e%3cpath%20d='M83.7754%20133.241C83.3449%20133.734%2082.3914%20133.734%2081.5503%20133.734H81.3829C80.4576%20133.734%2079.418%20133.734%2078.7287%20134.287C78.4962%20133.915%2078.5156%20133.415%2078.536%20132.89C78.5458%20132.626%2078.5565%20132.354%2078.5341%20132.092L84.0469%20131.995C84.0989%20132.565%2084.0104%20132.973%2083.7754%20133.241ZM84.3904%20131.6L78.0837%20131.71L78.1221%20131.934C78.1722%20132.224%2078.1596%20132.54%2078.1469%20132.874C78.1216%20133.529%2078.0958%20134.206%2078.5614%20134.706L78.7015%20134.855L78.844%20134.708C79.4093%20134.123%2080.4577%20134.123%2081.383%20134.123H81.5503C82.4741%20134.123%2083.521%20134.123%2084.0683%20133.498C84.404%20133.114%2084.5169%20132.55%2084.4132%20131.772L84.3904%20131.6Z'%20fill='%23FFD401'/%3e%3cpath%20d='M60.5929%20103.406C60.803%20103.438%2061.0088%20103.454%2061.2083%20103.454C63.3711%20103.454%2064.7342%20101.573%2066.1771%2099.5821C66.9156%2098.562%2067.6769%2097.5116%2068.576%2096.6773L67.4619%2096.6973C64.3961%2097.2203%2061.1635%20100.387%2060.5929%20103.406Z'%20fill='%23FFCB04'/%3e%3cpath%20d='M66.1771%2099.5821C64.7342%20101.573%2063.3711%20103.454%2061.2083%20103.454C61.0088%20103.454%2060.803%20103.438%2060.5929%20103.406C61.1635%20100.387%2064.3961%2097.2203%2067.4619%2096.6973L68.576%2096.6773C67.6769%2097.5116%2066.9156%2098.562%2066.1771%2099.5821ZM69.6681%2096.2694L67.4259%2096.3108C64.1223%2096.8722%2060.6663%20100.315%2060.1764%20103.535L60.1482%20103.72L60.3316%20103.755C60.6298%20103.814%2060.9251%20103.843%2061.2083%20103.843C63.5696%20103.843%2064.9892%20101.884%2066.4919%2099.81C67.3252%2098.66%2068.1873%2097.47%2069.2298%2096.6245L69.6681%2096.2694Z'%20fill='%23FFD401'/%3e%3cpath%20d='M59.8745%20110.132C59.6065%20110.132%2059.3316%20110.097%2059.0563%20110.028L58.8257%20109.97L60.3839%20106.713L59.787%20106.724C58.0911%20107.728%2056.332%20110.07%2056.3743%20111.96L63.366%20111.837L67.5925%20105.549C66.0635%20105.624%2064.8906%20106.763%2063.7552%20107.864C62.6061%20108.979%2061.4186%20110.132%2059.8745%20110.132Z'%20fill='%23FFCB04'/%3e%3cpath%20d='M63.366%20111.837L56.3743%20111.96C56.332%20110.07%2058.0911%20107.728%2059.787%20106.724L60.3839%20106.713L58.8257%20109.97L59.0563%20110.028C59.3316%20110.097%2059.6065%20110.132%2059.8745%20110.132C61.4186%20110.132%2062.6061%20108.979%2063.7552%20107.864C64.8906%20106.763%2066.0635%20105.624%2067.5925%20105.549L63.366%20111.837ZM63.4835%20107.585C62.3408%20108.695%2061.2603%20109.743%2059.8743%20109.743C59.7143%20109.743%2059.5508%20109.729%2059.3864%20109.7L61.0064%20106.313L59.6793%20106.336L59.6355%20106.362C57.7698%20107.441%2055.8166%20110.095%2055.9961%20112.174L56.0117%20112.355L63.5759%20112.223L68.3084%20105.182L67.9674%20105.162C66.0998%20105.05%2064.7639%20106.343%2063.4835%20107.585Z'%20fill='%23FFD401'/%3e%3cpath%20d='M56.8307%2050.2492C56.8512%2051.892%2056.8701%2053.4453%2057.9161%2054.535C58.3841%2054.3268%2058.5251%2053.833%2058.6871%2053.2673C58.8842%2052.5789%2059.1075%2051.7986%2060.0371%2051.5792L60.1524%2051.5524L60.2293%2051.6419C61.0174%2052.5619%2061.0213%2053.8082%2061.0251%2055.0142C61.0286%2055.9604%2061.0315%2056.8541%2061.39%2057.5697C61.8235%2058.5601%2062.5639%2059.1692%2063.3267%2059.1692C63.7767%2059.1692%2064.2218%2058.9527%2064.6163%2058.5416C64.6835%2057.6908%2064.8659%2056.7855%2065.0425%2055.9093C65.509%2053.5922%2065.9916%2051.1978%2064.5434%2049.2733C62.3844%2049.2655%2061.264%2047.7414%2060.1806%2046.2668C59.1128%2044.8152%2058.1048%2043.4438%2056.1662%2043.4438L55.9911%2043.4477L55.9595%2043.4375C54.9656%2043.1252%2054.3628%2042.3468%2053.78%2041.5937C53.1238%2040.7463%2052.503%2039.9446%2051.3739%2039.8896C50.4749%2041.0358%2050.8169%2043.0478%2051.2742%2044.5598C52.9229%2047.0982%2053.0425%2050.3284%2053.1578%2053.4531C53.295%2057.1562%2053.4371%2060.9852%2056.1657%2063.5835C57.9083%2065.4701%2059.8858%2065.7284%2061.7646%2065.7284C62.3362%2065.7284%2062.9117%2065.7041%2063.5208%2065.6773L63.9615%2065.6588C64.9286%2065.4136%2066.1784%2064.3195%2066.3628%2063.15C66.4708%2062.4627%2066.1881%2061.8896%2065.5221%2061.444C65.1174%2061.6196%2064.7097%2061.7052%2064.2802%2061.7052C63.4429%2061.7052%2062.6612%2061.3734%2061.9057%2061.0528C61.1448%2060.7303%2060.4263%2060.4253%2059.6533%2060.4253C59.1084%2060.4253%2058.5923%2060.581%2058.0751%2060.9011L57.9847%2060.9575L57.8893%2060.9118C53.3563%2058.7659%2053.7611%2055.4861%2054.1901%2052.0136C54.4499%2049.9106%2054.7185%2047.7355%2053.8861%2045.6952L53.8408%2045.5838L54.6392%2044.6658L54.7817%2044.7631C56.7801%2046.1224%2056.8059%2048.2201%2056.8307%2050.2492Z'%20fill='%23FFCB04'/%3e%3cpath%20d='M53.8408%2045.5838L53.8861%2045.6952C54.7185%2047.7355%2054.4499%2049.9106%2054.1901%2052.0136C53.7611%2055.4861%2053.3563%2058.7659%2057.8893%2060.9118L57.9847%2060.9575L58.0751%2060.9011C58.5923%2060.581%2059.1084%2060.4253%2059.6533%2060.4253C60.4263%2060.4253%2061.1448%2060.7303%2061.9057%2061.0528C62.6612%2061.3734%2063.4429%2061.7052%2064.2802%2061.7052C64.7097%2061.7052%2065.1174%2061.6196%2065.5221%2061.444C66.1881%2061.8896%2066.4708%2062.4627%2066.3628%2063.15C66.1784%2064.3195%2064.9286%2065.4136%2063.9615%2065.6588L63.5208%2065.6773C62.9117%2065.7041%2062.3362%2065.7284%2061.7646%2065.7284C59.8858%2065.7284%2057.9083%2065.4701%2056.1657%2063.5835C53.4371%2060.9852%2053.295%2057.1562%2053.1578%2053.4531C53.0425%2050.3284%2052.9229%2047.0982%2051.2742%2044.5598C50.8169%2043.0478%2050.4749%2041.0358%2051.3739%2039.8896C52.503%2039.9446%2053.1238%2040.7463%2053.78%2041.5937C54.3628%2042.3468%2054.9656%2043.1252%2055.9595%2043.4375L55.9911%2043.4477L56.1662%2043.4438C58.1048%2043.4438%2059.1128%2044.8152%2060.1806%2046.2668C61.264%2047.7414%2062.3844%2049.2655%2064.5434%2049.2733C65.9916%2051.1978%2065.509%2053.5922%2065.0425%2055.9093C64.8659%2056.7855%2064.6835%2057.6908%2064.6163%2058.5416C64.2218%2058.9527%2063.7767%2059.1692%2063.3267%2059.1692C62.5639%2059.1692%2061.8235%2058.5601%2061.39%2057.5697C61.0315%2056.8541%2061.0286%2055.9604%2061.0251%2055.0142C61.0213%2053.8082%2061.0174%2052.5619%2060.2293%2051.6419L60.1524%2051.5524L60.0371%2051.5792C59.1075%2051.7986%2058.8842%2052.5789%2058.6871%2053.2673C58.5251%2053.833%2058.3841%2054.3268%2057.9161%2054.535C56.8701%2053.4453%2056.8512%2051.892%2056.8307%2050.2492C56.8059%2048.2201%2056.7801%2046.1224%2054.7817%2044.7631L54.6392%2044.6658L53.8408%2045.5838ZM56.4415%2050.2537C56.4624%2051.9462%2056.4838%2053.696%2057.7326%2054.901L57.8158%2054.9818L57.9262%2054.9463C58.6808%2054.706%2058.8831%2053.9986%2059.0612%2053.3745C59.2422%2052.742%2059.3998%2052.1909%2060.0113%2051.9909C60.6291%2052.7927%2060.6325%2053.8736%2060.6359%2055.0154C60.6388%2055.9655%2060.6422%2056.9472%2061.0382%2057.7348C61.5296%2058.86%2062.4067%2059.5581%2063.3266%2059.5581C63.9065%2059.5581%2064.4669%2059.2808%2064.949%2058.7564L64.9943%2058.7063L64.9996%2058.6387C65.0595%2057.7922%2065.2365%2056.9151%2065.4238%2055.9859C65.9142%2053.5525%2066.4211%2051.0365%2064.7919%2048.9577L64.7326%2048.8819L64.5613%2048.8843C62.5877%2048.8843%2061.5704%2047.5008%2060.4939%2046.0365C59.3964%2044.5435%2058.242%2043.0057%2056.0455%2043.0558C55.1854%2042.7732%2054.6274%2042.0527%2054.0874%2041.3551C53.3864%2040.4502%2052.6621%2039.5147%2051.2868%2039.4977L51.1958%2039.4967L51.1365%2039.5658C50.0443%2040.8384%2050.4106%2043.0597%2050.9098%2044.6991L50.9331%2044.7492C52.537%2047.2011%2052.6548%2050.387%2052.7691%2053.4679C52.9097%2057.2483%2053.0542%2061.1576%2055.8884%2063.8566C57.7239%2065.8439%2059.7977%2066.1178%2061.7645%2066.1178C62.3444%2066.1178%2062.9243%2066.0929%2063.5378%2066.0662L64.0169%2066.0414C65.1645%2065.7563%2066.5354%2064.5503%2066.747%2063.2106C66.8429%2062.602%2066.7291%2061.7351%2065.6408%2061.0574L65.5513%2061.0015L65.4555%2061.0467C65.0716%2061.2277%2064.6868%2061.3162%2064.2801%2061.3162C63.5222%2061.3162%2062.8105%2061.0136%2062.0574%2060.6945C61.2941%2060.371%2060.5055%2060.0363%2059.6532%2060.0363C59.0665%2060.0363%2058.5124%2060.1929%2057.9618%2060.515C53.7824%2058.4903%2054.1507%2055.5091%2054.5764%2052.061C54.8376%2049.9458%2055.1076%2047.76%2054.2908%2045.6594L54.7038%2045.1846C56.3953%2046.4349%2056.4186%2048.3754%2056.4415%2050.2537Z'%20fill='%23FFD401'/%3e%3cpath%20d='M61.5088%20158.764L63.7563%20159.313C63.7262%20157.067%2064.4481%20155.114%2065.1472%20153.224C65.3549%20152.661%2065.5685%20152.085%2065.7606%20151.502C63.2285%20153.603%2061.1138%20155.783%2061.5088%20158.764Z'%20fill='%23FFCB04'/%3e%3cpath%20d='M65.1472%20153.224C64.4481%20155.114%2063.7262%20157.067%2063.7563%20159.313L61.5088%20158.764C61.1138%20155.783%2063.2285%20153.603%2065.7606%20151.502C65.5685%20152.085%2065.3549%20152.661%2065.1472%20153.224ZM61.1426%20158.952L61.1625%20159.08L64.1617%20159.813L64.1515%20159.555C64.0634%20157.278%2064.7994%20155.285%2065.5121%20153.359C65.7957%20152.591%2066.0896%20151.797%2066.3294%20150.993L66.5089%20150.389L66.02%20150.786C63.717%20152.657%2060.5627%20155.218%2061.1426%20158.952Z'%20fill='%23FFD401'/%3e%3cpath%20d='M49.2875%20136.025C49.7078%20136.548%2049.3337%20137.098%2049.0549%20137.507C48.7757%20137.918%2048.6458%20138.152%2048.7504%20138.362L53.3311%20132.691L52.9258%20132.3L53.1472%20132.17C53.9504%20131.7%2054.0535%20131.269%2054.198%20130.568C52.3688%20132.114%2050.5314%20133.752%2049.2875%20136.025Z'%20fill='%23FFCB04'/%3e%3cpath%20d='M53.1472%20132.17L52.9258%20132.3L53.3311%20132.691L48.7504%20138.362C48.6458%20138.152%2048.7757%20137.918%2049.0549%20137.507C49.3337%20137.098%2049.7078%20136.548%2049.2875%20136.025C50.5314%20133.752%2052.3688%20132.114%2054.198%20130.568C54.0535%20131.269%2053.9504%20131.7%2053.1472%20132.17ZM48.8785%20135.963L48.8094%20136.092L48.915%20136.194C49.2229%20136.491%2049.0959%20136.756%2048.7335%20137.288C48.4426%20137.715%2048.0451%20138.299%2048.6231%20138.814L48.7749%20138.95L53.8571%20132.658L53.5589%20132.37C54.3329%20131.844%2054.4467%20131.29%2054.5878%20130.603C54.6204%20130.445%2054.6549%20130.277%2054.6997%20130.096L54.8446%20129.514L54.3854%20129.901C52.3553%20131.61%2050.2562%20133.377%2048.8785%20135.963Z'%20fill='%23FFD401'/%3e%3c/svg%3e";
//#endregion
//#region src/assets/logos/jokerit.svg
var jokerit_default = "data:image/svg+xml,%3csvg%20width='256'%20height='236'%20viewBox='0%200%20256%20236'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M178.334%20129.576C175.977%20145.042%20170.281%20155.903%20161.645%20164.572C167.812%20170.02%20176.548%20172.942%20194.722%20176.577L195.12%20176.66L195.515%20176.774C206.774%20180.494%20215.442%20189.986%20219.85%20199.501L224.327%20209.135H213.711C207.96%20209.135%20198.706%20208.591%20189.773%20206.308C190.69%20210.563%20191.204%20215.432%20191.204%20221.238V228.932L183.582%20227.967C172.716%20226.595%20162.076%20220.746%20154.031%20210.993C150.124%20219.103%20144.26%20228.242%20137.152%20233.236L133.264%20235.964L129.364%20233.236C122.26%20228.242%20116.401%20219.103%20112.479%20210.993C104.453%20220.746%2093.8049%20226.595%2082.935%20227.967L75.3063%20228.932V221.238C75.3063%20215.432%2075.826%20210.563%2076.7459%20206.308C67.8158%20208.591%2058.5635%20209.135%2052.8061%20209.135H42.1953L46.6601%20199.501C51.0732%20189.986%2059.737%20180.494%2071.0043%20176.774L71.3945%20176.66L71.798%20176.577C89.9804%20172.942%2098.7147%20170.02%20104.887%20164.552C97.1281%20156.775%2091.7372%20147.207%2089.0087%20134.148C83.6751%20140.336%2075.545%20147.906%2064.8337%20151.401C54.3611%20154.83%2039.6182%20161.149%2030.8847%20166.52L28.9457%20167.725C32.9807%20170.973%2035.5514%20175.962%2035.5514%20181.552C35.5514%20191.363%2027.5888%20199.326%2017.7833%20199.326C7.96791%20199.326%200%20191.363%200%20181.552C0%20171.734%207.96791%20163.779%2017.7833%20163.779C19.0308%20163.779%2020.2528%20163.909%2021.4438%20164.144C15.4565%20155.626%2012.1967%20140.498%2012.1967%20127.751C12.1967%2091.8226%2037.6209%2064.0733%2067.2301%2064.0733C71.9735%2064.0733%2081.7086%2065.4335%2090.3935%2067.3869C88.7012%2061.2488%2087.4766%2054.4315%2087.4766%2047.898C87.4766%2025.24%20101.07%200%20141.863%200C177.157%200%20208.462%2022.7724%20217.551%2034.7031L219.923%2037.8244C223.184%2033.8511%20228.144%2031.3102%20233.681%2031.3102C243.495%2031.3102%20251.454%2039.2729%20251.454%2049.0899C251.454%2058.9062%20243.495%2066.8583%20233.681%2066.8583C223.856%2066.8583%20215.901%2058.9062%20215.901%2049.0899C215.901%2047.8962%20216.029%2046.7236%20216.249%2045.5906H212.161C198.675%2045.5906%20185.249%2046.2901%20177.786%2051.5303C174.794%2053.636%20172.255%2057.3099%20170.51%2061.6743C179.098%2058.9062%20189.767%2057.1592%20200.023%2059.4542C237.277%2067.8282%20246.198%2098.4663%20246.198%20116.516C246.198%20133.101%20242.222%20147.685%20238.679%20154.189L238.406%20154.683C248.136%20154.785%20256%20162.706%20256%20172.471C256%20182.285%20248.034%20190.247%20238.226%20190.247C228.402%20190.247%20220.445%20182.285%20220.445%20172.471C220.445%20165.998%20223.902%20160.334%20229.072%20157.231C210.472%20153.987%20188.643%20143.526%20178.334%20129.576Z'%20fill='%231A1A18'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M133.264%2098.7078C137.095%2096.5467%20143.542%2093.9222%20151.31%2093.0816C164.221%2094.1511%20176.17%20105.755%20179.877%20118.063C184.494%20133.415%20210.247%20147.835%20232.72%20150.947C235.595%20145.684%20239.418%20132.299%20239.418%20116.516C239.418%20100.254%20231.53%2073.4888%20198.526%2066.0689C184.535%2062.9262%20168.883%2068.6943%20161.231%2073.0051C161.669%2062.9589%20166.093%2051.4722%20173.905%2045.9818C183.427%2039.2852%20199.253%2038.806%20212.161%2038.806C204.153%2028.2937%20174.731%206.76964%20141.863%206.76964C105.248%206.76964%2094.256%2028.5325%2094.256%2047.8981C94.256%2058.4191%2097.8857%2070.1216%20101.22%2077.7811C94.5238%2074.4297%2074.3627%2070.8475%2067.2301%2070.8475C42.1362%2070.8475%2018.9673%2094.7634%2018.9673%20127.751C18.9673%20140.19%2022.317%20154.06%2027.3492%20160.751C36.6713%20155.014%2051.926%20148.493%2062.7272%20144.967C73.6923%20141.377%2081.8566%20132.545%2086.6378%20126.327C86.2767%20114.48%2092.7353%2095.7175%20114.494%2092.8499C122.026%2093.7978%20129.916%2096.6752%20133.264%2098.7078Z'%20fill='%23FFE500'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M227.223%20172.471C227.223%20166.398%20232.157%20161.469%20238.226%20161.469C244.303%20161.469%20249.216%20166.398%20249.216%20172.471C249.216%20178.54%20244.303%20183.461%20238.226%20183.461C232.157%20183.461%20227.223%20178.54%20227.223%20172.471Z'%20fill='%23FEE50D'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M6.77582%20181.552C6.77582%20175.473%2011.6937%20170.552%2017.7833%20170.552C23.8473%20170.552%2028.7721%20175.473%2028.7721%20181.552C28.7721%20187.625%2023.8473%20192.556%2017.7833%20192.556C11.6937%20192.556%206.77582%20187.625%206.77582%20181.552Z'%20fill='%23FEE50D'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M133.264%20108.39C135.41%20106.353%20143.542%20102.046%20151.19%20101.332C161.347%20103.129%20170.912%20110.78%20172.234%20123.81C169.842%20147.723%20160.156%20159.795%20143.542%20170.081C142.031%20170.904%20137.448%20171.507%20133.264%20171.507C129.075%20171.507%20124.648%20170.953%20122.985%20170.081C106.367%20159.795%2096.6708%20147.723%2094.2841%20123.81C95.6048%20110.78%20105.165%20103.129%20115.324%20101.332C122.985%20102.046%20131.105%20106.353%20133.264%20108.39Z'%20fill='white'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M138.538%20114.074C140.338%20111.974%20147.129%20109.705%20153.701%20109.225C157.282%20109.396%20162.237%20112.026%20163.138%20114.356C163.138%20116.095%20161.769%20118.548%20160.505%20118.784C159.194%20118.486%20155.851%20117.001%20152.326%20117.001C148.801%20116.995%20142.958%20118.784%20141.051%20119.619C139.61%20118.725%20138.538%20116.462%20138.538%20114.074Z'%20fill='%231A1A18'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M143.033%20122.556C143.681%20121.714%20146.028%20119.992%20149.072%20119.992C153.194%20120.397%20157.136%20122.076%20157.854%20124.117C157.854%20125.548%20156.629%20127.863%20155.262%20128.355C154.478%20127.512%20148.763%20126.079%20145.205%20126.734C144.26%20126.079%20143.033%20124.463%20143.033%20122.556Z'%20fill='%231A1A18'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M110.465%20125.001C110.465%20121.97%20112.921%20119.504%20115.956%20119.504C119%20119.504%20121.472%20121.97%20121.472%20125.001C121.472%20128.034%20119%20130.502%20115.956%20130.502C112.921%20130.502%20110.465%20128.034%20110.465%20125.001Z'%20fill='%231A1A18'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M125.102%20127.751C125.102%20130.081%20124.973%20131.758%20124.831%20132.179C119.773%20133.376%20117.066%20136.902%20117.066%20141.5C118.442%20144.374%20121.831%20147.057%20126.262%20147.057C128.243%20148.917%20131.649%20150.039%20133.264%20150.228C134.869%20150.039%20138.278%20148.917%20140.247%20147.057C144.667%20147.057%20148.087%20144.374%20149.463%20141.5C149.221%20137.262%20146.774%20134.508%20143.3%20133.193C140.551%20133.303%20138.041%20134.875%20138.041%20135.575C138.815%20135.763%20140.728%20137.02%20141.235%20138.581C140.99%20140.065%20139.499%20141.558%20136.806%20141.8C136.331%20142.762%20134.213%20143.782%20133.264%20144.003C132.305%20143.782%20130.19%20142.762%20129.731%20141.8C127.022%20141.558%20125.533%20140.065%20125.289%20138.581C126.549%20136.248%20130.297%20135.042%20131.07%20134.875C131.07%20119.803%20130.147%20114.845%20129.31%20113.171C126.924%20110.42%20119.634%20108.034%20112.829%20107.786C109.234%20107.965%20104.267%20110.71%20103.372%20113.048C103.372%20114.788%20104.75%20117.239%20105.998%20117.473C107.323%20117.172%20110.667%20115.554%20114.185%20115.554C117.722%20115.554%20121.664%20116.102%20123.921%20117.239C124.558%20118.182%20125.102%20120.994%20125.102%20127.751Z'%20fill='%231A1A18'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M133.264%20152.22C137.737%20152.694%20143.184%20154.246%20147.355%20154.491C149.872%20153.77%20150.387%20152.741%20151.215%20151.542C152.715%20150.29%20156.353%20152.377%20155.73%20154.437C154.603%20157.18%20151.252%20159.976%20147.489%20160.876C143.246%20160.693%20137.264%20159.524%20133.264%20159.398C129.257%20159.524%20123.279%20160.693%20119.034%20160.876C114.075%20159.913%20111.452%20156.415%20110.667%20153.057C110.566%20150.166%20113.912%20149.273%20115.238%20150.644C115.839%20152.315%20116.236%20153.953%20119.153%20154.491C123.344%20154.246%20128.773%20152.694%20133.264%20152.22Z'%20fill='%231A1A18'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M133.264%20179.04C130.034%20179.04%20125.128%20178.313%20120.823%20177.243C117.235%20175.691%20113.171%20172.349%20109.946%20169.116C102.18%20176.284%2091.6588%20179.523%2073.125%20183.232C64.0434%20186.214%2056.635%20194.105%2052.8061%20202.352C62.6083%20202.352%2080.0629%20200.678%2089.265%20193.384C85.0872%20200.194%2082.0892%20207.733%2082.0892%20221.238C94.4058%20219.686%20106.958%20211.082%20114.014%20195.892C115.324%20202.231%20123.215%20220.645%20133.264%20227.69C143.3%20220.645%20151.19%20202.231%20152.508%20195.892C159.564%20211.082%20172.107%20219.686%20184.434%20221.238C184.434%20207.733%20181.437%20200.194%20177.253%20193.384C186.458%20200.678%20203.902%20202.352%20213.711%20202.352C209.89%20194.105%20202.481%20186.214%20193.383%20183.232C174.86%20179.523%20164.341%20176.284%20156.578%20169.116C153.35%20172.349%20149.279%20175.691%20145.697%20177.243C141.398%20178.313%20136.479%20179.04%20133.264%20179.04Z'%20fill='%23FEE50D'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M213.711%20202.352C209.89%20194.105%20202.481%20186.214%20193.383%20183.232C174.86%20179.523%20164.341%20176.284%20156.578%20169.116C156.062%20169.62%20155.546%20170.143%20155%20170.647C173.068%20187.058%20196.63%20191.713%20213.711%20202.352Z'%20fill='%23D50C28'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M177.253%20193.384C171.875%20188.367%20155.355%20175.432%20153.11%20172.328C152.023%20173.248%20150.904%20174.119%20149.786%20174.898C159.201%20188.237%20174.149%20199.718%20184.434%20221.238C184.434%20207.733%20181.437%20200.194%20177.253%20193.384Z'%20fill='%23D50C28'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M133.264%20227.69C143.3%20220.645%20151.19%20202.231%20152.508%20195.892C151.544%20189.795%20146.774%20184.07%20145.697%20177.243C141.398%20178.313%20136.479%20179.04%20133.264%20179.04V227.69Z'%20fill='%23D50C28'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M52.8061%20202.352C62.6083%20202.352%2080.0629%20200.678%2089.265%20193.384C94.6454%20188.367%20111.159%20175.432%20113.426%20172.328C112.772%20171.778%20112.134%20171.218%20111.535%20170.647C93.4438%20187.058%2069.8951%20191.713%2052.8061%20202.352Z'%20fill='%23D50C28'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M114.014%20195.892C114.962%20189.795%20119.742%20184.07%20120.823%20177.243C119.498%20176.681%20118.114%20175.86%20116.736%20174.898C107.323%20188.237%2092.3565%20199.718%2082.0892%20221.238C94.4058%20219.686%20106.958%20211.082%20114.014%20195.892Z'%20fill='%23D50C28'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M133.264%2098.7078C129.916%2096.6752%20122.026%2093.7978%20114.494%2092.8499C112.225%2089.2518%20104.811%2080.8884%20101.22%2077.7811C97.8857%2070.1216%2094.256%2058.4191%2094.256%2047.8981C94.256%2028.5325%20105.248%206.76964%20141.863%206.76964C174.654%206.76964%20204.03%2028.21%20212.111%2038.7416C202.993%2034.8537%20186.101%2029.01%20169.808%2029.01C144.106%2029.01%20132.645%2046.8196%20132.645%2075.0772C132.645%2087.3453%20133.264%2098.7078%20133.264%2098.7078Z'%20fill='%23D50C28'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M161.231%2073.0051C168.883%2068.6943%20184.535%2062.9262%20198.526%2066.0689C231.53%2073.4888%20239.418%20100.254%20239.418%20116.516C239.418%20132.299%20235.595%20145.684%20232.72%20150.947C223.157%20120.583%20205.793%2092.1151%20186.548%2092.1151C179.834%2092.1151%20172.254%2094.9078%20167.225%2099.8178C162.511%2096.0814%20157.02%2093.5627%20151.31%2093.0816C153.574%2086.1507%20157.888%2077.0701%20161.231%2073.0051Z'%20fill='%23D50C28'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M94.7846%20102.896C88.5717%20110.012%2086.4247%20119.369%2086.6378%20126.327C81.8566%20132.545%2073.6923%20141.377%2062.7272%20144.967C51.926%20148.493%2036.6713%20155.014%2027.3492%20160.751C36.2819%20120.583%2050.6203%2095.9009%2070.8281%2095.9009C81.0152%2095.9009%2091.0905%20100.079%2094.7846%20102.896Z'%20fill='%23D50C28'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M222.6%2048.7915C222.6%2042.7291%20227.515%2037.7981%20233.594%2037.7981C239.664%2037.7981%20244.6%2042.7291%20244.6%2048.7915C244.6%2054.8748%20239.664%2059.7917%20233.594%2059.7917C227.515%2059.7917%20222.6%2054.8748%20222.6%2048.7915Z'%20fill='%23FEE50D'/%3e%3c/svg%3e";
//#endregion
//#region src/assets/logos/jukurit.svg
var jukurit_default = "data:image/svg+xml,%3csvg%20width='219'%20height='256'%20viewBox='0%200%20219%20256'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M98.378%20256C96.0609%20256%2093.867%20254.917%2092.4614%20253.053C91.811%20252.194%2091.3662%20251.215%2091.1396%20250.193H91.0797C88.8767%20250.193%2086.7658%20249.211%2085.3462%20247.481L76.7212%20236.962C75.7196%20235.964%2071.9963%20232.249%2068.2018%20228.469C67.0637%20229.183%2065.7179%20229.593%2064.275%20229.593C64.2595%20229.59%2064.2405%20229.593%2064.2194%20229.593C63.0461%20229.593%2061.8629%20229.315%2060.7734%20228.744C60.2546%20228.471%2057.4956%20226.987%2054.1706%20224.571C52.8325%20225.884%2050.9997%20226.692%2048.9783%20226.692C48.9515%20226.687%2048.9438%20226.692%2048.9269%20226.692C48.5933%20226.692%2048.2582%20226.668%2047.9232%20226.623C45.1543%20226.246%2035.3806%20223.493%2025.8237%20203.943C21.7238%20195.558%2020.9524%20190.082%2021.0573%20184.439C21.1635%20178.341%2022.5572%20173.939%2022.7148%20173.457C22.7254%20173.426%2022.7359%20173.393%2022.7465%20173.362C22.7289%20173.075%2022.7289%20172.781%2022.7465%20172.488L22.9907%20168.3C22.8894%20168.073%2022.7993%20167.841%2022.7212%20167.604C22.5888%20167.211%2022.1785%20166.154%2021.8012%20165.508C21.3796%20164.785%2020.6371%20163.15%2019.7629%20161.103C17.5197%20161.756%2015.0295%20161.328%2013.0932%20159.796C11.594%20158.61%2010.6649%20156.946%2010.3756%20155.171C7.3533%20155.15%204.62378%20153.287%203.51803%20150.437C2.35316%20147.431%203.26323%20144.016%205.77034%20141.988C7.50041%20140.581%209.79566%20138.257%2010.4446%20137.054C11.834%20134.48%2013.0496%20129.777%2013.0496%20128.298C13.0496%20125.128%2013.6675%20114.766%2020.8954%20103.514C18.7726%2099.4589%2016.1099%2092.7793%2015.3223%2083.7961C14.0976%2069.7832%2015.0203%2046.276%2015.4764%2039.7513C15.9938%2032.3137%2015.2991%2027.8464%2014.8394%2026.6541L14.4622%2026.1522C13.1784%2024.432%2012.8722%2024.0231%2010.7902%2023.4143C10.1054%2023.213%209.50919%2023.1102%209.00172%2023.0159C1.60637%2021.6349%200.0248212%2016.9402%200.000186461%2013.2443C-0.0357099%207.46502%205.11435%202.89985%2012.8138%201.88279C13.9188%201.73639%2015.701%201.56113%2017.911%201.56113C22.4115%201.56113%2029.0445%202.29173%2035.0808%205.76734C41.5463%209.48719%2049.176%2016.078%2056.734%2036.7508L56.8579%2037.0872C57.7933%2035.9238%2058.7583%2034.7814%2059.731%2033.7172C62.5541%2030.6336%2067.1348%2026.3725%2071.6929%2022.5907C81.1533%2014.7393%2095.1607%205.27322%20108.173%204.76364C108.27%204.75941%20108.375%204.75801%20108.471%204.75801C110.659%204.75801%20122.526%205.59279%20141.396%2022.0952C149.89%2029.5223%20155.518%2035.2122%20159.447%2039.8442C160.148%2037.8009%20160.731%2036.0969%20161.02%2035.234C163.755%2027.0412%20168.616%2015.8247%20176.241%208.91989C182.601%203.16733%20190.96%200%20199.777%200C202.403%200%20205.017%200.278009%20207.54%200.823492C214.288%202.14251%20218.596%206.88576%20218.12%2012.5961C217.553%2019.3636%20211.078%2021.1408%20208.312%2021.8989C207.512%2022.1192%20206.171%2022.488%20205.771%2022.7428L205.134%2023.3023C203.64%2024.5784%20201.949%2026.0234%20202.645%2038.1311C203.556%2053.8924%20203.981%2074.0415%20203.171%2078.9128C203.109%2079.288%20203.066%2079.8482%20203.002%2080.5521C202.46%2086.4053%20201.134%20100.743%20191.49%20109.692C193.004%20112.225%20194.736%20115.647%20195.579%20119.178C196.716%20123.918%20197.889%20128.815%20201.058%20133.651C202.149%20134.942%20202.806%20136.61%20202.806%20138.433C202.806%20141.941%20200.369%20144.881%20197.096%20145.651C197.33%20148.977%20197.218%20152.718%20196.517%20156.794C194.544%20168.293%20190.218%20174.555%20187.518%20177.479L187.442%20177.734C187.279%20178.277%20187.057%20178.795%20186.781%20179.277C186.96%20180.22%20186.96%20181.203%20186.756%20182.18L185.701%20187.248C185.619%20187.638%20185.508%20188.02%20185.367%20188.387C186.042%20189.94%20186.465%20191.801%20186.478%20194.029C186.501%20200.84%20183.975%20207.502%20178.53%20215.008C172.68%20223.075%20165.651%20226.44%20160.181%20228.469C157.487%20229.473%20154.44%20228.82%20152.388%20226.791C151.312%20225.728%20150.611%20224.389%20150.328%20222.968L143.106%20236.249C141.735%20238.77%20139.032%20240.266%20136.175%20240.111C136.159%20240.108%20136.144%20240.108%20136.129%20240.108L129.218%20249.716C127.538%20252.049%20124.676%20253.204%20121.833%20252.676C119.957%20252.324%20118.328%20251.274%20117.232%20249.793C112.676%20252.852%20106.529%20255.566%2098.7834%20255.989C98.6482%20255.998%2098.5131%20256%2098.378%20256Z'%20fill='white'/%3e%3cpath%20d='M210.729%2011.9775C210.974%209.05093%20205.972%208.07258%20205.972%208.07258C198.656%206.48892%20188.902%207.46798%20181.219%2014.4143C173.541%2021.3662%20169.151%2034.291%20168.052%2037.5794C166.954%2040.8727%20161.59%2056.3567%20161.59%2056.3567C158.664%2050.5063%20154.397%2043.3122%20136.514%2027.6755C118.636%2012.0437%20108.464%2012.1739%20108.464%2012.1739C97.5419%2012.6018%2084.5228%2021.5802%2076.4292%2028.2977C71.7022%2032.221%2067.5452%2036.1618%2065.2064%2038.7189C59.8663%2044.5665%2054.543%2053.2647%2054.543%2053.2647C53.0833%2047.8626%2051.2427%2043.3432%2049.7681%2039.2975C43.0203%2020.8383%2036.6096%2015.2026%2031.3808%2012.1943C25.0088%208.52587%2017.2573%208.77572%2013.7852%209.23463C10.3131%209.69354%207.40411%2011.3328%207.41607%2013.1959C7.43367%2015.9163%209.34181%2015.261%2012.8709%2016.2964C17.8232%2017.7435%2019.1408%2020.0788%2020.9244%2022.4065C23.0359%2025.167%2023.3597%2033.2887%2022.874%2040.2688C22.3863%2047.2538%2021.574%2070.1528%2022.71%2083.1459C23.8482%2096.1369%2029.5303%20103.446%2029.5303%20103.446L29.6401%20103.999C21.2432%20114.726%2020.4655%20125.323%2020.4655%20128.298C20.4655%20131.27%2018.7839%20137.212%2016.9743%20140.569C15.1654%20143.93%2010.4328%20147.753%2010.4328%20147.753C19.1232%20147.236%2021.3255%20142.823%2021.3255%20142.823C22.7544%20145.028%2017.6958%20153.981%2017.6958%20153.981L22.8846%20149.183C22.8846%20149.183%2027.2956%20160.208%2028.2022%20161.764C29.1137%20163.321%2029.7598%20165.269%2029.7598%20165.269C29.7668%20165.265%2029.7739%20165.262%2029.7809%20165.258C30.0892%20166.198%2030.3538%20167.9%2030.439%20168.502C30.4249%20168.506%2030.4073%20168.511%2030.4073%20168.511L30.1497%20172.922C30.1631%20172.92%2030.1751%20172.919%2030.1884%20172.918C30.1145%20173.874%2029.9006%20175.02%2029.7612%20175.682V175.774H29.7598C29.7598%20175.774%2028.5618%20179.414%2028.471%20184.576C28.3971%20188.594%2028.7399%20193.025%2032.4858%20200.685C41.0474%20218.201%2048.9256%20219.276%2048.9256%20219.276C45.5295%20212.176%2046.1271%20199.681%2046.1271%20199.681C46.3284%20201.781%2046.4277%20205.977%2051.3271%20211.978C56.2245%20217.976%2064.2224%20222.177%2064.2224%20222.177L60.5258%20213.977L64.0577%20213.887C65.3844%20215.18%2082.2205%20231.974%2082.2205%20231.974L91.0806%20242.778C94.6357%20234.719%2098.1916%20233.534%2099.2565%20233.888C102.65%20235.02%2099.0869%20246.53%2098.3795%20248.582C113.324%20247.769%20120.829%20236.259%20120.829%20236.259L123.197%20245.385L135.048%20228.912L136.59%20232.703L146.901%20213.745C149.273%20214.453%20155.554%20214.216%20155.554%20214.216L151.878%20211.016C160.413%20207.7%20161.598%20199.759%20161.598%20199.759C161.361%20211.016%20157.601%20221.517%20157.601%20221.517C161.549%20220.051%20167.594%20217.456%20172.527%20210.655C177.462%20203.851%20179.078%20198.653%20179.062%20194.073C179.06%20193.618%20179.022%20193.203%20178.962%20192.814C179.019%20189.758%20178.408%20186.172%20178.319%20185.672C178.395%20185.711%20178.44%20185.736%20178.44%20185.736L179.496%20180.669C179.409%20180.61%20179.321%20180.567%20179.233%20180.512C179.376%20180.591%20179.46%20180.64%20179.46%20180.64L180.315%20175.585C180.331%20175.593%20180.339%20175.598%20180.339%20175.598L180.975%20173.487C180.975%20173.487%20186.889%20169.051%20189.208%20155.535C191.533%20142.023%20186.043%20132.94%20186.043%20132.94L195.337%20138.433C191.113%20132.306%20189.631%20126.182%20188.367%20120.905C187.103%20115.623%20182.876%20110.135%20182.876%20110.135L183.085%20106.752C195.337%2099.573%20195.243%2081.3539%20195.854%2077.6939C196.464%2074.0381%20196.219%2055.5029%20195.243%2038.5556C194.266%2021.6111%20197.805%2019.9001%20200.973%2017.0959C204.144%2014.2925%20210.484%2014.9041%20210.729%2011.9775Z'%20fill='%23004A80'/%3e%3cpath%20d='M179.484%20130.279C179.484%20130.279%20183.442%20144.395%20181.207%20154.691C181.207%20154.691%20173.572%20141.226%20173.745%20141.814C173.97%20142.571%20171.789%20145.74%20177.874%20155.878C181.89%20162.573%20176.984%20171.944%20176.984%20171.944C176.984%20171.944%20183.468%20167.006%20185.949%20151.695C187.946%20139.379%20179.484%20130.279%20179.484%20130.279Z'%20fill='%23FFD401'/%3e%3cpath%20d='M25.5673%20146.98C25.5673%20146.98%2023.5437%20131.346%2024.8212%20122.409C26.0987%20113.47%2032.8008%20107.305%2032.8008%20107.305C32.8008%20107.305%2037.5884%20111.346%2038.5407%20111.667C38.5407%20111.667%2029.4997%20120.179%2027.6915%20127.41C25.8855%20134.644%2026.842%20136.556%2026.842%20136.556C26.842%20136.556%2028.2243%20129.323%2035.7767%20121.875L43.7569%20115.388C43.7569%20115.388%2040.458%20126.131%2041.9494%20139.322L43.222%20150.598C43.222%20150.598%2036.415%20138.893%2039.0756%20127.831C39.0756%20127.831%2029.0746%20133.258%2026.526%20142.301L26.3078%20147.193L25.5673%20146.98Z'%20fill='%23FFD401'/%3e%3cpath%20d='M92.0146%20206.726L93.252%20203.72L95.7915%20206.461L101.255%20202.543L103.211%20204.829L105.161%20198.821L108.026%20204.307L108.873%20202.869C108.873%20202.869%20111.087%20203.848%20113.101%20204.829C115.119%20205.811%20115.183%20206.203%20115.183%20206.203C115.183%20206.203%20115.446%20204.501%20117.852%20203.851L122.744%20207.313C122.744%20207.313%20113.101%20213.319%20106.332%20212.599C97.8727%20212.275%2087.5008%20205.125%2087.5008%20205.125'%20fill='white'/%3e%3cpath%20d='M42.7077%20191.614C45.7582%20198.176%2051.068%20201.851%2051.068%20201.851C51.068%20201.851%2049.4308%20198.642%2048.658%20188.396C48.216%20182.513%2039.9408%20180.513%2036.392%20180.594C36.392%20180.594%2031.2349%20184.341%2034.795%20195.428C37.5787%20204.101%2043.1694%20207.002%2043.1694%20207.002C43.1694%20207.002%2038.89%20198.61%2042.7077%20191.614Z'%20fill='%23FFD401'/%3e%3cpath%20d='M151.429%20212.641C143.404%20203.196%20138.301%20204.142%20137.687%20203.389C133.682%20195.661%20131.729%20193.157%20130.781%20192.221C124.689%20184.967%20115.452%20182.293%20106.635%20185.702V138.933C96.8583%20137.57%2092.605%20136.112%2079.7231%20130.765C68.6642%20126.147%2054.008%20118.917%2054.008%20118.917C52.1878%20125.496%2055.4058%20134.036%2055.4058%20134.036L62.1156%20146.609L53.012%20139.076L51.888%20138.939L55.8295%20147.878C54.7048%20147.363%2054.1375%20147.458%2053.3886%20147.506C52.6404%20147.552%2051.1363%20148.961%2052.1674%20154.519C53.2007%20160.077%2057.1661%20164.015%2057.8341%20165.037C58.4992%20166.062%2059.1214%20164.818%2059.1214%20164.818C60.1554%20163.507%2061.1598%20165.605%2061.6898%20166.48C62.9581%20168.567%2064.9352%20172.433%2064.9352%20172.433L65.7327%20170.693C66.6217%20169.177%2067.0651%20169.093%2067.8189%20170.383C68.5741%20171.677%2070.4943%20177.507%2070.4943%20177.507C70.8835%20175.715%2071.6113%20173.816%2072.1215%20173.794C72.6297%20173.776%2073.6764%20176.333%2074.2331%20178.127C74.7913%20179.919%2075.4648%20180.459%2075.4648%20180.459C76.415%20178.812%2075.462%20175.269%2076.3109%20175.718C77.1611%20176.169%2077.9178%20179.132%2077.9178%20179.132C80.4523%20183.752%2080.3383%20189.578%2080.3383%20189.578C80.3383%20189.578%2062.6843%20176.778%2061.0817%20176.226C59.4811%20175.672%2060.6741%20177.232%2060.6741%20177.232L64.8036%20184.844C64.0787%20184.788%2059.5599%20183.052%2059.5599%20183.052L65.53%20189.769C65.53%20189.769%2067.3699%20191.506%2067.0925%20192.012C66.8138%20192.512%2061.3027%20188.517%2060.5214%20188.126C59.7415%20187.734%2061.0078%20190.557%2061.0078%20190.557C61.0078%20190.557%2067.6964%20193.903%2070.0009%20198.092C72.3053%20202.281%2070.0255%20203.392%2070.0255%20203.392L70.9433%20204.384C72.6713%20202.146%2076.9112%20200.016%2076.9112%20200.016C76.1314%20203.265%2073.8896%20205.383%2073.8896%20205.383C73.8896%20205.383%2071.6662%20206.905%2067.9287%20208.024C64.1906%20209.14%2061.1211%20212.225%2061.1211%20212.225L72.5227%20208.351L72.8564%20211.649C75.778%20208.884%2078.2732%20207.352%2080.938%20203.439L83.1255%20207.571C83.1255%20207.571%2082.3253%20203.197%2084.5839%20200.036C86.8433%20196.876%2088.8718%20195.638%2088.8718%20195.638L90.0183%20198.936C91.1466%20192.501%2095.7054%20193.583%2095.7054%20193.583L98.0936%20197.167C100.101%20194.345%20102.3%20193.942%20102.3%20193.942C100.198%20190.585%2098.3822%20189.795%2096.2826%20188.813C94.1844%20187.832%2087.2578%20189.828%2087.2578%20189.828C87.2578%20189.828%2081.2463%20186.296%2084.0983%20186.182C90.1746%20185.939%2087.5999%20180.366%2087.5999%20180.366C96.7373%20179.376%20106.635%20190.266%20106.635%20190.266V188.01C110.543%20190.088%20113.117%20192.407%20113.117%20192.407C113.83%20190.542%20114.006%20191.138%20114.736%20189.267C118.126%20201.008%20122.258%20194.932%20125.78%20204.221C125.769%20201.103%20125.764%20199.484%20125.769%20196.053C129.307%20204.168%20133.439%20199.55%20136.302%20211.377C136.302%20211.377%20137.131%20207.149%20136.8%20206.75C136.382%20206.26%20151.934%20213.164%20151.429%20212.641ZM95.6407%20140.481L94.7707%20148.424L94.6307%20155.834C93.3342%20156.772%2087.987%20157.501%2086.0423%20157.258C85.6615%20156.554%2091.4084%20154.456%2091.0565%20153.472C91.0565%20153.472%2083.1255%20156.772%2078.2648%20156.043C77.4321%20155.819%2084.6114%20153.81%2084.1989%20152.362C80.4523%20153.855%2078.5076%20153.855%2071.9456%20153.855C70.7202%20153.636%2076.705%20151.669%2076.2869%20150.841C70.8567%20149.165%2068.7853%20147.05%2068.7853%20147.05C75.348%20148.508%2083.1255%20151.668%2091.281%20148.916C90.3942%20147.249%2089.5003%20145.607%2088.3073%20143.409C88.3073%20143.409%2086.2858%20148.752%2080.3855%20147.276C74.8616%20146.32%2074.844%20141.636%2074.844%20141.636C74.844%20141.636%2067.9351%20142.188%2062.7111%20138.29C67.5698%20127.848%2058.1135%20127.88%2058.1135%20127.88C58.1135%20127.88%2062.4661%20120.556%2076.7993%20135.107C87.2578%20147.05%2095.6407%20140.481%2095.6407%20140.481Z'%20fill='white'/%3e%3cpath%20d='M140.379%20131.544C154.705%20127.687%20163.744%20132.054%20163.744%20144.341C165.659%20135.592%20164.512%20126.014%20166.237%20125.629C169.768%20124.837%20171.124%20144.841%20165.821%20152.656C174.971%20138.519%20173.415%20125.564%20174.947%20117.883C163.744%20122.719%20140.379%20131.544%20140.379%20131.544Z'%20fill='%23FFD401'/%3e%3cpath%20d='M117.397%20142.893C117.397%20142.893%20126.147%20145.652%20135.67%20139.735C149.541%20129.975%20154.342%20135.626%20154.342%20135.626C154.342%20135.626%20147.171%20134.228%20142.125%20138.817C126.694%20154.159%20117.407%20146.865%20117.407%20146.865L117.397%20142.893Z'%20fill='white'/%3e%3cpath%20d='M135.784%20150.46C134.558%20152.127%20131.606%20153.426%20129.307%20153.279C131.568%20153.964%20134.698%20153.269%20136.735%20152.139C139.427%20150.645%20140.811%20147.255%20140.915%20144.706C139.407%20146.07%20137.954%20147.242%20136.561%20148.231C136.546%20148.979%20136.307%20149.746%20135.784%20150.46Z'%20fill='white'/%3e%3cpath%20d='M100.713%20218.929C100.713%20218.929%20104.858%20219.911%20111.483%20218.815C118.108%20217.719%20120.911%20216.01%20120.911%20216.01C120.911%20216.01%20123.924%20218.018%20123.473%20221.911C123.03%20225.807%20118.649%20228.984%20118.649%20228.984C118.649%20228.984%20115.06%20227.505%20116.873%20224.117C118.693%20220.732%20111.183%20220.668%20112.293%20224.828C114.56%20232.425%20105.244%20237.224%20105.244%20237.224C105.244%20237.224%20109.301%20222.047%2099.6528%20222.396C97.7968%20222.46%2096.6087%20223.135%2095.8084%20224.01C94.11%20225.861%2091.4748%20230.378%2091.4748%20230.378C91.4748%20230.378%2074.1327%20209.272%2093.6962%20217.15C97.4104%20218.33%20100.713%20218.929%20100.713%20218.929Z'%20fill='white'/%3e%3cpath%20d='M107.202%20112.146V107.471C107.202%20107.471%20116.352%20105.526%20129.134%20100.499C135.594%2097.9541%20143.863%2094.6918%20150.67%2090.3532L152.954%2093.6796C152.954%2093.6796%20141.845%2099.29%20132.489%20103.537C131.053%20104.187%20125.014%20106.709%20119.531%20108.584C113.318%20110.713%20107.202%20112.255%20107.202%20112.146Z'%20fill='%23FFD401'/%3e%3cpath%20d='M120.329%20119.75C120.329%20119.75%20123.51%20118.983%20123.735%20115.521C123.954%20112.056%20119.834%20111.921%20119.834%20111.921C119.834%20111.921%20125.953%20109.81%20126.172%20114.725C126.393%20119.64%20120.885%20119.694%20120.329%20119.75Z'%20fill='%23FFD401'/%3e%3cpath%20d='M137.467%20116.512C137.467%20116.512%20140.697%20114.333%20140.195%20111.205C139.698%20108.079%20138.415%20108.023%20137.526%20108.023C137.526%20108.023%20140.195%20106.183%20141.699%20108.189C142.37%20109.087%20142.62%20110.486%20142.377%20111.804C141.475%20116.704%20138.016%20116.41%20137.467%20116.512Z'%20fill='%23FFD401'/%3e%3cpath%20d='M152.041%20111.735C152.018%20111.735%20154.596%20110.7%20154.448%20105.826C154.448%20105.826%20154.195%20102.395%20151.98%20102.354C151.98%20102.354%20153.647%20100.978%20154.978%20102.119C155.722%20102.765%20156.477%20104.366%20156.426%20106.308C156.385%20107.822%20155.495%20110.198%20154.912%20110.779C153.586%20112.115%20152.067%20111.735%20152.041%20111.735Z'%20fill='%23FFD401'/%3e%3cpath%20d='M107.3%20107.195L107.448%2021.1215C107.448%2021.1215%20106.648%2018.9846%20104.509%2019.9207C103.029%2020.5682%2092.4545%2023.6476%2076.6883%2037.6324C73.7293%2040.2556%2069.8588%2043.2688%2066.6478%2046.8781C63.3517%2050.5825%2060.3491%2054.8471%2056.9326%2059.4918L57.6189%2061.906C59.0026%2061.4373%2060.3991%2061.2409%2061.711%2061.3936C63.9549%2061.6505%2066.2016%2063.2673%2067.4545%2065.7758C68.9016%2068.6721%2070.6007%2072.8066%2069.0965%2079.7866C68.235%2083.7887%2067.149%2087.2657%2065.9123%2090.2867L66.0221%2090.3451C66.0221%2090.3451%2092.8662%20105.86%20107.3%20107.195Z'%20fill='%23FFD401'/%3e%3cpath%20d='M107.188%20132.831C107.188%20130.149%20107.161%20112.367%20107.161%20112.367C107.161%20112.367%2090.1362%20109.1%2064.3042%2093.8097C59.8404%20102.62%2054.071%20106.746%2049.7747%20108.686C54.5151%20111.445%2062.1519%20115.908%2066.1469%20117.978C70.1356%20120.048%2092.6053%20130.644%20104.212%20132.499C104.212%20132.499%20107.188%20133.361%20107.188%20132.831ZM66.2912%20104.748C66.2912%20104.748%2063.8657%20102.316%2062.5031%20104.85C61.1404%20107.384%2061.9998%20109.561%2061.9998%20109.561L61.8978%20109.813C61.8978%20109.813%2059.9692%20105.261%2061.0982%20102.589C62.2314%2099.9169%2064.067%20100.593%2066.2912%20104.748ZM79.7404%20109.301C79.7404%20109.301%2076.963%20107.075%2075.147%20109.199C73.6823%20111.481%2074.9957%20113.859%2074.9957%20113.859C74.9957%20113.859%2070.9078%20109.505%2073.379%20106.668C75.8544%20103.83%2079.639%20108.643%2079.7404%20109.301ZM97.5583%20113.051C97.5583%20113.051%2094.0757%20111.072%2092.2062%20113.151C90.3403%20115.228%2091.653%20117.609%2091.653%20117.609C91.653%20117.609%2087.513%20113.76%2089.9849%20111.276C92.4596%20108.794%2095.8923%20110.565%2097.5583%20113.051Z'%20fill='%23FFD401'/%3e%3cpath%20d='M18.3086%2013.8052C19.9873%2014.6161%2022.0292%2015.9083%2023.7536%2017.8686C25.6519%2020.0202%2027.1659%2022.975%2027.3953%2026.9799C28.0774%2038.7215%2026.8794%2054.9826%2027.2884%2066.1759C27.584%2074.2877%2026.8942%2090.5748%2033.6892%2098.6811C40.0407%20106.259%2050.8392%20100.687%2056.6924%2094.9493C58.0916%2093.5725%2060.3123%2091.0513%2059.3417%2088.887C58.9032%2087.9157%2057.6989%2087.0084%2054.5069%2087.694C48.6671%2088.9532%2038.6232%2086.6642%2035.2686%2069.6001C33.0163%2058.1281%2032.342%2046.2492%2032.0978%2039.6084C31.9014%2034.2802%2031.9478%2027.8843%2030.2825%2022.6716C29.5069%2020.2398%2027.7402%2018.0037%2025.8631%2016.0864C23.9282%2014.1135%2021.5119%2012.653%2018.8147%2012.2371C18.3185%2012.1632%2017.9279%2012.1202%2017.6217%2012.0822C16.7165%2011.9619%2016.5399%2012.2272%2016.4456%2012.4926C16.2541%2013.0226%2016.5335%2012.9486%2018.3086%2013.8052Z'%20fill='%23FFD401'/%3e%3cpath%20d='M201.616%2010.6695C199.355%2010.4605%20196.395%2010.5858%20192.951%2011.6514C184.849%2014.1465%20178.864%2021.4609%20171.608%2040.5282C168.01%2049.9887%20166.608%2056.5401%20165.33%2060.4429C164.074%2064.2641%20162.496%2066.5587%20158.59%2065.4346C156.492%2064.8329%20153.132%2064.0192%20151.771%2067.1957C149.75%2071.9171%20148.166%2077.3902%20152.589%2087.0773C157.012%2096.7665%20164.423%2099.8409%20167.627%20102.033C167.627%20102.033%20159.742%2092.8257%20159.403%2090.7993C159.403%2090.7993%20156.691%2085.6035%20164.114%2076.6611C171.537%2067.7158%20172.164%2062.3954%20172.804%2059.6905C173.219%2057.9316%20176.034%2045.2982%20179.978%2034.7771C182.422%2028.251%20185.135%2022.2767%20187.51%2019.8829C191.488%2015.8801%20194.223%2014.932%20196.285%2014.4372C197.7%2014.0987%20199.691%2013.8129%20201.69%2013.4969C207.856%2012.5227%20206.88%2011.1516%20201.616%2010.6695Z'%20fill='%23FFD401'/%3e%3cpath%20d='M163.655%20178.953L162.977%20176.205C162.972%20176.182%20164.456%20175.19%20166.707%20174.446C168.575%20173.829%20170.992%20173.406%20173.325%20173.645C178.477%20174.173%20180.317%20175.575%20180.317%20175.575L179.46%20180.64C179.46%20180.64%20176.47%20178.665%20172.827%20178.094C172.185%20177.997%20171.517%20177.88%20170.841%20177.895C166.371%20177.969%20163.655%20178.953%20163.655%20178.953Z'%20fill='%23DC6663'/%3e%3cpath%20d='M162.366%20185.979L162.998%20183.462C162.998%20183.462%20164.499%20183.047%20166.628%20182.917C168.279%20182.815%20170.342%20182.899%20172.198%20183.384C176.445%20184.487%20178.334%20185.754%20178.334%20185.754C178.334%20185.754%20179.043%20189.618%20178.961%20192.935C178.961%20192.935%20178.573%20188.923%20172.674%20187.424C169.559%20186.455%20166.378%20186.019%20162.366%20185.979Z'%20fill='%23DC6663'/%3e%3cpath%20d='M30.4239%20168.488L30.4556%20168.435L30.4788%20168.493C31.056%20168.328%2035.0236%20167.257%2039.0989%20167.734C43.5099%20168.254%2047.6626%20170.329%2048.7001%20171.104L47.1418%20165.916C47.1418%20165.916%2037.2055%20161.287%2029.775%20165.261C30.1396%20166.309%2030.388%20168.202%2030.4239%20168.488Z'%20fill='%23DC6663'/%3e%3cpath%20d='M29.7612%20175.777C29.7612%20175.777%2036.8947%20174.997%2040.9151%20176.685C44.9376%20178.372%2049.0875%20178.889%2050.5191%20179.406L51.0379%20178.111C51.0379%20178.111%2044.6927%20170.995%2030.1891%20172.917C30.1195%20173.883%2029.9027%20175.009%2029.7612%20175.682L29.7612%20175.777Z'%20fill='%23DC6663'/%3e%3c/svg%3e";
//#endregion
//#region src/assets/logos/jyp.svg
var jyp_default = "data:image/svg+xml,%3csvg%20width='240'%20height='256'%20viewBox='0%200%20240%20256'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M202.994%2013.7288C175.54%205.45698%20137.91%202.85898%2091.0523%2011.354C28.135%2022.7721%20-37.5638%2069.6697%2092.0677%2075.5008C124.742%2076.9732%20161.392%2068.9109%20157.439%2055.4612C153.309%2041.4043%20118.873%2041.1487%20103.035%2043.5254C109.266%2043.9373%20128.179%2053.6427%2098.382%2053.5307C65.1826%2053.4133%2065.0914%2043.5507%2091.0271%2038.6166C102.15%2036.3393%20119.534%2034.2707%20137.184%2035.7495C165.422%2037.4513%20178.962%2048.5777%20174.592%2079.5911C161.942%20169.398%2059.9279%20256%2059.9279%20256C59.9279%20256%20111.72%20238.291%20144.514%20215.345C195.401%20179.72%20223.085%20140.073%20236.324%2087.7383C249.111%2037.2499%20224.453%2020.1877%20202.994%2013.7288Z'%20fill='black'/%3e%3cpath%20d='M185.567%207.61631C158.12%20-0.656442%20120.482%20-3.268%2073.6261%205.24775C10.7141%2016.6596%20-54.9846%2063.5446%2074.6459%2069.3883C107.321%2070.8607%20143.964%2062.7984%20140.011%2049.3495C135.882%2035.2927%20101.452%2035.0362%2085.6079%2037.4129C91.8446%2037.8248%20110.751%2047.5176%2080.9485%2047.4065C47.7618%2047.2881%2047.6642%2037.439%2073.5999%2032.5041C84.7245%2030.2268%20102.106%2028.1645%20119.763%2029.6369C147.989%2031.3397%20161.536%2042.4652%20157.17%2073.4786C144.513%20163.294%2042.5071%20249.876%2042.5071%20249.876C42.5071%20249.876%2094.2926%20232.179%20127.079%20209.234C177.982%20173.607%20205.646%20133.961%20218.903%2081.6131C231.684%2031.1365%20207.025%2014.0625%20185.567%207.61631Z'%20fill='white'/%3e%3cpath%20d='M75.4641%2010.7771C122.361%202.45916%20154.422%205.29925%20181.87%2013.5521C203.341%2020.0119%20223.203%2035.6125%20211.331%2082.3791C201.868%20119.688%20176.412%20166.612%20130.037%20199.249C100.032%20220.374%2081.6023%20227.624%2069.0305%20233.585C82.8787%20219.824%20167.865%20132.614%20165.278%2056.5085C164.12%2022.5439%20123.041%2020.9676%2093.6248%2023.5521C34.9088%2028.7029%2022.4545%2052.046%2081.4659%2052.9819C110.019%2053.4534%20112.321%2046.4047%20104.803%2041.4444C111.759%2041.6332%20128.349%2042.72%20131.53%2048.8464C135.089%2055.7434%20114.175%2064.7099%2075.1434%2063.5699C-38.9579%2060.2203%2017.3498%2021.1103%2075.4641%2010.7771Z'%20fill='%23E30613'/%3e%3c/svg%3e";
//#endregion
//#region src/assets/logos/k-espoo.svg
var k_espoo_default = "data:image/svg+xml,%3csvg%20width='256'%20height='247'%20viewBox='0%200%20256%20247'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M256%20128C256%2057.4209%20198.579%200%20128%200C57.4204%200%200%2057.4209%200%20128C0%20154.435%207.9221%20179.715%2022.9163%20201.144L9.09494%20214.967L41.0361%20246.904L85.4011%20202.539L69.4304%20186.569C53.7861%20170.924%2045.1702%20150.125%2045.1702%20128C45.1702%2082.3284%2082.3272%2045.1707%20128%2045.1707C173.672%2045.1707%20210.829%2082.3284%20210.829%20128C210.829%20150.127%20202.213%20170.928%20186.57%20186.569L170.6%20202.539L214.965%20246.906L246.905%20214.965L233.084%20201.144C248.078%20179.715%20256%20154.435%20256%20128Z'%20fill='%230F1425'/%3e%3cpath%20d='M195.353%2097.246L161.261%20111.367C160.909%20111.513%20160.729%20111.906%20160.848%20112.269L162.089%20116.045C162.768%20118.115%20162.606%20120.267%20161.622%20122.269C160.577%20124.394%20158.589%20125.981%20156.305%20126.514C153.807%20127.098%20151.249%20126.538%20149.284%20124.979C147.316%20123.418%20146.189%20121.088%20146.189%20118.586C146.189%20115.709%20147.674%20113.098%20150.161%20111.601L154.86%20108.775C155.266%20108.53%20155.335%20107.969%20155%20107.634L128.517%2081.1505C128.232%2080.8654%20127.77%2080.8654%20127.485%2081.1505L101%20107.634C100.664%20107.969%20100.733%20108.53%20101.14%20108.775L105.838%20111.601C108.326%20113.098%20109.811%20115.709%20109.811%20118.586C109.811%20121.088%20108.683%20123.418%20106.716%20124.979C104.751%20126.538%20102.192%20127.098%2099.6946%20126.514C97.41%20125.981%2095.422%20124.394%2094.3779%20122.269C93.3929%20120.267%2093.2314%20118.115%2093.9108%20116.045L95.1518%20112.269C95.2708%20111.906%2095.0907%20111.513%2094.7381%20111.367L60.6459%2097.246C60.0925%2097.0169%2059.514%2097.5149%2059.659%2098.0965L75.8717%20163.121H127.998L128%20163.12L128.001%20163.121H180.128L196.34%2098.0965C196.486%2097.5149%20195.907%2097.0169%20195.353%2097.246Z'%20fill='%230F1425'/%3e%3cpath%20d='M214.966%20239.813L177.694%20202.54L190.118%20190.116C206.709%20173.526%20215.847%20151.466%20215.847%20128C215.847%2079.5614%20176.439%2040.1545%20128.001%2040.1545C79.5626%2040.1545%2040.1552%2079.5614%2040.1552%20128C40.1552%20151.466%2049.2924%20173.525%2065.8849%20190.116L78.3081%20202.54L41.0379%20239.811L16.1902%20214.967L29.4899%20201.665C13.606%20180.517%205.01693%20154.92%205.01693%20128C5.01693%2060.1867%2060.1873%205.01626%20128.001%205.01626C195.815%205.01626%20250.985%2060.1867%20250.985%20128C250.985%20154.918%20242.394%20180.519%20226.513%20201.665L239.814%20214.966L214.966%20239.813Z'%20fill='%23254CA6'/%3e%3cpath%20d='M166.854%20114.481C167.279%20115.774%20167.516%20117.152%20167.516%20118.587C167.516%20125.862%20161.618%20131.76%20154.344%20131.76C147.069%20131.76%20141.172%20125.862%20141.172%20118.587C141.172%20113.792%20143.743%20109.607%20147.574%20107.304L128%2087.7288L108.425%20107.304C112.255%20109.607%20114.827%20113.792%20114.827%20118.587C114.827%20125.862%20108.93%20131.76%20101.655%20131.76C94.3804%20131.76%2088.4828%20125.862%2088.4828%20118.587C88.4828%20117.151%2088.7202%20115.773%2089.1448%20114.479L67.2501%20105.41L80.3836%20158.104H175.614L188.753%20105.41L166.854%20114.481Z'%20fill='%23EE8017'/%3e%3cpath%20d='M233.416%20128C233.416%2098.891%20221.617%2072.5372%20202.541%2053.4604L190.089%2065.9132C205.995%2081.8195%20215.847%20103.781%20215.847%20128C215.847%20151.466%20206.709%20173.526%20190.118%20190.116L177.694%20202.54L214.963%20239.81V214.961L202.52%20202.518C221.602%20183.448%20233.416%20157.112%20233.416%20128Z'%20fill='%233A73C2'/%3e%3cpath%20d='M128.001%205.01626C60.1873%205.01626%205.01693%2060.1867%205.01693%20128C5.01693%20154.92%2013.606%20180.517%2029.4899%20201.665L16.1902%20214.967L41.0368%20239.811V214.966L53.4652%20202.543C34.3869%20183.467%2022.5863%20157.112%2022.5863%20128C22.5863%2069.7811%2069.7823%2022.585%20128.002%2022.585C157.111%2022.585%20183.465%2034.3842%20202.541%2053.4604L214.923%2041.0783C192.654%2018.8085%20161.908%205.01626%20128.001%205.01626Z'%20fill='%233A73C2'/%3e%3cpath%20d='M128%2087.7288L108.425%20107.304C112.255%20109.607%20114.827%20113.792%20114.827%20118.587C114.827%20125.862%20108.93%20131.76%20101.655%20131.76C94.3804%20131.76%2088.4828%20125.862%2088.4828%20118.587C88.4828%20117.151%2088.7202%20115.773%2089.1448%20114.479L67.2501%20105.41L80.3836%20158.104H128.002L128%2087.7288Z'%20fill='%23F6DD19'/%3e%3c/svg%3e";
//#endregion
//#region src/assets/logos/kalpa.svg
var kalpa_default = "data:image/svg+xml,%3csvg%20width='220'%20height='256'%20viewBox='0%200%20220%20256'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M176.678%2038.2173C122.097%2066.341%2058.8883%2047.356%2014.426%200.183253C-1.26938%2037.1303%20-4.91371%2086.8726%207.73703%20132.765C20.3872%20178.658%2049.3323%20220.701%20108.735%20255.885C151.66%20235.796%20171.737%20213.005%20187.582%20187.719C203.277%20162.671%20214.819%20135.175%20219.044%2097.5297C204.922%2077.7591%20190.8%2057.9884%20176.678%2038.2173Z'%20fill='white'/%3e%3cpath%20d='M108.776%20255.979C151.722%20235.879%20171.814%20213.074%20187.668%20187.772C203.37%20162.712%20214.919%20135.201%20219.146%2097.5372L219.15%2097.5002L219.128%2097.4699C205.006%2077.6985%20190.883%2057.9269%20176.76%2038.1549L176.712%2038.0866L176.636%2038.1247C122.102%2066.2244%2058.936%2047.2622%2014.4922%200.108278L14.3908%200L14.3323%200.136567C-1.37296%2037.1074%20-5.01743%2086.8753%207.63949%20132.79C20.2973%20178.711%2049.2608%20220.777%20108.686%20255.975L108.729%20256L108.776%20255.979ZM108.74%20255.781C49.3849%20220.612%2020.467%20178.596%207.82678%20132.738C-4.80356%2086.92%20-1.18368%2037.2641%2014.4542%200.350197C58.9133%2047.4464%20122.077%2066.4082%20176.65%2038.3354C190.75%2058.0748%20204.848%2077.8139%20218.948%2097.5528C214.721%20135.165%20203.187%20162.639%20187.503%20187.669C171.672%20212.934%20151.616%20235.705%20108.74%20255.781Z'%20fill='black'/%3e%3cpath%20d='M56.4012%20195.295C59.7063%20199.162%2063.1732%20202.891%2066.7767%20206.481C71.178%20210.866%2075.7836%20215.045%2080.5514%20219.028C84.9643%20222.714%2089.5163%20226.233%2094.1789%20229.597C99.165%20233.195%20104.278%20236.615%20109.491%20239.875C114.993%20237.097%20120.388%20234.103%20125.622%20230.847C129.115%20228.674%20132.536%20226.384%20135.86%20223.962C141.112%20220.137%20146.125%20215.984%20150.817%20211.493C152.986%20209.417%20155.086%20207.269%20157.114%20205.055C159.066%20202.925%20160.951%20200.734%20162.77%20198.49C164.564%20196.277%20166.294%20194.012%20167.965%20191.707C169.636%20189.401%20171.25%20187.055%20172.816%20184.677C173.599%20183.486%20174.372%20182.288%20175.134%20181.083C176.485%20178.945%20177.804%20176.787%20179.088%20174.609C181.77%20170.058%20184.298%20165.415%20186.629%20160.674C189.199%20155.453%20191.53%20150.113%20193.596%20144.673C195.766%20138.962%20197.643%20133.139%20199.233%20127.239C200.283%20123.339%20201.207%20119.405%20202.095%20115.297C203.616%20108.26%20205.031%20100.711%20205.947%2090.4477C156.098%20125.397%20106.25%20160.346%2056.4012%20195.295ZM106.434%20191.886H101.619V182.606H98.8096V179.747L104.427%20177.439H106.434V191.886ZM122.384%20189.026C121.858%20190.485%20121.046%20191.555%20119.334%20192.763C117.621%20193.971%20115.007%20195.317%20110.498%20195.355C110.276%20194.518%20110.054%20193.681%20109.832%20192.845C113.971%20192.159%20116.87%20190.554%20117.232%20188.379C115.058%20189.622%20113.267%20189.348%20111.907%20188.767C110.548%20188.186%20109.619%20187.299%20109.111%20186.139C108.604%20184.98%20108.517%20183.547%20108.836%20182.261C109.156%20180.975%20109.88%20179.837%20110.743%20178.982C111.607%20178.128%20112.607%20177.558%20113.85%20177.282C115.093%20177.006%20116.577%20177.024%20117.94%20177.36C119.304%20177.696%20120.546%20178.352%20121.435%20179.491C122.324%20180.63%20122.859%20182.253%20123.006%20183.987C123.152%20185.721%20122.911%20187.568%20122.384%20189.026ZM137.114%20191.886H124.411V188.569C126.694%20187.688%20128.046%20186.623%20129.031%20185.78C130.015%20184.939%20130.631%20184.321%20130.871%20183.619C131.11%20182.916%20130.973%20182.129%20130.149%20181.642C129.326%20181.156%20127.816%20180.969%20125.62%20182.34C125.119%20181.26%20124.618%20180.181%20124.117%20179.102C127.559%20177.128%20129.658%20177.023%20131.325%20177.235C133.76%20177.545%20135.27%20178.53%20135.971%20179.793C136.23%20180.258%20136.378%20180.761%20136.466%20181.349C136.599%20182.236%20136.594%20183.316%20135.048%20185.345C134.693%20185.81%20134.258%20186.324%20131.805%20188.271C133.575%20187.924%20135.344%20187.576%20137.114%20187.229V191.886ZM152.174%20189.026C151.647%20190.485%20150.837%20191.555%20149.124%20192.763C147.411%20193.971%20144.796%20195.317%20140.287%20195.355C140.066%20194.518%20139.844%20193.681%20139.622%20192.845C143.76%20192.159%20146.66%20190.554%20147.023%20188.379C144.848%20189.622%20143.057%20189.348%20141.698%20188.767C140.338%20188.186%20139.409%20187.299%20138.901%20186.139C138.394%20184.98%20138.307%20183.547%20138.627%20182.261C138.946%20180.975%20139.67%20179.837%20140.534%20178.982C141.396%20178.128%20142.397%20177.558%20143.64%20177.282C144.882%20177.006%20146.366%20177.024%20147.73%20177.36C149.093%20177.696%20150.336%20178.352%20151.225%20179.491C152.113%20180.63%20152.649%20182.253%20152.796%20183.987C152.942%20185.721%20152.7%20187.568%20152.174%20189.026Z'%20fill='%23231F20'/%3e%3cpath%20d='M145.713%20181.052C145.102%20181.052%20144.577%20181.375%20144.222%20181.845C143.867%20182.313%20143.694%20182.905%20143.694%20183.485C143.694%20184.064%20143.866%20184.656%20144.22%20185.124C144.576%20185.594%20145.102%20185.918%20145.713%20185.918C146.324%20185.918%20146.848%20185.595%20147.205%20185.125C147.559%20184.657%20147.732%20184.064%20147.732%20183.485C147.732%20182.906%20147.56%20182.314%20147.205%20181.845C146.849%20181.375%20146.324%20181.052%20145.713%20181.052Z'%20fill='%23231F20'/%3e%3cpath%20d='M115.923%20181.052C115.312%20181.052%20114.787%20181.375%20114.431%20181.845C114.077%20182.313%20113.904%20182.905%20113.904%20183.485C113.904%20184.064%20114.077%20184.656%20114.43%20185.124C114.786%20185.594%20115.311%20185.918%20115.923%20185.918C116.534%20185.918%20117.059%20185.595%20117.414%20185.125C117.769%20184.657%20117.942%20184.064%20117.942%20183.485C117.942%20182.906%20117.769%20182.314%20117.415%20181.845C117.059%20181.375%20116.534%20181.052%20115.923%20181.052Z'%20fill='%23231F20'/%3e%3cpath%20d='M142.721%2063.9143C135.737%2064.9873%20128.665%2065.4891%20121.599%2065.4302C114.569%2065.3722%20107.546%2064.7599%20100.607%2063.6318C93.6414%2062.4993%2086.7613%2060.8473%2080.0294%2058.7292C73.2232%2056.5884%2066.5691%2053.9715%2060.1115%2050.9378C53.4303%2047.7993%2046.9597%2044.2146%2040.7359%2040.247C33.7003%2035.7631%2026.9795%2030.7891%2020.6074%2025.4045C19.9608%2027.7911%2019.3668%2030.1912%2018.8236%2032.6034C17.8046%2037.1283%2016.9629%2041.6928%2016.2873%2046.282C15.5701%2051.1513%2015.0394%2056.0481%2014.6892%2060.9569C14.3311%2065.9749%2014.1609%2071.0059%2014.1738%2076.036C14.1996%2086.3043%2014.9868%2096.5715%2016.5466%20106.72C17.3338%20111.844%2018.3179%20116.938%2019.5045%20121.985C20.6924%20127.038%2022.0832%20132.044%2023.6865%20136.982C24.8648%20140.609%2026.1586%20144.2%2027.5706%20147.743C67.9246%20119.451%20108.278%2091.1585%20148.633%2062.8654C146.671%2063.2609%20144.7%2063.6105%20142.721%2063.9143ZM73.8771%2090.5641C72.3283%2090.7843%2070.854%2089.831%2070.4189%2088.3282H69.2763V90.7152H67.5272V88.3282H65.6583V91.3788H63.9097V88.3282H60.5041L57.6269%2093.3123C58.1943%2094.2956%2058.7618%2095.2783%2059.3292%2096.261L61.9707%2094.736C62.2624%2095.2411%2062.5541%2095.7458%2062.8453%2096.2509C61.9649%2096.7589%2061.0841%2097.2679%2060.2042%2097.7759C60.5152%2098.3154%2060.8267%2098.8553%2061.1387%2099.3947C61.8273%2098.9963%2062.5164%2098.5988%2063.2055%2098.2009C63.4972%2098.7061%2063.7884%2099.2112%2064.0796%2099.7163C63.391%20100.114%2062.7019%20100.512%2062.0127%20100.91C62.2035%20101.239%2062.3938%20101.568%2062.584%20101.899C64.1028%20101.524%2065.6655%20102.325%2066.2494%20103.776C66.8337%20105.228%2066.2605%20106.888%2064.9059%20107.669C63.5508%20108.452%2061.8268%20108.118%2060.862%20106.886C59.8976%20105.655%2059.9859%20103.901%2061.0691%20102.773C60.8784%20102.444%2060.6881%20102.114%2060.4978%20101.784C59.8092%20102.182%2059.1201%20102.58%2058.4309%20102.977C58.1398%20102.473%2057.8481%20101.967%2057.5564%20101.463C58.2455%20101.065%2058.9346%20100.667%2059.6233%20100.269C59.3118%2099.7298%2059.0008%2099.1904%2058.6888%2098.6505C57.8085%2099.1595%2056.9281%2099.6675%2056.0478%20100.176C55.7561%2099.6709%2055.4644%2099.1658%2055.1732%2098.6611C56.0531%2098.1526%2056.9339%2097.6441%2057.8147%2097.1361C57.2468%2096.1529%2056.6799%2095.1696%2056.1115%2094.1874H50.3566C49.7896%2095.1696%2049.2217%2096.1529%2048.6543%2097.1361C49.5351%2097.6441%2050.4155%2098.1526%2051.2959%2098.6611C51.0042%2099.1658%2050.7125%2099.6709%2050.4213%20100.176C49.5409%2099.6675%2048.6606%2099.1595%2047.7797%2098.6505C47.4683%2099.1904%2047.1568%2099.7298%2046.8458%20100.269C47.5344%20100.667%2048.2235%20101.065%2048.9127%20101.463C48.621%20101.967%2048.3293%20102.473%2048.0376%20102.977C47.3485%20102.58%2046.6599%20102.182%2045.9707%20101.784C45.7805%20102.114%2045.5902%20102.444%2045.3999%20102.773C46.4836%20103.902%2046.5715%20105.655%2045.6061%20106.887C44.6417%20108.118%2042.9177%20108.452%2041.5631%20107.669C40.2081%20106.887%2039.6353%20105.227%2040.2197%20103.776C40.804%20102.325%2042.3662%20101.524%2043.885%20101.899C44.0753%20101.568%2044.2655%20101.239%2044.4558%20100.91C43.7667%20100.512%2043.0776%20100.114%2042.3889%2099.7163C42.6806%2099.2112%2042.9718%2098.7061%2043.2635%2098.2009C43.9526%2098.5988%2044.6417%2098.9963%2045.3304%2099.3947C45.6423%2098.8553%2045.9533%2098.3154%2046.2653%2097.7759C45.3845%2097.2679%2044.5041%2096.7589%2043.6238%2096.2509C43.915%2095.7458%2044.2066%2095.2411%2044.4983%2094.736C45.3787%2095.2445%2046.259%2095.753%2047.1399%2096.261C47.7073%2095.2783%2048.2747%2094.2956%2048.8422%2093.3123L45.9645%2088.3282H42.5594V91.3788H40.8108V88.3282H38.9414V90.7152H37.1923V88.3282H36.0502C35.6146%2089.831%2034.1397%2090.7843%2032.591%2090.5641C31.0428%2090.3443%2029.8915%2089.0183%2029.8915%2087.4541C29.8915%2085.8894%2031.0428%2084.5633%2032.592%2084.3436C34.1402%2084.1234%2035.6146%2085.0772%2036.0502%2086.579H37.1923V84.1925H38.9414V86.579H40.8108V83.5289H42.5594V86.579H45.9645L48.8422%2081.5953C48.2747%2080.6126%2047.7073%2079.6294%2047.1399%2078.6466C46.259%2079.1552%2045.3787%2079.6632%2044.4983%2080.1717C44.2066%2079.6665%2043.915%2079.1619%2043.6238%2078.6568C44.5041%2078.1483%2045.3845%2077.6398%2046.2653%2077.1317C45.9533%2076.5923%2045.6423%2076.0524%2045.3304%2075.5135C44.6417%2075.9114%2043.9526%2076.3088%2043.2635%2076.7067C42.9718%2076.2016%2042.6806%2075.6965%2042.3889%2075.1919C43.0776%2074.7939%2043.7667%2074.396%2044.4558%2073.9981C44.2655%2073.6687%2044.0753%2073.3389%2043.885%2073.0096C42.3658%2073.3833%2040.803%2072.5826%2040.2192%2071.1315C39.6353%2069.6798%2040.2081%2068.021%2041.5631%2067.2387C42.9182%2066.4559%2044.6422%2066.7901%2045.6066%2068.0215C46.5715%2069.2529%2046.4831%2071.0064%2045.3999%2072.1345C45.5902%2072.4643%2045.7805%2072.7942%2045.9707%2073.124C46.6599%2072.7256%2047.3485%2072.3282%2048.0376%2071.9302C48.3293%2072.4349%2048.621%2072.9405%2048.9127%2073.4451C48.2235%2073.8431%2047.5344%2074.2405%2046.8458%2074.6384C47.1568%2075.1783%2047.4683%2075.7173%2047.7797%2076.2572C48.6606%2075.7487%2049.5409%2075.2401%2050.4213%2074.7321C50.7125%2075.2368%2051.0042%2075.7419%2051.2959%2076.2465C50.4155%2076.7551%2049.5351%2077.2636%2048.6543%2077.7716C49.2217%2078.7548%2049.7896%2079.738%2050.3566%2080.7208H56.1115C56.6799%2079.738%2057.2468%2078.7548%2057.8147%2077.7716C56.9339%2077.2636%2056.0531%2076.7551%2055.1732%2076.2465C55.4644%2075.7419%2055.7561%2075.2368%2056.0478%2074.7321C56.9281%2075.2401%2057.8085%2075.7487%2058.6888%2076.2572C59.0008%2075.7173%2059.3118%2075.1783%2059.6233%2074.6384C58.9346%2074.2405%2058.2455%2073.8431%2057.5564%2073.4451C57.8481%2072.9405%2058.1398%2072.4349%2058.4309%2071.9302C59.1201%2072.3282%2059.8092%2072.7256%2060.4978%2073.124C60.6881%2072.7942%2060.8784%2072.4643%2061.0691%2072.1345C59.9855%2071.0059%2059.8976%2069.2524%2060.8624%2068.021C61.8273%2066.79%2063.5513%2066.4559%2064.9059%2067.2387C66.261%2068.021%2066.8337%2069.6803%2066.2494%2071.132C65.6651%2072.5831%2064.1028%2073.3833%2062.584%2073.0096C62.3938%2073.3389%2062.2035%2073.6687%2062.0127%2073.9981C62.7019%2074.396%2063.391%2074.7939%2064.0796%2075.1919C63.7884%2075.6965%2063.4972%2076.2016%2063.2055%2076.7067C62.5164%2076.3088%2061.8273%2075.9114%2061.1387%2075.5135C60.8267%2076.0524%2060.5152%2076.5923%2060.2042%2077.1317C61.0841%2077.6398%2061.9649%2078.1483%2062.8453%2078.6568C62.5541%2079.1619%2062.2624%2079.6665%2061.9707%2080.1717L59.3292%2078.6466C58.7618%2079.6294%2058.1943%2080.6126%2057.6269%2081.5953L60.5041%2086.579H63.9097V83.5289H65.6583V86.579H67.5272V84.1925H69.2763V86.579H70.4189C70.854%2085.0767%2072.3288%2084.1234%2073.8775%2084.3436C75.4263%2084.5638%2076.5775%2085.8894%2076.5775%2087.4541C76.5775%2089.0187%2075.4263%2090.3443%2073.8771%2090.5641Z'%20fill='%23231F20'/%3e%3cpath%20d='M56.6171%2091.5632L58.4841%2088.3282H54.7492L56.6171%2091.5632Z'%20fill='%23231F20'/%3e%3cpath%20d='M51.3668%2092.4378H55.1022L53.2342%2089.2032L51.3668%2092.4378Z'%20fill='%23231F20'/%3e%3cpath%20d='M47.9845%2088.3282L49.8519%2091.5632L51.7194%2088.3282H47.9845Z'%20fill='%23231F20'/%3e%3cpath%20d='M49.8519%2083.3445L47.985%2086.5795H51.7194L49.8519%2083.3445Z'%20fill='%23231F20'/%3e%3cpath%20d='M55.1022%2082.4699H51.3668L53.2342%2085.7045L55.1022%2082.4699Z'%20fill='%23231F20'/%3e%3cpath%20d='M54.7492%2086.5795H58.4841L56.6171%2083.3445L54.7492%2086.5795Z'%20fill='%23231F20'/%3e%3cpath%20d='M141.893%2096.3301C141.662%2096.0027%20141.37%2095.7187%20141.038%2095.4966C140.679%2095.258%20140.272%2095.0919%20139.849%2095.0127C139.43%2094.9349%20138.994%2094.9431%20138.577%2095.0368C138.198%2095.1223%20137.835%2095.2793%20137.514%2095.4995C136.813%2095.9925%20136.112%2096.4861%20135.41%2096.9786C136.636%2098.7229%20137.862%20100.467%20139.088%20102.211C139.789%20101.717%20140.491%20101.225%20141.191%20100.732C141.507%20100.504%20141.778%20100.216%20141.987%2099.8872C142.216%2099.527%20142.372%2099.1199%20142.44%2098.6988C142.509%2098.2738%20142.491%2097.8339%20142.387%2097.4162C142.291%2097.0279%20142.122%2096.6575%20141.893%2096.3301Z'%20fill='%23FBC707'/%3e%3cpath%20d='M176.103%2048.6671C124.818%2084.6237%2073.5327%20120.58%2022.2469%20156.537C24.2346%20161.062%2026.4131%20165.503%2028.7755%20169.843C31.4967%20174.842%2034.4638%20179.708%2037.6578%20184.419C40.6456%20188.826%2043.8319%20193.098%2047.194%20197.226C99.3939%20160.629%20151.594%20124.031%20203.794%2087.4333C194.564%2074.5114%20185.333%2061.589%20176.103%2048.6671ZM67.7971%20175.484L61.8312%20167C61.5124%20166.549%2060.932%20166.404%2060.4664%20166.731L59.6788%20167.284C59.8556%20167.535%2060.0318%20167.785%2060.2081%20168.036C60.2245%20168.059%2060.2409%20168.082%2060.2573%20168.106C62.2455%20170.934%2064.2342%20173.763%2066.2219%20176.591C63.2394%20178.688%2060.2564%20180.786%2057.2729%20182.883C55.3017%20180.079%2053.3299%20177.275%2051.3591%20174.47C51.3079%20174.398%2051.2572%20174.327%2051.2075%20174.255C46.345%20167.339%2041.483%20160.423%2036.6205%20153.508C39.6035%20151.411%2042.5869%20149.313%2045.5699%20147.216C46.8941%20149.1%2048.2192%20150.985%2049.5438%20152.869C48.9397%20150.478%2048.3356%20148.087%2047.7314%20145.696C50.8057%20143.535%2053.879%20141.375%2056.9523%20139.214L61.0967%20155.615C65.0184%20155.641%2068.6017%20157.571%2070.8318%20160.78L76.7466%20169.192C73.7636%20171.289%2070.7801%20173.387%2067.7971%20175.484ZM99.4388%20153.238L95.4214%20147.524C93.8935%20148.599%2092.366%20149.673%2090.8381%20150.747C92.1772%20152.651%2093.5163%20154.556%2094.8555%20156.46C91.872%20158.558%2088.889%20160.655%2085.9065%20162.752C81.6858%20156.749%2077.4651%20150.746%2073.2444%20144.742C73.2155%20144.701%2073.186%20144.659%2073.157%20144.618C68.7755%20138.386%2070.3001%20129.779%2076.5558%20125.432C82.841%20121.063%2091.3741%20122.674%2095.7257%20128.937C99.9464%20134.94%20104.167%20140.943%20108.388%20146.947C105.405%20149.044%20102.422%20151.141%2099.4388%20153.238ZM117.46%20140.568L96.8079%20111.193L105.757%20104.901L120.419%20125.756L127.197%20120.991L133.187%20129.511L117.46%20140.568ZM149.981%20117.704C146.998%20119.801%20144.015%20121.899%20141.032%20123.995C134.148%20114.204%20127.264%20104.412%20120.38%2094.6205C124.08%2092.0191%20127.781%2089.4176%20131.481%2086.8161C137.702%2082.5452%20146.202%2084.0756%20150.542%2090.2492C154.882%2096.4218%20153.446%20104.939%20147.321%20109.347C146.604%20109.851%20145.887%20110.355%20145.17%20110.86L149.981%20117.704ZM176.968%2090.1922C175.44%2091.2662%20173.912%2092.3402%20172.385%2093.4147C173.724%2095.3193%20175.063%2097.2239%20176.402%2099.1286C173.419%20101.226%20170.436%20103.323%20167.453%20105.42C163.232%2099.4174%20159.012%2093.4137%20154.791%2087.4101C154.762%2087.369%20154.732%2087.3275%20154.703%2087.2865C150.322%2081.0544%20151.846%2072.4469%20158.103%2068.0997C164.387%2063.7317%20172.92%2065.3422%20177.272%2071.6052C181.493%2077.6083%20185.714%2083.6115%20189.935%2089.6146C186.952%2091.7114%20183.968%2093.8092%20180.985%2095.9061C179.647%2094.0014%20178.307%2092.0968%20176.968%2090.1922Z'%20fill='%23FBC707'/%3e%3cpath%20d='M84.9397%20133.966C84.1898%20133.818%2083.4118%20133.984%2082.7864%20134.423C82.161%20134.863%2081.7428%20135.539%2081.6279%20136.294C81.5067%20137.091%2081.7206%20137.784%2082.1765%20138.426C82.9665%20139.55%2083.7566%20140.674%2084.5466%20141.798C86.0746%20140.723%2087.602%20139.649%2089.13%20138.576C88.3399%20137.451%2087.5504%20136.328%2086.7598%20135.204C86.3098%20134.558%2085.7307%20134.122%2084.9397%20133.966Z'%20fill='%23FBC707'/%3e%3cpath%20d='M166.487%2076.6343C165.737%2076.4865%20164.958%2076.6512%20164.333%2077.0912C163.708%2077.5311%20163.289%2078.2067%20163.175%2078.9625C163.053%2079.7593%20163.267%2080.4523%20163.723%2081.095C164.513%2082.2188%20165.303%2083.342%20166.093%2084.4663C167.621%2083.3918%20169.148%2082.3178%20170.677%2081.2433C169.887%2080.12%20169.096%2078.9963%20168.307%2077.8725C167.856%2077.2259%20167.277%2076.7908%20166.487%2076.6343Z'%20fill='%23FBC707'/%3e%3cpath%20d='M170.744%2047.3638C167.69%2048.6594%20164.585%2049.8339%20161.437%2050.8808C158.275%2051.9326%20155.068%2052.856%20151.83%2053.646C148.642%2054.4235%20145.422%2055.0725%20142.181%2055.5902C136.684%2056.4686%20131.126%2056.9685%20125.56%2057.0955C122.319%2057.1689%20119.076%2057.1158%20115.839%2056.9395C112.597%2056.7637%20109.362%2056.4648%20106.143%2056.0461C99.673%2055.2058%2093.2667%2053.8846%2086.9834%2052.1301C80.6094%2050.3496%2074.3619%2048.1243%2068.2839%2045.5069C65.2087%2044.1833%2062.1764%2042.7596%2059.192%2041.2423C53.9765%2038.5911%2048.9054%2035.6544%2043.998%2032.4682C39.0061%2029.2273%2034.1822%2025.7271%2029.5414%2022.0014C25.0401%2018.3878%2020.7108%2014.5611%2016.5615%2010.5486C14.2864%2016.8994%2012.4155%2023.3932%2010.9041%2029.9676C9.75619%2034.9605%208.81508%2040.0002%208.06902%2045.068C7.32127%2050.1429%206.76799%2055.2469%206.40276%2060.3629C6.03019%2065.5856%205.85306%2070.8209%205.86629%2076.0567C5.89343%2086.7408%206.71308%2097.4234%208.33554%20107.984C9.15616%20113.323%2010.1822%20118.632%2011.4185%20123.891C12.6599%20129.169%2014.1132%20134.398%2015.7884%20139.555C17.2241%20143.974%2018.8231%20148.34%2020.5891%20152.637C21.2816%20152.152%2021.9731%20151.668%2022.6651%20151.182C21.0049%20147.109%2019.4982%20142.973%2018.1392%20138.789C16.4848%20133.697%2015.05%20128.535%2013.8246%20123.324C12.603%20118.128%2011.5898%20112.884%2010.779%20107.608C9.1748%2097.1694%208.36519%2086.6109%208.33858%2076.0505C8.32521%2070.876%208.50046%2065.7011%208.86849%2060.5396C9.22932%2055.485%209.77584%2050.4428%2010.5146%2045.4301C11.2395%2040.5054%2012.1504%2035.6076%2013.2596%2030.7553C14.4758%2025.4335%2015.9304%2020.1659%2017.6472%2014.9842C25.3106%2022.1057%2033.5554%2028.6063%2042.316%2034.3226C47.9647%2038.0087%2053.8278%2041.3688%2059.8787%2044.3508C66.5015%2047.6144%2073.3483%2050.4245%2080.3675%2052.7111C85.4477%2054.3651%2090.6183%2055.7453%2095.8517%2056.8231C102.924%2058.2801%20110.112%2059.1856%20117.326%2059.4869C120.93%2059.6376%20124.54%2059.6376%20128.144%2059.484C131.768%2059.329%20135.385%2059.0189%20138.982%2058.551C142.596%2058.0816%20146.19%2057.4528%20149.749%2056.6666C153.356%2055.8708%20156.928%2054.9141%20160.45%2053.8001C161.145%2053.5803%20161.838%2053.3543%20162.53%2053.1225C165.268%2051.2025%20168.005%2049.2829%20170.744%2047.3638Z'%20fill='%23DB1F26'/%3e%3cpath%20d='M210.79%2097.2278C209.981%20104.276%20208.866%20111.289%20207.395%20118.229C206.542%20122.253%20205.569%20126.252%20204.468%20130.215C202.666%20136.704%20200.522%20143.098%20198.036%20149.357C196.841%20152.368%20195.567%20155.348%20194.219%20158.294C192.516%20162.015%20190.694%20165.68%20188.767%20169.291C186.005%20174.469%20183.027%20179.533%20179.883%20184.49C178.193%20187.153%20176.455%20189.786%20174.651%20192.373C172.84%20194.971%20170.962%20197.523%20169.011%20200.018C167.022%20202.561%20164.958%20205.044%20162.811%20207.455C158.259%20212.568%20153.339%20217.352%20148.11%20221.77C145.259%20224.178%20142.317%20226.477%20139.302%20228.673C136.188%20230.94%20132.995%20233.098%20129.739%20235.154C126.552%20237.166%20123.304%20239.08%20120.009%20240.909C116.451%20242.884%20112.838%20244.758%20109.182%20246.544C103.357%20242.985%2097.6477%20239.238%2092.0878%20235.278C86.9008%20231.584%2081.8442%20227.705%2076.9537%20223.626C72.0019%20219.496%2067.221%20215.162%2062.654%20210.61C58.8095%20206.78%2055.1162%20202.796%2051.602%20198.66C50.9245%20199.135%2050.2469%20199.61%2049.5694%20200.085C53.172%20204.335%2056.9609%20208.427%2060.9073%20212.36C65.5448%20216.981%2070.4005%20221.381%2075.4291%20225.573C80.5215%20229.818%2085.7916%20233.847%2091.2012%20237.68C97.003%20241.791%20102.965%20245.675%20109.048%20249.356C112.947%20247.477%20116.799%20245.501%20120.59%20243.413C124.094%20241.483%20127.546%20239.458%20130.93%20237.325C134.278%20235.215%20137.56%20232.999%20140.76%20230.669C143.823%20228.438%20146.812%20226.103%20149.706%20223.657C155.024%20219.164%20160.028%20214.299%20164.656%20209.1C166.838%20206.65%20168.936%20204.126%20170.957%20201.542C172.936%20199.011%20174.841%20196.422%20176.678%20193.787C178.503%20191.171%20180.261%20188.509%20181.969%20185.815C185.148%20180.804%20188.157%20175.684%20190.951%20170.449C192.9%20166.796%20194.743%20163.086%20196.467%20159.322C197.833%20156.338%20199.123%20153.319%20200.334%20150.269C202.851%20143.928%20205.024%20137.451%20206.85%20130.878C207.964%20126.866%20208.949%20122.818%20209.813%20118.745C211.112%20112.615%20212.137%20106.428%20212.921%20100.211C212.211%2099.2165%20211.5%2098.2227%20210.79%2097.2278Z'%20fill='%23DB1F26'/%3e%3cpath%20d='M53.2632%20160.448C53.1454%20160.532%2053.028%20160.615%2052.9097%20160.697C50.3213%20157.016%2047.7333%20153.335%2045.1449%20149.653C43.1157%20151.08%2041.0865%20152.506%2039.0577%20153.933C43.5856%20160.373%2048.1134%20166.813%2052.6412%20173.253C52.6895%20173.322%2052.7383%20173.391%2052.7871%20173.461C54.4241%20175.789%2056.0608%20178.117%2057.6983%20180.446L63.785%20176.166C62.132%20173.814%2060.4785%20171.462%2058.8255%20169.11C58.8095%20169.087%2058.7941%20169.066%2058.7791%20169.044C58.2662%20168.316%2057.7529%20167.588%2057.24%20166.861C57.9804%20166.341%2058.7202%20165.82%2059.4605%20165.299C60.7161%20164.417%2062.3846%20164.752%2063.2606%20165.991C64.9141%20168.343%2066.5686%20170.695%2068.2221%20173.047C70.2513%20171.62%2072.2805%20170.194%2074.3092%20168.767C72.6721%20166.439%2071.035%20164.11%2069.398%20161.782C67.4904%20159.038%2064.4428%20157.386%2061.085%20157.365C60.6345%20157.362%2060.1829%20157.359%2059.7324%20157.356C59.6218%20156.919%2059.5112%20156.481%2059.4006%20156.044C58.2271%20151.398%2057.0532%20146.752%2055.8792%20142.106C53.8273%20143.549%2051.7744%20144.992%2049.723%20146.435C50.9027%20151.106%2052.083%20155.778%2053.2632%20160.448Z'%20fill='%23DB1F26'/%3e%3cpath%20d='M149.111%2091.2547C145.325%2085.8697%20137.909%2084.5243%20132.479%2088.2524C129.258%2090.5168%20126.037%2092.7812%20122.817%2095.0451C129.03%20103.883%20135.243%20112.721%20141.457%20121.559C143.486%20120.132%20145.515%20118.705%20147.545%20117.28C145.94%20114.998%20144.337%20112.717%20142.733%20110.436C143.924%20109.598%20145.116%20108.759%20146.307%20107.922C151.653%20104.074%20152.897%2096.6407%20149.111%2091.2547ZM142.663%20101.784C142.556%20101.882%20142.444%20101.976%20142.329%20102.065C142.181%20102.179%20142.026%20102.283%20141.873%20102.39C141.474%20102.671%20141.075%20102.952%20140.676%20103.233C140.005%20103.705%20139.334%20104.176%20138.664%20104.648C136.767%20101.95%20134.87%2099.2518%20132.973%2096.5537C134.154%2095.7236%20135.335%2094.8935%20136.516%2094.0633C139.476%2092.0307%20143.519%2093.7987%20144.153%2097.3076C144.449%2098.9548%20143.896%20100.645%20142.663%20101.784Z'%20fill='%23DB1F26'/%3e%3cpath%20d='M130.751%20129.086L126.773%20123.427L119.994%20128.193L105.332%20107.339L99.2447%20111.618L117.885%20138.131L130.751%20129.086Z'%20fill='%23DB1F26'/%3e%3cpath%20d='M94.2919%20129.939C90.4749%20124.447%2082.9969%20123.041%2077.5008%20126.905C72.0048%20130.769%2070.7975%20138.282%2074.6724%20143.732C78.5589%20149.26%2082.4454%20154.788%2086.331%20160.315C88.3602%20158.889%2090.3894%20157.462%2092.4182%20156.036L88.4012%20150.322C90.883%20148.577%2093.3652%20146.832%2095.8464%20145.087L99.8638%20150.801C101.893%20149.375%20103.922%20147.948%20105.951%20146.522L94.2919%20129.939ZM84.1216%20144.235L80.748%20139.436C80.0226%20138.414%2079.7029%20137.25%2079.9038%20135.995C80.0985%20134.782%2080.775%20133.698%2081.7805%20132.992C82.7859%20132.285%2084.0347%20132.015%2085.2425%20132.243C86.4908%20132.479%2087.4779%20133.174%2088.1931%20134.201C89.3183%20135.801%2090.4421%20137.401%2091.5668%20139C89.0851%20140.745%2086.6034%20142.49%2084.1216%20144.235Z'%20fill='%23DB1F26'/%3e%3cpath%20d='M175.838%2072.6073C172.021%2067.1155%20164.543%2065.7093%20159.048%2069.5731C153.551%2073.4374%20152.344%2080.9501%20156.219%2086.3998C160.105%2091.9283%20163.991%2097.4557%20167.878%20102.983C169.907%20101.557%20171.936%20100.13%20173.965%2098.7036C172.626%2096.799%20171.287%2094.8948%20169.948%2092.9897C172.429%2091.2449%20174.911%2089.4997%20177.393%2087.7559C178.732%2089.66%20180.071%2091.5646%20181.41%2093.4693C183.439%2092.0427%20185.469%2090.6162%20187.497%2089.1897C183.611%2083.6617%20179.725%2078.1342%20175.838%2072.6073ZM165.668%2086.903C164.544%2085.3036%20163.419%2083.7037%20162.294%2082.1043C161.569%2081.0824%20161.25%2079.9172%20161.451%2078.663C161.645%2077.4499%20162.322%2076.3668%20163.327%2075.6602C164.332%2074.9533%20165.581%2074.6828%20166.789%2074.9117C168.037%2075.1469%20169.024%2075.8418%20169.739%2076.87C170.864%2078.4694%20171.989%2080.0688%20173.114%2081.6687L165.668%2086.903Z'%20fill='%23DB1F26'/%3e%3c/svg%3e";
//#endregion
//#region src/assets/logos/kookoo.svg
var kookoo_default = "data:image/svg+xml,%3csvg%20width='256'%20height='242'%20viewBox='0%200%20256%20242'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M33.8771%20119.679C34.0031%20119.72%2034.1283%20119.765%2034.2525%20119.811C34.7008%20119.036%2035.1011%20118.348%2035.4633%20117.728C35.5964%20117.501%2035.742%20117.277%2035.8955%20117.063C36.3278%20116.46%2037.4773%20114.859%2039.5517%20113.804L39.5739%20113.793C43.3081%20111.907%2047.3876%20109.91%2052.4107%20107.507C53.5682%20106.954%2054.8668%20106.661%2056.1662%20106.661C57.5465%20106.661%2058.9205%20106.989%2060.141%20107.609C60.3319%20107.707%2060.5236%20107.814%2060.7118%20107.928C60.9488%20108.023%2061.1804%20108.127%2061.4014%20108.239C63.8193%20109.46%2065.5005%20111.683%2066.0127%20114.336C66.0277%20114.413%2066.0411%20114.491%2066.0544%20114.569C66.3216%20116.189%2066.128%20117.83%2065.5103%20119.316C74.0838%20115.411%2082.9485%20111.548%2092.4701%20107.568C92.5526%20107.533%2092.6352%20107.5%2092.7186%20107.468L115.761%2098.6693C115.005%2097.1719%20114.695%2095.4686%20114.898%2093.7759C115.417%2089.4371%20116.602%2085.9683%20118.523%2083.1696C120.635%2080.0913%20123.617%2077.8616%20127.384%2076.5417C132.408%2074.7816%20137.574%2073.0374%20142.737%2071.3562L142.766%2071.3473C143.684%2071.0509%20144.637%2070.9009%20145.592%2070.9009C147.091%2070.9009%20148.555%2071.2728%20149.862%2071.982C150.18%2071.555%20150.474%2071.1636%20150.748%2070.8006C150.93%2070.5591%20151.127%2070.3248%20151.334%2070.1047C151.871%2069.5313%20153.296%2068.0081%20155.696%2067.2723C159.559%2066.0837%20163.792%2064.8375%20168.634%2063.4608C168.701%2063.4413%20168.767%2063.4235%20168.832%2063.4067C169.545%2063.2229%20170.278%2063.1288%20171.011%2063.1288C172.607%2063.1288%20174.168%2063.5673%20175.538%2064.3972C176.193%2064.66%20176.814%2065.0008%20177.387%2065.4118C179.467%2066.9012%20180.78%2069.2126%20180.991%2071.753C181.173%2073.9383%20180.538%2076.0766%20179.2%2077.7995C187.443%2075.5769%20195.886%2073.5318%20207.09%2071.0322C207.12%2071.0251%20207.152%2071.0189%20207.185%2071.0118L210.719%2070.2636C212.908%2060.5849%20217.711%2050.8876%20225.378%2040.656L225.941%2039.9041L206.598%2022.7153L206.025%2022.9239C196.081%2026.548%20184.835%2028.4635%20173.504%2028.4635C156.234%2028.4635%20139.155%2024.0875%20125.411%2016.1415L124.899%2015.8459L124.386%2016.1424C110.532%2024.1692%2093.3284%2028.5896%2075.9452%2028.5896C64.5827%2028.5896%2053.3107%2026.6679%2043.3472%2023.0322L42.7764%2022.8236L23.3676%2039.937L23.933%2040.6914C34.8863%2055.3168%2039.9875%2068.7608%2039.9875%2082.9983C39.9875%2091.9642%2038.1119%20100.302%2036.1254%20109.128C35.3479%20112.578%2034.5481%20116.132%2033.8771%20119.679ZM19.0529%20145.802C19.0511%20145.849%2019.0502%20145.896%2019.0493%20145.942C18.9978%20148.494%2018.9463%20151.042%2018.8966%20153.571C18.8407%20156.141%2018.7608%20158.777%2018.6827%20161.327L18.6818%20161.351C18.5265%20166.452%2018.365%20171.727%2018.3934%20176.737V176.757C18.3925%20176.887%2018.3792%20177.487%2018.3614%20178.32C18.2931%20181.479%2018.2647%20182.783%2018.2948%20182.988C18.2984%20183.008%2018.3028%20183.026%2018.3081%20183.047C18.3951%20183.43%2018.6179%20183.721%2018.9375%20183.87C19.0804%20183.936%2019.2313%20183.971%2019.3857%20183.971C19.5597%20183.971%2019.731%20183.928%2019.8943%20183.845L19.8997%20183.842C23.5141%20181.964%2026.7397%20180.309%2029.7621%20178.78C30.4402%20178.438%2030.8183%20177.57%2030.8432%20176.889V176.885C31.0314%20170.914%2031.2231%20164.678%2031.3687%20159.913L31.3802%20159.525L32.8829%20156.918L34.3058%20158.467C38.6463%20163.19%2041.8888%20166.812%2044.8224%20170.212C45.0718%20170.502%2045.4446%20170.667%2045.8467%20170.667C46.0668%20170.667%2046.2799%20170.618%2046.4814%20170.523L46.4849%20170.522C50.2839%20168.693%2053.4501%20167.176%2056.7166%20165.684L56.7281%20165.679C56.9003%20165.597%2057.0432%20165.483%2057.1533%20165.338L57.5421%20164.827L58.1785%20164.741C58.7093%20164.67%2059.2534%20164.508%2059.7957%20164.259C65.8822%20161.461%2071.981%20158.745%2077.9219%20156.188C82.2278%20154.334%2084.1903%20151.089%2084.6936%20144.987C84.8427%20143.231%2084.912%20141.171%2084.9856%20138.991C85.0637%20136.684%2085.1445%20134.299%2085.3265%20132.318C85.5155%20130.266%2085.7925%20128.899%2086.1502%20128.256L86.199%20128.169L86.2585%20128.088C86.7316%20127.45%2087.3618%20127.141%2088.7429%20126.464C88.9267%20126.374%2089.1211%20126.278%2089.3279%20126.176L91.8079%20124.948L91.5496%20127.703C91.4662%20128.597%2091.3819%20129.488%2091.2984%20130.365L91.2966%20130.385C90.9425%20134.138%2090.5759%20138.011%2090.2697%20141.761C90.1942%20142.693%2090.2031%20143.561%2090.2972%20144.339C90.5351%20146.31%2091.2931%20147.726%2092.4878%20148.433C93.0497%20148.766%2093.6888%20148.936%2094.3856%20148.936C95.0114%20148.936%2095.6673%20148.8%2096.3357%20148.533C102.525%20146.052%20108.766%20143.642%20114.886%20141.367C117.072%20140.555%20118.688%20139.323%20119.826%20137.604C121.017%20135.804%20121.741%20133.455%20122.103%20130.213C122.303%20128.469%20122.443%20126.439%20122.591%20124.291C122.755%20121.908%20122.924%20119.445%20123.182%20117.398C123.364%20115.95%20123.681%20114.053%20124.155%20113.241L124.224%20113.122L124.314%20113.018C124.751%20112.505%20125.476%20112.151%20126.824%20111.521C127.145%20111.371%20127.509%20111.201%20127.896%20111.013L130.471%20109.766L130.098%20112.603C130.023%20113.181%20129.863%20114.39%20129.863%20114.39C129.243%20119.088%20128.659%20123.521%20128.206%20128.257C128.193%20128.382%20128.123%20128.975%20128.011%20129.937L128%20130.028C127.49%20134.356%20127.41%20135.064%20127.426%20135.247L125.889%20135.396L127.427%20135.259C127.465%20135.666%20127.66%20136.013%20127.962%20136.206C128.131%20136.314%20128.325%20136.371%20128.523%20136.371C128.645%20136.371%20128.769%20136.35%20128.889%20136.307C131.867%20135.263%20135.029%20134.178%20139.145%20132.788C139.877%20132.541%20140.356%20131.657%20140.45%20130.91C140.731%20128.617%20141.013%20126.319%20141.296%20124.02C141.771%20120.144%20142.247%20116.268%20142.725%20112.393L142.772%20112.011L144.456%20109.608L145.701%20111.534C148.096%20115.239%20151.679%20120.821%20155.137%20126.489C155.385%20126.896%20155.866%20127.159%20156.363%20127.159C156.5%20127.159%20156.633%20127.139%20156.76%20127.1L157.447%20126.887C160.791%20125.848%20164.246%20124.775%20167.611%20123.817C167.796%20123.764%20167.964%20123.665%20168.1%20123.529L168.572%20123.056L169.24%20123.077C169.29%20123.079%20169.34%20123.08%20169.39%20123.08C169.874%20123.08%20170.377%20123.005%20170.885%20122.857C177.425%20120.959%20183.878%20119.172%20190.069%20117.543C192.33%20116.948%20194.004%20115.843%20195.183%20114.166C196.403%20112.433%20197.138%20110.092%20197.496%20106.801C197.69%20105.063%20197.833%20103.035%20197.984%20100.888L199.524%20100.984L197.985%20100.876C198.15%2098.5343%20198.32%2096.1138%20198.563%2094.1086C198.799%2092.1497%20199.076%2090.8155%20199.387%2090.1427L199.537%2089.8178L199.815%2089.5924C200.279%2089.2151%20200.965%2088.9507%20202.872%2088.4136L205.073%2087.7933L204.628%2091.8567C204.165%2096.0667%20203.687%20100.421%20203.281%20104.726C203.191%20105.682%20203.188%20106.588%20203.274%20107.42C203.558%20110.143%20204.671%20111.463%20205.556%20112.091C206.28%20112.605%20207.155%20112.877%20208.088%20112.877C208.488%20112.877%20208.9%20112.827%20209.312%20112.73C215.597%20111.241%20221.98%20109.817%20228.281%20108.499C230.561%20108.021%20232.143%20107.028%20233.259%20105.373C234.384%20103.706%20234.987%20101.413%20235.159%2098.1588C235.267%2096.2176%20235.291%2093.8423%20235.315%2091.5451C235.355%2087.6955%20235.416%2084.1086%20235.72%2082.5225L235.89%2081.641L236.739%2081.3526C237.021%2081.2567%20237.369%2081.152%20237.624%2081.0747C238.921%2080.6824%20240.882%2080.0904%20242.486%2078.7483C244.376%2077.1683%20245.35%2074.9297%20245.466%2071.9056C245.477%2071.6322%20245.363%2071.3748%20245.154%2071.199C244.995%2071.0659%20244.794%2070.9922%20244.587%2070.9922C244.526%2070.9922%20244.464%2070.9984%20244.405%2071.0108L208.76%2078.5539C194.75%2081.6792%20185.202%2084.0581%20174.71%2087.0369C172.476%2087.6716%20170.813%2088.7811%20169.626%2090.4294C168.388%2092.1487%20167.622%2094.4512%20167.213%2097.676C167.003%2099.3092%20166.787%20100.95%20166.572%20102.597L166.57%20102.609C166.165%20105.696%20165.746%20108.888%20165.358%20112.051L164.884%20115.908L162.583%20112.778C161.588%20111.424%20160.547%20110.057%20159.542%20108.735C157.747%20106.375%20156.054%20104.149%20154.779%20102.226C153.491%20100.285%20152.79%2098.8805%20152.696%2098.0515L152.678%2097.8872L152.695%2097.723C152.809%2096.5886%20154.028%2094.4646%20156.318%2091.4102C158.488%2088.5157%20161.351%2085.1383%20164.12%2081.8718C166.557%2078.9977%20168.855%2076.286%20170.694%2073.9054C170.773%2073.8033%20170.853%2073.7003%20170.933%2073.5974L170.977%2073.5415C171.222%2073.2272%20171.472%2072.905%20171.701%2072.5891L171.744%2072.5305L171.792%2072.4763C171.967%2072.2775%20172.05%2072.0201%20172.028%2071.7493C172.005%2071.4653%20171.855%2071.2052%20171.618%2071.0348C171.439%2070.907%20171.218%2070.8369%20170.996%2070.8369C170.914%2070.8369%20170.834%2070.8466%20170.759%2070.8662L170.744%2070.8697C165.952%2072.2322%20161.77%2073.4642%20157.955%2074.6377C157.516%2074.7717%20157.207%2075.1028%20156.959%2075.3682C156.937%2075.3904%20156.918%2075.4144%20156.899%2075.4392C154.938%2078.0391%20152.165%2081.8514%20149.717%2085.2155L145.46%2091.0676L146.259%2085.0389C146.79%2081.0366%20146.882%2080.0921%20146.861%2079.8649C146.83%2079.5356%20146.703%2079.0882%20146.277%2078.8077C146.078%2078.6764%20145.839%2078.6071%20145.586%2078.6071C145.431%2078.6071%20145.273%2078.6329%20145.116%2078.6835C140.008%2080.3469%20134.897%2082.0724%20129.93%2083.8122C125.482%2085.37%20123.274%2088.6231%20122.549%2094.6874C122.513%2094.9891%20122.639%2095.2936%20122.876%2095.4818C123.031%2095.6043%20123.225%2095.6717%20123.423%2095.6717C123.526%2095.6717%20123.627%2095.654%20123.725%2095.6185C125.65%2094.9155%20127.745%2094.1637%20130.129%2093.3186L132.559%2092.4576L132.171%2095.006C132.144%2095.1818%20132.122%2095.3406%20132.103%2095.4907C131.925%2096.9801%20131.745%2098.4864%20131.565%2099.9954L131.455%20100.922L95.4675%20114.663L95.4401%20114.674C83.1562%20119.81%2071.8985%20124.78%2061.0286%20129.87C56.6917%20131.9%2054.7079%20135.357%2054.3936%20141.425C54.2853%20143.408%2054.1664%20145.465%2054.0608%20147.28C53.9063%20149.945%2053.7466%20152.7%2053.6089%20155.404L53.4306%20158.887L50.9718%20156.413C49.778%20155.211%2048.5149%20153.991%2047.2944%20152.812C45.4685%20151.048%2043.7439%20149.381%2042.4001%20147.922C41.1352%20146.548%2040.3478%20145.499%2040.0603%20144.807L39.9183%20144.464L39.9476%20144.094C40.0389%20142.932%2041.0473%20140.73%2042.9451%20137.55C44.8162%20134.414%2047.337%20130.684%2049.7744%20127.077C52.1035%20123.63%2054.2996%20120.38%2056.0029%20117.57C56.088%20117.429%2056.175%20117.288%2056.2612%20117.147L56.2701%20117.133C56.4929%20116.769%2056.7237%20116.392%2056.9323%20116.022L56.9678%20115.959L57.0086%20115.9C57.1532%20115.691%2057.2101%20115.435%2057.1683%20115.179L57.1639%20115.156C57.1088%20114.861%2056.9242%20114.617%2056.6456%20114.475C56.499%20114.401%2056.3331%20114.361%2056.1661%20114.361C56.0144%20114.361%2055.8653%20114.394%2055.734%20114.457C50.7623%20116.834%2046.7281%20118.809%2043.0392%20120.672C42.6424%20120.874%2042.3832%20121.235%2042.155%20121.553C42.1391%20121.575%2042.124%20121.598%2042.1098%20121.622C40.5715%20124.247%2038.4989%20127.88%2036.4937%20131.394L36.4813%20131.416C36.0526%20132.167%2035.6053%20132.951%2035.157%20133.736L32.0699%20139.141L32.2749%20132.92C32.3947%20129.281%2032.3859%20128.275%2032.3574%20128.073L32.353%20128.052C32.2607%20127.597%2032.0023%20127.239%2031.6429%20127.067C31.4823%20126.991%2031.3083%20126.952%2031.1254%20126.952C30.8991%20126.952%2030.662%20127.013%2030.4383%20127.129C25.5627%20129.682%2020.5583%20132.365%2015.5662%20135.104C13.4244%20136.279%2011.888%20137.775%2010.869%20139.679C9.83391%20141.612%209.30408%20144.022%209.24727%20147.046C9.24106%20147.361%209.40518%20147.656%209.67422%20147.818C9.81091%20147.9%209.96802%20147.944%2010.1277%20147.944C10.2777%20147.944%2010.4252%20147.906%2010.5565%20147.833C12.7623%20146.604%2014.794%20145.481%2016.7672%20144.4L19.1363%20143.102L19.0529%20145.802ZM42.5492%20177.78C44.8117%20181.529%2047.424%20185.067%2050.3523%20188.347C62.8705%20202.364%2081.3916%20208.084%2097.7319%20213.131C107.711%20216.211%20117.135%20219.121%20124.073%20223.771L124.642%20224.153L125.211%20223.772C132.15%20219.122%20141.577%20216.212%20151.557%20213.131C167.896%20208.084%20186.415%20202.363%20198.931%20188.348C210.947%20174.889%20217.299%20157.551%20217.299%20138.21C217.299%20132.493%20216.739%20126.862%20215.492%20120.14C214.447%20120.382%20213.402%20120.628%20212.369%20120.872C211.365%20121.109%20210.35%20121.229%20209.352%20121.229C207.223%20121.229%20205.143%20120.676%20203.33%20119.63C203.117%20119.539%20202.907%20119.442%20202.7%20119.339C200.466%20122.467%20197.307%20124.586%20193.312%20125.638C187.218%20127.241%20180.826%20129.011%20174.314%20130.9C173.714%20131.075%20173.099%20131.208%20172.483%20131.298C172%20131.536%20171.501%20131.73%20170.993%20131.874C167.718%20132.807%20164.307%20133.865%20161.01%20134.89L160.301%20135.11C159.426%20135.377%20158.526%20135.513%20157.621%20135.513C155.961%20135.513%20154.337%20135.061%20152.915%20134.205C151.592%20133.669%20150.409%20132.821%20149.472%20131.751L149.377%20132.532C148.895%20136.342%20146.353%20139.562%20142.902%20140.73C138.888%20142.085%20135.654%20143.194%20132.721%20144.223C131.774%20144.556%20130.791%20144.724%20129.798%20144.724C128.625%20144.724%20127.469%20144.486%20126.393%20144.029C124.455%20146.344%20121.923%20148.091%20118.852%20149.234C112.796%20151.485%20106.615%20153.873%20100.484%20156.329C98.9098%20156.96%2097.2908%20157.278%2095.6718%20157.278C94.0092%20157.278%2092.3875%20156.931%2090.9176%20156.267C90.7827%20156.509%2090.6433%20156.746%2090.5004%20156.977C88.5761%20160.081%2085.8777%20162.349%2082.2509%20163.911C76.3677%20166.443%2070.3274%20169.133%2064.2969%20171.905C63.7261%20172.167%2063.1403%20172.39%2062.55%20172.569C62.1328%20172.858%2061.6926%20173.11%2061.2372%20173.32L61.2017%20173.336C57.9814%20174.808%2054.7265%20176.368%2051.1103%20178.108L51.0668%20178.13C49.8313%20178.716%2048.5087%20179.014%2047.1382%20179.014C45.5165%20179.014%2043.9365%20178.588%2042.5492%20177.78ZM120.473%20235.684C115.486%20230.886%20105.715%20227.87%2094.4024%20224.377C77.5127%20219.16%2056.5018%20212.67%2041.8515%20196.261C39.0928%20193.172%2036.5577%20189.864%2034.2996%20186.412C31.3003%20187.929%2028.1697%20189.536%2024.7381%20191.321L24.6982%20191.342C23.4502%20191.984%2022.0557%20192.324%2020.6692%20192.324C19.3786%20192.324%2018.1262%20192.043%2016.9456%20191.489C16.6634%20191.357%2016.3838%20191.207%2016.1139%20191.043C15.9488%20190.977%2015.8042%20190.914%2015.6648%20190.849C13.1874%20189.687%2011.4131%20187.471%2010.7962%20184.769C10.5388%20183.648%2010.5405%20183.545%2010.6577%20178.155L10.6595%20178.069C10.671%20177.514%2010.6843%20176.918%2010.6879%20176.723C10.6604%20171.592%2010.8228%20166.269%2010.9799%20161.121C11.0278%20159.536%2011.0776%20157.912%2011.1219%20156.289C9.66623%20156.241%208.24426%20155.822%206.99271%20155.071C6.97673%20155.061%206.96164%20155.052%206.94566%20155.042C6.51783%20154.872%206.10331%20154.666%205.71097%20154.431C3.08361%20152.854%201.48766%20149.971%201.54446%20146.908C1.62524%20142.591%202.52085%20138.854%204.20734%20135.8C5.91513%20132.708%208.49013%20130.202%2011.8613%20128.352C15.0905%20126.582%2018.3747%20124.806%2021.6359%20123.069C22.496%20117.235%2023.7227%20111.786%2024.9103%20106.51C27.2758%2095.9976%2029.3182%2086.9189%2028.064%2077.037C26.6847%2066.1743%2021.3243%2055.4163%2011.1938%2043.1795L7.35219%2038.5381L40.5494%209.27398L41.4672%209.70714C51.3163%2014.3574%2063.1004%2016.8152%2075.5466%2016.8152C93.6586%2016.8152%20111.318%2011.613%20123.995%202.54409L124.893%201.90135L125.792%202.54409C138.402%2011.5649%20155.903%2016.739%20173.805%2016.739H173.81C186.225%2016.738%20198.025%2014.2651%20207.931%209.5873L208.854%209.15156L241.929%2038.5425L238.09%2043.1795C230.902%2051.8631%20226.089%2059.8721%20223.44%2067.5767L242.812%2063.4777C243.395%2063.3543%20243.993%2063.2913%20244.588%2063.2913C246.166%2063.2913%20247.706%2063.7236%20249.052%2064.5429C249.907%2064.8837%20250.698%2065.3577%20251.404%2065.9524C253.442%2067.67%20254.553%2070.1828%20254.451%2072.8465C254.202%2079.3716%20251.195%2083.2247%20248.718%2085.307C247.457%2086.3668%20246.029%2087.2376%20244.375%2087.9539C244.334%2089.4204%20244.317%2091.0295%20244.305%2092.2678C244.28%2094.6475%20244.255%2097.1071%20244.139%2099.2143C243.889%20103.921%20242.87%20107.453%20240.932%20110.327C238.687%20113.657%20235.394%20115.797%20231.145%20116.687C229.732%20116.983%20228.254%20117.297%20226.732%20117.625C228.163%20125.263%20228.805%20131.669%20228.805%20138.212C228.805%20160.533%20221.414%20180.607%20207.433%20196.263C192.781%20212.672%20171.771%20219.162%20154.89%20224.377C143.57%20227.871%20133.801%20230.887%20128.812%20235.686L124.641%20239.697L120.473%20235.684Z'%20fill='black'/%3e%3cpath%20d='M172.945%20132.789C173.552%20132.69%20174.156%20132.554%20174.748%20132.381C181.245%20130.497%20187.623%20128.73%20193.705%20127.131C195.871%20126.561%20197.84%20125.684%20199.559%20124.525C200.903%20123.619%20202.106%20122.532%20203.146%20121.286C205.05%20122.261%20207.18%20122.773%20209.353%20122.773C210.471%20122.773%20211.604%20122.639%20212.723%20122.375C213.233%20122.254%20213.746%20122.134%20214.262%20122.012C215.292%20127.947%20215.758%20133.046%20215.758%20138.209C215.758%20157.165%20209.542%20174.147%20197.781%20187.319C192.354%20193.397%20185.277%20198.413%20176.147%20202.651C167.986%20206.44%20159.403%20209.092%20151.103%20211.655C141.147%20214.728%20131.738%20217.632%20124.643%20222.296C117.549%20217.633%20108.14%20214.729%2098.1881%20211.656C89.8871%20209.093%2081.3029%20206.441%2073.1411%20202.651C64.0101%20198.412%2056.9331%20193.397%2051.5044%20187.317C49.5765%20185.159%2047.7888%20182.884%2046.1511%20180.509C46.4778%20180.539%2046.808%20180.554%2047.1382%20180.554C48.7395%20180.554%2050.2848%20180.206%2051.7325%20179.518L51.7805%20179.495C55.3878%20177.758%2058.6356%20176.202%2061.8443%20174.736L61.847%20174.734L61.8497%20174.732L61.8577%20174.729L61.8683%20174.725L61.8843%20174.717C62.3467%20174.503%2062.795%20174.254%2063.2246%20173.972C63.8042%20173.785%2064.3794%20173.562%2064.9395%20173.304C70.9585%20170.538%2076.9872%20167.853%2082.8606%20165.324C86.6384%20163.698%2089.4912%20161.354%2091.5682%20158.169C92.8766%20158.596%2094.2613%20158.817%2095.6717%20158.817C97.4878%20158.817%2099.2994%20158.461%20101.056%20157.758C107.178%20155.305%20113.346%20152.923%20119.39%20150.676C122.35%20149.575%20124.851%20147.951%20126.853%20145.83C127.805%20146.115%20128.796%20146.263%20129.798%20146.263C130.966%20146.263%20132.12%20146.065%20133.233%20145.674C136.157%20144.648%20139.386%20143.54%20143.394%20142.188C146.795%20141.036%20149.433%20138.185%20150.494%20134.664C151.04%20135.023%20151.618%20135.332%20152.222%20135.585C153.859%20136.545%20155.719%20137.052%20157.62%20137.052C158.679%20137.052%20159.732%20136.894%20160.748%20136.582C160.761%20136.579%20160.774%20136.574%20160.787%20136.571L161.467%20136.359L161.473%20136.358C164.76%20135.337%20168.16%20134.281%20171.418%20133.353C171.938%20133.209%20172.449%20133.02%20172.945%20132.789ZM209.1%2080.062L243.864%2072.7054C243.635%2074.8339%20242.857%2076.4299%20241.498%2077.566C240.135%2078.7057%20238.427%2079.2214%20237.18%2079.5986C236.898%2079.6839%20236.548%2079.7895%20236.245%2079.8925L234.546%2080.4704L234.208%2082.2331C233.878%2083.9471%20233.816%2087.4586%20233.775%2091.531C233.751%2093.8113%20233.727%2096.1697%20233.622%2098.0719V98.079C233.466%20101.042%20232.945%20103.086%20231.983%20104.512C231.107%20105.813%20229.831%20106.6%20227.968%20106.99C221.652%20108.312%20215.256%20109.738%20208.958%20111.23C208.665%20111.299%20208.372%20111.335%20208.091%20111.335C207.472%20111.335%20206.92%20111.166%20206.453%20110.834C205.557%20110.198%20204.99%20108.962%20204.812%20107.261C204.737%20106.532%20204.74%20105.729%20204.82%20104.875C205.224%20100.582%20205.702%2096.2346%20206.164%2092.0307L206.187%2091.8204C206.245%2091.2914%20206.304%2090.7633%20206.361%2090.236L206.859%2085.6887L202.457%2086.9287C200.507%2087.4781%20199.574%2087.803%20198.846%2088.395L198.29%2088.8459L197.99%2089.4948C197.745%2090.0248%20197.379%2091.0606%20197.034%2093.9232C196.788%2095.9656%20196.616%2098.4048%20196.449%20100.763L196.448%20100.774C196.298%20102.908%20196.155%20104.922%20195.965%20106.624L195.965%20106.629L195.964%20106.633C195.635%20109.655%20194.986%20111.765%20193.923%20113.278C192.948%20114.663%20191.599%20115.544%20189.678%20116.05C183.476%20117.682%20177.008%20119.473%20170.458%20121.374C170.088%20121.481%20169.73%20121.535%20169.392%20121.535C169.359%20121.535%20169.326%20121.535%20169.293%20121.534L167.955%20121.49L167.086%20122.361C163.738%20123.317%20160.311%20124.381%20156.997%20125.41L156.99%20125.412L156.4%20125.595C152.949%20119.94%20149.384%20114.387%20146.998%20110.695L144.511%20106.847L141.289%20111.439L141.194%20112.203C140.717%20116.079%20140.241%20119.955%20139.765%20123.831C139.484%20126.126%20139.202%20128.422%20138.919%20130.717C138.884%20130.996%20138.722%20131.263%20138.637%20131.329C134.813%20132.619%20131.813%20133.648%20129.022%20134.623C129.105%20133.848%20129.278%20132.372%20129.534%20130.206L129.548%20130.088C129.673%20129.022%20129.73%20128.541%20129.742%20128.419L129.743%20128.411L129.744%20128.403C130.194%20123.695%20130.777%20119.276%20131.394%20114.598L131.395%20114.591L131.421%20114.394C131.49%20113.867%20131.56%20113.337%20131.63%20112.803L132.375%20107.13L127.225%20109.624C126.846%20109.807%20126.487%20109.975%20126.171%20110.122C124.752%20110.786%20123.816%20111.224%20123.141%20112.015L122.963%20112.224L122.824%20112.462C122.51%20113.001%20122.046%20114.079%20121.653%20117.205C121.39%20119.295%20121.218%20121.78%20121.052%20124.183C120.906%20126.314%20120.767%20128.327%20120.571%20130.032V130.036L120.57%20130.041C120.236%20133.031%20119.591%20135.163%20118.539%20136.752C117.575%20138.209%20116.243%20139.215%20114.349%20139.919C108.217%20142.198%20101.964%20144.614%2095.7623%20147.099C95.2776%20147.293%2094.8152%20147.391%2094.3864%20147.391C93.9702%20147.391%2093.5965%20147.294%2093.2751%20147.104C92.5082%20146.65%2092.0085%20145.629%2091.8301%20144.152C91.7484%20143.477%2091.7413%20142.713%2091.8088%20141.884C92.1141%20138.15%2092.4789%20134.284%2092.8322%20130.546L92.834%20130.53C92.9174%20129.647%2093.0026%20128.748%2093.087%20127.847L93.6036%20122.338L88.6444%20124.793C88.4438%20124.892%2088.2547%20124.985%2088.0772%20125.072L88.0657%20125.077C86.5514%20125.819%2085.717%20126.228%2085.0202%20127.168L84.9004%20127.33L84.8028%20127.506C84.5036%20128.044%2084.0722%20129.114%2083.7909%20132.175C83.6045%20134.203%2083.5228%20136.609%2083.4447%20138.937C83.3719%20141.099%2083.3027%20143.139%2083.1571%20144.852V144.86C82.6325%20151.223%2080.4419%20153.423%2077.3139%20154.77C71.3615%20157.333%2065.2519%20160.053%2059.1531%20162.857C58.7519%20163.042%2058.356%20163.161%2057.977%20163.211L56.7041%20163.381L55.9913%20164.319C52.7657%20165.793%2049.6368%20167.292%2045.8991%20169.091C42.9805%20165.711%2039.7514%20162.104%2035.4464%20157.421L32.5998%20154.323L29.8535%20159.088L29.8295%20159.863C29.683%20164.631%2029.4913%20170.868%2029.304%20176.832V176.834C29.296%20177.062%2029.154%20177.344%2029.0697%20177.401C26.2248%20178.839%2023.1981%20180.391%2019.834%20182.137C19.8428%20181.422%2019.8695%20180.185%2019.9094%20178.352C19.9316%20177.338%2019.9405%20176.894%2019.9414%20176.766V176.725C19.913%20171.744%2020.0736%20166.484%2020.2289%20161.397C20.3071%20158.834%2020.3878%20156.187%2020.4438%20153.605V153.599C20.4935%20151.072%2020.5449%20148.527%2020.5964%20145.974C20.5973%20145.933%2020.5982%20145.89%2020.6%20145.848L20.7677%20140.45L16.0314%20143.045C14.3653%20143.959%2012.6593%20144.9%2010.845%20145.909C10.9932%20143.68%2011.4512%20141.873%2012.235%20140.408C13.1208%20138.754%2014.4168%20137.499%2016.3145%20136.457C21.1858%20133.786%2026.0695%20131.165%2030.8369%20128.667C30.8378%20129.228%2030.8183%20130.406%2030.7375%20132.87L30.3283%20145.312L36.5035%20134.503C36.9385%20133.742%2037.3716%20132.981%2037.7888%20132.251L37.8385%20132.163C39.833%20128.668%2041.895%20125.053%2043.4315%20122.431C43.53%20122.294%2043.6773%20122.091%2043.7483%20122.048C47.013%20120.4%2050.5502%20118.663%2054.7709%20116.635C54.7425%20116.682%2054.714%20116.729%2054.6856%20116.775C53.0036%20119.55%2050.8183%20122.785%2048.5034%20126.211L48.4998%20126.216C46.0508%20129.841%2043.5176%20133.589%2041.6243%20136.763C38.8948%20141.337%2038.4838%20143.071%2038.4128%20143.977L38.3551%20144.717L38.6392%20145.401C39.0013%20146.274%2039.8614%20147.441%2041.2692%20148.97C42.6432%20150.463%2044.3839%20152.144%2046.2275%20153.925C47.4435%20155.099%2048.7004%20156.313%2049.8827%20157.504L54.7993%20162.454L55.1552%20155.486C55.2928%20152.79%2055.4526%20150.036%2055.607%20147.373C55.7117%20145.567%2055.8307%20143.518%2055.9399%20141.518V141.509C56.0863%20138.669%2056.626%20136.487%2057.5891%20134.838C58.4936%20133.29%2059.7957%20132.158%2061.6872%20131.272C72.5358%20126.193%2083.7696%20121.232%2096.0321%20116.105L132.883%20102.034L133.103%20100.181C133.282%2098.6738%20133.461%2097.1684%20133.641%2095.6736C133.658%2095.5414%20133.677%2095.4002%20133.701%2095.2422L134.479%2090.1446L129.619%2091.8666C127.655%2092.5625%20125.884%2093.1971%20124.238%2093.7944C124.613%2091.484%20125.251%2089.6981%20126.179%2088.356C127.17%2086.9243%20128.525%2085.9443%20130.446%2085.2715C135.308%2083.5691%20140.305%2081.879%20145.306%2080.2494C145.213%2081.2391%20144.861%2083.8877%20144.735%2084.8384L143.132%2096.8976L150.959%2086.1369C153.396%2082.7871%20156.156%2078.9925%20158.111%2076.4015C158.207%2076.2993%20158.346%2076.1529%20158.415%2076.1157C161.798%2075.0754%20165.468%2073.9889%20169.598%2072.8066C169.556%2072.8608%20169.514%2072.914%20169.472%2072.9682C167.658%2075.3177%20165.372%2078.0143%20162.951%2080.8698L162.945%2080.8769C160.16%2084.1611%20157.282%2087.5563%20155.084%2090.488C151.797%2094.8721%20151.26%2096.5762%20151.161%2097.5713L151.128%2097.8997L151.165%2098.2282C151.244%2098.9232%20151.571%20100.182%20153.494%20103.082C154.797%20105.046%20156.504%20107.291%20158.312%20109.667L158.316%20109.671C159.318%20110.99%20160.355%20112.352%20161.342%20113.694L165.945%20119.955L166.892%20112.242C167.28%20109.087%20167.698%20105.898%20168.102%20102.815L168.104%20102.8C168.316%20101.185%20168.535%2099.5135%20168.745%2097.8785L168.746%2097.8749L168.747%2097.8714C169.122%2094.9119%20169.8%2092.8349%20170.881%2091.333C171.87%2089.959%20173.222%2089.0661%20175.135%2088.5238C185.593%2085.5546%20195.118%2083.182%20209.1%2080.062ZM75.946%2030.1358C84.6536%2030.1358%2093.2911%2029.0635%20101.619%2026.9474C110.024%2024.8127%20117.855%2021.6785%20124.9%2017.6301C131.89%2021.6377%20139.662%2024.7399%20148.007%2026.8533C156.275%2028.9473%20164.853%2030.0089%20173.504%2030.0089C179.206%2030.0089%20184.883%2029.5393%20190.378%2028.6135C195.884%2027.6859%20201.225%2026.2959%20206.261%2024.4817L223.855%2040.1171C219.939%2045.3835%20216.841%2050.3931%20214.392%2055.419C212.167%2059.9821%20210.538%2064.4319%20209.439%2068.9588L206.862%2069.5037C206.824%2069.5118%20206.787%2069.5197%20206.752%2069.5277C197.029%2071.697%20189.38%2073.5247%20182.135%2075.4233C182.5%2074.2081%20182.637%2072.9238%20182.528%2071.6252C182.281%2068.6338%20180.734%2065.9116%20178.286%2064.1585C177.646%2063.7004%20176.955%2063.316%20176.23%2063.0143C174.645%2062.0797%20172.847%2061.587%20171.012%2061.587C170.147%2061.587%20169.284%2061.6971%20168.445%2061.9137C168.368%2061.934%20168.29%2061.9544%20168.212%2061.9766C163.358%2063.3561%20159.116%2064.6067%20155.24%2065.7988C152.45%2066.6535%20150.82%2068.3951%20150.207%2069.0501C149.962%2069.312%20149.73%2069.588%20149.515%2069.8721C149.468%2069.9342%20149.421%2069.9972%20149.373%2070.0612C148.174%2069.5988%20146.893%2069.359%20145.591%2069.359C144.474%2069.359%20143.363%2069.5347%20142.287%2069.8809L142.261%2069.889C137.083%2071.5745%20131.906%2073.3232%20126.873%2075.0859C122.79%2076.5159%20119.552%2078.9418%20117.25%2082.2971C115.185%2085.3061%20113.914%2089.0005%20113.365%2093.5929C113.194%2095.0159%20113.331%2096.4441%20113.746%2097.787L92.1683%20106.027C92.0689%20106.065%2091.9712%20106.104%2091.8754%20106.144C83.3808%20109.695%2075.4064%20113.154%2067.6947%20116.632C67.7426%20115.866%2067.7036%20115.09%2067.5766%20114.319C67.5607%20114.223%2067.5438%20114.13%2067.5269%20114.04C66.9233%20110.918%2064.9439%20108.3%2062.0964%20106.861C61.8728%20106.748%2061.6402%20106.642%2061.4032%20106.543C61.2168%20106.433%2061.0286%20106.329%2060.8404%20106.234C59.4052%20105.503%2057.7888%20105.117%2056.1662%20105.117C54.6377%20105.117%2053.1092%20105.462%2051.745%20106.115C46.7104%20108.523%2042.6219%20110.524%2038.8779%20112.415L38.8691%20112.42L38.8602%20112.424L38.8655%20112.421L38.8522%20112.427C37.9708%20112.876%2037.2358%20113.405%2036.6349%20113.928C36.9562%20112.459%2037.2891%20110.978%2037.6299%20109.466C39.6351%20100.553%2041.5293%2092.1346%2041.5293%2082.9975C41.5293%2075.6071%2040.2058%2068.5362%2037.4826%2061.3802C34.8384%2054.431%2030.9017%2047.4818%2025.4553%2040.1518L43.1101%2024.5891C48.1554%2026.4096%2053.5104%2027.8041%2059.0288%2028.7351C64.5365%2029.6644%2070.228%2030.1358%2075.946%2030.1358ZM124.893%200L123.098%201.28439C110.675%2010.1713%2093.3444%2015.2672%2075.5466%2015.2672C63.3258%2015.2672%2051.7698%2012.8599%2042.1258%208.30728L40.2902%207.44006L5.20856%2038.3658L10.0053%2044.1602C15.2884%2050.5422%2019.1913%2056.4219%2021.9376%2062.1356C24.3884%2067.2349%2025.8911%2072.1719%2026.5329%2077.2278C27.7533%2086.8409%2025.7384%2095.7969%2023.4049%20106.167C22.2625%20111.24%2021.0855%20116.47%2020.2254%20122.069C17.1844%20123.691%2014.1274%20125.345%2011.1201%20126.995C7.48798%20128.988%204.70794%20131.698%202.85725%20135.05C1.04827%20138.326%200.0869652%20142.304%200.00175323%20146.875C-0.0657063%20150.489%201.81783%20153.89%204.91653%20155.75C5.34348%20156.006%205.79173%20156.232%206.2533%20156.423C7.27229%20157.025%208.38448%20157.442%209.53928%20157.659C9.50643%20158.806%209.47183%20159.946%209.43721%20161.067V161.074C9.2801%20166.229%209.11766%20171.56%209.14429%20176.712C9.14074%20176.926%209.12654%20177.567%209.11589%20178.087L9.115%20178.119C9.05731%20180.8%209.02801%20182.146%209.04132%20182.985C9.05818%20184.021%209.14784%20184.48%209.29341%20185.113C10.0151%20188.278%2012.0992%20190.878%2015.0097%20192.243C15.142%20192.305%2015.2778%20192.364%2015.4242%20192.425C15.7065%20192.591%2015.9968%20192.745%2016.2906%20192.883C17.677%20193.533%2019.1505%20193.863%2020.6692%20193.863C22.3007%20193.863%2023.9392%20193.464%2025.4082%20192.71C25.4224%20192.702%2025.4366%20192.695%2025.4508%20192.687C28.412%20191.147%2031.1503%20189.739%2033.775%20188.405C35.8769%20191.507%2038.1989%20194.485%2040.7002%20197.286C47.3707%20204.756%2055.8875%20210.864%2066.7387%20215.957C76.0117%20220.309%2085.5359%20223.251%2093.9382%20225.846L93.9471%20225.849C99.595%20227.593%20104.931%20229.24%20109.394%20231.036C114.115%20232.937%20117.296%20234.766%20119.403%20236.794L124.643%20241.833L129.883%20236.794C131.992%20234.766%20135.172%20232.937%20139.893%20231.037C144.358%20229.24%20149.692%20227.593%20155.339%20225.85L155.347%20225.847C163.749%20223.252%20173.273%20220.309%20182.546%20215.957C193.397%20210.865%20201.914%20204.757%20208.585%20197.286C222.823%20181.343%20230.349%20160.914%20230.349%20138.208C230.349%20131.993%20229.78%20125.908%20228.52%20118.816C229.526%20118.601%20230.508%20118.392%20231.461%20118.193C233.748%20117.714%20235.814%20116.883%20237.605%20115.725C239.427%20114.545%20240.977%20113.019%20242.212%20111.187C244.312%20108.072%20245.415%20104.293%20245.68%2099.2951C245.798%2097.1542%20245.824%2094.6767%20245.848%2092.2801V92.2748C245.858%2091.31%20245.87%2090.118%20245.894%2088.949C247.311%2088.2565%20248.57%2087.4418%20249.71%2086.484C251.385%2085.0763%20252.759%2083.3764%20253.795%2081.4325C255.133%2078.9206%20255.873%2076.0499%20255.993%2072.9006C256.051%2071.3695%20255.755%2069.8197%20255.135%2068.4181C254.516%2067.0166%20253.57%2065.7544%20252.398%2064.7664C251.598%2064.0927%20250.707%2063.5504%20249.742%2063.1518C248.181%2062.2287%20246.405%2061.7423%20244.588%2061.7423C243.885%2061.7423%20243.179%2061.816%20242.491%2061.9616L225.87%2065.4783C228.597%2058.743%20233.018%2051.7192%20239.279%2044.1567L244.068%2038.372L209.117%207.31315L207.274%208.1839C197.57%2012.7658%20185.999%2015.1874%20173.812%2015.1874C169.54%2015.1874%20165.226%2014.8855%20160.99%2014.289C156.745%2013.6916%20152.559%2012.7969%20148.549%2011.6288C144.494%2010.4473%20140.595%208.98012%20136.961%207.26709C133.259%205.52193%20129.804%203.50801%20126.691%201.28087L124.893%200ZM157.621%20133.969C156.194%20133.969%20154.804%20133.565%20153.608%20132.819C152.092%20132.233%20150.764%20131.162%20149.873%20129.696C149.403%20128.927%20148.929%20128.156%20148.453%20127.386C148.252%20129.027%20148.05%20130.667%20147.849%20132.308C147.848%20132.317%20147.847%20132.325%20147.846%20132.332C147.438%20135.564%20145.303%20138.287%20142.408%20139.267C138.391%20140.622%20135.153%20141.732%20132.211%20142.765C131.421%20143.042%20130.607%20143.178%20129.799%20143.178C128.462%20143.178%20127.139%20142.804%20125.972%20142.069C125.968%20142.067%20125.965%20142.066%20125.96%20142.064C124.119%20144.659%20121.55%20146.582%20118.315%20147.784C112.247%20150.04%20106.055%20152.432%2099.9101%20154.894C98.5103%20155.454%2097.0733%20155.732%2095.6726%20155.732C93.8805%20155.732%2092.1479%20155.277%2090.6274%20154.376C90.6167%20154.37%2090.606%20154.362%2090.5954%20154.356C90.4729%20154.306%2090.3513%20154.253%2090.2306%20154.197C89.9208%20154.883%2089.5746%20155.537%2089.1885%20156.16C87.4363%20158.986%2084.9679%20161.057%2081.6402%20162.489C75.7428%20165.027%2069.6901%20167.723%2063.6515%20170.499C63.0631%20170.77%2062.4648%20170.989%2061.8648%20171.158C61.4662%20171.453%2061.0384%20171.707%2060.5892%20171.915C60.5795%20171.92%2060.5706%20171.924%2060.5608%20171.928C57.3246%20173.407%2054.0625%20174.97%2050.441%20176.714C50.4304%20176.719%2050.4188%20176.724%2050.4082%20176.73C49.3608%20177.228%2048.2433%20177.467%2047.1382%20177.467C45.7224%20177.467%2044.3262%20177.073%2043.1226%20176.32C41.9997%20175.888%2040.9745%20175.185%2040.1552%20174.234C39.5934%20173.582%2039.0262%20172.931%2038.4563%20172.281C38.4439%20172.675%2038.4315%20173.068%2038.4199%20173.463C41.2763%20179.2%2044.8801%20184.532%2049.2028%20189.373C62.0068%20203.71%2080.7454%20209.498%2097.2792%20214.605C107.148%20217.651%20116.469%20220.529%20123.216%20225.052L124.645%20226.009L126.073%20225.052C132.821%20220.529%20142.143%20217.651%20152.015%20214.604C168.546%20209.497%20187.283%20203.71%20200.086%20189.374C212.359%20175.627%20218.847%20157.934%20218.847%20138.209C218.847%20130.981%20217.946%20124.569%20216.711%20118.273C215.142%20118.634%20213.577%20118.999%20212.016%20119.369C211.122%20119.58%20210.231%20119.684%20209.355%20119.684C207.46%20119.684%20205.639%20119.196%20204.025%20118.244C203.393%20117.981%20202.785%20117.655%20202.207%20117.266C201.988%20117.64%20201.755%20118.003%20201.509%20118.353C199.487%20121.228%20196.598%20123.177%20192.923%20124.144C186.812%20125.751%20180.409%20127.525%20173.887%20129.417C173.263%20129.599%20172.638%20129.726%20172.017%20129.803C171.561%20130.047%20171.079%20130.244%20170.576%20130.387C167.28%20131.326%20163.862%20132.387%20160.555%20133.415L159.875%20133.626C159.867%20133.628%20159.858%20133.631%20159.849%20133.634C159.109%20133.861%20158.36%20133.969%20157.621%20133.969ZM147.79%2085.2457C148.451%2080.2635%20148.429%2080.0487%20148.398%2079.7202C148.31%2078.7847%20147.858%2078.0045%20147.127%2077.5225C146.671%2077.2216%20146.139%2077.068%20145.588%2077.068C145.276%2077.068%20144.958%2077.1178%20144.645%2077.2189C139.524%2078.8859%20134.402%2080.6159%20129.422%2082.36C124.405%2084.1175%20121.813%2087.8642%20121.018%2094.509C120.918%2095.3451%20121.259%2096.1741%20121.92%2096.697C122.355%2097.0414%20122.886%2097.2208%20123.425%2097.2208C123.705%2097.2208%20123.986%2097.1727%20124.256%2097.0733C126.443%2096.2754%20128.615%2095.4978%20130.646%2094.778C130.619%2094.9537%20130.594%2095.1294%20130.572%2095.3061C130.393%2096.8017%20130.213%2098.3089%20130.034%2099.8179L94.9172%20113.226C94.8933%20113.235%2094.8702%20113.245%2094.8471%20113.255C82.5429%20118.398%2071.2665%20123.378%2060.3744%20128.478C55.5147%20130.753%2053.1953%20134.725%2052.8527%20141.351C52.7462%20143.298%2052.6317%20145.279%2052.5207%20147.196C52.3654%20149.875%2052.2065%20152.624%2052.068%20155.33C50.8715%20154.124%2049.6138%20152.909%2048.3675%20151.706C46.5577%20149.958%2044.849%20148.306%2043.5362%20146.881C41.9544%20145.162%2041.5728%20144.426%2041.4867%20144.219C41.5142%20143.87%2041.8035%20142.48%2044.2711%20138.345C46.121%20135.245%2048.6303%20131.532%2051.057%20127.941C53.3933%20124.483%2055.5999%20121.217%2057.3228%20118.375C57.4098%20118.232%2057.4985%20118.087%2057.5864%20117.944C57.8172%20117.567%2058.0551%20117.179%2058.277%20116.786C58.6436%20116.258%2058.8016%20115.597%2058.6924%20114.933C58.6897%20114.917%2058.6871%20114.901%2058.6835%20114.885C58.5397%20114.113%2058.0533%20113.464%2057.3468%20113.105C56.9775%20112.917%2056.5719%20112.822%2056.168%20112.822C55.7907%20112.822%2055.4144%20112.904%2055.0709%20113.068C50.0904%20115.451%2046.0491%20117.429%2042.3459%20119.299C41.6101%20119.673%2041.1849%20120.265%2040.9035%20120.657C40.86%20120.718%2040.8192%20120.78%2040.781%20120.845C39.2374%20123.479%2037.1622%20127.117%2035.1544%20130.635C34.7221%20131.393%2034.2721%20132.182%2033.8194%20132.973C33.9738%20128.271%2033.9161%20127.987%2033.8673%20127.745C33.6791%20126.813%2033.1119%20126.059%2032.3104%20125.676C31.9376%20125.499%2031.5355%20125.41%2031.1272%20125.41C30.6559%20125.41%2030.1774%20125.528%2029.7265%20125.762C24.8375%20128.322%2019.8242%20131.01%2014.826%20133.752C12.4134%20135.075%2010.6746%20136.777%209.50999%20138.952C8.35696%20141.106%207.76759%20143.745%207.70634%20147.02C7.69036%20147.887%208.13861%20148.697%208.88244%20149.143C9.2659%20149.373%209.69816%20149.489%2010.1295%20149.489C10.5352%20149.489%2010.9417%20149.386%2011.3092%20149.182C13.499%20147.963%2015.5503%20146.828%2017.511%20145.754C17.5093%20145.806%2017.5084%20145.857%2017.5066%20145.909C17.4551%20148.464%2017.4036%20151.012%2017.3539%20153.54C17.298%20156.109%2017.2181%20158.75%2017.14%20161.304C16.9838%20166.419%2016.8222%20171.708%2016.8515%20176.746C16.8506%20176.87%2016.8347%20177.59%2016.8196%20178.287C16.7175%20183%2016.7175%20183.012%2016.8045%20183.392C16.9953%20184.234%2017.5341%20184.916%2018.2824%20185.268C18.6339%20185.432%2019.0093%20185.514%2019.3857%20185.514C19.8002%20185.514%2020.2165%20185.415%2020.6017%20185.216C20.6053%20185.214%2020.608%20185.213%2020.6115%20185.211C24.2188%20183.336%2027.4409%20181.683%2030.4579%20180.157C31.7326%20179.515%2032.3441%20178.081%2032.385%20176.944V176.933C32.5678%20171.115%2032.7524%20165.126%2032.9113%20159.959C32.9974%20159.809%2033.0835%20159.66%2033.1705%20159.51C36.6402%20163.286%2040.2289%20167.247%2043.6543%20171.218C44.209%20171.864%2045.0159%20172.209%2045.8467%20172.209C46.2834%20172.209%2046.7272%20172.113%2047.1435%20171.916C47.1471%20171.914%2047.1506%20171.913%2047.155%20171.911C50.9434%20170.088%2054.0998%20168.575%2057.3583%20167.086C57.3689%20167.082%2057.3787%20167.077%2057.3894%20167.072C57.7959%20166.88%2058.1314%20166.602%2058.3826%20166.271C59.0572%20166.181%2059.7487%20165.979%2060.4392%20165.662C66.5141%20162.869%2072.6015%20160.159%2078.5317%20157.606C83.3781%20155.519%2085.6806%20151.782%2086.231%20145.114C86.3836%20143.322%2086.4537%20141.243%2086.5274%20139.042C86.6046%20136.758%2086.6845%20134.396%2086.8629%20132.459C87.107%20129.808%2087.4417%20129.109%2087.4985%20129.007C87.7248%20128.702%2088.0772%20128.509%2089.4228%20127.85C89.6075%20127.759%2089.8045%20127.664%2090.0131%20127.56C89.9288%20128.46%2089.8436%20129.357%2089.7601%20130.24C89.4061%20133.994%2089.0385%20137.875%2088.7314%20141.636C88.6471%20142.671%2088.6587%20143.643%2088.7651%20144.524C89.1415%20147.639%2090.5697%20149.092%2091.7014%20149.762C92.5073%20150.239%2093.4207%20150.479%2094.3855%20150.479C95.2004%20150.479%2096.0525%20150.308%2096.9091%20149.965C103.086%20147.49%20109.315%20145.084%20115.423%20142.813C117.927%20141.883%20119.788%20140.458%20121.112%20138.456C122.443%20136.444%20123.246%20133.878%20123.636%20130.385C123.84%20128.613%20123.981%20126.566%20124.13%20124.397C124.292%20122.036%20124.461%20119.593%20124.713%20117.592C125.057%20114.863%20125.42%20114.136%20125.487%20114.021C125.728%20113.738%20126.54%20113.359%20127.477%20112.92C127.81%20112.765%20128.173%20112.594%20128.568%20112.403C128.489%20113.004%20128.411%20113.599%20128.333%20114.189C127.711%20118.898%20127.126%20123.346%20126.669%20128.111C126.658%20128.227%20126.56%20129.051%20126.467%20129.848C125.857%20135.027%20125.859%20135.04%20125.888%20135.381C125.889%20135.387%20125.889%20135.392%20125.89%20135.397C125.973%20136.289%20126.426%20137.057%20127.133%20137.508C127.555%20137.778%20128.036%20137.916%20128.524%20137.916C128.818%20137.916%20129.116%20137.865%20129.405%20137.763C132.372%20136.722%20135.53%20135.639%20139.64%20134.251C141.044%20133.778%20141.827%20132.333%20141.983%20131.104C142.265%20128.806%20142.547%20126.508%20142.83%20124.209C143.305%20120.334%20143.781%20116.457%20144.259%20112.582C144.307%20112.512%20144.357%20112.442%20144.406%20112.371C147.4%20117.005%20150.69%20122.161%20153.821%20127.293C154.36%20128.179%20155.349%20128.702%20156.364%20128.702C156.648%20128.702%20156.934%20128.661%20157.213%20128.576C157.216%20128.575%20157.219%20128.574%20157.222%20128.573L157.906%20128.361C161.24%20127.326%20164.686%20126.255%20168.035%20125.301C168.476%20125.175%20168.875%20124.939%20169.194%20124.62C169.259%20124.622%20169.326%20124.623%20169.393%20124.623C170.018%20124.623%20170.665%20124.529%20171.319%20124.339C177.848%20122.445%20184.29%20120.66%20190.465%20119.036C193.093%20118.344%20195.051%20117.042%20196.448%20115.055C197.824%20113.098%20198.646%20110.527%20199.033%20106.968C199.23%20105.201%20199.375%20103.157%20199.527%20100.991C199.692%2098.6666%20199.861%2096.262%20200.098%2094.2924C200.395%2091.8301%20200.687%2091.017%20200.791%2090.7898C201.1%2090.5386%20202.118%2090.2297%20203.294%2089.8986C203.229%2090.4934%20203.163%2091.0898%20203.097%2091.6881C202.634%2095.9052%20202.155%20100.266%20201.749%20104.582C201.649%20105.637%20201.647%20106.645%20201.744%20107.579C202.087%20110.877%20203.523%20112.537%20204.667%20113.35C205.662%20114.056%20206.842%20114.42%20208.093%20114.42C208.61%20114.42%20209.139%20114.358%20209.671%20114.232C215.944%20112.746%20222.313%20111.325%20228.602%20110.01C231.264%20109.451%20233.208%20108.217%20234.544%20106.236C235.832%20104.327%20236.519%20101.784%20236.706%2098.2405C236.815%2096.27%20236.84%2093.8761%20236.863%2091.5612C236.893%2088.648%20236.937%2084.3954%20237.241%2082.8136C237.493%2082.7275%20237.813%2082.6308%20238.075%2082.5518C240.877%2081.705%20246.709%2079.9422%20247.014%2071.9651C247.042%2071.2186%20246.725%2070.5005%20246.153%2070.0194C245.712%2069.6475%20245.158%2069.4486%20244.591%2069.4486C244.424%2069.4486%20244.256%2069.4655%20244.09%2069.501L208.46%2077.0405C208.452%2077.0423%20208.443%2077.0441%20208.435%2077.0458C194.389%2080.1791%20184.816%2082.5642%20174.293%2085.552C171.711%2086.2851%20169.776%2087.5855%20168.378%2089.5276C166.984%2091.4644%20166.129%2093.9933%20165.687%2097.4816C165.477%2099.1104%20165.262%20100.75%20165.046%20102.396C164.638%20105.503%20164.22%20108.69%20163.831%20111.863C162.839%20110.514%20161.803%20109.151%20160.775%20107.8C158.997%20105.463%20157.317%20103.255%20156.068%20101.373C154.413%2098.8779%20154.25%2098.0204%20154.234%2097.8784C154.259%2097.6281%20154.547%2096.3508%20157.556%2092.3369C159.699%2089.4788%20162.547%2086.1191%20165.302%2082.8695C167.749%2079.9839%20170.06%2077.258%20171.92%2074.849C172.012%2074.7291%20172.106%2074.6084%20172.199%2074.4895C172.451%2074.1664%20172.71%2073.8335%20172.955%2073.4962C173.394%2072.9974%20173.628%2072.3272%20173.57%2071.6233C173.509%2070.8875%20173.128%2070.2173%20172.521%2069.7815C172.076%2069.4628%20171.537%2069.2942%20170.999%2069.2942C170.79%2069.2942%20170.58%2069.3199%20170.377%2069.3723C170.358%2069.3768%20170.34%2069.3821%20170.321%2069.3874C165.522%2070.7517%20161.328%2071.9873%20157.505%2073.1634C156.674%2073.4172%20156.149%2073.9791%20155.835%2074.3146C155.776%2074.3767%20155.721%2074.4424%20155.67%2074.5108C153.699%2077.1239%20150.918%2080.9461%20148.465%2084.3181C148.24%2084.6261%20148.016%2084.935%20147.79%2085.2457ZM166.59%2066.5097C167.16%2066.034%20167.804%2065.6496%20168.499%2065.3727C167.791%2065.6541%20167.15%2066.0402%20166.59%2066.5097ZM75.946%2027.0486C64.912%2027.0486%2053.9276%2025.252%2043.877%2021.5844L42.4444%2021.0616L21.2781%2039.7212L22.6974%2041.6172C33.4404%2055.9621%2038.4439%2069.1114%2038.4439%2082.9991C38.4439%2091.7919%2036.5861%20100.049%2034.6191%20108.791C33.7058%20112.847%2032.8155%20116.806%2032.0921%20120.852C32.8483%20120.952%2033.5921%20121.171%2034.3005%20121.509C34.4984%20121.604%2034.691%20121.706%2034.8783%20121.817C35.5689%20120.617%2036.2177%20119.496%2036.7947%20118.511C36.9048%20118.324%2037.0228%20118.142%2037.1497%20117.965C37.5572%20117.397%2038.5122%20116.067%2040.252%20115.183C40.2582%20115.18%2040.2644%20115.177%2040.2697%20115.174C43.9942%20113.294%2048.064%20111.301%2053.0773%20108.903C54.0474%20108.438%2055.1064%20108.208%2056.1671%20108.208C57.2926%20108.208%2058.4199%20108.469%2059.4415%20108.989C59.6395%20109.09%2059.8321%20109.2%2060.0185%20109.318C60.2511%20109.406%2060.481%20109.506%2060.7046%20109.62C62.6929%20110.625%2064.0758%20112.451%2064.4975%20114.632C64.5099%20114.696%2064.5214%20114.76%2064.5321%20114.824C64.8285%20116.625%2064.4291%20118.417%2063.4785%20119.88C63.2486%20120.279%2063.0178%20120.656%2062.8074%20120.998C62.724%20121.135%2062.6397%20121.272%2062.5571%20121.409C62.2917%20121.846%2062.013%20122.297%2061.7245%20122.756C71.6508%20118.163%2081.9402%20113.645%2093.0648%20108.995C93.1322%20108.967%2093.2006%20108.94%2093.2689%20108.913L118.113%2099.4265C116.818%2097.9405%20116.19%2095.9593%20116.429%2093.9622C116.917%2089.8774%20118.018%2086.634%20119.794%2084.0465C121.717%2081.2443%20124.441%2079.2108%20127.892%2078.0019C132.905%2076.2461%20138.06%2074.5046%20143.213%2072.8278C143.22%2072.8261%20143.226%2072.8235%20143.233%2072.8216C144.009%2072.5713%20144.804%2072.4479%20145.59%2072.4479C146.976%2072.4479%20148.338%2072.8315%20149.528%2073.5788C149.802%2073.6835%20150.069%2073.8051%20150.33%2073.9428C150.917%2073.1483%20151.473%2072.4027%20151.978%2071.7343C152.128%2071.5354%20152.288%2071.3447%20152.458%2071.1635C152.962%2070.6265%20154.14%2069.3679%20156.146%2068.7528C159.999%2067.5678%20164.224%2066.3233%20169.053%2064.9502C169.108%2064.9352%20169.162%2064.92%20169.217%2064.9058C169.809%2064.7522%20170.412%2064.6777%20171.01%2064.6777C172.355%2064.6777%20173.682%2065.0576%20174.843%2065.789C175.419%2066.0082%20175.972%2066.3038%20176.486%2066.6713C178.2%2067.898%20179.277%2069.7957%20179.45%2071.8852C179.608%2073.7829%20179.007%2075.6008%20177.867%2076.997C177.607%2077.3512%20177.347%2077.6832%20177.111%2077.9858C177.024%2078.0968%20176.938%2078.2087%20176.852%2078.3197C176.3%2079.035%20175.712%2079.7735%20175.096%2080.5316C184.921%2077.7843%20194.209%2075.4916%20207.423%2072.5438C207.448%2072.5385%20207.473%2072.5332%20207.498%2072.5279L212.012%2071.5727C214.061%2061.7166%20218.834%2051.9651%20226.611%2041.5871L228.025%2039.699L206.933%2020.9551L205.494%2021.4796C195.463%2025.1358%20184.505%2026.9262%20173.502%2026.9262C156.804%2026.9262%20140.001%2022.8013%20126.182%2014.8109L124.897%2014.068L123.611%2014.8119C109.682%2022.8812%2092.755%2027.0486%2075.946%2027.0486ZM124.893%203.7955C138.164%2013.2886%20156.093%2018.278%20173.81%2018.278C186.04%2018.278%20198.172%2015.8983%20208.59%2010.979L239.789%2038.7031L236.901%2042.1924C228.27%2052.6184%20223.504%2061.4813%20221.174%2069.6306L243.13%2064.9848C243.614%2064.8827%20244.102%2064.8321%20244.588%2064.8321C245.919%2064.8321%20247.228%2065.2102%20248.358%2065.9266C249.096%2066.2054%20249.791%2066.6091%20250.409%2067.1293C252.069%2068.5283%20252.991%2070.615%20252.908%2072.7843C252.68%2078.7448%20249.963%2082.2403%20247.724%2084.1221C246.092%2085.4943%20244.349%2086.3357%20242.866%2086.8967C242.799%2088.6108%20242.778%2090.733%20242.762%2092.2491C242.738%2094.6111%20242.712%2097.0539%20242.598%2099.1255C242.364%20103.544%20241.429%20106.828%20239.653%20109.461C237.641%20112.446%20234.672%20114.368%20230.829%20115.173C228.871%20115.583%20226.903%20116.004%20224.934%20116.433C226.252%20123.146%20227.263%20130.243%20227.263%20138.209C227.263%20160.144%20220.009%20179.863%20206.283%20195.232C191.915%20211.324%20171.131%20217.742%20154.428%20222.902C142.924%20226.453%20132.992%20229.522%20127.743%20234.571L124.643%20237.552L121.543%20234.571C116.295%20229.522%20106.361%20226.453%2094.8579%20222.902C78.1562%20217.742%2057.3698%20211.324%2043.0027%20195.232C39.944%20191.807%2037.2074%20188.165%2034.8002%20184.331C34.4895%20184.552%2034.1629%20184.751%2033.8211%20184.923C30.7455%20186.478%2027.5394%20188.123%2024.0262%20189.951C24.0164%20189.956%2024.0067%20189.961%2023.9969%20189.966C22.9442%20190.507%2021.8071%20190.779%2020.6692%20190.779C19.6245%20190.779%2018.5806%20190.55%2017.6016%20190.091C17.3255%20189.961%2017.061%20189.816%2016.8071%20189.656C16.6438%20189.593%2016.4814%20189.527%2016.3207%20189.451C14.2748%20188.492%2012.8119%20186.66%2012.3016%20184.424C12.0868%20183.488%2012.0869%20183.475%2012.2013%20178.187C12.2146%20177.59%2012.2288%20176.918%2012.2314%20176.73C12.2039%20171.621%2012.3655%20166.305%2012.5226%20161.163C12.5883%20159.013%2012.6557%20156.801%2012.7082%20154.629C12.2794%20154.709%2011.8444%20154.749%2011.4104%20154.749C10.1553%20154.749%208.90019%20154.414%207.78622%20153.745C7.73749%20153.716%207.68948%20153.685%207.64066%20153.655C7.2501%20153.508%206.86931%20153.325%206.5036%20153.105C4.34233%20151.808%203.03921%20149.454%203.08625%20146.934C3.23892%20138.769%206.35093%20133.133%2012.6025%20129.702C16.0935%20127.787%2019.5907%20125.9%2023.0498%20124.062C23.9019%20118.011%2025.1695%20112.374%2026.4139%20106.846C31.129%2085.8901%2034.8534%2069.3377%2012.3806%2042.1924L9.49224%2038.7031L40.8085%2011.0998C51.1769%2015.9959%2063.3%2018.3553%2075.5475%2018.3553C93.4322%2018.3553%20111.58%2013.3198%20124.893%203.7955Z'%20fill='white'/%3e%3cpath%20d='M166.59%2066.5097C167.16%2066.034%20167.804%2065.6496%20168.499%2065.3727C167.791%2065.6541%20167.15%2066.0402%20166.59%2066.5097Z'%20fill='%23ED7025'/%3e%3cpath%20d='M201.213%20179.697C199.694%20181.871%20198.041%20183.96%20196.256%20185.959C196.071%20186.167%20195.885%20186.372%20195.696%20186.576C183.842%20199.406%20166.143%20204.873%20150.499%20209.706C140.896%20212.67%20131.818%20215.502%20124.643%20219.916C117.466%20215.503%20108.391%20212.671%2098.7908%20209.707C89.4264%20206.815%2079.327%20203.694%2070.1844%20198.903C64.24%20195.789%2058.6995%20191.968%2054.0306%20187.046C93.6569%20166.077%20145.35%20144.573%20213.568%20133.433C213.659%20134.994%20213.714%20136.582%20213.714%20138.211C213.714%20153.773%20209.416%20167.96%20201.213%20179.697ZM212.014%20119.37C209.185%20120.038%20206.383%20119.637%20204.023%20118.246C203.391%20117.983%20202.783%20117.656%20202.205%20117.268C201.986%20117.642%20201.754%20118.004%20201.508%20118.355C199.485%20121.23%20196.596%20123.178%20192.921%20124.146C186.81%20125.753%20180.407%20127.527%20173.886%20129.418C173.261%20129.6%20172.636%20129.728%20172.016%20129.805C171.559%20130.05%20171.077%20130.247%20170.574%20130.389C167.278%20131.329%20163.86%20132.39%20160.554%20133.417L159.874%20133.628C159.865%20133.631%20159.856%20133.634%20159.847%20133.636C157.69%20134.297%20155.425%20133.953%20153.61%20132.82C152.094%20132.234%20150.766%20131.163%20149.875%20129.697C149.405%20128.927%20148.931%20128.157%20148.455%20127.387C148.254%20129.028%20148.052%20130.668%20147.851%20132.309C147.85%20132.317%20147.849%20132.325%20147.848%20132.333C147.44%20135.565%20145.305%20138.287%20142.41%20139.267C138.393%20140.623%20135.155%20141.733%20132.213%20142.766C130.116%20143.501%20127.846%20143.248%20125.973%20142.07C125.969%20142.068%20125.965%20142.067%20125.961%20142.065C124.12%20144.66%20121.551%20146.582%20118.316%20147.785C112.248%20150.041%20106.056%20152.433%2099.911%20154.895C96.72%20156.172%2093.3373%20155.982%2090.6282%20154.378C90.6176%20154.371%2090.6069%20154.364%2090.5963%20154.358C90.4738%20154.307%2090.3522%20154.255%2090.2315%20154.199C89.9217%20154.885%2089.5755%20155.538%2089.1894%20156.162C87.4372%20158.988%2084.9687%20161.059%2081.641%20162.49C75.7436%20165.029%2069.691%20167.725%2063.6524%20170.501C63.0639%20170.772%2062.4657%20170.991%2061.8656%20171.16C61.4671%20171.455%2061.0393%20171.709%2060.5901%20171.917C60.5803%20171.921%2060.5715%20171.926%2060.5617%20171.93C57.3254%20173.409%2054.0634%20174.972%2050.4419%20176.715C50.4313%20176.721%2050.4197%20176.726%2050.4091%20176.731C48.0187%20177.867%2045.2653%20177.663%2043.1234%20176.322C42.0007%20175.89%2040.9754%20175.187%2040.1561%20174.235C39.5942%20173.584%2039.0271%20172.933%2038.4572%20172.283C38.4448%20172.677%2038.4323%20173.07%2038.4208%20173.465C41.2772%20179.202%2044.8809%20184.534%2049.2037%20189.375C62.0076%20203.712%2080.7463%20209.5%2097.2801%20214.606C107.149%20217.653%20116.47%20220.531%20123.217%20225.054L124.646%20226.011L126.074%20225.054C132.821%20220.531%20142.144%20217.653%20152.015%20214.605C168.547%20209.499%20187.284%20203.712%20200.087%20189.376C212.361%20175.629%20218.847%20157.936%20218.847%20138.21C218.847%20130.982%20217.947%20124.571%20216.712%20118.275C215.14%20118.636%20213.575%20119.001%20212.014%20119.37Z'%20fill='%23EF7021'/%3e%3cpath%20d='M28.1714%2040.4819C29.4567%2039.3484%2041.7024%2028.5549%2043.5824%2026.8968C53.7394%2030.4021%2064.7433%2032.124%2075.7996%2032.1329C93.047%2032.1462%20110.42%2027.9895%20124.901%2019.9272C146.599%2031.9785%20174.856%2035.2086%20199.386%2028.7307C201.55%2028.159%20203.685%2027.5137%20205.783%2026.7903C207.217%2028.0641%20214.731%2034.7417%20218.903%2038.4493C219.866%2039.3049%20220.651%2040.0026%20221.143%2040.4393C219.064%2043.3268%20217.212%2046.176%20215.563%2049.0013C198.352%2051.4157%20180.412%2055.07%20162.363%2059.7123C160.464%2060.2014%20158.563%2060.7003%20156.661%2061.2106C154.76%2061.721%20152.858%2062.2421%20150.956%2062.7729C150.005%2063.0383%20149.053%2063.3063%20148.103%2063.577C144.3%2064.6599%20140.499%2065.7837%20136.708%2066.9465C134.812%2067.5279%20132.917%2068.1181%20131.026%2068.7182C130.553%2068.8682%20130.081%2069.0191%20129.607%2069.17C127.245%2069.9262%20124.887%2070.6958%20122.536%2071.4805C122.065%2071.6376%20121.595%2071.7947%20121.125%2071.9527C120.185%2072.2687%20119.247%2072.5864%20118.309%2072.9069C117.84%2073.0666%20117.371%2073.2273%20116.903%2073.3888C115.966%2073.711%20115.031%2074.0359%20114.097%2074.3626C112.695%2074.8525%20111.297%2075.3469%20109.902%2075.8467C108.042%2076.5124%20106.187%2077.1861%20104.338%2077.8678C103.875%2078.0382%20103.414%2078.2095%20102.952%2078.3809C101.567%2078.8948%20100.187%2079.414%2098.8104%2079.9369C97.8926%2080.2857%2096.9765%2080.6363%2096.0623%2080.9887C93.3195%2082.0458%2090.5927%2083.1199%2087.8846%2084.2099C87.4337%2084.3918%2086.9828%2084.5738%2086.5319%2084.7558C70.3229%2091.3269%2054.8055%2098.4616%2040.5059%20105.944C42.0778%2098.7776%2043.4803%2091.405%2043.5664%2083.7394C43.569%2083.4918%2043.5708%2083.2441%2043.5708%2082.9965C43.5708%2082.5465%2043.5664%2082.0964%2043.5566%2081.6482C43.5371%2080.7508%2043.4989%2079.8561%2043.4403%2078.9649C43.411%2078.5193%2043.3773%2078.0737%2043.3383%2077.629C43.2646%2076.7902%2043.1732%2075.9532%2043.0649%2075.1171C43.0516%2075.0132%2043.0374%2074.9102%2043.024%2074.8064C41.4778%2063.3613%2036.626%2052.2367%2028.1714%2040.4819ZM34.6191%20108.791C33.7058%20112.847%2032.8155%20116.806%2032.0921%20120.852C32.8483%20120.952%2033.5921%20121.171%2034.3005%20121.509C34.4984%20121.604%2034.691%20121.706%2034.8783%20121.817C35.5689%20120.617%2036.2177%20119.496%2036.7947%20118.511C36.9048%20118.324%2037.0228%20118.142%2037.1497%20117.965C37.5572%20117.397%2038.5122%20116.067%2040.252%20115.183C40.2582%20115.18%2040.2644%20115.177%2040.2697%20115.174C43.9942%20113.294%2048.064%20111.301%2053.0773%20108.903C55.0771%20107.946%2057.4559%20107.978%2059.4416%20108.987C59.6395%20109.088%2059.8321%20109.198%2060.0185%20109.316C60.252%20109.405%2060.481%20109.505%2060.7046%20109.618C62.6929%20110.623%2064.0758%20112.45%2064.4975%20114.631C64.5099%20114.694%2064.5214%20114.758%2064.5321%20114.822C64.8285%20116.623%2064.4291%20118.415%2063.4785%20119.878C63.2486%20120.277%2063.0178%20120.654%2062.8074%20120.997C62.724%20121.133%2062.6397%20121.27%2062.5571%20121.407C62.2917%20121.844%2062.013%20122.295%2061.7245%20122.754C71.6508%20118.162%2081.9402%20113.644%2093.0648%20108.993C93.1322%20108.965%2093.2006%20108.938%2093.2689%20108.912L118.113%2099.4247C116.818%2097.9388%20116.19%2095.9576%20116.429%2093.9604C116.917%2089.8756%20118.018%2086.6322%20119.794%2084.0448C121.717%2081.2425%20124.441%2079.209%20127.893%2078.0001C132.905%2076.2443%20138.06%2074.5028%20143.213%2072.8261C143.22%2072.8243%20143.226%2072.8217%20143.233%2072.8199C145.378%2072.1293%20147.663%2072.4062%20149.528%2073.577C149.802%2073.6818%20150.069%2073.8034%20150.33%2073.9409C150.917%2073.1465%20151.473%2072.4009%20151.978%2071.7325C152.128%2071.5337%20152.288%2071.3429%20152.458%2071.1618C152.962%2070.6248%20154.14%2069.3661%20156.147%2068.751C159.999%2067.566%20164.224%2066.3216%20169.053%2064.9484C169.108%2064.9333%20169.162%2064.9182%20169.217%2064.904C171.139%2064.407%20173.166%2064.7301%20174.844%2065.7872C175.42%2066.0074%20175.973%2066.3021%20176.487%2066.6695C178.2%2067.8962%20179.278%2069.794%20179.451%2071.8834C179.609%2073.7812%20179.008%2075.599%20177.868%2076.9953C177.607%2077.3494%20177.348%2077.6814%20177.112%2077.9841C177.025%2078.095%20176.939%2078.2069%20176.853%2078.3178C176.301%2079.0332%20175.712%2079.7718%20175.097%2080.5298C184.922%2077.7817%20194.21%2075.4898%20207.424%2072.542C207.449%2072.5367%20207.474%2072.5314%20207.499%2072.5261L212.013%2071.571C214.062%2061.7148%20218.835%2051.9634%20226.611%2041.5852L228.026%2039.6973L206.934%2020.9533L205.495%2021.4779C180.241%2030.6817%20149.109%2028.0649%20126.182%2014.8092L124.897%2014.0662L123.611%2014.81C100.535%2028.1803%2069.2356%2030.8405%2043.8753%2021.5862L42.4426%2021.0634L21.2781%2039.7212L22.6974%2041.6172C33.4404%2055.9621%2038.4439%2069.1114%2038.4439%2082.9991C38.4439%2091.7919%2036.5861%20100.049%2034.6191%20108.791Z'%20fill='%23EF7021'/%3e%3cpath%20d='M213.568%20133.433C145.35%20144.573%2093.6569%20166.077%2054.0306%20187.046C58.6995%20191.968%2064.24%20195.789%2070.1844%20198.903C79.327%20203.694%2089.4264%20206.815%2098.7908%20209.707C108.391%20212.671%20117.466%20215.503%20124.643%20219.916C131.818%20215.502%20140.896%20212.67%20150.499%20209.706C166.143%20204.873%20183.842%20199.406%20195.696%20186.576C195.885%20186.372%20196.071%20186.167%20196.256%20185.959C198.041%20183.96%20199.694%20181.871%20201.213%20179.697C209.416%20167.96%20213.714%20153.772%20213.714%20138.209C213.714%20136.58%20213.66%20134.994%20213.568%20133.433Z'%20fill='black'/%3e%3cpath%20d='M43.0666%2075.1189C43.1749%2075.9541%2043.2664%2076.7911%2043.34%2077.6308C43.3791%2078.0755%2043.4128%2078.5211%2043.4421%2078.9667C43.5007%2079.8588%2043.5389%2080.7526%2043.5584%2081.65C43.5682%2082.0991%2043.5726%2082.5483%2043.5726%2082.9983C43.5726%2083.2459%2043.5708%2083.4936%2043.5682%2083.7412C43.4821%2091.4077%2042.0796%2098.7803%2040.5076%20105.946C54.8073%2098.4643%2070.3247%2091.3295%2086.5336%2084.7576C86.9837%2084.5747%2087.4346%2084.3928%2087.8864%2084.2117C90.5945%2083.1217%2093.3204%2082.0477%2096.0641%2080.9905C96.9783%2080.6381%2097.8943%2080.2875%2098.8121%2079.9387C100.189%2079.4158%20101.57%2078.8966%20102.954%2078.3826C103.415%2078.2113%20103.877%2078.04%20104.339%2077.8696C106.188%2077.1879%20108.043%2076.5142%20109.904%2075.8485C111.299%2075.3487%20112.698%2074.8543%20114.099%2074.3644C115.033%2074.0377%20115.968%2073.7128%20116.905%2073.3906C117.373%2073.2291%20117.841%2073.0684%20118.311%2072.9087C119.248%2072.5882%20120.187%2072.2705%20121.127%2071.9545C121.597%2071.7965%20122.067%2071.6394%20122.537%2071.4823C124.89%2070.6985%20127.247%2069.928%20129.609%2069.1718C130.081%2069.0209%20130.555%2068.87%20131.028%2068.72C132.919%2068.1199%20134.813%2067.5288%20136.709%2066.9483C140.501%2065.7864%20144.302%2064.6626%20148.105%2063.5788C149.055%2063.3081%20150.006%2063.04%20150.957%2062.7746C152.86%2062.2438%20154.761%2061.7228%20156.663%2061.2124C158.564%2060.702%20160.466%2060.2023%20162.365%2059.7141C180.414%2055.0718%20198.353%2051.4175%20215.565%2049.0031C217.213%2046.1778%20219.066%2043.3286%20221.145%2040.4411C220.653%2040.0044%20219.868%2039.3067%20218.905%2038.4511C214.732%2034.7426%20207.218%2028.0659%20205.785%2026.7921C203.687%2027.5155%20201.551%2028.1608%20199.388%2028.7325C174.859%2035.2103%20146.601%2031.9803%20124.903%2019.929C110.422%2027.9913%2093.0488%2032.148%2075.8014%2032.1347C64.7451%2032.1259%2053.7412%2030.4039%2043.5841%2026.8986C41.7041%2028.5567%2029.4585%2039.3502%2028.1732%2040.4837C36.6278%2052.2385%2041.4805%2063.3631%2043.0276%2074.81C43.0391%2074.912%2043.0533%2075.0159%2043.0666%2075.1189Z'%20fill='black'/%3e%3cpath%20d='M247.01%2071.9678C246.706%2079.9457%20240.874%2081.7077%20238.072%2082.5545C237.81%2082.6335%20237.489%2082.7302%20237.237%2082.8163C236.934%2084.3972%20236.889%2088.6507%20236.859%2091.5639C236.835%2093.8788%20236.81%2096.2727%20236.702%2098.2432C236.515%20101.787%20235.828%20104.33%20234.541%20106.239C233.205%20108.22%20231.262%20109.454%20228.599%20110.012C222.309%20111.329%20215.94%20112.749%20209.668%20114.235C207.846%20114.664%20206.07%20114.351%20204.664%20113.351C203.52%20112.539%20202.085%20110.879%20201.741%20107.581C201.644%20106.647%20201.646%20105.639%20201.747%20104.584C202.153%20100.268%20202.631%2095.907%20203.095%2091.6899C203.16%2091.0916%20203.226%2090.4952%20203.291%2089.9005C202.117%2090.2315%20201.098%2090.5404%20200.789%2090.7916C200.684%2091.0189%20200.392%2091.8319%20200.095%2094.2942C199.858%2096.2638%20199.689%2098.6675%20199.525%20100.993C199.372%20103.158%20199.228%20105.203%20199.03%20106.969C198.643%20110.529%20197.821%20113.1%20196.446%20115.057C195.048%20117.044%20193.09%20118.346%20190.462%20119.038C184.287%20120.662%20177.845%20122.447%20171.316%20124.341C170.663%20124.531%20170.017%20124.625%20169.39%20124.625C169.323%20124.625%20169.258%20124.623%20169.191%20124.622C168.873%20124.94%20168.474%20125.178%20168.033%20125.302C164.684%20126.257%20161.237%20127.327%20157.903%20128.363L157.22%20128.575C157.216%20128.576%20157.214%20128.577%20157.21%20128.578C155.934%20128.968%20154.508%20128.429%20153.817%20127.295C150.687%20122.163%20147.396%20117.007%20144.402%20112.373C144.354%20112.443%20144.304%20112.514%20144.255%20112.584C143.777%20116.459%20143.302%20120.334%20142.826%20124.211C142.544%20126.509%20142.262%20128.807%20141.979%20131.106C141.824%20132.336%20141.04%20133.78%20139.637%20134.252C135.526%20135.64%20132.369%20136.724%20129.402%20137.765C128.636%20138.035%20127.807%20137.942%20127.129%20137.51C126.424%20137.059%20125.971%20136.29%20125.887%20135.399C125.886%20135.394%20125.886%20135.389%20125.885%20135.383C125.855%20135.042%20125.854%20135.029%20126.463%20129.85C126.558%20129.053%20126.654%20128.229%20126.666%20128.113C127.122%20123.348%20127.708%20118.9%20128.329%20114.191C128.407%20113.601%20128.485%20113.005%20128.565%20112.405C128.17%20112.596%20127.806%20112.767%20127.474%20112.922C126.536%20113.36%20125.725%20113.74%20125.484%20114.023C125.416%20114.138%20125.052%20114.866%20124.71%20117.593C124.457%20119.596%20124.29%20122.038%20124.126%20124.399C123.977%20126.567%20123.836%20128.615%20123.633%20130.387C123.242%20133.88%20122.439%20136.447%20121.108%20138.458C119.784%20140.459%20117.924%20141.885%20115.42%20142.815C109.311%20145.086%20103.082%20147.492%2096.9056%20149.967C95.0336%20150.716%2093.1837%20150.644%2091.6978%20149.764C90.5661%20149.093%2089.1379%20147.64%2088.7616%20144.526C88.6552%20143.644%2088.6445%20142.673%2088.7279%20141.637C89.035%20137.877%2089.4025%20133.996%2089.7566%20130.242C89.84%20129.359%2089.9253%20128.462%2090.0096%20127.561C89.8001%20127.665%2089.6039%20127.761%2089.4193%20127.852C88.0737%20128.511%2087.7213%20128.704%2087.4949%20129.009C87.4381%20129.111%2087.1035%20129.81%2086.8594%20132.461C86.681%20134.398%2086.6011%20136.76%2086.5248%20139.044C86.4502%20141.245%2086.3801%20143.324%2086.2283%20145.116C85.678%20151.784%2083.3755%20155.522%2078.529%20157.608C72.5988%20160.16%2066.5115%20162.871%2060.4366%20165.664C59.7452%20165.981%2059.0545%20166.183%2058.3799%20166.273C58.1287%20166.604%2057.7932%20166.881%2057.3867%20167.074C57.376%20167.079%2057.3663%20167.084%2057.3556%20167.088C54.0972%20168.577%2050.9399%20170.089%2047.1524%20171.913C47.1488%20171.914%2047.1453%20171.916%2047.1409%20171.918C45.9328%20172.492%2044.4975%20172.205%2043.6516%20171.22C40.2254%20167.249%2036.6376%20163.287%2033.1679%20159.512C33.0818%20159.661%2032.9957%20159.811%2032.9087%20159.961C32.7498%20165.127%2032.566%20171.117%2032.3823%20176.935V176.945C32.3415%20178.082%2031.7299%20179.516%2030.4553%20180.158C27.4382%20181.684%2024.2162%20183.338%2020.6089%20185.213C20.6053%20185.214%2020.6026%20185.216%2020.5991%20185.218C20.213%20185.416%2019.7976%20185.516%2019.383%20185.516C19.0068%20185.516%2018.6312%20185.435%2018.2797%20185.269C17.5306%20184.918%2016.9927%20184.235%2016.8009%20183.394C16.714%20183.014%2016.7139%20183.001%2016.816%20178.288C16.8311%20177.591%2016.8471%20176.872%2016.848%20176.747C16.8196%20171.709%2016.9811%20166.42%2017.1365%20161.305C17.2146%20158.752%2017.2953%20156.111%2017.3504%20153.542C17.4001%20151.013%2017.4517%20148.466%2017.5031%20145.91C17.504%20145.859%2017.5057%20145.807%2017.5075%20145.756C15.5476%20146.83%2013.4954%20147.964%2011.3065%20149.184C10.5486%20149.607%209.6236%20149.591%208.87977%20149.145C8.13594%20148.698%207.68769%20147.889%207.70367%20147.022C7.76492%20143.746%208.35519%20141.108%209.50733%20138.954C10.6719%20136.779%2012.4107%20135.078%2014.8233%20133.754C19.8215%20131.012%2024.8348%20128.324%2029.7239%20125.764C30.5653%20125.326%2031.5053%20125.294%2032.3077%20125.678C33.1093%20126.061%2033.6765%20126.815%2033.8646%20127.747C33.9135%20127.988%2033.972%20128.273%2033.8167%20132.975C34.2685%20132.184%2034.7194%20131.394%2035.1508%20130.637C37.1577%20127.119%2039.2339%20123.481%2040.7775%20120.847C40.8156%20120.782%2040.8565%20120.72%2040.9%20120.658C41.1813%20120.267%2041.6065%20119.674%2042.3423%20119.3C46.0446%20117.431%2050.0869%20115.453%2055.0673%20113.07C55.781%20112.729%2056.6313%20112.743%2057.3441%20113.106C58.0498%20113.465%2058.5371%20114.114%2058.6809%20114.886C58.6836%20114.902%2058.6862%20114.918%2058.6897%20114.934C58.7989%20115.598%2058.6418%20116.258%2058.2743%20116.787C58.0524%20117.179%2057.8154%20117.568%2057.5837%20117.945C57.4959%20118.089%2057.4071%20118.233%2057.3201%20118.376C55.5981%20121.219%2053.3915%20124.484%2051.0544%20127.941C48.6276%20131.533%2046.1183%20135.247%2044.2685%20138.346C41.8009%20142.481%2041.5115%20143.871%2041.484%20144.22C41.5692%20144.427%2041.9518%20145.163%2043.5335%20146.882C44.8463%20148.308%2046.5559%20149.959%2048.3649%20151.707C49.6111%20152.91%2050.868%20154.125%2052.0654%20155.331C52.2039%20152.625%2052.3628%20149.877%2052.5181%20147.197C52.629%20145.281%2052.7435%20143.3%2052.8501%20141.352C53.1927%20134.726%2055.512%20130.753%2060.3718%20128.478C71.2638%20123.379%2082.5402%20118.399%2094.8445%20113.256C94.8676%20113.246%2094.8915%20113.236%2094.9146%20113.227L130.031%2099.8188C130.21%2098.3098%20130.39%2096.8027%20130.57%2095.307C130.592%2095.1312%20130.617%2094.9546%20130.643%2094.7797C128.612%2095.4996%20126.439%2096.2763%20124.253%2097.0751C123.462%2097.3646%20122.577%2097.2216%20121.917%2096.6979C121.257%2096.1751%20120.916%2095.3469%20121.015%2094.5099C121.81%2087.8651%20124.401%2084.1185%20129.419%2082.361C134.4%2080.6168%20139.521%2078.8868%20144.642%2077.2198C145.507%2076.9411%20146.409%2077.053%20147.125%2077.5243C147.856%2078.0055%20148.307%2078.7857%20148.396%2079.722C148.428%2080.0505%20148.448%2080.2653%20147.788%2085.2475C148.013%2084.9378%20148.238%2084.6288%20148.461%2084.3226C150.914%2080.9505%20153.694%2077.1284%20155.665%2074.5152C155.717%2074.4469%20155.772%2074.3821%20155.831%2074.3191C156.145%2073.9836%20156.669%2073.4217%20157.5%2073.1679C161.323%2071.9918%20165.516%2070.7562%20170.317%2069.3919C170.335%2069.3865%20170.354%2069.3812%20170.373%2069.3769C171.097%2069.1895%20171.897%2069.3431%20172.516%2069.786C173.123%2070.2209%20173.505%2070.892%20173.565%2071.6278C173.624%2072.3317%20173.389%2073.0018%20172.95%2073.5008C172.705%2073.839%20172.446%2074.1709%20172.195%2074.4939C172.102%2074.6138%20172.008%2074.7336%20171.915%2074.8534C170.055%2077.2624%20167.744%2079.9875%20165.298%2082.8741C162.544%2086.1236%20159.695%2089.4834%20157.552%2092.3414C154.543%2096.3553%20154.255%2097.6326%20154.229%2097.8829C154.245%2098.025%20154.409%2098.8823%20156.064%20101.378C157.313%20103.26%20158.992%20105.468%20160.77%20107.805C161.798%20109.156%20162.834%20110.518%20163.826%20111.867C164.216%20108.694%20164.634%20105.508%20165.041%20102.401C165.257%20100.755%20165.473%2099.1149%20165.682%2097.4862C166.124%2093.9977%20166.979%2091.468%20168.374%2089.5321C169.772%2087.59%20171.707%2086.2897%20174.289%2085.5564C184.812%2082.5687%20194.384%2080.1837%20208.43%2077.0503C208.439%2077.0485%20208.448%2077.0468%20208.456%2077.0451L244.085%2069.5055C244.816%2069.3511%20245.577%2069.5419%20246.149%2070.023C246.722%2070.5032%20247.038%2071.2213%20247.01%2071.9678ZM200.083%20189.376C187.281%20203.712%20168.544%20209.499%20152.012%20214.605C142.141%20217.653%20132.818%20220.531%20126.07%20225.054L124.642%20226.011L123.214%20225.054C116.466%20220.531%20107.145%20217.654%2097.2767%20214.606C80.7437%20209.5%2062.0041%20203.713%2049.2001%20189.375C44.8775%20184.534%2041.2736%20179.202%2038.4173%20173.465C38.4297%20173.071%2038.4422%20172.677%2038.4537%20172.283C39.0235%20172.933%2039.5907%20173.584%2040.1527%20174.235C40.9719%20175.187%2041.9971%20175.89%2043.1199%20176.322C45.2626%20177.663%2048.016%20177.867%2050.4055%20176.731C50.4162%20176.726%2050.4277%20176.721%2050.4384%20176.715C54.0608%20174.972%2057.3219%20173.409%2060.5582%20171.93C60.568%20171.926%2060.5769%20171.922%2060.5866%20171.917C61.0358%20171.709%2061.4636%20171.455%2061.8621%20171.16C62.4631%20170.991%2063.0604%20170.772%2063.6489%20170.501C69.6874%20167.725%2075.7392%20165.03%2081.6375%20162.491C84.9652%20161.058%2087.4337%20158.988%2089.1859%20156.162C89.5729%20155.538%2089.919%20154.885%2090.2279%20154.199C90.3486%20154.254%2090.4703%20154.307%2090.5928%20154.358C90.6034%20154.364%2090.6141%20154.371%2090.6247%20154.378C93.3338%20155.983%2096.7166%20156.172%2099.9075%20154.895C106.053%20152.433%20112.245%20150.041%20118.312%20147.785C121.546%20146.583%20124.116%20144.66%20125.958%20142.065C125.961%20142.067%20125.965%20142.068%20125.969%20142.07C127.843%20143.248%20130.112%20143.501%20132.209%20142.766C135.152%20141.733%20138.39%20140.623%20142.406%20139.267C145.302%20138.287%20147.436%20135.565%20147.845%20132.333C147.846%20132.325%20147.846%20132.317%20147.847%20132.309C148.049%20130.668%20148.25%20129.028%20148.452%20127.387C148.928%20128.156%20149.402%20128.927%20149.871%20129.697C150.763%20131.163%20152.09%20132.234%20153.606%20132.82C155.422%20133.953%20157.687%20134.297%20159.843%20133.636C159.852%20133.634%20159.861%20133.631%20159.87%20133.628L160.55%20133.417C163.856%20132.39%20167.276%20131.329%20170.571%20130.389C171.074%20130.248%20171.556%20130.049%20172.012%20129.805C172.632%20129.728%20173.257%20129.601%20173.882%20129.418C180.404%20127.527%20186.807%20125.753%20192.917%20124.146C196.592%20123.178%20199.481%20121.23%20201.504%20118.355C201.751%20118.004%20201.983%20117.642%20202.202%20117.268C202.78%20117.657%20203.388%20117.983%20204.02%20118.246C206.38%20119.637%20209.181%20120.038%20212.011%20119.371C213.571%20119.001%20215.137%20118.636%20216.706%20118.275C217.941%20124.571%20218.841%20130.982%20218.841%20138.21C218.844%20157.936%20212.357%20175.628%20200.083%20189.376ZM166.59%2066.5097C167.16%2066.034%20167.804%2065.6496%20168.499%2065.3727C167.791%2065.6541%20167.15%2066.0402%20166.59%2066.5097ZM22.6974%2041.6172L21.2781%2039.7212L42.4444%2021.0616L43.877%2021.5844C69.2383%2030.8387%20100.538%2028.1795%20123.614%2014.8083L124.899%2014.0645L126.185%2014.8074C149.111%2028.0623%20180.243%2030.6799%20205.498%2021.4761L206.936%2020.9515L228.029%2039.6955L226.614%2041.5835C218.838%2051.9616%20214.065%2061.713%20212.015%2071.5692L207.502%2072.5243C207.477%2072.5296%20207.451%2072.535%20207.426%2072.5403C194.213%2075.4881%20184.924%2077.7799%20175.1%2080.528C175.715%2079.77%20176.303%2079.0315%20176.856%2078.3161C176.942%2078.2051%20177.029%2078.0933%20177.115%2077.9823C177.351%2077.6796%20177.609%2077.3477%20177.87%2076.9935C179.011%2075.5973%20179.612%2073.7794%20179.454%2071.8817C179.281%2069.7922%20178.203%2067.8954%20176.49%2066.6678C175.976%2066.2994%20175.423%2066.0047%20174.847%2065.7855C173.169%2064.7283%20171.143%2064.4052%20169.219%2064.9023C169.164%2064.9165%20169.11%2064.9316%20169.056%2064.9467C164.227%2066.3198%20160.002%2067.5643%20156.149%2068.7492C154.141%2069.3644%20152.964%2070.623%20152.461%2071.16C152.291%2071.342%20152.131%2071.5328%20151.981%2071.7308C151.477%2072.3991%20150.921%2073.1448%20150.333%2073.9392C150.072%2073.8016%20149.804%2073.68%20149.531%2073.5752C147.664%2072.4045%20145.38%2072.1266%20143.236%2072.8181C143.229%2072.8199%20143.223%2072.8226%20143.216%2072.8243C138.062%2074.5019%20132.908%2076.2426%20127.895%2077.9983C124.445%2079.2072%20121.72%2081.2408%20119.797%2084.043C118.02%2086.6304%20116.92%2089.8738%20116.432%2093.9587C116.193%2095.9558%20116.819%2097.9361%20118.115%2099.4229L93.2716%20108.91C93.2032%20108.936%2093.1349%20108.963%2093.0674%20108.991C81.9428%20113.643%2071.6535%20118.16%2061.7272%20122.752C62.0148%20122.293%2062.2944%20121.843%2062.5598%20121.405C62.6423%20121.268%2062.7267%20121.132%2062.8101%20120.995C63.0205%20120.651%2063.2512%20120.275%2063.4811%20119.876C64.4318%20118.414%2064.8312%20116.622%2064.5347%20114.821C64.5241%20114.757%2064.5126%20114.693%2064.5001%20114.629C64.0785%20112.448%2062.6965%20110.621%2060.7073%20109.616C60.4836%20109.503%2060.2537%20109.403%2060.0212%20109.315C59.8348%20109.197%2059.6421%20109.086%2059.4442%20108.985C57.4586%20107.975%2055.0798%20107.943%2053.0799%20108.9C48.0666%20111.298%2043.9969%20113.29%2040.2724%20115.171C40.2662%20115.175%2040.26%20115.177%2040.2546%20115.18C38.5149%20116.064%2037.5607%20117.395%2037.1524%20117.963C37.0255%20118.139%2036.9074%20118.321%2036.7974%20118.509C36.2204%20119.493%2035.5715%20120.614%2034.881%20121.814C34.6937%20121.704%2034.5011%20121.601%2034.3031%20121.506C33.5948%20121.168%2032.851%20120.95%2032.0947%20120.849C32.8181%20116.804%2033.7084%20112.845%2034.6218%20108.788C36.5888%20100.047%2038.4466%2091.7902%2038.4466%2082.9965C38.4439%2069.1114%2033.4395%2055.9621%2022.6974%2041.6172ZM250.409%2067.1293C249.791%2066.6091%20249.096%2066.2054%20248.358%2065.9266C246.816%2064.9484%20244.941%2064.6013%20243.13%2064.9848L221.174%2069.6306C223.504%2061.4813%20228.27%2052.6184%20236.901%2042.1924L239.789%2038.7031L208.59%2010.979C183.08%2023.0241%20147.324%2019.8411%20124.893%203.7955C102.464%2019.8411%2066.3189%2023.1449%2040.8076%2011.0989L9.49489%2038.7031L12.3823%2042.1924C34.8552%2069.3377%2031.1308%2085.8902%2026.4157%20106.846C25.1712%20112.374%2023.9037%20118.012%2023.0516%20124.062C19.5925%20125.9%2016.0953%20127.787%2012.6042%20129.702C6.3527%20133.133%203.24069%20138.77%203.08802%20146.934C3.04098%20149.454%204.34401%20151.807%206.50538%20153.105C6.87108%20153.324%207.2501%20153.507%207.64066%20153.655C7.68948%20153.685%207.73749%20153.716%207.78622%20153.745C9.28542%20154.646%2011.0403%20154.941%2012.7082%20154.629C12.6557%20156.801%2012.5883%20159.013%2012.5226%20161.163C12.3655%20166.305%2012.2039%20171.621%2012.2314%20176.73C12.2288%20176.919%2012.2137%20177.591%2012.2013%20178.187C12.0869%20183.475%2012.0868%20183.488%2012.3016%20184.424C12.8119%20186.66%2014.2748%20188.492%2016.3207%20189.451C16.4814%20189.527%2016.6438%20189.593%2016.8071%20189.656C17.061%20189.816%2017.3255%20189.961%2017.6016%20190.091C18.5806%20190.55%2019.6245%20190.779%2020.6692%20190.779C21.8071%20190.779%2022.9442%20190.507%2023.9969%20189.966C24.0067%20189.961%2024.0164%20189.956%2024.0262%20189.951C27.5394%20188.123%2030.7455%20186.478%2033.8211%20184.923C34.1629%20184.751%2034.4895%20184.552%2034.8002%20184.331C37.2074%20188.165%2039.944%20191.807%2043.0027%20195.232C57.3698%20211.324%2078.1562%20217.742%2094.8579%20222.902C106.36%20226.454%20116.295%20229.522%20121.543%20234.571L124.643%20237.552L127.743%20234.571C132.992%20229.522%20142.924%20226.453%20154.428%20222.902C171.131%20217.742%20191.915%20211.324%20206.283%20195.232C220.009%20179.863%20227.263%20160.144%20227.263%20138.209C227.263%20130.243%20226.252%20123.146%20224.934%20116.433C226.903%20116.004%20228.871%20115.583%20230.829%20115.173C234.672%20114.368%20237.641%20112.446%20239.653%20109.461C241.429%20106.828%20242.364%20103.544%20242.598%2099.1255C242.712%2097.0539%20242.738%2094.6111%20242.762%2092.2491C242.778%2090.733%20242.799%2088.6108%20242.866%2086.8967C244.349%2086.3357%20246.092%2085.4943%20247.724%2084.1221C249.964%2082.2394%20252.681%2078.7447%20252.908%2072.7843C252.991%2070.615%20252.069%2068.5283%20250.409%2067.1293Z'%20fill='black'/%3e%3cpath%20d='M67.8545%20149.253C68.7767%20148.838%2069.7007%20148.424%2070.6239%20148.012C70.8103%20145.755%2071.1857%20140.277%2071.4281%20136.611C70.4685%20137.047%2069.5179%20137.482%2068.5806%20137.912C68.4084%20140.155%2068.0684%20145.638%2067.8545%20149.253Z'%20fill='black'/%3e%3cpath%20d='M104.978%20133.663C105.913%20133.298%20106.866%20132.928%20107.846%20132.551C108.116%20130.206%20108.704%20124.448%20109.078%20120.697C108.097%20121.08%20107.119%20121.465%20106.147%20121.851C105.885%20124.187%20105.325%20129.959%20104.978%20133.663Z'%20fill='black'/%3e%3cpath%20d='M180.075%20108.618C181.091%20108.335%20182.107%20108.053%20183.118%20107.775C183.442%20105.254%20184.134%2099.28%20184.553%2095.5937C183.56%2095.8671%20182.564%2096.144%20181.57%2096.4218C181.232%2098.9365%20180.506%20104.958%20180.075%20108.618Z'%20fill='black'/%3e%3cpath%20d='M221.925%2086.4112C221.004%2086.6091%20220.077%2086.8097%20219.15%2087.013C218.889%2089.6413%20218.366%2095.5626%20218.073%2099.0625C219.048%2098.845%20220.033%2098.6267%20221.027%2098.4083C221.25%2095.773%20221.678%2089.9049%20221.925%2086.4112Z'%20fill='black'/%3e%3cpath%20d='M241.5%2077.6015C240.166%2078.7226%20238.514%2079.2223%20237.186%2079.6235C235.979%2079.9883%20235.108%2080.252%20234.699%2080.876C233.949%2082.0228%20233.858%2085.6665%20233.797%2091.5319C233.773%2093.8131%20233.749%2096.1724%20233.643%2098.0755C233.489%20101.006%20232.951%20103.116%20232%20104.527C231.12%20105.832%20229.839%20106.623%20227.97%20107.015C221.655%20108.336%20215.26%20109.763%20208.962%20111.255C208.29%20111.414%20207.306%20111.473%20206.437%20110.855C205.535%20110.215%20204.964%20108.973%20204.786%20107.265C204.71%20106.534%20204.713%20105.729%20204.794%20104.874C205.198%20100.58%20205.676%2096.231%20206.138%2092.0254C206.3%2090.5502%20206.461%2089.0838%20206.618%2087.6281L206.655%2087.2748C206.667%2087.1568%20206.667%2087.1568%20206.668%2087.1328C206.671%2087.0813%20206.684%2086.9171%20206.708%2086.6429L206.79%2085.7055L205.888%2085.9762C204.834%2086.2931%20203.931%2086.5443%20203.134%2086.7653C200.661%2087.4533%20199.298%2087.8323%20198.43%2088.8255C197.298%2090.1197%20196.918%2094.3989%20196.468%20100.778C196.318%20102.911%20196.175%20104.926%20195.985%20106.631C195.66%20109.62%20194.991%20111.8%20193.939%20113.294C192.961%20114.685%20191.608%20115.568%20189.681%20116.075C183.482%20117.706%20177.015%20119.497%20170.46%20121.399C169.774%20121.598%20168.778%20121.716%20167.936%20121.136C167.091%20120.555%20166.572%20119.373%20166.433%20117.717C166.373%20116.993%20166.394%20116.19%20166.494%20115.332C166.979%20111.165%20167.537%20106.912%20168.077%20102.798C168.294%20101.149%20168.508%2099.5073%20168.719%2097.8749C169.089%2094.9493%20169.789%2092.8047%20170.858%2091.3207C171.85%2089.9422%20173.207%2089.0466%20175.125%2088.5015C185.586%2085.5316%20195.11%2083.1589%20209.093%2080.0389L243.89%2072.6752C243.665%2074.8241%20242.879%2076.4414%20241.5%2077.6015ZM156.996%20125.437L156.388%20125.626C152.553%20119.343%20148.492%20113.038%20145.022%20107.696L144.508%20106.905L143.964%20107.676C143.109%20108.889%20142.254%20110.105%20141.401%20111.321L141.31%20111.452L141.29%20111.61C140.788%20115.686%20140.287%20119.762%20139.788%20123.839C139.505%20126.137%20139.224%20128.435%20138.942%20130.731C138.903%20131.031%20138.73%20131.295%20138.643%20131.358C134.804%20132.654%20131.795%20133.685%20128.992%20134.665C129.101%20133.665%20129.356%20131.501%20129.508%20130.209C129.635%20129.133%20129.707%20128.518%20129.717%20128.41C130.168%20123.695%20130.752%20119.274%20131.369%20114.592C131.65%20112.468%20131.939%20110.272%20132.219%20108.026L132.387%20106.672L131.24%20107.41C129.109%20108.779%20127.485%20109.539%20126.18%20110.149C124.764%20110.811%20123.74%20111.29%20123.067%20112.147C121.795%20113.764%20121.446%20118.828%20121.076%20124.19C120.928%20126.323%20120.79%20128.337%20120.594%20130.042C119.957%20135.737%20118.208%20138.515%20114.357%20139.947C108.225%20142.226%20101.971%20144.641%2095.7711%20147.126C95.0859%20147.4%2094.0953%20147.623%2093.2627%20147.13C92.4896%20146.672%2091.9854%20145.644%2091.8061%20144.16C91.7245%20143.483%2091.7174%20142.719%2091.7848%20141.887C92.0902%20138.146%2092.4567%20134.275%2092.81%20130.531C92.9893%20128.637%2093.1739%20126.678%2093.3497%20124.755C93.3808%20124.402%2093.387%20124.208%2093.3914%20124.067C93.3976%20123.872%2093.4003%20123.783%2093.4704%20123.396L93.7198%20122.024L92.518%20122.731C90.5341%20123.899%2089.1131%20124.595%2088.0754%20125.104C86.5443%20125.854%2085.701%20126.267%2085.0034%20127.235C83.806%20128.895%2083.6417%20133.776%2083.4669%20138.943C83.3941%20141.103%2083.3249%20143.145%2083.1793%20144.86C82.7231%20150.392%2081.0801%20153.178%2077.321%20154.797C71.3677%20157.36%2065.2582%20160.081%2059.1611%20162.884C58.1767%20163.336%2057.2642%20163.39%2056.5941%20163.035C55.8484%20162.64%2055.3327%20161.714%2055.1037%20160.357C54.9963%20159.715%2054.9599%20158.987%2054.9963%20158.193C55.1579%20154.647%2055.3718%20150.95%2055.5795%20147.375C55.6904%20145.457%2055.8058%20143.473%2055.9123%20141.518C56.1973%20136.01%2057.866%20133.035%2061.6748%20131.252C72.5251%20126.172%2083.7607%20121.211%2096.0215%20116.085L132.858%20102.019L132.903%20101.636C133.139%2099.6421%20133.377%2097.6476%20133.613%2095.6744C133.663%2095.2688%20133.738%2094.8365%20133.817%2094.3803C133.975%2093.4616%20134.139%2092.5118%20134.117%2091.6677C134.115%2091.6162%20134.109%2091.5727%20134.105%2091.5443L134.104%2091.5354C134.069%2091.2097%20133.918%2090.9478%20133.68%2090.7961C133.465%2090.6602%20133.2%2090.6318%20132.952%2090.7188C130.347%2091.6349%20127.31%2092.708%20124.202%2093.8353C124.962%2089.0386%20126.813%2086.5204%20130.433%2085.2519C135.308%2083.5442%20140.319%2081.8506%20145.331%2080.2173C145.19%2081.7299%20144.186%2089.1309%20143.495%2094.0918L143.426%2094.5889L143.893%2094.7735C144.338%2094.9493%20144.638%2094.6022%20144.782%2094.4353C144.885%2094.3164%20145.024%2094.1451%20145.205%2093.9125C145.529%2093.4971%20145.985%2092.8917%20146.6%2092.06C147.748%2090.5094%20149.298%2088.379%20150.939%2086.1236C153.376%2082.7737%20156.138%2078.9773%20158.091%2076.3864C158.191%2076.2798%20158.336%2076.1281%20158.404%2076.0943C161.806%2075.0478%20165.501%2073.9542%20169.661%2072.7639C169.604%2072.8376%20169.547%2072.9104%20169.49%2072.9841C167.674%2075.3354%20165.385%2078.0356%20162.962%2080.8937C156.93%2088.008%20151.233%2094.7282%20151.167%2097.826C151.116%20100.171%20154.46%20104.568%20158.333%20109.659C161.052%20113.234%20164.053%20117.181%20165.779%20120.403C165.858%20120.579%20165.947%20120.751%20166.046%20120.918C166.323%20121.466%20166.559%20121.993%20166.745%20122.487C163.506%20123.415%20160.199%20124.442%20156.996%20125.437ZM45.8893%20169.124C41.7148%20164.289%2037.3184%20159.484%2033.1865%20155.01L32.5971%20154.372L32.164%20155.125C31.4752%20156.321%2030.7872%20157.515%2030.1002%20158.706L29.8748%20159.098L29.8694%20159.259C29.707%20164.559%2029.5153%20170.793%2029.3253%20176.836C29.3155%20177.099%2029.154%20177.372%2029.0803%20177.424C26.2195%20178.87%2023.1794%20180.429%2019.8064%20182.18C19.8197%20181.231%2019.8579%20179.443%2019.8819%20178.353C19.9032%20177.359%2019.9147%20176.836%2019.9138%20176.737C19.8854%20171.752%2020.0461%20166.487%2020.2014%20161.397C20.2795%20158.836%2020.3603%20156.188%2020.4162%20153.605C20.4659%20151.072%2020.5174%20148.525%2020.5689%20145.972C20.5778%20145.57%2020.6062%20145.144%2020.6364%20144.691C20.6967%20143.79%2020.7597%20142.859%2020.6648%20142.034L20.6639%20142.025C20.6594%20141.989%2020.6515%20141.951%2020.6426%20141.913L20.6399%20141.902C20.5716%20141.58%2020.3914%20141.337%2020.1322%20141.218C20.0248%20141.168%2019.9094%20141.143%2019.7922%20141.143C19.6502%20141.143%2019.5064%20141.179%2019.3733%20141.252C16.698%20142.702%2013.8895%20144.244%2010.8148%20145.953C11.1175%20141.241%2012.7942%20138.36%2016.3003%20136.437C21.1858%20133.757%2026.0846%20131.129%2030.8671%20128.622C30.8681%20130.276%2030.5955%20137.544%2030.3949%20142.439L30.3745%20142.942L30.8591%20143.08C31.3287%20143.212%2031.5861%20142.832%2031.7397%20142.604C31.8435%20142.45%2031.982%20142.231%2032.1648%20141.932C32.4915%20141.398%2032.9495%20140.622%2033.5655%20139.562C34.7114%20137.59%2036.2186%20134.948%2037.8138%20132.151C39.81%20128.652%2041.8747%20125.034%2043.4075%20122.418C43.5078%20122.278%2043.6596%20122.07%2043.7315%20122.028C47.0148%20120.371%2050.5742%20118.622%2054.8303%20116.578C54.7877%20116.648%2054.7452%20116.718%2054.7025%20116.788C53.0205%20119.564%2050.8342%20122.799%2048.5193%20126.225C42.2385%20135.52%2038.143%20141.819%2038.4359%20144.582C38.6472%20146.574%2041.997%20149.811%2046.239%20153.908C49.2773%20156.843%2052.6308%20160.083%2054.5925%20162.782C54.7078%20162.978%2054.8348%20163.157%2054.9715%20163.321C55.244%20163.726%2055.4819%20164.117%2055.6762%20164.49C52.2793%20166.049%2048.7519%20167.746%2045.8893%20169.124ZM246.15%2070.0212C245.578%2069.5401%20244.817%2069.3484%20244.086%2069.5037L208.457%2077.0432C208.448%2077.045%20208.439%2077.0467%20208.431%2077.0485C194.385%2080.1818%20184.812%2082.5669%20174.29%2085.5546C171.708%2086.2878%20169.773%2087.5882%20168.374%2089.5303C166.98%2091.4671%20166.125%2093.9959%20165.683%2097.4843C165.474%2099.1131%20165.258%20100.753%20165.042%20102.399C164.635%20105.506%20164.217%20108.692%20163.827%20111.866C162.836%20110.516%20161.799%20109.154%20160.771%20107.803C158.993%20105.466%20157.314%20103.257%20156.065%20101.376C154.409%2098.8805%20154.246%2098.0231%20154.23%2097.8811C154.255%2097.6308%20154.544%2096.3535%20157.553%2092.3396C159.695%2089.4815%20162.544%2086.1218%20165.299%2082.8722C167.745%2079.9866%20170.056%2077.2607%20171.916%2074.8516C172.008%2074.7318%20172.103%2074.6111%20172.196%2074.4922C172.448%2074.1691%20172.706%2073.8362%20172.951%2073.4989C173.39%2073.0001%20173.625%2072.3299%20173.566%2071.626C173.506%2070.8902%20173.124%2070.22%20172.517%2069.7842C171.898%2069.3413%20171.098%2069.1877%20170.373%2069.375C170.355%2069.3794%20170.336%2069.3848%20170.318%2069.3901C165.518%2070.7544%20161.324%2071.9899%20157.501%2073.166C156.67%2073.4199%20156.146%2073.9818%20155.831%2074.3173C155.773%2074.3794%20155.718%2074.4451%20155.666%2074.5135C153.695%2077.1266%20150.915%2080.9487%20148.462%2084.3208C148.24%2084.6262%20148.014%2084.9351%20147.789%2085.2457C148.449%2080.2635%20148.428%2080.0487%20148.397%2079.7203C148.308%2078.7847%20147.856%2078.0045%20147.126%2077.5225C146.41%2077.0512%20145.508%2076.9402%20144.643%2077.2181C139.522%2078.885%20134.4%2080.615%20129.42%2082.3592C124.403%2084.1167%20121.811%2087.8633%20121.016%2094.5081C120.916%2095.3442%20121.258%2096.1733%20121.918%2096.6961C122.578%2097.2189%20123.462%2097.3618%20124.254%2097.0733C126.441%2096.2754%20128.613%2095.4987%20130.644%2094.7779C130.618%2094.9537%20130.593%2095.1294%20130.571%2095.3052C130.391%2096.8008%20130.211%2098.308%20130.032%2099.817L94.9156%20113.225C94.8916%20113.234%2094.8685%20113.244%2094.8454%20113.254C82.5412%20118.398%2071.2648%20123.377%2060.3728%20128.477C55.513%20130.752%2053.1936%20134.725%2052.851%20141.35C52.7444%20143.297%2052.6299%20145.278%2052.519%20147.195C52.3636%20149.875%2052.2048%20152.623%2052.0664%20155.329C50.8698%20154.124%2049.612%20152.908%2048.3658%20151.705C46.556%20149.957%2044.8473%20148.305%2043.5345%20146.88C41.9528%20145.161%2041.5711%20144.425%2041.485%20144.219C41.5124%20143.869%2041.8019%20142.479%2044.2694%20138.344C46.1193%20135.244%2048.6286%20131.531%2051.0553%20127.94C53.3916%20124.482%2055.5982%20121.216%2057.3211%20118.375C57.4081%20118.231%2057.4968%20118.086%2057.5847%20117.943C57.8154%20117.566%2058.0534%20117.178%2058.2753%20116.785C58.6419%20116.257%2058.7999%20115.596%2058.6907%20114.932C58.6879%20114.916%2058.6854%20114.9%2058.6818%20114.884C58.538%20114.112%2058.0516%20113.463%2057.3451%20113.104C56.6323%20112.741%2055.7819%20112.727%2055.0683%20113.068C50.0878%20115.451%2046.0465%20117.429%2042.3433%20119.299C41.6075%20119.673%2041.1823%20120.265%2040.9009%20120.657C40.8574%20120.718%2040.8166%20120.78%2040.7784%20120.845C39.2348%20123.479%2037.1596%20127.117%2035.1518%20130.635C34.7195%20131.392%2034.2695%20132.182%2033.8176%20132.973C33.9721%20128.271%2033.9144%20127.987%2033.8656%20127.745C33.6774%20126.813%2033.1102%20126.059%2032.3086%20125.676C31.5062%20125.294%2030.5663%20125.324%2029.7249%20125.762C24.8358%20128.322%2019.8225%20131.01%2014.8243%20133.752C12.4117%20135.075%2010.6728%20136.777%209.50831%20138.952C8.35528%20141.106%207.76581%20143.745%207.70465%20147.02C7.68867%20147.887%208.13692%20148.697%208.88075%20149.143C9.62449%20149.59%2010.5504%20149.605%2011.3074%20149.182C13.4973%20147.963%2015.5486%20146.828%2017.5085%20145.754C17.5067%20145.806%2017.5057%20145.857%2017.5039%20145.909C17.4525%20148.464%2017.4011%20151.012%2017.3513%20153.54C17.2954%20156.109%2017.2155%20158.75%2017.1374%20161.304C16.9812%20166.419%2016.8196%20171.708%2016.849%20176.746C16.8481%20176.87%2016.8321%20177.59%2016.817%20178.287C16.7149%20183%2016.7149%20183.012%2016.8019%20183.392C16.9928%20184.234%2017.5315%20184.916%2018.2806%20185.268C18.6321%20185.432%2019.0076%20185.515%2019.384%20185.515C19.7985%20185.515%2020.2147%20185.415%2020.6001%20185.216C20.6036%20185.214%2020.6063%20185.213%2020.6098%20185.211C24.2171%20183.336%2027.4392%20181.683%2030.4563%20180.157C31.7309%20179.515%2032.3425%20178.081%2032.3833%20176.944V176.933C32.566%20171.115%2032.7507%20165.126%2032.9096%20159.959C32.9957%20159.809%2033.0817%20159.66%2033.1687%20159.51C36.6385%20163.286%2040.2271%20167.247%2043.6526%20171.218C44.4985%20172.203%2045.9337%20172.489%2047.1417%20171.916C47.1453%20171.914%2047.1488%20171.912%2047.1534%20171.911C50.9416%20170.088%2054.098%20168.575%2057.3565%20167.087C57.3672%20167.082%2057.3769%20167.077%2057.3877%20167.072C57.7942%20166.88%2058.1296%20166.602%2058.3808%20166.271C59.0555%20166.181%2059.747%20165.979%2060.4375%20165.662C66.5125%20162.869%2072.5997%20160.159%2078.5299%20157.606C83.3764%20155.519%2085.6789%20151.782%2086.2293%20145.114C86.381%20143.322%2086.452%20141.243%2086.5257%20139.042C86.603%20136.758%2086.6828%20134.396%2086.8604%20132.459C87.1045%20129.808%2087.4391%20129.109%2087.4959%20129.007C87.7222%20128.702%2088.0746%20128.509%2089.4203%20127.85C89.6048%20127.759%2089.802%20127.664%2090.0105%20127.56C89.9262%20128.46%2089.841%20129.357%2089.7576%20130.24C89.4033%20133.994%2089.0359%20137.875%2088.7288%20141.636C88.6445%20142.672%2088.656%20143.643%2088.7625%20144.524C89.1389%20147.639%2090.5671%20149.092%2091.6988%20149.762C93.1856%20150.642%2095.0345%20150.715%2096.9065%20149.965C103.083%20147.49%20109.312%20145.084%20115.421%20142.813C117.925%20141.883%20119.785%20140.458%20121.109%20138.456C122.441%20136.444%20123.243%20133.878%20123.634%20130.385C123.837%20128.613%20123.978%20126.565%20124.127%20124.397C124.29%20122.036%20124.458%20119.593%20124.71%20117.592C125.054%20114.863%20125.417%20114.136%20125.484%20114.021C125.726%20113.738%20126.537%20113.359%20127.475%20112.92C127.807%20112.765%20128.17%20112.594%20128.565%20112.404C128.486%20113.004%20128.408%20113.599%20128.33%20114.189C127.709%20118.898%20127.123%20123.346%20126.667%20128.111C126.655%20128.227%20126.558%20129.051%20126.464%20129.848C125.855%20135.027%20125.856%20135.041%20125.886%20135.381C125.886%20135.387%20125.886%20135.392%20125.887%20135.397C125.971%20136.289%20126.424%20137.057%20127.13%20137.508C127.808%20137.941%20128.636%20138.034%20129.402%20137.763C132.37%20136.722%20135.527%20135.639%20139.638%20134.251C141.041%20133.778%20141.825%20132.333%20141.98%20131.104C142.262%20128.806%20142.545%20126.508%20142.827%20124.209C143.303%20120.333%20143.778%20116.457%20144.256%20112.582C144.305%20112.512%20144.354%20112.442%20144.403%20112.372C147.397%20117.005%20150.688%20122.161%20153.818%20127.293C154.508%20128.427%20155.935%20128.966%20157.211%20128.576C157.214%20128.575%20157.217%20128.574%20157.221%20128.573L157.904%20128.361C161.238%20127.326%20164.685%20126.255%20168.034%20125.301C168.475%20125.175%20168.873%20124.938%20169.192%20124.62C169.258%20124.622%20169.324%20124.623%20169.391%20124.623C170.017%20124.623%20170.664%20124.529%20171.317%20124.339C177.846%20122.445%20184.288%20120.66%20190.463%20119.036C193.091%20118.344%20195.049%20117.042%20196.447%20115.055C197.822%20113.099%20198.644%20110.527%20199.031%20106.968C199.228%20105.201%20199.373%20103.157%20199.526%20100.991C199.69%2098.6666%20199.859%2096.2621%20200.096%2094.2924C200.394%2091.8301%20200.685%2091.0171%20200.79%2090.7898C201.099%2090.5386%20202.117%2090.2298%20203.292%2089.8987C203.227%2090.4934%20203.161%2091.0898%20203.096%2091.6881C202.632%2095.9052%20202.153%20100.266%20201.747%20104.582C201.647%20105.637%20201.645%20106.645%20201.742%20107.579C202.086%20110.877%20203.521%20112.537%20204.665%20113.35C206.071%20114.348%20207.847%20114.663%20209.669%20114.233C215.941%20112.747%20222.31%20111.326%20228.6%20110.01C231.262%20109.452%20233.206%20108.218%20234.542%20106.237C235.829%20104.328%20236.516%20101.785%20236.703%2098.2415C236.812%2096.2709%20236.836%2093.877%20236.86%2091.5621C236.89%2088.6489%20236.935%2084.3963%20237.238%2082.8145C237.49%2082.7284%20237.811%2082.6317%20238.073%2082.5527C240.875%2081.7059%20246.707%2079.9431%20247.011%2071.966C247.038%2071.2213%20246.722%2070.5032%20246.15%2070.0212Z'%20fill='white'/%3e%3cpath%20d='M54.5925%20162.782C52.6308%20160.083%2049.2773%20156.843%2046.239%20153.908C41.997%20149.811%2038.6472%20146.574%2038.4359%20144.582C38.143%20141.82%2042.2376%20135.521%2048.5193%20126.225C50.8342%20122.799%2053.0205%20119.564%2054.7025%20116.788C54.7452%20116.718%2054.7877%20116.648%2054.8303%20116.578C50.5742%20118.622%2047.0148%20120.371%2043.7315%20122.028C43.6596%20122.07%2043.5078%20122.278%2043.4075%20122.418C41.8747%20125.034%2039.81%20128.652%2037.8138%20132.151C36.2186%20134.948%2034.7114%20137.59%2033.5655%20139.562C32.9495%20140.622%2032.4915%20141.398%2032.1648%20141.932C31.982%20142.231%2031.8435%20142.45%2031.7397%20142.604C31.5861%20142.832%2031.3287%20143.212%2030.8591%20143.08L30.3745%20142.942L30.3949%20142.439C30.5955%20137.544%2030.8681%20130.276%2030.8671%20128.622C26.0846%20131.128%2021.1849%20133.756%2016.3003%20136.437C12.7942%20138.36%2011.1175%20141.241%2010.8148%20145.953C13.8895%20144.244%2016.6989%20142.701%2019.3733%20141.252C19.5064%20141.179%2019.6502%20141.143%2019.7922%20141.143C19.9094%20141.143%2020.0248%20141.168%2020.1322%20141.218C20.3914%20141.337%2020.5716%20141.58%2020.6399%20141.902L20.6426%20141.913C20.6515%20141.951%2020.6594%20141.989%2020.6639%20142.025L20.6648%20142.034C20.7597%20142.859%2020.6967%20143.79%2020.6364%20144.691C20.6062%20145.144%2020.5778%20145.57%2020.5689%20145.972C20.5174%20148.525%2020.4659%20151.072%2020.4162%20153.605C20.3603%20156.188%2020.2795%20158.836%2020.2014%20161.397C20.0461%20166.487%2019.8854%20171.752%2019.9138%20176.737C19.9147%20176.836%2019.9032%20177.359%2019.8819%20178.353C19.8579%20179.443%2019.8197%20181.231%2019.8064%20182.18C23.1794%20180.429%2026.2195%20178.87%2029.0803%20177.424C29.154%20177.372%2029.3155%20177.099%2029.3253%20176.836C29.5153%20170.793%2029.707%20164.559%2029.8694%20159.259L29.8748%20159.098L30.1002%20158.706C30.7872%20157.515%2031.4752%20156.321%2032.164%20155.125L32.5971%20154.372L33.1865%20155.01C37.3184%20159.484%2041.7148%20164.289%2045.8893%20169.124C48.7519%20167.746%2052.2802%20166.049%2055.6781%20164.491C55.4837%20164.117%2055.2467%20163.727%2054.9733%20163.322C54.8356%20163.157%2054.7078%20162.978%2054.5925%20162.782Z'%20fill='%23F47121'/%3e%3cpath%20d='M110.736%20134.063C110.697%20134.275%20110.609%20134.769%20110.108%20134.961C107.546%20135.945%20105.173%20136.869%20102.855%20137.787C102.758%20137.825%20102.656%20137.845%20102.554%20137.845C102.403%20137.845%20102.251%20137.802%20102.113%20137.719C101.843%20137.556%20101.66%20137.257%20101.623%20136.92C101.603%20136.742%20102.005%20132.505%20102.347%20128.982C102.63%20126.063%20103.123%20121.061%20103.25%20120.356C103.289%20120.144%20103.379%20119.655%20103.869%20119.459C106.296%20118.494%20108.777%20117.521%20111.242%20116.569C111.498%20116.469%20111.781%20116.492%20112.016%20116.633C112.265%20116.783%20112.427%20117.048%20112.463%20117.361L112.464%20117.373C112.496%20117.72%20110.897%20133.162%20110.736%20134.063ZM73.5637%20149.413C73.5353%20149.604%2073.4616%20150.106%2072.977%20150.317C70.6097%20151.368%2068.2202%20152.443%2065.8786%20153.51C65.7695%20153.56%2065.6541%20153.585%2065.5378%20153.585C65.3983%20153.585%2065.2582%20153.549%2065.1277%20153.479C64.8534%20153.331%2064.6608%20153.046%2064.6102%20152.717C64.5827%20152.54%2064.8312%20148.405%2065.0443%20144.968C65.2208%20142.119%2065.5325%20137.237%2065.6328%20136.538C65.6585%20136.353%2065.7277%20135.855%2066.2071%20135.633C68.5513%20134.552%2070.9878%20133.442%2073.4492%20132.336C73.7102%20132.22%2073.9986%20132.231%2074.241%20132.365C74.493%20132.505%2074.6635%20132.761%2074.7078%20133.068C74.7549%20133.403%2073.696%20148.523%2073.5637%20149.413ZM165.781%20120.401C164.055%20117.179%20161.053%20113.233%20158.335%20109.657C154.462%20104.566%20151.118%20100.169%20151.169%2097.8243C151.236%2094.7265%20156.932%2088.0063%20162.963%2080.8919C165.387%2078.0338%20167.676%2075.3336%20169.492%2072.9823C169.549%2072.9086%20169.606%2072.8359%20169.662%2072.7622C165.503%2073.9525%20161.808%2075.046%20158.406%2076.0926C158.337%2076.1263%20158.192%2076.279%20158.093%2076.3846C156.139%2078.9765%20153.378%2082.7719%20150.941%2086.1218C149.299%2088.3773%20147.75%2090.5076%20146.602%2092.0583C145.987%2092.8891%20145.53%2093.4953%20145.207%2093.9107C145.025%2094.1433%20144.887%2094.3146%20144.784%2094.4336C144.639%2094.6004%20144.339%2094.9484%20143.895%2094.7717L143.428%2094.5871L143.497%2094.09C144.188%2089.1291%20145.191%2081.7281%20145.333%2080.2156C140.321%2081.8488%20135.31%2083.5424%20130.435%2085.2502C126.814%2086.5186%20124.964%2089.0368%20124.204%2093.8335C127.311%2092.7053%20130.349%2091.6331%20132.954%2090.7171C133.202%2090.6301%20133.467%2090.6585%20133.682%2090.7943C133.92%2090.9452%20134.07%2091.207%20134.106%2091.5337L134.107%2091.5426C134.11%2091.571%20134.117%2091.6145%20134.118%2091.6659C134.141%2092.5101%20133.976%2093.4598%20133.818%2094.3785C133.739%2094.8356%20133.665%2095.267%20133.615%2095.6727C133.378%2097.6459%20133.141%2099.6404%20132.905%20101.634L132.86%20102.017L96.0233%20116.084C83.7616%20121.21%2072.527%20126.171%2061.6766%20131.25C57.8687%20133.034%2056.1991%20136.007%2055.9142%20141.516C55.8077%20143.47%2055.6923%20145.454%2055.5813%20147.373C55.3745%20150.949%2055.1597%20154.646%2054.9981%20158.191C54.9617%20158.985%2054.9981%20159.713%2055.1055%20160.356C55.3345%20161.713%2055.8503%20162.639%2056.5959%20163.033C57.2669%20163.388%2058.1785%20163.335%2059.1629%20162.882C65.26%20160.079%2071.3695%20157.358%2077.3228%20154.796C81.0828%20153.177%2082.7249%20150.391%2083.1811%20144.859C83.3267%20143.143%2083.3959%20141.102%2083.4687%20138.941C83.6436%20133.774%2083.8078%20128.893%2085.0052%20127.233C85.7028%20126.265%2086.5461%20125.852%2088.0773%20125.102C89.1149%20124.593%2090.536%20123.896%2092.5198%20122.729L93.7217%20122.022L93.4722%20123.394C93.4021%20123.781%2093.3994%20123.87%2093.3932%20124.065C93.3888%20124.207%2093.3826%20124.401%2093.3515%20124.753C93.1758%20126.677%2092.9911%20128.636%2092.8118%20130.53C92.4577%20134.274%2092.092%20138.145%2091.7866%20141.885C91.7192%20142.716%2091.7263%20143.481%2091.8079%20144.158C91.9872%20145.643%2092.4914%20146.67%2093.2645%20147.128C94.0971%20147.621%2095.0877%20147.398%2095.773%20147.124C101.973%20144.639%20108.226%20142.224%20114.359%20139.945C118.21%20138.513%20119.959%20135.736%20120.596%20130.04C120.792%20128.335%20120.93%20126.321%20121.077%20124.189C121.447%20118.827%20121.795%20113.763%20123.069%20112.145C123.743%20111.289%20124.766%20110.809%20126.182%20110.147C127.487%20109.536%20129.111%20108.777%20131.242%20107.408L132.389%20106.67L132.221%20108.024C131.941%20110.271%20131.652%20112.467%20131.371%20114.591C130.754%20119.272%20130.171%20123.693%20129.719%20128.408C129.709%20128.517%20129.637%20129.131%20129.51%20130.207C129.358%20131.499%20129.103%20133.663%20128.994%20134.663C131.797%20133.683%20134.807%20132.652%20138.644%20131.356C138.73%20131.293%20138.905%20131.029%20138.943%20130.729C139.226%20128.433%20139.508%20126.135%20139.789%20123.837C140.29%20119.761%20140.79%20115.684%20141.292%20111.608L141.312%20111.45L141.403%20111.32C142.256%20110.103%20143.111%20108.887%20143.966%20107.674L144.51%20106.903L145.024%20107.694C148.493%20113.036%20152.555%20119.342%20156.39%20125.625L156.998%20125.436C160.2%20124.442%20163.507%20123.414%20166.747%20122.483C166.562%20121.988%20166.326%20121.463%20166.049%20120.914C165.949%20120.749%20165.86%20120.577%20165.781%20120.401Z'%20fill='%23F47121'/%3e%3cpath%20d='M70.6239%20148.012C69.7007%20148.424%2068.7767%20148.838%2067.8545%20149.253C68.0684%20145.638%2068.4083%20140.155%2068.5814%20137.911C69.5188%20137.481%2070.4694%20137.047%2071.4289%20136.61C71.1857%20140.277%2070.8103%20145.755%2070.6239%20148.012ZM74.241%20132.365C73.9986%20132.231%2073.7102%20132.22%2073.4492%20132.336C70.9878%20133.442%2068.5513%20134.552%2066.2071%20135.633C65.7277%20135.855%2065.6585%20136.353%2065.6328%20136.538C65.5325%20137.237%2065.2208%20142.119%2065.0443%20144.968C64.8312%20148.405%2064.5827%20152.54%2064.6102%20152.717C64.6599%20153.045%2064.8534%20153.331%2065.1277%20153.479C65.2582%20153.549%2065.3983%20153.585%2065.5378%20153.585C65.6541%20153.585%2065.7695%20153.56%2065.8786%20153.51C68.2202%20152.443%2070.6097%20151.368%2072.977%20150.317C73.4616%20150.105%2073.5362%20149.603%2073.5637%20149.413C73.696%20148.523%2074.7549%20133.403%2074.7078%20133.068C74.6635%20132.761%2074.493%20132.505%2074.241%20132.365Z'%20fill='white'/%3e%3cpath%20d='M107.846%20132.551C106.866%20132.928%20105.913%20133.298%20104.978%20133.663C105.326%20129.96%20105.884%20124.187%20106.146%20121.85C107.117%20121.464%20108.096%20121.08%20109.077%20120.696C108.703%20124.448%20108.117%20130.206%20107.846%20132.551ZM112.463%20117.361C112.427%20117.048%20112.265%20116.783%20112.016%20116.633C111.781%20116.492%20111.498%20116.469%20111.242%20116.569C108.777%20117.521%20106.296%20118.494%20103.869%20119.459C103.379%20119.655%20103.289%20120.144%20103.25%20120.356C103.123%20121.061%20102.63%20126.063%20102.347%20128.982C102.005%20132.505%20101.603%20136.742%20101.623%20136.92C101.66%20137.257%20101.843%20137.556%20102.113%20137.719C102.251%20137.802%20102.403%20137.845%20102.554%20137.845C102.656%20137.845%20102.758%20137.825%20102.855%20137.787C105.173%20136.869%20107.546%20135.945%20110.108%20134.961C110.609%20134.769%20110.697%20134.275%20110.736%20134.063L110.735%20134.062C110.896%20133.161%20112.496%20117.719%20112.464%20117.373L112.463%20117.361Z'%20fill='white'/%3e%3cpath%20d='M215.455%2093.8024C215.709%2090.899%20216.153%2085.9265%20216.269%2085.2413C216.354%2084.7398%20216.592%2084.4424%20216.975%2084.3563C219.131%2083.8761%20221.304%2083.411%20223.406%2082.961L224.051%2082.8234C224.288%2082.7719%20224.543%2082.8252%20224.749%2082.9716C224.979%2083.1341%20225.131%2083.4004%20225.168%2083.6995C225.211%2084.0572%20224.068%2099.28%20223.934%20100.154V100.157C223.903%20100.349%20223.811%20100.934%20223.225%20101.062C220.747%20101.601%20218.302%20102.144%20215.955%20102.68C215.896%20102.693%20215.837%20102.699%20215.777%20102.699C215.606%20102.699%20215.435%20102.644%20215.284%20102.537C215.027%20102.356%20214.85%20102.048%20214.811%20101.711C214.787%20101.515%20215.204%2096.6721%20215.455%2093.8024ZM187.05%20100.69C186.628%20104.328%20186.098%20108.802%20185.97%20109.466C185.93%20109.671%20185.824%20110.216%20185.273%20110.361C182.822%20111.029%20180.325%20111.724%20177.854%20112.424C177.782%20112.444%20177.709%20112.454%20177.635%20112.454C177.465%20112.454%20177.295%20112.401%20177.147%20112.299C176.888%20112.119%20176.715%20111.808%20176.684%20111.465C176.668%20111.266%20177.256%20106.345%20177.608%20103.43C177.965%20100.477%20178.586%2095.4206%20178.729%2094.7202C178.77%2094.5205%20178.879%2093.9915%20179.423%2093.8442C181.877%2093.1518%20184.358%2092.4657%20186.792%2091.8079C187.041%2091.7396%20187.31%2091.7858%20187.527%2091.9358C187.762%2092.0982%20187.915%2092.368%20187.944%2092.676L187.945%2092.6885C187.958%2092.8403%20187.323%2098.3347%20187.05%20100.69ZM175.127%2088.5015C173.208%2089.0465%20171.852%2089.9422%20170.86%2091.3206C169.791%2092.8056%20169.091%2094.9492%20168.721%2097.8749C168.51%2099.5072%20168.295%20101.149%20168.079%20102.798C167.539%20106.911%20166.982%20111.165%20166.496%20115.332C166.396%20116.191%20166.375%20116.993%20166.435%20117.717C166.574%20119.373%20167.093%20120.555%20167.938%20121.136C168.781%20121.716%20169.776%20121.598%20170.462%20121.399C177.016%20119.497%20183.483%20117.706%20189.683%20116.075C191.61%20115.568%20192.963%20114.684%20193.941%20113.294C194.992%20111.799%20195.661%20109.62%20195.987%20106.631C196.177%20104.925%20196.32%20102.911%20196.47%20100.778C196.92%2094.398%20197.299%2090.1197%20198.432%2088.8255C199.3%2087.8332%20200.663%2087.4541%20203.136%2086.7653C203.932%2086.5434%20204.835%2086.2922%20205.89%2085.9763L206.792%2085.7055L206.71%2086.6429C206.686%2086.9162%20206.673%2087.0813%20206.67%2087.1328C206.669%2087.1568%20206.669%2087.1568%20206.657%2087.2748L206.62%2087.6281C206.462%2089.0838%20206.302%2090.5502%20206.139%2092.0254C205.677%2096.231%20205.199%20100.58%20204.796%20104.874C204.715%20105.729%20204.711%20106.534%20204.788%20107.265C204.966%20108.974%20205.537%20110.216%20206.439%20110.855C207.308%20111.472%20208.291%20111.413%20208.964%20111.255C215.262%20109.763%20221.658%20108.336%20227.972%20107.015C229.842%20106.623%20231.122%20105.832%20232.002%20104.527C232.953%20103.116%20233.491%20101.006%20233.645%2098.0755C233.75%2096.1724%20233.775%2093.8131%20233.799%2091.5319C233.859%2085.6665%20233.95%2082.0219%20234.7%2080.876C235.11%2080.2511%20235.981%2079.9883%20237.188%2079.6235C238.516%2079.2223%20240.167%2078.7226%20241.501%2077.6015C242.881%2076.4414%20243.668%2074.825%20243.894%2072.6752L209.097%2080.0389C195.112%2083.158%20185.588%2085.5307%20175.127%2088.5015Z'%20fill='%23F47121'/%3e%3cpath%20d='M183.118%20107.775C182.107%20108.053%20181.091%20108.335%20180.075%20108.618C180.505%20104.958%20181.232%2098.9365%20181.572%2096.4218C182.566%2096.1431%20183.562%2095.867%20184.555%2095.5937C184.135%2099.28%20183.442%20105.254%20183.118%20107.775ZM187.945%2092.6752C187.916%2092.3671%20187.764%2092.0982%20187.528%2091.9349C187.311%2091.785%20187.042%2091.7387%20186.793%2091.8071C184.359%2092.4658%20181.878%2093.1509%20179.424%2093.8433C178.88%2093.9915%20178.771%2094.5205%20178.73%2094.7194C178.586%2095.4188%20177.966%20100.477%20177.609%20103.429C177.257%20106.345%20176.668%20111.265%20176.685%20111.464C176.715%20111.807%20176.888%20112.119%20177.148%20112.298C177.296%20112.4%20177.466%20112.453%20177.636%20112.453C177.71%20112.453%20177.783%20112.443%20177.855%20112.423C180.325%20111.723%20182.823%20111.028%20185.274%20110.36C185.825%20110.215%20185.93%20109.671%20185.97%20109.466L185.971%20109.466C186.099%20108.802%20186.628%20104.327%20187.051%20100.69C187.324%2098.3347%20187.959%2092.8394%20187.947%2092.6858L187.945%2092.6752Z'%20fill='white'/%3e%3cpath%20d='M219.15%2087.013C220.077%2086.8097%20221.004%2086.6091%20221.925%2086.4112C221.678%2089.9049%20221.249%2095.773%20221.027%2098.4074C220.034%2098.6258%20219.048%2098.8442%20218.074%2099.0616C218.367%2095.5617%20218.89%2089.6413%20219.15%2087.013ZM215.282%20102.538C215.434%20102.645%20215.604%20102.7%20215.775%20102.7C215.835%20102.7%20215.893%20102.694%20215.953%20102.68C218.3%20102.145%20220.745%20101.601%20223.223%20101.063C223.808%20100.934%20223.901%20100.35%20223.932%20100.158V100.155C224.067%2099.2809%20225.209%2084.0581%20225.166%2083.7004C225.13%2083.4004%20224.977%2083.135%20224.748%2082.9725C224.542%2082.8261%20224.286%2082.7719%20224.049%2082.8243L223.404%2082.9619C221.303%2083.4119%20219.13%2083.877%20216.973%2084.3572C216.589%2084.4433%20216.352%2084.7416%20216.267%2085.2422C216.151%2085.9274%20215.707%2090.8999%20215.453%2093.8033C215.202%2096.673%20214.785%20101.516%20214.808%20101.712C214.85%20102.048%20215.026%20102.356%20215.282%20102.538Z'%20fill='white'/%3e%3c/svg%3e";
//#endregion
//#region src/assets/logos/kärpät.svg
var kärpät_default = "data:image/svg+xml,%3csvg%20width='304'%20height='195'%20viewBox='0%200%20304%20195'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M159.382%203.01161L167.003%203.37372L174.501%203.97796L181.889%204.79051L189.155%205.83104L196.284%207.10005L203.266%208.58339L210.101%2010.2587L211.801%2010.8716C213.399%209.07092%20215.254%207.44688%20217.345%206.01536C217.558%207.12949%20217.711%208.02985%20217.842%208.85659C224.67%202.73893%20233.581%20-0.545662%20244.839%200.0743937L242.68%203.8089C249.172%202.3332%20256.947%201.86802%20266.334%204.5462L261.713%208.58339C277.034%2010.2805%20283.515%2022.3173%20279.384%2041.1131C275.658%2035.8811%20269.93%2031.2909%20264.512%2030.2428C264.552%2031.2462%20264.327%2033.3796%20264.302%2035.0102C266.843%2036.5971%20269.912%2038.7442%20272.523%2040.7521L276.794%2044.4932L280.796%2048.3602L284.511%2052.3745L287.926%2056.5071L291.031%2060.7657L293.82%2065.1415L296.272%2069.651L298.386%2074.2488L300.142%2078.9638L301.525%2083.7754L302.532%2088.6687L303.144%2093.6346L303.351%2098.66L303.144%20103.686L302.532%20108.66L301.525%20113.56L300.142%20118.365L298.386%20123.065L296.272%20127.678L293.82%20132.172L291.031%20136.555L287.926%20140.82L284.511%20144.961L280.796%20148.968L276.794%20152.843L272.523%20156.555L267.986%20160.163L263.192%20163.587L258.15%20166.879L252.875%20170.008L247.364%20172.974L241.64%20175.771L235.72%20178.406L229.59%20180.841L223.269%20183.122L216.766%20185.181L210.101%20187.048L203.266%20188.738L196.284%20190.221L189.155%20191.476L181.889%20192.531L174.501%20193.35L167.003%20193.947L159.382%20194.309L151.677%20194.427L143.972%20194.309L136.351%20193.947L128.846%20193.35L121.462%20192.531L114.195%20191.476L107.07%20190.221L100.084%20188.738L93.2494%20187.048L86.5771%20185.181L80.0776%20183.122L73.7558%20180.841L67.6335%20178.406L61.6988%20175.771L55.9782%20172.974L50.4752%20170.008L45.2011%20166.879L40.1593%20163.587L35.36%20160.163L30.8273%20156.555L26.5448%20152.843L22.554%20148.968L18.84%20144.954L15.4248%20140.82L12.3187%20136.555L9.5304%20132.172L7.06643%20127.678L4.9568%20123.065L3.20859%20118.365L1.81798%20113.56L0.818767%20108.66L0.202242%20103.686L0%2098.66L0.202242%2093.6346L0.818767%2088.6687L1.81798%2083.7754L3.20859%2078.9638L4.9568%2074.2488L7.06643%2069.651L9.5304%2065.1415L12.3187%2060.7657L15.4248%2056.5071L18.84%2052.3679L22.554%2048.3602L26.5448%2044.4932L30.8273%2040.7521L35.36%2037.1725L40.1593%2033.7264L45.2011%2030.45L50.4752%2027.3203L55.9782%2024.3471L61.6988%2021.5424L67.6335%2018.9367L73.7558%2016.4729L80.0776%2014.207L86.5771%2012.1325L93.2494%2010.2587L100.084%208.58339L107.07%207.10005L114.195%205.83104L121.462%204.79051L128.846%203.97796L136.351%203.37372L143.972%203.01161L151.677%202.88617L159.382%203.01161ZM151.677%2022.0441C152.787%2022.0441%20153.886%2022.0512%20154.982%2022.0665H155.074C156.144%2022.0812%20157.224%2022.1177%20158.29%2022.1401H158.415C159.478%2022.1772%20160.532%2022.2213%20161.588%2022.2655C161.647%2022.2655%20161.706%2022.2655%20161.765%2022.2726C162.801%2022.3173%20163.83%2022.3686%20164.86%2022.428C164.937%2022.4351%20165.014%2022.4351%20165.091%2022.4351C166.102%2022.5093%20167.102%2022.5758%20168.109%2022.6494C168.201%2022.6642%20168.308%2022.6642%20168.407%2022.6789C169.363%2022.7525%20170.318%2022.8267%20171.27%2022.915C171.399%2022.9227%20171.536%2022.9368%20171.675%2022.9521C172.586%2023.0328%20173.501%2023.1141%20174.401%2023.2106C174.582%2023.2248%20174.748%2023.2471%20174.925%2023.2766C175.802%2023.3655%20176.673%2023.4614%20177.544%2023.5716C177.75%2023.5792%20177.954%2023.6163%20178.16%2023.6458C178.997%2023.7341%20179.83%2023.8448%20180.657%2023.9555C180.911%2024.0002%20181.166%2024.0297%20181.423%2024.0733C182.18%2024.1693%20182.929%2024.2806%20183.681%2024.3984C183.991%2024.4431%20184.301%2024.4791%20184.611%2024.5391C185.312%2024.6492%20186.013%2024.7528%20186.71%2024.863C187.075%2024.9219%20187.443%2024.9884%20187.797%2025.0473C188.454%2025.1509%20189.1%2025.284%20189.748%2025.3876C190.154%2025.4683%20190.56%2025.5349%20190.966%2025.609C191.559%2025.7192%20192.157%2025.8446%20192.748%2025.9558C193.19%2026.0507%20193.629%2026.1325%20194.072%2026.2209C194.595%2026.3245%20195.112%2026.4347%20195.628%2026.5536C196.14%2026.6561%20196.646%2026.7673%20197.155%2026.8775C197.605%2026.9735%20198.055%2027.0694%20198.501%2027.1872C199.077%2027.2985%20199.645%2027.4386%20200.216%2027.5788C200.625%2027.6748%20201.042%2027.7708%20201.448%2027.8744C202.035%2028.0216%20202.617%2028.1618%20203.207%2028.3019C203.573%2028.4126%20203.937%2028.5086%20204.303%2028.6046H204.329C204.657%2023.5345%20206.332%2018.4797%20209.319%2014.0521C208.839%2013.9267%20208.357%2013.7936%20207.881%2013.6605C190.534%209.21053%20171.558%206.74612%20151.677%206.74612C70.2594%206.74612%203.86165%2048.0352%203.86165%2098.66C3.86165%20149.286%2070.2594%20190.568%20151.677%20190.568C233.087%20190.568%20299.489%20149.286%20299.489%2098.66C299.489%2070.9347%20281.648%2050.0944%20259.101%2035.5566C257.486%2034.6486%20255.781%2033.9479%20253.664%2033.3796C248.069%2031.8963%20245.683%2032.819%20246.069%2035.032C246.981%2040.3158%20260.422%2045.1645%20260.097%2056.301C260.348%2056.5147%20260.587%2056.7214%20260.831%2056.9499C261.174%2057.2602%20261.517%2057.5847%20261.86%2057.9021C262.089%2058.1088%20262.314%2058.3231%20262.546%2058.5516C262.875%2058.8613%20263.206%2059.1864%20263.531%2059.489C263.73%2059.6881%20263.929%2059.88%20264.121%2060.0867C264.409%2060.3599%20264.693%2060.6479%20264.966%2060.9424C265.228%2061.2227%20265.486%2061.4812%20265.741%2061.7549C266.01%2062.0276%20266.272%2062.3156%20266.533%2062.61C266.787%2062.8903%20267.042%2063.1783%20267.297%2063.452C267.533%2063.7247%20267.757%2063.9832%20267.986%2064.2488C268.245%2064.5585%20268.503%2064.8541%20268.758%2065.1492C268.938%2065.3629%20269.115%2065.5843%20269.288%2065.8134C269.554%2066.1308%20269.827%2066.4705%20270.089%2066.7945C270.274%2067.0459%20270.458%2067.2744%20270.642%2067.5252C270.9%2067.8721%20271.155%2068.2113%20271.406%2068.5515C271.564%2068.7653%20271.726%2068.9944%20271.881%2069.2081C272.147%2069.5921%20272.409%2069.9684%20272.674%2070.337C272.785%2070.5213%20272.899%2070.6838%20273.017%2070.8605C273.295%2071.2739%20273.56%2071.6873%20273.826%2072.1006C273.939%2072.2855%20274.043%2072.4622%20274.165%2072.6471C274.408%2073.0381%20274.651%2073.4591%20274.895%2073.8572C274.991%2074.0344%20275.094%2074.2193%20275.189%2074.3742C275.436%2074.817%20275.684%2075.2446%20275.92%2075.6797C275.986%2075.8281%20276.064%2075.96%20276.13%2076.1007C276.385%2076.573%20276.636%2077.0747%20276.876%2077.5546C276.942%2077.6877%20276.997%2077.8055%20277.056%2077.9385C277.281%2078.4032%20277.51%2078.8831%20277.72%2079.3848C277.772%2079.4879%20277.831%2079.6062%20277.879%2079.724C278.097%2080.2186%20278.299%2080.7127%20278.495%2081.2297C278.539%2081.3257%20278.58%2081.4217%20278.609%2081.5024C278.827%2082.0335%20279.022%2082.58%20279.214%2083.1111C279.247%2083.2147%20279.273%2083.3031%20279.306%2083.3991C279.498%2083.9531%20279.679%2084.5061%20279.852%2085.0526C279.874%2085.1256%20279.885%2085.178%20279.911%2085.2511C280.081%2085.7975%20280.232%2086.3581%20280.379%2086.9193C280.398%2086.9711%20280.412%2087.03%20280.424%2087.0818C280.575%2087.6577%20280.712%2088.2401%20280.845%2088.8378C280.859%2088.8825%20280.87%2088.9567%20280.884%2089.0156C281.01%2089.598%20281.125%2090.1957%20281.231%2090.7868C281.239%2090.8305%20281.246%2090.8894%20281.258%2090.9417C281.356%2091.5318%20281.449%2092.1295%20281.523%2092.7348C281.53%2092.7643%20281.53%2092.7714%20281.542%2092.7937C281.615%2093.4061%20281.685%2094.0262%20281.736%2094.6462C281.736%2094.6904%20281.748%2094.7417%20281.752%2094.8011C281.799%2095.4065%20281.84%2096.0336%20281.873%2096.6313C281.873%2096.6749%20281.873%2096.7196%20281.877%2096.7567C281.899%2097.3839%20281.918%2098.0187%20281.918%2098.66C281.918%20140.858%20223.412%20175.277%20151.677%20175.277C79.9457%20175.277%2021.4397%20140.858%2021.4397%2098.66C21.4397%2056.4635%2079.9457%2022.0441%20151.677%2022.0441Z'%20fill='black'/%3e%3cpath%20d='M155.008%2018.5832L154.956%2025.5347H154.938H154.03L153.931%2025.5195H151.888L151.78%2025.5347H151.677V18.5385H151.78L151.888%2018.5538H152.935L153.042%2018.5756H154.303L154.399%2018.5832H155.026H155.008ZM154.938%2025.5347L155.026%2018.5832L155.2%2018.5974L155.38%2018.6127L155.55%2018.6198L155.723%2018.664L155.889%2018.7087L156.225%2018.797L156.372%2018.8712L156.534%2018.9443L156.675%2019.0261L156.819%2019.1068L156.963%2019.2104L157.092%2019.2987L157.224%2019.4094L157.357%2019.5125L157.471%2019.6238L157.582%2019.7563L157.696%2019.8746L157.796%2020.0148L157.892%2020.1473L157.98%2020.288L158.062%2020.4429L158.135%2020.5977L158.202%2020.745L158.268%2020.9075L158.323%2021.0629L158.36%2021.2325L158.397%2021.4092L158.427%2021.5646L158.452%2021.749L158.46%2021.9257L158.464%2022.1176L158.46%2022.2954L158.442%2022.4721L158.415%2022.6346L158.383%2022.8189L158.29%2023.144L158.235%2023.2988L158.176%2023.4613L158.099%2023.6162L158.025%2023.7635L157.936%2023.9042L157.844%2024.0361L157.752%2024.1768L157.641%2024.3099L157.527%2024.443L157.298%2024.6709L157.162%2024.7898L157.032%2024.8781L156.896%2024.9741L156.748%2025.0625L156.605%2025.1432L156.454%2025.225L156.295%2025.2915L156.136%2025.3504L155.981%2025.4017L155.646%2025.49L155.472%2025.5129L155.299%2025.5195L155.118%2025.5347H154.938ZM155.104%2018.5832L155.03%2025.5565H155.041H155.059H154.904H155.048H155.041H154.886H155.037H155.03H154.875H155.026H154.863L154.857%2025.5347L155.008%2025.5565H155L154.842%2025.5347L154.989%2025.5565L154.956%2025.5347L155.008%2018.5832L154.989%2018.5756L155.147%2018.5832L155%2018.5756H155.008L155.163%2018.5832L155.015%2018.5756H155.026L155.173%2018.5832H155.181L155.03%2018.5756H155.037L155.184%2018.5832L155.041%2018.5756H155.048L155.2%2018.5832H155.21L155.055%2018.5756H155.059L155.096%2018.5832H155.104ZM155.041%2025.5565L155.096%2018.5832L155.269%2018.5974L155.447%2018.6127L155.619%2018.6198L155.793%2018.664L155.966%2018.7087L156.132%2018.7523L156.291%2018.797L156.45%2018.8712L156.601%2018.9443L156.748%2019.0261L156.896%2019.1068L157.032%2019.1951L157.173%2019.2987L157.302%2019.3947L157.427%2019.5054L157.552%2019.6238L157.659%2019.7415L157.874%2020.0071L157.97%2020.1402L158.062%2020.2804L158.143%2020.4205L158.22%2020.5754L158.287%2020.7379L158.349%2020.9004L158.397%2021.0629L158.445%2021.2325L158.478%2021.3874L158.515%2021.557L158.534%2021.7413L158.541%2021.9115L158.548%2022.0882L158.541%2022.2725L158.53%2022.4503L158.5%2022.6128L158.471%2022.7971L158.427%2022.9596L158.383%2023.1287L158.327%2023.2988L158.268%2023.4461L158.191%2023.5944L158.028%2023.9042L157.936%2024.0361L157.836%2024.1768L157.737%2024.3023L157.627%2024.4277L157.508%2024.5531L157.387%2024.6567L157.261%2024.7593L157.128%2024.8629L156.992%2024.9665L156.852%2025.0625L156.7%2025.1432L156.553%2025.2174L156.398%2025.2839L156.24%2025.3504L156.074%2025.4017L155.915%2025.4464L155.745%2025.49L155.572%2025.5129L155.394%2025.5195L155.222%2025.5347L155.041%2025.5565ZM158.405%2018.6421L158.191%2025.6231H158.202L158.099%2025.6089H157.611L157.508%2025.6013H157.11L157.003%2025.586H156.516L156.416%2025.5718H155.915L155.804%2025.5565H155.03L155.104%2018.5832H155.21H155.428L155.527%2018.5974H156.052L156.144%2018.6127H156.748L156.855%2018.6198H157.368L157.471%2018.6345H157.874L157.973%2018.6421H158.394H158.405ZM158.202%2025.6231L158.394%2018.6421L158.748%2018.6858L158.917%2018.7087L159.091%2018.7523L159.257%2018.7894L159.422%2018.8483L159.581%2018.893L159.74%2018.9666L159.888%2019.0326L160.043%2019.122L160.178%2019.2175L160.323%2019.2987L160.456%2019.4094L160.585%2019.5125L160.71%2019.6238L160.828%2019.7415L160.938%2019.867L161.042%2020.0071L161.145%2020.1255L161.238%2020.2804L161.326%2020.4134L161.4%2020.5607L161.473%2020.7232L161.598%2021.0329L161.647%2021.1954L161.691%2021.365L161.724%2021.5352L161.75%2021.6971L161.772%2021.882L161.776%2022.0511V22.2289L161.765%2022.4132L161.75%2022.5899L161.724%2022.76L161.691%2022.9367L161.639%2023.0992L161.592%2023.277L161.532%2023.4319L161.466%2023.5791L161.392%2023.734L161.308%2023.8965L161.218%2024.0296L161.13%2024.1692L161.027%2024.3023L160.928%2024.4277L160.806%2024.5531L160.687%2024.6709L160.566%2024.7898L160.437%2024.8923L160.304%2024.9883L160.164%2025.0843L160.024%2025.1726L159.869%2025.2468L159.722%2025.321L159.559%2025.3875L159.4%2025.4464L159.238%2025.49L159.072%2025.5347L158.907%2025.5718L158.733%2025.6013L158.552%2025.6089L158.383%2025.6231H158.202ZM158.515%2018.664L158.327%2025.6231H158.339H158.287H158.261H158.235H158.202H158.191L158.405%2018.6421H158.423V18.664H158.452H158.478H158.5H158.515H158.53H158.5H158.515ZM158.339%2025.6231L158.5%2018.664H158.678L158.858%2018.6934L159.205%2018.7523L159.367%2018.7894L159.533%2018.8483L159.692%2018.893L159.855%2018.9666L160.002%2019.0326L160.153%2019.122L160.301%2019.2104L160.437%2019.2987L160.566%2019.3947L160.699%2019.5054L160.82%2019.6161L160.938%2019.7415L161.049%2019.867L161.156%2019.9924L161.256%2020.1255L161.348%2020.2656L161.44%2020.3981L161.514%2020.553L161.592%2020.7008L161.657%2020.8557L161.717%2021.0182L161.772%2021.1807L161.813%2021.358L161.845%2021.5199L161.876%2021.6971L161.89%2021.8668L161.901%2022.044V22.2212L161.89%2022.4056L161.876%2022.5757L161.845%2022.76L161.813%2022.9225L161.772%2023.0916L161.717%2023.2476L161.657%2023.4166L161.592%2023.5715L161.522%2023.7198L161.44%2023.8671L161.348%2024.0143L161.259%2024.1692L161.156%2024.287L161.057%2024.4277L160.938%2024.5531L160.82%2024.6567L160.699%2024.7593L160.574%2024.8781L160.437%2024.9741L160.301%2025.0767L160.153%2025.1726L160.006%2025.2392L159.858%2025.321L159.696%2025.3875L159.537%2025.4464L159.209%2025.5347L159.043%2025.5718L158.87%2025.6013L158.692%2025.6089L158.519%2025.6231H158.339ZM161.717%2018.7752L161.447%2025.7485H161.433L161.33%2025.7343H161.138L161.042%2025.7191H160.858L160.758%2025.7038H160.46L160.37%2025.6973H160.178L160.076%2025.682H159.78L159.684%2025.6743H159.39L159.287%2025.6525H158.999L158.907%2025.6307H158.623L158.519%2025.6231H158.327L158.515%2018.664H158.807L158.928%2018.6858H159.224L159.316%2018.6934H159.733L159.832%2018.7087H160.031L160.127%2018.7229H160.423L160.525%2018.7305H160.732L160.836%2018.7523H161.123L161.23%2018.7599H161.433L161.536%2018.7752H161.728H161.717ZM161.433%2025.7485L161.728%2018.7752L161.908%2018.7894L162.09%2018.8188L162.262%2018.8483L162.436%2018.8854L162.599%2018.9366L162.764%2018.9813L162.923%2019.0326L163.074%2019.1068L163.226%2019.1951L163.373%2019.2769L163.513%2019.35L163.653%2019.4689L163.782%2019.5572L163.911%2019.6674L164.033%2019.7786L164.151%2019.9041L164.258%2020.0295L164.362%2020.1696L164.468%2020.288L164.557%2020.4429L164.638%2020.5754L164.708%2020.7379L164.782%2020.8857L164.848%2021.0477L164.907%2021.1954L164.951%2021.365L164.992%2021.5352L165.022%2021.7048L165.044%2021.882L165.062%2022.0511V22.4132L165.051%2022.5899L165.025%2022.7748L165.003%2022.9367L164.959%2023.1145L164.918%2023.2836L164.866%2023.4319L164.8%2023.5944L164.734%2023.7493L164.66%2023.9042L164.568%2024.0514L164.479%2024.1921L164.38%2024.3317L164.277%2024.4648L164.174%2024.5902L164.055%2024.7156L163.933%2024.8258L163.808%2024.9294L163.679%2025.0472L163.543%2025.1432L163.406%2025.225L163.255%2025.321L163.107%2025.3875L162.96%2025.4529L162.797%2025.5195L162.638%2025.586L162.473%2025.6307L162.311%2025.6743L162.137%2025.7038L161.79%2025.7343L161.614%2025.7485H161.433ZM161.916%2018.7894L161.621%2025.7485H161.628H161.569H161.602H161.559H161.551H161.569H161.522H161.559H161.551H161.499H161.488H161.532H161.522H161.499H161.455H161.477H161.422H161.455H161.447L161.717%2018.7752H161.728H161.776H161.783H161.75H161.776H161.82H161.802L161.783%2018.7894H161.845H161.853H161.82H161.876H161.879H161.845H161.853H161.908H161.876H161.879H161.939H161.898H161.916ZM161.621%2025.7485L161.916%2018.7894L162.093%2018.797L162.274%2018.8188L162.447%2018.8636L162.617%2018.8854L162.787%2018.9443L162.952%2018.9966L163.107%2019.0479L163.255%2019.122L163.41%2019.1951L163.553%2019.284L163.705%2019.3729L163.841%2019.4689L163.97%2019.579L164.103%2019.6827L164.218%2019.7857L164.332%2019.9188L164.442%2020.0366L164.55%2020.1696L164.642%2020.3022L164.741%2020.4429L164.822%2020.5977L164.9%2020.745L164.966%2020.9004L165.04%2021.0477L165.092%2021.2102L165.14%2021.3798L165.177%2021.5423L165.206%2021.7048L165.232%2021.8891L165.243%2022.0663L165.246%2022.2289V22.4132L165.235%2022.5899L165.213%2022.7748L165.187%2022.952L165.143%2023.1145L165.099%2023.2836L165.051%2023.4461L164.992%2023.6162L164.918%2023.7635L164.834%2023.9183L164.752%2024.0732L164.664%2024.2063L164.568%2024.347L164.468%2024.4648L164.362%2024.6044L164.243%2024.7233L164.118%2024.8334L163.996%2024.9512L163.863%2025.0472L163.727%2025.1508L163.59%2025.2392L163.443%2025.321L163.292%2025.4017L163.144%2025.4682L162.982%2025.5347L162.827%2025.6013L162.661%2025.6307L162.491%2025.682L162.321%2025.7038L162.148%2025.7343L161.968%2025.7485H161.621ZM165.062%2018.9595L164.649%2025.9034H164.557L164.479%2025.8958H164.376L164.287%2025.8816H164.092L163.989%2025.8739H163.9L163.815%2025.8598H163.609L163.531%2025.8445H163.425L163.336%2025.8369H163.137L163.041%2025.815H162.846L162.746%2025.8074H162.572L162.473%2025.7856H162.278L162.185%2025.7703H161.994L161.908%2025.7638H161.813L161.717%2025.7485H161.621L161.916%2018.7894H162.012L162.104%2018.797H162.421L162.517%2018.8188H162.609L162.709%2018.8265H162.901L163.011%2018.8483H163.203L163.299%2018.8636H163.494L163.59%2018.8712H163.686L163.782%2018.8854H163.989L164.085%2018.893H164.277L164.376%2018.9072H164.472L164.568%2018.9366H164.76L164.859%2018.9443H164.966L165.062%2018.9595ZM164.649%2025.9034L165.062%2018.9595L165.243%2018.9666L165.586%2019.0261L165.759%2019.0697L165.929%2019.1068L166.088%2019.1586L166.25%2019.2322L166.398%2019.2987L166.549%2019.38L166.696%2019.4689L166.84%2019.5572L166.969%2019.6532L167.101%2019.7634L167.231%2019.8746L167.349%2019.9924L167.46%2020.1102L167.571%2020.2362L167.673%2020.3763L167.769%2020.5165L167.857%2020.6496L167.939%2020.8044L168.02%2020.9446L168.09%2021.1066L168.198%2021.4239L168.245%2021.5864L168.282%2021.7708L168.308%2021.9257L168.327%2022.1176L168.341%2022.2725V22.6346L168.3%2022.9814L168.271%2023.1658L168.227%2023.3359L168.179%2023.4984L168.12%2023.6675L168.061%2023.8224L167.983%2023.9631L167.906%2024.1179L167.814%2024.2804L167.729%2024.4201L167.63%2024.5531L167.522%2024.6709L167.412%2024.8116L167.297%2024.9218L167.172%2025.033L167.046%2025.1432L166.913%2025.2468L166.778%2025.3504L166.637%2025.4311L166.486%2025.5129L166.339%2025.6013L166.18%2025.6743L166.029%2025.7191L165.863%2025.7703L165.7%2025.815L165.53%2025.8598L165.361%2025.8816L165.187%2025.8958L165.007%2025.9034H164.649ZM165.302%2018.9666L164.889%2025.9328H164.782H164.774H164.822H164.808H164.782H164.774L164.76%2025.9034H164.741H164.664H164.66H164.705H164.694H164.664H164.649L165.062%2018.9595H165.07H165.177H165.18H165.129H165.177H165.18H165.187H165.291L165.306%2018.9666H165.258H165.302ZM164.889%2025.9328L165.302%2018.9666L165.475%2018.9813L165.656%2019.0108L165.826%2019.0326L166.165%2019.122L166.327%2019.1951L166.478%2019.2398L166.637%2019.3064L166.785%2019.3947L166.929%2019.4831L167.076%2019.579L167.213%2019.6674L167.346%2019.7786L167.471%2019.8888L167.585%2020.0071L167.703%2020.1255L167.802%2020.2656L167.906%2020.3834L168.006%2020.5312L168.098%2020.6643L168.179%2020.8115L168.249%2020.974L168.319%2021.1142L168.382%2021.2843L168.429%2021.4316L168.478%2021.6088L168.511%2021.7784L168.548%2021.9486L168.562%2022.1329L168.578%2022.2954L168.58%2022.4721L168.578%2022.6493L168.562%2022.8266L168.537%2023.0109L168.5%2023.1876L168.466%2023.3501L168.411%2023.5126L168.356%2023.6828L168.294%2023.83L168.227%2023.9849L168.145%2024.1321L168.061%2024.287L167.965%2024.4277L167.869%2024.5608L167.765%2024.7004L167.648%2024.8258L167.53%2024.9294L167.412%2025.0625L167.279%2025.1508L167.15%2025.2621L167.013%2025.357L166.866%2025.4464L166.725%2025.5195L166.57%2025.6089L166.419%2025.682L166.261%2025.7343L166.098%2025.7856L165.933%2025.8369L165.767%2025.8739L165.593%2025.8958L165.424%2025.9034L165.246%2025.9328L165.07%2025.9481L164.889%2025.9328ZM168.349%2019.1586L167.857%2026.1324H167.847L167.765%2026.1172H167.673L167.577%2026.1106H167.481L167.393%2026.0877H167.297L167.209%2026.0812H167.124L167.028%2026.0659H166.936L166.84%2026.0512H166.652L166.464%2026.0212H166.276L166.194%2026.0146H166.102L166.01%2025.9917H165.907L165.818%2025.9776H165.722L165.63%2025.9699H165.442L165.346%2025.9557H165.258L165.158%2025.9481H164.981L164.889%2025.9328L165.302%2018.9666H165.394L165.494%2018.9813H165.689L165.785%2018.9966H165.877L165.973%2019.0108H166.069L166.157%2019.0261H166.349L166.441%2019.0326H166.537L166.637%2019.0479H166.737L166.833%2019.0697H166.929L167.017%2019.0773H167.117L167.213%2019.0921H167.301L167.401%2019.1068H167.585L167.696%2019.122H167.792L167.88%2019.1362H167.976L168.065%2019.1439H168.164L168.257%2019.1586H168.363H168.349ZM167.847%2026.1324L168.363%2019.1586L168.544%2019.1951L168.721%2019.2175L168.895%2019.2398L169.056%2019.284L169.219%2019.3435L169.389%2019.3947L169.547%2019.4689L169.698%2019.5496L169.846%2019.6238L169.997%2019.7197L170.133%2019.8081L170.266%2019.9041L170.396%2020.0148L170.517%2020.1255L170.635%2020.2509L170.753%2020.3763L170.853%2020.4941L170.952%2020.6343L171.045%2020.7673L171.137%2020.9222L171.214%2021.0629L171.288%2021.2102L171.351%2021.3798L171.413%2021.5352L171.465%2021.6971L171.502%2021.8668L171.535%2022.0293L171.565%2022.2065L171.583%2022.3685L171.594%2022.5533V22.7229L171.583%2022.9149L171.565%2023.0916L171.535%2023.277L171.502%2023.4319L171.465%2023.5944L171.413%2023.7635L171.351%2023.9336L171.285%2024.0961L171.214%2024.2434L171.133%2024.3982L171.041%2024.5389L170.945%2024.6709L170.849%2024.8116L170.735%2024.9294L170.632%2025.0625L170.506%2025.1803L170.38%2025.2915L170.259%2025.4017L170.119%2025.4976L169.979%2025.6013L169.835%2025.682L169.687%2025.7638L169.532%2025.8369L169.381%2025.8958L169.219%2025.9557L169.056%2026.0146L168.895%2026.0512L168.721%2026.0877L168.555%2026.1106L168.374%2026.1324H167.847ZM168.67%2019.1951L168.149%2026.1542H168.164L168.149%2026.1472H168.112H168.108H168.12H168.112H168.065H168.09H168.039H168.061H168.01H168.031H167.983H167.994L167.991%2026.1324H167.939H167.965H167.917H167.935H167.884H167.906H167.857H167.851H167.869H167.857L168.349%2019.1586L168.363%2019.1657H168.392H168.408H168.386H168.392H168.445H168.426H168.474H168.452H168.496H168.5H168.478H168.496H168.544H168.518L168.555%2019.1951H168.566H168.548H168.599H168.578H168.614H168.625H168.603H168.614H168.647H168.658H168.643H168.647H168.67ZM168.164%2026.1542L168.647%2019.1951L168.828%2019.2104L169.001%2019.2322L169.182%2019.2769L169.344%2019.3064L169.514%2019.3729L169.677%2019.4165L169.835%2019.4907L169.986%2019.5572L170.141%2019.6456L170.281%2019.7268L170.417%2019.8299L170.562%2019.9188L170.805%2020.1402L170.93%2020.2656L171.041%2020.3834L171.148%2020.5165L171.248%2020.6496L171.344%2020.7897L171.428%2020.9222L171.513%2021.0771L171.583%2021.2325L171.649%2021.3798L171.709%2021.5423L171.753%2021.7048L171.808%2021.882L171.841%2022.044L171.867%2022.2065L171.878%2022.3914L171.901%2022.5681V22.7524L171.885%2022.9225L171.867%2023.0992L171.841%2023.277L171.808%2023.4461L171.768%2023.6162L171.716%2023.7787L171.653%2023.9402L171.594%2024.0961L171.517%2024.2652L171.432%2024.3982L171.351%2024.5531L171.251%2024.6938L171.152%2024.8258L171.045%2024.9512L170.941%2025.0767L170.82%2025.1955L170.691%2025.3133L170.565%2025.4235L170.425%2025.5129L170.288%2025.6089L170.145%2025.6973L170.004%2025.7703L169.846%2025.8598L169.695%2025.9034L169.532%2025.9776L169.377%2026.0212L169.208%2026.0659L169.038%2026.1106L168.864%2026.1324L168.692%2026.1472L168.518%2026.1542H168.164ZM171.565%2019.4318L170.964%2026.3833L170.879%2026.3686H170.783L170.698%2026.3538H170.517L170.44%2026.3386H170.351L170.27%2026.3244H170.182L170.09%2026.3168L170.004%2026.302H169.912L169.824%2026.2873H169.735L169.643%2026.2655H169.555L169.466%2026.2502H169.377L169.3%2026.2426H169.208L169.119%2026.2284H169.034L168.942%2026.2208H168.854L168.684%2026.1913H168.507L168.419%2026.1695L168.327%2026.1542H168.149L168.67%2019.1951L168.754%2019.2104H168.846L168.935%2019.2175H169.023L169.115%2019.2322H169.205L169.297%2019.2398H169.396L169.485%2019.254H169.573L169.661%2019.2769H169.753L169.842%2019.284H169.945L170.037%2019.2987H170.126L170.215%2019.3064L170.307%2019.3282H170.396L170.484%2019.3435H170.576L170.664%2019.35H170.753L170.842%2019.3729H170.93L171.034%2019.38H171.122L171.214%2019.3947L171.303%2019.4165H171.388L171.476%2019.4318H171.565ZM170.964%2026.3833L171.565%2019.4318L171.742%2019.4689L171.922%2019.4907L172.089%2019.5278L172.262%2019.579L172.428%2019.6238L172.586%2019.6827L172.745%2019.7563L172.892%2019.8375L173.041%2019.9188L173.184%2020.0071L173.321%2020.1031L173.454%2020.2138L173.582%2020.3022L173.705%2020.4205L173.818%2020.5388L173.926%2020.6643L174.036%2020.8044L174.136%2020.937L174.22%2021.0771L174.312%2021.2102L174.39%2021.365L174.457%2021.5199L174.519%2021.6824L174.582%2021.8302L174.63%2021.9998L174.663%2022.1623L174.7%2022.3319L174.722%2022.5092L174.741%2022.6788L174.748%2022.8484V23.0327L174.733%2023.2105L174.711%2023.3948L174.686%2023.5573L174.652%2023.734L174.604%2023.9042L174.545%2024.0732L174.482%2024.2281L174.424%2024.3764L174.346%2024.5389L174.265%2024.6938L174.177%2024.8258L174.081%2024.9665L173.977%2025.0996L173.867%2025.225L173.748%2025.3504L173.634%2025.4529L173.509%2025.5718L173.376%2025.682L173.239%2025.7703L173.103%2025.8739L172.952%2025.9557L172.804%2026.0364L172.657%2026.1106L172.501%2026.1542L172.347%2026.2208L172.177%2026.2655L172.011%2026.3168L171.841%2026.3386L171.668%2026.3686L171.498%2026.3833L171.325%2026.3909L171.148%2026.3833H170.964ZM171.981%2019.4831L171.358%2026.4051H171.318L171.34%2026.4204L171.296%2026.4051H171.285L171.296%2026.4204L171.251%2026.4051H171.24L171.262%2026.4204L171.248%2026.4051L171.207%2026.3909H171.196L171.207%2026.4051H171.196L171.159%2026.3909H171.148L171.159%2026.4051H171.148L171.104%2026.3909H171.089L171.104%2026.4051H171.097L171.056%2026.3833H171.041L171.056%2026.3909H171.03L170.993%2026.3833H170.978L170.993%2026.3909H170.978L170.964%2026.3833L171.565%2019.4318L171.58%2019.4165L171.594%2019.4318H171.638H171.653L171.694%2019.4536H171.709L171.694%2019.4318H171.709L171.742%2019.4536H171.753L171.797%2019.4689H171.812L171.797%2019.4536H171.808L171.845%2019.4689H171.864L171.845%2019.4536H171.864L171.901%2019.4689L171.933%2019.4831H171.952L171.933%2019.4689L171.978%2019.4831H171.981ZM171.358%2026.4051L171.981%2019.4831L172.166%2019.4907L172.347%2019.5278L172.505%2019.5572L172.679%2019.6161L172.849%2019.6674L173.007%2019.7268L173.166%2019.7857L173.317%2019.8746L173.457%2019.963L173.605%2020.0366L173.741%2020.1402L173.873%2020.2509L173.999%2020.3616L174.12%2020.4723L174.239%2020.5977L174.346%2020.7232L174.449%2020.841L174.545%2020.9811L174.637%2021.1142L174.722%2021.2691L174.8%2021.4239L174.874%2021.5646L174.933%2021.7272L175.035%2022.0511L175.076%2022.2212L175.109%2022.3914L175.135%2022.5533L175.146%2022.7229L175.154%2022.9149V23.0698L175.143%2023.2476L175.091%2023.6162L175.05%2023.7853L175.01%2023.9554L174.954%2024.1179L174.892%2024.2804L174.825%2024.443L174.748%2024.5902L174.663%2024.7233L174.575%2024.8781L174.471%2025.0112L174.379%2025.1432L174.265%2025.2839L174.147%2025.3875L174.032%2025.5129L173.9%2025.6231L173.77%2025.7191L173.638%2025.815L173.494%2025.9034L173.35%2025.9917L173.202%2026.0812L173.055%2026.1472L172.892%2026.2066L172.734%2026.2502L172.572%2026.3168L172.406%2026.3538L172.232%2026.3833L172.059%2026.4051L171.885%2026.4204H171.535L171.358%2026.4051ZM174.759%2019.7415L174.051%2026.6854L173.966%2026.6636L173.877%2026.656H173.797L173.715%2026.6418H173.638L173.556%2026.6342L173.464%2026.6123H173.383L173.302%2026.5971L173.21%2026.59H173.129L173.048%2026.5753H172.952L172.885%2026.5676L172.786%2026.5534H172.716L172.624%2026.5234L172.542%2026.5164H172.461L172.369%2026.5011H172.288L172.196%2026.494H172.114L172.037%2026.4793L171.945%2026.464H171.875L171.786%2026.4575H171.705L171.613%2026.4346H171.532L171.44%2026.4204L171.358%2026.4051L171.981%2019.4831L172.074%2019.4907H172.155L172.244%2019.5054H172.328L172.413%2019.5125H172.501L172.598%2019.5278L172.686%2019.5496H172.767L172.86%2019.5572H172.941L173.021%2019.579L173.114%2019.5867H173.199L173.287%2019.6014H173.372L173.464%2019.6161L173.546%2019.6238H173.638L173.73%2019.6456H173.811L173.893%2019.6532L173.985%2019.6674H174.069L174.151%2019.6827L174.239%2019.6897H174.32L174.424%2019.7197H174.504L174.586%2019.7268L174.674%2019.7415H174.759ZM174.051%2026.6854L174.759%2019.7415L174.939%2019.7634L175.109%2019.7857L175.283%2019.8375L175.452%2019.8888L175.615%2019.9411L175.773%2020.0071L175.932%2020.0737L176.083%2020.1473L176.227%2020.2362L176.375%2020.3245L176.511%2020.4205L176.639%2020.5388L176.765%2020.6496L176.88%2020.7603L176.998%2020.8857L177.109%2021.0111L177.211%2021.1513L177.311%2021.2843L177.399%2021.4239L177.485%2021.5646L177.554%2021.7272L177.624%2021.882L177.687%2022.0293L177.736%2022.1918L177.783%2022.3619L177.824%2022.5234L177.85%2022.6859L177.872%2022.8636L177.887%2023.0327L177.894%2023.2105L177.887%2023.3948L177.872%2023.5715L177.85%2023.7493L177.816%2023.9183L177.776%2024.0961L177.728%2024.2652L177.677%2024.4277L177.614%2024.5902L177.544%2024.7374L177.459%2024.8923L177.378%2025.033L177.289%2025.1803L177.186%2025.321L177.082%2025.4464L176.972%2025.5718L176.854%2025.6973L176.733%2025.8074L176.606%2025.9034L176.478%2026.0212L176.341%2026.1172L176.194%2026.2066L176.046%2026.2873L175.899%2026.3686L175.748%2026.4346L175.589%2026.494L175.427%2026.5534L175.264%2026.59L175.098%2026.6342L174.925%2026.656L174.755%2026.6854L174.582%2026.7007H174.228L174.051%2026.6854ZM175.29%2019.7857L174.549%2026.7449H174.537L174.519%2026.7301H174.424L174.394%2026.7083H174.276L174.257%2026.7007H174.228H174.161L174.136%2026.6854H174.051L174.759%2019.7415L174.778%2019.7563H174.892L174.917%2019.7634H174.939H175.035L175.065%2019.7786H175.18L175.194%2019.7857H175.29ZM174.549%2026.7449L175.29%2019.7857L175.471%2019.8299L175.644%2019.8523L175.814%2019.8888L175.979%2019.9411L176.149%2020.0071L176.304%2020.0737L176.463%2020.1402L176.614%2020.2138L176.754%2020.3022L176.89%2020.3981L177.038%2020.4941L177.168%2020.5977L177.293%2020.7008L177.415%2020.8262L177.521%2020.9446L177.632%2021.0771L177.736%2021.2102L177.832%2021.358L177.924%2021.4981L178.004%2021.6383L178.079%2021.7784L178.149%2021.9486L178.204%2022.0882L178.259%2022.2659L178.307%2022.4279L178.34%2022.5899L178.373%2022.76L178.388%2022.9367L178.407%2023.0992L178.41%2023.2836L178.407%2023.4613L178.388%2023.6457L178.366%2023.8224L178.337%2023.9849L178.292%2024.1692L178.248%2024.3317L178.193%2024.4866L178.123%2024.6491L178.056%2024.8116L177.971%2024.9665L177.887%2025.0996L177.798%2025.2468L177.691%2025.3722L177.587%2025.5129L177.485%2025.6307L177.366%2025.7638L177.241%2025.8739L177.115%2025.9776L176.98%2026.0812L176.843%2026.1695L176.702%2026.2655L176.559%2026.3538L176.408%2026.4204L176.249%2026.494L176.094%2026.5534L175.932%2026.5971L175.769%2026.656L175.599%2026.6854L175.427%2026.7083L175.256%2026.7449L175.087%2026.7519H174.733L174.549%2026.7449ZM177.953%2020.1031L177.138%2027.0257H177.053L176.972%2027.0181L176.887%2027.0033L176.821%2026.9886H176.739L176.639%2026.9734L176.577%2026.9592H176.492L176.415%2026.9515L176.334%2026.9368H176.249L176.167%2026.9145L176.083%2026.9068H175.998L175.92%2026.8926L175.844%2026.8774H175.773L175.689%2026.8632L175.607%2026.8479H175.522L175.445%2026.8408L175.36%2026.8261H175.29L175.209%2026.8185L175.121%2026.789H175.05L174.97%2026.7743L174.884%2026.7672H174.8L174.718%2026.7519L174.637%2026.7449H174.549L175.29%2019.7857L175.371%2019.8081L175.456%2019.8299H175.54L175.622%2019.8375L175.703%2019.8523H175.785L175.862%2019.867L175.943%2019.8746H176.028L176.124%2019.8888H176.208L176.29%2019.9041L176.375%2019.9188L176.451%2019.9335H176.537L176.637%2019.9411L176.706%2019.963H176.792L176.876%2019.9706L176.957%2019.9924H177.042L177.123%2020.0071L177.205%2020.0148H177.289L177.366%2020.0295L177.459%2020.0366H177.529L177.614%2020.0513L177.71%2020.0737H177.795L177.872%2020.0884L177.953%2020.1031ZM177.138%2027.0257L177.953%2020.1031L178.126%2020.1255L178.307%2020.1473L178.473%2020.192L178.647%2020.2509L178.809%2020.3022L178.967%2020.3763L179.119%2020.4429L179.273%2020.5312L179.414%2020.6272L179.55%2020.7008L179.691%2020.8115L179.827%2020.9222L179.948%2021.0329L180.063%2021.1513L180.181%2021.2691L180.284%2021.4092L180.383%2021.5352L180.476%2021.6748L180.565%2021.8155L180.649%2021.9704L180.72%2022.1176L180.786%2022.2725L180.852%2022.4279L180.9%2022.5899L180.941%2022.76L180.978%2022.9225L181.022%2023.277L181.037%2023.4461V23.6162L181.029%2023.7853L181.008%2023.9631L180.988%2024.155L180.951%2024.3317L180.912%2024.4866L180.855%2024.6567L180.804%2024.8258L180.73%2024.9883L180.657%2025.1432L180.583%2025.2915L180.491%2025.4311L180.395%2025.586L180.295%2025.7191L180.188%2025.8445L180.078%2025.9699L179.963%2026.0877L179.838%2026.2066L179.709%2026.3168L179.565%2026.4051L179.428%2026.5011L179.288%2026.59L179.141%2026.6636L178.989%2026.7449L178.838%2026.8185L178.684%2026.8632L178.514%2026.9145L178.347%2026.9592L178.185%2027.0033L178.012%2027.0257L177.839%2027.0399L177.669%2027.0475H177.488L177.315%2027.0399L177.138%2027.0257ZM178.591%2020.1696L177.746%2027.1141L177.72%2027.0988H177.728H177.644H177.654H177.632L177.584%2027.0917H177.507L177.514%2027.0693H177.448H177.459H177.393L177.399%2027.0475H177.289L177.278%2027.0399H177.186L177.168%2027.0257H177.138L177.953%2020.1031H177.997L178.02%2020.1102H178.145L178.134%2020.1255H178.241H178.237L178.252%2020.1402H178.292H178.285H178.351L178.377%2020.1473H178.373H178.432H178.421H178.492L178.51%2020.1696H178.503H178.591ZM177.746%2027.1141L178.591%2020.1696L178.764%2020.192L178.945%2020.2362L179.115%2020.2804L179.277%2020.3245L179.436%2020.3834L179.605%2020.4647L179.753%2020.5312L179.904%2020.6125L180.052%2020.6937L180.188%2020.7897L180.324%2020.9004L180.45%2021.0111L180.583%2021.1142L180.694%2021.2325L180.808%2021.358L181.011%2021.6159L181.114%2021.7708L181.192%2021.9038L181.272%2022.0511L181.354%2022.2065L181.413%2022.3619L181.48%2022.5234L181.523%2022.6788L181.564%2022.8407L181.601%2023.0262L181.627%2023.1876L181.649%2023.3501L181.652%2023.5344V23.7122L181.649%2023.8965L181.627%2024.0732L181.609%2024.2434L181.572%2024.4201L181.523%2024.5902L181.48%2024.7527L181.413%2024.9218L181.354%2025.0767L181.272%2025.225L181.192%2025.3722L181.103%2025.5195L181.008%2025.6743L180.912%2025.8074L180.804%2025.9328L180.69%2026.0512L180.572%2026.1695L180.44%2026.2873L180.317%2026.3909L180.181%2026.494L180.04%2026.59L179.897%2026.6636L179.753%2026.7519L179.605%2026.8261L179.447%2026.8926L179.284%2026.9515L179.119%2027.0033L178.96%2027.0399L178.613%2027.0988L178.443%2027.1211H178.274L178.089%2027.1359L177.924%2027.1211L177.746%2027.1141ZM181.118%2020.5165L180.192%2027.4091L180.122%2027.402L180.052%2027.3867H179.974L179.893%2027.3725L179.812%2027.3649L179.742%2027.3502H179.664L179.584%2027.3355L179.506%2027.3202L179.428%2027.2984H179.359L179.284%2027.2907L179.211%2027.2766H179.13L179.048%2027.2613L178.975%2027.2542L178.901%2027.2319H178.82L178.739%2027.2248L178.661%2027.21L178.584%2027.1948L178.521%2027.21L178.443%2027.1948L178.366%2027.1877H178.285L178.212%2027.1653L178.126%2027.1582H178.056L177.975%2027.1359L177.894%2027.1211L177.816%2027.1141H177.746L178.591%2020.1696L178.661%2020.1767L178.739%2020.192H178.823L178.901%2020.2138L178.975%2020.2215L179.056%2020.2362H179.137L179.211%2020.2509L179.288%2020.2656H179.366L179.458%2020.288L179.539%2020.3022L179.616%2020.3098H179.691L179.768%2020.3245L179.849%2020.354H179.927L180.004%2020.3616L180.089%2020.3763L180.159%2020.3834H180.236L180.324%2020.3981L180.41%2020.4134L180.487%2020.4205H180.557L180.642%2020.4429L180.72%2020.4647H180.793L180.871%2020.4723L180.951%2020.487L181.029%2020.4941L181.118%2020.5165ZM180.192%2027.4091L181.118%2020.5165L181.298%2020.5388L181.468%2020.5607L181.642%2020.6272L181.807%2020.6643L181.962%2020.7379L182.121%2020.8044L182.279%2020.8781L182.428%2020.9446L182.575%2021.0477L182.712%2021.1513L182.847%2021.2473L182.969%2021.358L183.09%2021.4757L183.213%2021.5864L183.323%2021.7048L183.423%2021.8449L183.523%2021.978L183.615%2022.1329L183.699%2022.2659L183.777%2022.4132L183.854%2022.5681L183.913%2022.7088L183.969%2022.8855L184.017%2023.048L184.057%2023.2105L184.095%2023.3795L184.131%2023.7198L184.142%2023.8965V24.0732L184.128%2024.2434L184.083%2024.6044L184.046%2024.7593L183.995%2024.9512L183.946%2025.1061L183.887%2025.2839L183.821%2025.4311L183.74%2025.586L183.658%2025.7343L183.57%2025.8739L183.474%2026.0146L183.372%2026.1472L183.261%2026.2655L183.147%2026.3909L183.025%2026.5164L182.9%2026.6342L182.77%2026.7301L182.634%2026.8261L182.497%2026.9145L182.35%2027.0033L182.199%2027.0917L182.051%2027.1582L181.893%2027.2248L181.741%2027.2766L181.572%2027.3202L181.409%2027.3649L181.243%2027.402L181.07%2027.4314L180.9%2027.4385H180.546L180.365%2027.4314L180.192%2027.4091ZM181.893%2020.6125L180.941%2027.5051H180.855L180.834%2027.498H180.763L180.738%2027.4827H180.683L180.642%2027.4756H180.572L180.546%2027.4609H180.457L180.428%2027.4385H180.362L180.332%2027.4314H180.258L180.248%2027.4091H180.192L181.118%2020.5165H181.199L181.229%2020.5312H181.298L181.317%2020.5388H181.39L181.413%2020.553H181.505L181.523%2020.5607H181.609L181.649%2020.5754H181.715L181.741%2020.5977H181.811L181.833%2020.6125H181.893ZM180.941%2027.5051L181.893%2020.6125L182.073%2020.6343L182.246%2020.6714L182.416%2020.7232L182.586%2020.7673L182.744%2020.841L182.9%2020.9075L183.054%2020.9811L183.205%2021.0629L183.349%2021.1584L183.486%2021.2543L183.615%2021.358L183.748%2021.4534L183.866%2021.5864L183.98%2021.6971L184.095%2021.8302L184.193%2021.9556L184.301%2022.0882L184.393%2022.2289L184.475%2022.3914L184.548%2022.5234L184.622%2022.6859L184.684%2022.8407L184.743%2022.9814L184.791%2023.1581L184.828%2023.3206L184.858%2023.4831L184.884%2023.6675L184.898%2023.83L184.906%2024.0143V24.1921L184.89%2024.3688L184.872%2024.5389L184.847%2024.7156L184.802%2024.8923L184.759%2025.0625L184.702%2025.225L184.64%2025.3875L184.573%2025.5565L184.496%2025.7038L184.415%2025.8445L184.322%2025.9917L184.23%2026.1324L184.128%2026.2502L184.017%2026.3909L183.903%2026.5164L183.784%2026.6342L183.652%2026.7449L183.523%2026.8479L183.39%2026.9515L183.246%2027.0257L183.102%2027.1141L182.955%2027.1948L182.796%2027.2613L182.645%2027.3355L182.49%2027.3867L182.324%2027.4314L182.154%2027.4756L181.995%2027.5051L181.822%2027.5274L181.649%2027.5416L181.48%2027.5492H181.298L181.118%2027.5416L180.941%2027.5051ZM184.183%2020.937L183.176%2027.8448L183.102%2027.8295H183.032L182.962%2027.8224L182.896%2027.8001L182.818%2027.7854H182.751L182.681%2027.7707L182.608%2027.7559L182.538%2027.7488H182.464L182.398%2027.7336L182.328%2027.7188L182.269%2027.7118H182.199L182.132%2027.6894L182.062%2027.6747L181.995%2027.6599H181.918L181.844%2027.6452L181.778%2027.6381L181.705%2027.6234H181.649L181.579%2027.6158L181.513%2027.5934H181.435L181.365%2027.5787L181.298%2027.5716L181.221%2027.5492H181.151L181.081%2027.5416L181.011%2027.5274L180.941%2027.5051L181.893%2020.6125L181.962%2020.6272L182.044%2020.6343H182.11L182.18%2020.6496L182.254%2020.6643H182.324L182.394%2020.6714L182.461%2020.6937L182.538%2020.7008H182.604L182.689%2020.7232L182.759%2020.7379H182.829L182.9%2020.745L182.969%2020.7603L183.039%2020.7673L183.113%2020.7897H183.18L183.253%2020.8044L183.335%2020.8115H183.412L183.478%2020.8262L183.548%2020.841L183.615%2020.8557H183.696L183.762%2020.8781L183.832%2020.8857L183.903%2020.9004H183.976L184.046%2020.9075L184.113%2020.9222L184.183%2020.937ZM183.176%2027.8448L184.183%2020.937L184.359%2020.974L184.533%2021.0111L184.702%2021.0477L184.872%2021.1066L185.031%2021.1731L185.19%2021.2473L185.337%2021.3209L185.492%2021.4092L185.629%2021.4981L185.765%2021.5864L185.902%2021.6971L186.027%2021.8079L186.149%2021.9115L186.263%2022.044L186.37%2022.1771L186.477%2022.3025L186.573%2022.435L186.662%2022.5757L186.754%2022.7229L186.894%2023.0327L186.96%2023.1876L187.015%2023.3501L187.052%2023.5126L187.097%2023.6828L187.134%2023.8453L187.152%2024.0143L187.163%2024.1921L187.167%2024.3688L187.163%2024.5389L187.152%2024.7156L187.134%2024.8923L187.1%2025.0767L187.063%2025.2468L187.015%2025.4235L186.96%2025.586L186.894%2025.7485L186.827%2025.8958L186.754%2026.0512L186.662%2026.2066L186.573%2026.3386L186.477%2026.4793L186.37%2026.6123L186.263%2026.7449L186.145%2026.8632L186.023%2026.9734L185.898%2027.0917L185.765%2027.1948L185.629%2027.2907L185.485%2027.3725L185.337%2027.4609L185.19%2027.5416L185.035%2027.6158L184.88%2027.6599L184.721%2027.7188L184.563%2027.7707L184.393%2027.8224L184.223%2027.8448L184.05%2027.8519L183.877%2027.8743L183.707%2027.889H183.527L183.349%2027.8743L183.176%2027.8448ZM185.145%2021.0771L184.083%2027.985V27.9702H184.05L184.038%2027.985L183.991%2027.9626H183.887L183.844%2027.9332L183.821%2027.9184L183.799%2027.9332H183.777L183.729%2027.9184L183.699%2027.9108L183.685%2027.9184H183.658L183.622%2027.9108H183.57L183.545%2027.8961L183.489%2027.889H183.397L183.36%2027.8743H183.349H183.323L183.282%2027.8519H183.216L183.194%2027.8448H183.176L184.183%2020.937H184.256L184.286%2020.9446H184.322L184.359%2020.974H184.43L184.459%2020.9811H184.493L184.533%2020.9964L184.563%2021.0111L184.573%2020.9964H184.61L184.633%2021.0111H184.721L184.765%2021.0329H184.847L184.884%2021.0477H184.928L184.968%2021.0629H184.998L185.031%2021.0771H185.057L185.068%2021.0629L185.112%2021.0924H185.145V21.0771ZM184.083%2027.9702L185.145%2021.0924L185.319%2021.1142L185.492%2021.1584L185.662%2021.2102L185.828%2021.2691L185.99%2021.3356L186.145%2021.4092L186.3%2021.4757L186.443%2021.5646L186.584%2021.653L186.717%2021.7708L186.846%2021.8668L186.979%2021.9704L187.097%2022.0882L187.211%2022.2212L187.318%2022.339L187.517%2022.6052L187.602%2022.76L187.686%2022.8931L187.764%2023.048L187.831%2023.1952L187.89%2023.3654L187.945%2023.5126L187.989%2023.6828L188.026%2023.8453L188.052%2024.0143L188.074%2024.1921L188.089%2024.3535L188.093%2024.5389L188.089%2024.7156L188.074%2024.8923L188.052%2025.0625L188.023%2025.2392L187.978%2025.4235L187.931%2025.586L187.871%2025.7485L187.812%2025.9034L187.735%2026.0659L187.661%2026.2208L187.58%2026.3686L187.48%2026.5011L187.384%2026.6418L187.281%2026.7672L187.163%2026.8926L187.049%2027.0181L186.927%2027.1211L186.798%2027.2319L186.665%2027.3502L186.529%2027.4385L186.388%2027.5274L186.245%2027.6158L186.093%2027.6747L185.938%2027.7488L185.783%2027.8224L185.625%2027.8743L185.462%2027.9108L185.293%2027.9626L185.123%2027.985L184.95%2027.9921L184.78%2028.0068H184.437L184.256%2027.9921L184.083%2027.9702ZM187.27%2021.4239L186.149%2028.3024L186.082%2028.2947L186.023%2028.28L185.953%2028.2653H185.891L185.82%2028.2576L185.762%2028.2429L185.691%2028.2358H185.629L185.558%2028.2135L185.499%2028.1911L185.44%2028.184L185.382%2028.1693H185.311L185.249%2028.1617L185.178%2028.1469L185.119%2028.1251H185.053L184.986%2028.1175L184.92%2028.1028L184.858%2028.0957H184.802L184.743%2028.0733L184.669%2028.0586L184.6%2028.0509H184.54L184.475%2028.0291L184.412%2028.0215L184.345%2028.0068H184.279L184.212%2027.9921L184.15%2027.985H184.083L185.145%2021.0771L185.208%2021.1066L185.282%2021.1142H185.337L185.411%2021.1289L185.478%2021.1513H185.54L185.603%2021.1584L185.673%2021.1731L185.739%2021.1807H185.798L185.868%2021.1954L185.946%2021.2102L186.012%2021.2325H186.079L186.145%2021.2473L186.207%2021.2543L186.274%2021.2691L186.337%2021.2843H186.403L186.47%2021.2914L186.536%2021.3138L186.617%2021.3209H186.683L186.746%2021.3356L186.813%2021.358L186.879%2021.365H186.946L187.008%2021.3798L187.075%2021.3874L187.137%2021.4092L187.203%2021.4239H187.27ZM186.149%2028.3024L187.27%2021.4239L187.451%2021.4534L187.62%2021.5057L187.794%2021.5423L187.952%2021.6159L188.115%2021.6748L188.266%2021.749L188.421%2021.8155L188.561%2021.9115L188.708%2022.0216L188.845%2022.1176L188.975%2022.2212L189.1%2022.3319L189.221%2022.435L189.332%2022.5681L189.439%2022.7011L189.543%2022.8266L189.631%2022.9596L189.723%2023.1145L189.804%2023.2476L189.882%2023.409L189.94%2023.5573L189.999%2023.7198L190.051%2023.8671L190.099%2024.0361L190.132%2024.2063L190.158%2024.3764L190.18%2024.5531L190.195%2024.7233V24.8923L190.191%2025.0767L190.172%2025.2468L190.154%2025.4311L190.121%2025.6089L190.077%2025.7703L190.021%2025.9481L189.966%2026.1106L189.903%2026.2655L189.829%2026.4204L189.668%2026.7301L189.568%2026.8632L189.472%2027.0033L189.361%2027.1211L189.251%2027.2542L189.133%2027.3725L189.008%2027.4827L188.879%2027.5934L188.749%2027.6894L188.613%2027.7854L188.469%2027.889L188.317%2027.9626L188.17%2028.0291L188.023%2028.1028L187.86%2028.1617L187.694%2028.2135L187.535%2028.2576L187.37%2028.2947L187.2%2028.3242L186.853%2028.3536H186.503L186.33%2028.3389L186.149%2028.3024ZM188.391%2021.6159L187.211%2028.4943H187.178L187.145%2028.479H187.107L187.075%2028.4643H187.052L187.019%2028.4425H186.946L186.923%2028.4349H186.89L186.853%2028.4201H186.787L186.754%2028.4125H186.717L186.683%2028.3907H186.617L186.58%2028.376H186.543L186.514%2028.3683H186.455L186.429%2028.3536H186.381L186.344%2028.3389H186.322L186.289%2028.3242H186.219L186.186%2028.3024H186.149L187.27%2021.4239L187.299%2021.4316H187.336L187.384%2021.4463H187.443L187.488%2021.4534H187.521L187.543%2021.4757H187.628L187.661%2021.4981H187.694L187.727%2021.5057H187.798L187.831%2021.5199H187.86L187.897%2021.5352H187.931L187.964%2021.5423H188.033L188.066%2021.557H188.115L188.152%2021.5646H188.17L188.207%2021.5864H188.288L188.317%2021.6088H188.354L188.391%2021.6159ZM187.211%2028.4943L188.391%2021.6159L188.561%2021.6383L188.734%2021.6824L188.908%2021.7413L189.063%2021.7931L189.232%2021.8668L189.38%2021.9486L189.535%2022.0216L189.678%2022.1176L189.823%2022.2065L189.952%2022.3025L190.084%2022.4132L190.205%2022.5234L190.328%2022.6493L190.549%2022.8931L190.648%2023.0327L190.74%2023.1658L190.83%2023.3065L190.903%2023.4613L190.981%2023.6162L191.047%2023.7635L191.102%2023.9336L191.15%2024.0961L191.198%2024.2434L191.231%2024.4277L191.265%2024.5902L191.286%2024.9294V25.0996L191.283%2025.2839L191.265%2025.4529L191.239%2025.6307L191.21%2025.815L191.161%2025.9776L191.114%2026.1542L191.047%2026.3168L190.991%2026.4793L190.91%2026.6342L190.83%2026.7743L190.74%2026.9368L190.648%2027.0693L190.549%2027.21L190.434%2027.3355L190.328%2027.4609L190.205%2027.5787L190.077%2027.6894L189.952%2027.8001L189.678%2027.9921L189.535%2028.0733L189.39%2028.1617L189.236%2028.2358L189.081%2028.2947L188.922%2028.3536L188.76%2028.4125L188.598%2028.4425L188.432%2028.479L188.262%2028.5085L188.093%2028.5309L187.915%2028.5456H187.742L187.395%2028.5161L187.211%2028.4943ZM190.364%2021.9556L189.133%2028.8188L189.008%2028.7893L188.955%2028.7817H188.889L188.83%2028.767L188.764%2028.7594L188.708%2028.7375H188.605L188.546%2028.7228L188.48%2028.7081L188.421%2028.6934H188.354L188.299%2028.6857L188.24%2028.671L188.178%2028.6492L188.115%2028.6416H188.052L187.989%2028.6268L187.945%2028.6197L187.871%2028.6045H187.812L187.764%2028.5898L187.702%2028.5679L187.639%2028.5532H187.58L187.517%2028.5456L187.473%2028.5309L187.414%2028.5161H187.336L187.288%2028.5085L187.211%2028.4943L188.391%2021.6159H188.432L188.505%2021.6312L188.557%2021.6383L188.616%2021.653H188.693L188.753%2021.6748L188.819%2021.6824L188.871%2021.6971H188.934L189.008%2021.7048L189.07%2021.7272L189.118%2021.7413L189.196%2021.749H189.259L189.314%2021.7708L189.372%2021.7784L189.439%2021.7931H189.498L189.564%2021.8079L189.623%2021.8155L189.678%2021.8302L189.737%2021.8449H189.804L189.882%2021.882L189.94%2021.8891L189.996%2021.9038L190.058%2021.9115H190.121L190.18%2021.9257L190.246%2021.9486L190.305%2021.9556H190.364ZM189.133%2028.8188L190.364%2021.9556L190.534%2021.9998L190.707%2022.044L190.877%2022.0882L191.039%2022.1623L191.198%2022.2212L191.353%2022.3025L191.504%2022.3914L191.652%2022.4721L191.788%2022.5681L191.925%2022.6788L192.05%2022.7818L192.168%2022.8931L192.289%2023.0262L192.401%2023.144L192.507%2023.277L192.603%2023.409L192.692%2023.5497L192.784%2023.6828L192.861%2023.83L192.932%2023.9849L192.998%2024.1321L193.053%2024.3023L193.101%2024.4495L193.175%2024.7898L193.205%2024.9665L193.219%2025.129L193.23%2025.3133L193.226%2025.4682L193.219%2025.6525L193.205%2025.8369L193.175%2026.0146L193.134%2026.1913L193.094%2026.3538L193.038%2026.5164L192.987%2026.6854L192.917%2026.8479L192.839%2027.0033L192.758%2027.1582L192.669%2027.2907L192.566%2027.4314L192.467%2027.5716L192.36%2027.6894L192.246%2027.8224L192.12%2027.9332L191.998%2028.0509L191.87%2028.1469L191.737%2028.2576L191.596%2028.3389L191.456%2028.4201L191.302%2028.5085L191.15%2028.5679L191.002%2028.6416L190.84%2028.6934L190.677%2028.7594L190.519%2028.7893L190.346%2028.8188L190.18%2028.8553L190.011%2028.863L189.837%2028.8777H189.668L189.486%2028.863L189.314%2028.8553L189.133%2028.8188ZM191.607%2022.1918L190.32%2029.0402H190.298L190.246%2029.0326H190.205L190.18%2029.0102H190.147L190.107%2029.0031H190.07L190.029%2028.9884L189.996%2028.9737H189.919L189.882%2028.959L189.841%2028.9442H189.804L189.767%2028.9295H189.727L189.69%2028.9148H189.649L189.619%2028.9001H189.575L189.543%2028.8924H189.498L189.461%2028.8777H189.424L189.39%2028.863H189.361L189.324%2028.8553H189.269L189.236%2028.8259H189.214L189.177%2028.8188H189.133L190.364%2021.9556L190.397%2021.9704H190.434L190.489%2021.978H190.523L190.556%2021.9998H190.589L190.641%2022.0216H190.685L190.718%2022.0293H190.763L190.792%2022.044L190.832%2022.0511H190.91L190.947%2022.0663L190.991%2022.0811H191.061L191.095%2022.0882L191.139%2022.1176H191.172L191.216%2022.1329H191.253L191.286%2022.1405H191.323L191.364%2022.1547H191.4L191.441%2022.1623H191.49L191.53%2022.1771H191.549L191.607%2022.1918ZM190.32%2029.0402L191.607%2022.1918L191.78%2022.2212L191.95%2022.2725L192.117%2022.3319L192.282%2022.3914L192.438%2022.4503L192.592%2022.5386L192.74%2022.6128L192.887%2022.7011L193.028%2022.7971L193.164%2022.9149L193.289%2023.0262L193.411%2023.1287L193.529%2023.2476L193.636%2023.3795L193.743%2023.5126L193.835%2023.6457L193.928%2023.7853L194.016%2023.9336L194.094%2024.0808L194.164%2024.2281L194.222%2024.3764L194.278%2024.5531L194.326%2024.7156L194.37%2024.8629L194.403%2025.0472L194.425%2025.2174L194.444%2025.3722L194.451%2025.5565L194.444%2025.7343L194.44%2025.8958L194.414%2026.0812L194.389%2026.2502L194.348%2026.4346L194.307%2026.5971L194.252%2026.7672L194.189%2026.9368L194.119%2027.0988L194.045%2027.2542L193.961%2027.402L193.872%2027.5416L193.765%2027.6747L193.673%2027.8224L193.562%2027.9332L193.445%2028.0586L193.319%2028.184L193.197%2028.2947L193.068%2028.3907L192.932%2028.4943L192.791%2028.5898L192.648%2028.671L192.497%2028.7594L192.342%2028.8188L192.19%2028.8777L192.032%2028.9295L191.87%2028.9884L191.703%2029.0326L191.537%2029.0549L191.368%2029.0767L191.198%2029.0991H190.677L190.501%2029.0697L190.32%2029.0402ZM193.422%2022.5234L192.083%2029.387L192.028%2029.3723L191.966%2029.3571H191.906L191.854%2029.3429L191.81%2029.3276L191.744%2029.3134L191.684%2029.3058H191.652L191.592%2029.2911L191.427%2029.2469H191.364L191.312%2029.2393L191.257%2029.2245L191.198%2029.2098H191.147L191.102%2029.1951L191.047%2029.1727L190.981%2029.1656H190.936L190.877%2029.1509L190.81%2029.1433L190.767%2029.1286L190.707%2029.1062H190.656L190.601%2029.0991L190.549%2029.0767L190.489%2029.0697H190.453L190.32%2029.0402L191.607%2022.1918H191.652L191.703%2022.2065L191.77%2022.2212L191.829%2022.2289H191.884L191.936%2022.2507L191.991%2022.2659L192.054%2022.2725H192.12L192.164%2022.2954L192.22%2022.3025L192.289%2022.3172L192.33%2022.3319H192.382L192.456%2022.339L192.507%2022.3619L192.566%2022.3685L192.626%2022.3914H192.681L192.736%2022.4056L192.791%2022.4132L192.85%2022.4279H192.902L192.953%2022.435L193.028%2022.4503L193.079%2022.4721L193.123%2022.4797H193.19L193.253%2022.5015L193.308%2022.5092L193.363%2022.5234H193.422ZM192.083%2029.387L193.422%2022.5234L193.588%2022.5681L193.761%2022.6128L193.928%2022.6788L194.094%2022.7229L194.252%2022.7971L194.403%2022.8855L194.554%2022.9596L194.702%2023.0556L194.838%2023.1581L194.968%2023.277L195.101%2023.3795L195.215%2023.4831L195.333%2023.6162L195.443%2023.734L195.547%2023.8671L195.643%2024.0143L195.731%2024.155L195.816%2024.287L195.89%2024.443L195.96%2024.5902L196.026%2024.7527L196.078%2024.9L196.125%2025.0767L196.166%2025.2392L196.192%2025.4017L196.221%2025.586L196.233%2025.7485L196.24%2025.9328L196.233%2026.0877L196.221%2026.2655L196.2%2026.4575L196.174%2026.6342L196.141%2026.789L196.092%2026.9734L196.037%2027.1359L195.971%2027.2984L195.9%2027.4609L195.823%2027.6234L195.739%2027.7559L195.643%2027.9108L195.547%2028.0509L195.443%2028.1693L195.333%2028.3024L195.215%2028.4349L195.089%2028.5456L194.838%2028.7594L194.702%2028.8553L194.407%2029.0326L194.256%2029.1062L194.108%2029.1727L193.957%2029.2393L193.791%2029.2911L193.629%2029.3276L193.47%2029.3723L193.3%2029.4165L193.127%2029.4236L192.953%2029.4389L192.784%2029.4459L192.61%2029.4389H192.43L192.253%2029.4165L192.083%2029.387ZM194.768%2022.8189L193.378%2029.6308H193.333L193.297%2029.6232L193.264%2029.6079H193.226L193.171%2029.5861H193.127L193.101%2029.5785L193.057%2029.5643H193.024L192.98%2029.5567H192.935L192.898%2029.5348L192.854%2029.5196H192.74L192.688%2029.4978L192.648%2029.4901L192.622%2029.4978L192.581%2029.4901L192.537%2029.4759H192.497L192.438%2029.4389L192.412%2029.4459L192.371%2029.4389H192.33L192.289%2029.4236L192.246%2029.4165H192.205L192.164%2029.4018L192.12%2029.387H192.083L193.422%2022.5234L193.455%2022.5386L193.5%2022.5533H193.54L193.581%2022.5681L193.625%2022.5757H193.665L193.706%2022.5899H193.75L193.802%2022.6128L193.832%2022.6052L193.872%2022.6128L193.917%2022.6346H193.957L194.009%2022.664H194.075L194.119%2022.6788L194.178%2022.6859L194.219%2022.7011L194.256%2022.7088H194.304L194.337%2022.7229H194.381L194.425%2022.7524H194.462L194.517%2022.76L194.562%2022.7748H194.588L194.632%2022.7818L194.687%2022.7971H194.724L194.768%2022.8189ZM193.378%2029.6308L194.768%2022.8189L194.946%2022.8484L195.122%2022.8931L195.285%2022.952L195.443%2023.0262L195.602%2023.0916L195.753%2023.1658L195.904%2023.2476L196.041%2023.3501L196.178%2023.4461L196.31%2023.5573L196.439%2023.6675L196.558%2023.7787L196.675%2023.9042L196.779%2024.0296L196.882%2024.1692L196.977%2024.3023L197.066%2024.443L197.155%2024.5902L197.228%2024.7374L197.295%2024.8923L197.35%2025.0472L197.41%2025.2174L197.453%2025.3722L197.487%2025.5347L197.512%2025.7038L197.545%2025.8739L197.549%2026.0512L197.557%2026.2208L197.549%2026.3909L197.545%2026.5676L197.512%2026.7449L197.487%2026.9145L197.442%2027.0988L197.394%2027.2613L197.343%2027.4314L197.277%2027.5934L197.203%2027.7488L197.122%2027.8961L197.04%2028.0509L196.94%2028.1911L196.848%2028.3242L196.746%2028.4643L196.631%2028.5898L196.521%2028.7081L196.395%2028.8188L196.266%2028.9295L196.133%2029.0326L195.994%2029.1286L195.857%2029.2245L195.706%2029.3058L195.557%2029.3723L195.399%2029.4389L195.252%2029.5125L195.089%2029.5567L194.931%2029.6079L194.761%2029.6308L194.595%2029.6744L194.425%2029.6897L194.252%2029.6973H193.905L193.732%2029.6897L193.558%2029.6603L193.378%2029.6308ZM196.354%2023.1287L194.905%2029.9624L194.872%2029.9482L194.824%2029.9329H194.761L194.724%2029.9253L194.68%2029.9035L194.632%2029.8958L194.584%2029.8817H194.533L194.488%2029.8664L194.44%2029.8593H194.389L194.337%2029.8369L194.285%2029.8293L194.237%2029.8075H194.189L194.141%2029.7933L194.094%2029.7857L194.045%2029.7704H193.998L193.961%2029.7633L193.917%2029.7486H193.869L193.821%2029.7339L193.765%2029.7115L193.721%2029.6973H193.673L193.625%2029.6897L193.573%2029.6744L193.521%2029.6603H193.474L193.426%2029.6526L193.378%2029.6308L194.768%2022.8189L194.817%2022.8266H194.872L194.916%2022.8407L194.968%2022.8484H195.016L195.067%2022.8636L195.112%2022.8855L195.159%2022.8931H195.207L195.259%2022.9149L195.307%2022.9225H195.351L195.418%2022.9367L195.465%2022.952L195.514%2022.9596H195.557L195.606%2022.9738L195.657%2022.9814L195.709%2023.0109H195.761L195.805%2023.0262L195.857%2023.0327L195.904%2023.048H195.956L196%2023.0556L196.049%2023.0698H196.096L196.145%2023.0916L196.211%2023.0992L196.24%2023.1145H196.288L196.354%2023.1287ZM194.905%2029.9624L196.354%2023.1287L196.528%2023.1658L196.697%2023.2247L196.86%2023.2836L197.03%2023.3501L197.188%2023.4166L197.339%2023.4984L197.479%2023.5791L197.627%2023.6828L197.763%2023.7787L197.896%2023.8965L198.021%2024.0001L198.135%2024.1179L198.254%2024.2434L198.357%2024.3688L198.456%2024.5084L198.56%2024.6491L198.638%2024.7898L198.719%2024.9294L198.799%2025.0843L198.87%2025.2392L198.925%2025.3875L198.973%2025.5565L199.017%2025.7191L199.061%2025.8816L199.087%2026.0512L199.106%2026.2208L199.11%2026.3909L199.12%2026.5753L199.11%2026.7449L199.099%2026.9145L199.073%2027.0988L199.044%2027.2613L198.995%2027.4385L198.948%2027.6234L198.891%2027.7854L198.826%2027.9332L198.756%2028.1028L198.674%2028.2576L198.582%2028.3907L198.493%2028.5456L198.39%2028.6857L198.291%2028.8041L198.172%2028.9295L198.055%2029.0549L197.929%2029.1656L197.808%2029.2763L197.671%2029.3723L197.531%2029.4759L197.383%2029.5643L197.24%2029.6308L197.089%2029.7115L196.938%2029.7857L196.779%2029.8369L196.62%2029.8958L196.458%2029.9329L196.288%2029.97L196.125%2030.0071L195.956%2030.0213L195.779%2030.0366H195.436L195.259%2030.0213L195.085%2029.9995L194.905%2029.9624ZM197.9%2023.4755L196.403%2030.2874V30.295L196.366%2030.2874L196.325%2030.2721L196.278%2030.2503H196.229L196.178%2030.2427L196.133%2030.2209L196.086%2030.2132H196.037L195.99%2030.1991L195.934%2030.1838L195.89%2030.1762H195.841L195.798%2030.1543L195.753%2030.1467L195.706%2030.1325H195.657L195.606%2030.1173L195.557%2030.1107L195.514%2030.0878H195.477L195.428%2030.066L195.366%2030.0584L195.333%2030.0442H195.285L195.24%2030.0366L195.197%2030.0213L195.148%2030.0071H195.112L195.049%2029.9995L195.001%2029.97L194.968%2029.9624H194.905L196.354%2023.1287L196.391%2023.144L196.45%2023.1581H196.495L196.531%2023.1658L196.594%2023.1876L196.642%2023.1952H196.687L196.731%2023.2105L196.779%2023.2247L196.842%2023.2323H196.875L196.926%2023.2476L196.985%2023.277L197.034%2023.2836H197.077L197.128%2023.2988L197.177%2023.3065L197.228%2023.3206H197.277L197.324%2023.3359L197.365%2023.3501L197.412%2023.3654H197.461L197.508%2023.3795L197.557%2023.3948L197.604%2023.409H197.657L197.7%2023.4166L197.749%2023.4319L197.796%2023.4461H197.845L197.9%2023.4613V23.4755ZM196.403%2030.295L197.9%2023.4613L198.08%2023.4984L198.254%2023.5573L198.413%2023.6162L198.575%2023.6828L198.737%2023.7635L198.889%2023.8453L199.028%2023.9336L199.179%2024.0296L199.308%2024.1179L199.441%2024.2281L199.567%2024.347L199.688%2024.4648L199.796%2024.5902L199.906%2024.7156L199.999%2024.8552L200.098%2024.9883L200.18%2025.1432L200.264%2025.2839L200.341%2025.4311L200.401%2025.6013L200.467%2025.7485L200.515%2025.9034L200.556%2026.0812L200.592%2026.2426L200.615%2026.4051L200.64%2026.5753L200.652%2026.7519V26.9145L200.644%2027.0988L200.622%2027.2766L200.603%2027.4609L200.567%2027.6234L200.526%2027.8001L200.471%2027.9702L200.411%2028.1251L200.345%2028.2947L200.272%2028.4643L200.187%2028.6197L200.098%2028.7594L200.009%2028.8924L199.906%2029.0326L199.796%2029.1656L199.688%2029.2911L199.563%2029.4165L199.441%2029.5196L199.308%2029.6308L199.179%2029.7339L199.04%2029.8293L198.891%2029.9035L198.744%2029.9995L198.589%2030.0584L198.438%2030.1325L198.276%2030.1838L198.125%2030.2427L197.955%2030.2874L197.792%2030.3092L197.62%2030.3321L197.453%2030.3681H197.284L197.11%2030.3834L196.93%2030.3681L196.756%2030.3616L196.58%2030.3169L196.403%2030.295ZM199.268%2023.7787L197.737%2030.583L197.694%2030.5677L197.657%2030.5601L197.612%2030.5459H197.568L197.531%2030.5306L197.487%2030.5164H197.442L197.394%2030.5012L197.361%2030.4935H197.328L197.277%2030.4717L197.236%2030.4575H197.203L197.166%2030.4499L197.122%2030.427H197.073L197.022%2030.4205L196.977%2030.4052L196.948%2030.391H196.907L196.871%2030.3834L196.823%2030.3681H196.789L196.746%2030.3616L196.697%2030.3321H196.656L196.613%2030.3169L196.576%2030.3092H196.531L196.491%2030.295L196.45%2030.2874H196.403L197.9%2023.4755L197.947%2023.4831H197.992L198.037%2023.4984L198.073%2023.5126L198.117%2023.5344H198.162L198.195%2023.5497L198.243%2023.5573H198.291L198.327%2023.5715L198.368%2023.5791H198.409L198.45%2023.5944L198.505%2023.6162H198.549L198.582%2023.6304L198.626%2023.6457H198.664L198.707%2023.6533L198.763%2023.6675L198.803%2023.6828H198.833L198.889%2023.6893L198.928%2023.7122H198.973L199.017%2023.7198L199.061%2023.734H199.099L199.143%2023.7493L199.183%2023.7635H199.224L199.268%2023.7787ZM197.737%2030.583L199.268%2023.7787L199.445%2023.8224L199.608%2023.8671L199.773%2023.9336L199.943%2024.0001L200.091%2024.0808L200.242%2024.1692L200.389%2024.2434L200.533%2024.347L200.663%2024.4495L200.795%2024.5531L200.917%2024.6709L201.039%2024.7898L201.153%2024.9L201.256%2025.0472L201.352%2025.1726L201.448%2025.321L201.533%2025.4529L201.614%2025.6089L201.68%2025.7638L201.751%2025.9034L201.806%2026.0659L201.854%2026.2284L201.894%2026.3909L201.932%2026.5676L201.957%2026.7301L201.979%2026.9068L201.987%2027.0693V27.2319L201.979%2027.4091L201.965%2027.5934L201.939%2027.7707L201.902%2027.9332L201.854%2028.1175L201.806%2028.28L201.747%2028.4425L201.677%2028.6197L201.61%2028.767L201.529%2028.9148L201.437%2029.0697L201.337%2029.2098L201.234%2029.3429L201.127%2029.4759L201.012%2029.5861L200.899%2029.7115L200.766%2029.8293L200.644%2029.9329L200.504%2030.0366L200.364%2030.1325L200.223%2030.2132L200.08%2030.295L199.929%2030.3681L199.77%2030.427L199.608%2030.4935L199.453%2030.5306L199.283%2030.5677L198.958%2030.6419L198.781%2030.6561L198.611%2030.6637H198.438L198.265%2030.6561L198.088%2030.6419L197.914%2030.6048L197.737%2030.583ZM201.02%2024.1768L199.408%2030.9811L199.375%2030.9735L199.324%2030.9516L199.268%2030.944L199.209%2030.9298L199.154%2030.9146L199.106%2030.9069L199.054%2030.8927L198.995%2030.8775L198.94%2030.8557L198.891%2030.8404L198.836%2030.8338H198.781L198.726%2030.8186L198.678%2030.8109L198.626%2030.7968L198.571%2030.7739L198.527%2030.7673L198.482%2030.752L198.427%2030.7444L198.368%2030.7226L198.313%2030.7084H198.261L198.206%2030.6931L198.162%2030.679L198.103%2030.6637L198.047%2030.6561L197.992%2030.6419L197.945%2030.6342L197.888%2030.6048L197.83%2030.5895L197.774%2030.583H197.737L199.268%2023.7787L199.334%2023.7853L199.39%2023.8082L199.445%2023.8224L199.5%2023.83L199.545%2023.8453H199.6L199.655%2023.8594L199.714%2023.8671L199.763%2023.8965L199.818%2023.9042L199.869%2023.9183L199.929%2023.9336L199.98%2023.9402L200.032%2023.9554L200.084%2023.9631L200.153%2023.9849H200.209L200.26%2024.0001L200.308%2024.0143L200.364%2024.0296L200.423%2024.0361L200.478%2024.0514L200.526%2024.0732L200.581%2024.0808L200.64%2024.0961L200.692%2024.1027L200.74%2024.1179H200.795L200.847%2024.1321L200.906%2024.155L200.95%2024.1692L201.02%2024.1768ZM199.408%2030.9811L201.02%2024.1768L201.193%2024.2139L201.367%2024.2804L201.533%2024.347L201.688%2024.4201L201.85%2024.479L201.998%2024.5749L202.145%2024.6567L202.282%2024.7527L202.411%2024.8629L202.547%2024.9741L202.669%2025.0843L202.784%2025.2174L202.898%2025.3351L203.001%2025.4682L203.093%2025.6089L203.193%2025.7485L203.274%2025.8816L203.348%2026.0364L203.425%2026.1913L203.485%2026.3386L203.54%2026.5011L203.587%2026.6636L203.632%2026.8408L203.661%2027.0033L203.687%2027.1653L203.702%2027.3355L203.709%2027.5051V27.6747L203.702%2027.8519L203.675%2028.0291L203.654%2028.1911L203.62%2028.376L203.573%2028.5532L203.517%2028.7228L203.451%2028.8924L203.385%2029.0549L203.311%2029.2098L203.226%2029.3571L203.13%2029.4978L203.034%2029.6526L202.931%2029.7704L202.821%2029.9035L202.706%2030.0366L202.463%2030.2503L202.326%2030.3681L202.193%2030.4575L202.045%2030.5601L201.902%2030.6419L201.758%2030.7084L201.61%2030.7968L201.448%2030.8404L201.289%2030.9069L201.127%2030.9516L200.968%2031.0029L200.795%2031.0247L200.625%2031.0476L200.46%2031.0694H199.943L199.763%2031.04L199.589%2031.0182L199.408%2030.9811ZM202.267%2024.4866L200.625%2031.2614L200.592%2031.2461H200.556L200.515%2031.2243L200.478%2031.2167H200.434L200.401%2031.2025L200.36%2031.1872H200.316L200.286%2031.1807L200.242%2031.1654H200.209L200.168%2031.1578L200.146%2031.136H200.091L200.047%2031.1141L200.032%2031.1065H199.988L199.954%2031.0912L199.91%2031.0847H199.858L199.825%2031.0694L199.796%2031.0476L199.763%2031.04H199.722L199.677%2031.0247L199.645%2031.0182H199.541L199.486%2030.9811L199.453%2030.9735L199.408%2030.9811L201.02%2024.1768L201.061%2024.2063H201.127L201.164%2024.2139L201.216%2024.2281L201.256%2024.2434L201.289%2024.2652H201.33L201.371%2024.2804L201.408%2024.287H201.459L201.496%2024.3023L201.529%2024.3099H201.559L201.599%2024.3317L201.64%2024.347H201.688L201.732%2024.3535L201.751%2024.3688H201.806L201.843%2024.3764L201.883%2024.3982H201.928L201.957%2024.4201L201.998%2024.4277L202.035%2024.443H202.075L202.116%2024.4495H202.149L202.193%2024.4648L202.226%2024.479L202.267%2024.4866ZM200.625%2031.2614L202.267%2024.4866L202.441%2024.5389L202.606%2024.5902L202.772%2024.6491L202.931%2024.7233L203.086%2024.7963L203.24%2024.8781L203.385%2024.9741L203.521%2025.0767L203.654%2025.1803L203.783%2025.2915L203.901%2025.4017L204.019%2025.5195L204.129%2025.6525L204.233%2025.7703L204.329%2025.9034L204.421%2026.0659L204.506%2026.2066L204.584%2026.3538L204.65%2026.5011L204.716%2026.656L204.772%2026.8261L204.815%2026.9734L204.852%2027.1359L204.882%2027.3202L204.911%2027.4827L204.93%2027.6452L204.933%2027.8224L204.93%2027.9921L204.919%2028.1693L204.901%2028.3389L204.87%2028.5161L204.831%2028.6934L204.786%2028.863L204.735%2029.0402L204.672%2029.2098L204.598%2029.3571L204.521%2029.5125L204.435%2029.6603L204.347%2029.8075L204.247%2029.9482L204.145%2030.066L204.03%2030.2132L203.92%2030.3321L203.798%2030.4499L203.673%2030.5601L203.54%2030.6561L203.403%2030.7673L203.263%2030.8404L203.119%2030.9298L202.968%2031.0182L202.821%2031.0847L202.658%2031.136L202.503%2031.1872L202.341%2031.2461L202.178%2031.2908L202.012%2031.3127L201.843%2031.3421L201.677%2031.3574H201.323L201.153%2031.3421L200.98%2031.3279L200.799%2031.2985L200.625%2031.2614ZM204.067%2024.9218L202.341%2031.7042L202.292%2031.6889L202.249%2031.6671L202.182%2031.6595L202.131%2031.6453L202.086%2031.6377L202.035%2031.6159L201.979%2031.6006L201.909%2031.593L201.869%2031.5712L201.813%2031.5635L201.758%2031.5493L201.703%2031.5341L201.644%2031.5275L201.596%2031.5123L201.54%2031.497L201.485%2031.4752L201.426%2031.461L201.382%2031.4534L201.315%2031.4381L201.264%2031.4315L201.223%2031.4086L201.164%2031.3945L201.109%2031.3868L201.057%2031.365L201.002%2031.3574L200.947%2031.3421L200.891%2031.3279L200.847%2031.3127L200.795%2031.2985L200.728%2031.2908L200.684%2031.2767L200.625%2031.2614L202.267%2024.4866L202.326%2024.5084L202.392%2024.516L202.433%2024.5389H202.488L202.558%2024.5608H202.614L202.669%2024.5902H202.721L202.776%2024.6044L202.831%2024.6197L202.887%2024.6273L202.956%2024.6491L203.012%2024.6567L203.052%2024.6709L203.126%2024.6938L203.178%2024.7004L203.23%2024.7156L203.285%2024.7233L203.344%2024.7374L203.399%2024.7527L203.451%2024.7593L203.503%2024.7898L203.565%2024.7963L203.628%2024.8116L203.665%2024.8258L203.72%2024.8334L203.779%2024.8552L203.845%2024.8629L203.901%2024.8923H203.941L204.012%2024.9L204.067%2024.9218ZM202.341%2031.7042L204.067%2024.9218L204.237%2024.9741L204.41%2025.033L204.735%2025.1726L204.882%2025.2468L205.037%2025.3351L205.173%2025.4311L205.317%2025.5195L205.446%2025.6307L205.571%2025.7485L205.697%2025.8598L205.808%2025.9776L205.918%2026.1172L206.018%2026.2426L206.118%2026.3833L206.206%2026.5234L206.29%2026.6636L206.368%2026.8261L206.435%2026.9734L206.498%2027.1359L206.545%2027.2907L206.593%2027.4609L206.631%2027.6234L206.667%2027.7854L206.682%2027.9626L206.696%2028.1251V28.479L206.682%2028.6416L206.667%2028.8188L206.631%2029.0031L206.593%2029.1727L206.545%2029.3429L206.486%2029.5125L206.42%2029.6744L206.35%2029.8369L206.269%2029.9995L206.18%2030.1467L206.088%2030.2874L205.985%2030.4205L205.881%2030.5601L205.775%2030.679L205.657%2030.8109L205.534%2030.9146L205.402%2031.0247L205.273%2031.136L205.133%2031.2243L204.989%2031.3127L204.845%2031.3945L204.701%2031.4752L204.543%2031.5341L204.384%2031.6006L204.225%2031.6595L204.067%2031.7042L203.901%2031.7337L203.728%2031.7784L203.565%2031.7849L203.391%2031.8002L203.219%2031.8078H203.045L202.876%2031.8002L202.695%2031.7784L202.521%2031.7337L202.341%2031.7042ZM205.118%2025.2174L203.485%2031.9769H203.436L203.399%2031.9627L203.362%2031.9551H203.315L203.297%2031.9333L203.263%2031.918H203.226L203.193%2031.9103L203.16%2031.8962H203.126L203.086%2031.8809L203.052%2031.8667H203.015L203.001%2031.8438L202.949%2031.8373H202.864L202.813%2031.8078L202.776%2031.8002L202.761%2031.8078L202.721%2031.7849H202.651L202.617%2031.7784L202.58%2031.7489L202.551%2031.7337H202.514L202.481%2031.726H202.444L202.411%2031.7118H202.377L202.341%2031.7042L204.067%2024.9218L204.1%2024.9294L204.133%2024.9512H204.167L204.204%2024.9665L204.237%2024.9741L204.273%2024.9883H204.303L204.339%2025.0036H204.373L204.41%2025.0112L204.447%2025.033H204.476L204.527%2025.0625H204.584L204.613%2025.0767L204.668%2025.0843L204.701%2025.0996L204.719%2025.1061H204.772L204.805%2025.129L204.838%2025.1432H204.87L204.907%2025.1508L204.941%2025.1726H204.966L205.007%2025.1803H205.037L205.085%2025.1955L205.103%2025.2174H205.136L205.173%2025.225L205.118%2025.2174ZM203.436%2031.9769L205.173%2025.225L205.346%2025.2839L205.516%2025.3351L205.675%2025.3875L205.834%2025.4682L205.996%2025.5565L206.139%2025.6307L206.28%2025.7343L206.42%2025.8369L206.553%2025.9481L206.803%2026.1542L206.907%2026.2873L207.021%2026.4204L207.124%2026.5534L207.213%2026.6854L207.305%2026.8408L207.387%2026.9734L207.463%2027.1211L207.53%2027.2766L207.582%2027.4314L207.641%2027.5934L207.685%2027.7559L207.718%2027.9184L207.751%2028.0957L207.774%2028.2576L207.785%2028.4349V28.7817L207.774%2028.9442L207.74%2029.1286L207.715%2029.3058L207.671%2029.4759L207.626%2029.6526L207.571%2029.8075L207.504%2029.97L207.431%2030.1325L207.35%2030.2874L207.261%2030.427L207.169%2030.5677L207.069%2030.7084L206.962%2030.8404L206.848%2030.9735L206.733%2031.0912L206.608%2031.2025L206.486%2031.3127L206.353%2031.4086L206.214%2031.5123L206.069%2031.6006L205.926%2031.6889L205.775%2031.7489L205.62%2031.822L205.468%2031.8809L205.306%2031.9333L205.136%2031.9769L204.978%2032.0216L204.808%2032.0511L204.646%2032.0587L204.472%2032.0729L204.3%2032.0881L204.129%2032.0729L203.953%2032.0587L203.779%2032.0511L203.606%2031.9998L203.436%2031.9769ZM200.847%2028.376L207.803%2028.8188L203.506%2031.9845L203.23%2031.9103L203.757%2032.0511H203.75L203.23%2031.9103H203.226L203.828%2032.0587L203.742%2032.0511L203.219%2031.9103L203.732%2032.0511L203.211%2031.9103L203.485%2031.9769L205.118%2025.2174L205.399%2025.2915L204.874%2025.1508L205.402%2025.2915H205.409L204.882%2025.1508L204.808%2025.1432L205.409%2025.2915H205.413H205.424L205.148%2025.225L200.847%2028.376ZM203.506%2031.9845L205.148%2025.225L205.317%2025.2621L205.491%2025.321L205.653%2025.3722L205.812%2025.4464L205.97%2025.5195L206.118%2025.6089L206.265%2025.7038L206.402%2025.8074L206.531%2025.9034L206.667%2026.0212L206.782%2026.1324L206.895%2026.2502L207.007%2026.3833L207.113%2026.5011L207.213%2026.6418L207.305%2026.789L207.387%2026.9368L207.463%2027.0917L207.53%2027.2319L207.593%2027.3867L207.648%2027.5492L207.696%2027.7118L207.737%2027.8743L207.766%2028.0291L207.788%2028.2135L207.803%2028.376L207.814%2028.5456L207.803%2028.7228L207.796%2028.9001L207.777%2029.0697L207.751%2029.2469L207.715%2029.4236L207.667%2029.5861L207.611%2029.7704L207.549%2029.9253L207.479%2030.0878L207.397%2030.2427L207.316%2030.391L207.224%2030.5459L207.132%2030.679L207.021%2030.8109L206.915%2030.944L206.803%2031.0694L206.678%2031.1807L206.553%2031.2908L206.42%2031.3868L206.28%2031.4752L206.143%2031.5712L206.004%2031.6595L205.848%2031.7337L205.697%2031.8078L205.538%2031.8667L205.379%2031.918L205.221%2031.9769L205.056%2031.9998L204.897%2032.0511L204.719%2032.0587L204.554%2032.0881H204.21L204.03%2032.0729L203.857%2032.0587L203.687%2032.0358L203.506%2031.9845ZM208.434%2017.4315L210.208%2010.6643L212.214%2015.9852L211.963%2016.3615L211.724%2016.7378L211.507%2017.1075L211.278%2017.4762L211.056%2017.8667L210.847%2018.2506L210.639%2018.6345L210.447%2019.0261L210.263%2019.4094L210.083%2019.8081L209.899%2020.2138L209.736%2020.5977L209.574%2020.9964L209.419%2021.3874L209.256%2021.7931L209.127%2022.2065L208.987%2022.6052L208.858%2023.0262L208.747%2023.4166L208.63%2023.83L208.53%2024.2434L208.423%2024.6567L208.334%2025.0767L208.257%2025.49L208.165%2025.8958L208.095%2026.3168L208.035%2026.7449L207.966%2027.1582L207.921%2027.5716L207.877%2027.985L207.84%2028.4125L207.803%2028.8188L200.847%2028.376L200.88%2027.8519L200.936%2027.3202L200.983%2026.7743L201.061%2026.2502L201.127%2025.7191L201.216%2025.1955L201.312%2024.6709L201.404%2024.1321L201.507%2023.5944L201.628%2023.0698L201.758%2022.5533L201.891%2022.0293L202.035%2021.5199L202.2%2020.9964L202.359%2020.487L202.521%2019.963L202.706%2019.4536L202.898%2018.9443L203.082%2018.4349L203.297%2017.919L203.506%2017.4173L203.72%2016.9156L203.953%2016.428L204.705%2014.9447L204.966%2014.4577L205.244%2013.9778L205.528%2013.4985L205.83%2013.0262L206.121%2012.561L206.427%2012.0887L208.434%2017.4315ZM212.214%2015.9852L206.427%2012.0887L206.531%2011.9415L206.641%2011.8008L206.759%2011.6754L206.874%2011.5499L207.007%2011.4245L207.136%2011.3285L207.272%2011.2184L207.412%2011.1071L207.559%2011.033L207.707%2010.9446L207.859%2010.8781L208.014%2010.805L208.172%2010.7526L208.331%2010.7014L208.486%2010.6567L208.655%2010.6207L208.814%2010.5978L208.983%2010.5607H209.157L209.319%2010.5542L209.485%2010.5607H209.658L209.821%2010.5978L209.998%2010.6207L210.163%2010.6567L210.322%2010.7014L210.651%2010.805L210.809%2010.8933L210.968%2010.9675L211.119%2011.0559L211.27%2011.1518L211.417%2011.2544L211.558%2011.358L211.691%2011.491L211.816%2011.6088L211.934%2011.7343L212.045%2011.8597L212.152%2011.9928L212.251%2012.1329L212.34%2012.2883L212.41%2012.428L212.487%2012.5905L212.557%2012.7453L212.613%2012.886L212.668%2013.0556L212.708%2013.2252L212.741%2013.373L212.775%2013.5426L212.79%2013.7051L212.804%2013.8895L212.808%2014.052L212.804%2014.2069L212.79%2014.3765L212.775%2014.5466L212.741%2014.7233L212.708%2014.8935L212.661%2015.0554L212.613%2015.2179L212.549%2015.3799L212.476%2015.5348L212.398%2015.6902L212.306%2015.838L212.214%2015.9852ZM207.021%2017.041L208.743%2010.3033H208.784L208.847%2010.3175L208.887%2010.3327L208.921%2010.3469L208.965%2010.3546L209.024%2010.3698H209.065L209.112%2010.384L209.157%2010.3916L209.205%2010.4058L209.245%2010.4211L209.293%2010.4429L209.349%2010.4582H209.396L209.423%2010.4647L209.474%2010.48L209.526%2010.4876L209.574%2010.5094L209.622%2010.5247L209.651%2010.5312H209.717L209.74%2010.5542L209.806%2010.5607L209.843%2010.576L209.887%2010.5978L209.935%2010.6054L209.983%2010.6207L210.034%2010.6272H210.071L210.12%2010.6425L210.163%2010.6567L210.208%2010.6643L208.434%2017.4315L208.393%2017.4173L208.345%2017.3944L208.298%2017.3802L208.257%2017.3649L208.205%2017.3584L208.165%2017.3431L208.113%2017.3355H208.072L208.024%2017.3137L208.002%2017.2984L207.936%2017.2919L207.91%2017.269L207.843%2017.2624L207.796%2017.2471H207.755L207.718%2017.2253L207.618%2017.2024L207.578%2017.1959L207.545%2017.1806L207.504%2017.1664L207.453%2017.1512H207.412L207.368%2017.1294L207.32%2017.1217L207.272%2017.1075L207.25%2017.0923L207.202%2017.0846H207.146L207.095%2017.0705L207.069%2017.0552L207.021%2017.041ZM151.677%2010.2509V3.26236L153.555%203.27L155.435%203.29944L157.316%203.33652L159.179%203.38016L161.049%203.44014L162.908%203.52085L164.76%203.61683L168.452%203.83824L170.288%203.97839L172.114%204.11092L173.944%204.28869L177.554%204.65734L179.359%204.86402L181.151%205.06309L182.943%205.31394L184.721%205.55061L186.491%205.79385L188.251%206.08178L190.011%206.36209L191.755%206.65004L195.222%207.28427L196.94%207.60166L198.652%207.95613L200.36%208.31824L202.057%208.68689L203.742%209.07082L205.413%209.47655L207.08%209.86701L208.743%2010.3033L207.021%2017.041L205.413%2016.6353L203.801%2016.2361L202.182%2015.8674L200.556%2015.4911L198.914%2015.1443L197.258%2014.7975L195.602%2014.4577L193.935%2014.1403L192.26%2013.8158L190.579%2013.5279L188.885%2013.2329L187.189%2012.952L185.478%2012.7012L183.762%2012.4432L182.044%2012.2218L180.303%2012.0146L178.569%2011.7866L176.825%2011.6012L175.072%2011.4027L173.305%2011.2249L171.546%2011.0853L169.765%2010.937L167.991%2010.805L166.202%2010.6937L164.409%2010.576L162.609%2010.48L160.806%2010.4058L158.995%2010.3469L155.355%2010.2586L153.529%2010.2368L151.677%2010.2509ZM7.34304%2098.6604H0.382891L0.578595%2093.6645L1.19131%2088.7199L2.19053%2083.8571L3.55933%2079.0744L5.31082%2074.3883L7.41717%2069.8134L9.85169%2065.3339L12.6285%2060.9717L15.7232%2056.7213L19.1237%2052.6187L22.8305%2048.6186L26.8029%2044.7663L31.0674%2041.0465L35.6001%2037.4603L40.3688%2034.0285L45.396%2030.7673L50.6711%2027.6381L56.1627%2024.6938L61.8723%2021.882L67.7733%2019.2769L73.8967%2016.8196L80.2005%2014.5537L86.6951%2012.4945L93.3489%2010.6207L100.18%208.93774L107.147%207.46205L114.266%206.20721L121.517%205.15906L128.89%204.34759L136.385%203.74227L143.983%203.38016L151.677%203.26236V10.2509L144.201%2010.3546L136.817%2010.7014L129.543%2011.2773L122.395%2012.074L115.361%2013.0998L108.457%2014.3252L101.711%2015.742L95.1265%2017.3649L88.6908%2019.1657L82.4355%2021.1731L76.3568%2023.3501L70.4809%2025.6973L64.7936%2028.2135L59.3342%2030.8775L54.082%2033.6969L49.081%2036.6859L44.3008%2039.7922L39.779%2043.0397L35.5189%2046.4045L31.5318%2049.9029L27.7988%2053.5043L24.3656%2057.2083L21.2339%2061.0164L18.39%2064.9129L15.86%2068.8983L13.643%2072.9278L11.7471%2077.0746L10.1946%2081.259L8.95878%2085.5247L8.06969%2089.8422L7.53491%2094.2033L7.34304%2098.6604ZM151.677%20187.092V194.058L143.983%20193.933L136.385%20193.579L128.89%20192.966L121.517%20192.162L114.266%20191.106L107.147%20189.859L100.18%20188.376L93.3489%20186.701L86.6951%20184.826L80.2005%20182.761L73.8967%20180.494L67.7733%20178.044L61.8723%20175.439L56.1627%20172.635L50.6711%20169.683L45.396%20166.562L40.3688%20163.285L35.6001%20159.853L31.0674%20156.274L26.8029%20152.555L22.8305%20148.71L19.1237%20144.695L15.7232%20140.592L12.6285%20136.341L9.85169%20131.98L7.41717%20127.493L5.31082%20122.918L3.55933%20118.239L2.19053%20113.464L1.19131%20108.601L0.578595%20103.649L0.382891%2098.6604H7.34304L7.53491%20103.11L8.06969%20107.479L8.95878%20111.796L10.1946%20116.047L11.7471%20120.246L13.643%20124.386L15.86%20128.438L18.39%20132.401L21.2339%20136.304L24.3656%20140.105L27.7988%20143.81L31.5318%20147.433L35.5189%20150.909L39.779%20154.266L44.3008%20157.529L49.081%20160.643L54.082%20163.617L59.3342%20166.436L64.7936%20169.1L70.4809%20171.624L76.3568%20173.956L82.4355%20176.148L88.6908%20178.14L95.1265%20179.963L101.711%20181.564L108.457%20182.989L115.361%20184.229L122.395%20185.24L129.543%20186.044L136.817%20186.612L144.201%20186.959L151.677%20187.07V187.092ZM295.996%2098.6604H302.986H302.964L302.772%20103.649L302.159%20108.601L301.171%20113.464L299.792%20118.239L298.039%20122.918L295.929%20127.493L293.495%20131.98L290.722%20136.349L287.63%20140.592L284.226%20144.695L280.516%20148.71L276.547%20152.555L272.28%20156.274L267.75%20159.853L262.977%20163.285L257.958%20166.562L252.683%20169.683L247.192%20172.635L241.481%20175.439L235.577%20178.044L229.454%20180.494L223.154%20182.761L216.659%20184.826L210.009%20186.701L203.178%20188.376L196.211%20189.859L189.096%20191.106L181.84%20192.162L174.467%20192.966L166.969%20193.579L159.375%20193.933L151.677%20194.058V187.092L159.157%20186.959L166.537%20186.612L173.811%20186.044L180.967%20185.24L187.997%20184.229L194.893%20182.989L201.644%20181.564L208.231%20179.963L214.663%20178.14L220.919%20176.148L226.994%20173.956L232.877%20171.624L238.557%20169.1L244.023%20166.436L249.268%20163.617L254.277%20160.643L259.05%20157.529L263.575%20154.266L267.832%20150.909L271.822%20147.433L275.552%20143.817L278.985%20140.105L282.113%20136.304L284.96%20132.401L287.49%20128.438L289.715%20124.386L291.603%20120.246L293.155%20116.047L294.399%20111.796L295.288%20107.479L295.816%20103.11L296.007%2098.6604H295.996ZM257.404%2038.6044L260.787%2032.508L260.979%2032.6193L263.136%2034.0361L265.261%2035.5047L267.352%2036.988L269.424%2038.5379L271.439%2040.1096L273.423%2041.7331L275.374%2043.3866L277.27%2045.076L279.129%2046.8102L280.94%2048.611L282.685%2050.4117L284.389%2052.286L286.041%2054.1904L287.62%2056.1531L289.147%2058.1381L290.618%2060.1821L292.001%2062.2565L293.329%2064.3965L294.58%2066.5511L295.771%2068.7576L296.867%2071.0306L297.87%2073.3259L298.81%2075.6578L299.651%2078.0562L300.411%2080.477L301.079%2082.9485L301.639%2085.48L302.119%2088.0186L302.499%2090.6242L302.768%2093.2735L302.915%2095.9451L302.986%2098.6604H295.996L295.952%2096.2178L295.804%2093.8194L295.561%2091.4651L295.236%2089.1333L294.82%2086.8526L294.31%2084.6167L293.724%2082.4108L293.049%2080.2338L292.285%2078.1151L291.456%2076.0199L290.534%2073.9531L289.541%2071.9309L288.486%2069.9235L287.354%2067.9679L286.159%2066.0352L284.879%2064.1456L283.552%2062.2931L282.161%2060.4634L280.689%2058.6627L279.177%2056.9062L277.617%2055.1938L275.975%2053.489L274.301%2051.8508L272.571%2050.2203L270.789%2048.6186L268.975%2047.0764L267.101%2045.5636L265.19%2044.065L263.261%2042.6264L261.277%2041.209L259.256%2039.8369L257.213%2038.4932L257.404%2038.6044ZM260.979%2032.6193L257.213%2038.4932L257.065%2038.383L256.925%2038.2871L256.788%2038.1693L256.663%2038.0504L256.538%2037.9249L256.427%2037.7853L256.32%2037.6675L256.22%2037.5345L256.128%2037.3796L256.048%2037.2389L255.966%2037.0993L255.899%2036.9368L255.829%2036.7743L255.782%2036.6194L255.733%2036.4569L255.693%2036.302L255.656%2036.1395L255.638%2035.977L255.615%2035.7927L255.612%2035.6301V35.4605L255.623%2035.2909L255.656%2034.9512L255.693%2034.7887L255.733%2034.6267L255.782%2034.4571L255.84%2034.287L255.915%2034.1397L255.988%2033.9696L256.069%2033.8294L256.158%2033.674L256.265%2033.5126L256.375%2033.3795L256.486%2033.2388L256.597%2033.121L256.722%2032.9879L256.855%2032.8843L256.984%2032.7818L257.124%2032.6858L257.268%2032.5822L257.415%2032.5015L257.566%2032.4197L257.718%2032.3466L257.873%2032.3019L258.035%2032.2354L258.19%2032.1841L258.356%2032.147L258.526%2032.1099L258.684%2032.0881L258.854%2032.0729L259.016%2032.0587H259.186L259.359%2032.0729L259.518%2032.0881L259.691%2032.1099L259.861%2032.147L260.023%2032.1841L260.19%2032.2354L260.355%2032.3019L260.514%2032.3608L260.672%2032.4415L260.831%2032.5309L260.979%2032.6193ZM252.779%2036.759L254.553%2030.0147L254.782%2030.0736L255%2030.1325L255.21%2030.1991L255.423%2030.2503L255.638%2030.3169L255.852%2030.3834L256.062%2030.4641L256.268%2030.5164L256.479%2030.583L256.685%2030.6713L256.892%2030.7226L257.087%2030.8109L257.29%2030.8775L257.474%2030.9516L257.678%2031.0247L257.866%2031.1065L258.058%2031.1872L258.253%2031.2767L258.445%2031.3574L258.629%2031.4315L258.825%2031.5123L259.013%2031.593L259.197%2031.6889L259.382%2031.7784L259.555%2031.8667L259.735%2031.9551L259.92%2032.0358L260.097%2032.1252L260.263%2032.2277L260.444%2032.3095L260.625%2032.4197L260.787%2032.508L257.404%2038.6044L257.147%2038.4496L257.021%2038.3972L256.881%2038.3307L256.755%2038.2652L256.622%2038.1758L256.497%2038.1245L256.357%2038.0504L256.22%2037.9991L256.091%2037.9249L255.954%2037.8737L255.823%2037.8224L255.686%2037.7406L255.556%2037.6817L255.42%2037.6305L255.269%2037.5716L255.133%2037.5116L254.988%2037.4603L254.826%2037.409L254.686%2037.3567L254.542%2037.3054L254.387%2037.2389L254.24%2037.1947L254.089%2037.1429L253.934%2037.0993L253.779%2037.0469L253.617%2036.988L253.458%2036.951L253.296%2036.8921L253.115%2036.855L252.953%2036.7961L252.779%2036.759ZM249.507%2034.4495L242.633%2035.6301L242.577%2035.1579L242.551%2034.7003L242.555%2034.1986L242.621%2033.6969L242.736%2033.1657L242.905%2032.6487L243.134%2032.147L243.426%2031.6595L243.776%2031.2167L244.16%2030.8186L244.573%2030.4717L245.004%2030.1838L245.436%2029.9406L245.871%2029.7486L246.321%2029.5643L246.763%2029.4389L247.199%2029.3276L247.652%2029.2616L248.091%2029.2245L248.534%2029.1951L248.992%2029.1727H249.427L249.887%2029.1951L250.371%2029.2245L250.85%2029.2763L251.33%2029.3429L251.835%2029.4165L252.363%2029.5125L252.886%2029.6232L253.432%2029.7339L253.982%2029.874L254.553%2030.0147L252.779%2036.759L252.326%2036.6412L251.879%2036.5305L251.466%2036.4345L251.079%2036.3609L250.717%2036.302L250.375%2036.2502L250.057%2036.2131L249.762%2036.1766L249.507%2036.1542L249.268%2036.1395H249.047L248.87%2036.1542H248.718L248.604%2036.1766L248.534%2036.1837H248.49L248.479%2036.2131L248.516%2036.1766L248.571%2036.1613L248.659%2036.1171L248.777%2036.0288L248.91%2035.9104L249.047%2035.7779L249.19%2035.6083L249.309%2035.4235L249.397%2035.2168L249.452%2035.0177L249.493%2034.8405L249.515%2034.7003V34.5825L249.507%2034.4936V34.4495ZM262.405%2053.681L257.792%2058.9136L256.622%2056.1972L256.604%2055.4299L256.538%2054.6997L256.438%2054.0126L256.265%2053.3342L256.05%2052.6852L255.8%2052.021L255.49%2051.4004L255.147%2050.7809L254.76%2050.1461L254.344%2049.5484L253.89%2048.9283L253.392%2048.3306L252.853%2047.7406L252.303%2047.1494L251.743%2046.5746L251.138%2045.9911L250.533%2045.4305L249.917%2044.8623L249.29%2044.294L248.667%2043.7476L248.047%2043.1946L247.427%2042.6264L246.823%2042.0652L246.228%2041.4822L245.664%2040.914L245.108%2040.3016L244.573%2039.6668L244.067%2038.9731L243.606%2038.25L243.201%2037.4603L242.861%2036.567L242.633%2035.6301L249.507%2034.4495L249.519%2034.4865L249.56%2034.5896L249.666%2034.7669L249.825%2035.0324L250.057%2035.3422L250.349%2035.7114L250.714%2036.1171L251.145%2036.5452L251.628%2037.0099L252.152%2037.4898L252.713%2037.9991L253.307%2038.5521L253.934%2039.1062L254.591%2039.6962L255.258%2040.3157L255.948%2040.9505L256.63%2041.6076L257.327%2042.3161L258.013%2043.0397L258.684%2043.7923L259.348%2044.619L259.99%2045.4523L260.613%2046.3303L261.185%2047.2607L261.72%2048.2347L262.192%2049.2681L262.624%2050.3457L262.977%2051.4745L263.261%2052.6481L263.468%2053.8653L263.571%2055.1125L263.575%2056.4039L262.405%2053.681ZM256.622%2056.1972L263.575%2056.4039L263.571%2056.5811L263.549%2056.7437L263.523%2056.9209L263.49%2057.0905L263.446%2057.2601L263.39%2057.4303L263.332%2057.5851L263.265%2057.7471L263.192%2057.9025L263.114%2058.0498L263.026%2058.1905L262.93%2058.323L262.834%2058.4631L262.727%2058.5886L262.613%2058.714L262.487%2058.8252L262.362%2058.943L262.24%2059.039L262.103%2059.1492L261.964%2059.2375L261.823%2059.3335L261.676%2059.3935L261.517%2059.4818L261.366%2059.5331L261.208%2059.6073L261.042%2059.6443L260.879%2059.688L260.705%2059.7327L260.532%2059.7545L260.362%2059.7763L260.182%2059.784H260.001L259.824%2059.7763L259.643%2059.7545L259.474%2059.7327L259.3%2059.688L259.134%2059.6443L258.972%2059.5996L258.81%2059.5331L258.655%2059.4666L258.5%2059.3935L258.356%2059.3193L258.216%2059.2157L258.079%2059.135L257.932%2059.0237L257.818%2058.9354L257.692%2058.8023L257.57%2058.6922L257.464%2058.5738L257.349%2058.4413L257.257%2058.3159L257.157%2058.1534L257.076%2058.0203L256.995%2057.8654L256.914%2057.7176L256.855%2057.5699L256.792%2057.4003L256.748%2057.2307L256.704%2057.0681L256.667%2056.9062L256.641%2056.736L256.63%2056.5593L256.622%2056.3745V56.1972ZM263.162%2054.3452L258.493%2059.5331L258.474%2059.5113H258.445L258.422%2059.4818L258.404%2059.4589L258.375%2059.4371L258.367%2059.4229L258.352%2059.3935L258.315%2059.3859L258.286%2059.3564L258.267%2059.3488L258.264%2059.3193H258.23L258.194%2059.2746L258.19%2059.2604L258.164%2059.2528L258.146%2059.2157L258.124%2059.2081L258.094%2059.1939L258.079%2059.1492H258.054L258.035%2059.1197L258.002%2059.1121L257.987%2059.0826L257.965%2059.0761L257.954%2059.0466L257.928%2059.0237H257.921L257.884%2058.9867L257.862%2058.9725L257.84%2058.943L257.818%2058.9354L257.792%2058.9136L262.405%2053.681L262.428%2053.7028L262.45%2053.7323L262.476%2053.7552L262.495%2053.777H262.501L262.546%2053.7988L262.564%2053.8283L262.601%2053.8653L262.624%2053.873L262.65%2053.8872L262.668%2053.9101L262.693%2053.9319L262.716%2053.9689H262.738L262.76%2053.9984L262.785%2054.0278L262.804%2054.042L262.834%2054.0649L262.867%2054.0944H262.875L262.897%2054.138L262.934%2054.1456L262.959%2054.1751L262.977%2054.1904L262.993%2054.2122L263.011%2054.2274L263.048%2054.2493L263.073%2054.2863L263.096%2054.3005L263.114%2054.3158L263.136%2054.3376L263.162%2054.3452ZM258.493%2059.5331L263.162%2054.3452L263.412%2054.5961L263.531%2054.7433L263.637%2054.8764L263.733%2055.0171L263.822%2055.172L263.915%2055.3192L263.992%2055.4665L264.062%2055.629L264.117%2055.7768L264.169%2055.9393L264.209%2056.1012L264.254%2056.2714L264.28%2056.441L264.301%2056.6035L264.313%2056.7655V57.0905L264.301%2057.2601L264.28%2057.4303L264.258%2057.6069L264.217%2057.7547L264.176%2057.932L264.129%2058.0945L264.066%2058.2494L263.925%2058.5591L263.837%2058.714L263.752%2058.8612L263.641%2059.0096L263.538%2059.1492L263.42%2059.2822L263.295%2059.4153L263.173%2059.5331L263.036%2059.6443L262.897%2059.7545L262.756%2059.8505L262.613%2059.9541L262.465%2060.0348L262.307%2060.1166L262.155%2060.1821L261.993%2060.242L261.839%2060.2857L261.676%2060.338L261.514%2060.374L261.344%2060.4035L261.185%2060.4187L261.008%2060.4264H260.68L260.514%2060.4187L260.34%2060.4035L260.174%2060.374L260.009%2060.338L259.854%2060.2857L259.688%2060.2562L259.526%2060.1821L259.371%2060.1166L259.219%2060.0501L259.064%2059.9683L258.769%2059.7763L258.629%2059.6585L258.493%2059.5331ZM264.239%2055.3487L259.488%2060.4405L259.451%2060.4187L259.426%2060.3969L259.389%2060.3598L259.371%2060.338L259.337%2060.2857L259.271%2060.242L259.245%2060.2191L259.208%2060.1821L259.175%2060.1679L259.153%2060.1461L259.116%2060.1013L259.079%2060.0719L259.053%2060.0501L259.031%2060.013L258.994%2059.9912L258.972%2059.9683L258.935%2059.917L258.902%2059.8952L258.869%2059.8799L258.839%2059.8505L258.802%2059.8287L258.769%2059.7992L258.743%2059.7763L258.71%2059.7327L258.673%2059.7098L258.651%2059.6662L258.626%2059.6585L258.592%2059.6367L258.555%2059.5996L258.53%2059.5778L258.493%2059.5331L263.162%2054.3452L263.192%2054.3889L263.228%2054.4194L263.261%2054.4336L263.295%2054.463L263.332%2054.5219L263.369%2054.5514L263.406%2054.5743L263.439%2054.5961L263.468%2054.6397L263.502%2054.6626L263.538%2054.6844L263.564%2054.7292L263.598%2054.7728L263.631%2054.7957L263.664%2054.8251L263.696%2054.847L263.73%2054.8764L263.767%2054.9135L263.804%2054.9429L263.837%2054.9724L263.866%2055.0095L263.9%2055.0313L263.937%2055.076L263.962%2055.0978L263.996%2055.1273L264.029%2055.172L264.095%2055.2156L264.143%2055.2603L264.169%2055.2821L264.202%2055.3045L264.239%2055.3487ZM259.488%2060.4405L264.239%2055.3487L264.364%2055.4665L264.486%2055.5995L264.597%2055.7326L264.7%2055.8727L264.793%2056.0129L264.885%2056.1678L264.965%2056.3156L265.043%2056.4634L265.102%2056.6253L265.169%2056.7878L265.216%2056.9503L265.261%2057.1129L265.294%2057.2677L265.312%2057.4444L265.331%2057.6069L265.345%2057.7695V57.9391L265.341%2058.1087L265.327%2058.2712L265.309%2058.4413L265.272%2058.5962L265.235%2058.7587L265.19%2058.9354L265.135%2059.0979L265.073%2059.2528L265.002%2059.3935L264.928%2059.5549L264.836%2059.7098L264.748%2059.8505L264.644%2059.9912L264.527%2060.1461L264.409%2060.2639L264.287%2060.4035L264.154%2060.5147L264.017%2060.6325L263.882%2060.7438L263.733%2060.8397L263.594%2060.9281L263.439%2060.9946L263.287%2061.0753L263.129%2061.1495L262.971%2061.2008L262.815%2061.2455L262.65%2061.2891L262.483%2061.3262L262.313%2061.3556L262.155%2061.3785L261.986%2061.3851H261.649L261.484%2061.3556L261.322%2061.3338L261.152%2061.312L260.986%2061.2749L260.831%2061.2302L260.662%2061.1713L260.503%2061.1124L260.355%2061.0382L260.193%2060.9499L260.053%2060.8757L259.898%2060.7798L259.761%2060.6772L259.621%2060.566L259.488%2060.4405ZM264.951%2056.0129L260.145%2061.0611L260.123%2061.0535L260.097%2061.0241L260.078%2061.0164L260.056%2060.987L260.038%2060.9717L260.019%2060.9423L259.998%2060.9281L259.99%2060.9204L259.964%2060.8986L259.935%2060.8616L259.916%2060.8397L259.879%2060.8103L259.861%2060.8027L259.835%2060.7798L259.817%2060.7503L259.813%2060.7438L259.791%2060.7209L259.758%2060.6914H259.739L259.725%2060.6696L259.688%2060.6325L259.68%2060.6249L259.655%2060.6107L259.625%2060.566H259.621L259.588%2060.5518L259.566%2060.5289L259.551%2060.4994L259.526%2060.4929L259.507%2060.4776L259.488%2060.4405L264.239%2055.3487L264.258%2055.3563L264.28%2055.3781L264.301%2055.4005L264.324%2055.4152L264.338%2055.4447L264.364%2055.4594L264.393%2055.4894H264.405L264.431%2055.533L264.464%2055.5554L264.471%2055.5624L264.497%2055.5777L264.527%2055.629L264.53%2055.6442L264.556%2055.6513L264.597%2055.6737L264.619%2055.6955L264.638%2055.7179L264.656%2055.7326L264.663%2055.762L264.689%2055.7768L264.737%2055.8133H264.74L264.763%2055.8433L264.793%2055.8727L264.818%2055.9022L264.84%2055.9169L264.866%2055.9246L264.885%2055.9464L264.928%2055.9911L264.951%2056.0129ZM260.145%2061.0611L264.951%2056.0129L265.073%2056.1531L265.194%2056.2714L265.309%2056.4115L265.408%2056.5441L265.504%2056.6995L265.589%2056.832L265.67%2056.9869L265.74%2057.1494L265.806%2057.3119L265.866%2057.4739L265.913%2057.6146L265.98%2057.9538L266.009%2058.1163L266.025%2058.2788L266.028%2058.4555V58.6256L266.025%2058.7952L266.009%2058.9572L265.98%2059.1197L265.958%2059.2822L265.913%2059.4589L265.866%2059.6073L265.806%2059.7763L265.744%2059.917L265.67%2060.0872L265.589%2060.242L265.504%2060.3969L265.408%2060.5289L265.309%2060.6696L265.19%2060.8027L265.073%2060.9423L264.944%2061.0611L264.811%2061.1931L264.681%2061.2967L264.39%2061.4963L264.246%2061.5847L264.095%2061.6588L263.937%2061.7472L263.79%2061.7908L263.619%2061.8573L263.457%2061.9097L263.295%2061.9457L263.129%2061.9686L262.967%2062.0057L262.797%2062.0199L262.634%2062.0275H262.468L262.295%2062.0199L262.133%2062.0057L261.964%2061.9686L261.801%2061.9457L261.635%2061.9097L261.477%2061.8573L261.322%2061.7908L261.159%2061.7472L261.004%2061.673L260.85%2061.5847L260.699%2061.4963L260.558%2061.4004L260.422%2061.2967L260.278%2061.1931L260.145%2061.0611ZM265.973%2056.9945L261.085%2061.9686L261.06%2061.9457L261.022%2061.9239L261.008%2061.9097L260.967%2061.8573L260.934%2061.8203L260.92%2061.8137L260.853%2061.7548L260.824%2061.7319L260.795%2061.6807L260.765%2061.6588L260.732%2061.6359L260.705%2061.6065L260.672%2061.577L260.646%2061.5476L260.613%2061.5182L260.591%2061.4963L260.547%2061.4516L260.521%2061.4222L260.499%2061.408L260.47%2061.3851L260.436%2061.3556L260.407%2061.312L260.378%2061.2891L260.348%2061.2597L260.315%2061.2302L260.285%2061.2008L260.252%2061.1713L260.237%2061.1495L260.207%2061.1266L260.174%2061.0906L260.145%2061.0611L264.951%2056.0129L264.988%2056.0353L265.01%2056.0794L265.043%2056.1012L265.087%2056.1531L265.124%2056.1754L265.146%2056.1972L265.183%2056.2343L265.209%2056.2714L265.238%2056.3008L265.272%2056.3303L265.298%2056.3521L265.331%2056.3745L265.382%2056.4263L265.408%2056.4481L265.423%2056.4704L265.471%2056.5146L265.501%2056.5441L265.533%2056.5811L265.563%2056.6035L265.593%2056.6253L265.625%2056.6771L265.659%2056.6995L265.681%2056.7213L265.711%2056.7437L265.744%2056.7878L265.777%2056.8102L265.825%2056.8615L265.851%2056.8838L265.869%2056.9062L265.913%2056.9503L265.936%2056.9722L265.973%2056.9945ZM261.085%2061.9686L265.973%2056.9945L266.098%2057.1347L266.213%2057.2677L266.327%2057.415L266.422%2057.548L266.518%2057.6882L266.6%2057.8431L266.677%2057.9985L266.744%2058.1534L266.806%2058.3159L266.862%2058.4779L266.906%2058.6256L266.943%2058.7952L266.976%2058.9572L266.994%2059.1197L267.005%2059.2975L267.009%2059.4666V59.6367L266.998%2059.7992L266.98%2059.9683L266.95%2060.1308L266.917%2060.2857L266.873%2060.4634L266.825%2060.6107L266.769%2060.7798L266.699%2060.9281L266.629%2061.0906L266.545%2061.2455L266.46%2061.3851L266.36%2061.54L266.249%2061.673L266.142%2061.8137L266.017%2061.9315L265.888%2062.0569L265.755%2062.1824L265.615%2062.2931L265.471%2062.3891L265.327%2062.4779L265.172%2062.5663L265.025%2062.6399L264.866%2062.7064L264.704%2062.7801L264.552%2062.8248L264.39%2062.8761L264.228%2062.9131L264.062%2062.9349L263.892%2062.9502L263.73%2062.9644L263.557%2062.9797H263.39L263.228%2062.9644L263.059%2062.9349L262.73%2062.8908L262.564%2062.839L262.405%2062.7953L262.248%2062.7288L262.089%2062.6623L261.937%2062.5881L261.79%2062.5216L261.635%2062.4114L261.492%2062.3154L261.355%2062.2042L261.218%2062.094L261.085%2061.9686ZM266.596%2057.6146L261.649%2062.5439H261.635L261.617%2062.5216L261.594%2062.4998L261.584%2062.4779L261.557%2062.455L261.539%2062.4485L261.528%2062.4332L261.506%2062.4038L261.484%2062.3891L261.469%2062.3667L261.461%2062.3449H261.459L261.425%2062.3002L261.406%2062.2931L261.388%2062.2783L261.359%2062.2565H261.366L261.344%2062.2271L261.322%2062.1971L261.296%2062.1824H261.288L261.27%2062.1529L261.24%2062.1311H261.233L261.218%2062.094L261.185%2062.0717L261.159%2062.0417L261.13%2062.0199L261.104%2061.998L261.085%2061.9686L265.973%2056.9945L265.991%2057.0316L266.009%2057.0463L266.043%2057.0681L266.05%2057.0829L266.061%2057.0905L266.105%2057.1347L266.117%2057.1494L266.153%2057.1789L266.161%2057.2012L266.179%2057.2083L266.209%2057.2307L266.231%2057.2601H266.234L266.249%2057.2677L266.297%2057.319L266.301%2057.3343L266.323%2057.3414L266.338%2057.3784H266.345L266.371%2057.4003L266.408%2057.4303L266.426%2057.4444L266.441%2057.4739L266.463%2057.4815L266.481%2057.4962L266.497%2057.511L266.518%2057.5404L266.541%2057.548L266.552%2057.5851L266.578%2057.5922L266.596%2057.6146ZM261.649%2062.5439L266.596%2057.6146L266.721%2057.7547L266.825%2057.8802L266.939%2058.035L267.035%2058.1828L267.131%2058.323L267.216%2058.4631L267.293%2058.6256L267.36%2058.7729L267.411%2058.9354L267.47%2059.0979L267.511%2059.2604L267.544%2059.4229L267.569%2059.5996L267.596%2059.7545L267.606%2059.917V60.0872L267.603%2060.2562L267.596%2060.4187L267.569%2060.5889L267.544%2060.7503L267.5%2060.9204L267.466%2061.0753L267.407%2061.2455L267.345%2061.4004L267.285%2061.5629L267.201%2061.7243L267.12%2061.865L267.031%2062.0057L266.928%2062.1529L266.821%2062.2931L266.699%2062.4114L266.581%2062.551L266.452%2062.6765L266.312%2062.7953L266.176%2062.8979L266.028%2063.0015L265.888%2063.0898L265.729%2063.1787L265.582%2063.2452L265.423%2063.3189L265.265%2063.363L265.102%2063.4225L264.944%2063.459L264.773%2063.5108L264.612%2063.5327L264.442%2063.5479L264.28%2063.555H263.947L263.774%2063.5479L263.612%2063.5327L263.446%2063.5108L263.284%2063.459L263.126%2063.4225L262.959%2063.363L262.804%2063.3189L262.65%2063.2452L262.495%2063.164L262.347%2063.0756L262.203%2062.9797L262.056%2062.8908L261.915%2062.7801L261.779%2062.6623L261.649%2062.5439ZM267.47%2058.5144L262.476%2063.363L262.45%2063.3407L262.421%2063.3189L262.395%2063.2971L262.362%2063.2747L262.34%2063.2452L262.313%2063.2082L262.292%2063.1858L262.262%2063.164L262.236%2063.1416L262.225%2063.1122L262.203%2063.0898L262.17%2063.068L262.144%2063.0462L262.119%2063.0091L262.089%2062.9797L262.063%2062.9502L262.033%2062.9279L262.019%2062.8979L261.986%2062.8761L261.96%2062.839L261.931%2062.8172L261.904%2062.7953L261.894%2062.7801L261.86%2062.7506L261.841%2062.7288L261.816%2062.7064L261.79%2062.6765L261.761%2062.6546L261.731%2062.6252L261.706%2062.5881L261.676%2062.5663L261.649%2062.5439L266.596%2057.6146L266.622%2057.6517L266.651%2057.6811L266.67%2057.7029L266.696%2057.7324L266.725%2057.7547L266.754%2057.7842L266.78%2057.8136L266.806%2057.8431L266.836%2057.8654L266.873%2057.9167L266.898%2057.9391L266.928%2057.969L266.95%2057.9985L266.98%2058.0056L267.005%2058.035L267.035%2058.0645L267.064%2058.0945L267.083%2058.1163L267.113%2058.1381L267.134%2058.1828L267.168%2058.2046L267.193%2058.227L267.234%2058.2712L267.256%2058.3006L267.285%2058.323L267.308%2058.3453L267.341%2058.3819L267.363%2058.4042L267.393%2058.4413L267.411%2058.4631L267.441%2058.4849L267.47%2058.5297V58.5144ZM262.476%2063.363L267.47%2058.5297L267.596%2058.6551L267.702%2058.7952L267.806%2058.9354L267.898%2059.0826L267.994%2059.2375L268.071%2059.3706L268.149%2059.5331L268.212%2059.688L268.267%2059.8505L268.315%2060.0054L268.359%2060.1679L268.392%2060.338L268.421%2060.4994L268.437%2060.6696L268.448%2060.8397V60.9946L268.44%2061.1571L268.425%2061.3262L268.4%2061.4963L268.37%2061.6588L268.329%2061.8203L268.286%2061.998L268.233%2062.1529L268.174%2062.3002L268.094%2062.455L268.02%2062.6105L267.935%2062.7583L267.839%2062.8979L267.739%2063.0533L267.625%2063.1858L267.511%2063.3189L267.385%2063.4367L267.256%2063.555L267.12%2063.6733L266.98%2063.7841L266.836%2063.8724L266.685%2063.9684L266.541%2064.042L266.378%2064.1233L266.223%2064.1821L266.061%2064.2487L265.902%2064.2928L265.74%2064.3299L265.574%2064.3523L265.408%2064.3965L265.238%2064.4183H264.748L264.585%2064.4036L264.254%2064.3447L264.084%2064.3076L263.929%2064.2634L263.767%2064.2121L263.612%2064.1456L263.453%2064.0714L263.302%2063.9978L263.159%2063.9018L263.011%2063.8059L262.867%2063.7099L262.73%2063.5992L262.601%2063.4885L262.476%2063.363ZM268.274%2059.3564L263.195%2064.1456L263.181%2064.1085L263.151%2064.0791L263.129%2064.0714L263.103%2064.042L263.085%2064.0125L263.055%2063.9831L263.048%2063.9684L263.011%2063.9389L262.989%2063.9166L262.977%2063.9018L262.952%2063.8724L262.93%2063.85L262.904%2063.8206L262.881%2063.7988L262.856%2063.7841L262.834%2063.7617L262.804%2063.7246L262.785%2063.6952L262.756%2063.6733L262.738%2063.6439L262.709%2063.6286L262.701%2063.6139L262.66%2063.5774L262.657%2063.555L262.624%2063.5327L262.605%2063.5108L262.579%2063.4885L262.558%2063.459L262.546%2063.4519L262.509%2063.4149L262.483%2063.3854L262.476%2063.363L267.47%2058.5144L267.5%2058.5591L267.533%2058.5738L267.544%2058.5886L267.577%2058.6256L267.606%2058.6551L267.625%2058.6845L267.658%2058.714L267.673%2058.7293L267.718%2058.7587L267.728%2058.7729L267.761%2058.8252L267.787%2058.8471L267.806%2058.8689L267.832%2058.8907L267.865%2058.9136L267.88%2058.943L267.898%2058.9725L267.931%2059.0019L267.957%2059.0096L267.979%2059.039L268.002%2059.0761L268.09%2059.1644H268.094L268.137%2059.2081L268.156%2059.2375L268.186%2059.2604L268.204%2059.2822L268.233%2059.3193L268.252%2059.3335L268.274%2059.3564ZM263.195%2064.1456L268.274%2059.3564L268.4%2059.4895L268.507%2059.6367L268.613%2059.7763L268.709%2059.917L268.791%2060.0719L268.872%2060.2268L268.942%2060.374L269.005%2060.5365L269.064%2060.6914L269.108%2060.8616L269.148%2061.0241L269.178%2061.1931L269.203%2061.3556L269.218%2061.5182L269.222%2061.6807V61.8573L269.211%2062.0199L269.2%2062.1971L269.167%2062.3667L269.144%2062.5292L269.101%2062.6765L269.042%2062.839L268.993%2063.0091L268.931%2063.164L268.854%2063.3189L268.776%2063.459L268.687%2063.6139L268.592%2063.7617L268.492%2063.8948L268.378%2064.0349L268.252%2064.1674L268.131%2064.2928L267.994%2064.4183L267.853%2064.529L267.718%2064.6179L267.566%2064.7139L267.422%2064.8022L267.26%2064.8758L267.113%2064.95L266.95%2065.0165L266.795%2065.0831L266.629%2065.1196L266.463%2065.149L266.297%2065.1932L266.135%2065.2156L265.969%2065.2227L265.799%2065.2379H265.629L265.464%2065.2227L265.298%2065.2156L265.135%2065.1932L264.965%2065.149L264.807%2065.1196L264.644%2065.0607L264.486%2065.0089L264.327%2064.9424L264.176%2064.8687L264.025%2064.7875L263.882%2064.6991L263.733%2064.6032L263.594%2064.4924L263.457%2064.3965L263.328%2064.2634L263.195%2064.1456ZM269.108%2060.2562L263.947%2064.95L263.929%2064.9276L263.915%2064.9205L263.882%2064.8687L263.855%2064.8464L263.837%2064.8317L263.819%2064.8022L263.792%2064.7798L263.767%2064.7433L263.745%2064.7357L263.723%2064.6991L263.696%2064.6768L263.682%2064.6544L263.664%2064.6179L263.619%2064.5955L263.612%2064.5661L263.582%2064.5584L263.541%2064.5072L263.538%2064.4848L263.506%2064.4701L263.49%2064.4406L263.457%2064.4183L263.435%2064.3965L263.412%2064.3523L263.387%2064.3447L263.365%2064.3228L263.332%2064.2928L263.31%2064.2634L263.302%2064.2487L263.261%2064.2121L263.239%2064.1821L263.228%2064.1674L263.195%2064.1456L268.274%2059.3564L268.304%2059.3859L268.345%2059.4229L268.366%2059.4589L268.378%2059.4666L268.421%2059.5113L268.44%2059.5331L268.466%2059.5549L268.492%2059.5996L268.514%2059.6214L268.543%2059.6443L268.562%2059.6662L268.592%2059.688L268.613%2059.7174L268.639%2059.7545L268.68%2059.784L268.687%2059.7992L268.713%2059.8428L268.75%2059.8723L268.764%2059.8952L268.791%2059.917L268.824%2059.9541L268.854%2059.9835L268.872%2060.0054L268.901%2060.0348L268.927%2060.0566L268.95%2060.0872L268.975%2060.1166L269.012%2060.1461L269.038%2060.1679L269.042%2060.1821L269.085%2060.2268L269.108%2060.2562ZM263.947%2064.95L269.108%2060.2562L269.222%2060.3969L269.336%2060.5289L269.44%2060.6772L269.528%2060.8103L269.613%2060.9717L269.694%2061.1342L269.765%2061.2891L269.827%2061.4516L269.871%2061.6065L269.919%2061.769L269.956%2061.9315L269.978%2062.094L270.004%2062.2707L270.015%2062.4332V62.7801L270.004%2062.9349L269.978%2063.1051L269.956%2063.2747L269.919%2063.4367L269.871%2063.5921L269.827%2063.7617L269.702%2064.0714L269.624%2064.2192L269.543%2064.3741L269.455%2064.529L269.348%2064.6697L269.248%2064.8022L269.13%2064.9424L269.012%2065.0607L268.883%2065.1932L268.746%2065.2968L268.603%2065.4004L268.458%2065.5106L268.311%2065.5989L268.156%2065.6949L268.005%2065.7615L267.846%2065.8356L267.692%2065.9022L267.533%2065.9458L267.363%2065.9981L267.201%2066.02L267.035%2066.0647L266.869%2066.0865L266.699%2066.0941H266.367L266.201%2066.0865L266.035%2066.0647L265.869%2066.02L265.707%2065.9981L265.537%2065.9534L265.382%2065.9022L265.065%2065.7691L264.914%2065.6949L264.763%2065.6142L264.619%2065.5106L264.471%2065.4223L264.335%2065.3263L264.202%2065.2009L264.074%2065.0901L263.947%2064.95ZM269.9%2061.1495L264.689%2065.7615L264.663%2065.7473L264.644%2065.7244L264.619%2065.6949L264.597%2065.6731L264.567%2065.636L264.564%2065.6142L264.519%2065.5848L264.512%2065.5624L264.486%2065.5477L264.464%2065.5106L264.438%2065.4888L264.42%2065.4664L264.393%2065.4517L264.372%2065.4223L264.346%2065.3928L264.324%2065.3634L264.301%2065.3339L264.272%2065.3116L264.254%2065.2892L264.228%2065.2521L264.202%2065.2227L264.191%2065.2009L264.169%2065.1932L264.143%2065.149L264.121%2065.142L264.095%2065.1196L264.074%2065.0901L264.047%2065.0607L264.025%2065.0383L263.996%2065.0089L263.978%2064.9794L263.947%2064.95L269.108%2060.2562L269.134%2060.278L269.156%2060.3075L269.185%2060.338L269.234%2060.3969L269.255%2060.4187L269.281%2060.4405L269.303%2060.4929L269.33%2060.5147L269.348%2060.5289L269.392%2060.5518L269.41%2060.5889L269.44%2060.6107L269.462%2060.6325L269.484%2060.6696L269.51%2060.6914L269.554%2060.7503L269.58%2060.7798L269.602%2060.8103L269.635%2060.8539L269.65%2060.8757L269.679%2060.8986L269.702%2060.9281L269.735%2060.9423L269.749%2060.9717L269.783%2060.9946L269.812%2061.0241L269.831%2061.0535L269.861%2061.0753L269.879%2061.1124L269.9%2061.1495ZM264.689%2065.7615L269.9%2061.1495L270.015%2061.2891L270.129%2061.4222L270.225%2061.577L270.31%2061.7319L270.399%2061.8803L270.468%2062.0275L270.539%2062.1824L270.594%2062.3449L270.642%2062.5216L270.683%2062.6623L270.719%2062.8248L270.746%2063.0015L270.768%2063.1787L270.775%2063.3407V63.5108L270.768%2063.6733L270.752%2063.8282L270.709%2064.1674L270.664%2064.3299L270.623%2064.4924L270.568%2064.6544L270.502%2064.8022L270.435%2064.9647L270.362%2065.1196L270.274%2065.2521L270.181%2065.4004L270.082%2065.5477L269.974%2065.6808L269.861%2065.8204L269.735%2065.9458L269.602%2066.0712L269.465%2066.1825L269.326%2066.2861L269.178%2066.3821L269.03%2066.478L268.883%2066.5664L268.721%2066.6329L268.562%2066.706L268.403%2066.7507L268.245%2066.8172L268.082%2066.8609L267.916%2066.8838L267.75%2066.9056L267.585%2066.9198L267.422%2066.935H267.083L266.917%2066.9198L266.754%2066.8903L266.589%2066.8685L266.422%2066.8249L266.268%2066.7878L266.105%2066.7289L265.947%2066.6842L265.796%2066.5958L265.645%2066.5217L265.49%2066.441L265.345%2066.345L265.209%2066.249L265.073%2066.1312L264.944%2066.0123L264.811%2065.8869L264.689%2065.7615ZM270.623%2061.9533L265.353%2066.5217L265.341%2066.514H265.331L265.312%2066.478L265.272%2066.441L265.265%2066.4333L265.238%2066.3962L265.224%2066.3821L265.206%2066.3592L265.183%2066.3373L265.161%2066.3003L265.139%2066.2708H265.128L265.102%2066.249L265.073%2066.2043L265.054%2066.1825L265.032%2066.153H265.025L265.002%2066.1236L264.965%2066.0941L264.954%2066.0712L264.932%2066.0352L264.914%2066.02L264.896%2065.9981L264.873%2065.9752L264.851%2065.9458L264.829%2065.9316L264.807%2065.924L264.781%2065.8869L264.763%2065.8574L264.759%2065.8356L264.737%2065.8204L264.715%2065.7986L264.689%2065.7615L269.9%2061.1495L269.927%2061.1713L269.949%2061.2008L269.967%2061.2226L270.004%2061.2455L270.022%2061.2749L270.045%2061.2967L270.07%2061.3338L270.092%2061.3556L270.115%2061.3851L270.137%2061.408L270.155%2061.4374L270.174%2061.4734L270.196%2061.4811L270.237%2061.5105L270.24%2061.54L270.266%2061.5629L270.299%2061.5847L270.321%2061.6141L270.343%2061.6512L270.347%2061.6588L270.366%2061.6807L270.409%2061.7243L270.431%2061.7472L270.45%2061.769L270.468%2061.7908L270.491%2061.8203L270.517%2061.8573L270.535%2061.865L270.568%2061.9097L270.576%2061.9239L270.594%2061.9457L270.638%2061.9686L270.623%2061.9533ZM265.341%2066.514L270.638%2061.9686L270.746%2062.1311L270.848%2062.2707L270.944%2062.4114L271.036%2062.5663L271.118%2062.7212L271.187%2062.8761L271.247%2063.0462L271.302%2063.1858L271.35%2063.3483L271.391%2063.5256L271.428%2063.6881L271.45%2063.85L271.465%2064.0125L271.471%2064.1821V64.3523L271.465%2064.529L271.439%2064.6915L271.424%2064.854L271.383%2065.0165L271.346%2065.179L271.299%2065.3339L271.244%2065.4964L271.173%2065.6513L271.107%2065.8138L270.937%2066.1083L270.844%2066.249L270.742%2066.3821L270.627%2066.5217L270.517%2066.6471L270.38%2066.7878L270.251%2066.8903L270.115%2067.0016L269.967%2067.1194L269.827%2067.2154L269.669%2067.2895L269.52%2067.3702L269.362%2067.4368L269.203%2067.5109L269.042%2067.5775L268.883%2067.6211L268.713%2067.6582L268.551%2067.6876L268.385%2067.7094L268.219%2067.7247L268.049%2067.7323H267.88L267.718%2067.7247L267.555%2067.7094L267.385%2067.68L267.223%2067.6582L267.054%2067.6134L266.898%2067.548L266.736%2067.5033L266.581%2067.4368L266.426%2067.3626L266.279%2067.2895L266.135%2067.2012L265.987%2067.0976L265.851%2067.0016L265.711%2066.8903L265.582%2066.7725L265.456%2066.6471L265.341%2066.514ZM271.428%2062.9279L266.076%2067.3702L266.057%2067.3626L266.028%2067.3408L266.009%2067.3037L265.987%2067.2742L265.962%2067.2524L265.936%2067.2306L265.913%2067.2012L265.902%2067.1859L265.88%2067.1565L265.854%2067.1346L265.833%2067.0976L265.806%2067.0757L265.785%2067.0463L265.762%2067.0016L265.729%2066.9798L265.711%2066.9569L265.681%2066.9198L265.663%2066.8903L265.652%2066.8838L265.629%2066.8609L265.604%2066.8249L265.582%2066.7943L265.556%2066.7725L265.533%2066.7431L265.504%2066.7213L265.486%2066.6918L265.456%2066.6547L265.437%2066.6329L265.423%2066.6176L265.39%2066.5806L265.361%2066.5369L265.353%2066.5217L270.623%2061.9533L270.66%2062.0199L270.683%2062.0417L270.693%2062.0569L270.731%2062.094L270.752%2062.1311L270.782%2062.1529L270.801%2062.1824L270.834%2062.2042L270.848%2062.2271L270.878%2062.2707L270.901%2062.2931L270.926%2062.3154L270.944%2062.3449L270.989%2062.3891L271.007%2062.4114L271.036%2062.4485L271.059%2062.4703L271.085%2062.4998L271.107%2062.5439L271.129%2062.5663L271.155%2062.5881L271.181%2062.6252L271.199%2062.6546L271.232%2062.6765L271.265%2062.7212L271.291%2062.7506L271.313%2062.7801L271.332%2062.8019L271.361%2062.8248L271.379%2062.8542L271.409%2062.8908L271.428%2062.9279ZM266.076%2067.3702L271.428%2062.9279L271.542%2063.068L271.641%2063.2082L271.737%2063.363L271.822%2063.5256L271.907%2063.6733L271.973%2063.8206L272.036%2063.9831L272.08%2064.1527L272.132%2064.3076L272.169%2064.4701L272.202%2064.625L272.213%2064.8022L272.228%2064.9794L272.235%2065.142V65.3116L272.217%2065.4735L272.202%2065.636L272.172%2065.8138L272.136%2065.9752L272.099%2066.1312L272.043%2066.2861L271.988%2066.4551L271.918%2066.61L271.852%2066.7507L271.767%2066.9056L271.679%2067.0463L271.579%2067.2012L271.471%2067.3408L271.361%2067.4586L271.244%2067.5993L271.111%2067.7247L270.981%2067.8283L270.838%2067.9385L270.693%2068.0497L270.546%2068.1381L270.399%2068.2341L270.24%2068.3006L270.088%2068.3737L269.927%2068.4326L269.765%2068.4925L269.602%2068.5285L269.44%2068.5733L269.27%2068.6027L269.101%2068.618L268.938%2068.6321H268.603L268.44%2068.618L268.274%2068.6027L268.108%2068.5733L267.946%2068.5514L267.777%2068.4925L267.622%2068.4631L267.466%2068.3889L267.308%2068.3224L267.16%2068.2482L267.005%2068.1599L266.862%2068.0715L266.721%2067.9832L266.581%2067.8719L266.452%2067.7618L266.323%2067.6364L266.201%2067.5109L266.076%2067.3702ZM271.988%2063.5992L266.589%2067.9974L266.563%2067.9832L266.552%2067.9603L266.533%2067.9385L266.504%2067.8949L266.481%2067.8872V67.8719L266.463%2067.8643L266.434%2067.8207L266.415%2067.7912L266.404%2067.776L266.378%2067.7542L266.367%2067.7323L266.345%2067.7094L266.323%2067.6658L266.297%2067.6582L266.286%2067.6211H266.279L266.268%2067.6134L266.234%2067.5775L266.213%2067.548L266.201%2067.5251L266.179%2067.5109V67.5033L266.161%2067.488L266.135%2067.4368L266.117%2067.4291H266.109L266.098%2067.4149L266.076%2067.3702L271.428%2062.9279L271.45%2062.9349L271.465%2062.9502L271.494%2063.0091L271.508%2063.0233V63.0462L271.534%2063.0533L271.561%2063.0898L271.579%2063.1051L271.597%2063.1122L271.608%2063.1493H271.612L271.63%2063.1787L271.667%2063.2011L271.679%2063.2305L271.697%2063.2452L271.716%2063.2747L271.726%2063.2818L271.745%2063.3189L271.759%2063.3265L271.782%2063.3483L271.792%2063.363L271.808%2063.393L271.837%2063.4225L271.863%2063.4519L271.892%2063.4738L271.907%2063.5108L271.925%2063.5256L271.941%2063.5479L271.959%2063.555L271.973%2063.5921L271.988%2063.5992ZM266.589%2067.9974L271.988%2063.5992L272.099%2063.7617L272.202%2063.8948L272.295%2064.042L272.38%2064.1898L272.453%2064.3447L272.579%2064.6697L272.634%2064.8317L272.674%2064.9871L272.708%2065.149L272.74%2065.3263L272.76%2065.4888L272.763%2065.6513L272.77%2065.8204L272.763%2065.9981L272.752%2066.1672L272.733%2066.3373L272.704%2066.4922L272.66%2066.6547L272.623%2066.8172L272.568%2066.9798L272.501%2067.1346L272.442%2067.2742L272.364%2067.4291L272.28%2067.5916L272.184%2067.7323L272.088%2067.8719L271.988%2068.0126L271.87%2068.1381L271.745%2068.2777L271.62%2068.3889L271.483%2068.5067L271.339%2068.618L271.195%2068.7205L271.052%2068.8088L270.893%2068.8983L270.742%2068.9714L270.583%2069.0379L270.421%2069.1044L270.262%2069.1491L270.092%2069.1928L269.927%2069.2222L269.598%2069.2817H269.432L269.267%2069.2887L269.097%2069.2817L268.931%2069.2669L268.764%2069.2517L268.595%2069.2222L268.437%2069.1786L268.274%2069.1415L268.116%2069.0902L267.957%2069.0303L267.806%2068.9572L267.658%2068.8754L267.5%2068.7947L267.36%2068.691L267.223%2068.6027L267.083%2068.5067L266.95%2068.3889L266.821%2068.2777L266.696%2068.1381L266.589%2067.9974ZM272.829%2064.6697L267.341%2068.9419L267.315%2068.9201L267.293%2068.8754L267.267%2068.8536L267.242%2068.8394L267.216%2068.8088L267.193%2068.7652L267.168%2068.7434L267.16%2068.7205L267.131%2068.6692L267.097%2068.6474L267.083%2068.618L267.054%2068.6027L267.035%2068.558L267.005%2068.5285L266.98%2068.5067L266.961%2068.4696L266.932%2068.4326L266.928%2068.4184L266.88%2068.3889L266.858%2068.3518L266.85%2068.3148L266.821%2068.2853L266.795%2068.2777L266.773%2068.2341L266.744%2068.1893L266.721%2068.1817L266.714%2068.1599L266.685%2068.1228L266.666%2068.101L266.633%2068.0639L266.607%2068.0345L266.589%2067.9974L271.988%2063.5992L272.01%2063.6439L272.043%2063.6733L272.066%2063.6952L272.088%2063.7246L272.117%2063.7617L272.147%2063.8059L272.18%2063.85L272.206%2063.8653L272.228%2063.9018L272.257%2063.946L272.272%2063.9684L272.317%2063.9978L272.343%2064.042L272.353%2064.0567L272.394%2064.0938L272.424%2064.1456L272.442%2064.1674L272.468%2064.1898L272.49%2064.2192L272.516%2064.2634L272.545%2064.3076L272.579%2064.3299L272.589%2064.3523L272.615%2064.4036L272.656%2064.4259L272.685%2064.4554L272.704%2064.4848L272.733%2064.529L272.752%2064.5661L272.778%2064.5955L272.8%2064.625L272.829%2064.6697ZM267.341%2068.9419L272.829%2064.6697L272.932%2064.8022L273.032%2064.95L273.124%2065.1049L273.205%2065.2521L273.276%2065.4004L273.342%2065.5695L273.401%2065.7397L273.449%2065.9022L273.493%2066.0712L273.516%2066.2272L273.541%2066.3962L273.56%2066.5664L273.564%2066.7289V66.8903L273.56%2067.0681L273.537%2067.2306L273.516%2067.392L273.482%2067.548L273.441%2067.7247L273.39%2067.8872L273.335%2068.0345L273.276%2068.1893L273.205%2068.3518L273.124%2068.4925L273.04%2068.6474L272.944%2068.7794L272.844%2068.9354L272.74%2069.0532L272.623%2069.1928L272.497%2069.3182L272.364%2069.4294L272.228%2069.5549L272.08%2069.6509L271.941%2069.761L271.789%2069.8352L271.63%2069.9235L271.471%2069.9977L271.313%2070.0642L271.155%2070.1231L270.989%2070.1744L270.819%2070.1967L270.66%2070.2486L270.491%2070.2633L270.329%2070.2856H269.827L269.657%2070.2633L269.499%2070.2262L269.33%2070.1967L269.167%2070.1602L269.005%2070.1231L268.846%2070.0642L268.695%2069.9977L268.536%2069.9235L268.392%2069.8352L268.241%2069.761L268.104%2069.665L267.965%2069.5625L267.828%2069.4589L267.695%2069.3553L267.569%2069.2222L267.452%2069.0902L267.341%2068.9419ZM273.412%2065.4004L267.869%2069.6509V69.6285L267.839%2069.6138L267.82%2069.5767L267.798%2069.5549L267.787%2069.5331L267.75%2069.496V69.4883L267.732%2069.4589L267.706%2069.4294L267.684%2069.3924L267.662%2069.3771V69.3629L267.64%2069.3553L267.606%2069.2887H267.596L267.569%2069.2517L267.559%2069.2222H267.536L267.518%2069.1928L267.5%2069.1491L267.485%2069.1415V69.1262L267.466%2069.1044L267.444%2069.0902L267.43%2069.0532L267.4%2069.0379L267.393%2069.0161L267.374%2069.0084L267.36%2068.9714L267.341%2068.9419L272.829%2064.6697L272.844%2064.6768L272.866%2064.6915L272.881%2064.7357L272.911%2064.7433L272.914%2064.7798L272.932%2064.8022L272.951%2064.8169L272.969%2064.8464L273.003%2064.8758L273.032%2064.9205L273.054%2064.9424L273.069%2064.9647L273.087%2064.9871H273.102L273.124%2065.0383L273.15%2065.0831H273.157L273.176%2065.1049L273.205%2065.142L273.22%2065.149L273.228%2065.179L273.243%2065.2009L273.276%2065.2227L273.287%2065.2521L273.324%2065.2968L273.342%2065.3263L273.357%2065.3339L273.39%2065.3775L273.412%2065.4004ZM267.869%2069.6285L273.412%2065.4223L273.516%2065.5695L273.608%2065.7244L273.704%2065.8798L273.777%2066.02L273.851%2066.1825L273.914%2066.345L273.973%2066.514L274.009%2066.6842L274.05%2066.8391L274.08%2067.0016L274.102%2067.1641L274.113%2067.3408L274.12%2067.5033L274.113%2067.6658L274.109%2067.8283L274.087%2067.9974L274.065%2068.1599L274.028%2068.3224L273.984%2068.4925L273.94%2068.6474L273.869%2068.8088L273.814%2068.9572L273.733%2069.1121L273.663%2069.2669L273.574%2069.4L273.471%2069.5549L273.372%2069.6945L273.264%2069.8134L273.143%2069.953L273.017%2070.0642L272.881%2070.1897L272.744%2070.2927L272.601%2070.4111L272.446%2070.507L272.298%2070.5878L272.143%2070.6766L271.988%2070.7426L271.826%2070.7944L271.667%2070.8462L271.498%2070.9051L271.332%2070.9346L271.166%2070.9717L271.003%2070.9793L270.838%2071.0011H270.498L270.333%2070.9793L270.17%2070.9717L270.004%2070.9499L269.838%2070.9128L269.679%2070.8833L269.52%2070.8168L269.362%2070.7721L269.203%2070.6985L269.052%2070.6325L268.905%2070.5436L268.764%2070.4476L268.621%2070.3663L268.484%2070.2633L268.355%2070.1526L268.23%2070.0195L268.104%2069.9017L267.986%2069.7687L267.869%2069.6285ZM274.216%2066.478L268.592%2070.6101L268.574%2070.5659L268.543%2070.5436L268.525%2070.5212L268.496%2070.47L268.47%2070.4476L268.455%2070.4252L268.44%2070.4034L268.421%2070.3663L268.392%2070.3369L268.37%2070.2927L268.345%2070.2704L268.322%2070.2486L268.304%2070.1967L268.274%2070.1744L268.252%2070.1602L268.23%2070.1308L268.219%2070.086L268.194%2070.0642L268.156%2070.0348L268.141%2069.9977L268.127%2069.9682L268.094%2069.9388L268.071%2069.9017L268.049%2069.8864L268.023%2069.857L268.002%2069.8134L267.979%2069.7905L267.957%2069.761L267.946%2069.7392L267.916%2069.7021L267.894%2069.665L267.869%2069.6509L273.412%2065.4004L273.441%2065.4664L273.46%2065.4735L273.493%2065.4964L273.523%2065.5624L273.548%2065.5848L273.574%2065.6142L273.596%2065.6513L273.622%2065.6808L273.641%2065.7244L273.667%2065.7473L273.689%2065.7986L273.715%2065.8204L273.752%2065.8433L273.766%2065.8869L273.781%2065.924L273.825%2065.9458L273.848%2065.9905L273.869%2066.02L273.895%2066.0647L273.917%2066.0941L273.943%2066.1236L273.962%2066.153L273.991%2066.1825L274.009%2066.2196L274.039%2066.249L274.076%2066.2861L274.102%2066.3373L274.12%2066.3592L274.143%2066.3821L274.169%2066.4333L274.194%2066.4551L274.216%2066.478ZM268.592%2070.6101L274.216%2066.478L274.408%2066.7878L274.492%2066.935L274.578%2067.0976L274.641%2067.2524L274.703%2067.4149L274.751%2067.5916L274.796%2067.7542L274.832%2067.9167L274.862%2068.0715L274.876%2068.2482L274.884%2068.4107V68.7434L274.872%2068.9201L274.854%2069.0902L274.817%2069.2375L274.784%2069.4L274.736%2069.5625L274.684%2069.7392L274.622%2069.8864L274.555%2070.0348L274.478%2070.1897L274.397%2070.3369L274.304%2070.47L274.205%2070.6101L274.102%2070.7579L273.991%2070.8904L273.866%2071.0235L273.74%2071.1413L273.604%2071.2449L273.467%2071.3556L273.316%2071.4734L273.161%2071.5547L273.014%2071.6583L272.852%2071.7243L272.697%2071.7908L272.534%2071.8573L272.372%2071.8944L272.206%2071.9386L272.043%2071.9757L271.874%2072.0122L271.716%2072.0269L271.542%2072.0346H271.21L271.036%2072.0269L270.871%2071.9975L270.709%2071.9604L270.546%2071.9309L270.38%2071.8797L270.225%2071.8279L270.067%2071.7761L269.912%2071.7024L269.765%2071.6135L269.613%2071.5399L269.473%2071.4516L269.33%2071.3556L269.2%2071.2449L269.067%2071.1413L268.938%2071.0235L268.817%2070.8904L268.702%2070.7579L268.592%2070.6101ZM274.718%2067.2012L269.042%2071.2302L269.03%2071.2225L269.019%2071.2007L268.997%2071.1636L268.986%2071.156L268.971%2071.1413L268.956%2071.1118L268.942%2071.0824L268.927%2071.06L268.893%2071.0306L268.883%2071.0011L268.868%2070.9793V70.9717L268.854%2070.9569L268.817%2070.9128L268.805%2070.8904L268.791%2070.8833L268.776%2070.861L268.758%2070.8462L268.746%2070.8168L268.728%2070.7944L268.713%2070.7721V70.7797L268.695%2070.7579L268.668%2070.7208V70.7061L268.65%2070.6985L268.629%2070.6543H268.621L268.603%2070.6325L268.592%2070.6101L274.216%2066.478L274.235%2066.514L274.246%2066.5217L274.271%2066.5664L274.293%2066.5958L274.32%2066.6176V66.6329L274.338%2066.6471L274.36%2066.706L274.375%2066.7289H274.397L274.408%2066.7507L274.427%2066.7725L274.437%2066.8172L274.452%2066.8249L274.474%2066.8609L274.5%2066.8838V66.8903L274.515%2066.9056L274.541%2066.9569L274.563%2066.9645L274.578%2066.9939L274.592%2067.0158L274.615%2067.0463L274.637%2067.0757L274.648%2067.0899L274.666%2067.1194L274.681%2067.1346L274.692%2067.1565L274.707%2067.1641L274.718%2067.2012ZM269.042%2071.2302L274.718%2067.2012L274.821%2067.3484L274.913%2067.5033L274.998%2067.6582L275.068%2067.7989L275.138%2067.9679L275.193%2068.1381L275.241%2068.3006L275.286%2068.4696L275.319%2068.6321L275.344%2068.7947L275.364%2068.9572L275.367%2069.1262V69.2887L275.364%2069.4589L275.344%2069.6285L275.319%2069.7905L275.286%2069.953L275.252%2070.1231L275.201%2070.2856L275.149%2070.4329L275.087%2070.603L275.009%2070.7579L274.932%2070.9051L274.854%2071.0453L274.751%2071.2007L274.659%2071.3332L274.548%2071.4516L274.43%2071.5917L274.312%2071.7243L274.179%2071.8279L274.043%2071.9533L273.903%2072.064L273.759%2072.16L273.604%2072.2336L273.449%2072.3225L273.287%2072.4108L273.132%2072.4774L272.969%2072.5363L272.807%2072.5734L272.637%2072.6175L272.479%2072.6541L272.309%2072.6835L272.136%2072.6911H271.634L271.471%2072.6835L271.302%2072.6541L271.14%2072.6246L270.981%2072.581L270.811%2072.5363L270.66%2072.4774L270.502%2072.4185L270.347%2072.3519L270.203%2072.2778L270.052%2072.1894L269.912%2072.0935L269.775%2071.9975L269.639%2071.8797L269.51%2071.7761L269.385%2071.6583L269.267%2071.5105L269.156%2071.3627L269.042%2071.2302ZM275.552%2068.3889L269.79%2072.3072L269.771%2072.2854L269.739%2072.2336L269.724%2072.2112L269.694%2072.1676L269.69%2072.1453L269.657%2072.1153L269.639%2072.0716L269.61%2072.0493L269.591%2072.0122L269.565%2071.9604L269.543%2071.9386L269.514%2071.8944L269.484%2071.8644L269.465%2071.8426L269.44%2071.8202L269.432%2071.7761L269.403%2071.7466L269.377%2071.7024L269.355%2071.6654L269.33%2071.6359L269.307%2071.6065L269.281%2071.577L269.259%2071.5399L269.234%2071.5105L269.203%2071.4734L269.185%2071.4292L269.156%2071.4069L269.13%2071.3556L269.122%2071.3409L269.097%2071.3038L269.075%2071.2743L269.042%2071.2302L274.718%2067.2012L274.747%2067.2306L274.776%2067.2666L274.796%2067.2895L274.839%2067.3484L274.862%2067.392L274.884%2067.4149L274.913%2067.4586L274.932%2067.488L274.965%2067.5251L274.98%2067.548L275.009%2067.5993L275.039%2067.6364L275.057%2067.68L275.087%2067.7247L275.105%2067.7542L275.135%2067.7912L275.175%2067.8207L275.193%2067.8643L275.227%2067.8949L275.241%2067.9385L275.275%2067.9679L275.293%2068.0126L275.319%2068.0497L275.344%2068.0715L275.367%2068.1228L275.401%2068.1457L275.415%2068.1893L275.456%2068.2482L275.481%2068.2777L275.503%2068.3148L275.529%2068.3442L275.552%2068.3889ZM269.79%2072.3072L275.552%2068.3889L275.655%2068.5285L275.744%2068.6834L275.813%2068.8394L275.891%2069.0084L275.95%2069.171L276.008%2069.3182L276.053%2069.4883L276.09%2069.6509L276.12%2069.8134L276.141%2069.9977L276.153%2070.1602L276.163%2070.3293L276.153%2070.4994L276.145%2070.6543L276.127%2070.8315L276.101%2070.9793L276.065%2071.156L276.02%2071.3185L275.971%2071.481L275.913%2071.6359L275.846%2071.7908L275.773%2071.9386L275.691%2072.0935L275.603%2072.2336L275.503%2072.3738L275.404%2072.5068L275.293%2072.647L275.175%2072.7795L275.05%2072.9049L274.921%2073.0085L274.784%2073.1198L274.641%2073.2376L274.485%2073.3336L274.338%2073.4219L274.176%2073.4884L274.02%2073.5626L273.851%2073.628L273.696%2073.6946L273.53%2073.7317L273.368%2073.7687L273.195%2073.8058L273.024%2073.8135L272.866%2073.8276L272.693%2073.8353L272.523%2073.8276H272.36L272.191%2073.8058L272.033%2073.7687L271.863%2073.7393L271.697%2073.7022L271.542%2073.6433L271.379%2073.5986L271.232%2073.5321L271.073%2073.459L270.926%2073.3706L270.782%2073.2812L270.642%2073.1787L270.502%2073.0827L270.372%2072.9714L270.24%2072.846L270.129%2072.7282L270.012%2072.5952L269.9%2072.4621L269.79%2072.3072ZM275.928%2068.9354L270.115%2072.8024H270.1L270.092%2072.7577L270.082%2072.75L270.067%2072.7359L270.055%2072.7282L270.045%2072.7135L270.037%2072.6835L270.033%2072.6693L270.004%2072.647L269.996%2072.6246H270.012L269.978%2072.5952L269.963%2072.5734L269.956%2072.5581V72.551L269.927%2072.5363L269.919%2072.4992V72.485L269.9%2072.4774L269.886%2072.4621L269.897%2072.4479L269.879%2072.4327L269.853%2072.4108L269.861%2072.3961L269.841%2072.3738L269.838%2072.3667L269.827%2072.3519L269.802%2072.3225V72.3072H269.79L275.552%2068.3889L275.559%2068.4107L275.589%2068.4184L275.581%2068.4326L275.595%2068.4696L275.618%2068.4925L275.64%2068.5067L275.636%2068.522L275.655%2068.5285L275.673%2068.5514L275.685%2068.5733V68.5951L275.706%2068.6027L275.721%2068.618L275.714%2068.6321L275.744%2068.6616L275.754%2068.6692L275.773%2068.691L275.765%2068.7205L275.81%2068.7434L275.813%2068.7652L275.832%2068.7794L275.85%2068.8088L275.865%2068.8241L275.869%2068.8394L275.883%2068.8536L275.891%2068.8754L275.906%2068.8983L275.92%2068.9048L275.928%2068.9354ZM270.115%2072.8024L275.928%2068.9354L276.02%2069.0902L276.108%2069.2375L276.19%2069.4L276.255%2069.5625L276.318%2069.7245L276.37%2069.8864L276.407%2070.0566L276.451%2070.2191L276.477%2070.4034L276.488%2070.5583L276.506%2070.7208V70.8904L276.5%2071.06L276.484%2071.2225L276.463%2071.3921L276.437%2071.5547L276.404%2071.7243L276.351%2071.8797L276.3%2072.0493L276.245%2072.2042L276.175%2072.3519L276.101%2072.4992L276.016%2072.6541L275.928%2072.8024L275.832%2072.9344L275.721%2073.0751L275.611%2073.1929L275.493%2073.3336L275.364%2073.4437L275.231%2073.5626L275.094%2073.6728L274.939%2073.7687L274.788%2073.8724L274.641%2073.9531L274.478%2074.0349L274.32%2074.1003L274.157%2074.1527L273.991%2074.2192L273.825%2074.2486L273.663%2074.2999L273.497%2074.3217L273.324%2074.337L273.157%2074.3512H272.822L272.656%2074.337L272.49%2074.3152L272.324%2074.2781L272.162%2074.241L272%2074.1963L271.837%2074.145L271.682%2074.0861L271.534%2074.012L271.379%2073.9389L271.236%2073.8571L271.095%2073.7687L270.956%2073.6728L270.811%2073.5626L270.683%2073.459L270.56%2073.3336L270.435%2073.2081L270.329%2073.0827L270.218%2072.9344L270.115%2072.8024ZM276.772%2070.2486L270.871%2073.9683L270.848%2073.9236L270.819%2073.8789L270.801%2073.8571L270.789%2073.8135L270.768%2073.784L270.742%2073.7393L270.713%2073.7022L270.693%2073.6728L270.664%2073.628L270.642%2073.5986L270.617%2073.5626L270.59%2073.5321L270.568%2073.4808L270.554%2073.459L270.527%2073.4219L270.491%2073.3706L270.48%2073.3477L270.45%2073.3041L270.431%2073.2594L270.402%2073.2376L270.399%2073.2081L270.366%2073.171L270.343%2073.1198L270.31%2073.0827L270.296%2073.038L270.266%2073.0085L270.237%2072.9714L270.218%2072.942L270.188%2072.9049L270.163%2072.8613L270.147%2072.8318L270.115%2072.8024L275.928%2068.9354L275.939%2068.9572L275.975%2069.0161L276.005%2069.0532L276.031%2069.0902L276.061%2069.1415L276.075%2069.1786L276.108%2069.2222L276.13%2069.2669L276.153%2069.2887L276.179%2069.3258L276.208%2069.3771L276.245%2069.4218L276.271%2069.4731L276.3%2069.5178L276.318%2069.5396L276.359%2069.592L276.374%2069.6285L276.392%2069.665L276.437%2069.7021L276.455%2069.7468L276.484%2069.7905L276.51%2069.8276L276.529%2069.8799L276.562%2069.9159L276.588%2069.953L276.61%2069.9977L276.635%2070.0348L276.654%2070.0784L276.698%2070.1231L276.725%2070.1744L276.747%2070.1967L276.772%2070.2486ZM270.871%2073.9683L276.772%2070.2486L276.864%2070.4034L276.946%2070.5583L277.019%2070.7061L277.082%2070.8833L277.144%2071.0453L277.193%2071.2078L277.226%2071.3627L277.262%2071.5399L277.281%2071.7024L277.299%2071.8644L277.307%2072.0493V72.2112L277.299%2072.3738L277.274%2072.551L277.256%2072.7135L277.219%2072.8684L277.182%2073.038L277.134%2073.1929L277.078%2073.3554L277.009%2073.5103L276.942%2073.6651L276.864%2073.8135L276.772%2073.9531L276.684%2074.1003L276.576%2074.241L276.47%2074.3588L276.359%2074.4995L276.237%2074.6097L276.108%2074.7351L275.971%2074.8463L275.832%2074.9565L275.677%2075.0525L275.529%2075.1485L275.367%2075.2303L275.209%2075.2957L275.046%2075.3699L274.718%2075.4735L274.555%2075.5029L274.386%2075.5477L274.216%2075.5695L274.043%2075.5771L273.884%2075.5913H273.715L273.541%2075.5771L273.379%2075.5695L273.209%2075.54L273.051%2075.4953L272.888%2075.4735L272.733%2075.407L272.571%2075.3622L272.261%2075.2226L272.117%2075.1343L271.973%2075.0525L271.826%2074.9565L271.69%2074.8605L271.561%2074.7504L271.428%2074.6326L271.302%2074.5137L271.187%2074.3883L271.073%2074.2486L270.974%2074.1003L270.871%2073.9683ZM277.127%2070.8092L271.199%2074.4701L271.173%2074.4624L271.166%2074.4472V74.4177L271.14%2074.3883H271.129L271.125%2074.3588L271.099%2074.337L271.095%2074.3217L271.085%2074.2999L271.07%2074.2781L271.062%2074.2486L271.052%2074.241L271.04%2074.2257L271.029%2074.2192L271.026%2074.1963L271.007%2074.1821L271.003%2074.1745L270.989%2074.145L270.974%2074.1309H270.981L270.97%2074.108L270.944%2074.0785L270.934%2074.0643L270.937%2074.0785L270.926%2074.0643L270.903%2074.0043L270.901%2073.9902L270.882%2073.9749L270.871%2073.9683L276.772%2070.2486L276.78%2070.2633L276.794%2070.2856L276.805%2070.2927L276.827%2070.3293L276.821%2070.3151L276.835%2070.3369L276.857%2070.3816L276.872%2070.4034L276.876%2070.4111L276.905%2070.4476L276.909%2070.4623L276.927%2070.47L276.931%2070.4994L276.946%2070.507L276.953%2070.5365L276.964%2070.5436L276.972%2070.5659L276.99%2070.5878L276.997%2070.603L277.009%2070.6101L277.011%2070.6325L277.041%2070.6543L277.049%2070.6766V70.6837L277.064%2070.6985L277.082%2070.7208L277.089%2070.7579V70.7721L277.119%2070.7797L277.127%2070.7944V70.8092ZM271.199%2074.4701L277.127%2070.8092L277.215%2070.9717L277.299%2071.1342L277.366%2071.2967L277.432%2071.4369L277.481%2071.6065L277.532%2071.7761L277.573%2071.9386L277.602%2072.1011L277.62%2072.2854L277.636%2072.4479L277.638%2072.6175V72.7795L277.628%2072.942L277.606%2073.1045L277.58%2073.2888L277.544%2073.4437L277.503%2073.6062L277.454%2073.7687L277.399%2073.9236L277.329%2074.0785L277.262%2074.2257L277.182%2074.3741L277.089%2074.5137L277.001%2074.6686L276.898%2074.8016L276.784%2074.9347L276.672%2075.0525L276.547%2075.1703L276.422%2075.2957L276.282%2075.407L276.141%2075.5029L275.987%2075.6065L275.836%2075.7025L275.677%2075.7756L275.518%2075.8498L275.356%2075.9163L275.19%2075.9752L275.024%2076.0199L274.862%2076.0494L274.692%2076.093L274.522%2076.1148L274.356%2076.1225H274.02L273.851%2076.1148L273.689%2076.1006L273.523%2076.0712L273.357%2076.0265L273.198%2075.9894L273.04%2075.9305L272.881%2075.8792L272.722%2075.8203L272.571%2075.7462L272.431%2075.6578L272.28%2075.5771L272.143%2075.4811L272.007%2075.3851L271.874%2075.2739L271.745%2075.1561L271.63%2075.0383L271.508%2074.8976L271.299%2074.6249L271.199%2074.4701ZM277.897%2072.1011L271.892%2075.6131L271.87%2075.5771L271.837%2075.5477L271.822%2075.5029L271.804%2075.4735L271.771%2075.4288L271.749%2075.407L271.734%2075.3699L271.716%2075.3328L271.682%2075.2892L271.679%2075.2739L271.657%2075.2303L271.62%2075.1703L271.608%2075.1485L271.59%2075.1343L271.564%2075.0819L271.542%2075.0383L271.516%2075.0154L271.498%2074.9718L271.471%2074.9489L271.45%2074.8976L271.439%2074.8605L271.416%2074.8387L271.391%2074.7874L271.369%2074.7504L271.346%2074.7209L271.324%2074.6838L271.299%2074.6544L271.281%2074.6097L271.254%2074.5878L271.244%2074.5366L271.221%2074.5137L271.199%2074.4701L277.127%2070.8092L277.144%2070.8462L277.166%2070.8904L277.207%2070.9346L277.226%2070.9717L277.256%2071.0235L277.274%2071.06L277.299%2071.0895L277.322%2071.1413L277.344%2071.1784L277.366%2071.2225L277.391%2071.2667L277.432%2071.2967L277.448%2071.3332L277.477%2071.3627L277.499%2071.4145L277.517%2071.4516L277.544%2071.4958L277.569%2071.5252L277.583%2071.577L277.62%2071.6359L277.636%2071.6583L277.654%2071.6877L277.691%2071.7466L277.716%2071.7761L277.738%2071.8202L277.757%2071.8573L277.779%2071.8944L277.808%2071.9386L277.83%2071.9757L277.846%2072.0269L277.867%2072.064L277.897%2072.1011ZM271.892%2075.6131L277.897%2072.1011L277.979%2072.2636L278.063%2072.4185L278.13%2072.5734L278.185%2072.7359L278.24%2072.9049L278.281%2073.0751L278.318%2073.2376L278.343%2073.3925L278.358%2073.5768L278.369%2073.7393V73.9018L278.365%2074.0785L278.347%2074.241L278.332%2074.4177L278.296%2074.5726L278.263%2074.7351L278.21%2074.8976L278.155%2075.0525L278.096%2075.2226L278.026%2075.3699L277.949%2075.5171L277.867%2075.6578L277.779%2075.7909L277.683%2075.9305L277.58%2076.0712L277.462%2076.2108L277.344%2076.3439L277.219%2076.4398L277.089%2076.5511L276.953%2076.6612L276.805%2076.7725L276.647%2076.8685L276.5%2076.9568L276.333%2077.0234L276.175%2077.0964L276.008%2077.163L275.846%2077.2077L275.677%2077.2589L275.344%2077.3037L275.175%2077.3255L275.009%2077.3407H274.67L274.512%2077.3255L274.341%2077.296L274.176%2077.2742L274.009%2077.2371L273.851%2077.1853L273.696%2077.1411L273.537%2077.067L273.383%2077.0004L273.232%2076.9274L273.087%2076.8456L272.951%2076.7496L272.807%2076.6471L272.674%2076.5435L272.545%2076.4322L272.424%2076.3144L272.305%2076.2043L272.191%2076.0494L272.08%2075.9163L271.981%2075.768L271.892%2075.6131ZM278.222%2072.6541L272.162%2076.1006V76.1148L272.169%2076.1006L272.162%2076.093L272.143%2076.0712L272.136%2076.0417L272.132%2076.0265L272.117%2076.0199L272.114%2076.0047L272.103%2075.9894L272.088%2075.9599L272.08%2075.9534L272.069%2075.9305H272.066L272.055%2075.9087L272.043%2075.8792H272.036L272.033%2075.8498L272.01%2075.8421H272.007L271.996%2075.828L271.988%2075.7909L271.981%2075.768L271.963%2075.7538H271.959L271.951%2075.7462L271.941%2075.7091L271.933%2075.7025L271.925%2075.6796L271.911%2075.6731L271.918%2075.6796L271.907%2075.6731L271.881%2075.6131H271.892L277.897%2072.1011L277.916%2072.1305L277.912%2072.1153L277.922%2072.1305L277.945%2072.1676L277.959%2072.1894L277.967%2072.2112L277.971%2072.2265L277.982%2072.2336L277.989%2072.2636L278.004%2072.2854L278.016%2072.3072H278.018L278.034%2072.3225L278.037%2072.3367L278.048%2072.3667L278.063%2072.3738L278.071%2072.3961L278.074%2072.4185L278.089%2072.4327H278.096L278.104%2072.4621L278.114%2072.485L278.118%2072.4992L278.13%2072.5068L278.144%2072.5363L278.151%2072.551L278.163%2072.5581L278.17%2072.581L278.177%2072.5952L278.192%2072.6175L278.2%2072.6246L278.222%2072.647V72.6541ZM272.162%2076.1148L278.222%2072.647L278.31%2072.8089L278.384%2072.9573L278.451%2073.1198L278.509%2073.2888L278.553%2073.459L278.598%2073.6215L278.635%2073.8058L278.66%2073.9683L278.676%2074.1309L278.678%2074.2999V74.4701L278.676%2074.6326L278.653%2074.8016L278.635%2074.9718L278.598%2075.1343L278.553%2075.2957L278.509%2075.4582L278.454%2075.6131L278.392%2075.768L278.325%2075.9163L278.243%2076.0712L278.155%2076.2261L278.071%2076.3657L277.967%2076.4987L277.86%2076.6242L277.753%2076.7572L277.628%2076.8903L277.503%2077.0004L277.366%2077.1041L277.226%2077.2077L277.078%2077.3037L276.927%2077.4138L276.768%2077.4956L276.61%2077.5763L276.441%2077.6429L276.278%2077.6947L276.112%2077.7607L275.946%2077.7907L275.773%2077.8201L275.611%2077.8566L275.437%2077.8643L275.275%2077.879L275.101%2077.8643H274.932L274.773%2077.8566L274.604%2077.8201L274.437%2077.7907L274.271%2077.7607L274.113%2077.6947L273.954%2077.6429L273.799%2077.584L273.644%2077.5098L273.504%2077.4367L273.349%2077.3549L273.209%2077.2589L273.073%2077.163L272.944%2077.0528L272.811%2076.9345L272.693%2076.8161L272.571%2076.6907L272.464%2076.5511L272.353%2076.4104L272.257%2076.2708L272.162%2076.1148ZM278.989%2074.0349L272.844%2077.3407L272.829%2077.296L272.8%2077.2589L272.778%2077.2077L272.76%2077.1706L272.752%2077.1488L272.722%2077.1041L272.704%2077.067L272.685%2077.0234L272.66%2076.9863L272.637%2076.9345L272.615%2076.8979L272.589%2076.875L272.571%2076.8456L272.545%2076.7943L272.523%2076.7572L272.516%2076.706L272.497%2076.6907L272.468%2076.6471L272.446%2076.6176L272.431%2076.5729L272.398%2076.5435L272.38%2076.4987L272.36%2076.4617L272.331%2076.4104L272.309%2076.3733L272.295%2076.3439L272.272%2076.3002L272.257%2076.2708L272.228%2076.2261L272.184%2076.1377L272.162%2076.1006L278.222%2072.6541L278.243%2072.6911L278.269%2072.7359L278.288%2072.7795L278.318%2072.8242L278.336%2072.8613L278.369%2072.9202L278.402%2072.9573L278.417%2073.0009L278.443%2073.038L278.469%2073.0827L278.488%2073.1198L278.509%2073.171L278.539%2073.2152L278.553%2073.2594L278.58%2073.3041L278.605%2073.3554L278.642%2073.3925L278.66%2073.4437L278.686%2073.4808L278.712%2073.5321L278.731%2073.5768L278.745%2073.6215L278.778%2073.6651L278.801%2073.7022L278.815%2073.7393L278.841%2073.784L278.867%2073.8135L278.904%2073.8724L278.919%2073.9236L278.941%2073.9531L278.962%2073.9902L278.989%2074.0349ZM272.844%2077.3407L278.989%2074.0349L279.066%2074.1963L279.144%2074.3588L279.207%2074.529L279.258%2074.698L279.306%2074.8605L279.343%2075.023L279.372%2075.2008L279.387%2075.3699L279.406%2075.54V75.864L279.387%2076.0417L279.372%2076.2108L279.339%2076.3733L279.303%2076.5282L279.258%2076.6907L279.207%2076.8685L279.144%2077.0081L279.081%2077.163L279.003%2077.3037L278.919%2077.4585L278.834%2077.6058L278.735%2077.7388L278.635%2077.879L278.52%2078.0044L278.406%2078.1446L278.281%2078.2482L278.155%2078.3813L278.018%2078.4696L277.879%2078.5803L277.72%2078.6763L277.573%2078.7646L277.407%2078.8388L277.252%2078.9124L277.082%2078.9713L276.916%2079.0379L276.75%2079.0744L276.576%2079.1115L276.418%2079.1486L276.245%2079.1562L276.075%2079.178L275.906%2079.1856L275.744%2079.178L275.57%2079.1562L275.404%2079.1486L275.238%2079.1115L275.083%2079.0744L274.913%2079.0379L274.751%2078.9713L274.6%2078.9271L274.445%2078.8535L274.293%2078.7723L274.15%2078.691L274.006%2078.6021L273.866%2078.5138L273.729%2078.4178L273.596%2078.3071L273.471%2078.174L273.357%2078.0562L273.243%2077.9384L273.139%2077.7907L273.032%2077.6429L272.936%2077.5098L272.844%2077.3407ZM279.217%2074.4701L273.051%2077.7241L273.04%2077.6947L273.032%2077.6876L273.024%2077.6723L273.006%2077.6281L273.003%2077.6058L273.006%2077.621H273.003L272.992%2077.6058L272.969%2077.5545L272.966%2077.5469L272.969%2077.5763L272.966%2077.5545L272.958%2077.5322L272.951%2077.5174L272.944%2077.5098L272.936%2077.4956H272.932L272.925%2077.4804L272.914%2077.4433H272.911L272.9%2077.4367H272.896L272.888%2077.4215L272.881%2077.3996L272.877%2077.3773H272.87L272.866%2077.3702L272.852%2077.3407H272.844L278.989%2074.0349L278.996%2074.0643H279.003L279.007%2074.0785L279.022%2074.1003L279.026%2074.108H279.033L279.04%2074.1309L279.044%2074.1527L279.052%2074.1745L279.055%2074.1821L279.078%2074.1963V74.2192L279.081%2074.2257L279.088%2074.241L279.092%2074.2486H279.099L279.111%2074.2628L279.129%2074.3217L279.133%2074.337L279.144%2074.3512L279.166%2074.3883H279.17L279.188%2074.433L279.199%2074.4472L279.207%2074.4624L279.214%2074.4701H279.217ZM273.051%2077.7241L279.217%2074.4701L279.303%2074.6326L279.372%2074.7874L279.432%2074.9565L279.487%2075.1266L279.531%2075.2957L279.564%2075.4735L279.594%2075.636L279.612%2075.7909L279.616%2075.9752V76.3002L279.601%2076.4769L279.575%2076.6394L279.546%2076.8019L279.509%2076.971L279.468%2077.1411L279.409%2077.2813L279.35%2077.4433L279.28%2077.6058L279.207%2077.7607L279.122%2077.8937L279.033%2078.0415L278.937%2078.174L278.834%2078.3071L278.723%2078.4402L278.605%2078.5656L278.48%2078.6763L278.347%2078.787L278.21%2078.9048L278.071%2079.0155L277.916%2079.0897L277.757%2079.1856L277.602%2079.274L277.27%2079.3918L277.101%2079.4512L276.942%2079.4878L276.768%2079.5325L276.599%2079.5619L276.429%2079.569L276.263%2079.5837H276.09L275.928%2079.569L275.754%2079.5619L275.589%2079.5467L275.422%2079.5172L275.264%2079.4736L275.101%2079.4365L274.939%2079.3847L274.788%2079.3111L274.641%2079.2369L274.485%2079.178L274.338%2079.0897L274.201%2079.0008L274.065%2078.9048L273.917%2078.8017L273.799%2078.691L273.548%2078.4402L273.441%2078.3071L273.331%2078.1669L273.232%2078.0344L273.139%2077.879L273.051%2077.7241ZM280.003%2076.0265L273.752%2079.0897L273.715%2079.0449L273.696%2079.0155L273.689%2078.9642L273.663%2078.9271L273.641%2078.883L273.622%2078.8312L273.593%2078.8017L273.574%2078.7646L273.548%2078.6981L273.537%2078.6687L273.516%2078.6245L273.497%2078.5656L273.467%2078.5361L273.449%2078.4991L273.423%2078.4402L273.401%2078.4031L273.379%2078.3589L273.372%2078.3147L273.342%2078.2776L273.324%2078.2406L273.294%2078.1964L273.276%2078.1522L273.253%2078.1151L273.228%2078.0562L273.205%2078.0121L273.195%2077.9897L273.176%2077.9384L273.143%2077.8937L273.124%2077.8566L273.095%2077.7907L273.073%2077.7607L273.051%2077.7241L279.217%2074.4701L279.247%2074.529L279.269%2074.5878L279.295%2074.6249L279.313%2074.6686L279.339%2074.7209L279.362%2074.7645L279.399%2074.8169L279.424%2074.8605L279.442%2074.9052L279.475%2074.9565L279.495%2074.9936L279.512%2075.0677L279.542%2075.1114L279.564%2075.1485L279.605%2075.2226L279.623%2075.2597L279.646%2075.2957L279.671%2075.3622L279.693%2075.3993L279.719%2075.4582L279.741%2075.5029L279.759%2075.5477L279.797%2075.5913L279.822%2075.6425L279.844%2075.6796L279.867%2075.7462L279.889%2075.7909L279.915%2075.8421L279.933%2075.8792L279.978%2075.9534L279.999%2075.9894L280.003%2076.0265ZM273.752%2079.0897L280.003%2076.0265L280.081%2076.2043L280.147%2076.3657L280.202%2076.5282L280.251%2076.6907L280.287%2076.875L280.32%2077.0304L280.357%2077.3702L280.365%2077.5469L280.357%2077.7094L280.35%2077.879L280.324%2078.0415L280.298%2078.2111L280.265%2078.3813L280.224%2078.5361L280.173%2078.691L280.114%2078.8535L280.047%2079.0155L279.978%2079.1562L279.889%2079.2958L279.804%2079.4512L279.716%2079.5837L279.612%2079.7244L279.509%2079.8422L279.387%2079.9753L279.269%2080.0931L279.144%2080.2038L279.003%2080.3145L278.867%2080.4323L278.723%2080.5283L278.561%2080.6101L278.406%2080.6908L278.243%2080.7791L278.081%2080.8239L277.916%2080.898L277.746%2080.934L277.58%2080.9787L277.407%2081.0005L277.24%2081.0376L277.071%2081.0529H276.735L276.566%2081.0376L276.404%2081.0005L276.071%2080.9569L275.913%2080.9122L275.747%2080.8457L275.595%2080.802L275.437%2080.7279L275.286%2080.6613L275.138%2080.573L274.998%2080.4988L274.862%2080.4029L274.718%2080.2998L274.6%2080.1967L274.467%2080.0855L274.349%2079.9529L274.235%2079.8204L274.132%2079.7021L274.028%2079.5467L273.917%2079.407L273.84%2079.2445L273.752%2079.0897ZM280.195%2076.4322L273.914%2079.4365L273.895%2079.407L273.888%2079.3918L273.903%2079.407L273.895%2079.3918L273.869%2079.3552H273.866L273.869%2079.3623V79.3552L273.851%2079.3111L273.848%2079.2958L273.851%2079.3182L273.848%2079.3111V79.2958L273.825%2079.2445H273.818V79.2369L273.814%2079.2222L273.788%2079.1856L273.781%2079.178L273.799%2079.1856H273.788L273.781%2079.178L273.777%2079.1562L273.77%2079.1486V79.1338L273.766%2079.1115L273.74%2079.0897H273.752L280.003%2076.0265L280.022%2076.0494H280.014L280.022%2076.0712L280.04%2076.1006H280.047L280.051%2076.1148L280.059%2076.1225L280.066%2076.1377V76.1595H280.07L280.095%2076.2043V76.2108L280.103%2076.2261H280.106L280.128%2076.2708V76.2773L280.136%2076.2926L280.151%2076.3144V76.3439L280.176%2076.3733H280.184L280.173%2076.3657L280.176%2076.3733L280.195%2076.4104L280.202%2076.4322H280.195ZM273.914%2079.4365L280.195%2076.4322L280.265%2076.5729L280.324%2076.7496L280.379%2076.9274L280.431%2077.0964L280.468%2077.2589L280.501%2077.4215L280.516%2077.6058L280.538%2077.7683V77.9384L280.527%2078.0933L280.516%2078.2776L280.501%2078.4402L280.464%2078.6021L280.431%2078.7646L280.391%2078.9271L280.331%2079.0897L280.276%2079.2369L280.206%2079.3918L280.136%2079.5467L280.051%2079.7021L279.97%2079.8346L279.874%2079.9753L279.771%2080.1078L279.66%2080.2338L279.542%2080.3592L279.42%2080.477L279.295%2080.5948L279.158%2080.7061L279.022%2080.802L278.867%2080.898L278.716%2080.9864L278.553%2081.0594L278.392%2081.1412L278.225%2081.1925L278.063%2081.2514L277.89%2081.3103L277.72%2081.3408L277.546%2081.3703L277.388%2081.3921L277.215%2081.4139H276.876L276.709%2081.3921L276.547%2081.3627L276.381%2081.3408L276.212%2081.3103L276.061%2081.259L275.898%2081.2154L275.744%2081.1412L275.589%2081.0889L275.437%2081.0005L275.293%2080.9198L275.149%2080.838L275.009%2080.7426L274.872%2080.6466L274.747%2080.5436L274.622%2080.4181L274.5%2080.2927L274.393%2080.1673L274.283%2080.0266L274.176%2079.8935L274.087%2079.7386L273.995%2079.5837L273.914%2079.4365ZM280.903%2077.9679L274.541%2080.7868L274.522%2080.7279L274.5%2080.7061L274.478%2080.6613L274.463%2080.6166L274.419%2080.5283L274.397%2080.4988L274.375%2080.4399L274.356%2080.4029L274.338%2080.3592L274.331%2080.3145L274.304%2080.2774L274.286%2080.2338L274.268%2080.1967L274.246%2080.1302L274.224%2080.1078L274.205%2080.0713L274.179%2080.0189L274.164%2079.9824L274.143%2079.9458L274.12%2079.9088L274.113%2079.8422L274.095%2079.8128L274.076%2079.7681L274.05%2079.7386L274.032%2079.6797L274.009%2079.6426L273.984%2079.6061L273.962%2079.5467L273.954%2079.5172L273.94%2079.4736L273.914%2079.4365L280.195%2076.4322L280.221%2076.4769L280.239%2076.5064L280.272%2076.5653L280.291%2076.6176L280.313%2076.6612L280.331%2076.706L280.357%2076.7572L280.376%2076.8161L280.398%2076.8685L280.423%2076.8979L280.457%2076.9568L280.483%2077.0004L280.501%2077.0304L280.516%2077.0964L280.542%2077.1488L280.56%2077.1853L280.582%2077.2448L280.604%2077.2813L280.623%2077.3407L280.641%2077.3773L280.667%2077.4215L280.697%2077.4956L280.719%2077.5322L280.744%2077.5763L280.759%2077.621L280.778%2077.6876L280.803%2077.7241L280.822%2077.7607L280.844%2077.8201L280.866%2077.8643L280.903%2077.9679ZM274.541%2080.7868L280.903%2077.9679L280.97%2078.1446L281.028%2078.3071L281.076%2078.4696L281.121%2078.6321L281.154%2078.8017L281.176%2078.9713L281.195%2079.1486L281.202%2079.3182L281.195%2079.4878L281.191%2079.6579L281.176%2079.8204L281.147%2079.9824L281.114%2080.1596L281.073%2080.3145L281.021%2080.4694L280.97%2080.6319L280.899%2080.7868L280.826%2080.934L280.755%2081.0889L280.667%2081.2296L280.575%2081.3627L280.468%2081.5023L280.368%2081.6353L280.258%2081.7608L280.136%2081.872L280.01%2082.004L279.878%2082.1076L279.741%2082.2112L279.601%2082.3072L279.442%2082.3955L279.287%2082.4839L279.129%2082.5657L278.962%2082.6322L278.801%2082.6911L278.627%2082.7271L278.461%2082.7642L278.288%2082.8165L278.114%2082.8307L277.949%2082.8525H277.617L277.444%2082.8384L277.274%2082.8307L277.111%2082.7871L276.946%2082.7642L276.784%2082.7271L276.621%2082.6682L276.47%2082.6169L276.312%2082.5581L276.163%2082.4839L276.016%2082.4108L275.869%2082.3148L275.732%2082.233L275.595%2082.1229L275.467%2082.0269L275.344%2081.9156L275.219%2081.7826L275.101%2081.6724L274.998%2081.5317L274.884%2081.3921L274.788%2081.2514L274.703%2081.0965L274.615%2080.934L274.541%2080.7868ZM281.073%2078.3295L274.681%2081.1118L274.659%2081.0889L274.651%2081.0747L274.666%2081.0889L274.659%2081.0747L274.651%2081.0594L274.641%2081.0376L274.637%2081.0005H274.622L274.615%2080.9864V80.9787L274.611%2080.9635L274.604%2080.9569L274.6%2080.934L274.592%2080.9198L274.581%2080.9122V80.898H274.578L274.567%2080.8828V80.8686L274.563%2080.8457L274.555%2080.838L274.548%2080.8239L274.533%2080.7868H274.541L280.903%2077.9679H280.914L280.936%2078.0121L280.94%2078.0344H280.947V78.0415L280.951%2078.0562L280.959%2078.071L280.97%2078.0781L280.973%2078.0933L280.984%2078.1151V78.1299L280.988%2078.1446H280.995L281.003%2078.1522V78.1669L281.01%2078.174L281.018%2078.1964L281.021%2078.2111L281.028%2078.2406L281.039%2078.2776H281.051L281.039%2078.2482V78.2629L281.051%2078.2776L281.073%2078.3147L281.066%2078.3071L281.073%2078.3442V78.3295ZM274.681%2081.0965L281.073%2078.3442L281.143%2078.5138L281.195%2078.6763L281.247%2078.8535L281.283%2079.0231L281.312%2079.1856L281.339%2079.3552L281.35%2079.5325V79.857L281.339%2080.0418L281.327%2080.2038L281.302%2080.3658L281.265%2080.5436L281.213%2080.6908L281.165%2080.8457L281.114%2081.0005L281.039%2081.1707L280.973%2081.3103L280.892%2081.4586L280.803%2081.6135L280.711%2081.7531L280.608%2081.872L280.505%2082.0116L280.391%2082.137L280.272%2082.2407L280.139%2082.3737L280.01%2082.4839L279.874%2082.5799L279.73%2082.6682L279.575%2082.7642L279.42%2082.8525L279.25%2082.9191L279.088%2082.9932L278.919%2083.038L278.745%2083.1045L278.586%2083.1263L278.414%2083.1699L278.24%2083.1852L278.074%2083.1994L277.901%2083.2146H277.738L277.569%2083.1994L277.399%2083.1699L277.233%2083.1405L277.071%2083.111L276.909%2083.0816L276.747%2083.015L276.596%2082.9638L276.441%2082.8973L276.292%2082.8307L276.141%2082.7424L275.994%2082.654L275.857%2082.5657L275.728%2082.4697L275.595%2082.3508L275.47%2082.2407L275.348%2082.1229L275.238%2082.004L275.127%2081.8567L275.024%2081.7171L274.928%2081.5764L274.839%2081.4215L274.751%2081.259L274.681%2081.0965ZM281.733%2079.9306L275.264%2082.5057L275.241%2082.4697L275.227%2082.4174L275.209%2082.3803L275.19%2082.329L275.172%2082.3072L275.149%2082.2407L275.135%2082.2112L275.127%2082.1665L275.105%2082.1076L275.087%2082.0705L275.068%2082.0269L275.05%2081.9822L275.035%2081.9451L275.009%2081.8862L274.991%2081.8491L274.976%2081.8055L274.958%2081.7608L274.932%2081.7171L274.913%2081.6724L274.909%2081.6353L274.865%2081.547L274.854%2081.5023L274.832%2081.4434L274.806%2081.4215L274.788%2081.3921L274.773%2081.3408L274.747%2081.3038L274.729%2081.2372L274.707%2081.1925L274.703%2081.1631L274.681%2081.1118L281.073%2078.3295L281.088%2078.3884L281.124%2078.4402L281.147%2078.4914L281.165%2078.5361L281.191%2078.5803L281.202%2078.6245L281.22%2078.691L281.247%2078.7499L281.265%2078.787L281.283%2078.8388L281.305%2078.883L281.327%2078.9419L281.35%2079.0008L281.375%2079.0379L281.394%2079.0897L281.416%2079.1338L281.438%2079.1998L281.456%2079.2369L281.471%2079.2887L281.511%2079.3847L281.531%2079.4365L281.556%2079.4878L281.567%2079.5325L281.6%2079.5837L281.623%2079.6355L281.637%2079.6721L281.656%2079.7386L281.682%2079.7757L281.7%2079.8346L281.715%2079.8717L281.733%2079.9306ZM275.264%2082.5057L281.733%2079.9306L281.792%2080.1078L281.847%2080.2774L281.888%2080.4399L281.921%2080.6166L281.954%2080.7868L281.966%2080.9569L281.976%2081.126V81.3038L281.973%2081.4586L281.954%2081.6353L281.928%2081.8055L281.899%2081.968L281.855%2082.1229L281.811%2082.2854L281.752%2082.4403L281.692%2082.6017L281.623%2082.7576L281.545%2082.9049L281.464%2083.038L281.375%2083.1852L281.268%2083.3183L281.165%2083.4579L281.058%2083.5833L280.94%2083.7087L280.815%2083.82L280.686%2083.923L280.549%2084.0414L280.412%2084.1374L280.258%2084.2333L280.106%2084.3141L279.944%2084.3806L279.786%2084.4548L279.612%2084.5213L279.442%2084.5725L279.273%2084.6167L279.099%2084.6391L278.937%2084.6685L278.768%2084.698H278.255L278.081%2084.6685L277.916%2084.6538L277.753%2084.6167L277.591%2084.5725L277.436%2084.5278L277.274%2084.4766L277.119%2084.4253L276.964%2084.3435L276.821%2084.2699L276.68%2084.181L276.529%2084.0926L276.392%2083.9967L276.263%2083.8865L276.141%2083.7753L276.016%2083.6651L275.898%2083.5397L275.791%2083.399L275.685%2083.2659L275.589%2083.1263L275.499%2082.9714L275.411%2082.8307L275.33%2082.6682L275.264%2082.5057ZM281.862%2080.2338L275.367%2082.7795L275.364%2082.7642L275.374%2082.7871L275.367%2082.7795L275.356%2082.7271H275.348L275.356%2082.7642V82.7576L275.33%2082.6977L275.348%2082.7424L275.344%2082.7271L275.327%2082.6911L275.33%2082.7206V82.6977L275.311%2082.654L275.327%2082.6682L275.319%2082.654H275.311V82.6464L275.308%2082.6322L275.301%2082.6169L275.286%2082.5799L275.293%2082.6017L275.286%2082.5875V82.5799L275.278%2082.5581H275.275L275.264%2082.5362V82.5057L281.733%2079.9306L281.737%2079.9164V79.9306L281.748%2079.9458V79.9529H281.752L281.759%2079.9753V79.9824L281.781%2080.0266L281.77%2079.9971L281.774%2080.0189L281.781%2080.0266L281.785%2080.0418L281.792%2080.0713V80.0855L281.818%2080.1078L281.799%2080.0855L281.811%2080.0931L281.822%2080.1302L281.818%2080.1078V80.1149L281.836%2080.1673L281.822%2080.1302H281.829L281.84%2080.1967L281.847%2080.2185L281.836%2080.1814H281.84L281.855%2080.2338H281.862ZM275.367%2082.7795L281.862%2080.2338L281.921%2080.4181L281.973%2080.573L282.021%2080.7426L282.046%2080.9198L282.08%2081.0889L282.091%2081.259L282.102%2081.4357V81.5982L282.091%2081.776L282.08%2081.9451L282.046%2082.1076L282.014%2082.2777L281.976%2082.4403L281.921%2082.5875L281.873%2082.7576L281.811%2082.9049L281.737%2083.0521L281.656%2083.2146L281.574%2083.3553L281.482%2083.4949L281.383%2083.628L281.279%2083.7611L281.165%2083.8865L281.051%2084.0119L280.929%2084.1145L280.796%2084.2333L280.656%2084.3435L280.512%2084.4319L280.365%2084.5278L280.206%2084.6167L280.051%2084.6833L279.885%2084.7569L279.716%2084.8158L279.542%2084.8823L279.376%2084.9118L279.207%2084.9488L279.033%2084.9783L278.86%2084.9859L278.686%2085.0006H278.517L278.347%2084.9859L278.177%2084.9783L278.016%2084.9488L277.846%2084.9118L277.691%2084.8823L277.524%2084.8158L277.373%2084.7721L277.215%2084.698L277.064%2084.6314L276.916%2084.5578L276.772%2084.4618L276.632%2084.3806L276.488%2084.2846L276.359%2084.1744L276.237%2084.0632L276.112%2083.9378L276.005%2083.82L275.891%2083.7022L275.781%2083.5538L275.685%2083.399L275.595%2083.2659L275.511%2083.1045L275.437%2082.9485L275.367%2082.7795ZM282.5%2081.9603L275.92%2084.2846L275.906%2084.2333L275.883%2084.1744L275.869%2084.1515L275.85%2084.0926L275.832%2084.019V83.9967L275.81%2083.9378L275.799%2083.9007L275.773%2083.8571L275.754%2083.8047L275.744%2083.7611L275.721%2083.724L275.699%2083.6651L275.677%2083.6127L275.666%2083.5691L275.658%2083.5244L275.636%2083.4731L275.622%2083.4284L275.603%2083.3848L275.581%2083.3401L275.559%2083.2888L275.548%2083.2517L275.529%2083.2146L275.503%2083.1481L275.485%2083.1045L275.481%2083.0816L275.467%2083.015L275.444%2082.9638L275.422%2082.9191L275.404%2082.8754L275.378%2082.8307L275.367%2082.7795L281.862%2080.2338L281.884%2080.2927L281.899%2080.344L281.918%2080.4029L281.944%2080.4552L281.958%2080.5065L281.976%2080.5512L282.014%2080.6166L282.028%2080.6613L282.046%2080.7126L282.069%2080.7791L282.091%2080.8239L282.102%2080.8828L282.128%2080.934L282.146%2080.9864L282.168%2081.0529L282.179%2081.0965L282.216%2081.1631L282.234%2081.2154L282.246%2081.259L282.271%2081.3103L282.287%2081.3627L282.305%2081.4215L282.324%2081.4804L282.346%2081.5317L282.364%2081.5841L282.379%2081.6353L282.412%2081.7095L282.426%2081.7389L282.449%2081.7826L282.467%2081.8567L282.482%2081.8938L282.5%2081.9603ZM275.92%2084.2846L282.5%2081.9603L282.559%2082.137L282.6%2082.3072L282.64%2082.4697L282.67%2082.6464L282.685%2082.8165L282.7%2082.9932L282.706%2083.1481L282.7%2083.3401L282.681%2083.4949L282.655%2083.6651L282.626%2083.8342L282.585%2083.9967L282.545%2084.1592L282.489%2084.3141L282.426%2084.4766L282.357%2084.6314L282.283%2084.7721L282.202%2084.9118L282.109%2085.0525L282.014%2085.185L281.911%2085.3328L281.799%2085.4505L281.685%2085.576L281.56%2085.7014L281.438%2085.8197L281.302%2085.9157L281.158%2086.0264L281.01%2086.1077L280.859%2086.196L280.707%2086.2702L280.542%2086.3585L280.376%2086.4027L280.202%2086.4622L280.033%2086.5134L279.859%2086.5505L279.686%2086.5723L279.512%2086.5947H279.343L279.17%2086.6241L278.996%2086.5947L278.834%2086.58L278.668%2086.5576L278.494%2086.5358L278.336%2086.4916L278.17%2086.4469L278.016%2086.3956L277.86%2086.3291L277.709%2086.2702L277.562%2086.1889L277.411%2086.1077L277.27%2086.0264L277.134%2085.9228L277.001%2085.8197L276.872%2085.7014L276.75%2085.5912L276.635%2085.48L276.518%2085.3328L276.418%2085.2073L276.318%2085.0666L276.222%2084.9118L276.141%2084.7721L276.061%2084.6167L275.987%2084.4548L275.92%2084.2846ZM282.6%2082.2548L276.02%2084.5278L276.005%2084.5213V84.506L276.008%2084.5431L275.994%2084.4984H275.987L276.005%2084.5213L275.994%2084.4984L275.983%2084.4618V84.4548L275.987%2084.4766L275.975%2084.4319L275.971%2084.3882L275.983%2084.4548H275.975L275.957%2084.3659V84.3882L275.971%2084.4253V84.41L275.946%2084.3659V84.3217L275.95%2084.3806L275.946%2084.3659L275.935%2084.2846L275.928%2084.2922L275.939%2084.3435L275.935%2084.3217V84.3141H275.928V84.2922L275.92%2084.2846L282.5%2081.9603H282.512V81.968L282.518%2081.9822L282.53%2082.0334L282.537%2082.0705L282.526%2082.0116L282.53%2082.0269L282.537%2082.0334L282.548%2082.1229L282.559%2082.1L282.545%2082.0705V82.0781L282.571%2082.1229V82.1665L282.559%2082.1076L282.581%2082.1959V82.1665L282.571%2082.137L282.585%2082.1959L282.581%2082.1741L282.6%2082.2188V82.233L282.585%2082.1959L282.608%2082.2407V82.2548H282.6ZM276.02%2084.5278L282.6%2082.2548L282.655%2082.4403L282.7%2082.6017L282.729%2082.7795L282.759%2082.9485L282.777%2083.1263L282.788%2083.2888V83.4579L282.777%2083.6356L282.766%2083.8047L282.74%2083.9748L282.71%2084.1374L282.67%2084.2922L282.618%2084.4548L282.571%2084.6167L282.5%2084.7721L282.434%2084.9118L282.357%2085.0666L282.275%2085.2073L282.183%2085.3622L282.091%2085.5024L281.976%2085.6207L281.873%2085.7532L281.759%2085.8716L281.637%2085.9893L281.508%2086.1077L281.371%2086.196L281.231%2086.2996L281.084%2086.3956L280.936%2086.4763L280.774%2086.5576L280.608%2086.6312L280.446%2086.6836L280.272%2086.7425L280.103%2086.7866L279.926%2086.8232L279.752%2086.8455L279.579%2086.8526L279.409%2086.8826H279.078L278.904%2086.8455L278.735%2086.8308L278.576%2086.7866L278.414%2086.7643L278.243%2086.713L278.089%2086.6536L277.938%2086.5947L277.787%2086.5134L277.636%2086.4469L277.491%2086.3733L277.352%2086.2702L277.215%2086.1742L277.082%2086.0782L276.96%2085.9599L276.835%2085.8421L276.717%2085.709L276.61%2085.5912L276.506%2085.4505L276.407%2085.318L276.312%2085.1626L276.234%2085.023L276.153%2084.8676L276.083%2084.698L276.02%2084.5278ZM283.186%2084.049L276.521%2086.0559V86.0782L276.506%2086.0335L276.488%2085.9746L276.477%2085.9381L276.455%2085.8863L276.407%2085.7385V85.6867L276.385%2085.6501L276.374%2085.6131L276.351%2085.5542L276.337%2085.5024L276.326%2085.4358L276.304%2085.414L276.292%2085.3622L276.271%2085.3033L276.255%2085.2515L276.237%2085.2073L276.222%2085.1626L276.212%2085.1261L276.2%2085.0525L276.179%2085.023L276.167%2084.9783L276.145%2084.9118L276.13%2084.8823L276.112%2084.8158L276.101%2084.7792L276.075%2084.7274L276.061%2084.6685V84.6314L276.038%2084.5944L276.02%2084.5278L282.6%2082.2548L282.614%2082.3148L282.637%2082.3737L282.67%2082.4403L282.681%2082.4839L282.706%2082.5362L282.718%2082.5875L282.74%2082.6464L282.751%2082.6977L282.773%2082.7576L282.788%2082.8165L282.806%2082.8754L282.818%2082.9049L282.855%2082.9714L282.865%2083.0303L282.892%2083.1045L282.902%2083.1405L282.925%2083.1994L282.935%2083.2517L282.961%2083.3183L282.972%2083.3772L282.984%2083.4142L283.006%2083.4731L283.021%2083.5244L283.039%2083.5909L283.068%2083.6498L283.086%2083.7087L283.105%2083.7611L283.116%2083.82L283.143%2083.8571L283.153%2083.923L283.164%2083.9825L283.186%2084.0414V84.049ZM276.521%2086.0782L283.186%2084.0414L283.235%2084.2039L283.301%2084.5578L283.323%2084.7274L283.337%2084.9047V85.0666L283.327%2085.2515L283.315%2085.414L283.293%2085.576L283.268%2085.7532L283.235%2085.9157L283.186%2086.0782L283.143%2086.2255L283.076%2086.3956L283.006%2086.5505L282.932%2086.6907L282.847%2086.8308L282.759%2086.971L282.67%2087.1035L282.571%2087.2442L282.456%2087.3773L282.342%2087.4874L282.22%2087.6281L282.091%2087.7241L281.958%2087.8342L281.822%2087.9302L281.682%2088.0415L281.523%2088.108L281.375%2088.1964L281.209%2088.2694L281.039%2088.336L280.881%2088.3949L280.707%2088.4319L280.538%2088.4767L280.357%2088.4985L280.184%2088.5279L280.01%2088.5432H279.667L279.498%2088.5279L279.339%2088.4985L279.166%2088.4767L279.003%2088.4319L278.841%2088.3949L278.678%2088.336L278.52%2088.2847L278.369%2088.2182L278.222%2088.144L278.074%2088.0633L277.938%2087.9673L277.797%2087.8637L277.661%2087.7753L277.536%2087.6576L277.411%2087.5539L277.299%2087.4285L277.182%2087.3031L277.078%2087.17L276.975%2087.0304L276.883%2086.8826L276.794%2086.7425L276.717%2086.5723L276.643%2086.4174L276.576%2086.2549L276.521%2086.0782ZM283.253%2084.2333L276.566%2086.2549V86.2402H276.573L276.547%2086.1889V86.1742L276.566%2086.2255V86.2108L276.555%2086.1742L276.529%2086.1448L276.547%2086.1889H276.562L276.547%2086.159L276.543%2086.1448L276.555%2086.1742V86.159L276.521%2086.1077H276.518L276.547%2086.1448L276.529%2086.1077H276.521L276.543%2086.1295V86.1224L276.518%2086.093L276.506%2086.0488L276.518%2086.0782L276.529%2086.093H276.521V86.0782V86.0559L283.186%2084.049V84.0632H283.19L283.209%2084.1079L283.198%2084.0926V84.1079L283.212%2084.1374L283.219%2084.1515L283.209%2084.1145V84.1374L283.235%2084.181H283.241L283.212%2084.1515L283.227%2084.181H283.235L283.245%2084.2333L283.241%2084.2181L283.227%2084.181V84.2039L283.256%2084.2552V84.2699L283.235%2084.2181V84.2333L283.253%2084.2475V84.2333ZM276.566%2086.2402L283.253%2084.2475L283.293%2084.4253L283.337%2084.5944L283.364%2084.7721L283.382%2084.9488L283.393%2085.119L283.397%2085.2957L283.393%2085.4505L283.378%2085.6207L283.349%2085.7974L283.323%2085.9599L283.282%2086.1295L283.241%2086.2844L283.186%2086.4469L283.12%2086.5947L283.053%2086.7567L282.98%2086.905L282.894%2087.0599L282.806%2087.1924L282.71%2087.3325L282.6%2087.4503L282.493%2087.591L282.379%2087.7012L282.257%2087.8272L282.128%2087.9302L281.991%2088.048L281.855%2088.144L281.703%2088.2258L281.56%2088.3218L281.401%2088.3949L281.247%2088.4767L281.076%2088.5279L280.903%2088.5868L280.734%2088.6315L280.553%2088.6686L280.379%2088.6981L280.206%2088.7199L280.04%2088.7275H279.867L279.693%2088.7199L279.524%2088.7057L279.354%2088.6981L279.188%2088.661L279.026%2088.6239L278.867%2088.5726L278.701%2088.5137L278.55%2088.4548L278.402%2088.3949L278.243%2088.3141L278.104%2088.2258L277.959%2088.144L277.83%2088.048L277.691%2087.9302L277.569%2087.8272L277.444%2087.7164L277.322%2087.591L277.215%2087.4656L277.111%2087.3325L277.009%2087.1924L276.916%2087.0375L276.835%2086.8973L276.75%2086.7425L276.684%2086.5723L276.621%2086.4027L276.566%2086.2402ZM283.746%2086.0488L277.009%2087.7906V87.7972L276.997%2087.7612L276.975%2087.7012L276.964%2087.6576L276.953%2087.6057L276.942%2087.5539L276.927%2087.5169L276.909%2087.4656V87.4209L276.898%2087.3549L276.883%2087.3031L276.872%2087.266L276.857%2087.2147L276.835%2087.17L276.821%2087.1264L276.809%2087.074L276.794%2087.0151L276.78%2086.9933L276.768%2086.9268L276.747%2086.8826L276.735%2086.8232V86.7866L276.717%2086.7425L276.702%2086.6836L276.691%2086.6312L276.672%2086.58L276.654%2086.5505L276.643%2086.4916L276.632%2086.4469L276.61%2086.3956L276.596%2086.3291L276.576%2086.2996L276.566%2086.2549L283.253%2084.2333L283.268%2084.2922L283.282%2084.3588L283.293%2084.3882L283.315%2084.4548L283.327%2084.5213L283.345%2084.5725L283.36%2084.6314L283.378%2084.6833L283.393%2084.7422L283.407%2084.794L283.419%2084.8529L283.452%2084.9118L283.47%2084.9565L283.482%2085.023L283.496%2085.0666L283.507%2085.1408L283.522%2085.185L283.54%2085.2368L283.556%2085.3033L283.57%2085.3622L283.588%2085.414L283.599%2085.48L283.611%2085.5247L283.625%2085.576L283.654%2085.6425L283.67%2085.7014L283.681%2085.7532L283.691%2085.7974L283.713%2085.8568L283.725%2085.9228L283.736%2085.9746L283.746%2086.0335V86.0488ZM277.009%2087.7972L283.746%2086.0335L283.791%2086.196L283.824%2086.3804L283.85%2086.5505L283.862%2086.7201L283.869%2086.905V87.074L283.854%2087.2442L283.832%2087.4209L283.806%2087.5758L283.769%2087.7383L283.725%2087.9084L283.677%2088.0633L283.611%2088.2258L283.552%2088.3807L283.474%2088.5279L283.393%2088.6686L283.301%2088.8159L283.212%2088.9566L283.109%2089.082L282.998%2089.2216L282.892%2089.3394L282.766%2089.4583L282.64%2089.5761L282.512%2089.6721L282.371%2089.7757L282.228%2089.8782L282.083%2089.96L281.928%2090.0483L281.774%2090.1149L281.607%2090.189L281.442%2090.2327L281.268%2090.2992L281.088%2090.3286L280.914%2090.3657L280.748%2090.3875L280.571%2090.3952H280.224L280.059%2090.3875L279.885%2090.3734L279.719%2090.3505L279.557%2090.3068L279.387%2090.2621L279.232%2090.2109L279.078%2090.1661L278.919%2090.0931L278.772%2090.0036L278.627%2089.9371L278.48%2089.8422L278.343%2089.7386L278.21%2089.6426L278.081%2089.5314L277.959%2089.4288L277.842%2089.3034L277.72%2089.1845L277.62%2089.0525L277.517%2088.9195L277.432%2088.7646L277.34%2088.6097L277.256%2088.4548L277.185%2088.3141L277.119%2088.144L277.064%2087.9749L277.009%2087.7972ZM283.803%2086.196L277.056%2087.9526L277.049%2087.9302V87.9084H277.041V87.9008L277.056%2087.9749L277.041%2087.879H277.034V87.8637L277.041%2087.9302L277.031%2087.8342L277.019%2087.8272L277.034%2087.9084V87.9008L277.019%2087.8124L277.011%2087.7972V87.7906H277.009L283.746%2086.0488L283.758%2086.0559V86.093H283.762L283.746%2086.0264L283.762%2086.1077H283.769V86.1295L283.758%2086.0488L283.78%2086.1448V86.159L283.784%2086.1742L283.769%2086.093L283.784%2086.1889H283.791V86.196V86.2108L283.803%2086.196ZM277.056%2087.9526L283.803%2086.196L283.839%2086.3804L283.869%2086.5576L283.883%2086.7201L283.905%2086.905L283.909%2087.074L283.905%2087.2442L283.895%2087.4209L283.869%2087.591L283.839%2087.7612L283.806%2087.9226L283.758%2088.0709L283.713%2088.24L283.644%2088.3949L283.578%2088.5432L283.507%2088.6981L283.427%2088.8453L283.337%2088.9784L283.241%2089.118L283.146%2089.251L283.035%2089.3841L282.917%2089.5019L282.8%2089.635L282.674%2089.7386L282.537%2089.8487L282.408%2089.9524L282.264%2090.0483L282.109%2090.1225L281.958%2090.2109L281.799%2090.2774L281.637%2090.3505L281.471%2090.3952L281.302%2090.4464L281.124%2090.4835L280.947%2090.5282L280.774%2090.5501L280.604%2090.5577L280.431%2090.5719L280.258%2090.5577L280.084%2090.5501L279.915%2090.5282L279.749%2090.4988L279.579%2090.4617L279.424%2090.4094L279.269%2090.3657L279.111%2090.3068L278.956%2090.2327L278.804%2090.1661L278.66%2090.0931L278.517%2089.9894L278.243%2089.7975L278.114%2089.6862L277.989%2089.5761L277.879%2089.4583L277.765%2089.3252L277.654%2089.1922L277.562%2089.0525L277.462%2088.9195L277.377%2088.7646L277.299%2088.6097L277.226%2088.4548L277.16%2088.2923L277.101%2088.1298L277.056%2087.9526ZM284.238%2088.0709L277.444%2089.5761L277.432%2089.5684L277.421%2089.5019V89.4648L277.407%2089.4288L277.391%2089.3699L277.388%2089.3176L277.373%2089.251L277.355%2089.2074L277.344%2089.1485L277.329%2089.1114L277.318%2089.0667L277.311%2089.0155L277.299%2088.9566L277.281%2088.9042L277.27%2088.8606L277.256%2088.8082L277.24%2088.7493V88.7199L277.226%2088.6686L277.215%2088.6097L277.203%2088.5574L277.193%2088.4985L277.182%2088.4472L277.166%2088.4101L277.148%2088.3589L277.137%2088.3141L277.127%2088.2476L277.111%2088.1964L277.097%2088.144L277.082%2088.1004V88.048L277.071%2087.9968L277.056%2087.9526L283.803%2086.196L283.813%2086.2549L283.824%2086.3215L283.854%2086.3804L283.869%2086.4469L283.88%2086.5058L283.895%2086.5576L283.909%2086.6241L283.92%2086.6683L283.938%2086.7425L283.95%2086.809L283.961%2086.8526L283.972%2086.9192L283.987%2086.971L283.997%2087.0304L284.009%2087.0817L284.042%2087.1558L284.053%2087.2147L284.068%2087.266L284.079%2087.3107L284.093%2087.3773L284.101%2087.4285L284.116%2087.4803L284.126%2087.5539L284.142%2087.6281L284.16%2087.6794L284.171%2087.7241L284.179%2087.7906L284.189%2087.8342L284.204%2087.9008L284.219%2087.9673L284.248%2088.0415L284.252%2088.0851L284.238%2088.0709ZM277.432%2089.5684L284.252%2088.0851L284.285%2088.2694L284.315%2088.4472L284.33%2088.6097L284.337%2088.7941L284.33%2088.9707L284.318%2089.1333L284.304%2089.3176L284.238%2089.6426L284.197%2089.8117L284.142%2089.96L284.087%2090.1225L284.016%2090.2774L283.942%2090.4399L283.869%2090.5795L283.78%2090.7202L283.681%2090.8522L283.588%2090.9929L283.474%2091.1183L283.364%2091.2437L283.241%2091.3692L283.116%2091.4728L282.984%2091.5906L282.71%2091.7825L282.559%2091.8638L282.408%2091.9521L282.257%2092.0334L282.091%2092.0852L281.921%2092.1512L281.752%2092.2035L281.578%2092.2401L281.401%2092.2842L281.231%2092.3066L281.051%2092.3137H280.707L280.538%2092.3066L280.365%2092.2919L280.195%2092.2624L280.033%2092.2254L279.867%2092.1735L279.701%2092.1294L279.546%2092.0628L279.387%2091.9963L279.24%2091.9298L279.092%2091.8567L278.952%2091.7678L278.811%2091.6718L278.678%2091.5829L278.55%2091.4651L278.425%2091.3544L278.31%2091.2361L278.192%2091.103L278.089%2090.9711L277.982%2090.8304L277.89%2090.6973L277.797%2090.5501L277.72%2090.3875L277.58%2090.0778L277.524%2089.9153L277.477%2089.7386L277.432%2089.5684ZM284.297%2088.2923L277.469%2089.7386V89.7168V89.731L277.462%2089.7015V89.6862L277.477%2089.731V89.7168L277.462%2089.6721L277.469%2089.7015L277.454%2089.6721V89.6426L277.462%2089.6721L277.448%2089.6644V89.6426L277.462%2089.6644L277.448%2089.6132L277.444%2089.5979V89.635H277.454L277.444%2089.5979L277.454%2089.6132L277.436%2089.5761L277.448%2089.5903L277.444%2089.5761L284.238%2088.0709V88.0851H284.248L284.259%2088.1004V88.144V88.1298L284.248%2088.108L284.267%2088.1298H284.252L284.267%2088.144V88.1811L284.271%2088.1735V88.1811L284.259%2088.1735L284.279%2088.1964H284.267L284.279%2088.2476H284.285L284.271%2088.2182V88.2258L284.285%2088.2694V88.2847L284.297%2088.2476H284.279L284.297%2088.2847V88.2923ZM277.469%2089.7386L284.297%2088.2923L284.33%2088.4767L284.352%2088.6315L284.363%2088.8159L284.371%2088.9926V89.1627L284.355%2089.3394L284.337%2089.5019L284.308%2089.6721L284.271%2089.8422L284.226%2090.0036L284.179%2090.1738L284.116%2090.321L284.053%2090.4835L283.979%2090.6242L283.895%2090.7791L283.806%2090.9122L283.717%2091.0518L283.611%2091.1925L283.503%2091.3179L283.393%2091.4357L283.268%2091.5535L283.146%2091.6718L283.017%2091.7825L282.876%2091.8785L282.74%2091.9745L282.585%2092.0552L282.434%2092.137L282.283%2092.2254L282.113%2092.2842L281.954%2092.3361L281.781%2092.3879L281.607%2092.4244L281.431%2092.4544L281.257%2092.4909L281.076%2092.4986L280.903%2092.5133L280.734%2092.4986H280.56L280.391%2092.4762L280.224%2092.4391L280.059%2092.4026L279.889%2092.3584L279.738%2092.3066L279.575%2092.2472L279.42%2092.1735L279.273%2092.1147L279.122%2092.0334L278.985%2091.9521L278.849%2091.8567L278.712%2091.7384L278.586%2091.6424L278.461%2091.5164L278.336%2091.4062L278.225%2091.2808L278.118%2091.1478L278.018%2091.0076L277.922%2090.8751L277.842%2090.7202L277.757%2090.5719L277.691%2090.4094L277.62%2090.2545L277.569%2090.0931L277.51%2089.9153L277.469%2089.7386ZM284.669%2090.189L277.794%2091.3768L277.779%2091.3321L277.787%2091.2808L277.771%2091.2361L277.765%2091.1696L277.753%2091.1183L277.746%2091.0812L277.728%2091.0223L277.72%2090.9852L277.709%2090.9187L277.705%2090.8751L277.691%2090.8227L277.683%2090.7562L277.669%2090.7202L277.661%2090.6613L277.638%2090.5719L277.628%2090.513L277.617%2090.4617L277.62%2090.4094L277.606%2090.3657L277.602%2090.3068L277.583%2090.2621L277.573%2090.2109L277.569%2090.1661L277.546%2090.0996L277.536%2090.056L277.532%2090.0036L277.517%2089.9524L277.503%2089.9153L277.499%2089.8487L277.481%2089.7975L277.469%2089.7386L284.297%2088.2923L284.308%2088.3512L284.318%2088.4101L284.33%2088.4548L284.355%2088.5868L284.363%2088.6315L284.377%2088.7057L284.389%2088.7646L284.396%2088.8159L284.41%2088.8748L284.426%2088.9489L284.433%2088.9926L284.444%2089.0525L284.467%2089.118L284.481%2089.1845L284.488%2089.2292L284.5%2089.3034L284.514%2089.3547L284.522%2089.4136L284.536%2089.4801L284.543%2089.5314L284.559%2089.5903L284.563%2089.6426L284.577%2089.7015L284.581%2089.768L284.595%2089.8269L284.606%2089.8935L284.618%2089.9524L284.625%2090.0036L284.632%2090.056L284.661%2090.1225L284.669%2090.189ZM277.794%2091.3768L284.669%2090.189L284.694%2090.3657L284.714%2090.5501L284.717%2090.7126V90.8893L284.706%2091.067L284.694%2091.2361L284.669%2091.391L284.632%2091.5535L284.588%2091.7236L284.543%2091.8932L284.481%2092.0552L284.418%2092.2177L284.344%2092.3584L284.267%2092.5133L284.179%2092.6534L284.087%2092.786L283.987%2092.9267L283.88%2093.0445L283.769%2093.1846L283.644%2093.2953L283.522%2093.406L283.397%2093.5244L283.256%2093.6351L283.12%2093.731L282.98%2093.8047L282.829%2093.8936L282.67%2093.9525L282.512%2094.0261L282.346%2094.0926L282.179%2094.1368L282.01%2094.188L281.829%2094.218L281.648%2094.2546L281.475%2094.2622L281.302%2094.2769H281.124L280.951%2094.2622L280.778%2094.2546L280.608%2094.218L280.446%2094.181L280.276%2094.1586L280.114%2094.0926L279.959%2094.0408L279.804%2093.9743L279.653%2093.9077L279.509%2093.8194L279.362%2093.7381L279.217%2093.6422L279.088%2093.5462L278.956%2093.4284L278.834%2093.3177L278.716%2093.1993L278.598%2093.0668L278.488%2092.9485L278.392%2092.816L278.296%2092.6758L278.206%2092.5204L278.118%2092.3802L278.048%2092.2254L277.979%2092.0552L277.916%2091.9003L277.867%2091.7236L277.83%2091.5535L277.794%2091.3768ZM284.694%2090.3505L277.812%2091.5164V91.5317L277.83%2091.5393L277.797%2091.4504V91.4357L277.83%2091.5317L277.797%2091.4204H277.794L277.824%2091.5099L277.794%2091.4062V91.391V91.3768V91.3692H277.787L277.812%2091.4504L277.787%2091.3544L277.812%2091.4357H277.808L277.779%2091.3397V91.3321L277.808%2091.4204V91.4062L277.779%2091.3179L277.808%2091.391L277.794%2091.3768L284.669%2090.189L284.651%2090.1738L284.684%2090.2621V90.2774L284.661%2090.189V90.1956L284.684%2090.2992L284.661%2090.2109L284.684%2090.3068L284.694%2090.321V90.3286L284.669%2090.2327L284.694%2090.3505H284.702L284.673%2090.2621L284.702%2090.3657V90.3734L284.673%2090.2774L284.702%2090.3875L284.68%2090.2992V90.3068L284.706%2090.3952L284.68%2090.321L284.694%2090.3286V90.3505ZM277.812%2091.5317L284.694%2090.3286L284.717%2090.513L284.739%2090.6973L284.751%2090.8751L284.743%2091.03L284.739%2091.2219L284.717%2091.3768L284.694%2091.5535L284.661%2091.7236L284.618%2091.8932L284.563%2092.041L284.51%2092.2177L284.371%2092.5133L284.297%2092.6605L284.204%2092.7936L284.112%2092.9338L284.009%2093.0668L283.909%2093.207L283.791%2093.3324L283.677%2093.4502L283.552%2093.5685L283.419%2093.6792L283.29%2093.7752L283.146%2093.8712L282.998%2093.9525L282.847%2094.0408L282.7%2094.1221L282.537%2094.188L282.371%2094.2546L282.209%2094.2993L282.036%2094.3435L281.855%2094.3729L281.682%2094.3953L281.501%2094.4324H281.147L280.973%2094.4171L280.811%2094.3953L280.638%2094.3729L280.468%2094.3435L280.309%2094.2993L280.139%2094.2546L279.981%2094.188L279.83%2094.1221L279.679%2094.0555L279.531%2093.9743L279.383%2093.8936L279.247%2093.7976L279.115%2093.694L278.985%2093.5833L278.86%2093.4802L278.735%2093.3618L278.627%2093.2435L278.517%2093.111L278.414%2092.9708L278.318%2092.8378L278.233%2092.69L278.151%2092.5351L278.074%2092.3802L278.008%2092.2254L277.945%2092.0552L277.897%2091.8932L277.846%2091.716L277.812%2091.5317ZM284.982%2092.2842L278.074%2093.1846L278.071%2093.1328L278.063%2093.0668L278.052%2093.0226L278.037%2092.9708L278.034%2092.9114L278.026%2092.8672L278.018%2092.816L278.016%2092.7712L278.008%2092.72L278.004%2092.6605L277.982%2092.624L277.979%2092.5646L277.971%2092.5133L277.967%2092.4544L277.959%2092.4026L277.945%2092.3508L277.938%2092.2919L277.945%2092.2472L277.938%2092.2035L277.922%2092.137L277.916%2092.0999L277.912%2092.041L277.897%2091.9892L277.89%2091.9521L277.883%2091.8932L277.867%2091.8338L277.86%2091.7902L277.853%2091.7384L277.842%2091.6718L277.834%2091.62L277.83%2091.5829L277.812%2091.5164L284.694%2090.3505L284.706%2090.3952L284.714%2090.4759L284.717%2090.5282L284.739%2090.5795L284.743%2090.6384L284.751%2090.7126L284.761%2090.7562L284.769%2090.8304L284.776%2090.8969L284.79%2090.9634L284.798%2091.0076L284.806%2091.0812L284.809%2091.1259L284.824%2091.1925L284.843%2091.259L284.853%2091.3179L284.857%2091.3692L284.876%2091.4357L284.879%2091.4946L284.886%2091.5393L284.89%2091.6058L284.898%2091.6718L284.912%2091.7384L284.923%2091.7902L284.927%2091.8638L284.935%2091.9156L284.941%2091.9892L284.945%2092.041L284.957%2092.0999L284.96%2092.1512L284.978%2092.2254L284.982%2092.2842ZM278.074%2093.1846L284.982%2092.2842L284.998%2092.4544L285.012%2092.6311V92.816L285.004%2093.0003L284.982%2093.1552L284.96%2093.3177L284.927%2093.4949L284.886%2093.6569L284.839%2093.8194L284.776%2093.989L284.714%2094.1368L284.647%2094.2917L284.563%2094.4395L284.481%2094.572L284.385%2094.7127L284.285%2094.8523L284.183%2094.9777L284.075%2095.126L283.954%2095.2286L283.832%2095.3474L283.699%2095.4434L283.57%2095.5612L283.433%2095.6572L283.29%2095.7303L283.143%2095.8263L282.984%2095.9004L282.829%2095.967L282.663%2096.0335L282.493%2096.0771L282.33%2096.1218L282.15%2096.1666L281.976%2096.196L281.799%2096.2025L281.623%2096.2178H281.442L281.268%2096.2025L281.095%2096.196L280.936%2096.1666L280.759%2096.1295L280.593%2096.1L280.439%2096.0411L280.276%2095.9822L280.118%2095.9222L279.97%2095.8492L279.822%2095.7674L279.679%2095.6866L279.542%2095.5983L279.406%2095.4871L279.273%2095.3987L279.148%2095.2809L279.033%2095.1626L278.915%2095.0371L278.804%2094.9117L278.712%2094.7792L278.609%2094.6385L278.52%2094.5054L278.443%2094.3435L278.365%2094.188L278.296%2094.0261L278.233%2093.8712L278.185%2093.694L278.141%2093.5315L278.104%2093.3689L278.074%2093.1846ZM284.99%2092.3508L278.081%2093.2588V93.2953V93.2806V93.2735V93.2588L278.071%2093.1552L278.081%2093.2735H278.074V93.2588L278.063%2093.1552L278.074%2093.2435L278.063%2093.1404L278.074%2093.2288V93.1846L284.982%2092.2842V92.2401V92.2472V92.2624L284.998%2092.3802L284.982%2092.2919H284.99L285.004%2092.3879L284.99%2092.3066V92.3508ZM278.081%2093.2588L284.99%2092.3508L285.012%2092.5204L285.016%2092.6976V92.882L285.012%2093.0445L284.998%2093.2288L284.968%2093.3913L284.935%2093.5685L284.89%2093.7381L284.843%2093.8936L284.79%2094.0555L284.717%2094.2033L284.651%2094.3658L284.577%2094.5131L284.488%2094.6461L284.396%2094.7857L284.297%2094.9188L284.189%2095.0595L284.079%2095.1849L283.961%2095.3027L283.839%2095.4205L283.717%2095.5318L283.578%2095.6277L283.437%2095.7161L283.293%2095.8044L283.146%2095.8928L282.99%2095.967L282.836%2096.0411L282.674%2096.1L282.512%2096.1513L282.342%2096.196L282.168%2096.2331L281.987%2096.2625L281.811%2096.2691L281.626%2096.292H281.456L281.283%2096.2691L281.114%2096.2625L280.94%2096.2331L280.774%2096.2025L280.608%2096.1666L280.446%2096.1077L280.287%2096.0553L280.136%2095.9822L279.981%2095.9222L279.83%2095.8339L279.686%2095.7608L279.546%2095.6714L279.28%2095.4576L279.158%2095.3474L279.04%2095.2286L278.919%2095.0966L278.815%2094.9777L278.716%2094.8381L278.62%2094.705L278.527%2094.5649L278.451%2094.4171L278.369%2094.2622L278.3%2094.0926L278.243%2093.9448L278.192%2093.7752L278.151%2093.5903L278.108%2093.4284L278.081%2093.2588ZM285.219%2094.3435L278.255%2094.9341H278.269L278.263%2094.8817V94.8381L278.255%2094.7857L278.243%2094.7268L278.24%2094.6603V94.6238L278.233%2094.5649L278.225%2094.5278L278.222%2094.4618L278.21%2094.3953L278.206%2094.3435V94.2993L278.2%2094.2546L278.192%2094.2033L278.185%2094.1586L278.177%2094.085L278.17%2094.0261L278.163%2093.989L278.155%2093.9301L278.151%2093.8712L278.144%2093.8341L278.141%2093.7676L278.13%2093.7087V93.6645L278.114%2093.6203L278.108%2093.5609V93.5244L278.096%2093.4502L278.104%2093.406L278.096%2093.3618L278.089%2093.2953L278.081%2093.2588L284.99%2092.3508L284.998%2092.4173L285.004%2092.4909L285.012%2092.5351L285.027%2092.6093L285.035%2092.6605L285.049%2092.7347L285.053%2092.7936L285.06%2092.8601L285.064%2092.9267L285.078%2093.0374L285.086%2093.111L285.093%2093.1552L285.097%2093.2288L285.108%2093.2953L285.115%2093.3618L285.119%2093.406L285.129%2093.4578V93.5315L285.137%2093.5903L285.141%2093.6645L285.149%2093.731L285.152%2093.7752L285.16%2093.8341L285.17%2093.9077V93.9743L285.178%2094.0408L285.186%2094.0926L285.189%2094.1586V94.2033L285.196%2094.2917L285.204%2094.3435H285.219ZM278.269%2094.9341L285.204%2094.3435L285.219%2094.5278V94.705L285.207%2094.8752L285.189%2095.0519L285.17%2095.2144L285.137%2095.3987L285.093%2095.5612L285.049%2095.7085L284.99%2095.871L284.927%2096.0335L284.857%2096.1731L284.776%2096.3291L284.694%2096.4763L284.606%2096.6094L284.5%2096.7566L284.396%2096.8744L284.285%2096.9998L284.171%2097.1253L284.053%2097.2365L283.92%2097.3543L283.791%2097.4579L283.654%2097.5463L283.507%2097.6346L283.364%2097.723L283.212%2097.7971L282.894%2097.9302L282.729%2097.9815L282.559%2098.0185L282.39%2098.0698L282.216%2098.0922L282.036%2098.1069L281.855%2098.1145H281.508L281.335%2098.0922L281.158%2098.0774L280.995%2098.0327L280.822%2097.9967L280.667%2097.9596L280.505%2097.9007L280.35%2097.8342L280.195%2097.76L280.047%2097.6793L279.896%2097.5899L279.759%2097.5168L279.623%2097.399L279.495%2097.3096L279.372%2097.1994L279.25%2097.074L279.133%2096.9628L279.033%2096.8308L278.93%2096.6977L278.834%2096.5647L278.741%2096.4098L278.66%2096.2691L278.586%2096.1218L278.517%2095.9593L278.454%2095.8044L278.402%2095.6419L278.358%2095.4576L278.318%2095.3027L278.288%2095.126L278.269%2094.9341ZM285.229%2094.5131L278.269%2095.089L278.281%2095.0737L278.269%2094.993V94.9777V95.0595H278.281L278.269%2095.0519L278.277%2095.0371H278.263V95.0148V95.0072H278.277L278.263%2094.993L278.277%2094.9777H278.263V94.9635H278.277H278.269L278.255%2094.9483H278.269L278.255%2094.9341L285.219%2094.3435V94.3658H285.204V94.3729H285.219L285.204%2094.3876H285.223V94.3953H285.207L285.223%2094.4171H285.207L285.223%2094.4324H285.207V94.4395H285.223V94.4542H285.207L285.229%2094.4618V94.5649V94.5502L285.219%2094.476H285.229L285.219%2094.5054L285.229%2094.5131ZM278.269%2095.089L285.229%2094.5131L285.241%2094.6903L285.244%2094.8752L285.229%2095.0519L285.219%2095.2144L285.189%2095.3987L285.16%2095.5612L285.119%2095.7161L285.064%2095.8928L285.012%2096.0553L284.945%2096.2025L284.876%2096.3585L284.798%2096.5058L284.706%2096.653L284.618%2096.7937L284.522%2096.9268L284.41%2097.0587L284.304%2097.1842L284.183%2097.3096L284.057%2097.4285L283.938%2097.531L283.803%2097.627L283.658%2097.723L283.515%2097.8189L283.37%2097.9007L283.212%2097.9738L283.061%2098.0327L282.894%2098.0922L282.729%2098.144L282.571%2098.2029L282.393%2098.2323L282.216%2098.2541L282.036%2098.277H281.508L281.335%2098.2694L281.158%2098.2476L280.988%2098.2029L280.822%2098.1658L280.656%2098.1145L280.501%2098.0698L280.339%2097.9967L280.188%2097.9302L280.04%2097.8408L279.896%2097.76L279.752%2097.6641L279.623%2097.5681L279.495%2097.4579L279.362%2097.3543L279.247%2097.2365L279.129%2097.1111L279.026%2096.9704L278.919%2096.8526L278.827%2096.7195L278.735%2096.5647L278.653%2096.4098L278.58%2096.2625L278.509%2096.1077L278.451%2095.9451L278.402%2095.7826L278.347%2095.6125L278.318%2095.4358L278.288%2095.2656L278.269%2095.089ZM285.344%2096.4687L278.392%2096.7937V96.7861L278.384%2096.7272V96.6824L278.38%2096.6312V96.5647L278.369%2096.5134V96.4098L278.365%2096.3727V96.3062L278.358%2096.2396V96.196L278.347%2096.1513V96.1L278.343%2096.0553V95.9822L278.336%2095.9299V95.8928L278.332%2095.8339V95.7826L278.325%2095.7161L278.318%2095.6714V95.6125L278.31%2095.5754L278.3%2095.5165V95.4576L278.296%2095.4063V95.3616L278.288%2095.3027L278.281%2095.2362V95.1849L278.277%2095.1479L278.269%2095.089L285.229%2094.5131L285.241%2094.5649V94.6385L285.244%2094.705L285.252%2094.7563V94.8086L285.255%2094.8817L285.266%2094.9341V94.993L285.274%2095.0595V95.1326L285.278%2095.1849L285.285%2095.258V95.3104L285.288%2095.3616V95.4205L285.3%2095.51V95.5612L285.311%2095.6125L285.315%2095.6866V95.8044L285.321%2095.871V95.9299L285.325%2095.9822V96.0553L285.333%2096.1077V96.1666L285.34%2096.2396V96.3585L285.344%2096.424V96.4763V96.4687ZM278.392%2096.7861L285.344%2096.4763L285.355%2096.6606L285.344%2096.8373L285.333%2097.0151L285.311%2097.1842L285.278%2097.3619L285.241%2097.531L285.189%2097.7011L285.137%2097.8408L285.004%2098.1658L284.923%2098.3207L284.839%2098.4537L284.751%2098.601L284.651%2098.7264L284.547%2098.8671L284.44%2098.9849L284.318%2099.118L284.197%2099.2287L284.075%2099.3317L283.938%2099.443L283.806%2099.5313L283.658%2099.6197L283.515%2099.7086L283.364%2099.7822L283.209%2099.8558L283.05%2099.9152L282.88%2099.9665L282.718%20100.011L282.545%20100.048L282.371%20100.07L282.202%20100.107L282.021%20100.121H281.659L281.482%20100.107L281.312%20100.07L281.147%20100.048L280.973%20100.011L280.815%2099.9518L280.649%2099.8929L280.494%2099.8487L280.339%2099.7745L280.188%2099.6862L280.047%2099.6049L279.911%2099.509L279.771%2099.4135L279.638%2099.3023L279.512%2099.1992L279.387%2099.0885L279.28%2098.9631L279.17%2098.8376L279.066%2098.7046L278.974%2098.5644L278.878%2098.4166L278.801%2098.277L278.723%2098.1363L278.653%2097.9738L278.59%2097.8189L278.539%2097.6499L278.488%2097.4874L278.454%2097.3096L278.417%2097.1329L278.402%2096.9628L278.392%2096.7861ZM285.355%2096.6094L278.392%2096.9039V96.8602V96.8526V96.8373V96.8308V96.9333V96.8155V96.9268V96.7937V96.7861V96.9039V96.7642V96.8602V96.7566V96.8526V96.7937L285.344%2096.4687V96.4098V96.5428V96.424V96.4392L285.355%2096.5799V96.5865V96.6017V96.6094V96.6312V96.5058V96.653V96.6094ZM278.392%2096.9039L285.355%2096.6094V96.7937L285.333%2097.1624L285.315%2097.3172L285.278%2097.4874L285.241%2097.6641L285.189%2097.8189L285.137%2097.9815L285.071%2098.144L284.998%2098.2988L284.923%2098.4537L284.839%2098.5944L284.743%2098.7264L284.647%2098.8671L284.543%2099.0002L284.433%2099.1256L284.315%2099.2357L284.189%2099.3612L284.068%2099.4724L283.938%2099.5755L283.803%2099.6644L283.654%2099.7451L283.507%2099.834L283.36%2099.9152L283.198%2099.9812L283.039%20100.033L282.876%20100.092L282.71%20100.129L282.537%20100.173L282.364%20100.203L282.183%20100.233L282.01%20100.24H281.829L281.656%20100.233L281.475%20100.217L281.305%20100.188L281.143%20100.151L280.97%20100.121L280.803%20100.07L280.641%20100.018L280.486%2099.9518L280.331%2099.8782L280.184%2099.7969L280.04%2099.7156L279.896%2099.6197L279.759%2099.5237L279.63%2099.4353L279.509%2099.3246L279.387%2099.1992L279.273%2099.0738L279.166%2098.9478L279.066%2098.8082L278.974%2098.6675L278.878%2098.5279L278.801%2098.3948L278.723%2098.2323L278.653%2098.0774L278.59%2097.9302L278.539%2097.76L278.494%2097.5899L278.454%2097.4285L278.425%2097.2507L278.406%2097.074L278.392%2096.9039ZM285.411%2098.6604H278.417L278.432%2098.601V98.1069L278.425%2098.0327V97.7306L278.417%2097.6641V97.4939L278.414%2097.4503V97.2801L278.406%2097.2365V97.1111L278.402%2097.0587V96.9486L278.392%2096.9039L285.355%2096.6094V96.6748L285.362%2096.7413V96.8602L285.37%2096.9333V97.1253L285.378%2097.1842V97.3096L285.381%2097.3761V97.6346L285.388%2097.7011V98.0774L285.395%2098.144V98.601L285.411%2098.6604ZM278.417%2098.6604H285.411L285.403%2098.8376L285.388%2099.0072L285.37%2099.1992L285.34%2099.3612L285.3%2099.5237L285.252%2099.6862L285.196%2099.8558L285.137%20100.018L285.064%20100.173L284.99%20100.321L284.898%20100.476L284.809%20100.609L284.714%20100.749L284.614%20100.875L284.5%20101.015L284.385%20101.125L284.267%20101.251L284.134%20101.361L284.005%20101.45L283.869%20101.546L283.728%20101.649L283.578%20101.731L283.433%20101.811L283.278%20101.886L283.116%20101.93L282.951%20101.996L282.788%20102.048L282.618%20102.085L282.449%20102.115L282.271%20102.136L282.099%20102.144L281.918%20102.158L281.733%20102.144L281.56%20102.136L281.383%20102.115L281.209%20102.085L281.039%20102.048L280.881%20101.996L280.711%20101.93L280.553%20101.886L280.402%20101.811L280.251%20101.731L280.106%20101.649L279.822%20101.45L279.693%20101.361L279.564%20101.251L279.442%20101.125L279.328%20101.015L279.217%20100.875L279.115%20100.749L279.022%20100.609L278.93%20100.476L278.841%20100.321L278.768%20100.173L278.694%20100.018L278.635%2099.8558L278.58%2099.6862L278.527%2099.5237L278.461%2099.1992L278.443%2099.0072L278.425%2098.8376L278.417%2098.6604ZM151.677%20178.775V171.771L158.268%20171.698L164.76%20171.402L171.166%20170.916L177.459%20170.236L183.648%20169.409L189.704%20168.406L195.643%20167.196L201.456%20165.853L207.117%20164.348L212.606%20162.695L217.946%20160.864L223.121%20158.924L228.107%20156.82L232.925%20154.607L237.531%20152.26L241.935%20149.795L246.118%20147.205L250.091%20144.504L253.827%20141.699L257.338%20138.821L260.591%20135.824L263.608%20132.762L266.345%20129.611L268.824%20126.4L271.029%20123.124L272.958%20119.774L274.611%20116.386L275.975%20112.918L277.034%20109.421L277.797%20105.885L278.269%20102.299L278.417%2098.6604H285.411L285.223%20102.889L284.68%20107.066L283.78%20111.177L282.548%20115.206L280.995%20119.161L279.129%20123.014L276.953%20126.8L274.478%20130.46L271.726%20134.031L268.709%20137.493L265.434%20140.857L261.897%20144.076L258.138%20147.189L254.129%20150.178L249.913%20153.049L245.458%20155.794L240.811%20158.407L235.953%20160.894L230.919%20163.218L225.688%20165.395L220.299%20167.447L214.733%20169.321L208.994%20171.063L203.126%20172.628L197.118%20174.023L190.959%20175.24L184.677%20176.31L178.281%20177.188L171.768%20177.86L165.169%20178.361L158.46%20178.642L151.677%20178.775ZM17.9402%2098.6604H24.9325L25.0846%20102.299L25.5529%20105.885L26.3166%20109.421L27.3785%20112.918L28.7397%20116.372L30.392%20119.774L32.3212%20123.11L34.5229%20126.4L37.0016%20129.611L39.7419%20132.762L42.7554%20135.824L46.0125%20138.821L49.5236%20141.699L53.2566%20144.504L57.2361%20147.205L61.4182%20149.795L65.8185%20152.26L70.4259%20154.607L75.2426%20156.82L80.2299%20158.924L85.4042%20160.864L90.7519%20162.695L96.2369%20164.348L101.899%20165.853L107.711%20167.196L113.65%20168.406L119.709%20169.409L125.899%20170.236L132.192%20170.916L138.598%20171.402L145.09%20171.698L151.677%20171.771V178.775L144.898%20178.642L138.185%20178.361L131.594%20177.86L125.077%20177.188L118.681%20176.31L112.392%20175.24L106.24%20174.023L100.232%20172.628L94.3634%20171.063L88.6167%20169.321L83.0586%20167.447L77.6586%20165.395L72.4281%20163.218L67.3972%20160.894L62.5472%20158.407L57.8924%20155.794L53.4447%20153.049L49.2211%20150.178L45.2117%20147.189L41.4536%20144.076L37.9163%20140.857L34.6412%20137.493L31.6239%20134.031L28.876%20130.46L26.3973%20126.8L24.2212%20123.014L22.3547%20119.161L20.7989%20115.206L19.5702%20111.169L18.6669%20107.066L18.1283%20102.889L17.9402%2098.6604ZM151.677%2018.5385V25.5347L145.09%2025.6231L138.598%2025.9034L132.192%2026.3909L125.899%2027.0693L119.709%2027.9108L113.65%2028.9148L107.711%2030.1173L101.899%2031.461L96.2369%2032.9661L90.7519%2034.6267L85.4042%2036.4569L80.2299%2038.3972L75.2426%2040.4935L70.4259%2042.7147L65.8185%2045.0466L61.4182%2047.5334L57.2361%2050.1166L53.2566%2052.8106L49.5236%2055.6072L46.0125%2058.5002L42.7554%2061.4963L39.7419%2064.5584L37.0016%2067.7094L34.5229%2070.9128L32.3212%2074.1963L30.392%2077.5469L28.7397%2080.934L27.3785%2084.3882L26.3166%2087.9008L25.5529%2091.4357L25.0846%2095.0371L24.9325%2098.6604H17.9402L18.1283%2094.4324L18.6669%2090.2545L19.5702%2086.1448L20.7989%2082.1076L22.3547%2078.1522L24.2212%2074.2999L26.3973%2070.5212L28.876%2066.8609L31.6239%2063.2818L34.6412%2059.8287L37.9163%2056.4634L41.4536%2053.2458L45.2117%2050.1243L49.2211%2047.1352L53.4447%2044.2722L57.8924%2041.5264L62.5472%2038.9066L67.3972%2036.4274L72.4281%2034.1026L77.6586%2031.918L83.0586%2029.8664L88.6167%2027.9921L94.3634%2026.2502L100.232%2024.6938L106.24%2023.2988L112.392%2022.0663L118.681%2021.0111L125.077%2020.1402L131.594%2019.4689L138.185%2018.9595L144.898%2018.664L151.677%2018.5385ZM151.677%2025.5347V18.5385L151.862%2018.5538L152.035%2018.5756L152.212%2018.5832L152.385%2018.6127L152.552%2018.6421L152.714%2018.7087L152.879%2018.7599L153.042%2018.8188L153.19%2018.8854L153.345%2018.9666L153.496%2019.0479L153.631%2019.1439L153.768%2019.2398L153.897%2019.3435L154.03%2019.4536L154.148%2019.579L154.262%2019.6827L154.377%2019.8299L154.477%2019.9411L154.573%2020.0884L154.661%2020.2215L154.749%2020.3763L154.83%2020.5312L154.9%2020.6714L154.959%2020.841L155.015%2021.0111L155.059%2021.1731L155.104%2021.3356L155.129%2021.5057L155.151%2021.6824L155.166%2021.8668L155.173%2022.044L155.166%2022.2212L155.151%2022.4056L155.129%2022.5757L155.104%2022.7524L155.059%2022.9149L155.015%2023.0698L154.959%2023.2323L154.9%2023.409L154.83%2023.5573L154.749%2023.7122L154.661%2023.8453L154.573%2024.0001L154.477%2024.1321L154.377%2024.2652L154.262%2024.3982L154.148%2024.5084L154.03%2024.6273L153.897%2024.7374L153.768%2024.8334L153.631%2024.9294L153.496%2025.033L153.345%2025.1061L153.19%2025.1955L153.042%2025.2621L152.879%2025.321L152.714%2025.3722L152.552%2025.4311L152.385%2025.4682L152.212%2025.4976L152.035%2025.5129L151.862%2025.5195L151.677%2025.5347Z'%20fill='black'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M151.677%2022.0441C152.787%2022.0441%20153.886%2022.0517%20154.982%2022.0665L155.075%2022.0661C156.144%2022.0813%20157.224%2022.1172%20158.29%2022.1401H158.415C159.478%2022.1772%20160.533%2022.2208%20161.588%2022.2655C161.647%2022.2655%20161.706%2022.2655%20161.765%2022.2726C162.801%2022.3168%20163.83%2022.368%20164.86%2022.428C164.937%2022.4346%20165.014%2022.4351%20165.091%2022.4351C166.102%2022.5093%20167.102%2022.5753%20168.109%2022.6494C168.201%2022.6636%20168.308%2022.6636%20168.407%2022.6789C169.362%2022.752%20170.318%2022.8267%20171.27%2022.915C171.399%2022.9227%20171.536%2022.9374%20171.675%2022.9521C172.586%2023.0328%20173.501%2023.1146%20174.401%2023.2106C174.582%2023.2248%20174.748%2023.2471%20174.925%2023.2766C175.803%2023.3649%20176.673%2023.4609%20177.544%2023.5716C177.75%2023.5787%20177.954%2023.6163%20178.16%2023.6458C178.997%2023.7341%20179.83%2023.8448%20180.657%2023.9555C180.911%2024.0002%20181.165%2024.0292%20181.423%2024.0733C182.179%2024.1693%20182.929%2024.2802%20183.682%2024.398C183.991%2024.4427%20184.301%2024.4796%20184.611%2024.5391C185.312%2024.6492%20186.013%2024.7528%20186.71%2024.863C187.075%2024.9219%20187.443%2024.9884%20187.797%2025.0473C188.454%2025.1509%20189.1%2025.2845%20189.748%2025.3876C190.154%2025.4689%20190.56%2025.5354%20190.966%2025.609C191.559%2025.7197%20192.157%2025.8451%20192.748%2025.9558C193.19%2026.0513%20193.629%2026.1325%20194.072%2026.2209C194.595%2026.3245%20195.112%2026.4352%20195.628%2026.5536C196.14%2026.6566%20196.646%2026.7673%20197.155%2026.8775C197.605%2026.9735%20198.055%2027.0694%20198.501%2027.1872C199.077%2027.2985%20199.645%2027.4381%20200.216%2027.5788C200.625%2027.6748%20201.042%2027.7708%20201.448%2027.8744C202.035%2028.0216%20202.617%2028.1612%20203.207%2028.3019C203.572%2028.4121%20203.938%2028.5086%20204.303%2028.6046H204.329C204.657%2023.5351%20206.332%2018.4797%20209.319%2014.0521C208.839%2013.9267%20208.357%2013.7936%20207.881%2013.6605C190.534%209.21053%20171.558%206.74612%20151.677%206.74612C70.2594%206.74612%203.86165%2048.0352%203.86165%2098.66C3.86165%20149.286%2070.2594%20190.568%20151.677%20190.568C233.087%20190.568%20299.489%20149.286%20299.489%2098.66C299.489%2070.9347%20281.648%2050.0944%20259.101%2035.5566C257.486%2034.6481%20255.782%2033.9479%20253.664%2033.3796C248.07%2031.8957%20245.682%2032.8185%20246.069%2035.032C246.981%2040.3158%20260.422%2045.1645%20260.097%2056.301C260.348%2056.5147%20260.587%2056.7214%20260.831%2056.9499C261.174%2057.2602%20261.517%2057.5847%20261.86%2057.9021C262.089%2058.1082%20262.314%2058.3232%20262.546%2058.5512C262.874%2058.8615%20263.206%2059.1858%20263.531%2059.489C263.729%2059.6875%20263.929%2059.8795%20264.121%2060.0867C264.409%2060.3599%20264.693%2060.6479%20264.966%2060.9424C265.228%2061.2227%20265.486%2061.4812%20265.741%2061.7549C266.01%2062.0276%20266.272%2062.3156%20266.533%2062.61C266.787%2062.8903%20267.042%2063.1783%20267.297%2063.452C267.533%2063.7247%20267.758%2063.9838%20267.986%2064.2488C268.245%2064.5585%20268.503%2064.8541%20268.758%2065.1492C268.938%2065.3629%20269.115%2065.5843%20269.288%2065.8134C269.554%2066.1308%20269.827%2066.47%20270.089%2066.7945C270.274%2067.0459%20270.458%2067.2744%20270.642%2067.5252C270.9%2067.8721%20271.155%2068.2118%20271.406%2068.5515C271.564%2068.7659%20271.726%2068.9938%20271.881%2069.2081C272.147%2069.5921%20272.409%2069.9684%20272.674%2070.337C272.785%2070.5213%20272.899%2070.6838%20273.017%2070.8605C273.295%2071.2739%20273.56%2071.6873%20273.826%2072.1006C273.939%2072.285%20274.043%2072.4617%20274.165%2072.6471C274.408%2073.0381%20274.651%2073.4591%20274.895%2073.8572C274.991%2074.035%20275.094%2074.2193%20275.189%2074.3742C275.436%2074.817%20275.684%2075.2446%20275.92%2075.6797C275.986%2075.8275%20276.064%2075.96%20276.13%2076.1007C276.385%2076.573%20276.636%2077.0747%20276.876%2077.5546C276.942%2077.6877%20276.997%2077.8055%20277.056%2077.9385C277.281%2078.4032%20277.509%2078.8831%20277.72%2079.3848C277.771%2079.4873%20277.83%2079.6062%20277.879%2079.724C278.096%2080.2181%20278.299%2080.7133%20278.495%2081.2297C278.539%2081.3257%20278.58%2081.4211%20278.609%2081.5024C278.827%2082.0335%20279.023%2082.58%20279.214%2083.1111C279.247%2083.2147%20279.273%2083.3031%20279.306%2083.3991C279.497%2083.9526%20279.679%2084.5061%20279.852%2085.0526C279.874%2085.1256%20279.885%2085.178%20279.911%2085.2511C280.081%2085.7975%20280.232%2086.3587%20280.379%2086.9193C280.398%2086.9716%20280.412%2087.0305%20280.424%2087.0818C280.575%2087.6577%20280.712%2088.2401%20280.845%2088.8378C280.859%2088.882%20280.87%2088.9567%20280.884%2089.0156C281.01%2089.5985%20281.125%2090.1962%20281.231%2090.7868C281.239%2090.831%20281.246%2090.8899%20281.258%2090.9417C281.356%2091.5318%20281.449%2092.1295%20281.523%2092.7348C281.53%2092.7643%20281.53%2092.7714%20281.542%2092.7937C281.615%2093.4056%20281.685%2094.0267%20281.736%2094.6462C281.736%2094.691%20281.748%2094.7422%20281.752%2094.8011C281.799%2095.4065%20281.84%2096.0336%20281.873%2096.6313C281.873%2096.6755%20281.873%2096.7202%20281.877%2096.7567C281.899%2097.3844%20281.918%2098.0187%20281.918%2098.66C281.918%20140.858%20223.412%20175.277%20151.677%20175.277C79.9457%20175.277%2021.4397%20140.858%2021.4397%2098.66C21.4397%2056.4635%2079.9457%2022.0441%20151.677%2022.0441Z'%20fill='%23FDB913'/%3e%3cpath%20d='M215.32%2043.6221L215.323%2043.6298C215.323%2043.6221%20215.32%2043.6221%20215.32%2043.6221Z'%20fill='black'/%3e%3cpath%20d='M215.287%2043.6078H215.309L215.32%2043.6221C215.313%2043.6221%20215.301%2043.6078%20215.301%2043.6078H215.287Z'%20fill='black'/%3e%3cpath%20d='M241.043%2075.37C241.025%2075.3853%20240.972%2075.3994%20241.043%2075.3853V75.37Z'%20fill='black'/%3e%3cpath%20d='M208.747%20114.859C208.869%20114.888%20208.987%20114.933%20209.113%20114.955C209.057%20114.933%20209.002%20114.918%20208.947%20114.888C208.659%20114.763%20208.364%20114.653%20208.069%20114.549C208.05%20114.563%20208.04%20114.571%20208.036%20114.586C208.024%20114.586%20208.024%20114.586%20208.102%20114.697H208.106C208.106%20114.712%20208.423%20114.785%20208.747%20114.859Z'%20fill='black'/%3e%3cpath%20d='M116.387%20136.305C116.334%20136.334%20116.287%20136.356%20116.242%20136.371C116.299%20136.342%20116.342%20136.319%20116.387%20136.305Z'%20fill='black'/%3e%3cpath%20d='M116.42%20136.289C116.401%20136.289%20116.397%20136.289%20116.39%20136.305C116.401%20136.289%20116.401%20136.289%20116.42%20136.289Z'%20fill='black'/%3e%3cpath%20d='M111.415%20138.866C111.895%20138.621%20112.37%20138.37%20112.827%20138.135C112.326%20138.393%20111.861%20138.637%20111.415%20138.866Z'%20fill='black'/%3e%3cpath%20d='M109.508%20137.884C111.045%20137.087%20112.934%20136.12%20115.192%20134.954C115.243%20134.925%20115.295%20134.895%20115.354%20134.873C114.494%20135.309%20112.005%20136.593%20109.508%20137.884Z'%20fill='black'/%3e%3cpath%20d='M107.962%20138.688C103.555%20140.969%20100.276%20142.644%20107.962%20138.688Z'%20fill='black'/%3e%3cpath%20d='M106.122%20141.588H106.126C106.568%20141.359%20107.058%20141.116%20107.586%20140.836C107.037%20141.131%20106.545%20141.382%20106.122%20141.588Z'%20fill='black'/%3e%3cpath%20d='M97.2808%20148.872H97.295C97.3065%20148.88%2097.295%20148.872%2097.2808%20148.872Z'%20fill='black'/%3e%3cpath%20d='M97.262%20148.857L97.2808%20148.872C97.2732%20148.857%2097.2658%20148.857%2097.262%20148.857Z'%20fill='black'/%3e%3cpath%20d='M76.4747%20135.397C76.5412%20135.448%2076.7216%20135.596%2076.4823%20135.397H76.4747Z'%20fill='black'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M75.9142%20109.745C74.8844%20109.782%2073.8776%20109.863%2072.8528%20109.989L70.7208%20110.387C69.6692%20110.66%2068.6738%20110.955%2067.6479%20111.347L65.7525%20112.276L64.8525%20112.807L64.019%20113.427L63.2444%20114.106L62.5287%20114.852L61.8903%20115.678L61.3556%20116.571L60.932%20117.552L60.6185%20118.579L60.4305%20119.678L60.3972%20120.799L60.4894%20121.973L60.7248%20123.169L61.3556%20125.14C61.7906%20126.21%2062.2703%20127.198%2062.8645%20128.201C63.3295%20128.91%2063.8086%20129.574%2064.3396%20130.253C64.8858%20130.873%2065.4424%20131.456%2066.0474%20132.032C66.664%20132.556%2067.2718%20133.042%2067.9434%20133.5L68.6073%20133.906C70.1451%20134.711%2071.7276%20135.625%2073.3799%20135.766C72.7863%20135.16%2072.6903%20134.784%2072.6129%20134.069C73.9735%20134.851%2075.5931%20134.784%2077.0426%20134.711C76.3966%20134.179%2076.0461%20133.906%2076.0063%20132.983C76.9837%20133.53%2078.7428%20133.559%2079.6352%20133.087C79.2449%20132.54%2078.8093%20132.039%2078.7096%20131.397C80.7903%20131.758%2081.5644%20131.67%2083.1098%20131.331C81.0847%20129.36%2078.4294%20125.294%2080.0637%20123.818C80.4245%20123.604%2080.7494%20123.612%2081.1665%20123.626C83.1278%20123.818%2084.9981%20124.571%2086.8755%20125.169C89.4278%20126.106%2091.508%20127.943%2094.0684%20128.91C91.7222%20129.692%2089.4278%20130.504%2087.2413%20131.655L86.2154%20132.268C84.9872%20133.087%2084.0169%20133.906%2083.0956%20135.05C82.7555%20135.552%2082.4573%20136.032%2082.1913%20136.563C81.9187%20137.242%2081.7154%20137.861%2081.5502%20138.57L81.3981%20139.603C81.288%20141.035%2081.3954%20142.297%2081.7819%20143.706C82.0479%20144.504%2082.387%20145.197%2082.822%20145.935C83.1878%20146.474%2083.5639%20146.976%2083.9804%20147.477C84.8618%20148.467%2085.7727%20149.271%2086.8319%20150.068C88.4504%20151.182%2090.2133%20152.016%2091.9545%20152.939L91.8253%20150.156C93.4743%20151.3%2095.4476%20151.721%2097.3539%20152.318L96.8638%20149.633C98.9517%20150.747%20101.467%20151.204%20103.736%20151.831L101.751%20148.51L106.321%20149.308C105.436%20147.662%20102.71%20144.053%20103.99%20141.95C105.428%20142.245%20106.915%20142.754%20108.339%20143.138C108.453%20141.736%20108.375%20139.876%20108.936%20138.57C110.132%20139.899%20111.717%20139.758%20113.41%20139.913L113.823%20137.434C114.229%20136.371%20115.262%20135.906%20116.224%20135.411C118.504%20134.327%20120.916%20133.706%20123.354%20133.116C126.95%20132.268%20130.605%20131.515%20134.006%20130.032C135.957%20129.169%20137.963%20128.423%20139.716%20127.168L140.756%20126.202L141.062%20125.294L141.017%20124.541L140.708%20123.294C142.353%20122.718%20143.972%20122.025%20145.525%20121.235C148.221%20119.818%20150.81%20118.283%20153.19%20116.372C156.343%20113.715%20159.349%20110.896%20162.337%20108.07C164.561%20106.165%20166.615%20104.077%20168.747%20102.07C168.887%20103.575%20169.138%20104.992%20169.61%20106.446C170.159%20107.915%20171.001%20109.325%20171.827%20110.66L173.099%20112.372L174.368%20113.7C175.91%20115.036%20179.927%20116.519%20181.427%20117.899C177.625%20119.796%20171.358%20118.283%20166.25%20118.291C165.335%20118.291%20164.442%20118.52%20163.568%20118.718C162.638%20118.977%20161.802%20119.294%20160.928%20119.7C160.098%20120.128%20159.367%20120.578%20158.619%20121.132C158.095%20121.559%20157.627%20122.003%20157.158%20122.482C156.715%20122.992%20156.336%20123.501%20155.966%20124.047C155.627%20124.644%20155.355%20125.199%20155.092%20125.826C154.875%20126.475%20154.716%20127.08%20154.579%20127.766C154.503%20128.46%20154.465%20129.109%20154.469%20129.818C154.524%20130.548%20154.632%20131.22%20154.783%20131.936C154.989%20132.711%20155.243%20133.389%20155.539%20134.143C155.848%20134.674%20156.166%20135.19%20156.52%20135.714C157.247%20136.659%20158.01%20137.456%20158.94%20138.231C159.571%20138.718%20160.197%20139.123%20160.895%20139.515C162.033%20140.105%20163.236%20140.548%20164.431%20141.035L164.907%20139.529C166.457%20140.518%20168.112%20141.345%20169.735%20142.215L170.126%20139.891L173.229%20142.112L173.752%20139.374L174.855%20139.817L178.532%20140.438C178.178%20139.139%20177.805%20137.847%20177.448%20136.555C176.935%20134.674%20174.308%20131.84%20175.534%20129.98C178.823%20128.15%20184.872%20127.331%20188.558%20126.962C193.905%20126.416%20199.839%20125.39%20205.244%20124.187C207.169%20123.25%20207.368%20122.645%20208.139%20120.703C208.548%20119.176%20210.204%20117.744%20209.728%20116.276C209.437%20115.715%20207.774%20115.715%20207.397%20115.221C206.759%20114.335%20207.195%20114.394%20207.737%20113.493C208.777%20113.87%20209.817%20114.269%20210.79%20114.8C212.686%20116.46%20215.309%20122.283%20214.228%20124.46C213.656%20127.774%20201.584%20129.073%20198.058%20130.312C197.487%20130.526%20196.94%20130.763%20196.391%20131.028C192.138%20133.382%20191.357%20137.426%20192.301%20141.972C193.629%20146.452%20197.69%20150.127%20201.352%20152.592C201.404%20151.522%20201.563%20150.267%20201.902%20149.337C202.721%20150.304%20204.484%20151.625%20205.483%20152.009C205.608%20150.754%20205.608%20149.927%20205.918%20148.718C207.242%20149.795%20208.519%20150.548%20210.61%20151.226C210.794%20150.082%20211.119%20149.3%20211.517%20148.304C213.288%20148.798%20215.146%20149.647%20217.208%20149.404L215.553%20145.839C215.357%20144.858%20215.265%20143.98%20215.313%20143.005C215.39%20142.09%20215.545%20141.204%20215.792%20140.348C217.316%20136.356%20225.338%20135.19%20228.86%20133.957C233.969%20131.84%20234.219%20129.434%20232.035%20124.756C230.406%20121.575%20226.691%20116.615%20229.546%20112.911C232.619%20106.387%20239.368%20103.465%20243.875%2098.9773C241.209%2097.458%20239.265%2096.6018%20236.097%2096.2026C237.767%2093.989%20241.264%2091.5906%20242.426%2089.8488C239.73%2088.1811%20235.96%2086.6242%20233.157%2086.3733C234.027%2084.3588%20235.588%2083.724%20236.912%2081.4805C235.344%2080.7868%20233.36%2080.6832%20231.497%2081.2149C231.328%2079.9972%20231.342%2079.4213%20231.258%2078.2112C234.695%2077.8938%20238.022%2077.2372%20241.342%2076.2043C249.515%2073.326%20256.32%2067.2307%20257.29%2059.1863C258.736%2047.2684%20248.682%2044.294%20243.684%2036.4346C242.47%2034.0874%20242.986%2032.0958%20244.495%2030.9811C245.823%2030.0142%20247.977%2029.7486%20249.795%2029.8817C255.188%2030.3093%20258.459%2031.9627%20261.649%2034.2423C261.931%2031.1807%20262.056%2029.1286%20261.565%2026.9069C268.02%2027.7336%20273.604%2030.811%20277.879%2034.9807C278.509%2020.6643%20273.379%2010.4211%20256.361%2010.384L260.776%205.97112C252.853%204.09678%20245.273%205.50595%20237.853%207.09999L240.416%202.80541C232.777%202.69416%20222.439%207.38028%20216.873%2013.8966C216.474%2012.9226%20216.073%2011.7496%20215.858%2010.768C211.09%2015.1073%20206.977%2021.2691%20206.888%2028.863C206.715%2043.3201%20219.813%2046.5812%20231.269%2050.8474C241.035%2054.4631%20239.047%2062.4038%20228.576%2064.4036C219.443%2050.8545%20203.698%2047.3043%20187.008%2049.3859C178.038%2050.4117%20169.436%2052.8914%20160.658%2057.4815C155.937%2059.88%20151.353%2063.3407%20147.568%2067.0681C146.643%2067.9974%20145.754%2068.9572%20144.906%2069.9683L144.489%2065.4888C143.23%2066.4552%20139.291%2069.363%20138.498%2070.47L138.31%2068.0269C136.208%2069.5625%20134.529%2070.0348%20132.007%2070.2704L131.959%2069.496C131.834%2068.0269%20131.663%2066.6919%20131.037%2065.3116L130.705%2064.7652C128.747%2062.61%20125.762%2061.6065%20123.151%2060.4264C121.971%2059.88%20120.691%2059.2823%20119.835%2058.2788C119.304%2057.5923%20118.847%2056.8615%20118.342%2056.1602C117.929%2055.6366%20117.523%2055.1862%20117.025%2054.7434C116.113%2054.0355%20115.125%2053.5262%20114.082%2053.0463C113.078%2052.6329%20112.083%2052.2861%20111.035%2051.9981C109.46%2051.6%20107.844%2051.2237%20106.229%2051.0465C104.343%2050.914%20102.47%2050.9434%20100.6%2050.8027L100.368%2050.7809C99.8293%2050.3675%2099.3093%2050.0796%2098.7118%2049.7769C98.1073%2049.5337%2097.5278%2049.327%2096.8971%2049.1645C96.1372%2049.0025%2095.3669%2048.8989%2094.607%2048.7659C93.2311%2048.5815%2091.9365%2048.6186%2090.5638%2048.8618L89.5723%2049.1056L83.9618%2051.9916L83.3131%2052.5369C82.0659%2053.6363%2081.0193%2054.7434%2080.3253%2056.2638C79.0268%2056.8838%2077.7654%2057.5404%2076.522%2058.2712C72.0187%2060.9499%2067.6376%2064.1751%2064.749%2068.6027C62.3553%2072.4845%2061.6625%2075.1114%2061.4477%2079.6356L65.8005%2077.5764C63.5835%2083.0522%2062.8939%2088.5138%2062.8536%2095.3322C63.8495%2093.1552%2064.8193%2091.2656%2066.6116%2090.2327C65.4756%2094.3288%2065.8632%2096.3138%2067.4893%20100.948L70.1708%2097.3838C70.433%2099.804%2071.0119%20102.092%2072.0449%20104.321C72.6162%20105.464%2073.2736%20106.512%2074.0439%20107.531C74.6413%20108.284%2075.2758%20109.007%2075.9142%20109.745Z'%20fill='white'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M76.2382%20129.117C77.8207%20130.371%2080.1043%20130.364%2080.0225%20129.914C78.0639%20127.08%2076.1205%20122.785%2080.0263%20121.752C82.0035%20121.309%2085.6842%20122.77%2087.5136%20123.331C90.6088%20124.372%2093.0242%20126.918%2096.3217%20127.537C97.1699%20127.818%2094.9496%20124.563%2096.0012%20124.423C96.8897%20124.409%2098.3943%20125.205%2099.424%20126.239C99.7184%20125.272%20100.265%20124.571%20101.009%20124.541C101.618%20124.32%20102.463%20125.663%20104.001%20126.172C102.581%20126.851%2099.9882%20128.66%2098.5643%20129.33C94.3113%20131.198%2086.5885%20132.541%2084.1578%20136.998C83.1395%20138.909%2083.0512%20141.514%2083.7817%20143.529C84.7476%20146.001%2087.3702%20148.393%2089.8451%20149.632C89.7606%20148.223%2089.7273%20147.05%2090.5532%20146.437C91.4352%20147.455%2093.2608%20149.086%2094.8575%20149.507C94.6362%20148.149%2094.1717%20146.725%2094.5849%20145.913C95.6545%20146.636%2097.9963%20148.274%2099.5597%20148.651C98.7115%20147.367%2098.7115%20146.407%2098.705%20145.374C99.4164%20146.274%20100.504%20146.297%20102.677%20146.71C101.998%20145.492%20100.095%20141.345%20102.448%20138.776C104.138%20139.899%20104.842%20140.26%20106.384%20140.164C106.51%20138.297%20106.586%20136.659%20108.365%20135.353C109.18%20136.703%20110.05%20137.663%20111.666%20137.626C111.824%20136.172%20112.322%20135.507%20113.178%20134.755C117.969%20131.219%20127.359%20130.917%20133.205%20128.276C134.153%20127.818%20138.845%20126.024%20138.985%20125.021C139.192%20125.641%20139.2%20123.604%20137.783%20122.216C140.096%20121.538%20143.068%20120.357%20144.99%20119.331C147.384%20118.077%20150.297%20116.305%20152.33%20114.564C155.531%20111.819%20157.937%20109.538%20161.02%20106.638C163.543%20104.513%20168.091%2099.7825%20170.753%2097.701C170.425%20100.86%20170.761%20104.055%20171.616%20106.24C175.19%20113.701%20180.339%20112.962%20185.33%20118.077C187.55%20121.036%20166.511%20120.202%20165.966%20120.231C159.013%20121.066%20154.388%20126.741%20157.31%20133.294C158.578%20135.685%20160.688%20137.492%20163.203%20138.437C163.724%20136.91%20163.44%20136.858%20163.9%20136.275C164.782%20137.286%20166.74%20138.408%20168.245%20139.213C168.625%20137.67%20167.755%20137.382%20168.348%20136.334C168.99%20136.998%20170.69%20137.847%20171.879%20138.74C172.214%20137.478%20171.687%20136.681%20172.243%20135.876C172.59%20136.526%20175.106%20137.706%20176.242%20137.765C176.042%20137.042%20170.532%20130.437%20173.589%20128.703C179.023%20126.246%20185.946%20125.205%20192.327%20124.364C197.074%20123.67%20200.766%20124.297%20205.221%20122.032C206.036%20121.575%20208.183%20118.601%20208.172%20117.722C207.91%20116.519%20205.206%20115.959%20205.048%20114.918C204.871%20114.15%20205.195%20113.678%20205.734%20113.037C202.576%20111%20203.185%20109.996%20203.138%20109.811C205.442%20110.815%20209.437%20111.759%20211.916%20113.213C214.487%20115.294%20217.787%20123.264%20215.981%20125.966C214.32%20128.217%20210.079%20129.013%20206.106%20129.596C199.634%20131.722%20192.707%20131.205%20194.093%20140.976C194.562%20143.81%20197.122%20146.68%20199.526%20148.348C199.634%20147.212%20200.069%20146.267%20200.544%20145.374C201.471%20146.437%20202.57%20147.271%20203.661%20148.149C203.953%20146.555%20204.494%20145.743%20204.874%20145.123C205.572%20145.972%20207.39%20147.345%20208.935%20147.876C209.286%20146.821%20209.681%20145.692%20210.138%20145.065C210.872%20145.876%20212.045%20146.297%20213.881%20146.584C213.225%20144.009%20213.118%20142.895%20213.826%20140.068C214.25%20138.231%20216.073%20136.902%20217.703%20135.825C219.351%20134.592%20221.484%20134.179%20223.508%20133.449C225.223%20132.836%20227.167%20132.659%20228.746%20131.877C230.195%20131.072%20231.6%20130.549%20231.398%20128.918C230.044%20125.139%20227.09%20122.216%20226.157%20118.578C225.607%20116.313%20225.349%20112.822%20226.773%20111.139C230.236%20104.786%20234.784%20103.073%20238.911%2099.8785C237.185%2097.5902%20235.37%2098.4617%20231.696%2097.5684C233.795%2094.6601%20236.868%2091.5833%20238.83%2090.2548C236.55%2088.7939%20230.859%2087.4872%20228.566%2087.9529C228.2%2086.4401%20232.526%2084.4251%20233.81%2082.7204C232.268%2082.1668%20230.738%2083.0007%20229.273%2083.1997C229.074%2082.2405%20229.056%2077.4142%20228.901%2076.4325C238.878%2075.2448%20251.274%2072.5732%20254.542%2061.1346C258.607%2048.0212%20245.989%2044.272%20241.308%2036.184C238.981%2030.9067%20243.33%2027.8299%20248.025%2027.5714C253.683%2027.2693%20257.084%2029.0035%20259.2%2030.5599C259.474%2027.9706%20259.175%2025.6529%20258.422%2023.9334C262.203%2024.1325%20269.255%2025.011%20274.821%2028.9151C274.076%2014.1843%20262.992%2011.7493%20251.894%2012.1922C252.99%2010.7383%20254.749%209.09242%20256.235%207.87521C248.619%207.30697%20241.559%207.60146%20234.367%2010.074C234.887%208.51655%20235.499%206.91542%20236.882%205.52806C229.498%206.62748%20220.838%2011.4025%20216.073%2017.771C215.674%2016.8859%20214.943%2015.3797%20214.704%2014.3763C212.878%2016.7676%20209.912%2020.5163%20209.109%2026.1328C207.309%2038.7444%20216.091%2043.659%20225.149%2046.5374C228.746%2047.6962%20235.51%2049.6147%20238.77%2052.9724C241.146%2055.4155%20241.308%2058.5589%20238.764%2061.651C236.233%2064.7142%20229.741%2066.5215%20227.318%2066.8612C221.992%2059.0464%20216.998%2054.2791%20206.921%2052.456C191.404%2049.1643%20173.121%2052.4047%20159.198%2060.6328C154.001%2063.8286%20149.468%2067.2522%20145.47%2072.367C143.426%2073.2374%20142.913%2070.6841%20142.839%2069.2084C139.697%2071.525%20138.642%2073.702%20136.676%2078.964C135.843%2076.6469%20135.924%2076.0933%20136.012%2074.4917C133.571%2076.787%20132.866%2080.5063%20130.517%2082.7422C127.953%2085.5545%20122.554%2089.842%20118.559%2090.1C112.62%2090.6388%20108.165%2088.8604%20107.258%2084.0417C110.522%2086.0933%20114.734%2087.0815%20117.725%2086.787C121.263%2086.8459%20124.505%2085.2371%20126.109%2081.3919C126.928%2079.0447%20128.507%2078.6914%20129.569%2078.0784C130.421%2077.5767%20134.611%2075.097%20134.817%2071.3625C132.9%2072.1009%20131.037%2072.3223%20129.392%2072.5066C129.587%2070.8608%20130.088%2066.7505%20128.916%2065.71C126.183%2063.2745%20122.291%2062.6844%20119.371%2060.5145C117.77%2059.3933%20117.076%2057.1127%20115.476%2056.0132C113.192%2054.4928%20110.781%2053.8657%20108.065%2053.3122C105.65%2052.6556%20101.914%2052.9948%2099.4638%2052.6327C98.8522%2051.8212%2097.0374%2051.1057%2096.0268%2050.965C94.0093%2050.6629%2093.7395%2050.4851%2091.8075%2050.6258C89.5534%2050.8919%2087.1745%2051.9979%2085.5255%2053.2309C83.8482%2054.5888%2082.3207%2055.9685%2081.9223%2057.6656C73.9187%2060.1459%2064.2662%2067.8205%2064.1332%2076.2335C65.7708%2075.1559%2067.4089%2074.8167%2068.5591%2075.1117C67.4857%2078.2409%2064.7563%2084.9415%2064.8484%2089.3397C66.1764%2087.3476%2067.5119%2086.9931%2068.6883%2085.9744C68.3901%2088.8015%2067.7038%2093.1179%2068.3454%2096.5797C69.4634%2094.9775%2070.2708%2094.5129%2071.8456%2093.7527C72.0517%2099.3321%2073.1812%20103.694%2076.4672%20107.391C77.1094%20106.026%2077.7401%20105.199%2079.086%20104.077C80.0225%20107.716%2083.2316%20110.431%2085.5817%20112.535C84.36%20112.786%2084.8141%20112.712%2083.719%20113.14C77.0467%20109.553%2058.8477%20112.298%2062.9459%20123.752C64.1447%20127.582%2067.0916%20131.035%2070.1492%20132.518C69.9317%20131.633%2069.5441%20131.161%2069.6106%20130.268C70.7314%20131.08%2072.0452%20131.98%2073.686%20132.356C73.1147%20130.991%2072.8639%20130.482%2072.9337%20129.234C73.9149%20130.268%2075.2281%20131.286%2076.7845%20131.411C76.6553%20130.394%2076.2382%20130.666%2076.2382%20129.117Z'%20fill='black'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M121.937%2076.9569C122.063%2076.477%20122.011%2076.1149%20122.063%2075.407C120.628%2075.1932%20118.567%2075.8793%20117.186%2076.2632C117.983%2076.5435%20120.351%2077.0965%20121.937%2076.9569Z'%20fill='white'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M122.793%2079.6063C122.749%2079.7459%20123.394%2078.1961%20123.151%2077.5548C122.634%2078.3291%20122.074%2079.2366%20121.355%2079.6063C121.709%2079.6652%20122.679%2079.5834%20122.793%2079.6063Z'%20fill='white'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M120.385%2079.4952C120.934%2079.1997%20121.454%2078.3882%20121.664%2077.9901C121.927%2078.0343%20117.482%2078.5583%20115.616%2077.9312C116.597%2078.9128%20118.57%2079.5618%20120.385%2079.4952Z'%20fill='white'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M126.094%2074.8168C124.361%2075.5912%20124.567%2077.7393%20127.481%2076.9938C129.598%2076.5657%20131.185%2075.2443%20132.637%2073.4218C130.945%2073.894%20128.356%2075.1189%20126.094%2074.8168Z'%20fill='white'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M123.14%2076.4846C123.192%2075.1703%20123.694%2073.6946%20123.159%2072.2042C123.472%2072.1011%20124.848%2072.2778%20125.283%2072.3367C125.183%2073.0599%20124.734%2075.0384%20123.14%2076.4846Z'%20fill='white'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M122.66%2074.145C123.044%2074.3511%20122.86%2072.3001%20122.358%2072.2041C120.532%2072.1305%20117.966%2072.4621%20117.025%2074.3369C117.051%2074.3882%20120.709%2073.0968%20122.66%2074.145Z'%20fill='white'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M99.1029%2063.0901L101.478%2059.9391C102.009%2059.2819%20102.507%2058.9351%20103.304%2058.5959C105.178%2057.8575%20108.682%2058.0724%20111.253%2059.6217C114.228%2062.2273%20109.928%2064.3073%20107.321%2060.1311C107.483%2062.6844%20108.947%2064.0793%20111.496%2064.3302C109.954%2065.1046%20109.95%2066.4407%20111.515%2066.817C112.522%2066.0938%20113.705%2065.9313%20114.41%2066.5737L114.114%2065.1199C115.125%2064.4033%20116.206%2064.5952%20116.708%2065.3631L117.316%2063.4227C121.952%2065.9979%20129.543%2065.8353%20126.246%2071.1857C120.64%2069.2083%20114.734%2071.9536%20112.886%2073.444C112.602%2072.3735%20113.019%2071.5696%20113.697%2070.9348C115.546%2069.4439%20118.74%2067.7173%20114.287%2068.9716C107.556%2071.6362%20109.416%2074.9791%20112.577%2078.5135C114.162%2080.7865%20118.548%2080.9861%20122.096%2080.9195L120.518%2082.5878C119.071%2084.4256%20107.107%2081.6427%20100.578%2077.9158C100.851%2096.9483%20122.524%2097.9305%20132.726%2086.7127L132.406%2089.8714C136.175%2087.377%20137.584%2084.7942%20139.616%2081.0008C139.369%2082.7274%20139.177%2084.0122%20140.014%2085.2959L147.247%2075.6799C154.989%2069.6282%20159.043%2066.2269%20167.448%2062.2928C174.847%2058.8249%20185.643%2055.651%20193.791%2055.4667C203.916%2055.29%20221.488%2059.3561%20224.935%2070.7429C230.723%2070.4626%20245.595%2066.7728%20244.937%2057.6808C244.561%2052.6331%20241.319%2050.1164%20237.369%2047.9622C231.593%2044.8031%20224.138%2043.1354%20220.712%2041.2976C210.253%2035.6822%20212.808%2023.4981%20221.174%2019.6829C219.259%2023.3945%20218.953%2027.5419%20221.243%2031.1139C220.812%2026.0214%20225.873%2016.8559%20235.248%2016.6715C230.041%2020.0068%20227.304%2028.1843%20230.096%2031.9848C230.789%2027.0401%20234.326%2020.0516%20245.244%2022.4353C236.115%2023.7637%20233.456%2032.0955%20237.144%2037.5713C239.719%2041.3936%20244.347%2043.5859%20247.759%2047.6743C250.577%2051.0762%20252.875%2055.3784%20251.828%2060.0351C249.412%2070.7429%20235.109%2072.7798%20225.898%2073.6212C227.389%2080.1299%20226.809%2083.9751%20225.094%2090.174C227.846%2090.0039%20229.432%2090.1958%20230.705%2091.893C230.162%2092.1373%20224.113%2094.6017%20223.169%2098.9415C225.714%2098.5641%20228.064%2098.9633%20230.372%20101.059C225.869%20104.845%20219.045%20113.597%20222.029%20118.977L227.318%20128.541C228.425%20131.448%20211.753%20131.619%20210.89%20137.412C210.499%20139.227%20211.163%20142.57%20211.314%20142.584C210.292%20142.584%20209.119%20142.12%20208.549%20141.153C207.899%20141.972%20207.619%20143.013%20207.43%20144.408C206.165%20143.92%20204.528%20142.09%20204.226%20140.585C203.61%20141.514%20203.159%20142.843%20202.695%20144.216C201.507%20143.44%20200.084%20141.655%20199.7%20140.186C198.689%20141.087%20198.298%20142.459%20197.977%20143.81C195.624%20140.341%20195.672%20137.316%20198.103%20134.674C202.329%20131.013%20217.957%20129.965%20218.426%20127.058C219.968%20122.467%20217.548%20116.918%20215.91%20111.656C210.473%20107.664%20207.826%20108.143%20200.807%20106.062C195.38%20104.291%20188.83%20101.472%20185.614%2096.7934C182.586%2093.5682%20185.157%2084.7942%20188.262%2082.3734C186.779%2081.9677%20185.58%2082.0784%20183.74%2082.6908C162.628%2089.7383%20156.399%20109.103%20141.176%20114.394C140.553%20112.35%20139.977%20110.276%20138.266%20110.026C137.204%20117.147%20135.5%20118.187%20127.245%20119.412C128.031%20119.405%20134.312%20122.784%20134.397%20123.243C133.826%20123.154%20127.507%20123.929%20127.341%20124.046C127.061%20124.017%20130.122%20124.482%20131.07%20125.228C128.356%20128.15%20112.322%20132.246%20110.223%20132.976C106.959%20134.091%20103.636%20135.374%20101.674%20136.695C98.8189%20138.599%2098.6602%20140.282%2099.5237%20143.595C98.3174%20143.397%2097.1813%20142.71%2096.2846%20141.7C95.8349%20141.773%2096.0638%20144.097%2096.5026%20145.065C95.2559%20144.695%2092.6737%20143.213%2092.1247%20141.965C91.9917%20142.821%2092.1978%20144.091%2092.3793%20145.219C90.8339%20144.946%2090.2135%20143.876%2088.8382%20142.216C88.4065%20142.157%2089.0186%20145.027%2088.7237%20144.983C86.1344%20142.562%2086.009%20140.932%2086.9313%20138.733C88.3367%20134.555%20103.499%20130.408%20107.464%20128.674C109.644%20127.663%20112.927%20125.892%20115.203%20123.449C116.715%20120.852%20119.319%20112.8%20113.374%20111.929C111.913%20106.018%20117.759%20109.221%20116.021%20103.989C113.329%20104.461%20109.862%20111.339%20109.781%20113.117C112.142%20114.01%20113.978%20115.339%20111.584%20116.047C109.597%20116.217%20107.848%20116.298%20104.757%20115.347C101.422%20114.195%2098.6782%20112.919%2095.7831%20111.258C90.8595%20108.387%2086.3519%20105.339%2082.9002%20101.775C81.6605%20100.653%2079.9788%2097.9152%2080.2405%2094.8084C79.7128%2095.1923%2077.2821%2097.9152%2077.227%2098.3209C74.4976%2093.9522%2076.3238%2088.1443%2078.0382%2085.8718C77.3077%2085.7606%2073.9481%2087.1997%2072.8563%2087.5613C72.9598%2087.864%2072.5134%2082.7574%2076.1728%2077.5548C75.5524%2077.5548%2072.159%2078.0936%2070.606%2079.6576C71.5207%2074.6835%2073.3065%2072.211%2076.2022%2070.0492C74.3613%2069.7689%2073.2438%2069.8136%2071.838%2069.6282C73.5682%2065.843%2079.3514%2062.7956%2082.9143%2061.8871C84.1349%2063.9016%2088.6463%2066.9795%2090.6126%2065.651C92.7991%2063.7838%2090.3133%2062.6843%2089.1593%2062.5295C88.1486%2062.3746%2087.4956%2061.8358%2087.108%2060.4632C86.4849%2055.7034%2092.8579%2054.4338%2095.311%2055.8288C99.6491%2058.345%2098.0448%2062.2044%2097.3247%2062.1161C96.912%2061.91%2097.2287%2059.7548%2096.882%2059.12C96.1707%2056.9719%2090.9631%2054.316%2089.0224%2060.4408C93.3927%2056.8617%2094.5958%2058.6401%2095.1524%2059.8949C95.3333%2060.6475%2095.0826%2061.3341%2094.9828%2062.0572C94.8498%2062.9134%2095.6321%2063.6136%2096.1854%2063.8285C97.1519%2064.2778%2098.2841%2063.5547%2099.1029%2063.0901Z'%20fill='white'/%3e%3c/svg%3e";
//#endregion
//#region src/assets/logos/lukko.svg
var lukko_default = "data:image/svg+xml,%3csvg%20width='247'%20height='256'%20viewBox='0%200%20247%20256'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M133.89%20119.002C133.972%20126.737%20129.501%20128.763%20128.745%20129.64C128.745%20131.816%20132.978%20176.815%20132.978%20176.815C132.978%20176.815%20129.482%20181.837%20122.28%20181.796C115.346%20181.761%20112.219%20176.975%20111.746%20176.275C111.432%20175.664%20115.812%20129.844%20115.812%20129.844C115.812%20129.844%20107.033%20126.38%20109.729%20116.406C113.204%20103.521%20133.739%20105.457%20133.89%20119.002Z'%20fill='%23004187'/%3e%3cpath%20d='M61.7209%20127.479C61.7209%20127.479%2068.0474%20126.986%2069.1274%20119.097C71.6635%20119.17%2073.7363%20119.17%2073.7363%20119.17V141.925L76.6952%20144.67V144.992L61.9812%20144.997V144.66L65.2589%20141.911L65.2719%20131.138H61.7209V127.479Z'%20fill='%23004187'/%3e%3cpath%20d='M164.542%20137.606C162.645%20133.159%20162.551%20127.164%20164.687%20122.385C167.295%20116.509%20172.519%20115.998%20175.451%20115.998C178.4%20115.998%20182.837%20116.773%20184.671%20120.005C184.449%20121.444%20182.518%20122.027%20181.791%20122.056C180.563%20121.025%20178%20120.433%20176.26%20120.577C173.948%20120.76%20172.021%20122.123%20171.58%20125.215C172.725%20124.504%20173.991%20123.796%20177.919%20123.796C180.811%20123.796%20186.264%20126.605%20185.96%20133.38C185.685%20139.778%20180.729%20144.343%20174.339%20144.343C169.026%20144.343%20166.374%20141.927%20164.542%20137.606ZM171.4%20133.763C171.4%20136.668%20172.944%20139.013%20174.849%20139.013C176.744%20139.013%20178.302%20136.668%20178.302%20133.763C178.302%20130.866%20176.744%20128.518%20174.849%20128.518C172.944%20128.518%20171.4%20130.866%20171.4%20133.763Z'%20fill='%23004187'/%3e%3cpath%20d='M101.225%20124.451C103.15%20129.251%20102.093%20136.467%20100.622%20139.293C99.0003%20142.411%2096.0088%20146.383%2089.9452%20146.383C86.994%20146.383%2080.4412%20144.332%2079.8283%20140.845C80.043%20139.409%2081.5186%20138.871%2082.229%20138.835C83.4574%20139.87%2086.7325%20141.78%2089.7057%20141.422C92.0089%20141.141%2093.8995%20138.066%2093.8696%20135.135C92.3316%20136.172%2091.1644%20137.767%2087.2348%20137.767C84.3409%20137.767%2078.1536%20135.459%2078.5219%20128.33C78.8628%20121.937%2084.0091%20117.793%2090.3863%20117.793C95.7069%20117.793%2099.6144%20120.425%20101.225%20124.451ZM87.1137%20127.464C87.1137%20130.226%2088.6166%20132.459%2090.4787%20132.459C92.3316%20132.459%2093.8397%20130.226%2093.8397%20127.464C93.8397%20124.704%2092.3316%20122.467%2090.4787%20122.467C88.6166%20122.467%2087.1137%20124.704%2087.1137%20127.464Z'%20fill='%23004187'/%3e%3cpath%20d='M159.441%20121.091C161.138%20125.316%20157.35%20128.185%20157.35%20128.185C157.35%20128.185%20162.036%20129.884%20162.107%20134.744C162.194%20140.01%20156.468%20145.087%20150.896%20144.997C146.239%20144.941%20142.493%20141.912%20141.896%20140.01C141.248%20137.899%20142.277%20134.759%20143.075%20134.179C143.873%20133.601%20147.145%20133.858%20147.115%20134.846C147.094%20136.022%20146.579%20139.574%20150.113%20139.653C152.586%20139.701%20153.989%20136.995%20153.989%20135C153.989%20131.417%20151.594%20130.086%20149.124%20130.018C149.124%20128.932%20149.145%20128.728%20149.145%20128.728C149.145%20128.728%20153.009%20127.79%20152.815%20124.461C152.633%20121.312%20148.792%20120.104%20147.754%20122.119C147.561%20122.502%20148.14%20123.671%20148.14%20124.371C148.14%20125.032%20146.093%20126.82%20144.697%20126.626C143.491%20126.465%20141.62%20124.653%20141.819%20122.545C142.014%20120.436%20144.047%20118.526%20145.748%20117.468C147.81%20116.188%20156.555%20113.878%20159.441%20121.091Z'%20fill='%23004187'/%3e%3cpath%20d='M64.7712%20151.753L93.8727%20151.745C93.8727%20151.745%20102.016%20154.19%20102.016%20162.021C102.016%20169.131%2092.6691%20171.362%2092.6691%20171.362C92.6691%20171.362%2095.5916%20172.133%20101.024%20176.363C103.781%20178.506%20108.544%20185.534%20113.404%20188.263C118.797%20191.3%20125.146%20190.823%20125.146%20190.823C125.146%20190.823%20125.151%20194.076%20121.86%20195.874C118.914%20197.489%20114.977%20197.921%20113.162%20198C111.137%20198.088%20106.064%20196.55%2099.9949%20191.266C96.3177%20187.965%2091.8181%20181.075%2088.1721%20177.697C85.2496%20174.988%2083.8287%20173.194%2083.8287%20173.194H80.0188V182.468L84.4702%20192.133C84.4702%20192.133%2084.3115%20192.565%2083.627%20192.645C76.9505%20189.563%2075.1809%20187.421%2070.7724%20183.67C68.749%20181.941%2066.0997%20180.811%2066.0997%20180.811V179.75L68.9273%20177.529V156.977L64.7673%20152.358L64.7712%20151.753ZM79.8639%20156.222V167.528C79.8639%20167.528%2079.8639%20168.527%2083.1534%20168.396C86.4389%20168.272%2088.5794%20166.039%2088.4454%20161.945C88.2671%20156.167%2083.9992%20155.61%2082.2464%20155.666C80.9999%20155.717%2079.8639%20156.222%2079.8639%20156.222Z'%20fill='%23004187'/%3e%3cpath%20d='M136.92%20151.048H158.563V151.853C158.563%20151.853%20154.247%20153.871%20154.042%20156.288V187.793C154.042%20187.793%20160.861%20187.653%20164.883%20184.4C168.361%20181.604%20171.166%20178.861%20172.169%20176.59C170.066%20176.446%20168.92%20175.924%20168.847%20173.671C168.778%20171.528%20172.396%20169.785%20175.476%20169.785C178.707%20169.785%20180.957%20171.458%20180.446%20173.733C179.366%20178.589%20171.385%20187.586%20164.243%20191.872C157.23%20196.072%20139.071%20199.654%20136.637%20198.715V197.839C136.637%20197.839%20142.404%20192.985%20142.225%20189.706C142.106%20187.726%20141.592%20159.211%20141.592%20156.565C141.456%20154.433%20136.92%20151.853%20136.92%20151.853V151.048Z'%20fill='%23004187'/%3e%3cpath%20d='M53.2294%2063.7185C53.2294%2031.2291%2085.3315%200%20121.53%200C157.732%200%20187.121%2029.1147%20188.473%2061.5873C188.749%2068.1427%20188.771%2077.6772%20182.221%2095.0889C200.572%20116.581%20201.68%20143.305%20194.187%20165.441C181.902%20202.395%20140.361%20215.423%20123.014%20215.423C104.234%20215.423%2050.3628%20201.809%2046.2237%20144.055C44.8132%20124.373%2054.0062%20106.769%2061.1238%2096.4917C54.2938%2082.2556%2053.2294%2071.7808%2053.2294%2063.7185ZM73.549%2082.1528C76.1983%2081.9241%20169.357%2082.1528%20169.357%2082.1528C169.357%2082.1528%20174.571%2065.7893%20170.088%2051.3977C162.06%2025.5909%20134.664%2016.0295%20120.335%2016.5048C106.004%2016.984%2078.9282%2024.472%2071.389%2057.2954C68.3182%2070.6567%2073.9121%2081.6621%2073.5946%2082.1387L73.549%2082.1528ZM60.239%20105.839C60.239%20105.839%2054.0335%20114.02%2051.569%20125.204C49.1709%20136.106%2050.2457%20150.394%2051.8124%20158.503C55.215%20176.109%2079.1234%20212.754%20124.251%20211.084C146.595%20210.26%20175.764%20199.021%20188.805%20166.926C194.157%20153.713%20195.151%20136.278%20192.28%20125.022C188.925%20111.908%20182.608%20103.262%20182.608%20103.262C182.608%20103.262%20177.829%20110.183%20169.568%20110.183C162.635%20110.183%20144.668%2096.3402%20139.51%2096.3402C133.804%2096.3402%20127.316%20100.871%20121.691%20101.102C116.058%20101.342%20112.458%2097.2638%20106.411%2097.2638C100.37%2097.2638%2080.1201%20112.479%2071.8327%20112.218C63.8407%20111.964%2060.239%20105.839%2060.239%20105.839Z'%20fill='%23004187'/%3e%3cpath%20d='M41.6501%2072.2115C41.6501%2072.2115%2046.1561%2094.8645%2040.7483%20108.979C37.8909%20116.406%2033.5162%20121.025%2030.163%20127.854C27.5762%20133.063%2027.2014%20138.278%2026.0291%20140.395C22.4195%20146.94%2022.0591%20151.836%2021.9029%20156.661C21.7715%20160.629%2026.2932%20173.301%2028.8683%20179.019C29.3953%20179.019%2029.9028%20178.89%2029.9028%20178.89C29.9028%20178.89%2019.7013%20159.53%2025.5177%20145.12C28.1396%20138.611%2038.4231%20131.569%2042.2981%20129.091C41.5199%20131.326%2038.2929%20138.53%2039.4562%20153.063C40.4608%20165.562%2033.6333%20171.32%2033.5162%20177.527C33.4733%20180.159%2032.7563%20183.702%2035.3275%20188.826C37.4107%20192.986%2041.4015%20196.622%2044.5426%20200.789C47.4626%20204.675%2049.6564%20208.719%2051.4377%20210.776C56.7193%20216.861%2064.9768%20224.138%2064.9768%20224.138L65.5402%20223.682C65.5402%20223.682%2047.3363%20207.235%2044.8224%20198.175C42.302%20189.109%2041.6501%20176.41%2046.419%20170.818C50.0559%20175.297%2056.532%20186.897%2060.6256%20193.915C63.5936%20199.009%2064.2703%20217.83%2069.924%20224.465C75.2134%20230.682%2085.6647%20236.759%2085.6647%20236.759H73.5348C73.5348%20236.759%2060.6516%20229.111%2055.7187%20227.696C50.5529%20226.202%2039.9754%20226.828%2028.0954%20214.784C21.2914%20207.878%2019.9641%20204.72%2018.0318%20199.254C20.5158%20199.795%2032.1929%20203.394%2036.1394%20204.827C45.0397%20208.09%2053.7851%20218.76%2053.7851%20218.76L54.2991%20218.377C54.2991%20218.377%2049.9296%20212.693%2048.2693%20211.288C44.9863%20208.517%2040.3749%20206.169%2039.7737%20205.366C35.252%20199.412%2030.4167%20196.208%2027.7076%20194.532C21.2601%20190.564%206.92473%20182.858%203.31388%20174.665C-0.718567%20165.534%200.60476%20154.051%200.60476%20154.051C0.60476%20154.051%2013.7665%20165.562%2017.1743%20168.195C20.3961%20170.673%2031.8403%20187.454%2031.8403%20187.454L32.4752%20187.221L22.9361%20173.544C22.9361%20173.544%2022.9751%20170.201%2021.0038%20166.102C18.5432%20161.012%203.18636%20138.155%201.76284%20134.302C-0.172059%20129.091%20-2.23838%20110.836%205.76015%20101.151C10.0333%20109.349%2012.8764%20116.039%2015.9577%20124.133C19.0364%20132.208%2020.3402%20150.975%2020.3402%20150.975H21.0038L20.3402%20138.263C20.3402%20138.263%2022.5028%20133.773%2022.4169%20125.864C22.344%20118.318%2022.5965%2094.799%2027.2014%2087.6167C31.9665%2080.1607%2041.6501%2072.2115%2041.6501%2072.2115Z'%20fill='%23004187'/%3e%3cpath%20d='M204.375%2071.8088C204.375%2071.8088%20199.852%2094.4592%20205.273%20108.569C208.129%20116.014%20212.494%20120.621%20215.866%20127.442C218.441%20132.67%20218.827%20137.883%20219.985%20139.99C223.59%20146.535%20223.95%20151.449%20224.119%20156.255C224.242%20160.227%20219.732%20172.899%20217.153%20178.611C216.633%20178.611%20216.113%20178.49%20216.113%20178.49C216.113%20178.49%20226.322%20159.113%20220.504%20144.702C217.869%20138.213%20207.606%20131.172%20203.725%20128.696C204.49%20130.917%20207.736%20138.121%20206.566%20152.658C205.548%20165.157%20212.373%20170.917%20212.494%20177.114C212.541%20179.761%20213.25%20183.304%20210.692%20188.431C208.594%20192.586%20204.619%20196.22%20201.489%20200.385C198.558%20204.283%20196.366%20208.319%20194.578%20210.371C189.294%20216.462%20181.047%20223.731%20181.047%20223.731L180.474%20223.282C180.474%20223.282%20198.683%20206.83%20201.197%20197.767C203.725%20188.707%20204.375%20176.013%20199.594%20170.42C195.962%20174.905%20189.485%20186.493%20185.387%20193.511C182.406%20198.607%20181.751%20217.424%20176.094%20224.07C170.802%20230.272%20160.338%20236.356%20160.338%20236.356H172.483C172.483%20236.356%20185.359%20228.716%20190.301%20227.292C195.472%20225.803%20206.04%20226.422%20217.91%20214.379C224.731%20207.475%20226.051%20204.321%20227.992%20198.854C225.501%20199.399%20213.829%20202.983%20209.883%20204.427C200.982%20207.69%20192.229%20218.343%20192.229%20218.343L191.722%20217.977C191.722%20217.977%20196.098%20212.289%20197.745%20210.888C201.025%20208.112%20205.639%20205.777%20206.239%20204.975C210.76%20199.011%20215.605%20195.802%20218.305%20194.129C224.765%20190.17%20239.09%20182.463%20242.698%20174.273C246.733%20165.131%20245.419%20153.648%20245.419%20153.648C245.419%20153.648%20232.249%20165.157%20228.845%20167.791C225.619%20170.263%20214.166%20187.055%20214.166%20187.055L213.543%20186.82L223.09%20173.149C223.09%20173.149%20223.044%20169.798%20225.017%20165.697C227.47%20160.595%20242.841%20137.748%20244.24%20133.907C246.201%20128.696%20248.255%20110.428%20240.246%20100.746C235.986%20108.95%20233.134%20115.636%20230.049%20123.722C226.981%20131.81%20225.681%20150.575%20225.681%20150.575H225.017L225.681%20137.87C225.681%20137.87%20223.522%20133.377%20223.607%20125.465C223.67%20117.916%20223.432%2094.3963%20218.827%2087.2114C214.06%2079.7619%20204.375%2071.8088%20204.375%2071.8088Z'%20fill='%23004187'/%3e%3cpath%20d='M74.6072%20205.603C74.6072%20205.603%2079.6103%20211.71%2083.618%20213.369C87.6219%20215.028%2097.187%20217.985%20101.769%20220.567C106.351%20223.144%20111.293%20229.891%20114.342%20234.478C117.387%20239.075%20118.847%20241.76%20124.207%20241.564C130.244%20241.337%20133.966%20232.808%20138.552%20226.941C143.133%20221.085%20150.4%20217.601%20154.665%20216.228C158.316%20215.074%20168.683%20210.284%20172.835%20202.995C173.31%20210.284%20171.5%20217.772%20168.563%20224.334C165.15%20231.996%20159.317%20236.115%20151.252%20240.546C144.234%20244.392%20129.539%20246.122%20129.539%20246.122V246.917C129.539%20246.917%20138.909%20246.472%20144.71%20244.768C150.047%20243.203%20153.71%20239.689%20159.676%20238.475C165.83%20237.222%20178.217%20237.538%20181.267%20237.91C184.329%20238.279%20192.864%20242.204%20193.933%20245.446C184.207%20245.174%20181.301%20246.885%20174.49%20249.213C164.882%20252.505%20159.187%20255.253%20152.069%20255.931C145.327%20256.579%20132.724%20252.494%20128.101%20249.782C124.557%20247.709%20120.339%20249.808%20117.779%20251.146C113.401%20253.432%20107.594%20255.253%2097.8702%20255.364C88.6954%20255.47%2074.4055%20250.374%2069.6301%20249.108C64.8572%20247.82%2059.318%20246.472%2055.2842%20247.481C57.0513%20243.491%2063.383%20239.439%2067.0068%20238.702C70.632%20237.969%2087.4202%20237.796%2087.4202%20237.796C87.4202%20237.796%2097.0621%20243.747%20101.529%20245.224C107.713%20247.258%20119.088%20247.378%20119.088%20247.378V246.578C119.088%20246.578%20101.554%20245.784%2092.3973%20239.727C83.2407%20233.65%2078.1829%20225.681%2077.2278%20220.002C76.2688%20214.315%2074.6072%20205.603%2074.6072%20205.603Z'%20fill='%23004187'/%3e%3c/svg%3e";
//#endregion
//#region src/assets/logos/pelicans.svg
var pelicans_default = "data:image/svg+xml,%3csvg%20width='256'%20height='158'%20viewBox='0%200%20256%20158'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M223.124%2092.9879C222.247%2089.1697%20216.594%2087.0625%20206.469%2084.5104C183.962%2078.8372%20148.312%2078.1848%20148.037%2078.1782C148.022%2078.1782%20148.007%2078.1775%20147.992%2078.1775C145.818%2078.1775%20143.551%2081.3973%20142.252%2083.2537C141.694%2084.1822%20131.084%2084.7152%20104.746%2079.7231C68.2291%2073.8624%2032.856%2098.5163%2032.5035%2098.7585L31.5759%2099.3942L32.1699%20100.345C33.0618%20101.772%2054.2479%20135.461%2074.4263%20150.138C79.0421%20154.166%2083.7729%20156.627%2089.2799%20157.474C90.9401%20157.728%2093.0098%20157.558%2094.7224%20157.197C103.024%20155.446%20115.148%20147.928%20124.278%20132.075C127.862%20125.852%20131.717%20120.361%20135.735%20119.548C140.384%20118.609%20144.322%20121.574%20146.438%20123.167C147.655%20124.084%20148.224%20124.063%20149.16%20123.87C150.722%20123.478%20153.051%20121.586%20153.111%20121.648C154.821%20123.414%20157.409%20124.043%20163.426%20123.402C172.396%20122.441%20178.431%20127.948%20180.722%20129.939C181.495%20130.612%20182.598%20131.498%20183.084%20131.631C184.246%20131.951%20185.541%20129.798%20188.674%20126.898C189.795%20125.86%20191.292%20124.541%20193.267%20122.847C192.819%20122.853%20191.284%20122.887%20193.332%20122.285C193.723%20122.17%20194.215%20121.914%20194.749%20121.581C197.474%20119.94%20199.046%20117.952%20201.878%20115.588C201.98%20115.401%20201.926%20115.265%20201.605%20115.205C200.858%20115.064%20198.906%20114.569%20200.132%20114.652C202.21%20114.793%20204.533%20113.369%20204.533%20113.369C204.533%20113.369%20208.084%20110.803%20210.834%20108.141C211.512%20107.447%20211.871%20106.883%20211.332%20106.795C210.443%20106.65%20209.67%20106.457%20209.67%20106.457C209.67%20106.457%20212.544%20106.744%20215.189%20104.497C215.382%20104.332%20223.691%2095.4539%20223.124%2092.9879Z'%20fill='white'/%3e%3cpath%20d='M143.471%2084.4844C143.471%2084.4844%20141.098%2089.0049%20148.389%2096.269C154.245%20102.102%20157.362%20109.035%20155.508%20114.918C153.654%20120.8%20151.25%20122.543%20151.25%20122.543C151.25%20122.543%20149.626%20123.516%20147.688%20123.107C145.749%20122.698%20137.259%20107.732%20120.535%20133.243C109.115%20150.662%2093.7903%20153.331%2091.7864%20153.731C68.5071%20158.377%2034.262%20101.855%2033.2685%20100.499C32.2743%2099.144%2035.2979%2098.3382%2035.2979%2098.3382C35.2979%2098.3382%2053.2216%2086.27%2063.2872%2084.6485C73.3529%2083.0262%2083.3755%2078.2595%2095.7336%2080.1573C108.091%2082.0537%20122.651%2084.3843%20127.763%2084.7185C132.874%2085.0527%20140.561%2086.6543%20142.465%2085.3302C144.369%2084.0054%20143.471%2084.4844%20143.471%2084.4844Z'%20fill='%23F68B1E'/%3e%3cmask%20id='mask0_18_177'%20style='mask-type:luminance'%20maskUnits='userSpaceOnUse'%20x='33'%20y='79'%20width='124'%20height='76'%3e%3cpath%20d='M63.2868%2084.6481C53.2211%2086.2697%2035.2975%2098.3378%2035.2975%2098.3378C35.2975%2098.3378%2032.2745%2099.1436%2033.2681%20100.5C34.2616%20101.854%2068.5073%20158.378%2091.786%20153.731C93.7898%20153.331%20109.114%20150.663%20120.535%20133.243C137.26%20107.732%20145.749%20122.698%20147.687%20123.107C149.627%20123.516%20151.25%20122.543%20151.25%20122.543C151.25%20122.543%20153.654%20120.799%20155.508%20114.917C157.362%20109.035%20154.245%20102.103%20148.389%2096.2686C141.941%2089.8444%20143.051%2085.5653%20143.394%2084.6628C143.209%2084.8042%20142.915%2085.017%20142.464%2085.3298C140.561%2086.6546%20132.874%2085.053%20127.763%2084.7181C122.651%2084.3839%20108.091%2082.054%2095.7331%2080.1569C93.7367%2079.8507%2091.8021%2079.718%2089.9167%2079.718C80.1369%2079.718%2071.726%2083.2887%2063.2868%2084.6481ZM143.471%2084.484C143.471%2084.484%20143.439%2084.5447%20143.394%2084.6628C143.664%2084.4567%20143.706%2084.3999%20143.672%2084.3999C143.628%2084.3999%20143.471%2084.484%20143.471%2084.484Z'%20fill='white'/%3e%3c/mask%3e%3cg%20mask='url(%23mask0_18_177)'%3e%3cpath%20d='M34.2566%2099.8564C34.2566%2099.8564%2085.5522%2080.9965%20124.157%2089.3999C166.712%2098.6631%20144.323%2076.8421%20144.323%2076.8421L120.445%2079.1074L91.4178%2074.9524L56.8041%2082.1925L38.339%2092.3889L30.4413%2099.3395L34.2566%2099.8564Z'%20fill='white'/%3e%3c/g%3e%3cpath%20d='M210.05%20106.825C212.134%20106.257%20215.273%20102.981%20215.273%20102.981C215.273%20102.981%20218.223%2096.6951%20216.435%2099.1598C211.881%20105.435%20199.067%20101.108%20196.829%20101.276C194.166%20101.476%20209.15%20107.07%20210.05%20106.825Z'%20fill='%2320C4F4'/%3e%3cpath%20d='M200.947%20114.68C202.706%20114.198%20205.358%20111.433%20205.358%20111.433C205.358%20111.433%20208.908%20106.629%20206.968%20108.281C200.759%20113.565%20191.693%20110.399%20189.808%20110.03C187.605%20109.598%20200.188%20114.889%20200.947%20114.68Z'%20fill='%2320C4F4'/%3e%3cpath%20d='M191.799%20122.563C193.074%20122.334%20195.133%20120.548%20195.133%20120.548C195.133%20120.548%20199.332%20116.182%20197.898%20117.295C191.468%20122.287%20184.646%20118.572%20183.339%20118.192C181.811%20117.748%20191.249%20122.662%20191.799%20122.563Z'%20fill='%2320C4F4'/%3e%3cpath%20d='M34.1456%2099.9631C34.1456%2099.9631%2084.4067%2075.0844%20137.652%2092.088C145.34%2094.5428%20145.958%20107.996%20144.624%20110.154C144.624%20110.154%20141.17%20100.108%20130.823%2095.6681C96.4318%2080.9097%2034.1456%2099.9631%2034.1456%2099.9631Z'%20fill='%23A25C0A'/%3e%3cpath%20d='M148.901%2084.9854C149.751%2085.3262%20183.043%2086.6883%20185.106%2087.6328C185.667%2087.8903%20185.025%2088.2539%20183.698%2088.6834C181.43%2089.4185%20173.25%2093.0172%20170.574%2093.7523C167.898%2094.4867%20164.69%2094.5708%20161.532%2092.2288C157.05%2088.9049%20153.436%2085.7831%20154.004%2086.196C154.572%2086.6096%20163.992%2092.7677%20166.817%2092.4596C173.187%2091.7652%20175.993%2088.2932%20178.08%2088.4226C180.169%2088.5514%20152.514%2087.9944%20151.07%2086.9445C149.627%2085.8939%20148.901%2084.9854%20148.901%2084.9854Z'%20fill='%2300244C'/%3e%3cpath%20d='M164.542%2088.7609C163.1%2089.2472%20160.42%2088.5448%20160.42%2088.5448C160.42%2088.5448%20161.597%2090.3238%20164.185%2090.3684C166.774%2090.4138%20167.318%2086.9892%20167.318%2086.9892C167.318%2086.9892%20166.16%2088.2139%20164.542%2088.7609Z'%20fill='%2300244C'/%3e%3cpath%20d='M157.608%20102.296C157.608%20102.296%20162.764%20108.966%20161.781%20114.023C161.308%20116.461%20160.721%20117.01%20161.846%20117.119C162.971%20117.228%20170.762%20116.538%20176.104%20118.948C180.198%20120.795%20175.38%20117.224%20169.426%20116.326C164.634%20115.604%20164.463%20115.13%20164.373%20113.37C163.966%20105.293%20157.013%20101.924%20157.608%20102.296Z'%20fill='%2320C4F4'/%3e%3cpath%20d='M141.06%20125.412C140.284%20124.634%20139.349%20124.245%20138.256%20124.245C137.145%20124.245%20136.198%20124.634%20135.416%20125.412C134.633%20126.19%20134.241%20127.124%20134.241%20128.215C134.241%20129.306%20134.633%20130.241%20135.418%20131.021C136.203%20131.801%20137.145%20132.191%20138.245%20132.191C139.337%20132.191%20140.274%20131.801%20141.055%20131.021C141.835%20130.241%20142.226%20129.307%20142.226%20128.221C142.226%20127.126%20141.837%20126.19%20141.06%20125.412ZM140.545%20130.578C139.902%20131.229%20139.133%20131.555%20138.239%20131.555C137.339%20131.555%20136.566%20131.229%20135.922%20130.578C135.278%20129.926%20134.956%20129.139%20134.956%20128.215C134.956%20127.3%20135.278%20126.515%20135.919%20125.862C136.561%20125.208%20137.339%20124.882%20138.251%20124.882C139.144%20124.882%20139.911%20125.209%20140.551%20125.864C141.191%20126.519%20141.511%20127.303%20141.511%20128.215C141.511%20129.139%20141.189%20129.926%20140.545%20130.578ZM139.394%20128.494C139.964%20128.26%20140.25%20127.858%20140.25%20127.288C140.25%20126.89%20140.106%20126.564%20139.819%20126.311C139.532%20126.058%20139.095%20125.932%20138.51%20125.932H136.37V130.505H137.355V128.656H138.459L139.208%20130.505H140.244L139.394%20128.494ZM137.355%20126.651H138.442C138.968%20126.651%20139.23%20126.86%20139.23%20127.277C139.23%20127.713%20138.943%20127.931%20138.369%20127.931H137.355V126.651Z'%20fill='%2300244C'/%3e%3cpath%20d='M223.129%2092.984C222.251%2089.1658%20216.598%2087.0586%20206.474%2084.5065C183.966%2078.8333%20148.316%2078.1809%20148.041%2078.1743C148.026%2078.1736%20148.011%2078.1736%20147.996%2078.1736C145.822%2078.1736%20143.556%2081.3934%20142.257%2083.2498C141.699%2084.1783%20131.088%2084.7113%20104.75%2079.7191C68.2335%2073.8585%2032.8604%2098.5124%2032.5079%2098.7546L31.5803%2099.3903L32.1743%20100.341C33.0662%20101.768%2054.2523%20135.457%2074.4314%20150.134C79.0465%20154.163%2083.7773%20156.623%2089.2843%20157.47C90.9445%20157.725%2093.0142%20157.554%2094.7268%20157.193C103.029%20155.443%20115.152%20147.924%20124.282%20132.071C127.867%20125.848%20131.721%20120.357%20135.739%20119.545C140.388%20118.605%20144.326%20121.57%20146.442%20123.163C147.66%20124.08%20148.229%20124.059%20149.164%20123.866C150.726%20123.475%20153.055%20121.582%20153.115%20121.644C154.825%20123.41%20157.414%20124.039%20163.43%20123.398C172.401%20122.437%20178.435%20127.944%20180.726%20129.935C181.499%20130.608%20182.602%20131.494%20183.089%20131.627C184.25%20131.947%20185.546%20129.794%20188.678%20126.894C189.799%20125.857%20191.296%20124.537%20193.271%20122.843C192.823%20122.849%20191.288%20122.884%20193.337%20122.281C193.727%20122.166%20194.219%20121.91%20194.754%20121.577C197.479%20119.937%20199.051%20117.948%20201.882%20115.584C201.985%20115.397%20201.93%20115.261%20201.61%20115.201C200.862%20115.06%20198.911%20114.565%20200.136%20114.648C202.214%20114.789%20204.537%20113.365%20204.537%20113.365C204.537%20113.365%20208.089%20110.799%20210.838%20108.137C211.516%20107.443%20211.876%20106.879%20211.337%20106.791C210.447%20106.646%20209.675%20106.454%20209.675%20106.454C209.675%20106.454%20212.548%20106.74%20215.193%20104.493C215.386%20104.328%20223.696%2095.45%20223.129%2092.984ZM141.488%2084.3651C141.486%2084.3678%20141.484%2084.3704%20141.482%2084.3738ZM142.748%2086.2342C142.577%2088.4861%20143.606%2092.477%20150.056%2098.6705C158.565%20106.842%20153.825%20116.452%20152.783%20118.304C152.783%20118.304%20149.989%20122.182%20148.661%20121.485C148.436%20121.329%20148.135%20121.103%20147.876%20120.907C145.633%20119.218%20140.965%20115.703%20135.265%20116.857C130.549%20117.811%20126.161%20121.761%20122.224%20128.598C116.754%20138.094%20106.142%20150.076%2094.2338%20152.586C87.8435%20153.933%2081.6517%20152.471%2075.8332%20148.239C67.6597%20142.294%2057.8739%20131.924%2047.5338%20118.25C41.2115%20109.889%2035.7387%20102.487%2034.1008%2099.9399C39.9085%2096.2471%2072.0804%2077.6266%20104.371%2082.8082C119.55%2085.2443%20130.582%2086.5563%20137.161%2086.7091C140.499%2086.7885%20142.013%2086.539%20142.748%2086.2342ZM210.894%20103.745C205.804%20104.656%20197.467%20101.096%20195.649%20101.083C193.443%20101.069%20202.968%20105.716%20206.852%20107.231C206.678%20108.246%20204.149%20111.63%20200.299%20112.744C195.97%20113.23%20189.066%20109.363%20187.514%20109.186C185.542%20108.962%20194.329%20114.406%20196.937%20115.632C196.548%20116.429%20195.074%20119.322%20190.847%20121.005C187.886%20120.974%20183.584%20118.084%20182.563%20117.884C181.159%20117.609%20187.361%20122.055%20188.8%20122.861C187.815%20123.761%20186.977%20124.536%20186.285%20125.175C184.97%20126.393%20183.961%20127.328%20183.469%20127.68C183.29%20127.533%20183.052%20127.327%20182.834%20127.137C180.31%20124.943%20174.403%20119.807%20164.395%20120.874C158.577%20121.494%20156.172%20120.79%20155.214%20120.253C154.947%20118.843%20161.289%20107.377%20151.48%2098.6118C144.947%2092.7732%20143.688%2088.0152%20143.468%2085.6585L143.468%2085.6572C145.13%2083.2465%20147.284%2080.9879%20147.984%2080.9091C148.256%2080.9152%20176.227%2080.7117%20202.442%2087.5569C210.969%2089.7061%20217.355%2091.7953%20217.954%2094.4021C218.497%2096.017%20215.162%20101.786%20210.894%20103.745Z'%20fill='%2300244C'/%3e%3cpath%20d='M26.6622%2083.7039L21.3367%2073.2073L23.9251%2071.9179L7.65418%2038.7832C5.05974%2038.1255%202.5339%2036.131%201.5646%2034.2199L0%2031.1335L3.06867%2029.4979C6.27792%2027.787%209.57798%2026.166%2012.8767%2024.6805C15.2458%2023.6133%2018.8371%2022.1091%2024.883%2019.651C25.2045%2019.5203%2025.5065%2019.3955%2025.7877%2019.2795C26.2909%2019.0714%2026.7321%2018.8899%2027.1048%2018.7465L27.2427%2018.6938C29.0925%2017.9834%2031.1226%2017.916%2033.1156%2018.499L33.421%2018.6031C35.3233%2019.3509%2036.6787%2020.6883%2037.3386%2022.4713L43.1423%2038.1201C43.3367%2038.6444%2043.5688%2039.2374%2043.8244%2039.8911C44.456%2041.5067%2045.2423%2043.5172%2045.995%2045.8198C46.287%2046.7096%2046.324%2047.7049%2046.1107%2048.9482C45.9735%2049.738%2045.6183%2050.5311%2044.9221%2051.6051L44.7587%2051.8359C44.1795%2052.591%2043.4484%2053.2807%2042.586%2053.885L42.5826%2053.881C42.3546%2054.0431%2042.0977%2054.1912%2041.8104%2054.3219C41.6517%2054.394%2041.4115%2054.4974%2041.0907%2054.6321C40.5317%2054.8656%2039.6909%2055.2091%2038.5736%2055.666L36.6767%2056.4398C35.585%2056.882%2033.8058%2057.6045%2031.401%2058.643L35.1134%2066.6702L37.2666%2065.719L42.1084%2076.4678L38.879%2077.9519C37.4523%2078.6357%2036.1446%2079.2593%2034.9574%2079.8137L33.6329%2080.43C32.5203%2080.9476%2031.2504%2081.538%2029.8257%2082.2097L26.6622%2083.7039ZM21.0616%2034.3813C22.0908%2036.6039%2023.0634%2038.6998%2024.0361%2040.7963C25.0215%2042.9202%2026.007%2045.0447%2027.0516%2047.3C27.0927%2047.2826%2027.1337%2047.2666%2027.1741%2047.2499C27.5144%2047.1105%2027.8245%2046.9845%2028.1434%2046.8477C29.5532%2046.244%2030.4566%2045.8678%2031.3365%2045.5136C30.4317%2043.2484%2029.5721%2041.1038%2028.7138%2038.9613C27.8359%2036.772%2026.9595%2034.5848%2026.0359%2032.2715C24.3529%2032.9565%2022.7924%2033.6182%2021.0616%2034.3813Z'%20fill='%2300244C'/%3e%3cpath%20d='M51.4641%2072.9029L47.5445%2061.882L50.9764%2060.7274C51.5018%2060.5513%2051.9968%2060.3858%2052.4623%2060.2317L47.4591%2045.0545C45.2723%2038.4208%2043.0693%2031.7923%2040.863%2025.1646C37.8818%2024.4522%2035.4124%2021.9274%2034.5864%2019.6028L33.3925%2016.2416L36.786%2015.0689C41.5034%2013.4206%2044.9117%2012.4794%2049.2268%2011.2868C50.0381%2011.0626%2050.8809%2010.8305%2051.7695%2010.5824C56.1707%209.35568%2059.9463%208.49386%2062.4029%207.95423L64.0468%207.59202L65.376%208.6166C65.7063%208.87141%2066.5451%209.51777%2066.913%2010.6758C67.2837%2011.7644%2067.6146%2012.929%2067.8971%2014.137C68.0855%2014.9442%2068.2536%2015.6559%2068.3989%2016.2683C68.853%2018.19%2068.9996%2018.8184%2069.0575%2019.2619C69.0662%2019.3273%2069.0736%2019.3907%2069.079%2019.4507L69.8674%2022.6052L66.35%2023.4336C64.6321%2023.8379%2063.7933%2024.044%2062.0733%2024.4802L57.4756%2025.6629L56.2696%2021.0776C55.3817%2021.3178%2054.5503%2021.5499%2053.6657%2021.8034L57.2039%2033.4386C57.9539%2033.2232%2058.6535%2033.0257%2059.3329%2032.8383L58.8862%2030.9272L62.4089%2029.9687L69.8404%2028.2657L70.5999%2031.7296C70.9416%2033.007%2071.2544%2034.1904%2071.5288%2035.2643L71.845%2036.5043C72.0986%2037.5022%2072.3871%2038.6382%2072.7194%2039.9129L73.5959%2043.2795L62.8603%2046.2685L62.1802%2043.8738C61.6502%2044.0206%2061.104%2044.1747%2060.5201%2044.3428L64.3247%2056.8532C64.7478%2056.7331%2065.1635%2056.617%2065.5879%2056.5003L64.3247%2051.6989L67.7895%2050.8024C69.716%2050.3041%2070.7189%2050.0567%2072.6656%2049.5977L76.1453%2048.7773L77.2235%2053.2558C77.2639%2053.4266%2077.3271%2053.6674%2077.4079%2053.9769C77.7005%2055.1002%2078.1902%2056.9806%2078.7357%2059.572C78.7787%2059.7768%2078.8117%2059.9482%2078.8359%2060.085C78.9267%2060.3658%2078.9947%2060.6473%2079.0613%2060.9248L79.103%2061.1009C79.5691%2063.0347%2078.3953%2064.9304%2076.4271%2065.4207L75.7067%2065.5908C74.4213%2065.8943%2073.8777%2066.0223%2073.5414%2066.0857C71.101%2066.7174%2068.7279%2067.3684%2066.0877%2068.1322C61.5203%2069.4523%2059.3127%2070.1567%2054.8408%2071.7216L51.4641%2072.9029Z'%20fill='%2300244C'/%3e%3cpath%20d='M75.7706%2065.5654L73.1822%2054.0789L76.6753%2053.3044C77.3292%2053.1597%2077.8841%2053.0383%2078.4034%2052.9262L71.2537%2017.2321C67.9355%2016.3416%2065.8839%2013.494%2065.3094%2010.7798L64.5742%207.30447L68.0788%206.5754C73.5044%205.44676%2080.5398%204.27343%2084.2508%203.67443L87.7856%203.10477L89.5958%2014.1403L86.3428%2015.3537L85.9917%2015.4104C85.5941%2015.4751%2084.9921%2015.5758%2084.3268%2015.6872L90.5832%2051.1479C90.779%2051.1172%2090.9734%2051.0872%2091.1684%2051.0572L90.4716%2046.1064L94.0172%2045.6148C96.0593%2045.3319%2097.1275%2045.1965%2099.2155%2044.9551L102.772%2044.5448L104.663%2060.6573L101.106%2061.0668C96.8477%2061.5578%2094.7746%2061.8493%2090.5456%2062.5517C86.8069%2063.1714%2083.1214%2063.8978%2079.2779%2064.7696L75.7706%2065.5654Z'%20fill='%2300244C'/%3e%3cpath%20d='M101.662%2061.002L101.001%2055.2001C100.936%2054.6271%20100.853%2053.7913%20100.755%2052.692L100.446%2049.24L103.319%2048.9165L99.6501%2012.4306C96.7395%2011.1199%2095.1291%208.16752%2094.8708%205.8949L94.4349%202.15146L98.0007%201.75123C103.348%201.15023%20106.5%200.910089%20111.977%200.566562L115.55%200.342431L116.302%2012.1071L112.768%2012.3285L115.523%2047.8479L118.571%2047.6565L119.325%2059.4585L115.751%2059.6819C111.515%2059.9481%20109.448%2060.1282%20105.222%2060.6025L101.662%2061.002Z'%20fill='%2300244C'/%3e%3cpath%20d='M138.268%2059.8726C137.736%2059.8572%20137.126%2059.8192%20136.424%2059.7585C136.042%2059.7258%20135.653%2059.6865%20135.264%2059.6465C134.912%2059.6104%20134.559%2059.5737%20134.21%2059.5437C132.712%2059.415%20131.154%2059.3456%20129.646%2059.2782L124.583%2059.0341H124.546C124.433%2059.0308%20124.321%2059.0248%20124.209%2059.0161L123.788%2058.9968L123.73%2058.9654C122.262%2058.7613%20120.888%2058.1296%20119.717%2057.1124L119.622%2057.0276C117.685%2055.2206%20117.298%2053.2842%20117.315%2051.9781L117.88%208.7137C117.886%208.29747%20117.903%207.78584%20117.931%207.18684C117.913%207.02008%20117.904%206.84998%20117.907%206.67788C117.925%205.30177%20118.45%203.28263%20120.853%201.48228L121.205%201.24949C121.606%201.01735%20122.027%200.803903%20122.456%200.61513L122.554%200.573103C123.67%200.121515%20124.839%200.047474%20126.039%200.00678439C126.39%20-0.00522238%20127.095%20-0.0032228%20128.026%200.0281282C130.811%200.129519%20132.252%200.200896%20135.035%200.372994C135.379%200.393672%20135.869%200.424355%20136.502%200.467046C137.346%200.523745%20138.199%200.667823%20139.058%200.897953L139.093%200.519744L152.403%201.78846L149.795%2024.6614L146.237%2024.2611C143.933%2024.0017%20142.813%2023.8889%20140.531%2023.6842L136.927%2023.362L137.291%2019.7906C137.562%2017.1338%20137.747%2015.2787%20137.843%2014.2241C137.929%2013.2849%20137.971%2012.5685%20137.989%2012.0636L137.725%2012.0262C136.569%2011.8221%20135.294%2011.6814%20133.937%2011.606C132.836%2011.5446%20131.839%2011.4986%20130.958%2011.4619L129.644%2047.9472C130.888%2048.0106%20132.104%2048.0873%20133.748%2048.2013C134.069%2048.224%20134.398%2048.248%20134.734%2048.2747L135.887%2035.6516L148.395%2036.917L146.66%2052.0335C146.341%2054.8171%20145.623%2056.5854%20144.342%2057.718C143.242%2058.7966%20141.945%2059.479%20140.488%2059.7458C139.927%2059.8579%20139.22%2059.9006%20138.268%2059.8726Z'%20fill='%2300244C'/%3e%3cpath%20d='M175.378%2065.4429L171.89%2064.6445C169.244%2064.0395%20167.951%2063.7647%20165.3%2063.245C164.842%2063.1556%20164.272%2063.0402%20163.592%2062.9028L158.874%2061.953L160.849%2051.3236L162.352%2051.5037C162.354%2051.425%20162.347%2050.9721%20162.348%2050.89C160.608%2050.5839%20159.316%2050.4011%20157.57%2050.147C157.545%2050.2243%20157.345%2050.6933%20157.321%2050.77L159.225%2051.0762L157.707%2061.8676L154.161%2061.3646C150.311%2060.8183%20148.423%2060.5935%20144.543%2060.22L140.979%2059.8765L142.086%2048.5767L145.485%2048.9049C145.55%2048.7061%20145.613%2048.5034%20145.675%2048.2979C147.178%2043.1704%20148.926%2037.9934%20150.446%2033.5443C152.888%2026.5396%20155.455%2019.481%20158.096%2012.5077C156.115%2010.5146%20155.325%207.56158%20155.62%205.48708L156.099%202.02713C156.099%202.02713%20170.014%203.87818%20170.708%203.99824C173.66%204.48985%20173.765%207.42417%20173.788%208.60751C174.287%2018.0715%20174.501%2028.0865%20174.481%2041.0678C174.477%2045.0908%20174.445%2049.2031%20174.382%2053.5642C174.409%2053.5709%20174.436%2053.5776%20174.464%2053.5829L177.953%2054.382L175.378%2065.4429ZM160.969%2039.2468C161.507%2039.3302%20162.037%2039.4156%20162.576%2039.505C162.848%2036.4893%20163.067%2033.8884%20163.316%2030.4198C163.067%2031.4104%20161.505%2037.0469%20160.969%2039.2468ZM169.459%2010.9902C169.473%2010.9929%20169.486%2010.9955%20169.5%2010.9975C169.486%2010.9949%20169.473%2010.9929%20169.459%2010.9902Z'%20fill='%2300244C'/%3e%3cpath%20d='M201.508%2073.1646L198.289%2072.0046C197.054%2071.575%20196.436%2071.3649%20195.195%2070.954L192.991%2070.2223C192.991%2070.2223%20192.803%2067.931%20192.627%2065.1961C192.33%2059.5663%20191.864%2053.3674%20191.206%2046.2941C191.16%2045.8692%20191.114%2045.443%20191.067%2045.0174L188.04%2056.4965L190.743%2057.2329L187.604%2068.5653L184.201%2067.7122C182.689%2067.3327%20181.446%2067.0318%20180.474%2066.797C179.962%2066.6736%20179.524%2066.5676%20179.159%2066.4775C178.289%2066.2627%20177.295%2066.0106%20176.179%2065.7277L171.239%2064.4784L173.852%2053.0372L176.464%2053.6242L185.072%2017.8974C183.128%2015.7936%20182.213%2012.5751%20182.765%2010.1604L183.556%206.69841L187.047%207.48219C190.214%208.19259%20192.515%208.71622%20195.545%209.48799L197.761%2010.0523L198.175%2012.2836C199.107%2017.2911%20199.54%2019.8819%20200.283%2024.884C200.866%2028.5047%20201.345%2032.1081%20201.75%2035.6054L205.784%2023.3832C204.183%2021.1119%20203.982%2017.8267%20204.691%2015.5954L205.765%2012.2075L209.182%2013.2741C214.094%2014.809%20217.068%2015.8763%20221.514%2017.4918L224.876%2018.7139L220.78%2029.8021L217.121%2028.6021L201.508%2073.1646ZM191.205%2023.0023L192.822%2023.4239C192.583%2021.8616%20192.367%2020.5222%20192.134%2019.1474L191.205%2023.0023Z'%20fill='%2300244C'/%3e%3cpath%20d='M224.906%2082.7349C223.758%2082.7349%20222.385%2082.456%20220.819%2081.6449C220.094%2081.2694%20215.028%2078.8847%20215.028%2078.8847C214.238%2078.5225%20213.52%2078.1409%20212.874%2077.7394L212.794%2077.9228L209.505%2076.5247C207.723%2075.7669%20206.841%2075.4034%20205.009%2074.673L201.689%2073.3489L210.271%2052.1636L213.594%2053.4884C215.592%2054.2848%20216.624%2054.709%20218.612%2055.5549L221.929%2056.9643L220.481%2060.2428C219.085%2063.4019%20218.264%2065.269%20218.015%2065.8447C217.714%2066.5404%20217.51%2067.0373%20217.371%2067.3869C218.097%2067.8204%20219.019%2068.292%20220.112%2068.789C220.889%2069.1432%20221.563%2069.452%20222.138%2069.7175L225.429%2063.1371C223.756%2057.6374%20221.738%2051.9295%20219.419%2046.1495C218.002%2042.803%20217.369%2041.1367%20217.084%2040.0061L217.065%2039.9274C216.624%2038.776%20217.601%2035.8744%20217.601%2035.8744C217.811%2035.3968%20220.663%2027.6284%20220.663%2027.6284C220.722%2027.4857%20220.784%2027.3276%20220.852%2027.1555C221.117%2026.4818%20221.481%2025.5592%20221.973%2024.5567C222.525%2023.4387%20223.5%2022.4828%20224.795%2021.7885L225.116%2021.637C226.523%2021.0534%20228.025%2020.8699%20229.581%2021.0887C230.428%2021.1508%20231.489%2021.5336%20233.788%2022.5202L234.54%2022.8444C235.876%2023.422%20237.27%2024.0511%20238.684%2024.7148C239.183%2024.9169%20240.119%2025.3004%20241.318%2025.8441C242.194%2026.241%20243.032%2026.7332%20243.825%2027.3149L243.985%2026.9941L247.197%2028.5803C249.436%2029.6862%20250.595%2030.2752%20252.832%2031.4446L256%2033.1002L245.273%2053.2722L242.043%2051.6146C241.677%2051.4239%20240.817%2050.9823%20239.899%2050.5107L237.145%2049.0925C236.015%2048.5029%20234.172%2046.7492%20235.291%2044.3285L235.341%2044.2238C235.426%2044.0557%20235.565%2043.7909%20235.754%2043.4313C236.241%2042.5082%20237.054%2040.9626%20238.129%2038.776C238.411%2038.2024%20238.63%2037.7255%20238.798%2037.3446L238.629%2037.2465C237.468%2036.5548%20236.218%2035.9098%20234.912%2035.3294C234.268%2035.0426%20233.366%2034.6457%20232.217%2034.1454L229.945%2039.3791C229.935%2039.4011%20229.922%2039.4304%20229.907%2039.4684C232.298%2045.2824%20234.471%2051.2911%20236.366%2057.3299C237.35%2060.3342%20237.811%2061.8584%20237.841%2062.9277C238.037%2064.8961%20237.651%2066.8085%20236.693%2068.6176L231.395%2078.6205C230.064%2081.1366%20228.34%2082.0752%20227.01%2082.4007C226.431%2082.5928%20225.726%2082.7349%20224.906%2082.7349Z'%20fill='%2300244C'/%3e%3cpath%20d='M250.605%2034.5404C248.749%2033.5718%20247.659%2033.0182%20245.788%2032.0917C245.751%2032.165%20245.714%2032.2377%20245.678%2032.3105C245.494%2032.6753%20245.256%2033.1863%20244.96%2033.844L244.557%2034.7432L244.198%2033.8253L243.941%2033.1723C243.532%2032.2958%20243.217%2031.8789%20243.028%2031.6874C242.012%2030.6082%20240.881%2029.7837%20239.659%2029.2294C238.516%2028.7111%20237.64%2028.3536%20237.083%2028.1274C235.627%2027.443%20234.254%2026.824%20232.946%2026.2584L232.203%2025.9382C229.764%2024.8929%20229.338%2024.8316%20229.297%2024.8282C228.303%2024.6635%20227.444%2024.7475%20226.658%2025.0737C226.136%2025.3559%20225.745%2025.7081%20225.564%2026.0749C225.141%2026.9361%20224.824%2027.7412%20224.572%2028.3796L224.367%2028.8945L221.968%2034.7905C221.596%2035.705%20221.281%2036.4201%20221.06%2036.9217L220.948%2037.1752C220.791%2037.5341%20220.796%2038.1091%20220.962%2038.8388C221.185%2039.724%20221.809%2041.3462%20223.114%2044.4306C225.676%2050.8122%20227.877%2057.1018%20229.659%2063.1319L229.704%2063.2859L229.632%2063.4294L225.789%2071.115L224.147%2074.3976L223.964%2074.7644L223.593%2074.5823L222.699%2074.1447C222.277%2073.9393%20220.858%2073.2696%20218.447%2072.1723C217.199%2071.6046%20216.128%2071.0537%20215.265%2070.5347C214.456%2070.1818%20213.837%2069.5942%20213.471%2068.8124C213.256%2068.3261%20213.157%2067.8038%20213.173%2067.2509C213.188%2066.9894%20213.335%2066.4044%20214.345%2064.0671C214.585%2063.5114%20215.355%2061.7604%20216.656%2058.8154C215.059%2058.1377%20214.097%2057.7422%20212.489%2057.0991L211.198%2060.2863C209.759%2063.8363%20208.321%2067.3856%20206.883%2070.9356C208.352%2071.5226%20209.24%2071.8881%20210.698%2072.5065C210.813%2072.241%20210.928%2071.9755%20211.042%2071.71L211.473%2070.7121L211.636%2070.3366L212.016%2070.4967L212.203%2070.5761L212.289%2070.7875C212.367%2071.0884%20212.443%2071.3285%20212.521%2071.5073C212.969%2072.83%20214.334%2073.986%20216.705%2075.0733C217.878%2075.5789%20221.522%2077.3239%20222.668%2077.9182C223.907%2078.5599%20225.013%2078.7213%20225.864%2078.3845C226.648%2078.2411%20227.292%2077.6361%20227.86%2076.5628L233.158%2066.5598C233.788%2065.3698%20234.016%2064.1171%20233.835%2062.8364L233.817%2062.707L233.878%2062.5916C233.835%2062.5429%20233.563%2061.3735%20232.555%2058.2945C230.68%2052.3211%20228.531%2046.3817%20226.164%2040.6378C225.756%2039.712%20225.658%2039.0196%20225.871%2038.5306L225.948%2038.3512C225.966%2038.3412%20225.983%2038.3312%20226%2038.3212C226.096%2038.0397%20226.188%2037.7982%20226.277%2037.5961L228.926%2031.4947L229.971%2029.0873L230.134%2028.7111L230.514%2028.8732L231.204%2029.1693C233.677%2030.2333%20235.467%2031.0191%20236.546%2031.4987C237.991%2032.1404%20239.385%2032.8594%20240.688%2033.6359C241.244%2033.9%20241.773%2034.3183%20242.227%2034.8612C243.054%2036.0366%20243.221%2037.0985%20242.746%2038.0457C242.571%2038.4606%20242.241%2039.2364%20241.72%2040.295C240.625%2042.5216%20239.788%2044.1125%20239.302%2045.0363C239.235%2045.1644%20239.168%2045.2925%20239.101%2045.4212C239.642%2045.7027%20240.733%2046.2623%20241.751%2046.7853C242.475%2047.1568%20243.162%2047.5097%20243.591%2047.7312C245.929%2043.334%20248.266%2038.9375%20250.605%2034.5404Z'%20fill='%2320C4F4'/%3e%3cpath%20d='M250.605%2034.5404C248.749%2033.5718%20247.659%2033.0182%20245.788%2032.0917C245.751%2032.165%20245.714%2032.2377%20245.678%2032.3105C245.494%2032.6753%20245.256%2033.1863%20244.96%2033.844L244.557%2034.7432L244.198%2033.8253L243.941%2033.1723C243.532%2032.2958%20243.217%2031.8789%20243.028%2031.6874C242.012%2030.6082%20240.881%2029.7837%20239.659%2029.2294C238.516%2028.7111%20237.64%2028.3536%20237.083%2028.1274C235.627%2027.443%20234.254%2026.824%20232.946%2026.2584L232.203%2025.9382C229.764%2024.8929%20229.338%2024.8316%20229.297%2024.8282C228.303%2024.6635%20227.444%2024.7475%20226.658%2025.0737C226.136%2025.3559%20225.745%2025.7081%20225.564%2026.0749C225.141%2026.9361%20224.824%2027.7412%20224.572%2028.3796L224.367%2028.8945L221.968%2034.7905C221.596%2035.705%20221.281%2036.4201%20221.06%2036.9217L220.948%2037.1752C220.791%2037.5341%20220.796%2038.1091%20220.962%2038.8388C221.185%2039.724%20221.809%2041.3462%20223.114%2044.4306C225.676%2050.8122%20227.877%2057.1018%20229.659%2063.1319L229.704%2063.2859L229.632%2063.4294L225.789%2071.115L224.147%2074.3976L223.964%2074.7644L223.593%2074.5823L222.699%2074.1447C222.277%2073.9393%20220.858%2073.2696%20218.447%2072.1723C217.199%2071.6046%20216.128%2071.0537%20215.265%2070.5347C214.456%2070.1818%20213.837%2069.5942%20213.471%2068.8124C213.256%2068.3261%20213.157%2067.8038%20213.173%2067.2509C213.188%2066.9894%20213.335%2066.4044%20214.345%2064.0671C214.585%2063.5114%20215.355%2061.7604%20216.656%2058.8154C215.059%2058.1377%20214.097%2057.7422%20212.489%2057.0991L211.198%2060.2863C209.759%2063.8363%20208.321%2067.3856%20206.883%2070.9356C208.352%2071.5226%20209.24%2071.8881%20210.698%2072.5065C210.813%2072.241%20210.928%2071.9755%20211.042%2071.71L211.473%2070.7121L211.636%2070.3366L212.016%2070.4967L212.203%2070.5761L212.289%2070.7875C212.367%2071.0884%20212.443%2071.3285%20212.521%2071.5073C212.969%2072.83%20214.334%2073.986%20216.705%2075.0733C217.878%2075.5789%20221.522%2077.3239%20222.668%2077.9182C223.907%2078.5599%20225.013%2078.7213%20225.864%2078.3845C226.648%2078.2411%20227.292%2077.6361%20227.86%2076.5628L233.158%2066.5598C233.788%2065.3698%20234.016%2064.1171%20233.835%2062.8364L233.817%2062.707L233.878%2062.5916C233.835%2062.5429%20233.563%2061.3735%20232.555%2058.2945C230.68%2052.3211%20228.531%2046.3817%20226.164%2040.6378C225.756%2039.712%20225.658%2039.0196%20225.871%2038.5306L225.948%2038.3512C225.966%2038.3412%20225.983%2038.3312%20226%2038.3212C226.096%2038.0397%20226.188%2037.7982%20226.277%2037.5961L228.926%2031.4947L229.971%2029.0873L230.134%2028.7111L230.514%2028.8732L231.204%2029.1693C233.677%2030.2333%20235.467%2031.0191%20236.546%2031.4987C237.991%2032.1404%20239.385%2032.8594%20240.688%2033.6359C241.244%2033.9%20241.773%2034.3183%20242.227%2034.8612C243.054%2036.0366%20243.221%2037.0985%20242.746%2038.0457C242.571%2038.4606%20242.241%2039.2364%20241.72%2040.295C240.625%2042.5216%20239.788%2044.1125%20239.302%2045.0363C239.235%2045.1644%20239.168%2045.2925%20239.101%2045.4212C239.642%2045.7027%20240.733%2046.2623%20241.751%2046.7853C242.475%2047.1568%20243.162%2047.5097%20243.591%2047.7312C245.929%2043.334%20248.266%2038.9375%20250.605%2034.5404Z'%20stroke='white'%20stroke-width='1.228'/%3e%3cpath%20d='M218.395%2024.5189C218.556%2024.0819%20218.718%2023.6457%20218.879%2023.2088C219.169%2022.4237%20219.459%2021.6386%20219.749%2020.8534C215.693%2019.3806%20212.838%2018.3607%20208.394%2016.9653C208.045%2018.6422%20208.523%2021.1269%20210.055%2021.6586L210.437%2021.7906L210.311%2022.1722L203.531%2042.7165C202.673%2045.3186%20201.629%2048.4337%20200.403%2052.0637L200.37%2052.1638L200.292%2052.2352C200.305%2052.2445%20200.238%2052.4353%20200.138%2052.7388L199.333%2052.6381C199.22%2050.9024%20199.138%2049.8625%20199.104%2049.5223C198.508%2042.3409%20197.713%2033.8468%20196.328%2025.2499C195.597%2020.3252%20195.19%2017.8784%20194.293%2013.0424C191.592%2012.3573%20189.432%2011.863%20186.598%2011.226C186.481%2012.899%20187.675%2015.3677%20189.221%2015.8193L189.597%2015.9293L189.506%2016.3076L179.52%2057.7563L179.424%2058.1545L179.022%2058.0591L178.268%2057.8824C177.799%2057.775%20177.331%2057.6676%20176.861%2057.5602C176.648%2058.4947%20176.435%2059.4292%20176.221%2060.3638L175.99%2061.3763C176.357%2061.469%20176.724%2061.5624%20177.09%2061.6552C178.229%2061.944%20179.238%2062.2001%20180.121%2062.4183L181.421%2062.7344C182.315%2062.9506%20183.437%2063.222%20184.785%2063.5576C184.827%2063.4081%20184.868%2063.2587%20184.909%2063.1093C185.216%2062.0013%20185.524%2060.8934%20185.83%2059.7861C185.234%2059.624%20184.827%2059.5159%20184.132%2059.3338L183.57%2059.1871L183.169%2059.0837L183.274%2058.6875L189.65%2034.5052L190.53%2031.1653L191.734%2026.5967L191.838%2026.2011L192.238%2026.3039L192.638%2026.4066L192.577%2026.8142C193.651%2033.0944%20194.51%2039.4406%20195.178%2045.7081C195.843%2052.8475%20196.312%2059.097%20196.614%2064.8196C196.647%2065.6441%20196.686%2066.6253%20196.713%2067.0662C197.683%2067.3884%20198.286%2067.5925%20199.22%2067.9167C201.261%2062.1494%20203.303%2056.3822%20205.343%2050.6156L214.868%2023.7051L215.006%2023.3188L215.395%2023.4543C216.611%2023.8778%20217.26%2024.108%20218.395%2024.5189Z'%20fill='%2320C4F4'/%3e%3cpath%20d='M218.395%2024.5189C218.556%2024.0819%20218.718%2023.6457%20218.879%2023.2088C219.169%2022.4237%20219.459%2021.6386%20219.749%2020.8534C215.693%2019.3806%20212.838%2018.3607%20208.394%2016.9653C208.045%2018.6422%20208.523%2021.1269%20210.055%2021.6586L210.437%2021.7906L210.311%2022.1722L203.531%2042.7165C202.673%2045.3186%20201.629%2048.4337%20200.403%2052.0637L200.37%2052.1638L200.292%2052.2352C200.305%2052.2445%20200.238%2052.4353%20200.138%2052.7388L199.333%2052.6381C199.22%2050.9024%20199.138%2049.8625%20199.104%2049.5223C198.508%2042.3409%20197.713%2033.8468%20196.328%2025.2499C195.597%2020.3252%20195.19%2017.8784%20194.293%2013.0424C191.592%2012.3573%20189.432%2011.863%20186.598%2011.226C186.481%2012.899%20187.675%2015.3677%20189.221%2015.8193L189.597%2015.9293L189.506%2016.3076L179.52%2057.7563L179.424%2058.1545L179.022%2058.0591L178.268%2057.8824C177.799%2057.775%20177.331%2057.6676%20176.861%2057.5602C176.648%2058.4947%20176.435%2059.4292%20176.221%2060.3638L175.99%2061.3763C176.357%2061.469%20176.724%2061.5624%20177.09%2061.6552C178.229%2061.944%20179.238%2062.2001%20180.121%2062.4183L181.421%2062.7344C182.315%2062.9506%20183.437%2063.222%20184.785%2063.5576C184.827%2063.4081%20184.868%2063.2587%20184.909%2063.1093C185.216%2062.0013%20185.524%2060.8934%20185.83%2059.7861C185.234%2059.624%20184.827%2059.5159%20184.132%2059.3338L183.57%2059.1871L183.169%2059.0837L183.274%2058.6875L189.65%2034.5052L190.53%2031.1653L191.734%2026.5967L191.838%2026.2011L192.238%2026.3039L192.638%2026.4066L192.577%2026.8142C193.651%2033.0944%20194.51%2039.4406%20195.178%2045.7081C195.843%2052.8475%20196.312%2059.097%20196.614%2064.8196C196.647%2065.6441%20196.686%2066.6253%20196.713%2067.0662C197.683%2067.3884%20198.286%2067.5925%20199.22%2067.9167C201.261%2062.1494%20203.303%2056.3822%20205.343%2050.6156L214.868%2023.7051L215.006%2023.3188L215.395%2023.4543C216.611%2023.8778%20217.26%2024.108%20218.395%2024.5189Z'%20stroke='white'%20stroke-width='1.228'/%3e%3cpath%20d='M171.235%2056.7052L170.669%2056.5832L170.339%2056.5118L170.344%2056.1756C170.435%2050.7739%20170.482%2045.759%20170.488%2040.8449C170.508%2027.9183%20170.295%2017.9547%20169.797%208.53803C169.788%208.06109%20169.772%207.79027%20169.759%207.63752C165.913%206.97648%20162.497%206.43417%20159.562%206.01727C159.542%207.03518%20160.134%209.89279%20162.574%2010.4138L163.044%2010.5138L162.873%2010.9594C159.871%2018.8032%20156.962%2026.757%20154.229%2034.6007C152.652%2039.2173%20150.988%2044.1495%20149.505%2049.2057C149.12%2050.4917%20148.668%2051.669%20148.16%2052.707L148.026%2052.9798L147.724%2052.9331C147.284%2052.8651%20146.602%2052.7803%20145.676%2052.687C145.565%2053.8249%20145.453%2054.9629%20145.341%2056.1009C148.883%2056.4451%20150.798%2056.6732%20154.319%2057.1695C154.395%2056.6405%20154.472%2056.1109%20154.549%2055.5813C154.635%2054.9789%20154.723%2054.3759%20154.81%2053.7736C154.172%2053.6842%20153.673%2053.6168%20153.316%2053.5695L152.744%2053.4941L152.278%2053.4334L152.398%2052.9831C152.881%2051.1694%20153.502%2049.1343%20154.244%2046.9344C154.496%2045.9051%20154.594%2045.5082%20155.042%2045.5689C159.508%2046.1759%20161.679%2046.5255%20166.107%2047.3479L166.445%2047.4106L166.444%2047.7522C166.427%2051.8485%20166.354%2054.7128%20166.255%2055.2264L166.177%2055.6293L165.764%2055.5873L165.272%2055.4939C164.891%2055.4232%20164.509%2055.3525%20164.127%2055.2811C163.921%2056.3964%20163.715%2057.5117%20163.508%2058.627C163.792%2058.6843%20164.075%2058.7417%20164.359%2058.7991L166.075%2059.1433C168.629%2059.6442%20169.969%2059.9264%20172.386%2060.4767C172.645%2059.3627%20172.905%2058.2481%20173.164%2057.1341C172.373%2056.9547%20171.73%2056.8133%20171.235%2056.7052ZM165.755%2043.0342C162.252%2042.3971%20160.313%2042.085%20156.785%2041.5914C157.592%2039.1113%20158.295%2037.0395%20158.884%2035.3745C161.209%2028.7448%20163.335%2022.8261%20165.357%2017.3517C165.614%2025.3642%20165.745%2033.795%20165.755%2043.0342Z'%20fill='%2320C4F4'/%3e%3cpath%20d='M171.235%2056.7052L170.669%2056.5832L170.339%2056.5118L170.344%2056.1756C170.435%2050.7739%20170.482%2045.759%20170.488%2040.8449C170.508%2027.9183%20170.295%2017.9547%20169.797%208.53803C169.788%208.06109%20169.772%207.79027%20169.759%207.63752C165.913%206.97648%20162.497%206.43417%20159.562%206.01727C159.542%207.03518%20160.134%209.89279%20162.574%2010.4138L163.044%2010.5138L162.873%2010.9594C159.871%2018.8032%20156.962%2026.757%20154.229%2034.6007C152.652%2039.2173%20150.988%2044.1495%20149.505%2049.2057C149.12%2050.4917%20148.668%2051.669%20148.16%2052.707L148.026%2052.9798L147.724%2052.9331C147.284%2052.8651%20146.602%2052.7803%20145.676%2052.687C145.565%2053.8249%20145.453%2054.9629%20145.341%2056.1009C148.883%2056.4451%20150.798%2056.6732%20154.319%2057.1695C154.395%2056.6405%20154.472%2056.1109%20154.549%2055.5813C154.635%2054.9789%20154.723%2054.3759%20154.81%2053.7736C154.172%2053.6842%20153.673%2053.6168%20153.316%2053.5695L152.744%2053.4941L152.278%2053.4334L152.398%2052.9831C152.881%2051.1694%20153.502%2049.1343%20154.244%2046.9344C154.496%2045.9051%20154.594%2045.5082%20155.042%2045.5689C159.508%2046.1759%20161.679%2046.5255%20166.107%2047.3479L166.445%2047.4106L166.444%2047.7522C166.427%2051.8485%20166.354%2054.7128%20166.255%2055.2264L166.177%2055.6293L165.764%2055.5873L165.272%2055.4939C164.891%2055.4232%20164.509%2055.3525%20164.127%2055.2811C163.921%2056.3964%20163.715%2057.5117%20163.508%2058.627C163.792%2058.6843%20164.075%2058.7417%20164.359%2058.7991L166.075%2059.1433C168.629%2059.6442%20169.969%2059.9264%20172.386%2060.4767C172.645%2059.3627%20172.905%2058.2481%20173.164%2057.1341C172.373%2056.9547%20171.73%2056.8133%20171.235%2056.7052ZM165.755%2043.0342C162.252%2042.3971%20160.313%2042.085%20156.785%2041.5914C157.592%2039.1113%20158.295%2037.0395%20158.884%2035.3745C161.209%2028.7448%20163.335%2022.8261%20165.357%2017.3517C165.614%2025.3642%20165.745%2033.795%20165.755%2043.0342Z'%20stroke='white'%20stroke-width='1.228'/%3e%3cpath%20d='M146.284%2020.0633C146.551%2017.724%20146.819%2015.3847%20147.087%2013.0447C147.389%2010.4099%20147.691%207.77438%20147.992%205.13889C145.955%204.91143%20144.759%204.79003%20142.719%204.60526C142.659%205.25363%20142.6%205.90133%20142.541%206.54903L142.452%207.52557L141.814%206.77648L141.309%206.18548C140.751%205.6932%20140.224%205.32567%20139.78%205.13289C138.563%204.59059%20137.373%204.27774%20136.24%204.2017L134.794%204.10831C132.033%203.93755%20130.65%203.86951%20127.886%203.76946C126.935%203.73477%20126.356%203.74277%20126.183%203.74811C125.359%203.77612%20124.578%203.81748%20124.071%204.0236C123.782%204.151%20123.497%204.29575%20123.227%204.4525C122.395%205.07886%20121.94%205.76258%20121.909%206.46097C121.926%206.47498%20121.944%206.48899%20121.961%206.503L121.95%206.71311C121.909%207.48088%20121.886%208.09256%20121.88%208.54882L121.315%2051.8132C121.305%2052.5663%20121.648%2053.2574%20122.365%2053.9264C123.011%2054.4861%20123.718%2054.7923%20124.513%2054.8503C124.541%2054.8243%20124.57%2054.7983%20124.599%2054.7722L124.895%2054.8703L126.721%2054.9577L128.411%2055.0404L129.848%2055.1064C131.394%2055.1758%20132.989%2055.2465%20134.562%2055.3819C134.933%2055.4139%20135.308%2055.452%20135.682%2055.4907C136.049%2055.5287%20136.416%2055.566%20136.776%2055.5967C138.276%2055.7255%20139.252%2055.7381%20139.762%2055.6361C140.462%2055.508%20141.064%2055.1751%20141.611%2054.6162C141.991%2054.3073%20142.452%2053.5262%20142.699%2051.3697L143.685%2042.7555C143.783%2041.9003%20143.882%2041.0452%20143.979%2040.19C142.254%2039.9972%20141.229%2039.8932%20139.511%2039.7378C139.293%2042.1258%20139.076%2044.5145%20138.858%2046.9025L138.399%2051.9206L138.383%2052.0961L138.243%2052.2055L138.112%2052.3082L137.903%2052.3242C136.074%2052.1361%20134.597%2052.0134%20133.476%2051.936C130.445%2051.7252%20128.964%2051.6472%20125.93%2051.5398L125.517%2051.5251L125.532%2051.1162L127.104%207.51224L127.12%207.05331L127.578%207.12134L127.899%207.16938L128.13%207.17538L128.941%207.20472C130.246%207.25142%20131.995%207.31412%20134.166%207.43486C135.684%207.51957%20137.119%207.67966%20138.431%207.91046C139.389%207.98117%20140.278%208.32202%20141.032%208.91769C141.554%209.464%20141.788%209.97896%20141.924%2010.3232C142.077%2010.7127%20141.986%2012.6338%20141.828%2014.3648C141.736%2015.3713%20141.564%2017.1036%20141.313%2019.561C143.233%2019.7345%20144.367%2019.8492%20146.284%2020.0633Z'%20fill='%2320C4F4'/%3e%3cpath%20d='M146.284%2020.0633C146.551%2017.724%20146.819%2015.3847%20147.087%2013.0447C147.389%2010.4099%20147.691%207.77438%20147.992%205.13889C145.955%204.91143%20144.759%204.79003%20142.719%204.60526C142.659%205.25363%20142.6%205.90133%20142.541%206.54903L142.452%207.52557L141.814%206.77648L141.309%206.18548C140.751%205.6932%20140.224%205.32567%20139.78%205.13289C138.563%204.59059%20137.373%204.27774%20136.24%204.2017L134.794%204.10831C132.033%203.93755%20130.65%203.86951%20127.886%203.76946C126.935%203.73477%20126.356%203.74277%20126.183%203.74811C125.359%203.77612%20124.578%203.81748%20124.071%204.0236C123.782%204.151%20123.497%204.29575%20123.227%204.4525C122.395%205.07886%20121.94%205.76258%20121.909%206.46097C121.926%206.47498%20121.944%206.48899%20121.961%206.503L121.95%206.71311C121.909%207.48088%20121.886%208.09256%20121.88%208.54882L121.315%2051.8132C121.305%2052.5663%20121.648%2053.2574%20122.365%2053.9264C123.011%2054.4861%20123.718%2054.7923%20124.513%2054.8503C124.541%2054.8243%20124.57%2054.7983%20124.599%2054.7722L124.895%2054.8703L126.721%2054.9577L128.411%2055.0404L129.848%2055.1064C131.394%2055.1758%20132.989%2055.2465%20134.562%2055.3819C134.933%2055.4139%20135.308%2055.452%20135.682%2055.4907C136.049%2055.5287%20136.416%2055.566%20136.776%2055.5967C138.276%2055.7255%20139.252%2055.7381%20139.762%2055.6361C140.462%2055.508%20141.064%2055.1751%20141.611%2054.6162C141.991%2054.3073%20142.452%2053.5262%20142.699%2051.3697L143.685%2042.7555C143.783%2041.9003%20143.882%2041.0452%20143.979%2040.19C142.254%2039.9972%20141.229%2039.8932%20139.511%2039.7378C139.293%2042.1258%20139.076%2044.5145%20138.858%2046.9025L138.399%2051.9206L138.383%2052.0961L138.243%2052.2055L138.112%2052.3082L137.903%2052.3242C136.074%2052.1361%20134.597%2052.0134%20133.476%2051.936C130.445%2051.7252%20128.964%2051.6472%20125.93%2051.5398L125.517%2051.5251L125.532%2051.1162L127.104%207.51224L127.12%207.05331L127.578%207.12134L127.899%207.16938L128.13%207.17538L128.941%207.20472C130.246%207.25142%20131.995%207.31412%20134.166%207.43486C135.684%207.51957%20137.119%207.67966%20138.431%207.91046C139.389%207.98117%20140.278%208.32202%20141.032%208.91769C141.554%209.464%20141.788%209.97896%20141.924%2010.3232C142.077%2010.7127%20141.986%2012.6338%20141.828%2014.3648C141.736%2015.3713%20141.564%2017.1036%20141.313%2019.561C143.233%2019.7345%20144.367%2019.8492%20146.284%2020.0633Z'%20stroke='white'%20stroke-width='1.228'/%3e%3cpath%20d='M105.247%2056.3037C109.144%2055.8835%20111.243%2055.7067%20115.154%2055.4719C115.151%2055.4252%20115.149%2055.3785%20115.146%2055.3325C115.07%2054.0798%20114.995%2052.8277%20114.919%2051.5757C113.98%2051.6317%20113.39%2051.6718%20112.338%2051.7485L111.926%2051.7785L111.896%2051.3696L108.746%208.83358L108.725%208.55609L109.064%208.35598C110.452%208.22924%20111.158%208.17921%20112.297%208.1105C112.258%207.4668%20112.22%206.82378%20112.181%206.18008C112.142%205.53705%20112.104%204.89335%20112.065%204.25032C107.052%204.54916%20103.997%204.77462%2099.1132%205.30025C99.3102%206.28881%20100.332%208.84758%20103.186%208.8229L103.565%208.81957L103.6%209.19311L104.203%2015.402L107.727%2051.7205L107.766%2052.128L107.355%2052.1674C106.332%2052.2648%20105.759%2052.3221%20104.846%2052.4209C104.922%2053.284%20104.987%2053.9557%20105.041%2054.436C105.109%2055.0583%20105.179%2055.6814%20105.247%2056.3037Z'%20fill='%2320C4F4'/%3e%3cpath%20d='M105.247%2056.3037C109.144%2055.8835%20111.243%2055.7067%20115.154%2055.4719C115.151%2055.4252%20115.149%2055.3785%20115.146%2055.3325C115.07%2054.0798%20114.995%2052.8277%20114.919%2051.5757C113.98%2051.6317%20113.39%2051.6718%20112.338%2051.7485L111.926%2051.7785L111.896%2051.3696L108.746%208.83358L108.725%208.55609L109.064%208.35598C110.452%208.22924%20111.158%208.17921%20112.297%208.1105C112.258%207.4668%20112.22%206.82378%20112.181%206.18008C112.142%205.53705%20112.104%204.89335%20112.065%204.25032C107.052%204.54916%20103.997%204.77462%2099.1132%205.30025C99.3102%206.28881%20100.332%208.84758%20103.186%208.8229L103.565%208.81957L103.6%209.19311L104.203%2015.402L107.727%2051.7205L107.766%2052.128L107.355%2052.1674C106.332%2052.2648%20105.759%2052.3221%20104.846%2052.4209C104.922%2053.284%20104.987%2053.9557%20105.041%2054.436C105.109%2055.0583%20105.179%2055.6814%20105.247%2056.3037Z'%20stroke='white'%20stroke-width='1.228'/%3e%3cpath%20d='M94.9782%2049.264C95.0434%2049.7276%2095.1087%2050.1912%2095.1739%2050.6548L95.6152%2053.7872L95.6717%2054.1935L95.2627%2054.2502C92.2297%2054.6697%2090.7532%2054.8999%2087.739%2055.4221L87.3321%2055.4929L87.2608%2055.0893L79.7728%2012.6467L79.7015%2012.2431L80.1084%2012.1724C81.2042%2011.983%2083.841%2011.532%2085.1211%2011.3219C85.0081%2010.6315%2084.8944%209.94113%2084.7814%209.25074C84.6818%208.64506%2084.5823%208.03872%2084.4827%207.43305C80.8167%208.02738%2074.4103%209.10199%2069.319%2010.1472C69.8262%2011.8249%2071.2818%2013.3764%2073.5809%2013.3204C73.5803%2013.3144%2073.6623%2013.307%2073.7545%2013.301C73.8675%2013.293%2073.9852%2013.285%2074.1117%2013.2483L74.5449%2013.1229L74.633%2013.5618L83.0116%2055.3955L83.0923%2055.7977L82.6867%2055.8771C80.7656%2056.2553%2079.7418%2056.4681%2077.9485%2056.8636C78.0951%2057.514%2078.2418%2058.165%2078.3884%2058.8154C78.5223%2059.4104%2078.6561%2060.0054%2078.7907%2060.6004C82.565%2059.7519%2086.1987%2059.0402%2089.8855%2058.4285C94.0567%2057.7361%2096.1688%2057.4359%20100.233%2056.9637C100.111%2055.9184%2099.9882%2054.8725%2099.8651%2053.8266C99.6653%2052.1249%2099.4655%2050.4227%2099.2657%2048.7204C97.617%2048.9118%2096.6235%2049.0379%2094.9782%2049.264Z'%20fill='%2320C4F4'/%3e%3cpath%20d='M94.9782%2049.264C95.0434%2049.7276%2095.1087%2050.1912%2095.1739%2050.6548L95.6152%2053.7872L95.6717%2054.1935L95.2627%2054.2502C92.2297%2054.6697%2090.7532%2054.8999%2087.739%2055.4221L87.3321%2055.4929L87.2608%2055.0893L79.7728%2012.6467L79.7015%2012.2431L80.1084%2012.1724C81.2042%2011.983%2083.841%2011.532%2085.1211%2011.3219C85.0081%2010.6315%2084.8944%209.94113%2084.7814%209.25074C84.6818%208.64506%2084.5823%208.03872%2084.4827%207.43305C80.8167%208.02738%2074.4103%209.10199%2069.319%2010.1472C69.8262%2011.8249%2071.2818%2013.3764%2073.5809%2013.3204C73.5803%2013.3144%2073.6623%2013.307%2073.7545%2013.301C73.8675%2013.293%2073.9852%2013.285%2074.1117%2013.2483L74.5449%2013.1229L74.633%2013.5618L83.0116%2055.3955L83.0923%2055.7977L82.6867%2055.8771C80.7656%2056.2553%2079.7418%2056.4681%2077.9485%2056.8636C78.0951%2057.514%2078.2418%2058.165%2078.3884%2058.8154C78.5223%2059.4104%2078.6561%2060.0054%2078.7907%2060.6004C82.565%2059.7519%2086.1987%2059.0402%2089.8855%2058.4285C94.0567%2057.7361%2096.1688%2057.4359%20100.233%2056.9637C100.111%2055.9184%2099.9882%2054.8725%2099.8651%2053.8266C99.6653%2052.1249%2099.4655%2050.4227%2099.2657%2048.7204C97.617%2048.9118%2096.6235%2049.0379%2094.9782%2049.264Z'%20stroke='white'%20stroke-width='1.228'/%3e%3cpath%20d='M68.75%2040.2984C68.4547%2039.1604%2068.195%2038.1365%2067.9636%2037.2273L67.6569%2036.0213C67.4067%2035.0434%2067.1242%2033.9728%2066.8127%2032.8075C65.8939%2033.0182%2064.975%2033.229%2064.0562%2033.4391L63.6465%2033.5332L63.8752%2034.4937L64.0091%2035.0441L64.1066%2035.4423L63.705%2035.539C63.5086%2035.5864%2063.3082%2035.6471%2063.107%2035.7144C60.6169%2036.3595%2058.4173%2036.9798%2054.9638%2038.0117L54.569%2038.1298L54.3975%2037.7162L52.2766%2030.7423L48.8023%2019.3152L48.6826%2018.923L49.0781%2018.8049C52.9338%2017.6516%2054.8259%2017.1246%2058.7206%2016.1167L59.1202%2016.0133L59.2245%2016.4102C59.5937%2017.813%2059.963%2019.2165%2060.3317%2020.6192C60.5819%2020.5552%2060.8321%2020.4912%2061.0817%2020.4271C62.6967%2020.0176%2063.5618%2019.8048%2065.0779%2019.4459C65.0113%2019.081%2064.8055%2018.2099%2064.5102%2016.9625L64.005%2014.8146C63.7481%2013.7133%2063.4461%2012.6554%2063.1091%2011.6702C63.1198%2011.6909%2063.1111%2011.6822%2063.0707%2011.6468C60.6559%2012.1798%2057.035%2013.0109%2052.8497%2014.1783L50.2969%2014.886C46.1702%2016.026%2042.8863%2016.9332%2038.5146%2018.448C39.2929%2019.9842%2041.4817%2021.6532%2043.3356%2021.0515L43.7271%2020.9247L43.8562%2021.313C46.3309%2028.7412%2048.8023%2036.1714%2051.2541%2043.6069L57.3666%2062.1507L57.4944%2062.5402L57.1022%2062.6677L56.8432%2062.7517L56.3488%2062.9125C55.3782%2063.228%2054.1459%2063.6289%2052.6539%2064.1285C52.8618%2064.7128%2053.069%2065.2965%2053.2768%2065.8808C53.4847%2066.4651%2053.6925%2067.0495%2053.9004%2067.6338C58.2074%2066.1309%2060.4588%2065.4165%2064.969%2064.1131C67.6535%2063.3374%2070.1747%2062.6463%2072.6756%2061.9999C72.8814%2061.9706%2073.7054%2061.7758%2074.8456%2061.5063C74.9404%2061.4843%2075.0353%2061.4616%2075.1295%2061.439C75.073%2061.2095%2075.0319%2061.0614%2075.0037%2060.9974L74.929%2060.91L74.9452%2060.8099C74.9297%2060.7152%2074.894%2060.4938%2074.8248%2060.1656C74.2981%2057.6628%2073.8232%2055.8385%2073.5393%2054.7485L73.3368%2053.9554C73.2864%2053.7466%2073.2366%2053.5378%2073.1868%2053.329C71.6538%2053.6919%2070.7236%2053.9214%2069.1959%2054.3156C69.4899%2055.4322%2069.7838%2056.5489%2070.0778%2057.6655L70.1922%2058.1017C70.2096%2058.1684%2070.2722%2058.3546%2070.3778%2058.6601L70.5231%2059.0783L70.0913%2059.1897C66.8383%2060.0308%2065.2582%2060.4711%2062.0416%2061.433L61.646%2061.551L61.527%2061.1588L58.1711%2050.1246L56.365%2044.1852L55.7939%2042.3068L55.656%2041.8546L55.5369%2041.4623L55.9325%2041.3443C58.6971%2040.5171%2060.6976%2039.9415%2062.7943%2039.3838C63.3539%2039.2631%2063.9378%2039.1244%2064.5855%2038.9529L64.9838%2038.8475L65.0907%2039.2431L65.2306%2039.7587C65.3887%2040.337%2065.4849%2040.6839%2065.6221%2041.1688C66.2019%2041.0074%2066.7818%2040.846%2067.3623%2040.6846C67.8251%2040.5558%2068.2872%2040.4271%2068.75%2040.2984Z'%20fill='%2320C4F4'/%3e%3cpath%20d='M68.75%2040.2984C68.4547%2039.1604%2068.195%2038.1365%2067.9636%2037.2273L67.6569%2036.0213C67.4067%2035.0434%2067.1242%2033.9728%2066.8127%2032.8075C65.8939%2033.0182%2064.975%2033.229%2064.0562%2033.4391L63.6465%2033.5332L63.8752%2034.4937L64.0091%2035.0441L64.1066%2035.4423L63.705%2035.539C63.5086%2035.5864%2063.3082%2035.6471%2063.107%2035.7144C60.6169%2036.3595%2058.4173%2036.9798%2054.9638%2038.0117L54.569%2038.1298L54.3975%2037.7162L52.2766%2030.7423L48.8023%2019.3152L48.6826%2018.923L49.0781%2018.8049C52.9338%2017.6516%2054.8259%2017.1246%2058.7206%2016.1167L59.1202%2016.0133L59.2245%2016.4102C59.5937%2017.813%2059.963%2019.2165%2060.3317%2020.6192C60.5819%2020.5552%2060.8321%2020.4912%2061.0817%2020.4271C62.6967%2020.0176%2063.5618%2019.8048%2065.0779%2019.4459C65.0113%2019.081%2064.8055%2018.2099%2064.5102%2016.9625L64.005%2014.8146C63.7481%2013.7133%2063.4461%2012.6554%2063.1091%2011.6702C63.1198%2011.6909%2063.1111%2011.6822%2063.0707%2011.6468C60.6559%2012.1798%2057.035%2013.0109%2052.8497%2014.1783L50.2969%2014.886C46.1702%2016.026%2042.8863%2016.9332%2038.5146%2018.448C39.2929%2019.9842%2041.4817%2021.6532%2043.3356%2021.0515L43.7271%2020.9247L43.8562%2021.313C46.3309%2028.7412%2048.8023%2036.1714%2051.2541%2043.6069L57.3666%2062.1507L57.4944%2062.5402L57.1022%2062.6677L56.8432%2062.7517L56.3488%2062.9125C55.3782%2063.228%2054.1459%2063.6289%2052.6539%2064.1285C52.8618%2064.7128%2053.069%2065.2965%2053.2768%2065.8808C53.4847%2066.4651%2053.6925%2067.0495%2053.9004%2067.6338C58.2074%2066.1309%2060.4588%2065.4165%2064.969%2064.1131C67.6535%2063.3374%2070.1747%2062.6463%2072.6756%2061.9999C72.8814%2061.9706%2073.7054%2061.7758%2074.8456%2061.5063C74.9404%2061.4843%2075.0353%2061.4616%2075.1295%2061.439C75.073%2061.2095%2075.0319%2061.0614%2075.0037%2060.9974L74.929%2060.91L74.9452%2060.8099C74.9297%2060.7152%2074.894%2060.4938%2074.8248%2060.1656C74.2981%2057.6628%2073.8232%2055.8385%2073.5393%2054.7485L73.3368%2053.9554C73.2864%2053.7466%2073.2366%2053.5378%2073.1868%2053.329C71.6538%2053.6919%2070.7236%2053.9214%2069.1959%2054.3156C69.4899%2055.4322%2069.7838%2056.5489%2070.0778%2057.6655L70.1922%2058.1017C70.2096%2058.1684%2070.2722%2058.3546%2070.3778%2058.6601L70.5231%2059.0783L70.0913%2059.1897C66.8383%2060.0308%2065.2582%2060.4711%2062.0416%2061.433L61.646%2061.551L61.527%2061.1588L58.1711%2050.1246L56.365%2044.1852L55.7939%2042.3068L55.656%2041.8546L55.5369%2041.4623L55.9325%2041.3443C58.6971%2040.5171%2060.6976%2039.9415%2062.7943%2039.3838C63.3539%2039.2631%2063.9378%2039.1244%2064.5855%2038.9529L64.9838%2038.8475L65.0907%2039.2431L65.2306%2039.7587C65.3887%2040.337%2065.4849%2040.6839%2065.6221%2041.1688C66.2019%2041.0074%2066.7818%2040.846%2067.3623%2040.6846C67.8251%2040.5558%2068.2872%2040.4271%2068.75%2040.2984Z'%20stroke='white'%20stroke-width='1.228'/%3e%3cpath%20d='M42.1952%2046.8253C41.4774%2044.6307%2040.7146%2042.679%2040.1019%2041.1108C39.8362%2040.431%2039.5953%2039.816%2039.3935%2039.2704L35.5984%2029.0379L33.5892%2023.6202C33.3241%2022.9058%2032.788%2022.3982%2031.9499%2022.0687C30.8293%2021.7432%2029.718%2021.7732%2028.6828%2022.1707C28.2005%2022.3562%2027.7868%2022.5269%2027.3146%2022.7217L26.3971%2023.0986C20.4791%2025.5046%2016.8185%2027.0375%2014.5274%2028.0694C11.4432%2029.4588%208.35372%2030.971%205.33887%2032.5673C6.34382%2034.0027%208.88781%2035.1894%209.76832%2034.7638L10.1396%2034.5844L10.3206%2034.9526L29.0703%2073.1355L29.2512%2073.5037L28.8799%2073.6832L28.3128%2073.958C27.6516%2074.2795%2027.2662%2074.4689%2026.6998%2074.7504C26.9763%2075.2961%2027.2527%2075.841%2027.5299%2076.386C27.844%2077.0064%2028.1581%2077.626%2028.4729%2078.2457C29.7503%2077.6441%2030.8992%2077.1104%2031.9176%2076.6368L33.2549%2076.0145C34.352%2075.5028%2035.5513%2074.9312%2036.8583%2074.3048C36.3229%2073.1135%2035.7868%2071.9222%2035.2506%2070.7308C34.8746%2070.8989%2034.4979%2071.067%2034.1213%2071.2358L33.5125%2071.5113L33.1372%2071.682L32.9649%2071.3098L26.2754%2056.8456L26.1032%2056.4734L26.4785%2056.3027C26.5464%2056.272%2026.6541%2056.21%2026.8034%2056.1186C30.8306%2054.3155%2033.6531%2053.1702%2035.1699%2052.5552L35.7854%2052.3051L37.0204%2051.8001C38.7296%2051.1024%2039.9875%2050.5881%2040.2465%2050.458L40.2788%2050.4354C40.8088%2050.0638%2041.2474%2049.6549%2041.581%2049.22C42.0445%2048.5029%2042.1514%2048.1874%2042.173%2048.0654C42.2947%2047.357%2042.2523%2047.0001%2042.1952%2046.8253ZM36.5179%2047.5097C33.8663%2048.5483%2032.4571%2049.1273%2029.7187%2050.2999C28.6996%2050.7355%2027.1559%2051.4026%2025.0982%2052.3344C22.3766%2046.4504%2019.6557%2040.5665%2016.9342%2034.6825C16.5433%2033.836%2016.1519%2032.9895%2015.7604%2032.143C19.8791%2030.2773%2024.0953%2028.4963%2028.3054%2026.8427C31.0432%2033.7319%2033.7802%2040.6205%2036.5179%2047.5097Z'%20fill='%2320C4F4'/%3e%3cpath%20d='M42.1952%2046.8253C41.4774%2044.6307%2040.7146%2042.679%2040.1019%2041.1108C39.8362%2040.431%2039.5953%2039.816%2039.3935%2039.2704L35.5984%2029.0379L33.5892%2023.6202C33.3241%2022.9058%2032.788%2022.3982%2031.9499%2022.0687C30.8293%2021.7432%2029.718%2021.7732%2028.6828%2022.1707C28.2005%2022.3562%2027.7868%2022.5269%2027.3146%2022.7217L26.3971%2023.0986C20.4791%2025.5046%2016.8185%2027.0375%2014.5274%2028.0694C11.4432%2029.4588%208.35372%2030.971%205.33887%2032.5673C6.34382%2034.0027%208.88781%2035.1894%209.76832%2034.7638L10.1396%2034.5844L10.3206%2034.9526L29.0703%2073.1355L29.2512%2073.5037L28.8799%2073.6832L28.3128%2073.958C27.6516%2074.2795%2027.2662%2074.4689%2026.6998%2074.7504C26.9763%2075.2961%2027.2527%2075.841%2027.5299%2076.386C27.844%2077.0064%2028.1581%2077.626%2028.4729%2078.2457C29.7503%2077.6441%2030.8992%2077.1104%2031.9176%2076.6368L33.2549%2076.0145C34.352%2075.5028%2035.5513%2074.9312%2036.8583%2074.3048C36.3229%2073.1135%2035.7868%2071.9222%2035.2506%2070.7308C34.8746%2070.8989%2034.4979%2071.067%2034.1213%2071.2358L33.5125%2071.5113L33.1372%2071.682L32.9649%2071.3098L26.2754%2056.8456L26.1032%2056.4734L26.4785%2056.3027C26.5464%2056.272%2026.6541%2056.21%2026.8034%2056.1186C30.8306%2054.3155%2033.6531%2053.1702%2035.1699%2052.5552L35.7854%2052.3051L37.0204%2051.8001C38.7296%2051.1024%2039.9875%2050.5881%2040.2465%2050.458L40.2788%2050.4354C40.8088%2050.0638%2041.2474%2049.6549%2041.581%2049.22C42.0445%2048.5029%2042.1514%2048.1874%2042.173%2048.0654C42.2947%2047.357%2042.2523%2047.0001%2042.1952%2046.8253ZM36.5179%2047.5097C33.8663%2048.5483%2032.4571%2049.1273%2029.7187%2050.2999C28.6996%2050.7355%2027.1559%2051.4026%2025.0982%2052.3344C22.3766%2046.4504%2019.6557%2040.5665%2016.9342%2034.6825C16.5433%2033.836%2016.1519%2032.9895%2015.7604%2032.143C19.8791%2030.2773%2024.0953%2028.4963%2028.3054%2026.8427C31.0432%2033.7319%2033.7802%2040.6205%2036.5179%2047.5097Z'%20stroke='white'%20stroke-width='1.228'/%3e%3c/svg%3e";
//#endregion
//#region src/assets/logos/saipa.svg
var saipa_default = "data:image/svg+xml,%3csvg%20width='256'%20height='232'%20viewBox='0%200%20256%20232'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M173.433%20189.702L231.261%20221.569L196.204%20165.537L196.865%20164.615C201.385%20158.312%20203.26%20153.406%20204.974%20147.06L205.209%20146.188L206.067%20145.897C214.41%20143.068%20224.605%20137.333%20228.198%20129.722C229.861%20126.201%20229.968%20122.482%20228.516%20118.668L227.891%20117.027L229.557%20116.462C244.822%20111.286%20253.208%20104.289%20252.566%2097.2693C252.128%2092.4828%20247.415%2087.5333%20239.296%2083.3322C230.141%2078.5952%20216.876%2074.8573%20200.934%2072.5222L200.115%2072.4022L197.331%2067.5365L227.63%2010.5812L174.873%2044.2955L173.935%2043.6194C160.865%2034.1988%20144.295%2028.812%20127.278%2028.4526C118.725%2028.2748%20110.378%2029.3609%20102.469%2031.6876C94.216%2034.1168%2086.6618%2037.8376%2080.0168%2042.7473L79.1016%2043.4235L23.5177%209.95229L56.5822%2064.9031L55.9866%2065.7951C53.1073%2070.1069%2050.4623%2075.0588%2048.9113%2079.0417L48.5931%2079.8578L47.7419%2080.0717C47.2273%2080.2009%2046.6109%2080.3482%2045.9079%2080.5163C38.2717%2082.3439%2017.9888%2087.197%2012.6275%2097.9075C10.7782%20101.603%2010.8445%20105.619%2012.8308%20110.185L13.495%20111.711L11.9768%20112.401C6.09687%20115.075%203.21385%20118.236%203.40837%20121.795C3.63021%20125.86%207.6993%20130.6%2015.1757%20135.502C23.0823%20140.686%2034.5847%20145.84%2048.4394%20150.404L49.1836%20150.65L49.4795%20151.373C50.1224%20152.943%2053.1434%20159.156%2055.0413%20162.263L55.5322%20163.066L55.108%20163.907C52.2459%20169.579%2033.0411%20206.921%2025.6356%20221.318L78.7867%20187.004L79.7472%20187.797C91.6386%20197.615%20107.948%20203.206%20125.671%20203.54C134.167%20203.699%20142.544%20202.65%20150.556%20200.419C158.742%20198.14%20166.147%20194.736%20172.566%20190.3L173.433%20189.702ZM16.8045%20231.057L19.7084%20225.413C19.9872%20224.872%2046.7239%20172.912%2051.6535%20163.209C49.9001%20160.184%2047.6103%20155.524%2046.6493%20153.383C32.8378%20148.785%2021.3205%20143.588%2013.3088%20138.334C4.77416%20132.738%200.301666%20127.235%200.0145231%20121.979C-0.298092%20116.245%204.49072%20112.389%209.11095%20110.02C7.34826%20105.127%207.50665%20100.55%209.58704%2096.3935C15.6555%2084.27%2036.2992%2079.3298%2045.115%2077.2207C45.4554%2077.1392%2045.7754%2077.0627%2046.0727%2076.9905C47.6321%2073.1937%2049.9492%2068.8491%2052.5659%2064.8156L13.5658%200L78.9173%2039.353C85.6559%2034.5373%2093.2503%2030.867%20101.508%2028.4369C109.752%2026.0105%20118.447%2024.8745%20127.35%2025.0639C144.643%2025.4293%20161.507%2030.7966%20174.98%2040.2014L236.703%200.757695L201.21%2067.4768L202.248%2069.2904C218.196%2071.6876%20231.534%2075.4973%20240.861%2080.3237C250.178%2085.144%20255.395%2090.897%20255.95%2096.9613C256.733%20105.52%20248.329%20113.356%20232.244%20119.117C233.425%20123.249%20233.101%20127.295%20231.273%20131.166C227.354%20139.467%20216.854%20145.652%20208.018%20148.807C206.382%20154.673%20204.417%20159.68%20200.284%20165.656L241.073%20230.848L173.627%20193.681C167.102%20198.042%20159.653%20201.405%20151.47%20203.684C143.139%20206.003%20134.436%20207.094%20125.607%20206.929C107.593%20206.589%2090.9393%20201.011%2078.5514%20191.194L16.8045%20231.057Z'%20fill='black'/%3e%3cpath%20d='M173.433%20189.469L231.262%20221.337L196.204%20165.304L196.865%20164.383C201.385%20158.08%20203.261%20153.173%20204.974%20146.828L205.21%20145.956L206.068%20145.664C214.411%20142.835%20224.606%20137.101%20228.199%20129.49C229.862%20125.969%20229.969%20122.249%20228.517%20118.436L227.892%20116.795L229.558%20116.23C244.822%20111.053%20253.209%20104.057%20252.566%2097.037C252.128%2092.2505%20247.416%2087.301%20239.297%2083.0999C230.142%2078.363%20216.876%2074.6246%20200.935%2072.2899L200.116%2072.17L197.332%2067.3043L227.63%2010.349L174.874%2044.0633L173.935%2043.3871C160.865%2033.9665%20144.296%2028.5798%20127.278%2028.2204C118.726%2028.0426%20110.378%2029.1286%20102.47%2031.4554C94.2167%2033.8845%2086.6625%2037.6053%2080.0175%2042.515L79.1023%2043.1912L23.5184%209.72005L56.5829%2064.6709L55.9873%2065.5629C53.108%2069.8747%2050.463%2074.8265%2048.912%2078.8095L48.5938%2079.6255L47.7426%2079.8395C47.228%2079.9687%2046.6116%2080.1159%2045.9086%2080.2841C38.2724%2082.1116%2017.9895%2086.9648%2012.6282%2097.6752C10.7789%20101.371%2010.8451%20105.386%2012.8315%20109.952L13.4957%20111.478L11.9775%20112.169C6.09756%20114.843%203.21455%20118.004%203.40907%20121.563C3.63091%20125.628%207.7%20130.367%2015.1764%20135.27C23.083%20140.454%2034.5854%20145.607%2048.4401%20150.172L49.1843%20150.417L49.4802%20151.141C50.1231%20152.71%2053.1441%20158.924%2055.042%20162.031L55.5329%20162.834L55.1087%20163.675C52.2461%20169.347%2033.0418%20206.689%2025.6363%20221.086L78.7874%20186.772L79.7479%20187.565C91.6393%20197.382%20107.949%20202.973%20125.671%20203.308C134.168%20203.467%20142.544%20202.418%20150.556%20200.187C158.742%20197.908%20166.148%20194.504%20172.567%20190.068L173.433%20189.469Z'%20fill='%23FFE902'/%3e%3cpath%20d='M196.51%2075.8424L191.468%2067.0262L210.806%2030.2288L214.609%2023.417L174.157%2049.3317C133.671%2021.6705%2098.2713%2034.485%2078.0634%2047.7903L35.5102%2021.9202L61.1173%2065.3283C56.9241%2070.8581%2053.7373%2076.8326%2051.6717%2083.1965C40.8145%2085.772%2016.663%2091.13%2015.9261%20103.612C14.9475%20113.233%2033.9054%20117.194%2040.6149%20121.997C47.5943%20126.995%2013.8712%20112.098%208.48539%20118.663C6.42445%20121.32%208.03662%20125.973%2012.8041%20129.217C25.0373%20137.54%2038.7822%20142.316%2052.3303%20147.498C54.6293%20152.519%2057.2618%20157.43%2060.3995%20162.173C52.9115%20177.193%2044.8609%20191.99%2037.2594%20207.01C50.9664%20197.958%2064.1689%20189.521%2078.1542%20181.028L91.2563%20189.056C115.275%20202.603%20150.757%20199.899%20172.631%20183.587L217.366%20208.451L190.135%20164.876C195.111%20157.951%20198.239%20150.245%20201.425%20142.597C210.772%20140.859%20229.359%20128.146%20223.574%20120.645C220.177%20116.935%20210.735%20128.283%20213.109%20123.499C214.421%20120.762%20216.128%20117.525%20217.917%20114.621C239.393%20109.716%20246.186%20105.106%20247.129%2098.8018C249.11%2086.0994%20213.071%2078.29%20196.51%2075.8424Z'%20fill='%23FFE902'/%3e%3cpath%20d='M46.0374%20197.207L63.0321%20165.576C65.2973%20168.602%2068.8148%20172.376%2071.1666%20175.059C62.8325%20181.707%2046.0374%20197.207%2046.0374%20197.207ZM136.262%2037.3126C149.428%2039.4921%20165.434%2045.6138%20174.192%2053.2319L203.152%2034.4217C203.152%2034.4217%20187.43%2055.7537%20179.993%2065.6393C176.802%2065.4739%20174.671%2063.2833%20172.544%2060.7727C170.863%2058.652%20169.079%2054.7968%20168.082%2053.8048C167.489%2053.2157%20167.581%2058.8229%20168.645%2061.7804C147.601%2060.065%20126.482%2058.6626%2098.6216%2074.7366C82.6963%2075.8176%2070.024%2079.2772%2055.923%2081.9666C71.0091%2045.888%20106.551%2032.3941%20136.262%2037.3126ZM44.9194%2031.3257C44.9194%2031.3257%2074.2631%2049.0345%2075.5969%2050.0321C72.4291%2052.3598%2063.9686%2061.3071%2063.9686%2061.3071L44.9194%2031.3257ZM196.51%2075.8424L191.468%2067.0262L210.806%2030.2288L214.609%2023.417L174.157%2049.3317C133.671%2021.6705%2098.2713%2034.485%2078.0634%2047.7903L35.5102%2021.9202L61.1173%2065.3283C56.9241%2070.8581%2053.7373%2076.8326%2051.6717%2083.1965C40.8145%2085.772%2016.663%2091.13%2015.9261%20103.612C14.9475%20113.233%2033.9054%20117.194%2040.6149%20121.997C47.5943%20126.995%2013.8712%20112.098%208.48539%20118.663C6.42445%20121.32%208.03662%20125.973%2012.8041%20129.217C25.0373%20137.54%2038.7822%20142.316%2052.3303%20147.498C54.6293%20152.519%2057.2618%20157.43%2060.3995%20162.173C52.9115%20177.193%2044.8609%20191.99%2037.2594%20207.01C50.9664%20197.958%2064.1689%20189.521%2078.1542%20181.028L91.2563%20189.056C115.275%20202.603%20150.757%20199.899%20172.631%20183.587L217.366%20208.451L190.135%20164.876C195.111%20157.951%20198.239%20150.245%20201.425%20142.597C210.772%20140.859%20229.359%20128.146%20223.574%20120.645C220.177%20116.935%20210.735%20128.283%20213.109%20123.499C214.421%20120.762%20216.128%20117.525%20217.917%20114.621C239.393%20109.716%20246.186%20105.106%20247.129%2098.8018C249.11%2086.0994%20213.071%2078.29%20196.51%2075.8424Z'%20fill='black'/%3e%3cpath%20d='M105.723%20162.963C105.723%20163.113%20105.679%20163.342%20105.592%20163.651C105.442%20164.165%20105.22%20164.576%20104.927%20164.885C104.499%20165.336%20103.945%20165.637%20103.262%20165.787C102.835%20165.883%20102.086%20165.954%20101.016%20166.002L101.017%20168.303L105.072%20168.3L105.08%20180.159L108.553%20180.156L108.542%20162.962L105.723%20162.963Z'%20fill='%23FFE902'/%3e%3cpath%20d='M118.77%20171.178C118.357%20171.449%20117.918%20171.583%20117.45%20171.583C116.586%20171.584%20115.944%20171.331%20115.523%20170.825C115.111%20170.312%20114.904%20169.545%20114.903%20168.525C114.902%20167.316%20115.227%20166.458%20115.878%20165.951C116.289%20165.627%20116.785%20165.464%20117.363%20165.464C118.155%20165.463%20118.779%20165.747%20119.23%20166.316C119.691%20166.885%20119.921%20167.656%20119.922%20168.628C119.921%20169.839%20119.538%20170.689%20118.77%20171.178ZM117.197%20162.811C115.493%20162.813%20114.106%20163.386%20113.038%20164.534C111.975%20165.673%20111.445%20167.163%20111.446%20169.006C111.448%20170.784%20111.98%20172.147%20113.044%20173.095C114.107%20174.036%20115.324%20174.504%20116.694%20174.503C117.622%20174.503%20118.402%20174.313%20119.036%20173.934C119.386%20173.728%20119.714%20173.432%20120.022%20173.044C119.961%20174.348%20119.808%20175.339%20119.562%20176.021C119.111%20177.254%20118.326%20177.87%20117.207%20177.871C116.628%20177.872%20116.165%20177.715%20115.816%20177.399C115.467%20177.083%20115.253%20176.671%20115.174%20176.166L111.797%20176.168C111.948%20177.63%20112.54%20178.744%20113.572%20179.51C114.602%20180.268%20115.762%20180.648%20117.055%20180.647C119.069%20180.645%20121.629%20179.319%20122.64%20176.67C123.171%20175.278%20123.437%20173.543%20123.435%20171.463C123.432%20169.321%20123.154%20167.594%20122.599%20166.281C121.622%20163.967%20119.821%20162.809%20117.197%20162.811Z'%20fill='%23FFE902'/%3e%3cpath%20d='M128.457%20173.628L132.482%20166.51L132.487%20173.625L128.457%20173.628ZM137.577%20173.791L135.626%20173.792L135.62%20163.048L131.813%20163.051L125.483%20173.491L125.485%20176.443L132.311%20176.438L132.314%20180.138L135.631%20180.136L135.628%20176.436L137.579%20176.435L137.577%20173.791Z'%20fill='%23FFE902'/%3e%3cpath%20d='M147.333%20176.935C146.897%20177.402%20146.291%20177.636%20145.514%20177.636C144.736%20177.637%20144.126%20177.404%20143.682%20176.937C143.246%20176.472%20143.028%20175.816%20143.028%20174.97C143.027%20174.092%20143.247%20173.428%20143.691%20172.977C144.144%20172.519%20144.749%20172.288%20145.51%20172.287C146.272%20172.288%20146.874%20172.517%20147.317%20172.974C147.77%20173.425%20147.997%20174.089%20147.997%20174.966C147.996%20175.812%20147.776%20176.469%20147.333%20176.935ZM144.068%20165.992C144.457%20165.605%20144.992%20165.411%20145.673%20165.41C146.362%20165.41%20146.893%20165.603%20147.267%20165.99C147.647%20166.37%20147.837%20166.899%20147.838%20167.579C147.838%20168.204%20147.649%20168.713%20147.269%20169.109C146.896%20169.505%20146.365%20169.702%20145.676%20169.702C144.994%20169.703%20144.459%20169.506%20144.07%20169.111C143.689%20168.716%20143.498%20168.206%20143.498%20167.582C143.498%20166.901%20143.687%20166.371%20144.068%20165.992ZM150.933%20172.738C150.503%20171.955%20149.864%20171.327%20149.016%20170.853C149.848%20170.379%20150.387%20169.821%20150.633%20169.181C150.885%20168.532%20151.013%20167.928%20151.012%20167.366C151.011%20166.117%20150.539%20165.054%20149.595%20164.177C148.65%20163.292%20147.319%20162.85%20145.598%20162.851C143.879%20162.853%20142.546%20163.296%20141.604%20164.182C140.661%20165.061%20140.189%20166.125%20140.19%20167.373C140.191%20167.935%20140.314%20168.539%20140.561%20169.188C140.816%20169.827%20141.359%20170.424%20142.192%20170.977C141.344%20171.373%20140.698%20171.962%20140.254%20172.745C139.819%20173.529%20139.601%20174.402%20139.602%20175.366C139.603%20176.813%20140.099%20178.046%20141.09%20179.065C142.083%20180.077%20143.542%20180.581%20145.467%20180.58C147.394%20180.579%20148.891%20180.072%20149.961%20179.059C151.039%20178.038%20151.577%20176.804%20151.576%20175.359C151.575%20174.393%20151.36%20173.52%20150.933%20172.738Z'%20fill='%23FFE902'/%3e%3cpath%20d='M196.745%20127.138C195.402%20128.312%20193.141%20130.796%20191.576%20129.628C190.009%20128.46%20191.831%20125.112%20193.584%20122.985C195.337%20120.858%20199.823%20117.991%20200.634%20120.189C201.445%20122.388%20198.535%20125.072%20196.745%20127.138ZM204.686%20128.197C206.699%20124.177%20210.452%20117.73%20211.282%20116.137C209.142%20116.555%20205.77%20116.459%20203.967%20117.665C203.346%20116.198%20201.779%20115.469%20198.982%20115.317C189.558%20114.72%20171.702%20129.697%20178.891%20136.866C182.968%20141.101%20192.241%20135.501%20194%20133.842C194.206%20135.828%20196.354%20136.855%20198.033%20137.244C200.552%20137.745%20203.182%20137.353%20205.252%20136.066C207.209%20134.949%20209.47%20132.823%20210.509%20131.43C204.164%20132.234%20204.08%20129.687%20204.686%20128.197Z'%20fill='%23FFE902'/%3e%3cpath%20d='M148.137%2098.1559C146.566%2099.5301%20143.621%20102.357%20144.258%20105.346C144.828%20107.13%20146.484%20107.847%20148.83%20107.424C151.927%20106.866%20156.786%20101.011%20155.472%2097.8795C154.158%2094.7482%20149.708%2096.7818%20148.137%2098.1559Z'%20fill='%23FFE902'/%3e%3cpath%20d='M57.756%2098.9827C57.0298%20101.507%2063.3951%20102.415%2067.7852%20102.782C67.7852%20102.782%2070.7251%2096.7448%2073.867%2094.2087C67.3285%2095.0757%2058.4822%2096.4581%2057.756%2098.9827Z'%20fill='%23FFE902'/%3e%3cpath%20d='M114.71%20123.107C113.207%20124.421%20110.677%20127.202%20108.924%20125.894C107.171%20124.586%20109.211%20120.84%20111.173%20118.459C113.135%20116.078%20118.156%20112.869%20119.064%20115.329C119.971%20117.79%20116.714%20120.795%20114.71%20123.107ZM147.941%20111.605L140.795%20111.962C138.223%20115.035%20130.647%20129.576%20124.417%20128.029C119.316%20125.368%20131.264%20111.605%20131.264%20111.605C131.175%20111.704%20124.4%20111.244%20122.653%20113.228C122.412%20110.763%20121.977%20109.291%20116.733%20109.612C106.831%20110.218%2098.6085%20117.72%2096.247%20123.298C93.7173%20129.273%2095.3661%20133.001%2099.2124%20134.301C103.059%20135.602%20108.941%20133.782%20112.833%20129.086C111.586%20130.591%20112.844%20134.495%20115.281%20135.341C120.913%20137.297%20128.017%20132.523%20129.178%20131.475C132.658%20137.452%20144.789%20131.56%20146.037%20125.613C144.752%20126.688%20138.34%20129.568%20139.248%20126.054C140.464%20121.345%20147.941%20111.605%20147.941%20111.605Z'%20fill='%23FFE902'/%3e%3cpath%20d='M201.764%2092.6579C203.396%2095.4788%20203.831%2097.8663%20203.94%20100.796C207.857%2099.4937%20207.313%2093.4174%20201.764%2092.6579Z'%20fill='%23FFE902'/%3e%3cpath%20d='M201.884%20103.024C190.437%20104.986%20181.346%20106.276%20181.346%20106.276C186.099%2099.4074%20192.416%2087.7373%20202.715%2090.354C209.507%2091.7972%20213.332%20101.063%20201.884%20103.024ZM161.369%20108.345C153.199%20109.104%20151.809%20112.542%20155.55%20112.367C159.29%20112.192%20159.355%20112.365%20159.355%20112.365C153.655%20122.417%20154.375%20131.903%20135.7%20139.52C112.912%20148.815%2053.2226%20140.459%2057.112%20135.834C61.0014%20131.209%2089.5745%20135.685%2089.6379%20119.559C89.5286%20108.955%2075.384%20108.288%2067.677%20107.237C57.7558%20105.884%2041.7605%20101.92%2057.0254%2093.7715C70.5522%2086.5508%20104.317%2083.7312%20138.402%2083.6349C155.402%2083.5863%20168.236%2084.7293%20181.894%2086.6179C173.838%2091.981%20164.632%20102.359%20161.369%20108.345ZM226.589%2087.6104C221.753%2086.1761%20208.844%2083.4367%20199.609%2082.2145C161.94%2077.44%20119.57%2075.6259%2082.1328%2082.2941C63.2735%2085.9913%2022.7961%2093.4543%2021.8059%20103.041C20.8157%20112.627%2042.9299%20116.835%2051.8087%20120.278C56.9221%20122.26%2064.8237%20126.693%2054.348%20128.53C42.9295%20130.532%2013.0346%20118.499%2014.506%20123.6C15.9778%20128.702%2035.1558%20135.632%2046.1283%20139.811C79.38%20150.617%20130.595%20158.715%20156.595%20140.985C168.935%20132.57%20174.843%20122.923%20179.649%20112.593C197.335%20112.302%20221.243%20108.8%20228.311%20107.016C236.142%20105.04%20242.005%20102.069%20242.085%2098.1717C242.203%2092.4516%20231.424%2089.0448%20226.589%2087.6104Z'%20fill='%23FFE902'/%3e%3c/svg%3e";
//#endregion
//#region src/assets/logos/sport.svg
var sport_default = "data:image/svg+xml,%3csvg%20width='265'%20height='192'%20viewBox='0%200%20265%20192'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M224.075%20108.32C224.075%20108.32%20201.135%20123.515%20196.866%20191.441C196.866%20191.441%20157.623%20103.316%2090.2821%20148.839C90.2821%20148.839%20104.391%20105.641%2016.5383%20116.543C16.5383%20116.543%20101.725%2070.9625%2098.5225%2068.1021C95.3205%2065.2418%2080.382%2058.9869%2054.7745%2058.6288C54.7745%2058.6288%2093.8983%2048.9763%2098.5225%2048.9763L115.06%2039.1448C115.06%2039.1448%20108.302%2033.2465%2086.0736%2027.1692C86.0736%2027.1692%20101.189%2025.5607%20120.22%2027.3483L228.699%2084.011L224.075%20108.32Z'%20fill='%23ED1C24'/%3e%3cpath%20d='M217.329%20150.091C217.329%20150.091%20299.301%2076.009%20247.708%2050.7125C247.708%2050.7125%20263.691%2015.9778%20240.517%2013.4908C203.487%209.51477%20180.86%2018.4709%20153.474%206.46028e-05C153.474%206.46028e-05%20161.106%2012.5603%20152.051%2014.1213C139.602%2016.2655%2068.4679%2014.2989%2068.4679%2014.2989C68.4679%2014.2989%20126.877%2029.0905%20107.235%2033.7828C85.5395%2038.9664%2043.3918%2048.7979%2043.3918%2048.7979C43.3918%2048.7979%2098.8183%2052.7311%2088.5635%2062.2045C77.2565%2072.6497%2025.8861%2099.0772%200%20111.002C0%20111.002%20103.146%2098.6686%2085.5395%20145.501C103.561%20128.342%20163.789%20108.56%20195.219%20177.737C195.219%20177.737%20202.107%20118.41%20222.002%20107.449C222.002%20107.449%20223.68%20120.699%20217.329%20150.091Z'%20fill='white'/%3e%3cpath%20d='M242.214%2051.1802C242.214%2051.1802%20257.45%2025.8576%20243.699%2018.2315C232.233%2011.8741%20190.579%2020.7582%20170.692%2012.0761C165.21%2010.3666%20158.837%205.76764%20158.837%205.76764C158.837%205.76764%20164.195%2013.0204%20158.572%2015.8471C152.408%2018.9462%20106.405%2017.5168%2085.7767%2016.8021C85.7767%2016.8021%20128.457%2027.7645%20114.467%2033.7225C104.64%2037.9067%2056.6671%2047.827%2056.6671%2047.827C56.6671%2047.827%2096.6543%2050.9873%2096.4472%2058.5094C96.2097%2067.089%2036.6933%2098.0726%2015.5212%20107.059C15.5212%20107.059%20102.026%2093.8103%2090.5196%20136.921C107.634%20119.956%20164.361%20105.937%20193.428%20168.857C193.428%20168.857%20195.8%2094.4409%20248.454%2090.5857C256.079%2090.0271%20240.783%2062.8971%20240.783%2062.8971L242.214%2051.1802Z'%20fill='black'/%3e%3cpath%20d='M242.036%2050.0497C242.036%2050.0497%20253.419%2023.2365%20233.858%2021.2699C233.858%2021.2699%20217.672%2050.8837%20168.056%2016.5638C167.82%2023.714%20140.195%2021.8071%20107.118%2020.3776C107.118%2020.3776%20136.066%2024.7822%20133.2%2030.8642C131.067%2035.3912%2099.5304%2042.5414%2079.849%2046.5939C79.849%2046.5939%20128.107%2050.0435%20115.416%2062.7997C99.5304%2078.7682%2039.303%2099.98%2039.303%2099.98C39.303%2099.98%20113.047%2091.1617%2095.736%20126.435C95.736%20126.435%20118.735%20101.648%20147.665%20116.902L235.811%2061.1315L242.036%2050.0497Z'%20fill='white'/%3e%3cmask%20id='mask0_18_244'%20style='mask-type:luminance'%20maskUnits='userSpaceOnUse'%20x='30'%20y='13'%20width='218'%20height='118'%3e%3cpath%20d='M155.608%2019.3041C144.048%2020.1979%2097.4555%2018.946%2097.4555%2018.946C97.4555%2018.946%20125.554%2025.0234%20121.997%2029.6713C112.571%2039.1462%2074.5142%2045.0445%2069.89%2046.4754C69.89%2046.4754%20113.816%2053.0869%20110.97%2058.9867C104.026%2073.3896%2045.7046%2096.793%2030.7661%20101.888C30.7661%20101.888%20102.791%20100.278%2093.3643%20130.306C93.3643%20130.306%20121.819%20106.891%20149.563%20118.153C149.563%20118.153%20129.999%20102.69%20103.68%20114.22C103.68%20114.22%2098.0768%2090.3575%2053.8841%2096.1655C53.8841%2096.1655%20174.636%2055.2341%2093.7206%2045.5801C93.7206%2045.5801%20141.56%2038.2524%20138.358%2029.6713C136.619%2025.0081%20122.708%2022.3436%20122.708%2022.3436C122.708%2022.3436%20168.769%2025.9171%20169.479%2019.6607C169.479%2019.6607%20209.848%2051.6575%20234.568%2022.8808C234.568%2022.8808%20248.972%2023.2374%20242.215%2050.049L245.771%2050.4056C245.771%2050.4056%20253.863%2021.8079%20233.857%2018.946C233.857%2018.946%20225.676%2033.427%20204.513%2029.6713C183.35%2025.9171%20167.702%2013.0477%20167.702%2013.0477C167.702%2013.0477%20167.167%2018.4104%20155.608%2019.3041Z'%20fill='white'/%3e%3c/mask%3e%3cg%20mask='url(%23mask0_18_244)'%3e%3cpath%20d='M242.036%2050.0496C242.036%2050.0496%20253.419%2023.2364%20233.858%2021.2698C233.858%2021.2698%20217.672%2050.8837%20168.056%2016.5637C167.82%2023.7139%20140.195%2021.807%20107.118%2020.3776C107.118%2020.3776%20136.066%2024.7822%20133.2%2030.8641C131.067%2035.3911%2099.5304%2042.5413%2079.849%2046.5939C79.849%2046.5939%20128.107%2050.0435%20115.416%2062.7996C99.5304%2078.7682%2039.303%2099.9799%2039.303%2099.9799C39.303%2099.9799%20113.047%2091.1616%2095.736%20126.435C95.736%20126.435%20118.735%20101.648%20147.665%20116.902L235.811%2061.1315L242.036%2050.0496Z'%20fill='%23BCBEC0'/%3e%3c/g%3e%3cpath%20d='M190.82%2054.6962C190.82%2054.6962%20159.046%2046.2359%20151.34%2024.6675C151.34%2024.6675%20151.162%2040.278%20155.253%2045.9972C155.253%2045.9972%20147.25%2046.2956%20143.515%2047.3685C143.515%2047.3685%20158.927%2051.242%20164.143%2061.4898C164.143%2061.4898%20160.705%2049.4544%20164.322%2047.1894C164.322%2047.1894%20167.524%2050.2273%20169.835%2051.4792C169.835%2051.4792%20165.211%2068.8175%20176.95%2068.9965C176.95%2068.9965%20176.771%2056.1271%20182.106%2055.5899C187.441%2055.0543%20190.82%2054.6962%20190.82%2054.6962Z'%20fill='black'/%3e%3cpath%20d='M236.109%2044.6273C236.109%2044.6273%20239.606%2044.0916%20241.799%2045.9373C241.799%2045.9373%20237.236%2047.5473%20236.879%2050.0496H232.79C232.79%2050.0496%20233.026%2047.6667%20232.314%2045.997C232.314%2045.997%20230.833%2046.9658%20229.721%2049.5124C228.85%2051.5112%20227.276%2051.6581%20227.276%2051.6581L222.207%2050.6296C222.207%2050.6296%20235.323%2043.4795%20237.59%2025.6193C237.59%2025.6193%20238.776%2037.6562%20236.109%2044.6273Z'%20fill='black'/%3e%3cpath%20d='M221.407%20141.391C221.407%20141.391%20299.122%2067.0299%20235.811%2049.156C187.441%2043.0786%20183.528%2088.4804%20155.252%2090.9827C144.582%2089.7323%20152.763%2061.1316%20145.649%2059.8812C138.536%2058.6293%20114.172%2069.7112%20125.376%2092.2346C136.579%20114.756%20157.564%20123.158%20158.453%20124.767C159.342%20126.375%20176.772%20134.061%20187.797%20152.293C192.053%20159.33%20192.954%20167.308%20192.954%20167.308C192.954%20167.308%20196.866%20122.086%20221.407%20100.635C221.407%20100.635%20229.054%20104.031%20221.407%20141.391Z'%20fill='black'/%3e%3cpath%20d='M228.166%20127.983C228.166%20127.983%20279.638%2072.0661%20239.904%2056.8414C196.984%2040.3969%20174.577%20102.577%20151.696%2094.7364C141.263%2091.1613%20146.005%2066.8519%20143.515%2065.6C141.026%2064.3481%20125.139%2071.3789%20129.288%2085.6196C134.064%20102.014%20149.562%20114.04%20171.792%20131.559C185.322%20142.221%20190.82%20152.651%20190.82%20152.651C190.82%20152.651%20191.888%20141.926%20157.032%20115.293C122.174%2088.659%20135.512%2073.4649%20137.113%2073.2858C138.713%2073.1083%20137.291%2085.9777%20142.626%2091.876C147.961%2097.7743%20157.415%20110.033%20194.555%2088.1219C210.916%2078.4694%20230.833%2084.7258%20228.166%20127.983Z'%20fill='%23FAA619'/%3e%3cpath%20d='M190.82%20152.651C190.82%20152.651%20191.814%20148.516%20176.355%20131.44C158.986%20112.254%20137.042%20101.893%20133.674%2084.9633C132.252%2077.8147%20135.926%2074.1799%20135.926%2074.1799C135.926%2074.1799%20125.019%2084.9052%20141.261%20102.124C152.973%20114.539%20173.57%20128.519%20184.417%20141.687C190.852%20149.497%20190.82%20152.651%20190.82%20152.651Z'%20fill='%23FFC20D'/%3e%3cmask%20id='mask1_18_244'%20style='mask-type:luminance'%20maskUnits='userSpaceOnUse'%20x='139'%20y='54'%20width='116'%20height='74'%3e%3cpath%20d='M185.908%2074.741C173.147%2086.585%20162.473%2098.4306%20151.696%2094.7346C141.263%2091.161%20146.005%2066.8516%20143.515%2065.5997C142.883%2065.2829%20141.386%2065.4987%20139.574%2066.2318C141.248%2066.1017%20142.821%2066.4307%20143.695%2067.7454C145.068%2069.8161%20141.557%2096.3446%20153.651%2096.3446C161.94%2097.7618%20172.046%2087.664%20183.823%2077.5677C197.317%2066.0022%20213%2054.4352%20230.655%2060.1805C248.29%2065.9135%20247.353%2095.7278%20228.22%20127.076C228.202%20127.376%20228.184%20127.68%20228.165%20127.983C228.165%20127.983%20279.638%2072.0658%20239.903%2056.8411C234.853%2054.9066%20230.087%2054.0603%20225.571%2054.0603C209.784%2054.0603%20197.052%2064.3999%20185.908%2074.741Z'%20fill='white'/%3e%3c/mask%3e%3cg%20mask='url(%23mask1_18_244)'%3e%3cpath%20d='M228.166%20127.983C228.166%20127.983%20279.638%2072.066%20239.904%2056.8413C196.984%2040.3968%20174.577%20102.577%20151.696%2094.7363C141.263%2091.1612%20146.005%2066.8518%20143.515%2065.6C141.026%2064.3481%20125.139%2071.3789%20129.288%2085.6195C134.064%20102.014%20149.562%20114.04%20171.792%20131.559C185.322%20142.221%20190.82%20152.651%20190.82%20152.651C190.82%20152.651%20191.888%20141.926%20157.032%20115.293C122.174%2088.659%20135.512%2073.4648%20137.113%2073.2858C138.713%2073.1083%20137.291%2085.9777%20142.626%2091.8759C147.961%2097.7742%20157.415%20110.033%20194.555%2088.1218C210.916%2078.4694%20230.833%2084.7258%20228.166%20127.983Z'%20fill='%23FFC20D'/%3e%3c/g%3e%3cpath%20d='M155.727%20105.462C155.727%20105.462%20170.667%20106.654%20176.593%20103.079C176.593%20103.079%20190.82%20110.466%20209.078%20149.552C209.078%20149.552%20188.212%20114.519%20155.727%20105.462Z'%20fill='%23ED1C24'/%3e%3cpath%20d='M215.54%2062.9184C215.54%2062.9184%20199.324%2062.496%20201.846%2071.6771C203.249%2076.7857%20208.515%2069.4426%20210.339%2067.3888C212.16%2065.3319%20215.54%2062.9184%20215.54%2062.9184Z'%20fill='black'/%3e%3c/svg%3e";
//#endregion
//#region src/assets/logos/tappara.svg
var tappara_default = "data:image/svg+xml,%3csvg%20width='213'%20height='256'%20viewBox='0%200%20213%20256'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M211.247%2026.9421L106.263%200L1.27675%2026.9421C-2.55495%2059.4029%202.59604%2099.7655%2011.9446%20134.774C26.3216%20188.612%2058.1828%20224.354%20106.254%20256C106.254%20256%20106.259%20255.995%20106.263%20255.995C106.263%20255.995%20106.267%20255.998%20106.27%20256C157.537%20223.629%20186.496%20187.197%20200.579%20134.772C209.98%2099.7797%20215.077%2059.4029%20211.247%2026.9421Z'%20fill='white'/%3e%3cpath%20d='M207.487%2029.7649L106.262%203.78842L5.03744%2029.7649C1.34271%2061.0635%206.30987%2099.9787%2015.3232%20133.735C29.1847%20185.643%2059.9051%20220.104%20106.253%20250.616C106.257%20250.615%20106.259%20250.611%20106.262%20250.611L106.269%20250.616C155.699%20219.408%20183.621%20184.277%20197.199%20133.733C206.265%2099.9928%20211.18%2061.0635%20207.487%2029.7649Z'%20fill='%230C2576'/%3e%3cpath%20d='M76.1536%20134.199C70.1663%20134.095%2065.2334%20138.609%2065.1343%20144.285C65.0369%20149.96%2069.8076%20154.644%2075.7949%20154.751C81.7822%20154.855%2086.7151%20150.339%2086.8142%20144.663C86.9151%20138.99%2082.1426%20134.304%2076.1536%20134.199Z'%20fill='white'/%3e%3cpath%20d='M147.425%20144.285C147.326%20138.609%20142.393%20134.096%20136.405%20134.199C130.416%20134.303%20125.646%20138.99%20125.745%20144.663C125.844%20150.339%20130.779%20154.855%20136.764%20154.751C142.751%20154.644%20147.524%20149.962%20147.425%20144.285Z'%20fill='white'/%3e%3cpath%20d='M140.228%2025.7933V54.8649C148.845%2060.4511%20159.491%2076.2864%20156.618%2090.017C154.796%2098.7284%20147.32%20105.852%20139.604%20105.852L72.2736%20105.854C67.0379%20105.854%2057.8695%20102.006%2055.2778%2090.6814C52.4284%2078.2317%2059.7115%2065.3143%2071.5743%2054.7728V25.7933C44.1251%2052.0816%2031.5378%2080.4818%2031.5378%20116.04C31.5378%20156.356%2048.3101%20182.607%2071.7401%20204.418V171.626C61.339%20163.099%2054.1117%20155.263%2054.1117%20144.137C54.1117%20132.677%2062.5699%20124.737%2073.227%20124.737H100.57H106.274H138.786C150.353%20124.737%20158.025%20133.719%20158.025%20144.03C158.025%20155.419%20150.422%20163.282%20140.233%20170.825V204.557C163.908%20182.501%20179.961%20155.949%20179.961%20116.04C179.961%2080.6607%20167.938%2052.1666%20140.228%2025.7933Z'%20fill='%23FF6600'/%3e%3cpath%20d='M105.878%20128.503L100.435%20128.496L100.408%20223.208L106.068%20228.034L111.064%20223.276L111.065%20128.496H107.336L105.878%20128.503Z'%20fill='%23FF6600'/%3e%3cpath%20d='M111.06%20102.119L111.034%2074.1497V72.8759H100.466V74.1497L100.419%20102.119H111.06Z'%20fill='%23FF6600'/%3e%3cpath%20d='M100.466%2074.1497L100.466%2072.8748H111.035L111.034%2074.1497L111.06%20102.119H100.419L100.466%2074.1497ZM72.2727%20105.855L139.603%20105.851C147.321%20105.851%20154.795%2098.7291%20156.617%2090.0177C159.49%2076.2871%20148.845%2060.4518%20140.229%2054.8639V68.9771C148.507%2071.7463%20153.295%2077.8373%20153.295%2085.0339C153.295%2094.7233%20145.56%20102.12%20137.797%20102.12H114.468L114.472%2069.2907H97.0201L97.0309%20102.12H73.8064C67.2064%20102.12%2058.9194%2095.8944%2058.9194%2085.856C58.9194%2076.1719%2065.7267%2070.2155%2071.5734%2068.7858V54.7735C59.7106%2065.3133%2052.4293%2078.2306%2055.2787%2090.6821C57.8704%20102.005%2067.037%20105.855%2072.2727%20105.855Z'%20fill='white'/%3e%3cpath%20d='M106.068%20228.034L100.409%20223.208L100.436%20128.495L105.879%20128.502L107.335%20128.495H111.064L111.063%20223.275L106.068%20228.034ZM138.786%20124.737H106.274L106.25%20124.737L100.57%20124.737H73.227C62.5699%20124.737%2054.1117%20132.677%2054.1117%20144.137C54.1117%20155.263%2061.3406%20163.1%2071.7399%20171.625V160.594C65.859%20158.741%2058.8065%20153.917%2058.8065%20143.96C58.8065%20136.934%2063.3592%20128.495%2074.355%20128.495H96.6117L96.0999%20225.32L106.068%20234.243L115.545%20225.32L115.033%20128.495H137.836C148.352%20128.495%20153.682%20137.329%20153.682%20143.985C153.682%20152.099%20146.514%20158.722%20140.233%20160.529L140.233%20170.825C150.422%20163.282%20158.025%20155.419%20158.025%20144.03C158.025%20133.719%20150.353%20124.737%20138.786%20124.737Z'%20fill='white'/%3e%3cpath%20d='M76.1536%2075.737C70.1663%2075.6325%2065.2334%2080.1467%2065.1343%2085.8232C65.0369%2091.4979%2069.8076%2096.1823%2075.7949%2096.2886C81.7822%2096.3931%2086.7151%2091.8771%2086.8142%2086.2006C86.9151%2080.5276%2082.1426%2075.8415%2076.1536%2075.737Z'%20fill='white'/%3e%3cpath%20d='M147.425%2085.823C147.326%2080.1465%20142.393%2075.6341%20136.405%2075.7368C130.416%2075.8413%20125.646%2080.5275%20125.745%2086.2004C125.844%2091.8769%20130.779%2096.3929%20136.764%2096.2884C142.751%2096.1821%20147.524%2091.4995%20147.425%2085.823Z'%20fill='white'/%3e%3c/svg%3e";
//#endregion
//#region src/assets/logos/tps.svg
var tps_default = "data:image/svg+xml,%3csvg%20width='256'%20height='256'%20viewBox='0%200%20256%20256'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M128.001%200C57.4207%200%200%2057.4207%200%20128C0%20198.579%2057.4207%20256%20128.001%20256C198.579%20256%20256%20198.579%20256%20128C256%2057.4207%20198.579%200%20128.001%200Z'%20fill='%23040606'/%3e%3cpath%20d='M156.867%20176.145C123.747%20182.234%2092.5624%20184.334%2071.0123%20182.086C70.7884%20181.197%2070.4222%20180.39%2070.245%20180.059C79.1416%20173.975%2090.1189%20165.778%20102.403%20155.852C110.187%20157.508%20118.194%20157.966%20124.567%20157.966C132.556%20157.966%20143.57%20157.184%20151.649%20155.334L152.387%20146.774C163.755%20151.844%20174.332%20151.461%20174.332%20151.461C186.062%20151.461%20195.64%20146.99%20202.018%20138.53C210.324%20127.522%20213.496%20114.108%20211.186%2099.7409C210.05%2092.6685%20207.813%2086.8035%20206.095%2083.1393C206.095%2083.1393%20207.615%2067.9927%20203.164%2059.0766C206.824%2054.8662%20210.467%2050.5652%20214.068%2046.1797C234.341%2067.5023%20246.8%2096.3229%20246.8%20128C246.8%20135.978%20246.004%20143.772%20244.497%20151.313C218.214%20161.813%20187.969%20170.428%20156.867%20176.145ZM167.738%20239.977C146.956%20234.521%20126.495%20226.495%20108.221%20216.477C92.7591%20208.002%2079.5231%20198.453%2070.2457%20189.281C70.7305%20188.591%2071.1658%20187.356%2071.306%20186.324C76.9826%20186.9%2083.2229%20187.195%2089.9647%20187.195C109.345%20187.195%20132.687%20184.845%20157.623%20180.261C187.947%20174.688%20217.481%20166.376%20243.399%20156.249C233.865%20195.204%20205.079%20226.681%20167.738%20239.977ZM128%20246.822C107.049%20246.822%2087.3531%20241.363%2070.245%20231.802C67.2798%20218.886%2065.0699%20204.135%2064.3291%20192.729C65.3148%20192.729%2066.6171%20192.333%2067.1277%20192.063C76.7266%20201.588%2090.3511%20211.455%20106.209%20220.147C119.168%20227.252%20137.607%20235.81%20160.338%20242.346C150.053%20245.261%20139.205%20246.822%20128%20246.822ZM34.9896%20201.835C42.2608%20197.372%2049.5244%20192.954%2055.9732%20189.104C57.1716%20190.354%2058.5827%20191.337%2060.0845%20191.964C60.6949%20202.677%2062.6111%20216.332%2065.2855%20228.871C53.7062%20221.644%2043.455%20212.481%2034.9896%20201.835ZM14.5688%20163.354C25.6041%20171.341%2038.3155%20178.275%2052.6292%20182.624C52.7149%20183.55%2053.3665%20185.295%2053.5974%20185.647C47.0809%20189.539%2039.7517%20193.999%2032.4289%20198.496C24.6477%20187.97%2018.556%20176.124%2014.5688%20163.354ZM9.19983%20128.001C9.19983%2099.0977%2019.5751%2072.577%2036.7899%2051.9554C36.6434%2059.1401%2036.6951%2066.5425%2036.935%2074.0809L24.345%20105.996L38.9579%20103.944C36.8185%20109.945%2034.788%20117.642%2034.4531%20125.833C34.0904%20134.696%2035.4785%20141.704%2038.6991%20147.259C40.879%20151.02%2043.8749%20154.005%2047.6368%20156.193C49.7469%20164.156%2052.0488%20170.739%2054.4351%20175.463C54.0508%20175.889%2053.2346%20176.887%2052.8538%20178.315C37.553%20173.513%2024.1357%20165.634%2012.719%20156.732C10.4254%20147.527%209.19983%20137.905%209.19983%20128.001ZM41.1077%2047.0642C60.1473%2026.6295%2086.2817%2012.892%20115.549%209.82904C111.218%2018.3266%20106.529%2027.9437%20101.772%2038.4313C98.2348%2046.232%2094.5071%2054.869%2090.7878%2064.1318C87.5847%2064.2831%2083.4036%2064.6138%2076.1916%2066.6806C62.2588%2070.6273%2047.8503%2072.4884%2041.0889%2073.2062C40.8183%2064.2399%2040.8259%2055.4843%2041.1077%2047.0642ZM88.3931%20139.152L85.3679%20125.823C85.3679%20125.823%2078.979%20129.001%2073.1043%20131.08C76.3765%20118.075%2080.2451%20105.363%2084.392%2093.2718C90.9671%2091.2845%2095.8771%2087.7703%2098.3799%2083.4992C98.7315%2096.0871%2096.9416%20114.791%2088.3931%20139.152ZM64.9437%20174.406C65.508%20169.623%2066.1999%20164.833%2066.9979%20160.048C79.1116%20158.759%2090.0247%20151.886%2090.0247%20151.886C92.3259%20152.949%2094.768%20153.825%2097.2757%20154.562C86.0347%20163.555%2075.9817%20171.036%2067.8378%20176.622C66.9686%20175.729%2065.9872%20174.985%2064.9437%20174.406ZM59.1749%20177.098C61.9909%20176.528%2065.5345%20178.899%2066.9135%20182.275C67.6348%20184.042%2068.1559%20187.876%2064.7149%20188.713C61.8989%20189.283%2058.3546%20186.911%2056.977%20183.535C54.9464%20177.915%2059.1624%20177.1%2059.1749%20177.098ZM60.7605%20122.095C63.7055%20107.618%2066.5794%20102.609%2069.8565%2096.3062L79.588%2094.4061C75.4704%20106.603%2072.254%20117.272%2068.4419%20132.473C60.3517%20134.688%2059.7867%20126.882%2060.7605%20122.095ZM62.7234%20160.239C62.0195%20164.526%2061.3966%20168.818%2060.8777%20173.106C60.0434%20173.027%2058.9141%20173.04%2058.0365%20173.316C56.1399%20169.526%2054.2977%20164.479%2052.5671%20158.451C56.2752%20159.786%2059.8857%20160.198%2062.7234%20160.239ZM179.125%2074.5273C178.853%2073.6749%20178.975%2071.5934%20180.366%2070.7166C181.756%2069.8391%20184.136%2070.4313%20187.079%2071.705C190.159%2073.0402%20195.043%2075.626%20197.427%2078.421C196.399%2079.2434%20191.962%2080.5702%20186.63%2079.526C183.074%2078.8298%20179.978%2077.2087%20179.125%2074.5273ZM122.219%20109.129C127.108%20106.27%20137.249%2099.9627%20145.408%2092.4187C148.917%2089.1723%20151.632%2085.1384%20153.291%2080.7815C155.231%2086.1003%20160.001%2091.5552%20163.626%2095.1685C157.727%20101.045%20152.038%20106.539%20146.712%20111.552C139.38%20118.451%20132.126%20125.027%20125.069%20131.225C120.348%20131.225%20119.239%20128.951%20119.239%20126.278C119.232%20122.761%20120.79%20115.266%20122.219%20109.129ZM121.642%2075.513C123.638%2073.9316%20126.196%2072.4863%20128.55%2071.8181C131.006%2071.1205%20132.918%2071.4372%20133.095%2073.5766C133.338%2076.5063%20127.254%2080.7174%20122.074%2083.5278C122.161%2081.9367%20122.025%2077.2352%20121.642%2075.513ZM132.355%20130.382C137.994%20125.352%20143.753%20120.083%20149.58%20114.599C154.962%20109.534%20166.671%2098.0479%20166.671%2098.0479C166.671%2098.0479%20179.531%20108.206%20182.116%20112.702C182.866%20113.982%20183.214%20115.941%20182.551%20117.909C181.648%20120.589%20177.771%20123.743%20174.242%20123.743C169.221%20123.743%20161.791%20119.531%20161.791%20119.531L153.506%20133.806L154.558%20121.624C154.558%20121.624%20144.083%20128.022%20132.355%20130.382ZM128%209.17755C160.326%209.17755%20189.673%2022.1638%20211.114%2043.1879C207.746%2047.2972%20202.385%2053.5751%20200.914%2055.2813C195.676%2048.0833%20186.701%2044.4009%20178.707%2044.4002C175.598%2044.4002%20172.517%2044.9311%20169.55%2045.9767C161.15%2048.9371%20155.593%2054.0571%20152.946%2061.2223C149.702%2054.9932%20144.421%2050.471%20133.641%2050.4703C127.06%2050.4703%20120.863%2052.03%20114.685%2054.7204C109.931%2056.7922%2099.277%2063.1259%2095.4377%2063.7928C98.8682%2055.3315%20102.295%2047.4164%20105.558%2040.2191C110.733%2028.8052%20115.826%2018.4305%20120.458%209.42377C122.953%209.26682%20125.466%209.17755%20128%209.17755ZM128%205.23154C60.3057%205.23154%205.23147%2060.305%205.23147%20128.001C5.23147%20195.694%2060.3057%20250.769%20128%20250.769C195.695%20250.769%20250.768%20195.694%20250.769%20128.001C250.768%2060.3057%20195.694%205.23154%20128%205.23154Z'%20fill='white'/%3e%3cpath%20d='M157.252%20200.71C157.252%20203.477%20154.692%20205.728%20151.546%20205.728C148.4%20205.728%20145.84%20203.477%20145.84%20200.71C145.84%20197.942%20148.4%20195.691%20151.546%20195.691C154.692%20195.691%20157.252%20197.942%20157.252%20200.71ZM141.885%20200.71C141.885%20205.091%20145.285%20208.743%20149.762%20209.525L140.824%20217.627C144.925%20220.542%20148.812%20222.112%20156.86%20222.112C156.86%20222.112%20157.725%20222.117%20158.891%20222.074C160.057%20222.03%20160.642%20221.102%20160.642%20220.037C160.642%20218.987%20160.05%20218.078%20158.54%20218.127C152.324%20218.33%20150.068%20217.71%20147.701%20216.727C147.701%20216.727%20155.022%20210.376%20158.191%20207.237C160.25%20205.319%20161.207%20203.383%20161.207%20200.71C161.207%20195.762%20156.873%20191.736%20151.546%20191.736C146.219%20191.736%20141.885%20195.762%20141.885%20200.71Z'%20fill='white'/%3e%3cpath%20d='M174.914%20195.779C178.019%20195.263%20180.913%20197.065%20181.367%20199.794C181.821%20202.525%20179.664%20205.165%20176.56%20205.681C173.456%20206.196%20170.562%20204.395%20170.109%20201.665C169.655%20198.936%20171.811%20196.295%20174.914%20195.779ZM175.422%20209.717L167.575%20219.857C172.287%20220.393%20175.818%20222.398%20184.487%20220.972C184.487%20220.972%20185.343%20220.834%20186.485%20220.6C187.628%20220.367%20188.054%20219.354%20187.88%20218.304C187.707%20217.269%20186.973%20216.469%20185.492%20216.764C179.393%20217.984%20177.161%20217.631%20174.665%20217.05C174.665%20217.05%20180.751%20209.695%20183.362%20206.079C185.079%20203.85%20185.706%20201.782%20185.268%20199.146C184.457%20194.266%20179.522%20191.005%20174.266%20191.878C169.011%20192.751%20165.396%20197.433%20166.207%20202.314C166.925%20206.636%20170.878%20209.681%20175.422%20209.717Z'%20fill='white'/%3e%3cpath%20d='M129.366%20203.396C127.058%20203.396%20125.18%20201.668%20125.18%20199.543C125.18%20197.419%20127.058%20195.691%20129.366%20195.691C131.676%20195.691%20133.554%20197.398%20133.554%20199.543C133.554%20201.69%20131.639%20203.396%20129.366%20203.396ZM129.366%20191.736C124.878%20191.736%20121.225%20195.239%20121.225%20199.543C121.225%20203.849%20124.878%20207.351%20129.366%20207.351C129.819%20207.351%20130.259%20207.307%20130.692%20207.239C129.091%20210.304%20127.24%20213.184%20126.257%20214.586C125.631%20215.481%20125.955%20216.552%20126.877%20217.138C128.07%20217.897%20129.075%20217.466%20129.496%20216.856C129.763%20216.471%20137.509%20205.202%20137.509%20199.543C137.509%20195.239%20133.857%20191.736%20129.366%20191.736Z'%20fill='white'/%3e%3cpath%20d='M114.288%20192.434C112.929%20192.434%20112.306%20193.161%20112.306%20194.095V207.853C112.306%20208.788%20112.931%20209.514%20114.288%20209.514C115.646%20209.514%20116.269%20208.788%20116.269%20207.852V194.094C116.269%20193.161%20115.644%20192.434%20114.288%20192.434Z'%20fill='white'/%3e%3cpath%20d='M195.64%20133.723C189.914%20141.318%20181.68%20143.43%20174.298%20143.43C167.54%20143.43%20161.497%20141.661%20158.737%20140.711L164.994%20129.908C164.994%20129.908%20173.902%20132.796%20179.599%20130.747C190.294%20126.285%20192.64%20116.856%20189.952%20110.583C187.958%20105.927%20183.484%20101.394%20173.383%2093.2969C162.442%2083.7224%20158.264%2076.1875%20159.394%2068.1894C160.424%2060.8917%20164.495%2056.2272%20172.205%2053.5088C182.458%2049.9939%20190.624%2055.4508%20193.761%2059.1053C196.269%2062.0287%20197.299%2065.891%20197.734%2068.5989C194.105%2066.2446%20187.467%2062.6335%20181.591%2062.6328C178.732%2062.6321%20176.059%2063.5103%20174.007%2065.8512C171.042%2069.2329%20170.189%2073.2711%20171.606%2077.2227C173.442%2082.3441%20178.718%2086.2789%20185.333%2087.4062C191.947%2088.5334%20197.01%2086.8049%20198.686%2086.1164C201.309%2091.5029%20210.615%20113.861%20195.64%20133.723ZM199.888%2082.1467C198.427%2083.0765%20193.496%2085.7613%20185.661%2084.4555C180.207%2083.5466%20175.875%2080.3456%20174.397%2076.2224C173.663%2074.1765%20173.387%2071.0549%20176.236%2067.8044C177.536%2066.3228%20179.345%2065.5813%20181.647%2065.5813C190.523%2065.7905%20201.03%2074.8587%20201.03%2074.8587C201.019%2070.2102%20200.893%2062.865%20196.011%2057.1751C192.396%2052.9619%20183.388%2046.6805%20171.219%2050.713C162.472%2053.7962%20157.644%2059.378%20156.458%2067.7751C155.174%2076.8718%20159.939%2085.6972%20171.455%2095.5493C172.043%2096.0523%20183.034%20104.649%20186.546%20110.323C189.53%20115.505%20188.244%20123.831%20178.561%20127.97C172.391%20130.093%20163.768%20126.108%20163.768%20126.108L154.452%20142.195C164.83%20146.794%20174.316%20146.438%20174.316%20146.438C184.44%20146.438%20192.592%20142.69%20198.008%20135.507C216.095%20111.537%20201.214%2084.0133%20199.888%2082.1467Z'%20fill='%23040606'/%3e%3cpath%20d='M114.775%20135.656C117.069%20137.909%20120.434%20139.251%20124.42%20139.115C133.771%20138.775%20141.665%20136.293%20145.396%20134.911C145.106%20138.28%20144.572%20144.459%20144.22%20148.533C141.485%20148.977%20133.597%20149.943%20124.284%20149.943C114.594%20149.943%20103.36%20148.897%2094.7764%20145.128C103.266%20122.669%20109.312%2089.5211%20104.907%2068.7614C107.408%2067.3733%20114.225%2063.6323%20117.875%2062.0426C122.963%2059.7603%20127.274%2058.5535%20133.02%2058.46C137.481%2058.46%20142.805%2059.6075%20145.272%2063.7816C149.168%2070.3742%20146.894%2080.1642%20139.985%2086.5538C130.002%2095.7872%20115.271%20103.883%20115.271%20103.883C115.271%20103.883%20111.376%20119.44%20111.25%20126.446C111.185%20130.091%20112.437%20133.361%20114.775%20135.656ZM117.835%20105.854C120.636%20104.281%20132.782%2097.2528%20141.998%2088.7308C149.909%2081.4149%20152.414%2070.0407%20147.824%2062.2728C145.18%2057.7995%20139.735%2055.4927%20133.056%2055.4927C126.474%2055.6329%20121.969%2057.0259%20116.691%2059.325C112.051%2061.3458%20101.542%2067.247%20101.542%2067.247C109.006%20100.376%2093.0939%20141.126%2090.9573%20146.777C100.035%20151.355%20112.694%20152.944%20124.567%20152.944C132.935%20152.944%20140.912%20152.155%20146.976%20151.069L148.772%20130.255C148.772%20130.255%20138.391%20135.603%20124.312%20136.152C124.312%20136.152%20124.308%20136.152%20124.306%20136.152C115.21%20136.152%20114.165%20129.325%20114.215%20126.5C114.32%20120.624%20117.142%20108.702%20117.835%20105.854Z'%20fill='%23040606'/%3e%3cpath%20d='M129.369%2068.7467C132.9%2068.1531%20135.007%2069.3082%20135.744%2071.2425C136.756%2073.8946%20136.446%2077.5386%20128.947%2082.6586C124.579%2085.5646%20119.18%2088.5264%20119.18%2088.5264C119.263%2085.0763%20119.323%2079.5524%20118.415%2074.0864C122.478%2071.2418%20125.66%2069.3703%20129.369%2068.7467ZM115.829%2093.6638C115.829%2093.6638%20121.667%2090.6413%20130.48%2084.994C138.977%2079.5489%20140.715%2074.0425%20138.63%2069.3787C137.028%2065.7975%20132.003%2065.282%20129.097%2065.7472C124.768%2066.4399%20120.171%2068.6658%20114.917%2072.6153C114.917%2072.6153%20116.785%2079.7275%20115.829%2093.6638Z'%20fill='%23040606'/%3e%3cpath%20d='M63.1377%20152.266C61.0005%20152.266%2058.8269%20152.008%2056.6812%20151.386C46.3785%20148.401%2041.8507%20140.384%2042.4331%20126.159C43.0567%20110.909%2050.2938%2097.4921%2052.2713%2094.01L36.8018%2096.1814L42.7526%2081.097C46.6456%2080.7007%2062.2979%2078.9157%2078.405%2074.3551C82.8037%2073.0612%2086.1987%2072.2646%2087.6363%2072.3302C89.0977%2072.3971%2091.5433%2072.1955%2092.2618%2075.7196C93.1916%2080.2759%2087.8247%2084.5394%2079.5559%2086.2749L64.6535%2089.185C63.9713%2090.186%2054.9227%20106.539%2052.8273%20122.882C52.0453%20128.86%2052.8029%20133.448%2055.8051%20136.722C58.2584%20139.395%2062.0259%20141.032%2066.5906%20140.803C71.1554%20140.574%2077.1668%20138.402%2079.7108%20137.362L81.9848%20146.991C78.587%20148.666%2071.1233%20152.266%2063.1377%20152.266ZM66.0326%20137.849C55.5701%20137.849%2055.0267%20129.653%2055.6203%20123.047C56.8535%20110.28%2065.0651%2094.4913%2066.5369%2091.8371L80.144%2089.1808C90.1182%2087.0861%2096.2573%2081.3906%2095.0715%2075.3289C94.7743%2073.8097%2093.8557%2069.3363%2088.0548%2069.4681C85.5786%2069.4681%2082.2443%2070.1364%2077.5826%2071.5064C59.3835%2076.6592%2040.6648%2078.3103%2040.6648%2078.3103L32.1778%2099.824L46.9477%2097.7516C44.6213%20102.648%2039.9687%20113.859%2039.4713%20126.039C38.8324%20141.632%2044.1749%20150.916%2055.856%20154.233C58.3065%20154.93%2060.7682%20155.233%2063.2103%20155.234C70.9133%20155.233%2079.0432%20151.927%2085.3902%20148.674L81.793%20133.147C79.8859%20134.059%2072.5651%20137.668%2066.0326%20137.849Z'%20fill='%23040606'/%3e%3c/svg%3e";
//#endregion
//#region src/assets/logos/ässät.svg
var ässät_default = "data:image/svg+xml,%3csvg%20width='256'%20height='256'%20viewBox='0%200%20256%20256'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M128%200C57.3081%200%200%2057.3078%200%20128C0%20198.693%2057.3081%20256%20128%20256C198.693%20256%20256%20198.693%20256%20128C256%2057.3078%20198.693%200%20128%200Z'%20fill='white'/%3e%3cpath%20d='M201.969%2095.4108C175.214%2070.0858%20128%2032.7227%20128%2032.7227C128%2032.7227%2080.8843%2069.9929%2054.0311%2095.4108C31.6666%20116.581%2028.1316%20147.292%2044.7669%20170.098C61.4018%20192.904%2091.9375%20196.935%20112.971%20179.102C114.361%20177.923%20115.666%20176.671%20116.902%20175.367C115.198%20181.788%20112.165%20187.871%20107.762%20193.13C92.4432%20211.425%2059.506%20217.476%2039.3396%20187.32C27.9952%20170.356%2021.3324%20149.955%2021.3324%20128C21.3324%2069.0894%2069.085%2021.3323%20128%2021.3323C186.916%2021.3323%20234.668%2069.0918%20234.668%20128C234.668%20149.955%20228.005%20170.356%20216.661%20187.32C196.494%20217.476%20163.557%20211.425%20148.238%20193.13C143.835%20187.871%20140.802%20181.788%20139.098%20175.367C140.335%20176.671%20141.639%20177.923%20143.03%20179.102C164.063%20196.935%20194.599%20192.904%20211.233%20170.098C227.869%20147.292%20224.334%20116.581%20201.969%2095.4108ZM128%205.33326C60.2533%205.33326%205.33336%2060.2532%205.33336%20128C5.33336%20195.747%2060.2533%20250.667%20128%20250.667C195.748%20250.667%20250.667%20195.747%20250.667%20128C250.667%2060.2532%20195.748%205.33326%20128%205.33326Z'%20fill='black'/%3e%3c/svg%3e";
//#endregion
//#region src/utils/teamdata.js
var teams = [
	{
		id: "ässät",
		color: "#D71920",
		homepage: "https://assat.com"
	},
	{
		id: "hifk",
		color: "#052968",
		homepage: "https://hifk.fi"
	},
	{
		id: "hpk",
		color: "#ED7E24",
		homepage: "https://hpk.fi"
	},
	{
		id: "ilves",
		color: "#FDCE05",
		homepage: "https://ilves.com"
	},
	{
		id: "jukurit",
		color: "#0057B8",
		homepage: "https://jukurit.fi"
	},
	{
		id: "jokerit",
		color: "#D70E29",
		homepage: "https://jokerit.fi"
	},
	{
		id: "jyp",
		color: "#ED1C28",
		homepage: "https://jypliiga.fi"
	},
	{
		id: "kalpa",
		color: "#FFC608",
		homepage: "https://kalpa.fi"
	},
	{
		id: "kärpät",
		color: "#FDBB14",
		homepage: "https://karpat.fi"
	},
	{
		id: "k-espoo",
		color: "#0174CD",
		homepage: "https://kiekko-espoo.fi"
	},
	{
		id: "kookoo",
		color: "#EF721F",
		homepage: "https://kookoo.fi"
	},
	{
		id: "lukko",
		color: "#FFCC00",
		homepage: "https://raumanlukko.fi"
	},
	{
		id: "pelicans",
		color: "#52BFDE",
		homepage: "https://pelicans.fi"
	},
	{
		id: "saipa",
		color: "#FEF60F",
		homepage: "https://saipa.fi"
	},
	{
		id: "sport",
		color: "#F01E23",
		homepage: "https://vaasansport.fi"
	},
	{
		id: "tappara",
		color: "#FF6400",
		homepage: "https://tappara.fi"
	},
	{
		id: "tps",
		color: "#000000",
		homepage: "https://hc.tps.fi"
	}
];
var logos = /* #__PURE__ */ Object.assign({
	"../assets/logos/hifk.svg": hifk_default,
	"../assets/logos/hpk.svg": hpk_default,
	"../assets/logos/ilves.svg": ilves_default,
	"../assets/logos/jokerit.svg": jokerit_default,
	"../assets/logos/jukurit.svg": jukurit_default,
	"../assets/logos/jyp.svg": jyp_default,
	"../assets/logos/k-espoo.svg": k_espoo_default,
	"../assets/logos/kalpa.svg": kalpa_default,
	"../assets/logos/kookoo.svg": kookoo_default,
	"../assets/logos/kärpät.svg": kärpät_default,
	"../assets/logos/lukko.svg": lukko_default,
	"../assets/logos/pelicans.svg": pelicans_default,
	"../assets/logos/saipa.svg": saipa_default,
	"../assets/logos/sport.svg": sport_default,
	"../assets/logos/tappara.svg": tappara_default,
	"../assets/logos/tps.svg": tps_default,
	"../assets/logos/ässät.svg": ässät_default
});
function getTeamLogo(id) {
	if (id.includes(":")) id = id.split(":")[1];
	return logos[`../assets/logos/${id}.svg`] ?? null;
}
function parseId(teamId) {
	return String(teamId).split(":").pop();
}
function getTeamColor(teamId) {
	const id = teamId.split(":")[1];
	return teams.find((team) => team.id === id)?.color ?? "#888";
}
//#endregion
//#region src/widgets/Match.svelte
var root$5 = /* @__PURE__ */ from_html(` <!>`, 1);
var root_1$5 = /* @__PURE__ */ from_html(`<div class="score svelte-vjge6i"><p class="goals svelte-vjge6i"> </p> <p class="details svelte-vjge6i"></p></div>`);
var root_2$5 = /* @__PURE__ */ from_html(`<div class="date svelte-vjge6i"><p class="hours svelte-vjge6i"> </p> <p class="minutes svelte-vjge6i"> </p></div>`);
var root_3$4 = /* @__PURE__ */ from_html(`<div class="gradient svelte-vjge6i"></div>`);
var root_4$3 = /* @__PURE__ */ from_html(`<div class="home svelte-vjge6i"><img class="logo svelte-vjge6i"/></div> <!> <div class="away svelte-vjge6i"><img class="logo svelte-vjge6i"/></div> <!>`, 1);
var root_5$3 = /* @__PURE__ */ from_html(`<div><!></div>`);
var $$css$5 = {
	hash: "svelte-vjge6i",
	code: ".liiga.match.widget.svelte-vjge6i {overflow:hidden;p:where(.svelte-vjge6i) {margin:0;}.logo:where(.svelte-vjge6i) {width:50px;height:50px;}.home:where(.svelte-vjge6i),\n        .away:where(.svelte-vjge6i){display:flex;align-items:center;justify-content:center;}.date:where(.svelte-vjge6i) {display:flex;flex-direction:column;align-items:center;.hours:where(.svelte-vjge6i) {font-size:20px;font-weight:bold;}.minutes:where(.svelte-vjge6i) {font-weight:400;}}.score:where(.svelte-vjge6i) {display:flex;flex-direction:column;align-items:center;justify-content:center;.goals:where(.svelte-vjge6i) {font-size:1.5rem;font-weight:bold;}.details:where(.svelte-vjge6i) {font-size:0.8rem;color:var(--liiga-text-secondary);}}.gradient:where(.svelte-vjge6i) {position:absolute;left:0;right:0;top:0;bottom:0;}}"
};
function Match($$anchor, $$props) {
	push($$props, true);
	append_styles$1($$anchor, $$css$5);
	let data = /* @__PURE__ */ state(null);
	let matchId = prop($$props, "matchId", 7, 2701274), season = prop($$props, "season", 7, 2027), theme = prop($$props, "theme", 7, "auto"), gradient = prop($$props, "gradient", 7, true);
	onMount(async () => {
		const url = `https://www.liiga.fi/api/v2/games/${season()}/${matchId()}`;
		const request = await fetch(url);
		set(data, await request.json(), true);
	});
	function getDate(dateStr) {
		let date = new Date(dateStr);
		return `${String(date.getDate())}.${String(date.getMonth() + 1)}.${date.getFullYear()}`;
	}
	function getTime(dateStr) {
		let date = new Date(dateStr);
		return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
	}
	function getBackground(game) {
		return `
        linear-gradient(
            90deg,
            ${getTeamColor(game.homeTeam.teamId)}22 0%,
            transparent 30%,
            transparent 70%,
            ${getTeamColor(game.awayTeam.teamId)}22 100%
        )`;
	}
	var $$exports = {
		get matchId() {
			return matchId();
		},
		set matchId($$value = 2701274) {
			matchId($$value);
			flushSync();
		},
		get season() {
			return season();
		},
		set season($$value = 2027) {
			season($$value);
			flushSync();
		},
		get theme() {
			return theme();
		},
		set theme($$value = "auto") {
			theme($$value);
			flushSync();
		},
		get gradient() {
			return gradient();
		},
		set gradient($$value = true) {
			gradient($$value);
			flushSync();
		}
	};
	var div = root_5$3();
	var node = child(div);
	var consequent_3 = ($$anchor) => {
		var fragment = root_4$3();
		var div_1 = first_child(fragment);
		var img = child(div_1);
		reset(div_1);
		var node_1 = sibling(div_1, 2);
		var consequent_1 = ($$anchor) => {
			var div_2 = root_1$5();
			var p = child(div_2);
			var text$1 = child(p);
			reset(p);
			var p_1 = sibling(p, 2);
			each(p_1, 21, () => get(data).game.periods.filter((period) => period.homeTeamGoals !== 0 || period.awayTeamGoals !== 0), index, ($$anchor, period, index) => {
				next();
				var fragment_1 = root$5();
				var text_1 = first_child(fragment_1);
				var node_2 = sibling(text_1);
				var consequent = ($$anchor) => {
					append($$anchor, text(","));
				};
				var d = /* @__PURE__ */ user_derived(() => index < get(data).game.periods.filter((period) => period.homeTeamGoals !== 0 || period.awayTeamGoals !== 0).length - 1);
				if_block(node_2, ($$render) => {
					if (get(d)) $$render(consequent);
				});
				template_effect(() => set_text(text_1, `${get(period).homeTeamGoals ?? ""} - ${get(period).awayTeamGoals ?? ""} `));
				append($$anchor, fragment_1);
			});
			reset(p_1);
			reset(div_2);
			template_effect(() => set_text(text$1, `${get(data).game.homeTeam.goals ?? ""} - ${get(data).game.awayTeam.goals ?? ""}`));
			append($$anchor, div_2);
		};
		var alternate = ($$anchor) => {
			var div_3 = root_2$5();
			var p_2 = child(div_3);
			var text_3 = child(p_2, true);
			reset(p_2);
			var p_3 = sibling(p_2, 2);
			var text_4 = child(p_3, true);
			reset(p_3);
			reset(div_3);
			template_effect(($0, $1) => {
				set_text(text_3, $0);
				set_text(text_4, $1);
			}, [() => getDate(get(data).game.start), () => getTime(get(data).game.start)]);
			append($$anchor, div_3);
		};
		if_block(node_1, ($$render) => {
			if (get(data).game.ended) $$render(consequent_1);
			else $$render(alternate, -1);
		});
		var div_4 = sibling(node_1, 2);
		var img_1 = child(div_4);
		reset(div_4);
		var node_3 = sibling(div_4, 2);
		var consequent_2 = ($$anchor) => {
			var div_5 = root_3$4();
			template_effect(($0) => set_style(div_5, $0), [() => get(data) ? `background: ${getBackground(get(data).game)}` : ""]);
			append($$anchor, div_5);
		};
		if_block(node_3, ($$render) => {
			if (gradient()) $$render(consequent_2);
		});
		template_effect(($0, $1) => {
			set_attribute(img, "src", $0);
			set_attribute(img, "alt", get(data).game.homeTeam.teamName);
			set_attribute(img_1, "src", $1);
			set_attribute(img_1, "alt", get(data).game.awayTeam.teamName);
		}, [() => getTeamLogo(get(data).game.homeTeam.teamId), () => getTeamLogo(get(data).game.awayTeam.teamId)]);
		append($$anchor, fragment);
	};
	if_block(node, ($$render) => {
		if (get(data) != null) $$render(consequent_3);
	});
	reset(div);
	template_effect(() => set_class(div, 1, `liiga match widget card ${theme() ?? ""}`, "svelte-vjge6i"));
	append($$anchor, div);
	return pop($$exports);
}
customElements.define("liiga-match-widget", create_custom_element(Match, {
	matchId: {},
	season: {},
	theme: {},
	gradient: {}
}, [], []));
//#endregion
//#region src/assets/icons/ruler.svg?raw
var ruler_default = "<svg width=\"113\" height=\"51\" viewBox=\"0 0 113 51\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M112.949 12.4216C112.949 4.24828 108.655 0 100.388 0H12.4678C4.2021 0 0 4.24828 0 12.4216V37.6342C0 45.8075 4.24828 50.0557 12.5139 50.0557H100.435C108.7 50.0557 112.949 45.8075 112.949 37.6342V12.4216ZM105.468 13.7607V36.295C105.468 40.451 103.252 42.6213 99.2345 42.6213H13.6222C9.69714 42.6213 7.43448 40.451 7.43448 36.295V13.7607C7.43448 9.60482 9.69714 7.43448 13.6683 7.43448H99.2799C103.252 7.43448 105.468 9.60482 105.468 13.7607ZM17.6395 4.84857H13.8993V29.1838C13.8993 30.2458 14.7305 31.0309 15.7925 31.0309C16.9008 31.0309 17.6395 30.1997 17.6395 29.1376V4.84857ZM25.8129 4.84857H22.0725V21.0567C22.0725 22.1649 22.9038 22.9038 23.9197 22.9038C25.0741 22.9038 25.8129 22.1187 25.8129 21.0105V4.84857ZM33.94 4.84857H30.1535V21.0567C30.1535 22.1649 31.0309 22.9038 32.0468 22.9038C33.155 22.9038 33.94 22.1187 33.94 21.0105V4.84857ZM42.021 4.84857H38.2806V21.0567C38.2806 22.1649 39.1118 22.9038 40.1739 22.9038C41.2821 22.9038 42.021 22.1187 42.021 21.0105V4.84857ZM50.1943 4.84857H46.454V21.0567C46.454 22.1649 47.2851 22.9038 48.301 22.9038C49.4554 22.9038 50.1943 22.1187 50.1943 21.0105V4.84857ZM58.3676 4.84857H54.6273V29.1838C54.6273 30.2458 55.4585 31.0309 56.4744 31.0309C57.6288 31.0309 58.3676 30.1997 58.3676 29.1376V4.84857ZM66.4947 4.84857H62.7544V21.0567C62.7544 22.1649 63.5856 22.9038 64.6014 22.9038C65.7097 22.9038 66.4947 22.1187 66.4947 21.0105V4.84857ZM74.6218 4.84857H70.8816V21.0567C70.8816 22.1649 71.7127 22.9038 72.7748 22.9038C73.883 22.9038 74.6218 22.1187 74.6218 21.0105V4.84857ZM82.749 4.84857H79.0087V21.0567C79.0087 22.1649 79.8398 22.9038 80.8557 22.9038C82.0102 22.9038 82.749 22.1187 82.749 21.0105V4.84857ZM90.9223 4.84857H87.182V21.0567C87.182 22.1649 88.0132 22.9038 89.029 22.9038C90.1373 22.9038 90.9223 22.1187 90.9223 21.0105V4.84857ZM99.0491 4.84857H95.3089V29.1838C95.3089 30.2458 96.1402 31.0309 97.2022 31.0309C98.3105 31.0309 99.0491 30.1997 99.0491 29.1376V4.84857Z\" fill=\"white\"/>\n</svg>\n";
//#endregion
//#region src/assets/icons/weight.svg?raw
var weight_default = "<svg width=\"94\" height=\"100\" viewBox=\"0 0 94 100\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M0.693963 84.4769C-1.76699 94.3208 2.3977 100 11.9103 100H81.6687C91.1813 100 95.3459 94.3208 92.885 84.4769L82.426 42.2148C80.6749 35.2579 75.6583 31.2352 68.6067 31.2352H24.9722C17.9206 31.2352 12.8567 35.2579 11.153 42.2148L0.693963 84.4769ZM8.07682 84.9502L18.2519 44.8651C19.293 40.795 21.612 38.8546 25.5402 38.8546H68.0389C71.9669 38.8546 74.2859 40.795 75.327 44.8651L85.5022 84.9502C86.7799 89.8248 84.8869 92.3803 80.6749 92.3803H12.8567C8.69205 92.3803 6.79902 89.8248 8.07682 84.9502ZM42.9561 36.7723H50.5755V23.2844H42.9561V36.7723ZM46.7895 26.9758C54.125 26.9758 60.3247 20.8708 60.3247 13.5352C60.3247 6.15238 54.125 0 46.7895 0C39.4066 0 33.2542 6.15238 33.2542 13.5352C33.2542 20.9181 39.4539 26.9758 46.7895 26.9758ZM46.7895 20.3975C43.0508 20.3975 39.8799 17.274 39.8799 13.5352C39.8799 9.79646 43.0034 6.57831 46.7895 6.57831C50.5282 6.57831 53.6991 9.79646 53.6991 13.5352C53.6991 17.274 50.5755 20.3975 46.7895 20.3975Z\" fill=\"white\"/>\n</svg>\n";
//#endregion
//#region src/assets/icons/calendar.svg?raw
var calendar_default = "<svg width=\"100\" height=\"93\" viewBox=\"0 0 100 93\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M15.7551 92.3732H84.2949C94.7817 92.3732 100 87.155 100 76.8188V15.5545C100 5.21826 94.7817 0 84.2949 0H15.7551C5.26843 0 0 5.16808 0 15.5545V76.8188C0 87.2051 5.26843 92.3732 15.7551 92.3732ZM15.0025 84.295C10.5369 84.295 8.07827 81.9368 8.07827 77.2704V29.9548C8.07827 25.3387 10.5369 22.9302 15.0025 22.9302H84.9473C89.4129 22.9302 91.9217 25.3387 91.9217 29.9548V77.2704C91.9217 81.9368 89.4129 84.295 84.9473 84.295H15.0025ZM40.2409 40.9433H43.2012C44.9573 40.9433 45.5093 40.4415 45.5093 38.6853V35.725C45.5093 33.9689 44.9573 33.417 43.2012 33.417H40.2409C38.4847 33.417 37.8825 33.9689 37.8825 35.725V38.6853C37.8825 40.4415 38.4847 40.9433 40.2409 40.9433ZM56.8991 40.9433H59.8595C61.6156 40.9433 62.2178 40.4415 62.2178 38.6853V35.725C62.2178 33.9689 61.6156 33.417 59.8595 33.417H56.8991C55.143 33.417 54.5409 33.9689 54.5409 35.725V38.6853C54.5409 40.4415 55.143 40.9433 56.8991 40.9433ZM73.5574 40.9433H76.5178C78.2739 40.9433 78.876 40.4415 78.876 38.6853V35.725C78.876 33.9689 78.2739 33.417 76.5178 33.417H73.5574C71.8012 33.417 71.2493 33.9689 71.2493 35.725V38.6853C71.2493 40.4415 71.8012 40.9433 73.5574 40.9433ZM23.5825 57.3507H26.4927C28.2991 57.3507 28.851 56.8489 28.851 55.0928V52.1325C28.851 50.3763 28.2991 49.8745 26.4927 49.8745H23.5825C21.7762 49.8745 21.2243 50.3763 21.2243 52.1325V55.0928C21.2243 56.8489 21.7762 57.3507 23.5825 57.3507ZM40.2409 57.3507H43.2012C44.9573 57.3507 45.5093 56.8489 45.5093 55.0928V52.1325C45.5093 50.3763 44.9573 49.8745 43.2012 49.8745H40.2409C38.4847 49.8745 37.8825 50.3763 37.8825 52.1325V55.0928C37.8825 56.8489 38.4847 57.3507 40.2409 57.3507ZM56.8991 57.3507H59.8595C61.6156 57.3507 62.2178 56.8489 62.2178 55.0928V52.1325C62.2178 50.3763 61.6156 49.8745 59.8595 49.8745H56.8991C55.143 49.8745 54.5409 50.3763 54.5409 52.1325V55.0928C54.5409 56.8489 55.143 57.3507 56.8991 57.3507ZM73.5574 57.3507H76.5178C78.2739 57.3507 78.876 56.8489 78.876 55.0928V52.1325C78.876 50.3763 78.2739 49.8745 76.5178 49.8745H73.5574C71.8012 49.8745 71.2493 50.3763 71.2493 52.1325V55.0928C71.2493 56.8489 71.8012 57.3507 73.5574 57.3507ZM23.5825 73.8083H26.4927C28.2991 73.8083 28.851 73.2563 28.851 71.5002V68.5399C28.851 66.7837 28.2991 66.2819 26.4927 66.2819H23.5825C21.7762 66.2819 21.2243 66.7837 21.2243 68.5399V71.5002C21.2243 73.2563 21.7762 73.8083 23.5825 73.8083ZM40.2409 73.8083H43.2012C44.9573 73.8083 45.5093 73.2563 45.5093 71.5002V68.5399C45.5093 66.7837 44.9573 66.2819 43.2012 66.2819H40.2409C38.4847 66.2819 37.8825 66.7837 37.8825 68.5399V71.5002C37.8825 73.2563 38.4847 73.8083 40.2409 73.8083ZM56.8991 73.8083H59.8595C61.6156 73.8083 62.2178 73.2563 62.2178 71.5002V68.5399C62.2178 66.7837 61.6156 66.2819 59.8595 66.2819H56.8991C55.143 66.2819 54.5409 66.7837 54.5409 68.5399V71.5002C54.5409 73.2563 55.143 73.8083 56.8991 73.8083Z\" fill=\"white\"/>\n</svg>\n";
//#endregion
//#region src/assets/icons/flag.svg?raw
var flag_default = "<svg width=\"91\" height=\"100\" viewBox=\"0 0 91 100\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M3.8736 100C6.01428 100 7.74715 98.3181 7.74715 96.1774V67.839C9.02136 67.2783 13.8124 65.4434 21.3048 65.4434C40.1631 65.4434 51.9878 74.6687 69.9287 74.6687C77.8797 74.6687 80.8359 73.8023 84.7095 72.0693C88.2264 70.4893 90.5199 67.839 90.5199 63.1499V11.4169C90.5199 8.66463 88.1753 7.08461 85.2192 7.08461C82.7217 7.08461 78.0326 9.22528 69.2661 9.22528C51.3252 9.22528 39.5515 0 20.6422 0C12.6912 0 9.68398 0.866463 5.81042 2.59939C2.29357 4.17941 0 6.82977 0 11.4679V96.1774C0 98.2671 1.78389 100 3.8736 100ZM69.9287 66.9725C52.9562 66.9725 40.9277 57.7472 21.3048 57.7472C15.6982 57.7472 10.6014 58.4098 7.74715 59.5821V11.7227C8.46072 10.0408 12.6912 7.69623 20.6422 7.69623C38.5831 7.69623 50.5607 16.9215 69.2661 16.9215C74.8217 16.9215 79.4088 16.2589 82.8237 15.2906V62.946C82.1101 64.628 77.8797 66.9725 69.9287 66.9725Z\" fill=\"white\"/>\n</svg>\n";
//#endregion
//#region src/assets/icons/rink.svg?raw
var rink_default = "<svg width=\"71\" height=\"132\" viewBox=\"0 0 71 132\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M55.0143 127.204V131.883H15.2069V127.204H55.0143ZM65.5422 116.676V15.2069C65.5422 9.39264 60.8285 4.67921 55.0143 4.67905H15.2069C9.39254 4.67905 4.67905 9.39254 4.67905 15.2069V116.676C4.67905 122.49 9.39254 127.204 15.2069 127.204V131.883L14.814 131.878C6.59702 131.67 0 124.943 0 116.676V15.2069C1.18698e-06 6.93976 6.59702 0.212991 14.814 0.00456939L15.2069 0H55.0143C63.4127 0.000159164 70.2212 6.80847 70.2212 15.2069V116.676L70.2155 117.069C70.0071 125.286 63.2813 131.883 55.0143 131.883V127.204C60.8285 127.204 65.5422 122.49 65.5422 116.676Z\" fill=\"white\"/>\n<path d=\"M67.5596 118.128V121.637H2.90842V118.128H67.5596ZM70.2212 84.9658V88.4751H0V84.9658H70.2212ZM27.0234 64.1865V67.6958H0V64.1865H27.0234ZM70.2212 64.1865V67.6958H42.8906V64.1865H70.2212ZM70.2212 44.2114V47.7207H0V44.2114H70.2212ZM67.5596 10.1169V13.6262H2.90842V10.1169H67.5596Z\" fill=\"white\"/>\n<path d=\"M41.5684 65.9417C41.5684 62.3755 38.677 59.4842 35.1108 59.484C31.5444 59.484 28.6531 62.3754 28.6531 65.9417C28.6532 69.5079 31.5445 72.3994 35.1108 72.3994V75.9087L34.5978 75.895C29.5016 75.6368 25.4148 71.5508 25.1563 66.4546L25.1438 65.9417C25.1438 60.4373 29.6063 55.9747 35.1108 55.9747L35.6237 55.9873C40.8896 56.2544 45.0777 60.6094 45.0777 65.9417L45.064 66.4546C44.7969 71.7205 40.443 75.9085 35.1108 75.9087V72.3994C38.6769 72.3992 41.5683 69.5078 41.5684 65.9417Z\" fill=\"white\"/>\n<path d=\"M27.7815 25.566C27.7815 21.4837 24.4716 18.174 20.3893 18.1739C16.3069 18.1739 12.9972 21.4836 12.9972 25.566C12.9973 29.6483 16.307 32.9581 20.3893 32.9581V36.4674L19.8284 36.4526C14.2543 36.1702 9.78425 31.701 9.50161 26.1269L9.48791 25.566C9.48791 19.5455 14.3688 14.6646 20.3893 14.6646L20.9502 14.6783C26.71 14.9704 31.2907 19.7337 31.2907 25.566L31.2759 26.1269C30.9838 31.8866 26.2215 36.4673 20.3893 36.4674V32.9581C24.4715 32.958 27.7813 29.6482 27.7815 25.566Z\" fill=\"white\"/>\n<path d=\"M27.7815 106.318C27.7815 102.235 24.4716 98.9257 20.3893 98.9256C16.3069 98.9256 12.9972 102.235 12.9972 106.318C12.9973 110.4 16.307 113.71 20.3893 113.71V117.219L19.8284 117.204C14.2543 116.922 9.78425 112.453 9.50161 106.879L9.48791 106.318C9.48791 100.297 14.3688 95.4163 20.3893 95.4163L20.9502 95.43C26.71 95.722 31.2907 100.485 31.2907 106.318L31.2759 106.879C30.9838 112.638 26.2215 117.219 20.3893 117.219V113.71C24.4715 113.71 27.7813 110.4 27.7815 106.318Z\" fill=\"white\"/>\n<path d=\"M58.1044 25.566C58.1044 21.4837 54.7946 18.174 50.7123 18.1739C46.6299 18.1739 43.3202 21.4836 43.3202 25.566C43.3203 29.6483 46.63 32.9581 50.7123 32.9581V36.4674L50.1514 36.4526C44.5773 36.1702 40.1072 31.701 39.8246 26.1269L39.8109 25.566C39.8109 19.5455 44.6918 14.6646 50.7123 14.6646L51.2732 14.6783C57.0329 14.9704 61.6137 19.7337 61.6137 25.566L61.5989 26.1269C61.3068 31.8866 56.5445 36.4673 50.7123 36.4674V32.9581C54.7945 32.958 58.1043 29.6482 58.1044 25.566Z\" fill=\"white\"/>\n<path d=\"M58.1044 106.318C58.1044 102.235 54.7946 98.9257 50.7123 98.9256C46.6299 98.9256 43.3202 102.235 43.3202 106.318C43.3203 110.4 46.63 113.71 50.7123 113.71V117.219L50.1514 117.204C44.5773 116.922 40.1072 112.453 39.8246 106.879L39.8109 106.318C39.8109 100.297 44.6918 95.4163 50.7123 95.4163L51.2732 95.43C57.0329 95.722 61.6137 100.485 61.6137 106.318L61.5989 106.879C61.3068 112.638 56.5445 117.219 50.7123 117.219V113.71C54.7945 113.71 58.1043 110.4 58.1044 106.318Z\" fill=\"white\"/>\n</svg>\n";
//#endregion
//#region src/assets/icons/stick-l.svg?raw
var stick_l_default = "<svg width=\"89\" height=\"100\" viewBox=\"0 0 89 100\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M11.7644 100H5.88219C2.6286 100 0 97.3714 0 94.1178V70.5891C0 67.3355 2.6286 64.7069 5.88219 64.7069H11.7644V100ZM76.8913 3.6975C78.1045 0.682881 81.5235 -0.787666 84.5381 0.425536C87.5527 1.63874 89.0233 5.05776 87.8101 8.07238L55.4764 88.9158C52.7927 95.6067 46.3039 100 39.0798 100H20.5693V64.7069H52.4618L76.8545 3.6975H76.8913Z\" fill=\"white\"/>\n</svg>\n";
//#endregion
//#region src/assets/icons/stick-r.svg?raw
var stick_r_default = "<svg width=\"89\" height=\"100\" viewBox=\"0 0 89 100\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M76.4713 100H82.3535C85.6071 100 88.2357 97.3714 88.2357 94.1178V70.5891C88.2357 67.3355 85.6071 64.7069 82.3535 64.7069H76.4713V100ZM11.3444 3.69751C10.1312 0.682882 6.71213 -0.787667 3.69751 0.425536C0.682884 1.63874 -0.787666 5.05776 0.425537 8.07239L32.7592 88.9158C35.443 95.6068 41.9318 100 49.1558 100H67.6664V64.7069H35.7738L11.3811 3.69751H11.3444Z\" fill=\"white\"/>\n</svg>\n";
//#endregion
//#region src/widgets/Player.svelte
var root$4 = /* @__PURE__ */ from_html(`<div class="data svelte-1dqovpw"><p class="desc svelte-1dqovpw"> </p> <p class="value svelte-1dqovpw"> </p></div>`);
var root_1$4 = /* @__PURE__ */ from_html(`<div class="stat svelte-1dqovpw"><p class="title svelte-1dqovpw"> </p> <!></div>`);
var root_2$4 = /* @__PURE__ */ from_html(`<div class="stat svelte-1dqovpw"><p class="title svelte-1dqovpw">Koko ura</p> <!></div>`);
var root_3$3 = /* @__PURE__ */ from_html(`<div><div class="image svelte-1dqovpw"><img class="player-image svelte-1dqovpw"/> <img class="team-logo svelte-1dqovpw" alt=""/> <div class="fade svelte-1dqovpw"></div></div> <section class="svelte-1dqovpw"><p class="name svelte-1dqovpw"> </p> <div class="details svelte-1dqovpw"><div class="info svelte-1dqovpw"><!> <div class="data svelte-1dqovpw"><p class="desc svelte-1dqovpw">Syntynyt</p> <p class="value svelte-1dqovpw"> </p></div></div> <div class="info svelte-1dqovpw"><!> <div class="data svelte-1dqovpw"><p class="desc svelte-1dqovpw">Syntymäpaikka</p> <p class="value svelte-1dqovpw"> </p></div></div> <div class="info svelte-1dqovpw"><!> <div class="data svelte-1dqovpw"><p class="desc svelte-1dqovpw">Kansalaisuus</p> <p class="value svelte-1dqovpw"> </p></div></div> <div class="info svelte-1dqovpw"><!> <div class="data svelte-1dqovpw"><p class="desc svelte-1dqovpw">Pituus</p> <p class="value svelte-1dqovpw"> </p></div></div> <div class="info svelte-1dqovpw"><!> <div class="data svelte-1dqovpw"><p class="desc svelte-1dqovpw">Paino</p> <p class="value svelte-1dqovpw"> </p></div></div> <div class="info svelte-1dqovpw"><!> <div class="data svelte-1dqovpw"><p class="desc svelte-1dqovpw">Pelipaikka</p> <p class="value svelte-1dqovpw"> </p></div></div> <div class="info svelte-1dqovpw"><!> <div class="data svelte-1dqovpw"><p class="desc svelte-1dqovpw">Kätisyys</p> <p class="value svelte-1dqovpw"> </p></div></div></div> <!> <!></section></div>`);
var $$css$4 = {
	hash: "svelte-1dqovpw",
	code: ".liiga.player.widget.svelte-1dqovpw {flex-direction:column;overflow:hidden;.image:where(.svelte-1dqovpw) {position:relative;.player-image:where(.svelte-1dqovpw) {width:340px;height:320px;object-fit:cover;object-position:center top;border-radius:3px;z-index:2;position:relative;display:block;}.team-logo:where(.svelte-1dqovpw) {position:absolute;left:50%;top:50%;transform:translate(-50%, -50%);z-index:1;opacity:0.8;}.fade:where(.svelte-1dqovpw) {height:70px;width:100%;background:linear-gradient(0deg, var(--liiga-bg) 20%, transparent 100%);z-index:3;position:absolute;bottom:0;}}section:where(.svelte-1dqovpw) {display:flex;flex-direction:column;gap:10px;width:100%;}.name:where(.svelte-1dqovpw) {font-size:24px;width:100%;text-align:center;}.details:where(.svelte-1dqovpw) {display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;max-width:360px;background-color:var(--liiga-foreground);padding:10px;border-radius:10px;box-sizing:border-box;.info:where(.svelte-1dqovpw) {display:flex;align-items:center;gap:5px;svg {width:20px;height:15px;}}}.stat:where(.svelte-1dqovpw) {display:grid;grid-template-columns:2fr repeat(5, 0.8fr);align-items:center;gap:20px;background-color:var(--liiga-foreground);padding:5px 10px;width:100%;border-radius:10px;box-sizing:border-box;.title:where(.svelte-1dqovpw) {font-size:14px;}}.data:where(.svelte-1dqovpw) {display:flex;flex-direction:column;.desc:where(.svelte-1dqovpw) {font-size:11px;color:var(--liiga-text-secondary);}.value:where(.svelte-1dqovpw) {font-size:14px;}}\n\n        @media (min-width: 768px) {&.horizontal {flex-direction:row;gap:30px;padding-bottom:0;.fade:where(.svelte-1dqovpw) {display:none;}.player-image:where(.svelte-1dqovpw) {width:250px;}.name:where(.svelte-1dqovpw) {text-align:start;}}\n        }}"
};
function Player($$anchor, $$props) {
	push($$props, true);
	append_styles$1($$anchor, $$css$4);
	let playerId = prop($$props, "playerId", 7, "23595916"), theme = prop($$props, "theme", 7, "auto"), layout = prop($$props, "layout", 7, "vertical");
	let player = /* @__PURE__ */ state(null);
	let latestTeam = /* @__PURE__ */ user_derived(() => {
		if (!get(player) || !get(player).teams) return null;
		const teamKeys = Object.keys(get(player).teams);
		if (teamKeys.length === 0) return null;
		const latestKey = teamKeys.map((k) => Number(k)).reduce((a, b) => Math.max(a, b));
		return get(player).teams[latestKey] || get(player).teams[String(latestKey)] || null;
	});
	onMount(async () => {
		const url = `https://www.liiga.fi/api/v2/players/info/${playerId()}`;
		const request = await fetch(url);
		set(player, await request.json(), true);
		console.log(snapshot(get(player)));
	});
	let latestSeasonStats = /* @__PURE__ */ user_derived(() => {
		if (!get(player)?.historical) return null;
		const { regular = [], playoffs = [], playout = [] } = get(player).historical;
		const latestSeason = Math.max(...regular.map((s) => s.season));
		return [
			...regular,
			...playoffs,
			...playout
		].filter((s) => s.season === latestSeason).reduce((acc, stat) => ({
			season: latestSeason,
			games: acc.games + stat.games,
			goals: acc.goals + stat.goals,
			assists: acc.assists + stat.assists,
			points: acc.points + stat.points,
			plusMinus: acc.plusMinus + stat.plusMinus
		}), {
			season: latestSeason,
			games: 0,
			goals: 0,
			assists: 0,
			points: 0,
			plusMinus: 0
		});
	});
	let careerStats = /* @__PURE__ */ user_derived(() => {
		if (!get(player)?.historical) return null;
		const { regular = [], playoffs = [], playout = [] } = get(player).historical;
		return [
			...regular,
			...playoffs,
			...playout
		].reduce((acc, stat) => ({
			games: acc.games + stat.games,
			goals: acc.goals + stat.goals,
			assists: acc.assists + stat.assists,
			points: acc.points + stat.points,
			plusMinus: acc.plusMinus + stat.plusMinus
		}), {
			games: 0,
			goals: 0,
			assists: 0,
			points: 0,
			plusMinus: 0
		});
	});
	const statLabels = [
		{
			key: "games",
			label: "O",
			name: "Ottelut"
		},
		{
			key: "goals",
			label: "M",
			name: "Maalit"
		},
		{
			key: "assists",
			label: "S",
			name: "Syötöt"
		},
		{
			key: "points",
			label: "P",
			name: "Pisteet"
		},
		{
			key: "plusMinus",
			label: "+/-",
			name: "+/-"
		}
	];
	function getDate(dateStr) {
		let date = new Date(dateStr);
		return `${String(date.getDate())}.${String(date.getMonth() + 1)}.${date.getFullYear()}`;
	}
	var $$exports = {
		get playerId() {
			return playerId();
		},
		set playerId($$value = "23595916") {
			playerId($$value);
			flushSync();
		},
		get theme() {
			return theme();
		},
		set theme($$value = "auto") {
			theme($$value);
			flushSync();
		},
		get layout() {
			return layout();
		},
		set layout($$value = "vertical") {
			layout($$value);
			flushSync();
		}
	};
	var fragment = comment();
	var node = first_child(fragment);
	var consequent_3 = ($$anchor) => {
		var div = root_3$3();
		var div_1 = child(div);
		var img = child(div_1);
		var img_1 = sibling(img, 2);
		next(2);
		reset(div_1);
		var section = sibling(div_1, 2);
		var p = child(section);
		var text = child(p);
		reset(p);
		var div_2 = sibling(p, 2);
		var div_3 = child(div_2);
		var node_1 = child(div_3);
		html(node_1, () => calendar_default);
		var div_4 = sibling(node_1, 2);
		var p_1 = sibling(child(div_4), 2);
		var text_1 = child(p_1, true);
		reset(p_1);
		reset(div_4);
		reset(div_3);
		var div_5 = sibling(div_3, 2);
		var node_2 = child(div_5);
		html(node_2, () => flag_default);
		var div_6 = sibling(node_2, 2);
		var p_2 = sibling(child(div_6), 2);
		var text_2 = child(p_2);
		reset(p_2);
		reset(div_6);
		reset(div_5);
		var div_7 = sibling(div_5, 2);
		var node_3 = child(div_7);
		html(node_3, () => flag_default);
		var div_8 = sibling(node_3, 2);
		var p_3 = sibling(child(div_8), 2);
		var text_3 = child(p_3);
		reset(p_3);
		reset(div_8);
		reset(div_7);
		var div_9 = sibling(div_7, 2);
		var node_4 = child(div_9);
		html(node_4, () => ruler_default);
		var div_10 = sibling(node_4, 2);
		var p_4 = sibling(child(div_10), 2);
		var text_4 = child(p_4);
		reset(p_4);
		reset(div_10);
		reset(div_9);
		var div_11 = sibling(div_9, 2);
		var node_5 = child(div_11);
		html(node_5, () => weight_default);
		var div_12 = sibling(node_5, 2);
		var p_5 = sibling(child(div_12), 2);
		var text_5 = child(p_5);
		reset(p_5);
		reset(div_12);
		reset(div_11);
		var div_13 = sibling(div_11, 2);
		var node_6 = child(div_13);
		html(node_6, () => rink_default);
		var div_14 = sibling(node_6, 2);
		var p_6 = sibling(child(div_14), 2);
		var text_6 = child(p_6, true);
		reset(p_6);
		reset(div_14);
		reset(div_13);
		var div_15 = sibling(div_13, 2);
		var node_7 = child(div_15);
		var consequent = ($$anchor) => {
			var fragment_1 = comment();
			html(first_child(fragment_1), () => stick_r_default);
			append($$anchor, fragment_1);
		};
		var alternate = ($$anchor) => {
			var fragment_2 = comment();
			html(first_child(fragment_2), () => stick_l_default);
			append($$anchor, fragment_2);
		};
		if_block(node_7, ($$render) => {
			if (get(player).handedness == "R") $$render(consequent);
			else $$render(alternate, -1);
		});
		var div_16 = sibling(node_7, 2);
		var p_7 = sibling(child(div_16), 2);
		var text_7 = child(p_7, true);
		reset(p_7);
		reset(div_16);
		reset(div_15);
		reset(div_2);
		var node_10 = sibling(div_2, 2);
		var consequent_1 = ($$anchor) => {
			var div_17 = root_1$4();
			var p_8 = child(div_17);
			var text_8 = child(p_8, true);
			reset(p_8);
			each(sibling(p_8, 2), 17, () => statLabels, index, ($$anchor, stat) => {
				var div_18 = root$4();
				var p_9 = child(div_18);
				var text_9 = child(p_9, true);
				reset(p_9);
				var p_10 = sibling(p_9, 2);
				var text_10 = child(p_10, true);
				reset(p_10);
				reset(div_18);
				template_effect(() => {
					set_attribute(div_18, "title", get(stat).name);
					set_text(text_9, get(stat).label);
					set_text(text_10, get(latestSeasonStats)[get(stat).key]);
				});
				append($$anchor, div_18);
			});
			reset(div_17);
			template_effect(() => set_text(text_8, get(latestSeasonStats).season));
			append($$anchor, div_17);
		};
		if_block(node_10, ($$render) => {
			if (get(latestSeasonStats)) $$render(consequent_1);
		});
		var node_12 = sibling(node_10, 2);
		var consequent_2 = ($$anchor) => {
			var div_19 = root_2$4();
			each(sibling(child(div_19), 2), 17, () => statLabels, index, ($$anchor, stat) => {
				var div_20 = root$4();
				var p_11 = child(div_20);
				var text_11 = child(p_11, true);
				reset(p_11);
				var p_12 = sibling(p_11, 2);
				var text_12 = child(p_12, true);
				reset(p_12);
				reset(div_20);
				template_effect(() => {
					set_attribute(div_20, "title", get(stat).name);
					set_text(text_11, get(stat).label);
					set_text(text_12, get(careerStats)[get(stat).key]);
				});
				append($$anchor, div_20);
			});
			reset(div_19);
			append($$anchor, div_19);
		};
		if_block(node_12, ($$render) => {
			if (get(careerStats)) $$render(consequent_2);
		});
		reset(section);
		reset(div);
		template_effect(($0, $1) => {
			set_class(div, 1, `liiga player widget card ${theme() ?? ""} ${layout() ?? ""}`, "svelte-1dqovpw");
			set_attribute(img, "src", get(latestTeam)?.imageUrl || "");
			set_attribute(img, "alt", `${get(player).firstName} ${get(player).lastName}`);
			set_attribute(img_1, "src", $0);
			set_text(text, `#${get(latestTeam)?.jersey ?? ""} ${get(player).firstName ?? ""} ${get(player).lastName ?? ""}`);
			set_text(text_1, $1);
			set_text(text_2, `${get(player).birthLocality.name ?? ""}, ${get(player).birthLocality.country.code ?? ""}`);
			set_text(text_3, `${get(player).nationality.name ?? ""}, ${get(player).nationality.code ?? ""}`);
			set_text(text_4, `${get(player).height ?? ""} cm`);
			set_text(text_5, `${get(player).weight ?? ""} kg`);
			set_text(text_6, get(latestTeam).position);
			set_text(text_7, get(player).handedness);
		}, [() => getTeamLogo(get(latestTeam).slug), () => getDate(get(player).dateOfBirth)]);
		append($$anchor, div);
	};
	if_block(node, ($$render) => {
		if (get(player) != null) $$render(consequent_3);
	});
	append($$anchor, fragment);
	return pop($$exports);
}
customElements.define("liiga-player-widget", create_custom_element(Player, {
	playerId: {},
	theme: {},
	layout: {}
}, [], []));
//#endregion
//#region src/utils/sorter.svelte.js
function createSorter(defaultAttribute = "points", defaultDescending = true) {
	const sort = proxy({
		attribute: defaultAttribute,
		descending: defaultDescending
	});
	function sortBy(attribute) {
		if (sort.attribute === attribute) sort.descending = !sort.descending;
		else {
			sort.attribute = attribute;
			sort.descending = defaultDescending;
		}
	}
	function compare(a, b) {
		const av = Number(a[sort.attribute] ?? 0);
		const bv = Number(b[sort.attribute] ?? 0);
		return sort.descending ? bv - av : av - bv;
	}
	return {
		sort,
		sortBy,
		compare
	};
}
//#endregion
//#region src/widgets/PlayerStandingsList.svelte
var root$3 = /* @__PURE__ */ from_html(`<th> </th>`);
var root_1$3 = /* @__PURE__ */ from_html(`<td class="left flex"><img class="player-image svelte-1lzm3xr"/> <span> </span></td>`);
var root_2$3 = /* @__PURE__ */ from_html(`<td class="left"> </td>`);
var root_3$2 = /* @__PURE__ */ from_html(`<td> </td>`);
var root_4$2 = /* @__PURE__ */ from_html(`<tr><td></td><!><td class="left"> </td><!></tr>`);
var root_5$2 = /* @__PURE__ */ from_html(`<table class="card"><thead><tr><th>Sija</th><th class="left">Nimi</th><th class="left">Seura</th><!></tr></thead><tbody></tbody></table>`);
var root_6 = /* @__PURE__ */ from_html(`<div><!></div>`);
var $$css$3 = {
	hash: "svelte-1lzm3xr",
	code: ".liiga.player-standings-list.widget.svelte-1lzm3xr {.player-image:where(.svelte-1lzm3xr) {width:50px;height:30px;object-fit:cover;object-position:center top;}}"
};
function PlayerStandingsList($$anchor, $$props) {
	push($$props, true);
	append_styles$1($$anchor, $$css$3);
	const PLAYER_COLUMNS = {
		games: {
			title: "Ottelut",
			label: "O"
		},
		goals: {
			title: "Maalit",
			label: "M"
		},
		assists: {
			title: "Syötöt",
			label: "S"
		},
		points: {
			title: "Pisteet",
			label: "P"
		},
		penaltyMinutes: {
			title: "Rangaistusminuutit",
			label: "R"
		}
	};
	let season = prop($$props, "season", 7, "2026"), series = prop($$props, "series", 7, "runkosarja"), team = prop($$props, "team", 7, "jyp"), dataType = prop($$props, "dataType", 7, "basicStats"), limit = prop($$props, "limit", 7, 100), columns = prop($$props, "columns", 7, "games, goals, assists, points, penaltyMinutes"), defaultSort = prop($$props, "defaultSort", 7, "points"), showImages = prop($$props, "showImages", 7, false), theme = prop($$props, "theme", 7, "auto"), highlightPlayer = prop($$props, "highlightPlayer", 7, null), link = prop($$props, "link", 7, "none");
	let players = /* @__PURE__ */ state(null);
	const { sort, sortBy, compare } = createSorter("points");
	user_effect(() => {
		sort.attribute = defaultSort();
	});
	let sortedPlayers = /* @__PURE__ */ user_derived(() => {
		if (!get(players)) return [];
		return [...get(players)].sort(compare);
	});
	const visibleColumns = /* @__PURE__ */ user_derived(() => columns().split(",").map((c) => c.trim()).filter((c) => PLAYER_COLUMNS[c]));
	onMount(async () => {
		const url = ` https://www.liiga.fi/api/v2/players/stats/summed/${season()}/${season()}/${series()}/false?team=${team()}&dataType=${dataType()}&splitTeams=true`;
		const request = await fetch(url);
		set(players, await request.json(), true);
	});
	function handleClick(playerId) {
		if (link() === "none") return;
		if (link() === "liiga") window.open("https://www.liiga.fi/fi/pelaajat/" + playerId, "_blank");
	}
	var $$exports = {
		get season() {
			return season();
		},
		set season($$value = "2026") {
			season($$value);
			flushSync();
		},
		get series() {
			return series();
		},
		set series($$value = "runkosarja") {
			series($$value);
			flushSync();
		},
		get team() {
			return team();
		},
		set team($$value = "jyp") {
			team($$value);
			flushSync();
		},
		get dataType() {
			return dataType();
		},
		set dataType($$value = "basicStats") {
			dataType($$value);
			flushSync();
		},
		get limit() {
			return limit();
		},
		set limit($$value = 100) {
			limit($$value);
			flushSync();
		},
		get columns() {
			return columns();
		},
		set columns($$value = "games, goals, assists, points, penaltyMinutes") {
			columns($$value);
			flushSync();
		},
		get defaultSort() {
			return defaultSort();
		},
		set defaultSort($$value = "points") {
			defaultSort($$value);
			flushSync();
		},
		get showImages() {
			return showImages();
		},
		set showImages($$value = false) {
			showImages($$value);
			flushSync();
		},
		get theme() {
			return theme();
		},
		set theme($$value = "auto") {
			theme($$value);
			flushSync();
		},
		get highlightPlayer() {
			return highlightPlayer();
		},
		set highlightPlayer($$value = null) {
			highlightPlayer($$value);
			flushSync();
		},
		get link() {
			return link();
		},
		set link($$value = "none") {
			link($$value);
			flushSync();
		}
	};
	var div = root_6();
	var node = child(div);
	var consequent_2 = ($$anchor) => {
		var table = root_5$2();
		var thead = child(table);
		var tr = child(thead);
		each(sibling(child(tr), 3), 17, () => get(visibleColumns), index, ($$anchor, column) => {
			var th = root$3();
			let classes;
			var text = child(th, true);
			reset(th);
			template_effect(() => {
				set_attribute(th, "title", PLAYER_COLUMNS[get(column)].title);
				classes = set_class(th, 1, "", null, classes, { active: sort.attribute === get(column) });
				set_text(text, PLAYER_COLUMNS[get(column)].label);
			});
			delegated("click", th, () => sortBy(get(column)));
			append($$anchor, th);
		});
		reset(tr);
		reset(thead);
		var tbody = sibling(thead);
		each(tbody, 21, () => get(sortedPlayers), index, ($$anchor, player, i) => {
			var fragment = comment();
			var node_2 = first_child(fragment);
			var consequent_1 = ($$anchor) => {
				var tr_1 = root_4$2();
				let classes_1;
				var td = child(tr_1);
				td.textContent = `${i + 1}.`;
				var node_3 = sibling(td);
				var consequent = ($$anchor) => {
					var td_1 = root_1$3();
					var img = child(td_1);
					var span = sibling(img, 2);
					var text_1 = child(span);
					reset(span);
					reset(td_1);
					template_effect(() => {
						set_attribute(img, "src", get(player).pictureUrl);
						set_attribute(img, "alt", `${get(player).firstName} ${get(player).lastName}`);
						set_text(text_1, `${get(player).firstName ?? ""} ${get(player).lastName ?? ""}`);
					});
					append($$anchor, td_1);
				};
				var alternate = ($$anchor) => {
					var td_2 = root_2$3();
					var text_2 = child(td_2);
					reset(td_2);
					template_effect(() => set_text(text_2, `${get(player).firstName ?? ""} ${get(player).lastName ?? ""}`));
					append($$anchor, td_2);
				};
				if_block(node_3, ($$render) => {
					if (showImages()) $$render(consequent);
					else $$render(alternate, -1);
				});
				var td_3 = sibling(node_3);
				var text_3 = child(td_3, true);
				reset(td_3);
				each(sibling(td_3), 17, () => get(visibleColumns), index, ($$anchor, column) => {
					var td_4 = root_3$2();
					var text_4 = child(td_4, true);
					reset(td_4);
					template_effect(() => set_text(text_4, get(player)[get(column)]));
					append($$anchor, td_4);
				});
				reset(tr_1);
				template_effect(() => {
					classes_1 = set_class(tr_1, 1, "player", null, classes_1, {
						highlight: get(player).playerId == highlightPlayer(),
						clickable: link() != "none"
					});
					set_text(text_3, get(player).teamName);
				});
				delegated("click", tr_1, () => handleClick(get(player).playerId));
				append($$anchor, tr_1);
			};
			if_block(node_2, ($$render) => {
				if (limit() === 0 || i < limit()) $$render(consequent_1);
			});
			append($$anchor, fragment);
		});
		reset(tbody);
		reset(table);
		append($$anchor, table);
	};
	if_block(node, ($$render) => {
		if (get(players)) $$render(consequent_2);
	});
	reset(div);
	template_effect(() => set_class(div, 1, `liiga player-standings-list widget table ${theme() ?? ""}`, "svelte-1lzm3xr"));
	append($$anchor, div);
	return pop($$exports);
}
delegate(["click"]);
customElements.define("liiga-player-standings-list-widget", create_custom_element(PlayerStandingsList, {
	season: {},
	series: {},
	team: {},
	dataType: {},
	limit: {},
	columns: {},
	defaultSort: {},
	showImages: {},
	theme: {},
	highlightPlayer: {},
	link: {}
}, [], []));
//#endregion
//#region node_modules/svelte/src/easing/index.js
/**
* @param {number} t
* @returns {number}
*/
function cubicOut(t) {
	const f = t - 1;
	return f * f * f + 1;
}
//#endregion
//#region node_modules/svelte/src/animate/index.js
/** @import { FlipParams, AnimationConfig } from './public.js' */
/**
* The flip function calculates the start and end position of an element and animates between them, translating the x and y values.
* `flip` stands for [First, Last, Invert, Play](https://aerotwist.com/blog/flip-your-animations/).
*
* @param {Element} node
* @param {{ from: DOMRect; to: DOMRect }} fromTo
* @param {FlipParams} params
* @returns {AnimationConfig}
*/
function flip(node, { from, to }, params = {}) {
	var { delay = 0, duration = (d) => Math.sqrt(d) * 120, easing = cubicOut } = params;
	var style = getComputedStyle(node);
	var transform = style.transform === "none" ? "" : style.transform;
	var [ox, oy] = style.transformOrigin.split(" ").map(parseFloat);
	ox /= node.clientWidth;
	oy /= node.clientHeight;
	var zoom = get_zoom(node);
	var sx = node.clientWidth / to.width / zoom;
	var sy = node.clientHeight / to.height / zoom;
	var fx = from.left + from.width * ox;
	var fy = from.top + from.height * oy;
	var tx = to.left + to.width * ox;
	var ty = to.top + to.height * oy;
	var dx = (fx - tx) * sx;
	var dy = (fy - ty) * sy;
	var dsx = from.width / to.width;
	var dsy = from.height / to.height;
	return {
		delay,
		duration: typeof duration === "function" ? duration(Math.sqrt(dx * dx + dy * dy)) : duration,
		easing,
		css: (t, u) => {
			return `transform: ${transform} translate(${u * dx}px, ${u * dy}px) scale(${t + u * dsx}, ${t + u * dsy});`;
		}
	};
}
/**
* @param {Element} element
*/
function get_zoom(element) {
	if ("currentCSSZoom" in element) return element.currentCSSZoom;
	/** @type {Element | null} */
	var current = element;
	var zoom = 1;
	while (current !== null) {
		zoom *= +getComputedStyle(current).zoom;
		current = current.parentElement;
	}
	return zoom;
}
//#endregion
//#region src/widgets/PlayerStandingsTabs.svelte
var root$2 = /* @__PURE__ */ from_html(`<button> </button>`);
var root_1$2 = /* @__PURE__ */ from_html(`<span class="stat svelte-z7oerj"><strong> </strong> <small class="svelte-z7oerj"> </small></span>`);
var root_2$2 = /* @__PURE__ */ from_html(`<div class="stats svelte-z7oerj"></div>`);
var root_3$1 = /* @__PURE__ */ from_html(`<div class="score svelte-z7oerj"><p class="value"> </p></div>`);
var root_4$1 = /* @__PURE__ */ from_html(`<button><div class="player-image svelte-z7oerj"><img class="svelte-z7oerj"/></div> <div class="details svelte-z7oerj"><p class="name svelte-z7oerj"><span class="number svelte-z7oerj"> </span> </p> <!></div> <!></button>`);
var root_5$1 = /* @__PURE__ */ from_html(`<div><div class="tabs card svelte-z7oerj"></div> <!></div>`);
var $$css$2 = {
	hash: "svelte-z7oerj",
	code: ".liiga.player-standings-tabs.widget.svelte-z7oerj {flex-direction:column;background-color:transparent;padding:0;.tabs:where(.svelte-z7oerj) {display:flex;align-items:start;width:100%;gap:10px;box-sizing:border-box;button:where(.svelte-z7oerj) {background-color:var(--liiga-foreground);outline:none;border:none;border-radius:5px;padding:8px 15px;font-size:13px;transition:background-color 0.2s ease;&.active {background-color:var(--liiga-accent);color:var(--liiga-text-on-accent);}}}.player:where(.svelte-z7oerj) {display:flex;align-items:center;width:100%;background-color:var(--liiga-bg);border-radius:10px;box-sizing:border-box;overflow:hidden;outline:none;padding:0;}.player-image:where(.svelte-z7oerj) {width:130px;height:120px;margin-right:20px;img:where(.svelte-z7oerj) {width:100%;height:140%;object-fit:cover;object-position:center top;}}.details:where(.svelte-z7oerj) {flex-grow:1;margin-right:30px;.name:where(.svelte-z7oerj) {font-size:20px;font-weight:500;display:flex;flex-direction:column;align-items:start;margin:0;.number:where(.svelte-z7oerj) {color:var(--liiga-text-secondary);font-weight:400;font-size:15px;}}.stats:where(.svelte-z7oerj) {display:flex;flex-wrap:wrap;gap:12px;margin-top:6px;.stat:where(.svelte-z7oerj) {display:flex;flex-direction:column;align-items:start;small:where(.svelte-z7oerj) {font-size:11px;opacity:0.7;text-transform:capitalize;}}}}.score:where(.svelte-z7oerj) {height:120px;width:100px;background-color:var(--liiga-accent);color:var(--liiga-text-on-accent);display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:25px;}}"
};
function PlayerStandingsTabs($$anchor, $$props) {
	push($$props, true);
	append_styles$1($$anchor, $$css$2);
	let season = prop($$props, "season", 7, "2026"), series = prop($$props, "series", 7, "runkosarja"), team = prop($$props, "team", 7, "jyp"), dataType = prop($$props, "dataType", 7, "basicStats"), limit = prop($$props, "limit", 7, 5), columns = prop($$props, "columns", 7, "points, goals, assists, games, penaltyMinutes"), defaultSort = prop($$props, "defaultSort", 7, "points"), theme = prop($$props, "theme", 7, "auto"), showScoreCard = prop($$props, "showScoreCard", 7, true), showAllStats = prop($$props, "showAllStats", 7, true), link = prop($$props, "link", 7, "none");
	let players = /* @__PURE__ */ state(null);
	const { sort, sortBy, compare } = createSorter("points");
	user_effect(() => {
		sort.attribute = defaultSort();
	});
	let sortedPlayers = /* @__PURE__ */ user_derived(() => {
		if (!get(players)) return [];
		return [...get(players)].sort(compare).slice(0, limit());
	});
	onMount(async () => {
		const url = ` https://www.liiga.fi/api/v2/players/stats/summed/${season()}/${season()}/${series()}/false?team=${team()}&dataType=${dataType()}&splitTeams=true`;
		const request = await fetch(url);
		set(players, await request.json(), true);
	});
	const visibleColumns = /* @__PURE__ */ user_derived(() => columns().split(",").map((c) => c.trim()).filter(Boolean));
	function getColumnValue(player, column) {
		return player[column] ?? "-";
	}
	const labels = {
		points: "Pisteet",
		goals: "Maalit",
		assists: "Syötöt",
		games: "Ottelut",
		penaltyMinutes: "Jäähyminuutit"
	};
	function handleClick(playerId) {
		if (link() === "none") return;
		if (link() === "liiga") window.open("https://www.liiga.fi/fi/pelaajat/" + playerId, "_blank");
	}
	var $$exports = {
		get season() {
			return season();
		},
		set season($$value = "2026") {
			season($$value);
			flushSync();
		},
		get series() {
			return series();
		},
		set series($$value = "runkosarja") {
			series($$value);
			flushSync();
		},
		get team() {
			return team();
		},
		set team($$value = "jyp") {
			team($$value);
			flushSync();
		},
		get dataType() {
			return dataType();
		},
		set dataType($$value = "basicStats") {
			dataType($$value);
			flushSync();
		},
		get limit() {
			return limit();
		},
		set limit($$value = 5) {
			limit($$value);
			flushSync();
		},
		get columns() {
			return columns();
		},
		set columns($$value = "points, goals, assists, games, penaltyMinutes") {
			columns($$value);
			flushSync();
		},
		get defaultSort() {
			return defaultSort();
		},
		set defaultSort($$value = "points") {
			defaultSort($$value);
			flushSync();
		},
		get theme() {
			return theme();
		},
		set theme($$value = "auto") {
			theme($$value);
			flushSync();
		},
		get showScoreCard() {
			return showScoreCard();
		},
		set showScoreCard($$value = true) {
			showScoreCard($$value);
			flushSync();
		},
		get showAllStats() {
			return showAllStats();
		},
		set showAllStats($$value = true) {
			showAllStats($$value);
			flushSync();
		},
		get link() {
			return link();
		},
		set link($$value = "none") {
			link($$value);
			flushSync();
		}
	};
	var div = root_5$1();
	var div_1 = child(div);
	each(div_1, 21, () => get(visibleColumns), index, ($$anchor, column) => {
		var button = root$2();
		let classes;
		var text = child(button, true);
		reset(button);
		template_effect(() => {
			classes = set_class(button, 1, "svelte-z7oerj", null, classes, { active: sort.attribute === get(column) });
			set_text(text, labels[get(column)]);
		});
		delegated("click", button, () => sort.attribute = get(column));
		append($$anchor, button);
	});
	reset(div_1);
	var node = sibling(div_1, 2);
	var consequent_3 = ($$anchor) => {
		var fragment = comment();
		each(first_child(fragment), 25, () => get(sortedPlayers), (player) => player.playerId, ($$anchor, player) => {
			var button_1 = root_4$1();
			let classes_1;
			var div_2 = child(button_1);
			var img = child(div_2);
			reset(div_2);
			var div_3 = sibling(div_2, 2);
			var p = child(div_3);
			var span = child(p);
			var text_1 = child(span);
			reset(span);
			var text_2 = sibling(span);
			reset(p);
			var node_2 = sibling(p, 2);
			var consequent_1 = ($$anchor) => {
				var div_4 = root_2$2();
				each(div_4, 21, () => get(visibleColumns), index, ($$anchor, column) => {
					var fragment_1 = comment();
					var node_3 = first_child(fragment_1);
					var consequent = ($$anchor) => {
						var span_1 = root_1$2();
						var strong = child(span_1);
						var text_3 = child(strong, true);
						reset(strong);
						var small = sibling(strong, 2);
						var text_4 = child(small, true);
						reset(small);
						reset(span_1);
						template_effect(($0) => {
							set_text(text_3, $0);
							set_text(text_4, labels[get(column)]);
						}, [() => getColumnValue(get(player), get(column))]);
						append($$anchor, span_1);
					};
					if_block(node_3, ($$render) => {
						if (!(showScoreCard() && get(column) === sort.attribute)) $$render(consequent);
					});
					append($$anchor, fragment_1);
				});
				reset(div_4);
				append($$anchor, div_4);
			};
			if_block(node_2, ($$render) => {
				if (showAllStats()) $$render(consequent_1);
			});
			reset(div_3);
			var node_4 = sibling(div_3, 2);
			var consequent_2 = ($$anchor) => {
				var div_5 = root_3$1();
				var p_1 = child(div_5);
				var text_5 = child(p_1, true);
				reset(p_1);
				reset(div_5);
				template_effect(($0) => set_text(text_5, $0), [() => getColumnValue(get(player), sort.attribute)]);
				append($$anchor, div_5);
			};
			if_block(node_4, ($$render) => {
				if (showScoreCard()) $$render(consequent_2);
			});
			reset(button_1);
			template_effect(() => {
				classes_1 = set_class(button_1, 1, "player card svelte-z7oerj", null, classes_1, { clickable: link() != "none" });
				set_attribute(img, "src", get(player).pictureUrl);
				set_attribute(img, "alt", `${get(player).firstName} ${get(player).lastName}}`);
				set_text(text_1, `#${get(player).jersey ?? ""}`);
				set_text(text_2, ` ${get(player).firstName ?? ""} ${get(player).lastName ?? ""}`);
			});
			delegated("click", button_1, () => handleClick(get(player).playerId));
			animation(button_1, () => flip, () => ({ duration: 400 }));
			append($$anchor, button_1);
		});
		append($$anchor, fragment);
	};
	if_block(node, ($$render) => {
		if (get(players)) $$render(consequent_3);
	});
	reset(div);
	template_effect(() => set_class(div, 1, `liiga player-standings-tabs widget table ${theme() ?? ""}`, "svelte-z7oerj"));
	append($$anchor, div);
	return pop($$exports);
}
delegate(["click"]);
customElements.define("liiga-player-standings-tabs-widget", create_custom_element(PlayerStandingsTabs, {
	season: {},
	series: {},
	team: {},
	dataType: {},
	limit: {},
	columns: {},
	defaultSort: {},
	theme: {},
	showScoreCard: {},
	showAllStats: {},
	link: {}
}, [], []));
//#endregion
//#region src/widgets/TeamStandings.svelte
var root$1 = /* @__PURE__ */ from_html(`<tr><td class="flex"><img class="logo svelte-8l6w1z"/> <span> </span></td><td> </td><td> </td><td> </td><td> </td><td> </td></tr>`);
var root_1$1 = /* @__PURE__ */ from_html(`<table class="card"><thead><tr><th class="left"></th><th title="Ottelut">O</th><th title="Voitot">V</th><th title="Tasapelit">T</th><th title="Häviöt">H</th><th title="Pisteet">P</th></tr></thead><tbody></tbody></table>`);
var root_2$1 = /* @__PURE__ */ from_html(`<div><!></div>`);
var $$css$1 = {
	hash: "svelte-8l6w1z",
	code: ".liiga.team-standings.widget.svelte-8l6w1z {.logo:where(.svelte-8l6w1z) {width:30px;height:30px;}}"
};
function TeamStandings($$anchor, $$props) {
	push($$props, true);
	append_styles$1($$anchor, $$css$1);
	let season = prop($$props, "season", 7, "2026"), theme = prop($$props, "theme", 7, "auto"), highlightTeam = prop($$props, "highlightTeam", 7, "jyp"), link = prop($$props, "link", 7, "none");
	let data = /* @__PURE__ */ state(null);
	const { sort, sortBy, compare } = createSorter("points");
	let sortedTeams = /* @__PURE__ */ user_derived(() => {
		if (!get(data)) return [];
		return [...get(data).season].sort(compare);
	});
	onMount(async () => {
		const url = `https://www.liiga.fi/api/v2/standings/?season=${season()}`;
		const request = await fetch(url);
		set(data, await request.json(), true);
	});
	function needsHighlight(rawId) {
		const parts = rawId.split(":");
		if (parts.length < 1) return false;
		return parts[1] === highlightTeam();
	}
	function handleClick(teamId) {
		if (link() === "none") return;
		const parts = teamId.split(":");
		if (parts.length < 1) return false;
		const lastPart = parts[1];
		if (link() === "homepage") {
			const url = teams.find((team) => team.id === lastPart)?.homepage;
			console.log(url);
			if (url) window.open(url, "_blank", "noopener,noreferrer");
		}
		if (link() === "liiga") {
			const base = "https://www.liiga.fi/fi/joukkueet/";
			const urlsafe = lastPart.replaceAll("ä", "a").replaceAll("ö", "o");
			window.open(base + urlsafe, "_blank", "noopener,noreferrer");
		}
	}
	var $$exports = {
		get season() {
			return season();
		},
		set season($$value = "2026") {
			season($$value);
			flushSync();
		},
		get theme() {
			return theme();
		},
		set theme($$value = "auto") {
			theme($$value);
			flushSync();
		},
		get highlightTeam() {
			return highlightTeam();
		},
		set highlightTeam($$value = "jyp") {
			highlightTeam($$value);
			flushSync();
		},
		get link() {
			return link();
		},
		set link($$value = "none") {
			link($$value);
			flushSync();
		}
	};
	var div = root_2$1();
	var node = child(div);
	var consequent = ($$anchor) => {
		var table = root_1$1();
		var thead = child(table);
		var tr = child(thead);
		var th = sibling(child(tr));
		let classes;
		var th_1 = sibling(th);
		let classes_1;
		var th_2 = sibling(th_1);
		let classes_2;
		var th_3 = sibling(th_2);
		let classes_3;
		var th_4 = sibling(th_3);
		let classes_4;
		reset(tr);
		reset(thead);
		var tbody = sibling(thead);
		each(tbody, 21, () => get(sortedTeams), index, ($$anchor, team) => {
			var tr_1 = root$1();
			let classes_5;
			var td = child(tr_1);
			var img = child(td);
			var span = sibling(img, 2);
			var text = child(span, true);
			reset(span);
			reset(td);
			var td_1 = sibling(td);
			var text_1 = child(td_1, true);
			reset(td_1);
			var td_2 = sibling(td_1);
			var text_2 = child(td_2, true);
			reset(td_2);
			var td_3 = sibling(td_2);
			var text_3 = child(td_3, true);
			reset(td_3);
			var td_4 = sibling(td_3);
			var text_4 = child(td_4, true);
			reset(td_4);
			var td_5 = sibling(td_4);
			var text_5 = child(td_5, true);
			reset(td_5);
			reset(tr_1);
			template_effect(($0, $1) => {
				classes_5 = set_class(tr_1, 1, "", null, classes_5, $0);
				set_attribute(img, "src", $1);
				set_attribute(img, "alt", get(team).teamName);
				set_text(text, get(team).teamName);
				set_text(text_1, get(team).games);
				set_text(text_2, get(team).wins);
				set_text(text_3, get(team).ties);
				set_text(text_4, get(team).losses);
				set_text(text_5, get(team).points);
			}, [() => ({
				highlight: needsHighlight(get(team).teamId),
				clickable: link() != "none"
			}), () => getTeamLogo(get(team).teamId)]);
			delegated("click", tr_1, () => handleClick(get(team).teamId));
			append($$anchor, tr_1);
		});
		reset(tbody);
		reset(table);
		template_effect(() => {
			classes = set_class(th, 1, "clickable", null, classes, { active: sort.attribute === "games" });
			classes_1 = set_class(th_1, 1, "clickable", null, classes_1, { active: sort.attribute === "wins" });
			classes_2 = set_class(th_2, 1, "clickable", null, classes_2, { active: sort.attribute === "ties" });
			classes_3 = set_class(th_3, 1, "clickable", null, classes_3, { active: sort.attribute === "losses" });
			classes_4 = set_class(th_4, 1, "clickable", null, classes_4, { active: sort.attribute === "points" });
		});
		delegated("click", th, () => sortBy("games"));
		delegated("click", th_1, () => sortBy("wins"));
		delegated("click", th_2, () => sortBy("ties"));
		delegated("click", th_3, () => sortBy("losses"));
		delegated("click", th_4, () => sortBy("points"));
		append($$anchor, table);
	};
	if_block(node, ($$render) => {
		if (get(data) != null) $$render(consequent);
	});
	reset(div);
	template_effect(() => set_class(div, 1, `liiga team-standings widget table ${theme() ?? ""}`, "svelte-8l6w1z"));
	append($$anchor, div);
	return pop($$exports);
}
delegate(["click"]);
customElements.define("liiga-team-standings-widget", create_custom_element(TeamStandings, {
	season: {},
	theme: {},
	highlightTeam: {},
	link: {}
}, [], []));
//#endregion
//#region src/widgets/MatchList.svelte
var root = /* @__PURE__ */ from_html(`<div class="month svelte-f2n30u"> </div>`);
var root_1 = /* @__PURE__ */ from_html(`<a class="tickets svelte-f2n30u" target="_blank">Osta liput</a>`);
var root_2 = /* @__PURE__ */ from_html(`<div class="gradient svelte-f2n30u"></div>`);
var root_3 = /* @__PURE__ */ from_html(`<div class="match svelte-f2n30u"><p class="date svelte-f2n30u"> </p> <p class="home name svelte-f2n30u"> </p> <img class="logo svelte-f2n30u"/> <p class="time svelte-f2n30u"> </p> <img class="logo svelte-f2n30u"/> <p class="away name svelte-f2n30u"> </p> <!> <!></div>`);
var root_4 = /* @__PURE__ */ from_html(`<!> <div class="matches card svelte-f2n30u"></div>`, 1);
var root_5 = /* @__PURE__ */ from_html(`<div><!></div>`);
var $$css = {
	hash: "svelte-f2n30u",
	code: ".liiga.match-list.widget.svelte-f2n30u {flex-direction:column;padding:0;.matches:where(.svelte-f2n30u) {border-radius:10px;overflow:hidden;padding:0;.match:where(.svelte-f2n30u) {display:grid;grid-template-columns:80px minmax(140px, 1fr) 40px 60px 40px minmax(140px, 1fr);width:100%;align-items:center;padding:10px;box-sizing:border-box;gap:10px;position:relative;.date:where(.svelte-f2n30u) {justify-self:start;}.time:where(.svelte-f2n30u) {justify-self:center;}.logo:where(.svelte-f2n30u) {width:40px;height:40px;justify-self:center;}&:nth-child(even) {background:var(--liiga-foreground);}.home.name:where(.svelte-f2n30u) {justify-self:end;}.away.name:where(.svelte-f2n30u) {justify-self:start;}.date:where(.svelte-f2n30u),\n                .time:where(.svelte-f2n30u),\n                .logo:where(.svelte-f2n30u),\n                .name:where(.svelte-f2n30u),\n                .tickets:where(.svelte-f2n30u) {z-index:2;}.gradient:where(.svelte-f2n30u) {position:absolute;left:0;right:0;top:0;bottom:0;}}}&.separateMonths {background-color:transparent;.matches:where(.svelte-f2n30u) {background-color:var(--liiga-bg);}.month:where(.svelte-f2n30u) {display:flex;width:100%;margin-top:10px;}}&.ticketButton {.match:where(.svelte-f2n30u) {grid-template-columns:80px minmax(140px, 1fr) 40px 60px 40px minmax(140px, 1fr) 100px;}.tickets:where(.svelte-f2n30u) {color:var(--liiga-text);text-decoration:none;cursor:pointer;text-align:end;}}}"
};
function MatchList($$anchor, $$props) {
	push($$props, true);
	append_styles$1($$anchor, $$css);
	let matches = /* @__PURE__ */ state(null);
	let season = prop($$props, "season", 7, 2027), tournament = prop($$props, "tournament", 7, "runkosarja"), team = prop($$props, "team", 7, null), venue = prop($$props, "venue", 7, null), separateMonths = prop($$props, "separateMonths", 7, true), ticketButton = prop($$props, "ticketButton", 7, true), limit = prop($$props, "limit", 7, 0), gradient = prop($$props, "gradient", 7, false), theme = prop($$props, "theme", 7, "auto");
	onMount(async () => {
		const url = `https://www.liiga.fi/api/v2/schedule?tournament=${tournament()}&season=${season()}`;
		const request = await fetch(url);
		set(matches, await request.json(), true);
		console.log(snapshot(get(matches)));
	});
	let filteredMatches = /* @__PURE__ */ user_derived(() => {
		if (!get(matches)) return [];
		const filtered = get(matches).filter((match) => {
			if (!team()) return true;
			const home = parseId(match.homeTeamId);
			const away = parseId(match.awayTeamId);
			switch (venue()) {
				case "home": return home === team();
				case "away": return away === team();
				default: return home === team() || away === team();
			}
		});
		if (limit() > 0) return filtered.slice(0, limit());
		return filtered;
	});
	function getDate(dateStr) {
		let date = new Date(dateStr);
		return `${String(date.getDate()).padStart(2, "0")}.${String(date.getMonth() + 1).padStart(2, "0")}.${date.getFullYear()}`;
	}
	function getTime(dateStr) {
		let date = new Date(dateStr);
		return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
	}
	const months = [
		"Tammikuu",
		"Helmikuu",
		"Maaliskuu",
		"Huhtikuu",
		"Toukokuu",
		"Kesäkuu",
		"Heinäkuu",
		"Elokuu",
		"Syyskuu",
		"Lokakuu",
		"Marraskuu",
		"Joulukuu"
	];
	let groupedMatches = /* @__PURE__ */ user_derived(() => {
		if (!separateMonths()) return [{
			month: null,
			matches: get(filteredMatches)
		}];
		const groups = [];
		for (const match of get(filteredMatches)) {
			const date = new Date(match.start);
			const key = `${date.getFullYear()}-${date.getMonth()}`;
			const label = `${months[date.getMonth()]} ${date.getFullYear()}`;
			let group = groups.at(-1);
			if (!group || group.key !== key) {
				group = {
					key,
					month: label,
					matches: []
				};
				groups.push(group);
			}
			group.matches.push(match);
		}
		return groups;
	});
	function getBackground(game) {
		return `
        linear-gradient(
            90deg,
            transparent 0%,
            ${getTeamColor(game.homeTeamId)}22 30%,
            ${getTeamColor(game.awayTeamId)}22 70%,
            transparent 100%
        )`;
	}
	var $$exports = {
		get season() {
			return season();
		},
		set season($$value = 2027) {
			season($$value);
			flushSync();
		},
		get tournament() {
			return tournament();
		},
		set tournament($$value = "runkosarja") {
			tournament($$value);
			flushSync();
		},
		get team() {
			return team();
		},
		set team($$value = null) {
			team($$value);
			flushSync();
		},
		get venue() {
			return venue();
		},
		set venue($$value = null) {
			venue($$value);
			flushSync();
		},
		get separateMonths() {
			return separateMonths();
		},
		set separateMonths($$value = true) {
			separateMonths($$value);
			flushSync();
		},
		get ticketButton() {
			return ticketButton();
		},
		set ticketButton($$value = true) {
			ticketButton($$value);
			flushSync();
		},
		get limit() {
			return limit();
		},
		set limit($$value = 0) {
			limit($$value);
			flushSync();
		},
		get gradient() {
			return gradient();
		},
		set gradient($$value = false) {
			gradient($$value);
			flushSync();
		},
		get theme() {
			return theme();
		},
		set theme($$value = "auto") {
			theme($$value);
			flushSync();
		}
	};
	var div = root_5();
	let classes;
	var node = child(div);
	var consequent_3 = ($$anchor) => {
		var fragment = comment();
		each(first_child(fragment), 17, () => get(groupedMatches), index, ($$anchor, group) => {
			var fragment_1 = root_4();
			var node_2 = first_child(fragment_1);
			var consequent = ($$anchor) => {
				var div_1 = root();
				var text = child(div_1, true);
				reset(div_1);
				template_effect(() => set_text(text, get(group).month));
				append($$anchor, div_1);
			};
			if_block(node_2, ($$render) => {
				if (get(group).month) $$render(consequent);
			});
			var div_2 = sibling(node_2, 2);
			each(div_2, 21, () => get(group).matches, (match) => match.id, ($$anchor, match) => {
				var div_3 = root_3();
				var p = child(div_3);
				var text_1 = child(p, true);
				reset(p);
				var p_1 = sibling(p, 2);
				var text_2 = child(p_1, true);
				reset(p_1);
				var img = sibling(p_1, 2);
				var p_2 = sibling(img, 2);
				var text_3 = child(p_2, true);
				reset(p_2);
				var img_1 = sibling(p_2, 2);
				var p_3 = sibling(img_1, 2);
				var text_4 = child(p_3, true);
				reset(p_3);
				var node_3 = sibling(p_3, 2);
				var consequent_1 = ($$anchor) => {
					var a = root_1();
					template_effect(() => set_attribute(a, "href", get(match).buyTicketsUrl));
					append($$anchor, a);
				};
				if_block(node_3, ($$render) => {
					if (ticketButton() && get(match).buyTicketsUrl != null) $$render(consequent_1);
				});
				var node_4 = sibling(node_3, 2);
				var consequent_2 = ($$anchor) => {
					var div_4 = root_2();
					template_effect(($0) => set_style(div_4, $0), [() => get(match) ? `background: ${getBackground(get(match))}` : ""]);
					append($$anchor, div_4);
				};
				if_block(node_4, ($$render) => {
					if (gradient()) $$render(consequent_2);
				});
				reset(div_3);
				template_effect(($0, $1, $2, $3) => {
					set_text(text_1, $0);
					set_text(text_2, get(match).homeTeamName);
					set_attribute(img, "src", $1);
					set_attribute(img, "alt", get(match).homeTeamName);
					set_text(text_3, $2);
					set_attribute(img_1, "src", $3);
					set_attribute(img_1, "alt", get(match).awayTeamName);
					set_text(text_4, get(match).awayTeamName);
				}, [
					() => getDate(get(match).start),
					() => getTeamLogo(get(match).homeTeamId),
					() => getTime(get(match).start),
					() => getTeamLogo(get(match).awayTeamId)
				]);
				append($$anchor, div_3);
			});
			reset(div_2);
			append($$anchor, fragment_1);
		});
		append($$anchor, fragment);
	};
	if_block(node, ($$render) => {
		if (get(matches) != null) $$render(consequent_3);
	});
	reset(div);
	template_effect(() => classes = set_class(div, 1, `liiga match-list widget ${theme() ?? ""}`, "svelte-f2n30u", classes, {
		separateMonths: separateMonths(),
		ticketButton: ticketButton()
	}));
	append($$anchor, div);
	return pop($$exports);
}
customElements.define("liiga-match-list-widget", create_custom_element(MatchList, {
	season: {},
	tournament: {},
	team: {},
	venue: {},
	separateMonths: {},
	ticketButton: {},
	limit: {},
	gradient: {},
	theme: {}
}, [], []));
//#endregion
