var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i4 = decorators.length - 1, decorator; i4 >= 0; i4--)
    if (decorator = decorators[i4])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
var __decorateParam = (index, decorator) => (target, key) => decorator(target, key, index);

// node_modules/@adaas/a-concept/dist/browser/index.mjs
var _a;
var V = (_a = class {
  constructor(e = {}) {
    this._name = e.name || this.constructor.name;
  }
  get name() {
    return this._name;
  }
  toJSON() {
    return { name: this.name };
  }
}, __name(_a, "V"), _a);
var Ne = ((o3) => (o3.INITIALIZED = "INITIALIZED", o3.PROCESSING = "PROCESSING", o3.COMPLETED = "COMPLETED", o3.INTERRUPTED = "INTERRUPTED", o3.FAILED = "FAILED", o3))(Ne || {});
var _a2;
var y = (_a2 = class {
  static toUpperSnakeCase(e) {
    return e.trim().replace(/([a-z])([A-Z])/g, "$1_$2").replace(/[^a-zA-Z0-9]+/g, "_").replace(/_+/g, "_").replace(/^_|_$/g, "").toUpperCase();
  }
  static toCamelCase(e) {
    return e.trim().replace(/[^a-zA-Z0-9]+/g, " ").split(" ").filter(Boolean).map((t5, r4) => r4 === 0 ? t5.toLowerCase() : t5.charAt(0).toUpperCase() + t5.slice(1).toLowerCase()).join("");
  }
  static toPascalCase(e) {
    return e.trim().replace(/([a-z])([A-Z])/g, "$1 $2").replace(/[^a-zA-Z0-9]+/g, " ").split(" ").filter(Boolean).map((t5) => t5.charAt(0).toUpperCase() + t5.slice(1).toLowerCase()).join("");
  }
  static toKebabCase(e) {
    return e.replace(/[^a-zA-Z0-9]+/g, " ").replace(/([a-z0-9])([A-Z])/g, "$1 $2").trim().replace(/\s+/g, "-").toLowerCase();
  }
}, __name(_a2, "y"), _a2);
var _a3;
var z = (_a3 = class {
  static generateTimeId(e = { timestamp: /* @__PURE__ */ new Date(), random: Math.random().toString(36).slice(2, 8) }) {
    let t5 = e.timestamp.getTime().toString(36), r4 = e.random;
    return `${t5}-${r4}`;
  }
  static parseTimeId(e) {
    let [t5, r4] = e.split("-");
    return { timestamp: new Date(parseInt(t5, 36)), random: r4 };
  }
  static formatWithLeadingZeros(e, t5 = 10) {
    return String(e).padStart(t5 + 1, "0").slice(-t5);
  }
  static removeLeadingZeros(e) {
    return String(Number(e));
  }
  static hashString(e) {
    let t5 = 0, r4, n2;
    if (e.length === 0) return t5.toString();
    for (r4 = 0; r4 < e.length; r4++) n2 = e.charCodeAt(r4), t5 = (t5 << 5) - t5 + n2, t5 |= 0;
    return t5.toString();
  }
}, __name(_a3, "z"), _a3);
var _a4;
var C = (_a4 = class {
  static isString(e) {
    return typeof e == "string" || e instanceof String;
  }
  static isNumber(e) {
    return typeof e == "number" && isFinite(e);
  }
  static isBoolean(e) {
    return typeof e == "boolean";
  }
  static isObject(e) {
    return e !== null && typeof e == "object" && !Array.isArray(e);
  }
  static isArray(e) {
    return Array.isArray(e);
  }
  static isErrorConstructorType(e) {
    return !!e && _a4.isObject(e) && !(e instanceof Error) && "title" in e;
  }
  static isErrorSerializedType(e) {
    return !!e && _a4.isObject(e) && !(e instanceof Error) && "aseid" in e && _a4.isString(e.aseid);
  }
  static isScopeInstance(e) {
    return !!e && typeof e == "object" && "name" in e && "aseid" in e;
  }
}, __name(_a4, "s"), _a4);
var _a5;
var O = (_a5 = class {
  static isASEID(e) {
    return this.regexp.test(e);
  }
  static compare(e, t5) {
    if (!e || !t5) return false;
    if (C.isString(e) && this.isASEID(e) === false) throw new Error(`Invalid ASEID format provided: ${e}`);
    if (C.isString(t5) && this.isASEID(t5) === false) throw new Error(`Invalid ASEID format provided: ${t5}`);
    let r4 = e instanceof _a5 ? e : new _a5(e), n2 = t5 instanceof _a5 ? t5 : new _a5(t5);
    return r4.toString() === n2.toString();
  }
  constructor(e) {
    this.verifyInput(e), this.getInitializer(e).call(this, e);
  }
  get concept() {
    return this._concept || c.concept;
  }
  get scope() {
    return this._scope || c.root.name;
  }
  get entity() {
    return this._entity;
  }
  get id() {
    return this._id;
  }
  get version() {
    return this._version;
  }
  get shard() {
    return this._shard;
  }
  get hash() {
    return z.hashString(this.toString());
  }
  getInitializer(e) {
    switch (true) {
      case C.isString(e):
        return this.fromString;
      case C.isObject(e):
        return this.fromObject;
      default:
        throw new Error("Invalid parameters provided to ASEID constructor");
    }
  }
  fromString(e) {
    let [t5, r4, n2] = e.split("@"), [o3, i4, _4] = r4.split(":"), p3 = _4.includes(".") ? _4.split(".")[0] : void 0, d4 = _4.includes(".") ? _4.split(".")[1] : _4;
    this._concept = t5 || c.root.name, this._scope = o3 || c.root.name, this._entity = i4, this._id = d4, this._version = n2, this._shard = p3;
  }
  fromObject(e) {
    this._concept = e.concept ? _a5.isASEID(e.concept) ? new _a5(e.concept).id : e.concept : c.concept, this._scope = e.scope ? C.isNumber(e.scope) ? z.formatWithLeadingZeros(e.scope) : _a5.isASEID(e.scope) ? new _a5(e.scope).id : e.scope : c.root.name, this._entity = e.entity, this._id = C.isNumber(e.id) ? z.formatWithLeadingZeros(e.id) : e.id, this._version = e.version, this._shard = e.shard;
  }
  toString() {
    return `${this.concept}@${this.scope}:${this.entity}:${this.shard ? this.shard + "." + this.id : this.id}${this.version ? "@" + this.version : ""}`;
  }
  toJSON() {
    return { concept: this._concept, scope: this._scope, entity: this._entity, id: this._id, version: this._version, shard: this._shard };
  }
  verifyInput(e) {
    switch (true) {
      case (C.isString(e) && !_a5.isASEID(e)):
        throw new Error("Invalid ASEID format provided");
      case (C.isObject(e) && !e.id):
        throw new Error("ASEID id is required");
      case (C.isObject(e) && !e.entity):
        throw new Error("ASEID entity is required");
    }
  }
}, __name(_a5, "O"), _a5);
O.regexp = new RegExp("^[a-z|A-Z|0-9|-]+@[a-z|A-Z|0-9|-]+:[a-z|A-Z|0-9|-]+:[a-z|A-Z|0-9|\\.|-]+(@v[0-9|\\.]+|@lts)?$");
var I = O;
var re = { UNEXPECTED_ERROR: "A-Error Unexpected Error", VALIDATION_ERROR: "A-Error Validation Error" };
var Ye = "If you see this error please let us know.";
var _a6;
var ce = (_a6 = class {
  static get A_CONCEPT_NAME() {
    return "a-concept";
  }
  static get A_CONCEPT_ROOT_SCOPE() {
    return "root";
  }
  static get A_CONCEPT_ENVIRONMENT() {
    return "development";
  }
  static get A_CONCEPT_RUNTIME_ENVIRONMENT() {
    return "unknown";
  }
  static get A_CONCEPT_ROOT_FOLDER() {
    return "/app";
  }
  static get A_ERROR_DEFAULT_DESCRIPTION() {
    return "If you see this error please let us know.";
  }
  static get(e) {
    return this[e];
  }
  static set(e, t5) {
    this[e] = t5;
  }
  static getAll() {
    return {};
  }
  static getAllKeys() {
    return [];
  }
}, __name(_a6, "ce"), _a6);
var ne = { A_CONCEPT_NAME: "A_CONCEPT_NAME", A_CONCEPT_ROOT_SCOPE: "A_CONCEPT_ROOT_SCOPE", A_CONCEPT_ENVIRONMENT: "A_CONCEPT_ENVIRONMENT", A_CONCEPT_RUNTIME_ENVIRONMENT: "A_CONCEPT_RUNTIME_ENVIRONMENT", A_CONCEPT_ROOT_FOLDER: "A_CONCEPT_ROOT_FOLDER", A_ERROR_DEFAULT_DESCRIPTION: "A_ERROR_DEFAULT_DESCRIPTION" };
var de = [ne.A_CONCEPT_NAME, ne.A_CONCEPT_ROOT_SCOPE, ne.A_CONCEPT_ENVIRONMENT, ne.A_CONCEPT_RUNTIME_ENVIRONMENT, ne.A_CONCEPT_ROOT_FOLDER, ne.A_ERROR_DEFAULT_DESCRIPTION];
var _a7;
var k = (_a7 = class extends ce {
  static get A_CONCEPT_ENVIRONMENT() {
    return window.__A_CONCEPT_ENVIRONMENT_ENV__?.A_CONCEPT_ENVIRONMENT || super.A_CONCEPT_ENVIRONMENT;
  }
  static get A_CONCEPT_RUNTIME_ENVIRONMENT() {
    return "browser";
  }
  static get A_CONCEPT_NAME() {
    return window.__A_CONCEPT_ENVIRONMENT_ENV__?.A_CONCEPT_NAME || super.A_CONCEPT_NAME;
  }
  static get A_CONCEPT_ROOT_FOLDER() {
    return window.__A_CONCEPT_ENVIRONMENT_ENV__?.A_CONCEPT_ROOT_FOLDER || super.A_CONCEPT_ROOT_FOLDER;
  }
  static get A_CONCEPT_ROOT_SCOPE() {
    return window.__A_CONCEPT_ENVIRONMENT_ENV__?.A_CONCEPT_ROOT_SCOPE || super.A_CONCEPT_ROOT_SCOPE;
  }
  static get A_ERROR_DEFAULT_DESCRIPTION() {
    return window.__A_CONCEPT_ENVIRONMENT_ENV__?.A_ERROR_DEFAULT_DESCRIPTION || super.A_ERROR_DEFAULT_DESCRIPTION;
  }
  static get(e) {
    return window.__A_CONCEPT_ENVIRONMENT_ENV__?.[e] || this[e];
  }
  static set(e, t5) {
    window.__A_CONCEPT_ENVIRONMENT_ENV__ || (window.__A_CONCEPT_ENVIRONMENT_ENV__ = {}), window.__A_CONCEPT_ENVIRONMENT_ENV__[e] = t5;
  }
  static getAll() {
    let e = {};
    return window.__A_CONCEPT_ENVIRONMENT_ENV__ && Object.keys(window.__A_CONCEPT_ENVIRONMENT_ENV__).forEach((t5) => {
      e[t5] = window.__A_CONCEPT_ENVIRONMENT_ENV__[t5];
    }), de.forEach((t5) => {
      e[t5] = this.get(t5);
    }), e;
  }
  static getAllKeys() {
    let e = /* @__PURE__ */ new Set();
    return window.__A_CONCEPT_ENVIRONMENT_ENV__ && Object.keys(window.__A_CONCEPT_ENVIRONMENT_ENV__).forEach((t5) => {
      e.add(t5);
    }), de.forEach((t5) => {
      e.add(t5);
    }), Array.from(e);
  }
}, __name(_a7, "k"), _a7);
var _a8;
var P = (_a8 = class extends Error {
  static get entity() {
    return y.toKebabCase(this.name);
  }
  static get concept() {
    return c.concept;
  }
  static get scope() {
    return c.root.name;
  }
  constructor(e, t5) {
    switch (true) {
      case e instanceof _a8:
        return e;
      case e instanceof Error:
        super(e.message);
        break;
      case C.isErrorSerializedType(e):
        super(e.message);
        break;
      case (C.isErrorConstructorType(e) && "description" in e):
        super(`[${e.title}]: ${e.description}`);
        break;
      case (C.isErrorConstructorType(e) && !("description" in e)):
        super(e.title);
        break;
      case (C.isString(e) && !t5):
        super(e);
        break;
      case (C.isString(e) && !!t5):
        super(`[${e}]: ${t5}`);
        break;
      default:
        super("An unknown error occurred.");
    }
    this.getInitializer(e, t5).call(this, e, t5);
  }
  get aseid() {
    return this._aseid;
  }
  get title() {
    return this._title;
  }
  get message() {
    return super.message;
  }
  get code() {
    return this._code || y.toKebabCase(this.title);
  }
  get type() {
    return this.constructor.entity;
  }
  get link() {
    return this._link ? this._link : new URL(`https://adaas.support/a-concept/errors/${this.aseid.toString()}`).toString();
  }
  get scope() {
    return this._aseid.scope;
  }
  get description() {
    return this._description || String(k.A_ERROR_DEFAULT_DESCRIPTION) || Ye;
  }
  get originalError() {
    return this._originalError;
  }
  getInitializer(e, t5) {
    switch (true) {
      case (C.isString(e) && !t5):
        return this.fromMessage;
      case (C.isString(e) && !!t5):
        return this.fromTitle;
      case e instanceof Error:
        return this.fromError;
      case C.isErrorSerializedType(e):
        return this.fromJSON;
      case C.isErrorConstructorType(e):
        return this.fromConstructor;
      default:
        throw new _a8(re.VALIDATION_ERROR, "Invalid parameters provided to A_Error constructor");
    }
  }
  fromError(e) {
    this._title = re.UNEXPECTED_ERROR, this._aseid = new I({ concept: this.constructor.concept, scope: this.constructor.scope, entity: this.constructor.entity, id: this.code }), this._originalError = e;
  }
  fromMessage(e) {
    this._title = re.UNEXPECTED_ERROR, this._aseid = new I({ concept: this.constructor.concept, scope: this._scope || this.constructor.scope, entity: this.constructor.entity, id: this.code }), this._link = void 0, this._originalError = void 0;
  }
  fromJSON(e) {
    this._aseid = new I(e.aseid), super.message = e.message, this._title = e.title, this._code = e.code, this._scope = e.scope, this._description = e.description, this._originalError = e.originalError ? new _a8(e.originalError) : void 0, this._link = e.link;
  }
  fromTitle(e, t5) {
    this.validateTitle(e), this._title = e, this._description = t5, this._aseid = new I({ concept: this.constructor.concept, scope: this._scope || this.constructor.scope, entity: this.constructor.entity, id: this.code }), this._link = void 0, this._originalError = void 0;
  }
  fromConstructor(e) {
    if (this.validateTitle(e.title), this._title = e.title, this._code = e.code, this._scope = e.scope ? C.isScopeInstance(e.scope) ? e.scope.name : e.scope : void 0, this._aseid = new I({ concept: this.constructor.concept, scope: this._scope || this.constructor.scope, entity: this.constructor.entity, id: this.code }), this._description = e.description, this._link = e.link, e.originalError instanceof _a8) {
      let t5 = e.originalError;
      for (; t5.originalError instanceof _a8; ) t5 = t5.originalError;
      this._originalError = t5.originalError || t5;
    } else this._originalError = e.originalError;
  }
  toJSON() {
    return { aseid: this.aseid.toString(), title: this.title, code: this.code, type: this.type, message: this.message, link: this.link, scope: this.scope, description: this.description, originalError: this.originalError?.message };
  }
  validateTitle(e) {
    if (e.length > 60) throw new _a8(re.VALIDATION_ERROR, "A-Error title exceeds 60 characters limit.");
    if (e.length === 0) throw new _a8(re.VALIDATION_ERROR, "A-Error title cannot be empty.");
  }
}, __name(_a8, "s"), _a8);
var _a9;
var X = (_a9 = class extends P {
}, __name(_a9, "X"), _a9);
X.ValidationError = "A-Entity Validation Error";
var we = ((n2) => (n2.EXTENSIONS = "a-component-extensions", n2.FEATURES = "a-component-features", n2.ABSTRACTIONS = "a-component-abstractions", n2.INJECTIONS = "a-component-injections", n2))(we || {});
var pe = { SAVE: "_A_Entity__Save", DESTROY: "_A_Entity__Destroy", LOAD: "_A_Entity__Load" };
var _a10;
var N = (_a10 = class {
  static get entity() {
    return y.toKebabCase(this.name);
  }
  static get concept() {
    return c.concept;
  }
  static get scope() {
    return c.root.name;
  }
  constructor(e) {
    this.getInitializer(e).call(this, e);
  }
  get id() {
    return this.aseid.id;
  }
  isStringASEID(e) {
    return typeof e == "string" && I.isASEID(e);
  }
  isASEIDInstance(e) {
    return e instanceof I;
  }
  isSerializedObject(e) {
    return !!e && typeof e == "object" && "aseid" in e;
  }
  isConstructorProps(e) {
    return !!e && typeof e == "object" && !("aseid" in e);
  }
  getInitializer(e) {
    if (!e) return this.fromUndefined;
    if (this.isStringASEID(e)) return this.fromASEID;
    if (this.isASEIDInstance(e)) return this.fromASEID;
    if (this.isSerializedObject(e)) return this.fromJSON;
    if (this.isConstructorProps(e)) return this.fromNew;
    throw new X(X.ValidationError, "Unable to determine A-Entity constructor initialization method. Please check the provided parameters.");
  }
  generateASEID(e) {
    return new I({ concept: e?.concept || this.constructor.concept, scope: e?.scope || this.constructor.scope, entity: e?.entity || this.constructor.entity, id: e?.id || z.generateTimeId() });
  }
  call(e, t5) {
    return new x({ name: e, component: this, scope: t5 }).process(t5);
  }
  load(e) {
    return this.call(pe.LOAD, e);
  }
  destroy(e) {
    return this.call(pe.DESTROY, e);
  }
  save(e) {
    return this.call(pe.SAVE, e);
  }
  fromASEID(e) {
    e instanceof I ? this.aseid = e : this.aseid = new I(e);
  }
  fromUndefined() {
    this.aseid = this.generateASEID();
  }
  fromNew(e) {
    this.aseid = this.generateASEID();
  }
  fromJSON(e) {
    this.aseid = new I(e.aseid);
  }
  toJSON() {
    return { aseid: this.aseid.toString() };
  }
  toString() {
    return this.aseid ? this.aseid.toString() : this.constructor.name;
  }
}, __name(_a10, "N"), _a10);
function le(s3) {
  return function(e) {
    return c.setMeta(e, new s3()), e;
  };
}
__name(le, "le");
var _a11;
var m = (_a11 = class {
  constructor() {
    this.meta = /* @__PURE__ */ new Map();
  }
  static Define(e) {
    return le(e);
  }
  [Symbol.iterator]() {
    let e = this.meta.entries();
    return { next: /* @__PURE__ */ __name(() => e.next(), "next") };
  }
  from(e) {
    return this.meta = new Map(e.meta), this;
  }
  clone() {
    let e = this.constructor, t5 = new e();
    return t5.meta = new Map(this.meta), t5;
  }
  set(e, t5) {
    let r4 = this.meta.get(e) || Array.isArray(t5) ? [] : t5 instanceof Map ? /* @__PURE__ */ new Map() : {};
    this.meta.get(e) || Array.isArray(t5) ? [...r4] : t5 instanceof Map ? new Map(r4) : { ...r4 };
    this.meta.set(e, t5);
  }
  get(e) {
    return this.meta.get(e);
  }
  delete(e) {
    return this.meta.delete(e);
  }
  size() {
    return this.meta.size;
  }
  convertToRegExp(e) {
    if (e instanceof RegExp) return e;
    this._regExpCache || (this._regExpCache = /* @__PURE__ */ new Map());
    let t5 = this._regExpCache.get(e);
    return t5 || (t5 = new RegExp(e), this._regExpCache.set(e, t5)), t5;
  }
  find(e) {
    let t5 = [];
    for (let [r4, n2] of this.meta.entries()) this.convertToRegExp(String(r4)).test(e) && t5.push([r4, n2]);
    return t5;
  }
  findByRegex(e) {
    let t5 = [];
    for (let [r4, n2] of this.meta.entries()) e.test(String(r4)) && t5.push([r4, n2]);
    return t5;
  }
  has(e) {
    return this.meta.has(e);
  }
  entries() {
    return this.meta.entries();
  }
  clear() {
    this.meta.clear();
  }
  toArray() {
    return Array.from(this.meta.entries());
  }
  recursiveToJSON(e) {
    switch (true) {
      case e instanceof _a11:
        return e.toJSON();
      case e instanceof Map:
        let t5 = {};
        for (let [n2, o3] of e.entries()) t5[String(n2)] = this.recursiveToJSON(o3);
        return t5;
      case Array.isArray(e):
        return e.map((n2) => this.recursiveToJSON(n2));
      case (!!e && typeof e == "object"):
        let r4 = {};
        for (let [n2, o3] of Object.entries(e)) r4[n2] = this.recursiveToJSON(o3);
        return r4;
      default:
        return e;
    }
  }
  toJSON() {
    let e = {};
    for (let [t5, r4] of this.meta.entries()) e[String(t5)] = this.recursiveToJSON(r4);
    return e;
  }
}, __name(_a11, "s"), _a11);
var _a12;
var q = (_a12 = class extends m {
  features() {
    return this.get("a-component-features")?.toArray().map(([, t5]) => t5) || [];
  }
  injections(e) {
    return this.get("a-component-injections")?.get(e) || [];
  }
}, __name(_a12, "q"), _a12);
var _a13;
var $ = (_a13 = class {
  get name() {
    return this.config?.name || this.constructor.name;
  }
  get scope() {
    return c.scope(this);
  }
  constructor(e = {}) {
    this.config = e, c.allocate(this, this.config);
  }
  async call(e, t5) {
    return await new x({ name: e, component: this }).process(t5);
  }
}, __name(_a13, "$"), _a13);
var xe = ((n2) => (n2.FEATURES = "a-container-features", n2.INJECTIONS = "a-container-injections", n2.ABSTRACTIONS = "a-container-abstractions", n2.EXTENSIONS = "a-container-extensions", n2))(xe || {});
var _a14;
var B = (_a14 = class extends m {
  injections(e) {
    return this.get("a-container-injections")?.get(e) || [];
  }
  features() {
    return this.get("a-container-features")?.toArray().map(([, t5]) => t5) || [];
  }
  abstractions(e) {
    let t5 = [], r4 = this.get("a-container-abstractions"), n2 = this.get("a-container-injections");
    return r4?.find(`CONCEPT_ABSTRACTION::${e}`).forEach(([o3, i4]) => {
      i4.forEach((_4) => {
        let p3 = n2?.get(_4.handler) || [];
        t5.push({ ..._4, args: p3 });
      });
    }), t5;
  }
  extensions(e) {
    let t5 = [];
    return this.get("a-container-extensions")?.find(e).forEach(([n2, o3]) => {
      o3.forEach((i4) => {
        t5.push({ name: i4.name, handler: i4.handler, behavior: i4.behavior, before: i4.before || "", after: i4.after || "", throwOnError: i4.throwOnError || true, override: "" });
      });
    }), t5;
  }
}, __name(_a14, "B"), _a14);
var _a15;
var E = (_a15 = class extends P {
  fromConstructor(e) {
    super.fromConstructor(e), this.stage = e.stage;
  }
}, __name(_a15, "E"), _a15);
E.Interruption = "Feature Interrupted", E.FeatureInitializationError = "Unable to initialize A-Feature", E.FeatureProcessingError = "Error occurred during A-Feature processing", E.FeatureDefinitionError = "Unable to define A-Feature", E.FeatureExtensionError = "Unable to extend A-Feature";
var Fe = /* @__PURE__ */ new WeakMap();
var _a16;
var l = (_a16 = class {
  static resolve() {
    return new Promise((e) => e());
  }
  static isInheritedFrom(e, t5) {
    let r4 = e;
    for (; r4; ) {
      if (r4 === t5) return true;
      r4 = Object.getPrototypeOf(r4);
    }
    return false;
  }
  static getParentClasses(e) {
    let t5 = Object.getPrototypeOf(typeof e == "function" ? e : e.constructor), r4 = [];
    for (; t5 && t5 !== Function.prototype; ) r4.push(t5), t5 = Object.getPrototypeOf(t5);
    return r4;
  }
  static getClassInheritanceChain(e) {
    let t5 = Object.getPrototypeOf(typeof e == "function" ? e : e.constructor), r4 = typeof e == "function" ? [e] : [e.constructor];
    for (; t5 && t5 !== Function.prototype; ) r4.push(t5), t5 = Object.getPrototypeOf(t5);
    return r4;
  }
  static getParentClass(e) {
    return Object.getPrototypeOf(e);
  }
  static omitProperties(e, t5) {
    let r4 = JSON.parse(JSON.stringify(e));
    function n2(o3, i4) {
      let _4 = i4[0];
      i4.length === 1 ? delete o3[_4] : o3[_4] !== void 0 && typeof o3[_4] == "object" && n2(o3[_4], i4.slice(1));
    }
    __name(n2, "n");
    return t5.forEach((o3) => {
      let i4 = o3.split(".");
      n2(r4, i4);
    }), r4;
  }
  static isObject(e) {
    return e !== null && typeof e == "object" && !Array.isArray(e);
  }
  static deepMerge(e, t5, r4 = /* @__PURE__ */ new Map()) {
    if (this.isObject(e) && this.isObject(t5)) for (let n2 in t5) this.isObject(t5[n2]) ? (e[n2] || (e[n2] = {}), r4.has(t5[n2]) ? e[n2] = r4.get(t5[n2]) : (r4.set(t5[n2], {}), this.deepMerge(e[n2], t5[n2], r4))) : e[n2] = t5[n2];
    return e;
  }
  static deepClone(e) {
    if (e == null || typeof e != "object") return e;
    if (e instanceof Date) return new Date(e.getTime());
    if (Array.isArray(e)) return e.map((t5) => this.deepClone(t5));
    if (typeof e == "function") return e;
    if (e instanceof Object) {
      let t5 = {};
      for (let r4 in e) e.hasOwnProperty(r4) && (t5[r4] = this.deepClone(e[r4]));
      return t5;
    }
    throw new Error("Unable to clone the object. Unsupported type.");
  }
  static deepCloneAndMerge(e, t5) {
    if (t5 == null && e == null) return e;
    if (e == null && t5) return this.deepClone(t5);
    if (typeof e != "object") return e;
    if (e instanceof Date) return new Date(e.getTime());
    if (Array.isArray(e)) return e.map((r4) => this.deepCloneAndMerge(r4, t5));
    if (typeof e == "function") return e;
    if (e instanceof Object) {
      let r4 = {};
      for (let n2 in e) t5[n2] !== null && t5[n2] !== void 0 ? r4[n2] = this.deepCloneAndMerge(e[n2], t5[n2]) : r4[n2] = this.deepClone(e[n2]);
      for (let n2 in t5) e[n2] !== void 0 && e[n2] !== null ? r4[n2] = this.deepCloneAndMerge(e[n2], t5[n2]) : r4[n2] = this.deepClone(t5[n2]);
      return r4;
    }
    throw new Error("Unable to clone the object. Unsupported type.");
  }
  static getComponentName(e) {
    if (e != null && !Array.isArray(e) && (typeof e == "object" || typeof e == "function")) {
      let t5 = Fe.get(e);
      if (t5 !== void 0) return t5;
      let r4 = _a16._computeComponentName(e);
      return Fe.set(e, r4), r4;
    }
    return _a16._computeComponentName(e);
  }
  static _computeComponentName(e) {
    let t5 = "Unknown", r4 = "Anonymous";
    if (e == null) return t5;
    if (typeof e == "string") return e || t5;
    if (typeof e == "symbol") try {
      return e.toString();
    } catch {
      return t5;
    }
    if (Array.isArray(e)) return e.length === 0 ? t5 : this.getComponentName(e[0]);
    if (typeof e == "function") {
      let n2 = e;
      if (n2.displayName) return String(n2.displayName);
      if (n2.name) return String(n2.name);
      if (n2.constructor && n2.constructor.name) return String(n2.constructor.name);
      try {
        let i4 = Function.prototype.toString.call(e).match(/^(?:class\s+([A-Za-z0-9_$]+)|function\s+([A-Za-z0-9_$]+)|([A-Za-z0-9_$]+)\s*=>)/);
        if (i4) return i4[1] || i4[2] || i4[3] || r4;
      } catch {
      }
      return r4;
    }
    if (typeof e == "object") {
      let n2 = e;
      if (n2.type) return this.getComponentName(n2.type);
      if (n2.displayName) return String(n2.displayName);
      if (n2.name) return String(n2.name);
      if (n2.constructor && n2.constructor.name && n2.constructor.name !== "Object") return String(n2.constructor.name);
      try {
        let o3 = n2.toString();
        if (typeof o3 == "string" && o3 !== "[object Object]") return o3;
      } catch {
      }
      return r4;
    }
    try {
      return String(e);
    } catch {
      return t5;
    }
  }
}, __name(_a16, "s"), _a16);
var _a17;
var Q = (_a17 = class extends Error {
}, __name(_a17, "Q"), _a17);
Q.CallerInitializationError = "Unable to initialize A-Caller";
var _a18;
var H = (_a18 = class {
  constructor(e) {
    this.validateParams(e), this._component = e;
  }
  get component() {
    return this._component;
  }
  validateParams(e) {
    if (!a.isAllowedForFeatureCall(e)) throw new Q(`[${Q.CallerInitializationError}]: Invalid A-Caller component provided of type: ${typeof e} with value: ${JSON.stringify(e).slice(0, 100)}...`);
  }
}, __name(_a18, "H"), _a18);
var _a19;
var S = (_a19 = class extends P {
}, __name(_a19, "S"), _a19);
S.InvalidDependencyTarget = "Invalid Dependency Target", S.InvalidLoadTarget = "Invalid Load Target", S.InvalidLoadPath = "Invalid Load Path", S.InvalidDefaultTarget = "Invalid Default Target", S.ResolutionParametersError = "Dependency Resolution Parameters Error";
function Ae(...s3) {
  return function(e, t5, r4) {
    let n2 = l.getComponentName(e);
    if (!a.isTargetAvailableForInjection(e)) throw new S(S.InvalidDefaultTarget, `A-Default cannot be used on the target of type ${typeof e} (${n2})`);
    let o3 = t5 ? String(t5) : "constructor", i4;
    switch (true) {
      case (a.isComponentConstructor(e) || a.isComponentInstance(e)):
        i4 = "a-component-injections";
        break;
      case a.isContainerInstance(e):
        i4 = "a-container-injections";
        break;
      case a.isEntityInstance(e):
        i4 = "a-component-injections";
        break;
    }
    let _4 = c.meta(e).get(i4), p3 = _4 ? _4.clone() : new m(), d4 = p3.get(o3) ? [...p3.get(o3)] : [];
    d4[r4].resolutionStrategy = { create: true, args: s3 }, p3.set(o3, d4), c.meta(e).set(i4, p3);
  };
}
__name(Ae, "Ae");
function me() {
  return function(s3, e, t5) {
    let r4 = l.getComponentName(s3);
    if (!a.isTargetAvailableForInjection(s3)) throw new S(S.InvalidDependencyTarget, `A-Dependency cannot be used on the target of type ${typeof s3} (${r4})`);
    let n2 = e ? String(e) : "constructor", o3;
    switch (true) {
      case (a.isComponentConstructor(s3) || a.isComponentInstance(s3)):
        o3 = "a-component-injections";
        break;
      case a.isContainerInstance(s3):
        o3 = "a-container-injections";
        break;
      case a.isEntityInstance(s3):
        o3 = "a-component-injections";
        break;
    }
    let i4 = c.meta(s3).get(o3), _4 = i4 ? i4.clone() : new m(), p3 = _4.get(n2) ? [..._4.get(n2)] : [];
    p3[t5].resolutionStrategy = { flat: true }, _4.set(n2, p3), c.meta(s3).set(o3, _4);
  };
}
__name(me, "me");
function Ee() {
  return function(s3, e, t5) {
    let r4 = l.getComponentName(s3);
    if (!a.isTargetAvailableForInjection(s3)) throw new S(S.InvalidLoadTarget, `A-Load cannot be used on the target of type ${typeof s3} (${r4})`);
    let n2 = e ? String(e) : "constructor", o3;
    switch (true) {
      case (a.isComponentConstructor(s3) || a.isComponentInstance(s3)):
        o3 = "a-component-injections";
        break;
      case a.isContainerInstance(s3):
        o3 = "a-container-injections";
        break;
      case a.isEntityInstance(s3):
        o3 = "a-component-injections";
        break;
    }
    let i4 = c.meta(s3).get(o3), _4 = i4 ? i4.clone() : new m(), p3 = _4.get(n2) ? [..._4.get(n2)] : [];
    p3[t5].resolutionStrategy = { load: true }, _4.set(n2, p3), c.meta(s3).set(o3, _4);
  };
}
__name(Ee, "Ee");
function fe(s3 = -1) {
  return function(e, t5, r4) {
    let n2 = l.getComponentName(e);
    if (!a.isTargetAvailableForInjection(e)) throw new S(S.InvalidDependencyTarget, `A-Dependency cannot be used on the target of type ${typeof e} (${n2})`);
    let o3 = t5 ? String(t5) : "constructor", i4;
    switch (true) {
      case (a.isComponentConstructor(e) || a.isComponentInstance(e)):
        i4 = "a-component-injections";
        break;
      case a.isContainerInstance(e):
        i4 = "a-container-injections";
        break;
      case a.isEntityInstance(e):
        i4 = "a-component-injections";
        break;
    }
    let _4 = c.meta(e).get(i4), p3 = _4 ? _4.clone() : new m(), d4 = p3.get(o3) ? [...p3.get(o3)] : [];
    d4[r4].resolutionStrategy = { parent: s3 }, p3.set(o3, d4), c.meta(e).set(i4, p3);
  };
}
__name(fe, "fe");
function Te() {
  return function(s3, e, t5) {
    let r4 = l.getComponentName(s3);
    if (!a.isTargetAvailableForInjection(s3)) throw new S(S.InvalidDependencyTarget, `A-Dependency cannot be used on the target of type ${typeof s3} (${r4})`);
    let n2 = e ? String(e) : "constructor", o3;
    switch (true) {
      case (a.isComponentConstructor(s3) || a.isComponentInstance(s3)):
        o3 = "a-component-injections";
        break;
      case a.isContainerInstance(s3):
        o3 = "a-container-injections";
        break;
      case a.isEntityInstance(s3):
        o3 = "a-component-injections";
        break;
    }
    let i4 = c.meta(s3).get(o3), _4 = i4 ? i4.clone() : new m(), p3 = _4.get(n2) ? [..._4.get(n2)] : [];
    p3[t5].resolutionStrategy = { require: true }, _4.set(n2, p3), c.meta(s3).set(o3, _4);
  };
}
__name(Te, "Te");
function Se() {
  return function(s3, e, t5) {
    let r4 = l.getComponentName(s3);
    if (!a.isTargetAvailableForInjection(s3)) throw new S(S.InvalidDependencyTarget, `A-All cannot be used on the target of type ${typeof s3} (${r4})`);
    let n2 = e ? String(e) : "constructor", o3;
    switch (true) {
      case (a.isComponentConstructor(s3) || a.isComponentInstance(s3)):
        o3 = "a-component-injections";
        break;
      case a.isContainerInstance(s3):
        o3 = "a-container-injections";
        break;
      case a.isEntityInstance(s3):
        o3 = "a-component-injections";
        break;
    }
    let i4 = c.meta(s3).get(o3), _4 = i4 ? i4.clone() : new m(), p3 = _4.get(n2) ? [..._4.get(n2)] : [];
    p3[t5].resolutionStrategy = { pagination: { ...p3[t5].resolutionStrategy.pagination, count: -1 } }, _4.set(n2, p3), c.meta(s3).set(o3, _4);
  };
}
__name(Se, "Se");
function he(s3, e) {
  return function(t5, r4, n2) {
    let o3 = l.getComponentName(t5);
    if (!a.isTargetAvailableForInjection(t5)) throw new S(S.InvalidDependencyTarget, `A-All cannot be used on the target of type ${typeof t5} (${o3})`);
    let i4 = r4 ? String(r4) : "constructor", _4;
    switch (true) {
      case (a.isComponentConstructor(t5) || a.isComponentInstance(t5)):
        _4 = "a-component-injections";
        break;
      case a.isContainerInstance(t5):
        _4 = "a-container-injections";
        break;
      case a.isEntityInstance(t5):
        _4 = "a-component-injections";
        break;
    }
    let p3 = c.meta(t5).get(_4), d4 = p3 ? p3.clone() : new m(), A4 = d4.get(i4) ? [...d4.get(i4)] : [];
    A4[n2].resolutionStrategy = { query: { ...A4[n2].resolutionStrategy.query, ...s3 }, pagination: { ...A4[n2].resolutionStrategy.pagination, ...e } }, d4.set(i4, A4), c.meta(t5).set(_4, d4);
  };
}
__name(he, "he");
var _a20;
var v = (_a20 = class {
  constructor(e, t5) {
    this._defaultPagination = { count: 1, from: "start" };
    this._defaultResolutionStrategy = { require: false, load: false, parent: 0, flat: false, create: false, args: [], query: {}, pagination: this._defaultPagination };
    this._name = typeof e == "string" ? e : l.getComponentName(e), this._target = typeof e == "string" ? void 0 : e, this.resolutionStrategy = t5 || {}, this.initCheck();
  }
  static get Required() {
    return Te;
  }
  static get Loaded() {
    return Ee;
  }
  static get Default() {
    return Ae;
  }
  static get Parent() {
    return fe;
  }
  static get Flat() {
    return me;
  }
  static get All() {
    return Se;
  }
  static get Query() {
    return he;
  }
  get flat() {
    return this._resolutionStrategy.flat;
  }
  get require() {
    return this._resolutionStrategy.require;
  }
  get load() {
    return this._resolutionStrategy.load;
  }
  get all() {
    return this._resolutionStrategy.pagination.count !== 1 || Object.keys(this._resolutionStrategy.query).length > 0;
  }
  get parent() {
    return this._resolutionStrategy.parent;
  }
  get create() {
    return this._resolutionStrategy.create;
  }
  get args() {
    return this._resolutionStrategy.args;
  }
  get query() {
    return this._resolutionStrategy.query;
  }
  get pagination() {
    return this._resolutionStrategy.pagination;
  }
  get name() {
    return this._name;
  }
  get target() {
    return this._target;
  }
  get resolutionStrategy() {
    return this._resolutionStrategy;
  }
  set resolutionStrategy(e) {
    this._resolutionStrategy = { ...this._defaultResolutionStrategy, ...this._resolutionStrategy, ...e, pagination: { ...this._defaultPagination, ...(this._resolutionStrategy || {}).pagination, ...e.pagination || {} } };
  }
  initCheck() {
    if (!this._resolutionStrategy) throw new S(S.ResolutionParametersError, `Resolution strategy parameters are not provided for dependency: ${this._name}`);
    return this;
  }
  toJSON() {
    return { name: this._name, all: this.all, require: this.require, load: this.load, parent: this.parent, flat: this.flat, create: this.create, args: this.args, query: this.query, pagination: this.pagination };
  }
}, __name(_a20, "v"), _a20);
var _a21;
var a = (_a21 = class {
  static isString(e) {
    return typeof e == "string" || e instanceof String;
  }
  static isNumber(e) {
    return typeof e == "number" && isFinite(e);
  }
  static isBoolean(e) {
    return typeof e == "boolean";
  }
  static isArray(e) {
    return Array.isArray(e);
  }
  static isObject(e) {
    return e && typeof e == "object" && !Array.isArray(e);
  }
  static isFunction(e) {
    return typeof e == "function";
  }
  static isUndefined(e) {
    return typeof e > "u";
  }
  static isRegExp(e) {
    return e instanceof RegExp;
  }
  static isContainerConstructor(e) {
    return typeof e == "function" && l.isInheritedFrom(e, $);
  }
  static isComponentConstructor(e) {
    return typeof e == "function" && l.isInheritedFrom(e, F);
  }
  static isFragmentConstructor(e) {
    return typeof e == "function" && l.isInheritedFrom(e, V);
  }
  static isEntityConstructor(e) {
    return typeof e == "function" && l.isInheritedFrom(e, N);
  }
  static isScopeConstructor(e) {
    return typeof e == "function" && l.isInheritedFrom(e, D);
  }
  static isErrorConstructor(e) {
    return typeof e == "function" && l.isInheritedFrom(e, Error);
  }
  static isFeatureConstructor(e) {
    return typeof e == "function" && l.isInheritedFrom(e, x);
  }
  static isCallerConstructor(e) {
    return typeof e == "function" && l.isInheritedFrom(e, H);
  }
  static isDependencyConstructor(e) {
    return typeof e == "function" && l.isInheritedFrom(e, v);
  }
  static isDependencyInstance(e) {
    return e instanceof v;
  }
  static isContainerInstance(e) {
    return e instanceof $;
  }
  static isComponentInstance(e) {
    return e instanceof F;
  }
  static isFeatureInstance(e) {
    return e instanceof x;
  }
  static isFragmentInstance(e) {
    return e instanceof V;
  }
  static isEntityInstance(e) {
    return e instanceof N;
  }
  static isScopeInstance(e) {
    return e instanceof D;
  }
  static isErrorInstance(e) {
    return e instanceof Error;
  }
  static isComponentMetaInstance(e) {
    return e instanceof j;
  }
  static isContainerMetaInstance(e) {
    return e instanceof B;
  }
  static isEntityMetaInstance(e) {
    return e instanceof q;
  }
  static hasASEID(e) {
    return e && typeof e == "object" && "aseid" in e && (_a21.isEntityInstance(e) || _a21.isErrorInstance(e));
  }
  static isConstructorAllowedForScopeAllocation(e) {
    return _a21.isContainerConstructor(e) || _a21.isFeatureConstructor(e);
  }
  static isInstanceAllowedForScopeAllocation(e) {
    return _a21.isContainerInstance(e) || _a21.isFeatureInstance(e);
  }
  static isConstructorAvailableForAbstraction(e) {
    return _a21.isContainerInstance(e) || _a21.isComponentInstance(e);
  }
  static isTargetAvailableForInjection(e) {
    return _a21.isComponentConstructor(e) || _a21.isComponentInstance(e) || _a21.isContainerInstance(e) || _a21.isEntityInstance(e);
  }
  static isAllowedForFeatureCall(e) {
    return _a21.isContainerInstance(e) || _a21.isComponentInstance(e) || _a21.isEntityInstance(e);
  }
  static isAllowedForFeatureDefinition(e) {
    return _a21.isContainerInstance(e) || _a21.isComponentInstance(e) || _a21.isEntityInstance(e);
  }
  static isAllowedForFeatureExtension(e) {
    return _a21.isComponentInstance(e) || _a21.isContainerInstance(e) || _a21.isEntityInstance(e);
  }
  static isAllowedForAbstractionDefinition(e) {
    return _a21.isContainerInstance(e) || _a21.isComponentInstance(e);
  }
  static isAllowedForDependencyDefaultCreation(e) {
    return _a21.isFragmentConstructor(e) || l.isInheritedFrom(e, V) || _a21.isEntityConstructor(e) || l.isInheritedFrom(e, N);
  }
  static isErrorConstructorType(e) {
    return !!e && _a21.isObject(e) && !(e instanceof Error) && "title" in e;
  }
  static isErrorSerializedType(e) {
    return !!e && _a21.isObject(e) && !(e instanceof Error) && "aseid" in e && I.isASEID(e.aseid);
  }
  static isPromiseInstance(e) {
    return e instanceof Promise;
  }
}, __name(_a21, "s"), _a21);
function ge(s3 = {}) {
  return function(e, t5, r4) {
    let n2 = l.getComponentName(e);
    if (!a.isAllowedForFeatureDefinition(e)) throw new E(E.FeatureDefinitionError, `A-Feature cannot be defined on the ${n2} level`);
    let o3 = c.meta(e.constructor), i4;
    switch (true) {
      case a.isEntityInstance(e):
        i4 = "a-component-features";
        break;
      case a.isContainerInstance(e):
        i4 = "a-container-features";
        break;
      case a.isComponentInstance(e):
        i4 = "a-component-features";
        break;
    }
    let _4 = o3.get(i4) || new m(), p3 = s3.name || t5, d4 = s3.invoke || false;
    _4.set(t5, { name: `${e.constructor.name}.${p3}`, handler: t5, invoke: d4, template: s3.template && s3.template.length ? s3.template.map((h4) => ({ ...h4, before: h4.before || "", after: h4.after || "", behavior: h4.behavior || "sync", throwOnError: true, override: h4.override || "" })) : [] }), c.meta(e.constructor).set(i4, _4);
    let A4 = r4.value;
    return r4.value = function(...h4) {
      if (d4) A4.apply(this, h4);
      else return A4.apply(this, h4);
      if (typeof this.call == "function" && d4) return this.call(p3);
    }, r4;
  };
}
__name(ge, "ge");
function ye(s3) {
  return function(e, t5, r4) {
    let n2 = l.getComponentName(e);
    if (!a.isAllowedForFeatureExtension(e)) throw new E(E.FeatureExtensionError, `A-Feature-Extend cannot be applied on the ${n2} level`);
    let o3, i4 = "sync", _4 = "", p3 = "", d4 = "", A4 = [], h4 = [], Y2 = true, R3;
    switch (true) {
      case a.isEntityInstance(e):
        R3 = "a-component-extensions";
        break;
      case a.isContainerInstance(e):
        R3 = "a-container-extensions";
        break;
      case a.isComponentInstance(e):
        R3 = "a-component-extensions";
        break;
    }
    switch (true) {
      case a.isRegExp(s3):
        o3 = s3;
        break;
      case (!!s3 && typeof s3 == "object"):
        Array.isArray(s3.scope) ? A4 = s3.scope : s3.scope && typeof s3.scope == "object" && (Array.isArray(s3.scope.include) && (A4 = s3.scope.include), Array.isArray(s3.scope.exclude) && (h4 = s3.scope.exclude)), o3 = Me(s3, A4, h4, t5), i4 = s3.behavior || i4, Y2 = s3.throwOnError !== void 0 ? s3.throwOnError : Y2, _4 = a.isArray(s3.before) ? new RegExp(`^${s3.before.join("|").replace(/\./g, "\\.")}$`).source : s3.before instanceof RegExp ? s3.before.source : "", p3 = a.isArray(s3.after) ? new RegExp(`^${s3.after.join("|").replace(/\./g, "\\.")}$`).source : s3.after instanceof RegExp ? s3.after.source : "", d4 = a.isArray(s3.override) ? new RegExp(`^${s3.override.join("|").replace(/\./g, "\\.")}$`).source : s3.override instanceof RegExp ? s3.override.source : "";
        break;
      default:
        o3 = new RegExp(`^.*${t5.replace(/\./g, "\\.")}$`);
        break;
    }
    let W = c.meta(e).get(R3), ue = c.meta(e), T = ue.get(R3) ? new m().from(ue.get(R3)) : new m();
    if (W && W.size() && W.has(t5) && W.get(t5).invoke) throw new E(E.FeatureExtensionError, `A-Feature-Extend cannot be used on the method "${t5}" because it is already defined as a Feature with "invoke" set to true. Please remove the A-Feature-Extend decorator or set "invoke" to false in the A-Feature decorator.`);
    let g2 = [...T.get(o3.source) || []], se = s3 && typeof s3 == "object" && !a.isRegExp(s3) && s3.name || t5;
    for (let [M3, Z] of T.entries()) {
      let J = Z.findIndex((ae) => ae.handler === t5);
      if (M3 !== o3.source && J !== -1) {
        let _e2 = String(M3).match(/\\\.\s*([^\\.$]+)\$$/);
        (_e2 ? _e2[1] : null) === se && (Z.splice(J, 1), Z.length === 0 ? T.delete(M3) : T.set(M3, Z));
      }
    }
    let ie = g2.findIndex((M3) => M3.handler === t5), te = { name: o3.source, handler: t5, behavior: i4, before: _4, after: p3, throwOnError: Y2, override: d4 };
    ie !== -1 ? g2[ie] = te : g2.push(te), T.set(o3.source, g2), c.meta(e).set(R3, T);
  };
}
__name(ye, "ye");
function Me(s3, e, t5, r4) {
  let n2 = e.length ? `(${e.map((_4) => _4.name).join("|")})` : ".*", o3 = t5.length ? `(?!${t5.map((_4) => _4.name).join("|")})` : "", i4 = s3.scope ? `^${o3}${n2}\\.${s3.name || r4}$` : `.*\\.${s3.name || r4}$`;
  return new RegExp(i4);
}
__name(Me, "Me");
var Oe = ((i4) => (i4.PROCESSING = "PROCESSING", i4.COMPLETED = "COMPLETED", i4.FAILED = "FAILED", i4.SKIPPED = "SKIPPED", i4.INITIALIZED = "INITIALIZED", i4.ABORTED = "ABORTED", i4))(Oe || {});
var _a22;
var U = (_a22 = class extends P {
  static get CompileError() {
    return "Unable to compile A-Stage";
  }
}, __name(_a22, "U"), _a22);
U.ArgumentsResolutionError = "A-Stage Arguments Resolution Error";
var _a23;
var G = (_a23 = class {
  constructor(e, t5) {
    this._status = "INITIALIZED";
    this._feature = e, this._definition = t5;
  }
  get name() {
    return this.toString();
  }
  get definition() {
    return this._definition;
  }
  get status() {
    return this._status;
  }
  get feature() {
    return this._feature;
  }
  get isProcessed() {
    return this._status === "COMPLETED" || this._status === "FAILED" || this._status === "SKIPPED";
  }
  get error() {
    return this._error;
  }
  getStepArgs(e, t5) {
    let r4 = t5.dependency.target || e.resolveConstructor(t5.dependency.name);
    return c.meta(r4).injections(t5.handler).map((n2) => {
      switch (true) {
        case a.isCallerConstructor(n2.target):
          return this._feature.caller.component;
        case a.isFeatureConstructor(n2.target):
          return this._feature;
        default:
          return e.resolve(n2);
      }
    });
  }
  getStepComponent(e, t5) {
    let { dependency: r4, handler: n2 } = t5, o3 = e.resolve(r4) || this.feature.scope.resolve(r4);
    if (!o3) throw new U(U.CompileError, `Unable to resolve component ${r4.name} from scope ${e.name}`);
    if (!o3[n2]) throw new U(U.CompileError, `Handler ${n2} not found in ${o3.constructor.name}`);
    return o3;
  }
  callStepHandler(e, t5) {
    let r4 = this.getStepComponent(t5, e), n2 = this.getStepArgs(t5, e);
    return { handler: r4[e.handler].bind(r4), params: n2 };
  }
  skip() {
    this._status = "SKIPPED";
  }
  process(e) {
    let t5 = a.isScopeInstance(e) ? e : this._feature.scope;
    if (!this.isProcessed) {
      this._status = "PROCESSING";
      let { handler: r4, params: n2 } = this.callStepHandler(this._definition, t5), o3 = r4(...n2);
      if (a.isPromiseInstance(o3)) return new Promise(async (i4, _4) => {
        try {
          return await o3, this.completed(), i4();
        } catch (p3) {
          let d4 = new P(p3);
          return this.failed(d4), this._definition.throwOnError ? i4() : _4(d4);
        }
      });
      this.completed();
    }
  }
  completed() {
    this._status = "COMPLETED";
  }
  failed(e) {
    this._error = new P(e), this._status = "FAILED";
  }
  toJSON() {
    return { name: this.name, status: this.status };
  }
  toString() {
    return `A-Stage(${this._feature.name}::${this._definition.behavior}@${this._definition.handler})`;
  }
}, __name(_a23, "G"), _a23);
var _a24;
var ee = (_a24 = class extends P {
}, __name(_a24, "ee"), _a24);
ee.CircularDependencyError = "A-StepManager Circular Dependency Error";
var _a25;
var oe = (_a25 = class {
  constructor(e) {
    this._uniqueIdMap = /* @__PURE__ */ new Map();
    this._isBuilt = false;
    this.entities = this.prepareSteps(e), this.graph = /* @__PURE__ */ new Map(), this.visited = /* @__PURE__ */ new Set(), this.tempMark = /* @__PURE__ */ new Set(), this.sortedEntities = [], this.assignUniqueIds();
  }
  prepareSteps(e) {
    return e.map((t5) => ({ ...t5, behavior: t5.behavior || "sync", before: t5.before || "", after: t5.after || "", override: t5.override || "", throwOnError: false }));
  }
  baseID(e) {
    return `${e.dependency.name}.${e.handler}`;
  }
  ID(e) {
    return this._uniqueIdMap.get(e) || this.baseID(e);
  }
  assignUniqueIds() {
    let e = /* @__PURE__ */ new Map();
    for (let r4 of this.entities) {
      let n2 = this.baseID(r4);
      e.set(n2, (e.get(n2) || 0) + 1);
    }
    let t5 = /* @__PURE__ */ new Map();
    for (let r4 of this.entities) {
      let n2 = this.baseID(r4);
      if (e.get(n2) > 1) {
        let o3 = t5.get(n2) || 0;
        this._uniqueIdMap.set(r4, `${n2}#${o3}`), t5.set(n2, o3 + 1);
      } else this._uniqueIdMap.set(r4, n2);
    }
  }
  buildGraph() {
    this._isBuilt || (this._isBuilt = true, this.entities = this.entities.filter((e, t5, r4) => !r4.some((n2, o3) => {
      if (t5 === o3 || !n2.override) return false;
      let i4 = new RegExp(n2.override);
      return i4.test(this.baseID(e)) || i4.test(e.handler);
    })), this._uniqueIdMap.clear(), this.assignUniqueIds(), this.entities.forEach((e) => this.graph.set(this.ID(e), /* @__PURE__ */ new Set())), this.entities.forEach((e) => {
      let t5 = this.ID(e);
      e.before && this.matchEntities(t5, e.before).forEach((n2) => {
        this.graph.has(n2) || this.graph.set(n2, /* @__PURE__ */ new Set()), this.graph.get(n2).add(t5);
      }), e.after && this.matchEntities(t5, e.after).forEach((n2) => {
        this.graph.has(t5) || this.graph.set(t5, /* @__PURE__ */ new Set()), this.graph.get(t5).add(n2);
      });
    }));
  }
  matchEntities(e, t5) {
    let r4 = new RegExp(t5);
    return this.entities.filter((n2) => r4.test(this.baseID(n2)) && this.ID(n2) !== e).map((n2) => this.ID(n2));
  }
  visit(e) {
    this.tempMark.has(e) || this.visited.has(e) || (this.tempMark.add(e), (this.graph.get(e) || []).forEach((t5) => this.visit(t5)), this.tempMark.delete(e), this.visited.add(e), this.sortedEntities.push(e));
  }
  toSortedArray() {
    return this.buildGraph(), this.entities.forEach((e) => {
      this.visited.has(this.ID(e)) || this.visit(this.ID(e));
    }), this.sortedEntities;
  }
  toSortedSteps() {
    return this.toSortedArray().map((t5) => this.entities.find((r4) => this.ID(r4) === t5));
  }
  toStages(e) {
    return this.toSortedArray().map((r4) => {
      let n2 = this.entities.find((o3) => this.ID(o3) === r4);
      return new G(e, n2);
    });
  }
}, __name(_a25, "oe"), _a25);
var _a26;
var x = (_a26 = class {
  constructor(e) {
    this._stages = [];
    this._index = 0;
    this._state = "INITIALIZED";
    this._scopeAllocated = false;
    this.validateParams(e), this.getInitializer(e).call(this, e);
  }
  static get Define() {
    return ge;
  }
  static get Extend() {
    return ye;
  }
  get name() {
    return this._name;
  }
  get error() {
    return this._error;
  }
  get state() {
    return this._state;
  }
  get index() {
    return this._index;
  }
  get stage() {
    return this._current;
  }
  get caller() {
    return this._caller;
  }
  get scope() {
    return this._scopeAllocated || (this._scopeAllocated = true, c.allocate(this).inherit(this._effectiveScope)), c.scope(this);
  }
  get size() {
    return this._stages.length;
  }
  get isDone() {
    return !this.stage || this._index >= this._stages.length;
  }
  get isProcessed() {
    return this.state === "COMPLETED" || this.state === "FAILED" || this.state === "INTERRUPTED";
  }
  [Symbol.iterator]() {
    return { next: /* @__PURE__ */ __name(() => this.isDone ? (this._current = void 0, { value: void 0, done: true }) : (this._current = this._stages[this._index], this._index++, { value: this._current, done: false }), "next") };
  }
  validateParams(e) {
    if (!e || typeof e != "object") throw new E(E.FeatureInitializationError, `Invalid A-Feature initialization parameters of type: ${typeof e} with value: ${JSON.stringify(e)?.slice(0, 100)}...`);
  }
  getInitializer(e) {
    switch (true) {
      case !("template" in e):
        return this.fromComponent;
      case "template" in e:
        return this.fromTemplate;
      default:
        throw new E(E.FeatureInitializationError, `Invalid A-Feature initialization parameters of type: ${typeof e} with value: ${JSON.stringify(e)?.slice(0, 100)}...`);
    }
  }
  fromTemplate(e) {
    if (!e.template || !Array.isArray(e.template)) throw new E(E.FeatureInitializationError, `Invalid A-Feature template provided of type: ${typeof e.template} with value: ${JSON.stringify(e.template)?.slice(0, 100)}...`);
    if (!e.component && (!e.scope || !(e.scope instanceof D))) throw new E(E.FeatureInitializationError, `Invalid A-Feature scope provided of type: ${typeof e.scope} with value: ${JSON.stringify(e.scope)?.slice(0, 100)}...`);
    this._name = e.name;
    let t5, r4 = e.scope;
    try {
      e.component && (t5 = c.scope(e.component));
    } catch (o3) {
      if (!r4) throw o3;
    }
    t5 && r4 && !r4.isInheritedFrom(t5) && r4.inherit(t5), this._caller = new H(e.component || new F()), this._effectiveScope = t5 || r4;
    let n2 = c.getSortedStepsFor(e.template);
    n2 || (this._SM = new oe(e.template), n2 = this._SM.toSortedSteps(), c.setSortedStepsFor(e.template, n2)), this._stages = n2.map((o3) => new G(this, o3)), this._current = this._stages[0];
  }
  fromComponent(e) {
    if (!e.component || !a.isAllowedForFeatureDefinition(e.component)) throw new E(E.FeatureInitializationError, `Invalid A-Feature component provided of type: ${typeof e.component} with value: ${JSON.stringify(e.component)?.slice(0, 100)}...`);
    this._name = e.name;
    let t5, r4 = e.scope;
    try {
      t5 = c.scope(e.component);
    } catch (_4) {
      if (!r4) throw _4;
    }
    t5 && r4 && !r4.isInheritedFrom(t5) && r4.inherit(t5), this._caller = new H(e.component);
    let n2 = t5 || r4, o3 = c.featureTemplate(this._name, this._caller.component, n2), i4 = c.getSortedStepsFor(o3);
    i4 || (this._SM = new oe(o3), i4 = this._SM.toSortedSteps(), c.setSortedStepsFor(o3, i4)), this._effectiveScope = n2, this._stages = i4.map((_4) => new G(this, _4)), this._current = this._stages[0];
  }
  process(e) {
    try {
      if (this.isProcessed) return;
      this._state = "PROCESSING";
      for (let t5 of this) {
        if (this.state === "INTERRUPTED") return;
        let r4;
        try {
          r4 = t5.process(e);
        } catch (n2) {
          throw this.createStageError(n2, t5);
        }
        if (a.isPromiseInstance(r4)) return r4.then(() => {
          if (this.state !== "INTERRUPTED") return this.processRemainingStagesAsync(e);
        }).catch((n2) => {
          throw this.createStageError(n2, t5);
        });
      }
      this.state !== "INTERRUPTED" && this.completed();
    } catch (t5) {
      throw this.failed(new E({ title: E.FeatureProcessingError, description: `An error occurred while processing the A-Feature: ${this.name}. Failed at stage: ${this.stage?.name || "N/A"}.`, stage: this.stage, originalError: t5 }));
    }
  }
  async processRemainingStagesAsync(e) {
    for (let t5 of this) {
      if (this.state === "INTERRUPTED") return;
      try {
        let r4 = t5.process(e);
        a.isPromiseInstance(r4) && await r4;
      } catch (r4) {
        throw this.createStageError(r4, t5);
      }
    }
    this.state !== "INTERRUPTED" && this.completed();
  }
  createStageError(e, t5) {
    return this.failed(new E({ title: E.FeatureProcessingError, description: `An error occurred while processing the A-Feature: ${this.name}. Failed at stage: ${t5.name}.`, stage: t5, originalError: e })), new E({ title: E.FeatureProcessingError, description: `An error occurred while processing the A-Feature: ${this.name}. Failed at stage: ${t5.name}.`, stage: t5, originalError: e });
  }
  next(e) {
    let t5 = this._stages.indexOf(e);
    this._index = t5 + 1, this._index >= this._stages.length && this.completed();
  }
  completed() {
    this.isProcessed || this.state !== "INTERRUPTED" && (this._state = "COMPLETED", this._scopeAllocated && this.scope.destroy());
  }
  failed(e) {
    return this.isProcessed ? this._error : (this._state = "FAILED", this._error = e, this._scopeAllocated && this.scope.destroy(), this._error);
  }
  interrupt(e) {
    if (this.isProcessed) return this._error;
    switch (this._state = "INTERRUPTED", true) {
      case a.isString(e):
        this._error = new E(E.Interruption, e);
        break;
      case a.isErrorInstance(e):
        this._error = new E({ code: E.Interruption, title: e.title || "Feature Interrupted", description: e.description || e.message, stage: this.stage, originalError: e });
        break;
      default:
        this._error = new E(E.Interruption, "Feature was interrupted");
        break;
    }
    return this._scopeAllocated && this.scope.destroy(), this._error;
  }
  chain(e, t5, r4) {
    let n2, o3;
    e instanceof _a26 ? (n2 = e, o3 = t5 instanceof D ? t5 : void 0) : (n2 = new _a26({ name: t5, component: e }), o3 = r4 instanceof D ? r4 : void 0);
    let i4 = o3 || this.scope;
    n2._caller = this._caller;
    let _4 = n2.process(i4);
    return a.isPromiseInstance(_4) ? _4.catch((p3) => {
      throw p3;
    }) : _4;
  }
  toString() {
    return `A-Feature(${this.caller.component?.constructor?.name || "Unknown"}::${this.name})`;
  }
}, __name(_a26, "s"), _a26);
var _a27;
var F = (_a27 = class {
  call(e, t5) {
    return new x({ name: e, component: this }).process(t5);
  }
}, __name(_a27, "F"), _a27);
var Ce = ((n2) => (n2.EXTENSIONS = "a-component-extensions", n2.FEATURES = "a-component-features", n2.INJECTIONS = "a-component-injections", n2.ABSTRACTIONS = "a-component-abstractions", n2))(Ce || {});
var _a28;
var j = (_a28 = class extends m {
  injections(e) {
    return this.get("a-component-injections")?.get(e) || [];
  }
  extensions(e) {
    let t5 = [];
    return this.get("a-component-extensions")?.find(e).forEach(([n2, o3]) => {
      o3.forEach((i4) => {
        t5.push({ name: i4.name, handler: i4.handler, behavior: i4.behavior, before: i4.before || "", after: i4.after || "", throwOnError: i4.throwOnError || true, override: i4.override || "" });
      });
    }), t5;
  }
  features() {
    return this.get("a-component-features")?.toArray().map(([, t5]) => t5) || [];
  }
  abstractions(e) {
    let t5 = [], r4 = this.get("a-component-abstractions"), n2 = this.get("a-component-injections");
    return r4?.find(`CONCEPT_ABSTRACTION::${e}`).forEach(([o3, i4]) => {
      i4.forEach((_4) => {
        let p3 = n2?.get(_4.handler) || [];
        t5.push({ ..._4, args: p3 });
      });
    }), t5;
  }
}, __name(_a28, "j"), _a28);
var ve = /* @__PURE__ */ new Set();
var De = /* @__PURE__ */ new Set();
var _a29;
var D = (_a29 = class {
  constructor(e, t5) {
    this._meta = new m();
    this._version = 0;
    this._resolveConstructorCache = /* @__PURE__ */ new Map();
    this._resolveCache = /* @__PURE__ */ new Map();
    this._resolveFlatAllCache = /* @__PURE__ */ new Map();
    this._resolveAllCache = /* @__PURE__ */ new Map();
    this._cachedFingerprintVersion = -1;
    this._allowedComponents = /* @__PURE__ */ new Set();
    this._allowedErrors = /* @__PURE__ */ new Set();
    this._allowedEntities = /* @__PURE__ */ new Set();
    this._allowedFragments = /* @__PURE__ */ new Set();
    this._components = /* @__PURE__ */ new Map();
    this._errors = /* @__PURE__ */ new Map();
    this._entities = /* @__PURE__ */ new Map();
    this._fragments = /* @__PURE__ */ new Map();
    this._imports = /* @__PURE__ */ new Set();
    this.getInitializer(e).call(this, e, t5);
  }
  get name() {
    return this._name;
  }
  get meta() {
    return this._meta;
  }
  get allowedComponents() {
    return this._allowedComponents;
  }
  get allowedEntities() {
    return this._allowedEntities;
  }
  get allowedFragments() {
    return this._allowedFragments;
  }
  get allowedErrors() {
    return this._allowedErrors;
  }
  get version() {
    return this._version;
  }
  get fingerprint() {
    ve.clear();
    let e = this.aggregateVersion(ve);
    return this._cachedFingerprint !== void 0 && this._cachedFingerprintVersion === e ? this._cachedFingerprint : (De.clear(), this._cachedFingerprint = this.computeFingerprint(De), this._cachedFingerprintVersion = e, this._cachedFingerprint);
  }
  get entities() {
    return Array.from(this._entities.values());
  }
  get fragments() {
    return Array.from(this._fragments.values());
  }
  get components() {
    return Array.from(this._components.values());
  }
  get errors() {
    return Array.from(this._errors.values());
  }
  get imports() {
    return Array.from(this._imports.values());
  }
  get parent() {
    return this._parent;
  }
  bumpVersion() {
    this._version++, this._resolveConstructorCache.clear(), this._resolveCache.clear(), this._resolveFlatAllCache.clear(), this._resolveAllCache.clear(), this._cachedFingerprint = void 0;
  }
  aggregateVersion(e) {
    if (e.has(this)) return 0;
    e.add(this);
    let t5 = this._version;
    this._parent && (t5 += this._parent.aggregateVersion(e));
    for (let r4 of this._imports) t5 += r4.aggregateVersion(e);
    return t5;
  }
  computeFingerprint(e) {
    if (e.has(this)) return "~circular~";
    e.add(this);
    let t5 = [];
    t5.push("P:" + (this._parent ? this._parent.computeFingerprint(e) : "-"));
    let r4 = Array.from(this._allowedComponents).map((A4) => l.getComponentName(A4.name)).sort();
    t5.push("AC:" + r4.join(","));
    let n2 = Array.from(this._allowedEntities).map((A4) => l.getComponentName(A4.name)).sort();
    t5.push("AE:" + n2.join(","));
    let o3 = Array.from(this._allowedFragments).map((A4) => l.getComponentName(A4.name)).sort();
    t5.push("AF:" + o3.join(","));
    let i4 = Array.from(this._allowedErrors).map((A4) => l.getComponentName(A4.name)).sort();
    t5.push("AR:" + i4.join(","));
    let _4 = Array.from(this._imports).map((A4) => A4.computeFingerprint(e)).sort();
    t5.push("I:" + _4.join(","));
    let p3 = t5.join("|"), d4 = 5381;
    for (let A4 = 0; A4 < p3.length; A4++) d4 = (d4 << 5) + d4 + p3.charCodeAt(A4) | 0;
    return (d4 >>> 0).toString(16);
  }
  *parents() {
    let e = this._parent;
    for (; e; ) yield e, e = e._parent;
  }
  parentOffset(e) {
    let t5 = this;
    for (; e <= -1 && t5; ) t5 = t5.parent, e++;
    return t5;
  }
  getInitializer(e, t5) {
    switch (true) {
      case (!e && !t5):
        return this.defaultInitialized;
      case !!e:
        return this.defaultInitialized;
      default:
        throw new f(f.ConstructorError, "Invalid parameters provided to A_Scope constructor");
    }
  }
  defaultInitialized(e = {}, t5 = {}) {
    this._name = e.name || this.constructor.name, this.initComponents(e.components), this.initErrors(e.errors), this.initFragments(e.fragments), this.initEntities(e.entities), this.initMeta(e.meta), t5.parent && (this._parent = t5.parent);
  }
  initComponents(e) {
    e?.forEach(this.register.bind(this));
  }
  initErrors(e) {
    e?.forEach(this.register.bind(this));
  }
  initEntities(e) {
    e?.forEach((t5) => this.register(t5));
  }
  initFragments(e) {
    e?.forEach(this.register.bind(this));
  }
  initMeta(e) {
    e && Object.entries(e).forEach(([t5, r4]) => {
      this._meta.set(t5, r4);
    });
  }
  destroy() {
    this._components.forEach((e) => c.deregister(e)), this._fragments.forEach((e) => c.deregister(e)), this._entities.forEach((e) => c.deregister(e)), this._components.clear(), this._errors.clear(), this._fragments.clear(), this._entities.clear(), this._imports.clear(), this.bumpVersion();
  }
  get(e) {
    return this._meta.get(e);
  }
  set(e, t5) {
    this._meta.set(e, t5);
  }
  issuer() {
    return c.issuer(this);
  }
  inherit(e) {
    if (!e) throw new f(f.InitializationError, "Invalid parent scope provided");
    if (e === this) throw new f(f.CircularInheritanceError, `Unable to inherit scope ${this.name} from itself`);
    if (e === this._parent) return this;
    let t5 = this.checkCircularInheritance(e);
    if (t5) throw new f(f.CircularInheritanceError, `Circular inheritance detected: ${[...t5, e.name].join(" -> ")}`);
    return this._parent = e, this.bumpVersion(), this;
  }
  import(...e) {
    return e.forEach((t5) => {
      if (t5 === this) throw new f(f.CircularImportError, `Unable to import scope ${this.name} into itself`);
      this._imports.has(t5) || (this._imports.add(t5), this.bumpVersion());
    }), this;
  }
  deimport(...e) {
    return e.forEach((t5) => {
      this._imports.has(t5) && (this._imports.delete(t5), this.bumpVersion());
    }), this;
  }
  has(e) {
    let t5 = this.hasFlat(e);
    if (!t5 && this._parent) try {
      return this._parent.has(e);
    } catch {
      return false;
    }
    return t5;
  }
  hasFlat(e) {
    let t5 = false;
    switch (true) {
      case a.isScopeConstructor(e):
        return true;
      case a.isString(e): {
        Array.from(this.allowedComponents).find((_4) => _4.name === e) && (t5 = true), Array.from(this.allowedFragments).find((_4) => _4.name === e) && (t5 = true), Array.from(this.allowedEntities).find((_4) => _4.name === e) && (t5 = true), Array.from(this.allowedErrors).find((_4) => _4.name === e) && (t5 = true);
        break;
      }
      case a.isComponentConstructor(e): {
        t5 = this.isAllowedComponent(e) || !!c.findDescendantIn(e, this.allowedComponents);
        break;
      }
      case a.isEntityConstructor(e): {
        t5 = this.isAllowedEntity(e) || !!c.findDescendantIn(e, this.allowedEntities);
        break;
      }
      case a.isFragmentConstructor(e): {
        t5 = this.isAllowedFragment(e) || !!c.findDescendantIn(e, this.allowedFragments);
        break;
      }
      case a.isErrorConstructor(e): {
        t5 = this.isAllowedError(e) || !!c.findDescendantIn(e, this.allowedErrors);
        break;
      }
      case (this.issuer() && (this.issuer().constructor === e || c.isIndexedInheritedFrom(this.issuer().constructor, e))): {
        t5 = true;
        break;
      }
    }
    return t5;
  }
  resolveDependency(e) {
    let t5 = [], r4 = this.parentOffset(e.parent) || this;
    switch (true) {
      case (e.flat && !e.all): {
        let d4 = r4.resolveFlatOnce(e.target || e.name);
        d4 && (t5 = [d4]);
        break;
      }
      case (e.flat && e.all): {
        t5 = r4.resolveFlatAll(e.target || e.name);
        break;
      }
      case (!e.flat && !e.all): {
        let d4 = r4.resolveOnce(e.target || e.name);
        d4 && (t5 = [d4]);
        break;
      }
      case (!e.flat && e.all): {
        t5 = r4.resolveAll(e.target || e.name);
        break;
      }
      default:
        t5 = [];
    }
    if (e.create && !t5.length && a.isAllowedForDependencyDefaultCreation(e.target)) {
      let d4 = new e.target(...e.args);
      r4.register(d4), t5.push(d4);
    }
    if (e.require && !t5.length) throw new f(f.ResolutionError, `Dependency ${e.name} is required but could not be resolved in scope ${r4.name}`);
    e.query.aseid ? t5 = t5.filter((d4) => a.hasASEID(d4) && I.compare(d4.aseid, e.query.aseid)) : Object.keys(e.query).length > 0 && (t5 = t5.filter((d4) => {
      let A4 = e.query;
      return A4 ? Object.entries(A4).every(([h4, Y2]) => d4[h4] === Y2) : true;
    }));
    let n2 = e.pagination.count, o3 = e.pagination.from, i4 = o3 === "end" ? n2 === -1 ? 0 : Math.max(t5.length - n2, 0) : 0, _4 = o3 === "end" || n2 === -1 ? t5.length : Math.min(n2, t5.length), p3 = t5.slice(i4, _4);
    return p3.length === 1 && n2 !== -1 ? p3[0] : p3.length ? p3 : void 0;
  }
  resolveConstructor(e) {
    switch (true) {
      case a.isComponentConstructor(e):
        return c.findDescendantIn(e, this.allowedComponents);
      case a.isEntityConstructor(e):
        return c.findDescendantIn(e, this.allowedEntities);
      case a.isFragmentConstructor(e):
        return c.findDescendantIn(e, this.allowedFragments);
      case a.isErrorConstructor(e):
        return c.findDescendantIn(e, this.allowedErrors);
    }
    if (!a.isString(e)) throw new f(f.ResolutionError, `Invalid constructor name provided: ${e}`);
    let t5 = e;
    if (this._resolveConstructorCache.has(t5)) {
      let n2 = this._resolveConstructorCache.get(t5);
      return n2 === null ? void 0 : n2;
    }
    let r4 = this._resolveConstructorUncached(e);
    return this._resolveConstructorCache.set(t5, r4 ?? null), r4;
  }
  _resolveConstructorUncached(e) {
    let t5 = Array.from(this.allowedComponents).find((o3) => o3.name === e || o3.name === y.toPascalCase(e));
    if (t5) return t5;
    {
      let o3 = y.toPascalCase(e), i4 = Array.from(this.allowedComponents).find((_4) => {
        let p3 = c.getAncestors(_4);
        if (!p3) return false;
        for (let d4 of p3) if (d4.name === e || d4.name === o3) return true;
        return false;
      });
      if (i4) return i4;
    }
    let r4 = Array.from(this.allowedEntities).find((o3) => o3.name === e || o3.name === y.toPascalCase(e) || o3.entity === e || o3.entity === y.toKebabCase(e));
    if (r4) return r4;
    {
      let o3 = y.toPascalCase(e), i4 = Array.from(this.allowedEntities).find((_4) => {
        let p3 = c.getAncestors(_4);
        if (!p3) return false;
        for (let d4 of p3) if (d4.name === e || d4.name === o3) return true;
        return false;
      });
      if (i4) return i4;
    }
    let n2 = Array.from(this.allowedFragments).find((o3) => o3.name === e || o3.name === y.toPascalCase(e));
    if (n2) return n2;
    {
      let o3 = y.toPascalCase(e), i4 = Array.from(this.allowedFragments).find((_4) => {
        let p3 = c.getAncestors(_4);
        if (!p3) return false;
        for (let d4 of p3) if (d4.name === e || d4.name === o3) return true;
        return false;
      });
      if (i4) return i4;
    }
    for (let o3 of this._imports) {
      let i4 = o3.resolveConstructor(e);
      if (i4) return i4;
    }
    if (this._parent) return this._parent.resolveConstructor(e);
  }
  resolveAll(e) {
    if (this._resolveAllCache.has(e)) return this._resolveAllCache.get(e);
    let t5 = /* @__PURE__ */ new Set();
    this.resolveFlatAll(e).forEach((i4) => t5.add(i4)), this._imports.forEach((i4) => {
      i4.has(e) && i4.resolveFlatAll(e).forEach((p3) => t5.add(p3));
    });
    let n2 = this._parent;
    for (; n2 && n2.has(e); ) n2.resolveAll(e).forEach((_4) => t5.add(_4)), n2 = n2._parent;
    let o3 = Array.from(t5);
    return this._resolveAllCache.set(e, o3), o3;
  }
  resolveFlatAll(e) {
    if (this._resolveFlatAllCache.has(e)) return this._resolveFlatAllCache.get(e);
    let t5 = [];
    switch (true) {
      case a.isComponentConstructor(e): {
        this.allowedComponents.forEach((r4) => {
          if (c.isIndexedInheritedFrom(r4, e)) {
            let n2 = this.resolveOnce(r4);
            n2 && t5.push(n2);
          }
        });
        break;
      }
      case a.isFragmentConstructor(e): {
        this.allowedFragments.forEach((r4) => {
          if (c.isIndexedInheritedFrom(r4, e)) {
            let n2 = this.resolveOnce(r4);
            n2 && t5.push(n2);
          }
        });
        break;
      }
      case a.isEntityConstructor(e): {
        this.entities.forEach((r4) => {
          c.isIndexedInheritedFrom(r4.constructor, e) && t5.push(r4);
        });
        break;
      }
      case a.isString(e): {
        let r4 = this.resolveConstructor(e);
        if (!a.isComponentConstructor(r4) && !a.isEntityConstructor(r4) && !a.isFragmentConstructor(r4)) throw new f(f.ResolutionError, `Unable to resolve all instances for name: ${e} in scope ${this.name} as no matching component, entity or fragment constructor found`);
        if (r4) {
          let n2 = this.resolveAll(r4);
          n2 && t5.push(...n2);
        }
        break;
      }
      default:
        throw new f(f.ResolutionError, `Invalid parameter provided to resolveAll method: ${e} in scope ${this.name}`);
    }
    return this._resolveFlatAllCache.set(e, t5), t5;
  }
  resolve(e) {
    let t5 = a.isDependencyInstance(e) ? e : new v(e);
    return this.resolveDependency(t5);
  }
  resolveOnce(e) {
    if (this._resolveCache.has(e)) return this._resolveCache.get(e);
    let t5 = this.resolveFlatOnce(e);
    if (!t5) {
      for (let r4 of this._imports) if (r4.has(e)) {
        let n2 = r4.resolveFlatOnce(e);
        if (n2) return this._resolveCache.set(e, n2), n2;
      }
    }
    if (!t5 && this.parent) {
      let r4 = this.parent.resolveOnce(e);
      return this._resolveCache.set(e, r4), r4;
    }
    return this._resolveCache.set(e, t5), t5;
  }
  resolveFlat(e) {
    return this.resolveFlatOnce(e);
  }
  resolveFlatOnce(e) {
    let t5;
    if (!(!e || !this.hasFlat(e))) {
      switch (true) {
        case a.isString(e): {
          t5 = this.resolveByName(e);
          break;
        }
        case a.isConstructorAllowedForScopeAllocation(e): {
          t5 = this.resolveIssuer(e);
          break;
        }
        case a.isScopeConstructor(e): {
          t5 = this.resolveScope(e);
          break;
        }
        case a.isEntityConstructor(e): {
          t5 = this.resolveEntity(e);
          break;
        }
        case a.isFragmentConstructor(e): {
          t5 = this.resolveFragment(e);
          break;
        }
        case a.isComponentConstructor(e): {
          t5 = this.resolveComponent(e);
          break;
        }
        case a.isErrorConstructor(e): {
          t5 = this.resolveError(e);
          break;
        }
        default:
          throw new f(f.ResolutionError, `Injected Component ${l.getComponentName(e)} not found in the scope`);
      }
      return t5;
    }
  }
  resolveByName(e) {
    let t5 = Array.from(this.allowedComponents).find((i4) => i4.name === e || i4.name === y.toPascalCase(e));
    if (t5) return this.resolveOnce(t5);
    let r4 = Array.from(this.allowedEntities).find((i4) => i4.name === e || i4.name === y.toPascalCase(e) || i4.entity === e || i4.entity === y.toKebabCase(e));
    if (r4) return this.resolveOnce(r4);
    let n2 = Array.from(this.allowedFragments).find((i4) => i4.name === e || i4.name === y.toPascalCase(e));
    if (n2) return this.resolveOnce(n2);
    let o3 = Array.from(this.allowedErrors).find((i4) => i4.name === e || i4.name === y.toPascalCase(e) || i4.code === e || i4.code === y.toKebabCase(e));
    if (o3) return this.resolveOnce(o3);
  }
  resolveIssuer(e) {
    let t5 = this.issuer();
    if (t5 && (t5.constructor === e || c.isIndexedInheritedFrom(t5?.constructor, e))) return t5;
  }
  resolveEntity(e) {
    return this.entities.find((t5) => t5 instanceof e);
  }
  resolveError(e) {
    return this.errors.find((t5) => t5 instanceof e);
  }
  resolveFragment(e) {
    let t5 = this._fragments.get(e);
    switch (true) {
      case (t5 && this._fragments.has(e)):
        return t5;
      case !t5: {
        let r4 = c.findDescendantIn(e, this._allowedFragments);
        return r4 ? this.resolveFragment(r4) : void 0;
      }
      default:
        return;
    }
  }
  resolveScope(e) {
    return this;
  }
  resolveComponent(e) {
    switch (true) {
      case (this.allowedComponents.has(e) && this._components.has(e)):
        return this._components.get(e);
      case (this.allowedComponents.has(e) && !this._components.has(e)): {
        let n2 = (c.meta(e).get("a-component-injections")?.get("constructor") || []).map((i4) => this.resolve(i4)), o3 = new e(...n2);
        return this.register(o3), this._components.get(e);
      }
      case !this.allowedComponents.has(e): {
        let t5 = c.findDescendantIn(e, this.allowedComponents);
        return t5 ? this.resolveComponent(t5) : void 0;
      }
      default:
        return;
    }
  }
  register(e) {
    switch (true) {
      case e instanceof F: {
        this.allowedComponents.has(e.constructor) || this.allowedComponents.add(e.constructor), this._components.set(e.constructor, e), c.indexConstructor(e.constructor), c.register(this, e), this.bumpVersion();
        break;
      }
      case (a.isEntityInstance(e) && !this._entities.has(e.aseid.toString())): {
        this.allowedEntities.has(e.constructor) || this.allowedEntities.add(e.constructor), this._entities.set(e.aseid.toString(), e), c.indexConstructor(e.constructor), c.register(this, e), this.bumpVersion();
        break;
      }
      case a.isFragmentInstance(e): {
        this.allowedFragments.has(e.constructor) || this.allowedFragments.add(e.constructor), this._fragments.set(e.constructor, e), c.indexConstructor(e.constructor), c.register(this, e), this.bumpVersion();
        break;
      }
      case a.isErrorInstance(e): {
        this.allowedErrors.has(e.constructor) || this.allowedErrors.add(e.constructor), this._errors.set(e.code, e), c.indexConstructor(e.constructor), c.register(this, e), this.bumpVersion();
        break;
      }
      case a.isComponentConstructor(e): {
        this.allowedComponents.has(e) || (this.allowedComponents.add(e), c.indexConstructor(e), this.bumpVersion());
        break;
      }
      case a.isFragmentConstructor(e): {
        this.allowedFragments.has(e) || (this.allowedFragments.add(e), c.indexConstructor(e), this.bumpVersion());
        break;
      }
      case a.isEntityConstructor(e): {
        this.allowedEntities.has(e) || (this.allowedEntities.add(e), c.indexConstructor(e), this.bumpVersion());
        break;
      }
      case a.isErrorConstructor(e): {
        this.allowedErrors.has(e) || (this.allowedErrors.add(e), c.indexConstructor(e), this.bumpVersion());
        break;
      }
      default:
        if (e instanceof N) throw new f(f.RegistrationError, `Entity with ASEID ${e.aseid.toString()} is already registered in the scope ${this.name}`);
        if (e instanceof V) throw new f(f.RegistrationError, `Fragment ${e.constructor.name} is already registered in the scope ${this.name}`);
        {
          let t5 = l.getComponentName(e);
          throw new f(f.RegistrationError, `Cannot register ${t5} in the scope ${this.name}`);
        }
    }
  }
  deregister(e) {
    switch (true) {
      case e instanceof F: {
        this._components.delete(e.constructor), c.deregister(e);
        let r4 = e.constructor;
        this._components.has(r4) || this.allowedComponents.delete(r4), this.bumpVersion();
        break;
      }
      case a.isEntityInstance(e): {
        this._entities.delete(e.aseid.toString()), c.deregister(e);
        let r4 = e.constructor;
        Array.from(this._entities.values()).some((o3) => o3 instanceof r4) || this.allowedEntities.delete(r4), this.bumpVersion();
        break;
      }
      case a.isFragmentInstance(e): {
        this._fragments.delete(e.constructor), c.deregister(e);
        let r4 = e.constructor;
        Array.from(this._fragments.values()).some((o3) => o3 instanceof r4) || this.allowedFragments.delete(r4), this.bumpVersion();
        break;
      }
      case a.isErrorInstance(e): {
        this._errors.delete(e.code), c.deregister(e);
        let r4 = e.constructor;
        Array.from(this._errors.values()).some((o3) => o3 instanceof r4) || this.allowedErrors.delete(r4), this.bumpVersion();
        break;
      }
      case a.isComponentConstructor(e): {
        this.allowedComponents.delete(e), this.bumpVersion();
        break;
      }
      case a.isFragmentConstructor(e): {
        this.allowedFragments.delete(e), Array.from(this._fragments.entries()).forEach(([r4, n2]) => {
          c.isIndexedInheritedFrom(r4, e) && (this._fragments.delete(r4), c.deregister(n2));
        }), this.bumpVersion();
        break;
      }
      case a.isEntityConstructor(e): {
        this.allowedEntities.delete(e), Array.from(this._entities.entries()).forEach(([r4, n2]) => {
          c.isIndexedInheritedFrom(n2.constructor, e) && (this._entities.delete(r4), c.deregister(n2));
        }), this.bumpVersion();
        break;
      }
      case a.isErrorConstructor(e): {
        this.allowedErrors.delete(e), Array.from(this._errors.entries()).forEach(([r4, n2]) => {
          c.isIndexedInheritedFrom(n2.constructor, e) && (this._errors.delete(r4), c.deregister(n2));
        }), this.bumpVersion();
        break;
      }
      default:
        let t5 = l.getComponentName(e);
        throw new f(f.DeregistrationError, `Cannot deregister ${t5} from the scope ${this.name}`);
    }
  }
  toJSON() {
    return this.fragments.reduce((e, t5) => {
      let r4 = t5.toJSON();
      return { ...e, [r4.name]: r4 };
    }, {});
  }
  isAllowedComponent(e) {
    return a.isComponentConstructor(e) && this.allowedComponents.has(e);
  }
  isAllowedEntity(e) {
    return a.isEntityConstructor(e) && this.allowedEntities.has(e);
  }
  isAllowedFragment(e) {
    return a.isFragmentConstructor(e) && this.allowedFragments.has(e);
  }
  isAllowedError(e) {
    return a.isErrorConstructor(e) && this.allowedErrors.has(e);
  }
  isInheritedFrom(e) {
    let t5 = this;
    for (; t5; ) {
      if (t5 === e) return true;
      t5 = t5._parent;
    }
    return false;
  }
  checkCircularInheritance(e) {
    let t5 = [], r4 = this._parent;
    for (; r4; ) {
      if (t5.push(r4.name), r4 === e) return t5;
      r4 = r4._parent;
    }
    return false;
  }
  printInheritanceChain() {
    let e = [], t5 = this;
    for (; t5; ) e.push(t5.name), t5 = t5._parent;
    console.log(e.join(" -> "));
  }
}, __name(_a29, "D"), _a29);
var _a30;
var f = (_a30 = class extends P {
}, __name(_a30, "f"), _a30);
f.InitializationError = "A-Scope Initialization Error", f.ConstructorError = "Unable to construct A-Scope instance", f.ResolutionError = "A-Scope Resolution Error", f.RegistrationError = "A-Scope Registration Error", f.CircularInheritanceError = "A-Scope Circular Inheritance Error", f.CircularImportError = "A-Scope Circular Import Error", f.DeregistrationError = "A-Scope Deregistration Error";
var _a31;
var u = (_a31 = class extends P {
}, __name(_a31, "u"), _a31);
u.NotAllowedForScopeAllocationError = "Component is not allowed for scope allocation", u.ComponentAlreadyHasScopeAllocatedError = "Component already has scope allocated", u.InvalidMetaParameterError = "Invalid parameter provided to get meta", u.InvalidScopeParameterError = "Invalid parameter provided to get scope", u.ScopeNotFoundError = "Scope not found", u.InvalidFeatureParameterError = "Invalid parameter provided to get feature", u.InvalidFeatureDefinitionParameterError = "Invalid parameter provided to define feature", u.InvalidFeatureTemplateParameterError = "Invalid parameter provided to get feature template", u.InvalidFeatureExtensionParameterError = "Invalid parameter provided to extend feature", u.InvalidAbstractionParameterError = "Invalid parameter provided to get abstraction", u.InvalidAbstractionDefinitionParameterError = "Invalid parameter provided to define abstraction", u.InvalidAbstractionTemplateParameterError = "Invalid parameter provided to get abstraction template", u.InvalidAbstractionExtensionParameterError = "Invalid parameter provided to extend abstraction", u.InvalidInjectionParameterError = "Invalid parameter provided to get injections", u.InvalidExtensionParameterError = "Invalid parameter provided to get extensions", u.InvalidRegisterParameterError = "Invalid parameter provided to register component", u.InvalidComponentParameterError = "Invalid component provided", u.ComponentNotRegisteredError = "Component not registered in the context", u.InvalidDeregisterParameterError = "Invalid parameter provided to deregister component";
var _a32;
var w = (_a32 = class {
  constructor() {
    this._registry = /* @__PURE__ */ new WeakMap();
    this._scopeIssuers = /* @__PURE__ */ new WeakMap();
    this._scopeStorage = /* @__PURE__ */ new WeakMap();
    this._metaStorage = /* @__PURE__ */ new Map();
    this._metaVersion = 0;
    this._featureCache = /* @__PURE__ */ new WeakMap();
    this._sortedStepsForTemplate = /* @__PURE__ */ new WeakMap();
    this._ancestors = /* @__PURE__ */ new Map();
    this._descendants = /* @__PURE__ */ new Map();
    this._globals = /* @__PURE__ */ new Map();
    let e = String(k.A_CONCEPT_ROOT_SCOPE) || "root";
    this._root = new D({ name: e });
  }
  static get concept() {
    return k.A_CONCEPT_NAME || "a-concept";
  }
  static get root() {
    return this.getInstance()._root;
  }
  static get environment() {
    return k.A_CONCEPT_RUNTIME_ENVIRONMENT;
  }
  static getInstance() {
    return _a32._instance || (_a32._instance = new _a32()), _a32._instance;
  }
  static register(e, t5) {
    let r4 = l.getComponentName(t5), n2 = this.getInstance();
    if (!t5) throw new u(u.InvalidRegisterParameterError, "Unable to register component. Component cannot be null or undefined.");
    if (!e) throw new u(u.InvalidRegisterParameterError, "Unable to register component. Scope cannot be null or undefined.");
    if (!this.isAllowedToBeRegistered(t5)) throw new u(u.NotAllowedForScopeAllocationError, `Component ${r4} is not allowed for scope allocation.`);
    return n2._scopeStorage.set(t5, e), e;
  }
  static deregister(e) {
    if (!e) throw new u(u.InvalidDeregisterParameterError, "Unable to deregister component. Component cannot be null or undefined.");
    if (!this.getInstance()._scopeStorage.delete(e)) {
      let r4 = l.getComponentName(e);
      throw new u(u.ComponentNotRegisteredError, `Unable to deregister component. Component ${r4} is not registered.`);
    }
  }
  static allocate(e, t5) {
    let r4 = l.getComponentName(e);
    if (!this.isAllowedForScopeAllocation(e)) throw new u(u.NotAllowedForScopeAllocationError, `Component of type ${r4} is not allowed for scope allocation. Only A_Container, A_Feature are allowed.`);
    let n2 = this.getInstance();
    if (n2._registry.has(e)) throw new u(u.ComponentAlreadyHasScopeAllocatedError, `Component ${r4} already has a scope allocated.`);
    let o3 = a.isScopeInstance(t5) ? t5 : new D(t5 || { name: r4 + "-scope" }, t5);
    return o3.isInheritedFrom(_a32.root) || o3.inherit(_a32.root), n2._registry.set(e, o3), n2._scopeIssuers.set(o3, e), o3;
  }
  static deallocate(e) {
    let t5 = this.getInstance(), r4 = a.isScopeInstance(e) ? e : t5._registry.get(e);
    if (!r4) return;
    let n2 = a.isComponentInstance(e) ? e : this.issuer(r4);
    n2 && t5._registry.delete(n2), r4 && t5._scopeIssuers.delete(r4);
  }
  static meta(e) {
    let t5 = l.getComponentName(e), r4 = this.getInstance();
    if (!e) throw new u(u.InvalidMetaParameterError, "Invalid parameter provided to get meta. Parameter cannot be null or undefined.");
    if (!(this.isAllowedForMeta(e) || this.isAllowedForMetaConstructor(e) || a.isString(e) || a.isFunction(e))) throw new u(u.InvalidMetaParameterError, `Invalid parameter provided to get meta. Component of type ${t5} is not allowed for meta storage. Only A_Container, A_Component and A_Entity are allowed.`);
    let n2, o3;
    switch (true) {
      case a.isContainerInstance(e): {
        n2 = e.constructor, o3 = B;
        break;
      }
      case a.isContainerConstructor(e): {
        n2 = e, o3 = B;
        break;
      }
      case a.isComponentInstance(e): {
        n2 = e.constructor, o3 = j;
        break;
      }
      case a.isComponentConstructor(e): {
        n2 = e, o3 = j;
        break;
      }
      case a.isEntityInstance(e): {
        n2 = e.constructor, o3 = j;
        break;
      }
      case a.isEntityConstructor(e): {
        n2 = e, o3 = q;
        break;
      }
      case a.isFragmentInstance(e): {
        n2 = e.constructor, o3 = j;
        break;
      }
      case a.isFragmentConstructor(e): {
        n2 = e, o3 = q;
        break;
      }
      case typeof e == "string": {
        let i4 = Array.from(r4._metaStorage).find(([_4]) => _4.name === e || _4.name === y.toKebabCase(e) || _4.name === y.toPascalCase(e));
        if (!(i4 && i4.length)) throw new u(u.InvalidMetaParameterError, `Invalid parameter provided to get meta. Component with name ${e} not found in the meta storage.`);
        n2 = i4[0], o3 = j;
        break;
      }
      default: {
        n2 = e, o3 = m;
        break;
      }
    }
    if (!r4._metaStorage.has(n2)) {
      let i4, _4 = n2;
      for (; !i4; ) {
        let p3 = Object.getPrototypeOf(_4);
        if (!p3) break;
        i4 = r4._metaStorage.get(p3), _4 = p3;
      }
      i4 || (i4 = new o3()), r4._metaStorage.set(n2, i4.clone()), r4._metaVersion++, this.indexConstructor(n2);
    }
    return r4._metaStorage.get(n2);
  }
  static setMeta(e, t5) {
    let r4 = _a32.getInstance(), n2 = _a32.meta(e), o3 = typeof e == "function" ? e : e.constructor;
    r4._metaStorage.set(o3, n2 ? t5.from(n2) : t5), r4._metaVersion++;
  }
  static issuer(e) {
    let t5 = this.getInstance();
    if (!e) throw new u(u.InvalidComponentParameterError, "Invalid parameter provided to get scope issuer. Parameter cannot be null or undefined.");
    return t5._scopeIssuers.get(e);
  }
  static scope(e) {
    let t5 = e?.constructor?.name || String(e), r4 = this.getInstance();
    if (!e) throw new u(u.InvalidScopeParameterError, "Invalid parameter provided to get scope. Parameter cannot be null or undefined.");
    if (!this.isAllowedForScopeAllocation(e) && !this.isAllowedToBeRegistered(e)) throw new u(u.InvalidScopeParameterError, `Invalid parameter provided to get scope. Component of type ${t5} is not allowed for scope allocation.`);
    switch (true) {
      case this.isAllowedToBeRegistered(e):
        if (!r4._scopeStorage.has(e)) throw new u(u.ScopeNotFoundError, `Invalid parameter provided to get scope. Component of type ${t5} does not have a scope registered. Make sure to register the component using A_Context.register() method before trying to get the scope.`);
        return r4._scopeStorage.get(e);
      case this.isAllowedForScopeAllocation(e):
        if (!r4._registry.has(e)) throw new u(u.ScopeNotFoundError, `Invalid parameter provided to get scope. Component of type ${t5} does not have a scope allocated. Make sure to allocate a scope using A_Context.allocate() method before trying to get the scope.`);
        return r4._registry.get(e);
      default:
        throw new u(u.InvalidScopeParameterError, `Invalid parameter provided to get scope. Component of type ${t5} is not allowed to be registered.`);
    }
  }
  static getSortedStepsFor(e) {
    return this.getInstance()._sortedStepsForTemplate.get(e);
  }
  static setSortedStepsFor(e, t5) {
    this.getInstance()._sortedStepsForTemplate.set(e, t5);
  }
  static featureTemplate(e, t5, r4 = this.scope(t5)) {
    if (!t5) throw new u(u.InvalidFeatureTemplateParameterError, "Unable to get feature template. Component cannot be null or undefined.");
    if (!e) throw new u(u.InvalidFeatureTemplateParameterError, "Unable to get feature template. Feature name cannot be null or undefined.");
    if (!a.isAllowedForFeatureDefinition(t5)) throw new u(u.InvalidFeatureTemplateParameterError, `Unable to get feature template. Component of type ${l.getComponentName(t5)} is not allowed for feature definition.`);
    let n2 = this.getInstance(), o3 = typeof t5 == "function" ? t5 : t5.constructor, i4 = n2._featureCache.get(o3);
    if (i4) {
      let A4 = `${String(e)}::s${r4.fingerprint}::m${n2._metaVersion}`, h4 = i4.get(A4);
      if (h4) return h4;
      let Y2 = [...this.featureDefinition(e, t5), ...this.featureExtensions(e, t5, r4)];
      return i4.size >= _a32.FEATURE_EXTENSIONS_CACHE_MAX_SIZE && i4.clear(), i4.set(A4, Y2), Y2;
    }
    let _4 = `${String(e)}::s${r4.fingerprint}::m${n2._metaVersion}`, p3 = [...this.featureDefinition(e, t5), ...this.featureExtensions(e, t5, r4)], d4 = /* @__PURE__ */ new Map();
    return d4.set(_4, p3), n2._featureCache.set(o3, d4), p3;
  }
  static featureExtensions(e, t5, r4) {
    let n2 = this.getInstance();
    if (!t5) throw new u(u.InvalidFeatureExtensionParameterError, "Unable to get feature template. Component cannot be null or undefined.");
    if (!e) throw new u(u.InvalidFeatureExtensionParameterError, "Unable to get feature template. Feature name cannot be null or undefined.");
    if (!a.isAllowedForFeatureDefinition(t5)) throw new u(u.InvalidFeatureExtensionParameterError, `Unable to get feature template. Component of type ${l.getComponentName(t5)} is not allowed for feature definition.`);
    let o3 = l.getClassInheritanceChain(t5).filter((T) => T !== F && T !== $ && T !== N).map((T) => `${T.name}.${e}`), i4 = /* @__PURE__ */ new Map(), _4 = /* @__PURE__ */ new Set(), p3 = /* @__PURE__ */ new Map(), d4 = /* @__PURE__ */ new Map(), A4 = /* @__PURE__ */ __name((T) => {
      let g2 = p3.get(T);
      return g2 === void 0 && (g2 = l.getComponentName(T), p3.set(T, g2)), g2;
    }, "A"), h4 = /* @__PURE__ */ __name((T) => {
      let g2 = d4.get(T);
      return g2 || (g2 = new v(T), d4.set(T, g2)), g2;
    }, "h"), Y2 = new Set(l.getClassInheritanceChain(t5).filter((T) => T !== F && T !== $ && T !== N)), R3 = /* @__PURE__ */ __name((T) => {
      if (Y2.has(T)) return false;
      let g2 = _a32.getAncestors(T);
      if (!g2) return false;
      for (let se of Y2) if (g2.has(se)) return true;
      return false;
    }, "R"), W = [];
    for (let [T, g2] of n2._metaStorage) if (r4.has(T) && (a.isComponentMetaInstance(g2) || a.isContainerMetaInstance(g2))) {
      if (R3(T)) continue;
      W.push([T, g2]);
    }
    for (let T of o3) for (let [g2, se] of W) {
      _4.add(g2);
      let ie = se.extensions(T);
      for (let te = 0; te < ie.length; te++) {
        let M3 = ie[te], Z = Array.from(_4).reverse().find((J) => _a32.isIndexedInheritedFrom(g2, J) && J !== g2);
        if (Z && i4.delete(`${A4(Z)}.${M3.handler}`), M3.override) {
          let J = new RegExp(M3.override);
          for (let [ae, _e2] of i4) (J.test(ae) || J.test(_e2.handler)) && i4.delete(ae);
        }
        i4.set(`${A4(g2)}.${M3.handler}`, { dependency: h4(g2), ...M3 });
      }
    }
    return n2.filterToMostDerived(r4, Array.from(i4.values()));
  }
  filterToMostDerived(e, t5) {
    if (t5.length <= 1) return t5;
    let r4 = /* @__PURE__ */ new Map(), n2 = /* @__PURE__ */ new Set();
    for (let _4 of t5) {
      let p3 = _4.dependency.name;
      r4.has(p3) || r4.set(p3, e.resolveConstructor(p3)), n2.add(p3);
    }
    let o3 = /* @__PURE__ */ new Set(), i4 = /* @__PURE__ */ new Map();
    for (let [_4, p3] of r4) p3 && i4.set(p3, _4);
    for (let [_4, p3] of r4) {
      if (!p3) continue;
      let d4 = _a32.getAncestors(p3);
      if (d4) for (let A4 of d4) {
        let h4 = i4.get(A4);
        h4 && h4 !== _4 && n2.has(h4) && o3.add(h4);
      }
    }
    return t5.filter((_4) => !o3.has(_4.dependency.name));
  }
  static featureDefinition(e, t5) {
    let r4;
    if (!e) throw new u(u.InvalidFeatureTemplateParameterError, "Unable to get feature template. Feature name cannot be null or undefined.");
    if (!t5) throw new u(u.InvalidFeatureTemplateParameterError, "Unable to get feature template. Component cannot be null or undefined.");
    switch (true) {
      case t5 instanceof N:
        r4 = "a-component-features";
        break;
      case t5 instanceof $:
        r4 = "a-container-features";
        break;
      case t5 instanceof F:
        r4 = "a-component-features";
        break;
      default:
        throw new u(u.InvalidFeatureTemplateParameterError, `A-Feature cannot be defined on the ${t5} level`);
    }
    return [...this.meta(t5)?.get(r4)?.get(e)?.template || []];
  }
  static abstractionTemplate(e, t5) {
    let r4 = l.getComponentName(t5);
    if (!t5) throw new u(u.InvalidAbstractionTemplateParameterError, "Unable to get feature template. Component cannot be null or undefined.");
    if (!e) throw new u(u.InvalidAbstractionTemplateParameterError, "Unable to get feature template. Abstraction stage cannot be null or undefined.");
    if (!a.isAllowedForAbstractionDefinition(t5)) throw new u(u.InvalidAbstractionTemplateParameterError, `Unable to get feature template. Component of type ${r4} is not allowed for feature definition.`);
    return [...this.abstractionExtensions(e, t5)];
  }
  static abstractionExtensions(e, t5) {
    let r4 = this.getInstance(), n2 = l.getComponentName(t5);
    if (!t5) throw new u(u.InvalidAbstractionExtensionParameterError, "Unable to get feature template. Component cannot be null or undefined.");
    if (!e) throw new u(u.InvalidAbstractionExtensionParameterError, "Unable to get feature template. Abstraction stage cannot be null or undefined.");
    if (!a.isAllowedForAbstractionDefinition(t5)) throw new u(u.InvalidAbstractionExtensionParameterError, `Unable to get feature template. Component of type ${n2} is not allowed for feature definition.`);
    let o3 = /* @__PURE__ */ new Map(), i4 = this.scope(t5), _4 = /* @__PURE__ */ new Set();
    for (let [p3, d4] of r4._metaStorage) i4.has(p3) && (a.isComponentMetaInstance(d4) || a.isContainerMetaInstance(d4)) && (_4.add(p3), d4.abstractions(e).forEach((A4) => {
      let h4 = Array.from(_4).reverse().find((Y2) => _a32.isIndexedInheritedFrom(p3, Y2) && Y2 !== p3);
      h4 && o3.delete(`${l.getComponentName(h4)}.${A4.handler}`), o3.set(`${l.getComponentName(p3)}.${A4.handler}`, { dependency: new v(p3), ...A4 });
    }));
    return r4.filterToMostDerived(i4, Array.from(o3.values()));
  }
  static reset() {
    let e = _a32.getInstance();
    e._registry = /* @__PURE__ */ new WeakMap(), e._featureCache = /* @__PURE__ */ new WeakMap(), e._ancestors.clear(), e._descendants.clear(), e._metaVersion++;
    let t5 = String(k.A_CONCEPT_ROOT_SCOPE) || "root";
    e._root = new D({ name: t5 });
  }
  static indexConstructor(e) {
    let t5 = this.getInstance();
    if (t5._ancestors.has(e)) return;
    let r4 = /* @__PURE__ */ new Set(), n2 = Object.getPrototypeOf(e);
    for (; n2 && n2 !== Function.prototype && n2 !== Object; ) {
      r4.add(n2);
      let o3 = t5._descendants.get(n2);
      o3 || (o3 = /* @__PURE__ */ new Set(), t5._descendants.set(n2, o3)), o3.add(e);
      let i4 = t5._ancestors.get(n2);
      if (i4) {
        for (let _4 of i4) {
          r4.add(_4);
          let p3 = t5._descendants.get(_4);
          p3 || (p3 = /* @__PURE__ */ new Set(), t5._descendants.set(_4, p3)), p3.add(e);
        }
        break;
      }
      n2 = Object.getPrototypeOf(n2);
    }
    t5._ancestors.set(e, r4), t5._descendants.has(e) || t5._descendants.set(e, /* @__PURE__ */ new Set());
  }
  static isIndexedInheritedFrom(e, t5) {
    if (e === t5) return true;
    let n2 = this.getInstance()._ancestors.get(e);
    return n2 ? n2.has(t5) : l.isInheritedFrom(e, t5);
  }
  static findDescendantIn(e, t5) {
    let r4 = t5 instanceof Set ? t5.size : t5.length;
    if (t5 instanceof Set) {
      if (t5.has(e)) return e;
    } else if (t5.includes(e)) return e;
    let n2 = this.getInstance(), o3 = n2._descendants.get(e), i4 = o3 ? o3.size : 0;
    if (i4 === 0) {
      if (t5 instanceof Set) for (let _4 of t5) {
        let p3 = n2._ancestors.get(_4);
        if (p3 && p3.has(e)) return _4;
      }
      else for (let _4 of t5) {
        let p3 = n2._ancestors.get(_4);
        if (p3 && p3.has(e)) return _4;
      }
      return;
    }
    if (r4 <= i4) if (t5 instanceof Set) for (let _4 of t5) {
      if (_4 === e) return _4;
      let p3 = n2._ancestors.get(_4);
      if (p3 && p3.has(e)) return _4;
    }
    else for (let _4 of t5) {
      if (_4 === e) return _4;
      let p3 = n2._ancestors.get(_4);
      if (p3 && p3.has(e)) return _4;
    }
    else for (let _4 of o3) if (t5 instanceof Set) {
      if (t5.has(_4)) return _4;
    } else if (t5.includes(_4)) return _4;
  }
  static getAncestors(e) {
    return this.getInstance()._ancestors.get(e);
  }
  static isAllowedForScopeAllocation(e) {
    return a.isContainerInstance(e) || a.isFeatureInstance(e) || a.isEntityInstance(e);
  }
  static isAllowedToBeRegistered(e) {
    return a.isEntityInstance(e) || a.isComponentInstance(e) || a.isFragmentInstance(e) || a.isErrorInstance(e);
  }
  static isAllowedForMeta(e) {
    return a.isContainerInstance(e) || a.isComponentInstance(e) || a.isEntityInstance(e);
  }
  static isAllowedForMetaConstructor(e) {
    return a.isContainerConstructor(e) || a.isComponentConstructor(e) || a.isEntityConstructor(e);
  }
}, __name(_a32, "w"), _a32);
w.FEATURE_EXTENSIONS_CACHE_MAX_SIZE = 1024;
var c = w;
var _a33;
var K = (_a33 = class extends P {
}, __name(_a33, "K"), _a33);
K.AbstractionExtensionError = "Unable to extend abstraction execution";
function Pe(s3, e = {}) {
  return function(t5, r4, n2) {
    let o3 = l.getComponentName(t5);
    if (!s3) throw new K(K.AbstractionExtensionError, `Abstraction name must be provided to extend abstraction for '${o3}'.`);
    if (!a.isConstructorAvailableForAbstraction(t5)) throw new K(K.AbstractionExtensionError, `Unable to extend Abstraction '${s3}' for '${o3}'. Only A-Containers and A-Components can extend Abstractions.`);
    let i4, _4 = c.meta(t5);
    switch (true) {
      case (a.isContainerConstructor(t5) || a.isContainerInstance(t5)):
        i4 = "a-container-abstractions";
        break;
      case (a.isComponentConstructor(t5) || a.isComponentInstance(t5)):
        i4 = "a-component-abstractions";
        break;
    }
    let p3 = `CONCEPT_ABSTRACTION::${s3}`, d4 = _4.get(i4) ? new m().from(_4.get(i4)) : new m(), A4 = [...d4.get(p3) || []], h4 = A4.findIndex((R3) => R3.handler === r4), Y2 = { name: p3, handler: r4, behavior: e.behavior || "sync", throwOnError: e.throwOnError !== void 0 ? e.throwOnError : true, before: a.isArray(e.before) ? new RegExp(`^${e.before.join("|").replace(/\./g, "\\.")}$`).source : e.before instanceof RegExp ? e.before.source : "", after: a.isArray(e.after) ? new RegExp(`^${e.after.join("|").replace(/\./g, "\\.")}$`).source : e.after instanceof RegExp ? e.after.source : "", override: a.isArray(e.override) ? new RegExp(`^${e.override.join("|").replace(/\./g, "\\.")}$`).source : e.after instanceof RegExp ? e.after.source : "" };
    h4 !== -1 ? A4[h4] = Y2 : A4.push(Y2), d4.set(p3, A4), c.meta(t5).set(i4, d4);
  };
}
__name(Pe, "Pe");
var _a34;
var b = (_a34 = class {
  constructor(e) {
    this._featuresMap = /* @__PURE__ */ new Map();
    this._index = 0;
    this._name = e.name, e.containers.map((t5) => {
      let r4 = c.abstractionTemplate(this._name, t5), n2 = new x({ name: this._name, component: t5, template: r4 });
      return this._featuresMap.set(t5, n2), n2;
    }), this._current = this._featuresMap.values().next().value;
  }
  static get Extend() {
    return Pe;
  }
  get name() {
    return this._name;
  }
  get feature() {
    return this._current;
  }
  get isDone() {
    return !this.feature || this._index >= this._featuresMap.size;
  }
  [Symbol.iterator]() {
    return { next: /* @__PURE__ */ __name(() => this.isDone ? (this._current = void 0, { value: void 0, done: true }) : (this._current = Array.from(this._featuresMap.values())[this._index], { value: this._current, done: false }), "next") };
  }
  next(e) {
    if (this._index >= this._featuresMap.size) return;
    let t5 = Array.from(this._featuresMap.values()).indexOf(e);
    this._index = t5 + 1;
  }
  async process(e) {
    if (!this.isDone) for (let [t5, r4] of this._featuresMap.entries()) await r4.process(e || t5.scope);
  }
}, __name(_a34, "b"), _a34);
var Re = ((_4) => (_4.Run = "run", _4.Build = "build", _4.Publish = "publish", _4.Deploy = "deploy", _4.Load = "load", _4.Start = "start", _4.Stop = "stop", _4))(Re || {});
var je = ((e) => (e.LIFECYCLE = "a-component-extensions", e))(je || {});
var _a35;
var Ie = (_a35 = class {
  constructor(e) {
    this.props = e;
    this._name = e.name || c.root.name, e.components && e.components.length && e.components.forEach((t5) => this.scope.register(t5)), e.fragments && e.fragments.length && e.fragments.forEach((t5) => this.scope.register(t5)), e.entities && e.entities.length && e.entities.forEach((t5) => this.scope.register(t5)), this._containers = e.containers || [];
  }
  static Load(e) {
    return b.Extend("load", e);
  }
  static Publish(e) {
    return b.Extend("publish");
  }
  static Deploy(e) {
    return b.Extend("deploy", e);
  }
  static Build(e) {
    return b.Extend("build", e);
  }
  static Run(e) {
    return b.Extend("run", e);
  }
  static Start(e) {
    return b.Extend("start", e);
  }
  static Stop(e) {
    return b.Extend("stop", e);
  }
  get name() {
    return c.root.name;
  }
  get scope() {
    return c.root;
  }
  get register() {
    return this.scope.register.bind(this.scope);
  }
  get resolve() {
    return this.scope.resolve.bind(this.scope);
  }
  async load(e) {
    await new b({ name: "load", containers: this._containers }).process(e);
  }
  async run(e) {
    await new b({ name: "run", containers: this._containers }).process(e);
  }
  async start(e) {
    await new b({ name: "start", containers: this._containers }).process(e);
  }
  async stop(e) {
    await new b({ name: "stop", containers: this._containers }).process(e);
  }
  async build(e) {
    await new b({ name: "build", containers: this._containers }).process(e);
  }
  async deploy(e) {
    await new b({ name: "deploy", containers: this._containers }).process(e);
  }
  async publish(e) {
    await new b({ name: "publish", containers: this._containers }).process(e);
  }
  async call(e, t5) {
    return await new x({ name: e, component: t5 }).process();
  }
}, __name(_a35, "Ie"), _a35);
var _a36;
var L = (_a36 = class extends P {
}, __name(_a36, "L"), _a36);
L.InvalidInjectionTarget = "Invalid target for A-Inject decorator", L.MissingInjectionTarget = "Missing target for A-Inject decorator";
function ke(s3, e) {
  if (!s3) throw new L(L.MissingInjectionTarget, "A-Inject decorator is missing the target to inject");
  return function(t5, r4, n2) {
    let o3 = l.getComponentName(t5);
    if (!a.isTargetAvailableForInjection(t5)) throw new L(L.InvalidInjectionTarget, `A-Inject cannot be used on the target of type ${typeof t5} (${o3})`);
    let i4 = r4 ? String(r4) : "constructor", _4;
    switch (true) {
      case (a.isComponentConstructor(t5) || a.isComponentInstance(t5)):
        _4 = "a-component-injections";
        break;
      case a.isContainerInstance(t5):
        _4 = "a-container-injections";
        break;
      case a.isEntityInstance(t5):
        _4 = "a-component-injections";
        break;
    }
    let p3 = c.meta(t5).get(_4), d4 = p3 ? p3.clone() : new m(), A4 = d4.get(i4) ? [...d4.get(i4)] : [];
    A4[n2] = s3 instanceof v ? s3 : new v(s3, e), d4.set(i4, A4), c.meta(t5).set(_4, d4);
  };
}
__name(ke, "ke");

// node_modules/@adaas/a-utils/dist/browser/chunk-EQQGB2QZ.mjs
var __defProp2 = Object.defineProperty;
var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
var __decorateClass2 = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc2(target, key) : target;
  for (var i4 = decorators.length - 1, decorator; i4 >= 0; i4--)
    if (decorator = decorators[i4])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp2(target, key, result);
  return result;
}, "__decorateClass");
var __decorateParam2 = /* @__PURE__ */ __name((index, decorator) => (target, key) => decorator(target, key, index), "__decorateParam");

// node_modules/@adaas/a-frame/dist/browser/chunk-6WAOMX7M.mjs
var t = "0.1.1";

// node_modules/@adaas/a-frame/dist/browser/chunk-RWQSCROK.mjs
var _a37;
var A = (_a37 = class extends V {
  get A_FRAME_TOKEN() {
    return window.A_FRAME_TOKEN || "";
  }
  get A_FRAME_SERVER_URL() {
    return window.A_FRAME_SERVER_URL || "http://localhost:3000";
  }
  get A_FRAME_VERSION() {
    return t || "0.0.1";
  }
  get A_FRAME_SERVER_API_KEY() {
    return window.A_FRAME_SERVER_API_KEY || "";
  }
  get A_FRAME_STORAGE_DIR() {
    return window.A_FRAME_STORAGE_DIR || ".aframe";
  }
  get A_FRAME_STORAGE_PATTERN() {
    return "";
  }
}, __name(_a37, "A"), _a37);

// node_modules/@adaas/a-frame/dist/browser/chunk-VSSANMPF.mjs
var t2 = { Load: "_A_FRAME_CREDENTIALS_LOAD", Save: "_A_FRAME_CREDENTIALS_SAVE", Destroy: "_A_FRAME_CREDENTIALS_DESTROY" };
var _a38;
var r = (_a38 = class extends N {
  static get concept() {
    return "a-frame";
  }
  get credentialId() {
    return this._credentialId;
  }
  get name() {
    return this._name;
  }
  get description() {
    return this._description;
  }
  get encryptionKey() {
    return this._encryptionKey;
  }
  get algorithm() {
    return this._algorithm;
  }
  get keyEncoding() {
    return this._keyEncoding;
  }
  get usageNote() {
    return this._usageNote;
  }
  get serverVersion() {
    return this._serverVersion;
  }
  get isAuthenticated() {
    return !!this._credentialId;
  }
  load(e) {
    return this.call(t2.Load, e);
  }
  save(e) {
    return this.call(t2.Save, e);
  }
  destroy(e) {
    return this.call(t2.Destroy, e);
  }
  fromNew(e) {
    this.aseid = this.generateASEID({ id: e.id, scope: "a-frame" }), this._credentialId = e.id, this._name = e.name, this._description = e.description, this._encryptionKey = e.encryption_key, this._algorithm = e.algorithm, this._keyEncoding = e.key_encoding, this._usageNote = e.usage_note, this._serverVersion = e.server_version;
  }
  fromJSON(e) {
    this._credentialId = e.credentialId, this._name = e.name, this._description = e.description, this._algorithm = e.algorithm, this._keyEncoding = e.key_encoding, this._serverVersion = e.serverVersion, this._encryptionKey = "";
  }
  toJSON() {
    return { ...super.toJSON(), credentialId: this._credentialId, name: this._name, description: this._description, algorithm: this._algorithm, key_encoding: this._keyEncoding, serverVersion: this._serverVersion };
  }
}, __name(_a38, "r"), _a38);

// node_modules/@adaas/a-frame/dist/browser/chunk-INS7RO3B.mjs
var _a39;
var y2 = (_a39 = class extends F {
  static getSubtle() {
    return globalThis.crypto.subtle;
  }
  static bytes(t5) {
    return t5.buffer instanceof ArrayBuffer ? t5 : new Uint8Array(t5);
  }
  static async importKey(t5) {
    let e = _a39.base64ToBytes(t5);
    return _a39.getSubtle().importKey("raw", e.buffer, { name: "AES-GCM", length: 256 }, false, ["encrypt", "decrypt"]);
  }
  static async encryptBytes(t5, e) {
    let n2 = await _a39.importKey(e), s3 = new Uint8Array(12);
    globalThis.crypto.getRandomValues(s3);
    let i4 = new Uint8Array(await _a39.getSubtle().encrypt({ name: "AES-GCM", iv: s3, tagLength: 128 }, n2, _a39.bytes(t5))), a7 = i4.slice(0, i4.length - 16), c3 = i4.slice(i4.length - 16), o3 = new Uint8Array(28 + a7.length);
    return o3.set(s3, 0), o3.set(c3, 12), o3.set(a7, 28), o3;
  }
  static async encrypt(t5, e) {
    let n2 = new TextEncoder().encode(t5), s3 = await _a39.encryptBytes(n2, e);
    return _a39.bytesToBase64(s3);
  }
  static async decryptBytes(t5, e) {
    if (t5.length < 28) throw new Error("Payload too short to decrypt");
    let n2 = await _a39.importKey(e), s3 = t5.slice(0, 12), i4 = t5.slice(12, 28), a7 = t5.slice(28), c3 = new Uint8Array(a7.length + 16);
    c3.set(a7, 0), c3.set(i4, a7.length);
    let o3 = await _a39.getSubtle().decrypt({ name: "AES-GCM", iv: _a39.bytes(s3), tagLength: 128 }, n2, c3);
    return new Uint8Array(o3);
  }
  static async decrypt(t5, e) {
    let n2 = _a39.base64ToBytes(t5), s3 = await _a39.decryptBytes(n2, e);
    return new TextDecoder().decode(s3);
  }
  static async sha256hex(t5) {
    let e = new TextEncoder().encode(t5), n2 = await _a39.getSubtle().digest("SHA-256", e);
    return _a39.bytesToHex(new Uint8Array(n2));
  }
  static bytesToBase64(t5) {
    let e = "";
    for (let n2 of t5) e += String.fromCharCode(n2);
    return btoa(e);
  }
  static base64ToBytes(t5) {
    let e = atob(t5), n2 = new Uint8Array(e.length);
    for (let s3 = 0; s3 < e.length; s3++) n2[s3] = e.charCodeAt(s3);
    return n2;
  }
  static bytesToHex(t5) {
    return Array.from(t5).map((e) => e.toString(16).padStart(2, "0")).join("");
  }
}, __name(_a39, "r"), _a39);

// node_modules/@adaas/a-frame/dist/browser/chunk-H6OZP4ZV.mjs
var _a40;
var a2 = (_a40 = class {
  static fnv1a(r4) {
    let t5 = 2166136261;
    for (let n2 = 0; n2 < r4.length; n2++) t5 ^= r4.charCodeAt(n2), t5 = t5 * 16777619 >>> 0;
    return t5.toString(16).padStart(8, "0");
  }
}, __name(_a40, "a"), _a40);

// node_modules/@adaas/a-frame/dist/browser/chunk-46LRNZRG.mjs
var _a41;
var n = (_a41 = class extends N {
  static get concept() {
    return "a-frame";
  }
  constructor(t5) {
    super(), this.values = t5 instanceof Float32Array ? t5 : new Float32Array(t5);
  }
  get dimensions() {
    return this.values.length;
  }
  get length() {
    return this.values.length;
  }
  isEqualTo(t5) {
    if (this.length !== t5.length) return false;
    for (let e = 0; e < this.length; e++) if (this.values[e] !== t5.values[e]) return false;
    return true;
  }
  magnitude() {
    let t5 = 0;
    for (let e = 0; e < this.values.length; e++) t5 += this.values[e] ** 2;
    return Math.sqrt(t5);
  }
  normalize() {
    let t5 = this.magnitude();
    if (t5 === 0) return this;
    let e = new Float32Array(this.length);
    for (let r4 = 0; r4 < this.length; r4++) e[r4] = this.values[r4] / t5;
    return new _a41(e);
  }
  dot(t5) {
    this.assertSameLength(t5);
    let e = 0;
    for (let r4 = 0; r4 < this.length; r4++) e += this.values[r4] * t5.values[r4];
    return e;
  }
  cosineSimilarity(t5) {
    let e = this.magnitude(), r4 = t5.magnitude();
    return e === 0 || r4 === 0 ? 0 : this.normalize().dot(t5.normalize());
  }
  assertSameLength(t5) {
    if (this.length !== t5.length) throw new Error(`Embedding dimension mismatch: ${this.length} vs ${t5.length}`);
  }
  toArray() {
    return Array.from(this.values);
  }
}, __name(_a41, "s"), _a41);

// node_modules/@adaas/a-frame/dist/browser/chunk-G7MKGKG5.mjs
var a3 = { ANTARES: "adaas-antares-v1", VEGA: "adaas-vega-v1", RIGEL: "adaas-rigel-v1", PULSAR: "adaas-pulsar-v1", LYRA: "adaas-lyra-v1", NOVA: "adaas-nova-v1" };

// node_modules/@adaas/a-frame/dist/browser/chunk-CT67Y46H.mjs
var _ = "default";
var r2 = { Load: "_A_FRAME_NAMESPACE_LOAD", Save: "_A_FRAME_NAMESPACE_SAVE", Embed: "_A_FRAME_NAMESPACE_EMBED", Destroy: "_A_FRAME_NAMESPACE_DESTROY" };
var _a42;
var d = (_a42 = class extends N {
  static get concept() {
    return "a-frame";
  }
  get id() {
    return this.aseid.id;
  }
  get name() {
    return this._name;
  }
  get hash() {
    return this._hash;
  }
  get description() {
    return this._description;
  }
  get metadata() {
    return this._metadata || {};
  }
  get vector() {
    return this._vector;
  }
  get embedding() {
    return this._vector?.values ?? null;
  }
  get aFrameServerVersion() {
    return this._aFrameServerVersion;
  }
  get aFrameVersion() {
    return this._aFrameVersion;
  }
  get isEmbed() {
    return this._vector !== void 0;
  }
  get requestedModel() {
    return this._requestedModel;
  }
  save(e) {
    return this.call(r2.Save, e);
  }
  destroy(e) {
    return this.call(r2.Destroy, e);
  }
  async load(e) {
    return this.call(r2.Load, e);
  }
  update(e) {
    e.name && (this._name = e.name), e.description !== void 0 && (this._description = e.description), e.metadata !== void 0 && (this._metadata = e.metadata);
  }
  embed(e) {
    return console.log(`Embedding namespace "${this._name}"...`), this.call(r2.Embed, e);
  }
  fromNew(e) {
    this.aseid = this.generateASEID({ id: y.toKebabCase(e.name), scope: "a-frame" }), this._name = e.name;
    let t5 = this._name + (e.description || "") + (e.metadata ? JSON.stringify(e.metadata) : "");
    this._hash = a2.fnv1a(t5), this._description = e.description, this._metadata = e.metadata, this._requestedModel = e.model ?? a3.ANTARES;
  }
  fromJSON(e) {
    this._name = e.name, this._hash = e.hash, this._description = e.description, this._metadata = e.metadata, this._vector = e.embedding ? new n(e.embedding) : void 0, this._embeddedAt = e.embeddedAt, this._embeddingModel = e.embeddingModel, this._credentialId = e.credentialId, this._aFrameVersion = e.aFrameVersion, this._aFrameServerVersion = e.aFrameServerVersion;
  }
  toJSON() {
    return { ...super.toJSON(), hash: this._hash, name: this._name, description: this._description, metadata: this._metadata, embedding: this._vector?.values, embeddedAt: this._embeddedAt ?? Date.now(), embeddingModel: this._embeddingModel, credentialId: this._credentialId, aFrameVersion: this._aFrameVersion, aFrameServerVersion: this._aFrameServerVersion };
  }
  hydrateFromRecord(e) {
    if (e.hash !== this._hash) throw new Error(`A_FrameNamespace.hydrateFromRecord: hash mismatch for "${this._name}" (expected ${this._hash}, got ${e.hash})`);
    this._vector = new n(e.embedding), this._embeddedAt = e.embeddedAt;
  }
  hydrateFromEmbedding(e, t5) {
    this._vector = new n(e), this._embeddedAt = Date.now(), t5 && (this._embeddingModel = t5.model, this._credentialId = t5.credentialId ?? void 0, this._aFrameVersion = t5.aFrameVersion, this._aFrameServerVersion = t5.aFrameServerVersion);
  }
  toString() {
    let e = [`// namespace: ${this._name}`];
    return this._description && e.push(`// ${this._description}`), e.join(`
`);
  }
}, __name(_a42, "d"), _a42);

// node_modules/@adaas/a-frame/dist/browser/chunk-BIBPE2GT.mjs
var r3 = { Load: "_A_FRAME_DEFINITION_LOAD", Save: "_A_FRAME_DEFINITION_SAVE", Embed: "_A_FRAME_DEFINITION_EMBED", Destroy: "_A_FRAME_DEFINITION_DESTROY" };
var _a43;
var s = (_a43 = class extends N {
  static get concept() {
    return "a-frame";
  }
  get id() {
    return this.aseid.id;
  }
  get type() {
    return this._type;
  }
  get name() {
    return this._name;
  }
  get description() {
    return this._description;
  }
  get dependency() {
    return new v(this._dependency);
  }
  get source() {
    return this._source;
  }
  get vector() {
    return this._vector;
  }
  get namespace() {
    return this._namespace;
  }
  get metadata() {
    return this._metadata || {};
  }
  get hash() {
    return this._hash;
  }
  get date() {
    return this._date;
  }
  get model() {
    return this._model;
  }
  get requestedModel() {
    return this._requestedModel;
  }
  get credentialId() {
    return this._credentialId;
  }
  get aFrameVersion() {
    return this._aFrameVersion;
  }
  get aFrameServerVersion() {
    return this._aFrameServerVersion;
  }
  get aFrameMeta() {
    return this._aFrameMeta;
  }
  get isEmbed() {
    return this._vector !== void 0;
  }
  save(e) {
    return this.call(r3.Save, e);
  }
  destroy(e) {
    return this.call(r3.Destroy, e);
  }
  load(e) {
    return this.call(r3.Load, e);
  }
  update(e) {
    e.source && (this._source = e.source), e.description !== void 0 && (this._description = e.description), e.metadata !== void 0 && (this._metadata = e.metadata), e.namespace !== void 0 && (this._namespace = e.namespace);
  }
  embed(e) {
    return this.call(r3.Embed, e);
  }
  fromNew(e) {
    this._type = e.type, this.aseid = this.generateASEID({ id: y.toKebabCase(e.dependency + "-" + e.name), scope: "a-frame" }), this._name = e.name;
    let t5 = this._name + "//" + (e.description || "") + "//" + (e.metadata ? JSON.stringify(e.metadata) : "") + "//" + e.source + "//Namespace: " + e.namespace.id;
    this._hash = a2.fnv1a(t5), this._source = e.source, this._description = e.description, this._namespace = e.namespace, this._metadata = e.metadata, this._dependency = e.dependency, this._requestedModel = e.model ?? a3.ANTARES;
  }
  fromJSON(e) {
    this._name = e.name, this._hash = e.hash, this._source = e.source || "", this._description = e.description, this._metadata = e.metadata, this._vector = e.embedding ? new n(e.embedding) : void 0, this._date = e.date, this._model = e.model, this._credentialId = e.credentialId, this._aFrameVersion = e.aFrameVersion, this._aFrameServerVersion = e.aFrameServerVersion, this._aFrameMeta = e.aFrameMeta;
  }
  toJSON() {
    return { ...super.toJSON(), hash: this._hash, name: this._name, source: this._source, description: this._description, metadata: this._metadata, namespace: this._namespace.aseid.toString(), embedding: this._vector?.values, date: this._date ?? (/* @__PURE__ */ new Date()).toISOString(), model: this._model, credentialId: this._credentialId, aFrameVersion: this._aFrameVersion, aFrameServerVersion: this._aFrameServerVersion, aFrameMeta: this._aFrameMeta };
  }
  hydrateFromEmbedding(e, t5) {
    this._vector = new n(e), this._date = (/* @__PURE__ */ new Date()).toISOString(), t5 && (this._model = t5.model, this._credentialId = t5.credentialId ?? void 0, this._aFrameVersion = t5.aFrameVersion, this._aFrameServerVersion = t5.aFrameServerVersion, t5.aFrameMeta && (this._aFrameMeta = t5.aFrameMeta));
  }
  toString() {
    let e = [];
    return e.push(`// ${this._name}`), this._description && e.push(`// ${this._description}`), e.push(this._source), e.join(`
`);
  }
}, __name(_a43, "s"), _a43);

// node_modules/@adaas/a-frame/dist/browser/chunk-DMGQW3AO.mjs
var h = Object.defineProperty;
var i = Object.getOwnPropertyDescriptor;
var j2 = /* @__PURE__ */ __name((e, b2, d4, c3) => {
  for (var a7 = c3 > 1 ? void 0 : c3 ? i(b2, d4) : b2, f4 = e.length - 1, g2; f4 >= 0; f4--) (g2 = e[f4]) && (a7 = (c3 ? g2(b2, d4, a7) : g2(a7)) || a7);
  return c3 && a7 && h(b2, d4, a7), a7;
}, "j");
var k2 = /* @__PURE__ */ __name((e, b2) => (d4, c3) => b2(d4, c3, e), "k");

// node_modules/@adaas/a-frame/dist/browser/chunk-EFC7OUNO.mjs
var _a44;
var E2 = (_a44 = class extends V {
  constructor() {
    super({ name: "a-frame-context" });
  }
  get encryptionKey() {
    return this._credentials?.encryptionKey;
  }
  get serverVersion() {
    return this._credentials?.serverVersion;
  }
  isAuthenticated() {
    return !!this._credentials?.isAuthenticated;
  }
  setCredentials(o3) {
    if (o3.error || !o3.response) {
      this._credentials = void 0;
      return;
    }
    this._credentials = new r(o3.response);
  }
}, __name(_a44, "E"), _a44);
var u2 = { SaveDefinitions: "_A_FRAME_STORAGE_SAVE", LoadDefinitions: "_A_FRAME_STORAGE_LOAD", DestroyDefinitions: "_A_FRAME_STORAGE_DESTROY", SaveNamespaces: "_A_FRAME_STORAGE_SAVE_NAMESPACES", LoadNamespaces: "_A_FRAME_STORAGE_LOAD_NAMESPACES", DestroyNamespaces: "_A_FRAME_STORAGE_DESTROY_NAMESPACES" };
var _a45;
var g = (_a45 = class extends V {
  constructor(o3) {
    super({ name: "a-frame-storage-operation" }), this._params = o3;
  }
  get result() {
    return this._result;
  }
  get error() {
    return this._error;
  }
  get params() {
    return this._params;
  }
  complete(o3) {
    this._result = o3;
  }
  fail(o3) {
    this._error = o3;
  }
}, __name(_a45, "g"), _a45);
var _a46;
var A2 = (_a46 = class extends P {
}, __name(_a46, "A"), _a46);
A2.SaveDefinitionFailed = "SaveDefinitionFailed", A2.LoadDefinitionsFailed = "LoadDefinitionsFailed", A2.DestroyDefinitionsFailed = "DestroyDefinitionsFailed", A2.SaveNamespaceFailed = "SaveNamespaceFailed", A2.LoadNamespacesFailed = "LoadNamespacesFailed", A2.DestroyNamespacesFailed = "DestroyNamespacesFailed";
var _a47;
var R = (_a47 = class extends F {
  async saveDefinitions(o3) {
    let e = new g({ records: o3 }), t5 = new D({ name: "A_FrameStorage.saveDefinitions", fragments: [e] }).inherit(c.scope(this));
    try {
      return await this.call(u2.SaveDefinitions, t5), t5.destroy(), e;
    } catch {
      return e.fail(new A2({ title: A2.SaveDefinitionFailed, description: "Failed to save definition records." })), t5.destroy(), e;
    }
  }
  async loadDefinitions(o3, e) {
    let t5 = new g({ namespaceId: o3 }), a7 = new D({ name: "A_FrameStorage.loadDefinitions", fragments: [t5] }).inherit(c.scope(this));
    try {
      return await this.call(u2.LoadDefinitions, a7), a7.destroy(), t5;
    } catch {
      return t5.fail(new A2({ title: A2.LoadDefinitionsFailed, description: "Failed to load definition records." })), a7.destroy(), t5;
    }
  }
  async destroyDefinitions(o3, e) {
    let t5 = new g({ namespaceId: o3, definitionId: e }), a7 = new D({ name: "A_FrameStorage.destroyDefinitions", fragments: [t5] }).inherit(c.scope(this));
    try {
      return await this.call(u2.DestroyDefinitions, a7), a7.destroy(), t5;
    } catch {
      return t5.fail(new A2({ title: A2.DestroyDefinitionsFailed, description: "Failed to destroy definition records." })), a7.destroy(), t5;
    }
  }
  async saveNamespaces(o3) {
    let e = new g({ records: o3 }), t5 = new D({ name: "A_FrameStorage.saveNamespaces", fragments: [e] }).inherit(c.scope(this));
    try {
      return await this.call(u2.SaveNamespaces, t5), t5.destroy(), e;
    } catch {
      return e.fail(new A2({ title: A2.SaveNamespaceFailed, description: "Failed to save namespace records." })), t5.destroy(), e;
    }
  }
  async loadNamespaces(o3) {
    let e = new g({ namespaces: o3 }), t5 = new D({ name: "A_FrameStorage.loadNamespaces", fragments: [e] }).inherit(c.scope(this));
    try {
      return await this.call(u2.LoadNamespaces, t5), t5.destroy(), e;
    } catch {
      return e.fail(new A2({ title: A2.LoadNamespacesFailed, description: "Failed to load namespace records." })), t5.destroy(), e;
    }
  }
  async destroyNamespaces(o3) {
    let e = new g({ namespaces: o3 }), t5 = new D({ name: "A_FrameStorage.destroyNamespaces", fragments: [e] }).inherit(c.scope(this));
    try {
      return await this.call(u2.DestroyNamespaces, t5), t5.destroy(), e;
    } catch {
      return e.fail(new A2({ title: A2.DestroyNamespacesFailed, description: "Failed to destroy namespace records." })), t5.destroy(), e;
    }
  }
}, __name(_a47, "R"), _a47);
var _a48;
var D2 = (_a48 = class extends V {
  constructor() {
    if (_a48._instance) return _a48._instance;
    super({ name: "a-frame-browser-storage-blobs" });
    this.store = /* @__PURE__ */ new Map();
    this.namespaceBlob = null;
    this.plainStore = /* @__PURE__ */ new Map();
    this.plainNamespaceRecords = null;
    this.bundleMeta = null;
  }
  static get instance() {
    return _a48._instance || (_a48._instance = new _a48()), _a48._instance;
  }
  static fromBundle(e) {
    let t5 = _a48.instance;
    return t5.seedFromBundle(e), t5;
  }
  get hasBundleData() {
    return this.plainStore.size > 0 || (this.plainNamespaceRecords?.length ?? 0) > 0;
  }
  seedFromBundle(e) {
    for (let [t5, a7] of Object.entries(e.records ?? {})) this.plainStore.set(t5, a7.map((i4) => ({ ...i4, embedding: i4.embedding.length > 0 ? new Float32Array(i4.embedding) : void 0 })));
    e.namespaceRecords?.length && (this.plainNamespaceRecords = e.namespaceRecords.map((t5) => ({ ...t5, embedding: t5.embedding.length > 0 ? new Float32Array(t5.embedding) : void 0 }))), this.bundleMeta = { aFrameVersion: e.aFrameVersion, serverVersion: e.serverVersion, builtAt: e.builtAt };
  }
}, __name(_a48, "f"), _a48);
var C2 = new TextEncoder();
var U2 = new TextDecoder();
var _a49;
var w2 = (_a49 = class extends V {
  constructor() {
    super(...arguments);
    this.enc = new TextEncoder();
    this.dec = new TextDecoder();
    this.A_FRAME_FILE_MAGIC = 1162691147;
    this.A_FRAME_FILE_VERSION = 1;
    this.A_FRAME_HEADER_SIZE = 20;
  }
  static get fileExtension() {
    return ".aframe";
  }
  getDefinitionsFileName(e) {
    return `${e}.definitions${_a49.fileExtension}`;
  }
  getNamespaceFileName() {
    return `.namespaces${_a49.fileExtension}`;
  }
  static get definitionsFilePattern() {
    return `*.definitions${_a49.fileExtension}`;
  }
  encodePayload(e) {
    let t5 = [];
    if (e.some((r4) => !r4.embedding)) throw new Error("All records must have embeddings to be encoded");
    let a7 = new Uint8Array(this.A_FRAME_HEADER_SIZE), i4 = new DataView(a7.buffer);
    i4.setUint32(0, this.A_FRAME_FILE_MAGIC, true), a7[4] = this.A_FRAME_FILE_VERSION, i4.setUint32(5, e.length, true);
    let d4 = e[0]?.embedding.length ?? 0;
    i4.setUint16(9, d4, true), t5.push(a7);
    for (let r4 of e) {
      let _4 = C2.encode(r4.aseid.toString()), y3 = C2.encode(r4.name), x2 = JSON.stringify({ hash: r4.hash, source: r4.source, type: r4.type, description: r4.description, metadata: r4.metadata, namespace: r4.namespace, date: r4.date, model: r4.model, credentialId: r4.credentialId, aFrameVersion: r4.aFrameVersion, aFrameServerVersion: r4.aFrameServerVersion }), N3 = C2.encode(x2), M3 = 2 + _4.length + 2 + y3.length + r4.embedding.length * 4 + 4 + N3.length, F2 = new Uint8Array(M3), h4 = new DataView(F2.buffer), s3 = 0;
      h4.setUint16(s3, _4.length, true), s3 += 2, F2.set(_4, s3), s3 += _4.length, h4.setUint16(s3, y3.length, true), s3 += 2, F2.set(y3, s3), s3 += y3.length;
      for (let S3 = 0; S3 < r4.embedding.length; S3++) h4.setFloat32(s3, r4.embedding[S3], true), s3 += 4;
      h4.setUint32(s3, N3.length, true), s3 += 4, F2.set(N3, s3), t5.push(F2);
    }
    let p3 = t5.reduce((r4, _4) => r4 + _4.length, 0), l3 = new Uint8Array(p3), n2 = 0;
    for (let r4 of t5) l3.set(r4, n2), n2 += r4.length;
    return l3;
  }
  decodePayload(e) {
    if (e.length < this.A_FRAME_HEADER_SIZE) throw new Error("Corrupt index: too short for header");
    let t5 = new DataView(e.buffer, e.byteOffset, e.byteLength), a7 = t5.getUint32(0, true);
    if (a7 !== this.A_FRAME_FILE_MAGIC) throw new Error(`Corrupt index: bad magic 0x${a7.toString(16)}`);
    let i4 = e[4];
    if (i4 !== this.A_FRAME_FILE_VERSION) throw new Error(`Unsupported index version: ${i4}`);
    let d4 = t5.getUint32(5, true), p3 = t5.getUint16(9, true), l3 = [], n2 = this.A_FRAME_HEADER_SIZE;
    for (let r4 = 0; r4 < d4; r4++) {
      let _4 = t5.getUint16(n2, true);
      n2 += 2;
      let y3 = U2.decode(e.slice(n2, n2 + _4));
      n2 += _4;
      let x2 = t5.getUint16(n2, true);
      n2 += 2;
      let N3 = U2.decode(e.slice(n2, n2 + x2));
      n2 += x2;
      let M3 = new Float32Array(p3);
      for (let S3 = 0; S3 < p3; S3++) M3[S3] = t5.getFloat32(n2, true), n2 += 4;
      let F2 = t5.getUint32(n2, true);
      n2 += 4;
      let h4 = U2.decode(e.slice(n2, n2 + F2));
      n2 += F2;
      let s3 = JSON.parse(h4);
      l3.push({ aseid: y3, hash: s3.hash ?? y3, name: N3, type: s3.type, embedding: M3, source: s3.source, description: s3.description, metadata: s3.metadata, namespace: s3.namespace, date: s3.date, model: s3.model, credentialId: s3.credentialId, aFrameVersion: s3.aFrameVersion, aFrameServerVersion: s3.aFrameServerVersion });
    }
    return l3;
  }
  encodeNamespacePayload(e) {
    let t5 = [];
    if (e.some((r4) => !r4.embedding)) throw new Error("All records must have embeddings to be encoded");
    let a7 = new Uint8Array(this.A_FRAME_HEADER_SIZE), i4 = new DataView(a7.buffer);
    i4.setUint32(0, this.A_FRAME_FILE_MAGIC, true), a7[4] = this.A_FRAME_FILE_VERSION, i4.setUint32(5, e.length, true);
    let d4 = e[0]?.embedding.length ?? 0;
    i4.setUint16(9, d4, true), t5.push(a7);
    for (let r4 of e) {
      let _4 = C2.encode(r4.aseid.toString()), y3 = C2.encode(r4.name), x2 = JSON.stringify({ hash: r4.hash, description: r4.description, metadata: r4.metadata, embeddedAt: r4.embeddedAt, embeddingModel: r4.embeddingModel, credentialId: r4.credentialId, aFrameVersion: r4.aFrameVersion, aFrameServerVersion: r4.aFrameServerVersion }), N3 = C2.encode(x2), M3 = 2 + _4.length + 2 + y3.length + r4.embedding.length * 4 + 4 + N3.length, F2 = new Uint8Array(M3), h4 = new DataView(F2.buffer), s3 = 0;
      h4.setUint16(s3, _4.length, true), s3 += 2, F2.set(_4, s3), s3 += _4.length, h4.setUint16(s3, y3.length, true), s3 += 2, F2.set(y3, s3), s3 += y3.length;
      for (let S3 = 0; S3 < r4.embedding.length; S3++) h4.setFloat32(s3, r4.embedding[S3], true), s3 += 4;
      h4.setUint32(s3, N3.length, true), s3 += 4, F2.set(N3, s3), t5.push(F2);
    }
    let p3 = t5.reduce((r4, _4) => r4 + _4.length, 0), l3 = new Uint8Array(p3), n2 = 0;
    for (let r4 of t5) l3.set(r4, n2), n2 += r4.length;
    return l3;
  }
  decodeNamespacePayload(e) {
    if (e.length < this.A_FRAME_HEADER_SIZE) throw new Error("Corrupt namespace index: too short for header");
    let t5 = new DataView(e.buffer, e.byteOffset, e.byteLength), a7 = t5.getUint32(0, true);
    if (a7 !== this.A_FRAME_FILE_MAGIC) throw new Error(`Corrupt namespace index: bad magic 0x${a7.toString(16)}`);
    let i4 = e[4];
    if (i4 !== this.A_FRAME_FILE_VERSION) throw new Error(`Unsupported namespace index version: ${i4}`);
    let d4 = t5.getUint32(5, true), p3 = t5.getUint16(9, true), l3 = [], n2 = this.A_FRAME_HEADER_SIZE;
    for (let r4 = 0; r4 < d4; r4++) {
      let _4 = t5.getUint16(n2, true);
      n2 += 2;
      let y3 = U2.decode(e.slice(n2, n2 + _4));
      n2 += _4;
      let x2 = t5.getUint16(n2, true);
      n2 += 2;
      let N3 = U2.decode(e.slice(n2, n2 + x2));
      n2 += x2;
      let M3 = new Float32Array(p3);
      for (let S3 = 0; S3 < p3; S3++) M3[S3] = t5.getFloat32(n2, true), n2 += 4;
      let F2 = t5.getUint32(n2, true);
      n2 += 4;
      let h4 = U2.decode(e.slice(n2, n2 + F2));
      n2 += F2;
      let s3 = JSON.parse(h4);
      l3.push({ aseid: y3, hash: s3.hash ?? y3, name: N3, embedding: M3, description: s3.description, metadata: s3.metadata, embeddedAt: s3.embeddedAt, embeddingModel: s3.embeddingModel, credentialId: s3.credentialId, aFrameVersion: s3.aFrameVersion, aFrameServerVersion: s3.aFrameServerVersion });
    }
    return l3;
  }
}, __name(_a49, "f"), _a49);
var _a50;
var v2 = (_a50 = class extends R {
  onLoad(o3, e) {
    e || o3.register(D2.instance);
  }
  async saveDefinitionsToMemory(o3, e, t5, a7, i4) {
    let d4 = e.params.records, p3 = d4[0].namespace, l3 = await this._loadDefinitionsFromMemory(i4.store, p3, t5.encryptionKey, a7), n2 = /* @__PURE__ */ new Map();
    for (let _4 of l3) n2.set(_4.aseid, _4);
    for (let _4 of d4) n2.set(_4.aseid.toString(), _4);
    let r4 = a7.encodePayload(Array.from(n2.values()));
    i4.store.set(p3, await y2.encryptBytes(r4, t5.encryptionKey)), e.complete({ saved: d4.length });
  }
  async loadDefinitionsFromMemory(o3, e, t5, a7, i4) {
    let d4 = e.params.namespaceId, p3 = await this._loadDefinitionsFromMemory(i4.store, d4, t5.encryptionKey, a7);
    e.complete({ records: p3 });
  }
  async destroyDefinitionsFromMemory(o3, e, t5, a7, i4) {
    let d4 = e.params.namespaceId, p3 = e.params.definitionId, n2 = (await this._loadDefinitionsFromMemory(i4.store, d4, t5.encryptionKey, a7)).filter((_4) => _4.aseid !== p3), r4 = a7.encodePayload(n2);
    i4.store.set(d4, await y2.encryptBytes(r4, t5.encryptionKey)), e.complete({ records: n2 });
  }
  async saveNamespacesToMemory(o3, e, t5, a7, i4) {
    let d4 = e.params.records, p3 = await this._loadNamespacesFromMemory(i4, t5.encryptionKey, a7), l3 = /* @__PURE__ */ new Map();
    for (let r4 of p3) l3.set(r4.aseid, r4);
    for (let r4 of d4) l3.set(r4.aseid.toString(), r4);
    let n2 = a7.encodeNamespacePayload(Array.from(l3.values()));
    i4.namespaceBlob = await y2.encryptBytes(n2, t5.encryptionKey), e.complete({ success: true });
  }
  async loadNamespacesFromMemory(o3, e, t5, a7, i4) {
    let d4 = e.params.namespaces, p3 = await this._loadNamespacesFromMemory(i4, t5.encryptionKey, a7);
    e.complete({ records: d4 ? p3.filter((l3) => d4.includes(l3.name)) : p3 });
  }
  async destroyNamespacesFromMemory(o3, e, t5, a7, i4) {
    let d4 = e.params.namespaces, l3 = (await this._loadNamespacesFromMemory(i4, t5.encryptionKey, a7)).filter((r4) => !d4.includes(r4.aseid)), n2 = a7.encodeNamespacePayload(l3);
    i4.namespaceBlob = await y2.encryptBytes(n2, t5.encryptionKey);
    try {
      for (let r4 of d4) i4.store.delete(r4);
      e.complete({ success: true });
    } catch {
      e.fail(new A2({ title: A2.DestroyNamespacesFailed, description: "Failed to destroy namespace records." })), e.complete({ success: false });
    }
  }
  async loadDefinitionFromBlobs(o3, e, t5, a7) {
    let i4 = a7.plainStore.get(o3.namespace.id);
    if (i4?.length) {
      let l3 = i4.find((n2) => n2.aseid === o3.aseid.toString());
      if (l3 && l3.hash === o3.hash) {
        o3.fromJSON(l3);
        return;
      }
    }
    if (!e.encryptionKey) return;
    let d4 = await this._loadDefinitionsFromMemory(a7.store, o3.namespace.id, e.encryptionKey, t5);
    if (d4.length === 0) return;
    let p3 = d4.find((l3) => l3.aseid === o3.aseid.toString());
    p3 && p3.hash === o3.hash && p3.aFrameServerVersion === e.serverVersion && o3.fromJSON(p3);
  }
  async loadNamespaceFromBlobs(o3, e, t5, a7) {
    if (a7.plainNamespaceRecords?.length) {
      let p3 = a7.plainNamespaceRecords.find((l3) => l3.aseid === o3.aseid.toString());
      if (p3 && p3.hash === o3.hash) {
        o3.fromJSON(p3);
        return;
      }
    }
    if (!e.encryptionKey) return;
    let i4 = await this._loadNamespacesFromMemory(a7, e.encryptionKey, t5);
    if (i4.length === 0) return;
    let d4 = i4.find((p3) => p3.aseid === o3.aseid.toString());
    d4 && d4.hash === o3.hash && d4.aFrameServerVersion === e.serverVersion && o3.fromJSON(d4);
  }
  async _loadDefinitionsFromMemory(o3, e, t5, a7) {
    let i4 = o3.get(e);
    if (!i4) return [];
    try {
      let d4 = await y2.decryptBytes(i4, t5);
      return a7.decodePayload(d4);
    } catch {
      return [];
    }
  }
  async _loadNamespacesFromMemory(o3, e, t5) {
    let a7 = o3.namespaceBlob;
    if (!a7) return [];
    try {
      let i4 = await y2.decryptBytes(a7, e);
      return t5.decodeNamespacePayload(i4);
    } catch {
      return [];
    }
  }
}, __name(_a50, "v"), _a50);
j2([Ie.Load(), k2(0, ke(D)), k2(1, ke(D2))], v2.prototype, "onLoad", 1), j2([x.Extend({ name: u2.SaveDefinitions, scope: [R] }), k2(0, ke(A)), k2(1, ke(g)), k2(2, ke(E2)), k2(3, ke(w2)), k2(4, ke(D2))], v2.prototype, "saveDefinitionsToMemory", 1), j2([x.Extend({ name: u2.LoadDefinitions, scope: [R] }), k2(0, ke(A)), k2(1, ke(g)), k2(2, ke(E2)), k2(3, ke(w2)), k2(4, ke(D2))], v2.prototype, "loadDefinitionsFromMemory", 1), j2([x.Extend({ name: u2.DestroyDefinitions, scope: [R] }), k2(0, ke(A)), k2(1, ke(g)), k2(2, ke(E2)), k2(3, ke(w2)), k2(4, ke(D2))], v2.prototype, "destroyDefinitionsFromMemory", 1), j2([x.Extend({ name: u2.SaveNamespaces, scope: [R] }), k2(0, ke(A)), k2(1, ke(g)), k2(2, ke(E2)), k2(3, ke(w2)), k2(4, ke(D2))], v2.prototype, "saveNamespacesToMemory", 1), j2([x.Extend({ name: u2.LoadNamespaces, scope: [R] }), k2(0, ke(A)), k2(1, ke(g)), k2(2, ke(E2)), k2(3, ke(w2)), k2(4, ke(D2))], v2.prototype, "loadNamespacesFromMemory", 1), j2([x.Extend({ name: u2.DestroyNamespaces, scope: [R] }), k2(0, ke(A)), k2(1, ke(g)), k2(2, ke(E2)), k2(3, ke(w2)), k2(4, ke(D2))], v2.prototype, "destroyNamespacesFromMemory", 1), j2([x.Extend({ name: r3.Load, scope: [s] }), k2(0, ke(H)), k2(1, ke(E2)), k2(2, ke(w2)), k2(3, ke(D2))], v2.prototype, "loadDefinitionFromBlobs", 1), j2([x.Extend({ name: r2.Load, scope: [d] }), k2(0, ke(H)), k2(1, ke(E2)), k2(2, ke(w2)), k2(3, ke(D2))], v2.prototype, "loadNamespaceFromBlobs", 1);

// node_modules/@adaas/a-frame/dist/browser/chunk-5TTVFB3G.mjs
var u3 = { debug: 10, info: 20, success: 20, warn: 30, error: 40 };
var f2 = { debug: "\xB7", info: "\u2139", success: "\u2714", warn: "\u26A0", error: "\u2716" };
var a4 = { debug: "color: #888;", info: "color: #06b;", success: "color: #2a7; font-weight: bold;", warn: "color: #c80;", error: "color: #c33; font-weight: bold;" };
var m2 = { progressBarWidth: 24, summaryTitle: "Summary", progressThrottleMs: 250 };
var _a51;
var d2 = (_a51 = class extends F {
  constructor(e = {}) {
    super();
    this.counters = /* @__PURE__ */ new Map();
    this.startTime = Date.now();
    this.level = e.level ?? "debug", this.prefix = e.prefix ?? "";
  }
  setLevel(e) {
    this.level = e;
  }
  shouldEmit(e) {
    return u3[e] >= u3[this.level];
  }
  emit(e, r4, o3) {
    this.shouldEmit(e) && this.write({ level: e, message: this.prefix ? `${this.prefix} ${r4}` : r4, timestamp: Date.now(), metadata: o3 });
  }
  debug(e, r4) {
    this.emit("debug", e, r4);
  }
  info(e, r4) {
    this.emit("info", e, r4);
  }
  success(e, r4) {
    this.emit("success", e, r4);
  }
  warn(e, r4) {
    this.emit("warn", e, r4);
  }
  error(e, r4) {
    this.emit("error", e, r4);
  }
  section(e) {
    this.info(`\u2500\u2500 ${e} \u2500\u2500`);
  }
  divider() {
    this.info("\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500");
  }
  increment(e, r4 = 1) {
    this.counters.set(e, (this.counters.get(e) ?? 0) + r4);
  }
  set(e, r4) {
    this.counters.set(e, r4);
  }
  get(e) {
    return this.counters.get(e) ?? 0;
  }
  resetTimer() {
    this.startTime = Date.now(), this.counters.clear();
  }
  elapsed() {
    let e = Date.now() - this.startTime;
    if (e < 1e3) return `${e}ms`;
    let r4 = e / 1e3;
    if (r4 < 60) return `${r4.toFixed(2)}s`;
    let o3 = Math.floor(r4 / 60);
    return `${o3}m ${(r4 - o3 * 60).toFixed(1)}s`;
  }
  summary(e = m2.summaryTitle) {
    this.section(e);
    let r4 = [...this.counters.keys()], o3 = r4.reduce((n2, g2) => Math.max(n2, g2.length), 7);
    for (let n2 of r4) this.info(`  ${n2.padEnd(o3)}  ${this.counters.get(n2)}`);
    this.info(`  ${"elapsed".padEnd(o3)}  ${this.elapsed()}`), this.divider();
  }
}, __name(_a51, "d"), _a51);
var _a52;
var _2 = (_a52 = class extends d2 {
  constructor(t5 = {}) {
    super(t5);
  }
  write(t5) {
    let e = f2[t5.level], r4 = a4[t5.level], o3 = t5.level === "error" ? console.error : t5.level === "warn" ? console.warn : console.log;
    t5.metadata && Object.keys(t5.metadata).length > 0 ? o3(`%c${e} ${t5.message}`, r4, t5.metadata) : o3(`%c${e} ${t5.message}`, r4);
  }
  section(t5) {
    console.log(`%c\u2504 ${t5} \u2504`, "color: #06b; font-weight: bold; padding: 2px 0;");
  }
  divider() {
    console.log("%c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500", "color: #aaa;");
  }
  summary(t5 = m2.summaryTitle) {
    this.section(t5);
    let e = {};
    for (let [r4, o3] of this.counters) e[r4] = o3;
    e.elapsed = this.elapsed(), console.table(e), this.divider();
  }
  progress(t5, e) {
    let r4 = Date.now(), o3 = 0, n2 = "", g2 = 0, i4 = /* @__PURE__ */ __name((s3 = false, c3) => {
      let l3 = Date.now();
      if (!s3 && l3 - g2 < m2.progressThrottleMs) return;
      g2 = l3;
      let p3 = e > 0 ? Math.min(100, Math.round(o3 / e * 100)) : 100, L2 = n2 ? ` \u2014 ${n2}` : "";
      c3 === "done" ? console.log(`%c\u2714 ${t5} ${o3}/${e} (${p3}%)%c \u2014 ${((l3 - r4) / 1e3).toFixed(2)}s`, a4.success, "color: #888;") : c3 === "fail" ? console.log(`%c\u2716 ${t5} FAILED at ${o3}/${e}`, a4.error) : console.log(`%c\u27F3 ${t5} ${o3}/${e} (${p3}%)${L2}`, a4.info);
    }, "i");
    return i4(true), { tick: /* @__PURE__ */ __name((s3) => {
      o3 = Math.min(e, o3 + 1), s3 && (n2 = s3), i4();
    }, "tick"), succeed: /* @__PURE__ */ __name((s3) => {
      s3 && (n2 = s3), o3 = e, i4(true, "done");
    }, "succeed"), fail: /* @__PURE__ */ __name((s3) => {
      s3 && (n2 = s3), i4(true, "fail");
    }, "fail"), update: /* @__PURE__ */ __name((s3, c3) => {
      o3 = Math.min(e, Math.max(0, s3)), c3 && (n2 = c3), i4();
    }, "update") };
  }
}, __name(_a52, "_"), _a52);

// node_modules/@adaas/a-frame/dist/browser/chunk-2RNFZSBL.mjs
var o = { Extract: "_A_FRAME_SCHEMA_EXTRACT" };
var _a53;
var a5 = (_a53 = class extends N {
  static get concept() {
    return "a-frame";
  }
  get prompt() {
    return this._prompt;
  }
  get schema() {
    return this._schema;
  }
  get options() {
    return this._options;
  }
  get data() {
    return this._data;
  }
  get model() {
    return this._model;
  }
  get date() {
    return this._date;
  }
  get isExtracted() {
    return this._data !== void 0;
  }
  fromNew(e) {
    super.fromNew(e), this._prompt = e.prompt, this._schema = e.schema, this._options = e.options?.model ? e.options : { model: a3.NOVA, ...e.options };
  }
  fromJSON(e) {
    this._prompt = e.prompt, this._schema = e.schema, this._data = e.data, this._model = e.model, this._date = e.date, this._aFrameVersion = e.aFrameVersion, this._aFrameServerVersion = e.aFrameServerVersion;
  }
  toJSON() {
    return { ...super.toJSON(), prompt: this._prompt, schema: this._schema, data: this._data, model: this._model, date: this._date, aFrameVersion: this._aFrameVersion, aFrameServerVersion: this._aFrameServerVersion };
  }
  extract(e) {
    return this.call(o.Extract, e);
  }
  hydrateFromExtraction(e, r4) {
    this._data = e, this._model = r4.model, this._date = r4.date, this._aFrameVersion = r4.aFrameVersion, this._aFrameServerVersion = r4.aFrameServerVersion;
  }
}, __name(_a53, "a"), _a53);

// node_modules/@adaas/a-frame/dist/browser/chunk-TQPC5MYM.mjs
var t3 = { Load: "_A_FRAME_SEGMENT_LOAD", Save: "_A_FRAME_SEGMENT_SAVE", Embed: "_A_FRAME_SEGMENT_EMBED", Destroy: "_A_FRAME_SEGMENT_DESTROY" };
var _a54;
var i2 = (_a54 = class extends N {
  static get concept() {
    return "a-frame";
  }
  get id() {
    return this.aseid.id;
  }
  get content() {
    return this._content;
  }
  get hash() {
    return this._hash;
  }
  get vector() {
    return this._vector;
  }
  get embedding() {
    return this._vector?.values ?? null;
  }
  get aFrameServerVersion() {
    return this._aFrameServerVersion;
  }
  get aFrameVersion() {
    return this._aFrameVersion;
  }
  get isEmbed() {
    return this._vector !== void 0;
  }
  get options() {
    return this._options;
  }
  get model() {
    return this._model;
  }
  get embeddedAt() {
    return this._embeddedAt;
  }
  get credentialId() {
    return this._credentialId;
  }
  save(e) {
    return this.call(t3.Save, e);
  }
  destroy(e) {
    return this.call(t3.Destroy, e);
  }
  async load(e) {
    return this.call(t3.Load, e);
  }
  update(e) {
    e.content && (this._content = e.content);
  }
  embed(e) {
    return this.call(t3.Embed, e);
  }
  fromNew(e) {
    super.fromNew(e), this._content = e.content, this._options = { model: a3.ANTARES, ...e.options };
    let s3 = this._content;
    this._hash = a2.fnv1a(s3);
  }
  fromJSON(e) {
    this._content = e.content, this._hash = e.hash, this._vector = e.embedding ? new n(e.embedding) : void 0, this._embeddedAt = e.embeddedAt, this._model = e.model, this._credentialId = e.credentialId, this._aFrameVersion = e.aFrameVersion, this._aFrameServerVersion = e.aFrameServerVersion, e.task && (this._options = { ...this._options, task: e.task });
  }
  toJSON() {
    return { ...super.toJSON(), hash: this._hash, content: this._content, embedding: this._vector?.values, embeddedAt: this._embeddedAt ?? (/* @__PURE__ */ new Date()).toISOString(), task: this._options?.task, model: this._model, credentialId: this._credentialId, aFrameVersion: this._aFrameVersion, aFrameServerVersion: this._aFrameServerVersion };
  }
  hydrateFromRecord(e) {
    if (e.hash !== this._hash) throw new Error(`A_FrameSegment.hydrateFromRecord: hash mismatch for "${this._content}" (expected ${this._hash}, got ${e.hash})`);
    this._vector = new n(e.embedding), this._embeddedAt = e.embeddedAt, e.task && (this._options = { ...this._options, task: e.task });
  }
  hydrateFromEmbedding(e) {
    this._vector = new n(e);
  }
  toString() {
    return [`// content: ${this._content}`].join(`
`);
  }
}, __name(_a54, "i"), _a54);

// node_modules/@adaas/a-frame/dist/browser/chunk-UULJJ5C5.mjs
var _a55;
var p = (_a55 = class extends N {
  static get concept() {
    return "a-frame";
  }
  fromNew(s3) {
    this.version = s3.version, this.timestamp = s3.timestamp, this.reason = s3.reason, this.encoded = s3.encoded, this.delta = s3.delta;
  }
  toJSON() {
    return { ...super.toJSON(), version: this.version, timestamp: this.timestamp, reason: this.reason, encoded: this.encoded, delta: this.delta };
  }
}, __name(_a55, "p"), _a55);
var u4 = { Generate: "_A_FRAME_DYNAMIC_CONTENT_GENERATE", Patch: "_A_FRAME_DYNAMIC_CONTENT_PATCH" };
var _a56;
var _3 = (_a56 = class extends V {
  constructor(e = {}) {
    super({ name: "a-frame-dynamic-content-operation-context" });
    this._meta = /* @__PURE__ */ new Map();
    this._meta.set("params", e);
  }
  get params() {
    return this._meta.get("params");
  }
  get(e) {
    return this._meta.get(e);
  }
  set(e, t5) {
    this._meta.set(e, t5);
  }
}, __name(_a56, "_"), _a56);
var _a57;
var d3 = (_a57 = class extends P {
}, __name(_a57, "d"), _a57);
d3.GenerationFailed = "GenerationFailed", d3.PatchFailed = "PatchFailed", d3.InvalidPatch = "InvalidPatch", d3.PieceNotFound = "PieceNotFound";
var _a58;
var m3 = (_a58 = class extends V {
  constructor() {
    super(...arguments);
    this._order = [];
    this._map = /* @__PURE__ */ new Map();
  }
  get count() {
    return this._order.length;
  }
  get size() {
    return this._order.length;
  }
  add(...e) {
    e.forEach((t5) => {
      this._map.set(t5.id, t5), this._order.includes(t5.id) || this._order.push(t5.id);
    });
  }
  update(e) {
    this._map.set(e.id, e), this._order.includes(e.id) || this._order.push(e.id);
  }
  remove(e) {
    this._map.delete(e);
    let t5 = this._order.indexOf(e);
    t5 !== -1 && this._order.splice(t5, 1);
  }
  clear() {
    this._map.clear(), this._order = [];
  }
  insertBefore(e, t5) {
    this._map.set(t5.id, t5);
    let i4 = this._order.indexOf(e);
    i4 === -1 ? this._order.push(t5.id) : this._order.splice(i4, 0, t5.id);
  }
  insertAfter(e, t5) {
    this._map.set(t5.id, t5);
    let i4 = this._order.indexOf(e);
    i4 === -1 ? this._order.push(t5.id) : this._order.splice(i4 + 1, 0, t5.id);
  }
  replace(e, t5) {
    let i4 = this._order.indexOf(e);
    i4 !== -1 && (this._map.delete(e), this._map.set(t5.id, t5), this._order[i4] = t5.id);
  }
  moveTo(e, t5) {
    let i4 = this._order.indexOf(e);
    if (i4 === -1) return;
    this._order.splice(i4, 1);
    let r4 = Math.max(0, Math.min(t5, this._order.length));
    this._order.splice(r4, 0, e);
  }
  moveBefore(e, t5) {
    let i4 = this._order.indexOf(e);
    if (i4 === -1) return;
    this._order.splice(i4, 1);
    let r4 = this._order.indexOf(t5);
    this._order.splice(r4 === -1 ? 0 : r4, 0, e);
  }
  moveAfter(e, t5) {
    let i4 = this._order.indexOf(e);
    if (i4 === -1) return;
    this._order.splice(i4, 1);
    let r4 = this._order.indexOf(t5);
    this._order.splice(r4 === -1 ? this._order.length : r4 + 1, 0, e);
  }
  applyOperation(e, t5) {
    switch (e.action) {
      case "remove": {
        e.targetId && this.remove(e.targetId);
        break;
      }
      case "replace": {
        e.targetId && t5 && this.replace(e.targetId, t5);
        break;
      }
      case "add": {
        if (!t5) break;
        !e.targetId || e.position === "append" ? this.add(t5) : e.position === "before" ? this.insertBefore(e.targetId, t5) : this.insertAfter(e.targetId, t5);
        break;
      }
    }
  }
  get(e) {
    return this._map.get(e);
  }
  list() {
    return this._order.map((e) => this._map.get(e)).filter((e) => e !== void 0);
  }
  centroid() {
    let e = this.list().filter((r4) => r4.isEmbed && r4.vector);
    if (e.length === 0) return null;
    let t5 = e[0].vector.length, i4 = new Float32Array(t5);
    for (let r4 of e) {
      let o3 = r4.vector.values;
      for (let n2 = 0; n2 < t5; n2++) i4[n2] += o3[n2];
    }
    for (let r4 = 0; r4 < t5; r4++) i4[r4] /= e.length;
    return new n(i4);
  }
  search(e, t5 = _a58.PATCH_PIECE_LIMIT) {
    let i4 = e.normalize();
    return this.list().filter((r4) => r4.isEmbed && r4.vector).map((r4) => ({ segment: r4, score: i4.dot(r4.vector.normalize()) })).sort((r4, o3) => o3.score - r4.score).slice(0, t5);
  }
  searchByKeywords(e, t5 = _a58.PATCH_PIECE_LIMIT) {
    let i4 = e.toLowerCase().split(/\W+/).filter((r4) => r4.length > 3);
    return i4.length === 0 ? [] : this.list().map((r4) => {
      let o3 = r4.content.toLowerCase(), n2 = i4.reduce((a7, c3) => a7 + (o3.includes(c3) ? 1 : 0), 0);
      return { segment: r4, score: n2 };
    }).filter((r4) => r4.score > 0).sort((r4, o3) => o3.score - r4.score).slice(0, t5);
  }
  selectForPatch(e, t5, i4 = _a58.PATCH_PIECE_LIMIT) {
    let r4 = this.list();
    if (r4.length <= i4) return r4;
    if (e && r4.some((a7) => a7.isEmbed)) {
      let a7 = this.search(e, i4);
      if (a7.length > 0) return a7.map((c3) => c3.segment);
    }
    let o3 = this.searchByKeywords(t5, i4);
    return o3.length > 0 ? o3.map((n2) => n2.segment) : r4.slice(0, i4);
  }
  cosineSimilarity(e, t5) {
    if (!t5) return 0;
    let i4 = e.dot(t5), r4 = e.magnitude() * t5.magnitude();
    return r4 === 0 ? 0 : i4 / r4;
  }
}, __name(_a58, "m"), _a58);
m3.PATCH_PIECE_LIMIT = 5;
var h2 = m3;
var _a59;
var v3 = (_a59 = class extends N {
  static get concept() {
    return "a-frame";
  }
  get scope() {
    return this._scope || (this._scope = c.allocate(this, new D({ name: `${this.aseid.id}-scope` }))), this._scope;
  }
  get index() {
    return this.scope.resolve(h2);
  }
  fromNew(s3) {
    super.fromNew(s3);
    let e = new h2({ name: `${this.aseid.id}` });
    this.scope.register(e), this.createdAt = Date.now(), this.prompt = s3.prompt, this.model = s3.options?.model || a3.LYRA, this._system = s3.options?.system, this._patchPieceLimit = s3.options?.patchPieceLimit || h2.PATCH_PIECE_LIMIT, this._history = [], this._version = 0;
  }
  get segments() {
    return this.index.list();
  }
  get content() {
    return this.index.list().map((s3) => s3.content).join(`
`);
  }
  get text() {
    return this.content;
  }
  get history() {
    return this._history;
  }
  get version() {
    return this._version;
  }
  get modelName() {
    return this.model;
  }
  get systemPrompt() {
    return this._system;
  }
  async generate() {
    let s3 = new _3();
    this.scope.isInheritedFrom(c.scope(this)) || this.scope.inherit(c.scope(this));
    let e = new D({ name: "a-frame-dynamic-content-generate", fragments: [s3] }).inherit(this.scope);
    try {
      await this.call(u4.Generate, e), e.destroy();
    } catch (t5) {
      throw e.destroy(), new d3({ title: d3.GenerationFailed, description: `Failed to generate content: ${t5 instanceof Error ? t5.message : String(t5)}` });
    }
  }
  async patch(s3, e) {
    this.scope.isInheritedFrom(c.scope(this)) || this.scope.inherit(c.scope(this));
    let t5 = new D({ name: "a-frame-dynamic-content-patch" }).inherit(this.scope), i4;
    if (e !== void 0) {
      let o3 = Array.isArray(e) ? e : [e], n2 = o3.filter((a7) => !this.index.get(a7.id));
      if (n2.length > 0) throw t5.destroy(), new d3({ title: d3.PatchFailed, description: "Segment(s) not found in this content's index: " + n2.map((a7) => `"${a7.id}"`).join(", ") + ". Only segments that belong to this DynamicContent instance can be targeted." });
      i4 = o3;
    } else {
      let o3 = new i2({ content: s3, options: { task: "query" } });
      t5.register(o3), await o3.embed(), i4 = this.index.selectForPatch(o3.vector ?? null, s3, this._patchPieceLimit);
    }
    let r4 = new _3({ instruction: s3, segments: i4 });
    t5.register(r4);
    try {
      await this.call(u4.Patch, t5), t5.destroy();
    } catch (o3) {
      throw t5.destroy(), new d3({ title: d3.PatchFailed, description: `Failed to patch content: ${o3 instanceof Error ? o3.message : String(o3)}` });
    }
  }
  compareTo(s3) {
    let e = this.index.centroid(), t5 = s3.index.centroid();
    return !e || !t5 ? 0 : e.cosineSimilarity(t5);
  }
  hydrateFromGeneration(s3, e) {
    s3.forEach((t5) => this.index.add(t5)), this._history.push(new p({ version: this._version, timestamp: Date.now(), reason: `Generated for: "${this.prompt}"`, encoded: Buffer.from(JSON.stringify(this.index.list())).toString("base64"), delta: this.index.size }));
  }
  hydrateFromPatch(s3, e) {
    let t5 = this.index.size, i4 = /* @__PURE__ */ __name((n2) => n2.toLowerCase().replace(/[^\w\s]/g, "").replace(/\s+/g, " ").trim(), "i"), r4 = this.index.list().map((n2) => i4(n2.content)), o3 = /* @__PURE__ */ __name((n2) => {
      let a7 = i4(n2);
      return a7.length < 8 ? false : r4.some((c3) => c3 === a7 || c3.includes(a7));
    }, "o");
    for (let n2 of s3.operations) {
      if (!["add", "replace", "remove"].includes(n2.action)) continue;
      let a7;
      if (n2.segment) {
        if ((n2.action === "add" || n2.action === "replace") && o3(n2.segment.content)) continue;
        a7 = new i2({ content: n2.segment.content, options: { task: "document" } }), n2.segment.embedding?.length && a7.hydrateFromEmbedding(new Float32Array(n2.segment.embedding));
      }
      n2.action === "add" && ((/* @__PURE__ */ new Set(["before", "after", "append", void 0])).has(n2.position) || (n2.position = "append", n2.targetId = void 0)), this.index.applyOperation(n2, a7);
    }
    this._version++, this._history.push(new p({ version: this._version, timestamp: Date.now(), reason: s3.patchSummary, encoded: Buffer.from(JSON.stringify(this.index.list())).toString("base64"), delta: this.index.size - t5 }));
  }
  toJSON() {
    return { ...super.toJSON(), prompt: this.prompt, metadata: { model: this.model, createdAt: this.createdAt }, history: this._history.map((s3) => s3.toJSON()) };
  }
}, __name(_a59, "v"), _a59);

// node_modules/@adaas/a-frame/dist/browser/chunk-6NPQURSO.mjs
var o2 = { Generate: "_A_FRAME_COMPLETION_GENERATE" };
var _a60;
var i3 = (_a60 = class extends N {
  static get concept() {
    return "a-frame";
  }
  get prompt() {
    return this._prompt;
  }
  get options() {
    return this._options;
  }
  get text() {
    return this._text;
  }
  get vector() {
    return this._vector;
  }
  get embedding() {
    return this._vector?.values ?? null;
  }
  get model() {
    return this._model;
  }
  get date() {
    return this._date;
  }
  get isGenerated() {
    return this._text !== void 0;
  }
  fromNew(e) {
    super.fromNew(e), this._prompt = e.prompt, this._options = e.options?.model ? e.options : { model: a3.RIGEL, ...e.options };
  }
  fromJSON(e) {
    this._prompt = e.prompt, this._text = e.text, this._vector = e.embedding ? new n(e.embedding) : void 0, this._model = e.model, this._date = e.date, this._aFrameVersion = e.aFrameVersion, this._aFrameServerVersion = e.aFrameServerVersion;
  }
  toJSON() {
    return { ...super.toJSON(), prompt: this._prompt, text: this._text, embedding: this._vector?.values, model: this._model, date: this._date, aFrameVersion: this._aFrameVersion, aFrameServerVersion: this._aFrameServerVersion };
  }
  generate(e) {
    return this.call(o2.Generate, e);
  }
  hydrateFromGeneration(e) {
    this._text = e.text, this._vector = new n(e.embedding), this._model = e.model, this._date = e.date, this._aFrameVersion = e.aFrameVersion, this._aFrameServerVersion = e.aFrameServerVersion;
  }
}, __name(_a60, "i"), _a60);

// node_modules/@adaas/a-frame/dist/browser/chunk-XR7FVA5M.mjs
var c2 = { Request: "_A_FRAME_REQUEST", Socket: "_A_FRAME_SOCKET", Stream: "_A_FRAME_STREAM", Send: "_A_FRAME_SEND" };
var _a61;
var p2 = (_a61 = class extends V {
  constructor(t5, r4, a7) {
    super({ name: "a-frame-channel-request" });
    this.method = t5;
    this.path = r4;
    this.body = a7;
  }
  complete(t5) {
    this._response = t5;
  }
  fail(t5) {
    this._error = t5;
  }
  get response() {
    return this._response;
  }
  get error() {
    return this._error;
  }
}, __name(_a61, "p"), _a61);
var _a62;
var s2 = (_a62 = class extends P {
}, __name(_a62, "s"), _a62);
s2.InvalidRequest = "InvalidRequest", s2.Timeout = "Timeout", s2.RequestFailed = "RequestFailed";
var v4 = { Load: "_A_FRAME_DYNAMIC_STRUCTURE_LOAD", Patch: "_A_FRAME_DYNAMIC_STRUCTURE_PATCH", Generate: "_A_FRAME_DYNAMIC_STRUCTURE_GENERATE", Map: "_A_FRAME_DYNAMIC_STRUCTURE_MAP" };
var _a63;
var u5 = (_a63 = class extends P {
}, __name(_a63, "u"), _a63);
u5.InvalidPatch = "InvalidPatch", u5.VersionMismatch = "VersionMismatch", u5.ComponentNotFound = "ComponentNotFound", u5.InvalidOperation = "InvalidOperation", u5.GenerationFailed = "GenerationFailed";
var _a64;
var P2 = (_a64 = class extends V {
  constructor() {
    super({ name: "a-frame-component-map-index" });
    this._entries = /* @__PURE__ */ new Map();
  }
  set(t5) {
    this._entries.set(t5.prompt, t5);
  }
  get(t5) {
    return this._entries.get(t5);
  }
  clear() {
    this._entries.clear();
  }
  get size() {
    return this._entries.size;
  }
  list() {
    return Array.from(this._entries.values());
  }
  get matched() {
    return this.list().filter((t5) => t5.matchedClass !== null);
  }
  get unmatched() {
    return this.list().filter((t5) => t5.matchedClass === null);
  }
  toResult(t5) {
    let r4 = /* @__PURE__ */ __name((a7) => {
      let n2 = this._entries.get(a7.prompt);
      return n2 || { prompt: a7.prompt, role: a7.role, class: a7.class, matchedClass: null, matchScore: 0 };
    }, "r");
    return { containers: t5.containers.map((a7) => ({ ...r4(a7), components: (a7.components ?? []).map(r4), fragments: (a7.fragments ?? []).map(r4), entities: (a7.entities ?? []).map(r4) })), components: t5.components.map(r4), fragments: t5.fragments.map(r4), entities: t5.entities.map(r4) };
  }
}, __name(_a64, "P"), _a64);
var _a65;
var f3 = (_a65 = class extends V {
  constructor(t5 = {}) {
    super({ name: "a-frame-dynamic-structure-operation-context" });
    this._meta = /* @__PURE__ */ new Map();
    this._meta.set("params", t5);
  }
  get params() {
    return this._meta.get("params");
  }
  get(t5) {
    return this._meta.get(t5);
  }
  set(t5, r4) {
    this._meta.set(t5, r4);
  }
}, __name(_a65, "f"), _a65);
var _a66;
var M = (_a66 = class extends N {
  static get concept() {
    return "a-frame";
  }
  fromNew(e) {
    super.fromNew(e), this.createdAt = Date.now(), this.prompt = e.prompt, this.model = e.options?.model || a3.PULSAR, this._context = e.options?.context ?? "", this._metaHint = e.options?.metaHint ?? "", this._includeBases = (e.options?.includeBases || []).map((t5) => typeof t5 == "string" ? t5 : l.getComponentName(t5)), this._excludeBases = (e.options?.excludeBases || []).map((t5) => typeof t5 == "string" ? t5 : l.getComponentName(t5)), this._enabledComponents = (e.options?.enabledComponents || []).map((t5) => typeof t5 == "string" ? t5 : l.getComponentName(t5)), this._minScore = e.options?.minScore ?? 0.7, this._maxRetries = e.options?.maxRetries ?? 3, this._candidateCount = e.options?.candidateCount ?? 5, this._definition = null, this._mapResult = null, this._history = [], this._version = 0;
  }
  get modelName() {
    return this.model;
  }
  get contextHint() {
    return this._context;
  }
  get metaHintValue() {
    return this._metaHint;
  }
  get includedBases() {
    return this._includeBases;
  }
  get excludedBases() {
    return this._excludeBases;
  }
  get enabledComponentsList() {
    return this._enabledComponents;
  }
  get minScore() {
    return this._minScore;
  }
  get maxRetries() {
    return this._maxRetries;
  }
  get candidateCount() {
    return this._candidateCount;
  }
  get definition() {
    return this._definition;
  }
  get structure() {
    return this._definition ? JSON.stringify(this._stripEmbeddings(this._definition), null, 2) : JSON.stringify({ containers: [], components: [], fragments: [], entities: [] }, null, 2);
  }
  get mapResult() {
    return this._mapResult;
  }
  get history() {
    return this._history;
  }
  get version() {
    return this._version;
  }
  async generate() {
    let e = new f3(), t5 = new D({ name: "a-frame-dynamic-structure-generate", fragments: [e] }).inherit(c.scope(this));
    try {
      await this.call(v4.Generate, t5), t5.destroy();
    } catch (r4) {
      throw t5.destroy(), new u5({ title: u5.GenerationFailed, description: `Failed to generate structure: ${r4 instanceof Error ? r4.message : String(r4)}` });
    }
  }
  async patch(e) {
    let t5 = new f3({ instruction: e }), r4 = new D({ name: "a-frame-dynamic-structure-patch", fragments: [t5] }).inherit(c.scope(this));
    try {
      await this.call(v4.Patch, r4), r4.destroy();
    } catch (a7) {
      throw r4.destroy(), new u5({ title: u5.GenerationFailed, description: `Failed to patch structure: ${a7 instanceof Error ? a7.message : String(a7)}` });
    }
  }
  async map() {
    let e = new P2(), t5 = new D({ name: "a-frame-dynamic-structure-map", fragments: [e] }).inherit(c.scope(this));
    try {
      await this.call(v4.Map, t5), t5.destroy();
    } catch (r4) {
      throw t5.destroy(), new u5({ title: u5.GenerationFailed, description: `Failed to map structure: ${r4 instanceof Error ? r4.message : String(r4)}` });
    }
  }
  hydrateFromGeneration(e, t5) {
    this._definition = e, this._mapResult = null, this._history.push(new p({ version: this._version, timestamp: Date.now(), reason: `Generated for: "${this.prompt}"`, encoded: Buffer.from(JSON.stringify(this._stripEmbeddings(e))).toString("base64"), delta: this._countElements(e) }));
  }
  hydrateFromPatch(e, t5, r4) {
    let a7 = this._definition ? this._countElements(this._definition) : 0;
    this._definition = e, this._mapResult = null, this._version++, this._history.push(new p({ version: this._version, timestamp: Date.now(), reason: t5, encoded: Buffer.from(JSON.stringify(this._stripEmbeddings(e))).toString("base64"), delta: this._countElements(e) - a7 }));
  }
  hydrateFromMap(e) {
    this._mapResult = e;
  }
  toJSON() {
    let e = this._definition ? this._countElements(this._definition) : 0;
    return { ...super.toJSON(), name: this.prompt, description: `DynamicStructure with ${e} elements and ${this._history.length} patches`, metadata: { model: this.model, context: this._context, metaHint: this._metaHint, includeBases: this._includeBases, excludeBases: this._excludeBases, enabledComponents: this._enabledComponents, candidateCount: this._candidateCount, createdAt: this.createdAt }, history: this._history.map((t5) => t5.toJSON()) };
  }
  _countElements(e) {
    return (e.containers?.length ?? 0) + (e.components?.length ?? 0) + (e.fragments?.length ?? 0) + (e.entities?.length ?? 0);
  }
  _stripEmbeddings(e) {
    let t5 = /* @__PURE__ */ __name((r4) => {
      let { embedding: a7, ...n2 } = r4;
      return n2;
    }, "t");
    return { containers: e.containers.map((r4) => ({ ...t5(r4), components: (r4.components ?? []).map(t5), fragments: (r4.fragments ?? []).map(t5), entities: (r4.entities ?? []).map(t5) })), components: e.components.map(t5), fragments: e.fragments.map(t5), entities: e.entities.map(t5) };
  }
}, __name(_a66, "M"), _a66);
var D3 = { Generate: "_A_FRAME_DYNAMIC_FEATURE_GENERATE", Patch: "_A_FRAME_DYNAMIC_FEATURE_PATCH", Map: "_A_FRAME_DYNAMIC_FEATURE_MAP" };
var _a67;
var S2 = (_a67 = class extends V {
  constructor(t5 = {}) {
    super({ name: "a-frame-dynamic-feature-operation-context" });
    this._meta = /* @__PURE__ */ new Map();
    this._meta.set("params", t5);
  }
  get params() {
    return this._meta.get("params");
  }
  get(t5) {
    return this._meta.get(t5);
  }
  set(t5, r4) {
    this._meta.set(t5, r4);
  }
}, __name(_a67, "S"), _a67);
var _a68;
var l2 = (_a68 = class extends P {
}, __name(_a68, "l"), _a68);
l2.GenerationFailed = "GenerationFailed", l2.PatchFailed = "PatchFailed", l2.MappingFailed = "MappingFailed", l2.MethodNotFound = "MethodNotFound", l2.InvalidOperation = "InvalidOperation";
var _a69;
var I2 = (_a69 = class extends V {
  constructor() {
    super({ name: "a-frame-method-map-index" });
    this._stepEntries = /* @__PURE__ */ new Map();
    this._elementEntries = /* @__PURE__ */ new Map();
  }
  setStep(t5) {
    this._stepEntries.set(t5.prompt, t5);
  }
  getStep(t5) {
    return this._stepEntries.get(t5);
  }
  setElement(t5) {
    this._elementEntries.set(t5.prompt, t5);
  }
  getElement(t5) {
    return this._elementEntries.get(t5);
  }
  clear() {
    this._stepEntries.clear(), this._elementEntries.clear();
  }
  get stepCount() {
    return this._stepEntries.size;
  }
  get elementCount() {
    return this._elementEntries.size;
  }
  get matchedSteps() {
    return Array.from(this._stepEntries.values()).filter((t5) => t5.matchedMethod !== null);
  }
  get unmatchedSteps() {
    return Array.from(this._stepEntries.values()).filter((t5) => t5.matchedMethod === null);
  }
  toResult(t5) {
    let r4 = /* @__PURE__ */ __name((n2) => {
      let i4 = this._stepEntries.get(n2.prompt);
      return i4 || { prompt: n2.prompt, inputs: n2.inputs, outputs: n2.outputs, matchedClass: null, matchedMethod: null, matchScore: 0 };
    }, "r"), a7 = /* @__PURE__ */ __name((n2) => {
      let i4 = this._elementEntries.get(n2.prompt);
      return i4 || { prompt: n2.prompt, matchedClass: null, matchScore: 0 };
    }, "a");
    return { steps: t5.steps.map(r4), components: t5.components.map(a7), fragments: t5.fragments.map(a7), entities: t5.entities.map(a7) };
  }
}, __name(_a69, "I"), _a69);
var _a70;
var N2 = (_a70 = class extends N {
  static get concept() {
    return "a-frame";
  }
  fromNew(e) {
    super.fromNew(e), this.createdAt = Date.now(), this.prompt = e.prompt, this._model = e.options?.model ?? a3.PULSAR, this._context = e.options?.context ?? "", this._includeBases = (e.options?.includeBases ?? []).map((t5) => typeof t5 == "string" ? t5 : l.getComponentName(t5)), this._excludeBases = (e.options?.excludeBases ?? []).map((t5) => typeof t5 == "string" ? t5 : l.getComponentName(t5)), this._enabledComponents = (e.options?.enabledComponents ?? []).map((t5) => typeof t5 == "string" ? t5 : l.getComponentName(t5)), this._minScore = e.options?.minScore ?? 0.7, this._maxRetries = e.options?.maxRetries ?? 3, this._definition = null, this._mapResult = null, this._history = [], this._version = 0;
  }
  get modelName() {
    return this._model;
  }
  get contextHint() {
    return this._context;
  }
  get includedBases() {
    return this._includeBases;
  }
  get excludedBases() {
    return this._excludeBases;
  }
  get enabledComponentsList() {
    return this._enabledComponents;
  }
  get minScore() {
    return this._minScore;
  }
  get maxRetries() {
    return this._maxRetries;
  }
  get definition() {
    return this._definition;
  }
  get workflow() {
    return this._definition ? JSON.stringify(this._stripEmbeddings(this._definition), null, 2) : JSON.stringify({ title: "", description: "", steps: [], components: [], fragments: [], entities: [] }, null, 2);
  }
  get mapResult() {
    return this._mapResult;
  }
  get history() {
    return this._history;
  }
  get version() {
    return this._version;
  }
  async generate() {
    let e = new S2(), t5 = new D({ name: "a-frame-dynamic-feature-generate", fragments: [e] }).inherit(c.scope(this));
    try {
      await this.call(D3.Generate, t5), t5.destroy();
    } catch (r4) {
      throw t5.destroy(), new l2({ title: l2.GenerationFailed, description: `Failed to generate feature workflow: ${r4 instanceof Error ? r4.message : String(r4)}` });
    }
  }
  async patch(e) {
    let t5 = new S2({ instruction: e }), r4 = new D({ name: "a-frame-dynamic-feature-patch", fragments: [t5] }).inherit(c.scope(this));
    try {
      await this.call(D3.Patch, r4), r4.destroy();
    } catch (a7) {
      throw r4.destroy(), new l2({ title: l2.PatchFailed, description: `Failed to patch feature workflow: ${a7 instanceof Error ? a7.message : String(a7)}` });
    }
  }
  async map() {
    let e = new I2(), t5 = new D({ name: "a-frame-dynamic-feature-map", fragments: [e] }).inherit(c.scope(this));
    try {
      await this.call(D3.Map, t5), t5.destroy();
    } catch (r4) {
      throw t5.destroy(), new l2({ title: l2.MappingFailed, description: `Failed to map feature workflow: ${r4 instanceof Error ? r4.message : String(r4)}` });
    }
  }
  hydrateFromGeneration(e, t5) {
    this._definition = e, this._mapResult = null, this._history.push(new p({ version: this._version, timestamp: Date.now(), reason: `Generated for: "${this.prompt}"`, encoded: Buffer.from(JSON.stringify(this._stripEmbeddings(e))).toString("base64"), delta: e.steps.length }));
  }
  hydrateFromPatch(e, t5, r4) {
    let a7 = this._definition?.steps.length ?? 0;
    this._definition = e, this._mapResult = null, this._version++, this._history.push(new p({ version: this._version, timestamp: Date.now(), reason: t5, encoded: Buffer.from(JSON.stringify(this._stripEmbeddings(e))).toString("base64"), delta: e.steps.length - a7 }));
  }
  hydrateFromMap(e) {
    this._mapResult = e;
  }
  toJSON() {
    return { ...super.toJSON(), name: this.prompt, description: `DynamicFeature with ${this._definition?.steps.length ?? 0} steps and ${this._history.length} patches`, metadata: { model: this._model, context: this._context, includeBases: this._includeBases, excludeBases: this._excludeBases, enabledComponents: this._enabledComponents, createdAt: this.createdAt }, history: this._history.map((e) => e.toJSON()) };
  }
  _stripEmbeddings(e) {
    let t5 = /* @__PURE__ */ __name((r4) => {
      let { embedding: a7, ...n2 } = r4;
      return n2;
    }, "t");
    return { ...e, steps: e.steps.map(t5), components: e.components.map(t5), fragments: e.fragments.map(t5), entities: e.entities.map(t5) };
  }
}, __name(_a70, "N"), _a70);
var _a71;
var R2 = (_a71 = class extends V {
  get A_FRAME_FILE_EXTENSION() {
    return ".aframe";
  }
  get A_FRAME_NAMESPACES_BIN() {
    return `__namespaces${this.A_FRAME_FILE_EXTENSION}`;
  }
  get A_FRAME_SYNC() {
    return process.env.A_FRAME_SYNC !== "false";
  }
  get A_FRAME_TOKEN() {
    return process.env.A_FRAME_TOKEN || "";
  }
  get A_FRAME_SERVER_URL() {
    return process.env.A_FRAME_SERVER_URL || "http://localhost:3663";
  }
  get A_FRAME_SERVER_API_KEY() {
    return process.env.A_FRAME_SERVER_API_KEY || "";
  }
  get A_FRAME_STORAGE_DIR() {
    return process.env.A_FRAME_STORAGE_DIR || ".aframe";
  }
  get A_FRAME_STORAGE_PATTERN() {
    return process.env.A_FRAME_STORAGE_PATTERN ?? "node_modules/**/.aframe";
  }
  get A_FRAME_VERSION() {
    return t || "0.0.1";
  }
  get A_FRAME_REQUEST_TIMEOUT() {
    let e = process.env.A_FRAME_REQUEST_TIMEOUT, t5 = e ? parseInt(e, 10) : NaN;
    return isNaN(t5) ? 12e4 : t5;
  }
}, __name(_a71, "R"), _a71);
var _a72;
var h3 = (_a72 = class extends F {
  async generate(e) {
    let t5 = new p2("POST", "/api/v1/completions", { prompt: e, max_tokens: 512 }), r4 = new D({ name: "A_FrameChannel.generate", fragments: [t5] }).inherit(c.scope(this));
    try {
      return await this.call(c2.Request, r4), r4.destroy(), t5;
    } catch (a7) {
      throw r4.destroy(), new s2({ title: s2.RequestFailed, description: `Failed to generate completion: ${a7 instanceof Error ? a7.message : String(a7)}` });
    }
  }
  async embed(e, t5) {
    let r4 = new p2("POST", "/api/v1/embeddings", { input: e, ...t5?.model && { model: t5.model }, ...t5?.task && { task: t5.task } }), a7 = new D({ name: "A_FrameChannel.embed", fragments: [r4] }).inherit(c.scope(this));
    try {
      return await this.call(c2.Request, a7), a7.destroy(), r4;
    } catch (n2) {
      throw a7.destroy(), new s2({ title: s2.RequestFailed, description: `Failed to embed input: ${n2 instanceof Error ? n2.message : String(n2)}` });
    }
  }
  async getCredentials() {
    let e = new p2("GET", "/api/v1/credentials/me"), t5 = new D({ name: "A_FrameChannel.getCredentials", fragments: [e] }).inherit(c.scope(this));
    try {
      return await this.call(c2.Request, t5), t5.destroy(), e;
    } catch (r4) {
      throw t5.destroy(), new s2({ title: s2.RequestFailed, description: `Failed to get credentials: ${r4 instanceof Error ? r4.message : String(r4)}` });
    }
  }
  async ping() {
    let e = new p2("GET", "/health"), t5 = new D({ name: "A_FrameChannel.ping", fragments: [e] }).inherit(c.scope(this));
    try {
      return await this.call(c2.Request, t5), t5.destroy(), e;
    } catch {
      return t5.destroy(), e;
    }
  }
  async embedDefinition(e, t5) {
    let r4 = new p2("POST", "/api/v1/definition/embed", { definition: e.toJSON(), model: e.requestedModel }), a7 = new D({ name: "A_FrameChannel.embedDefinition", fragments: [r4] }).inherit(c.scope(this));
    try {
      await this.call(c2.Request, a7), a7.destroy();
      let n2 = r4.response;
      if (!n2.data || !n2.data[0] || !n2.data[0].embedding) throw new s2({ title: s2.InvalidRequest, description: `Invalid embedding response for definition "${e.name}"` });
      let i4 = new Float32Array(n2.data[0].embedding);
      e.hydrateFromEmbedding(i4, { model: n2.model, dimensions: n2.meta.dimensions, inputCount: n2.meta.input_count, aFrameServerVersion: n2.meta.server_version, aFrameVersion: t5.A_FRAME_VERSION, credentialId: n2.meta.credential_id, date: n2.date, aFrameMeta: n2.aFrameMeta });
    } catch (n2) {
      throw new s2({ title: s2.RequestFailed, description: `Failed to embed definition "${e.name}": ${n2 instanceof Error ? n2.message : String(n2)}` });
    }
  }
  async embedNamespace(e, t5) {
    let r4 = new p2("POST", "/api/v1/namespace/embed", { namespace: e.toJSON(), model: e.requestedModel }), a7 = new D({ name: "A_FrameChannel.embedNamespace", fragments: [r4] }).inherit(c.scope(this));
    try {
      await this.call(c2.Request, a7), a7.destroy();
      let n2 = r4.response;
      if (!n2.data || !n2.data[0] || !n2.data[0].embedding) throw new s2({ title: s2.InvalidRequest, description: `Invalid embedding response for namespace "${e.name}"` });
      let i4 = new Float32Array(n2.data[0].embedding);
      e.hydrateFromEmbedding(i4, { model: n2.model, dimensions: n2.meta.dimensions, inputCount: n2.meta.input_count, aFrameServerVersion: n2.meta.server_version, aFrameVersion: t5.A_FRAME_VERSION, credentialId: n2.meta.credential_id, date: n2.date });
    } catch (n2) {
      throw new s2({ title: s2.RequestFailed, description: `Failed to embed namespace "${e.name}": ${n2 instanceof Error ? n2.message : String(n2)}` });
    }
  }
  async embedSegment(e, t5) {
    let r4 = new p2("POST", "/api/v1/segment/embed", { segment: e.toJSON(), task: e.options?.task, model: e.options?.model }), a7 = new D({ name: "A_FrameChannel.embedNamespace", fragments: [r4] }).inherit(c.scope(this));
    try {
      await this.call(c2.Request, a7), a7.destroy();
      let n2 = r4.response;
      if (!n2.data || !n2.data[0] || !n2.data[0].embedding) throw new s2({ title: s2.InvalidRequest, description: `Error during embed a segment: ${e.content}` });
      let i4 = new Float32Array(n2.data[0].embedding);
      e.fromJSON({ aseid: e.aseid.toString(), content: e.content, hash: e.hash, embedding: i4, model: n2.model, aFrameServerVersion: n2.meta.server_version, aFrameVersion: t5.A_FRAME_VERSION, credentialId: n2.meta.credential_id, embeddedAt: n2.date });
    } catch (n2) {
      throw new s2({ title: s2.RequestFailed, description: `Failed to embed segment with content "${e.content}": ${n2 instanceof Error ? n2.message : String(n2)}` });
    }
  }
  async generateDynamicStructure(e, t5) {
    let r4 = new p2("POST", "/api/v1/structure/generate", { prompt: e.prompt, model: e.modelName, context: e.contextHint, metaHint: e.metaHintValue, includeBases: e.includedBases, excludeBases: e.excludedBases, enabledComponents: e.enabledComponentsList }), a7 = new D({ name: "A_FrameChannel.generateDynamicStructure", fragments: [r4] }).inherit(c.scope(this));
    await this.call(c2.Request, a7), a7.destroy();
    let n2 = r4.response;
    e.hydrateFromGeneration(n2.definition, { model: n2.model, serverVersion: n2.meta?.server_version ?? "0.0.0" });
  }
  async patchDynamicStructure(e, t5) {
    let { instruction: r4 } = t5.params, a7 = new p2("POST", "/api/v1/structure/patch", { originalPrompt: e.prompt, definition: this._stripStructureEmbeddings(e.definition ?? { containers: [], components: [], fragments: [], entities: [] }), patchInstruction: r4, model: e.modelName, context: e.contextHint, metaHint: e.metaHintValue, includeBases: e.includedBases, excludeBases: e.excludedBases, enabledComponents: e.enabledComponentsList }), n2 = new D({ name: "A_FrameChannel.patchDynamicStructure", fragments: [a7] }).inherit(c.scope(this));
    await this.call(c2.Request, n2), n2.destroy();
    let i4 = a7.response;
    e.hydrateFromPatch(i4.definition, i4.patchSummary, { model: i4.model, serverVersion: i4.meta?.server_version ?? "0.0.0" });
  }
  _stripStructureEmbeddings(e) {
    let t5 = /* @__PURE__ */ __name((r4) => {
      let { embedding: a7, ...n2 } = r4;
      return n2;
    }, "t");
    return { containers: e.containers.map((r4) => ({ ...t5(r4), components: (r4.components ?? []).map(t5), fragments: (r4.fragments ?? []).map(t5), entities: (r4.entities ?? []).map(t5) })), components: e.components.map(t5), fragments: e.fragments.map(t5), entities: e.entities.map(t5) };
  }
  async generateDynamicFeature(e, t5) {
    let r4 = new p2("POST", "/api/v1/feature/generate", { prompt: e.prompt, model: e.modelName, context: e.contextHint }), a7 = new D({ name: "A_FrameChannel.generateDynamicFeature", fragments: [r4] }).inherit(c.scope(this));
    await this.call(c2.Request, a7), a7.destroy();
    let n2 = r4.response;
    e.hydrateFromGeneration(n2.definition, { model: n2.model, serverVersion: n2.meta?.server_version ?? "0.0.0" });
  }
  async patchDynamicFeature(e, t5) {
    let { instruction: r4 } = t5.params, a7 = new p2("POST", "/api/v1/feature/patch", { originalPrompt: e.prompt, definition: this._stripFeatureEmbeddings(e.definition ?? { title: "", description: "", steps: [], components: [], fragments: [], entities: [] }), patchInstruction: r4, model: e.modelName, context: e.contextHint }), n2 = new D({ name: "A_FrameChannel.patchDynamicFeature", fragments: [a7] }).inherit(c.scope(this));
    await this.call(c2.Request, n2), n2.destroy();
    let i4 = a7.response;
    e.hydrateFromPatch(i4.definition, i4.patchSummary, { model: i4.model, serverVersion: i4.meta?.server_version ?? "0.0.0" });
  }
  _stripFeatureEmbeddings(e) {
    let t5 = /* @__PURE__ */ __name((r4) => {
      let { embedding: a7, ...n2 } = r4;
      return n2;
    }, "t");
    return { ...e, steps: e.steps.map(t5), components: e.components.map(t5), fragments: e.fragments.map(t5), entities: e.entities.map(t5) };
  }
  async generateDynamicContent(e, t5) {
    let r4 = new p2("POST", "/api/v1/content/generate", { prompt: e.prompt, model: e.modelName, ...e.systemPrompt !== void 0 ? { system: e.systemPrompt } : {} }), a7 = new D({ name: "A_FrameChannel.generateDynamicContent", fragments: [r4] }).inherit(c.scope(this));
    await this.call(c2.Request, a7), a7.destroy();
    let n2 = r4.response, i4 = (n2.segments ?? []).map((C4) => {
      let x2 = new i2({ content: C4.content, options: { task: "document" } });
      return C4.embedding?.length && x2.hydrateFromEmbedding(new Float32Array(C4.embedding)), x2;
    });
    e.hydrateFromGeneration(i4, { model: n2.model, serverVersion: n2.meta?.server_version ?? "0.0.0" });
  }
  async patchDynamicContent(e, t5) {
    let { instruction: r4, segments: a7 } = t5.params, n2 = /* @__PURE__ */ new Map(), i4 = a7.map((E4, J) => {
      let Y2 = `s${J}`;
      return n2.set(Y2, String(E4.id)), { id: Y2, index: J, text: E4.content, vector: E4.vector ? Array.from(E4.vector.values) : void 0 };
    }), C4 = new p2("POST", "/api/v1/content/patch", { prompt: e.prompt, segments: i4, instruction: r4, model: e.modelName, ...e.systemPrompt !== void 0 ? { system: e.systemPrompt } : {} }), x2 = new D({ name: "A_FrameChannel.patchDynamicContent", fragments: [C4] }).inherit(c.scope(this));
    await this.call(c2.Request, x2), x2.destroy();
    let b2 = C4.response, re2 = b2.operations.map((E4) => ({ ...E4, targetId: E4.targetId ? n2.get(E4.targetId) ?? E4.targetId : E4.targetId }));
    e.hydrateFromPatch({ ...b2, operations: re2 }, { model: b2.model, serverVersion: b2.meta?.server_version ?? "0.0.0" });
  }
  async generateCompletion(e, t5) {
    let r4 = new p2("POST", "/api/v1/completions/generate", { prompt: e.prompt, options: e.options }), a7 = new D({ name: "A_FrameChannel.generateCompletion", fragments: [r4] }).inherit(c.scope(this));
    try {
      await this.call(c2.Request, a7), a7.destroy();
      let n2 = r4.response;
      if (!n2.text) throw new s2({ title: s2.InvalidRequest, description: `Invalid completion response for prompt "${e.prompt}"` });
      e.hydrateFromGeneration({ text: n2.text, embedding: new Float32Array(n2.embedding), model: n2.model, date: n2.date, aFrameVersion: t5.A_FRAME_VERSION, aFrameServerVersion: n2.meta.server_version });
    } catch (n2) {
      throw new s2({ title: s2.RequestFailed, description: `Failed to generate completion for prompt "${e.prompt}": ${n2 instanceof Error ? n2.message : String(n2)}` });
    }
  }
  async extractSchema(e, t5) {
    let r4 = new p2("POST", "/api/v1/schema/extract", { prompt: e.prompt, schema: e.schema, options: e.options }), a7 = new D({ name: "A_FrameChannel.extractSchema", fragments: [r4] }).inherit(c.scope(this));
    try {
      await this.call(c2.Request, a7), a7.destroy();
      let n2 = r4.response;
      if (!n2.data) throw new s2({ title: s2.InvalidRequest, description: `Invalid scheme extraction response for prompt "${e.prompt}"` });
      e.hydrateFromExtraction(n2.data, { model: n2.model, date: n2.date, aFrameVersion: t5.A_FRAME_VERSION, aFrameServerVersion: n2.meta.server_version });
    } catch (n2) {
      throw new s2({ title: s2.RequestFailed, description: `Failed to extract scheme for prompt "${e.prompt}": ${n2 instanceof Error ? n2.message : String(n2)}` });
    }
  }
}, __name(_a72, "h"), _a72);
j2([x.Extend({ name: r3.Embed, scope: [s] }), k2(0, ke(H)), k2(1, ke(R2))], h3.prototype, "embedDefinition", 1), j2([x.Extend({ name: r2.Embed, scope: [d] }), k2(0, ke(H)), k2(1, ke(R2))], h3.prototype, "embedNamespace", 1), j2([x.Extend({ name: t3.Embed, scope: [i2] }), k2(0, ke(H)), k2(1, ke(R2))], h3.prototype, "embedSegment", 1), j2([x.Extend({ name: v4.Generate, scope: [M] }), k2(0, ke(H)), k2(1, ke(f3))], h3.prototype, "generateDynamicStructure", 1), j2([x.Extend({ name: v4.Patch, scope: [M] }), k2(0, ke(H)), k2(1, ke(f3))], h3.prototype, "patchDynamicStructure", 1), j2([x.Extend({ name: D3.Generate, scope: [N2] }), k2(0, ke(H)), k2(1, ke(S2))], h3.prototype, "generateDynamicFeature", 1), j2([x.Extend({ name: D3.Patch, scope: [N2] }), k2(0, ke(H)), k2(1, ke(S2))], h3.prototype, "patchDynamicFeature", 1), j2([x.Extend({ name: u4.Generate, scope: [v3] }), k2(0, ke(H)), k2(1, ke(_3))], h3.prototype, "generateDynamicContent", 1), j2([x.Extend({ name: u4.Patch, scope: [v3] }), k2(0, ke(H)), k2(1, ke(_3))], h3.prototype, "patchDynamicContent", 1), j2([x.Extend({ name: o2.Generate, scope: [i3] }), k2(0, ke(H)), k2(1, ke(R2))], h3.prototype, "generateCompletion", 1), j2([x.Extend({ name: o.Extract, scope: [a5] }), k2(0, ke(H)), k2(1, ke(R2))], h3.prototype, "extractSchema", 1);

// node_modules/@adaas/a-frame/dist/browser/chunk-KFMVTZ7T.mjs
var _a73;
var a6 = (_a73 = class extends h3 {
  async request(e, i4) {
    let f4 = `${i4.A_FRAME_SERVER_URL}${e.path}`, n2 = new AbortController(), _4 = setTimeout(() => {
      n2.abort(), e.fail(new s2({ title: s2.Timeout, description: `Request to ${e.path} timed out after 15 seconds` }));
    }, 15e3);
    try {
      let m4 = await fetch(f4, { method: e.method, headers: { "Content-Type": "application/json", Authorization: `Bearer ${i4.A_FRAME_SERVER_API_KEY}` }, body: e.body !== void 0 ? JSON.stringify(e.body) : void 0, signal: n2.signal });
      e.complete(await m4.json());
    } catch {
      e.fail(new s2({ title: s2.RequestFailed, description: `Request to ${e.path} failed or timed out` }));
    } finally {
      clearTimeout(_4);
    }
  }
}, __name(_a73, "a"), _a73);
j2([x.Extend({ name: c2.Request, scope: [h3] }), k2(0, ke(p2)), k2(1, ke(A))], a6.prototype, "request", 1);

// node_modules/@adaas/a-frame/dist/browser/chunk-ZEONOTRL.mjs
var _a74;
var u6 = (_a74 = class extends V {
  constructor() {
    if (_a74._instance) return _a74._instance;
    super({ name: "A_FrameIndex" });
    this.definitions = /* @__PURE__ */ new Map();
    this.namespaces = /* @__PURE__ */ new Map();
    this.scope = new D({ name: "A_FrameIndexScope" });
  }
  static get instance() {
    return _a74._instance || (_a74._instance = new _a74()), _a74._instance;
  }
  static get indexSize() {
    return _a74.instance.indexSize;
  }
  static get scope() {
    return c.scope(this);
  }
  static inherit(e) {
    _a74.instance.inherit(e);
  }
  static addDefinition(e) {
    _a74.instance.addDefinition(e);
  }
  static getDefinition(e) {
    return _a74.instance.getDefinition(e);
  }
  static listDefinitions(e) {
    return _a74.instance.listDefinitions(e);
  }
  static removeDefinition(e) {
    _a74.instance.removeDefinition(e);
  }
  static addNamespace(e) {
    _a74.instance.addNamespace(e);
  }
  static getDefaultNamespace() {
    return _a74.instance.getDefaultNamespace();
  }
  static getNamespace(e) {
    return _a74.instance.getNamespace(e);
  }
  static listNamespaces() {
    return _a74.instance.listNamespaces();
  }
  static removeNamespace(e) {
    _a74.instance.removeNamespace(e);
  }
  static search(e, t5 = {}) {
    return _a74.instance.search(e, t5);
  }
  get indexSize() {
    return this.definitions.size;
  }
  inherit(e) {
    this.scope.inherit(e);
  }
  addDefinition(e) {
    this.scope.register(e), this.namespaces.get(e.namespace.id) || this.addNamespace(e.namespace), this.definitions.set(e.id, e);
  }
  getDefinition(e) {
    for (let t5 of this.definitions.values()) if (t5.name === e) return t5;
  }
  listDefinitions(e = {}) {
    let t5 = e.namespace ? typeof e.namespace == "string" ? I.isASEID(e.namespace) ? new I(e.namespace).id : e.namespace : e.namespace.id : void 0, a7 = e.inherit ? Array.isArray(e.inherit) ? e.inherit : [e.inherit] : void 0;
    return [...this.definitions.values()].filter((i4) => !(t5 && i4.namespace.name !== t5 || a7 && !this.matchesInheritanceFilters(i4, a7)));
  }
  removeDefinition(e) {
    this.scope.deregister(e);
  }
  addNamespace(e) {
    this.scope.register(e), this.namespaces.set(e.id, e);
  }
  getNamespace(e) {
    let t5 = typeof e == "string" ? I.isASEID(e) ? new I(e).id : e : e.id;
    return this.namespaces.get(t5);
  }
  getDefaultNamespace() {
    let e = this.getNamespace(_);
    return e || (e = new d({ name: _ }), this.addNamespace(e)), e;
  }
  listNamespaces() {
    return [...this.namespaces.values()];
  }
  removeNamespace(e) {
    this.scope.deregister(e), this.namespaces.delete(e.id);
  }
  search(e, t5 = {}) {
    let { topK: a7 = 10, namespace: i4, minScore: s3 = 0, inherit: c3 } = t5, d4 = c3 ? Array.isArray(c3) ? c3 : [c3] : void 0;
    return [...this.definitions.values()].filter((r4) => !(i4 && r4.namespace.id !== i4 || d4 && !this.matchesInheritanceFilters(r4, d4))).map((r4) => ({ record: r4, score: this.cosineSimilarity(e, r4.vector) })).filter((r4) => r4.score >= s3).sort((r4, m4) => m4.score - r4.score).slice(0, a7).map(({ record: r4, score: m4 }) => ({ record: r4, score: m4 }));
  }
  matchesInheritanceFilters(e, t5) {
    let a7 = this.scope.resolveConstructor(e.name);
    return a7 ? t5.some((i4) => {
      let s3 = i4.class;
      return i4.strict ? Object.getPrototypeOf(a7) === s3 : c.isIndexedInheritedFrom(a7, s3);
    }) : false;
  }
  cosineSimilarity(e, t5) {
    if (!t5) return 0;
    let a7 = e.dot(t5), i4 = e.magnitude() * t5.magnitude();
    return i4 === 0 ? 0 : a7 / i4;
  }
  euclideanDistance(e, t5) {
    this.assertSameLength(e, t5);
    let a7 = 0;
    for (let i4 = 0; i4 < e.length; i4++) {
      let s3 = e.values[i4] - t5.values[i4];
      a7 += s3 * s3;
    }
    return Math.sqrt(a7);
  }
  nearest(e, t5, a7 = 1) {
    return [...t5].map((i4) => ({ vector: i4, score: this.cosineSimilarity(e, i4) })).sort((i4, s3) => s3.score - i4.score).slice(0, a7).map((i4) => i4.vector);
  }
  rank(e, t5) {
    return t5.map((a7) => ({ vector: a7, score: this.cosineSimilarity(e, a7) })).sort((a7, i4) => i4.score - a7.score);
  }
  assertSameLength(e, t5) {
    if (e.length !== t5.length) throw new Error(`Embedding dimension mismatch: ${e.length} vs ${t5.length}`);
  }
}, __name(_a74, "n"), _a74);

// node_modules/@adaas/a-frame/dist/browser/core.mjs
var k3 = ((s3) => (s3.COMPONENT = "component", s3.ENTITY = "entity", s3.CONTAINER = "container", s3.FRAGMENT = "fragment", s3.METHOD = "method", s3))(k3 || {});
var _a75;
var C3 = (_a75 = class {
  static isAllowedTarget(e) {
    return a.isEntityConstructor(e) || a.isComponentConstructor(e) || a.isContainerConstructor(e) || a.isFragmentConstructor(e) || a.isComponentInstance(e) || a.isContainerInstance(e) || a.isEntityInstance(e) || a.isFragmentInstance(e);
  }
  static getTargetName(e) {
    return l.getComponentName(e);
  }
  static getTargetConstructor(e) {
    return typeof e == "function" ? e : e.constructor;
  }
}, __name(_a75, "C"), _a75);
var _a76;
var t4 = (_a76 = class extends P {
}, __name(_a76, "t"), _a76);
t4.InvalidTarget = "A-Frame Index Invalid Target Error", t4.InvalidConfiguration = "A-Frame Index Invalid Configuration Error", t4.IndexDefinitionError = "A-Frame Index Definition Error", t4.IndexMetadataError = "A-Frame Index Metadata Error", t4.IndexRegistryError = "A-Frame Index Registry Error", t4.IndexComponentNotFoundError = "A-Frame Index Component Not Found Error";
function M2(r4) {
  return function(e, o3, n2) {
    let a7;
    switch (true) {
      case (!!o3 && !!n2):
        a7 = "method";
        break;
      case (a.isComponentConstructor(e) || a.isComponentInstance(e)):
        a7 = "component";
        break;
      case (a.isContainerConstructor(e) || a.isContainerInstance(e)):
        a7 = "container";
        break;
      case (a.isEntityConstructor(e) || a.isEntityInstance(e)):
        a7 = "entity";
        break;
      case (a.isFragmentConstructor(e) || a.isFragmentInstance(e)):
        a7 = "fragment";
        break;
      default:
        throw new t4(t4.InvalidTarget, `@A_Frame.Define decorator cannot be applied to the target : ${l.getComponentName(e)}. It can only be applied to classes or methods inheriting from allowed base classes.`);
    }
    let s3 = r4.namespace ? r4.namespace instanceof d ? r4.namespace : u6.getNamespace(r4.namespace) || new d({ name: r4.namespace }) : u6.getDefaultNamespace();
    if (o3 && n2) {
      let m4 = e.constructor, v5 = String(o3), O2 = n2.value.toString();
      return u6.addDefinition(new s({ name: v5, dependency: m4.name, description: r4.description, source: O2, metadata: r4.metadata, type: "method", namespace: s3 })), n2;
    }
    if (!C3.isAllowedTarget(e)) throw new t4(t4.InvalidTarget, `@A_Frame.${a7} decorator cannot be applied to the target : ${l.getComponentName(e)}. It can only be applied to allowed targets.`);
    let F2 = l.getComponentName(e), T = C3.getTargetConstructor(e), y3 = e.toString();
    return u6.addDefinition(new s({ name: F2, description: r4.description, dependency: T.name, source: y3, metadata: r4.metadata, type: a7, namespace: s3 })), e;
  };
}
__name(M2, "M");
function Y(r4 = {}) {
  return function(e, o3, n2) {
    if (!r4.name) throw new t4(t4.InvalidConfiguration, "@A_Frame.Namespace decorator requires a name in the configuration.");
    let a7 = new d({ name: r4.name, description: r4.description });
    u6.addNamespace(a7);
  };
}
__name(Y, "Y");
var _a77;
var E3 = (_a77 = class extends F {
  static Define(e) {
    return M2(e);
  }
  static NameSpace(e) {
    return Y(e);
  }
  get package() {
    return [];
  }
  packDependency(e, o3, n2) {
    e.resolve(o3) || e.register(n2);
  }
}, __name(_a77, "E"), _a77);
var _a78;
var A3 = (_a78 = class extends E3 {
  get package() {
    return [{ ctor: E2, instance: new E2() }, { ctor: A, instance: new A() }, { ctor: w2, instance: new w2() }, { ctor: v2, instance: v2 }, { ctor: _2, instance: new _2() }, { ctor: a6, instance: a6 }];
  }
  async injectDependencies() {
    let e = c.root;
    if (this.package.forEach(({ ctor: o3, instance: n2 }) => this.packDependency(e, o3, n2)), e.resolve(D2) || e.register(D2.instance), !e.resolve(u6)) {
      let o3 = new u6();
      o3.inherit(e), e.register(o3);
    }
  }
  async load(e, o3, n2, a7, s3) {
    if (!n2.encryptionKey && !s3?.hasBundleData) {
      a7.warn("A_Frame (browser): no encryption key and no pre-built bundle data. Seed A_FrameBrowserStorageBlobs.fromBundle(bundle) before concept.load(), or call A_FrameContext.setCredentials({...}) for live-session mode.");
      return;
    }
    s3.bundleMeta && n2.serverVersion && s3.bundleMeta.serverVersion !== n2.serverVersion && a7.warn(`A_Frame bundle was built against server v${s3.bundleMeta.serverVersion} but the current credentials report v${n2.serverVersion}. Hydration may skip records \u2014 rebuild the bundle.`);
    let F2 = o3.listNamespaces(), T = o3.listDefinitions();
    await Promise.all([...F2.map((m4) => Promise.resolve(m4.load()).catch(() => {
    })), ...T.map((m4) => Promise.resolve(m4.load()).catch(() => {
    }))]);
    let y3 = F2.filter((m4) => !m4.isEmbed).length + T.filter((m4) => !m4.isEmbed).length;
    y3 > 0 && a7.warn(`${y3} A-Frame entit${y3 === 1 ? "y" : "ies"} could not be hydrated from the bundle. Rebuild the bundle on the Node side to include them.`);
  }
  async build(e) {
  }
  async start(e) {
  }
}, __name(_a78, "A"), _a78);
j2([Ie.Load()], A3.prototype, "injectDependencies", 1), j2([Ie.Load(), k2(0, ke(D)), k2(1, ke(u6)), k2(2, ke(E2)), k2(3, ke(_2)), k2(4, ke(D2))], A3.prototype, "load", 1), j2([Ie.Build(), k2(0, ke(D))], A3.prototype, "build", 1), j2([Ie.Start(), k2(0, ke(D))], A3.prototype, "start", 1);

// node_modules/@adaas/a-utils/dist/browser/chunk-ZSD77J3W.mjs
var _a79;
var A_FSPolyfillBase = (_a79 = class {
  constructor(logger) {
    this.logger = logger;
    this._initialized = false;
  }
  get isInitialized() {
    return this._initialized;
  }
  async get() {
    if (!this._initialized) {
      await this.init();
    }
    return this._fs;
  }
  async init() {
    try {
      await this.initImplementation();
      this._initialized = true;
    } catch (error) {
      this.logger.error("Failed to initialize fs polyfill", error);
      throw error;
    }
  }
}, __name(_a79, "A_FSPolyfillBase"), _a79);
var _a80;
var A_FSPolyfill = (_a80 = class extends A_FSPolyfillBase {
  constructor(logger) {
    super(logger);
  }
  async initImplementation() {
    this._fs = {
      readFileSync: /* @__PURE__ */ __name((path, encoding) => {
        this.logger.warning("fs.readFileSync not available in browser environment");
        return "";
      }, "readFileSync"),
      existsSync: /* @__PURE__ */ __name((path) => {
        this.logger.warning("fs.existsSync not available in browser environment");
        return false;
      }, "existsSync"),
      createReadStream: /* @__PURE__ */ __name((path) => {
        this.logger.warning("fs.createReadStream not available in browser environment");
        return null;
      }, "createReadStream")
    };
  }
}, __name(_a80, "A_FSPolyfill"), _a80);
var _a81;
var A_CryptoPolyfillBase = (_a81 = class {
  constructor(logger) {
    this.logger = logger;
    this._initialized = false;
  }
  get isInitialized() {
    return this._initialized;
  }
  async get(fsPolyfill) {
    if (!this._initialized) {
      this._fsPolyfill = fsPolyfill;
      await this.init();
    }
    return this._crypto;
  }
  async init() {
    try {
      await this.initImplementation();
      this._initialized = true;
    } catch (error) {
      this.logger.error("Failed to initialize crypto polyfill", error);
      throw error;
    }
  }
}, __name(_a81, "A_CryptoPolyfillBase"), _a81);
var _a82;
var A_CryptoPolyfill = (_a82 = class extends A_CryptoPolyfillBase {
  constructor(logger) {
    super(logger);
  }
  async initImplementation() {
    this._crypto = {
      createFileHash: /* @__PURE__ */ __name(() => {
        this.logger.warning("File hash not available in browser environment");
        return Promise.resolve("");
      }, "createFileHash"),
      createTextHash: /* @__PURE__ */ __name((text, algorithm = "SHA-384") => new Promise(async (resolve, reject) => {
        try {
          if (!crypto.subtle) {
            throw new Error("SubtleCrypto not available");
          }
          const encoder = new TextEncoder();
          const data = encoder.encode(text);
          const hashBuffer = await crypto.subtle.digest(algorithm, data);
          const hashArray = Array.from(new Uint8Array(hashBuffer));
          const hashBase64 = btoa(String.fromCharCode(...hashArray));
          resolve(`${algorithm}-${hashBase64}`);
        } catch (error) {
          reject(error);
        }
      }), "createTextHash")
    };
  }
}, __name(_a82, "A_CryptoPolyfill"), _a82);
var _a83;
var A_HttpPolyfillBase = (_a83 = class {
  constructor(logger) {
    this.logger = logger;
    this._initialized = false;
  }
  get isInitialized() {
    return this._initialized;
  }
  async get() {
    if (!this._initialized) {
      await this.init();
    }
    return this._http;
  }
  async init() {
    try {
      await this.initImplementation();
      this._initialized = true;
    } catch (error) {
      this.logger.error("Failed to initialize http polyfill", error);
      throw error;
    }
  }
}, __name(_a83, "A_HttpPolyfillBase"), _a83);
var _a84;
var A_HttpPolyfill = (_a84 = class extends A_HttpPolyfillBase {
  constructor(logger) {
    super(logger);
  }
  async initImplementation() {
    this._http = {
      request: /* @__PURE__ */ __name((options, callback) => {
        this.logger.warning("http.request not available in browser/test environment, use fetch instead");
        return this.createMockRequest(options, callback, false);
      }, "request"),
      get: /* @__PURE__ */ __name((url, callback) => {
        this.logger.warning("http.get not available in browser/test environment, use fetch instead");
        return this.createMockRequest(typeof url === "string" ? { hostname: url } : url, callback, false);
      }, "get"),
      createServer: /* @__PURE__ */ __name(() => {
        this.logger.error("http.createServer not available in browser/test environment");
        return null;
      }, "createServer")
    };
  }
  createMockRequest(options, callback, isHttps = false) {
    const request = {
      end: /* @__PURE__ */ __name(() => {
        if (callback) {
          const mockResponse = {
            statusCode: 200,
            headers: {},
            on: /* @__PURE__ */ __name((event, handler) => {
              if (event === "data") {
                setTimeout(() => handler("mock data"), 0);
              } else if (event === "end") {
                setTimeout(() => handler(), 0);
              }
            }, "on"),
            pipe: /* @__PURE__ */ __name((dest) => {
              if (dest.write) dest.write("mock data");
              if (dest.end) dest.end();
            }, "pipe")
          };
          setTimeout(() => callback(mockResponse), 0);
        }
      }, "end"),
      write: /* @__PURE__ */ __name((data) => {
      }, "write"),
      on: /* @__PURE__ */ __name((event, handler) => {
      }, "on")
    };
    return request;
  }
}, __name(_a84, "A_HttpPolyfill"), _a84);
var _a85;
var A_HttpsPolyfillBase = (_a85 = class {
  constructor(logger) {
    this.logger = logger;
    this._initialized = false;
  }
  get isInitialized() {
    return this._initialized;
  }
  async get() {
    if (!this._initialized) {
      await this.init();
    }
    return this._https;
  }
  async init() {
    try {
      await this.initImplementation();
      this._initialized = true;
    } catch (error) {
      this.logger.error("Failed to initialize https polyfill", error);
      throw error;
    }
  }
}, __name(_a85, "A_HttpsPolyfillBase"), _a85);
var _a86;
var A_HttpsPolyfill = (_a86 = class extends A_HttpsPolyfillBase {
  constructor(logger) {
    super(logger);
  }
  async initImplementation() {
    this._https = {
      request: /* @__PURE__ */ __name((options, callback) => {
        this.logger.warning("https.request not available in browser/test environment, use fetch instead");
        return this.createMockRequest(options, callback, true);
      }, "request"),
      get: /* @__PURE__ */ __name((url, callback) => {
        this.logger.warning("https.get not available in browser/test environment, use fetch instead");
        return this.createMockRequest(typeof url === "string" ? { hostname: url } : url, callback, true);
      }, "get"),
      createServer: /* @__PURE__ */ __name(() => {
        this.logger.error("https.createServer not available in browser/test environment");
        return null;
      }, "createServer")
    };
  }
  createMockRequest(options, callback, isHttps = true) {
    const request = {
      end: /* @__PURE__ */ __name(() => {
        if (callback) {
          const mockResponse = {
            statusCode: 200,
            headers: {},
            on: /* @__PURE__ */ __name((event, handler) => {
              if (event === "data") {
                setTimeout(() => handler("mock data"), 0);
              } else if (event === "end") {
                setTimeout(() => handler(), 0);
              }
            }, "on"),
            pipe: /* @__PURE__ */ __name((dest) => {
              if (dest.write) dest.write("mock data");
              if (dest.end) dest.end();
            }, "pipe")
          };
          setTimeout(() => callback(mockResponse), 0);
        }
      }, "end"),
      write: /* @__PURE__ */ __name((data) => {
      }, "write"),
      on: /* @__PURE__ */ __name((event, handler) => {
      }, "on")
    };
    return request;
  }
}, __name(_a86, "A_HttpsPolyfill"), _a86);
var _a87;
var A_PathPolyfillBase = (_a87 = class {
  constructor(logger) {
    this.logger = logger;
    this._initialized = false;
  }
  get isInitialized() {
    return this._initialized;
  }
  async get() {
    if (!this._initialized) {
      await this.init();
    }
    return this._path;
  }
  async init() {
    try {
      await this.initImplementation();
      this._initialized = true;
    } catch (error) {
      this.logger.error("Failed to initialize path polyfill", error);
      throw error;
    }
  }
}, __name(_a87, "A_PathPolyfillBase"), _a87);
var _a88;
var A_PathPolyfill = (_a88 = class extends A_PathPolyfillBase {
  constructor(logger) {
    super(logger);
  }
  async initImplementation() {
    this._path = {
      join: /* @__PURE__ */ __name((...paths) => {
        return paths.join("/").replace(/\/+/g, "/");
      }, "join"),
      resolve: /* @__PURE__ */ __name((...paths) => {
        let resolvedPath = "";
        for (const path of paths) {
          if (path.startsWith("/")) {
            resolvedPath = path;
          } else {
            resolvedPath = this._path.join(resolvedPath, path);
          }
        }
        return resolvedPath || "/";
      }, "resolve"),
      dirname: /* @__PURE__ */ __name((path) => {
        const parts = path.split("/");
        return parts.slice(0, -1).join("/") || "/";
      }, "dirname"),
      basename: /* @__PURE__ */ __name((path, ext) => {
        const base = path.split("/").pop() || "";
        return ext && base.endsWith(ext) ? base.slice(0, -ext.length) : base;
      }, "basename"),
      extname: /* @__PURE__ */ __name((path) => {
        const parts = path.split(".");
        return parts.length > 1 ? "." + parts.pop() : "";
      }, "extname"),
      relative: /* @__PURE__ */ __name((from, to) => {
        return to.replace(from, "").replace(/^\//, "");
      }, "relative"),
      normalize: /* @__PURE__ */ __name((path) => {
        return path.replace(/\/+/g, "/").replace(/\/$/, "") || "/";
      }, "normalize"),
      isAbsolute: /* @__PURE__ */ __name((path) => {
        return path.startsWith("/") || /^[a-zA-Z]:/.test(path);
      }, "isAbsolute"),
      parse: /* @__PURE__ */ __name((path) => {
        const ext = this._path.extname(path);
        const base = this._path.basename(path);
        const name = this._path.basename(path, ext);
        const dir = this._path.dirname(path);
        return { root: "/", dir, base, ext, name };
      }, "parse"),
      format: /* @__PURE__ */ __name((pathObject) => {
        return this._path.join(pathObject.dir || "", pathObject.base || "");
      }, "format"),
      sep: "/",
      delimiter: ":"
    };
  }
}, __name(_a88, "A_PathPolyfill"), _a88);
var _a89;
var A_UrlPolyfillBase = (_a89 = class {
  constructor(logger) {
    this.logger = logger;
    this._initialized = false;
  }
  get isInitialized() {
    return this._initialized;
  }
  async get() {
    if (!this._initialized) {
      await this.init();
    }
    return this._url;
  }
  async init() {
    try {
      await this.initImplementation();
      this._initialized = true;
    } catch (error) {
      this.logger.error("Failed to initialize url polyfill", error);
      throw error;
    }
  }
}, __name(_a89, "A_UrlPolyfillBase"), _a89);
var _a90;
var A_UrlPolyfill = (_a90 = class extends A_UrlPolyfillBase {
  constructor(logger) {
    super(logger);
  }
  async initImplementation() {
    this._url = {
      parse: /* @__PURE__ */ __name((urlString) => {
        try {
          const url = new URL(urlString);
          return {
            protocol: url.protocol,
            hostname: url.hostname,
            port: url.port,
            pathname: url.pathname,
            search: url.search,
            hash: url.hash,
            host: url.host,
            href: url.href
          };
        } catch {
          return {};
        }
      }, "parse"),
      format: /* @__PURE__ */ __name((urlObject) => {
        try {
          return new URL("", urlObject.href || `${urlObject.protocol}//${urlObject.host}${urlObject.pathname}${urlObject.search}${urlObject.hash}`).href;
        } catch {
          return "";
        }
      }, "format"),
      resolve: /* @__PURE__ */ __name((from, to) => {
        try {
          return new URL(to, from).href;
        } catch {
          return to;
        }
      }, "resolve"),
      URL: globalThis.URL,
      URLSearchParams: globalThis.URLSearchParams
    };
  }
}, __name(_a90, "A_UrlPolyfill"), _a90);
var _a91;
var A_BufferPolyfillBase = (_a91 = class {
  constructor(logger) {
    this.logger = logger;
    this._initialized = false;
  }
  get isInitialized() {
    return this._initialized;
  }
  async get() {
    if (!this._initialized) {
      await this.init();
    }
    return this._buffer;
  }
  async init() {
    try {
      await this.initImplementation();
      this._initialized = true;
    } catch (error) {
      this.logger.error("Failed to initialize buffer polyfill", error);
      throw error;
    }
  }
}, __name(_a91, "A_BufferPolyfillBase"), _a91);
var _a92;
var A_BufferPolyfill = (_a92 = class extends A_BufferPolyfillBase {
  constructor(logger) {
    super(logger);
  }
  async initImplementation() {
    this._buffer = {
      from: /* @__PURE__ */ __name((data, encoding) => {
        if (typeof data === "string") {
          return new TextEncoder().encode(data);
        }
        return new Uint8Array(data);
      }, "from"),
      alloc: /* @__PURE__ */ __name((size, fill) => {
        const buffer = new Uint8Array(size);
        if (fill !== void 0) {
          buffer.fill(fill);
        }
        return buffer;
      }, "alloc"),
      allocUnsafe: /* @__PURE__ */ __name((size) => {
        return new Uint8Array(size);
      }, "allocUnsafe"),
      isBuffer: /* @__PURE__ */ __name((obj) => {
        return obj instanceof Uint8Array || obj instanceof ArrayBuffer;
      }, "isBuffer"),
      concat: /* @__PURE__ */ __name((list, totalLength) => {
        const length = totalLength || list.reduce((sum, buf) => sum + buf.length, 0);
        const result = new Uint8Array(length);
        let offset = 0;
        for (const buf of list) {
          result.set(buf, offset);
          offset += buf.length;
        }
        return result;
      }, "concat")
    };
  }
}, __name(_a92, "A_BufferPolyfill"), _a92);
var _a93;
var A_ProcessPolyfillBase = (_a93 = class {
  constructor(logger) {
    this.logger = logger;
    this._initialized = false;
  }
  get isInitialized() {
    return this._initialized;
  }
  async get() {
    if (!this._initialized) {
      await this.init();
    }
    return this._process;
  }
  async init() {
    try {
      await this.initImplementation();
      this._initialized = true;
    } catch (error) {
      this.logger.error("Failed to initialize process polyfill", error);
      throw error;
    }
  }
}, __name(_a93, "A_ProcessPolyfillBase"), _a93);
var _a94;
var A_ProcessPolyfill = (_a94 = class extends A_ProcessPolyfillBase {
  constructor(logger) {
    super(logger);
  }
  async initImplementation() {
    this._process = {
      env: {
        NODE_ENV: "browser",
        ...globalThis.process?.env || {}
      },
      argv: ["browser"],
      platform: "browser",
      version: "browser",
      versions: { node: "browser" },
      cwd: /* @__PURE__ */ __name(() => "/", "cwd"),
      exit: /* @__PURE__ */ __name((code) => {
        this.logger.warning("process.exit not available in browser");
        throw new Error(`Process exit with code ${code}`);
      }, "exit"),
      nextTick: /* @__PURE__ */ __name((callback, ...args) => {
        setTimeout(() => callback(...args), 0);
      }, "nextTick")
    };
  }
}, __name(_a94, "A_ProcessPolyfill"), _a94);
var _a95;
var A_Polyfill = (_a95 = class extends F {
  constructor(logger) {
    super();
    this.logger = logger;
    this._initializing = null;
  }
  /**
   * Indicates whether the channel is connected
   */
  get ready() {
    if (!this._initialized) {
      this._initialized = this._loadInternal();
    }
    return this._initialized;
  }
  async load() {
    await this.ready;
  }
  async attachToWindow() {
    if (c.environment !== "browser") return;
    globalThis.A_Polyfill = this;
    globalThis.process = { env: { NODE_ENV: "production" }, cwd: /* @__PURE__ */ __name(() => "/", "cwd") };
    globalThis.__dirname = "/";
  }
  async _loadInternal() {
    this._fsPolyfill = new A_FSPolyfill(this.logger);
    this._cryptoPolyfill = new A_CryptoPolyfill(this.logger);
    this._httpPolyfill = new A_HttpPolyfill(this.logger);
    this._httpsPolyfill = new A_HttpsPolyfill(this.logger);
    this._pathPolyfill = new A_PathPolyfill(this.logger);
    this._urlPolyfill = new A_UrlPolyfill(this.logger);
    this._bufferPolyfill = new A_BufferPolyfill(this.logger);
    this._processPolyfill = new A_ProcessPolyfill(this.logger);
    await this._fsPolyfill.get();
    await this._cryptoPolyfill.get(await this._fsPolyfill.get());
    await this._httpPolyfill.get();
    await this._httpsPolyfill.get();
    await this._pathPolyfill.get();
    await this._urlPolyfill.get();
    await this._bufferPolyfill.get();
    await this._processPolyfill.get();
  }
  /**
   * Allows to use the 'fs' polyfill methods regardless of the environment
   * This method loads the 'fs' polyfill and returns its instance
   * 
   * @returns 
   */
  async fs() {
    await this.ready;
    return await this._fsPolyfill.get();
  }
  /**
   * Allows to use the 'crypto' polyfill methods regardless of the environment
   * This method loads the 'crypto' polyfill and returns its instance
   * 
   * @returns 
   */
  async crypto() {
    await this.ready;
    return await this._cryptoPolyfill.get();
  }
  /**
   * Allows to use the 'http' polyfill methods regardless of the environment
   * This method loads the 'http' polyfill and returns its instance
   * 
   * @returns 
   */
  async http() {
    await this.ready;
    return await this._httpPolyfill.get();
  }
  /**
   * Allows to use the 'https' polyfill methods regardless of the environment
   * This method loads the 'https' polyfill and returns its instance
   * 
   * @returns 
   */
  async https() {
    await this.ready;
    return await this._httpsPolyfill.get();
  }
  /**
   * Allows to use the 'path' polyfill methods regardless of the environment
   * This method loads the 'path' polyfill and returns its instance
   * 
   * @returns 
   */
  async path() {
    await this.ready;
    return await this._pathPolyfill.get();
  }
  /**
   * Allows to use the 'url' polyfill methods regardless of the environment
   * This method loads the 'url' polyfill and returns its instance
   * 
   * @returns 
   */
  async url() {
    await this.ready;
    return await this._urlPolyfill.get();
  }
  /**
   * Allows to use the 'buffer' polyfill methods regardless of the environment
   * This method loads the 'buffer' polyfill and returns its instance
   * 
   * @returns 
   */
  async buffer() {
    await this.ready;
    return await this._bufferPolyfill.get();
  }
  /**
   * Allows to use the 'process' polyfill methods regardless of the environment
   * This method loads the 'process' polyfill and returns its instance
   * 
   * @returns 
   */
  async process() {
    await this.ready;
    return await this._processPolyfill.get();
  }
}, __name(_a95, "A_Polyfill"), _a95);
__decorateClass2([
  Ie.Load()
], A_Polyfill.prototype, "load", 1);
__decorateClass2([
  Ie.Load()
], A_Polyfill.prototype, "attachToWindow", 1);
A_Polyfill = __decorateClass2([
  A3.Define({
    namespace: "A-Utils",
    description: "Polyfill component that provides cross-environment compatibility for Node.js core modules such as fs, crypto, http, https, path, url, buffer, and process. It dynamically loads appropriate polyfills based on the execution environment (Node.js or browser), enabling seamless usage of these modules in different contexts."
  }),
  __decorateParam2(0, ke("A_Logger"))
], A_Polyfill);

// node_modules/@adaas/a-utils/dist/browser/chunk-SEQJPRV7.mjs
var _a96;
var A_ExecutionContext = (_a96 = class extends V {
  constructor(name, defaults) {
    super({ name });
    this._meta = new m();
    for (const key in defaults) {
      this._meta.set(key, defaults[key]);
    }
  }
  [Symbol.iterator]() {
    return this._meta[Symbol.iterator]();
  }
  get meta() {
    return this._meta;
  }
  get(key) {
    return this._meta.get(key);
  }
  set(key, value) {
    this._meta.set(key, value);
    return this;
  }
  has(key) {
    return this._meta.has(key);
  }
  drop(key) {
    this._meta.delete(key);
  }
  clear() {
    this._meta.clear();
    return this;
  }
  toRaw() {
    return this._meta.toJSON();
  }
  toJSON() {
    return {
      name: this.name,
      ...this.meta.toJSON()
    };
  }
}, __name(_a96, "A_ExecutionContext"), _a96);
A_ExecutionContext = __decorateClass2([
  A3.Define({
    namespace: "A-Utils",
    description: "Execution context fragment that provides a structured way to manage metadata and serialized data for execution environments. It allows storing and retrieving key-value pairs, facilitating context-aware operations within the application. It useful in cases when it's necessary to share some runtime data across multiple steps of thee features, or components."
  })
], A_ExecutionContext);

// node_modules/@adaas/a-utils/dist/browser/chunk-SJU7LRGF.mjs
var A_CONSTANTS__CONFIG_ENV_VARIABLES_ARRAY = [];
var _a97;
var A_ConfigError = (_a97 = class extends P {
}, __name(_a97, "A_ConfigError"), _a97);
A_ConfigError.InitializationError = "A-Config Initialization Error";
var _a98;
var A_Config = (_a98 = class extends A_ExecutionContext {
  constructor(config) {
    super("a-config");
    this.DEFAULT_ALLOWED_TO_READ_PROPERTIES = [
      ...de,
      ...A_CONSTANTS__CONFIG_ENV_VARIABLES_ARRAY
    ];
    this._strict = config.strict ?? false;
    this._configProperties = config.variables ?? [];
    for (const key in config.defaults) {
      this.set(
        y.toUpperSnakeCase(key),
        config.defaults[key]
      );
    }
  }
  get strict() {
    return this._strict;
  }
  /** 
    * This method is used to get the configuration property by name
    * 
    * @param property 
    * @returns 
    */
  get(property) {
    if (this._configProperties.includes(property) || this.DEFAULT_ALLOWED_TO_READ_PROPERTIES.includes(property) || !this._strict)
      return super.get(y.toUpperSnakeCase(property));
    throw new A_ConfigError("Property not exists or not allowed to read");
  }
  set(property, value) {
    const array = Array.isArray(property) ? property : typeof property === "string" ? [{ property, value }] : Object.keys(property).map((key) => ({
      property: key,
      value: property[key]
    }));
    for (const { property: property2, value: value2 } of array) {
      super.set(y.toUpperSnakeCase(property2), value2);
    }
  }
}, __name(_a98, "A_Config"), _a98);
A_Config = __decorateClass2([
  A3.Define({
    namespace: "A-Utils",
    description: "Configuration management context that provides structured access to application configuration variables, supporting defaults and strict mode for enhanced reliability. Default environment variables are included for comprehensive configuration handling."
  })
], A_Config);
var _a99;
var ConfigReader = (_a99 = class extends F {
  constructor(polyfill) {
    super();
    this.polyfill = polyfill;
    this.DEFAULT_ALLOWED_TO_READ_PROPERTIES = [
      ...de,
      ...A_CONSTANTS__CONFIG_ENV_VARIABLES_ARRAY
    ];
  }
  async attachContext(container, context, config) {
    if (!config) {
      config = new A_Config({
        defaults: {}
      });
      container.scope.register(config);
    }
    config.set("A_CONCEPT_ROOT_FOLDER", k.A_CONCEPT_ROOT_FOLDER);
  }
  async initialize(config) {
    const data = await this.read();
    for (const key in data) {
      config.set(key, data[key]);
    }
  }
  /**
   * Get the configuration property by Name
   * @param property 
   */
  resolve(property) {
    return property;
  }
  /**
   * This method reads the configuration and sets the values to the context
   * 
   * @returns 
   */
  async read(variables = []) {
    return {};
  }
}, __name(_a99, "ConfigReader"), _a99);
__decorateClass2([
  Ie.Load(),
  __decorateParam2(0, ke($)),
  __decorateParam2(1, ke(D)),
  __decorateParam2(2, ke(A_Config))
], ConfigReader.prototype, "attachContext", 1);
__decorateClass2([
  Ie.Load(),
  __decorateParam2(0, v.Required()),
  __decorateParam2(0, ke(A_Config))
], ConfigReader.prototype, "initialize", 1);
ConfigReader = __decorateClass2([
  A3.Define({
    namespace: "A-Utils",
    description: "Abstract component for reading configuration data from various sources such as files, environment variables, or remote services. This component can be extended to implement specific configuration reading strategies."
  }),
  __decorateParam2(0, v.Required()),
  __decorateParam2(0, ke(A_Polyfill))
], ConfigReader);
var _a100;
var FileConfigReader = (_a100 = class extends ConfigReader {
  constructor() {
    super(...arguments);
    this.FileData = /* @__PURE__ */ new Map();
  }
  /**
   * Get the configuration property Name
   * @param property 
   */
  getConfigurationProperty_File_Alias(property) {
    return y.toCamelCase(property);
  }
  resolve(property) {
    return this.FileData.get(this.getConfigurationProperty_File_Alias(property));
  }
  async read(variables) {
    const fs = await this.polyfill.fs();
    try {
      const data = fs.readFileSync(`${c.concept}.conf.json`, "utf8");
      const config = JSON.parse(data);
      this.FileData = new Map(Object.entries(config));
      return config;
    } catch (error) {
      return {};
    }
  }
}, __name(_a100, "FileConfigReader"), _a100);
FileConfigReader = __decorateClass2([
  A3.Define({
    namespace: "A-Utils",
    description: "Configuration reader that loads configuration data from a JSON file located in the application root directory. It reads the file named after the current concept with a .conf.json extension and parses its contents into the configuration context."
  })
], FileConfigReader);
var _a101;
var ENVConfigReader = (_a101 = class extends ConfigReader {
  async readEnvFile(config, polyfill, feature) {
    const fs = await polyfill.fs();
    if (fs.existsSync(".env"))
      fs.readFileSync(`${config.get("A_CONCEPT_ROOT_FOLDER")}/.env`, "utf-8").split("\n").forEach((line) => {
        const [key, value] = line.split("=");
        if (key && value) {
          k.set(key.trim(), value.trim());
        }
      });
  }
  /**
   * Get the configuration property Name 
   * @param property 
   */
  getConfigurationProperty_ENV_Alias(property) {
    return y.toUpperSnakeCase(property);
  }
  resolve(property) {
    return k.get(this.getConfigurationProperty_ENV_Alias(property));
  }
  async read(variables = []) {
    const allVariables = [
      ...variables,
      ...k.getAllKeys()
    ];
    const config = {};
    allVariables.forEach((variable) => {
      config[variable] = this.resolve(variable);
    });
    return config;
  }
}, __name(_a101, "ENVConfigReader"), _a101);
__decorateClass2([
  Ie.Load({
    before: ["ENVConfigReader.initialize"]
  }),
  __decorateParam2(0, ke(A_Config)),
  __decorateParam2(1, ke(A_Polyfill)),
  __decorateParam2(2, ke(x))
], ENVConfigReader.prototype, "readEnvFile", 1);
ENVConfigReader = __decorateClass2([
  A3.Define({
    namespace: "A-Utils",
    description: "Configuration reader that sources configuration data from environment variables. It supports loading variables from a .env file and maps them to the configuration context, making it suitable for applications running in diverse environments such as local development, staging, and production."
  })
], ENVConfigReader);
var _a102;
var A_ConfigLoader = (_a102 = class extends $ {
  async prepare(polyfill) {
    if (!this.scope.has(A_Config)) {
      const newConfig = new A_Config({
        variables: [
          ...de,
          ...A_CONSTANTS__CONFIG_ENV_VARIABLES_ARRAY
        ],
        defaults: {}
      });
      this.scope.register(newConfig);
    }
    const fs = await polyfill.fs();
    try {
      switch (true) {
        case (c.environment === "server" && !!fs.existsSync(`${c.concept}.conf.json`)):
          this.reader = this.scope.resolve(FileConfigReader);
          break;
        case (c.environment === "server" && !fs.existsSync(`${c.concept}.conf.json`)):
          this.reader = this.scope.resolve(ENVConfigReader);
          break;
        case c.environment === "browser":
          this.reader = this.scope.resolve(ENVConfigReader);
          break;
        default:
          throw new A_ConfigError(
            A_ConfigError.InitializationError,
            `Environment ${c.environment} is not supported`
          );
      }
    } catch (error) {
      if (error instanceof f) {
        throw new A_ConfigError({
          title: A_ConfigError.InitializationError,
          description: `Failed to initialize A_ConfigLoader. Reader not found for environment ${c.environment}`,
          originalError: error
        });
      }
    }
  }
}, __name(_a102, "A_ConfigLoader"), _a102);
__decorateClass2([
  Ie.Load({
    before: /.*/
  }),
  __decorateParam2(0, ke(A_Polyfill))
], A_ConfigLoader.prototype, "prepare", 1);
A_ConfigLoader = __decorateClass2([
  A3.Define({
    namespace: "A-Utils",
    description: "Container responsible for loading and initializing the A_Config component based on the environment and available configuration sources. It can be useful for application that need a separated configuration management and sharable across multiple containers."
  })
], A_ConfigLoader);

// node_modules/@adaas/a-utils/dist/browser/chunk-PJQEW6YV.mjs
var A_LOGGER_DEFAULT_SCOPE_LENGTH = 20;
var A_LOGGER_COLOR_CODES = {
  // System colors (reserved for specific purposes)
  red: "31",
  // Errors, critical issues
  yellow: "33",
  // Warnings, caution messages
  green: "32",
  // Success, completion messages
  // Safe palette for random selection (grey-blue-violet theme)
  blue: "34",
  // Info, general messages
  cyan: "36",
  // Headers, titles
  magenta: "35",
  // Special highlighting
  gray: "90",
  // Debug, less important info
  brightBlue: "94",
  // Bright blue variant
  brightCyan: "96",
  // Bright cyan variant
  brightMagenta: "95",
  // Bright magenta variant
  darkGray: "30",
  // Dark gray
  lightGray: "37",
  // Light gray (white)
  // Extended blue-violet palette
  indigo: "38;5;54",
  // Deep indigo
  violet: "38;5;93",
  // Violet
  purple: "38;5;129",
  // Purple
  lavender: "38;5;183",
  // Lavender
  skyBlue: "38;5;117",
  // Sky blue
  steelBlue: "38;5;67",
  // Steel blue
  slateBlue: "38;5;62",
  // Slate blue
  deepBlue: "38;5;18",
  // Deep blue
  lightBlue: "38;5;153",
  // Light blue
  periwinkle: "38;5;111",
  // Periwinkle
  cornflower: "38;5;69",
  // Cornflower blue
  powder: "38;5;152",
  // Powder blue
  // Additional grays for variety
  charcoal: "38;5;236",
  // Charcoal
  silver: "38;5;250",
  // Silver
  smoke: "38;5;244",
  // Smoke gray
  slate: "38;5;240"
  // Slate gray
};
var A_LOGGER_SAFE_RANDOM_COLORS = [
  "blue",
  "cyan",
  "magenta",
  "gray",
  "brightBlue",
  "brightCyan",
  "brightMagenta",
  "darkGray",
  "lightGray",
  "indigo",
  "violet",
  "purple",
  "lavender",
  "skyBlue",
  "steelBlue",
  "slateBlue",
  "deepBlue",
  "lightBlue",
  "periwinkle",
  "cornflower",
  "powder",
  "charcoal",
  "silver",
  "smoke",
  "slate"
];
var A_LOGGER_ANSI = {
  RESET: "\x1B[0m",
  PREFIX: "\x1B[",
  SUFFIX: "m"
};
var A_LOGGER_TIME_FORMAT = {
  MINUTES_PAD: 2,
  SECONDS_PAD: 2,
  MILLISECONDS_PAD: 3,
  SEPARATOR: ":"
};
var A_LOGGER_FORMAT = {
  SCOPE_OPEN: "[",
  SCOPE_CLOSE: "]",
  TIME_OPEN: "|",
  TIME_CLOSE: "|",
  SEPARATOR: "-------------------------------",
  INDENT_BASE: 3,
  PIPE: "| "
};
var A_LOGGER_TERMINAL = {
  DEFAULT_WIDTH: 80,
  // Default terminal width when can't be detected
  MIN_WIDTH: 40,
  // Minimum width for formatted output
  MAX_LINE_LENGTH_RATIO: 0.8,
  // Use 80% of terminal width for content
  BROWSER_DEFAULT_WIDTH: 120
  // Default width for browser console
};
var A_LOGGER_ENV_KEYS = {
  LOG_LEVEL: "A_LOGGER_LEVEL",
  DEFAULT_SCOPE_LENGTH: "A_LOGGER_DEFAULT_SCOPE_LENGTH",
  DEFAULT_SCOPE_COLOR: "A_LOGGER_DEFAULT_SCOPE_COLOR",
  DEFAULT_LOG_COLOR: "A_LOGGER_DEFAULT_LOG_COLOR"
};
var A_LOGGER_FEATURES = {
  onLog: "A_Logger_onLog"
};
var _a103;
var A_LoggerLogContext = (_a103 = class extends V {
  constructor(level, ...args) {
    super();
    this.level = level;
    this.args = args;
  }
  toJSON() {
    return {
      ...super.toJSON(),
      level: this.level,
      args: this.args
    };
  }
}, __name(_a103, "A_LoggerLogContext"), _a103);
var _a104;
var A_Logger = (_a104 = class extends F {
  // =============================================
  // Constructor and Initialization
  // =============================
  /**
   * Initialize A_Logger with dependency injection
   * Colors are configured through A_Config or generated randomly if not provided
   * 
   * @param scope - The current scope context for message prefixing
   * @param config - Optional configuration for log level filtering and color settings
   */
  constructor(scope, config) {
    super();
    this.scope = scope;
    this.config = config;
    this.COLORS = A_LOGGER_COLOR_CODES;
    this.STANDARD_SCOPE_LENGTH = config?.get(A_LOGGER_ENV_KEYS.DEFAULT_SCOPE_LENGTH) || A_LOGGER_DEFAULT_SCOPE_LENGTH;
    const configScopeColor = config?.get(A_LOGGER_ENV_KEYS.DEFAULT_SCOPE_COLOR);
    const configLogColor = config?.get(A_LOGGER_ENV_KEYS.DEFAULT_LOG_COLOR);
    if (configScopeColor || configLogColor) {
      this.DEFAULT_SCOPE_COLOR = configScopeColor || this.generateColorFromScopeName(this.scope.name);
      this.DEFAULT_LOG_COLOR = configLogColor || this.generateColorFromScopeName(this.scope.name);
    } else {
      const complementaryColors = this.generateComplementaryColorsFromScope(this.scope.name);
      this.DEFAULT_SCOPE_COLOR = complementaryColors.scopeColor;
      this.DEFAULT_LOG_COLOR = complementaryColors.logColor;
    }
    this.TERMINAL_WIDTH = this.detectTerminalWidth();
    this.MAX_CONTENT_WIDTH = Math.floor(this.TERMINAL_WIDTH * A_LOGGER_TERMINAL.MAX_LINE_LENGTH_RATIO);
  }
  static get onLog() {
    return (target, propertyKey, descriptor) => {
      return x.Extend({
        name: A_LOGGER_FEATURES.onLog,
        scope: [A_Logger]
      })(target, propertyKey, descriptor);
    };
  }
  // =============================================
  // Color Generation Utilities
  // =============================================
  /**
   * Generate a simple hash from a string
   * Used to create deterministic color selection based on scope name
   * 
   * @param str - The string to hash
   * @returns A numeric hash value
   */
  simpleHash(str) {
    let hash = 0;
    for (let i4 = 0; i4 < str.length; i4++) {
      const char = str.charCodeAt(i4);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  }
  /**
   * Generate a deterministic color based on scope name
   * Same scope names will always get the same color, but uses safe color palette
   * 
   * @param scopeName - The scope name to generate color for
   * @returns A color key from the safe colors palette
   */
  generateColorFromScopeName(scopeName) {
    const safeColors = A_LOGGER_SAFE_RANDOM_COLORS;
    const hash = this.simpleHash(scopeName);
    const colorIndex = hash % safeColors.length;
    return safeColors[colorIndex];
  }
  /**
   * Generate a pair of complementary colors based on scope name
   * Ensures visual harmony between scope and message colors while being deterministic
   * 
   * @param scopeName - The scope name to base colors on
   * @returns Object with scopeColor and logColor that work well together
   */
  generateComplementaryColorsFromScope(scopeName) {
    const colorPairs = [
      { scopeColor: "indigo", logColor: "lightBlue" },
      { scopeColor: "deepBlue", logColor: "cyan" },
      { scopeColor: "purple", logColor: "lavender" },
      { scopeColor: "steelBlue", logColor: "skyBlue" },
      { scopeColor: "slateBlue", logColor: "periwinkle" },
      { scopeColor: "charcoal", logColor: "silver" },
      { scopeColor: "violet", logColor: "brightMagenta" },
      { scopeColor: "darkGray", logColor: "lightGray" },
      { scopeColor: "cornflower", logColor: "powder" },
      { scopeColor: "slate", logColor: "smoke" }
    ];
    const hash = this.simpleHash(scopeName);
    const pairIndex = hash % colorPairs.length;
    return colorPairs[pairIndex];
  }
  // =============================================
  // Terminal Width Detection
  // =============================================
  /**
   * Detect current terminal width based on environment
   * 
   * Returns appropriate width for different environments:
   * - Node.js: Uses process.stdout.columns if available
   * - Browser: Returns browser default width
   * - Fallback: Returns default terminal width
   * 
   * @returns Terminal width in characters
   */
  detectTerminalWidth() {
    try {
      if (c.environment === "browser") {
        return A_LOGGER_TERMINAL.BROWSER_DEFAULT_WIDTH;
      }
      if (typeof process !== "undefined" && process.stdout && process.stdout.columns) {
        const cols = process.stdout.columns;
        return Math.max(cols, A_LOGGER_TERMINAL.MIN_WIDTH);
      }
      return A_LOGGER_TERMINAL.DEFAULT_WIDTH;
    } catch (error) {
      return A_LOGGER_TERMINAL.DEFAULT_WIDTH;
    }
  }
  /**
   * Wrap text to fit within terminal width while preserving formatting
   * 
   * @param text - Text to wrap
   * @param scopePadding - The scope padding string for alignment
   * @param isFirstLine - Whether this is the first line (affects available width calculation)
   * @returns Array of wrapped lines with proper indentation
   */
  wrapText(text, scopePadding, isFirstLine = true) {
    if (c.environment === "browser") {
      return [text];
    }
    const scopeHeaderLength = this.formattedScope.length + 4 + this.getTime().length + 4;
    const continuationIndent = `${scopePadding}${A_LOGGER_FORMAT.PIPE}`;
    const firstLineMaxWidth = Math.max(this.TERMINAL_WIDTH - scopeHeaderLength - 1, 20);
    const continuationMaxWidth = Math.max(this.TERMINAL_WIDTH - continuationIndent.length, 20);
    if (isFirstLine && text.length <= firstLineMaxWidth) {
      return [text];
    }
    const lines = [];
    const words = text.split(" ");
    let currentLine = "";
    let currentMaxWidth = isFirstLine ? firstLineMaxWidth : continuationMaxWidth;
    for (const word of words) {
      const spaceNeeded = currentLine ? 1 : 0;
      const totalLength = currentLine.length + spaceNeeded + word.length;
      if (totalLength > currentMaxWidth) {
        if (currentLine) {
          lines.push(currentLine);
          currentLine = word;
          currentMaxWidth = continuationMaxWidth;
        } else {
          if (word.length > currentMaxWidth) {
            const chunks = this.splitLongWord(word, currentMaxWidth);
            lines.push(...chunks.slice(0, -1));
            currentLine = chunks[chunks.length - 1];
          } else {
            currentLine = word;
          }
          currentMaxWidth = continuationMaxWidth;
        }
      } else {
        currentLine += (currentLine ? " " : "") + word;
      }
    }
    if (currentLine) {
      lines.push(currentLine);
    }
    return lines.length ? lines : [text];
  }
  /**
   * Split a long word that doesn't fit on a single line
   * 
   * @param word - Word to split
   * @param maxLength - Maximum length per chunk
   * @returns Array of word chunks
   */
  splitLongWord(word, maxLength) {
    const chunks = [];
    for (let i4 = 0; i4 < word.length; i4 += maxLength) {
      chunks.push(word.slice(i4, i4 + maxLength));
    }
    return chunks;
  }
  // =============================================
  // Factory Methods
  // =============================
  // =============================================
  // Scope and Formatting Utilities
  // =============================================
  /**
   * Get the formatted scope length for consistent message alignment
   * Uses a standard length to ensure all messages align properly regardless of scope name
   * 
   * @returns The scope length to use for padding calculations
   */
  get scopeLength() {
    return Math.max(this.scope.name.length, this.STANDARD_SCOPE_LENGTH);
  }
  /**
   * Get the formatted scope name with proper padding, centered within the container
   * Ensures consistent width for all scope names in log output with centered alignment
   * 
   * @returns Centered and padded scope name for consistent formatting
   */
  get formattedScope() {
    const scopeName = this.scope.name;
    const totalLength = this.STANDARD_SCOPE_LENGTH;
    if (scopeName.length >= totalLength) {
      return scopeName.substring(0, totalLength);
    }
    const totalPadding = totalLength - scopeName.length;
    const leftPadding = Math.floor(totalPadding / 2);
    const rightPadding = totalPadding - leftPadding;
    return " ".repeat(leftPadding) + scopeName + " ".repeat(rightPadding);
  }
  // =============================================
  // Message Compilation and Formatting
  // =============================================
  /**
   * Compile log arguments into formatted console output with colors and proper alignment
   * 
   * This method handles the core formatting logic for all log messages:
   * - Applies separate colors for scope and message content
   * - Formats scope names with consistent padding
   * - Handles different data types appropriately
   * - Maintains proper indentation for multi-line content
   * 
   * @param messageColor - The color key to apply to the message content
   * @param args - Variable arguments to format and display
   * @returns Array of formatted strings and/or objects ready for console output
   */
  compile(messageColor, ...args) {
    const timeString = this.getTime();
    const scopePadding = " ".repeat(this.STANDARD_SCOPE_LENGTH + 3);
    const isMultiArg = args.length > 1;
    return [
      // Header with separate colors for scope and message content
      `${A_LOGGER_ANSI.PREFIX}${this.COLORS[this.DEFAULT_SCOPE_COLOR]}${A_LOGGER_ANSI.SUFFIX}${A_LOGGER_FORMAT.SCOPE_OPEN}${this.formattedScope}${A_LOGGER_FORMAT.SCOPE_CLOSE}${A_LOGGER_ANSI.RESET} ${A_LOGGER_ANSI.PREFIX}${this.COLORS[messageColor]}${A_LOGGER_ANSI.SUFFIX}${A_LOGGER_FORMAT.TIME_OPEN}${timeString}${A_LOGGER_FORMAT.TIME_CLOSE}`,
      // Top separator for multi-argument messages
      isMultiArg ? `
${scopePadding}${A_LOGGER_FORMAT.TIME_OPEN}${A_LOGGER_FORMAT.SEPARATOR}` : "",
      // Process each argument with appropriate formatting
      ...args.map((arg, i4) => {
        const shouldAddNewline = i4 > 0 || isMultiArg;
        switch (true) {
          case arg instanceof P:
            return this.compile_A_Error(arg);
          case arg instanceof Error:
            return this.compile_Error(arg);
          case (typeof arg === "object" && arg !== null):
            return this.formatObject(arg, shouldAddNewline, scopePadding);
          default:
            return this.formatString(String(arg), shouldAddNewline, scopePadding);
        }
      }),
      // Bottom separator and color reset
      isMultiArg ? `
${scopePadding}${A_LOGGER_FORMAT.TIME_OPEN}${A_LOGGER_FORMAT.SEPARATOR}${A_LOGGER_ANSI.RESET}` : A_LOGGER_ANSI.RESET
    ];
  }
  /**
   * Format an object for display with proper JSON indentation and terminal width awareness
   * 
   * @param obj - The object to format
   * @param shouldAddNewline - Whether to add a newline prefix
   * @param scopePadding - The padding string for consistent alignment
   * @returns Formatted object string or the object itself for browser environments
   */
  formatObject(obj, shouldAddNewline, scopePadding) {
    if (c.environment === "browser") {
      return obj;
    }
    if (obj === null) {
      return shouldAddNewline ? `
${scopePadding}${A_LOGGER_FORMAT.PIPE}null` : "null";
    }
    if (obj === void 0) {
      return shouldAddNewline ? `
${scopePadding}${A_LOGGER_FORMAT.PIPE}undefined` : "undefined";
    }
    let jsonString;
    try {
      jsonString = JSON.stringify(obj, null, 2);
    } catch (error) {
      try {
        const seen = /* @__PURE__ */ new WeakSet();
        jsonString = JSON.stringify(obj, (key, value) => {
          if (typeof value === "object" && value !== null) {
            if (seen.has(value)) {
              return "[Circular Reference]";
            }
            seen.add(value);
          }
          return value;
        }, 2);
      } catch (fallbackError) {
        jsonString = String(obj);
      }
    }
    const continuationIndent = `${scopePadding}${A_LOGGER_FORMAT.PIPE}`;
    const maxJsonLineWidth = this.TERMINAL_WIDTH - continuationIndent.length - 4;
    const lines = jsonString.split("\n").map((line) => {
      const stringValueMatch = line.match(/^(\s*"[^"]+":\s*")([^"]+)(".*)?$/);
      if (stringValueMatch && stringValueMatch[2].length > maxJsonLineWidth - stringValueMatch[1].length - (stringValueMatch[3] || "").length) {
        const [, prefix, value, suffix = ""] = stringValueMatch;
        if (value.length > maxJsonLineWidth - prefix.length - suffix.length) {
          const wrappedValue = this.wrapJsonStringValue(value, maxJsonLineWidth - prefix.length - suffix.length);
          return prefix + wrappedValue + suffix;
        }
      }
      return line;
    });
    const formatted = lines.join("\n" + continuationIndent);
    return shouldAddNewline ? "\n" + continuationIndent + formatted : formatted;
  }
  /**
   * Wrap a long JSON string value while preserving readability
   * 
   * @param value - The string value to wrap
   * @param maxWidth - Maximum width for the value
   * @returns Wrapped string value
   */
  wrapJsonStringValue(value, maxWidth) {
    if (value.length <= maxWidth) {
      return value;
    }
    if (maxWidth > 6) {
      return value.substring(0, maxWidth - 3) + "...";
    } else {
      return value.substring(0, Math.max(1, maxWidth));
    }
  }
  /**
   * Format a string for display with proper indentation and terminal width wrapping
   * 
   * @param str - The string to format
   * @param shouldAddNewline - Whether to add a newline prefix
   * @param scopePadding - The padding string for consistent alignment
   * @returns Formatted string
   */
  formatString(str, shouldAddNewline, scopePadding) {
    if (c.environment === "browser") {
      const prefix = shouldAddNewline ? "\n" : "";
      return (prefix + str).replace(/\n/g, `
${scopePadding}${A_LOGGER_FORMAT.PIPE}`);
    }
    const wrappedLines = this.wrapText(str, scopePadding, !shouldAddNewline);
    const continuationIndent = `${scopePadding}${A_LOGGER_FORMAT.PIPE}`;
    const formattedLines = wrappedLines.map((line, index) => {
      if (index === 0 && !shouldAddNewline) {
        return line;
      } else {
        return `${continuationIndent}${line}`;
      }
    });
    if (shouldAddNewline) {
      return "\n" + formattedLines.join("\n");
    } else {
      return formattedLines.join("\n");
    }
  }
  // =============================================
  // Log Level Management
  // =============================================
  /**
   * Determine if a log message should be output based on configured log level
   * 
   * Log level hierarchy:
   * - debug: Shows all messages (debug, info, warning, error)
   * - info: Shows info, warning, and error messages
   * - warn: Shows warning and error messages only
   * - error: Shows error messages only
   * - all: Shows all messages (alias for debug)
   * 
   * @param logMethod - The type of log method being called
   * @returns True if the message should be logged, false otherwise
   */
  shouldLog(logMethod) {
    const shouldLog = this.config?.get(A_LOGGER_ENV_KEYS.LOG_LEVEL) || "info";
    switch (shouldLog) {
      case "debug":
        return true;
      case "info":
        return logMethod === "info" || logMethod === "warning" || logMethod === "error";
      case "warn":
        return logMethod === "warning" || logMethod === "error";
      case "error":
        return logMethod === "error";
      case "all":
        return true;
      default:
        return false;
    }
  }
  debug(param1, ...args) {
    if (!this.shouldLog("debug")) return;
    const callScope = new D({
      name: this.scope.name + ":debug",
      fragments: [new A_LoggerLogContext("debug", ...args)]
    }).inherit(this.scope);
    let compiled = [];
    if (typeof param1 === "string" && this.COLORS[param1]) {
      compiled = this.compile(param1, ...args);
    } else {
      compiled = this.compile(this.DEFAULT_LOG_COLOR, param1, ...args);
    }
    try {
      console.log(...compiled);
      this.call(A_LOGGER_FEATURES.onLog, callScope);
    } finally {
      callScope.destroy();
    }
  }
  info(param1, ...args) {
    if (!this.shouldLog("info")) return;
    const callScope = new D({
      name: this.scope.name + ":info",
      fragments: [new A_LoggerLogContext("info", ...args)]
    }).inherit(this.scope);
    let compiled = [];
    if (typeof param1 === "string" && this.COLORS[param1]) {
      compiled = this.compile(param1, ...args);
    } else {
      compiled = this.compile(this.DEFAULT_LOG_COLOR, param1, ...args);
    }
    try {
      console.log(...compiled);
      this.call(A_LOGGER_FEATURES.onLog, callScope);
    } finally {
      callScope.destroy();
    }
  }
  log(param1, ...args) {
    this.info(param1, ...args);
  }
  /**
   * Log warning messages with yellow color coding
   * 
   * Use for non-critical issues that should be brought to attention
   * but don't prevent normal operation
   * 
   * @param args - Arguments to log as warnings
   * 
   * @example
   * ```typescript
   * logger.warning('Deprecated method used');
   * logger.warning('Rate limit approaching:', { current: 95, limit: 100 });
   * ```
   */
  warning(...args) {
    if (!this.shouldLog("warning")) return;
    const callScope = new D({
      name: this.scope.name + ":warning",
      fragments: [new A_LoggerLogContext("warning", ...args)]
    }).inherit(this.scope);
    let compiled = this.compile("yellow", ...args);
    try {
      console.log(...compiled);
      this.call(A_LOGGER_FEATURES.onLog, callScope);
    } finally {
      callScope.destroy();
    }
  }
  /**
   * Log error messages with red color coding
   * 
   * Use for critical issues, exceptions, and failures that need immediate attention
   * 
   * @param args - Arguments to log as errors
   * @returns void (for compatibility with console.log)
   * 
   * @example
   * ```typescript
   * logger.error('Database connection failed');
   * logger.error(new Error('Validation failed'));
   * logger.error('Critical error:', error, { context: 'user-registration' });
   * ```
   */
  error(...args) {
    if (!this.shouldLog("error")) return;
    const callScope = new D({
      name: this.scope.name + ":error",
      fragments: [new A_LoggerLogContext("error", ...args)]
    }).inherit(this.scope);
    let compiled = this.compile("red", ...args);
    try {
      console.log(...compiled);
      this.call(A_LOGGER_FEATURES.onLog, callScope);
    } finally {
      callScope.destroy();
    }
  }
  // =============================================
  // Specialized Error Formatting
  // =============================================
  /**
   * Legacy method for A_Error logging (kept for backward compatibility)
   * 
   * @deprecated Use error() method instead which handles A_Error automatically
   * @param error - The A_Error instance to log
   */
  log_A_Error(error) {
    const time = this.getTime();
    const scopePadding = " ".repeat(this.STANDARD_SCOPE_LENGTH + 3);
    console.log(`\x1B[31m[${this.formattedScope}] |${time}| ERROR ${error.code}
${scopePadding}| ${error.message}
${scopePadding}| ${error.description} 
${scopePadding}|-------------------------------
${scopePadding}| ${error.stack?.split("\n").map((line, index) => index === 0 ? line : `${scopePadding}| ${line}`).join("\n") || "No stack trace"}
${scopePadding}|-------------------------------
\x1B[0m` + (error.originalError ? `\x1B[31m${scopePadding}| Wrapped From  ${error.originalError.message}
${scopePadding}|-------------------------------
${scopePadding}| ${error.originalError.stack?.split("\n").map((line, index) => index === 0 ? line : `${scopePadding}| ${line}`).join("\n") || "No stack trace"}
${scopePadding}|-------------------------------
\x1B[0m` : "") + (error.link ? `\x1B[31m${scopePadding}| Read in docs: ${error.link}
${scopePadding}|-------------------------------
\x1B[0m` : ""));
  }
  /**
   * Format A_Error instances for inline display within compiled messages
   * 
   * Provides detailed formatting for A_Error objects with:
   * - Error code, message, and description
   * - Original error information FIRST (better UX for debugging)
   * - Stack traces with terminal width awareness
   * - Documentation links (if available)
   * - Consistent formatting with rest of logger
   * 
   * @param error - The A_Error instance to format
   * @returns Formatted string ready for display
   */
  compile_A_Error(error) {
    const continuationIndent = `${" ".repeat(this.STANDARD_SCOPE_LENGTH + 3)}${A_LOGGER_FORMAT.PIPE}`;
    const separator = `${continuationIndent}-------------------------------`;
    const lines = [];
    lines.push("");
    lines.push(separator);
    lines.push(`${continuationIndent}A_ERROR: ${error.code}`);
    lines.push(separator);
    const errorMessage = this.wrapText(`Message: ${error.message}`, continuationIndent, false);
    const errorDescription = this.wrapText(`Description: ${error.description}`, continuationIndent, false);
    lines.push(...errorMessage.map((line) => `${continuationIndent}${line}`));
    lines.push(...errorDescription.map((line) => `${continuationIndent}${line}`));
    if (error.originalError) {
      lines.push(separator);
      lines.push(`${continuationIndent}ORIGINAL ERROR:`);
      lines.push(separator);
      const originalMessage = this.wrapText(`${error.originalError.name}: ${error.originalError.message}`, continuationIndent, false);
      lines.push(...originalMessage.map((line) => `${continuationIndent}${line}`));
      if (error.originalError.stack) {
        lines.push(`${continuationIndent}Stack trace:`);
        const stackLines = this.formatStackTrace(error.originalError.stack, continuationIndent);
        lines.push(...stackLines);
      }
    }
    if (error.stack) {
      lines.push(separator);
      lines.push(`${continuationIndent}A_ERROR STACK:`);
      lines.push(separator);
      const stackLines = this.formatStackTrace(error.stack, continuationIndent);
      lines.push(...stackLines);
    }
    if (error.link) {
      lines.push(separator);
      const linkText = this.wrapText(`Documentation: ${error.link}`, continuationIndent, false);
      lines.push(...linkText.map((line) => `${continuationIndent}${line}`));
    }
    lines.push(separator);
    return lines.join("\n");
  }
  /**
   * Format stack trace with proper terminal width wrapping and indentation
   * 
   * @param stack - The stack trace string
   * @param baseIndent - Base indentation for continuation lines
   * @returns Array of formatted stack trace lines
   */
  formatStackTrace(stack, baseIndent) {
    const stackLines = stack.split("\n");
    const formatted = [];
    stackLines.forEach((line, index) => {
      if (line.trim()) {
        const stackIndent = index === 0 ? baseIndent : `${baseIndent}  `;
        const wrappedLines = this.wrapText(line.trim(), stackIndent, false);
        formatted.push(...wrappedLines.map(
          (wrappedLine) => index === 0 && wrappedLine === wrappedLines[0] ? `${baseIndent}${wrappedLine}` : `${baseIndent}  ${wrappedLine}`
        ));
      }
    });
    return formatted;
  }
  /**
   * Format standard Error instances for inline display within compiled messages
   * 
   * Provides clean, readable formatting for standard JavaScript errors with:
   * - Terminal width aware message wrapping
   * - Properly formatted stack traces
   * - Consistent indentation with rest of logger
   * 
   * @param error - The Error instance to format
   * @returns Formatted string ready for display
   */
  compile_Error(error) {
    const continuationIndent = `${" ".repeat(this.STANDARD_SCOPE_LENGTH + 3)}${A_LOGGER_FORMAT.PIPE}`;
    const separator = `${continuationIndent}-------------------------------`;
    const lines = [];
    lines.push("");
    lines.push(separator);
    lines.push(`${continuationIndent}ERROR: ${error.name}`);
    lines.push(separator);
    const errorMessage = this.wrapText(`Message: ${error.message}`, continuationIndent, false);
    lines.push(...errorMessage.map((line) => `${continuationIndent}${line}`));
    if (error.stack) {
      lines.push(separator);
      lines.push(`${continuationIndent}STACK TRACE:`);
      lines.push(separator);
      const stackLines = this.formatStackTrace(error.stack, continuationIndent);
      lines.push(...stackLines);
    }
    lines.push(separator);
    return lines.join("\n");
  }
  // =============================================
  // Utility Methods
  // =============================================
  /**
   * Generate timestamp string for log messages
   * 
   * Format: MM:SS:mmm (minutes:seconds:milliseconds)
   * This provides sufficient precision for debugging while remaining readable
   * 
   * @returns Formatted timestamp string
   * 
   * @example
   * Returns: "15:42:137" for 3:42:15 PM and 137 milliseconds
   */
  getTime() {
    const now = /* @__PURE__ */ new Date();
    const minutes = String(now.getMinutes()).padStart(A_LOGGER_TIME_FORMAT.MINUTES_PAD, "0");
    const seconds = String(now.getSeconds()).padStart(A_LOGGER_TIME_FORMAT.SECONDS_PAD, "0");
    const milliseconds = String(now.getMilliseconds()).padStart(A_LOGGER_TIME_FORMAT.MILLISECONDS_PAD, "0");
    return `${minutes}${A_LOGGER_TIME_FORMAT.SEPARATOR}${seconds}${A_LOGGER_TIME_FORMAT.SEPARATOR}${milliseconds}`;
  }
}, __name(_a104, "A_Logger"), _a104);
A_Logger = __decorateClass2([
  A3.Define({
    namespace: "A-Utils",
    description: "Advanced Logging Component with Scope-based Output Formatting that provides color-coded console output, multi-type support, and configurable log levels for enhanced debugging and monitoring."
  }),
  __decorateParam2(0, ke(D)),
  __decorateParam2(1, ke(A_Config))
], A_Logger);
var A_LoggerEnvVariables = {
  /**
   * Sets the log level for the logger
   * 
   * @example 'debug', 'info', 'warn', 'error'
   */
  A_LOGGER_LEVEL: "A_LOGGER_LEVEL",
  /**     
   * Sets the default scope length for log messages
   * 
   * @example 'A_LOGGER_DEFAULT_SCOPE_LENGTH'
   */
  A_LOGGER_DEFAULT_SCOPE_LENGTH: "A_LOGGER_DEFAULT_SCOPE_LENGTH",
  /**
   * Sets the default color for scope display in log messages
   * 
   * @example 'green', 'blue', 'red', 'yellow', 'gray', 'magenta', 'cyan', 'white', 'pink'
   */
  A_LOGGER_DEFAULT_SCOPE_COLOR: "A_LOGGER_DEFAULT_SCOPE_COLOR",
  /**
   * Sets the default color for log message content
   * 
   * @example 'green', 'blue', 'red', 'yellow', 'gray', 'magenta', 'cyan', 'white', 'pink'
   */
  A_LOGGER_DEFAULT_LOG_COLOR: "A_LOGGER_DEFAULT_LOG_COLOR"
};
var A_LoggerEnvVariablesArray = [
  A_LoggerEnvVariables.A_LOGGER_LEVEL,
  A_LoggerEnvVariables.A_LOGGER_DEFAULT_SCOPE_LENGTH,
  A_LoggerEnvVariables.A_LOGGER_DEFAULT_SCOPE_COLOR,
  A_LoggerEnvVariables.A_LOGGER_DEFAULT_LOG_COLOR
];

// node_modules/@adaas/a-utils/dist/browser/chunk-JI2IP6BQ.mjs
var _a105;
var A_UtilsHelper = (_a105 = class extends F {
  // ─────────────────────────────────────────────────────────────────────────────
  // ── Hashing ──────────────────────────────────────────────────────────────────
  // ─────────────────────────────────────────────────────────────────────────────
  /**
   * Produces a deterministic, collision-resistant hash string for any JS value.
   * 
   * Improvements over the legacy `createHash`:
   *  - **Null-safe** — handles `null` without throwing  
   *  - **Function-aware serialization** — functions inside objects / arrays are
   *    serialized via `.toString()` so `{ fn: () => 1 }` ≠ `{}`  
   *  - **FNV-1a 52-bit** — better avalanche / distribution than DJB2-32,
   *    and uses the safe JS integer range so the result is always positive  
   *  - **Hex output** — compact, URL-safe, fixed-width (13 chars)
   * 
   * @param value  Any value: string, number, boolean, null, undefined,
   *               object, array, Map, Set, function, or a mix of these.
   * @returns      A 13-character lower-hex string (52-bit FNV-1a).
   */
  static hash(value) {
    const source = A_UtilsHelper.serialize(value);
    return A_UtilsHelper.fnv1a52(source);
  }
  // ─────────────────────────────────────────────────────────────────────────────
  // ── Serialization ────────────────────────────────────────────────────────────
  // ─────────────────────────────────────────────────────────────────────────────
  /**
   * Converts any JS value into a deterministic string representation
   * suitable for hashing.
   * 
   * Key properties:
   *  - **Deterministic**: same logical value → same string every time
   *  - **Injective-ish**: structurally different values produce different
   *    strings (type tags prevent `"3"` vs `3` collisions)
   *  - **Recursive**: handles nested objects, arrays, Maps, Sets
   *  - **Function-aware**: serializes functions via `.toString()`
   * 
   * @param value  Anything.
   * @returns      A deterministic string.
   */
  static serialize(value) {
    if (value === null) return "<null>";
    if (value === void 0) return "<undefined>";
    switch (typeof value) {
      case "string":
        return `s:${value}`;
      case "number":
        return `n:${value}`;
      case "boolean":
        return `b:${value}`;
      case "bigint":
        return `bi:${value}`;
      case "symbol":
        return `sym:${value.toString()}`;
      case "function":
        return `fn:${value.toString()}`;
    }
    if (value instanceof Map) {
      const entries = Array.from(value.entries()).map(([k4, v5]) => `${A_UtilsHelper.serialize(k4)}=>${A_UtilsHelper.serialize(v5)}`).sort().join(",");
      return `Map{${entries}}`;
    }
    if (value instanceof Set) {
      const items = Array.from(value.values()).map((v5) => A_UtilsHelper.serialize(v5)).sort().join(",");
      return `Set{${items}}`;
    }
    if (value instanceof Date) {
      return `Date:${value.toISOString()}`;
    }
    if (value instanceof RegExp) {
      return `RegExp:${value.toString()}`;
    }
    if (Array.isArray(value)) {
      const items = value.map((v5) => A_UtilsHelper.serialize(v5)).join(",");
      return `[${items}]`;
    }
    if (typeof value.toJSON === "function") {
      return `json:${A_UtilsHelper.serialize(value.toJSON())}`;
    }
    const keys = Object.keys(value).sort();
    const pairs = keys.map((k4) => `${k4}:${A_UtilsHelper.serialize(value[k4])}`).join(",");
    return `{${pairs}}`;
  }
  /**
   * Sets a nested property on an object using a dot-separated path string. This method safely navigates through the object structure and sets the value at the specified path, creating intermediate objects as needed. If any part of the path is invalid or if the input parameters are not properly formatted, the method will simply return without making any changes to the object.
   * 
   * @param obj The object on which to set the property.
   * @param path A dot-separated string representing the path to the desired property (e.g., "user.profile.name").
   * @param value The value to set at the specified path.
   * @returns the target object with the updated property, or undefined if the input parameters are invalid.
   */
  static setBypath(obj, path, value) {
    if (!obj || typeof obj !== "object" || !path || typeof path !== "string") {
      return;
    }
    const parts = path.split(".");
    const lastPart = parts.pop();
    const target = parts.reduce((acc, part) => {
      if (acc[part] === void 0) {
        acc[part] = {};
      }
      return acc[part];
    }, obj);
    target[lastPart] = value;
    return obj;
  }
  /**
   * Extracts a nested property from an object using a dot-separated path string. This method safely navigates through the object structure and returns the value at the specified path, or undefined if any part of the path is invalid or does not exist.
   * 
   * @param obj The object from which to extract the property.
   * @param path A dot-separated string representing the path to the desired property (e.g., "user.profile.name"). 
   * @returns The value at the specified path, or undefined if the path is invalid or does not exist. 
   */
  static getByPath(obj, path) {
    if (!path || typeof path !== "string") {
      return obj;
    }
    if (!obj || typeof obj !== "object") {
      return void 0;
    }
    try {
      const result = path.split(".").reduce((acc, part) => {
        if (acc === null || acc === void 0) {
          return void 0;
        }
        return acc[part];
      }, obj);
      return result;
    } catch {
      return void 0;
    }
  }
  // ─────────────────────────────────────────────────────────────────────────────
  // ── FNV-1a (pure Number, no BigInt) ──────────────────────────────────────────
  // ─────────────────────────────────────────────────────────────────────────────
  /**
   * FNV-1a hash using two 32-bit halves to simulate a 52-bit space,
   * without requiring BigInt.
   * 
   * Works identically in:
   *  - All browsers (including Safari 13, IE11 polyfill targets, React Native)
   *  - Node.js (any version)
   *  - Web Workers, Service Workers, Deno, Bun
   * 
   * - Better avalanche than DJB2 (each input bit affects many output bits)
   * - ~52-bit effective space — vastly fewer collisions than 32-bit
   * - Always produces a **positive** hex string of 13 characters
   * 
   * @param input  Pre-serialized string.
   * @returns      13-character lower-hex string.
   */
  static fnv1a52(input) {
    let h1 = 2166136261;
    let h22 = 2114;
    const PRIME = 16777619;
    for (let i4 = 0; i4 < input.length; i4++) {
      h1 ^= input.charCodeAt(i4);
      const product = Math.imul(h1, PRIME);
      h1 = product >>> 0;
      h22 = (Math.imul(h22, PRIME) + (product / 4294967296 >>> 0) & 1048575) >>> 0;
    }
    const combined = h22 * 4294967296 + h1;
    return combined.toString(16).padStart(13, "0");
  }
  hash(caller, context, feature) {
    const hash = A_UtilsHelper.hash(caller);
    context.set(feature.name, hash);
  }
  serialize(caller, context, feature) {
    const serialized = A_UtilsHelper.serialize(caller);
    context.set(feature.name, serialized);
  }
  setByPath(caller, context, feature) {
    const obj = context.get("object");
    const path = context.get("path");
    const value = context.get("value");
    const result = A_UtilsHelper.setBypath(obj, path, value);
    context.set(feature.name, result);
  }
  getByPath(caller, context, feature) {
    const obj = context.get("object");
    const path = context.get("path");
    const result = A_UtilsHelper.getByPath(obj, path);
    context.set(feature.name, result);
  }
}, __name(_a105, "A_UtilsHelper"), _a105);
__decorateClass2([
  A3.Define({
    description: "Instance method wrapper for the static hash function, allowing it to be injected as a dependency."
  }),
  __decorateParam2(0, ke(H)),
  __decorateParam2(1, ke(A_ExecutionContext)),
  __decorateParam2(2, ke(x))
], A_UtilsHelper.prototype, "hash", 1);
__decorateClass2([
  A3.Define({
    description: "Instance method wrapper for the static serialize function, allowing it to be injected as a dependency."
  }),
  __decorateParam2(0, ke(H)),
  __decorateParam2(1, ke(A_ExecutionContext)),
  __decorateParam2(2, ke(x))
], A_UtilsHelper.prototype, "serialize", 1);
__decorateClass2([
  A3.Define({
    description: "Instance method wrapper for the static setByPath function, allowing it to be injected as a dependency."
  }),
  __decorateParam2(0, ke(H)),
  __decorateParam2(1, ke(A_ExecutionContext)),
  __decorateParam2(2, ke(x))
], A_UtilsHelper.prototype, "setByPath", 1);
__decorateClass2([
  A3.Define({
    description: "Instance method wrapper for the static getByPath function, allowing it to be injected as a dependency."
  }),
  __decorateParam2(0, ke(H)),
  __decorateParam2(1, ke(A_ExecutionContext)),
  __decorateParam2(2, ke(x))
], A_UtilsHelper.prototype, "getByPath", 1);
A_UtilsHelper = __decorateClass2([
  A3.Define({
    namespace: "A-Utils",
    description: "Utility helper class providing common functions for A-Utils library, such as hashing and serialization."
  })
], A_UtilsHelper);

// node_modules/@adaas/a-utils/dist/browser/a-signal.mjs
var _a106;
var A_Signal = (_a106 = class extends N {
  /**
   * This method compares the current signal with another signal instance by deduplication ID
   * this id can be configured during initialization with the "id" property.
   * 
   * example: 
   * * const signalA = new A_Signal({ id: ['user-status', 'user123'], data: { status: 'online' } });
   * * const signalB = new A_Signal({ id: ['user-status', 'user123'], data: { status: 'offline' } });
   * 
   * signalA.compare(signalB) // true because both signals have the same deduplication ID
   * 
   * @param other 
   * @returns 
   */
  compare(other) {
    if (this.aseid.id !== other.aseid.id) {
      return false;
    }
    return true;
  }
  /**
   * Allows to define default data for the signal.
   * 
   * If no data is provided during initialization, the default data will be used.
   * 
   * @returns 
   */
  fromUndefined() {
    const name = this.constructor.entity;
    this.data = void 0;
    const identity = {
      name,
      data: this.data
    };
    const id = A_UtilsHelper.hash(identity);
    this.aseid = this.generateASEID({
      entity: name,
      id
    });
  }
  /**
   * Allows to initialize the signal from a new signal entity. This is useful for example when we want to create a new instance of the signal entity with the same data as another instance, but with a different ASEID.
   * 
   * @param newEntity 
   */
  fromNew(newEntity) {
    this.data = newEntity.data;
    const identity = newEntity.id || {
      name: newEntity.name,
      data: this.data
    };
    const id = A_UtilsHelper.hash(identity);
    this.aseid = this.generateASEID({
      entity: newEntity.name,
      id
    });
  }
  /**
   * Allows to initialize the signal from a serialized version of the signal. This is useful for example when we receive a signal from the server and we want to create an instance of the signal entity from the received data.
   * 
   * @param serializedEntity 
   */
  fromJSON(serializedEntity) {
    super.fromJSON(serializedEntity);
    this.data = serializedEntity.data;
  }
  toJSON() {
    return {
      ...super.toJSON(),
      data: this.data
    };
  }
}, __name(_a106, "A_Signal"), _a106);
A_Signal = __decorateClass2([
  A3.Define({
    namespace: "A-Utils",
    description: "A Signal Entity represents an individual signal instance that carries data, used for managing state within an application context. Signals are designed to reflect the current state rather than individual events, making them suitable for scenarios where state monitoring and real-time updates are essential."
  })
], A_Signal);
var _a107;
var A_SignalVector = (_a107 = class extends N {
  constructor(param1, param2) {
    if ("aseid" in param1) {
      super(param1);
    } else {
      super({
        structure: param2 ? param2 : param1.map((s3) => s3.constructor),
        values: param1
      });
    }
  }
  fromNew(newEntity) {
    super.fromNew(newEntity);
    this._structure = newEntity.structure;
    this._signals = newEntity.values;
  }
  /**
   * The structure of the signal vector, defining the types of signals it contains.
   * 
   * For example:
   * [UserSignInSignal, UserStatusSignal, UserActivitySignal]
   * 
   */
  get structure() {
    return this._structure || this._signals.map((s3) => s3.constructor);
  }
  get length() {
    return this.structure.length;
  }
  /**
   * Enables iteration over the signals in the vector.
   * 
   * @returns 
   */
  [Symbol.iterator]() {
    let pointer = 0;
    const signals = this.structure.map((signalConstructor) => {
      const signalIndex = this._signals.findIndex((s3) => s3.constructor === signalConstructor);
      return signalIndex !== -1 ? this._signals[signalIndex] : void 0;
    });
    return {
      next() {
        if (pointer < signals.length) {
          return {
            done: false,
            value: signals[pointer++]
          };
        } else {
          return {
            done: true,
            value: void 0
          };
        }
      }
    };
  }
  /**
   * Checks that 2 vectors are identical by types and data 
   * 
   * e.g. [UserSignInSignal, UserStatusSignal] is equal to [UserSignInSignal, UserStatusSignal] with the same data, 
   * but not equal to [UserStatusSignal, UserSignInSignal] or [UserSignInSignal, UserStatusSignal] with different data.
   * 
   * @param other 
   * @returns 
   */
  equals(other) {
    if (this.structure.length !== other.structure.length) {
      return false;
    }
    for (let i4 = 0; i4 < this.structure.length; i4++) {
      const thisSignalConstructor = this.structure[i4];
      const otherSignalConstructor = other.structure[i4];
      if (thisSignalConstructor !== otherSignalConstructor) {
        return false;
      }
      const thisSignalIndex = this._signals.findIndex((s3) => s3.constructor === thisSignalConstructor);
      const otherSignalIndex = other._signals.findIndex((s3) => s3.constructor === otherSignalConstructor);
      if (thisSignalIndex !== otherSignalIndex) {
        return false;
      }
      const thisSignal = thisSignalIndex !== -1 ? this._signals[thisSignalIndex] : void 0;
      const otherSignal = otherSignalIndex !== -1 ? other._signals[otherSignalIndex] : void 0;
      if (thisSignal && otherSignal) {
        if (!thisSignal.compare(otherSignal)) {
          return false;
        }
      } else if (thisSignal || otherSignal) {
        return false;
      }
    }
    return true;
  }
  /**
   * Allows to match the current Signal Vector with another Signal Vector by comparing each signal in the structure.
   * This method returns true if all signals in the vector A match the corresponding signals in vector B, and false otherwise.
   * 
   * 
   * e.g. [UserSignInSignal, UserStatusSignal] matches [UserStatusSignal, UserSignInSignal] with the same data,
   * 
   * but not matches [UserSignInSignal, UserStatusSignal] with different data or [UserSignInSignal] or [UserSignInSignal, UserStatusSignal, UserActivitySignal].
   * 
   * 
   * @param other 
   * @returns 
   */
  match(other) {
    if (this.length !== other.length) {
      return false;
    }
    for (let i4 = 0; i4 < this.length; i4++) {
      const thisSignalConstructor = this.structure[i4];
      const otherSignalConstructor = other.structure[i4];
      if (thisSignalConstructor !== otherSignalConstructor) {
        return false;
      }
      const thisSignalIndex = this._signals.findIndex((s3) => s3.constructor === thisSignalConstructor);
      const otherSignalIndex = other._signals.findIndex((s3) => s3.constructor === otherSignalConstructor);
      const thisSignal = thisSignalIndex !== -1 ? this._signals[thisSignalIndex] : void 0;
      const otherSignal = otherSignalIndex !== -1 ? other._signals[otherSignalIndex] : void 0;
      if (thisSignal && otherSignal) {
        if (!thisSignal.compare(otherSignal)) {
          return false;
        }
      } else if (thisSignal || otherSignal) {
        return false;
      }
    }
    return true;
  }
  /**
   * Checks if the current Signal Vector includes all signals from another Signal Vector, regardless of order.
   * 
   * e.g. [UserSignInSignal, UserStatusSignal] includes [UserStatusSignal] with the same data,
   * but not includes [UserStatusSignal] with different data or [UserActivitySignal].
   * 
   * @param other 
   */
  includes(other) {
    for (const signalConstructor of other.structure) {
      const signalIndex = this._signals.findIndex((s3) => s3.constructor === signalConstructor);
      if (signalIndex === -1) {
        return false;
      }
    }
    return true;
  }
  /**
   * This method should ensure that the current Signal Vector contains all signals from the provided Signal Vector.
   * 
   * @param signal 
   */
  contains(signal) {
    for (const signalConstructor of signal.structure) {
      const signalIndex = this._signals.findIndex((s3) => s3.constructor === signalConstructor);
      if (signalIndex === -1) {
        return false;
      }
    }
    return true;
  }
  has(param1) {
    let signalConstructor;
    if (a.isEntityInstance(param1)) {
      signalConstructor = param1.constructor;
    } else {
      signalConstructor = param1;
    }
    return this.structure.includes(signalConstructor);
  }
  get(param1) {
    let signalConstructor;
    if (param1 instanceof N) {
      signalConstructor = param1.constructor;
    } else {
      signalConstructor = param1;
    }
    const index = this._signals.findIndex((s3) => s3.constructor === signalConstructor);
    if (index === -1) {
      return void 0;
    }
    return this._signals[index];
  }
  /**
   * Converts to Array of values of signals in the vector
   * Maintains the order specified in the structure/generic type
   * 
   * @param structure - Optional structure to override the default ordering
   * @returns Array of signal instances in the specified order
   */
  toVector(structure) {
    const usedStructure = structure || this.structure;
    return usedStructure.map((signalConstructor) => {
      const signalIndex = this._signals.findIndex((s3) => s3.constructor === signalConstructor);
      return signalIndex !== -1 ? this._signals[signalIndex] : void 0;
    });
  }
  /**
   * Converts to Array of data of signals in the vector
   * Maintains the order specified in the structure/generic type
   * 
   * @param structure - Optional structure to override the default ordering
   * @returns Array of serialized signal data in the specified order
   */
  toDataVector(structure) {
    const usedStructure = structure || this.structure;
    const results = [];
    for (const signalConstructor of usedStructure) {
      const signalIndex = this._signals.findIndex((s3) => s3.constructor === signalConstructor);
      let data;
      if (signalIndex === -1) {
        data = new signalConstructor();
      } else {
        const signal = this._signals[signalIndex];
        data = signal;
      }
      results.push(data?.toJSON().data);
    }
    return results;
  }
  /**
   * Converts to Object with signal constructor names as keys and their corresponding data values
   * Uses the structure ordering to ensure consistent key ordering
   * 
   * @returns Object with signal constructor names as keys and signal data as values
   */
  async toObject(structure) {
    const usedStructure = structure || this.structure;
    const obj = {};
    usedStructure.forEach((signalConstructor) => {
      const signalName = signalConstructor.name;
      const signalIndex = this._signals.findIndex((s3) => s3.constructor === signalConstructor);
      if (signalIndex !== -1) {
        const signal = this._signals[signalIndex];
        obj[signalName] = signal.toJSON().data;
      } else {
        obj[signalName] = void 0;
      }
    });
    return obj;
  }
  /**
   * Serializes the Signal Vector to a JSON-compatible format.
   * 
   * 
   * @returns 
   */
  toJSON() {
    return {
      ...super.toJSON(),
      structure: this.structure.map((s3) => s3.name),
      values: this._signals.map((s3) => s3.toJSON())
    };
  }
}, __name(_a107, "A_SignalVector"), _a107);
A_SignalVector = __decorateClass2([
  A3.Define({
    namespace: "A-Utils",
    description: "A Signal Vector Entity represents a collection of signals structured in a specific way, allowing for batch processing and transmission of related signals as a unified state representation."
  })
], A_SignalVector);
var _a108;
var A_SignalState = (_a108 = class extends V {
  /**
   * Creates a new A_SignalState instance
   * 
   * @param structure - Optional array defining the ordered structure of signal constructors
   *                   This structure is used for vector operations and determines the order
   *                   in which signals are processed and serialized
   */
  constructor(structure) {
    super({ name: "A_SignalState" });
    this._state = /* @__PURE__ */ new Map();
    this._prevState = /* @__PURE__ */ new Map();
    this._structure = structure;
  }
  /**
   * Gets the ordered structure of signal constructors
   * @returns Array of signal constructors in their defined order
   */
  get structure() {
    return this._structure || [];
  }
  set(param1, param2) {
    const signal = param1 instanceof A_Signal ? param1.constructor : param1;
    const value = param1 instanceof A_Signal ? param1 : param2;
    this._prevState.set(signal, this._state.get(signal));
    this._state.set(signal, value);
  }
  get(param) {
    const signal = param instanceof A_Signal ? param.constructor : param;
    return this._state.get(signal);
  }
  getPrev(param) {
    const signal = param instanceof A_Signal ? param.constructor : param;
    return this._prevState.get(signal);
  }
  has(param) {
    const signal = param instanceof A_Signal ? param.constructor : param;
    return this.structure.includes(signal);
  }
  delete(param) {
    const signal = param instanceof A_Signal ? param.constructor : param;
    return this._state.delete(signal);
  }
  /**
   * Converts the current state to a vector (ordered array) format
   * 
   * The order is determined by the structure array provided during construction.
   * Each position in the vector corresponds to a specific signal type's latest value.
   * 
   * @returns Array of signal values in the order defined by the structure
   * @throws Error if structure is not defined or if any signal value is undefined
   */
  toVector() {
    const vector = [];
    this._state.forEach((value, key) => {
      vector.push(value);
    });
    return new A_SignalVector(vector, this.structure);
  }
  /**
   * Converts the current state to an object with signal constructor names as keys
   * 
   * This provides a more readable representation of the state where each signal
   * type is identified by its constructor name.
   * 
   * @returns Object mapping signal constructor names to their latest values
   * @throws Error if any signal value is undefined
   */
  toObject() {
    const obj = {};
    this.structure.forEach((signalConstructor) => {
      const value = this._state.get(signalConstructor);
      if (value === void 0) {
        throw new Error(`Signal ${signalConstructor.name} has no value in state`);
      }
      obj[signalConstructor.name] = value;
    });
    return obj;
  }
}, __name(_a108, "A_SignalState"), _a108);
A_SignalState = __decorateClass2([
  A3.Define({
    namespace: "A-Utils",
    description: "Manages the latest state of all signals within a given scope, maintaining a mapping between signal constructors and their most recently emitted values."
  })
], A_SignalState);
var _a109;
var A_SignalConfig = (_a109 = class extends V {
  get structure() {
    if (this._structure) {
      return this._structure;
    }
    const scope = c.scope(this);
    const constructors = [...scope.allowedEntities].filter((e) => l.isInheritedFrom(e, A_Signal)).sort((a7, b2) => a7.constructor.name.localeCompare(b2.name)).map((s3) => scope.resolveConstructor(s3.name));
    return constructors.filter((s3) => s3);
  }
  /**
   * Uses for synchronization to ensure the config is initialized.
   * 
   * @returns True if the configuration has been initialized.
   */
  get ready() {
    return this._ready;
  }
  constructor(params) {
    super({ name: "A_SignalConfig" });
    this._config = params;
  }
  /**
   * Initializes the signal configuration if not already initialized.
   * 
   * @returns 
   */
  async initialize() {
    if (!this._ready) {
      this._ready = this._initialize();
    }
    return this._ready;
  }
  /**
   * Initializes the signal configuration by processing the provided structure or string representation.
   * This method sets up the internal structure of signal constructors based on the configuration.
   */
  async _initialize() {
    if (this._config.structure) {
      this._structure = this._config.structure;
    } else if (this._config.stringStructure) {
      const stringStructure = this._config.stringStructure.split(",").map((s3) => s3.trim());
      this._structure = stringStructure.map((name) => c.scope(this).resolveConstructor(name)).filter((s3) => s3);
    }
  }
}, __name(_a109, "A_SignalConfig"), _a109);
A_SignalConfig = __decorateClass2([
  A3.Define({
    namespace: "A-Utils",
    description: "Signal configuration fragment that defines the structure and types of signals within a given scope. It allows specifying the expected signal constructors and their order, facilitating consistent signal management and processing across components that emit or listen to signals."
  })
], A_SignalConfig);
var A_SignalBusFeatures = /* @__PURE__ */ ((A_SignalBusFeatures2) => {
  A_SignalBusFeatures2["onBeforeNext"] = "_A_SignalBusFeatures_onBeforeNext";
  A_SignalBusFeatures2["onNext"] = "_A_SignalBusFeatures_onNext";
  A_SignalBusFeatures2["onError"] = "_A_SignalBusFeatures_onError";
  return A_SignalBusFeatures2;
})(A_SignalBusFeatures || {});
var _a110;
var A_SignalBusError = (_a110 = class extends P {
}, __name(_a110, "A_SignalBusError"), _a110);
A_SignalBusError.SignalProcessingError = "Signal processing error";
var _a111;
var _b;
var _c;
var _a112;
var A_SignalBus = (_a112 = class extends F {
  async next(...signals) {
    const scope = new D({
      name: `A_SignalBus-Next-Scope`,
      entities: signals
    }).inherit(c.scope(this));
    try {
      await this.call("_A_SignalBusFeatures_onBeforeNext", c.scope(this));
      await this.call("_A_SignalBusFeatures_onNext", scope);
      scope.destroy();
    } catch (error) {
      let wrappedError;
      switch (true) {
        case error instanceof A_SignalBusError:
          wrappedError = error;
          break;
        case (error instanceof P && error.originalError instanceof A_SignalBusError):
          wrappedError = error.originalError;
          break;
        default:
          wrappedError = new A_SignalBusError({
            title: A_SignalBusError.SignalProcessingError,
            description: `An error occurred while processing the signal.`,
            originalError: error
          });
          break;
      }
      scope.register(wrappedError);
      await this.call("_A_SignalBusFeatures_onError", scope);
      scope.destroy();
    }
  }
  async [
    _c = "_A_SignalBusFeatures_onError"
    /* onError */
  ](error, logger, ...args) {
    logger?.error(error);
  }
  async [
    _b = "_A_SignalBusFeatures_onBeforeNext"
    /* onBeforeNext */
  ](scope, globalConfig, state, logger, config) {
    const componentContext = c.scope(this);
    if (!config) {
      const entries = componentContext.allowedEntities.entries();
      const signalTypes = Array.from(entries).filter(([_4, entity]) => l.isInheritedFrom(entity, A_Signal)).map(([ctor, _4]) => ctor);
      config = new A_SignalConfig({
        structure: signalTypes.length ? signalTypes : void 0,
        stringStructure: globalConfig?.get("A_SIGNAL_VECTOR_STRUCTURE") || void 0
      });
      componentContext.register(config);
    }
    if (!config.ready)
      await config.initialize();
    if (!state) {
      state = new A_SignalState(config.structure);
      componentContext.register(state);
    }
  }
  async [
    _a111 = "_A_SignalBusFeatures_onNext"
    /* onNext */
  ](signals, scope, state, globalConfig, logger, config) {
    for (const signal of signals) {
      if (!state.has(signal))
        return;
      logger?.debug(`A_SignalBus: Updating state for signal '${signal.constructor.name}' with data:`, signal.data);
      state.set(signal);
    }
    const vector = state.toVector();
    scope.register(vector);
  }
}, __name(_a112, "A_SignalBus"), _a112);
__decorateClass2([
  A3.Define({
    description: "Emit multiple signals through the signal bus."
  })
], A_SignalBus.prototype, "next", 1);
__decorateClass2([
  x.Extend({
    before: /.*/
  }),
  __decorateParam2(0, ke(P)),
  __decorateParam2(1, ke(A_Logger))
], A_SignalBus.prototype, _c, 1);
__decorateClass2([
  x.Extend({
    scope: [A_SignalBus],
    before: /.*/
  }),
  __decorateParam2(0, ke(D)),
  __decorateParam2(1, ke(A_Config)),
  __decorateParam2(2, ke(A_SignalState)),
  __decorateParam2(3, ke(A_Logger)),
  __decorateParam2(4, ke(A_SignalConfig))
], A_SignalBus.prototype, _b, 1);
__decorateClass2([
  x.Extend({
    scope: [A_SignalBus],
    before: /.*/
  }),
  __decorateParam2(0, v.Flat()),
  __decorateParam2(0, v.All()),
  __decorateParam2(0, ke(A_Signal)),
  __decorateParam2(1, ke(D)),
  __decorateParam2(2, v.Required()),
  __decorateParam2(2, ke(A_SignalState)),
  __decorateParam2(3, ke(A_Config)),
  __decorateParam2(4, ke(A_Logger)),
  __decorateParam2(5, ke(A_SignalConfig))
], A_SignalBus.prototype, _a111, 1);
A_SignalBus = __decorateClass2([
  A3.Define({
    namespace: "A-Utils",
    description: "Signal bus component that manages the emission and state of signals within a given scope. It listens for emitted signals, updates their state, and forwards them to registered watchers. The bus ensures a consistent signal vector structure based on the defined configuration, facilitating signal management across multiple components."
  })
], A_SignalBus);

// node_modules/@adaas/a-utils/dist/browser/a-service.mjs
var A_ServiceFeatures = /* @__PURE__ */ ((A_ServiceFeatures2) => {
  A_ServiceFeatures2["onBeforeLoad"] = "_A_Service_onBeforeLoad";
  A_ServiceFeatures2["onLoad"] = "_A_Service_onLoad";
  A_ServiceFeatures2["onAfterLoad"] = "_A_Service_onAfterLoad";
  A_ServiceFeatures2["onBeforeStart"] = "_A_Service_onBeforeStart";
  A_ServiceFeatures2["onStart"] = "_A_Service_onStart";
  A_ServiceFeatures2["onAfterStart"] = "_A_Service_onAfterStart";
  A_ServiceFeatures2["onBeforeStop"] = "_A_Service_onBeforeStop";
  A_ServiceFeatures2["onStop"] = "_A_Service_onStop";
  A_ServiceFeatures2["onAfterStop"] = "_A_Service_onAfterStop";
  A_ServiceFeatures2["onError"] = "_A_Service_onError";
  return A_ServiceFeatures2;
})(A_ServiceFeatures || {});
var _a113;
var A_Service_Error = (_a113 = class extends P {
}, __name(_a113, "A_Service_Error"), _a113);
A_Service_Error.ServiceLoadError = "Service load error";
A_Service_Error.ServiceStartError = "Service start error";
A_Service_Error.ServiceStopError = "Service stop error";
var _a114;
var _b2;
var _c2;
var _d;
var _e;
var _f;
var _g;
var _h;
var _i;
var _j;
var _a115;
var A_Service = (_a115 = class extends $ {
  static get onBeforeLoad() {
    return (target, propertyKey, descriptor) => {
      return x.Extend({
        name: "_A_Service_onBeforeLoad",
        scope: [A_Service]
      })(target, propertyKey, descriptor);
    };
  }
  static get onLoad() {
    return (target, propertyKey, descriptor) => {
      return x.Extend({
        name: "_A_Service_onLoad",
        scope: [A_Service]
      })(target, propertyKey, descriptor);
    };
  }
  static get onAfterLoad() {
    return (target, propertyKey, descriptor) => {
      return x.Extend({
        name: "_A_Service_onAfterLoad",
        scope: [A_Service]
      })(target, propertyKey, descriptor);
    };
  }
  static get onBeforeStart() {
    return (target, propertyKey, descriptor) => {
      return x.Extend({
        name: "_A_Service_onBeforeStart",
        scope: [A_Service]
      })(target, propertyKey, descriptor);
    };
  }
  static get onStart() {
    return (target, propertyKey, descriptor) => {
      return x.Extend({
        name: "_A_Service_onStart",
        scope: [A_Service]
      })(target, propertyKey, descriptor);
    };
  }
  static get onAfterStart() {
    return (target, propertyKey, descriptor) => {
      return x.Extend({
        name: "_A_Service_onAfterStart",
        scope: [A_Service]
      })(target, propertyKey, descriptor);
    };
  }
  static get onBeforeStop() {
    return (target, propertyKey, descriptor) => {
      return x.Extend({
        name: "_A_Service_onBeforeStop",
        scope: [A_Service]
      })(target, propertyKey, descriptor);
    };
  }
  static get onStop() {
    return (target, propertyKey, descriptor) => {
      return x.Extend({
        name: "_A_Service_onStop",
        scope: [A_Service]
      })(target, propertyKey, descriptor);
    };
  }
  static get onAfterStop() {
    return (target, propertyKey, descriptor) => {
      return x.Extend({
        name: "_A_Service_onAfterStop",
        scope: [A_Service]
      })(target, propertyKey, descriptor);
    };
  }
  static get onError() {
    return (target, propertyKey, descriptor) => {
      return x.Extend({
        name: "_A_Service_onError",
        scope: [A_Service]
      })(target, propertyKey, descriptor);
    };
  }
  /**
   * Load the service
   */
  async load() {
    try {
      await this.call("_A_Service_onBeforeLoad", this.scope);
      await this.call("_A_Service_onLoad", this.scope);
      await this.call("_A_Service_onAfterLoad", this.scope);
    } catch (error) {
      let wrappedError;
      switch (true) {
        case error instanceof A_Service_Error:
          wrappedError = error;
          break;
        case (error instanceof P && error.originalError instanceof A_Service_Error):
          wrappedError = error.originalError;
          break;
        default:
          wrappedError = new A_Service_Error({
            title: A_Service_Error.ServiceLoadError,
            description: "An error occurred while processing the request.",
            originalError: error
          });
          break;
      }
      this.scope.register(wrappedError);
      await this.call("_A_Service_onError", this.scope);
    }
  }
  /**
   * Start the server
   */
  async start() {
    try {
      await this.call("_A_Service_onBeforeStart", this.scope);
      await this.call("_A_Service_onStart", this.scope);
      await this.call("_A_Service_onAfterStart", this.scope);
    } catch (error) {
      let wrappedError;
      switch (true) {
        case error instanceof A_Service_Error:
          wrappedError = error;
          break;
        case (error instanceof P && error.originalError instanceof A_Service_Error):
          wrappedError = error.originalError;
          break;
        default:
          wrappedError = new A_Service_Error({
            title: A_Service_Error.ServiceStartError,
            description: "An error occurred while processing the request.",
            originalError: error
          });
          break;
      }
      this.scope.register(wrappedError);
      await this.call("_A_Service_onError", this.scope);
    }
  }
  /**
   * Stop the server
   */
  async stop() {
    try {
      await this.call("_A_Service_onBeforeStop", this.scope);
      await this.call("_A_Service_onStop", this.scope);
      await this.call("_A_Service_onAfterStop", this.scope);
    } catch (error) {
      let wrappedError;
      switch (true) {
        case error instanceof A_Service_Error:
          wrappedError = error;
          break;
        case (error instanceof P && error.originalError instanceof A_Service_Error):
          wrappedError = error.originalError;
          break;
        default:
          wrappedError = new A_Service_Error({
            title: A_Service_Error.ServiceStopError,
            description: "An error occurred while processing the request.",
            originalError: error
          });
          break;
      }
      this.scope.register(wrappedError);
      await this.call("_A_Service_onError", this.scope);
    }
  }
  async [
    _j = "_A_Service_onBeforeLoad"
    /* onBeforeLoad */
  ](polyfill, ...args) {
    if (!polyfill) {
      this.scope.register(A_Polyfill);
      polyfill = this.scope.resolve(A_Polyfill);
    }
  }
  async [
    _i = "_A_Service_onLoad"
    /* onLoad */
  ](...args) {
  }
  async [
    _h = "_A_Service_onAfterLoad"
    /* onAfterLoad */
  ](...args) {
  }
  async [
    _g = "_A_Service_onBeforeStart"
    /* onBeforeStart */
  ](...args) {
  }
  async [
    _f = "_A_Service_onStart"
    /* onStart */
  ](...args) {
  }
  async [
    _e = "_A_Service_onAfterStart"
    /* onAfterStart */
  ](...args) {
  }
  async [
    _d = "_A_Service_onBeforeStop"
    /* onBeforeStop */
  ](...args) {
  }
  async [
    _c2 = "_A_Service_onStop"
    /* onStop */
  ](...args) {
  }
  async [
    _b2 = "_A_Service_onAfterStop"
    /* onAfterStop */
  ](...args) {
  }
  async [
    _a114 = "_A_Service_onError"
    /* onError */
  ](error, logger, ...args) {
    logger?.error(error);
  }
}, __name(_a115, "A_Service"), _a115);
__decorateClass2([
  Ie.Load()
], A_Service.prototype, "load", 1);
__decorateClass2([
  Ie.Start()
], A_Service.prototype, "start", 1);
__decorateClass2([
  Ie.Stop()
], A_Service.prototype, "stop", 1);
__decorateClass2([
  x.Extend(),
  __decorateParam2(0, ke(A_Polyfill))
], A_Service.prototype, _j, 1);
__decorateClass2([
  x.Extend()
], A_Service.prototype, _i, 1);
__decorateClass2([
  x.Extend()
], A_Service.prototype, _h, 1);
__decorateClass2([
  x.Extend()
], A_Service.prototype, _g, 1);
__decorateClass2([
  x.Extend()
], A_Service.prototype, _f, 1);
__decorateClass2([
  x.Extend()
], A_Service.prototype, _e, 1);
__decorateClass2([
  x.Extend()
], A_Service.prototype, _d, 1);
__decorateClass2([
  x.Extend()
], A_Service.prototype, _c2, 1);
__decorateClass2([
  x.Extend()
], A_Service.prototype, _b2, 1);
__decorateClass2([
  x.Extend({
    before: /.*/
  }),
  __decorateParam2(0, ke(P)),
  __decorateParam2(1, ke(A_Logger))
], A_Service.prototype, _a114, 1);
A_Service = __decorateClass2([
  A3.Define({
    namespace: "A-Utils",
    description: "Service container that manages the lifecycle of various types of services, such as HTTP servers and workers or UI loader. It dynamically loads necessary components based on the provided configuration and orchestrates the start and stop processes, ensuring proper error handling and extensibility through feature hooks."
  })
], A_Service);

// node_modules/@adaas/a-utils/dist/browser/a-route.mjs
var _a116;
var A_Route = (_a116 = class extends V {
  constructor(url) {
    super();
    this.url = url instanceof RegExp ? url.source : url;
  }
  /**
   * Returns path only without query and hash
   */
  get path() {
    const p3 = this.url.split("?")[0].split("#")[0];
    if (p3.includes("://")) {
      const pathStartIndex = p3.indexOf("/", p3.indexOf("://") + 3);
      if (pathStartIndex === -1) {
        return "/";
      } else {
        const path = p3.slice(pathStartIndex);
        return path.endsWith("/") ? path.slice(0, -1) : path;
      }
    }
    return p3.endsWith("/") ? p3.slice(0, -1) : p3;
  }
  /**
   * Returns array of parameter names in the route path
   */
  get params() {
    return this.path.match(/:([^\/]+)/g)?.map((param) => param.slice(1)) || [];
  }
  /**
   * Returns protocol based on URL scheme
   */
  get protocol() {
    switch (true) {
      case this.url.startsWith("http://"):
        return "http";
      case this.url.startsWith("https://"):
        return "https";
      case this.url.startsWith("ws://"):
        return "ws";
      case this.url.startsWith("wss://"):
        return "wss";
      default:
        return this.url.includes("://") ? this.url.split("://")[0] : "http";
    }
  }
  extractParams(url) {
    const cleanUrl = url.split("?")[0];
    const urlSegments = cleanUrl.split("/").filter(Boolean);
    const maskSegments = this.path.split("/").filter(Boolean);
    const params = {};
    for (let i4 = 0; i4 < maskSegments.length; i4++) {
      const maskSegment = maskSegments[i4];
      const urlSegment = urlSegments[i4];
      if (maskSegment.startsWith(":")) {
        const paramName = maskSegment.slice(1);
        params[paramName] = urlSegment;
      } else if (maskSegment !== urlSegment) {
        return {};
      }
    }
    return params;
  }
  extractQuery(url) {
    const query = {};
    const queryString = url.split("?")[1];
    if (!queryString) return query;
    const cleanQuery = queryString.split("#")[0];
    for (const pair of cleanQuery.split("&")) {
      if (!pair) continue;
      const [key, value = ""] = pair.split("=");
      query[decodeURIComponent(key)] = decodeURIComponent(value);
    }
    return query;
  }
  toString() {
    return `${this.path}`;
  }
  toRegExp() {
    return new RegExp(`^${this.path.replace(/\/:([^\/]+)/g, "/([^/]+)")}$`);
  }
  toAFeatureExtension(extensionScope = []) {
    return new RegExp(`^${extensionScope.length ? `(${extensionScope.join("|")})` : ".*"}\\.${this.path.replace(/\/:([^\/]+)/g, "/([^/]+)")}$`);
  }
}, __name(_a116, "A_Route"), _a116);
A_Route = __decorateClass2([
  A3.Define({
    namespace: "A-Utils",
    description: "Route fragment that defines URL patterns for routing purposes. It supports dynamic parameters and query extraction, allowing for flexible route definitions. This fragment can be used in routing systems to match incoming URLs against defined routes and extract relevant parameters and query strings."
  })
], A_Route);

// node_modules/@adaas/are/dist/browser/index.mjs
var __defProp3 = Object.defineProperty;
var __getOwnPropDesc3 = Object.getOwnPropertyDescriptor;
var __decorateClass3 = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc3(target, key) : target;
  for (var i4 = decorators.length - 1, decorator; i4 >= 0; i4--)
    if (decorator = decorators[i4])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp3(target, key, result);
  return result;
}, "__decorateClass");
var __decorateParam3 = /* @__PURE__ */ __name((index, decorator) => (target, key) => decorator(target, key, index), "__decorateParam");
var _a117;
var AreContext = (_a117 = class extends A_ExecutionContext {
  constructor(source = "") {
    super("AreContext");
    this._roots = [];
    this._signalsMap = /* @__PURE__ */ new Map();
    this._performance = /* @__PURE__ */ new Map();
    this._performanceStart = /* @__PURE__ */ new Map();
    this._performanceDepth = /* @__PURE__ */ new Map();
    this._source = source;
  }
  /**
   * The global object can be used to store any global data or configurations that need to be accessed across different components and entities within the ARE framework. This can include things like theme settings, user preferences, or any other shared data that is relevant to the entire scene or application. By centralizing this information in the context, it allows for easier management and access to global state without needing to pass it through multiple layers of components or entities.
   */
  get globals() {
    return this.get("globals") || {};
  }
  /**
   * The scope of the context, which can be used to access other entities and features within the same scope. This is particularly useful for components that need to interact with other parts of the scene or component, as it allows them to access shared data and functionality without needing to pass it explicitly through parameters.
   */
  get scope() {
    return c.scope(this);
  }
  /**
   * The roots array holds references to the root nodes of the ARE scene, allowing for easy access and management of the top-level components in the rendering hierarchy. The signalsMap is a mapping between root nodes and their associated signal vectors, enabling efficient management of reactive updates and interactions within the ARE framework based on changes in the application state or user input.
   */
  get roots() {
    return this._roots;
  }
  /**
   * This property stores a map between root node and conditions that should be met to render particular component inside the root node. This can be used to manage complex rendering logic and to optimize performance by ensuring that components are only rendered when necessary based on the defined conditions.
   */
  get source() {
    return this._source;
  }
  get performance() {
    const perfObj = [];
    this._performance.forEach((value, key) => {
      perfObj.push(`${key}: ${value} ms`);
    });
    return perfObj;
  }
  get stats() {
    return [
      `- Total Roots: ${this._roots.length}`,
      `- Total Nodes in Scene: ${this._roots.reduce((acc, root) => acc + this.countNodes(root), 0)}`,
      `- Total Instructions: ${this._roots.reduce((acc, root) => acc + this.countInstructions(root), 0)}`
    ];
  }
  countInstructions(node) {
    let count = 0;
    if (node.scene) {
      count += node.scene.instructions.length;
    }
    for (const child of node.children) {
      count += this.countInstructions(child);
    }
    return count;
  }
  countNodes(node) {
    let count = 1;
    for (const child of node.children) {
      count += this.countNodes(child);
    }
    return count;
  }
  /**
   * This property stores a map between root node and conditions that should be met to render particular component inside the root node. This can be used to manage complex rendering logic and to optimize performance by ensuring that components are only rendered when necessary based on the defined conditions.
   * 
   * @param node 
   */
  addRoot(node) {
    this._roots.push(node);
    this.scope.register(node);
  }
  /**
   * This property stores a map between root node and conditions that should be met to render particular component inside the root node. This can be used to manage complex rendering logic and to optimize performance by ensuring that components are only rendered when necessary based on the defined conditions.
   * 
   * @param node 
   */
  removeRoot(node) {
    this._roots = this._roots.filter((r4) => r4.aseid.toString() !== node.aseid.toString());
  }
  startPerformance(label = "default") {
    const depth = this._performanceDepth.get(label) || 0;
    this._performanceDepth.set(label, depth + 1);
    if (depth === 0) {
      this._performanceStart.set(label, Date.now());
    }
  }
  endPerformance(label) {
    const depth = this._performanceDepth.get(label) || 0;
    if (depth <= 1) {
      const startTime = this._performanceStart.get(label) || this._performanceStart.get("default");
      if (startTime) {
        const duration = Date.now() - startTime;
        const accumulated = this._performance.get(label) || 0;
        this._performance.set(label, accumulated + duration);
        this._performanceStart.delete(label);
      }
      this._performanceDepth.delete(label);
    } else {
      this._performanceDepth.set(label, depth - 1);
    }
  }
}, __name(_a117, "AreContext"), _a117);
AreContext = __decorateClass3([
  A3.Define({
    namespace: "A-ARE",
    description: "Context fragment for the A-Concept Rendering Engine (ARE) framework, serving as a foundational component for managing shared state and configurations within the ARE environment. This Context uses to encapsulate global settings, resources, and utilities that can be accessed by various ARE components and entities during the rendering and interaction processes."
  })
], AreContext);
var AreFeatures = {
  //===================================================================================
  // -----------------------------Node Lifecycle Hooks---------------------------------
  //===================================================================================
  /**
   * Allows to define a custom method for the component's initialization logic. This method is called before the component is initialized and can be used to perform any necessary setup or configuration before the component is rendered. It can also be used to implement custom logic for handling specific features or behaviors of the component during the initialization process.
   */
  onBeforeInit: "_Are_onBeforeInit",
  /**
   * Allows to define a custom method for the component's logic that should be executed after the component has been initialized. This method is called after the component has been initialized and can be used to perform any necessary setup or configuration based on the initial state of the component. It can also be used to implement custom logic for handling specific features or behaviors of the component during the post-initialization process.
   */
  onAfterInit: "_Are_onAfterInit",
  //------------------------------------------------------------------------------------
  /**
   * Allows to define a custom method for the component's mounting logic. This method is called before the component is mounted to the DOM and can be used to perform any necessary setup or configuration before the component is rendered. It can also be used to implement custom logic for handling specific features or behaviors of the component during the mounting process.
   */
  onBeforeMount: "_Are_onBeforeMount",
  /**
   * Allows to define a custom method for the component's logic that should be executed after the component has been mounted to the DOM. This method is called after the component has been mounted and can be used to perform any necessary setup or configuration based on the initial state of the component and its presence in the DOM. It can also be used to implement custom logic for handling specific features or behaviors of the component during the post-mounting process.
   */
  onAfterMount: "_Are_onAfterMount",
  //------------------------------------------------------------------------------------
  /**
   * Allows to define a custom method for the component's unmounting logic. This method is called before the component is unmounted from the DOM and can be used to perform any necessary cleanup or teardown before the component is removed. It can also be used to implement custom logic for handling specific features or behaviors of the component during the unmounting process.
   */
  onBeforeUnmount: "_Are_onBeforeUnmount",
  /**
   * Allows to define a custom method for the component's logic that should be executed after the component has been unmounted from the DOM. This method is called after the component has been unmounted and can be used to perform any necessary cleanup or teardown based on the final state of the component and its removal from the DOM. It can also be used to implement custom logic for handling specific features or behaviors of the component during the post-unmounting process.
   */
  onAfterUnmount: "_Are_onAfterUnmount",
  //------------------------------------------------------------------------------------
  /**
   * Allows to define a custom method for the component's update logic. This method is called whenever the component's state changes and can be used to perform any necessary updates or side effects based on the new state. It can also be used to optimize performance by implementing custom logic for determining when the component should re-render based on specific state changes.
   */
  onBeforeUpdate: "_Are_onBeforeUpdate",
  /**
   * Allows to define a custom method for the component's logic that should be executed after the component's state has been updated. This method is called after the component has re-rendered in response to state changes, and can be used to perform any necessary side effects or additional updates based on the new state. It can also be used to implement custom logic for handling specific features or behaviors of the component during the post-update process.
   */
  onAfterUpdate: "_Are_onAfterUpdate",
  /**
   * Allows to define a custom method for the component's logic that should be executed before the component is destroyed. This method is called before the component is destroyed and can be used to perform any necessary cleanup or teardown based on the final state of the component. It can also be used to implement custom logic for handling specific features or behaviors of the component during the pre-destruction process.
   */
  onBeforeDestroy: "_Are_onBeforeDestroy",
  /**
   * Allows to define a custom method for the component's logic that should be executed after the component is destroyed. This method is called after the component has been destroyed and can be used to perform any necessary cleanup or teardown based on the final state of the component. It can also be used to implement custom logic for handling specific features or behaviors of the component during the post-destruction process.
   */
  onAfterDestroy: "_Are_onAfterDestroy",
  //===================================================================================
  // -----------------------------Loading Extension------------------------------------
  //===================================================================================
  onTemplate: "_Are_onTemplate",
  onStyles: "_Are_onStyles",
  onData: "_Are_onData",
  //===================================================================================
  // -----------------------------Runtime Hooks------------------------------------
  //=================================================================================== 
  onSignal: "_Are_onSignal"
};
var AreInstructionFeatures = {
  /**
   * The 'Apply' feature indicates that the instruction has been applied to the scene or component, meaning that its effects have been executed and are now reflected in the state of the scene or component. This status is typically used to track the lifecycle of an instruction, allowing for proper management and potential reversal of changes if needed.
   */
  Apply: "_AreInstruction_Apply",
  /**
   * The 'Update' feature indicates that the instruction has been updated, meaning that its properties or effects have been modified after it was initially applied. This status is important for managing dynamic changes in the scene or component, allowing for adjustments to be made to the instruction's behavior or effects without needing to revert and reapply it entirely.
   */
  Update: "_AreInstruction_Update",
  /**
   * The 'Revert' feature indicates that the instruction has been reverted, meaning that any changes or effects that were applied by the instruction have been undone, and the scene or component has been returned to its previous state before the instruction was applied. This status is crucial for managing the state of the scene or component, especially in cases where an instruction needs to be rolled back due to errors or changes in requirements.
   */
  Revert: "_AreInstruction_Revert"
};
var AreInstructionDefaultNames = {
  Default: "_Are_DefaultInstruction",
  Declaration: "_Are_DeclarationInstruction",
  Mutation: "_Are_MutationInstruction"
};
var _a118;
var AreInstruction = (_a118 = class extends N {
  static get concept() {
    return "are";
  }
  /**
   * The name of the instruction, for example "CreateElement", "AddAttribute", "RemoveNode", etc. This is used to identify the type of the instruction and how to process it. The name should be in PascalCase format, and should be unique across all instruction types. It is recommended to use a prefix that indicates the category of the instruction, for example "CreateElement" for instructions that create new elements, "UpdateAttribute" for instructions that update attributes, etc.
   */
  get name() {
    return this._name;
  }
  /**
   * The payload of the instruction, which can contain any additional information that may be needed for the rendering purpose. For example, for CreateElement instruction, the payload can contain the tag name and parent information, so the Host can use this information to create the element in the correct place in the scene. The payload is optional and can be an empty object if no additional information is needed. 
   * 
   * [!] Note, the payload should be serializable, so it can be stored and transmitted easily. It is recommended to use simple data structures for the payload, such as objects, arrays, strings, numbers, etc., and avoid using complex data types that may not be easily serializable.
   */
  get payload() {
    return this._payload || {};
  }
  /**
   * Group is an optional property that can be used to group instructions together. For example a set of instructions that depend on create CreateElement instruction can be grouped together with the same group name, so if the CreateElement instruction is reverted, all the instructions in the same group will be reverted as well, and so on. This can be useful to manage complex changes that involve multiple instructions. 
   * 
   * [!] Note, the best option is to use ASEID of the Instruction as a group, so all instructions with the same ASEID will be treated as a single change, and will be applied and reverted together.
   */
  get group() {
    return this._group;
  }
  /**
   * The parent instruction ASEID that created this instruction. For example, if we have a CreateElement instruction that creates a new element, and then we have an AddAttribute instruction that adds an attribute to that element, the AddAttribute instruction would have the CreateElement instruction as its parent. This can be used to track the hierarchy of instructions and their dependencies.
   * 
   * [!] Note, the parent should be provided as an ASEID string, so it can be easily referenced and tracked across different contexts and times.
   */
  get parent() {
    return this._parent;
  }
  get id() {
    return this.aseid.id;
  }
  get owner() {
    return c.scope(this).issuer();
  }
  fromNew(newEntity) {
    this.aseid = this.generateASEID({
      // shard: newEntity.node.id,
      entity: y.toKebabCase(newEntity.name)
      // id: id,
    });
    this._name = newEntity.name;
    this._payload = newEntity.payload;
    this._group = newEntity.group?.aseid.toString();
    this._parent = newEntity.parent?.aseid.toString();
  }
  fromUndefined() {
    throw new P({
      title: "Cannot create an instruction without properties",
      description: "AreInstruction cannot be created without properties. Please provide the necessary properties to create an instruction."
    });
  }
  // ===============================================================================
  // ----------------------------Instruction Operations ------------------------------
  // ===============================================================================
  /**
   * Group this instruction with another instruction. This means that when one of the instructions in the group is applied or reverted, all the instructions in the same group will be applied or reverted together. This can be useful to manage complex changes that involve multiple instructions. 
   * 
   * For example, if we have a CreateElement instruction that creates a new element, and then we have an AddAttribute instruction that adds an attribute to that element, we can group them together with the same group name, so if we revert the CreateElement instruction, the AddAttribute instruction will be reverted as well, and so on.
   * 
   * @param instruction 
   * @returns 
   */
  groupWith(instruction) {
    this._group = instruction.id;
    return this;
  }
  /**
   * Ungroup this instruction from any group. This means that this instruction will be treated as an independent instruction, and will not be applied or reverted together with any other instructions. This can be useful when you want to separate an instruction from a group, so it can be applied or reverted independently.
   * 
   * @returns 
   */
  unGroup() {
    this._group = void 0;
    return this;
  }
  /**
   * Attach this instruction to a parent instruction. This means that this instruction will be considered as a child of the parent instruction, and can be used to track the hierarchy of instructions and their dependencies. 
   * 
   * For example, if we have a CreateElement instruction that creates a new element, and then we have an AddAttribute instruction that adds an attribute to that element, we can attach the AddAttribute instruction to the CreateElement instruction as its parent, so we can track that the AddAttribute instruction is related to the CreateElement instruction.
   * 
   * @param parent 
   * @returns 
   */
  attachTo(parent) {
    this._parent = parent.id;
    return this;
  }
  /**
   * Detach this instruction from its parent instruction. This means that this instruction will no longer be considered as a child of the parent instruction, and will not be related to it in any way. This can be useful when you want to separate an instruction from its parent, so it can be treated as an independent instruction.
   * 
   * @returns 
   */
  detach() {
    this._parent = void 0;
    return this;
  }
  // ===============================================================================
  // ----------------------------Instruction Features ------------------------------
  // ===============================================================================
  /**
   * Apply this instruction to the scene. This means that the changes represented by this instruction will be applied to the scene, and the Host will perform the necessary operations to reflect these changes in the rendered output. 
   * 
   * For example, if this instruction is a CreateElement instruction, when we apply it, the Host will create a new element in the scene according to the information provided in the payload of the instruction. If this instruction is an AddAttribute instruction, when we apply it, the Host will add the specified attribute to the target element in the scene. The apply method can also accept an optional scope parameter, which can be used to provide additional context or information that may be needed for applying the instruction.
   * 
   * @param scope 
   */
  apply(scope) {
    this.call(AreInstructionFeatures.Apply, scope);
  }
  /**
   * Update this instruction in the scene. This means that the changes represented by this instruction will be updated in the scene, and the Host will perform the necessary operations to reflect these changes in the rendered output. This is particularly useful for instructions that have dynamic properties or effects that may change over time, allowing for adjustments to be made to the instruction's behavior or effects without needing to revert and reapply it entirely. The update method can also accept an optional scope parameter, which can be used to provide additional context or information that may be needed for updating the instruction.
   * 
   * @param scope 
   */
  update(scope) {
    this.call(AreInstructionFeatures.Update, scope);
  }
  /**
   * Revert this instruction from the scene. This means that the changes represented by this instruction will be reverted from the scene, and the Host will perform the necessary operations to undo these changes in the rendered output.
   * 
   * @param scope 
   */
  revert(scope) {
    this.call(AreInstructionFeatures.Revert, scope);
  }
}, __name(_a118, "AreInstruction"), _a118);
AreInstruction = __decorateClass3([
  A3.Define({
    namespace: "A-ARE",
    description: "AreInstruction is the base entity for all rendering instructions in the ARE framework. It represents a serializable, reversible operation (such as creating or mutating a DOM element) that can be applied to and tracked within the AreScene, enabling deterministic rendering and undo/redo capabilities."
  })
], AreInstruction);
var _a119;
var AreDeclaration = (_a119 = class extends AreInstruction {
  constructor(param1, param2, param3) {
    if (typeof param1 === "object" && "aseid" in param1)
      super(param1);
    else
      super({
        name: param1 || AreInstructionDefaultNames.Default,
        parent: param2 instanceof AreDeclaration ? param2 : void 0,
        group: param2 instanceof AreDeclaration ? param2.group : void 0,
        payload: param2 instanceof AreDeclaration ? param3 || {} : param2 || {}
        // id: [param1, A_IdentityHelper.generateTimeId(), param2 instanceof AreDeclaration ? (param3 || {}) as T : (param2 || {}) as T]
      });
  }
}, __name(_a119, "AreDeclaration"), _a119);
AreDeclaration = __decorateClass3([
  A3.Define({
    namespace: "A-ARE",
    description: "AreDeclaration is a top-level rendering instruction that represents the creation of a new element in the ARE scene. It carries the target tag name and parent reference needed by the Host to construct the DOM element, and can be applied or reverted to manage element creation and removal deterministically."
  })
], AreDeclaration);
var _a120;
var AreSceneError = (_a120 = class extends P {
}, __name(_a120, "AreSceneError"), _a120);
AreSceneError.SceneAlreadyInactive = "AreSceneError.SceneAlreadyInactive";
AreSceneError.SceneAlreadyActive = "AreSceneError.SceneAlreadyActive";
AreSceneError.HostInstructionHasConnectedInstructions = "AreSceneError.HostInstructionHasConnectedInstructions";
AreSceneError.SingleHostInstruction = "AreSceneError.SingleHostInstruction";
AreSceneError.SceneError = "AreSceneError.SceneError";
AreSceneError.RootNotFound = "AreSceneError.RootNotFound";
AreSceneError.UpdateFailed = "AreSceneError.UpdateFailed";
AreSceneError.MountFailed = "AreSceneError.MountFailed";
AreSceneError.UnmountFailed = "AreSceneError.UnmountFailed";
AreSceneError.MountPointNotFound = "AreSceneError.MountPointNotFound";
AreSceneError.InvalidTemplate = "AreSceneError.InvalidTemplate";
AreSceneError.RenderFailed = "AreSceneError.RenderFailed";
var _a121;
var AreInstructionError = (_a121 = class extends P {
}, __name(_a121, "AreInstructionError"), _a121);
var _a122;
var AreMutation = (_a122 = class extends AreInstruction {
  get parent() {
    return this._parent;
  }
  get group() {
    return this._group || this.parent;
  }
  constructor(param1, param2, param3) {
    if (typeof param1 === "object" && "aseid" in param1)
      super(param1);
    else
      super({
        name: param1 || AreInstructionDefaultNames.Mutation,
        group: param2,
        parent: param2,
        payload: param3
        // id: [param1, param3, param2?.group]
      });
  }
  fromNew(newEntity) {
    if (!newEntity.parent)
      throw new AreInstructionError({
        title: "Mutation instruction must have a parent declaration instruction",
        description: `Mutation instruction with name ${newEntity.name} must have a parent declaration instruction for grouping and organization purposes. Please provide a parent declaration instruction when creating this mutation instruction.`
      });
    super.fromNew(newEntity);
  }
}, __name(_a122, "AreMutation"), _a122);
AreMutation = __decorateClass3([
  A3.Define({
    namespace: "A-ARE",
    description: "AreMutation is a rendering instruction that represents a reversible change applied to an existing declaration node in the ARE scene \u2014 such as updating an attribute, modifying content, or altering child structure. It references a parent AreDeclaration and is grouped with related mutations for coordinated apply and revert operations."
  })
], AreMutation);
var AreSceneStatuses = {
  Active: "active",
  Inactive: "inactive",
  Destroyed: "destroyed"
};
var _a123;
var AreScene = (_a123 = class extends V {
  constructor(id) {
    super({ name: id.toString() });
    this._groupToInstructionsMap = /* @__PURE__ */ new Map();
    this._plan = [];
    this._state = [];
    this._status = AreSceneStatuses.Active;
  }
  /**
   * Scene ID that corresponds to the root node's ID (part of ASEID) 
   */
  get id() {
    return this.name;
  }
  /**
   * The scope where scene is registered. This scope is owned by AreNode 
   */
  get scope() {
    return c.scope(this);
  }
  /**
   * The owner node of the scene, which is the node that registered the scene in its scope. 
   * This is typically the node that is responsible for rendering the scene and managing its lifecycle.
   */
  get owner() {
    return this.scope.issuer();
  }
  /**
   * It's a primary declaration instruction that represents the node in the scene, so it should be registered as a host instruction for the scene, and it will be used to keep track of the node in the scene and to manage its lifecycle.
   */
  get host() {
    return this._host;
  }
  /**
   * Scene status is used to determine the current lifecycle stage of the scene, which can be 'active', 'inactive' or 'destroyed'. This status can be used to control the behavior of the scene and its instructions, for example, we can prevent applying new instructions to an inactive or destroyed scene, or we can trigger certain actions when the scene becomes active or inactive. The default status of the scene is 'inactive', which means that the scene is not yet rendered and its instructions are not applied, and it will become 'active' when it is mounted and its instructions are applied, and it will become 'destroyed' when it is unmounted and its instructions are reverted.
   */
  get status() {
    return this._status;
  }
  get isActive() {
    return this.status === AreSceneStatuses.Active;
  }
  get isInactive() {
    return this.status === AreSceneStatuses.Inactive;
  }
  /**
   * Returns All declaration instructions are registered in the scene scope. Since declaration instructions are the main instructions that represent the structure of the node, we have a separate getter for them to easily access and manage them in the scene.
   */
  get declarations() {
    return this.scope.resolve(new v(AreDeclaration, {
      flat: true,
      pagination: {
        count: -1
      }
    })) || [];
  }
  /**
   * Returns All mutation instructions are registered in the scene scope. Mutation instructions are the instructions that represent the changes to be applied to the node, so we have a separate getter for them to easily access and manage them in the scene, especially when we want to apply or revert changes based on the mutations.
   */
  get mutations() {
    return this.scope.resolve(new v(AreMutation, {
      flat: true,
      pagination: {
        count: -1
      }
    })) || [];
  }
  /**
   * Returns All instructions are registered in the scene scope. 
   */
  get instructions() {
    return this.scope.resolveFlatAll(AreInstruction) || [];
  }
  /**
   * Plan is a queue of changes that should be applied to render the node
   * 
   * It works as FIFO, so the first instruction that should be applied is the first one in the queue, and so on.
   */
  get planned() {
    return this._plan;
  }
  /**
   * State is a list of instructions that are currently applied to the node, 
   * so it represents the current state of the node in the scene.
   * 
   * It always in a reverse order of the plan, so the last instruction in the state is the first one that should be reverted when we need to revert the changes, and so on.
   * 
   * For example, if we have a node with two instructions in the plan: [Instruction A, Instruction B], and both of them are applied to the node, then the state will be [Instruction B, Instruction A], so when we need to revert the changes, we will revert Instruction B first, and then Instruction A.
   */
  get applied() {
    return this._state.reverse();
  }
  /**
   * Should return instructions to be reverted and to be applied. 
   * A difference between plan vs state is that plan is what should be applied to the scene, 
   * while state is what currently applied to the scene. 
   * 
   */
  get changes() {
    const toApply = this.planned.filter((i4) => !this.isApplied(i4));
    const toRevert = this.applied.filter((i4) => !this.isInPlan(i4));
    return {
      toApply,
      toRevert
    };
  }
  //===============================================================================================
  //============================= Scene Primary Methods ===========================================
  //===============================================================================================
  activate() {
    this._status = AreSceneStatuses.Active;
  }
  deactivate() {
    this._status = AreSceneStatuses.Inactive;
  }
  /**
   * Each scene has a primary declaration instruction that represents the node in the scene, so it should be registered as a host instruction for the scene, and it will be used to keep track of the node in the scene and to manage its lifecycle. This method allows to set the host instruction for the scene, but it will throw an error if we try to set another host instruction while there is already a host instruction set, so we can ensure that there is only one host instruction for the scene at any given time.
   * 
   * @param instruction 
   */
  setHost(instruction) {
    if (this.host) {
      const dependentInstructions = this.scope.resolve(new v(AreMutation, {
        flat: true,
        pagination: {
          count: -1
        },
        query: {
          parent: this.host.aseid.toString()
        }
      })) || [];
      dependentInstructions.forEach((element) => {
        element.attachTo(instruction);
        element.groupWith(instruction);
      });
    }
    this._host = instruction;
  }
  /**
   * Unsets the current host instruction from the scene. 
   * 
   * This method should be used when we want to remove the primary declaration instruction that represents the node in the scene, for example, when we want to unmount the node or when we want to replace it with another node. Unsetting the host instruction will allow us to set a new host instruction for the scene if needed.
   */
  removeHost() {
    if (this.host)
      throw new AreSceneError({
        title: AreSceneError.HostInstructionHasConnectedInstructions,
        description: `Cannot remove host instruction (${this.host.aseid}) from scene ${this.id} because it has planned instructions in the scene. Please unPlan all instructions related to the host instruction before removing it.`
      });
    this._host = void 0;
  }
  // ------------------------------------------------------------------------------------------------------------
  // Scene Render Plan Methods
  // ------------------------------------------------------------------------------------------------------------
  /**
   * Method that should register the instruction in the plan, so it will be rendered in the next render cycle.
   * 
   * @param instruction 
   */
  plan(instruction) {
    try {
      this.scope.register(instruction);
    } catch (error) {
    }
    this._plan.push(instruction);
    if (!this._groupToInstructionsMap.has(instruction.group || "default")) {
      this._groupToInstructionsMap.set(instruction.group || "default", /* @__PURE__ */ new Set());
    }
    this._groupToInstructionsMap.get(instruction.group || "default").add(instruction);
  }
  planBefore(instruction, beforeInstruction) {
    const beforeIndex = this._plan.findIndex((i4) => i4.aseid.toString() === beforeInstruction.aseid.toString());
    const instructionIndex = this._plan.findIndex((i4) => i4.aseid.toString() === instruction.aseid.toString());
    if (beforeIndex === -1) {
      throw new AreSceneError({
        title: AreSceneError.SceneError,
        description: `Instruction ${beforeInstruction.aseid} is not in the plan of scene ${this.id}. Cannot plan instruction ${instruction.aseid} before it.`
      });
    }
    if (instructionIndex === -1) {
      try {
        this.scope.register(instruction);
      } catch (error) {
      }
      this._plan.splice(beforeIndex, 0, instruction);
    } else {
      this._plan.splice(instructionIndex, 1);
      this._plan.splice(beforeIndex, 0, instruction);
    }
  }
  planAfter(instruction, afterInstruction) {
    const afterIndex = this._plan.findIndex((i4) => i4.aseid.toString() === afterInstruction.aseid.toString());
    const instructionIndex = this._plan.findIndex((i4) => i4.aseid.toString() === instruction.aseid.toString());
    if (afterIndex === -1) {
      throw new AreSceneError({
        title: AreSceneError.SceneError,
        description: `Instruction ${afterInstruction.aseid} is not in the plan of scene ${this.id}. Cannot plan instruction ${instruction.aseid} after it.`
      });
    }
    if (instructionIndex === -1) {
      this.scope.register(instruction);
      this._plan.splice(afterIndex + 1, 0, instruction);
    } else {
      this._plan.splice(instructionIndex, 1);
      this._plan.splice(afterIndex + 1, 0, instruction);
    }
  }
  moveBefore(instruction, beforeInstruction) {
    if (!this.isInPlan(instruction)) {
      throw new AreSceneError({
        title: AreSceneError.SceneError,
        description: `Instruction ${instruction.aseid} is not in the plan of scene ${this.id}. Cannot move instruction before ${beforeInstruction.aseid}. Please plan the instruction before moving it.`
      });
    }
    this.planBefore(instruction, beforeInstruction);
  }
  moveAfter(instruction, afterInstruction) {
    if (!this.isInPlan(instruction)) {
      throw new AreSceneError({
        title: AreSceneError.SceneError,
        description: `Instruction ${instruction.aseid} is not in the plan of scene ${this.id}. Cannot move instruction after ${afterInstruction.aseid}. Please plan the instruction before moving it.`
      });
    }
    this.planAfter(instruction, afterInstruction);
  }
  /**
   * Allows to remove instruction from the plan, so it will not be rendered anymore, but it will still be registered in the scene scope, so it can be planned again if needed.
   * 
   * @param instruction 
   */
  unPlan(instruction) {
    this._plan = this._plan.filter((i4) => i4.aseid.toString() !== instruction.aseid.toString());
  }
  /**
   * Checks if the instruction is already in the plan, so it will be rendered in the next render cycle.
   * 
   * @param instruction 
   * @returns 
   */
  getPlanned(instruction) {
    const found = this._plan.find((i4) => i4.aseid.toString() === instruction.aseid.toString());
    return found;
  }
  /**
   * Checks if the instruction is already in the plan, so it will be rendered in the next render cycle.
   * 
   * @param instruction 
   * @returns 
   */
  isInPlan(instruction) {
    return !!this.getPlanned(instruction);
  }
  // -------------------------------------------------------------------------------------------------------------
  // Scene Apply Methods
  // -------------------------------------------------------------------------------------------------------------
  /**
   * Method moves the instruction to state to keep it applied and to be able to revert it later if needed. The instruction should be already registered in the scene scope and planned to be applied, otherwise it will not be applied.
   * 
   * @param instruction 
   */
  apply(instruction) {
    if (!this.isApplied(instruction)) {
      this._state.push(instruction);
    }
  }
  /**
   * Method moves the instruction from state to unapply it and to be able to apply it later if needed. The instruction should be already registered in the scene scope and applied, otherwise it will not be unapplied.
   * 
   * @param instruction 
   */
  unApply(instruction) {
    this._state = this._state.filter((i4) => i4.aseid.toString() !== instruction.aseid.toString());
  }
  /**
   * Checks if the instruction is already in the state, so it is currently applied to the scene.
   * 
   * @param instruction 
   * @returns 
   */
  getApplied(instruction) {
    const found = this._state.find((i4) => i4.aseid.toString() === instruction.aseid.toString());
    return found;
  }
  /**
   * Checks if the instruction is already in the state, so it is currently applied to the scene.
   * 
   * @param instruction 
   * @returns 
   */
  isApplied(instruction) {
    return !!this.getApplied(instruction);
  }
  /**
   * Method that should reset the scene to the initial state, so it will clear the plan and state, but it will not deregister the instructions from the scene scope, so they will still be registered in the scene and can be planned and applied again if needed.
   * 
   */
  reset() {
    this._plan = [];
    this._state = [];
  }
}, __name(_a123, "AreScene"), _a123);
AreScene = __decorateClass3([
  A3.Define({
    namespace: "A-ARE",
    description: "Persistent runtime structure that owns the rendering state for a component's lifetime. Maintains two sets \u2014 applied (what is currently in the DOM) and planned (what should be). Acts as the single source of truth for all rendering decisions. The Compiler produces it once, the Interpreter reads it on every update."
  })
], AreScene);
var AreAttributeFeatures = {
  /**
   * Initializes the attribute. This method is called when the attribute is first created and should set up any necessary state or perform any initial processing based on the provided content and context. It can also be used to validate the attribute's content and throw errors if it is invalid.
   */
  Init: "_AreAttribute_Init",
  /**
   * Uses to generate all rendering instructions for the attribute. This method is called during the compilation phase of the ARE component and should return an array of instructions that describe how to render the attribute based on its content and context. The instructions can include details such as which DOM properties to set, which events to listen for, and how to update the attribute when the underlying data changes.
   */
  Transform: "_AreAttribute_Transform",
  /**
   * Feature that should convert a directiveAttribute definition into a set of SceneInstructions to be rendered correctly
   */
  Compile: "_AreAttribute_Compile",
  /**
   * Feature that should update the directiveAttribute based on the changes in the store or other dependencies. This method is called during the update phase of the ARE component and should perform any necessary updates to the attribute based on changes in the underlying data or context. This can include tasks such as updating DOM properties, re-evaluating expressions, or modifying event listeners to ensure that the attribute remains in sync with the current state of the application.
   */
  Update: "_AreAttribute_Update",
  /**
   * Feature that should validate the attribute's content and context. This method is called during the validation phase of the ARE component and should check whether the attribute's content is valid based on its expected format, type, or other constraints. If the content is invalid, this method should throw an error with a descriptive message to help developers identify and fix the issue.
   */
  Validate: "_AreAttribute_Validate"
};
var _a124;
var AreAttribute = (_a124 = class extends N {
  static get concept() {
    return "are";
  }
  /**
   * The scope where the attribute is defined, which can be used to access other entities and features within the same scope. This is particularly useful for attributes that need to interact with other parts of the scene or component, as it allows them to access shared data and functionality without needing to pass it explicitly through parameters.
   */
  get scope() {
    return c.scope(this);
  }
  /**
   * The owner node of the attribute, which is the node that the attribute is attached to. This can be used to access the properties and features of the owner node, as well as to determine the context in which the attribute is being used. For example, if the attribute is attached to a button element, the owner would be that button node, and the attribute could use this information to modify the button's behavior or appearance based on its content and context.
   */
  get owner() {
    return this.scope.issuer();
  }
  /**
   * Initializes the attribute based on the provided properties. This method is called when a new attribute is created and should set up the attribute's state based on the provided properties. It can also be used to generate a unique ASEID for the attribute based on its name and content, which can be used for caching and identification purposes within the ARE framework.
   * 
   * @param newEntity 
   */
  fromNew(newEntity) {
    this.aseid = this.generateASEID({
      entity: newEntity.name
      // id: id,
    });
    this.name = newEntity.name;
    this.prefix = newEntity.prefix;
    this.raw = newEntity.raw;
    this.content = newEntity.content;
  }
  // =====================================================================================
  // ------------------------------- Attribute Methods ------------------------------
  // =====================================================================================
  /**
   * Creates a clone of the current attribute instance. This method can be used to create a new instance of the attribute with the same properties and state as the original, which can be useful in scenarios where you want to reuse an attribute's configuration or create variations of it without modifying the original instance.
   * 
   * @returns 
   */
  clone() {
    return new this.constructor({
      name: this.name,
      raw: this.raw,
      content: this.content,
      prefix: this.prefix
    });
  }
  // =====================================================================================
  // ------------------------------- Attribute Lifecycle ------------------------------
  // =====================================================================================
  /**
   * Initializes the attribute. This method is called when the attribute is first created and should set up any necessary state or perform any initial processing based on the provided content and context. It can also be used to validate the attribute's content and throw errors if it is invalid.
   * 
   * @param scope 
   */
  init(scope) {
    this.call(AreAttributeFeatures.Init, scope || this.scope);
  }
  /**
   * Generates all rendering instructions for the attribute. This method is called during the compilation phase of the ARE component and should return an array of instructions that describe how to render the attribute based on its content and context. The instructions can include details such as which DOM properties to set, which events to listen for, and how to update the attribute when the underlying data changes.
   * 
   * @param scope 
   */
  transform(scope) {
    this.call(AreAttributeFeatures.Transform, scope || this.scope);
  }
  compile(scope) {
    this.call(AreAttributeFeatures.Compile, scope || this.scope);
  }
  /**
   * Updates the attribute based on changes in the store or other dependencies. This method is called during the update phase of the ARE component and should perform any necessary updates to the attribute based on changes in the underlying data or context. This can include tasks such as updating DOM properties, re-evaluating expressions, or modifying event listeners to ensure that the attribute remains in sync with the current state of the application.
   * 
   * @param scope 
   */
  update(scope) {
    this.call(AreAttributeFeatures.Update, scope || this.scope);
  }
  /**
   * Validates the attribute's content and context. This method is called during the validation phase of the ARE component and should check whether the attribute's content is valid based on its expected format, type, or other constraints. If the content is invalid, this method should throw an error with a descriptive message to help developers identify and fix the issue.
   * 
   * @param scope 
   */
  validate(scope) {
    this.call(AreAttributeFeatures.Validate, scope || this.scope);
  }
}, __name(_a124, "AreAttribute"), _a124);
__decorateClass3([
  A3.Define({
    description: "Compile the attribute. This method should transform attribute details into a set of SceneInstructions. It may also modify attribute value, since this field is editable during runtime."
  })
], AreAttribute.prototype, "compile", 1);
AreAttribute = __decorateClass3([
  A3.Define({
    namespace: "A-ARE",
    description: "Represents an HTML attribute within the A-Concept Rendering Engine (ARE) framework, encapsulating the attribute's name, raw content, evaluated value, and associated features for initialization, transformation, compilation, updating, and validation."
  })
], AreAttribute);
var AreNodeFeatures = {
  // ==============================================================================
  // Lifecycle features
  // ==============================================================================
  /**
   * Feature that is called to handle before init lifecycle of the element node
   */
  onBeforeInit: "_AreNode_onBeforeInit",
  /**
   * Feature that is called to init the element node
   */
  onInit: "_AreNode_onInit",
  /**
   * 
   */
  onAfterInit: "_AreNode_onAfterInit",
  /**
   * Feature that is called to handle before mount lifecycle of the element node
   */
  onBeforeMount: "_AreNode_onBeforeMount",
  /**
   * Feature that is called to mount the element node
   */
  onMount: "_AreNode_onMount",
  /**
   * Feature that is called to handle after mount lifecycle of the element node
   */
  onAfterMount: "_AreNode_onAfterMount",
  /**
   * Feature that is called to handle before update lifecycle of the element node
   */
  onBeforeUpdate: "_AreNode_onBeforeUpdate",
  /**
   * Feature that is called to handle update lifecycle of the element node
   */
  onUpdate: "_AreNode_onUpdate",
  /**
   * Feature that is called to handle after update lifecycle of the element node
   */
  onAfterUpdate: "_AreNode_onAfterUpdate",
  /**
   * Feature that is called to handle before unmount lifecycle of the element node
   */
  onBeforeUnmount: "_AreNode_onBeforeUnmount",
  /**
   * Feature that is called to unmount the element node
   */
  onUnmount: "_AreNode_onUnmount",
  /**
   * Feature that is called to handle after unmount lifecycle of the element node
   */
  onAfterUnmount: "_AreNode_onAfterUnmount",
  /**
   * Feature that is called to handle before destroy lifecycle of the element node
   */
  onBeforeDestroy: "_AreNode_onBeforeDestroy",
  /**
   * Feature that is called to handle before destroy lifecycle of the element node
   */
  onDestroy: "_AreNode_onDestroy",
  /**
   * Feature that is called to handle after destroy lifecycle of the element node
   */
  onAfterDestroy: "_AreNode_onAfterDestroy",
  //=============================================================================
  // Build features
  // ==============================================================================
  /**
   * Feature that is called to tokenize the element node template and extract its content, attributes, and child nodes. 
   */
  onTokenize: "_AreNode_onTokenize",
  /**
   * Feature that is called to transform the element node template, markup, styles, and data into a format that can be used for compilation. This feature is responsible for processing the raw template and extracting the necessary information to create the render plan and instructions for the node.
   */
  onTransform: "_AreNode_onTransform",
  /**
   * Event fired when the element node is interpreted
   */
  onInterpret: "_AreNode_onInterpret",
  /**
   * Feature that is called to compile the element node
   */
  onCompile: "_AreNode_onCompile",
  /**
   * Feature that is called to handle events
   */
  onEmit: "_AreNode_onEmit"
};
var AreNodeStatuses = {
  /**
   * Status indicating that the node is pending compilation. When a node is in the pending status, it means that it has been created but has not yet been compiled. During this phase, the node is typically being prepared for compilation, which may involve setting up its template, markup, styles, and any associated data or context. Once the node is ready for compilation, its status will change to "compiling".
   */
  Pending: "pending",
  /**
   * Status indicating that the node is in the process of being compiled. During this status, the node is being analyzed and transformed based on its template, markup, and styles to generate the necessary instructions for rendering and updating the node in the scene.
   */
  Compiling: "compiling",
  /**
   * Status indicating that the node has been compiled and is ready to be rendered. In this status, the node has generated all the necessary instructions and is prepared to be mounted in the scene.
   */
  Compiled: "compiled",
  /**
   * Status indicating that the node is currently mounted in the scene. When a node is mounted, it means that it has been rendered and is actively part of the scene's structure and content.
   */
  Mounted: "mounted",
  /**
   * Status indicating that the node has been unmounted from the scene. When a node is unmounted, it means that it has been removed from the scene's structure and content, and is no longer actively rendered in the scene.
   */
  Unmounted: "unmounted"
};
var _a125;
var AreNode = (_a125 = class extends N {
  static get concept() {
    return "are";
  }
  /**
   * Actual node identifier. 
   */
  get id() {
    return this.aseid.id;
  }
  /**
   * Actual node type. 
   * By default it's a tag name
   */
  get type() {
    return this.aseid.entity;
  }
  /**
   * Content string defined for the node — the inner content between delimiters.
   * Example: `{{name}}`
   */
  get content() {
    return this._content;
  }
  /**
   * Markup string defined for the node
   * Example: `<custom-component :prop="value"> <div>Inner Content</div> </custom-component>`
   */
  get markup() {
    return this._markup;
  }
  /**
   * The scope associated with this node
   * uses to store all nested fragments and entities like other AreNodes and Scene
   */
  get scope() {
    if (!this._scope) {
      this._scope = c.allocate(this, new D({ name: `${this.aseid.id}-scope` }));
    }
    return this._scope;
  }
  /**
   * The attributes defined for the node, which can include static attributes, binding attributes, directive attributes, and event attributes. These attributes are extracted during tokenization and processed during the compilation phase to generate the corresponding SceneInstructions for rendering and updating the node in the scene.
   */
  get attributes() {
    return this.scope.resolveFlatAll(AreAttribute);
  }
  /**
   * A custom component associated with this node, which can be used to provide custom logic and behavior for the node. This component is typically defined in the context and can be resolved based on the node's type or other identifying information. The component can include its own content, markup, styles, and features that are specific to the functionality it provides.
   * 
   * Example: If the node type is "custom-component", the corresponding component would be resolved from the context and can be used to provide custom rendering and behavior for nodes of that type.
   * 
   * [!] Note: The component is optional and may not be defined for all nodes. If no component is associated with the node, it will be treated as a standard HTML element or a basic node without custom logic.
   */
  get component() {
    return this.scope.resolve(y.toPascalCase(this.aseid.entity));
  }
  /**
   * The parent node of this node, which is the node that registered the current node in its scope. This is typically the node that is responsible for rendering the current node and managing its lifecycle within the scene. The parent node can be used to access shared context, propagate events, and manage interactions between nodes in a hierarchical structure.
   * 
   * Example: For a node defined as `<div><span>Child Node</span></div>`, the parent node of the `<span>` element would be the `<div>` element, which is responsible for rendering the `<span>` and managing its lifecycle within the scene.
   */
  get parent() {
    const parentIssuer = this.scope.parent?.issuer();
    if (!parentIssuer || !(parentIssuer instanceof AreNode)) return void 0;
    return parentIssuer;
  }
  /**
   * The child nodes of this node, which are typically defined in the markup and registered in the scope as child entities. These child nodes can represent nested elements or components within the node and can have their own content, markup, styles, and features. The child nodes are managed within the scope of the parent node and can be accessed and manipulated as needed for rendering, updating, and lifecycle management.
   * 
   * Example: For a node defined as `<div><span>Child Node</span></div>`, the child node would be the `<span>` element, which is registered as a child entity in the scope of the parent `<div>` node.
   */
  get children() {
    return this.scope.resolveFlatAll(AreNode) || [];
  }
  /**
   * It returns the scene where the node exists, so it should be the scene of the rootNode, 
   * primary parent of this node.
   */
  get scene() {
    if (!this._scene)
      this._scene = this.scope.resolve(AreScene);
    return this._scene;
  }
  fromNew(newEntity) {
    this.aseid = this.generateASEID({
      id: newEntity.payload?.id,
      entity: newEntity.payload?.entity || "node",
      scope: newEntity.payload?.scope
    });
    this.status = AreNodeStatuses.Pending;
    this._content = newEntity.content || "";
    this._markup = newEntity.raw || "";
    this._opening = newEntity.opening || "";
    this._closing = newEntity.closing || "";
    this._position = newEntity.position || 0;
    this._payload = newEntity.payload;
  }
  fromASEID(aseid) {
    super.fromASEID(aseid);
    this._content = "";
    this._markup = "";
    this.status = AreNodeStatuses.Pending;
  }
  /**
   * Sets the content string for the node — the inner text/markup between the node's
   * opening and closing delimiters. Content is processed by the rendering engine to
   * generate the corresponding SceneInstructions for rendering the node.
   * 
   * @param content 
   */
  setContent(content) {
    this._content = content;
  }
  /**
   * Sets the markup string for the node, which is the full raw matched string including delimiters. The markup can include HTML-like syntax, custom components, directives, and other features that are processed by the rendering engine to generate the corresponding SceneInstructions for rendering the node.
   * 
   * @param markup 
   */
  setMarkup(markup) {
    this._markup = markup;
  }
  /**
   * Adds a child node to the current node's scope and ensures the child inherits from this node's scope.
   * 
   * @param child - The node to add as a child
   */
  addChild(child) {
    this.scope.register(child);
    if (!child.scope.isInheritedFrom(this.scope))
      child.scope.inherit(this.scope);
  }
  /**
   * Removes a child node from the current node's scope. This is typically used when a child node is no longer needed or should be detached from the parent node. The method ensures that the child node is properly deregistered from the scope and any associated resources are cleaned up as necessary.
   * 
   * @param node  - The child node to be removed from the current node's scope
   */
  removeChild(node) {
    this.scope.deregister(node);
  }
  // ============================================================================================
  //                                Node Lifecycle Methods
  // ============================================================================================
  /**
   * Executes initialization logic for the node, which typically involves setting up the node's scope, registering any necessary entities, and preparing the node for rendering and interaction within the scene. This method is called during the initial phase of the node's lifecycle and is responsible for ensuring that the node is properly initialized before it is compiled and rendered in the scene.
   */
  init() {
    this.call(AreNodeFeatures.onBeforeInit, this.scope);
    this.call(AreNodeFeatures.onInit, this.scope);
    this.call(AreNodeFeatures.onAfterInit, this.scope);
  }
  /**
   * Loads the node, which typically involves executing any necessary setup or initialization logic to prepare the node for rendering and interaction within the scene. This may include processing the node's content, markup, styles, and features to generate the corresponding SceneInstructions, as well as setting up any event listeners or reactive properties as needed.
   */
  async load() {
    this.checkScopeInheritance();
    try {
      const context = this.scope.resolve(AreContext);
      context?.startPerformance("Node Load");
      const res = super.load(this.scope);
      context?.endPerformance("Node Load");
      return res;
    } catch (error) {
      throw error;
    }
  }
  /**
   * Tokenizes the node content, which typically involves parsing the raw content string to identify the structure, child nodes, attributes, directives, and other features. This process is essential for breaking down the content into its constituent parts and preparing it for further processing during the compilation phase. The tokenization process can involve creating child nodes, extracting attributes and their values, and identifying any directives or bindings that need to be processed during rendering.
   */
  tokenize() {
    this.checkScopeInheritance();
    try {
      const context = this.scope.resolve(AreContext);
      context?.startPerformance("Node Tokenize");
      this.call(AreNodeFeatures.onTokenize, this.scope);
      context?.endPerformance("Node Tokenize");
    } catch (error) {
      throw error;
    }
  }
  /**
   * Transforms the node, which typically involves executing any necessary logic to reshape the node's structure or content before it is compiled and rendered in the scene. This may include applying any transformations defined by directives, processing any dynamic content or expressions, and performing any other necessary tasks to ensure that the node is properly prepared for compilation and rendering based on its content, markup, styles, and features.
   */
  transform() {
    this.checkScopeInheritance();
    try {
      const context = this.scope.resolve(AreContext);
      context?.startPerformance("Node Transform");
      this.call(AreNodeFeatures.onTransform, this.scope);
      context?.endPerformance("Node Transform");
    } catch (error) {
      throw error;
    }
  }
  /**
   * Compile the node. This method should transform the node's content, markup, and styles into a set of SceneInstructions that can be executed to render the node in the scene. The compile method is responsible for processing the node's features, attributes, directives, and other properties to generate the necessary instructions for rendering and updating the node in response to changes in state or context.
   * 
   * [!] Note: The compile method should ensure that the node's scope is properly inherited from the context scope before processing, and it should handle any errors that may occur during compilation to ensure that the node can be rendered correctly in the scene.
   */
  compile() {
    this.checkScopeInheritance();
    try {
      const context = this.scope.resolve(AreContext);
      context?.startPerformance("Node Compile");
      this.call(AreNodeFeatures.onCompile, this.scope);
      context?.endPerformance("Node Compile");
    } catch (error) {
      throw error;
    }
  }
  /**
   * Mounts the node, which typically involves executing any necessary logic to render the node in the scene and to set up any interactions or behaviors associated with the node. This may include applying the generated SceneInstructions from the compile phase, attaching event listeners, and performing any other necessary tasks to ensure that the node is properly rendered and functional within the scene.
   * 
   * [!] Note: The mount method should ensure that the node's scope is properly inherited from the context scope before performing any mounting logic, and it should handle any errors that may occur during mounting to ensure that the node can be rendered correctly in the scene.
   */
  mount() {
    this.checkScopeInheritance();
    try {
      const context = this.scope.resolve(AreContext);
      context?.startPerformance("Node Mount");
      this.call(AreNodeFeatures.onBeforeMount, this.scope);
      this.call(AreNodeFeatures.onMount, this.scope);
      this.call(AreNodeFeatures.onAfterMount, this.scope);
      context?.endPerformance("Node Mount");
    } catch (error) {
      throw error;
    }
  }
  /**
   * Interprets the node, which typically involves executing any necessary logic to process the node's features, attributes, directives, and other properties to generate the corresponding SceneInstructions for rendering and updating the node in response to changes in state or context. This method is responsible for ensuring that the node is properly interpreted based on its content, markup, styles, and features to enable dynamic behavior and responsiveness within the scene.
   * 
   * [!] Note: The interpret method should NOT go though own child, since it may be used by both mount and update operations!
   */
  interpret() {
    this.checkScopeInheritance();
    try {
      const context = this.scope.resolve(AreContext);
      context?.startPerformance("Node Interpret");
      this.call(AreNodeFeatures.onInterpret, this.scope);
      context?.endPerformance("Node Interpret");
    } catch (error) {
      throw error;
    }
  }
  /**
   * Updates the node, which typically involves executing any necessary logic to update the node's rendering and behavior in response to changes in state, context, or other factors. This may include reapplying SceneInstructions, updating event listeners, and performing any other necessary tasks to ensure that the node remains functional and correctly rendered within the scene as changes occur.
   * 
   * [!] Note: The update method should ensure that the node's scope is properly inherited from the context scope before performing any update logic, and it should handle any errors that may occur during updating to ensure that the node can be updated correctly in the scene.
   */
  update() {
    this.checkScopeInheritance();
    try {
      const context = this.scope.resolve(AreContext);
      context?.startPerformance("Node Update");
      this.call(AreNodeFeatures.onBeforeUpdate, this.scope);
      this.call(AreNodeFeatures.onUpdate, this.scope);
      this.call(AreNodeFeatures.onAfterUpdate, this.scope);
      context?.endPerformance("Node Update");
    } catch (error) {
      throw error;
    }
  }
  /**
   * Unmounts the node, which typically involves executing any necessary logic to remove the node from the scene and to clean up any resources associated with the node. This may include reverting any applied SceneInstructions, detaching event listeners, and performing any other necessary tasks to ensure that the node is properly removed from the scene and that resources are released as needed.
   * 
   * [!] Note: The unmount method should ensure that the node's scope is properly inherited from the context scope before performing any unmounting logic, and it should handle any errors that may occur during unmounting to ensure that the node can be removed correctly from the scene.
   */
  unmount() {
    this.checkScopeInheritance();
    try {
      const context = this.scope.resolve(AreContext);
      context?.startPerformance("Node Unmount");
      this.call(AreNodeFeatures.onBeforeUnmount, this.scope);
      this.call(AreNodeFeatures.onUnmount, this.scope);
      this.call(AreNodeFeatures.onAfterUnmount, this.scope);
      context?.endPerformance("Node Unmount");
    } catch (error) {
      throw error;
    }
  }
  cloneWithScope() {
    const currentScope = this.scope;
    c.deallocate(currentScope);
    const newNode = new this.constructor({
      opening: this._opening,
      closing: this._closing,
      position: this._position,
      payload: this._payload || {},
      content: this._content,
      raw: this._markup
    });
    if (newNode._scope)
      c.deallocate(newNode._scope);
    newNode._scope = currentScope;
    c.allocate(newNode, currentScope);
    this._scope = c.allocate(this);
    return newNode;
  }
  reset() {
    for (const child of this.children) {
      this.scope.deregister(child);
    }
    for (const attribute of this.attributes) {
      this.scope.deregister(attribute);
    }
  }
  clone() {
    const newNode = new this.constructor({
      opening: this._opening,
      closing: this._closing,
      position: this._position,
      payload: this._payload || {},
      content: this._content,
      raw: this._markup
    });
    for (const child of this.children) {
      newNode.addChild(child.clone());
    }
    for (const attribute of this.attributes) {
      newNode.scope.register(attribute.clone());
    }
    return newNode;
  }
  async emit(eventOrScope) {
    this.checkScopeInheritance();
    const eventScope = a.isScopeInstance(eventOrScope) ? eventOrScope.inherit(this.scope) : new D({
      name: `${eventOrScope.name}-scope`,
      fragments: [eventOrScope]
    }).inherit(this.scope);
    try {
      await this.call(AreNodeFeatures.onEmit, eventScope);
      eventScope.destroy();
    } catch (error) {
      eventScope.destroy();
      throw error;
    }
  }
  /**
   * Destroys the node, which typically involves executing any necessary cleanup logic to remove the node from the scene and to free up any resources associated with the node. This may include deregistering the node from its scope, removing any event listeners or reactive properties, and performing any other necessary cleanup tasks to ensure that the node is properly removed from the scene and that resources are released as needed.
   * 
   * [!] Note: The destroy method should ensure that the node's scope is properly inherited from the context scope before performing any cleanup, and it should handle any errors that may occur during destruction to ensure that resources are released correctly.
   */
  async destroy() {
    this.checkScopeInheritance();
    try {
      await super.destroy(this.scope);
      this.scope.destroy();
    } catch (error) {
      this._scope.destroy();
      throw error;
    }
  }
  //============================================================================================
  //                                Helpers Methods
  //============================================================================================
  /**
   * Method to ensure that the current scope is inherited from the context scope
   * 
   * @throws A_Error if the scope is not inherited from the context scope
   */
  checkScopeInheritance() {
    let attachedScope;
    try {
      attachedScope = c.scope(this);
    } catch (error) {
      throw new P({
        title: `A_UI_Node Scope Inheritance Error`,
        description: `The A_UI_Node entity with ASEID '${this.aseid.toString()}' is not bound to any context scope. Please ensure that the entity is created within a valid context.`,
        originalError: error
      });
    }
  }
}, __name(_a125, "AreNode"), _a125);
AreNode = __decorateClass3([
  A3.Define({
    namespace: "A-ARE",
    description: "An AreNode entity represents a node within the A-Concept Rendering Engine (ARE) framework. It encapsulates content, markup, and styles, and manages its own scope for nested fragments and entities. AreNodes are responsible for handling events, compiling, rendering, updating, and lifecycle management within the ARE context."
  })
], AreNode);
var _a126;
var AreEvent = (_a126 = class extends A_ExecutionContext {
}, __name(_a126, "AreEvent"), _a126);
AreEvent = __decorateClass3([
  A3.Define({
    namespace: "A-ARE",
    description: "Event context for managing events within the A-Concept Rendering Engine (ARE) framework, encapsulating event data and associated nodes to facilitate event-driven interactions."
  })
], AreEvent);
var _a127;
var AreSignalsMeta = (_a127 = class extends j {
  registerCondition(component, vector) {
    const vectorToComponent = this.get("vectorToComponent") || /* @__PURE__ */ new Map();
    const componentToVector = this.get("componentToVector") || /* @__PURE__ */ new Map();
    vectorToComponent.set(vector, component);
    if (!componentToVector.has(component)) {
      componentToVector.set(component, /* @__PURE__ */ new Set());
    }
    componentToVector.get(component)?.add(vector);
    this.set("vectorToComponent", vectorToComponent);
    this.set("componentToVector", componentToVector);
  }
  findComponentByVector(vector) {
    const vectorToComponent = this.get("vectorToComponent");
    if (vectorToComponent) {
      const component = vectorToComponent.get(vector);
      if (component) {
        return component;
      }
    }
    if (vectorToComponent) {
      for (const [registeredVector, component] of vectorToComponent.entries()) {
        if (vector.equals(registeredVector)) {
          return component;
        }
      }
      for (const [registeredVector, component] of vectorToComponent.entries()) {
        if (vector.match(registeredVector)) {
          return component;
        }
      }
      for (const [registeredVector, component] of vectorToComponent.entries()) {
        if (vector.includes(registeredVector)) {
          return component;
        }
      }
    }
    return void 0;
  }
}, __name(_a127, "AreSignalsMeta"), _a127);
var _a128;
var AreSignalsContext = (_a128 = class extends V {
  constructor(config) {
    super({ name: "AreSignalsContext" });
    this._componentMap = /* @__PURE__ */ new Map();
    this._defaultsMap = /* @__PURE__ */ new Map();
    this._conditionsMap = /* @__PURE__ */ new Map();
    this._subscribers = /* @__PURE__ */ new Set();
    const configEntries = config ? Object.entries(config) : [];
    for (const [rootId, conf] of configEntries) {
      const def = conf?.default;
      const pool = conf?.pool || [];
      const conditions = conf?.conditions || [];
      this._componentMap.set(rootId, new Set(pool));
      if (def)
        this._defaultsMap.set(rootId, def);
      this._conditionsMap.set(rootId, conditions);
    }
  }
  signalsMeta() {
    const signalsMeta = c.meta(AreSignals);
    if (!signalsMeta) {
      throw new Error("AreSignalsMeta not found in context. Please ensure that AreSignalsMeta is properly registered in the A-Concept context.");
    }
    return signalsMeta;
  }
  subscribe(subscriber) {
    this._subscribers.add(subscriber);
  }
  unsubscribe(subscriber) {
    this._subscribers.delete(subscriber);
  }
  get subscribers() {
    return this._subscribers;
  }
  /**
   * Returns the components associated with the given ID. If no components are found, returns an empty array.
   * 
   * @param id The ID of the component group.
   * @returns An array of component constructors.
   */
  getComponentById(id) {
    const set = this._componentMap.get(id) || /* @__PURE__ */ new Set();
    return Array.from(set);
  }
  /**
   * Returns the components associated with the root ID of the given node. If no components are found, returns an empty array.
   * 
   * @param node The AreNode whose root ID is used to retrieve the components.
   * @returns An array of component constructors.
   */
  getComponentByRoot(node) {
    return this.getComponentById(node.id);
  }
  /**
   * Adds a new component to the specified root ID. If the root ID does not exist, it will be created.
   * 
   * @param rootId The ID of the root component group.
   * @param components An array of component constructors to add.
   */
  extendRoot(rootId, components) {
    if (!this._componentMap.has(rootId)) {
      this._componentMap.set(rootId, /* @__PURE__ */ new Set());
    }
    const set = this._componentMap.get(rootId);
    for (const comp of components) {
      set.add(comp);
    }
  }
  /**
   * Whether routing is configured for the given root ID.
   * When false, the root should leave its original template content untouched.
   * 
   * @param rootId The id attribute of the <are-root> element.
   */
  hasRoot(rootId) {
    return this._componentMap.has(rootId) || this._conditionsMap.has(rootId);
  }
  /**
   * Returns the default component associated with the given root ID, if any.
   * 
   * @param rootId The ID of the root component group.
   */
  getDefault(rootId) {
    return this._defaultsMap.get(rootId);
  }
  /**
   * Finds the matching component for the given root ID and incoming signal vector.
   * 
   * Matching priorities (mirroring AreSignalsMeta):
   * 1. Full equivalence  — vector.equals(conditionVector)
   * 2. Logical match     — vector.match(conditionVector)
   * 3. Inclusion         — incoming vector contains every signal type from condition, checked with signal.compare()
   * 
   * @param rootId  The id attribute of the <are-root> element.
   * @param vector  The incoming signal vector from the bus.
   */
  findComponentByVector(rootId, vector) {
    const conditions = this._conditionsMap.get(rootId) || [];
    for (const condition of conditions) {
      const conditionVector = new A_SignalVector(condition.vector);
      if (vector.equals(conditionVector)) {
        return condition.component;
      }
    }
    for (const condition of conditions) {
      const conditionVector = new A_SignalVector(condition.vector);
      if (vector.match(conditionVector)) {
        return condition.component;
      }
    }
    for (const condition of conditions) {
      const allMatch = condition.vector.every((condSignal) => {
        for (const incomingSignal of vector) {
          if (!incomingSignal)
            continue;
          if (incomingSignal.constructor === condSignal.constructor && condSignal.compare(incomingSignal)) {
            return true;
          }
        }
        return false;
      });
      if (allMatch) {
        return condition.component;
      }
    }
    return void 0;
  }
}, __name(_a128, "AreSignalsContext"), _a128);
AreSignalsContext = __decorateClass3([
  A3.Define({
    namespace: "A-ARE",
    description: "AreSignalsContext is a fragment that manages the set of root nodes subscribed to the signal bus. It tracks which Are components should receive signal vectors from AreSignals and provides the subscriber registry used during signal dispatch."
  })
], AreSignalsContext);
var _a129;
var AreSignals = (_a129 = class extends F {
  async handleSignalVector(vector, context, state, scope, logger) {
    logger?.debug(`Handling Signal Vector with ${context.subscribers.size} root nodes.`, vector);
    try {
      for (const root of context.subscribers) {
        const callScope = new D({
          fragments: [new AreEvent(
            AreFeatures.onSignal,
            {
              vector
            }
          )]
        }).import(scope, root.scope);
        logger?.debug("Emitting signal for root node:", vector);
        await root.emit(callScope);
        callScope.destroy();
      }
    } catch (error) {
      logger?.error(error);
    }
  }
  async propagateEvent(node, scope, event, feature, logger, ...args) {
    let currentNode = node;
    let target = node;
    while (currentNode && currentNode.parent) {
      if (currentNode.component) {
        target = currentNode;
        break;
      }
      currentNode = currentNode.parent;
    }
    if (target.component)
      await feature.chain(target.component, event.name, scope);
  }
  // -----------------------------------------------------------------------------------------
  // ----------------------------Are-Component Notify Section---------------------------------
  // -----------------------------------------------------------------------------------------
  /**
   * Notifies all mounted nodes whose component is exactly the specified constructor
   * (strict match — subclasses are excluded).
   *
   * @param ctor  - The Are component constructor to target
   * @param event - The event to emit to all matching nodes
   */
  async notifyExact(ctor, event) {
    const context = c.scope(this).resolve(AreContext);
    if (!context) return;
    for (const root of context.roots) {
      await this.traverseAndNotify(root, event, (component) => component.constructor === ctor);
    }
  }
  /**
   * Notifies all mounted nodes whose component is an instance of the specified
   * constructor, including nodes backed by subclasses (polymorphic match).
   *
   * @param ctor  - The Are component constructor to target
   * @param event - The event to emit to all matching nodes
   */
  async notifyAll(ctor, event) {
    const context = c.scope(this).resolve(AreContext);
    if (!context) return;
    for (const root of context.roots) {
      await this.traverseAndNotify(root, event, (component) => component instanceof ctor);
    }
  }
  /**
   * Notifies all mounted nodes whose component matches the specified constructor.
   * 
   * By default uses polymorphic matching (includes subclasses). Pass `{ exact: true }`
   * to restrict to the exact constructor only.
   *
   * @param ctor    - The Are component constructor to target
   * @param event   - The event to emit to all matching nodes
   * @param options - `exact`: when true, subclasses are excluded (defaults to false)
   */
  async notify(ctor, event, options) {
    if (options?.exact) {
      return this.notifyExact(ctor, event);
    }
    return this.notifyAll(ctor, event);
  }
  async traverseAndNotify(node, event, match) {
    if (node.component && match(node.component)) {
      await node.emit(event);
    }
    for (const child of node.children) {
      await this.traverseAndNotify(child, event, match);
    }
  }
}, __name(_a129, "AreSignals"), _a129);
__decorateClass3([
  x.Extend({
    name: A_SignalBusFeatures.onNext
  }),
  __decorateParam3(0, ke(A_SignalVector)),
  __decorateParam3(1, ke(AreSignalsContext)),
  __decorateParam3(2, ke(A_SignalState)),
  __decorateParam3(3, ke(D)),
  __decorateParam3(4, ke(A_Logger))
], AreSignals.prototype, "handleSignalVector", 1);
__decorateClass3([
  x.Extend({
    name: AreNodeFeatures.onEmit,
    scope: [AreNode]
  }),
  __decorateParam3(0, ke(H)),
  __decorateParam3(1, ke(D)),
  __decorateParam3(2, ke(AreEvent)),
  __decorateParam3(3, ke(x)),
  __decorateParam3(4, ke(A_Logger))
], AreSignals.prototype, "propagateEvent", 1);
AreSignals = __decorateClass3([
  A3.Define({
    namespace: "A-ARE",
    description: "AreSignals is the central signal bus component within the ARE framework. It listens for incoming signal vectors and dispatches them to all subscribed root nodes, enabling reactive, event-driven rendering and lifecycle management across the component tree."
  }),
  m.Define(AreSignalsMeta)
], AreSignals);
var _a130;
var AreMeta = (_a130 = class extends j {
}, __name(_a130, "AreMeta"), _a130);
var _a131;
var Are = (_a131 = class extends F {
  constructor() {
    super(...arguments);
    this.props = {};
  }
  static Condition(signals) {
    return function(target) {
      const componentMeta = c.meta(target);
      const signalsMeta = c.meta(AreSignals);
      let vector;
      switch (true) {
        case signals instanceof A_SignalVector:
          vector = signals;
          break;
        case Array.isArray(signals):
          vector = new A_SignalVector(signals);
          break;
        default:
          throw new Error("Invalid input for Are.Condition. Expected an array of A_Signal or an instance of A_SignalVector.");
      }
      if (vector) {
        componentMeta.vector = vector;
        signalsMeta.registerCondition(target, vector);
      }
      return target;
    };
  }
  //==================================================================================
  //======================== LIFECYCLE DECORATORS ====================================
  //==================================================================================
  /**
   * Allows to define a custom method for the component's template. This method should return a string representing the HTML template of the component. The template can include dynamic content and bindings that will be processed during rendering to create the final DOM structure for the component.
   */
  static get EventHandler() {
    return (target, propertyKey, descriptor) => {
      return x.Extend({
        name: propertyKey,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  /**
   * Allows to define a custom method for the component's template. This method should return a string representing the HTML template of the component. The template can include dynamic content and bindings that will be processed during rendering to create the final DOM structure for the component.
   */
  static get onBeforeInit() {
    return (target, propertyKey, descriptor) => {
      return x.Extend({
        name: AreFeatures.onBeforeInit,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  /**
   * Allows to define a custom method for the component's initialization logic. This method is called after the component is instantiated but before it is rendered, and can be used to set up any necessary state, perform data fetching, or execute any other logic that needs to happen before the component is rendered for the first time.
   */
  static get onAfterInit() {
    return (target, propertyKey, descriptor) => {
      return x.Extend({
        name: AreFeatures.onAfterInit,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  /**
   * Allows to define a custom method for the component's mounting logic. This method is called after the component has been rendered and added to the DOM, and can be used to perform any necessary setup or initialization that requires access to the DOM elements of the component. It can also be used to implement custom logic for handling specific features or behaviors of the component during the mounting process.
   */
  static get onBeforeMount() {
    return (target, propertyKey, descriptor) => {
      return x.Extend({
        name: AreFeatures.onBeforeMount,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  /**
   * Allows to define a custom method for the component's logic that should be executed after the component is mounted. This method is called after the component has been rendered and added to the DOM, and can be used to perform any necessary setup or initialization that requires access to the DOM elements of the component. It can also be used to implement custom logic for handling specific features or behaviors of the component during the post-mounting process.
   */
  static get onAfterMount() {
    return (target, propertyKey, descriptor) => {
      return x.Extend({
        name: AreFeatures.onAfterMount,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  /**
   * Allows to define a custom method for the component's unmounting logic. This method is called before the component is removed from the DOM, and can be used to perform any necessary cleanup or teardown, such as removing event listeners, canceling timers, or releasing any resources that were allocated during the component's lifecycle. It can also be used to implement custom logic for handling specific features or behaviors of the component during the unmounting process.
   */
  static get onBeforeUnmount() {
    return (target, propertyKey, descriptor) => {
      return x.Extend({
        name: AreFeatures.onBeforeUnmount,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  /**
   * Allows to define a custom method for the component's logic that should be executed after the component is unmounted. This method is called after the component has been removed from the DOM, and can be used to perform any necessary cleanup or teardown that needs to happen after the component is no longer in the DOM. It can also be used to implement custom logic for handling specific features or behaviors of the component during the post-unmounting process.
   */
  static get onAfterUnmount() {
    return (target, propertyKey, descriptor) => {
      return x.Extend({
        name: AreFeatures.onAfterUnmount,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  /**
   * Allows to define a custom method for the component's update logic. This method is called whenever the component's state changes and can be used to perform any necessary updates or side effects based on the new state. It can also be used to optimize performance by implementing custom logic for determining when the component should re-render based on specific state changes.
   */
  static get onBeforeUpdate() {
    return (target, propertyKey, descriptor) => {
      return x.Extend({
        name: AreFeatures.onBeforeUpdate,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  /**
   * Allows to define a custom method for the component's logic that should be executed after the component's state has been updated. This method is called after the component has re-rendered in response to state changes, and can be used to perform any necessary side effects or additional updates based on the new state. It can also be used to implement custom logic for handling specific features or behaviors of the component during the post-update process.
   */
  static get onAfterUpdate() {
    return (target, propertyKey, descriptor) => {
      return x.Extend({
        name: AreFeatures.onAfterUpdate,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  /**
   * Allows to define a custom method for the component's template. This method should return a string representing the HTML template of the component. The template can include dynamic content and bindings that will be processed during rendering to create the final DOM structure for the component.
   */
  static get Template() {
    return (target, propertyKey, descriptor) => {
      return x.Extend({
        name: AreFeatures.onTemplate,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  /**
   * Allows to define a custom method for the component's styles. This method should return a string representing the CSS styles of the component. The styles can include dynamic content and can be processed during rendering to apply the appropriate styles to the component's DOM elements.
   */
  static get Styles() {
    return (target, propertyKey, descriptor) => {
      return x.Extend({
        name: AreFeatures.onStyles,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  /**
   * Allows to define a custom method for the component's data. This method should return an object representing the initial state of the component. The data can include any properties that are needed to manage the component's state and can be reactive, allowing the component to re-render when the data changes.
   */
  static get Data() {
    return (target, propertyKey, descriptor) => {
      return x.Extend({
        name: AreFeatures.onData,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  /**
   * Allows to define a custom method for handling signals emitted by the component or other parts of the application. This method can be used to implement custom logic for responding to specific signals, such as user interactions, state changes, or other events that may affect the component's behavior or appearance. By defining this method, developers can create more dynamic and interactive components that can react to changes in the application state or user input in a flexible and efficient way.
   */
  static get Signal() {
    return (target, propertyKey, descriptor) => {
      return x.Extend({
        name: AreFeatures.onSignal,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  template(...args) {
  }
  styles(...args) {
  }
  data(...args) {
  }
}, __name(_a131, "Are"), _a131);
__decorateClass3([
  Are.Template
], Are.prototype, "template", 1);
__decorateClass3([
  Are.Styles
], Are.prototype, "styles", 1);
__decorateClass3([
  Are.Data
], Are.prototype, "data", 1);
Are = __decorateClass3([
  A3.Define({
    namespace: "A-ARE",
    description: "Base component class for A-Concept Rendering Engine (ARE) components. It provides lifecycle decorators and methods for defining templates, styles, and data, facilitating the creation of dynamic and interactive UI components within the ARE framework."
  }),
  m.Define(AreMeta)
], Are);
var _a132;
var AreSyntax = (_a132 = class extends V {
  constructor(config) {
    super({ name: "AreSyntax" });
    this.MAX_LENGTH = 500;
    this.MAX_DEPTH = 5;
    this.BLOCKED_PATTERNS = [
      /\beval\b/,
      /\bFunction\b/,
      /\bfetch\b/,
      /\bXMLHttpRequest\b/,
      /\bimport\b/,
      /\brequire\b/,
      /\bdocument\b/,
      /\bwindow\b/,
      /\bglobalThis\b/,
      /\bglobal\b/,
      /\bprocess\b/,
      /\b__proto__\b/,
      /\bprototype\b/,
      /\bconstructor\b/,
      /\bObject\s*\.\s*assign\b/,
      /\bObject\s*\.\s*defineProperty\b/,
      /\bsetTimeout\b/,
      /\bsetInterval\b/,
      /\blocalStorage\b/,
      /\bsessionStorage\b/,
      /\bcookie\b/,
      /\bWebSocket\b/,
      /\bWorker\b/
    ];
    this.BLOCKED_GLOBALS = /* @__PURE__ */ new Set([
      "eval",
      "Function",
      "fetch",
      "XMLHttpRequest",
      "document",
      "window",
      "globalThis",
      "global",
      "process",
      "setTimeout",
      "setInterval",
      "clearTimeout",
      "clearInterval",
      "localStorage",
      "sessionStorage",
      "indexedDB",
      "WebSocket",
      "Worker",
      "Blob",
      "File",
      "require",
      "module",
      "exports",
      "alert",
      "confirm",
      "prompt"
    ]);
    this.ALLOWED_CHARS = /^[\w\s\d\.\[\]()=><|&!+\-*/%?:,'"`;~^$\p{L}\p{N}\p{M}\p{S}\p{Emoji}]+$/u;
    this.SIMPLE_PATH = /^[a-zA-Z_$][\w$]*(?:\.[a-zA-Z_$][\w$]*)*$/;
    this._trimWhitespace = config?.trimWhitespace !== false;
    this._strictMode = config?.strictMode !== false;
    this._rules = [...config?.rules ?? []].sort(
      (a7, b2) => (b2.priority ?? 0) - (a7.priority ?? 0)
    );
  }
  /**
   * Get the array of token rules that define the syntax for parsing templates. Each rule specifies how to identify and process a particular type of token (e.g. interpolation, directive, comment) within templates. The rules are checked in order of priority, allowing for flexible and customizable parsing behavior.
   */
  get rules() {
    return this._rules;
  }
  /**
   * Indicates whether leading and trailing whitespace should be trimmed from token content. When enabled, any whitespace at the start or end of the content captured by a token will be removed before further processing. This can help prevent issues with unintended spaces affecting rendering or logic, especially in cases like interpolations or directives where extra whitespace may be common. Default is true.
   */
  get trimWhitespace() {
    return this._trimWhitespace;
  }
  /**
   * Indicates whether the parser should throw an error when it encounters unclosed tokens. When enabled, if the parser finds an opening delimiter without a corresponding closing delimiter (e.g. an unclosed interpolation or directive), it will throw an error instead of silently ignoring it. This can help catch syntax errors and ensure that templates are well-formed. Default is true.
   */
  get strictMode() {
    return this._strictMode;
  }
  /**
   * Compiles an expression string into a reusable executor.
   * Performs validation and Function construction once.
   * Use when the same expression will be evaluated multiple times
   * e.g. event handlers, instructions that re-apply on store changes.
   *
   * @example
   *   // compile once at apply() time
   *   const compiled = AreCommonHelper.compile('(e) => !!pageTitle ? $testHandler(e, item) : null')
   *
   *   // execute on every click — no re-parsing, no re-validation
   *   element.addEventListener('click', (e) => {
   *       const fn = compiled.execute(store, { $testHandler: handler, item })
   *       if (typeof fn === 'function') fn(e)
   *   })
   */
  compile(expr) {
    const trimmed = expr.trim();
    this.validate(trimmed);
    const isCallable = this.isCallableExpression(trimmed);
    const isSimplePath = this.SIMPLE_PATH.test(trimmed);
    let compiled = null;
    if (!isSimplePath) {
      try {
        compiled = new Function("scope", `"use strict"; with(scope) { return (${trimmed}) }`);
      } catch (e) {
        throw new Error(`Expression syntax error in "${trimmed}": ${e.message}`);
      }
    }
    const createSandboxFn = this.createSandbox.bind(this);
    return {
      isCallable,
      execute(store, scope) {
        if (isSimplePath) {
          if (scope && trimmed in scope) return scope[trimmed];
          const value = store.get(trimmed);
          if (value !== void 0) return value;
        }
        const sandbox = createSandboxFn(store, scope);
        let result;
        try {
          result = compiled ? compiled(sandbox) : new Function("scope", `"use strict"; with(scope) { return (${trimmed}) }`)(sandbox);
        } catch (e) {
          throw new Error(`Expression evaluation error in "${trimmed}": ${e.message}`);
        }
        if (isCallable && typeof result !== "function") {
          throw new Error(
            `Expression "${trimmed}" was expected to be callable \u2014 got ${result === null ? "null" : typeof result}`
          );
        }
        return result;
      }
    };
  }
  /**
   * Evaluates an expression string against the provided store.
   * Automatically determines whether the result should be callable
   * based on the shape of the expression.
   *
   * Returns the raw value for plain expressions (interpolations, bindings).
   * Returns a bound function for callable expressions (event handlers).
   *
   * @param expr  Expression string to evaluate.
   * @param store AreStore used for identifier resolution.
   * @param scope Optional extra bindings checked **before** the store.
   *              Useful for injecting event-specific values (`$event`, `element`)
   *              or emit wrappers (`$handleClick`).
   *
   * @example
   *   // simple value
   *   evaluate('user.name', store)
   *
   *   // with emit wrapper
   *   evaluate('$handleClick($event, user.name)', store, {
   *       $event: domEvent,
   *       $handleClick: (...args) => node.emit(new AreEvent('handleClick', args)),
   *   })
   *
   *   // arrow with conditional
   *   evaluate('(e) => isValid(user.name) ? $handleClick(e) : null', store, {
   *       $handleClick: (...args) => node.emit(new AreEvent('handleClick', args)),
   *   })
   */
  evaluate(expr, store, scope) {
    const trimmed = expr.trim();
    this.validate(trimmed);
    if (this.SIMPLE_PATH.test(trimmed)) {
      if (scope && trimmed in scope) return scope[trimmed];
      const value = store.get(trimmed);
      if (value !== void 0) return value;
    }
    const sandbox = this.createSandbox(store, scope);
    const result = this.execute(trimmed, sandbox);
    if (this.isCallableExpression(trimmed)) {
      if (typeof result !== "function") {
        throw new Error(
          `Expression "${trimmed}" was expected to be callable \u2014 got ${result === null ? "null" : typeof result}`
        );
      }
    }
    return result;
  }
  /**
   * Extracts $-prefixed handler names from an expression.
   * These represent event emission targets, not store references.
   *
   * Examples:
   *   "$handleClick"                                     → Set(["handleClick"])
   *   "$handleClick(user.name)"                           → Set(["handleClick"])
   *   "(e) => isValid(user.name) ? $handleClick(e) : null" → Set(["handleClick"])
   */
  extractEmitHandlers(expr) {
    const stripped = expr.trim().replace(/'[^']*'|"[^"]*"|`[^`]*`/g, '""');
    const handlers = /* @__PURE__ */ new Set();
    const pattern = /\$([a-zA-Z_][\w$]*)/g;
    let match;
    while ((match = pattern.exec(stripped)) !== null) {
      handlers.add(match[1]);
    }
    return handlers;
  }
  // ── Classification ────────────────────────────────────────────────────────
  isCallableExpression(expr) {
    if (/^\(?[\w\s,]*\)?\s*=>/.test(expr)) return true;
    if (/^function\s*\(/.test(expr)) return true;
    return false;
  }
  // ── Validation ────────────────────────────────────────────────────────────
  validate(expr) {
    if (expr.length > this.MAX_LENGTH) {
      throw new Error(
        `Expression exceeds maximum length of ${this.MAX_LENGTH} characters`
      );
    }
    for (const pattern of this.BLOCKED_PATTERNS) {
      if (pattern.test(expr)) {
        throw new Error(`Expression contains blocked pattern: ${pattern.source}`);
      }
    }
    if (!this.ALLOWED_CHARS.test(expr)) {
      throw new Error(`Expression contains disallowed characters`);
    }
    this.checkDepth(expr);
  }
  checkDepth(expr) {
    let depth = 0;
    let max = 0;
    for (const ch of expr) {
      if (ch === "(" || ch === "[" || ch === "{") {
        depth++;
        max = Math.max(max, depth);
      }
      if (ch === ")" || ch === "]" || ch === "}") depth--;
    }
    if (max > this.MAX_DEPTH) {
      throw new Error(`Expression exceeds maximum nesting depth of ${this.MAX_DEPTH}`);
    }
  }
  // ── Sandbox ───────────────────────────────────────────────────────────────
  createSandbox(store, scope) {
    return new Proxy({}, {
      has: /* @__PURE__ */ __name((_4, key) => {
        if (typeof key === "string" && this.BLOCKED_GLOBALS.has(key)) return false;
        return true;
      }, "has"),
      get: /* @__PURE__ */ __name((_4, key) => {
        if (typeof key !== "string") return void 0;
        if (scope && key in scope) return scope[key];
        this.assertSafeKey(key);
        const value = store.get(key);
        if (typeof value === "function") return value.bind(store);
        if (value !== null && typeof value === "object" && value !== void 0) {
          return new Proxy(value, this.nestedHandler(key, store));
        }
        return value;
      }, "get"),
      set: /* @__PURE__ */ __name(() => {
        throw new Error("Expression scope is read-only");
      }, "set")
    });
  }
  nestedHandler(prefix, store) {
    return {
      has: /* @__PURE__ */ __name(() => true, "has"),
      get: /* @__PURE__ */ __name((target, key) => {
        if (typeof key !== "string") return void 0;
        this.assertSafeKey(key);
        const fullKey = `${prefix}.${key}`;
        const value = store.get(fullKey);
        if (value === void 0) return target[key];
        if (typeof value === "function") return value.bind(store);
        if (value !== null && typeof value === "object") {
          return new Proxy(value, this.nestedHandler(fullKey, store));
        }
        return value;
      }, "get"),
      set: /* @__PURE__ */ __name(() => {
        throw new Error("Expression scope is read-only");
      }, "set")
    };
  }
  assertSafeKey(key) {
    if (key === "__proto__" || key === "constructor" || key === "prototype") {
      throw new Error(`Access to "${key}" is not allowed in expressions`);
    }
    if (this.BLOCKED_GLOBALS.has(key)) {
      throw new Error(`Access to "${key}" is not allowed in expressions`);
    }
  }
  // ── Execution ─────────────────────────────────────────────────────────────
  execute(expr, sandbox) {
    let fn;
    try {
      fn = new Function("scope", `with(scope) { return (${expr}) }`);
    } catch (e) {
      throw new Error(`Expression syntax error in "${expr}": ${e.message}`);
    }
    try {
      return fn(sandbox);
    } catch (e) {
      throw new Error(`Expression evaluation error in "${expr}": ${e.message}`);
    }
  }
}, __name(_a132, "AreSyntax"), _a132);
AreSyntax = __decorateClass3([
  A3.Define({
    namespace: "A-ARE",
    description: "Context that defines the syntax rules and structures for the A-Concept Rendering Engine (ARE). It provides mechanisms for parsing and interpreting templates, attributes, directives, interpolations, and event listeners, enabling dynamic and interactive UI rendering within the ARE framework."
  })
], AreSyntax);
var _a133;
var AreCompiler = (_a133 = class extends F {
  static Compile(param1) {
    return (target, propertyKey, descriptor) => {
      return x.Extend({
        name: param1.prototype instanceof AreNode ? AreNodeFeatures.onCompile : AreAttributeFeatures.Compile,
        scope: [param1],
        override: ["compile"]
      })(target, propertyKey, descriptor);
    };
  }
  compile(node, scene, logger, ...args) {
    try {
      logger?.debug("cyan", `AreCompiler: compile node <${node.aseid.toString()}>`);
      const hostInstruction = new AreDeclaration();
      scene.setHost(hostInstruction);
      scene.plan(hostInstruction);
      for (let i4 = 0; i4 < node.attributes.length; i4++) {
        const attribute = node.attributes[i4];
        attribute.compile();
      }
      if (node.children && node.children.length > 0) {
        for (let i4 = 0; i4 < node.children.length; i4++) {
          const child = node.children[i4];
          child.compile();
        }
      }
    } catch (error) {
      logger?.error(error);
    }
  }
}, __name(_a133, "AreCompiler"), _a133);
__decorateClass3([
  x.Extend({
    name: AreNodeFeatures.onCompile,
    scope: [AreNode]
  }),
  __decorateParam3(0, ke(H)),
  __decorateParam3(1, ke(AreScene)),
  __decorateParam3(2, ke(A_Logger))
], AreCompiler.prototype, "compile", 1);
AreCompiler = __decorateClass3([
  A3.Define({
    namespace: "A-ARE",
    description: "Walks the transformed AreNode tree and emits a Scene. Translates each node, binding, directive and interpolation into a typed instruction. Knows nothing about the DOM or any rendering target \u2014 its only concern is producing a complete and ordered set of instructions that fully describes how the tree should be rendered."
  })
], AreCompiler);
var _a134;
var AreTransformer = (_a134 = class extends F {
  transform(node, scope, scene, ...args) {
    const queue = [node];
    while (queue.length > 0) {
      const current = queue.shift();
      for (let i4 = 0; i4 < current.attributes.length; i4++) {
        const attribute = current.attributes[i4];
        attribute.transform();
      }
      queue.push(...current.children);
    }
  }
}, __name(_a134, "AreTransformer"), _a134);
__decorateClass3([
  x.Extend({
    name: AreNodeFeatures.onTransform,
    scope: [AreNode]
  }),
  __decorateParam3(0, ke(H)),
  __decorateParam3(1, ke(D)),
  __decorateParam3(2, ke(AreScene))
], AreTransformer.prototype, "transform", 1);
AreTransformer = __decorateClass3([
  A3.Define({
    namespace: "A-ARE",
    description: "Reshapes the AreNode tree before compilation without changing its abstraction level. Responsible for structural rewrites that would complicate the compiler if left unhandled \u2014 converting $for nodes into AreGroupNode, extracting AreText and AreInterpolation from raw text, sorting directives via TopologicalSorter, and flagging static nodes."
  })
], AreTransformer);
var _a135;
var AreLoader = (_a135 = class extends F {
  async load(node, scope, feature, logger, context, ...args) {
    logger?.debug("red", `Loading node <${node.aseid.toString()}> with content:`, scope);
    if (node.component) {
      context?.startPerformance("Total AreFeatures.onData");
      await feature.chain(node.component, AreFeatures.onData, scope);
      context?.endPerformance("Total AreFeatures.onData");
      context?.startPerformance("Total AreFeatures.onLoad");
      await feature.chain(node.component, AreFeatures.onStyles, scope);
      context?.endPerformance("Total AreFeatures.onLoad");
      context?.startPerformance("Total AreFeatures.onTemplate");
      await feature.chain(node.component, AreFeatures.onTemplate, scope);
      context?.endPerformance("Total AreFeatures.onTemplate");
    }
    context?.startPerformance("Tokenization");
    node.tokenize();
    context?.endPerformance("Tokenization");
    for (let i4 = 0; i4 < node.children.length; i4++) {
      const childNode = node.children[i4];
      const res = childNode.load();
      if (res instanceof Promise) {
        await res;
      }
    }
  }
}, __name(_a135, "AreLoader"), _a135);
__decorateClass3([
  x.Extend({
    name: pe.LOAD,
    scope: [AreNode]
  }),
  __decorateParam3(0, ke(H)),
  __decorateParam3(1, ke(D)),
  __decorateParam3(2, ke(x)),
  __decorateParam3(3, ke(A_Logger)),
  __decorateParam3(4, ke(AreContext))
], AreLoader.prototype, "load", 1);
AreLoader = __decorateClass3([
  A3.Define({
    namespace: "A-ARE",
    description: "Entry point of the pipeline. Accepts a raw template string and orchestrates the initial processing by delegating to Syntax. Returns a structured AreNode tree ready for transformation. Knows nothing about the template content or grammar rules."
  })
], AreLoader);
var AreStoreAreComponentMetaKeys = {
  StoreExtensions: "_AreStore_StoreExtensions"
};
var _a136;
var AreStore = (_a136 = class extends A_ExecutionContext {
  constructor(aseid) {
    super(aseid.toString());
    this.dependencies = /* @__PURE__ */ new Map();
    this._keys = /* @__PURE__ */ new Set();
  }
  /**
   * Allows to define a pure function that will be executed in the context of the store, so it can access the store's data and methods, but it won't have access to the component's scope or other features. This can be useful for example for defining a function that will update the store's data based on some logic, without having access to the component's scope or other features, so we can keep the store's logic separate from the component's logic.
   */
  static get Function() {
    return (target, propertyKey, descriptor) => {
      const targetMeta = c.meta(target.constructor);
      const originalMethod = descriptor.value;
      const allExtensions = targetMeta.get(AreStoreAreComponentMetaKeys.StoreExtensions) || {};
      allExtensions[propertyKey] = originalMethod;
      targetMeta.set(AreStoreAreComponentMetaKeys.StoreExtensions, allExtensions);
      return descriptor;
    };
  }
  get owner() {
    return c.scope(this).issuer();
  }
  get parent() {
    return this.owner.parent?.scope.resolve(AreStore);
  }
  get context() {
    return c.scope(this).resolve(AreContext);
  }
  get watchers() {
    return this.context.get("watchers") || /* @__PURE__ */ new Set();
  }
  get keys() {
    return this._keys;
  }
  watch(instruction) {
    const watchers = this.context.get("watchers") || /* @__PURE__ */ new Set();
    watchers.add(instruction);
    this.context.set("watchers", watchers);
  }
  unwatch(instruction) {
    const watchers = this.context.get("watchers") || /* @__PURE__ */ new Set();
    watchers.delete(instruction);
    this.context.set("watchers", watchers);
  }
  set(param1, param2) {
    if (typeof param1 === "string" && param2 !== void 0) {
      this.setAsKeyValue(param1, param2);
    } else if (typeof param1 === "object") {
      this.setAsObject(param1);
    } else {
      throw new Error("Invalid parameters for set method. Expected either (key: string, value: any) or (values: object).");
    }
    return this;
  }
  get(key) {
    const [firstPart, ...pathPart] = String(key).split(".");
    if (!this._keys.has(firstPart)) {
      return this.parent?.get(key);
    }
    if (this.watchers.size > 0) {
      const ancestors = this.extractPathSegments(String(key));
      for (const ancestor of ancestors) {
        const normAncestor = this.normalizePath(ancestor);
        if (!this.dependencies.has(normAncestor)) {
          this.dependencies.set(normAncestor, /* @__PURE__ */ new Set());
        }
        this.watchers.forEach((watcher) => this.dependencies.get(normAncestor).add(watcher));
      }
    }
    const primaryObject = super.get(firstPart);
    const value = A_UtilsHelper.getByPath(primaryObject, pathPart.join("."));
    return value;
  }
  setAsObject(values) {
    const entires = Object.entries(values);
    for (const [key, value] of entires) {
      this._keys.add(key);
      super.set(key, value);
      const normChanged = this.normalizePath(String(key));
      const prefix = normChanged + ".";
      for (const [normRegistered, instructions] of this.dependencies) {
        if (normRegistered === normChanged || // exact
        normRegistered.startsWith(prefix) || // descendant
        normChanged.startsWith(normRegistered + ".")) {
          this.notify(instructions);
        }
      }
    }
    return this;
  }
  setAsKeyValue(key, value) {
    const [firstPart, ...pathPart] = String(key).split(".");
    this._keys.add(firstPart);
    const primaryObject = super.get(firstPart);
    const result = A_UtilsHelper.setBypath(primaryObject, pathPart.join("."), value);
    super.set(firstPart, result ? result[firstPart] : value);
    const normChanged = this.normalizePath(String(key));
    const prefix = normChanged + ".";
    for (const [normRegistered, instructions] of this.dependencies) {
      if (normRegistered === normChanged || // exact
      normRegistered.startsWith(prefix) || // descendant
      normChanged.startsWith(normRegistered + ".")) {
        this.notify(instructions);
      }
    }
    return this;
  }
  /**
   * Notifies instructions — immediately or deferred if inside a batch.
   */
  notify(instructions) {
    for (const instruction of instructions) {
      try {
        instruction.update();
      } catch (error) {
      }
    }
  }
  /**
   * Removes an instruction from all dependency sets.
   * Called when an instruction is reverted/destroyed.
   */
  unregister(instruction) {
    for (const instructions of this.dependencies.values()) {
      instructions.delete(instruction);
    }
  }
  /**
   * Normalizes a path once — reused in both get and set.
   */
  normalizePath(path) {
    return path.replace(/\[(\d+)\]/g, ".$1");
  }
  /**
   * Extracts direct children of the current markup level into typed instances.
   * No tree walking, recursion, or nested parsing — just direct children.
   */
  extractPathSegments(path) {
    const normalized = path.replace(/\[(\d+)\]/g, ".$1");
    const parts = normalized.split(".").filter(Boolean);
    const ancestors = [];
    let current = "";
    for (let i4 = 0; i4 < parts.length; i4++) {
      const part = parts[i4];
      const isIndex = /^\d+$/.test(part);
      if (i4 === 0) {
        current = part;
      } else if (isIndex) {
        current = `${current}[${part}]`;
      } else {
        current = `${current}.${part}`;
      }
      ancestors.push(current);
    }
    return ancestors;
  }
  /**
   * Method allows to initialize all extensions defined in the component with @AreStore.Function decorator, so we can use them in the store's context. This method should be called in the component's constructor after super() call, so the store will have access to the component's instance and its properties.
   * 
   * @param component 
   */
  loadExtensions(component) {
    const targetMeta = c.meta(component);
    const allExtensions = targetMeta.get(AreStoreAreComponentMetaKeys.StoreExtensions) || {};
    this.set(allExtensions);
  }
}, __name(_a136, "AreStore"), _a136);
AreStore = __decorateClass3([
  A3.Define({
    namespace: "A-ARE",
    description: "Runtime data store scoped to an AreNode. Holds interpolation values, dynamic data bindings, and any per-node state that components need to read or write during rendering. Can be injected into directives, attributes, and lifecycle handlers to share mutable data across the render pipeline without exposing it globally."
  })
], AreStore);
var _a137;
var AreInterpreter = (_a137 = class extends F {
  /**
   * Decorator to mark a method as an instruction Apply handler for the specific instruction type. The method will be called during the render phase of the ARE component when the corresponding instruction needs to be applied. The method should contain logic to perform the necessary operations on the rendering target based on the instruction's content and context.
   * 
   * @param action 
   * @returns 
   */
  static Apply(action) {
    const name = action + AreInstructionFeatures.Apply;
    return (target, propertyKey, descriptor) => {
      return x.Extend({
        name,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  /**
   * Decorator to mark a method as an instruction Update handler for the specific instruction type. The method will be called during the render phase of the ARE component when the corresponding instruction has been updated. The method should contain logic to perform the necessary operations on the rendering target to update the effects of the instruction based on its new content and context.
   * 
   * @param action 
   * @returns 
   */
  static Update(action) {
    const name = action + AreInstructionFeatures.Update;
    return (target, propertyKey, descriptor) => {
      return x.Extend({
        name,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  /**
   * Decorator to mark a method as an instruction Revert handler for the specific instruction type. The method will be called during the render phase of the ARE component when the corresponding instruction needs to be reverted. The method should contain logic to perform the necessary operations on the rendering target to undo the effects of the instruction based on its content and context.
   * 
   * @param action 
   * @returns 
   */
  static Revert(action) {
    const name = action + AreInstructionFeatures.Revert;
    return (target, propertyKey, descriptor) => {
      return x.Extend({
        name,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  interpret(scene) {
    const { toApply, toRevert } = scene.changes;
    for (const instruction of toRevert) {
      try {
        instruction.revert();
        scene.unApply(instruction);
      } catch (error) {
        instruction.apply();
        scene.apply(instruction);
      }
    }
    for (const instruction of toApply) {
      try {
        instruction.apply();
        scene.apply(instruction);
      } catch (error) {
        instruction.revert();
        scene.unApply(instruction);
      }
    }
  }
  applyInstruction(instruction, interpreter, store, scope, feature, ...args) {
    try {
      store.watch(instruction);
      feature.chain(interpreter, instruction.name + AreInstructionFeatures.Apply, scope);
      store.unwatch(instruction);
    } catch (error) {
      store.unwatch(instruction);
      throw error;
    }
  }
  updateInstruction(instruction, interpreter, store, scope, feature, ...args) {
    try {
      store.watch(instruction);
      feature.chain(interpreter, instruction.name + AreInstructionFeatures.Update, scope);
      store.unwatch(instruction);
    } catch (error) {
      store.unwatch(instruction);
      throw error;
    }
  }
  revertInstruction(instruction, interpreter, store, scope, feature, ...args) {
    try {
      feature.chain(interpreter, instruction.name + AreInstructionFeatures.Revert, scope);
    } catch (error) {
      throw error;
    }
  }
}, __name(_a137, "AreInterpreter"), _a137);
__decorateClass3([
  x.Extend({
    name: AreNodeFeatures.onInterpret,
    scope: [AreNode]
  }),
  __decorateParam3(0, ke(AreScene))
], AreInterpreter.prototype, "interpret", 1);
__decorateClass3([
  x.Extend({
    name: AreInstructionFeatures.Apply,
    scope: [AreInstruction]
  }),
  __decorateParam3(0, ke(H)),
  __decorateParam3(1, ke(AreInterpreter)),
  __decorateParam3(2, ke(AreStore)),
  __decorateParam3(3, ke(D)),
  __decorateParam3(4, ke(x))
], AreInterpreter.prototype, "applyInstruction", 1);
__decorateClass3([
  x.Extend({
    name: AreInstructionFeatures.Update,
    scope: [AreInstruction]
  }),
  __decorateParam3(0, ke(H)),
  __decorateParam3(1, ke(AreInterpreter)),
  __decorateParam3(2, ke(AreStore)),
  __decorateParam3(3, ke(D)),
  __decorateParam3(4, ke(x))
], AreInterpreter.prototype, "updateInstruction", 1);
__decorateClass3([
  x.Extend({
    name: AreInstructionFeatures.Revert,
    scope: [AreInstruction]
  }),
  __decorateParam3(0, ke(H)),
  __decorateParam3(1, ke(AreInterpreter)),
  __decorateParam3(2, ke(AreStore)),
  __decorateParam3(3, ke(D)),
  __decorateParam3(4, ke(x))
], AreInterpreter.prototype, "revertInstruction", 1);
AreInterpreter = __decorateClass3([
  A3.Define({
    namespace: "A-ARE",
    description: "Stateless executor that reads the Scene and translates its instructions into operations on a rendering target. Computes the diff between applied and planned, calls revert on removed instructions and apply on added ones. Owns no state of its own \u2014 all state lives in the Scene. Can be swapped for any target implementation (DOMInterpreter, SSRInterpreter, CanvasInterpreter) without touching any other part of the pipeline."
  })
], AreInterpreter);
var _a138;
var AreEngineError = (_a138 = class extends P {
}, __name(_a138, "AreEngineError"), _a138);
AreEngineError.MissedRequiredDependency = "A Required Dependency is missing in AreEngine";
var _a139;
var AreLifecycle = (_a139 = class extends F {
  static Init(param1) {
    return (target, propertyKey, descriptor) => {
      return x.Extend({
        name: param1.prototype instanceof AreNode ? AreNodeFeatures.onInit : AreAttributeFeatures.Init,
        scope: [param1],
        override: ["init"]
      })(target, propertyKey, descriptor);
    };
  }
  beforeInit(node, scope, scene, feature, ...args) {
    const logger = scope.resolve(A_Logger);
    logger?.debug(`[Init -> Before] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);
    if (node.component)
      feature.chain(node.component, AreFeatures.onBeforeInit, node.scope);
  }
  init(node, scope, context, logger, ...args) {
    context.startPerformance("AreLifecycle.init");
    const newNodeScene = new AreScene(node.aseid);
    scope.register(newNodeScene);
    if (node.component) {
      const newNodeStore = new AreStore(node.aseid);
      scope.register(newNodeStore);
      newNodeStore.loadExtensions(node.component);
    }
    context.endPerformance("AreLifecycle.init");
  }
  afterInit(node, scope, scene, feature, ...args) {
    const logger = scope.resolve(A_Logger);
    logger?.debug(`[Init -> After] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);
    if (node.component)
      feature.chain(node.component, AreFeatures.onAfterInit, node.scope);
  }
  beforeMount(node, scope, scene, feature, ...args) {
    const logger = scope.resolve(A_Logger);
    logger?.debug(`[Mount -> Before] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);
    if (node.component)
      feature.chain(node.component, AreFeatures.onBeforeMount, node.scope);
  }
  mount(node, scene, logger, ...args) {
    logger?.debug(`[Mount] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);
    const queue = [node];
    while (queue.length > 0) {
      const current = queue.shift();
      const scene2 = current.scene;
      if (scene2.isInactive)
        continue;
      const { toApply, toRevert } = scene2.changes;
      for (const instruction of toRevert) {
        try {
          instruction.revert();
          scene2.unApply(instruction);
        } catch (error) {
          instruction.apply();
          scene2.apply(instruction);
        }
      }
      for (const instruction of toApply) {
        try {
          instruction.apply();
          scene2.apply(instruction);
        } catch (error) {
          instruction.revert();
          scene2.unApply(instruction);
        }
      }
      queue.push(...current.children);
    }
  }
  afterMount(node, scope, scene, feature, ...args) {
    const logger = scope.resolve(A_Logger);
    logger?.debug(`[Mount -> After] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);
    if (node.component)
      feature.chain(node.component, AreFeatures.onAfterMount, node.scope);
  }
  beforeUpdate(node, scope, scene, feature, ...args) {
    const logger = scope.resolve(A_Logger);
    logger?.debug(`[Update -> Before] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);
    if (node.component)
      feature.chain(node.component, AreFeatures.onBeforeUpdate, node.scope);
  }
  update(node, context, logger, ...args) {
    logger?.debug(`[Update] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);
    const queue = [node];
    while (queue.length > 0) {
      const current = queue.shift();
      const scene = current.scene;
      if (scene.isInactive)
        continue;
      const { toApply, toRevert } = scene.changes;
      for (const instruction of toRevert) {
        try {
          instruction.revert();
          scene.unApply(instruction);
        } catch (error) {
          instruction.apply();
          scene.apply(instruction);
        }
      }
      for (const instruction of toApply) {
        try {
          instruction.apply();
          scene.apply(instruction);
        } catch (error) {
          instruction.revert();
          scene.unApply(instruction);
        }
      }
      queue.push(...current.children);
    }
  }
  afterUpdate(node, scope, scene, feature, ...args) {
    const logger = scope.resolve(A_Logger);
    logger?.debug(`[Update -> After] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);
    if (node.component)
      feature.chain(node.component, AreFeatures.onAfterUpdate, node.scope);
  }
  beforeUnmount(node, scope, scene, feature, ...args) {
    const logger = scope.resolve(A_Logger);
    logger?.debug(`[Unmount -> Before] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);
    if (node.component)
      feature.chain(node.component, AreFeatures.onBeforeUnmount, node.scope);
  }
  unmount(node, scene, ...args) {
    const queue = [node];
    while (queue.length > 0) {
      const current = queue.shift();
      const scene2 = current.scene;
      const applied = [...scene2.applied];
      for (let i4 = applied.length - 1; i4 >= 0; i4--) {
        const instruction = applied[i4];
        try {
          instruction.revert();
          scene2.unApply(instruction);
        } catch (error) {
          scene2.unApply(instruction);
        }
      }
      queue.push(...current.children);
    }
  }
  afterUnmount(node, scope, scene, feature, ...args) {
    const logger = scope.resolve(A_Logger);
    logger?.debug(`[Unmount -> After] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);
    if (node.component)
      feature.chain(node.component, AreFeatures.onAfterUnmount, node.scope);
  }
  beforeDestroy(node, scope, feature, ...args) {
    const logger = scope.resolve(A_Logger);
    logger?.debug(`[Destroy -> Before] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);
    if (node.component)
      feature.chain(node.component, AreFeatures.onBeforeDestroy, node.scope);
  }
  destroy(node, scene, ...args) {
  }
  afterDestroy(node, scope, feature, ...args) {
    const logger = scope.resolve(A_Logger);
    logger?.debug(`[Destroy -> After] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);
    if (node.component)
      feature.chain(node.component, AreFeatures.onAfterDestroy, node.scope);
  }
}, __name(_a139, "AreLifecycle"), _a139);
__decorateClass3([
  x.Extend({
    name: AreNodeFeatures.onBeforeInit,
    before: /.*/,
    scope: [AreNode]
  }),
  __decorateParam3(0, ke(H)),
  __decorateParam3(1, ke(D)),
  __decorateParam3(2, ke(AreScene)),
  __decorateParam3(3, ke(x))
], AreLifecycle.prototype, "beforeInit", 1);
__decorateClass3([
  x.Extend({
    name: AreNodeFeatures.onInit,
    scope: [AreNode]
  }),
  __decorateParam3(0, ke(H)),
  __decorateParam3(1, ke(D)),
  __decorateParam3(2, ke(AreContext)),
  __decorateParam3(3, ke(A_Logger))
], AreLifecycle.prototype, "init", 1);
__decorateClass3([
  x.Extend({
    name: AreNodeFeatures.onAfterInit,
    after: /.*/,
    scope: [AreNode]
  }),
  __decorateParam3(0, ke(H)),
  __decorateParam3(1, ke(D)),
  __decorateParam3(2, ke(AreScene)),
  __decorateParam3(3, ke(x))
], AreLifecycle.prototype, "afterInit", 1);
__decorateClass3([
  x.Extend({
    name: AreNodeFeatures.onBeforeMount,
    before: /.*/,
    scope: [AreNode]
  }),
  __decorateParam3(0, ke(H)),
  __decorateParam3(1, ke(D)),
  __decorateParam3(2, ke(AreScene)),
  __decorateParam3(3, ke(x))
], AreLifecycle.prototype, "beforeMount", 1);
__decorateClass3([
  x.Extend({
    name: AreNodeFeatures.onMount,
    scope: [AreNode]
  }),
  __decorateParam3(0, ke(H)),
  __decorateParam3(1, ke(AreScene)),
  __decorateParam3(2, ke(A_Logger))
], AreLifecycle.prototype, "mount", 1);
__decorateClass3([
  x.Extend({
    name: AreNodeFeatures.onAfterMount,
    after: /.*/,
    scope: [AreNode]
  }),
  __decorateParam3(0, ke(H)),
  __decorateParam3(1, ke(D)),
  __decorateParam3(2, ke(AreScene)),
  __decorateParam3(3, ke(x))
], AreLifecycle.prototype, "afterMount", 1);
__decorateClass3([
  x.Extend({
    name: AreNodeFeatures.onUpdate,
    before: /.*/,
    scope: [AreNode]
  }),
  __decorateParam3(0, ke(H)),
  __decorateParam3(1, ke(D)),
  __decorateParam3(2, ke(AreScene)),
  __decorateParam3(3, ke(x))
], AreLifecycle.prototype, "beforeUpdate", 1);
__decorateClass3([
  x.Extend({
    name: AreNodeFeatures.onUpdate,
    scope: [AreNode]
  }),
  __decorateParam3(0, ke(H)),
  __decorateParam3(1, ke(AreContext)),
  __decorateParam3(2, ke(A_Logger))
], AreLifecycle.prototype, "update", 1);
__decorateClass3([
  x.Extend({
    name: AreNodeFeatures.onUpdate,
    after: /.*/,
    scope: [AreNode]
  }),
  __decorateParam3(0, ke(H)),
  __decorateParam3(1, ke(D)),
  __decorateParam3(2, ke(AreScene)),
  __decorateParam3(3, ke(x))
], AreLifecycle.prototype, "afterUpdate", 1);
__decorateClass3([
  x.Extend({
    name: AreNodeFeatures.onBeforeUnmount,
    before: /.*/,
    scope: [AreNode]
  }),
  __decorateParam3(0, ke(H)),
  __decorateParam3(1, ke(D)),
  __decorateParam3(2, ke(AreScene)),
  __decorateParam3(3, ke(x))
], AreLifecycle.prototype, "beforeUnmount", 1);
__decorateClass3([
  x.Extend({
    name: AreNodeFeatures.onUnmount,
    scope: [AreNode]
  }),
  __decorateParam3(0, ke(H)),
  __decorateParam3(1, ke(AreScene))
], AreLifecycle.prototype, "unmount", 1);
__decorateClass3([
  x.Extend({
    name: AreNodeFeatures.onAfterUnmount,
    after: /.*/,
    scope: [AreNode]
  }),
  __decorateParam3(0, ke(H)),
  __decorateParam3(1, ke(D)),
  __decorateParam3(2, ke(AreScene)),
  __decorateParam3(3, ke(x))
], AreLifecycle.prototype, "afterUnmount", 1);
__decorateClass3([
  x.Extend({
    name: AreNodeFeatures.onBeforeDestroy,
    before: /.*/,
    scope: [AreNode]
  }),
  __decorateParam3(0, ke(H)),
  __decorateParam3(1, ke(D)),
  __decorateParam3(2, ke(x))
], AreLifecycle.prototype, "beforeDestroy", 1);
__decorateClass3([
  x.Extend({
    name: pe.DESTROY,
    scope: [AreNode]
  }),
  __decorateParam3(0, ke(H)),
  __decorateParam3(1, ke(AreScene))
], AreLifecycle.prototype, "destroy", 1);
__decorateClass3([
  x.Extend({
    name: AreNodeFeatures.onAfterDestroy,
    after: /.*/,
    scope: [AreNode]
  }),
  __decorateParam3(0, ke(H)),
  __decorateParam3(1, ke(D)),
  __decorateParam3(2, ke(x))
], AreLifecycle.prototype, "afterDestroy", 1);
AreLifecycle = __decorateClass3([
  A3.Define({
    namespace: "A-ARE",
    description: "Handles the lifecycle of the AreNode and related entities such as interpolations, directives, attributes, and so on. It provides lifecycle hooks for initialization, mounting, updating, and unmounting of the nodes, allowing to manage the state and behavior of the nodes throughout their lifecycle in a structured and consistent way."
  })
], AreLifecycle);
var AreEngineFeatures = {
  Load: "_AreEngine_Load",
  Build: "_AreEngine_Build",
  Execute: "_AreEngine_Execute"
};
var _a140;
var AreTokenizerError = (_a140 = class extends P {
}, __name(_a140, "AreTokenizerError"), _a140);
var _a141;
var AreTokenizer = (_a141 = class extends F {
  /**
   * Get the AreSyntax from the current scope. The AreSyntax defines the syntax rules and structures for tokenizing templates. It provides mechanisms for parsing and interpreting templates, attributes, directives, interpolations, and event listeners, enabling dynamic and interactive UI rendering within the ARE framework. If no AreSyntax is found in the scope, an error is thrown indicating that AreTokenizer requires an AreSyntax to function properly.
   */
  get config() {
    const syntax = c.scope(this).resolve(AreSyntax);
    if (!syntax) throw new AreTokenizerError({
      title: "Syntax Context Not Found",
      description: "AreTokenizer requires an AreSyntax to be present in the same scope. Ensure that an AreSyntax fragment is included in the concept and is accessible from the scope where AreTokenizer is used."
    });
    return syntax;
  }
  instantiate(context) {
    context.startPerformance("Tokenizer Instantiate");
    const source = context.source;
    const nodes = this.scan(source, 0, source.length, context).map((match) => {
      const rule = this.findRuleForMatch(match);
      if (!rule) throw new Error(`No rule found for match at position ${match.position}`);
      return new rule.component(match);
    });
    for (const node of nodes) {
      context.addRoot(node);
    }
    context.endPerformance("Tokenizer Instantiate");
  }
  tokenize(node, context, logger) {
    context.startPerformance(`Tokenize method`);
    const source = node.content;
    const content = this.scan(source, 0, source.length, context).map((match) => {
      const rule = this.findRuleForMatch(match);
      if (!rule) throw new Error(`No rule found for match at position ${match.position}`);
      return new rule.component(match);
    });
    logger?.debug("red", `Tokenized node <${node.aseid.toString()}> with content:`, content.length);
    context.endPerformance(`Tokenize method`);
    context.startPerformance(`Tokenize node Create Children`);
    for (const child of content) {
      node.addChild(child);
      context.startPerformance("AreTokenizer.tokenize child init");
      child.init();
      context.endPerformance("AreTokenizer.tokenize child init");
    }
    context.endPerformance(`Tokenize node Create Children`);
  }
  scan(source, from, to, context) {
    context.startPerformance("Tokenizer Scan");
    const tokens = [];
    let index = from;
    let hasMatchBefore = false;
    while (index < to) {
      const match = this.findNextMatch(source, index, to);
      if (!match) {
        const rest = source.slice(index, to);
        const t5 = this.tryPlainText(rest, index);
        if (t5 && !(this.config.trimWhitespace && !rest.trim())) tokens.push(t5);
        break;
      }
      if (match.position > index) {
        const plain = source.slice(index, match.position);
        const t5 = this.tryPlainText(plain, index);
        if (t5) {
          if (this.config.trimWhitespace && !plain.trim()) {
            if (hasMatchBefore) {
              t5.content = " ";
              tokens.push(t5);
            }
          } else {
            tokens.push(t5);
          }
        }
      }
      tokens.push(match);
      hasMatchBefore = true;
      index = match.position + match.raw.length;
    }
    context.endPerformance("Tokenizer Scan");
    return tokens;
  }
  findNextMatch(source, from, to) {
    let earliest = null;
    for (const rule of this.config.rules) {
      if (!rule.opening && !rule.closing && !rule.pattern && !rule.matcher) continue;
      const match = this.matchRule(source, rule, from, to);
      if (!match) continue;
      if (!earliest || match.position < earliest.position) earliest = match;
    }
    return earliest;
  }
  matchRule(source, rule, from, to) {
    if (rule.matcher) {
      return rule.matcher(
        source,
        from,
        to,
        (raw, content, position, closing) => this.buildMatch(rule, raw, content, position, closing)
      );
    }
    if (rule.pattern) {
      const slice = source.slice(from, to);
      rule.pattern.lastIndex = 0;
      const m4 = rule.pattern.exec(slice);
      if (!m4) return null;
      return this.buildMatch(rule, m4[0], m4[0], from + m4.index, "");
    }
    if (!rule.opening || !rule.closing) return null;
    if (rule.prefix) return this.matchPrefixedRule(source, rule, from, to);
    return this.matchStandardRule(source, rule, from, to);
  }
  matchStandardRule(source, rule, from, to) {
    const opening = rule.opening;
    const closing = rule.closing;
    const openPos = source.indexOf(opening, from);
    if (openPos === -1 || openPos >= to) return null;
    const contentStart = openPos + opening.length;
    if (rule.selfClosing) {
      const selfClosePos = source.indexOf(rule.selfClosing, contentStart);
      const normalClosePos = source.indexOf(closing, contentStart);
      if (selfClosePos !== -1 && (normalClosePos === -1 || selfClosePos < normalClosePos)) {
        const closeEnd = selfClosePos + rule.selfClosing.length;
        return this.buildMatch(rule, source.slice(openPos, closeEnd), source.slice(contentStart, selfClosePos), openPos, rule.selfClosing);
      }
    }
    const closePos = rule.nested !== false ? this.findMatchingClose(source, opening, closing, contentStart, to) : source.indexOf(closing, contentStart);
    if (closePos === -1) {
      if (this.config.strictMode) throw new Error(`Unclosed token '${opening}' at position ${openPos}`);
      return null;
    }
    return this.buildMatch(rule, source.slice(openPos, closePos + closing.length), source.slice(contentStart, closePos), openPos, closing);
  }
  matchPrefixedRule(source, rule, from, to) {
    const opening = rule.opening;
    const closing = rule.closing;
    let searchFrom = from;
    while (searchFrom < to) {
      const openPos = source.indexOf(opening, searchFrom);
      if (openPos === -1 || openPos >= to) return null;
      const before = source.slice(from, openPos);
      const prefixRe = new RegExp(rule.prefix.source + "$");
      const prefixM = prefixRe.exec(before);
      if (prefixM) {
        const actualStart = openPos - prefixM[0].length;
        const contentStart = openPos + opening.length;
        const closePos = rule.nested !== false ? this.findMatchingClose(source, opening, closing, contentStart, to) : source.indexOf(closing, contentStart);
        if (closePos === -1) {
          if (this.config.strictMode) throw new Error(`Unclosed token '${opening}' at position ${openPos}`);
          return null;
        }
        return this.buildMatch(rule, source.slice(actualStart, closePos + closing.length), source.slice(contentStart, closePos), actualStart, closing);
      }
      searchFrom = openPos + 1;
    }
    return null;
  }
  findMatchingClose(source, opening, closing, from, to) {
    let level = 1;
    let index = from;
    while (index < to) {
      const nextOpen = source.indexOf(opening, index);
      const nextClose = source.indexOf(closing, index);
      if (nextClose === -1) return -1;
      if (nextOpen !== -1 && nextOpen < nextClose) {
        level++;
        index = nextOpen + opening.length;
        continue;
      }
      level--;
      if (level === 0) return nextClose;
      index = nextClose + closing.length;
    }
    return -1;
  }
  buildMatch(rule, raw, content, position, closingUsed) {
    const trimmed = this.config.trimWhitespace ? content.trim() : content;
    const match = { raw, content: trimmed, opening: rule.opening ?? "", closing: closingUsed, position, payload: {}, _rule: rule };
    if (rule.extract) match.payload = rule.extract(raw, match);
    return match;
  }
  tryPlainText(raw, position) {
    if (!raw) return null;
    const rule = this.config.rules.find((r4) => !r4.opening && !r4.closing && !r4.pattern && !r4.matcher);
    if (!rule) return null;
    const match = this.buildMatch(rule, raw, raw, position, "");
    match._rule = rule;
    return match;
  }
  findRuleForMatch(match) {
    if (match._rule) return match._rule;
    return this.config.rules.find((r4) => (r4.opening ?? "") === match.opening && (r4.closing ?? "") === match.closing);
  }
}, __name(_a141, "AreTokenizer"), _a141);
__decorateClass3([
  x.Extend({
    name: AreEngineFeatures.Load
    // scope: [AreEngine]
  }),
  __decorateParam3(0, ke(AreContext))
], AreTokenizer.prototype, "instantiate", 1);
__decorateClass3([
  x.Extend({
    name: AreNodeFeatures.onTokenize,
    scope: [AreNode]
  }),
  __decorateParam3(0, ke(H)),
  __decorateParam3(1, ke(AreContext)),
  __decorateParam3(2, ke(A_Logger))
], AreTokenizer.prototype, "tokenize", 1);
AreTokenizer = __decorateClass3([
  A3.Define({
    namespace: "A-ARE",
    description: "AreTokenizer is responsible for scanning and tokenizing template source strings using the syntax rules defined in AreSyntax. It converts raw template strings into AreNode instances that represent the structured AST of the template, enabling downstream compilation and rendering within the ARE framework."
  })
], AreTokenizer);
var _a142;
var AreSignal = (_a142 = class extends A_Signal {
  static get concept() {
    return "are";
  }
}, __name(_a142, "AreSignal"), _a142);
AreSignal = __decorateClass3([
  A3.Define({
    namespace: "A-ARE",
    description: "AreSignal is the base class for all signals used within the ARE framework. It extends A_Signal to provide a typed signal entity that components can subscribe to and emit, enabling reactive communication between ARE components and driving lifecycle and rendering updates."
  })
], AreSignal);
var _a143;
var AreInit = (_a143 = class extends AreSignal {
  static default() {
    return new _a143({ data: { ready: false } });
  }
}, __name(_a143, "_AreInit"), _a143);
var _a144;
var AreEngine = (_a144 = class extends F {
  /**
   * Feature decorator for the load method, which is responsible for the initial loading phase of the engine. This method is where the engine reads the source template, tokenizes it, and prepares the initial context for building the scene. The decorator allows for extending or overriding the default loading behavior by attaching additional functionality before or after the load process.
   */
  static get Load() {
    return (target, propertyKey, descriptor) => {
      return x.Extend({
        name: AreEngineFeatures.Load,
        scope: [target.constructor],
        override: ["defaultLoad"]
      })(target, propertyKey, descriptor);
    };
  }
  /**
   * Feature decorator for the build method, which is responsible for constructing the scene based on the loaded context. This method typically involves initializing root nodes, applying transformations, and compiling the scene into a format that can be executed by the interpreter. The decorator allows for customizing the build process by adding additional steps or modifying the existing behavior.
   */
  static get Build() {
    return (target, propertyKey, descriptor) => {
      return x.Extend({
        name: AreEngineFeatures.Build,
        scope: [target.constructor],
        override: ["defaultBuild"]
      })(target, propertyKey, descriptor);
    };
  }
  /**
   * Feature decorator for the execute method, which is responsible for the final execution phase of the engine. This method typically involves mounting the root nodes to the DOM and starting the reactive update cycle based on signals and state changes. The decorator allows for customizing the execution process by adding additional steps or modifying the existing behavior.
   */
  static get Execute() {
    return (target, propertyKey, descriptor) => {
      return x.Extend({
        name: AreEngineFeatures.Execute,
        scope: [target.constructor],
        override: ["defaultExecute"]
      })(target, propertyKey, descriptor);
    };
  }
  async load(scope) {
    const context = scope?.resolve(AreContext) || c.scope(this).resolve(AreContext);
    context?.startPerformance();
    await this.call(AreEngineFeatures.Load, scope || c.scope(this));
  }
  async build(scope) {
    const context = scope?.resolve(AreContext) || c.scope(this).resolve(AreContext);
    context?.startPerformance("Build Total");
    await this.call(AreEngineFeatures.Build, scope || c.scope(this));
    context?.endPerformance("Build Total");
  }
  async execute(scope) {
    const context = scope?.resolve(AreContext) || c.scope(this).resolve(AreContext);
    context?.startPerformance("Execute Total");
    await this.call(AreEngineFeatures.Execute, scope || c.scope(this));
    context?.endPerformance("Execute Total");
    context?.endPerformance("Total");
  }
  async defaultBuild(context, logger) {
    logger?.debug("cyan", "Starting to build the scene...");
    for (const root of context.roots) {
      context.startPerformance(`Init root <${root.aseid.id}>`);
      root.init();
      context.endPerformance(`Init root <${root.aseid.id}>`);
      context.startPerformance(`Load root <${root.aseid.id}>`);
      await root.load();
      context.endPerformance(`Load root <${root.aseid.id}>`);
      context.startPerformance(`Transform root <${root.aseid.id}>`);
      root.transform();
      context.endPerformance(`Transform root <${root.aseid.id}>`);
      context.startPerformance(`Compile root <${root.aseid.id}>`);
      root.compile();
      context.endPerformance(`Compile root <${root.aseid.id}>`);
      context.endPerformance(`Root <${root.aseid.id}> Total`);
    }
  }
  async defaultExecute(context, bus, logger) {
    logger?.debug("cyan", "Starting to execute the scene and mount root nodes...");
    for (const root of context.roots) {
      context.startPerformance(`Mount root <${root.aseid.id}>`);
      root.mount();
      context.endPerformance(`Mount root <${root.aseid.id}>`);
    }
    logger?.debug("cyan", "Emitting AreInit signal to start the reactive update cycle...");
    await bus?.next(new AreInit());
  }
  async init(scope) {
    this.package(scope);
  }
  async verify(scope, syntax, syntaxContext, transformer, loader, compiler, interpreter, lifecycle, logger) {
    if (!syntax)
      throw new AreEngineError({
        title: AreEngineError.MissedRequiredDependency,
        description: `AreSyntax or its inherited variation is a required dependency for ${this.constructor.name}. Please ensure that it is registered in the container scope before starting the engine.`
      });
    if (!syntaxContext)
      throw new AreEngineError({
        title: AreEngineError.MissedRequiredDependency,
        description: `AreSyntax or its inherited variation is a required dependency for ${this.constructor.name}. Please ensure that it is registered in the container scope before starting the engine.`
      });
    if (!loader)
      throw new AreEngineError({
        title: AreEngineError.MissedRequiredDependency,
        description: `AreLoader or its inherited variation is a required dependency for ${this.constructor.name}. Please ensure that it is registered in the container scope before starting the engine.`
      });
    if (!transformer)
      throw new AreEngineError({
        title: AreEngineError.MissedRequiredDependency,
        description: `AreTransformer or its inherited variation is a required dependency for ${this.constructor.name}. Please ensure that it is registered in the container scope before starting the engine.`
      });
    if (!compiler)
      throw new AreEngineError({
        title: AreEngineError.MissedRequiredDependency,
        description: `AreCompiler or its inherited variation is a required dependency for ${this.constructor.name}. Please ensure that it is registered in the container scope before starting the engine.`
      });
    if (!interpreter)
      throw new AreEngineError({
        title: AreEngineError.MissedRequiredDependency,
        description: `AreInterpreter or its inherited variation is a required dependency for ${this.constructor.name}. Please ensure that it is registered in the container scope before starting the engine.`
      });
    if (!lifecycle)
      throw new AreEngineError({
        title: AreEngineError.MissedRequiredDependency,
        description: `AreLifecycle or its inherited variation is a required dependency for ${this.constructor.name}. Please ensure that it is registered in the container scope before starting the engine.`
      });
  }
  package(scope, dependencies) {
    const { context, syntax, loader, tokenizer, compiler, transformer, interpreter, lifecycle, signals } = dependencies || {};
    const existedContext = scope.resolveConstructor(AreContext);
    const existedSyntax = scope.resolveConstructor(AreSyntax);
    const existedLoader = scope.resolveConstructor(AreLoader);
    const existedTokenizer = scope.resolveConstructor(AreTokenizer);
    const existedCompiler = scope.resolveConstructor(AreCompiler);
    const existedInterpreter = scope.resolveConstructor(AreInterpreter);
    const existedLifecycle = scope.resolveConstructor(AreLifecycle);
    const existedTransformer = scope.resolveConstructor(AreTransformer);
    const existedSignals = scope.resolveConstructor(AreSignals);
    this.packDependency(scope, context || AreContext, existedContext);
    this.packDependency(scope, syntax || AreSyntax, existedSyntax);
    this.packDependency(scope, tokenizer || AreTokenizer, existedTokenizer);
    this.packDependency(scope, loader || AreLoader, existedLoader);
    this.packDependency(scope, compiler || AreCompiler, existedCompiler);
    this.packDependency(scope, transformer || AreTransformer, existedTransformer);
    this.packDependency(scope, interpreter || AreInterpreter, existedInterpreter);
    this.packDependency(scope, lifecycle || AreLifecycle, existedLifecycle);
    this.packDependency(scope, signals || AreSignals, existedSignals);
  }
  packDependency(scope, dependency, existed) {
    const logger = scope.resolve(A_Logger);
    const thisName = l.getComponentName(this);
    const scopeIssuerName = l.getComponentName(scope.issuer());
    const dependencyName = l.getComponentName(dependency);
    if (existed) {
      logger?.debug("cyan", `Dependency ${dependencyName} already exists in ${scopeIssuerName} scope. Skipping injection.`);
      return existed;
    } else {
      logger?.debug("cyan", `Injecting ${dependencyName} into ${scopeIssuerName} scope for ${thisName}...`);
      scope.register(dependency);
      return dependency;
    }
  }
}, __name(_a144, "AreEngine"), _a144);
__decorateClass3([
  A3.Define({
    description: "Method does engine loading, first read of the source and tokenization."
  })
], AreEngine.prototype, "load", 1);
__decorateClass3([
  A3.Define({
    description: "Method responsible for building the scene, which includes initializing root nodes, loading necessary data, applying transformations, and compiling the scene into a format that can be executed by the interpreter."
  })
], AreEngine.prototype, "build", 1);
__decorateClass3([
  A3.Define({
    description: "Method responsible for executing the rendering process, which involves mounting the root nodes to the DOM and starting the reactive update cycle based on signals and state changes."
  })
], AreEngine.prototype, "execute", 1);
__decorateClass3([
  x.Extend({
    name: AreEngineFeatures.Build,
    before: /.*/
  }),
  __decorateParam3(0, v.Required()),
  __decorateParam3(0, ke(AreContext)),
  __decorateParam3(1, ke(A_Logger))
], AreEngine.prototype, "defaultBuild", 1);
__decorateClass3([
  x.Extend({
    name: AreEngineFeatures.Execute,
    before: /.*/
  }),
  __decorateParam3(0, v.Required()),
  __decorateParam3(0, ke(AreContext)),
  __decorateParam3(1, ke(A_SignalBus)),
  __decorateParam3(2, ke(A_Logger))
], AreEngine.prototype, "defaultExecute", 1);
__decorateClass3([
  x.Extend({
    name: AreEngineFeatures.Load,
    before: /.*/
  }),
  __decorateParam3(0, ke(D))
], AreEngine.prototype, "init", 1);
__decorateClass3([
  x.Extend({
    name: AreEngineFeatures.Load,
    before: /.*/
  }),
  __decorateParam3(0, ke(D)),
  __decorateParam3(1, ke(AreSyntax)),
  __decorateParam3(2, ke(AreSyntax)),
  __decorateParam3(3, ke(AreTransformer)),
  __decorateParam3(4, ke(AreLoader)),
  __decorateParam3(5, ke(AreCompiler)),
  __decorateParam3(6, ke(AreInterpreter)),
  __decorateParam3(7, ke(AreLifecycle)),
  __decorateParam3(8, ke(A_Logger))
], AreEngine.prototype, "verify", 1);
__decorateClass3([
  A3.Define({
    description: "Method to pack all necessary dependencies for the engine. This method is called during the initialization phase of the engine and ensures that all required components are registered in the container scope, allowing for proper dependency injection and management throughout the engine's lifecycle."
  })
], AreEngine.prototype, "package", 1);
AreEngine = __decorateClass3([
  A3.Define({
    namespace: "A-ARE",
    description: "Core rendering engine for A-Concept Rendering Engine (ARE), responsible for orchestrating the loading, building, and execution of the rendering process. It manages the lifecycle of root nodes, coordinates the interactions between syntax, transformer, loader, compiler, and interpreter components, and ensures the proper initialization and mounting of the UI application."
  })
], AreEngine);
var _a145;
var AreWatcher = (_a145 = class extends F {
  /**
   * Initialize the watcher. This method is called once when the watcher is first created. Use this to set up any necessary state or start observing changes.
   */
  init() {
  }
  /**
   * Start watching for changes. This method is called after the engine has executed. Use this to set up any necessary event listeners or intervals to observe changes and produce signals.
   */
  watch() {
  }
  destroy() {
  }
}, __name(_a145, "AreWatcher"), _a145);
__decorateClass3([
  Ie.Stop()
], AreWatcher.prototype, "destroy", 1);
AreWatcher = __decorateClass3([
  A3.Define({
    namespace: "A-ARE",
    description: "Abstract base component that observes external changes and emits A_Signals to drive reactive updates within the ARE pipeline. Subclasses override init() to set up initial state and watch() to begin observing \u2014 for example, polling a data source, listening to DOM events, or subscribing to a store \u2014 and call the appropriate signal methods to notify the engine when a re-render is needed."
  })
], AreWatcher);
var _a146;
var _a147;
var AreContainer = (_a147 = class extends A_Service {
  async [_a146 = A_ServiceFeatures.onStart](engine, context, watchers, logger) {
    try {
      for (const watcher of watchers ?? []) {
        await watcher.init();
      }
      await engine.load();
      await engine.build();
      await engine.execute();
      for (const watcher of watchers ?? []) {
        await watcher.watch();
      }
      logger?.info("cyan", `UI Application started at <${context.roots.map((root) => root.aseid.id).join(", ")}> with ${context.roots.length} root nodes.`);
      logger?.debug(
        "cyan",
        "Performance:",
        "------------------------------ \n",
        ...context.performance,
        "------------------------------ \n",
        "Stats:",
        "------------------------------ \n",
        ...context.stats
      );
    } catch (error) {
      logger?.error(error);
    }
  }
}, __name(_a147, "AreContainer"), _a147);
__decorateClass3([
  x.Extend(),
  __decorateParam3(0, v.Required()),
  __decorateParam3(0, ke(AreEngine)),
  __decorateParam3(1, v.Required()),
  __decorateParam3(1, ke(AreContext)),
  __decorateParam3(2, v.All()),
  __decorateParam3(2, v.Flat()),
  __decorateParam3(2, ke(AreWatcher)),
  __decorateParam3(3, ke(A_Logger))
], AreContainer.prototype, _a146, 1);
var _a148;
var AreSyntaxError = (_a148 = class extends P {
}, __name(_a148, "AreSyntaxError"), _a148);
AreSyntaxError.SyntaxParseError = "Are Syntax Parse Error";
AreSyntaxError.SyntaxNotSupportedError = "Are Syntax Not Supported Error";
AreSyntaxError.MethodNotImplementedError = "Are Syntax Method Not Implemented Error";
var _a149;
var AreCompilerError = (_a149 = class extends P {
}, __name(_a149, "AreCompilerError"), _a149);
AreCompilerError.RenderError = "Are Compiler Render Error";
AreCompilerError.CompilationError = "Are Compiler Compilation Error";
var _a150;
var AreInterpreterError = (_a150 = class extends P {
}, __name(_a150, "AreInterpreterError"), _a150);
var _a151;
var AreLifecycleError = (_a151 = class extends P {
}, __name(_a151, "AreLifecycleError"), _a151);
AreLifecycleError.InvalidLifecycleMethod = "Invalid lifecycle method. Lifecycle method must be one of the following: onBeforeLoad, onLoad, onUpdate, onDestroy.";
var _a152;
var AreLoaderError = (_a152 = class extends P {
}, __name(_a152, "AreLoaderError"), _a152);
AreLoaderError.SyntaxError = "Are Loader Syntax Error";
AreLoaderError.EmptyTemplateError = "Are Loader Empty Template Error";
var _a153;
var AreRoute = (_a153 = class extends AreSignal {
  constructor(path) {
    super({
      data: new A_Route(path)
    });
  }
  get route() {
    return this.data;
  }
  static default() {
    return new _a153(document.location.pathname || "/");
  }
  compare(other) {
    return this.route.toRegExp().test(other.data.toString());
  }
}, __name(_a153, "_AreRoute"), _a153);

// src/lib/AreHTMLAttribute/AreHTML.attribute.ts
var AreHTMLAttribute = class extends AreAttribute {
  get owner() {
    return this.scope.issuer();
  }
};
__name(AreHTMLAttribute, "AreHTMLAttribute");
AreHTMLAttribute = __decorateClass([
  A3.Define({
    namespace: "a-are-html",
    description: "Base class for all typed HTML attributes in the ARE framework. Provides typed access to the owning AreHTMLNode via the scope injector so that attribute subclasses can inspect host-node properties and resolve store bindings during transformation, compilation, and lifecycle phases."
  })
], AreHTMLAttribute);

// src/attributes/AreBinding.attribute.ts
var AreBindingAttribute = class extends AreHTMLAttribute {
  // get value(): string {
  //     const [firstPart, ...pathPart] = this.content.split('.');
  //     const primaryObject = this.owner.store.get(firstPart);
  //     return AreCommonHelper.extractPropertyByPath(primaryObject, pathPart.join('.')) as string;
  // }
};
__name(AreBindingAttribute, "AreBindingAttribute");
AreBindingAttribute = __decorateClass([
  A3.Define({
    namespace: "a-are-html",
    description: "Attribute type for two-way value bindings (: prefix). Marks that the attribute value should be resolved dynamically from the node store rather than used verbatim, enabling reactive updates whenever the underlying store value changes during a rendering cycle."
  })
], AreBindingAttribute);

// src/attributes/AreDirective.attribute.ts
var AreDirectiveAttribute = class extends AreHTMLAttribute {
  /**
   * Returns a custom directive component associated with this attribute, if available.
   * 
   * The method uses the attribute's name to resolve the corresponding directive component from the scope. It constructs the expected directive name by converting the attribute name to PascalCase and prefixing it with "AreDirective". If a matching directive component is found in the scope, it is returned; otherwise, the method returns undefined.
   */
  get component() {
    const component = this.scope.resolve(`AreDirective${y.toPascalCase(this.name)}`);
    return component;
  }
};
__name(AreDirectiveAttribute, "AreDirectiveAttribute");
AreDirectiveAttribute = __decorateClass([
  A3.Define({
    namespace: "a-are-html",
    description: "Attribute type for directive invocations ($ prefix). Carries the resolved directive component class and a cloned template node. The associated directive uses these during its Compile phase to emit conditional or repeated instruction groups and to manage per-item or per-condition subscopes."
  })
], AreDirectiveAttribute);

// src/attributes/AreEvent.attribute.ts
var AreEventAttribute = class extends AreHTMLAttribute {
};
__name(AreEventAttribute, "AreEventAttribute");
AreEventAttribute = __decorateClass([
  A3.Define({
    namespace: "a-are-html",
    description: "Attribute type for DOM event listeners (@ prefix). Marks the attribute as an event binding \u2014 the compiler emits an AddListener instruction that attaches a handler expression resolved from the store to the specified event name on the host element."
  })
], AreEventAttribute);

// src/attributes/AreStatic.attribute.ts
var AreStaticAttribute = class extends AreHTMLAttribute {
};
__name(AreStaticAttribute, "AreStaticAttribute");
AreStaticAttribute = __decorateClass([
  A3.Define({
    namespace: "a-are-html",
    description: "Attribute type for plain static HTML attributes with no dynamic prefix. Its value is emitted verbatim via an AddAttribute instruction at compile time and does not participate in reactive update cycles."
  })
], AreStaticAttribute);

// src/lib/AreDirective/AreDirective.meta.ts
var _AreDirectiveMeta = class _AreDirectiveMeta extends j {
  constructor() {
    super(...arguments);
    this.priority = 0;
  }
};
__name(_AreDirectiveMeta, "AreDirectiveMeta");
var AreDirectiveMeta = _AreDirectiveMeta;

// src/lib/AreDirective/AreDirective.constants.ts
var AreDirectiveFeatures = {
  /**
   * Feature that should transform the tree based on the directive attribute. This method is called during the transformation phase of the ARE component and should perform any necessary transformations on the AreNode tree based on the directive's content and context. This can include tasks such as adding or removing nodes, modifying node properties, or restructuring the tree to ensure that the directive is applied correctly during rendering.
   */
  Transform: "_AreDirective_Transform",
  /**
   * Feature that should convert a directiveAttribute definition into a set of SceneInstructions to be rendered correctly
   */
  Compile: "_AreDirective_Compile",
  /**
   * Feature that should update the directiveAttribute based on the changes in the store or other dependencies. 
   */
  Update: "_AreDirective_Update"
};

// src/lib/AreDirective/AreDirective.component.ts
var AreDirective = class extends F {
  //==================================================================================
  //======================== LIFECYCLE DECORATORS ====================================
  //==================================================================================
  /**
   * Allows to define a compilation order for directives, which is necessary when we have multiple directives on the same node and we want to control the order of their compilation and application. The directive with the highest priority will be compiled and applied first, and the directive with the lowest priority will be compiled and applied last. This is important because some directives may depend on the output of other directives, so we need to ensure that they are compiled and applied in the correct order to avoid errors and ensure the expected behavior.
   * 
   * @param priority 
   * @returns 
   */
  static Priority(priority) {
    return function(target) {
      const meta = c.meta(target);
      meta.priority = priority;
      return target;
    };
  }
  /**
   * Allows to define a custom method for transforming the AreNode tree based on the directive attribute. This method is called during the transformation phase of the ARE component and should perform any necessary transformations on the AreNode tree based on the directive's content and context. This can include tasks such as adding or removing nodes, modifying node properties, or restructuring the tree to ensure that the directive is applied correctly during rendering.
   */
  static get Transform() {
    return (target, propertyKey, descriptor) => {
      return x.Extend({
        name: AreDirectiveFeatures.Transform,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  /**
   * Allows to define a custom method for compiling a directive attribute into a set of SceneInstructions. 
   * Can be used at any component to extend this logic not only for a AreDirective inherited.
   */
  static get Compile() {
    return (target, propertyKey, descriptor) => {
      return x.Extend({
        name: AreDirectiveFeatures.Compile,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  /**
   * Allows to define a custom method for updating a directive attribute based on changes in the store or other dependencies.
   * Can be used at any component to extend this logic not only for a AreDirective inherited.
   */
  static get Update() {
    return (target, propertyKey, descriptor) => {
      return x.Extend({
        name: AreDirectiveFeatures.Update,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  /**
   * Default transform method for directives, which can be overridden by specific directive implementations. This method is called during the transformation phase of the ARE component and should perform any necessary transformations on the AreNode tree based on the directive's content and context. This can include tasks such as adding or removing nodes, modifying node properties, or restructuring the tree to ensure that the directive is applied correctly during rendering.
   * 
   * @param attribute - The directive attribute to transform, which contains all the information about the directive as defined in the template (e.g. name, raw content, evaluated value, etc.)
   * @param args - Additional arguments that may be required for the transformation process.
   */
  transform(attribute, ...args) {
    const logger = c.scope(this).resolve(A_Logger);
    if (logger) {
      logger.warning(`No transforming logic defined for directive: ${attribute.name} with content: ${attribute.content}`);
    }
  }
  compile(attribute, ...args) {
    const logger = c.scope(this).resolve(A_Logger);
    if (logger) {
      logger.warning(`No compiling logic defined for directive: ${attribute.name} with content: ${attribute.content}`);
    }
  }
  update(attribute, ...args) {
    const logger = c.scope(this).resolve(A_Logger);
    if (logger) {
      logger.warning(`No update logic defined for directive: ${attribute.name} with content: ${attribute.content}`);
    }
  }
};
__name(AreDirective, "AreDirective");
__decorateClass([
  __decorateParam(0, ke(H))
], AreDirective.prototype, "transform", 1);
__decorateClass([
  x.Extend({
    name: AreDirectiveFeatures.Compile,
    scope: [AreDirective]
  }),
  __decorateParam(0, ke(H))
], AreDirective.prototype, "compile", 1);
__decorateClass([
  x.Extend({
    name: AreDirectiveFeatures.Update,
    scope: [AreDirective]
  }),
  __decorateParam(0, ke(H))
], AreDirective.prototype, "update", 1);
AreDirective = __decorateClass([
  A3.Define({
    namespace: "a-are-html",
    description: "Abstract base component for all ARE directive types. Provides lifecycle decorators (Transform, Compile, Apply, Revert, Priority) that subclasses hook into at each pipeline stage. Subclasses implement Transform to rewrite the attribute or template node, Compile to emit scene instructions, Apply to activate them in the DOM, and Revert to undo them on removal."
  }),
  m.Define(AreDirectiveMeta)
], AreDirective);

// src/instructions/AreHTML.instructions.constants.ts
var AreHTMLInstructions = {
  AddElement: "_AreHTML_AddElement",
  AddText: "_AreHTML_AddText",
  AddAttribute: "_AreHTML_AddAttribute",
  AddStyle: "_AreHTML_AddStyle",
  AddListener: "_AreHTML_AddListener",
  AddInterpolation: "_AreHTML_AddInterpolation",
  AddComment: "_AreHTML_AddComment"
};

// src/instructions/AddComment.instruction.ts
var AddCommentInstruction = class extends AreDeclaration {
  get content() {
    return this.payload.content;
  }
  constructor(props) {
    if ("aseid" in props) {
      super(props);
    } else {
      super(AreHTMLInstructions.AddComment, props);
    }
  }
};
__name(AddCommentInstruction, "AddCommentInstruction");
AddCommentInstruction = __decorateClass([
  A3.Define({
    namespace: "a-are-html",
    description: "Appends a comment node to an element. Apply creates the comment node; revert removes it. Content can be a static string or a dynamic getter for interpolations."
  })
], AddCommentInstruction);

// src/lib/AreDirective/AreDirective.context.ts
var _AreDirectiveContext = class _AreDirectiveContext extends A_ExecutionContext {
  constructor(aseid) {
    super(aseid.toString());
    this.scope = {};
  }
};
__name(_AreDirectiveContext, "AreDirectiveContext");
var AreDirectiveContext = _AreDirectiveContext;

// src/directives/AreDirectiveFor.directive.ts
var AreDirectiveFor = class extends AreDirective {
  transform(attribute, scope, store, scene, logger, ...args) {
    logger.debug(`[Transform] directive $FOR for <${attribute.owner.aseid.toString()}>`);
    const node = attribute.owner;
    const forTemplate = node.cloneWithScope();
    const forAttr = forTemplate.attributes.find((d4) => d4.name === attribute.name);
    if (forAttr) {
      forTemplate.scope.deregister(forAttr);
      node.scope.register(forAttr);
    }
    node.init();
    attribute.template = forTemplate;
    const { key, index, arrayExpr } = this.parseExpression(attribute.content);
    const array = this.resolveArray(store, arrayExpr, attribute.content);
    attribute.value = array;
    for (let i4 = 0; i4 < array.length; i4++) {
      this.spawnItemNode(attribute.template, attribute.owner, key, index, array[i4], i4);
    }
  }
  compile(attribute, store, scene, ...args) {
    const hostInstruction = scene.host;
    const commentIdentifier = ` --- for: ${attribute.template.id} --- `;
    const declaration = new AddCommentInstruction({ content: commentIdentifier });
    scene.setHost(declaration);
    scene.planBefore(declaration, hostInstruction);
    scene.unPlan(hostInstruction);
  }
  update(attribute, store, scene, ...args) {
    const { key, index, arrayExpr, trackExpr } = this.parseExpression(attribute.content);
    const newArray = this.resolveArray(store, arrayExpr, attribute.content);
    const owner = attribute.owner;
    const currentChildren = [...owner.children];
    attribute.value = newArray;
    const computeKey = this.makeKeyFn(key, index, trackExpr);
    const childByKey = /* @__PURE__ */ new Map();
    const remaining = /* @__PURE__ */ new Set();
    for (let i4 = 0; i4 < currentChildren.length; i4++) {
      const child = currentChildren[i4];
      const ctx = child.scope.resolveFlat(AreDirectiveContext);
      const k4 = ctx ? computeKey(ctx.scope[key], ctx.scope[index || "index"]) : /* @__PURE__ */ Symbol("orphan");
      childByKey.set(k4, child);
      remaining.add(child);
    }
    const desired = [];
    const newOnes = [];
    for (let i4 = 0; i4 < newArray.length; i4++) {
      const item = newArray[i4];
      const k4 = computeKey(item, i4);
      const existing = childByKey.get(k4);
      if (existing) {
        remaining.delete(existing);
        let directiveContext = existing.scope.resolveFlat(AreDirectiveContext);
        if (!directiveContext) {
          directiveContext = new AreDirectiveContext(existing.aseid);
          existing.scope.register(directiveContext);
        }
        directiveContext.scope = {
          ...directiveContext.scope,
          [key]: item,
          [index || "index"]: i4
        };
        desired.push(existing);
      } else {
        const itemNode = this.spawnItemNode(attribute.template, owner, key, index, item, i4);
        desired.push(itemNode);
        newOnes.push(itemNode);
      }
    }
    for (const child of remaining) {
      child.unmount();
      owner.removeChild(child);
    }
    for (const child of newOnes) {
      child.transform();
      child.compile();
      child.mount();
    }
  }
  // ─────────────────────────────────────────────────────────────────────────────
  // ── Helpers ──────────────────────────────────────────────────────────────────
  // ─────────────────────────────────────────────────────────────────────────────
  /**
   * Build a key-function that derives a stable identity from each item.
   * If the user provided a `track <expr>` clause, evaluate it as a path on
   * the item; otherwise fall back to the item identity (reference equality).
   */
  makeKeyFn(key, index, trackExpr) {
    if (!trackExpr) {
      return (item, i4) => item ?? i4;
    }
    const path = trackExpr.startsWith(key + ".") ? trackExpr.slice(key.length + 1) : trackExpr;
    return (item, i4) => {
      if (item == null) return i4;
      if (path === key || path === "$index") return path === "$index" ? i4 : item;
      const parts = path.split(".");
      let v5 = item;
      for (const p3 of parts) {
        if (v5 == null) return i4;
        v5 = v5[p3];
      }
      return v5 ?? i4;
    };
  }
  /**
   * Parses the $for expression string into its constituent parts.
   *
   * Supported formats:
   *   item in items
   *   item, index in items
   *   (item, index) in items
   *   item in filter(items)
   *   item, index in filter(items, 'active')
   *   item in items track item.id
   *   (item, i) in items track item.id
   */
  parseExpression(content) {
    let trackExpr;
    const trackIdx = content.search(/\s+track\s+/);
    let body = content;
    if (trackIdx !== -1) {
      const m4 = content.slice(trackIdx).match(/\s+track\s+(.+)$/);
      if (m4) {
        trackExpr = m4[1].trim();
        body = content.slice(0, trackIdx).trim();
      }
    }
    const inIndex = body.lastIndexOf(" in ");
    const keyAndIndex = body.slice(0, inIndex).trim().replace(/^\(|\)$/g, "");
    const arrayExpr = body.slice(inIndex + 4).trim();
    const keyParts = keyAndIndex.split(",").map((p3) => p3.trim());
    return {
      key: keyParts[0],
      index: keyParts[1] || void 0,
      arrayExpr,
      trackExpr
    };
  }
  /**
   * Resolves the array expression against the store.
   * Supports both plain key lookups and function-call expressions:
   *   items          → store.get('items')
   *   filter(items)  → store.get('filter')(store.get('items'))
   */
  resolveArray(store, arrayExpr, fullContent) {
    let result;
    const callMatch = arrayExpr.match(/^([^(]+)\((.+)\)$/);
    if (callMatch) {
      const fnName = callMatch[1].trim();
      const fn = store.get(fnName);
      if (typeof fn !== "function")
        throw new AreCompilerError({
          title: 'Invalid "for" Directive Function',
          description: `The expression "${fnName}" in the "for" directive does not resolve to a function in the store. Received: ${typeof fn}`
        });
      const rawArgs = callMatch[2].split(",").map((a7) => a7.trim());
      const resolvedArgs = rawArgs.map((arg) => {
        if (arg.startsWith("'") && arg.endsWith("'")) return arg.slice(1, -1);
        if (arg.startsWith('"') && arg.endsWith('"')) return arg.slice(1, -1);
        if (!isNaN(Number(arg))) return Number(arg);
        const stripped = arg.replace(/\?$/, "");
        if (stripped.includes(".")) {
          const parts = stripped.split(".").map((p3) => p3.replace(/\?$/, ""));
          let val = store.get(parts[0]);
          for (let j3 = 1; j3 < parts.length; j3++) {
            if (val == null) return void 0;
            val = val[parts[j3]];
          }
          return val ?? void 0;
        }
        return store.get(stripped);
      });
      result = fn(...resolvedArgs);
    } else if (arrayExpr.includes(".")) {
      const parts = arrayExpr.split(".").map((p3) => p3.replace(/\?$/, ""));
      result = store.get(parts[0]);
      for (let i4 = 1; i4 < parts.length; i4++) {
        if (result == null) break;
        result = result[parts[i4]];
      }
    } else {
      result = store.get(arrayExpr.replace(/\?$/, ""));
    }
    if (result == null) return [];
    if (!Array.isArray(result))
      throw new AreCompilerError({
        title: 'Invalid "for" Directive Value',
        description: `The "for" directive expects an array but got ${typeof result}. Expression: "${fullContent}". Received: ${JSON.stringify(result)}`
      });
    return result;
  }
  /**
   * Creates a single item node from the template, registers it as a child of
   * the owner, initialises it, injects item-scoped store values, and activates
   * its scene so the mount/compile cycle will include it.
   *
   * NOTE: This method does NOT call compile() or mount() — the caller is
   * responsible for doing so when the main lifecycle cycle won't cover it
   * (i.e. during update, but not during the initial compile phase).
   */
  spawnItemNode(template, owner, key, index, item, i4) {
    const itemNode = template.clone();
    owner.addChild(itemNode);
    const queue = [itemNode];
    while (queue.length > 0) {
      const current = queue.shift();
      current.init();
      queue.push(...current.children);
    }
    let directiveContext = itemNode.scope.resolveFlat(AreDirectiveContext);
    if (!directiveContext) {
      directiveContext = new AreDirectiveContext(itemNode.aseid);
      itemNode.scope.register(directiveContext);
    }
    directiveContext.scope = {
      ...directiveContext.scope,
      [key]: item,
      [index || "index"]: i4
    };
    itemNode.scene.activate();
    return itemNode;
  }
};
__name(AreDirectiveFor, "AreDirectiveFor");
__decorateClass([
  AreDirective.Transform,
  __decorateParam(0, ke(H)),
  __decorateParam(1, ke(D)),
  __decorateParam(2, ke(AreStore)),
  __decorateParam(3, ke(AreScene)),
  __decorateParam(4, ke(A_Logger))
], AreDirectiveFor.prototype, "transform", 1);
__decorateClass([
  AreDirective.Compile,
  __decorateParam(0, ke(H)),
  __decorateParam(1, ke(AreStore)),
  __decorateParam(2, ke(AreScene))
], AreDirectiveFor.prototype, "compile", 1);
__decorateClass([
  AreDirective.Update,
  __decorateParam(0, ke(H)),
  __decorateParam(1, ke(AreStore)),
  __decorateParam(2, ke(AreScene))
], AreDirectiveFor.prototype, "update", 1);
AreDirectiveFor = __decorateClass([
  A3.Define({
    namespace: "a-are-html",
    description: "Built-in $for directive. Iterates over an array expression resolved from the store and renders a cloned template fragment per item, managing per-item subscopes and comment-node anchors. Supports keyed diffing via an optional track clause to minimise DOM mutations on collection updates."
  }),
  AreDirective.Priority(1)
], AreDirectiveFor);

// src/directives/AreDirectiveIf.directive.ts
var AreDirectiveIf = class extends AreDirective {
  transform(attribute, scope, store, scene, logger, ...args) {
    logger.debug(`[Transform] directive $IF for <${attribute.owner.aseid.toString()}>`);
    const node = attribute.owner;
    const ifTemplate = node.cloneWithScope();
    const ifAttr = ifTemplate.attributes.find((d4) => d4.name === attribute.name);
    if (ifAttr) {
      ifTemplate.scope.deregister(ifAttr);
      node.scope.register(ifAttr);
    }
    node.init();
    node.addChild(ifTemplate);
    ifTemplate.scene.deactivate();
    attribute.template = ifTemplate;
  }
  compile(attribute, store, scene, syntax, directiveContext, ...args) {
    attribute.value = syntax.evaluate(attribute.content, store, {
      ...directiveContext?.scope || {}
    });
    const hostInstruction = scene.host;
    const commentIdentifier = ` --- if: ${attribute.template.id} --- `;
    const declaration = new AddCommentInstruction({ content: commentIdentifier });
    scene.setHost(declaration);
    scene.planBefore(declaration, hostInstruction);
    scene.unPlan(hostInstruction);
    if (attribute.value)
      attribute.template.scene.activate();
    else
      attribute.template.scene.deactivate();
  }
  update(attribute, store, scope, syntax, scene, ...args) {
    const previous = !!attribute.value;
    const next = !!syntax.evaluate(attribute.content, store);
    attribute.value = next;
    if (previous === next) return;
    if (next) {
      attribute.template.scene.activate();
      attribute.template.mount();
    } else {
      attribute.template.unmount();
      attribute.template.scene.deactivate();
    }
  }
};
__name(AreDirectiveIf, "AreDirectiveIf");
__decorateClass([
  AreDirective.Transform,
  __decorateParam(0, ke(H)),
  __decorateParam(1, ke(D)),
  __decorateParam(2, ke(AreStore)),
  __decorateParam(3, ke(AreScene)),
  __decorateParam(4, ke(A_Logger))
], AreDirectiveIf.prototype, "transform", 1);
__decorateClass([
  AreDirective.Compile,
  __decorateParam(0, ke(H)),
  __decorateParam(1, ke(AreStore)),
  __decorateParam(2, ke(AreScene)),
  __decorateParam(3, ke(AreSyntax)),
  __decorateParam(4, ke(AreDirectiveContext))
], AreDirectiveIf.prototype, "compile", 1);
__decorateClass([
  AreDirective.Update,
  __decorateParam(0, ke(H)),
  __decorateParam(1, ke(AreStore)),
  __decorateParam(2, ke(D)),
  __decorateParam(3, ke(AreSyntax)),
  __decorateParam(4, ke(AreScene))
], AreDirectiveIf.prototype, "update", 1);
AreDirectiveIf = __decorateClass([
  A3.Define({
    namespace: "a-are-html",
    description: "Built-in $if directive. Conditionally renders a subtree based on a store expression. Replaces the target element with a stable comment anchor when the condition is false and restores the fully rendered subtree when it becomes true, preventing any leaking of the host element between states."
  }),
  AreDirective.Priority(2)
], AreDirectiveIf);

// src/instructions/AddAttribute.instruction.ts
var AddAttributeInstruction = class extends AreMutation {
  constructor(parent, props) {
    if ("aseid" in props) {
      super(props);
    } else {
      super(AreHTMLInstructions.AddAttribute, parent, props);
    }
  }
};
__name(AddAttributeInstruction, "AddAttributeInstruction");
AddAttributeInstruction = __decorateClass([
  A3.Define({
    namespace: "a-are-html",
    description: "Sets an attribute on an HTML element. Apply calls setAttribute; revert calls removeAttribute."
  })
], AddAttributeInstruction);

// src/instructions/AddListener.instruction.ts
var AddListenerInstruction = class extends AreMutation {
  constructor(parent, props) {
    if ("aseid" in props) {
      super(props);
    } else {
      super(AreHTMLInstructions.AddListener, parent, props);
    }
  }
};
__name(AddListenerInstruction, "AddListenerInstruction");
AddListenerInstruction = __decorateClass([
  A3.Define({
    namespace: "a-are-html",
    description: "Attaches a DOM event listener to an element. Apply calls addEventListener; revert calls removeEventListener."
  })
], AddListenerInstruction);

// src/instructions/AddStyle.instruction.ts
var AddStyleInstruction = class extends AreMutation {
  constructor(parent, props) {
    if ("aseid" in props) {
      super(props);
    } else {
      super(AreHTMLInstructions.AddStyle, parent, props);
    }
  }
};
__name(AddStyleInstruction, "AddStyleInstruction");
AddStyleInstruction = __decorateClass([
  A3.Define({
    namespace: "a-are-html",
    description: "Sets an inline CSS style property on an element. Apply sets the property; revert removes it."
  })
], AddStyleInstruction);

// src/instructions/AddText.instruction.ts
var AddTextInstruction = class extends AreDeclaration {
  constructor(props) {
    if ("aseid" in props) {
      super(props);
    } else {
      super(AreHTMLInstructions.AddText, props);
    }
  }
};
__name(AddTextInstruction, "AddTextInstruction");
AddTextInstruction = __decorateClass([
  A3.Define({
    namespace: "a-are-html",
    description: "Appends a text node to an element. Apply creates the text node; revert removes it. Content can be a static string or a dynamic getter for interpolations."
  })
], AddTextInstruction);

// src/lib/AreStyle/AreStyle.context.ts
var AreStyle = class extends V {
  constructor(styles, aseid) {
    super({
      name: aseid ? aseid.toString() : "default-style"
    });
    this.styles = styles;
  }
};
__name(AreStyle, "AreStyle");
AreStyle = __decorateClass([
  A3.Define({
    namespace: "a-are-html",
    description: "Context fragment that holds the resolved CSS style rules string for a component scope. Populated during lifecycle initialisation and read by the compiler when emitting AddStyle instructions for inline styles declared on the component host element."
  })
], AreStyle);

// src/lib/AreHTMLNode/AreHTMLNode.ts
var AreHTMLNode = class extends AreNode {
  /**
   * Actual node type. 
   * By default it's a tag name
   */
  get tag() {
    return this.aseid.entity;
  }
  /**
    * The static attributes defined for the node, which are typically used to represent static properties or characteristics of the node that do not change based on the context or state. These attributes are usually defined in the template and are not reactive.
    * 
    * Example: For a node defined as `<div class="static-class">`, the static attribute would be `class="static-class"`.
    */
  get staticAttributes() {
    return this.scope.resolveFlatAll(AreStaticAttribute);
  }
  /**
   * The binding attributes defined for the node, which are typically used to represent dynamic properties or characteristics of the node that can change based on the context or state. These attributes are usually defined in the template with a specific syntax (e.g., `:prop="value"` or `v-bind:prop="value"`) and are reactive, meaning that they will update automatically when the underlying data changes.
   * 
   * Example: For a node defined as `<div :class="dynamicClass">`, the binding attribute would be `:class="dynamicClass"`.
   */
  get bindings() {
    return this.scope.resolveFlatAll(AreBindingAttribute);
  }
  /**
   * The directive attributes defined for the node, which are typically used to represent special instructions or behaviors that should be applied to the node. These attributes are usually defined in the template with a specific syntax (e.g., `v-if="condition"` or `v-for="item in list"`) and are processed by the rendering engine to apply the corresponding logic or behavior to the node.
   * 
   * Example: For a node defined as `<div v-if="isVisible">`, the directive attribute would be `v-if="isVisible"`.
   */
  get directives() {
    const directives = this.scope.resolveFlatAll(AreDirectiveAttribute);
    return directives.filter((d4) => d4.component).sort((a7, b2) => {
      const aMeta = c.meta(a7.component);
      const bMeta = c.meta(b2.component);
      const aPriority = aMeta.priority ?? 0;
      const bPriority = bMeta.priority ?? 0;
      return bPriority - aPriority;
    });
  }
  /**
   * The event attributes defined for the node, which are typically used to represent event listeners or handlers that should be attached to the node. These attributes are usually defined in the template with a specific syntax (e.g., `@click="handleClick"` or `v-on:click="handleClick"`) and are processed by the rendering engine to attach the corresponding event listeners to the node.
   * 
   * Example: For a node defined as `<button @click="handleClick">`, the event attribute would be `@click="handleClick"`.
   */
  get events() {
    return this.scope.resolveFlatAll(AreEventAttribute);
  }
  /**
   * The styles defined for the node, which can include inline styles or styles defined in a separate stylesheet that are applied to the node. These styles can be used to control the visual appearance of the node and can be defined using standard CSS syntax.
   */
  get styles() {
    return this.scope.resolveFlat(AreStyle);
  }
  /**
   * Registers or updates the component-scoped CSS string for this node.
   * Called by the @Are.Styles-decorated method on the associated component.
   * A new AreStyle fragment is registered in scope on first call; subsequent
   * calls update the existing fragment in-place.
   */
  setStyles(css) {
    const existing = this.scope.resolveFlat(AreStyle);
    if (existing) {
      existing.styles = css;
    } else {
      this.scope.register(new AreStyle(css, this.aseid.toString()));
    }
  }
};
__name(AreHTMLNode, "AreHTMLNode");
AreHTMLNode = __decorateClass([
  A3.Define({
    namespace: "a-are-html",
    description: "AreHTMLNode represents a node in the HTML structure. It extends the base AreNode and includes properties and methods specific to HTML nodes, such as handling attributes, directives, events, and styles."
  })
], AreHTMLNode);

// src/nodes/AreComment.ts
var AreComment = class extends AreHTMLNode {
  fromNew(newEntity) {
    super.fromNew({
      ...newEntity,
      payload: {
        ...newEntity.payload || {},
        entity: "are-comment"
      }
    });
  }
};
__name(AreComment, "AreComment");
AreComment = __decorateClass([
  A3.Define({
    namespace: "a-are-html",
    description: "Node type representing a comment node in the AreHTMLNode tree. Used as a stable DOM anchor by structural directives such as $if and $for that swap rendered content in and out, ensuring the parent container always has a consistent insertion point."
  })
], AreComment);

// src/nodes/AreComponent.ts
var AreComponentNode = class extends AreHTMLNode {
  /**
   * A custom component associated with this node, which can be used to provide custom logic and behavior for the node. This component is typically defined in the context and can be resolved based on the node's type or other identifying information. The component can include its own template, markup, styles, and features that are specific to the functionality it provides.
   * 
   * Example: If the node type is "custom-component", the corresponding component would be resolved from the context and can be used to provide custom rendering and behavior for nodes of that type.
   * 
   * [!] Note: The component is optional and may not be defined for all nodes. If no component is associated with the node, it will be treated as a standard HTML element or a basic node without custom logic.
   */
  get component() {
    return this.scope.resolve(y.toPascalCase(this.aseid.entity));
  }
};
__name(AreComponentNode, "AreComponentNode");
AreComponentNode = __decorateClass([
  A3.Define({
    namespace: "a-are-html",
    description: "AreComponentNode represents a node in the scene graph that corresponds to a component. It extends the base AreNode and includes additional properties and methods specific to component nodes, such as handling attributes, bindings, directives, events, styles, and interpolations associated with the component."
  })
], AreComponentNode);

// src/nodes/AreInterpolation.ts
var AreInterpolation = class extends AreHTMLNode {
  fromNew(newEntity) {
    super.fromNew({
      ...newEntity,
      payload: {
        ...newEntity.payload || {},
        entity: "are-interpolation"
      }
    });
  }
};
__name(AreInterpolation, "AreInterpolation");
AreInterpolation = __decorateClass([
  A3.Define({
    namespace: "a-are-html",
    description: "Node type representing a reactive inline expression in the AreHTMLNode tree. Its content expression is resolved from the store at render time and kept live via an AddInterpolation instruction that updates the corresponding text node on each reactive cycle."
  })
], AreInterpolation);

// src/nodes/AreRoot.ts
var AreRootNode = class extends AreHTMLNode {
  /**
   * For the root node, we can default to a generic container element like <div> since it serves as the root of the component tree and does not correspond to a specific HTML tag defined in the markup. The actual content and structure of the root node will be determined by the child nodes and components that are rendered within it, allowing for flexibility in how the root node is used and what it contains.
   */
  get tag() {
    return "div";
  }
  /**
   * A custom component associated with this node, which can be used to provide custom logic and behavior for the node. This component is typically defined in the context and can be resolved based on the node's type or other identifying information. The component can include its own template, markup, styles, and features that are specific to the functionality it provides.
   * 
   * Example: If the node type is "custom-component", the corresponding component would be resolved from the context and can be used to provide custom rendering and behavior for nodes of that type.
   * 
   * [!] Note: The component is optional and may not be defined for all nodes. If no component is associated with the node, it will be treated as a standard HTML element or a basic node without custom logic.
   */
  get component() {
    return this.scope.resolve(y.toPascalCase(this.aseid.entity));
  }
};
__name(AreRootNode, "AreRootNode");
AreRootNode = __decorateClass([
  A3.Define({
    namespace: "a-are-html",
    description: "AreRootNode represents the root node in the scene graph. It extends the base AreHTMLNode and includes additional properties and methods specific to the root node, such as handling the root element and its associated component."
  })
], AreRootNode);

// src/nodes/AreText.ts
var AreText = class extends AreHTMLNode {
  fromNew(newEntity) {
    super.fromNew({
      ...newEntity,
      payload: {
        ...newEntity.payload || {},
        entity: "are-text"
      }
    });
  }
};
__name(AreText, "AreText");
AreText = __decorateClass([
  A3.Define({
    namespace: "a-are-html",
    description: "Node type representing a plain or partially-dynamic text segment in the AreHTMLNode tree. Emits an AddText instruction that sets or updates the corresponding DOM text node; the content may carry a store getter for any dynamic portion."
  })
], AreText);

// src/engine/AreHTML.constants.ts
var SVG_NAMESPACE = "http://www.w3.org/2000/svg";
var SVG_ATTRIBUTE_NS = {
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
var VOID_ELEMENTS = /* @__PURE__ */ new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
]);
function isVoidElement(tagName) {
  return VOID_ELEMENTS.has(tagName.toLowerCase());
}
__name(isVoidElement, "isVoidElement");
var BOOLEAN_ATTRIBUTES = /* @__PURE__ */ new Set([
  "allowfullscreen",
  "async",
  "autofocus",
  "autoplay",
  "checked",
  "controls",
  "default",
  "defer",
  "disabled",
  "formnovalidate",
  "hidden",
  "inert",
  "ismap",
  "itemscope",
  "loop",
  "multiple",
  "muted",
  "nomodule",
  "novalidate",
  "open",
  "playsinline",
  "readonly",
  "required",
  "reversed",
  "selected"
]);
function isBooleanAttribute(name) {
  return BOOLEAN_ATTRIBUTES.has(name.toLowerCase());
}
__name(isBooleanAttribute, "isBooleanAttribute");
var IDL_FORM_PROPERTIES = {
  INPUT: /* @__PURE__ */ new Set(["value", "checked", "indeterminate"]),
  TEXTAREA: /* @__PURE__ */ new Set(["value"]),
  SELECT: /* @__PURE__ */ new Set(["value"]),
  OPTION: /* @__PURE__ */ new Set(["selected"])
};
function isIDLFormProperty(tagName, attrName) {
  const set = IDL_FORM_PROPERTIES[tagName.toUpperCase()];
  return !!set && set.has(attrName);
}
__name(isIDLFormProperty, "isIDLFormProperty");
function normalizeClassValue(value) {
  if (value === null || value === void 0 || value === false) return "";
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  if (Array.isArray(value)) {
    return value.map(normalizeClassValue).filter(Boolean).join(" ");
  }
  if (typeof value === "object") {
    const parts = [];
    for (const key of Object.keys(value)) {
      if (value[key]) parts.push(key);
    }
    return parts.join(" ");
  }
  return "";
}
__name(normalizeClassValue, "normalizeClassValue");
function normalizeStyleValue(value) {
  if (value === null || value === void 0 || value === false) return "";
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  if (Array.isArray(value)) {
    return value.map(normalizeStyleValue).filter(Boolean).join("; ");
  }
  if (typeof value === "object") {
    const parts = [];
    for (const key of Object.keys(value)) {
      const v5 = value[key];
      if (v5 === null || v5 === void 0 || v5 === false) continue;
      const kebab = key.replace(/[A-Z]/g, (m4) => "-" + m4.toLowerCase());
      parts.push(`${kebab}: ${v5}`);
    }
    return parts.join("; ");
  }
  return "";
}
__name(normalizeStyleValue, "normalizeStyleValue");
function parseEventName(raw) {
  const [event, ...modifiers] = raw.split(".");
  return { event, modifiers: new Set(modifiers) };
}
__name(parseEventName, "parseEventName");
function toDOMString(value) {
  if (value === null || value === void 0) return "";
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  try {
    return JSON.stringify(value);
  } catch {
    return "";
  }
}
__name(toDOMString, "toDOMString");

// src/engine/AreHTML.context.ts
var AreHTMLEngineContext = class extends AreContext {
  constructor(props) {
    super(props.container?.body.innerHTML || props.source || "");
    /**
     * Index structure mapping:
     * 
     *        Node                ->       Group ID        ->  Element
     * -----------------------------------------------------------------------------------
     *  | - Attribute             |   group: string       |   Node
     *  | - Directive (e.g. for)  |                       |   Node
     */
    this.index = {
      /**
       * 1 AreNode = 1 Dom Node
       * 
       * uses ASEID
       */
      nodeToHostElements: /* @__PURE__ */ new Map(),
      /**
       * 1 Group Instruction = MANY Dom Nodes (e.g. for loop)
       * 
       * uses ASEID
       */
      groupToElements: /* @__PURE__ */ new Map(),
      /**
       * 1 Dom Node = 1 Instruction 
       * 
       * uses ASEID
       */
      elementToInstruction: /* @__PURE__ */ new WeakMap(),
      /**
       * 1 Instruction = 1 Dom Node (for CreateElement instructions, for example)
       * 
       * uses ASEID
       */
      instructionToElement: /* @__PURE__ */ new Map(),
      /**
       * Event listeners attached to elements, used for proper cleanup when reverting instructions. Maps a DOM element to a map of event names and their corresponding listeners, allowing the engine to track which listeners are attached to which elements and remove them when necessary (e.g., when an instruction is reverted).
       */
      elementListeners: /* @__PURE__ */ new WeakMap()
    };
    this._container = props.container;
  }
  get container() {
    return this._container;
  }
  getNodeElement(node) {
    if (typeof node === "string") {
      return this.index.nodeToHostElements.get(node);
    } else {
      return this.index.nodeToHostElements.get(node.aseid.toString());
    }
  }
  /**
   * Associates a DOM element with a given instruction and its owner node. This method updates the context's index to map the instruction's ASEID to the provided DOM element, and also maps the element back to the instruction's ASEID for reverse lookup. If the instruction has an owner node, it also maps the node's ASEID to the element. Additionally, if the instruction belongs to a group, it adds the element to the set of elements associated with that group. This indexing allows the engine to efficiently manage and update DOM elements based on instructions and their corresponding nodes, enabling dynamic rendering and interaction in response to application state changes.
   * 
   * @param instruction 
   * @param element 
   */
  setInstructionElement(instruction, element) {
    const node = instruction.owner;
    this.index.instructionToElement.set(instruction.aseid.toString(), element);
    this.index.elementToInstruction.set(element, instruction.aseid.toString());
    if (node && instruction instanceof AreDeclaration) {
      this.index.nodeToHostElements.set(node.aseid.toString(), element);
    }
    if (instruction.group) {
      const groupId = instruction.group;
      if (!this.index.groupToElements.has(groupId)) {
        this.index.groupToElements.set(groupId, /* @__PURE__ */ new Set());
      }
      this.index.groupToElements.get(groupId).add(element);
    }
  }
  getElementByInstruction(instruction) {
    if (typeof instruction === "string") {
      return this.index.instructionToElement.get(instruction);
    } else {
      return this.index.instructionToElement.get(instruction.aseid.toString());
    }
  }
  /**
   * Removes the association between a given instruction and its corresponding DOM element. This method looks up the instruction's ASEID to find the associated DOM element, and if found, it deletes the mapping from both instructionToElement and elementToInstruction. If the instruction has an owner node, it also removes the mapping from nodeToHostElements. Additionally, if the instruction belongs to a group, it removes the element from the set of elements associated with that group, and if the group has no more elements, it deletes the group from the index. This cleanup is essential for maintaining an accurate and efficient mapping of instructions to DOM elements, especially when instructions are reverted or when nodes are removed from the DOM.
   * 
   * @param instruction 
   */
  removeInstructionElement(instruction) {
    const element = this.index.instructionToElement.get(instruction.aseid.toString());
    if (element) {
      this.index.instructionToElement.delete(instruction.aseid.toString());
      this.index.elementToInstruction.delete(element);
      const node = instruction.owner;
      if (node && instruction instanceof AreDeclaration) {
        this.index.nodeToHostElements.delete(node.aseid.toString());
      }
      if (instruction.group) {
        const groupId = instruction.group;
        const groupElements = this.index.groupToElements.get(groupId);
        if (groupElements) {
          groupElements.delete(element);
          if (groupElements.size === 0) {
            this.index.groupToElements.delete(groupId);
          }
        }
      }
    }
  }
  getElementsByGroup(instruction) {
    if (typeof instruction === "string") {
      return this.index.groupToElements.get(instruction);
    } else {
      return this.index.groupToElements.get(instruction.aseid.toString());
    }
  }
  /**
   * Adds an event listener to a specific DOM element and keeps track of it in the context's index for proper cleanup later. This method takes a DOM element, an event name, and a listener function or object, and stores this information in the elementListeners map. This allows the engine to efficiently manage event listeners attached to dynamically created elements, ensuring that they can be removed when the associated instructions are reverted or when nodes are removed from the DOM, preventing memory leaks and unintended behavior.
   * 
   * @param element 
   * @param eventName 
   * @param listener 
   */
  addListener(element, eventName, listener) {
    if (!this.index.elementListeners.has(element)) {
      this.index.elementListeners.set(element, /* @__PURE__ */ new Map());
    }
    const byEvent = this.index.elementListeners.get(element);
    if (!byEvent.has(eventName)) {
      byEvent.set(eventName, /* @__PURE__ */ new Set());
    }
    byEvent.get(eventName).add(listener);
  }
  /**
   * Retrieves the event listener associated with a specific DOM element and event name from the context's index. This method looks up the element in the elementListeners map and then retrieves the listener for the specified event name. If no listener is found for the given element and event, it returns undefined. This allows the engine to efficiently access and manage event listeners that have been attached to dynamically created elements, enabling proper cleanup when instructions are reverted or when nodes are removed from the DOM.
   * 
   * @param element 
   * @param eventName 
   * @returns 
   */
  getListener(element, eventName) {
    const set = this.index.elementListeners.get(element)?.get(eventName);
    if (!set || set.size === 0) return void 0;
    return set.values().next().value;
  }
  /**
   * Returns all listeners registered for a given element + event name.
   */
  getListeners(element, eventName) {
    return this.index.elementListeners.get(element)?.get(eventName);
  }
  /**
   * Removes an event listener from a specific DOM element and updates the context's index accordingly. This method looks up the element in the elementListeners map and deletes the listener for the specified event name. This is typically called when an instruction is reverted or when a node is removed from the DOM, ensuring that any attached event listeners are properly cleaned up to prevent memory leaks and unintended behavior.
   * 
   * @param element 
   * @param eventName 
   */
  removeListener(element, eventName, listener) {
    const byEvent = this.index.elementListeners.get(element);
    if (!byEvent) return;
    if (listener) {
      const set = byEvent.get(eventName);
      if (set) {
        set.delete(listener);
        if (set.size === 0) byEvent.delete(eventName);
      }
    } else {
      byEvent.delete(eventName);
    }
  }
};
__name(AreHTMLEngineContext, "AreHTMLEngineContext");
AreHTMLEngineContext = __decorateClass([
  A3.Define({
    namespace: "a-are-html",
    description: "Runtime index for the HTML rendering engine. Maps each AreNode and instruction ASEID to its corresponding DOM element so that apply and revert handlers on interpreter instructions can look up their DOM node in O(1). Tracks root-element mounts and maintains the group-level index used by structural directives."
  })
], AreHTMLEngineContext);

// src/engine/AreHTML.compiler.ts
var AreHTMLCompiler = class extends AreCompiler {
  compileHTMLNode(node, scene, logger, ...args) {
    super.compile(node, scene, logger, ...args);
    if (node.styles?.styles) {
      const host = scene.host;
      if (host) {
        scene.plan(new AddStyleInstruction(host, { styles: node.styles.styles }));
      }
    }
  }
  compileInterpolation(interpolation, scene, store, logger, ...args) {
    scene.plan(new AddTextInstruction({ content: interpolation.content, evaluate: true }));
  }
  compileText(text, scene, logger, ...args) {
    logger?.debug("cyan", `AreHTMLCompiler: compile text node <${text.aseid.toString()}> with content: "${text.content}"`);
    if (scene.host)
      scene.unPlan(scene.host);
    scene.plan(new AddTextInstruction({ content: text.content }));
  }
  compileStaticAttribute(attribute, scene, ...args) {
    if (!scene.host)
      throw new AreCompilerError({
        title: "Scene Host Not Found",
        description: `No host found for the scene with id: ${scene.id}. Please ensure that the scene is properly initialized and has a host before compiling binding attributes.`
      });
    const content = attribute.content;
    if (content.includes("{{")) {
      const transformed = '"' + content.replace(/\{\{([^}]+)\}\}/g, '"+($1)+"') + '"';
      scene.plan(new AddAttributeInstruction(scene.host, {
        name: attribute.name,
        content: transformed,
        evaluate: true
      }));
      return;
    }
    scene.plan(new AddAttributeInstruction(scene.host, {
      name: attribute.name,
      content: attribute.content
    }));
  }
  compileDirectiveAttribute(directive, store, feature, logger, ...args) {
    store.watch(directive);
    if (directive.component) {
      feature.chain(directive.component, AreDirectiveFeatures.Compile, directive.owner.scope);
    } else {
      logger?.warning(`Directive handler component not found for directive: ${directive.name}. Make sure to create a component named "AreDirective${y.toPascalCase(directive.name)}" to handle this directive.`);
    }
    store.unwatch(directive);
  }
  compileEventAttribute(attribute, scene, ...args) {
    if (!scene.host)
      throw new AreCompilerError({
        title: "Scene Host Not Found",
        description: `No host found for the scene with id: ${scene.id}. Please ensure that the scene is properly initialized and has a host before compiling binding attributes.`
      });
    scene.plan(new AddListenerInstruction(scene.host, {
      name: attribute.name,
      handler: attribute.content
    }));
  }
  compileBindingAttribute(attribute, scene, parentStore, store, syntax, ...args) {
    if (!scene.host)
      throw new AreCompilerError({
        title: "Scene Host Not Found",
        description: `No host found for the scene with id: ${scene.id}. Please ensure that the scene is properly initialized and has a host before compiling binding attributes.`
      });
    const node = attribute.owner;
    const props = node.component?.props;
    let propName;
    if (props) {
      if (props[attribute.name]) {
        propName = attribute.name;
      } else {
        const camel = y.toCamelCase(attribute.name);
        if (props[camel]) propName = camel;
      }
    }
    if (propName && props) {
      const propDefinition = props[propName];
      const coerce = /* @__PURE__ */ __name((raw) => {
        let value = raw;
        if (propDefinition.type) {
          switch (propDefinition.type) {
            case "string":
              value = value === void 0 || value === null ? "" : String(value);
              break;
            case "number":
              value = Number(value);
              break;
            case "boolean":
              value = Boolean(value);
              break;
          }
        }
        return value;
      }, "coerce");
      const watcher = {
        update: /* @__PURE__ */ __name(() => {
          try {
            parentStore.watch(watcher);
            const next = coerce(syntax.evaluate(attribute.content, parentStore));
            parentStore.unwatch(watcher);
            store.set(propName, next);
          } catch (e) {
            parentStore.unwatch(watcher);
          }
        }, "update")
      };
      parentStore.watch(watcher);
      const initial = coerce(syntax.evaluate(attribute.content, parentStore));
      parentStore.unwatch(watcher);
      store.set(propName, initial);
      return;
    }
    const instruction = new AddAttributeInstruction(scene.host, {
      name: attribute.name,
      content: attribute.content,
      evaluate: true
    });
    scene.plan(instruction);
  }
};
__name(AreHTMLCompiler, "AreHTMLCompiler");
__decorateClass([
  AreCompiler.Compile(AreHTMLNode),
  __decorateParam(0, ke(H)),
  __decorateParam(1, ke(AreScene)),
  __decorateParam(2, ke(A_Logger))
], AreHTMLCompiler.prototype, "compileHTMLNode", 1);
__decorateClass([
  AreCompiler.Compile(AreInterpolation),
  __decorateParam(0, ke(H)),
  __decorateParam(1, ke(AreScene)),
  __decorateParam(2, ke(AreStore)),
  __decorateParam(3, ke(A_Logger))
], AreHTMLCompiler.prototype, "compileInterpolation", 1);
__decorateClass([
  AreCompiler.Compile(AreText),
  __decorateParam(0, ke(H)),
  __decorateParam(1, ke(AreScene)),
  __decorateParam(2, ke(A_Logger))
], AreHTMLCompiler.prototype, "compileText", 1);
__decorateClass([
  AreCompiler.Compile(AreStaticAttribute),
  __decorateParam(0, ke(H)),
  __decorateParam(1, ke(AreScene))
], AreHTMLCompiler.prototype, "compileStaticAttribute", 1);
__decorateClass([
  AreCompiler.Compile(AreDirectiveAttribute),
  __decorateParam(0, ke(H)),
  __decorateParam(1, ke(AreStore)),
  __decorateParam(2, ke(x)),
  __decorateParam(3, ke(A_Logger))
], AreHTMLCompiler.prototype, "compileDirectiveAttribute", 1);
__decorateClass([
  AreCompiler.Compile(AreEventAttribute),
  __decorateParam(0, ke(H)),
  __decorateParam(1, ke(AreScene))
], AreHTMLCompiler.prototype, "compileEventAttribute", 1);
__decorateClass([
  AreCompiler.Compile(AreBindingAttribute),
  __decorateParam(0, ke(H)),
  __decorateParam(1, ke(AreScene)),
  __decorateParam(2, v.Parent()),
  __decorateParam(2, ke(AreStore)),
  __decorateParam(3, ke(AreStore)),
  __decorateParam(4, ke(AreSyntax))
], AreHTMLCompiler.prototype, "compileBindingAttribute", 1);
AreHTMLCompiler = __decorateClass([
  A3.Define({
    namespace: "a-are-html",
    description: "HTML-specific compiler for A-Concept Rendering Engine (ARE) components, extending the base AreCompiler to handle HTML templates, styles, and rendering logic tailored for web environments."
  })
], AreHTMLCompiler);

// src/engine/AreHTML.interpreter.ts
var AreHTMLInterpreter = class extends AreInterpreter {
  addElement(declaration, context, logger) {
    try {
      const node = declaration.owner;
      let currentNode = node;
      let parent = node.parent;
      while (parent) {
        if (context.getNodeElement(parent)) {
          break;
        }
        currentNode = parent;
        parent = parent.parent;
      }
      const tag = node.tag;
      const isSVG = tag === "svg" || this.isInSVGContext(node);
      if (parent) {
        const mountPoint = context.getNodeElement(parent);
        if (!mountPoint) {
          throw new AreInterpreterError({
            title: "Mount Point Not Found",
            description: `Could not find a mount point for the node with id "${node.id}". Ensure that the parent node is rendered before its children, or that a valid root element with the corresponding id exists in the DOM.`
          });
        }
        const element = isSVG ? context.container.createElementNS(SVG_NAMESPACE, tag) : context.container.createElement(tag);
        if (mountPoint.nodeType === Node.ELEMENT_NODE) {
          mountPoint.appendChild(element);
        } else {
          mountPoint.parentNode?.insertBefore(element, mountPoint);
        }
        context.setInstructionElement(declaration, element);
      } else {
        const mountPoint = context.container.getElementById(node.id);
        if (!mountPoint) {
          throw new AreInterpreterError({
            title: "Mount Point Not Found",
            description: `Could not find a mount point for the node with id "${node.id}". Ensure that the parent node is rendered before its children, or that a valid root element with the corresponding id exists in the DOM.`
          });
        }
        const element = isSVG ? context.container.createElementNS(SVG_NAMESPACE, tag) : context.container.createElement(tag);
        mountPoint.parentNode?.replaceChild(element, mountPoint);
        context.setInstructionElement(declaration, element);
      }
      logger?.debug("green", `Element ${node.aseid.toString()} added to Context:`);
    } catch (error) {
      logger?.error(error);
      throw error;
    }
  }
  removeElement(declaration, context) {
    const element = context.getElementByInstruction(declaration);
    if (element && element.parentNode) {
      element.parentNode.removeChild(element);
    }
    context.removeInstructionElement(declaration);
  }
  addAttribute(mutation, context, store, syntax, directiveContext, logger) {
    const element = context.getElementByInstruction(mutation.parent);
    if (!element) {
      throw new AreInterpreterError({
        title: "Element Not Found",
        description: `Could not find a DOM element associated with the instruction ASEID "${mutation.parent}". Ensure that the parent instruction is properly rendered and associated with a DOM element before applying attribute mutations.`
      });
    }
    const { name, content, evaluate } = mutation.payload;
    const rawValue = evaluate ? syntax.evaluate(content, store, {
      ...directiveContext?.scope || {}
    }) : content;
    const el = element;
    const lowerName = name.toLowerCase();
    const colonIdx = name.indexOf(":");
    if (colonIdx > 0) {
      const ns = SVG_ATTRIBUTE_NS[name.slice(0, colonIdx)];
      if (ns) {
        el.setAttributeNS(ns, name, toDOMString(rawValue));
        mutation.cache = toDOMString(rawValue);
        return;
      }
    }
    if (isBooleanAttribute(lowerName)) {
      if (rawValue) {
        el.setAttribute(lowerName, "");
        try {
          el[lowerName] = true;
        } catch {
        }
      } else {
        el.removeAttribute(lowerName);
        try {
          el[lowerName] = false;
        } catch {
        }
      }
      mutation.cache = rawValue ? "true" : "";
      return;
    }
    if (isIDLFormProperty(el.tagName, name)) {
      const propName = name === "value" ? "value" : name === "checked" ? "checked" : name === "selected" ? "selected" : name === "indeterminate" ? "indeterminate" : name;
      try {
        if (propName === "checked" || propName === "selected" || propName === "indeterminate") {
          el[propName] = !!rawValue;
        } else {
          el[propName] = toDOMString(rawValue);
        }
      } catch {
      }
      if (propName !== "value") {
        if (rawValue) el.setAttribute(name, "");
        else el.removeAttribute(name);
      } else {
        el.setAttribute(name, toDOMString(rawValue));
      }
      mutation.cache = toDOMString(rawValue);
      return;
    }
    if (lowerName === "class") {
      const newValue = normalizeClassValue(rawValue);
      if (mutation.cache === void 0) {
        const existingValue = el.getAttribute("class");
        const merged = existingValue ? `${existingValue} ${newValue}`.trim() : newValue;
        if (merged) el.setAttribute("class", merged);
        else el.removeAttribute("class");
      } else {
        const existingValue = el.getAttribute("class");
        const existingParts = existingValue ? existingValue.split(/\s+/).filter(Boolean) : [];
        const oldParts = new Set(mutation.cache.split(/\s+/).filter(Boolean));
        const newParts = newValue ? newValue.split(/\s+/).filter(Boolean) : [];
        const merged = [...existingParts.filter((p3) => !oldParts.has(p3)), ...newParts].join(" ");
        if (merged) el.setAttribute("class", merged);
        else el.removeAttribute("class");
      }
      mutation.cache = newValue;
      return;
    }
    if (lowerName === "style") {
      const newValue = normalizeStyleValue(rawValue);
      if (newValue) el.setAttribute("style", newValue);
      else el.removeAttribute("style");
      mutation.cache = newValue;
      return;
    }
    const stringValue = toDOMString(rawValue);
    if (stringValue === "" && evaluate && (rawValue === false || rawValue === null || rawValue === void 0)) {
      el.removeAttribute(name);
    } else {
      el.setAttribute(name, stringValue);
    }
    mutation.cache = stringValue;
  }
  removeAttribute(mutation, context) {
    try {
      const element = context.getElementByInstruction(mutation.parent);
      if (!element) return;
      const { name } = mutation.payload;
      if (name && element.nodeType === Node.ELEMENT_NODE) {
        const colonIdx = name.indexOf(":");
        if (colonIdx > 0) {
          const ns = SVG_ATTRIBUTE_NS[name.slice(0, colonIdx)];
          if (ns) {
            element.removeAttributeNS(ns, name.slice(colonIdx + 1));
          } else {
            element.removeAttribute(name);
          }
        } else {
          element.removeAttribute(name);
        }
      }
    } catch (error) {
      console.log("Error removing attribute:", error);
    }
  }
  addEventListener(mutation, context, store, syntax, directiveContext, logger) {
    const element = context.getElementByInstruction(mutation.parent);
    if (!element) {
      throw new AreInterpreterError({
        title: "Element Not Found",
        description: `Could not find a DOM element associated with the instruction ASEID "${mutation.parent}". Ensure that the parent instruction is properly rendered and associated with a DOM element before adding event listeners.`
      });
    }
    const { event: eventName, modifiers } = parseEventName(mutation.payload.name);
    const listenerOptions = {};
    if (modifiers.has("capture")) listenerOptions.capture = true;
    if (modifiers.has("once")) listenerOptions.once = true;
    if (modifiers.has("passive")) listenerOptions.passive = true;
    const handlers = syntax.extractEmitHandlers(mutation.payload.handler);
    let liveEvent = null;
    const handlerScope = {};
    for (const handler of handlers) {
      const handlerFn = /* @__PURE__ */ __name((...args) => {
        const event = new AreEvent(handler);
        const effectiveArgs = args.length === 0 && liveEvent ? [liveEvent] : liveEvent ? [...args, liveEvent] : args;
        event.set("args", effectiveArgs);
        event.set("element", element);
        event.set("instruction", mutation);
        if (liveEvent) event.set("native", liveEvent);
        mutation.owner.emit(event);
      }, "handlerFn");
      handlerScope[`$${handler}`] = handlerFn;
    }
    const callback = /* @__PURE__ */ __name((e) => {
      try {
        liveEvent = e;
        if (modifiers.has("self") && e.target !== element) return;
        if (modifiers.has("stop")) e.stopPropagation();
        if (modifiers.has("prevent")) e.preventDefault();
        if (e instanceof KeyboardEvent && modifiers.size > 0) {
          const key = (e.key || "").toLowerCase();
          const KEY_ALIASES = {
            enter: ["enter"],
            esc: ["escape"],
            escape: ["escape"],
            tab: ["tab"],
            space: [" ", "spacebar"],
            up: ["arrowup"],
            down: ["arrowdown"],
            left: ["arrowleft"],
            right: ["arrowright"],
            delete: ["delete", "backspace"]
          };
          const keyMods = [...modifiers].filter((m4) => m4 in KEY_ALIASES || m4 === "ctrl" || m4 === "alt" || m4 === "shift" || m4 === "meta");
          if (keyMods.length > 0) {
            const keyMatch = keyMods.some((m4) => {
              if (m4 === "ctrl") return e.ctrlKey;
              if (m4 === "alt") return e.altKey;
              if (m4 === "shift") return e.shiftKey;
              if (m4 === "meta") return e.metaKey;
              const aliases = KEY_ALIASES[m4];
              return aliases && aliases.includes(key);
            });
            if (!keyMatch) return;
          }
        }
        context.startPerformance("event:" + eventName);
        const result = syntax.evaluate(mutation.payload.handler, store, {
          ...handlerScope,
          $event: e,
          ...directiveContext?.scope || {}
        });
        if (typeof result === "function") result(e);
        context.endPerformance("event:" + eventName);
      } catch (err) {
        logger?.error(err);
      } finally {
        liveEvent = null;
      }
    }, "callback");
    const useOptions = listenerOptions.capture || listenerOptions.once || listenerOptions.passive;
    if (useOptions) {
      element.addEventListener(eventName, callback, listenerOptions);
    } else {
      element.addEventListener(eventName, callback);
    }
    mutation.payload._callback = callback;
    context.addListener(element, mutation.payload.name, callback);
  }
  removeEventListener(mutation, context) {
    const element = context.getElementByInstruction(mutation.parent);
    if (!element) return;
    const { name } = mutation.payload;
    const { event: eventName } = parseEventName(name);
    const listener = mutation.payload._callback;
    if (listener) {
      element.removeEventListener(eventName, listener);
      context.removeListener(element, name, listener);
      mutation.payload._callback = void 0;
    }
  }
  addText(declaration, context, store, syntax, directiveContext, logger) {
    const node = declaration.owner.parent;
    const { content, evaluate } = declaration.payload;
    const rawValue = evaluate ? syntax.evaluate(content, store, {
      ...directiveContext?.scope || {}
    }) : content;
    const value = toDOMString(rawValue);
    if (!node) {
      const textNode = context.container.createTextNode(value);
      context.container.body.appendChild(textNode);
      context.setInstructionElement(declaration, textNode);
    } else {
      const element = context.getNodeElement(node);
      if (!element) {
        throw new AreInterpreterError({
          title: "Element Not Found",
          description: `Could not find a DOM element associated with the instruction ASEID "${declaration.owner.parent.aseid}". Ensure that the parent instruction is properly rendered and associated with a DOM element before applying attribute mutations.`
        });
      }
      const existingNode = context.getElementByInstruction(declaration);
      if (existingNode) {
        existingNode.textContent = value;
      } else {
        const textNode = context.container.createTextNode(value);
        element.appendChild(textNode);
        context.setInstructionElement(declaration, textNode);
      }
    }
    logger?.debug("green", `Text ${node?.aseid.toString()} added to Context:`);
  }
  removeText(declaration, context) {
    const element = context.getElementByInstruction(declaration);
    if (!element) return;
    element.parentNode?.removeChild(element);
    context.removeInstructionElement(declaration);
  }
  addComment(declaration, context, store, syntax, directiveContext, logger) {
    const node = declaration.owner.parent;
    const { content, evaluate } = declaration.payload;
    const rawValue = evaluate ? syntax.evaluate(content, store, {
      ...directiveContext?.scope || {}
    }) : content;
    const value = toDOMString(rawValue);
    if (!node) {
      const commentNode = context.container.createComment(value);
      context.container.body.appendChild(commentNode);
      context.setInstructionElement(declaration, commentNode);
    } else {
      const element = context.getNodeElement(node);
      if (!element) {
        throw new AreInterpreterError({
          title: "Element Not Found",
          description: `Could not find a DOM element associated with the instruction ASEID "${declaration.owner.parent.aseid}". Ensure that the parent instruction is properly rendered and associated with a DOM element before applying attribute mutations.`
        });
      }
      const existingNode = context.getElementByInstruction(declaration);
      if (existingNode) {
        existingNode.textContent = value;
      } else {
        const commentNode = context.container.createComment(value);
        element.appendChild(commentNode);
        context.setInstructionElement(declaration, commentNode);
      }
    }
    logger?.debug("green", `Comment ${node?.aseid.toString()} added to Context:`);
  }
  removeComment(declaration, context) {
    const element = context.getElementByInstruction(declaration);
    if (!element) return;
    element.parentNode?.removeChild(element);
    context.removeInstructionElement(declaration);
  }
  addStyle(mutation, context, logger) {
    try {
      const { styles } = mutation.payload;
      const styleId = `are-style-${String(mutation.aseid)}`;
      const existing = context.getElementByInstruction(mutation);
      if (existing) {
        existing.textContent = styles;
      } else {
        const styleEl = context.container.createElement("style");
        styleEl.setAttribute("data-are-id", styleId);
        styleEl.textContent = styles;
        (context.container.head ?? context.container.body).appendChild(styleEl);
        context.setInstructionElement(mutation, styleEl);
        logger?.debug("green", `Style injected for ${String(mutation.aseid)}`);
      }
    } catch (error) {
      logger?.error(error);
    }
  }
  removeStyle(mutation, context) {
    const styleEl = context.getElementByInstruction(mutation);
    if (styleEl?.parentNode) {
      styleEl.parentNode.removeChild(styleEl);
    }
    context.removeInstructionElement(mutation);
  }
  // ─────────────────────────────────────────────────────────────────────────────
  // ── SVG helpers ───────────────────────────────────────────────────────────────
  // ─────────────────────────────────────────────────────────────────────────────
  /**
   * Returns true when any ancestor of the given node has the tag `svg`,
   * meaning the node lives inside an SVG subtree and its DOM element must be
   * created via createElementNS(SVG_NAMESPACE, tag).
   */
  isInSVGContext(node) {
    let current = node.parent;
    while (current) {
      if (current.tag === "svg") return true;
      if (current.tag === "foreignobject") return false;
      current = current.parent;
    }
    return false;
  }
};
__name(AreHTMLInterpreter, "AreHTMLInterpreter");
__decorateClass([
  A3.Define({
    description: "Create an HTML element based on the provided declaration instruction. Handles both root-level mounting and child element creation based on the structural parent hierarchy."
  }),
  AreInterpreter.Apply(AreInstructionDefaultNames.Default),
  AreInterpreter.Apply(AreHTMLInstructions.AddElement),
  __decorateParam(0, ke(H)),
  __decorateParam(1, ke(AreHTMLEngineContext)),
  __decorateParam(2, ke(A_Logger))
], AreHTMLInterpreter.prototype, "addElement", 1);
__decorateClass([
  A3.Define({
    description: "Remove an HTML element that was created by a CreateElement declaration. Cleans up the DOM and the context index."
  }),
  AreInterpreter.Revert(AreInstructionDefaultNames.Default),
  AreInterpreter.Revert(AreHTMLInstructions.AddElement),
  __decorateParam(0, ke(H)),
  __decorateParam(1, ke(AreHTMLEngineContext))
], AreHTMLInterpreter.prototype, "removeElement", 1);
__decorateClass([
  A3.Define({
    description: "Add an attribute to an HTML element based on the provided mutation instruction."
  }),
  AreInterpreter.Apply(AreHTMLInstructions.AddAttribute),
  AreInterpreter.Update(AreHTMLInstructions.AddAttribute),
  __decorateParam(0, ke(H)),
  __decorateParam(1, ke(AreHTMLEngineContext)),
  __decorateParam(2, ke(AreStore)),
  __decorateParam(3, ke(AreSyntax)),
  __decorateParam(4, ke(AreDirectiveContext)),
  __decorateParam(5, ke(A_Logger))
], AreHTMLInterpreter.prototype, "addAttribute", 1);
__decorateClass([
  A3.Define({
    description: "Remove an attribute from an HTML element based on the provided mutation instruction."
  }),
  AreInterpreter.Revert(AreHTMLInstructions.AddAttribute),
  __decorateParam(0, ke(H)),
  __decorateParam(1, ke(AreHTMLEngineContext))
], AreHTMLInterpreter.prototype, "removeAttribute", 1);
__decorateClass([
  A3.Define({
    description: "Add an event listener to an HTML element based on the provided mutation instruction."
  }),
  AreInterpreter.Apply(AreHTMLInstructions.AddListener),
  __decorateParam(0, ke(H)),
  __decorateParam(1, ke(AreHTMLEngineContext)),
  __decorateParam(2, ke(AreStore)),
  __decorateParam(3, ke(AreSyntax)),
  __decorateParam(4, ke(AreDirectiveContext)),
  __decorateParam(5, ke(A_Logger))
], AreHTMLInterpreter.prototype, "addEventListener", 1);
__decorateClass([
  A3.Define({
    description: "Remove an event listener from an HTML element based on the provided mutation instruction."
  }),
  AreInterpreter.Revert(AreHTMLInstructions.AddListener),
  __decorateParam(0, ke(H)),
  __decorateParam(1, ke(AreHTMLEngineContext))
], AreHTMLInterpreter.prototype, "removeEventListener", 1);
__decorateClass([
  A3.Define({
    description: "Add text content to an HTML element based on the provided declaration instruction."
  }),
  AreInterpreter.Apply(AreHTMLInstructions.AddText),
  AreInterpreter.Update(AreHTMLInstructions.AddText),
  __decorateParam(0, ke(H)),
  __decorateParam(1, ke(AreHTMLEngineContext)),
  __decorateParam(2, ke(AreStore)),
  __decorateParam(3, ke(AreSyntax)),
  __decorateParam(4, ke(AreDirectiveContext)),
  __decorateParam(5, ke(A_Logger))
], AreHTMLInterpreter.prototype, "addText", 1);
__decorateClass([
  A3.Define({
    description: "Remove text content from an HTML element based on the provided declaration instruction."
  }),
  AreInterpreter.Revert(AreHTMLInstructions.AddText),
  __decorateParam(0, ke(H)),
  __decorateParam(1, ke(AreHTMLEngineContext))
], AreHTMLInterpreter.prototype, "removeText", 1);
__decorateClass([
  A3.Define({
    description: "Add a comment node to the DOM based on the provided declaration instruction."
  }),
  AreInterpreter.Apply(AreHTMLInstructions.AddComment),
  AreInterpreter.Update(AreHTMLInstructions.AddComment),
  __decorateParam(0, ke(H)),
  __decorateParam(1, ke(AreHTMLEngineContext)),
  __decorateParam(2, ke(AreStore)),
  __decorateParam(3, ke(AreSyntax)),
  __decorateParam(4, ke(AreDirectiveContext)),
  __decorateParam(5, ke(A_Logger))
], AreHTMLInterpreter.prototype, "addComment", 1);
__decorateClass([
  A3.Define({
    description: "Remove a comment node from the DOM based on the provided declaration instruction."
  }),
  AreInterpreter.Revert(AreHTMLInstructions.AddComment),
  __decorateParam(0, ke(H)),
  __decorateParam(1, ke(AreHTMLEngineContext))
], AreHTMLInterpreter.prototype, "removeComment", 1);
__decorateClass([
  A3.Define({
    description: "Inject a <style> element into the document <head> carrying the component CSS. Keyed by instruction ASEID so multiple components with styles do not collide. Subsequent Update calls refresh the textContent in-place."
  }),
  AreInterpreter.Apply(AreHTMLInstructions.AddStyle),
  AreInterpreter.Update(AreHTMLInstructions.AddStyle),
  __decorateParam(0, ke(H)),
  __decorateParam(1, ke(AreHTMLEngineContext)),
  __decorateParam(2, ke(A_Logger))
], AreHTMLInterpreter.prototype, "addStyle", 1);
__decorateClass([
  A3.Define({
    description: "Remove the <style> element that was injected by addStyle, cleaning up the document head."
  }),
  AreInterpreter.Revert(AreHTMLInstructions.AddStyle),
  __decorateParam(0, ke(H)),
  __decorateParam(1, ke(AreHTMLEngineContext))
], AreHTMLInterpreter.prototype, "removeStyle", 1);
AreHTMLInterpreter = __decorateClass([
  A3.Define({
    namespace: "a-are-html",
    description: "DOM interpreter for the HTML rendering pipeline. Extends AreInterpreter to apply and revert each ARE instruction type directly against the browser DOM \u2014 creating and removing elements, setting and removing attributes and event listeners, managing inline styles, and inserting text and comment nodes. Driven by the scene diff computed per render cycle."
  })
], AreHTMLInterpreter);

// src/engine/AreHTML.tokenizer.ts
var AreHTMLTokenizer = class extends AreTokenizer {
  constructor() {
    super(...arguments);
    this.ATTR_PATTERN = /([$:@]?[\w.-]+(?::[\w.-]+)?)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>/"'=]+)))?/g;
  }
  tokenize(node, context, logger) {
    super.tokenize(node, context, logger);
    context.startPerformance("attributeExtraction");
    const attributes = this.extractAttributes(node.markup);
    for (const attr of attributes) {
      node.scope.register(attr);
    }
    context.endPerformance("attributeExtraction");
  }
  extractAttributes(markup) {
    const withoutTag = markup.replace(/^<[a-zA-Z][a-zA-Z0-9-]*\s*/, "");
    let inSingle = false;
    let inDouble = false;
    let endIdx = withoutTag.length;
    for (let i4 = 0; i4 < withoutTag.length; i4++) {
      const ch = withoutTag[i4];
      if (ch === '"' && !inSingle) inDouble = !inDouble;
      else if (ch === "'" && !inDouble) inSingle = !inSingle;
      else if (ch === ">" && !inSingle && !inDouble) {
        endIdx = i4;
        break;
      }
    }
    const attrString = withoutTag.slice(0, endIdx).replace(/\s*\/?\s*$/, "").trim();
    const results = [];
    for (const match of attrString.matchAll(this.ATTR_PATTERN)) {
      const raw = match[0];
      const full = match[1];
      if (!full) continue;
      const value = match[2] ?? match[3] ?? match[4] ?? "true";
      const prefix = full[0];
      const isSpecial = prefix === ":" || prefix === "@" || prefix === "$";
      const name = isSpecial ? full.slice(1) : full;
      const meta = { name, content: value, raw, prefix: isSpecial ? prefix : "" };
      if (prefix === ":") results.push(new AreBindingAttribute(meta));
      else if (prefix === "@") results.push(new AreEventAttribute(meta));
      else if (prefix === "$") results.push(new AreDirectiveAttribute(meta));
      else results.push(new AreStaticAttribute(meta));
    }
    return results;
  }
};
__name(AreHTMLTokenizer, "AreHTMLTokenizer");
__decorateClass([
  x.Extend({
    name: AreNodeFeatures.onTokenize,
    scope: [AreComponentNode, AreRootNode]
  }),
  __decorateParam(0, ke(H)),
  __decorateParam(1, ke(AreContext)),
  __decorateParam(2, ke(A_Logger))
], AreHTMLTokenizer.prototype, "tokenize", 1);
AreHTMLTokenizer = __decorateClass([
  A3.Define({
    namespace: "a-are-html",
    description: "HTML-specific tokenizer extending AreTokenizer. Parses raw HTML template strings into AreHTMLNode trees by scanning element tags and resolving directive ($), event (@), binding (:), and static attributes to their typed attribute classes, constructing AreComponentNode and AreRootNode instances where required."
  })
], AreHTMLTokenizer);

// src/engine/AreHTML.lifecycle.ts
var AreHTMLLifecycle = class extends AreLifecycle {
  initComponent(node, scope, context, signalsContext, logger, ...args) {
    signalsContext?.subscribe(node);
    super.init(node, scope, context, logger, ...args);
  }
  initText(node, scope, context, logger, ...args) {
    const scene = new AreScene(node.aseid);
    scope.register(scene);
  }
  initInterpolation(node, scope, context, logger, ...args) {
    const scene = new AreScene(node.aseid);
    scope.register(scene);
  }
  mount(node, scene, logger, ...args) {
    logger?.debug(`[Mount] Component Trigger for <${node.aseid.entity}>  with aseid :{${node.aseid.toString()}}`);
    if (scene.isInactive) return;
    node.interpret();
    for (let i4 = 0; i4 < node.children.length; i4++) {
      const child = node.children[i4];
      child.mount();
    }
  }
  updateDirectiveAttribute(directive, scope, feature, logger, ...args) {
    if (directive.component) {
      feature.chain(directive.component, AreDirectiveFeatures.Update, directive.owner.scope);
    } else {
      logger?.warning(`Directive handler component not found for directive: ${directive.name}. Make sure to create a component named "AreDirective${y.toPascalCase(directive.name)}" to handle this directive.`);
    }
  }
};
__name(AreHTMLLifecycle, "AreHTMLLifecycle");
__decorateClass([
  AreLifecycle.Init(AreComponentNode),
  AreLifecycle.Init(AreRootNode),
  __decorateParam(0, ke(H)),
  __decorateParam(1, ke(D)),
  __decorateParam(2, ke(AreHTMLEngineContext)),
  __decorateParam(3, ke(AreSignalsContext)),
  __decorateParam(4, ke(A_Logger))
], AreHTMLLifecycle.prototype, "initComponent", 1);
__decorateClass([
  AreLifecycle.Init(AreText),
  __decorateParam(0, ke(H)),
  __decorateParam(1, ke(D)),
  __decorateParam(2, ke(AreHTMLEngineContext)),
  __decorateParam(3, ke(A_Logger))
], AreHTMLLifecycle.prototype, "initText", 1);
__decorateClass([
  AreLifecycle.Init(AreInterpolation),
  __decorateParam(0, ke(H)),
  __decorateParam(1, ke(D)),
  __decorateParam(2, ke(AreHTMLEngineContext)),
  __decorateParam(3, ke(A_Logger))
], AreHTMLLifecycle.prototype, "initInterpolation", 1);
__decorateClass([
  x.Extend({
    name: AreNodeFeatures.onMount,
    scope: [AreHTMLNode]
  }),
  __decorateParam(0, ke(H)),
  __decorateParam(1, ke(AreScene)),
  __decorateParam(2, ke(A_Logger))
], AreHTMLLifecycle.prototype, "mount", 1);
__decorateClass([
  x.Extend({
    name: AreAttributeFeatures.Update,
    scope: [AreDirectiveAttribute]
  }),
  __decorateParam(0, ke(H)),
  __decorateParam(1, ke(D)),
  __decorateParam(2, ke(x)),
  __decorateParam(3, ke(A_Logger))
], AreHTMLLifecycle.prototype, "updateDirectiveAttribute", 1);
AreHTMLLifecycle = __decorateClass([
  A3.Define({
    namespace: "a-are-html",
    description: "HTML-specific lifecycle handler extending AreLifecycle. Wires DOM-aware init hooks for component nodes, root nodes, interpolations, text nodes, and directive attributes to the ARE rendering pipeline, connecting each entity to its HTML engine context and priming the scene for subsequent compilation and interpretation."
  })
], AreHTMLLifecycle);

// src/engine/AreHTML.transformer.ts
var AreHTMLTransformer = class extends AreTransformer {
  transformDirectiveAttribute(directive, store, feature, logger, ...args) {
    store.watch(directive);
    if (directive.component) {
      feature.chain(directive.component, AreDirectiveFeatures.Transform, directive.owner.scope);
    } else {
      logger?.warning(`Directive handler component not found for directive: ${directive.name}. Make sure to create a component named "AreDirective${y.toPascalCase(directive.name)}" to handle this directive.`);
    }
    store.unwatch(directive);
  }
};
__name(AreHTMLTransformer, "AreHTMLTransformer");
__decorateClass([
  x.Extend({
    name: AreAttributeFeatures.Transform,
    scope: [AreDirectiveAttribute]
  }),
  __decorateParam(0, ke(H)),
  __decorateParam(1, ke(AreStore)),
  __decorateParam(2, ke(x)),
  __decorateParam(3, ke(A_Logger))
], AreHTMLTransformer.prototype, "transformDirectiveAttribute", 1);
AreHTMLTransformer = __decorateClass([
  A3.Define({
    namespace: "a-are-html",
    description: "HTML-specific transformer extending AreTransformer. Handles directive-attribute structural rewrites before compilation \u2014 sorting directives by declared priority and expanding compound directive expressions \u2014 so the compiler receives a clean, ordered AreHTMLNode tree ready for instruction emission."
  })
], AreHTMLTransformer);

// src/engine/AreHTML.engine.ts
var AreHTMLEngine = class extends AreEngine {
  get DefaultSyntax() {
    return new AreSyntax({
      trimWhitespace: true,
      strictMode: true,
      rules: [
        // HTML comments
        {
          opening: "<!--",
          closing: "-->",
          component: AreComment,
          priority: 10,
          nested: false,
          extract: /* @__PURE__ */ __name((raw) => ({ content: raw.slice(4, -3).trim() }), "extract")
        },
        // interpolations
        {
          opening: "{{",
          closing: "}}",
          component: AreInterpolation,
          priority: 9,
          nested: false,
          extract: /* @__PURE__ */ __name((_4, match) => ({ key: match.content }), "extract")
        },
        // are-root — matched before generic elements, produces AreRootNode
        {
          matcher: this.rootElementMatcher.bind(this),
          component: AreRootNode,
          priority: 5
        },
        // generic HTML elements
        {
          matcher: this.htmlElementMatcher.bind(this),
          component: AreComponentNode,
          priority: 4
        },
        // plain text fallback
        {
          component: AreText,
          priority: 0
        }
      ]
    });
  }
  async init(scope, signalContext) {
    this.package(scope, {
      context: new AreHTMLEngineContext({}),
      syntax: this.DefaultSyntax,
      compiler: AreHTMLCompiler,
      interpreter: AreHTMLInterpreter,
      tokenizer: AreHTMLTokenizer,
      lifecycle: AreHTMLLifecycle,
      transformer: AreHTMLTransformer
    });
    if (!signalContext) {
      signalContext = new AreSignalsContext();
      scope.register(signalContext);
    }
  }
  rootElementMatcher(source, from, to, build) {
    const rootTag = "are-root";
    const tagStart = source.indexOf("<", from);
    if (tagStart === -1 || tagStart >= to) return null;
    const tagNameMatch = source.slice(tagStart).match(/^<([a-zA-Z][a-zA-Z0-9-]*)/);
    if (!tagNameMatch || tagNameMatch[1].toLowerCase() !== rootTag) return null;
    return this.htmlElementMatcher(source, from, to, build);
  }
  htmlElementMatcher(source, from, to, build) {
    let index = from;
    while (index < to) {
      const tagStart = source.indexOf("<", index);
      if (tagStart === -1 || tagStart >= to) return null;
      if (source.startsWith("<!--", tagStart)) {
        index = tagStart + 1;
        continue;
      }
      if (source[tagStart + 1] === "/") {
        index = tagStart + 1;
        continue;
      }
      if (source[tagStart + 1] === "!" || source[tagStart + 1] === "?") {
        index = tagStart + 1;
        continue;
      }
      const tagNameMatch = source.slice(tagStart).match(/^<([a-zA-Z][a-zA-Z0-9-]*)/);
      if (!tagNameMatch) {
        index = tagStart + 1;
        continue;
      }
      const tagName = tagNameMatch[1];
      const openingTagEnd = AreHTMLEngine.findTagClose(source, tagStart);
      if (openingTagEnd === -1) return null;
      const openingTagStr = source.slice(tagStart, openingTagEnd + 1);
      const idMatch = openingTagStr.match(/\bid=["']([^"']*)["']/);
      const id = idMatch ? idMatch[1] : void 0;
      if (source[openingTagEnd - 1] === "/") {
        const raw = source.slice(tagStart, openingTagEnd + 1);
        const content2 = source.slice(tagStart + tagNameMatch[0].length, openingTagEnd - 1);
        const match2 = build(raw, content2, tagStart, "/>");
        match2.payload = { entity: tagName, selfClose: true, id };
        return match2;
      }
      if (isVoidElement(tagName)) {
        const raw = source.slice(tagStart, openingTagEnd + 1);
        const content2 = source.slice(tagStart + tagNameMatch[0].length, openingTagEnd);
        const match2 = build(raw, content2, tagStart, ">");
        match2.payload = { entity: tagName, selfClose: true, id };
        return match2;
      }
      const closingTag = `</${tagName}>`;
      let level = 0;
      let searchIndex = openingTagEnd + 1;
      let closingStart = -1;
      while (searchIndex < to) {
        const nextOpen = source.indexOf(`<${tagName}`, searchIndex);
        const nextClose = source.indexOf(closingTag, searchIndex);
        if (nextClose === -1) break;
        if (nextOpen !== -1 && nextOpen < nextClose) {
          const charAfter = source[nextOpen + tagName.length + 1];
          if (charAfter === " " || charAfter === ">" || charAfter === "/") {
            const innerEnd = AreHTMLEngine.findTagClose(source, nextOpen);
            const isSelfClose = innerEnd !== -1 && source[innerEnd - 1] === "/";
            if (!isSelfClose) {
              level++;
            }
            searchIndex = innerEnd === -1 ? nextOpen + tagName.length + 1 : innerEnd + 1;
            continue;
          }
        }
        if (level === 0) {
          closingStart = nextClose;
          break;
        }
        level--;
        searchIndex = nextClose + closingTag.length;
      }
      if (closingStart === -1) return null;
      const fullTag = source.slice(tagStart, closingStart + closingTag.length);
      const content = source.slice(openingTagEnd + 1, closingStart);
      const match = build(fullTag, content, tagStart, closingTag);
      match.payload = { entity: tagName, selfClose: false, id };
      return match;
    }
    return null;
  }
  /**
   * Find the index of the closing `>` of an opening tag, skipping over
   * `>` characters that appear inside quoted attribute values.
   */
  static findTagClose(source, from) {
    let inSingle = false;
    let inDouble = false;
    for (let i4 = from; i4 < source.length; i4++) {
      const ch = source[i4];
      if (ch === '"' && !inSingle) inDouble = !inDouble;
      else if (ch === "'" && !inDouble) inSingle = !inSingle;
      else if (ch === ">" && !inSingle && !inDouble) return i4;
    }
    return -1;
  }
};
__name(AreHTMLEngine, "AreHTMLEngine");
__decorateClass([
  x.Extend({
    name: A_ServiceFeatures.onBeforeLoad,
    before: /.*/
  }),
  __decorateParam(0, ke(D)),
  __decorateParam(1, ke(AreSignalsContext))
], AreHTMLEngine.prototype, "init", 1);
AreHTMLEngine = __decorateClass([
  A3.Define({
    namespace: "a-are-html",
    description: "Concrete HTML rendering engine that assembles the full ARE pipeline for web environments. Bootstraps and wires AreHTMLTokenizer, AreHTMLTransformer, AreHTMLCompiler, AreHTMLInterpreter, and AreHTMLLifecycle; mounts root nodes from inline or fetched templates; and drives reactive re-renders via the AreSignals bus."
  })
], AreHTMLEngine);

// src/lib/AreRoot/AreRoot.component.ts
var AreRoot = class extends Are {
  constructor() {
    super(...arguments);
    this.props = {
      default: {
        type: "string",
        default: ""
      }
    };
  }
  async template(root, logger, signalsContext) {
    const rootId = root.id;
    if (signalsContext && !signalsContext.hasRoot(rootId)) {
      const defaultMatch = root.markup?.match(/\bdefault=["']([^"']*)["']/);
      const defaultComponent = defaultMatch?.[1];
      if (defaultComponent) {
        root.setContent(`<${defaultComponent}></${defaultComponent}>`);
      }
      return;
    }
    const currentRoute = AreRoute.default();
    let componentName;
    if (currentRoute) {
      const initialVector = new A_SignalVector([currentRoute]);
      let renderTarget = signalsContext?.findComponentByVector(rootId, initialVector);
      if (!renderTarget) {
        const signalsMeta = c.meta(AreSignals);
        renderTarget = signalsMeta?.findComponentByVector(initialVector);
      }
      if (renderTarget?.name) {
        componentName = y.toKebabCase(renderTarget.name);
      }
    }
    if (!componentName) {
      const defaultMatch = root.markup?.match(/\bdefault=["']([^"']*)["']/);
      componentName = defaultMatch?.[1];
    }
    if (!componentName) {
      logger.warning('AreRoot: No component found for initial render. Please ensure a route condition or "default" attribute is set.');
      return;
    }
    root.setContent(`<${componentName}></${componentName}>`);
  }
  async onSignal(root, vector, store, logger, signalsContext) {
    const rootId = root.id;
    if (signalsContext && !signalsContext.hasRoot(rootId)) {
      return;
    }
    let renderTarget = signalsContext?.findComponentByVector(rootId, vector);
    if (!renderTarget) {
      const signalsMeta = c.meta(AreSignals);
      renderTarget = signalsMeta?.findComponentByVector(vector);
    }
    const componentName = renderTarget?.name ? y.toKebabCase(renderTarget.name) : store.get("default");
    if (!componentName) {
      logger.warning("No component found for rendering in AreRoot. Please ensure that the signal vector matches at least one component or that a default component name is provided in the store.");
      return;
    }
    root.setContent(`<${componentName}></${componentName}>`);
    for (let i4 = 0; i4 < root.children.length; i4++) {
      const child = root.children[i4];
      child.unmount();
      child.destroy();
      root.removeChild(child);
    }
    root.tokenize();
    for (let i4 = 0; i4 < root.children.length; i4++) {
      const child = root.children[i4];
      child.init();
      const res = child.load();
      if (res instanceof Promise) {
        await res;
      }
      child.transform();
      child.compile();
      child.mount();
    }
  }
};
__name(AreRoot, "AreRoot");
__decorateClass([
  Are.Template,
  __decorateParam(0, ke(H)),
  __decorateParam(1, ke(A_Logger)),
  __decorateParam(2, ke(AreSignalsContext))
], AreRoot.prototype, "template", 1);
__decorateClass([
  Are.Signal,
  __decorateParam(0, ke(H)),
  __decorateParam(1, ke(A_SignalVector)),
  __decorateParam(2, ke(AreStore)),
  __decorateParam(3, ke(A_Logger)),
  __decorateParam(4, ke(AreSignalsContext))
], AreRoot.prototype, "onSignal", 1);
AreRoot = __decorateClass([
  A3.Define({
    namespace: "a-are-html",
    description: "The AreRoot component serves as the foundational entry point for the A-Concept Rendering Engine (ARE). It is responsible for initializing the rendering process, managing the root node of the component tree, and handling signal-based rendering logic. The AreRoot component processes incoming signals to determine which child components to render, allowing for dynamic and responsive UI updates based on application state and user interactions."
  })
], AreRoot);

// examples/component-styles/src/components/AppPage.component.ts
var _AppPage = class _AppPage extends Are {
  styles(node) {
    node.setStyles(`
            .app-page {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 24px;
                padding: 48px 24px;
                min-height: 100vh;
            }

            .app-page__heading {
                font-size: 1.9rem;
                font-weight: 700;
                color: #1a1a2e;
                text-align: center;
            }

            .app-page__sub {
                font-size: 1rem;
                color: #6b7280;
                text-align: center;
                max-width: 500px;
            }

            .app-page__row {
                display: flex;
                gap: 12px;
                flex-wrap: wrap;
                justify-content: center;
            }
        `);
  }
  template(node) {
    node.setContent(`
            <div class="app-page">
                <h1 class="app-page__heading">@Are.Styles Pipeline</h1>
                <p class="app-page__sub">
                    Each component below owns its CSS \u2014 injected as a scoped
                    &lt;style&gt; block in &lt;head&gt; when the component mounts.
                </p>

                <the-card></the-card>

                <the-alert :type="'success'" :message="'Styles injected from TheAlert component \u2713'"></the-alert>
                <the-alert :type="'warning'" :message="'A second TheAlert with a different type variant'"></the-alert>

                <div class="app-page__row">
                    <the-button :label="'Primary'"   :variant="'primary'"></the-button>
                    <the-button :label="'Secondary'" :variant="'secondary'"></the-button>
                    <the-button :label="'Danger'"    :variant="'danger'"></the-button>
                </div>
            </div>
        `);
  }
};
__name(_AppPage, "AppPage");
__decorateClass([
  Are.Styles,
  __decorateParam(0, ke(H))
], _AppPage.prototype, "styles", 1);
__decorateClass([
  Are.Template,
  __decorateParam(0, ke(H))
], _AppPage.prototype, "template", 1);
var AppPage = _AppPage;

// examples/component-styles/src/components/TheCard.component.ts
var _TheCard = class _TheCard extends Are {
  styles(node) {
    node.setStyles(`
            .are-card {
                background: #ffffff;
                border-radius: 12px;
                box-shadow: 0 2px 12px rgba(0, 0, 0, .08);
                padding: 24px 28px;
                max-width: 480px;
                width: 100%;
            }

            .are-card__title {
                font-size: 1.25rem;
                font-weight: 600;
                color: #1a1a2e;
                margin-bottom: 8px;
            }

            .are-card__body {
                font-size: 0.95rem;
                color: #5a5a7a;
                line-height: 1.6;
            }
        `);
  }
  template(node, store) {
    node.setContent(`
            <div class="are-card">
                <div class="are-card__title">{{title}}</div>
                <div class="are-card__body">{{body}}</div>
            </div>
        `);
  }
  data(node, store) {
    store.set({
      title: "Component Styles Demo",
      body: "Each component below injects its own <style> block into the document <head> through the @Are.Styles pipeline."
    });
  }
};
__name(_TheCard, "TheCard");
__decorateClass([
  Are.Styles,
  __decorateParam(0, ke(H))
], _TheCard.prototype, "styles", 1);
__decorateClass([
  Are.Template,
  __decorateParam(0, ke(H)),
  __decorateParam(1, ke(AreStore))
], _TheCard.prototype, "template", 1);
__decorateClass([
  Are.Data,
  __decorateParam(0, ke(H)),
  __decorateParam(1, ke(AreStore))
], _TheCard.prototype, "data", 1);
var TheCard = _TheCard;

// examples/component-styles/src/components/TheButton.component.ts
var _TheButton = class _TheButton extends Are {
  constructor() {
    super(...arguments);
    this.props = {
      label: {
        type: "string",
        default: "Click me"
      },
      variant: {
        type: "string",
        default: "primary"
        // 'primary' | 'secondary' | 'danger'
      }
    };
  }
  styles(node) {
    node.setStyles(`
            .are-btn {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                padding: 10px 22px;
                font-size: 0.9rem;
                font-weight: 600;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                transition: opacity .15s, transform .1s;
                letter-spacing: 0.02em;
            }

            .are-btn:hover  { opacity: .88; }
            .are-btn:active { transform: scale(.97); }

            .are-btn--primary   { background: #4f46e5; color: #fff; }
            .are-btn--secondary { background: #e5e7eb; color: #374151; }
            .are-btn--danger    { background: #ef4444; color: #fff; }
        `);
  }
  template(node, store) {
    node.setContent(`
            <button class="are-btn are-btn--{{variant}}">{{label}}</button>
        `);
  }
  data(node, store) {
    store.set({
      label: store.get("label") ?? "Click Me",
      variant: store.get("variant") ?? "primary"
    });
  }
};
__name(_TheButton, "TheButton");
__decorateClass([
  Are.Styles,
  __decorateParam(0, ke(H))
], _TheButton.prototype, "styles", 1);
__decorateClass([
  Are.Template,
  __decorateParam(0, ke(H)),
  __decorateParam(1, ke(AreStore))
], _TheButton.prototype, "template", 1);
__decorateClass([
  Are.Data,
  __decorateParam(0, ke(H)),
  __decorateParam(1, ke(AreStore))
], _TheButton.prototype, "data", 1);
var TheButton = _TheButton;

// examples/component-styles/src/components/TheAlert.component.ts
var _TheAlert = class _TheAlert extends Are {
  constructor() {
    super(...arguments);
    this.props = {
      type: {
        type: "string",
        default: "info"
        // 'info' | 'success' | 'warning' | 'error'
      },
      message: {
        type: "string",
        default: ""
      }
    };
  }
  styles(node) {
    node.setStyles(`
            .are-alert {
                display: flex;
                align-items: flex-start;
                gap: 12px;
                padding: 14px 18px;
                border-radius: 8px;
                font-size: 0.9rem;
                line-height: 1.5;
                border-left: 4px solid transparent;
            }

            .are-alert__icon  { font-size: 1.1rem; flex-shrink: 0; }
            .are-alert__text  { flex: 1; }

            .are-alert--info    { background: #eff6ff; border-color: #3b82f6; color: #1e40af; }
            .are-alert--success { background: #f0fdf4; border-color: #22c55e; color: #166534; }
            .are-alert--warning { background: #fffbeb; border-color: #f59e0b; color: #92400e; }
            .are-alert--error   { background: #fef2f2; border-color: #ef4444; color: #991b1b; }
        `);
  }
  template(node, store) {
    node.setContent(`
            <div class="are-alert are-alert--{{type}}">
                <span class="are-alert__icon">{{icon}}</span>
                <span class="are-alert__text">{{message}}</span>
            </div>
        `);
  }
  data(node, store) {
    const type = store.get("type") ?? "info";
    const icons = {
      info: "\u2139\uFE0F",
      success: "\u2705",
      warning: "\u26A0\uFE0F",
      error: "\u274C"
    };
    store.set({
      type,
      icon: icons[type] ?? icons.info,
      message: store.get("message") ?? "This is an alert message."
    });
  }
};
__name(_TheAlert, "TheAlert");
__decorateClass([
  Are.Styles,
  __decorateParam(0, ke(H))
], _TheAlert.prototype, "styles", 1);
__decorateClass([
  Are.Template,
  __decorateParam(0, ke(H)),
  __decorateParam(1, ke(AreStore))
], _TheAlert.prototype, "template", 1);
__decorateClass([
  Are.Data,
  __decorateParam(0, ke(H)),
  __decorateParam(1, ke(AreStore))
], _TheAlert.prototype, "data", 1);
var TheAlert = _TheAlert;

// examples/component-styles/src/concept.ts
(async () => {
  try {
    const container = new AreContainer({
      name: "ARE Component Styles",
      components: [
        // ── UI Components ─────────────────────────────────────────
        AppPage,
        TheCard,
        TheButton,
        TheAlert,
        // ── Directives ────────────────────────────────────────────
        AreDirectiveIf,
        AreDirectiveFor,
        // ── Engine ────────────────────────────────────────────────
        A_SignalBus,
        AreRoot,
        ConfigReader,
        AreHTMLEngine,
        A_Logger
      ],
      entities: [
        AreInit,
        AreRoute
      ],
      fragments: [
        new AreHTMLEngineContext({ container: document }),
        new A_SignalState([AreRoute]),
        new A_Config({
          defaults: {
            [A_LOGGER_ENV_KEYS.LOG_LEVEL]: "debug"
          }
        })
      ]
    });
    const concept = new Ie({
      name: "adaas-are-example-component-styles",
      fragments: [
        new A_Config({
          variables: ["CONFIG_VERBOSE", "DEV_MODE"],
          defaults: { CONFIG_VERBOSE: true, DEV_MODE: true }
        })
      ],
      components: [A_Logger, ConfigReader, A_Polyfill],
      containers: [container]
    });
    await concept.load();
    await concept.start();
  } catch (error) {
    const logger = c.root.resolve(A_Logger);
    logger.error(error);
  }
})();
