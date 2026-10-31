import assert from "node:assert/strict";
import { capitalizePackageName } from "./strings.ts";

assert.equal(capitalizePackageName("canvas-confetti"), "CanvasConfetti");
assert.equal(capitalizePackageName("@vue/reactivity"), "VueReactivity");
assert.equal(capitalizePackageName("lodash.debounce"), "LodashDebounce");
assert.equal(capitalizePackageName("react"), "React");
