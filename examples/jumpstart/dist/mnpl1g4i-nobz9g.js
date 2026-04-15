var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
var __decorateParam = (index, decorator) => (target, key) => decorator(target, key, index);

// node_modules/@adaas/a-concept/dist/browser/index.mjs
var _a;
var L = (_a = class {
  constructor(e = {}) {
    this._name = e.name || this.constructor.name;
  }
  get name() {
    return this._name;
  }
  toJSON() {
    return { name: this.name };
  }
}, __name(_a, "L"), _a);
var Ne = ((o) => (o.INITIALIZED = "INITIALIZED", o.PROCESSING = "PROCESSING", o.COMPLETED = "COMPLETED", o.INTERRUPTED = "INTERRUPTED", o.FAILED = "FAILED", o))(Ne || {});
var _a2;
var h = (_a2 = class {
  static toUpperSnakeCase(e) {
    return e.trim().replace(/([a-z])([A-Z])/g, "$1_$2").replace(/[^a-zA-Z0-9]+/g, "_").replace(/_+/g, "_").replace(/^_|_$/g, "").toUpperCase();
  }
  static toCamelCase(e) {
    return e.trim().replace(/[^a-zA-Z0-9]+/g, " ").split(" ").filter(Boolean).map((t, r2) => r2 === 0 ? t.toLowerCase() : t.charAt(0).toUpperCase() + t.slice(1).toLowerCase()).join("");
  }
  static toPascalCase(e) {
    return e.trim().replace(/([a-z])([A-Z])/g, "$1 $2").replace(/[^a-zA-Z0-9]+/g, " ").split(" ").filter(Boolean).map((t) => t.charAt(0).toUpperCase() + t.slice(1).toLowerCase()).join("");
  }
  static toKebabCase(e) {
    return e.replace(/[^a-zA-Z0-9]+/g, " ").replace(/([a-z0-9])([A-Z])/g, "$1 $2").trim().replace(/\s+/g, "-").toLowerCase();
  }
}, __name(_a2, "h"), _a2);
var _a3;
var V = (_a3 = class {
  static generateTimeId(e = { timestamp: /* @__PURE__ */ new Date(), random: Math.random().toString(36).slice(2, 8) }) {
    let t = e.timestamp.getTime().toString(36), r2 = e.random;
    return `${t}-${r2}`;
  }
  static parseTimeId(e) {
    let [t, r2] = e.split("-");
    return { timestamp: new Date(parseInt(t, 36)), random: r2 };
  }
  static formatWithLeadingZeros(e, t = 10) {
    return String(e).padStart(t + 1, "0").slice(-t);
  }
  static removeLeadingZeros(e) {
    return String(Number(e));
  }
  static hashString(e) {
    let t = 0, r2, n;
    if (e.length === 0) return t.toString();
    for (r2 = 0; r2 < e.length; r2++) n = e.charCodeAt(r2), t = (t << 5) - t + n, t |= 0;
    return t.toString();
  }
}, __name(_a3, "V"), _a3);
var _a4;
var g = (_a4 = class {
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
}, __name(_a4, "i"), _a4);
var _a5;
var M = (_a5 = class {
  static isASEID(e) {
    return this.regexp.test(e);
  }
  static compare(e, t) {
    if (!e || !t) return false;
    if (g.isString(e) && this.isASEID(e) === false) throw new Error(`Invalid ASEID format provided: ${e}`);
    if (g.isString(t) && this.isASEID(t) === false) throw new Error(`Invalid ASEID format provided: ${t}`);
    let r2 = e instanceof _a5 ? e : new _a5(e), n = t instanceof _a5 ? t : new _a5(t);
    return r2.toString() === n.toString();
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
    return V.hashString(this.toString());
  }
  getInitializer(e) {
    switch (true) {
      case g.isString(e):
        return this.fromString;
      case g.isObject(e):
        return this.fromObject;
      default:
        throw new Error("Invalid parameters provided to ASEID constructor");
    }
  }
  fromString(e) {
    let [t, r2, n] = e.split("@"), [o, s, _] = r2.split(":"), p = _.includes(".") ? _.split(".")[0] : void 0, d2 = _.includes(".") ? _.split(".")[1] : _;
    this._concept = t || c.root.name, this._scope = o || c.root.name, this._entity = s, this._id = d2, this._version = n, this._shard = p;
  }
  fromObject(e) {
    this._concept = e.concept ? _a5.isASEID(e.concept) ? new _a5(e.concept).id : e.concept : c.concept, this._scope = e.scope ? g.isNumber(e.scope) ? V.formatWithLeadingZeros(e.scope) : _a5.isASEID(e.scope) ? new _a5(e.scope).id : e.scope : c.root.name, this._entity = e.entity, this._id = g.isNumber(e.id) ? V.formatWithLeadingZeros(e.id) : e.id, this._version = e.version, this._shard = e.shard;
  }
  toString() {
    return `${this.concept}@${this.scope}:${this.entity}:${this.shard ? this.shard + "." + this.id : this.id}${this.version ? "@" + this.version : ""}`;
  }
  toJSON() {
    return { concept: this._concept, scope: this._scope, entity: this._entity, id: this._id, version: this._version, shard: this._shard };
  }
  verifyInput(e) {
    switch (true) {
      case (g.isString(e) && !_a5.isASEID(e)):
        throw new Error("Invalid ASEID format provided");
      case (g.isObject(e) && !e.id):
        throw new Error("ASEID id is required");
      case (g.isObject(e) && !e.entity):
        throw new Error("ASEID entity is required");
    }
  }
}, __name(_a5, "M"), _a5);
M.regexp = new RegExp("^[a-z|A-Z|0-9|-]+@[a-z|A-Z|0-9|-]+:[a-z|A-Z|0-9|-]+:[a-z|A-Z|0-9|\\.|-]+(@v[0-9|\\.]+|@lts)?$");
var I = M;
var re = { UNEXPECTED_ERROR: "A-Error Unexpected Error", VALIDATION_ERROR: "A-Error Validation Error" };
var Ye = "If you see this error please let us know.";
var _a6;
var _e = (_a6 = class {
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
  static set(e, t) {
    this[e] = t;
  }
  static getAll() {
    return {};
  }
  static getAllKeys() {
    return [];
  }
}, __name(_a6, "_e"), _a6);
var ne = { A_CONCEPT_NAME: "A_CONCEPT_NAME", A_CONCEPT_ROOT_SCOPE: "A_CONCEPT_ROOT_SCOPE", A_CONCEPT_ENVIRONMENT: "A_CONCEPT_ENVIRONMENT", A_CONCEPT_RUNTIME_ENVIRONMENT: "A_CONCEPT_RUNTIME_ENVIRONMENT", A_CONCEPT_ROOT_FOLDER: "A_CONCEPT_ROOT_FOLDER", A_ERROR_DEFAULT_DESCRIPTION: "A_ERROR_DEFAULT_DESCRIPTION" };
var pe = [ne.A_CONCEPT_NAME, ne.A_CONCEPT_ROOT_SCOPE, ne.A_CONCEPT_ENVIRONMENT, ne.A_CONCEPT_RUNTIME_ENVIRONMENT, ne.A_CONCEPT_ROOT_FOLDER, ne.A_ERROR_DEFAULT_DESCRIPTION];
var _a7;
var k = (_a7 = class extends _e {
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
  static set(e, t) {
    window.__A_CONCEPT_ENVIRONMENT_ENV__ || (window.__A_CONCEPT_ENVIRONMENT_ENV__ = {}), window.__A_CONCEPT_ENVIRONMENT_ENV__[e] = t;
  }
  static getAll() {
    let e = {};
    return window.__A_CONCEPT_ENVIRONMENT_ENV__ && Object.keys(window.__A_CONCEPT_ENVIRONMENT_ENV__).forEach((t) => {
      e[t] = window.__A_CONCEPT_ENVIRONMENT_ENV__[t];
    }), pe.forEach((t) => {
      e[t] = this.get(t);
    }), e;
  }
  static getAllKeys() {
    let e = /* @__PURE__ */ new Set();
    return window.__A_CONCEPT_ENVIRONMENT_ENV__ && Object.keys(window.__A_CONCEPT_ENVIRONMENT_ENV__).forEach((t) => {
      e.add(t);
    }), pe.forEach((t) => {
      e.add(t);
    }), Array.from(e);
  }
}, __name(_a7, "k"), _a7);
var _a8;
var y = (_a8 = class extends Error {
  static get entity() {
    return h.toKebabCase(this.name);
  }
  static get concept() {
    return c.concept;
  }
  static get scope() {
    return c.root.name;
  }
  constructor(e, t) {
    switch (true) {
      case e instanceof _a8:
        return e;
      case e instanceof Error:
        super(e.message);
        break;
      case g.isErrorSerializedType(e):
        super(e.message);
        break;
      case (g.isErrorConstructorType(e) && "description" in e):
        super(`[${e.title}]: ${e.description}`);
        break;
      case (g.isErrorConstructorType(e) && !("description" in e)):
        super(e.title);
        break;
      case (g.isString(e) && !t):
        super(e);
        break;
      case (g.isString(e) && !!t):
        super(`[${e}]: ${t}`);
        break;
      default:
        super("An unknown error occurred.");
    }
    this.getInitializer(e, t).call(this, e, t);
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
    return this._code || h.toKebabCase(this.title);
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
  getInitializer(e, t) {
    switch (true) {
      case (g.isString(e) && !t):
        return this.fromMessage;
      case (g.isString(e) && !!t):
        return this.fromTitle;
      case e instanceof Error:
        return this.fromError;
      case g.isErrorSerializedType(e):
        return this.fromJSON;
      case g.isErrorConstructorType(e):
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
  fromTitle(e, t) {
    this.validateTitle(e), this._title = e, this._description = t, this._aseid = new I({ concept: this.constructor.concept, scope: this._scope || this.constructor.scope, entity: this.constructor.entity, id: this.code }), this._link = void 0, this._originalError = void 0;
  }
  fromConstructor(e) {
    if (this.validateTitle(e.title), this._title = e.title, this._code = e.code, this._scope = e.scope ? g.isScopeInstance(e.scope) ? e.scope.name : e.scope : void 0, this._aseid = new I({ concept: this.constructor.concept, scope: this._scope || this.constructor.scope, entity: this.constructor.entity, id: this.code }), this._description = e.description, this._link = e.link, e.originalError instanceof _a8) {
      let t = e.originalError;
      for (; t.originalError instanceof _a8; ) t = t.originalError;
      this._originalError = t.originalError || t;
    } else this._originalError = e.originalError;
  }
  toJSON() {
    return { aseid: this.aseid.toString(), title: this.title, code: this.code, type: this.type, message: this.message, link: this.link, scope: this.scope, description: this.description, originalError: this.originalError?.message };
  }
  validateTitle(e) {
    if (e.length > 60) throw new _a8(re.VALIDATION_ERROR, "A-Error title exceeds 60 characters limit.");
    if (e.length === 0) throw new _a8(re.VALIDATION_ERROR, "A-Error title cannot be empty.");
  }
}, __name(_a8, "i"), _a8);
var _a9;
var Q = (_a9 = class extends y {
}, __name(_a9, "Q"), _a9);
Q.ValidationError = "A-Entity Validation Error";
var we = ((n) => (n.EXTENSIONS = "a-component-extensions", n.FEATURES = "a-component-features", n.ABSTRACTIONS = "a-component-abstractions", n.INJECTIONS = "a-component-injections", n))(we || {});
var ce = { SAVE: "_A_Entity__Save", DESTROY: "_A_Entity__Destroy", LOAD: "_A_Entity__Load" };
var _a10;
var O = (_a10 = class {
  static get entity() {
    return h.toKebabCase(this.name);
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
    throw new Q(Q.ValidationError, "Unable to determine A-Entity constructor initialization method. Please check the provided parameters.");
  }
  generateASEID(e) {
    return new I({ concept: e?.concept || this.constructor.concept, scope: e?.scope || this.constructor.scope, entity: e?.entity || this.constructor.entity, id: e?.id || V.generateTimeId() });
  }
  call(e, t) {
    return new w({ name: e, component: this, scope: t }).process(t);
  }
  load(e) {
    return this.call(ce.LOAD, e);
  }
  destroy(e) {
    return this.call(ce.DESTROY, e);
  }
  save(e) {
    return this.call(ce.SAVE, e);
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
}, __name(_a10, "O"), _a10);
function ue(i) {
  return function(e) {
    return c.setMeta(e, new i()), e;
  };
}
__name(ue, "ue");
var _a11;
var m = (_a11 = class {
  constructor() {
    this.meta = /* @__PURE__ */ new Map();
  }
  static Define(e) {
    return ue(e);
  }
  [Symbol.iterator]() {
    let e = this.meta.entries();
    return { next: /* @__PURE__ */ __name(() => e.next(), "next") };
  }
  from(e) {
    return this.meta = new Map(e.meta), this;
  }
  clone() {
    let e = this.constructor, t = new e();
    return t.meta = new Map(this.meta), t;
  }
  set(e, t) {
    let r2 = this.meta.get(e) || Array.isArray(t) ? [] : t instanceof Map ? /* @__PURE__ */ new Map() : {};
    this.meta.get(e) || Array.isArray(t) ? [...r2] : t instanceof Map ? new Map(r2) : { ...r2 };
    this.meta.set(e, t);
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
    let t = this._regExpCache.get(e);
    return t || (t = new RegExp(e), this._regExpCache.set(e, t)), t;
  }
  find(e) {
    let t = [];
    for (let [r2, n] of this.meta.entries()) this.convertToRegExp(String(r2)).test(e) && t.push([r2, n]);
    return t;
  }
  findByRegex(e) {
    let t = [];
    for (let [r2, n] of this.meta.entries()) e.test(String(r2)) && t.push([r2, n]);
    return t;
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
        let t = {};
        for (let [n, o] of e.entries()) t[String(n)] = this.recursiveToJSON(o);
        return t;
      case Array.isArray(e):
        return e.map((n) => this.recursiveToJSON(n));
      case (!!e && typeof e == "object"):
        let r2 = {};
        for (let [n, o] of Object.entries(e)) r2[n] = this.recursiveToJSON(o);
        return r2;
      default:
        return e;
    }
  }
  toJSON() {
    let e = {};
    for (let [t, r2] of this.meta.entries()) e[String(t)] = this.recursiveToJSON(r2);
    return e;
  }
}, __name(_a11, "i"), _a11);
var _a12;
var B = (_a12 = class extends m {
  features() {
    return this.get("a-component-features")?.toArray().map(([, t]) => t) || [];
  }
  injections(e) {
    return this.get("a-component-injections")?.get(e) || [];
  }
}, __name(_a12, "B"), _a12);
var _a13;
var z = (_a13 = class {
  get name() {
    return this.config?.name || this.constructor.name;
  }
  get scope() {
    return c.scope(this);
  }
  constructor(e = {}) {
    this.config = e, c.allocate(this, this.config);
  }
  async call(e, t) {
    return await new w({ name: e, component: this }).process(t);
  }
}, __name(_a13, "z"), _a13);
var xe = ((n) => (n.FEATURES = "a-container-features", n.INJECTIONS = "a-container-injections", n.ABSTRACTIONS = "a-container-abstractions", n.EXTENSIONS = "a-container-extensions", n))(xe || {});
var _a14;
var H = (_a14 = class extends m {
  injections(e) {
    return this.get("a-container-injections")?.get(e) || [];
  }
  features() {
    return this.get("a-container-features")?.toArray().map(([, t]) => t) || [];
  }
  abstractions(e) {
    let t = [], r2 = this.get("a-container-abstractions"), n = this.get("a-container-injections");
    return r2?.find(`CONCEPT_ABSTRACTION::${e}`).forEach(([o, s]) => {
      s.forEach((_) => {
        let p = n?.get(_.handler) || [];
        t.push({ ..._, args: p });
      });
    }), t;
  }
  extensions(e) {
    let t = [];
    return this.get("a-container-extensions")?.find(e).forEach(([n, o]) => {
      o.forEach((s) => {
        t.push({ name: s.name, handler: s.handler, behavior: s.behavior, before: s.before || "", after: s.after || "", throwOnError: s.throwOnError || true, override: "" });
      });
    }), t;
  }
}, __name(_a14, "H"), _a14);
var _a15;
var E = (_a15 = class extends y {
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
  static isInheritedFrom(e, t) {
    let r2 = e;
    for (; r2; ) {
      if (r2 === t) return true;
      r2 = Object.getPrototypeOf(r2);
    }
    return false;
  }
  static getParentClasses(e) {
    let t = Object.getPrototypeOf(typeof e == "function" ? e : e.constructor), r2 = [];
    for (; t && t !== Function.prototype; ) r2.push(t), t = Object.getPrototypeOf(t);
    return r2;
  }
  static getClassInheritanceChain(e) {
    let t = Object.getPrototypeOf(typeof e == "function" ? e : e.constructor), r2 = typeof e == "function" ? [e] : [e.constructor];
    for (; t && t !== Function.prototype; ) r2.push(t), t = Object.getPrototypeOf(t);
    return r2;
  }
  static getParentClass(e) {
    return Object.getPrototypeOf(e);
  }
  static omitProperties(e, t) {
    let r2 = JSON.parse(JSON.stringify(e));
    function n(o, s) {
      let _ = s[0];
      s.length === 1 ? delete o[_] : o[_] !== void 0 && typeof o[_] == "object" && n(o[_], s.slice(1));
    }
    __name(n, "n");
    return t.forEach((o) => {
      let s = o.split(".");
      n(r2, s);
    }), r2;
  }
  static isObject(e) {
    return e !== null && typeof e == "object" && !Array.isArray(e);
  }
  static deepMerge(e, t, r2 = /* @__PURE__ */ new Map()) {
    if (this.isObject(e) && this.isObject(t)) for (let n in t) this.isObject(t[n]) ? (e[n] || (e[n] = {}), r2.has(t[n]) ? e[n] = r2.get(t[n]) : (r2.set(t[n], {}), this.deepMerge(e[n], t[n], r2))) : e[n] = t[n];
    return e;
  }
  static deepClone(e) {
    if (e == null || typeof e != "object") return e;
    if (e instanceof Date) return new Date(e.getTime());
    if (Array.isArray(e)) return e.map((t) => this.deepClone(t));
    if (typeof e == "function") return e;
    if (e instanceof Object) {
      let t = {};
      for (let r2 in e) e.hasOwnProperty(r2) && (t[r2] = this.deepClone(e[r2]));
      return t;
    }
    throw new Error("Unable to clone the object. Unsupported type.");
  }
  static deepCloneAndMerge(e, t) {
    if (t == null && e == null) return e;
    if (e == null && t) return this.deepClone(t);
    if (typeof e != "object") return e;
    if (e instanceof Date) return new Date(e.getTime());
    if (Array.isArray(e)) return e.map((r2) => this.deepCloneAndMerge(r2, t));
    if (typeof e == "function") return e;
    if (e instanceof Object) {
      let r2 = {};
      for (let n in e) t[n] !== null && t[n] !== void 0 ? r2[n] = this.deepCloneAndMerge(e[n], t[n]) : r2[n] = this.deepClone(e[n]);
      for (let n in t) e[n] !== void 0 && e[n] !== null ? r2[n] = this.deepCloneAndMerge(e[n], t[n]) : r2[n] = this.deepClone(t[n]);
      return r2;
    }
    throw new Error("Unable to clone the object. Unsupported type.");
  }
  static getComponentName(e) {
    if (e != null && !Array.isArray(e) && (typeof e == "object" || typeof e == "function")) {
      let t = Fe.get(e);
      if (t !== void 0) return t;
      let r2 = _a16._computeComponentName(e);
      return Fe.set(e, r2), r2;
    }
    return _a16._computeComponentName(e);
  }
  static _computeComponentName(e) {
    let t = "Unknown", r2 = "Anonymous";
    if (e == null) return t;
    if (typeof e == "string") return e || t;
    if (typeof e == "symbol") try {
      return e.toString();
    } catch {
      return t;
    }
    if (Array.isArray(e)) return e.length === 0 ? t : this.getComponentName(e[0]);
    if (typeof e == "function") {
      let n = e;
      if (n.displayName) return String(n.displayName);
      if (n.name) return String(n.name);
      if (n.constructor && n.constructor.name) return String(n.constructor.name);
      try {
        let s = Function.prototype.toString.call(e).match(/^(?:class\s+([A-Za-z0-9_$]+)|function\s+([A-Za-z0-9_$]+)|([A-Za-z0-9_$]+)\s*=>)/);
        if (s) return s[1] || s[2] || s[3] || r2;
      } catch {
      }
      return r2;
    }
    if (typeof e == "object") {
      let n = e;
      if (n.type) return this.getComponentName(n.type);
      if (n.displayName) return String(n.displayName);
      if (n.name) return String(n.name);
      if (n.constructor && n.constructor.name && n.constructor.name !== "Object") return String(n.constructor.name);
      try {
        let o = n.toString();
        if (typeof o == "string" && o !== "[object Object]") return o;
      } catch {
      }
      return r2;
    }
    try {
      return String(e);
    } catch {
      return t;
    }
  }
}, __name(_a16, "i"), _a16);
var _a17;
var ee = (_a17 = class extends Error {
}, __name(_a17, "ee"), _a17);
ee.CallerInitializationError = "Unable to initialize A-Caller";
var _a18;
var G = (_a18 = class {
  constructor(e) {
    this.validateParams(e), this._component = e;
  }
  get component() {
    return this._component;
  }
  validateParams(e) {
    if (!a.isAllowedForFeatureCall(e)) throw new ee(`[${ee.CallerInitializationError}]: Invalid A-Caller component provided of type: ${typeof e} with value: ${JSON.stringify(e).slice(0, 100)}...`);
  }
}, __name(_a18, "G"), _a18);
var _a19;
var T = (_a19 = class extends y {
}, __name(_a19, "T"), _a19);
T.InvalidDependencyTarget = "Invalid Dependency Target", T.InvalidLoadTarget = "Invalid Load Target", T.InvalidLoadPath = "Invalid Load Path", T.InvalidDefaultTarget = "Invalid Default Target", T.ResolutionParametersError = "Dependency Resolution Parameters Error";
function de(...i) {
  return function(e, t, r2) {
    let n = l.getComponentName(e);
    if (!a.isTargetAvailableForInjection(e)) throw new T(T.InvalidDefaultTarget, `A-Default cannot be used on the target of type ${typeof e} (${n})`);
    let o = t ? String(t) : "constructor", s;
    switch (true) {
      case (a.isComponentConstructor(e) || a.isComponentInstance(e)):
        s = "a-component-injections";
        break;
      case a.isContainerInstance(e):
        s = "a-container-injections";
        break;
      case a.isEntityInstance(e):
        s = "a-component-injections";
        break;
    }
    let _ = c.meta(e).get(s) || new m(), p = _.get(o) || [];
    p[r2].resolutionStrategy = { create: true, args: i }, _.set(o, p), c.meta(e).set(s, _);
  };
}
__name(de, "de");
function le() {
  return function(i, e, t) {
    let r2 = l.getComponentName(i);
    if (!a.isTargetAvailableForInjection(i)) throw new T(T.InvalidDependencyTarget, `A-Dependency cannot be used on the target of type ${typeof i} (${r2})`);
    let n = e ? String(e) : "constructor", o;
    switch (true) {
      case (a.isComponentConstructor(i) || a.isComponentInstance(i)):
        o = "a-component-injections";
        break;
      case a.isContainerInstance(i):
        o = "a-container-injections";
        break;
      case a.isEntityInstance(i):
        o = "a-component-injections";
        break;
    }
    let s = c.meta(i).get(o) || new m(), _ = s.get(n) || [];
    _[t].resolutionStrategy = { flat: true }, s.set(n, _), c.meta(i).set(o, s);
  };
}
__name(le, "le");
function Ae() {
  return function(i, e, t) {
    let r2 = l.getComponentName(i);
    if (!a.isTargetAvailableForInjection(i)) throw new T(T.InvalidLoadTarget, `A-Load cannot be used on the target of type ${typeof i} (${r2})`);
    let n = e ? String(e) : "constructor", o;
    switch (true) {
      case (a.isComponentConstructor(i) || a.isComponentInstance(i)):
        o = "a-component-injections";
        break;
      case a.isContainerInstance(i):
        o = "a-container-injections";
        break;
      case a.isEntityInstance(i):
        o = "a-component-injections";
        break;
    }
    let s = c.meta(i).get(o) || new m(), _ = s.get(n) || [];
    _[t].resolutionStrategy = { load: true }, s.set(n, _), c.meta(i).set(o, s);
  };
}
__name(Ae, "Ae");
function me(i = -1) {
  return function(e, t, r2) {
    let n = l.getComponentName(e);
    if (!a.isTargetAvailableForInjection(e)) throw new T(T.InvalidDependencyTarget, `A-Dependency cannot be used on the target of type ${typeof e} (${n})`);
    let o = t ? String(t) : "constructor", s;
    switch (true) {
      case (a.isComponentConstructor(e) || a.isComponentInstance(e)):
        s = "a-component-injections";
        break;
      case a.isContainerInstance(e):
        s = "a-container-injections";
        break;
      case a.isEntityInstance(e):
        s = "a-component-injections";
        break;
    }
    let _ = c.meta(e).get(s) || new m(), p = _.get(o) || [];
    p[r2].resolutionStrategy = { parent: i }, _.set(o, p), c.meta(e).set(s, _);
  };
}
__name(me, "me");
function Ee() {
  return function(i, e, t) {
    let r2 = l.getComponentName(i);
    if (!a.isTargetAvailableForInjection(i)) throw new T(T.InvalidDependencyTarget, `A-Dependency cannot be used on the target of type ${typeof i} (${r2})`);
    let n = e ? String(e) : "constructor", o;
    switch (true) {
      case (a.isComponentConstructor(i) || a.isComponentInstance(i)):
        o = "a-component-injections";
        break;
      case a.isContainerInstance(i):
        o = "a-container-injections";
        break;
      case a.isEntityInstance(i):
        o = "a-component-injections";
        break;
    }
    let s = c.meta(i).get(o) || new m(), _ = s.get(n) || [];
    _[t].resolutionStrategy = { require: true }, s.set(n, _), c.meta(i).set(o, s);
  };
}
__name(Ee, "Ee");
function fe() {
  return function(i, e, t) {
    let r2 = l.getComponentName(i);
    if (!a.isTargetAvailableForInjection(i)) throw new T(T.InvalidDependencyTarget, `A-All cannot be used on the target of type ${typeof i} (${r2})`);
    let n = e ? String(e) : "constructor", o;
    switch (true) {
      case (a.isComponentConstructor(i) || a.isComponentInstance(i)):
        o = "a-component-injections";
        break;
      case a.isContainerInstance(i):
        o = "a-container-injections";
        break;
      case a.isEntityInstance(i):
        o = "a-component-injections";
        break;
    }
    let s = c.meta(i).get(o) || new m(), _ = s.get(n) || [];
    _[t].resolutionStrategy = { pagination: { ..._[t].resolutionStrategy.pagination, count: -1 } }, s.set(n, _), c.meta(i).set(o, s);
  };
}
__name(fe, "fe");
function Te(i, e) {
  return function(t, r2, n) {
    let o = l.getComponentName(t);
    if (!a.isTargetAvailableForInjection(t)) throw new T(T.InvalidDependencyTarget, `A-All cannot be used on the target of type ${typeof t} (${o})`);
    let s = r2 ? String(r2) : "constructor", _;
    switch (true) {
      case (a.isComponentConstructor(t) || a.isComponentInstance(t)):
        _ = "a-component-injections";
        break;
      case a.isContainerInstance(t):
        _ = "a-container-injections";
        break;
      case a.isEntityInstance(t):
        _ = "a-component-injections";
        break;
    }
    let p = c.meta(t).get(_) || new m(), d2 = p.get(s) || [];
    d2[n].resolutionStrategy = { query: { ...d2[n].resolutionStrategy.query, ...i }, pagination: { ...d2[n].resolutionStrategy.pagination, ...e } }, p.set(s, d2), c.meta(t).set(_, p);
  };
}
__name(Te, "Te");
var _a20;
var F = (_a20 = class {
  constructor(e, t) {
    this._defaultPagination = { count: 1, from: "start" };
    this._defaultResolutionStrategy = { require: false, load: false, parent: 0, flat: false, create: false, args: [], query: {}, pagination: this._defaultPagination };
    this._name = typeof e == "string" ? e : l.getComponentName(e), this._target = typeof e == "string" ? void 0 : e, this.resolutionStrategy = t || {}, this.initCheck();
  }
  static get Required() {
    return Ee;
  }
  static get Loaded() {
    return Ae;
  }
  static get Default() {
    return de;
  }
  static get Parent() {
    return me;
  }
  static get Flat() {
    return le;
  }
  static get All() {
    return fe;
  }
  static get Query() {
    return Te;
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
    if (!this._resolutionStrategy) throw new T(T.ResolutionParametersError, `Resolution strategy parameters are not provided for dependency: ${this._name}`);
    return this;
  }
  toJSON() {
    return { name: this._name, all: this.all, require: this.require, load: this.load, parent: this.parent, flat: this.flat, create: this.create, args: this.args, query: this.query, pagination: this.pagination };
  }
}, __name(_a20, "F"), _a20);
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
    return typeof e == "function" && l.isInheritedFrom(e, z);
  }
  static isComponentConstructor(e) {
    return typeof e == "function" && l.isInheritedFrom(e, v);
  }
  static isFragmentConstructor(e) {
    return typeof e == "function" && l.isInheritedFrom(e, L);
  }
  static isEntityConstructor(e) {
    return typeof e == "function" && l.isInheritedFrom(e, O);
  }
  static isScopeConstructor(e) {
    return typeof e == "function" && l.isInheritedFrom(e, D);
  }
  static isErrorConstructor(e) {
    return typeof e == "function" && l.isInheritedFrom(e, Error);
  }
  static isFeatureConstructor(e) {
    return typeof e == "function" && l.isInheritedFrom(e, w);
  }
  static isCallerConstructor(e) {
    return typeof e == "function" && l.isInheritedFrom(e, G);
  }
  static isDependencyConstructor(e) {
    return typeof e == "function" && l.isInheritedFrom(e, F);
  }
  static isDependencyInstance(e) {
    return e instanceof F;
  }
  static isContainerInstance(e) {
    return e instanceof z;
  }
  static isComponentInstance(e) {
    return e instanceof v;
  }
  static isFeatureInstance(e) {
    return e instanceof w;
  }
  static isFragmentInstance(e) {
    return e instanceof L;
  }
  static isEntityInstance(e) {
    return e instanceof O;
  }
  static isScopeInstance(e) {
    return e instanceof D;
  }
  static isErrorInstance(e) {
    return e instanceof Error;
  }
  static isComponentMetaInstance(e) {
    return e instanceof R;
  }
  static isContainerMetaInstance(e) {
    return e instanceof H;
  }
  static isEntityMetaInstance(e) {
    return e instanceof B;
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
    return _a21.isFragmentConstructor(e) || l.isInheritedFrom(e, L) || _a21.isEntityConstructor(e) || l.isInheritedFrom(e, O);
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
}, __name(_a21, "i"), _a21);
function Se(i = {}) {
  return function(e, t, r2) {
    let n = l.getComponentName(e);
    if (!a.isAllowedForFeatureDefinition(e)) throw new E(E.FeatureDefinitionError, `A-Feature cannot be defined on the ${n} level`);
    let o = c.meta(e.constructor), s;
    switch (true) {
      case a.isEntityInstance(e):
        s = "a-component-features";
        break;
      case a.isContainerInstance(e):
        s = "a-container-features";
        break;
      case a.isComponentInstance(e):
        s = "a-component-features";
        break;
    }
    let _ = o.get(s) || new m(), p = i.name || t, d2 = i.invoke || false;
    _.set(t, { name: `${e.constructor.name}.${p}`, handler: t, invoke: d2, template: i.template && i.template.length ? i.template.map((S) => ({ ...S, before: S.before || "", after: S.after || "", behavior: S.behavior || "sync", throwOnError: true, override: S.override || "" })) : [] }), c.meta(e.constructor).set(s, _);
    let A = r2.value;
    return r2.value = function(...S) {
      if (d2) A.apply(this, S);
      else return A.apply(this, S);
      if (typeof this.call == "function" && d2) return this.call(p);
    }, r2;
  };
}
__name(Se, "Se");
function he(i) {
  return function(e, t, r2) {
    let n = l.getComponentName(e);
    if (!a.isAllowedForFeatureExtension(e)) throw new E(E.FeatureExtensionError, `A-Feature-Extend cannot be applied on the ${n} level`);
    let o, s = "sync", _ = "", p = "", d2 = "", A = [], S = [], Y = true, j;
    switch (true) {
      case a.isEntityInstance(e):
        j = "a-component-extensions";
        break;
      case a.isContainerInstance(e):
        j = "a-container-extensions";
        break;
      case a.isComponentInstance(e):
        j = "a-component-extensions";
        break;
    }
    switch (true) {
      case a.isRegExp(i):
        o = i;
        break;
      case (!!i && typeof i == "object"):
        Array.isArray(i.scope) ? A = i.scope : i.scope && typeof i.scope == "object" && (Array.isArray(i.scope.include) && (A = i.scope.include), Array.isArray(i.scope.exclude) && (S = i.scope.exclude)), o = Me(i, A, S, t), s = i.behavior || s, Y = i.throwOnError !== void 0 ? i.throwOnError : Y, _ = a.isArray(i.before) ? new RegExp(`^${i.before.join("|").replace(/\./g, "\\.")}$`).source : i.before instanceof RegExp ? i.before.source : "", p = a.isArray(i.after) ? new RegExp(`^${i.after.join("|").replace(/\./g, "\\.")}$`).source : i.after instanceof RegExp ? i.after.source : "", d2 = a.isArray(i.override) ? new RegExp(`^${i.override.join("|").replace(/\./g, "\\.")}$`).source : i.override instanceof RegExp ? i.override.source : "";
        break;
      default:
        o = new RegExp(`^.*${t.replace(/\./g, "\\.")}$`);
        break;
    }
    let C2 = c.meta(e).get(j), P = c.meta(e), J = P.get(j) ? new m().from(P.get(j)) : new m();
    if (C2 && C2.size() && C2.has(t) && C2.get(t).invoke) throw new E(E.FeatureExtensionError, `A-Feature-Extend cannot be used on the method "${t}" because it is already defined as a Feature with "invoke" set to true. Please remove the A-Feature-Extend decorator or set "invoke" to false in the A-Feature decorator.`);
    let Z = [...J.get(o.source) || []], se = i && typeof i == "object" && !a.isRegExp(i) && i.name || t;
    for (let [N, X] of J.entries()) {
      let ae = X.findIndex((Ie) => Ie.handler === t);
      if (N !== o.source && ae !== -1) {
        let be = String(N).match(/\\\.\s*([^\\.$]+)\$$/);
        (be ? be[1] : null) === se && (X.splice(ae, 1), X.length === 0 ? J.delete(N) : J.set(N, X));
      }
    }
    let q = Z.findIndex((N) => N.handler === t), ie = { name: o.source, handler: t, behavior: s, before: _, after: p, throwOnError: Y, override: d2 };
    q !== -1 ? Z[q] = ie : Z.push(ie), J.set(o.source, Z), c.meta(e).set(j, J);
  };
}
__name(he, "he");
function Me(i, e, t, r2) {
  let n = e.length ? `(${e.map((_) => _.name).join("|")})` : ".*", o = t.length ? `(?!${t.map((_) => _.name).join("|")})` : "", s = i.scope ? `^${o}${n}\\.${i.name || r2}$` : `.*\\.${i.name || r2}$`;
  return new RegExp(s);
}
__name(Me, "Me");
var Oe = ((s) => (s.PROCESSING = "PROCESSING", s.COMPLETED = "COMPLETED", s.FAILED = "FAILED", s.SKIPPED = "SKIPPED", s.INITIALIZED = "INITIALIZED", s.ABORTED = "ABORTED", s))(Oe || {});
var _a22;
var U = (_a22 = class extends y {
  static get CompileError() {
    return "Unable to compile A-Stage";
  }
}, __name(_a22, "U"), _a22);
U.ArgumentsResolutionError = "A-Stage Arguments Resolution Error";
var _a23;
var W = (_a23 = class {
  constructor(e, t) {
    this._status = "INITIALIZED";
    this._feature = e, this._definition = t;
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
  getStepArgs(e, t) {
    let r2 = t.dependency.target || e.resolveConstructor(t.dependency.name);
    return c.meta(r2).injections(t.handler).map((n) => {
      switch (true) {
        case a.isCallerConstructor(n.target):
          return this._feature.caller.component;
        case a.isFeatureConstructor(n.target):
          return this._feature;
        default:
          return e.resolve(n);
      }
    });
  }
  getStepComponent(e, t) {
    let { dependency: r2, handler: n } = t, o = e.resolve(r2) || this.feature.scope.resolve(r2);
    if (!o) throw new U(U.CompileError, `Unable to resolve component ${r2.name} from scope ${e.name}`);
    if (!o[n]) throw new U(U.CompileError, `Handler ${n} not found in ${o.constructor.name}`);
    return o;
  }
  callStepHandler(e, t) {
    let r2 = this.getStepComponent(t, e), n = this.getStepArgs(t, e);
    return { handler: r2[e.handler].bind(r2), params: n };
  }
  skip() {
    this._status = "SKIPPED";
  }
  process(e) {
    let t = a.isScopeInstance(e) ? e : this._feature.scope;
    if (!this.isProcessed) {
      this._status = "PROCESSING";
      let { handler: r2, params: n } = this.callStepHandler(this._definition, t), o = r2(...n);
      if (a.isPromiseInstance(o)) return new Promise(async (s, _) => {
        try {
          return await o, this.completed(), s();
        } catch (p) {
          let d2 = new y(p);
          return this.failed(d2), this._definition.throwOnError ? s() : _(d2);
        }
      });
      this.completed();
    }
  }
  completed() {
    this._status = "COMPLETED";
  }
  failed(e) {
    this._error = new y(e), this._status = "FAILED";
  }
  toJSON() {
    return { name: this.name, status: this.status };
  }
  toString() {
    return `A-Stage(${this._feature.name}::${this._definition.behavior}@${this._definition.handler})`;
  }
}, __name(_a23, "W"), _a23);
var _a24;
var te = (_a24 = class extends y {
}, __name(_a24, "te"), _a24);
te.CircularDependencyError = "A-StepManager Circular Dependency Error";
var _a25;
var oe = (_a25 = class {
  constructor(e) {
    this._uniqueIdMap = /* @__PURE__ */ new Map();
    this._isBuilt = false;
    this.entities = this.prepareSteps(e), this.graph = /* @__PURE__ */ new Map(), this.visited = /* @__PURE__ */ new Set(), this.tempMark = /* @__PURE__ */ new Set(), this.sortedEntities = [], this.assignUniqueIds();
  }
  prepareSteps(e) {
    return e.map((t) => ({ ...t, behavior: t.behavior || "sync", before: t.before || "", after: t.after || "", override: t.override || "", throwOnError: false }));
  }
  baseID(e) {
    return `${e.dependency.name}.${e.handler}`;
  }
  ID(e) {
    return this._uniqueIdMap.get(e) || this.baseID(e);
  }
  assignUniqueIds() {
    let e = /* @__PURE__ */ new Map();
    for (let r2 of this.entities) {
      let n = this.baseID(r2);
      e.set(n, (e.get(n) || 0) + 1);
    }
    let t = /* @__PURE__ */ new Map();
    for (let r2 of this.entities) {
      let n = this.baseID(r2);
      if (e.get(n) > 1) {
        let o = t.get(n) || 0;
        this._uniqueIdMap.set(r2, `${n}#${o}`), t.set(n, o + 1);
      } else this._uniqueIdMap.set(r2, n);
    }
  }
  buildGraph() {
    this._isBuilt || (this._isBuilt = true, this.entities = this.entities.filter((e, t, r2) => !r2.some((n, o) => {
      if (t === o || !n.override) return false;
      let s = new RegExp(n.override);
      return s.test(this.baseID(e)) || s.test(e.handler);
    })), this._uniqueIdMap.clear(), this.assignUniqueIds(), this.entities.forEach((e) => this.graph.set(this.ID(e), /* @__PURE__ */ new Set())), this.entities.forEach((e) => {
      let t = this.ID(e);
      e.before && this.matchEntities(t, e.before).forEach((n) => {
        this.graph.has(n) || this.graph.set(n, /* @__PURE__ */ new Set()), this.graph.get(n).add(t);
      }), e.after && this.matchEntities(t, e.after).forEach((n) => {
        this.graph.has(t) || this.graph.set(t, /* @__PURE__ */ new Set()), this.graph.get(t).add(n);
      });
    }));
  }
  matchEntities(e, t) {
    let r2 = new RegExp(t);
    return this.entities.filter((n) => r2.test(this.baseID(n)) && this.ID(n) !== e).map((n) => this.ID(n));
  }
  visit(e) {
    this.tempMark.has(e) || this.visited.has(e) || (this.tempMark.add(e), (this.graph.get(e) || []).forEach((t) => this.visit(t)), this.tempMark.delete(e), this.visited.add(e), this.sortedEntities.push(e));
  }
  toSortedArray() {
    return this.buildGraph(), this.entities.forEach((e) => {
      this.visited.has(this.ID(e)) || this.visit(this.ID(e));
    }), this.sortedEntities;
  }
  toSortedSteps() {
    return this.toSortedArray().map((t) => this.entities.find((r2) => this.ID(r2) === t));
  }
  toStages(e) {
    return this.toSortedArray().map((r2) => {
      let n = this.entities.find((o) => this.ID(o) === r2);
      return new W(e, n);
    });
  }
}, __name(_a25, "oe"), _a25);
var _a26;
var w = (_a26 = class {
  constructor(e) {
    this._stages = [];
    this._index = 0;
    this._state = "INITIALIZED";
    this._scopeAllocated = false;
    this.validateParams(e), this.getInitializer(e).call(this, e);
  }
  static get Define() {
    return Se;
  }
  static get Extend() {
    return he;
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
    let t, r2 = e.scope;
    try {
      e.component && (t = c.scope(e.component));
    } catch (o) {
      if (!r2) throw o;
    }
    t && r2 && !r2.isInheritedFrom(t) && r2.inherit(t), this._caller = new G(e.component || new v()), this._effectiveScope = t || r2;
    let n = c.getSortedStepsFor(e.template);
    n || (this._SM = new oe(e.template), n = this._SM.toSortedSteps(), c.setSortedStepsFor(e.template, n)), this._stages = n.map((o) => new W(this, o)), this._current = this._stages[0];
  }
  fromComponent(e) {
    if (!e.component || !a.isAllowedForFeatureDefinition(e.component)) throw new E(E.FeatureInitializationError, `Invalid A-Feature component provided of type: ${typeof e.component} with value: ${JSON.stringify(e.component)?.slice(0, 100)}...`);
    this._name = e.name;
    let t, r2 = e.scope;
    try {
      t = c.scope(e.component);
    } catch (_) {
      if (!r2) throw _;
    }
    t && r2 && !r2.isInheritedFrom(t) && r2.inherit(t), this._caller = new G(e.component);
    let n = t || r2, o = c.featureTemplate(this._name, this._caller.component, n), s = c.getSortedStepsFor(o);
    s || (this._SM = new oe(o), s = this._SM.toSortedSteps(), c.setSortedStepsFor(o, s)), this._effectiveScope = n, this._stages = s.map((_) => new W(this, _)), this._current = this._stages[0];
  }
  process(e) {
    try {
      if (this.isProcessed) return;
      this._state = "PROCESSING";
      for (let t of this) {
        if (this.state === "INTERRUPTED") return;
        let r2;
        try {
          r2 = t.process(e);
        } catch (n) {
          throw this.createStageError(n, t);
        }
        if (a.isPromiseInstance(r2)) return r2.then(() => {
          if (this.state !== "INTERRUPTED") return this.processRemainingStagesAsync(e);
        }).catch((n) => {
          throw this.createStageError(n, t);
        });
      }
      this.state !== "INTERRUPTED" && this.completed();
    } catch (t) {
      throw this.failed(new E({ title: E.FeatureProcessingError, description: `An error occurred while processing the A-Feature: ${this.name}. Failed at stage: ${this.stage?.name || "N/A"}.`, stage: this.stage, originalError: t }));
    }
  }
  async processRemainingStagesAsync(e) {
    for (let t of this) {
      if (this.state === "INTERRUPTED") return;
      try {
        let r2 = t.process(e);
        a.isPromiseInstance(r2) && await r2;
      } catch (r2) {
        throw this.createStageError(r2, t);
      }
    }
    this.state !== "INTERRUPTED" && this.completed();
  }
  createStageError(e, t) {
    return this.failed(new E({ title: E.FeatureProcessingError, description: `An error occurred while processing the A-Feature: ${this.name}. Failed at stage: ${t.name}.`, stage: t, originalError: e })), new E({ title: E.FeatureProcessingError, description: `An error occurred while processing the A-Feature: ${this.name}. Failed at stage: ${t.name}.`, stage: t, originalError: e });
  }
  next(e) {
    let t = this._stages.indexOf(e);
    this._index = t + 1, this._index >= this._stages.length && this.completed();
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
  chain(e, t, r2) {
    let n, o;
    e instanceof _a26 ? (n = e, o = t instanceof D ? t : void 0) : (n = new _a26({ name: t, component: e }), o = r2 instanceof D ? r2 : void 0);
    let s = o || this.scope;
    n._caller = this._caller;
    let _ = n.process(s);
    return a.isPromiseInstance(_) ? _.catch((p) => {
      throw p;
    }) : _;
  }
  toString() {
    return `A-Feature(${this.caller.component?.constructor?.name || "Unknown"}::${this.name})`;
  }
}, __name(_a26, "i"), _a26);
var _a27;
var v = (_a27 = class {
  call(e, t) {
    return new w({ name: e, component: this }).process(t);
  }
}, __name(_a27, "v"), _a27);
var ge = ((n) => (n.EXTENSIONS = "a-component-extensions", n.FEATURES = "a-component-features", n.INJECTIONS = "a-component-injections", n.ABSTRACTIONS = "a-component-abstractions", n))(ge || {});
var _a28;
var R = (_a28 = class extends m {
  injections(e) {
    return this.get("a-component-injections")?.get(e) || [];
  }
  extensions(e) {
    let t = [];
    return this.get("a-component-extensions")?.find(e).forEach(([n, o]) => {
      o.forEach((s) => {
        t.push({ name: s.name, handler: s.handler, behavior: s.behavior, before: s.before || "", after: s.after || "", throwOnError: s.throwOnError || true, override: s.override || "" });
      });
    }), t;
  }
  features() {
    return this.get("a-component-features")?.toArray().map(([, t]) => t) || [];
  }
  abstractions(e) {
    let t = [], r2 = this.get("a-component-abstractions"), n = this.get("a-component-injections");
    return r2?.find(`CONCEPT_ABSTRACTION::${e}`).forEach(([o, s]) => {
      s.forEach((_) => {
        let p = n?.get(_.handler) || [];
        t.push({ ..._, args: p });
      });
    }), t;
  }
}, __name(_a28, "R"), _a28);
var ve = /* @__PURE__ */ new Set();
var De = /* @__PURE__ */ new Set();
var _a29;
var D = (_a29 = class {
  constructor(e, t) {
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
    this.getInitializer(e).call(this, e, t);
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
    let t = this._version;
    this._parent && (t += this._parent.aggregateVersion(e));
    for (let r2 of this._imports) t += r2.aggregateVersion(e);
    return t;
  }
  computeFingerprint(e) {
    if (e.has(this)) return "~circular~";
    e.add(this);
    let t = [];
    t.push("P:" + (this._parent ? this._parent.computeFingerprint(e) : "-"));
    let r2 = Array.from(this._allowedComponents).map((A) => l.getComponentName(A.name)).sort();
    t.push("AC:" + r2.join(","));
    let n = Array.from(this._allowedEntities).map((A) => l.getComponentName(A.name)).sort();
    t.push("AE:" + n.join(","));
    let o = Array.from(this._allowedFragments).map((A) => l.getComponentName(A.name)).sort();
    t.push("AF:" + o.join(","));
    let s = Array.from(this._allowedErrors).map((A) => l.getComponentName(A.name)).sort();
    t.push("AR:" + s.join(","));
    let _ = Array.from(this._imports).map((A) => A.computeFingerprint(e)).sort();
    t.push("I:" + _.join(","));
    let p = t.join("|"), d2 = 5381;
    for (let A = 0; A < p.length; A++) d2 = (d2 << 5) + d2 + p.charCodeAt(A) | 0;
    return (d2 >>> 0).toString(16);
  }
  *parents() {
    let e = this._parent;
    for (; e; ) yield e, e = e._parent;
  }
  parentOffset(e) {
    let t = this;
    for (; e <= -1 && t; ) t = t.parent, e++;
    return t;
  }
  getInitializer(e, t) {
    switch (true) {
      case (!e && !t):
        return this.defaultInitialized;
      case !!e:
        return this.defaultInitialized;
      default:
        throw new f(f.ConstructorError, "Invalid parameters provided to A_Scope constructor");
    }
  }
  defaultInitialized(e = {}, t = {}) {
    this._name = e.name || this.constructor.name, this.initComponents(e.components), this.initErrors(e.errors), this.initFragments(e.fragments), this.initEntities(e.entities), this.initMeta(e.meta), t.parent && (this._parent = t.parent);
  }
  initComponents(e) {
    e?.forEach(this.register.bind(this));
  }
  initErrors(e) {
    e?.forEach(this.register.bind(this));
  }
  initEntities(e) {
    e?.forEach((t) => this.register(t));
  }
  initFragments(e) {
    e?.forEach(this.register.bind(this));
  }
  initMeta(e) {
    e && Object.entries(e).forEach(([t, r2]) => {
      this._meta.set(t, r2);
    });
  }
  destroy() {
    this._components.forEach((e) => c.deregister(e)), this._fragments.forEach((e) => c.deregister(e)), this._entities.forEach((e) => c.deregister(e)), this._components.clear(), this._errors.clear(), this._fragments.clear(), this._entities.clear(), this._imports.clear(), this.bumpVersion();
  }
  get(e) {
    return this._meta.get(e);
  }
  set(e, t) {
    this._meta.set(e, t);
  }
  issuer() {
    return c.issuer(this);
  }
  inherit(e) {
    if (!e) throw new f(f.InitializationError, "Invalid parent scope provided");
    if (e === this) throw new f(f.CircularInheritanceError, `Unable to inherit scope ${this.name} from itself`);
    if (e === this._parent) return this;
    let t = this.checkCircularInheritance(e);
    if (t) throw new f(f.CircularInheritanceError, `Circular inheritance detected: ${[...t, e.name].join(" -> ")}`);
    return this._parent = e, this.bumpVersion(), this;
  }
  import(...e) {
    return e.forEach((t) => {
      if (t === this) throw new f(f.CircularImportError, `Unable to import scope ${this.name} into itself`);
      this._imports.has(t) || (this._imports.add(t), this.bumpVersion());
    }), this;
  }
  deimport(...e) {
    return e.forEach((t) => {
      this._imports.has(t) && (this._imports.delete(t), this.bumpVersion());
    }), this;
  }
  has(e) {
    let t = this.hasFlat(e);
    if (!t && this._parent) try {
      return this._parent.has(e);
    } catch {
      return false;
    }
    return t;
  }
  hasFlat(e) {
    let t = false;
    switch (true) {
      case a.isScopeConstructor(e):
        return true;
      case a.isString(e): {
        Array.from(this.allowedComponents).find((_) => _.name === e) && (t = true), Array.from(this.allowedFragments).find((_) => _.name === e) && (t = true), Array.from(this.allowedEntities).find((_) => _.name === e) && (t = true), Array.from(this.allowedErrors).find((_) => _.name === e) && (t = true);
        break;
      }
      case a.isComponentConstructor(e): {
        t = this.isAllowedComponent(e) || !!c.findDescendantIn(e, this.allowedComponents);
        break;
      }
      case a.isEntityConstructor(e): {
        t = this.isAllowedEntity(e) || !!c.findDescendantIn(e, this.allowedEntities);
        break;
      }
      case a.isFragmentConstructor(e): {
        t = this.isAllowedFragment(e) || !!c.findDescendantIn(e, this.allowedFragments);
        break;
      }
      case a.isErrorConstructor(e): {
        t = this.isAllowedError(e) || !!c.findDescendantIn(e, this.allowedErrors);
        break;
      }
      case (this.issuer() && (this.issuer().constructor === e || c.isIndexedInheritedFrom(this.issuer().constructor, e))): {
        t = true;
        break;
      }
    }
    return t;
  }
  resolveDependency(e) {
    let t = [], r2 = this.parentOffset(e.parent) || this;
    switch (true) {
      case (e.flat && !e.all): {
        let d2 = r2.resolveFlatOnce(e.target || e.name);
        d2 && (t = [d2]);
        break;
      }
      case (e.flat && e.all): {
        t = r2.resolveFlatAll(e.target || e.name);
        break;
      }
      case (!e.flat && !e.all): {
        let d2 = r2.resolveOnce(e.target || e.name);
        d2 && (t = [d2]);
        break;
      }
      case (!e.flat && e.all): {
        t = r2.resolveAll(e.target || e.name);
        break;
      }
      default:
        t = [];
    }
    if (e.create && !t.length && a.isAllowedForDependencyDefaultCreation(e.target)) {
      let d2 = new e.target(...e.args);
      r2.register(d2), t.push(d2);
    }
    if (e.require && !t.length) throw new f(f.ResolutionError, `Dependency ${e.name} is required but could not be resolved in scope ${r2.name}`);
    e.query.aseid ? t = t.filter((d2) => a.hasASEID(d2) && I.compare(d2.aseid, e.query.aseid)) : Object.keys(e.query).length > 0 && (t = t.filter((d2) => {
      let A = e.query;
      return A ? Object.entries(A).every(([S, Y]) => d2[S] === Y) : true;
    }));
    let n = e.pagination.count, o = e.pagination.from, s = o === "end" ? n === -1 ? 0 : Math.max(t.length - n, 0) : 0, _ = o === "end" || n === -1 ? t.length : Math.min(n, t.length), p = t.slice(s, _);
    return p.length === 1 && n !== -1 ? p[0] : p.length ? p : void 0;
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
    let t = e;
    if (this._resolveConstructorCache.has(t)) {
      let n = this._resolveConstructorCache.get(t);
      return n === null ? void 0 : n;
    }
    let r2 = this._resolveConstructorUncached(e);
    return this._resolveConstructorCache.set(t, r2 ?? null), r2;
  }
  _resolveConstructorUncached(e) {
    let t = Array.from(this.allowedComponents).find((o) => o.name === e || o.name === h.toPascalCase(e));
    if (t) return t;
    {
      let o = h.toPascalCase(e), s = Array.from(this.allowedComponents).find((_) => {
        let p = c.getAncestors(_);
        if (!p) return false;
        for (let d2 of p) if (d2.name === e || d2.name === o) return true;
        return false;
      });
      if (s) return s;
    }
    let r2 = Array.from(this.allowedEntities).find((o) => o.name === e || o.name === h.toPascalCase(e) || o.entity === e || o.entity === h.toKebabCase(e));
    if (r2) return r2;
    {
      let o = h.toPascalCase(e), s = Array.from(this.allowedEntities).find((_) => {
        let p = c.getAncestors(_);
        if (!p) return false;
        for (let d2 of p) if (d2.name === e || d2.name === o) return true;
        return false;
      });
      if (s) return s;
    }
    let n = Array.from(this.allowedFragments).find((o) => o.name === e || o.name === h.toPascalCase(e));
    if (n) return n;
    {
      let o = h.toPascalCase(e), s = Array.from(this.allowedFragments).find((_) => {
        let p = c.getAncestors(_);
        if (!p) return false;
        for (let d2 of p) if (d2.name === e || d2.name === o) return true;
        return false;
      });
      if (s) return s;
    }
    for (let o of this._imports) {
      let s = o.resolveConstructor(e);
      if (s) return s;
    }
    if (this._parent) return this._parent.resolveConstructor(e);
  }
  resolveAll(e) {
    if (this._resolveAllCache.has(e)) return this._resolveAllCache.get(e);
    let t = /* @__PURE__ */ new Set();
    this.resolveFlatAll(e).forEach((s) => t.add(s)), this._imports.forEach((s) => {
      s.has(e) && s.resolveFlatAll(e).forEach((p) => t.add(p));
    });
    let n = this._parent;
    for (; n && n.has(e); ) n.resolveAll(e).forEach((_) => t.add(_)), n = n._parent;
    let o = Array.from(t);
    return this._resolveAllCache.set(e, o), o;
  }
  resolveFlatAll(e) {
    if (this._resolveFlatAllCache.has(e)) return this._resolveFlatAllCache.get(e);
    let t = [];
    switch (true) {
      case a.isComponentConstructor(e): {
        this.allowedComponents.forEach((r2) => {
          if (c.isIndexedInheritedFrom(r2, e)) {
            let n = this.resolveOnce(r2);
            n && t.push(n);
          }
        });
        break;
      }
      case a.isFragmentConstructor(e): {
        this.allowedFragments.forEach((r2) => {
          if (c.isIndexedInheritedFrom(r2, e)) {
            let n = this.resolveOnce(r2);
            n && t.push(n);
          }
        });
        break;
      }
      case a.isEntityConstructor(e): {
        this.entities.forEach((r2) => {
          c.isIndexedInheritedFrom(r2.constructor, e) && t.push(r2);
        });
        break;
      }
      case a.isString(e): {
        let r2 = this.resolveConstructor(e);
        if (!a.isComponentConstructor(r2) && !a.isEntityConstructor(r2) && !a.isFragmentConstructor(r2)) throw new f(f.ResolutionError, `Unable to resolve all instances for name: ${e} in scope ${this.name} as no matching component, entity or fragment constructor found`);
        if (r2) {
          let n = this.resolveAll(r2);
          n && t.push(...n);
        }
        break;
      }
      default:
        throw new f(f.ResolutionError, `Invalid parameter provided to resolveAll method: ${e} in scope ${this.name}`);
    }
    return this._resolveFlatAllCache.set(e, t), t;
  }
  resolve(e) {
    let t = a.isDependencyInstance(e) ? e : new F(e);
    return this.resolveDependency(t);
  }
  resolveOnce(e) {
    if (this._resolveCache.has(e)) return this._resolveCache.get(e);
    let t = this.resolveFlatOnce(e);
    if (!t) {
      for (let r2 of this._imports) if (r2.has(e)) {
        let n = r2.resolveFlatOnce(e);
        if (n) return this._resolveCache.set(e, n), n;
      }
    }
    if (!t && this.parent) {
      let r2 = this.parent.resolveOnce(e);
      return this._resolveCache.set(e, r2), r2;
    }
    return this._resolveCache.set(e, t), t;
  }
  resolveFlat(e) {
    return this.resolveFlatOnce(e);
  }
  resolveFlatOnce(e) {
    let t;
    if (!(!e || !this.hasFlat(e))) {
      switch (true) {
        case a.isString(e): {
          t = this.resolveByName(e);
          break;
        }
        case a.isConstructorAllowedForScopeAllocation(e): {
          t = this.resolveIssuer(e);
          break;
        }
        case a.isScopeConstructor(e): {
          t = this.resolveScope(e);
          break;
        }
        case a.isEntityConstructor(e): {
          t = this.resolveEntity(e);
          break;
        }
        case a.isFragmentConstructor(e): {
          t = this.resolveFragment(e);
          break;
        }
        case a.isComponentConstructor(e): {
          t = this.resolveComponent(e);
          break;
        }
        case a.isErrorConstructor(e): {
          t = this.resolveError(e);
          break;
        }
        default:
          throw new f(f.ResolutionError, `Injected Component ${l.getComponentName(e)} not found in the scope`);
      }
      return t;
    }
  }
  resolveByName(e) {
    let t = Array.from(this.allowedComponents).find((s) => s.name === e || s.name === h.toPascalCase(e));
    if (t) return this.resolveOnce(t);
    let r2 = Array.from(this.allowedEntities).find((s) => s.name === e || s.name === h.toPascalCase(e) || s.entity === e || s.entity === h.toKebabCase(e));
    if (r2) return this.resolveOnce(r2);
    let n = Array.from(this.allowedFragments).find((s) => s.name === e || s.name === h.toPascalCase(e));
    if (n) return this.resolveOnce(n);
    let o = Array.from(this.allowedErrors).find((s) => s.name === e || s.name === h.toPascalCase(e) || s.code === e || s.code === h.toKebabCase(e));
    if (o) return this.resolveOnce(o);
  }
  resolveIssuer(e) {
    let t = this.issuer();
    if (t && (t.constructor === e || c.isIndexedInheritedFrom(t?.constructor, e))) return t;
  }
  resolveEntity(e) {
    return this.entities.find((t) => t instanceof e);
  }
  resolveError(e) {
    return this.errors.find((t) => t instanceof e);
  }
  resolveFragment(e) {
    let t = this._fragments.get(e);
    switch (true) {
      case (t && this._fragments.has(e)):
        return t;
      case !t: {
        let r2 = c.findDescendantIn(e, this._allowedFragments);
        return r2 ? this.resolveFragment(r2) : void 0;
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
        let n = (c.meta(e).get("a-component-injections")?.get("constructor") || []).map((s) => this.resolve(s)), o = new e(...n);
        return this.register(o), this._components.get(e);
      }
      case !this.allowedComponents.has(e): {
        let t = c.findDescendantIn(e, this.allowedComponents);
        return t ? this.resolveComponent(t) : void 0;
      }
      default:
        return;
    }
  }
  register(e) {
    switch (true) {
      case e instanceof v: {
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
        if (e instanceof O) throw new f(f.RegistrationError, `Entity with ASEID ${e.aseid.toString()} is already registered in the scope ${this.name}`);
        if (e instanceof L) throw new f(f.RegistrationError, `Fragment ${e.constructor.name} is already registered in the scope ${this.name}`);
        {
          let t = l.getComponentName(e);
          throw new f(f.RegistrationError, `Cannot register ${t} in the scope ${this.name}`);
        }
    }
  }
  deregister(e) {
    switch (true) {
      case e instanceof v: {
        this._components.delete(e.constructor), c.deregister(e);
        let r2 = e.constructor;
        this._components.has(r2) || this.allowedComponents.delete(r2), this.bumpVersion();
        break;
      }
      case a.isEntityInstance(e): {
        this._entities.delete(e.aseid.toString()), c.deregister(e);
        let r2 = e.constructor;
        Array.from(this._entities.values()).some((o) => o instanceof r2) || this.allowedEntities.delete(r2), this.bumpVersion();
        break;
      }
      case a.isFragmentInstance(e): {
        this._fragments.delete(e.constructor), c.deregister(e);
        let r2 = e.constructor;
        Array.from(this._fragments.values()).some((o) => o instanceof r2) || this.allowedFragments.delete(r2), this.bumpVersion();
        break;
      }
      case a.isErrorInstance(e): {
        this._errors.delete(e.code), c.deregister(e);
        let r2 = e.constructor;
        Array.from(this._errors.values()).some((o) => o instanceof r2) || this.allowedErrors.delete(r2), this.bumpVersion();
        break;
      }
      case a.isComponentConstructor(e): {
        this.allowedComponents.delete(e), this.bumpVersion();
        break;
      }
      case a.isFragmentConstructor(e): {
        this.allowedFragments.delete(e), Array.from(this._fragments.entries()).forEach(([r2, n]) => {
          c.isIndexedInheritedFrom(r2, e) && (this._fragments.delete(r2), c.deregister(n));
        }), this.bumpVersion();
        break;
      }
      case a.isEntityConstructor(e): {
        this.allowedEntities.delete(e), Array.from(this._entities.entries()).forEach(([r2, n]) => {
          c.isIndexedInheritedFrom(n.constructor, e) && (this._entities.delete(r2), c.deregister(n));
        }), this.bumpVersion();
        break;
      }
      case a.isErrorConstructor(e): {
        this.allowedErrors.delete(e), Array.from(this._errors.entries()).forEach(([r2, n]) => {
          c.isIndexedInheritedFrom(n.constructor, e) && (this._errors.delete(r2), c.deregister(n));
        }), this.bumpVersion();
        break;
      }
      default:
        let t = l.getComponentName(e);
        throw new f(f.DeregistrationError, `Cannot deregister ${t} from the scope ${this.name}`);
    }
  }
  toJSON() {
    return this.fragments.reduce((e, t) => {
      let r2 = t.toJSON();
      return { ...e, [r2.name]: r2 };
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
    let t = this;
    for (; t; ) {
      if (t === e) return true;
      t = t._parent;
    }
    return false;
  }
  checkCircularInheritance(e) {
    let t = [], r2 = this._parent;
    for (; r2; ) {
      if (t.push(r2.name), r2 === e) return t;
      r2 = r2._parent;
    }
    return false;
  }
  printInheritanceChain() {
    let e = [], t = this;
    for (; t; ) e.push(t.name), t = t._parent;
    console.log(e.join(" -> "));
  }
}, __name(_a29, "D"), _a29);
var _a30;
var f = (_a30 = class extends y {
}, __name(_a30, "f"), _a30);
f.InitializationError = "A-Scope Initialization Error", f.ConstructorError = "Unable to construct A-Scope instance", f.ResolutionError = "A-Scope Resolution Error", f.RegistrationError = "A-Scope Registration Error", f.CircularInheritanceError = "A-Scope Circular Inheritance Error", f.CircularImportError = "A-Scope Circular Import Error", f.DeregistrationError = "A-Scope Deregistration Error";
var _a31;
var u = (_a31 = class extends y {
}, __name(_a31, "u"), _a31);
u.NotAllowedForScopeAllocationError = "Component is not allowed for scope allocation", u.ComponentAlreadyHasScopeAllocatedError = "Component already has scope allocated", u.InvalidMetaParameterError = "Invalid parameter provided to get meta", u.InvalidScopeParameterError = "Invalid parameter provided to get scope", u.ScopeNotFoundError = "Scope not found", u.InvalidFeatureParameterError = "Invalid parameter provided to get feature", u.InvalidFeatureDefinitionParameterError = "Invalid parameter provided to define feature", u.InvalidFeatureTemplateParameterError = "Invalid parameter provided to get feature template", u.InvalidFeatureExtensionParameterError = "Invalid parameter provided to extend feature", u.InvalidAbstractionParameterError = "Invalid parameter provided to get abstraction", u.InvalidAbstractionDefinitionParameterError = "Invalid parameter provided to define abstraction", u.InvalidAbstractionTemplateParameterError = "Invalid parameter provided to get abstraction template", u.InvalidAbstractionExtensionParameterError = "Invalid parameter provided to extend abstraction", u.InvalidInjectionParameterError = "Invalid parameter provided to get injections", u.InvalidExtensionParameterError = "Invalid parameter provided to get extensions", u.InvalidRegisterParameterError = "Invalid parameter provided to register component", u.InvalidComponentParameterError = "Invalid component provided", u.ComponentNotRegisteredError = "Component not registered in the context", u.InvalidDeregisterParameterError = "Invalid parameter provided to deregister component";
var _a32;
var x = (_a32 = class {
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
  static register(e, t) {
    let r2 = l.getComponentName(t), n = this.getInstance();
    if (!t) throw new u(u.InvalidRegisterParameterError, "Unable to register component. Component cannot be null or undefined.");
    if (!e) throw new u(u.InvalidRegisterParameterError, "Unable to register component. Scope cannot be null or undefined.");
    if (!this.isAllowedToBeRegistered(t)) throw new u(u.NotAllowedForScopeAllocationError, `Component ${r2} is not allowed for scope allocation.`);
    return n._scopeStorage.set(t, e), e;
  }
  static deregister(e) {
    if (!e) throw new u(u.InvalidDeregisterParameterError, "Unable to deregister component. Component cannot be null or undefined.");
    if (!this.getInstance()._scopeStorage.delete(e)) {
      let r2 = l.getComponentName(e);
      throw new u(u.ComponentNotRegisteredError, `Unable to deregister component. Component ${r2} is not registered.`);
    }
  }
  static allocate(e, t) {
    let r2 = l.getComponentName(e);
    if (!this.isAllowedForScopeAllocation(e)) throw new u(u.NotAllowedForScopeAllocationError, `Component of type ${r2} is not allowed for scope allocation. Only A_Container, A_Feature are allowed.`);
    let n = this.getInstance();
    if (n._registry.has(e)) throw new u(u.ComponentAlreadyHasScopeAllocatedError, `Component ${r2} already has a scope allocated.`);
    let o = a.isScopeInstance(t) ? t : new D(t || { name: r2 + "-scope" }, t);
    return o.isInheritedFrom(_a32.root) || o.inherit(_a32.root), n._registry.set(e, o), n._scopeIssuers.set(o, e), o;
  }
  static deallocate(e) {
    let t = this.getInstance(), r2 = a.isScopeInstance(e) ? e : t._registry.get(e);
    if (!r2) return;
    let n = a.isComponentInstance(e) ? e : this.issuer(r2);
    n && t._registry.delete(n), r2 && t._scopeIssuers.delete(r2);
  }
  static meta(e) {
    let t = l.getComponentName(e), r2 = this.getInstance();
    if (!e) throw new u(u.InvalidMetaParameterError, "Invalid parameter provided to get meta. Parameter cannot be null or undefined.");
    if (!(this.isAllowedForMeta(e) || this.isAllowedForMetaConstructor(e) || a.isString(e) || a.isFunction(e))) throw new u(u.InvalidMetaParameterError, `Invalid parameter provided to get meta. Component of type ${t} is not allowed for meta storage. Only A_Container, A_Component and A_Entity are allowed.`);
    let n, o;
    switch (true) {
      case a.isContainerInstance(e): {
        n = e.constructor, o = H;
        break;
      }
      case a.isContainerConstructor(e): {
        n = e, o = H;
        break;
      }
      case a.isComponentInstance(e): {
        n = e.constructor, o = R;
        break;
      }
      case a.isComponentConstructor(e): {
        n = e, o = R;
        break;
      }
      case a.isEntityInstance(e): {
        n = e.constructor, o = R;
        break;
      }
      case a.isEntityConstructor(e): {
        n = e, o = B;
        break;
      }
      case a.isFragmentInstance(e): {
        n = e.constructor, o = R;
        break;
      }
      case a.isFragmentConstructor(e): {
        n = e, o = B;
        break;
      }
      case typeof e == "string": {
        let s = Array.from(r2._metaStorage).find(([_]) => _.name === e || _.name === h.toKebabCase(e) || _.name === h.toPascalCase(e));
        if (!(s && s.length)) throw new u(u.InvalidMetaParameterError, `Invalid parameter provided to get meta. Component with name ${e} not found in the meta storage.`);
        n = s[0], o = R;
        break;
      }
      default: {
        n = e, o = m;
        break;
      }
    }
    if (!r2._metaStorage.has(n)) {
      let s, _ = n;
      for (; !s; ) {
        let p = Object.getPrototypeOf(_);
        if (!p) break;
        s = r2._metaStorage.get(p), _ = p;
      }
      s || (s = new o()), r2._metaStorage.set(n, s.clone()), r2._metaVersion++, this.indexConstructor(n);
    }
    return r2._metaStorage.get(n);
  }
  static setMeta(e, t) {
    let r2 = _a32.getInstance(), n = _a32.meta(e), o = typeof e == "function" ? e : e.constructor;
    r2._metaStorage.set(o, n ? t.from(n) : t), r2._metaVersion++;
  }
  static issuer(e) {
    let t = this.getInstance();
    if (!e) throw new u(u.InvalidComponentParameterError, "Invalid parameter provided to get scope issuer. Parameter cannot be null or undefined.");
    return t._scopeIssuers.get(e);
  }
  static scope(e) {
    let t = e?.constructor?.name || String(e), r2 = this.getInstance();
    if (!e) throw new u(u.InvalidScopeParameterError, "Invalid parameter provided to get scope. Parameter cannot be null or undefined.");
    if (!this.isAllowedForScopeAllocation(e) && !this.isAllowedToBeRegistered(e)) throw new u(u.InvalidScopeParameterError, `Invalid parameter provided to get scope. Component of type ${t} is not allowed for scope allocation.`);
    switch (true) {
      case this.isAllowedToBeRegistered(e):
        if (!r2._scopeStorage.has(e)) throw new u(u.ScopeNotFoundError, `Invalid parameter provided to get scope. Component of type ${t} does not have a scope registered. Make sure to register the component using A_Context.register() method before trying to get the scope.`);
        return r2._scopeStorage.get(e);
      case this.isAllowedForScopeAllocation(e):
        if (!r2._registry.has(e)) throw new u(u.ScopeNotFoundError, `Invalid parameter provided to get scope. Component of type ${t} does not have a scope allocated. Make sure to allocate a scope using A_Context.allocate() method before trying to get the scope.`);
        return r2._registry.get(e);
      default:
        throw new u(u.InvalidScopeParameterError, `Invalid parameter provided to get scope. Component of type ${t} is not allowed to be registered.`);
    }
  }
  static getSortedStepsFor(e) {
    return this.getInstance()._sortedStepsForTemplate.get(e);
  }
  static setSortedStepsFor(e, t) {
    this.getInstance()._sortedStepsForTemplate.set(e, t);
  }
  static featureTemplate(e, t, r2 = this.scope(t)) {
    if (!t) throw new u(u.InvalidFeatureTemplateParameterError, "Unable to get feature template. Component cannot be null or undefined.");
    if (!e) throw new u(u.InvalidFeatureTemplateParameterError, "Unable to get feature template. Feature name cannot be null or undefined.");
    if (!a.isAllowedForFeatureDefinition(t)) throw new u(u.InvalidFeatureTemplateParameterError, `Unable to get feature template. Component of type ${l.getComponentName(t)} is not allowed for feature definition.`);
    let n = this.getInstance(), o = typeof t == "function" ? t : t.constructor, s = n._featureCache.get(o);
    if (s) {
      let A = `${String(e)}::s${r2.fingerprint}::m${n._metaVersion}`, S = s.get(A);
      if (S) return S;
      let Y = [...this.featureDefinition(e, t), ...this.featureExtensions(e, t, r2)];
      return s.size >= _a32.FEATURE_EXTENSIONS_CACHE_MAX_SIZE && s.clear(), s.set(A, Y), Y;
    }
    let _ = `${String(e)}::s${r2.fingerprint}::m${n._metaVersion}`, p = [...this.featureDefinition(e, t), ...this.featureExtensions(e, t, r2)], d2 = /* @__PURE__ */ new Map();
    return d2.set(_, p), n._featureCache.set(o, d2), p;
  }
  static featureExtensions(e, t, r2) {
    let n = this.getInstance();
    if (!t) throw new u(u.InvalidFeatureExtensionParameterError, "Unable to get feature template. Component cannot be null or undefined.");
    if (!e) throw new u(u.InvalidFeatureExtensionParameterError, "Unable to get feature template. Feature name cannot be null or undefined.");
    if (!a.isAllowedForFeatureDefinition(t)) throw new u(u.InvalidFeatureExtensionParameterError, `Unable to get feature template. Component of type ${l.getComponentName(t)} is not allowed for feature definition.`);
    let o = l.getClassInheritanceChain(t).filter((C2) => C2 !== v && C2 !== z && C2 !== O).map((C2) => `${C2.name}.${e}`), s = /* @__PURE__ */ new Map(), _ = /* @__PURE__ */ new Set(), p = /* @__PURE__ */ new Map(), d2 = /* @__PURE__ */ new Map(), A = /* @__PURE__ */ __name((C2) => {
      let P = p.get(C2);
      return P === void 0 && (P = l.getComponentName(C2), p.set(C2, P)), P;
    }, "A"), S = /* @__PURE__ */ __name((C2) => {
      let P = d2.get(C2);
      return P || (P = new F(C2), d2.set(C2, P)), P;
    }, "S"), Y = [];
    for (let [C2, P] of n._metaStorage) r2.has(C2) && (a.isComponentMetaInstance(P) || a.isContainerMetaInstance(P)) && Y.push([C2, P]);
    for (let C2 of o) for (let [P, J] of Y) {
      _.add(P);
      let Z = J.extensions(C2);
      for (let se = 0; se < Z.length; se++) {
        let q = Z[se], ie = Array.from(_).reverse().find((N) => _a32.isIndexedInheritedFrom(P, N) && N !== P);
        if (ie && s.delete(`${A(ie)}.${q.handler}`), q.override) {
          let N = new RegExp(q.override);
          for (let [X, ae] of s) (N.test(X) || N.test(ae.handler)) && s.delete(X);
        }
        s.set(`${A(P)}.${q.handler}`, { dependency: S(P), ...q });
      }
    }
    return n.filterToMostDerived(r2, Array.from(s.values()));
  }
  filterToMostDerived(e, t) {
    if (t.length <= 1) return t;
    let r2 = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Set();
    for (let _ of t) {
      let p = _.dependency.name;
      r2.has(p) || r2.set(p, e.resolveConstructor(p)), n.add(p);
    }
    let o = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Map();
    for (let [_, p] of r2) p && s.set(p, _);
    for (let [_, p] of r2) {
      if (!p) continue;
      let d2 = _a32.getAncestors(p);
      if (d2) for (let A of d2) {
        let S = s.get(A);
        S && S !== _ && n.has(S) && o.add(S);
      }
    }
    return t.filter((_) => !o.has(_.dependency.name));
  }
  static featureDefinition(e, t) {
    let r2;
    if (!e) throw new u(u.InvalidFeatureTemplateParameterError, "Unable to get feature template. Feature name cannot be null or undefined.");
    if (!t) throw new u(u.InvalidFeatureTemplateParameterError, "Unable to get feature template. Component cannot be null or undefined.");
    switch (true) {
      case t instanceof O:
        r2 = "a-component-features";
        break;
      case t instanceof z:
        r2 = "a-container-features";
        break;
      case t instanceof v:
        r2 = "a-component-features";
        break;
      default:
        throw new u(u.InvalidFeatureTemplateParameterError, `A-Feature cannot be defined on the ${t} level`);
    }
    return [...this.meta(t)?.get(r2)?.get(e)?.template || []];
  }
  static abstractionTemplate(e, t) {
    let r2 = l.getComponentName(t);
    if (!t) throw new u(u.InvalidAbstractionTemplateParameterError, "Unable to get feature template. Component cannot be null or undefined.");
    if (!e) throw new u(u.InvalidAbstractionTemplateParameterError, "Unable to get feature template. Abstraction stage cannot be null or undefined.");
    if (!a.isAllowedForAbstractionDefinition(t)) throw new u(u.InvalidAbstractionTemplateParameterError, `Unable to get feature template. Component of type ${r2} is not allowed for feature definition.`);
    return [...this.abstractionExtensions(e, t)];
  }
  static abstractionExtensions(e, t) {
    let r2 = this.getInstance(), n = l.getComponentName(t);
    if (!t) throw new u(u.InvalidAbstractionExtensionParameterError, "Unable to get feature template. Component cannot be null or undefined.");
    if (!e) throw new u(u.InvalidAbstractionExtensionParameterError, "Unable to get feature template. Abstraction stage cannot be null or undefined.");
    if (!a.isAllowedForAbstractionDefinition(t)) throw new u(u.InvalidAbstractionExtensionParameterError, `Unable to get feature template. Component of type ${n} is not allowed for feature definition.`);
    let o = /* @__PURE__ */ new Map(), s = this.scope(t), _ = /* @__PURE__ */ new Set();
    for (let [p, d2] of r2._metaStorage) s.has(p) && (a.isComponentMetaInstance(d2) || a.isContainerMetaInstance(d2)) && (_.add(p), d2.abstractions(e).forEach((A) => {
      let S = Array.from(_).reverse().find((Y) => _a32.isIndexedInheritedFrom(p, Y) && Y !== p);
      S && o.delete(`${l.getComponentName(S)}.${A.handler}`), o.set(`${l.getComponentName(p)}.${A.handler}`, { dependency: new F(p), ...A });
    }));
    return r2.filterToMostDerived(s, Array.from(o.values()));
  }
  static reset() {
    let e = _a32.getInstance();
    e._registry = /* @__PURE__ */ new WeakMap(), e._featureCache = /* @__PURE__ */ new WeakMap(), e._ancestors.clear(), e._descendants.clear(), e._metaVersion++;
    let t = String(k.A_CONCEPT_ROOT_SCOPE) || "root";
    e._root = new D({ name: t });
  }
  static indexConstructor(e) {
    let t = this.getInstance();
    if (t._ancestors.has(e)) return;
    let r2 = /* @__PURE__ */ new Set(), n = Object.getPrototypeOf(e);
    for (; n && n !== Function.prototype && n !== Object; ) {
      r2.add(n);
      let o = t._descendants.get(n);
      o || (o = /* @__PURE__ */ new Set(), t._descendants.set(n, o)), o.add(e);
      let s = t._ancestors.get(n);
      if (s) {
        for (let _ of s) {
          r2.add(_);
          let p = t._descendants.get(_);
          p || (p = /* @__PURE__ */ new Set(), t._descendants.set(_, p)), p.add(e);
        }
        break;
      }
      n = Object.getPrototypeOf(n);
    }
    t._ancestors.set(e, r2), t._descendants.has(e) || t._descendants.set(e, /* @__PURE__ */ new Set());
  }
  static isIndexedInheritedFrom(e, t) {
    if (e === t) return true;
    let n = this.getInstance()._ancestors.get(e);
    return n ? n.has(t) : l.isInheritedFrom(e, t);
  }
  static findDescendantIn(e, t) {
    let r2 = t instanceof Set ? t.size : t.length;
    if (t instanceof Set) {
      if (t.has(e)) return e;
    } else if (t.includes(e)) return e;
    let n = this.getInstance(), o = n._descendants.get(e), s = o ? o.size : 0;
    if (s === 0) {
      if (t instanceof Set) for (let _ of t) {
        let p = n._ancestors.get(_);
        if (p && p.has(e)) return _;
      }
      else for (let _ of t) {
        let p = n._ancestors.get(_);
        if (p && p.has(e)) return _;
      }
      return;
    }
    if (r2 <= s) if (t instanceof Set) for (let _ of t) {
      if (_ === e) return _;
      let p = n._ancestors.get(_);
      if (p && p.has(e)) return _;
    }
    else for (let _ of t) {
      if (_ === e) return _;
      let p = n._ancestors.get(_);
      if (p && p.has(e)) return _;
    }
    else for (let _ of o) if (t instanceof Set) {
      if (t.has(_)) return _;
    } else if (t.includes(_)) return _;
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
}, __name(_a32, "x"), _a32);
x.FEATURE_EXTENSIONS_CACHE_MAX_SIZE = 1024;
var c = x;
var _a33;
var K = (_a33 = class extends y {
}, __name(_a33, "K"), _a33);
K.AbstractionExtensionError = "Unable to extend abstraction execution";
function ye(i, e = {}) {
  return function(t, r2, n) {
    let o = l.getComponentName(t);
    if (!i) throw new K(K.AbstractionExtensionError, `Abstraction name must be provided to extend abstraction for '${o}'.`);
    if (!a.isConstructorAvailableForAbstraction(t)) throw new K(K.AbstractionExtensionError, `Unable to extend Abstraction '${i}' for '${o}'. Only A-Containers and A-Components can extend Abstractions.`);
    let s, _ = c.meta(t);
    switch (true) {
      case (a.isContainerConstructor(t) || a.isContainerInstance(t)):
        s = "a-container-abstractions";
        break;
      case (a.isComponentConstructor(t) || a.isComponentInstance(t)):
        s = "a-component-abstractions";
        break;
    }
    let p = `CONCEPT_ABSTRACTION::${i}`, d2 = _.get(s) ? new m().from(_.get(s)) : new m(), A = [...d2.get(p) || []], S = A.findIndex((j) => j.handler === r2), Y = { name: p, handler: r2, behavior: e.behavior || "sync", throwOnError: e.throwOnError !== void 0 ? e.throwOnError : true, before: a.isArray(e.before) ? new RegExp(`^${e.before.join("|").replace(/\./g, "\\.")}$`).source : e.before instanceof RegExp ? e.before.source : "", after: a.isArray(e.after) ? new RegExp(`^${e.after.join("|").replace(/\./g, "\\.")}$`).source : e.after instanceof RegExp ? e.after.source : "", override: a.isArray(e.override) ? new RegExp(`^${e.override.join("|").replace(/\./g, "\\.")}$`).source : e.after instanceof RegExp ? e.after.source : "" };
    S !== -1 ? A[S] = Y : A.push(Y), d2.set(p, A), c.meta(t).set(s, d2);
  };
}
__name(ye, "ye");
var _a34;
var b = (_a34 = class {
  constructor(e) {
    this._features = [];
    this._index = 0;
    this._name = e.name, this._features = e.containers.map((t) => {
      let r2 = c.abstractionTemplate(this._name, t);
      return new w({ name: this._name, component: t, template: r2 });
    }), this._current = this._features[0];
  }
  static get Extend() {
    return ye;
  }
  get name() {
    return this._name;
  }
  get feature() {
    return this._current;
  }
  get isDone() {
    return !this.feature || this._index >= this._features.length;
  }
  [Symbol.iterator]() {
    return { next: /* @__PURE__ */ __name(() => this.isDone ? (this._current = void 0, { value: void 0, done: true }) : (this._current = this._features[this._index], { value: this._current, done: false }), "next") };
  }
  next(e) {
    if (this._index >= this._features.length) return;
    let t = this._features.indexOf(e);
    this._index = t + 1;
  }
  async process(e) {
    if (!this.isDone) for (let t of this._features) await t.process(e);
  }
}, __name(_a34, "b"), _a34);
var Re = ((_) => (_.Run = "run", _.Build = "build", _.Publish = "publish", _.Deploy = "deploy", _.Load = "load", _.Start = "start", _.Stop = "stop", _))(Re || {});
var je = ((e) => (e.LIFECYCLE = "a-component-extensions", e))(je || {});
var _a35;
var Ce = (_a35 = class {
  constructor(e) {
    this.props = e;
    this._name = e.name || c.root.name, e.components && e.components.length && e.components.forEach((t) => this.scope.register(t)), e.fragments && e.fragments.length && e.fragments.forEach((t) => this.scope.register(t)), e.entities && e.entities.length && e.entities.forEach((t) => this.scope.register(t)), this._containers = e.containers || [];
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
  async call(e, t) {
    return await new w({ name: e, component: t }).process();
  }
}, __name(_a35, "Ce"), _a35);
var _a36;
var $ = (_a36 = class extends y {
}, __name(_a36, "$"), _a36);
$.InvalidInjectionTarget = "Invalid target for A-Inject decorator", $.MissingInjectionTarget = "Missing target for A-Inject decorator";
function ke(i, e) {
  if (!i) throw new $($.MissingInjectionTarget, "A-Inject decorator is missing the target to inject");
  return function(t, r2, n) {
    let o = l.getComponentName(t);
    if (!a.isTargetAvailableForInjection(t)) throw new $($.InvalidInjectionTarget, `A-Inject cannot be used on the target of type ${typeof t} (${o})`);
    let s = r2 ? String(r2) : "constructor", _;
    switch (true) {
      case (a.isComponentConstructor(t) || a.isComponentInstance(t)):
        _ = "a-component-injections";
        break;
      case a.isContainerInstance(t):
        _ = "a-container-injections";
        break;
      case a.isEntityInstance(t):
        _ = "a-component-injections";
        break;
    }
    let p = c.meta(t).get(_) || new m(), d2 = p.get(s) || [];
    d2[n] = i instanceof F ? i : new F(i, e), p.set(s, d2), c.meta(t).set(_, p);
  };
}
__name(ke, "ke");

// node_modules/@adaas/a-utils/dist/browser/chunk-EQQGB2QZ.mjs
var __defProp2 = Object.defineProperty;
var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
var __decorateClass2 = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc2(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp2(target, key, result);
  return result;
}, "__decorateClass");
var __decorateParam2 = /* @__PURE__ */ __name((index, decorator) => (target, key) => decorator(target, key, index), "__decorateParam");

// node_modules/@adaas/a-frame/dist/browser/index.mjs
var h2 = Object.defineProperty;
var E2 = Object.getOwnPropertyDescriptor;
var g2 = /* @__PURE__ */ __name((a2, e, t, s) => {
  for (var i = s > 1 ? void 0 : s ? E2(e, t) : e, o = a2.length - 1, n; o >= 0; o--) (n = a2[o]) && (i = (s ? n(e, t, i) : n(i)) || i);
  return s && i && h2(e, t, i), i;
}, "g");
var _a37;
var I2 = (_a37 = class extends z {
  async initialize() {
    if (c.environment !== "server") throw new y("A-Frame CLI can only be used in Node.js environment.");
  }
  async readCommandParams() {
    console.log("Reading command parameters from CLI...");
    let e = process.argv.slice(2);
    console.log("Command Line Arguments:", e);
  }
}, __name(_a37, "I"), _a37);
g2([Ce.Load()], I2.prototype, "initialize", 1), g2([Ce.Start()], I2.prototype, "readCommandParams", 1);
var D2 = ((o) => (o.COMPONENT = "component", o.ENTITY = "entity", o.CONTAINER = "container", o.FRAGMENT = "fragment", o.METHOD = "method", o))(D2 || {});
var _a38;
var r = (_a38 = class extends y {
}, __name(_a38, "r"), _a38);
r.InvalidTarget = "A-Frame Index Invalid Target Error", r.InvalidConfiguration = "A-Frame Index Invalid Configuration Error", r.IndexDefinitionError = "A-Frame Index Definition Error", r.IndexMetadataError = "A-Frame Index Metadata Error", r.IndexRegistryError = "A-Frame Index Registry Error", r.IndexComponentNotFoundError = "A-Frame Index Component Not Found Error";
var _a39;
var d = (_a39 = class {
  static isAllowedTarget(e) {
    return a.isEntityConstructor(e) || a.isComponentConstructor(e) || a.isContainerConstructor(e) || a.isFragmentConstructor(e) || a.isComponentInstance(e) || a.isContainerInstance(e) || a.isEntityInstance(e) || a.isFragmentInstance(e);
  }
  static getTargetName(e) {
    return l.getComponentName(e);
  }
  static getTargetConstructor(e) {
    return typeof e == "function" ? e : e.constructor;
  }
}, __name(_a39, "d"), _a39);
function x2(a2, e = {}) {
  return function(t, s, i) {
    if (s && i && a2 === "method") {
      let n = t.constructor, m2 = String(s);
      try {
        let _ = c.meta(c2), p = _.getMetaFor(n);
        if (e.namespace && p.namespace && e.namespace !== p.namespace) throw new r(r.InvalidConfiguration, `Method namespace '${e.namespace}' does not match target class namespace '${p.namespace}'.`);
        let u2 = { name: e.name || m2, description: e.description, namespace: e.namespace || p.namespace, methodName: m2 };
        return p.addMethod(u2), _.seMetaFor(n, p), i;
      } catch (_) {
        throw new r(r.IndexDefinitionError, `Unable to apply @A_Frame_Index.Method decorator on '${n.name}.${m2}': ${_ instanceof Error ? _.message : "Unknown error"}`);
      }
    }
    if (!d.isAllowedTarget(t)) throw new r(r.InvalidTarget, `@A_Frame_Index.${a2} decorator can only be applied to allowed targets.`);
    let o = l.getComponentName(t);
    try {
      let n = c.meta(c2), m2 = d.getTargetConstructor(t), _ = n.getMetaFor(m2);
      return _.name = e.name || o, _.description = e.description, _.namespace = e.namespace, _.type = a2, n.seMetaFor(m2, _), t;
    } catch (n) {
      throw new r(r.IndexDefinitionError, `Unable to apply @A_Frame_Index.${a2} decorator on '${o}': ${n instanceof Error ? n.message : "Unknown error"}`);
    }
  };
}
__name(x2, "x");
function l2(a2) {
  return function(e, t, s) {
    let i = l.getComponentName(e);
    if (!d.isAllowedTarget(e)) throw new r(r.InvalidTarget, `Unable Apply Describe Index Decorator for '${i}': Target type is not allowed.`);
    try {
      let o = c.meta(c2), n = d.getTargetConstructor(e), m2 = o.getMetaFor(n);
      return t || s || (m2.namespace = a2, o.seMetaFor(n, m2)), e;
    } catch (o) {
      throw new r(o);
    }
  };
}
__name(l2, "l");
function T2(a2) {
  return function(e, t, s) {
    let i = l.getComponentName(e);
    if (!d.isAllowedTarget(e)) throw new r(r.InvalidTarget, `Unable Apply Describe Index Decorator for '${i}': Target type is not allowed.`);
    try {
      let o = c.meta(c2), n = d.getTargetConstructor(e), m2 = o.getMetaFor(n);
      if (t || s) {
        let _ = t ? t.toString() : "", p = m2.methods.get(_);
        p && (p.description = a2, m2.methods.set(_, p));
      } else m2.description = a2, o.seMetaFor(n, m2);
      return e;
    } catch (o) {
      throw new r(o);
    }
  };
}
__name(T2, "T");
var _a40;
var C = (_a40 = class extends O {
}, __name(_a40, "C"), _a40);
var _a41;
var M2 = (_a41 = class extends m {
  get name() {
    return this.get("name");
  }
  set name(e) {
    e && this.set("name", e);
  }
  get type() {
    return this.get("type");
  }
  set type(e) {
    e && this.set("type", e);
  }
  get namespace() {
    return this.get("namespaces");
  }
  set namespace(e) {
    if (e) {
      let t = e instanceof C ? e.aseid.toString() : e;
      this.set("namespaces", t);
    }
  }
  get description() {
    return this.get("descriptions");
  }
  set description(e) {
    e && this.set("descriptions", e);
  }
  get methods() {
    return this.get("methods") || this.set("methods", /* @__PURE__ */ new Map()), this.get("methods");
  }
  clear() {
    this.set("name", void 0), this.set("type", void 0), this.set("namespaces", void 0), this.set("descriptions", void 0), this.set("methods", /* @__PURE__ */ new Map());
  }
  addMethod(e) {
    let t = this.methods;
    t.has(e.name) || (t.set(e.name, e), this.set("methods", t));
  }
}, __name(_a41, "M"), _a41);
var _a42;
var F2 = (_a42 = class extends R {
  getMetaFor(e) {
    let t = this.get("A_FRAME_INDEX_CONFIGURATIONS_META") || /* @__PURE__ */ new Map();
    return t.has(e) || (t.set(e, new M2()), this.set("A_FRAME_INDEX_CONFIGURATIONS_META", t)), t.get(e);
  }
  seMetaFor(e, t) {
    let s = this.get("A_FRAME_INDEX_CONFIGURATIONS_META") || /* @__PURE__ */ new Map();
    s.set(e, t), this.set("A_FRAME_INDEX_CONFIGURATIONS_META", s);
  }
}, __name(_a42, "F"), _a42);
var _a43;
var c2 = (_a43 = class extends v {
  static Namespace(e) {
    return l2(e);
  }
  static Describe(e) {
    return T2(e);
  }
  static Component(e = {}) {
    return x2("component", e);
  }
  static Container(e = {}) {
    return x2("container", e);
  }
  static Entity(e = {}) {
    return x2("entity", e);
  }
  static Fragment(e = {}) {
    return x2("fragment", e);
  }
  static Method(e = {}) {
    return x2("method", e);
  }
}, __name(_a43, "c"), _a43);
c2 = g2([m.Define(F2)], c2);

// node_modules/@adaas/a-utils/dist/browser/chunk-J6CLHXFQ.mjs
var _a44;
var A_FSPolyfillBase = (_a44 = class {
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
}, __name(_a44, "A_FSPolyfillBase"), _a44);
var _a45;
var A_FSPolyfill = (_a45 = class extends A_FSPolyfillBase {
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
}, __name(_a45, "A_FSPolyfill"), _a45);
var _a46;
var A_CryptoPolyfillBase = (_a46 = class {
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
}, __name(_a46, "A_CryptoPolyfillBase"), _a46);
var _a47;
var A_CryptoPolyfill = (_a47 = class extends A_CryptoPolyfillBase {
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
}, __name(_a47, "A_CryptoPolyfill"), _a47);
var _a48;
var A_HttpPolyfillBase = (_a48 = class {
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
}, __name(_a48, "A_HttpPolyfillBase"), _a48);
var _a49;
var A_HttpPolyfill = (_a49 = class extends A_HttpPolyfillBase {
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
}, __name(_a49, "A_HttpPolyfill"), _a49);
var _a50;
var A_HttpsPolyfillBase = (_a50 = class {
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
}, __name(_a50, "A_HttpsPolyfillBase"), _a50);
var _a51;
var A_HttpsPolyfill = (_a51 = class extends A_HttpsPolyfillBase {
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
}, __name(_a51, "A_HttpsPolyfill"), _a51);
var _a52;
var A_PathPolyfillBase = (_a52 = class {
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
}, __name(_a52, "A_PathPolyfillBase"), _a52);
var _a53;
var A_PathPolyfill = (_a53 = class extends A_PathPolyfillBase {
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
}, __name(_a53, "A_PathPolyfill"), _a53);
var _a54;
var A_UrlPolyfillBase = (_a54 = class {
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
}, __name(_a54, "A_UrlPolyfillBase"), _a54);
var _a55;
var A_UrlPolyfill = (_a55 = class extends A_UrlPolyfillBase {
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
}, __name(_a55, "A_UrlPolyfill"), _a55);
var _a56;
var A_BufferPolyfillBase = (_a56 = class {
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
}, __name(_a56, "A_BufferPolyfillBase"), _a56);
var _a57;
var A_BufferPolyfill = (_a57 = class extends A_BufferPolyfillBase {
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
}, __name(_a57, "A_BufferPolyfill"), _a57);
var _a58;
var A_ProcessPolyfillBase = (_a58 = class {
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
}, __name(_a58, "A_ProcessPolyfillBase"), _a58);
var _a59;
var A_ProcessPolyfill = (_a59 = class extends A_ProcessPolyfillBase {
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
}, __name(_a59, "A_ProcessPolyfill"), _a59);
var _a60;
var A_Polyfill = (_a60 = class extends v {
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
}, __name(_a60, "A_Polyfill"), _a60);
__decorateClass2([
  Ce.Load()
], A_Polyfill.prototype, "load", 1);
__decorateClass2([
  Ce.Load()
], A_Polyfill.prototype, "attachToWindow", 1);
A_Polyfill = __decorateClass2([
  c2.Component({
    namespace: "A-Utils",
    name: "A-Polyfill",
    description: "Polyfill component that provides cross-environment compatibility for Node.js core modules such as fs, crypto, http, https, path, url, buffer, and process. It dynamically loads appropriate polyfills based on the execution environment (Node.js or browser), enabling seamless usage of these modules in different contexts."
  }),
  __decorateParam2(0, ke("A_Logger"))
], A_Polyfill);

// node_modules/@adaas/a-utils/dist/browser/chunk-TQ5UON22.mjs
var _a61;
var A_ExecutionContext = (_a61 = class extends L {
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
}, __name(_a61, "A_ExecutionContext"), _a61);
A_ExecutionContext = __decorateClass2([
  c2.Fragment({
    namespace: "A-Utils",
    name: "A-ExecutionContext",
    description: "Execution context fragment that provides a structured way to manage metadata and serialized data for execution environments. It allows storing and retrieving key-value pairs, facilitating context-aware operations within the application. It useful in cases when it's necessary to share some runtime data across multiple steps of thee features, or components."
  })
], A_ExecutionContext);

// node_modules/@adaas/a-utils/dist/browser/chunk-ECSGFDRQ.mjs
var A_CONSTANTS__CONFIG_ENV_VARIABLES_ARRAY = [];
var _a62;
var A_ConfigError = (_a62 = class extends y {
}, __name(_a62, "A_ConfigError"), _a62);
A_ConfigError.InitializationError = "A-Config Initialization Error";
var _a63;
var A_Config = (_a63 = class extends A_ExecutionContext {
  constructor(config) {
    super("a-config");
    this.DEFAULT_ALLOWED_TO_READ_PROPERTIES = [
      ...pe,
      ...A_CONSTANTS__CONFIG_ENV_VARIABLES_ARRAY
    ];
    this._strict = config.strict ?? false;
    this._configProperties = config.variables ?? [];
    for (const key in config.defaults) {
      this.set(
        h.toUpperSnakeCase(key),
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
      return super.get(h.toUpperSnakeCase(property));
    throw new A_ConfigError("Property not exists or not allowed to read");
  }
  set(property, value) {
    const array = Array.isArray(property) ? property : typeof property === "string" ? [{ property, value }] : Object.keys(property).map((key) => ({
      property: key,
      value: property[key]
    }));
    for (const { property: property2, value: value2 } of array) {
      super.set(h.toUpperSnakeCase(property2), value2);
    }
  }
}, __name(_a63, "A_Config"), _a63);
A_Config = __decorateClass2([
  c2.Fragment({
    namespace: "A-Utils",
    name: "A-Config",
    description: "Configuration management context that provides structured access to application configuration variables, supporting defaults and strict mode for enhanced reliability. Default environment variables are included for comprehensive configuration handling."
  })
], A_Config);
var _a64;
var ConfigReader = (_a64 = class extends v {
  constructor(polyfill) {
    super();
    this.polyfill = polyfill;
    this.DEFAULT_ALLOWED_TO_READ_PROPERTIES = [
      ...pe,
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
}, __name(_a64, "ConfigReader"), _a64);
__decorateClass2([
  Ce.Load(),
  __decorateParam2(0, ke(z)),
  __decorateParam2(1, ke(D)),
  __decorateParam2(2, ke(A_Config))
], ConfigReader.prototype, "attachContext", 1);
__decorateClass2([
  Ce.Load(),
  __decorateParam2(0, F.Required()),
  __decorateParam2(0, ke(A_Config))
], ConfigReader.prototype, "initialize", 1);
ConfigReader = __decorateClass2([
  c2.Component({
    namespace: "A-Utils",
    name: "ConfigReader",
    description: "Abstract component for reading configuration data from various sources such as files, environment variables, or remote services. This component can be extended to implement specific configuration reading strategies."
  }),
  __decorateParam2(0, F.Required()),
  __decorateParam2(0, ke(A_Polyfill))
], ConfigReader);
var _a65;
var FileConfigReader = (_a65 = class extends ConfigReader {
  constructor() {
    super(...arguments);
    this.FileData = /* @__PURE__ */ new Map();
  }
  /**
   * Get the configuration property Name
   * @param property 
   */
  getConfigurationProperty_File_Alias(property) {
    return h.toCamelCase(property);
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
}, __name(_a65, "FileConfigReader"), _a65);
FileConfigReader = __decorateClass2([
  c2.Component({
    namespace: "A-Utils",
    name: "FileConfigReader",
    description: "Configuration reader that loads configuration data from a JSON file located in the application root directory. It reads the file named after the current concept with a .conf.json extension and parses its contents into the configuration context."
  })
], FileConfigReader);
var _a66;
var ENVConfigReader = (_a66 = class extends ConfigReader {
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
    return h.toUpperSnakeCase(property);
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
}, __name(_a66, "ENVConfigReader"), _a66);
__decorateClass2([
  Ce.Load({
    before: ["ENVConfigReader.initialize"]
  }),
  __decorateParam2(0, ke(A_Config)),
  __decorateParam2(1, ke(A_Polyfill)),
  __decorateParam2(2, ke(w))
], ENVConfigReader.prototype, "readEnvFile", 1);
ENVConfigReader = __decorateClass2([
  c2.Component({
    namespace: "A-Utils",
    name: "ENVConfigReader",
    description: "Configuration reader that sources configuration data from environment variables. It supports loading variables from a .env file and maps them to the configuration context, making it suitable for applications running in diverse environments such as local development, staging, and production."
  })
], ENVConfigReader);
var _a67;
var A_ConfigLoader = (_a67 = class extends z {
  async prepare(polyfill) {
    if (!this.scope.has(A_Config)) {
      const newConfig = new A_Config({
        variables: [
          ...pe,
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
}, __name(_a67, "A_ConfigLoader"), _a67);
__decorateClass2([
  Ce.Load({
    before: /.*/
  }),
  __decorateParam2(0, ke(A_Polyfill))
], A_ConfigLoader.prototype, "prepare", 1);
A_ConfigLoader = __decorateClass2([
  c2.Container({
    namespace: "A-Utils",
    name: "A-ConfigLoader",
    description: "Container responsible for loading and initializing the A_Config component based on the environment and available configuration sources. It can be useful for application that need a separated configuration management and sharable across multiple containers."
  })
], A_ConfigLoader);

// node_modules/@adaas/a-utils/dist/browser/chunk-TK5UEYMZ.mjs
var A_LOGGER_DEFAULT_SCOPE_LENGTH = 20;
var A_LOGGER_COLORS = {
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
var _a68;
var A_Logger = (_a68 = class extends v {
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
    this.COLORS = A_LOGGER_COLORS;
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
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
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
    for (let i = 0; i < word.length; i += maxLength) {
      chunks.push(word.slice(i, i + maxLength));
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
      ...args.map((arg, i) => {
        const shouldAddNewline = i > 0 || isMultiArg;
        switch (true) {
          case arg instanceof y:
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
    if (typeof param1 === "string" && this.COLORS[param1]) {
      console.log(...this.compile(param1, ...args));
    } else {
      console.log(...this.compile(this.DEFAULT_LOG_COLOR, param1, ...args));
    }
  }
  info(param1, ...args) {
    if (!this.shouldLog("info")) return;
    if (typeof param1 === "string" && this.COLORS[param1]) {
      console.log(...this.compile(param1, ...args));
    } else {
      console.log(...this.compile(this.DEFAULT_LOG_COLOR, param1, ...args));
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
    console.log(...this.compile("yellow", ...args));
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
    console.log(...this.compile("red", ...args));
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
}, __name(_a68, "A_Logger"), _a68);
A_Logger = __decorateClass2([
  c2.Component({
    namespace: "A-Utils",
    name: "A_Logger",
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

// node_modules/@adaas/a-utils/dist/browser/chunk-S2RSPZXR.mjs
var _a69;
var A_UtilsHelper = (_a69 = class extends v {
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
      const entries = Array.from(value.entries()).map(([k2, v2]) => `${A_UtilsHelper.serialize(k2)}=>${A_UtilsHelper.serialize(v2)}`).sort().join(",");
      return `Map{${entries}}`;
    }
    if (value instanceof Set) {
      const items = Array.from(value.values()).map((v2) => A_UtilsHelper.serialize(v2)).sort().join(",");
      return `Set{${items}}`;
    }
    if (value instanceof Date) {
      return `Date:${value.toISOString()}`;
    }
    if (value instanceof RegExp) {
      return `RegExp:${value.toString()}`;
    }
    if (Array.isArray(value)) {
      const items = value.map((v2) => A_UtilsHelper.serialize(v2)).join(",");
      return `[${items}]`;
    }
    if (typeof value.toJSON === "function") {
      return `json:${A_UtilsHelper.serialize(value.toJSON())}`;
    }
    const keys = Object.keys(value).sort();
    const pairs = keys.map((k2) => `${k2}:${A_UtilsHelper.serialize(value[k2])}`).join(",");
    return `{${pairs}}`;
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
    for (let i = 0; i < input.length; i++) {
      h1 ^= input.charCodeAt(i);
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
}, __name(_a69, "A_UtilsHelper"), _a69);
__decorateClass2([
  c2.Method({
    description: "Instance method wrapper for the static hash function, allowing it to be injected as a dependency."
  }),
  __decorateParam2(0, ke(G)),
  __decorateParam2(1, ke(A_ExecutionContext)),
  __decorateParam2(2, ke(w))
], A_UtilsHelper.prototype, "hash", 1);
A_UtilsHelper = __decorateClass2([
  c2.Component({
    namespace: "A-Utils",
    name: "A-UtilsHelper",
    description: "Utility helper class providing common functions for A-Utils library, such as hashing and serialization."
  })
], A_UtilsHelper);

// node_modules/@adaas/a-utils/dist/browser/a-signal.mjs
var _a70;
var A_Signal = (_a70 = class extends O {
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
}, __name(_a70, "A_Signal"), _a70);
A_Signal = __decorateClass2([
  c2.Entity({
    namespace: "A-Utils",
    name: "A-Signal",
    description: "A Signal Entity represents an individual signal instance that carries data, used for managing state within an application context. Signals are designed to reflect the current state rather than individual events, making them suitable for scenarios where state monitoring and real-time updates are essential."
  })
], A_Signal);
var _a71;
var A_SignalVector = (_a71 = class extends O {
  constructor(param1, param2) {
    if ("aseid" in param1) {
      super(param1);
    } else {
      super({
        structure: param2 ? param2 : param1.map((s) => s.constructor),
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
    return this._structure || this._signals.map((s) => s.constructor);
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
      const signalIndex = this._signals.findIndex((s) => s.constructor === signalConstructor);
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
    for (let i = 0; i < this.structure.length; i++) {
      const thisSignalConstructor = this.structure[i];
      const otherSignalConstructor = other.structure[i];
      if (thisSignalConstructor !== otherSignalConstructor) {
        return false;
      }
      const thisSignalIndex = this._signals.findIndex((s) => s.constructor === thisSignalConstructor);
      const otherSignalIndex = other._signals.findIndex((s) => s.constructor === otherSignalConstructor);
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
    for (let i = 0; i < this.length; i++) {
      const thisSignalConstructor = this.structure[i];
      const otherSignalConstructor = other.structure[i];
      if (thisSignalConstructor !== otherSignalConstructor) {
        return false;
      }
      const thisSignalIndex = this._signals.findIndex((s) => s.constructor === thisSignalConstructor);
      const otherSignalIndex = other._signals.findIndex((s) => s.constructor === otherSignalConstructor);
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
      const signalIndex = this._signals.findIndex((s) => s.constructor === signalConstructor);
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
      const signalIndex = this._signals.findIndex((s) => s.constructor === signalConstructor);
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
    if (param1 instanceof O) {
      signalConstructor = param1.constructor;
    } else {
      signalConstructor = param1;
    }
    const index = this._signals.findIndex((s) => s.constructor === signalConstructor);
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
      const signalIndex = this._signals.findIndex((s) => s.constructor === signalConstructor);
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
      const signalIndex = this._signals.findIndex((s) => s.constructor === signalConstructor);
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
      const signalIndex = this._signals.findIndex((s) => s.constructor === signalConstructor);
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
      structure: this.structure.map((s) => s.name),
      values: this._signals.map((s) => s.toJSON())
    };
  }
}, __name(_a71, "A_SignalVector"), _a71);
A_SignalVector = __decorateClass2([
  c2.Entity({
    namespace: "A-Utils",
    name: "A-SignalVector",
    description: "A Signal Vector Entity represents a collection of signals structured in a specific way, allowing for batch processing and transmission of related signals as a unified state representation."
  })
], A_SignalVector);
var _a72;
var A_SignalState = (_a72 = class extends L {
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
}, __name(_a72, "A_SignalState"), _a72);
A_SignalState = __decorateClass2([
  c2.Fragment({
    namespace: "A-Utils",
    name: "A-SignalState",
    description: "Manages the latest state of all signals within a given scope, maintaining a mapping between signal constructors and their most recently emitted values."
  })
], A_SignalState);
var _a73;
var A_SignalConfig = (_a73 = class extends L {
  get structure() {
    if (this._structure) {
      return this._structure;
    }
    const scope = c.scope(this);
    const constructors = [...scope.allowedEntities].filter((e) => l.isInheritedFrom(e, A_Signal)).sort((a2, b2) => a2.constructor.name.localeCompare(b2.name)).map((s) => scope.resolveConstructor(s.name));
    return constructors.filter((s) => s);
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
      const stringStructure = this._config.stringStructure.split(",").map((s) => s.trim());
      this._structure = stringStructure.map((name) => c.scope(this).resolveConstructor(name)).filter((s) => s);
    }
  }
}, __name(_a73, "A_SignalConfig"), _a73);
A_SignalConfig = __decorateClass2([
  c2.Fragment({
    namespace: "A-Utils",
    name: "A-SignalConfig",
    description: "Signal configuration fragment that defines the structure and types of signals within a given scope. It allows specifying the expected signal constructors and their order, facilitating consistent signal management and processing across components that emit or listen to signals."
  })
], A_SignalConfig);
var A_SignalBusFeatures = /* @__PURE__ */ ((A_SignalBusFeatures2) => {
  A_SignalBusFeatures2["onBeforeNext"] = "_A_SignalBusFeatures_onBeforeNext";
  A_SignalBusFeatures2["onNext"] = "_A_SignalBusFeatures_onNext";
  A_SignalBusFeatures2["onError"] = "_A_SignalBusFeatures_onError";
  return A_SignalBusFeatures2;
})(A_SignalBusFeatures || {});
var _a74;
var A_SignalBusError = (_a74 = class extends y {
}, __name(_a74, "A_SignalBusError"), _a74);
A_SignalBusError.SignalProcessingError = "Signal processing error";
var _a75;
var _b;
var _c;
var _a76;
var A_SignalBus = (_a76 = class extends v {
  async next(...signals) {
    const scope = new D({
      name: `A_SignalBus-Next-Scope`,
      entities: signals
    }).inherit(c.scope(this));
    try {
      await this.call("_A_SignalBusFeatures_onBeforeNext", scope);
      await this.call("_A_SignalBusFeatures_onNext", scope);
      scope.destroy();
    } catch (error) {
      let wrappedError;
      switch (true) {
        case error instanceof A_SignalBusError:
          wrappedError = error;
          break;
        case (error instanceof y && error.originalError instanceof A_SignalBusError):
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
      await this.call(
        "_A_SignalBusFeatures_onError"
        /* onError */
      );
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
      config = new A_SignalConfig({
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
    _a75 = "_A_SignalBusFeatures_onNext"
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
}, __name(_a76, "A_SignalBus"), _a76);
__decorateClass2([
  c2.Method({
    description: "Emit multiple signals through the signal bus."
  })
], A_SignalBus.prototype, "next", 1);
__decorateClass2([
  w.Extend({
    before: /.*/
  }),
  __decorateParam2(0, ke(y)),
  __decorateParam2(1, ke(A_Logger))
], A_SignalBus.prototype, _c, 1);
__decorateClass2([
  w.Extend({
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
  w.Extend({
    scope: [A_SignalBus],
    before: /.*/
  }),
  __decorateParam2(0, F.Flat()),
  __decorateParam2(0, F.All()),
  __decorateParam2(0, ke(A_Signal)),
  __decorateParam2(1, ke(D)),
  __decorateParam2(2, F.Required()),
  __decorateParam2(2, ke(A_SignalState)),
  __decorateParam2(3, ke(A_Config)),
  __decorateParam2(4, ke(A_Logger)),
  __decorateParam2(5, ke(A_SignalConfig))
], A_SignalBus.prototype, _a75, 1);
A_SignalBus = __decorateClass2([
  c2.Component({
    namespace: "A-Utils",
    name: "A-SignalBus",
    description: "Signal bus component that manages the emission and state of signals within a given scope. It listens for emitted signals, updates their state, and forwards them to registered watchers. The bus ensures a consistent signal vector structure based on the defined configuration, facilitating signal management across multiple components."
  })
], A_SignalBus);

// src/lib/AreComponent/Are.context.ts
var AreContext = class extends A_ExecutionContext {
  constructor(source = "") {
    super("AreContext");
    /**
     * The roots array holds references to the root nodes of the ARE scene, allowing for easy access and management of the top-level components in the rendering hierarchy. The signalsMap is a mapping between root nodes and their associated signal vectors, enabling efficient management of reactive updates and interactions within the ARE framework based on changes in the application state or user input.
     */
    this._roots = [];
    /**
     * This property stores a map between root node and conditions that should be met to render particular component inside the root node. This can be used to manage complex rendering logic and to optimize performance by ensuring that components are only rendered when necessary based on the defined conditions.
     */
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
    this._roots = this._roots.filter((r2) => r2.aseid.toString() !== node.aseid.toString());
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
};
__name(AreContext, "AreContext");
AreContext = __decorateClass([
  c2.Fragment({
    namespace: "A-ARE",
    name: "AreContext",
    description: "Context fragment for the A-Concept Rendering Engine (ARE) framework, serving as a foundational component for managing shared state and configurations within the ARE environment. This Context uses to encapsulate global settings, resources, and utilities that can be accessed by various ARE components and entities during the rendering and interaction processes."
  })
], AreContext);

// src/lib/AreComponent/Are.constants.ts
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

// src/lib/AreInstruction/AreInstruction.constants.ts
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

// src/lib/AreInstruction/AreInstruction.entity.ts
var _AreInstruction = class _AreInstruction extends O {
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
      entity: h.toKebabCase(newEntity.name)
      // id: id,
    });
    this._name = newEntity.name;
    this._payload = newEntity.payload;
    this._group = newEntity.group?.aseid.toString();
    this._parent = newEntity.parent?.aseid.toString();
  }
  fromUndefined() {
    throw new y({
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
};
__name(_AreInstruction, "AreInstruction");
var AreInstruction = _AreInstruction;

// src/lib/AreInstruction/types/AreDeclaration.instruction.ts
var _AreDeclaration = class _AreDeclaration extends AreInstruction {
  constructor(param1, param2, param3) {
    if (typeof param1 === "object" && "aseid" in param1)
      super(param1);
    else
      super({
        name: param1 || AreInstructionDefaultNames.Default,
        parent: param2 instanceof _AreDeclaration ? param2 : void 0,
        group: param2 instanceof _AreDeclaration ? param2.group : void 0,
        payload: param2 instanceof _AreDeclaration ? param3 || {} : param2 || {}
        // id: [param1, A_IdentityHelper.generateTimeId(), param2 instanceof AreDeclaration ? (param3 || {}) as T : (param2 || {}) as T]
      });
  }
};
__name(_AreDeclaration, "AreDeclaration");
var AreDeclaration = _AreDeclaration;

// src/lib/AreScene/AreScene.error.ts
var _AreSceneError = class _AreSceneError extends y {
};
__name(_AreSceneError, "AreSceneError");
_AreSceneError.SceneAlreadyInactive = "AreSceneError.SceneAlreadyInactive";
_AreSceneError.SceneAlreadyActive = "AreSceneError.SceneAlreadyActive";
_AreSceneError.HostInstructionHasConnectedInstructions = "AreSceneError.HostInstructionHasConnectedInstructions";
_AreSceneError.SingleHostInstruction = "AreSceneError.SingleHostInstruction";
_AreSceneError.SceneError = "AreSceneError.SceneError";
_AreSceneError.RootNotFound = "AreSceneError.RootNotFound";
_AreSceneError.UpdateFailed = "AreSceneError.UpdateFailed";
_AreSceneError.MountFailed = "AreSceneError.MountFailed";
_AreSceneError.UnmountFailed = "AreSceneError.UnmountFailed";
_AreSceneError.MountPointNotFound = "AreSceneError.MountPointNotFound";
_AreSceneError.InvalidTemplate = "AreSceneError.InvalidTemplate";
_AreSceneError.RenderFailed = "AreSceneError.RenderFailed";
var AreSceneError = _AreSceneError;

// src/lib/AreInstruction/AreInstruction.error.ts
var _AreInstructionError = class _AreInstructionError extends y {
};
__name(_AreInstructionError, "AreInstructionError");
var AreInstructionError = _AreInstructionError;

// src/lib/AreInstruction/types/AreMutation.instruction.ts
var _AreMutation = class _AreMutation extends AreInstruction {
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
};
__name(_AreMutation, "AreMutation");
var AreMutation = _AreMutation;

// src/lib/AreScene/AreScene.constants.ts
var AreSceneStatuses = {
  Active: "active",
  Inactive: "inactive",
  Destroyed: "destroyed"
};

// src/lib/AreScene/AreScene.context.ts
var AreScene = class extends L {
  constructor(id) {
    super({ name: id.toString() });
    // -----------------------------------------------------------------------------------
    // -----------------------------------Scene Index-------------------------------------
    // -----------------------------------------------------------------------------------
    this._groupToInstructionsMap = /* @__PURE__ */ new Map();
    /**
     * Plan is a queue of changes that should be applied to render the node
     * 
     * It works as FIFO, so the first instruction that should be applied is the first one in the queue, and so on.
     */
    this._plan = [];
    /**
     * State is a list of instructions that are currently applied to the node, 
     * so it represents the current state of the node in the scene.
     * 
     * It always in a reverse order of the plan, so the last instruction in the state is the first one that should be reverted when we need to revert the changes, and so on.
     * 
     * For example, if we have a node with two instructions in the plan: [Instruction A, Instruction B], and both of them are applied to the node, then the state will be [Instruction B, Instruction A], so when we need to revert the changes, we will revert Instruction B first, and then Instruction A.
     */
    this._state = [];
    /**
     * Scene status is used to determine the current lifecycle stage of the scene, which can be 'active', 'inactive' or 'destroyed'. This status can be used to control the behavior of the scene and its instructions, for example, we can prevent applying new instructions to an inactive or destroyed scene, or we can trigger certain actions when the scene becomes active or inactive. The default status of the scene is 'inactive', which means that the scene is not yet rendered and its instructions are not applied, and it will become 'active' when it is mounted and its instructions are applied, and it will become 'destroyed' when it is unmounted and its instructions are reverted.
     */
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
    return this.scope.resolve(new F(AreDeclaration, {
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
    return this.scope.resolve(new F(AreMutation, {
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
    const toApply = this.planned.filter((i) => !this.isApplied(i));
    const toRevert = this.applied.filter((i) => !this.isInPlan(i));
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
      const dependentInstructions = this.scope.resolve(new F(AreMutation, {
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
    const beforeIndex = this._plan.findIndex((i) => i.aseid.toString() === beforeInstruction.aseid.toString());
    const instructionIndex = this._plan.findIndex((i) => i.aseid.toString() === instruction.aseid.toString());
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
    const afterIndex = this._plan.findIndex((i) => i.aseid.toString() === afterInstruction.aseid.toString());
    const instructionIndex = this._plan.findIndex((i) => i.aseid.toString() === instruction.aseid.toString());
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
    this._plan = this._plan.filter((i) => i.aseid.toString() !== instruction.aseid.toString());
  }
  /**
   * Checks if the instruction is already in the plan, so it will be rendered in the next render cycle.
   * 
   * @param instruction 
   * @returns 
   */
  getPlanned(instruction) {
    const found = this._plan.find((i) => i.aseid.toString() === instruction.aseid.toString());
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
    this._state = this._state.filter((i) => i.aseid.toString() !== instruction.aseid.toString());
  }
  /**
   * Checks if the instruction is already in the state, so it is currently applied to the scene.
   * 
   * @param instruction 
   * @returns 
   */
  getApplied(instruction) {
    const found = this._state.find((i) => i.aseid.toString() === instruction.aseid.toString());
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
};
__name(AreScene, "AreScene");
AreScene = __decorateClass([
  c2.Component({
    namespace: "A-ARE",
    name: "AreScene",
    description: "Persistent runtime structure that owns the rendering state for a component's lifetime. Maintains two sets \u2014 applied (what is currently in the DOM) and planned (what should be). Acts as the single source of truth for all rendering decisions. The Compiler produces it once, the Interpreter reads it on every update."
  })
], AreScene);

// src/helpers/AreChache.helper.ts
var _AreCacheHelper = class _AreCacheHelper {
  static createHash(str) {
    let hashSource;
    if (str instanceof Map) {
      hashSource = JSON.stringify(Array.from(str.entries()));
    } else if (str instanceof Set) {
      hashSource = JSON.stringify(Array.from(str.values()));
    } else {
      switch (typeof str) {
        case "string":
          hashSource = str;
          break;
        case "undefined":
          hashSource = "undefined";
          break;
        case "object":
          if ("toJSON" in str)
            hashSource = JSON.stringify(str.toJSON());
          else
            hashSource = JSON.stringify(str);
          break;
        case "number":
          hashSource = str.toString();
          break;
        case "boolean":
          hashSource = str ? "true" : "false";
          break;
        case "function":
          hashSource = str.toString();
          break;
        default:
          hashSource = String(str);
      }
    }
    let hash = 0, i, chr;
    for (i = 0; i < hashSource.length; i++) {
      chr = hashSource.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0;
    }
    const hashString = hash.toString();
    return hashString;
  }
};
__name(_AreCacheHelper, "AreCacheHelper");
var AreCacheHelper = _AreCacheHelper;

// src/lib/AreAttribute/AreAttribute.constants.ts
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

// src/lib/AreAttribute/AreAttribute.entity.ts
var AreAttribute = class extends O {
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
    const identity = {
      name: newEntity.name,
      prefix: newEntity.prefix,
      content: newEntity.content
    };
    const id = AreCacheHelper.createHash(identity);
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
};
__name(AreAttribute, "AreAttribute");
__decorateClass([
  c2.Method({
    description: "Compile the attribute. This method should transform attribute details into a set of SceneInstructions. It may also modify attribute value, since this field is editable during runtime."
  })
], AreAttribute.prototype, "compile", 1);
AreAttribute = __decorateClass([
  c2.Component({
    namespace: "A-ARE",
    name: "AreAttribute",
    description: "Represents an HTML attribute within the A-Concept Rendering Engine (ARE) framework, encapsulating the attribute's name, raw content, evaluated value, and associated features for initialization, transformation, compilation, updating, and validation."
  })
], AreAttribute);

// src/lib/AreNode/AreNode.constants.ts
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

// src/lib/AreNode/AreNode.entity.ts
var AreNode = class extends O {
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
    return this.scope.resolve(h.toPascalCase(this.aseid.entity));
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
    this.call(AreNodeFeatures.onInit, this.scope);
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
      this.call(AreNodeFeatures.onUpdate, this.scope);
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
      this.call(AreNodeFeatures.onUnmount, this.scope);
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
      throw new y({
        title: `A_UI_Node Scope Inheritance Error`,
        description: `The A_UI_Node entity with ASEID '${this.aseid.toString()}' is not bound to any context scope. Please ensure that the entity is created within a valid context.`,
        originalError: error
      });
    }
  }
};
__name(AreNode, "AreNode");
AreNode = __decorateClass([
  c2.Entity({
    namespace: "A-ARE",
    name: "AreNode",
    description: "An AreNode entity represents a node within the A-Concept Rendering Engine (ARE) framework. It encapsulates content, markup, and styles, and manages its own scope for nested fragments and entities. AreNodes are responsible for handling events, compiling, rendering, updating, and lifecycle management within the ARE context."
  })
], AreNode);

// src/lib/AreEvent/AreEvent.context.ts
var AreEvent = class extends A_ExecutionContext {
};
__name(AreEvent, "AreEvent");
AreEvent = __decorateClass([
  c2.Fragment({
    namespace: "A-ARE",
    name: "AreEvent",
    description: "Event context for managing events within the A-Concept Rendering Engine (ARE) framework, encapsulating event data and associated nodes to facilitate event-driven interactions."
  })
], AreEvent);

// src/lib/AreSignals/AreSignals.meta.ts
var _AreSignalsMeta = class _AreSignalsMeta extends R {
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
};
__name(_AreSignalsMeta, "AreSignalsMeta");
var AreSignalsMeta = _AreSignalsMeta;

// src/lib/AreSignals/AreSignals.component.ts
var AreSignals = class extends v {
  handleSignalVector(vector, context, state, scope, logger) {
    logger?.info(`Handling Signal Vector with ${context.roots.length} root nodes.`);
    try {
      for (const root of context.roots) {
        const callScope = new D({
          fragments: [new AreEvent(
            AreFeatures.onSignal,
            {
              event: "SignalVectorNext",
              data: { vector }
            }
          )]
        }).import(scope, root.scope);
        logger?.debug("Emitting signal for root node:", vector);
        root.emit(callScope);
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
    console.log(`Propagating event '${event.name}' from node ${node.aseid.toString()} to component ${target.component ? target.component.constructor.name : "None"}`);
    if (target.component)
      await feature.chain(target.component, event.name, scope);
  }
};
__name(AreSignals, "AreSignals");
__decorateClass([
  w.Extend({
    name: A_SignalBusFeatures.onNext
  }),
  __decorateParam(0, ke(A_SignalVector)),
  __decorateParam(1, ke(AreContext)),
  __decorateParam(2, ke(A_SignalState)),
  __decorateParam(3, ke(D)),
  __decorateParam(4, ke(A_Logger))
], AreSignals.prototype, "handleSignalVector", 1);
__decorateClass([
  w.Extend({
    name: AreNodeFeatures.onEmit,
    scope: [AreNode]
  }),
  __decorateParam(0, ke(G)),
  __decorateParam(1, ke(D)),
  __decorateParam(2, ke(AreEvent)),
  __decorateParam(3, ke(w)),
  __decorateParam(4, ke(A_Logger))
], AreSignals.prototype, "propagateEvent", 1);
AreSignals = __decorateClass([
  m.Define(AreSignalsMeta)
], AreSignals);

// src/lib/AreComponent/Are.meta.ts
var _AreMeta = class _AreMeta extends R {
};
__name(_AreMeta, "AreMeta");
var AreMeta = _AreMeta;

// src/lib/AreComponent/Are.component.ts
var Are = class extends v {
  constructor() {
    super(...arguments);
    // ==================================================================================
    // ========================= COMPONENT PROPERTIES ===================================
    // ==================================================================================
    /**
     * Props can be used to store any additional data or configuration for the component. They are not reactive by default but can be used in the component's methods and lifecycle hooks to manage state or pass information. Props can be defined as a simple object with key-value pairs, where keys are the prop names and values are the prop values. They can be accessed and modified within the component's methods to influence rendering or behavior based on the component's state or external inputs.
     */
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
      return w.Extend({
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
      return w.Extend({
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
      return w.Extend({
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
      return w.Extend({
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
      return w.Extend({
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
      return w.Extend({
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
      return w.Extend({
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
      return w.Extend({
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
      return w.Extend({
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
      return w.Extend({
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
      return w.Extend({
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
      return w.Extend({
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
      return w.Extend({
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
};
__name(Are, "Are");
__decorateClass([
  Are.Template
], Are.prototype, "template", 1);
__decorateClass([
  Are.Styles
], Are.prototype, "styles", 1);
__decorateClass([
  Are.Data
], Are.prototype, "data", 1);
Are = __decorateClass([
  c2.Component({
    namespace: "A-ARE",
    name: "Are",
    description: "Base component class for A-Concept Rendering Engine (ARE) components. It provides lifecycle decorators and methods for defining templates, styles, and data, facilitating the creation of dynamic and interactive UI components within the ARE framework."
  }),
  m.Define(AreMeta)
], Are);

// src/helpers/AreCommon.helper.ts
var _AreCommonHelper = class _AreCommonHelper {
  /**
   * Sets a nested property on an object using a dot-separated path string. This method safely navigates through the object structure and sets the value at the specified path, creating intermediate objects as needed. If any part of the path is invalid or if the input parameters are not properly formatted, the method will simply return without making any changes to the object.
   * 
   * @param obj The object on which to set the property.
   * @param path A dot-separated string representing the path to the desired property (e.g., "user.profile.name").
   * @param value The value to set at the specified path.
   * @returns the target object with the updated property, or undefined if the input parameters are invalid.
   */
  static setPropertyByPath(obj, path, value) {
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
  static extractPropertyByPath(obj, path) {
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
  /**
   * Compiled expression — a pre-parsed function ready for repeated execution.
   * Created once via compile(), reused on every apply/click.
   */
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
  static compile(expr) {
    const trimmed = expr.trim();
    _AreCommonHelper.validate(trimmed);
    const isCallable = _AreCommonHelper.isCallableExpression(trimmed);
    const isSimplePath = _AreCommonHelper.SIMPLE_PATH.test(trimmed);
    let compiled = null;
    if (!isSimplePath) {
      try {
        compiled = new Function("scope", `"use strict"; with(scope) { return (${trimmed}) }`);
      } catch (e) {
        throw new Error(`Expression syntax error in "${trimmed}": ${e.message}`);
      }
    }
    return {
      isCallable,
      execute(store, scope) {
        if (isSimplePath) {
          if (scope && trimmed in scope) return scope[trimmed];
          const value = store.get(trimmed);
          if (value !== void 0) return value;
        }
        const sandbox = _AreCommonHelper.createSandbox(store, scope);
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
  static evaluate(expr, store, scope) {
    const trimmed = expr.trim();
    _AreCommonHelper.validate(trimmed);
    if (_AreCommonHelper.SIMPLE_PATH.test(trimmed)) {
      if (scope && trimmed in scope) return scope[trimmed];
      const value = store.get(trimmed);
      if (value !== void 0) return value;
    }
    const sandbox = _AreCommonHelper.createSandbox(store, scope);
    const result = _AreCommonHelper.execute(trimmed, sandbox);
    if (_AreCommonHelper.isCallableExpression(trimmed)) {
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
  static extractEmitHandlers(expr) {
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
  static isCallableExpression(expr) {
    if (/^\(?[\w\s,]*\)?\s*=>/.test(expr)) return true;
    if (/^function\s*\(/.test(expr)) return true;
    return false;
  }
  // ── Validation ────────────────────────────────────────────────────────────
  static validate(expr) {
    if (expr.length > _AreCommonHelper.MAX_LENGTH) {
      throw new Error(
        `Expression exceeds maximum length of ${_AreCommonHelper.MAX_LENGTH} characters`
      );
    }
    for (const pattern of _AreCommonHelper.BLOCKED_PATTERNS) {
      if (pattern.test(expr)) {
        throw new Error(`Expression contains blocked pattern: ${pattern.source}`);
      }
    }
    if (!_AreCommonHelper.ALLOWED_CHARS.test(expr)) {
      throw new Error(`Expression contains disallowed characters`);
    }
    _AreCommonHelper.checkDepth(expr);
  }
  static checkDepth(expr) {
    let depth = 0;
    let max = 0;
    for (const ch of expr) {
      if (ch === "(" || ch === "[" || ch === "{") {
        depth++;
        max = Math.max(max, depth);
      }
      if (ch === ")" || ch === "]" || ch === "}") depth--;
    }
    if (max > _AreCommonHelper.MAX_DEPTH) {
      throw new Error(`Expression exceeds maximum nesting depth of ${_AreCommonHelper.MAX_DEPTH}`);
    }
  }
  // ── Sandbox ───────────────────────────────────────────────────────────────
  static createSandbox(store, scope) {
    return new Proxy({}, {
      has: /* @__PURE__ */ __name((_, key) => {
        if (typeof key === "string" && _AreCommonHelper.BLOCKED_GLOBALS.has(key)) return false;
        return true;
      }, "has"),
      get: /* @__PURE__ */ __name((_, key) => {
        if (typeof key !== "string") return void 0;
        if (scope && key in scope) return scope[key];
        _AreCommonHelper.assertSafeKey(key);
        const value = store.get(key);
        if (typeof value === "function") return value.bind(store);
        if (value !== null && typeof value === "object" && value !== void 0) {
          return new Proxy(value, _AreCommonHelper.nestedHandler(key, store));
        }
        return value;
      }, "get"),
      set: /* @__PURE__ */ __name(() => {
        throw new Error("Expression scope is read-only");
      }, "set")
    });
  }
  static nestedHandler(prefix, store) {
    return {
      has: /* @__PURE__ */ __name(() => true, "has"),
      get: /* @__PURE__ */ __name((target, key) => {
        if (typeof key !== "string") return void 0;
        _AreCommonHelper.assertSafeKey(key);
        const fullKey = `${prefix}.${key}`;
        const value = store.get(fullKey);
        if (value === void 0) return target[key];
        if (typeof value === "function") return value.bind(store);
        if (value !== null && typeof value === "object") {
          return new Proxy(value, _AreCommonHelper.nestedHandler(fullKey, store));
        }
        return value;
      }, "get"),
      set: /* @__PURE__ */ __name(() => {
        throw new Error("Expression scope is read-only");
      }, "set")
    };
  }
  static assertSafeKey(key) {
    if (key === "__proto__" || key === "constructor" || key === "prototype") {
      throw new Error(`Access to "${key}" is not allowed in expressions`);
    }
    if (_AreCommonHelper.BLOCKED_GLOBALS.has(key)) {
      throw new Error(`Access to "${key}" is not allowed in expressions`);
    }
  }
  // ── Execution ─────────────────────────────────────────────────────────────
  static execute(expr, sandbox) {
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
};
__name(_AreCommonHelper, "AreCommonHelper");
// ── Constants ─────────────────────────────────────────────────────────────
_AreCommonHelper.MAX_LENGTH = 500;
_AreCommonHelper.MAX_DEPTH = 5;
_AreCommonHelper.BLOCKED_PATTERNS = [
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
_AreCommonHelper.BLOCKED_GLOBALS = /* @__PURE__ */ new Set([
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
_AreCommonHelper.ALLOWED_CHARS = /^[\w\s\d\.\[\]()=><|&!+\-*/%?:,'"`;~^$]+$/;
// ── Public ────────────────────────────────────────────────────────────────
/**
 * Simple dot-path identifier pattern (e.g. "name", "user.name", "user.profile.name").
 * Matches strings that consist solely of identifier characters separated by dots.
 */
_AreCommonHelper.SIMPLE_PATH = /^[a-zA-Z_$][\w$]*(?:\.[a-zA-Z_$][\w$]*)*$/;
var AreCommonHelper = _AreCommonHelper;

// src/lib/AreStore/AreStore.constants.ts
var AreStoreAreComponentMetaKeys = {
  StoreExtensions: "_AreStore_StoreExtensions"
};

// src/lib/AreStore/AreStore.context.ts
var AreStore = class extends A_ExecutionContext {
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
    const value = AreCommonHelper.extractPropertyByPath(primaryObject, pathPart.join("."));
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
    const result = AreCommonHelper.setPropertyByPath(primaryObject, pathPart.join("."), value);
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
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const isIndex = /^\d+$/.test(part);
      if (i === 0) {
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
};
__name(AreStore, "AreStore");
AreStore = __decorateClass([
  c2.Fragment({
    description: "Are Store uses to keep AreNode related information for interpolations, runtime data, etc. This object can be injected to manipulate with data at runtime."
  })
], AreStore);

// examples/jumpstart/src/components/A-Btn.component.ts
var _ABtn = class _ABtn extends Are {
  constructor() {
    super(...arguments);
    this.props = {
      name: {
        type: "string",
        default: "A_Button Element"
      }
    };
  }
  async template(node, store) {
    node.setContent(`
                <button class="a-btn" @click="handleClick"> Make it:  {{name}} {{number}}</button> 
        `);
  }
  filter(test) {
    console.log("test", test);
  }
  async styles(node) {
  }
  async data(node, store) {
    store.set({
      name: "A_Button Element",
      showInput: false,
      bgColor: "#007BFF",
      btn2: "Button 2",
      showInput2: false,
      number: 0
    });
  }
  async handleClick(scope, node, store, logger, event, scene) {
    store.set("number", Math.floor(Math.random() * 1e3));
    store.set("name", `Clicked! `);
    console.log("Changing ShowInput from ", store.get("showInput"));
    store.set("showInput", !store.get("showInput"));
    console.log("Changing ShowInput to ", store.get("showInput"), store);
    store.set("bgColor", "#ff5733");
    console.log("event data:", event);
    await node.update();
  }
  async handleClick2(scope, node, store, logger, event, scene) {
    store.set("btn2", `Button 2 Clicked! `);
    store.set("showInput2", !store.get("showInput2"));
    console.log("event data:", event);
    await node.update();
  }
};
__name(_ABtn, "ABtn");
__decorateClass([
  Are.Template,
  __decorateParam(0, ke(G)),
  __decorateParam(1, ke(AreStore))
], _ABtn.prototype, "template", 1);
__decorateClass([
  AreStore.Function
], _ABtn.prototype, "filter", 1);
__decorateClass([
  Are.Styles,
  __decorateParam(0, ke(G))
], _ABtn.prototype, "styles", 1);
__decorateClass([
  Are.Data,
  __decorateParam(0, ke(G)),
  __decorateParam(1, ke(AreStore))
], _ABtn.prototype, "data", 1);
__decorateClass([
  Are.EventHandler,
  __decorateParam(0, ke(D)),
  __decorateParam(1, ke(G)),
  __decorateParam(2, ke(AreStore)),
  __decorateParam(3, ke(A_Logger)),
  __decorateParam(4, ke(AreEvent)),
  __decorateParam(5, ke(AreScene))
], _ABtn.prototype, "handleClick", 1);
__decorateClass([
  Are.EventHandler,
  __decorateParam(0, ke(D)),
  __decorateParam(1, ke(G)),
  __decorateParam(2, ke(AreStore)),
  __decorateParam(3, ke(A_Logger)),
  __decorateParam(4, ke(AreEvent)),
  __decorateParam(5, ke(AreScene))
], _ABtn.prototype, "handleClick2", 1);
var ABtn = _ABtn;

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
var _a77;
var A_Service_Error = (_a77 = class extends y {
}, __name(_a77, "A_Service_Error"), _a77);
A_Service_Error.ServiceLoadError = "Service load error";
A_Service_Error.ServiceStartError = "Service start error";
A_Service_Error.ServiceStopError = "Service stop error";
var _a78;
var _b2;
var _c2;
var _d;
var _e2;
var _f;
var _g;
var _h;
var _i;
var _j;
var _a79;
var A_Service = (_a79 = class extends z {
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
        case (error instanceof y && error.originalError instanceof A_Service_Error):
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
        case (error instanceof y && error.originalError instanceof A_Service_Error):
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
        case (error instanceof y && error.originalError instanceof A_Service_Error):
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
    _e2 = "_A_Service_onAfterStart"
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
    _a78 = "_A_Service_onError"
    /* onError */
  ](error, logger, ...args) {
    logger?.error(error);
  }
}, __name(_a79, "A_Service"), _a79);
__decorateClass2([
  Ce.Load()
], A_Service.prototype, "load", 1);
__decorateClass2([
  Ce.Start()
], A_Service.prototype, "start", 1);
__decorateClass2([
  Ce.Stop()
], A_Service.prototype, "stop", 1);
__decorateClass2([
  w.Extend(),
  __decorateParam2(0, ke(A_Polyfill))
], A_Service.prototype, _j, 1);
__decorateClass2([
  w.Extend()
], A_Service.prototype, _i, 1);
__decorateClass2([
  w.Extend()
], A_Service.prototype, _h, 1);
__decorateClass2([
  w.Extend()
], A_Service.prototype, _g, 1);
__decorateClass2([
  w.Extend()
], A_Service.prototype, _f, 1);
__decorateClass2([
  w.Extend()
], A_Service.prototype, _e2, 1);
__decorateClass2([
  w.Extend()
], A_Service.prototype, _d, 1);
__decorateClass2([
  w.Extend()
], A_Service.prototype, _c2, 1);
__decorateClass2([
  w.Extend()
], A_Service.prototype, _b2, 1);
__decorateClass2([
  w.Extend({
    before: /.*/
  }),
  __decorateParam2(0, ke(y)),
  __decorateParam2(1, ke(A_Logger))
], A_Service.prototype, _a78, 1);
A_Service = __decorateClass2([
  c2.Container({
    namespace: "A-Utils",
    name: "A-Service",
    description: "Service container that manages the lifecycle of various types of services, such as HTTP servers and workers or UI loader. It dynamically loads necessary components based on the provided configuration and orchestrates the start and stop processes, ensuring proper error handling and extensibility through feature hooks."
  })
], A_Service);

// src/lib/AreCompiler/AreCompiler.component.ts
var AreCompiler = class extends v {
  static Compile(param1) {
    return (target, propertyKey, descriptor) => {
      return w.Extend({
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
      for (let i = 0; i < node.attributes.length; i++) {
        const attribute = node.attributes[i];
        attribute.compile();
      }
      if (node.children && node.children.length > 0) {
        for (let i = 0; i < node.children.length; i++) {
          const child = node.children[i];
          child.compile();
        }
      }
    } catch (error) {
      logger?.error(error);
    }
  }
};
__name(AreCompiler, "AreCompiler");
__decorateClass([
  w.Extend({
    name: AreNodeFeatures.onCompile,
    scope: [AreNode]
  }),
  __decorateParam(0, ke(G)),
  __decorateParam(1, ke(AreScene)),
  __decorateParam(2, ke(A_Logger))
], AreCompiler.prototype, "compile", 1);
AreCompiler = __decorateClass([
  c2.Component({
    namespace: "A-ARE",
    name: "AreCompiler",
    description: "Walks the transformed AreNode tree and emits a Scene. Translates each node, binding, directive and interpolation into a typed instruction. Knows nothing about the DOM or any rendering target \u2014 its only concern is producing a complete and ordered set of instructions that fully describes how the tree should be rendered."
  })
], AreCompiler);

// src/engines/html/attributes/AreHTMLAttribute.ts
var _AreHTMLAttribute = class _AreHTMLAttribute extends AreAttribute {
  get owner() {
    return this.scope.issuer();
  }
};
__name(_AreHTMLAttribute, "AreHTMLAttribute");
var AreHTMLAttribute = _AreHTMLAttribute;

// src/engines/html/attributes/AreDirective.attribute.ts
var _AreDirectiveAttribute = class _AreDirectiveAttribute extends AreHTMLAttribute {
  /**
   * Returns a custom directive component associated with this attribute, if available.
   * 
   * The method uses the attribute's name to resolve the corresponding directive component from the scope. It constructs the expected directive name by converting the attribute name to PascalCase and prefixing it with "AreDirective". If a matching directive component is found in the scope, it is returned; otherwise, the method returns undefined.
   */
  get component() {
    const component = this.scope.resolve(`AreDirective${h.toPascalCase(this.name)}`);
    return component;
  }
};
__name(_AreDirectiveAttribute, "AreDirectiveAttribute");
var AreDirectiveAttribute = _AreDirectiveAttribute;

// src/lib/AreCompiler/AreCompiler.error.ts
var _AreCompilerError = class _AreCompilerError extends y {
};
__name(_AreCompilerError, "AreCompilerError");
_AreCompilerError.RenderError = "Are Compiler Render Error";
_AreCompilerError.CompilationError = "Are Compiler Compilation Error";
var AreCompilerError = _AreCompilerError;

// src/engines/html/attributes/AreStatic.attribute.ts
var _AreStaticAttribute = class _AreStaticAttribute extends AreHTMLAttribute {
};
__name(_AreStaticAttribute, "AreStaticAttribute");
var AreStaticAttribute = _AreStaticAttribute;

// src/engines/html/components/AreDirective/AreDirective.constants.ts
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

// src/engines/html/attributes/AreEvent.attribute.ts
var _AreEventAttribute = class _AreEventAttribute extends AreHTMLAttribute {
};
__name(_AreEventAttribute, "AreEventAttribute");
var AreEventAttribute = _AreEventAttribute;

// src/engines/html/attributes/AreBinding.attribute.ts
var _AreBindingAttribute = class _AreBindingAttribute extends AreHTMLAttribute {
  // get value(): string {
  //     const [firstPart, ...pathPart] = this.content.split('.');
  //     const primaryObject = this.owner.store.get(firstPart);
  //     return AreCommonHelper.extractPropertyByPath(primaryObject, pathPart.join('.')) as string;
  // }
};
__name(_AreBindingAttribute, "AreBindingAttribute");
var AreBindingAttribute = _AreBindingAttribute;

// src/engines/html/context/AreStyle/AreStyle.context.ts
var _AreStyle = class _AreStyle extends L {
  constructor(styles, aseid) {
    super({
      name: aseid ? aseid.toString() : "default-style"
    });
    this.styles = styles;
  }
};
__name(_AreStyle, "AreStyle");
var AreStyle = _AreStyle;

// src/engines/html/nodes/AreHTMLNode.ts
var _AreHTMLNode = class _AreHTMLNode extends AreNode {
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
    return directives.filter((d2) => d2.component).sort((a2, b2) => {
      const aMeta = c.meta(a2.component);
      const bMeta = c.meta(b2.component);
      const aPriority = aMeta.priority ?? 0;
      const bPriority = bMeta.priority ?? 0;
      return bPriority - aPriority;
    });
  }
  /**
   * The interpolations inside the node template, which are typically used to represent dynamic content or expressions that should be evaluated and rendered within the node. These interpolations are usually defined in the template with a specific syntax (e.g., `{{ expression }}`) and are reactive, meaning that they will update automatically when the underlying data changes.
   * 
   * Example: For a node defined as `<div>{{ name }}</div>`, the interpolation would be `{{ name }}`.
   */
  get interpolations() {
    return this.scope.resolveFlatAll(AreInterpolation);
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
};
__name(_AreHTMLNode, "AreHTMLNode");
var AreHTMLNode = _AreHTMLNode;

// src/engines/html/nodes/AreInterpolation.node.ts
var _AreInterpolation = class _AreInterpolation extends AreHTMLNode {
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
__name(_AreInterpolation, "AreInterpolation");
var AreInterpolation = _AreInterpolation;

// src/engines/html/nodes/AreText.node.ts
var _AreText = class _AreText extends AreHTMLNode {
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
__name(_AreText, "AreText");
var AreText = _AreText;

// src/engines/html/instructions/AreHTML.instructions.constants.ts
var AreHTMLInstructions = {
  AddElement: "_AreHTML_AddElement",
  AddText: "_AreHTML_AddText",
  AddAttribute: "_AreHTML_AddAttribute",
  AddStyle: "_AreHTML_AddStyle",
  AddListener: "_AreHTML_AddListener",
  AddInterpolation: "_AreHTML_AddInterpolation",
  AddComment: "_AreHTML_AddComment"
};

// src/engines/html/instructions/AreHTML.instructions.ts
var AddElementInstruction = class extends AreDeclaration {
  constructor(props) {
    if ("aseid" in props) {
      super(props);
    } else {
      super(AreHTMLInstructions.AddElement, props);
    }
  }
};
__name(AddElementInstruction, "AddElementInstruction");
AddElementInstruction = __decorateClass([
  c2.Component({
    namespace: "A-ARE",
    name: "AddElementInstruction",
    description: "Creates a new HTML element in the DOM. Apply creates the element; revert removes it."
  })
], AddElementInstruction);
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
  c2.Component({
    namespace: "A-ARE",
    name: "AddTextInstruction",
    description: "Appends a text node to an element. Apply creates the text node; revert removes it. Content can be a static string or a dynamic getter for interpolations."
  })
], AddTextInstruction);
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
  c2.Component({
    namespace: "A-ARE",
    name: "AddAttributeInstruction",
    description: "Sets an attribute on an HTML element. Apply calls setAttribute; revert calls removeAttribute."
  })
], AddAttributeInstruction);
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
  c2.Component({
    namespace: "A-ARE",
    name: "AddStyleInstruction",
    description: "Sets an inline CSS style property on an element. Apply sets the property; revert removes it."
  })
], AddStyleInstruction);
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
  c2.Component({
    namespace: "A-ARE",
    name: "AddListenerInstruction",
    description: "Attaches a DOM event listener to an element. Apply calls addEventListener; revert calls removeEventListener."
  })
], AddListenerInstruction);
var AddInterpolationInstruction = class extends AreMutation {
  constructor(parent, props) {
    if ("aseid" in props) {
      super(props);
    } else {
      super(AreHTMLInstructions.AddInterpolation, parent, props);
    }
  }
};
__name(AddInterpolationInstruction, "AddInterpolationInstruction");
AddInterpolationInstruction = __decorateClass([
  c2.Component({
    namespace: "A-ARE",
    name: "AddInterpolationInstruction",
    description: "Appends a reactive text node whose content is resolved dynamically from the store. Apply creates the text node with the getter; revert removes it."
  })
], AddInterpolationInstruction);
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
  c2.Component({
    namespace: "A-ARE",
    name: "AddCommentInstruction",
    description: "Appends a comment node to an element. Apply creates the comment node; revert removes it. Content can be a static string or a dynamic getter for interpolations."
  })
], AddCommentInstruction);

// src/engines/html/AreHTML.compiler.ts
var AreHTMLCompiler = class extends AreCompiler {
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
      logger?.warning(`Directive handler component not found for directive: ${directive.name}. Make sure to create a component named "AreDirective${h.toPascalCase(directive.name)}" to handle this directive.`);
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
  compileBindingAttribute(attribute, scene, parentStore, store, ...args) {
    if (!scene.host)
      throw new AreCompilerError({
        title: "Scene Host Not Found",
        description: `No host found for the scene with id: ${scene.id}. Please ensure that the scene is properly initialized and has a host before compiling binding attributes.`
      });
    const node = attribute.owner;
    if (node.component && node.component.props[attribute.name]) {
      const propDefinition = node.component.props[attribute.name];
      let value = parentStore.get(attribute.content);
      if (propDefinition.type) {
        switch (propDefinition.type) {
          case "string":
            value = String(value);
            break;
          case "number":
            value = Number(value);
            break;
          case "boolean":
            value = Boolean(value);
            break;
          default:
            break;
        }
      }
      store.set(attribute.name, value);
    } else {
      const instruction = new AddAttributeInstruction(scene.host, {
        name: attribute.name,
        content: attribute.content,
        evaluate: true
      });
      scene.plan(instruction);
    }
  }
};
__name(AreHTMLCompiler, "AreHTMLCompiler");
__decorateClass([
  AreCompiler.Compile(AreInterpolation),
  __decorateParam(0, ke(G)),
  __decorateParam(1, ke(AreScene)),
  __decorateParam(2, ke(AreStore)),
  __decorateParam(3, ke(A_Logger))
], AreHTMLCompiler.prototype, "compileInterpolation", 1);
__decorateClass([
  AreCompiler.Compile(AreText),
  __decorateParam(0, ke(G)),
  __decorateParam(1, ke(AreScene)),
  __decorateParam(2, ke(A_Logger))
], AreHTMLCompiler.prototype, "compileText", 1);
__decorateClass([
  AreCompiler.Compile(AreStaticAttribute),
  __decorateParam(0, ke(G)),
  __decorateParam(1, ke(AreScene))
], AreHTMLCompiler.prototype, "compileStaticAttribute", 1);
__decorateClass([
  AreCompiler.Compile(AreDirectiveAttribute),
  __decorateParam(0, ke(G)),
  __decorateParam(1, ke(AreStore)),
  __decorateParam(2, ke(w)),
  __decorateParam(3, ke(A_Logger))
], AreHTMLCompiler.prototype, "compileDirectiveAttribute", 1);
__decorateClass([
  AreCompiler.Compile(AreEventAttribute),
  __decorateParam(0, ke(G)),
  __decorateParam(1, ke(AreScene))
], AreHTMLCompiler.prototype, "compileEventAttribute", 1);
__decorateClass([
  AreCompiler.Compile(AreBindingAttribute),
  __decorateParam(0, ke(G)),
  __decorateParam(1, ke(AreScene)),
  __decorateParam(2, F.Parent()),
  __decorateParam(2, ke(AreStore)),
  __decorateParam(3, ke(AreStore))
], AreHTMLCompiler.prototype, "compileBindingAttribute", 1);
AreHTMLCompiler = __decorateClass([
  c2.Component({
    namespace: "A-ARE",
    name: "AreHTMLCompiler",
    description: "HTML-specific compiler for A-Concept Rendering Engine (ARE) components, extending the base AreCompiler to handle HTML templates, styles, and rendering logic tailored for web environments."
  })
], AreHTMLCompiler);

// src/lib/AreSyntax/AreSyntax.context.ts
var AreSyntax = class extends L {
  constructor(config) {
    super({ name: "AreSyntax" });
    this._trimWhitespace = config?.trimWhitespace !== false;
    this._strictMode = config?.strictMode !== false;
    this._rules = [...config?.rules ?? []].sort(
      (a2, b2) => (b2.priority ?? 0) - (a2.priority ?? 0)
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
};
__name(AreSyntax, "AreSyntax");
AreSyntax = __decorateClass([
  c2.Fragment({
    namespace: "A-ARE",
    name: "AreSyntaxContext",
    description: "Context that defines the syntax rules and structures for the A-Concept Rendering Engine (ARE). It provides mechanisms for parsing and interpreting templates, attributes, directives, interpolations, and event listeners, enabling dynamic and interactive UI rendering within the ARE framework."
  })
], AreSyntax);

// src/lib/AreTransformer/AreTransformer.component.ts
var AreTransformer = class extends v {
  transform(node, scope, scene, ...args) {
    const queue = [node];
    while (queue.length > 0) {
      const current = queue.shift();
      for (let i = 0; i < current.attributes.length; i++) {
        const attribute = current.attributes[i];
        attribute.transform();
      }
      queue.push(...current.children);
    }
  }
};
__name(AreTransformer, "AreTransformer");
__decorateClass([
  w.Extend({
    name: AreNodeFeatures.onTransform,
    scope: [AreNode]
  }),
  __decorateParam(0, ke(G)),
  __decorateParam(1, ke(D)),
  __decorateParam(2, ke(AreScene))
], AreTransformer.prototype, "transform", 1);
AreTransformer = __decorateClass([
  c2.Component({
    description: "Reshapes the AreNode tree before compilation without changing its abstraction level. Responsible for structural rewrites that would complicate the compiler if left unhandled \u2014 converting $for nodes into AreGroupNode, extracting AreText and AreInterpolation from raw text, sorting directives via TopologicalSorter, and flagging static nodes."
  })
], AreTransformer);

// src/lib/AreLoader/AreLoader.component.ts
var AreLoader = class extends v {
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
    for (let i = 0; i < node.children.length; i++) {
      const childNode = node.children[i];
      const res = childNode.load();
      if (res instanceof Promise) {
        await res;
      }
    }
  }
};
__name(AreLoader, "AreLoader");
__decorateClass([
  w.Extend({
    name: ce.LOAD,
    scope: [AreNode]
  }),
  __decorateParam(0, ke(G)),
  __decorateParam(1, ke(D)),
  __decorateParam(2, ke(w)),
  __decorateParam(3, ke(A_Logger)),
  __decorateParam(4, ke(AreContext))
], AreLoader.prototype, "load", 1);
AreLoader = __decorateClass([
  c2.Component({
    description: "Entry point of the pipeline. Accepts a raw template string and orchestrates the initial processing by delegating to Syntax. Returns a structured AreNode tree ready for transformation. Knows nothing about the template content or grammar rules."
  })
], AreLoader);

// src/lib/AreInterpreter/AreInterpreter.component.ts
var AreInterpreter = class extends v {
  /**
   * Decorator to mark a method as an instruction Apply handler for the specific instruction type. The method will be called during the render phase of the ARE component when the corresponding instruction needs to be applied. The method should contain logic to perform the necessary operations on the rendering target based on the instruction's content and context.
   * 
   * @param action 
   * @returns 
   */
  static Apply(action) {
    const name = action + AreInstructionFeatures.Apply;
    return (target, propertyKey, descriptor) => {
      return w.Extend({
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
      return w.Extend({
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
      return w.Extend({
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
};
__name(AreInterpreter, "AreInterpreter");
__decorateClass([
  w.Extend({
    name: AreNodeFeatures.onInterpret,
    scope: [AreNode]
  }),
  __decorateParam(0, ke(AreScene))
], AreInterpreter.prototype, "interpret", 1);
__decorateClass([
  w.Extend({
    name: AreInstructionFeatures.Apply,
    scope: [AreInstruction]
  }),
  __decorateParam(0, ke(G)),
  __decorateParam(1, ke(AreInterpreter)),
  __decorateParam(2, ke(AreStore)),
  __decorateParam(3, ke(D)),
  __decorateParam(4, ke(w))
], AreInterpreter.prototype, "applyInstruction", 1);
__decorateClass([
  w.Extend({
    name: AreInstructionFeatures.Update,
    scope: [AreInstruction]
  }),
  __decorateParam(0, ke(G)),
  __decorateParam(1, ke(AreInterpreter)),
  __decorateParam(2, ke(AreStore)),
  __decorateParam(3, ke(D)),
  __decorateParam(4, ke(w))
], AreInterpreter.prototype, "updateInstruction", 1);
__decorateClass([
  w.Extend({
    name: AreInstructionFeatures.Revert,
    scope: [AreInstruction]
  }),
  __decorateParam(0, ke(G)),
  __decorateParam(1, ke(AreInterpreter)),
  __decorateParam(2, ke(AreStore)),
  __decorateParam(3, ke(D)),
  __decorateParam(4, ke(w))
], AreInterpreter.prototype, "revertInstruction", 1);
AreInterpreter = __decorateClass([
  c2.Component({
    description: "Stateless executor that reads the Scene and translates its instructions into operations on a rendering target. Computes the diff between applied and planned, calls revert on removed instructions and apply on added ones. Owns no state of its own \u2014 all state lives in the Scene. Can be swapped for any target implementation (DOMInterpreter, SSRInterpreter, CanvasInterpreter) without touching any other part of the pipeline."
  })
], AreInterpreter);

// src/lib/AreEngine/AreEngine.error.ts
var _AreEngineError = class _AreEngineError extends y {
};
__name(_AreEngineError, "AreEngineError");
_AreEngineError.MissedRequiredDependency = "A Required Dependency is missing in AreEngine";
var AreEngineError = _AreEngineError;

// src/lib/AreLifecycle/AreLifecycle.component.ts
var AreLifecycle = class extends v {
  static Init(param1) {
    return (target, propertyKey, descriptor) => {
      return w.Extend({
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
      console.log(" -- Scene Changes -- ");
      console.log("To Apply: ", toApply);
      console.log("To Revert: ", toRevert);
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
          console.log("WTF?? ", error);
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
      for (let i = applied.length - 1; i >= 0; i--) {
        const instruction = applied[i];
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
};
__name(AreLifecycle, "AreLifecycle");
__decorateClass([
  w.Extend({
    name: AreNodeFeatures.onBeforeInit,
    before: /.*/,
    scope: [AreNode]
  }),
  __decorateParam(0, ke(G)),
  __decorateParam(1, ke(D)),
  __decorateParam(2, ke(AreScene)),
  __decorateParam(3, ke(w))
], AreLifecycle.prototype, "beforeInit", 1);
__decorateClass([
  w.Extend({
    name: AreNodeFeatures.onInit,
    scope: [AreNode]
  }),
  __decorateParam(0, ke(G)),
  __decorateParam(1, ke(D)),
  __decorateParam(2, ke(AreContext)),
  __decorateParam(3, ke(A_Logger))
], AreLifecycle.prototype, "init", 1);
__decorateClass([
  w.Extend({
    name: AreNodeFeatures.onAfterInit,
    after: /.*/,
    scope: [AreNode]
  }),
  __decorateParam(0, ke(G)),
  __decorateParam(1, ke(D)),
  __decorateParam(2, ke(AreScene)),
  __decorateParam(3, ke(w))
], AreLifecycle.prototype, "afterInit", 1);
__decorateClass([
  w.Extend({
    name: AreNodeFeatures.onBeforeMount,
    before: /.*/,
    scope: [AreNode]
  }),
  __decorateParam(0, ke(G)),
  __decorateParam(1, ke(D)),
  __decorateParam(2, ke(AreScene)),
  __decorateParam(3, ke(w))
], AreLifecycle.prototype, "beforeMount", 1);
__decorateClass([
  w.Extend({
    name: AreNodeFeatures.onMount,
    scope: [AreNode]
  }),
  __decorateParam(0, ke(G)),
  __decorateParam(1, ke(AreScene)),
  __decorateParam(2, ke(A_Logger))
], AreLifecycle.prototype, "mount", 1);
__decorateClass([
  w.Extend({
    name: AreNodeFeatures.onAfterMount,
    after: /.*/,
    scope: [AreNode]
  }),
  __decorateParam(0, ke(G)),
  __decorateParam(1, ke(D)),
  __decorateParam(2, ke(AreScene)),
  __decorateParam(3, ke(w))
], AreLifecycle.prototype, "afterMount", 1);
__decorateClass([
  w.Extend({
    name: AreNodeFeatures.onUpdate,
    before: /.*/,
    scope: [AreNode]
  }),
  __decorateParam(0, ke(G)),
  __decorateParam(1, ke(D)),
  __decorateParam(2, ke(AreScene)),
  __decorateParam(3, ke(w))
], AreLifecycle.prototype, "beforeUpdate", 1);
__decorateClass([
  w.Extend({
    name: AreNodeFeatures.onUpdate,
    scope: [AreNode]
  }),
  __decorateParam(0, ke(G)),
  __decorateParam(1, ke(AreContext)),
  __decorateParam(2, ke(A_Logger))
], AreLifecycle.prototype, "update", 1);
__decorateClass([
  w.Extend({
    name: AreNodeFeatures.onUpdate,
    after: /.*/,
    scope: [AreNode]
  }),
  __decorateParam(0, ke(G)),
  __decorateParam(1, ke(D)),
  __decorateParam(2, ke(AreScene)),
  __decorateParam(3, ke(w))
], AreLifecycle.prototype, "afterUpdate", 1);
__decorateClass([
  w.Extend({
    name: AreNodeFeatures.onBeforeUnmount,
    before: /.*/,
    scope: [AreNode]
  }),
  __decorateParam(0, ke(G)),
  __decorateParam(1, ke(D)),
  __decorateParam(2, ke(AreScene)),
  __decorateParam(3, ke(w))
], AreLifecycle.prototype, "beforeUnmount", 1);
__decorateClass([
  w.Extend({
    name: AreNodeFeatures.onUnmount,
    scope: [AreNode]
  }),
  __decorateParam(0, ke(G)),
  __decorateParam(1, ke(AreScene))
], AreLifecycle.prototype, "unmount", 1);
__decorateClass([
  w.Extend({
    name: AreNodeFeatures.onAfterUnmount,
    after: /.*/,
    scope: [AreNode]
  }),
  __decorateParam(0, ke(G)),
  __decorateParam(1, ke(D)),
  __decorateParam(2, ke(AreScene)),
  __decorateParam(3, ke(w))
], AreLifecycle.prototype, "afterUnmount", 1);
__decorateClass([
  w.Extend({
    name: AreNodeFeatures.onBeforeDestroy,
    before: /.*/,
    scope: [AreNode]
  }),
  __decorateParam(0, ke(G)),
  __decorateParam(1, ke(D)),
  __decorateParam(2, ke(w))
], AreLifecycle.prototype, "beforeDestroy", 1);
__decorateClass([
  w.Extend({
    name: ce.DESTROY,
    scope: [AreNode]
  }),
  __decorateParam(0, ke(G)),
  __decorateParam(1, ke(AreScene))
], AreLifecycle.prototype, "destroy", 1);
__decorateClass([
  w.Extend({
    name: AreNodeFeatures.onAfterDestroy,
    after: /.*/,
    scope: [AreNode]
  }),
  __decorateParam(0, ke(G)),
  __decorateParam(1, ke(D)),
  __decorateParam(2, ke(w))
], AreLifecycle.prototype, "afterDestroy", 1);
AreLifecycle = __decorateClass([
  c2.Component({
    description: "Handles the lifecycle of the AreNode and related entities such as interpolations, directives, attributes, and so on. It provides lifecycle hooks for initialization, mounting, updating, and unmounting of the nodes, allowing to manage the state and behavior of the nodes throughout their lifecycle in a structured and consistent way."
  })
], AreLifecycle);

// src/lib/AreEngine/AreEngine.constants.ts
var AreEngineFeatures = {
  Load: "_AreEngine_Load"
};

// src/lib/AreTokenizer/AreTokenizer.error.ts
var _AreTokenizerError = class _AreTokenizerError extends y {
};
__name(_AreTokenizerError, "AreTokenizerError");
var AreTokenizerError = _AreTokenizerError;

// src/lib/AreTokenizer/AreTokenizer.component.ts
var _AreTokenizer = class _AreTokenizer extends v {
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
        const t = this.tryPlainText(rest, index);
        if (t && !(this.config.trimWhitespace && !rest.trim())) tokens.push(t);
        break;
      }
      if (match.position > index) {
        const plain = source.slice(index, match.position);
        const t = this.tryPlainText(plain, index);
        if (t) {
          if (this.config.trimWhitespace && !plain.trim()) {
            if (hasMatchBefore) {
              t.content = " ";
              tokens.push(t);
            }
          } else {
            tokens.push(t);
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
      const m2 = rule.pattern.exec(slice);
      if (!m2) return null;
      return this.buildMatch(rule, m2[0], m2[0], from + m2.index, "");
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
    const rule = this.config.rules.find((r2) => !r2.opening && !r2.closing && !r2.pattern && !r2.matcher);
    if (!rule) return null;
    const match = this.buildMatch(rule, raw, raw, position, "");
    match._rule = rule;
    return match;
  }
  findRuleForMatch(match) {
    if (match._rule) return match._rule;
    return this.config.rules.find((r2) => (r2.opening ?? "") === match.opening && (r2.closing ?? "") === match.closing);
  }
};
__name(_AreTokenizer, "AreTokenizer");
__decorateClass([
  w.Extend({
    name: AreEngineFeatures.Load
    // scope: [AreEngine]
  }),
  c2.Method({
    description: "Instantiate AreNodes based on the token matches obtained from scanning the source template. This method takes the raw source string from the context, scans it for tokens using the defined syntax rules, and creates corresponding AreNode instances for each matched token. The resulting array of AreNodes represents the structured representation of the template, which can then be used for further processing, such as rendering or applying scene instructions."
  }),
  __decorateParam(0, ke(AreContext))
], _AreTokenizer.prototype, "instantiate", 1);
__decorateClass([
  w.Extend({
    name: AreNodeFeatures.onTokenize,
    scope: [AreNode]
  }),
  c2.Method({
    description: "Tokenise the input string based on the defined syntax rules. Returns an array of token matches, each containing the raw matched string, content, position, and any extracted metadata. The tokenisation process involves scanning the input string for patterns defined by the syntax rules, handling nested tokens if specified, and applying any custom extraction logic to enrich the token matches with additional data."
  }),
  __decorateParam(0, ke(G)),
  __decorateParam(1, ke(AreContext)),
  __decorateParam(2, ke(A_Logger))
], _AreTokenizer.prototype, "tokenize", 1);
var AreTokenizer = _AreTokenizer;

// src/lib/AreEngine/AreEngine.component.ts
var AreEngine = class extends v {
  async load(scope) {
    const context = scope?.resolve(AreContext) || c.scope(this).resolve(AreContext);
    context?.startPerformance();
    return this.call(AreEngineFeatures.Load, scope || c.scope(this));
  }
  async build(context, logger) {
    try {
      context.startPerformance("Build Total");
      for (const root of context.roots) {
        context.startPerformance(`Init root <${root.aseid.id}>`);
        root.init();
        context.endPerformance(`Init root <${root.aseid.id}>`);
        context.startPerformance(`Load root <${root.aseid.id}>`);
        const res = root.load();
        if (res instanceof Promise) {
          await res;
        }
        context.endPerformance(`Load root <${root.aseid.id}>`);
        context.startPerformance(`Transform root <${root.aseid.id}>`);
        root.transform();
        context.endPerformance(`Transform root <${root.aseid.id}>`);
        context.startPerformance(`Compile root <${root.aseid.id}>`);
        root.compile();
        context.endPerformance(`Compile root <${root.aseid.id}>`);
        context.endPerformance(`Root <${root.aseid.id}> Total`);
      }
      context.endPerformance("Build Total");
    } catch (error) {
      logger?.error(error);
    }
  }
  async execute(context, logger) {
    try {
      context.startPerformance("Execute Total");
      for (const root of context.roots) {
        context.startPerformance(`Mount root <${root.aseid.id}>`);
        root.mount();
        context.endPerformance(`Mount root <${root.aseid.id}>`);
      }
      context.endPerformance("Execute Total");
      context.endPerformance("Total");
      logger?.info("cyan", `UI Application started at <${context.roots.map((root) => root.aseid.id).join(", ")}> with ${context.roots.length} root nodes.`, context);
      logger?.info(
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
  async init(scope) {
    this.package(scope);
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
      logger?.info("cyan", `Injecting ${dependencyName} into ${scopeIssuerName} scope for ${thisName}...`);
      scope.register(dependency);
      return dependency;
    }
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
};
__name(AreEngine, "AreEngine");
__decorateClass([
  c2.Method({
    description: "Method does engine loading, first read of the source and tokenization."
  })
], AreEngine.prototype, "load", 1);
__decorateClass([
  c2.Method({
    description: "Method responsible for building the scene, which includes initializing root nodes, loading necessary data, applying transformations, and compiling the scene into a format that can be executed by the interpreter."
  }),
  __decorateParam(0, F.Required()),
  __decorateParam(0, ke(AreContext)),
  __decorateParam(1, ke(A_Logger))
], AreEngine.prototype, "build", 1);
__decorateClass([
  c2.Method({
    description: "Method responsible for executing the rendering process, which involves mounting the root nodes to the DOM and starting the reactive update cycle based on signals and state changes."
  }),
  __decorateParam(0, F.Required()),
  __decorateParam(0, ke(AreContext)),
  __decorateParam(1, ke(A_Logger))
], AreEngine.prototype, "execute", 1);
__decorateClass([
  w.Extend({
    name: AreEngineFeatures.Load,
    before: /.*/
  }),
  __decorateParam(0, ke(D))
], AreEngine.prototype, "init", 1);
__decorateClass([
  c2.Method({
    description: "Method to pack all necessary dependencies for the engine. This method is called during the initialization phase of the engine and ensures that all required components are registered in the container scope, allowing for proper dependency injection and management throughout the engine's lifecycle."
  })
], AreEngine.prototype, "package", 1);
__decorateClass([
  __decorateParam(0, ke(D)),
  __decorateParam(1, ke(AreSyntax)),
  __decorateParam(2, ke(AreSyntax)),
  __decorateParam(3, ke(AreTransformer)),
  __decorateParam(4, ke(AreLoader)),
  __decorateParam(5, ke(AreCompiler)),
  __decorateParam(6, ke(AreInterpreter)),
  __decorateParam(7, ke(AreLifecycle)),
  __decorateParam(8, ke(A_Logger))
], AreEngine.prototype, "verify", 1);
AreEngine = __decorateClass([
  c2.Component({
    namespace: "A-ARE",
    name: "AreEngine",
    description: "Core rendering engine for A-Concept Rendering Engine (ARE), responsible for orchestrating the loading, building, and execution of the rendering process. It manages the lifecycle of root nodes, coordinates the interactions between syntax, transformer, loader, compiler, and interpreter components, and ensures the proper initialization and mounting of the UI application."
  })
], AreEngine);

// src/engines/html/AreHTML.context.ts
var _AreHTMLEngineContext = class _AreHTMLEngineContext extends AreContext {
  constructor() {
    super(...arguments);
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
      elementToInstruction: /* @__PURE__ */ new Map(),
      /**
       * 1 Instruction = 1 Dom Node (for CreateElement instructions, for example)
       * 
       * uses ASEID
       */
      instructionToElement: /* @__PURE__ */ new Map(),
      /**
       * Event listeners attached to elements, used for proper cleanup when reverting instructions. Maps a DOM element to a map of event names and their corresponding listeners, allowing the engine to track which listeners are attached to which elements and remove them when necessary (e.g., when an instruction is reverted).
       */
      elementListeners: /* @__PURE__ */ new Map()
    };
  }
  getNodeElement(node) {
    if (typeof node === "string") {
      return this.index.nodeToHostElements.get(node);
    } else {
      return this.index.nodeToHostElements.get(node.aseid.toString());
    }
  }
  setInstructionElement(instruction, element) {
    const node = instruction.owner;
    this.index.instructionToElement.set(instruction.aseid.toString(), element);
    this.index.elementToInstruction.set(element, instruction.aseid.toString());
    if (node) {
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
  removeInstructionElement(instruction) {
    const element = this.index.instructionToElement.get(instruction.aseid.toString());
    if (element) {
      this.index.instructionToElement.delete(instruction.aseid.toString());
      this.index.elementToInstruction.delete(element);
      const node = instruction.owner;
      if (node) {
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
  addListener(element, eventName, listener) {
    if (!this.index.elementListeners.has(element)) {
      this.index.elementListeners.set(element, /* @__PURE__ */ new Map());
    }
    this.index.elementListeners.get(element).set(eventName, listener);
  }
  getListener(element, eventName) {
    return this.index.elementListeners.get(element)?.get(eventName);
  }
  removeListener(element, eventName) {
    this.index.elementListeners.get(element)?.delete(eventName);
  }
};
__name(_AreHTMLEngineContext, "AreHTMLEngineContext");
var AreHTMLEngineContext = _AreHTMLEngineContext;

// src/lib/AreInterpreter/AreInterpreter.error.ts
var _AreInterpreterError = class _AreInterpreterError extends y {
};
__name(_AreInterpreterError, "AreInterpreterError");
var AreInterpreterError = _AreInterpreterError;

// src/engines/html/components/AreDirective/AreDirective.context.ts
var _AreDirectiveContext = class _AreDirectiveContext extends A_ExecutionContext {
  constructor(aseid) {
    super(aseid.toString());
    this.scope = {};
  }
};
__name(_AreDirectiveContext, "AreDirectiveContext");
var AreDirectiveContext = _AreDirectiveContext;

// src/engines/html/DOM.interpreter.ts
var DOMInterpreter = class extends AreInterpreter {
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
      console.log("parent: ", parent);
      if (parent) {
        const mountPoint = context.getNodeElement(parent);
        if (!mountPoint) {
          throw new AreInterpreterError({
            title: "Mount Point Not Found",
            description: `Could not find a mount point for the node with id "${node.id}". Ensure that the parent node is rendered before its children, or that a valid root element with the corresponding id exists in the DOM.`
          });
        }
        const element = document.createElement(tag);
        if (mountPoint.nodeType === Node.ELEMENT_NODE) {
          mountPoint.appendChild(element);
        } else {
          mountPoint.parentNode?.insertBefore(element, mountPoint);
        }
        context.setInstructionElement(declaration, element);
      } else {
        const mountPoint = document.getElementById(node.id);
        if (!mountPoint) {
          throw new AreInterpreterError({
            title: "Mount Point Not Found",
            description: `Could not find a mount point for the node with id "${node.id}". Ensure that the parent node is rendered before its children, or that a valid root element with the corresponding id exists in the DOM.`
          });
        }
        const element = document.createElement(tag);
        element.setAttribute("data-aseid", node.aseid.toString());
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
  addAttribute(mutation, context, store, directiveContext, logger) {
    const element = context.getElementByInstruction(mutation.parent);
    if (!element) {
      throw new AreInterpreterError({
        title: "Element Not Found",
        description: `Could not find a DOM element associated with the instruction ASEID "${mutation.parent}". Ensure that the parent instruction is properly rendered and associated with a DOM element before applying attribute mutations.`
      });
    }
    const { name, content, evaluate } = mutation.payload;
    const value = evaluate ? AreCommonHelper.evaluate(content, store, {
      ...directiveContext?.scope || {}
    }) : content;
    if (mutation.cache === void 0) {
      const existingValue = element.getAttribute(name);
      const result = existingValue ? `${existingValue} ${value}` : value;
      element.setAttribute(name, result);
      mutation.cache = value;
    } else {
      const existingValue = element.getAttribute(name);
      const existingParts = existingValue ? existingValue.split(/\s+/).filter(Boolean) : [];
      const oldParts = new Set(mutation.cache.split(/\s+/).filter(Boolean));
      const newParts = value ? value.split(/\s+/).filter(Boolean) : [];
      const result = [...existingParts.filter((part) => !oldParts.has(part)), ...newParts].join(" ");
      element.setAttribute(name, result);
      mutation.cache = value;
    }
  }
  removeAttribute(mutation, context) {
    try {
      const element = context.getElementByInstruction(mutation.parent);
      if (!element) return;
      const { name } = mutation.payload;
      if (name && element.nodeType === Node.ELEMENT_NODE) {
        element?.removeAttribute(name);
      }
    } catch (error) {
      console.log("Error removing attribute:", error);
    }
  }
  addEventListener(mutation, context, store, directiveContext, logger) {
    const element = context.getElementByInstruction(mutation.parent);
    if (!element) {
      throw new AreInterpreterError({
        title: "Element Not Found",
        description: `Could not find a DOM element associated with the instruction ASEID "${mutation.parent}". Ensure that the parent instruction is properly rendered and associated with a DOM element before adding event listeners.`
      });
    }
    const handlers = AreCommonHelper.extractEmitHandlers(mutation.payload.handler);
    const handlerScope = {};
    for (const handler of handlers) {
      const handlerFn = /* @__PURE__ */ __name((...args) => {
        const event = new AreEvent(handler);
        event.set("args", args);
        event.set("element", element);
        event.set("instruction", mutation);
        mutation.owner.emit(event);
      }, "handlerFn");
      handlerScope[`$${handler}`] = handlerFn;
    }
    const callback = /* @__PURE__ */ __name((e) => {
      context.startPerformance("Click");
      const result = AreCommonHelper.evaluate(mutation.payload.handler, store, {
        ...handlerScope,
        ...directiveContext?.scope || {}
      });
      if (typeof result === "function") result(e);
    }, "callback");
    if (callback) {
      element.addEventListener(mutation.payload.name, callback);
      context.addListener(element, mutation.payload.name, callback);
    }
  }
  removeEventListener(mutation, context) {
    const element = context.getElementByInstruction(mutation.parent);
    if (!element) return;
    const { name } = mutation.payload;
    const listener = context.getListener(element, name);
    if (listener) {
      element.removeEventListener(name, listener);
      context.removeListener(element, name);
    }
  }
  addText(declaration, context, store, directiveContext, logger) {
    const node = declaration.owner.parent;
    const { content, evaluate } = declaration.payload;
    const value = evaluate ? AreCommonHelper.evaluate(content, store, {
      ...directiveContext?.scope || {}
    }) : content;
    if (!node) {
      const textNode = document.createTextNode(value);
      document.body.appendChild(textNode);
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
        const textNode = document.createTextNode(value);
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
  addComment(declaration, context, store, directiveContext, logger) {
    const node = declaration.owner.parent;
    const { content, evaluate } = declaration.payload;
    const value = evaluate ? AreCommonHelper.evaluate(content, store, {
      ...directiveContext?.scope || {}
    }) : content;
    if (!node) {
      const commentNode = document.createComment(value);
      document.body.appendChild(commentNode);
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
        const commentNode = document.createComment(value);
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
};
__name(DOMInterpreter, "DOMInterpreter");
__decorateClass([
  c2.Method({
    description: "Create an HTML element based on the provided declaration instruction. Handles both root-level mounting and child element creation based on the structural parent hierarchy."
  }),
  AreInterpreter.Apply(AreInstructionDefaultNames.Default),
  AreInterpreter.Apply(AreHTMLInstructions.AddElement),
  __decorateParam(0, ke(G)),
  __decorateParam(1, ke(AreHTMLEngineContext)),
  __decorateParam(2, ke(A_Logger))
], DOMInterpreter.prototype, "addElement", 1);
__decorateClass([
  c2.Method({
    description: "Remove an HTML element that was created by a CreateElement declaration. Cleans up the DOM and the context index."
  }),
  AreInterpreter.Revert(AreInstructionDefaultNames.Default),
  AreInterpreter.Revert(AreHTMLInstructions.AddElement),
  __decorateParam(0, ke(G)),
  __decorateParam(1, ke(AreHTMLEngineContext))
], DOMInterpreter.prototype, "removeElement", 1);
__decorateClass([
  c2.Method({
    description: "Add an attribute to an HTML element based on the provided mutation instruction."
  }),
  AreInterpreter.Apply(AreHTMLInstructions.AddAttribute),
  AreInterpreter.Update(AreHTMLInstructions.AddAttribute),
  __decorateParam(0, ke(G)),
  __decorateParam(1, ke(AreHTMLEngineContext)),
  __decorateParam(2, ke(AreStore)),
  __decorateParam(3, ke(AreDirectiveContext)),
  __decorateParam(4, ke(A_Logger))
], DOMInterpreter.prototype, "addAttribute", 1);
__decorateClass([
  c2.Method({
    description: "Remove an attribute from an HTML element based on the provided mutation instruction."
  }),
  AreInterpreter.Revert(AreHTMLInstructions.AddAttribute),
  __decorateParam(0, ke(G)),
  __decorateParam(1, ke(AreHTMLEngineContext))
], DOMInterpreter.prototype, "removeAttribute", 1);
__decorateClass([
  c2.Method({
    description: "Add an event listener to an HTML element based on the provided mutation instruction."
  }),
  AreInterpreter.Apply(AreHTMLInstructions.AddListener),
  __decorateParam(0, ke(G)),
  __decorateParam(1, ke(AreHTMLEngineContext)),
  __decorateParam(2, ke(AreStore)),
  __decorateParam(3, ke(AreDirectiveContext)),
  __decorateParam(4, ke(A_Logger))
], DOMInterpreter.prototype, "addEventListener", 1);
__decorateClass([
  c2.Method({
    description: "Remove an event listener from an HTML element based on the provided mutation instruction."
  }),
  AreInterpreter.Revert(AreHTMLInstructions.AddListener),
  __decorateParam(0, ke(G)),
  __decorateParam(1, ke(AreHTMLEngineContext))
], DOMInterpreter.prototype, "removeEventListener", 1);
__decorateClass([
  c2.Method({
    description: "Add text content to an HTML element based on the provided declaration instruction."
  }),
  AreInterpreter.Apply(AreHTMLInstructions.AddText),
  AreInterpreter.Update(AreHTMLInstructions.AddText),
  __decorateParam(0, ke(G)),
  __decorateParam(1, ke(AreHTMLEngineContext)),
  __decorateParam(2, ke(AreStore)),
  __decorateParam(3, ke(AreDirectiveContext)),
  __decorateParam(4, ke(A_Logger))
], DOMInterpreter.prototype, "addText", 1);
__decorateClass([
  c2.Method({
    description: "Remove text content from an HTML element based on the provided declaration instruction."
  }),
  AreInterpreter.Revert(AreHTMLInstructions.AddText),
  __decorateParam(0, ke(G)),
  __decorateParam(1, ke(AreHTMLEngineContext))
], DOMInterpreter.prototype, "removeText", 1);
__decorateClass([
  c2.Method({
    description: "Add a comment node to the DOM based on the provided declaration instruction."
  }),
  AreInterpreter.Apply(AreHTMLInstructions.AddComment),
  AreInterpreter.Update(AreHTMLInstructions.AddComment),
  __decorateParam(0, ke(G)),
  __decorateParam(1, ke(AreHTMLEngineContext)),
  __decorateParam(2, ke(AreStore)),
  __decorateParam(3, ke(AreDirectiveContext)),
  __decorateParam(4, ke(A_Logger))
], DOMInterpreter.prototype, "addComment", 1);
__decorateClass([
  c2.Method({
    description: "Remove a comment node from the DOM based on the provided declaration instruction."
  }),
  AreInterpreter.Revert(AreHTMLInstructions.AddComment),
  __decorateParam(0, ke(G)),
  __decorateParam(1, ke(AreHTMLEngineContext))
], DOMInterpreter.prototype, "removeComment", 1);
DOMInterpreter = __decorateClass([
  c2.Component({
    namespace: "A-ARE",
    name: "DOMInterpreter",
    description: "DOMInterpreter is a component that serves as a host for rendering AreNodes into HTML. It provides the necessary context and environment for AreNodes to be rendered and interact with the DOM."
  })
], DOMInterpreter);

// src/engines/html/nodes/AreComment.node.ts
var _AreComment = class _AreComment extends AreHTMLNode {
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
__name(_AreComment, "AreComment");
var AreComment = _AreComment;

// src/engines/html/nodes/AreComponent.node.ts
var AreComponentNode = class extends AreHTMLNode {
  /**
   * A custom component associated with this node, which can be used to provide custom logic and behavior for the node. This component is typically defined in the context and can be resolved based on the node's type or other identifying information. The component can include its own template, markup, styles, and features that are specific to the functionality it provides.
   * 
   * Example: If the node type is "custom-component", the corresponding component would be resolved from the context and can be used to provide custom rendering and behavior for nodes of that type.
   * 
   * [!] Note: The component is optional and may not be defined for all nodes. If no component is associated with the node, it will be treated as a standard HTML element or a basic node without custom logic.
   */
  get component() {
    return this.scope.resolve(h.toPascalCase(this.aseid.entity));
  }
};
__name(AreComponentNode, "AreComponentNode");
AreComponentNode = __decorateClass([
  c2.Entity({
    namespace: "A-ARE",
    name: "AreComponentNode",
    description: "AreComponentNode represents a node in the scene graph that corresponds to a component. It extends the base AreNode and includes additional properties and methods specific to component nodes, such as handling attributes, bindings, directives, events, styles, and interpolations associated with the component."
  })
], AreComponentNode);

// src/engines/html/nodes/AreRoot.node.ts
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
    return this.scope.resolve(h.toPascalCase(this.aseid.entity));
  }
};
__name(AreRootNode, "AreRootNode");
AreRootNode = __decorateClass([
  c2.Entity({
    namespace: "A-ARE",
    name: "AreRootNode",
    description: "AreRootNode represents the root node in the scene graph. It extends the base AreHTMLNode and includes additional properties and methods specific to the root node, such as handling the root element and its associated component."
  })
], AreRootNode);

// src/engines/html/AreHTML.tokenizer.ts
var _AreHTMLTokenizer = class _AreHTMLTokenizer extends AreTokenizer {
  constructor() {
    super(...arguments);
    this.ATTR_PATTERN = /([$:@]?[\w-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>/"'=]+)))?/g;
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
    for (let i = 0; i < withoutTag.length; i++) {
      const ch = withoutTag[i];
      if (ch === '"' && !inSingle) inDouble = !inDouble;
      else if (ch === "'" && !inDouble) inSingle = !inSingle;
      else if (ch === ">" && !inSingle && !inDouble) {
        endIdx = i;
        break;
      }
    }
    const attrString = withoutTag.slice(0, endIdx).replace(/\s*\/?\s*$/, "").trim();
    const results = [];
    for (const match of attrString.matchAll(this.ATTR_PATTERN)) {
      const raw = match[0];
      const full = match[1];
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
__name(_AreHTMLTokenizer, "AreHTMLTokenizer");
__decorateClass([
  w.Extend({
    name: AreNodeFeatures.onTokenize,
    scope: [AreComponentNode, AreRootNode]
  }),
  __decorateParam(0, ke(G)),
  __decorateParam(1, ke(AreContext)),
  __decorateParam(2, ke(A_Logger))
], _AreHTMLTokenizer.prototype, "tokenize", 1);
var AreHTMLTokenizer = _AreHTMLTokenizer;

// src/engines/html/AreHTML.lifecycle.ts
var _AreHTMLLifecycle = class _AreHTMLLifecycle extends AreLifecycle {
  initComponent(node, scope, context, logger, ...args) {
    super.init(node, scope, context, logger, ...args);
  }
  initRoot(node, scope, context, logger, ...args) {
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
  updateDirectiveAttribute(directive, scope, feature, logger, ...args) {
    if (directive.component) {
      feature.chain(directive.component, AreDirectiveFeatures.Update, directive.owner.scope);
    } else {
      logger?.warning(`Directive handler component not found for directive: ${directive.name}. Make sure to create a component named "AreDirective${h.toPascalCase(directive.name)}" to handle this directive.`);
    }
  }
};
__name(_AreHTMLLifecycle, "AreHTMLLifecycle");
__decorateClass([
  AreLifecycle.Init(AreComponentNode),
  __decorateParam(0, ke(G)),
  __decorateParam(1, ke(D)),
  __decorateParam(2, ke(AreHTMLEngineContext)),
  __decorateParam(3, ke(A_Logger))
], _AreHTMLLifecycle.prototype, "initComponent", 1);
__decorateClass([
  AreLifecycle.Init(AreRootNode),
  __decorateParam(0, ke(G)),
  __decorateParam(1, ke(D)),
  __decorateParam(2, ke(AreHTMLEngineContext)),
  __decorateParam(3, ke(A_Logger))
], _AreHTMLLifecycle.prototype, "initRoot", 1);
__decorateClass([
  AreLifecycle.Init(AreText),
  __decorateParam(0, ke(G)),
  __decorateParam(1, ke(D)),
  __decorateParam(2, ke(AreHTMLEngineContext)),
  __decorateParam(3, ke(A_Logger))
], _AreHTMLLifecycle.prototype, "initText", 1);
__decorateClass([
  AreLifecycle.Init(AreInterpolation),
  __decorateParam(0, ke(G)),
  __decorateParam(1, ke(D)),
  __decorateParam(2, ke(AreHTMLEngineContext)),
  __decorateParam(3, ke(A_Logger))
], _AreHTMLLifecycle.prototype, "initInterpolation", 1);
__decorateClass([
  w.Extend({
    name: AreAttributeFeatures.Update,
    scope: [AreDirectiveAttribute]
  }),
  __decorateParam(0, ke(G)),
  __decorateParam(1, ke(D)),
  __decorateParam(2, ke(w)),
  __decorateParam(3, ke(A_Logger))
], _AreHTMLLifecycle.prototype, "updateDirectiveAttribute", 1);
var AreHTMLLifecycle = _AreHTMLLifecycle;

// src/engines/html/AreHTML.transformer.ts
var _AreHTMLTransformer = class _AreHTMLTransformer extends AreTransformer {
  transformDirectiveAttribute(directive, store, feature, logger, ...args) {
    store.watch(directive);
    if (directive.component) {
      feature.chain(directive.component, AreDirectiveFeatures.Transform, directive.owner.scope);
    } else {
      logger?.warning(`Directive handler component not found for directive: ${directive.name}. Make sure to create a component named "AreDirective${h.toPascalCase(directive.name)}" to handle this directive.`);
    }
    store.unwatch(directive);
  }
};
__name(_AreHTMLTransformer, "AreHTMLTransformer");
__decorateClass([
  w.Extend({
    name: AreAttributeFeatures.Transform,
    scope: [AreDirectiveAttribute]
  }),
  __decorateParam(0, ke(G)),
  __decorateParam(1, ke(AreStore)),
  __decorateParam(2, ke(w)),
  __decorateParam(3, ke(A_Logger))
], _AreHTMLTransformer.prototype, "transformDirectiveAttribute", 1);
var AreHTMLTransformer = _AreHTMLTransformer;

// src/engines/html/AreHTML.engine.ts
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
          extract: /* @__PURE__ */ __name((_, match) => ({ key: match.content }), "extract")
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
  async init(scope) {
    this.package(scope, {
      context: new AreHTMLEngineContext(),
      syntax: this.DefaultSyntax,
      compiler: AreHTMLCompiler,
      interpreter: DOMInterpreter,
      tokenizer: AreHTMLTokenizer,
      lifecycle: AreHTMLLifecycle,
      transformer: AreHTMLTransformer
    });
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
            level++;
            searchIndex = nextOpen + tagName.length + 1;
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
    for (let i = from; i < source.length; i++) {
      const ch = source[i];
      if (ch === '"' && !inSingle) inDouble = !inDouble;
      else if (ch === "'" && !inDouble) inSingle = !inSingle;
      else if (ch === ">" && !inSingle && !inDouble) return i;
    }
    return -1;
  }
};
__name(AreHTMLEngine, "AreHTMLEngine");
__decorateClass([
  w.Extend({
    name: A_ServiceFeatures.onBeforeLoad,
    before: /.*/
  }),
  __decorateParam(0, ke(D))
], AreHTMLEngine.prototype, "init", 1);
AreHTMLEngine = __decorateClass([
  c2.Component({
    namespace: "A-ARE",
    name: "AreHTMLEngine",
    description: "HTML Rendering Engine for A-Concept Rendering Engine (ARE), responsible for processing and rendering HTML templates within the ARE framework."
  })
], AreHTMLEngine);

// src/engines/html/AreApp.container.ts
var _a80;
var _AreApp = class _AreApp extends A_Service {
  async [_a80 = A_ServiceFeatures.onStart](engine, context, logger) {
    try {
      await engine.load();
      await engine.build(context, logger);
      await engine.execute(context, logger);
    } catch (error) {
      logger?.error(error);
    }
  }
};
__name(_AreApp, "AreApp");
__decorateClass([
  w.Extend(),
  __decorateParam(0, F.Required()),
  __decorateParam(0, ke(AreHTMLEngine)),
  __decorateParam(1, F.Required()),
  __decorateParam(1, ke(AreContext)),
  __decorateParam(2, ke(A_Logger))
], _AreApp.prototype, _a80, 1);
var AreApp = _AreApp;

// src/engines/html/components/AreRoot/AreRoot.component.ts
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
  async onSignal(root, vector, store, logger) {
  }
};
__name(AreRoot, "AreRoot");
__decorateClass([
  Are.Signal,
  __decorateParam(0, ke(G)),
  __decorateParam(1, ke(A_SignalVector)),
  __decorateParam(2, ke(AreStore)),
  __decorateParam(3, ke(A_Logger))
], AreRoot.prototype, "onSignal", 1);
AreRoot = __decorateClass([
  c2.Component({
    namespace: "A-ARE",
    name: "AreRoot",
    description: "The AreRoot component serves as the foundational entry point for the A-Concept Rendering Engine (ARE). It is responsible for initializing the rendering process, managing the root node of the component tree, and handling signal-based rendering logic. The AreRoot component processes incoming signals to determine which child components to render, allowing for dynamic and responsive UI updates based on application state and user interactions."
  })
], AreRoot);

// src/lib/AreSignals/AreSignal.entity.ts
var _AreSignal = class _AreSignal extends A_Signal {
};
__name(_AreSignal, "AreSignal");
var AreSignal = _AreSignal;

// src/lib/AreSignals/entities/AreInit.signal.ts
var _AreInit = class _AreInit extends AreSignal {
  static default() {
    return new _AreInit({ data: { ready: false } });
  }
};
__name(_AreInit, "AreInit");
var AreInit = _AreInit;

// node_modules/@adaas/a-utils/dist/browser/a-route.mjs
var _a81;
var A_Route = (_a81 = class extends L {
  constructor(url) {
    super();
    this.url = url instanceof RegExp ? url.source : url;
  }
  /**
   * Returns path only without query and hash
   */
  get path() {
    const p = this.url.split("?")[0].split("#")[0];
    if (p.includes("://")) {
      const pathStartIndex = p.indexOf("/", p.indexOf("://") + 3);
      if (pathStartIndex === -1) {
        return "/";
      } else {
        const path = p.slice(pathStartIndex);
        return path.endsWith("/") ? path.slice(0, -1) : path;
      }
    }
    return p.endsWith("/") ? p.slice(0, -1) : p;
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
    for (let i = 0; i < maskSegments.length; i++) {
      const maskSegment = maskSegments[i];
      const urlSegment = urlSegments[i];
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
}, __name(_a81, "A_Route"), _a81);
A_Route = __decorateClass2([
  c2.Fragment({
    namespace: "A-Utils",
    name: "A-Route",
    description: "Route fragment that defines URL patterns for routing purposes. It supports dynamic parameters and query extraction, allowing for flexible route definitions. This fragment can be used in routing systems to match incoming URLs against defined routes and extract relevant parameters and query strings."
  })
], A_Route);

// src/lib/AreSignals/entities/AreRoute.signal.ts
var _AreRoute = class _AreRoute extends AreSignal {
  constructor(path) {
    super({
      data: new A_Route(path)
    });
  }
  get route() {
    return this.data;
  }
  static default() {
    return new _AreRoute(document.location.href);
  }
  compare(other) {
    return this.route.toRegExp().test(other.data.toString());
  }
};
__name(_AreRoute, "AreRoute");
var AreRoute = _AreRoute;

// examples/jumpstart/src/components/List.component.ts
var _ListComponent = class _ListComponent extends Are {
  async template(node) {
    node.setContent(`
         <div class="menu-section">Main</div>
        <ul class="menu">
            <li @click="$handleClick('Dashboard')" :class="active==='Dashboard' ? 'menu-item-active' : ''" class="menu-item "><span class="menu-icon">\u229E</span> <span class="menu-text">{{item1}}</span></li>
            <li $if="active=='Dashboard'" @click="$handleClick('Users')" :class="active==='Users' ? 'menu-item-active' : ''" class="menu-item"><span class="menu-icon">\u22A1</span> <span class="menu-text">{{item2}}</span> <span class="menu-badge">{{usersBadge}}</span></li>
            <li @click="$handleClick('Products')" :class="active==='Products' ? 'menu-item-active' : ''" class="menu-item"><span class="menu-icon">\u22A0</span> <span class="menu-text">{{item3}}</span></li>
            <li @click="$handleClick('Orders')" :class="active==='Orders' ? 'menu-item-active' : ''" class="menu-item"><span class="menu-icon">\u229F</span> <span class="menu-text">{{item4}}</span></li>
        </ul>
        <div class="menu-section">System</div>    
            <button @click="$add">Add +</button>
            <ul class="menu">
                <li 
                $for="item in items" @click="$handleClick(item.name)"
                $if="active=='Dashboard'" 
                :class="active===item.name ? 'menu-item-active' : ''" 
                class="menu-item">
                <span class="menu-icon">\u2299</span> 
                <span class="menu-text">{{item.name}}</span> 
                <span $if="item.badge > 0" class="menu-badge">{{item.badge}}</span>
                <button @click="$remove(item)">+</button>
                </li>
            </ul>
        `);
  }
  async data(store) {
    store.set({
      active: "Dashboard",
      item1: "Dashboard",
      item2: "Users",
      item3: "Products",
      item4: "Orders",
      item5: "Messages",
      item6: "Settings",
      usersBadge: "24",
      msgBadge: "3",
      items: [
        { name: "Messages", badge: 3 },
        { name: "Settings", badge: 0 }
      ]
    });
  }
  add(node, event, context, store, logger) {
    const currentItems = store.get("items") || [];
    currentItems.push({
      name: `Item ${currentItems.length + 1}`,
      badge: 0
    });
    store.set("items", currentItems);
  }
  remove(node, event, context, store, logger) {
    const itemToRemove = event.get("args")?.[0];
    console.log("Removing item:", itemToRemove, "from store:", store);
    if (!itemToRemove) {
      logger.warning("No item specified for removal");
      return;
    }
    const currentItems = store.get("items") || [];
    const updatedItems = currentItems.filter((item) => item.name !== itemToRemove.name);
    store.set("items", updatedItems);
  }
  async handleClick(node, event, context, store, logger) {
    try {
      console.log("Menu item clicked!", event.get("args"), store);
      const item = event.get("args")?.[0] || "Dashboard";
      store.set("active", item);
      context.endPerformance("Click");
      logger.info(`Menu item clicked: ${item}`, ...context.performance);
    } catch (error) {
      logger.error(error);
    }
  }
};
__name(_ListComponent, "ListComponent");
__decorateClass([
  Are.Template,
  __decorateParam(0, ke(G))
], _ListComponent.prototype, "template", 1);
__decorateClass([
  Are.Data,
  __decorateParam(0, ke(AreStore))
], _ListComponent.prototype, "data", 1);
__decorateClass([
  Are.EventHandler,
  __decorateParam(0, ke(G)),
  __decorateParam(1, ke(AreEvent)),
  __decorateParam(2, ke(AreContext)),
  __decorateParam(3, ke(AreStore)),
  __decorateParam(4, ke(A_Logger))
], _ListComponent.prototype, "add", 1);
__decorateClass([
  Are.EventHandler,
  __decorateParam(0, ke(G)),
  __decorateParam(1, ke(AreEvent)),
  __decorateParam(2, ke(AreContext)),
  __decorateParam(3, ke(AreStore)),
  __decorateParam(4, ke(A_Logger))
], _ListComponent.prototype, "remove", 1);
__decorateClass([
  Are.EventHandler,
  __decorateParam(0, ke(G)),
  __decorateParam(1, ke(AreEvent)),
  __decorateParam(2, ke(AreContext)),
  __decorateParam(3, ke(AreStore)),
  __decorateParam(4, ke(A_Logger))
], _ListComponent.prototype, "handleClick", 1);
var ListComponent = _ListComponent;

// src/engines/html/components/AreDirective/AreDirective.meta.ts
var _AreDirectiveMeta = class _AreDirectiveMeta extends R {
  constructor() {
    super(...arguments);
    this.priority = 0;
  }
};
__name(_AreDirectiveMeta, "AreDirectiveMeta");
var AreDirectiveMeta = _AreDirectiveMeta;

// src/engines/html/components/AreDirective/AreDirective.component.ts
var AreDirective = class extends v {
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
      return w.Extend({
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
      return w.Extend({
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
      return w.Extend({
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
  __decorateParam(0, ke(G))
], AreDirective.prototype, "transform", 1);
__decorateClass([
  w.Extend({
    name: AreDirectiveFeatures.Compile,
    scope: [AreDirective]
  }),
  __decorateParam(0, ke(G))
], AreDirective.prototype, "compile", 1);
__decorateClass([
  w.Extend({
    name: AreDirectiveFeatures.Update,
    scope: [AreDirective]
  }),
  __decorateParam(0, ke(G))
], AreDirective.prototype, "update", 1);
AreDirective = __decorateClass([
  m.Define(AreDirectiveMeta)
], AreDirective);

// src/engines/html/directives/AreDirectiveIf.directive.ts
var AreDirectiveIf = class extends AreDirective {
  transform(attribute, scope, store, scene, logger, ...args) {
    logger.debug(`[Transform] directive $IF for <${attribute.owner.aseid.toString()}>`);
    const node = attribute.owner;
    const ifTemplate = node.cloneWithScope();
    const ifAttr = ifTemplate.attributes.find((d2) => d2.name === attribute.name);
    if (ifAttr) {
      ifTemplate.scope.deregister(ifAttr);
      node.scope.register(ifAttr);
    }
    node.init();
    node.addChild(ifTemplate);
    ifTemplate.scene.deactivate();
    attribute.template = ifTemplate;
  }
  compile(attribute, store, scene, directiveContext, ...args) {
    console.log('Compiling directive "if" with attribute content:', attribute);
    attribute.value = AreCommonHelper.evaluate(attribute.content, store, {
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
  update(attribute, store, scope, scene, ...args) {
    attribute.value = AreCommonHelper.evaluate(attribute.content, store);
    if (attribute.value) {
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
  __decorateParam(0, ke(G)),
  __decorateParam(1, ke(D)),
  __decorateParam(2, ke(AreStore)),
  __decorateParam(3, ke(AreScene)),
  __decorateParam(4, ke(A_Logger))
], AreDirectiveIf.prototype, "transform", 1);
__decorateClass([
  AreDirective.Compile,
  __decorateParam(0, ke(G)),
  __decorateParam(1, ke(AreStore)),
  __decorateParam(2, ke(AreScene)),
  __decorateParam(3, ke(AreDirectiveContext))
], AreDirectiveIf.prototype, "compile", 1);
__decorateClass([
  AreDirective.Update,
  __decorateParam(0, ke(G)),
  __decorateParam(1, ke(AreStore)),
  __decorateParam(2, ke(D)),
  __decorateParam(3, ke(AreScene))
], AreDirectiveIf.prototype, "update", 1);
AreDirectiveIf = __decorateClass([
  AreDirective.Priority(2)
], AreDirectiveIf);

// src/engines/html/directives/AreDirectiveFor.directive.ts
var AreDirectiveFor = class extends AreDirective {
  transform(attribute, scope, store, scene, logger, ...args) {
    logger.debug(`[Transform] directive $FOR for <${attribute.owner.aseid.toString()}>`);
    const node = attribute.owner;
    const forTemplate = node.cloneWithScope();
    const forAttr = forTemplate.attributes.find((d2) => d2.name === attribute.name);
    if (forAttr) {
      forTemplate.scope.deregister(forAttr);
      node.scope.register(forAttr);
    }
    node.init();
    attribute.template = forTemplate;
    const { key, index, arrayExpr } = this.parseExpression(attribute.content);
    const array = this.resolveArray(store, arrayExpr, attribute.content);
    attribute.value = array;
    console.log('Initial array for "for" directive:', scene);
    for (let i = 0; i < array.length; i++) {
      this.spawnItemNode(attribute.template, attribute.owner, key, index, array[i], i);
    }
    console.log('Template for "for" directive:', forTemplate);
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
    const { key, index, arrayExpr } = this.parseExpression(attribute.content);
    const newArray = this.resolveArray(store, arrayExpr, attribute.content);
    const owner = attribute.owner;
    const currentChildren = [...owner.children];
    attribute.value = newArray;
    const newLen = newArray.length;
    const newItemSet = new Set(newArray);
    const keptChildren = [];
    const removedChildren = [];
    for (const child of currentChildren) {
      const ctx = child.scope.resolveFlat(AreDirectiveContext);
      if (ctx && newItemSet.has(ctx.scope[key])) {
        keptChildren.push(child);
      } else {
        removedChildren.push(child);
      }
    }
    for (const child of removedChildren) {
      child.unmount();
      owner.removeChild(child);
    }
    for (let i = 0; i < keptChildren.length; i++) {
      let directiveContext = keptChildren[i].scope.resolveFlat(AreDirectiveContext);
      if (!directiveContext) {
        directiveContext = new AreDirectiveContext(keptChildren[i].aseid);
        keptChildren[i].scope.register(directiveContext);
      }
      directiveContext.scope = {
        ...directiveContext.scope,
        [key]: newArray[i],
        [index || "index"]: i
      };
    }
    for (let i = keptChildren.length; i < newLen; i++) {
      const itemNode = this.spawnItemNode(attribute.template, owner, key, index, newArray[i], i);
      itemNode.transform();
      itemNode.compile();
      itemNode.mount();
    }
  }
  // ─────────────────────────────────────────────────────────────────────────────
  // ── Helpers ──────────────────────────────────────────────────────────────────
  // ─────────────────────────────────────────────────────────────────────────────
  /**
   * Parses the $for expression string into its constituent parts.
   *
   * Supported formats:
   *   item in items
   *   item, index in items
   *   (item, index) in items
   *   item in filter(items)
   *   item, index in filter(items, 'active')
   */
  parseExpression(content) {
    const inIndex = content.lastIndexOf(" in ");
    const keyAndIndex = content.slice(0, inIndex).trim().replace(/^\(|\)$/g, "");
    const arrayExpr = content.slice(inIndex + 4).trim();
    const keyParts = keyAndIndex.split(",").map((p) => p.trim());
    return {
      key: keyParts[0],
      index: keyParts[1] || void 0,
      arrayExpr
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
      const rawArgs = callMatch[2].split(",").map((a2) => a2.trim());
      const resolvedArgs = rawArgs.map((arg) => {
        if (arg.startsWith("'") && arg.endsWith("'")) return arg.slice(1, -1);
        if (arg.startsWith('"') && arg.endsWith('"')) return arg.slice(1, -1);
        if (!isNaN(Number(arg))) return Number(arg);
        return store.get(arg);
      });
      result = fn(...resolvedArgs);
    } else {
      result = store.get(arrayExpr);
    }
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
  spawnItemNode(template, owner, key, index, item, i) {
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
      [index || "index"]: i
    };
    itemNode.scene.activate();
    return itemNode;
  }
};
__name(AreDirectiveFor, "AreDirectiveFor");
__decorateClass([
  AreDirective.Transform,
  __decorateParam(0, ke(G)),
  __decorateParam(1, ke(D)),
  __decorateParam(2, ke(AreStore)),
  __decorateParam(3, ke(AreScene)),
  __decorateParam(4, ke(A_Logger))
], AreDirectiveFor.prototype, "transform", 1);
__decorateClass([
  AreDirective.Compile,
  __decorateParam(0, ke(G)),
  __decorateParam(1, ke(AreStore)),
  __decorateParam(2, ke(AreScene))
], AreDirectiveFor.prototype, "compile", 1);
__decorateClass([
  AreDirective.Update,
  __decorateParam(0, ke(G)),
  __decorateParam(1, ke(AreStore)),
  __decorateParam(2, ke(AreScene))
], AreDirectiveFor.prototype, "update", 1);
AreDirectiveFor = __decorateClass([
  AreDirective.Priority(1)
], AreDirectiveFor);

// examples/jumpstart/src/concept.ts
(async () => {
  try {
    const container = new AreApp({
      name: "ARE Jumpstart",
      components: [
        // ----------------------------------
        // Allowed Entities 
        // ----------------------------------
        // ............
        // ----------------------------------
        // Allowed Commands 
        // ----------------------------------
        // ............
        // ----------------------------------
        // UI Components 
        // ----------------------------------
        ABtn,
        ListComponent,
        // ----------------------------------
        // Directives 
        // ----------------------------------
        AreDirectiveIf,
        AreDirectiveFor,
        // ----------------------------------
        // Engine Components 
        // ----------------------------------
        A_SignalBus,
        // ----------------------------------
        // Addons 
        // ----------------------------------
        AreRoot,
        ConfigReader,
        AreHTMLEngine,
        A_Logger
      ],
      entities: [
        // ............
        AreInit,
        AreRoute
      ],
      fragments: [
        new AreHTMLEngineContext(document.body.innerHTML),
        new A_Config({
          defaults: {
            [A_LOGGER_ENV_KEYS.LOG_LEVEL]: "info"
          }
        })
      ]
    });
    const concept = new Ce({
      name: "adaas-are-example-jumpstart",
      fragments: [new A_Config({
        variables: ["CONFIG_VERBOSE", "DEV_MODE"],
        defaults: {
          CONFIG_VERBOSE: true,
          DEV_MODE: true
        }
      })],
      components: [A_Logger, ConfigReader, A_Polyfill],
      containers: [container]
    });
    console.log("Building Concept...");
    await concept.load();
    console.log("\u2713 Concept loaded successfully.");
    await concept.start();
  } catch (error) {
    const logger = c.root.resolve(A_Logger);
    logger.error(error);
  }
})();
