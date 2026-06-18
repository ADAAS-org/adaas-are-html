var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i6 = decorators.length - 1, decorator; i6 >= 0; i6--)
    if (decorator = decorators[i6])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
var __decorateParam = (index, decorator) => (target, key) => decorator(target, key, index);

// node_modules/@adaas/a-concept/dist/browser/index.mjs
var gt = Object.defineProperty;
var p = /* @__PURE__ */ __name((u2, e) => gt(u2, "name", { value: e, configurable: true }), "p");
var _a;
var De = (_a = class {
  constructor(e = {}) {
    this._name = e.name || this.constructor.name;
  }
  get name() {
    return this._name;
  }
  toJSON() {
    return { name: this.name };
  }
}, __name(_a, "De"), _a);
p(De, "A_Fragment");
var H = De;
var yt = ((o3) => (o3.INITIALIZED = "INITIALIZED", o3.PROCESSING = "PROCESSING", o3.COMPLETED = "COMPLETED", o3.INTERRUPTED = "INTERRUPTED", o3.FAILED = "FAILED", o3))(yt || {});
var _a2;
var Ne = (_a2 = class {
  static toUpperSnakeCase(e) {
    return e.trim().replace(/([a-z])([A-Z])/g, "$1_$2").replace(/[^a-zA-Z0-9]+/g, "_").replace(/_+/g, "_").replace(/^_|_$/g, "").toUpperCase();
  }
  static toCamelCase(e) {
    return e.trim().replace(/[^a-zA-Z0-9]+/g, " ").split(" ").filter(Boolean).map((t4, r8) => r8 === 0 ? t4.toLowerCase() : t4.charAt(0).toUpperCase() + t4.slice(1).toLowerCase()).join("");
  }
  static toPascalCase(e) {
    return e.trim().replace(/([a-z])([A-Z])/g, "$1 $2").replace(/[^a-zA-Z0-9]+/g, " ").split(" ").filter(Boolean).map((t4) => t4.charAt(0).toUpperCase() + t4.slice(1).toLowerCase()).join("");
  }
  static toKebabCase(e) {
    return e.replace(/[^a-zA-Z0-9]+/g, " ").replace(/([a-z0-9])([A-Z])/g, "$1 $2").trim().replace(/\s+/g, "-").toLowerCase();
  }
}, __name(_a2, "Ne"), _a2);
p(Ne, "A_FormatterHelper");
var P = Ne;
var _a3;
var Me = (_a3 = class {
  static generateTimeId(e = { timestamp: /* @__PURE__ */ new Date(), random: Math.random().toString(36).slice(2, 8) }) {
    let t4 = e.timestamp.getTime().toString(36), r8 = e.random;
    return `${t4}-${r8}`;
  }
  static parseTimeId(e) {
    let [t4, r8] = e.split("-");
    return { timestamp: new Date(parseInt(t4, 36)), random: r8 };
  }
  static formatWithLeadingZeros(e, t4 = 10) {
    return String(e).padStart(t4 + 1, "0").slice(-t4);
  }
  static removeLeadingZeros(e) {
    return String(Number(e));
  }
  static hashString(e) {
    let t4 = 0, r8, n6;
    if (e.length === 0) return t4.toString();
    for (r8 = 0; r8 < e.length; r8++) n6 = e.charCodeAt(r8), t4 = (t4 << 5) - t4 + n6, t4 |= 0;
    return t4.toString();
  }
}, __name(_a3, "Me"), _a3);
p(Me, "A_IdentityHelper");
var G = Me;
var _a4;
var ue = (_a4 = class {
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
}, __name(_a4, "ue"), _a4);
p(ue, "A_BasicTypeGuards");
var I = ue;
var _a5;
var k = (_a5 = class {
  static isASEID(e) {
    return this.regexp.test(e);
  }
  static compare(e, t4) {
    if (!e || !t4) return false;
    if (I.isString(e) && this.isASEID(e) === false) throw new Error(`Invalid ASEID format provided: ${e}`);
    if (I.isString(t4) && this.isASEID(t4) === false) throw new Error(`Invalid ASEID format provided: ${t4}`);
    let r8 = e instanceof _a5 ? e : new _a5(e), n6 = t4 instanceof _a5 ? t4 : new _a5(t4);
    return r8.toString() === n6.toString();
  }
  constructor(e) {
    this.verifyInput(e), this.getInitializer(e).call(this, e);
  }
  get concept() {
    return this._concept || _.concept;
  }
  get scope() {
    return this._scope || _.root.name;
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
    return G.hashString(this.toString());
  }
  getInitializer(e) {
    switch (true) {
      case I.isString(e):
        return this.fromString;
      case I.isObject(e):
        return this.fromObject;
      default:
        throw new Error("Invalid parameters provided to ASEID constructor");
    }
  }
  fromString(e) {
    let [t4, r8, n6] = e.split("@"), [o3, s4, a4] = r8.split(":"), c3 = a4.includes(".") ? a4.split(".")[0] : void 0, l5 = a4.includes(".") ? a4.split(".")[1] : a4;
    this._concept = t4 || _.root.name, this._scope = o3 || _.root.name, this._entity = s4, this._id = l5, this._version = n6, this._shard = c3;
  }
  fromObject(e) {
    this._concept = e.concept ? _a5.isASEID(e.concept) ? new _a5(e.concept).id : e.concept : _.concept, this._scope = e.scope ? I.isNumber(e.scope) ? G.formatWithLeadingZeros(e.scope) : _a5.isASEID(e.scope) ? new _a5(e.scope).id : e.scope : _.root.name, this._entity = e.entity, this._id = I.isNumber(e.id) ? G.formatWithLeadingZeros(e.id) : e.id, this._version = e.version, this._shard = e.shard;
  }
  toString() {
    return `${this.concept}@${this.scope}:${this.entity}:${this.shard ? this.shard + "." + this.id : this.id}${this.version ? "@" + this.version : ""}`;
  }
  toJSON() {
    return { concept: this._concept, scope: this._scope, entity: this._entity, id: this._id, version: this._version, shard: this._shard };
  }
  verifyInput(e) {
    switch (true) {
      case (I.isString(e) && !_a5.isASEID(e)):
        throw new Error("Invalid ASEID format provided");
      case (I.isObject(e) && !e.id):
        throw new Error("ASEID id is required");
      case (I.isObject(e) && !e.entity):
        throw new Error("ASEID entity is required");
    }
  }
}, __name(_a5, "k"), _a5);
p(k, "ASEID"), k.regexp = new RegExp("^[a-z|A-Z|0-9|-]+@[a-z|A-Z|0-9|-]+:[a-z|A-Z|0-9|-]+:[a-z|A-Z|0-9|\\.|-]+(@v[0-9|\\.]+|@lts)?$");
var w = k;
var de = { UNEXPECTED_ERROR: "A-Error Unexpected Error", VALIDATION_ERROR: "A-Error Validation Error" };
var mt = "If you see this error please let us know.";
var _a6;
var Oe = (_a6 = class {
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
  static set(e, t4) {
    this[e] = t4;
  }
  static getAll() {
    return {};
  }
  static getAllKeys() {
    return [];
  }
}, __name(_a6, "Oe"), _a6);
p(Oe, "A_CONCEPT_BASE_ENV");
var Pe = Oe;
var le = { A_CONCEPT_NAME: "A_CONCEPT_NAME", A_CONCEPT_ROOT_SCOPE: "A_CONCEPT_ROOT_SCOPE", A_CONCEPT_ENVIRONMENT: "A_CONCEPT_ENVIRONMENT", A_CONCEPT_RUNTIME_ENVIRONMENT: "A_CONCEPT_RUNTIME_ENVIRONMENT", A_CONCEPT_ROOT_FOLDER: "A_CONCEPT_ROOT_FOLDER", A_ERROR_DEFAULT_DESCRIPTION: "A_ERROR_DEFAULT_DESCRIPTION" };
var Re = [le.A_CONCEPT_NAME, le.A_CONCEPT_ROOT_SCOPE, le.A_CONCEPT_ENVIRONMENT, le.A_CONCEPT_RUNTIME_ENVIRONMENT, le.A_CONCEPT_ROOT_FOLDER, le.A_ERROR_DEFAULT_DESCRIPTION];
var _a7;
var ke = (_a7 = class extends Pe {
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
  static set(e, t4) {
    window.__A_CONCEPT_ENVIRONMENT_ENV__ || (window.__A_CONCEPT_ENVIRONMENT_ENV__ = {}), window.__A_CONCEPT_ENVIRONMENT_ENV__[e] = t4;
  }
  static getAll() {
    let e = {};
    return window.__A_CONCEPT_ENVIRONMENT_ENV__ && Object.keys(window.__A_CONCEPT_ENVIRONMENT_ENV__).forEach((t4) => {
      e[t4] = window.__A_CONCEPT_ENVIRONMENT_ENV__[t4];
    }), Re.forEach((t4) => {
      e[t4] = this.get(t4);
    }), e;
  }
  static getAllKeys() {
    let e = /* @__PURE__ */ new Set();
    return window.__A_CONCEPT_ENVIRONMENT_ENV__ && Object.keys(window.__A_CONCEPT_ENVIRONMENT_ENV__).forEach((t4) => {
      e.add(t4);
    }), Re.forEach((t4) => {
      e.add(t4);
    }), Array.from(e);
  }
}, __name(_a7, "ke"), _a7);
p(ke, "A_CONCEPT_ENV");
var J = ke;
var _a8;
var j = (_a8 = class extends Error {
  static get entity() {
    return P.toKebabCase(this.name);
  }
  static get concept() {
    return _.concept;
  }
  static get scope() {
    return _.root.name;
  }
  constructor(e, t4) {
    switch (true) {
      case e instanceof _a8:
        return e;
      case e instanceof Error:
        super(e.message);
        break;
      case I.isErrorSerializedType(e):
        super(e.message);
        break;
      case (I.isErrorConstructorType(e) && "description" in e):
        super(`[${e.title}]: ${e.description}`);
        break;
      case (I.isErrorConstructorType(e) && !("description" in e)):
        super(e.title);
        break;
      case (I.isString(e) && !t4):
        super(e);
        break;
      case (I.isString(e) && !!t4):
        super(`[${e}]: ${t4}`);
        break;
      default:
        super("An unknown error occurred.");
    }
    this.getInitializer(e, t4).call(this, e, t4);
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
    return this._code || P.toKebabCase(this.title);
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
    return this._description || String(J.A_ERROR_DEFAULT_DESCRIPTION) || mt;
  }
  get originalError() {
    return this._originalError;
  }
  get rootCause() {
    let e = this._originalError;
    if (e) {
      for (; e instanceof _a8 && e.originalError !== void 0; ) e = e.originalError;
      return e;
    }
  }
  get chain() {
    let e = [this], t4 = this._originalError;
    for (; t4 && (e.push(t4), t4 instanceof _a8); ) t4 = t4.originalError;
    return e;
  }
  getInitializer(e, t4) {
    switch (true) {
      case (I.isString(e) && !t4):
        return this.fromMessage;
      case (I.isString(e) && !!t4):
        return this.fromTitle;
      case e instanceof Error:
        return this.fromError;
      case I.isErrorSerializedType(e):
        return this.fromJSON;
      case I.isErrorConstructorType(e):
        return this.fromConstructor;
      default:
        throw new _a8(de.VALIDATION_ERROR, "Invalid parameters provided to A_Error constructor");
    }
  }
  fromError(e) {
    this._title = de.UNEXPECTED_ERROR, this._aseid = new w({ concept: this.constructor.concept, scope: this.constructor.scope, entity: this.constructor.entity, id: this.code }), this._originalError = e, this.appendCausedByStack();
  }
  fromMessage(e) {
    this._title = de.UNEXPECTED_ERROR, this._aseid = new w({ concept: this.constructor.concept, scope: this._scope || this.constructor.scope, entity: this.constructor.entity, id: this.code }), this._link = void 0, this._originalError = void 0;
  }
  fromJSON(e) {
    this._aseid = new w(e.aseid), super.message = e.message, this._title = e.title, this._code = e.code, this._scope = e.scope, this._description = e.description;
    let t4 = e.originalError;
    if (t4 == null) this._originalError = void 0;
    else if (typeof t4 == "string") this._originalError = new _a8(t4);
    else if (typeof t4 == "object" && "aseid" in t4 && "title" in t4) this._originalError = new _a8(t4);
    else if (typeof t4 == "object" && ("message" in t4 || "name" in t4)) {
      let r8 = new Error(t4.message ?? "");
      t4.name && (r8.name = t4.name), t4.stack && (r8.stack = t4.stack), this._originalError = r8;
    } else this._originalError = t4;
    this._link = e.link;
  }
  fromTitle(e, t4) {
    this.validateTitle(e), this._title = e, this._description = t4, this._aseid = new w({ concept: this.constructor.concept, scope: this._scope || this.constructor.scope, entity: this.constructor.entity, id: this.code }), this._link = void 0, this._originalError = void 0;
  }
  fromConstructor(e) {
    this.validateTitle(e.title), this._title = e.title, this._code = e.code, this._scope = e.scope ? I.isScopeInstance(e.scope) ? e.scope.name : e.scope : void 0, this._aseid = new w({ concept: this.constructor.concept, scope: this._scope || this.constructor.scope, entity: this.constructor.entity, id: this.code }), this._description = e.description, this._link = e.link, this._originalError = e.originalError, this.appendCausedByStack();
  }
  appendCausedByStack() {
    let e = this._originalError;
    if (!e) return;
    let t4 = typeof e.stack == "string" ? e.stack : void 0;
    if (!t4) return;
    let r8 = typeof this.stack == "string" ? this.stack : void 0;
    r8 && (r8.includes(t4) || (this.stack = `${r8}
Caused by: ${t4}`));
  }
  toJSON() {
    return { aseid: this.aseid.toString(), title: this.title, code: this.code, type: this.type, message: this.message, link: this.link, scope: this.scope, description: this.description, originalError: this.serializeOriginalError(this._originalError) };
  }
  serializeOriginalError(e) {
    if (e != null) {
      if (e instanceof _a8) return e.toJSON();
      if (e instanceof Error) return { name: e.name, message: e.message, stack: e.stack };
      try {
        return JSON.stringify(e), e;
      } catch {
        return String(e);
      }
    }
  }
  validateTitle(e) {
    if (e.length > 60) throw new _a8(de.VALIDATION_ERROR, "A-Error title exceeds 60 characters limit.");
    if (e.length === 0) throw new _a8(de.VALIDATION_ERROR, "A-Error title cannot be empty.");
  }
}, __name(_a8, "j"), _a8);
p(j, "A_Error");
var b = j;
var _a9;
var Ie = (_a9 = class extends b {
}, __name(_a9, "Ie"), _a9);
p(Ie, "A_EntityError"), Ie.ValidationError = "A-Entity Validation Error";
var Ae = Ie;
var ft = ((n6) => (n6.EXTENSIONS = "a-component-extensions", n6.FEATURES = "a-component-features", n6.ABSTRACTIONS = "a-component-abstractions", n6.INJECTIONS = "a-component-injections", n6))(ft || {});
var be = { SAVE: "_A_Entity__Save", DESTROY: "_A_Entity__Destroy", LOAD: "_A_Entity__Load" };
var _a10;
var je = (_a10 = class {
  static get entity() {
    return P.toKebabCase(this.name);
  }
  static get concept() {
    return _.concept;
  }
  static get scope() {
    return _.root.name;
  }
  constructor(e) {
    this.getInitializer(e).call(this, e);
  }
  get id() {
    return this.aseid.id;
  }
  isStringASEID(e) {
    return typeof e == "string" && w.isASEID(e);
  }
  isASEIDInstance(e) {
    return e instanceof w;
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
    throw new Ae(Ae.ValidationError, "Unable to determine A-Entity constructor initialization method. Please check the provided parameters.");
  }
  generateASEID(e) {
    return new w({ concept: e?.concept || this.constructor.concept, scope: e?.scope || this.constructor.scope, entity: e?.entity || this.constructor.entity, id: e?.id || G.generateTimeId() });
  }
  call(e, t4) {
    return new N({ name: e, component: this, scope: t4 }).process(t4);
  }
  load(e) {
    return this.call(be.LOAD, e);
  }
  destroy(e) {
    return this.call(be.DESTROY, e);
  }
  save(e) {
    return this.call(be.SAVE, e);
  }
  fromASEID(e) {
    e instanceof w ? this.aseid = e : this.aseid = new w(e);
  }
  fromUndefined() {
    this.aseid = this.generateASEID();
  }
  fromNew(e) {
    this.aseid = this.generateASEID();
  }
  fromJSON(e) {
    this.aseid = new w(e.aseid);
  }
  toJSON() {
    return { aseid: this.aseid.toString() };
  }
  toString() {
    return this.aseid ? this.aseid.toString() : this.constructor.name;
  }
}, __name(_a10, "je"), _a10);
p(je, "A_Entity");
var D = je;
function $e(u2) {
  return function(e) {
    return _.setMeta(e, new u2()), e;
  };
}
__name($e, "$e");
p($e, "A_MetaDecorator");
var _a11;
var Ye = (_a11 = class {
  constructor() {
    this.meta = /* @__PURE__ */ new Map();
  }
  static Define(e) {
    return $e(e);
  }
  [Symbol.iterator]() {
    let e = this.meta.entries();
    return { next: p(() => e.next(), "next") };
  }
  from(e) {
    return this.meta = new Map(e.meta), this;
  }
  clone() {
    let e = this.constructor, t4 = new e();
    return t4.meta = new Map(this.meta), t4;
  }
  set(e, t4) {
    let r8 = this.meta.get(e) || Array.isArray(t4) ? [] : t4 instanceof Map ? /* @__PURE__ */ new Map() : {};
    this.meta.get(e) || Array.isArray(t4) ? [...r8] : t4 instanceof Map ? new Map(r8) : { ...r8 };
    this.meta.set(e, t4);
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
    let t4 = this._regExpCache.get(e);
    return t4 || (t4 = new RegExp(e), this._regExpCache.set(e, t4)), t4;
  }
  find(e) {
    let t4 = [];
    for (let [r8, n6] of this.meta.entries()) this.convertToRegExp(String(r8)).test(e) && t4.push([r8, n6]);
    return t4;
  }
  findByRegex(e) {
    let t4 = [];
    for (let [r8, n6] of this.meta.entries()) e.test(String(r8)) && t4.push([r8, n6]);
    return t4;
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
        let t4 = {};
        for (let [n6, o3] of e.entries()) t4[String(n6)] = this.recursiveToJSON(o3);
        return t4;
      case Array.isArray(e):
        return e.map((n6) => this.recursiveToJSON(n6));
      case (!!e && typeof e == "object"):
        let r8 = {};
        for (let [n6, o3] of Object.entries(e)) r8[n6] = this.recursiveToJSON(o3);
        return r8;
      default:
        return e;
    }
  }
  toJSON() {
    let e = {};
    for (let [t4, r8] of this.meta.entries()) e[String(t4)] = this.recursiveToJSON(r8);
    return e;
  }
}, __name(_a11, "Ye"), _a11);
p(Ye, "A_Meta");
var m = Ye;
var _a12;
var Le = (_a12 = class extends m {
  features() {
    return this.get("a-component-features")?.toArray().map(([, t4]) => t4) || [];
  }
  injections(e) {
    return this.get("a-component-injections")?.get(e) || [];
  }
}, __name(_a12, "Le"), _a12);
p(Le, "A_EntityMeta");
var X = Le;
var _a13;
var ze = (_a13 = class {
  get name() {
    return this.config?.name || this.constructor.name;
  }
  get scope() {
    return _.scope(this);
  }
  constructor(e = {}) {
    this.config = e, _.allocate(this, this.config);
  }
  async call(e, t4) {
    return await new N({ name: e, component: this }).process(t4);
  }
}, __name(_a13, "ze"), _a13);
p(ze, "A_Container");
var K = ze;
var Et = ((n6) => (n6.FEATURES = "a-container-features", n6.INJECTIONS = "a-container-injections", n6.ABSTRACTIONS = "a-container-abstractions", n6.EXTENSIONS = "a-container-extensions", n6))(Et || {});
var _a14;
var Ve = (_a14 = class extends m {
  injections(e) {
    return this.get("a-container-injections")?.get(e) || [];
  }
  features() {
    return this.get("a-container-features")?.toArray().map(([, t4]) => t4) || [];
  }
  abstractions(e) {
    let t4 = [], r8 = this.get("a-container-abstractions"), n6 = this.get("a-container-injections");
    return r8?.find(`CONCEPT_ABSTRACTION::${e}`).forEach(([o3, s4]) => {
      s4.forEach((a4) => {
        let c3 = n6?.get(a4.handler) || [];
        t4.push({ ...a4, args: c3 });
      });
    }), t4;
  }
  extensions(e) {
    let t4 = [];
    return this.get("a-container-extensions")?.find(e).forEach(([n6, o3]) => {
      o3.forEach((s4) => {
        t4.push({ name: s4.name, handler: s4.handler, behavior: s4.behavior, before: s4.before || "", after: s4.after || "", throwOnError: s4.throwOnError || true, override: "" });
      });
    }), t4;
  }
}, __name(_a14, "Ve"), _a14);
p(Ve, "A_ContainerMeta");
var Q = Ve;
var _a15;
var ee = (_a15 = class extends b {
  fromConstructor(e) {
    super.fromConstructor(e), this.stage = e.stage, this.featureName = e.featureName ?? e.stage?.feature?.name, this.stageName = e.stageName ?? e.stage?.name;
    let t4 = e.stage?.definition;
    this.handler = e.handler ?? t4?.handler, this.component = e.component ?? t4?.dependency?.target?.name ?? t4?.dependency?.name;
  }
  toJSON() {
    return { ...super.toJSON(), featureName: this.featureName, stageName: this.stageName, handler: this.handler, component: this.component };
  }
}, __name(_a15, "ee"), _a15);
p(ee, "A_FeatureError"), ee.Interruption = "Feature Interrupted", ee.FeatureInitializationError = "Unable to initialize A-Feature", ee.FeatureProcessingError = "Error occurred during A-Feature processing", ee.FeatureDefinitionError = "Unable to define A-Feature", ee.FeatureExtensionError = "Unable to extend A-Feature";
var S = ee;
var _a16;
var Ue = (_a16 = class extends S {
}, __name(_a16, "Ue"), _a16);
p(Ue, "A_FeatureInterruption");
var _e = Ue;
var Tt = /* @__PURE__ */ new WeakMap();
var _a17;
var Se = (_a17 = class {
  static resolve() {
    return new Promise((e) => e());
  }
  static isInheritedFrom(e, t4) {
    let r8 = e;
    for (; r8; ) {
      if (r8 === t4) return true;
      r8 = Object.getPrototypeOf(r8);
    }
    return false;
  }
  static getParentClasses(e) {
    let t4 = Object.getPrototypeOf(typeof e == "function" ? e : e.constructor), r8 = [];
    for (; t4 && t4 !== Function.prototype; ) r8.push(t4), t4 = Object.getPrototypeOf(t4);
    return r8;
  }
  static getClassInheritanceChain(e) {
    let t4 = Object.getPrototypeOf(typeof e == "function" ? e : e.constructor), r8 = typeof e == "function" ? [e] : [e.constructor];
    for (; t4 && t4 !== Function.prototype; ) r8.push(t4), t4 = Object.getPrototypeOf(t4);
    return r8;
  }
  static getParentClass(e) {
    return Object.getPrototypeOf(e);
  }
  static omitProperties(e, t4) {
    let r8 = JSON.parse(JSON.stringify(e));
    function n6(o3, s4) {
      let a4 = s4[0];
      s4.length === 1 ? delete o3[a4] : o3[a4] !== void 0 && typeof o3[a4] == "object" && n6(o3[a4], s4.slice(1));
    }
    __name(n6, "n");
    return p(n6, "removeProperties"), t4.forEach((o3) => {
      let s4 = o3.split(".");
      n6(r8, s4);
    }), r8;
  }
  static isObject(e) {
    return e !== null && typeof e == "object" && !Array.isArray(e);
  }
  static deepMerge(e, t4, r8 = /* @__PURE__ */ new Map()) {
    if (this.isObject(e) && this.isObject(t4)) for (let n6 in t4) this.isObject(t4[n6]) ? (e[n6] || (e[n6] = {}), r8.has(t4[n6]) ? e[n6] = r8.get(t4[n6]) : (r8.set(t4[n6], {}), this.deepMerge(e[n6], t4[n6], r8))) : e[n6] = t4[n6];
    return e;
  }
  static deepClone(e) {
    if (e == null || typeof e != "object") return e;
    if (e instanceof Date) return new Date(e.getTime());
    if (Array.isArray(e)) return e.map((t4) => this.deepClone(t4));
    if (typeof e == "function") return e;
    if (e instanceof Object) {
      let t4 = {};
      for (let r8 in e) e.hasOwnProperty(r8) && (t4[r8] = this.deepClone(e[r8]));
      return t4;
    }
    throw new Error("Unable to clone the object. Unsupported type.");
  }
  static deepCloneAndMerge(e, t4) {
    if (t4 == null && e == null) return e;
    if (e == null && t4) return this.deepClone(t4);
    if (typeof e != "object") return e;
    if (e instanceof Date) return new Date(e.getTime());
    if (Array.isArray(e)) return e.map((r8) => this.deepCloneAndMerge(r8, t4));
    if (typeof e == "function") return e;
    if (e instanceof Object) {
      let r8 = {};
      for (let n6 in e) t4[n6] !== null && t4[n6] !== void 0 ? r8[n6] = this.deepCloneAndMerge(e[n6], t4[n6]) : r8[n6] = this.deepClone(e[n6]);
      for (let n6 in t4) e[n6] !== void 0 && e[n6] !== null ? r8[n6] = this.deepCloneAndMerge(e[n6], t4[n6]) : r8[n6] = this.deepClone(t4[n6]);
      return r8;
    }
    throw new Error("Unable to clone the object. Unsupported type.");
  }
  static getComponentName(e) {
    if (e != null && !Array.isArray(e) && (typeof e == "object" || typeof e == "function")) {
      let t4 = Tt.get(e);
      if (t4 !== void 0) return t4;
      let r8 = _a17._computeComponentName(e);
      return Tt.set(e, r8), r8;
    }
    return _a17._computeComponentName(e);
  }
  static _computeComponentName(e) {
    let t4 = "Unknown", r8 = "Anonymous";
    if (e == null) return t4;
    if (typeof e == "string") return e || t4;
    if (typeof e == "symbol") try {
      return e.toString();
    } catch {
      return t4;
    }
    if (Array.isArray(e)) return e.length === 0 ? t4 : this.getComponentName(e[0]);
    if (typeof e == "function") {
      let n6 = e;
      if (n6.displayName) return String(n6.displayName);
      if (n6.name) return String(n6.name);
      if (n6.constructor && n6.constructor.name) return String(n6.constructor.name);
      try {
        let s4 = Function.prototype.toString.call(e).match(/^(?:class\s+([A-Za-z0-9_$]+)|function\s+([A-Za-z0-9_$]+)|([A-Za-z0-9_$]+)\s*=>)/);
        if (s4) return s4[1] || s4[2] || s4[3] || r8;
      } catch {
      }
      return r8;
    }
    if (typeof e == "object") {
      let n6 = e;
      if (n6.type) return this.getComponentName(n6.type);
      if (n6.displayName) return String(n6.displayName);
      if (n6.name) return String(n6.name);
      if (n6.constructor && n6.constructor.name && n6.constructor.name !== "Object") return String(n6.constructor.name);
      try {
        let o3 = n6.toString();
        if (typeof o3 == "string" && o3 !== "[object Object]") return o3;
      } catch {
      }
      return r8;
    }
    try {
      return String(e);
    } catch {
      return t4;
    }
  }
}, __name(_a17, "Se"), _a17);
p(Se, "A_CommonHelper");
var A = Se;
var _a18;
var we = (_a18 = class extends Error {
}, __name(_a18, "we"), _a18);
p(we, "A_CallerError"), we.CallerInitializationError = "Unable to initialize A-Caller";
var me = we;
var _a19;
var Je = (_a19 = class {
  constructor(e) {
    this.validateParams(e), this._component = e;
  }
  get component() {
    return this._component;
  }
  validateParams(e) {
    if (!i.isAllowedForFeatureCall(e)) throw new me(`[${me.CallerInitializationError}]: Invalid A-Caller component provided of type: ${typeof e} with value: ${JSON.stringify(e).slice(0, 100)}...`);
  }
}, __name(_a19, "Je"), _a19);
p(Je, "A_Caller");
var te = Je;
var _a20;
var re = (_a20 = class extends b {
}, __name(_a20, "re"), _a20);
p(re, "A_DependencyError"), re.InvalidDependencyTarget = "Invalid Dependency Target", re.InvalidLoadTarget = "Invalid Load Target", re.InvalidLoadPath = "Invalid Load Path", re.InvalidDefaultTarget = "Invalid Default Target", re.ResolutionParametersError = "Dependency Resolution Parameters Error";
var C = re;
function Ke(...u2) {
  return function(e, t4, r8) {
    let n6 = A.getComponentName(e);
    if (!i.isTargetAvailableForInjection(e)) throw new C(C.InvalidDefaultTarget, `A-Default cannot be used on the target of type ${typeof e} (${n6})`);
    let o3 = t4 ? String(t4) : "constructor", s4;
    switch (true) {
      case (i.isComponentConstructor(e) || i.isComponentInstance(e)):
        s4 = "a-component-injections";
        break;
      case i.isContainerInstance(e):
        s4 = "a-container-injections";
        break;
      case i.isEntityInstance(e):
        s4 = "a-component-injections";
        break;
    }
    let a4 = _.meta(e).get(s4), c3 = a4 ? a4.clone() : new m(), l5 = c3.get(o3) ? [...c3.get(o3)] : [];
    l5[r8].resolutionStrategy = { create: true, args: u2 }, c3.set(o3, l5), _.meta(e).set(s4, c3);
  };
}
__name(Ke, "Ke");
p(Ke, "A_Dependency_Default");
function qe() {
  return function(u2, e, t4) {
    let r8 = A.getComponentName(u2);
    if (!i.isTargetAvailableForInjection(u2)) throw new C(C.InvalidDependencyTarget, `A-Dependency cannot be used on the target of type ${typeof u2} (${r8})`);
    let n6 = e ? String(e) : "constructor", o3;
    switch (true) {
      case (i.isComponentConstructor(u2) || i.isComponentInstance(u2)):
        o3 = "a-component-injections";
        break;
      case i.isContainerInstance(u2):
        o3 = "a-container-injections";
        break;
      case i.isEntityInstance(u2):
        o3 = "a-component-injections";
        break;
    }
    let s4 = _.meta(u2).get(o3), a4 = s4 ? s4.clone() : new m(), c3 = a4.get(n6) ? [...a4.get(n6)] : [];
    c3[t4].resolutionStrategy = { flat: true }, a4.set(n6, c3), _.meta(u2).set(o3, a4);
  };
}
__name(qe, "qe");
p(qe, "A_Dependency_Flat");
function Be() {
  return function(u2, e, t4) {
    let r8 = A.getComponentName(u2);
    if (!i.isTargetAvailableForInjection(u2)) throw new C(C.InvalidLoadTarget, `A-Load cannot be used on the target of type ${typeof u2} (${r8})`);
    let n6 = e ? String(e) : "constructor", o3;
    switch (true) {
      case (i.isComponentConstructor(u2) || i.isComponentInstance(u2)):
        o3 = "a-component-injections";
        break;
      case i.isContainerInstance(u2):
        o3 = "a-container-injections";
        break;
      case i.isEntityInstance(u2):
        o3 = "a-component-injections";
        break;
    }
    let s4 = _.meta(u2).get(o3), a4 = s4 ? s4.clone() : new m(), c3 = a4.get(n6) ? [...a4.get(n6)] : [];
    c3[t4].resolutionStrategy = { load: true }, a4.set(n6, c3), _.meta(u2).set(o3, a4);
  };
}
__name(Be, "Be");
p(Be, "A_Dependency_Load");
function We(u2 = -1) {
  return function(e, t4, r8) {
    let n6 = A.getComponentName(e);
    if (!i.isTargetAvailableForInjection(e)) throw new C(C.InvalidDependencyTarget, `A-Dependency cannot be used on the target of type ${typeof e} (${n6})`);
    let o3 = t4 ? String(t4) : "constructor", s4;
    switch (true) {
      case (i.isComponentConstructor(e) || i.isComponentInstance(e)):
        s4 = "a-component-injections";
        break;
      case i.isContainerInstance(e):
        s4 = "a-container-injections";
        break;
      case i.isEntityInstance(e):
        s4 = "a-component-injections";
        break;
    }
    let a4 = _.meta(e).get(s4), c3 = a4 ? a4.clone() : new m(), l5 = c3.get(o3) ? [...c3.get(o3)] : [];
    l5[r8].resolutionStrategy = { parent: u2 }, c3.set(o3, l5), _.meta(e).set(s4, c3);
  };
}
__name(We, "We");
p(We, "A_Dependency_Parent");
function He() {
  return function(u2, e, t4) {
    let r8 = A.getComponentName(u2);
    if (!i.isTargetAvailableForInjection(u2)) throw new C(C.InvalidDependencyTarget, `A-Dependency cannot be used on the target of type ${typeof u2} (${r8})`);
    let n6 = e ? String(e) : "constructor", o3;
    switch (true) {
      case (i.isComponentConstructor(u2) || i.isComponentInstance(u2)):
        o3 = "a-component-injections";
        break;
      case i.isContainerInstance(u2):
        o3 = "a-container-injections";
        break;
      case i.isEntityInstance(u2):
        o3 = "a-component-injections";
        break;
    }
    let s4 = _.meta(u2).get(o3), a4 = s4 ? s4.clone() : new m(), c3 = a4.get(n6) ? [...a4.get(n6)] : [];
    c3[t4].resolutionStrategy = { require: true }, a4.set(n6, c3), _.meta(u2).set(o3, a4);
  };
}
__name(He, "He");
p(He, "A_Dependency_Require");
function Ge() {
  return function(u2, e, t4) {
    let r8 = A.getComponentName(u2);
    if (!i.isTargetAvailableForInjection(u2)) throw new C(C.InvalidDependencyTarget, `A-All cannot be used on the target of type ${typeof u2} (${r8})`);
    let n6 = e ? String(e) : "constructor", o3;
    switch (true) {
      case (i.isComponentConstructor(u2) || i.isComponentInstance(u2)):
        o3 = "a-component-injections";
        break;
      case i.isContainerInstance(u2):
        o3 = "a-container-injections";
        break;
      case i.isEntityInstance(u2):
        o3 = "a-component-injections";
        break;
    }
    let s4 = _.meta(u2).get(o3), a4 = s4 ? s4.clone() : new m(), c3 = a4.get(n6) ? [...a4.get(n6)] : [];
    c3[t4].resolutionStrategy = { pagination: { ...c3[t4].resolutionStrategy.pagination, count: -1 } }, a4.set(n6, c3), _.meta(u2).set(o3, a4);
  };
}
__name(Ge, "Ge");
p(Ge, "A_Dependency_All");
function Ze(u2, e) {
  return function(t4, r8, n6) {
    let o3 = A.getComponentName(t4);
    if (!i.isTargetAvailableForInjection(t4)) throw new C(C.InvalidDependencyTarget, `A-All cannot be used on the target of type ${typeof t4} (${o3})`);
    let s4 = r8 ? String(r8) : "constructor", a4;
    switch (true) {
      case (i.isComponentConstructor(t4) || i.isComponentInstance(t4)):
        a4 = "a-component-injections";
        break;
      case i.isContainerInstance(t4):
        a4 = "a-container-injections";
        break;
      case i.isEntityInstance(t4):
        a4 = "a-component-injections";
        break;
    }
    let c3 = _.meta(t4).get(a4), l5 = c3 ? c3.clone() : new m(), f4 = l5.get(s4) ? [...l5.get(s4)] : [];
    f4[n6].resolutionStrategy = { query: { ...f4[n6].resolutionStrategy.query, ...u2 }, pagination: { ...f4[n6].resolutionStrategy.pagination, ...e } }, l5.set(s4, f4), _.meta(t4).set(a4, l5);
  };
}
__name(Ze, "Ze");
p(Ze, "A_Dependency_Query");
var _a21;
var Xe = (_a21 = class {
  constructor(e, t4) {
    this._defaultPagination = { count: 1, from: "start" };
    this._defaultResolutionStrategy = { require: false, load: false, parent: 0, flat: false, create: false, args: [], query: {}, pagination: this._defaultPagination };
    this._name = typeof e == "string" ? e : A.getComponentName(e), this._target = typeof e == "string" ? void 0 : e, this.resolutionStrategy = t4 || {}, this.initCheck();
  }
  static get Required() {
    return He;
  }
  static get Loaded() {
    return Be;
  }
  static get Default() {
    return Ke;
  }
  static get Parent() {
    return We;
  }
  static get Flat() {
    return qe;
  }
  static get All() {
    return Ge;
  }
  static get Query() {
    return Ze;
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
    if (!this._resolutionStrategy) throw new C(C.ResolutionParametersError, `Resolution strategy parameters are not provided for dependency: ${this._name}`);
    return this;
  }
  toJSON() {
    return { name: this._name, all: this.all, require: this.require, load: this.load, parent: this.parent, flat: this.flat, create: this.create, args: this.args, query: this.query, pagination: this.pagination };
  }
}, __name(_a21, "Xe"), _a21);
p(Xe, "A_Dependency");
var M = Xe;
var _a22;
var h = (_a22 = class {
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
    return typeof e == "function" && A.isInheritedFrom(e, K);
  }
  static isComponentConstructor(e) {
    return typeof e == "function" && A.isInheritedFrom(e, O);
  }
  static isFragmentConstructor(e) {
    return typeof e == "function" && A.isInheritedFrom(e, H);
  }
  static isEntityConstructor(e) {
    return typeof e == "function" && A.isInheritedFrom(e, D);
  }
  static isScopeConstructor(e) {
    return typeof e == "function" && A.isInheritedFrom(e, R);
  }
  static isErrorConstructor(e) {
    return typeof e == "function" && A.isInheritedFrom(e, Error);
  }
  static isFeatureConstructor(e) {
    return typeof e == "function" && A.isInheritedFrom(e, N);
  }
  static isCallerConstructor(e) {
    return typeof e == "function" && A.isInheritedFrom(e, te);
  }
  static isDependencyConstructor(e) {
    return typeof e == "function" && A.isInheritedFrom(e, M);
  }
  static isDependencyInstance(e) {
    return e instanceof M;
  }
  static isContainerInstance(e) {
    return e instanceof K;
  }
  static isComponentInstance(e) {
    return e instanceof O;
  }
  static isFeatureInstance(e) {
    return e instanceof N;
  }
  static isFragmentInstance(e) {
    return e instanceof H;
  }
  static isEntityInstance(e) {
    return e instanceof D;
  }
  static isScopeInstance(e) {
    return e instanceof R;
  }
  static isErrorInstance(e) {
    return e instanceof Error;
  }
  static isComponentMetaInstance(e) {
    return e instanceof z;
  }
  static isContainerMetaInstance(e) {
    return e instanceof Q;
  }
  static isEntityMetaInstance(e) {
    return e instanceof X;
  }
  static hasASEID(e) {
    return e && typeof e == "object" && "aseid" in e && (_a22.isEntityInstance(e) || _a22.isErrorInstance(e));
  }
  static isConstructorAllowedForScopeAllocation(e) {
    return _a22.isContainerConstructor(e) || _a22.isFeatureConstructor(e);
  }
  static isInstanceAllowedForScopeAllocation(e) {
    return _a22.isContainerInstance(e) || _a22.isFeatureInstance(e);
  }
  static isConstructorAvailableForAbstraction(e) {
    return _a22.isContainerInstance(e) || _a22.isComponentInstance(e);
  }
  static isTargetAvailableForInjection(e) {
    return _a22.isComponentConstructor(e) || _a22.isComponentInstance(e) || _a22.isContainerInstance(e) || _a22.isEntityInstance(e);
  }
  static isAllowedForFeatureCall(e) {
    return _a22.isContainerInstance(e) || _a22.isComponentInstance(e) || _a22.isEntityInstance(e);
  }
  static isAllowedForFeatureDefinition(e) {
    return _a22.isContainerInstance(e) || _a22.isComponentInstance(e) || _a22.isEntityInstance(e);
  }
  static isAllowedForFeatureExtension(e) {
    return _a22.isComponentInstance(e) || _a22.isContainerInstance(e) || _a22.isEntityInstance(e);
  }
  static isAllowedForAbstractionDefinition(e) {
    return _a22.isContainerInstance(e) || _a22.isComponentInstance(e);
  }
  static isAllowedForDependencyDefaultCreation(e) {
    return _a22.isFragmentConstructor(e) || A.isInheritedFrom(e, H) || _a22.isEntityConstructor(e) || A.isInheritedFrom(e, D);
  }
  static isErrorConstructorType(e) {
    return !!e && _a22.isObject(e) && !(e instanceof Error) && "title" in e;
  }
  static isErrorSerializedType(e) {
    return !!e && _a22.isObject(e) && !(e instanceof Error) && "aseid" in e && w.isASEID(e.aseid);
  }
  static isPromiseInstance(e) {
    return e instanceof Promise;
  }
}, __name(_a22, "h"), _a22);
p(h, "A_TypeGuards");
var i = h;
function Qe(u2 = {}) {
  return function(e, t4, r8) {
    let n6 = A.getComponentName(e);
    if (!i.isAllowedForFeatureDefinition(e)) throw new S(S.FeatureDefinitionError, `A-Feature cannot be defined on the ${n6} level`);
    let o3 = _.meta(e.constructor), s4;
    switch (true) {
      case i.isEntityInstance(e):
        s4 = "a-component-features";
        break;
      case i.isContainerInstance(e):
        s4 = "a-container-features";
        break;
      case i.isComponentInstance(e):
        s4 = "a-component-features";
        break;
    }
    let a4 = o3.get(s4) || new m(), c3 = u2.name || t4, l5 = u2.invoke || false;
    a4.set(t4, { name: `${e.constructor.name}.${c3}`, handler: t4, invoke: l5, template: u2.template && u2.template.length ? u2.template.map((g5) => ({ ...g5, before: g5.before || "", after: g5.after || "", behavior: g5.behavior || "sync", throwOnError: true, override: g5.override || "" })) : [] }), _.meta(e.constructor).set(s4, a4);
    let f4 = r8.value;
    return r8.value = function(...g5) {
      if (l5) f4.apply(this, g5);
      else return f4.apply(this, g5);
      if (typeof this.call == "function" && l5) return this.call(c3);
    }, r8;
  };
}
__name(Qe, "Qe");
p(Qe, "A_Feature_Define");
function et(u2) {
  return function(e, t4, r8) {
    let n6 = A.getComponentName(e);
    if (!i.isAllowedForFeatureExtension(e)) throw new S(S.FeatureExtensionError, `A-Feature-Extend cannot be applied on the ${n6} level`);
    let o3, s4 = "sync", a4 = "", c3 = "", l5 = "", f4 = [], g5 = [], v6 = true, L2;
    switch (true) {
      case i.isEntityInstance(e):
        L2 = "a-component-extensions";
        break;
      case i.isContainerInstance(e):
        L2 = "a-container-extensions";
        break;
      case i.isComponentInstance(e):
        L2 = "a-component-extensions";
        break;
    }
    switch (true) {
      case i.isRegExp(u2):
        o3 = u2;
        break;
      case (!!u2 && typeof u2 == "object"):
        Array.isArray(u2.scope) ? f4 = u2.scope : u2.scope && typeof u2.scope == "object" && (Array.isArray(u2.scope.include) && (f4 = u2.scope.include), Array.isArray(u2.scope.exclude) && (g5 = u2.scope.exclude)), o3 = Ct(u2, f4, g5, t4), s4 = u2.behavior || s4, v6 = u2.throwOnError !== void 0 ? u2.throwOnError : v6, a4 = i.isArray(u2.before) ? new RegExp(`^${u2.before.join("|").replace(/\./g, "\\.")}$`).source : u2.before instanceof RegExp ? u2.before.source : "", c3 = i.isArray(u2.after) ? new RegExp(`^${u2.after.join("|").replace(/\./g, "\\.")}$`).source : u2.after instanceof RegExp ? u2.after.source : "", l5 = i.isArray(u2.override) ? new RegExp(`^${u2.override.join("|").replace(/\./g, "\\.")}$`).source : u2.override instanceof RegExp ? u2.override.source : "";
        break;
      default:
        o3 = new RegExp(`^.*${t4.replace(/\./g, "\\.")}$`);
        break;
    }
    let ce = _.meta(e).get(L2), ye = _.meta(e), B3 = ye.get(L2) ? new m().from(ye.get(L2)) : new m();
    if (ce && ce.size() && ce.has(t4) && ce.get(t4).invoke) throw new S(S.FeatureExtensionError, `A-Feature-Extend cannot be used on the method "${t4}" because it is already defined as a Feature with "invoke" set to true. Please remove the A-Feature-Extend decorator or set "invoke" to false in the A-Feature decorator.`);
    let Z2 = [...B3.get(o3.source) || []], lt = u2 && typeof u2 == "object" && !i.isRegExp(u2) && u2.name || t4;
    for (let [V2, ie] of B3.entries()) {
      let Te = ie.findIndex((pe) => pe.handler === t4);
      if (V2 !== o3.source && Te !== -1) {
        let U = String(V2).match(/\\\.\s*([^\\.$]+)\$$/);
        (U ? U[1] : null) === lt && (ie.splice(Te, 1), ie.length === 0 ? B3.delete(V2) : B3.set(V2, ie));
      }
    }
    let E3 = Z2.findIndex((V2) => V2.handler === t4), y2 = { name: o3.source, handler: t4, behavior: s4, before: a4, after: c3, throwOnError: v6, override: l5 };
    E3 !== -1 ? Z2[E3] = y2 : Z2.push(y2), B3.set(o3.source, Z2), _.meta(e).set(L2, B3);
  };
}
__name(et, "et");
p(et, "A_Feature_Extend");
function Ct(u2, e, t4, r8) {
  let n6 = e.length ? `(${e.map((a4) => a4.name).join("|")})` : ".*", o3 = t4.length ? `(?!${t4.map((a4) => a4.name).join("|")})` : "", s4 = u2.scope ? `^${o3}${n6}\\.${u2.name || r8}$` : `.*\\.${u2.name || r8}$`;
  return new RegExp(s4);
}
__name(Ct, "Ct");
p(Ct, "buildTargetRegexp");
var Pt = ((s4) => (s4.PROCESSING = "PROCESSING", s4.COMPLETED = "COMPLETED", s4.FAILED = "FAILED", s4.SKIPPED = "SKIPPED", s4.INITIALIZED = "INITIALIZED", s4.ABORTED = "ABORTED", s4))(Pt || {});
var _a23;
var xe = (_a23 = class extends b {
  static get CompileError() {
    return "Unable to compile A-Stage";
  }
}, __name(_a23, "xe"), _a23);
p(xe, "A_StageError"), xe.ArgumentsResolutionError = "A-Stage Arguments Resolution Error";
var $ = xe;
var _a24;
var tt = (_a24 = class {
  constructor(e, t4) {
    this._status = "INITIALIZED";
    this._feature = e, this._definition = t4;
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
  getStepArgs(e, t4) {
    let r8 = t4.dependency.target || e.resolveConstructor(t4.dependency.name), n6 = this._feature.caller?.component;
    return _.meta(r8).injections(t4.handler).map((o3) => {
      switch (true) {
        case i.isCallerConstructor(o3.target):
          return this._feature.caller.component;
        case i.isFeatureConstructor(o3.target):
          return this._feature;
        default: {
          if (n6 && this.isCallerOfDependency(n6, o3.target)) return n6;
          try {
            return e.resolve(o3);
          } catch (s4) {
            let a4 = o3.target?.name ?? o3?.name ?? "<unknown>";
            throw new $({ title: $.ArgumentsResolutionError, description: `Failed to resolve @A_Inject(${a4}) for handler '${t4.handler}' in stage ${this.name} (scope: ${e.name}).`, originalError: s4 });
          }
        }
      }
    });
  }
  isCallerOfDependency(e, t4) {
    if (!e || !t4 || typeof t4 != "function") return false;
    if (e.constructor === t4) return true;
    try {
      return e instanceof t4;
    } catch {
      return false;
    }
  }
  getStepComponent(e, t4) {
    let { dependency: r8, handler: n6 } = t4, o3 = this._feature.caller?.component;
    if (o3 && this.isCallerOfDependency(o3, r8.target)) {
      if (!o3[n6]) throw new $($.CompileError, `Handler ${n6} not found in ${o3.constructor.name}`);
      return o3;
    }
    let s4 = e.resolve(r8) || this.feature.scope.resolve(r8);
    if (!s4) {
      let a4 = r8.target;
      if (a4 && i.isEntityConstructor(a4)) return;
      throw new $($.CompileError, `Unable to resolve component ${r8.name} from scope ${e.name}`);
    }
    if (!s4[n6]) throw new $($.CompileError, `Handler ${n6} not found in ${s4.constructor.name}`);
    return s4;
  }
  callStepHandler(e, t4) {
    let r8 = this.getStepComponent(t4, e);
    if (!r8) return;
    let n6 = this.getStepArgs(t4, e);
    return { component: r8, method: e.handler, params: n6 };
  }
  skip() {
    this._status = "SKIPPED";
  }
  process(e) {
    let t4 = i.isScopeInstance(e) ? e : this._feature.scope;
    if (!this.isProcessed) {
      this._status = "PROCESSING";
      let r8 = this.callStepHandler(this._definition, t4);
      if (!r8) {
        this.skip();
        return;
      }
      let { component: n6, method: o3, params: s4 } = r8, a4 = n6[o3](...s4);
      if (i.isPromiseInstance(a4)) return new Promise(async (c3, l5) => {
        try {
          return await a4, this.completed(), c3();
        } catch (f4) {
          return this.failed(f4), this._definition.throwOnError ? c3() : l5(f4);
        }
      });
      this.completed();
    }
  }
  completed() {
    this._status = "COMPLETED";
  }
  failed(e) {
    this._error = e instanceof b ? e : new b(e), this._status = "FAILED";
  }
  toJSON() {
    return { name: this.name, status: this.status };
  }
  toString() {
    return `A-Stage(${this._feature.name}::${this._definition.behavior}@${this._definition.handler})`;
  }
}, __name(_a24, "tt"), _a24);
p(tt, "A_Stage");
var ne = tt;
var _a25;
var Fe = (_a25 = class extends b {
}, __name(_a25, "Fe"), _a25);
p(Fe, "A_StepManagerError"), Fe.CircularDependencyError = "A-StepManager Circular Dependency Error";
var _a26;
var rt = (_a26 = class {
  constructor(e) {
    this._uniqueIdMap = /* @__PURE__ */ new Map();
    this._isBuilt = false;
    this.entities = this.prepareSteps(e), this.graph = /* @__PURE__ */ new Map(), this.visited = /* @__PURE__ */ new Set(), this.tempMark = /* @__PURE__ */ new Set(), this.sortedEntities = [], this.assignUniqueIds();
  }
  prepareSteps(e) {
    return e.map((t4) => ({ ...t4, behavior: t4.behavior || "sync", before: t4.before || "", after: t4.after || "", override: t4.override || "", throwOnError: false }));
  }
  baseID(e) {
    return `${e.dependency.name}.${e.handler}`;
  }
  ID(e) {
    return this._uniqueIdMap.get(e) || this.baseID(e);
  }
  assignUniqueIds() {
    let e = /* @__PURE__ */ new Map();
    for (let r8 of this.entities) {
      let n6 = this.baseID(r8);
      e.set(n6, (e.get(n6) || 0) + 1);
    }
    let t4 = /* @__PURE__ */ new Map();
    for (let r8 of this.entities) {
      let n6 = this.baseID(r8);
      if (e.get(n6) > 1) {
        let o3 = t4.get(n6) || 0;
        this._uniqueIdMap.set(r8, `${n6}#${o3}`), t4.set(n6, o3 + 1);
      } else this._uniqueIdMap.set(r8, n6);
    }
  }
  buildGraph() {
    this._isBuilt || (this._isBuilt = true, this.entities = this.entities.filter((e, t4, r8) => !r8.some((n6, o3) => {
      if (t4 === o3 || !n6.override) return false;
      let s4 = new RegExp(n6.override);
      return s4.test(this.baseID(e)) || s4.test(e.handler);
    })), this._uniqueIdMap.clear(), this.assignUniqueIds(), this.entities.forEach((e) => this.graph.set(this.ID(e), /* @__PURE__ */ new Set())), this.entities.forEach((e) => {
      let t4 = this.ID(e);
      e.before && this.matchEntities(t4, e.before).forEach((n6) => {
        this.graph.has(n6) || this.graph.set(n6, /* @__PURE__ */ new Set()), this.graph.get(n6).add(t4);
      }), e.after && this.matchEntities(t4, e.after).forEach((n6) => {
        this.graph.has(t4) || this.graph.set(t4, /* @__PURE__ */ new Set()), this.graph.get(t4).add(n6);
      });
    }));
  }
  matchEntities(e, t4) {
    let r8 = new RegExp(t4);
    return this.entities.filter((n6) => r8.test(this.baseID(n6)) && this.ID(n6) !== e).map((n6) => this.ID(n6));
  }
  visit(e) {
    this.tempMark.has(e) || this.visited.has(e) || (this.tempMark.add(e), (this.graph.get(e) || []).forEach((t4) => this.visit(t4)), this.tempMark.delete(e), this.visited.add(e), this.sortedEntities.push(e));
  }
  toSortedArray() {
    return this.buildGraph(), this.entities.forEach((e) => {
      this.visited.has(this.ID(e)) || this.visit(this.ID(e));
    }), this.sortedEntities;
  }
  toSortedSteps() {
    return this.toSortedArray().map((t4) => this.entities.find((r8) => this.ID(r8) === t4));
  }
  toStages(e) {
    return this.toSortedArray().map((r8) => {
      let n6 = this.entities.find((o3) => this.ID(o3) === r8);
      return new ne(e, n6);
    });
  }
}, __name(_a26, "rt"), _a26);
p(rt, "A_StepsManager");
var Ee = rt;
var _a27;
var he = (_a27 = class {
  constructor(e) {
    this._stages = [];
    this._index = 0;
    this._state = "INITIALIZED";
    this._scopeAllocated = false;
    this.validateParams(e), this.getInitializer(e).call(this, e);
  }
  static get Define() {
    return Qe;
  }
  static get Extend() {
    return et;
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
    return this._scopeAllocated || (this._scopeAllocated = true, _.allocate(this).inherit(this._effectiveScope)), _.scope(this);
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
    return { next: p(() => this.isDone ? (this._current = void 0, { value: void 0, done: true }) : (this._current = this._stages[this._index], this._index++, { value: this._current, done: false }), "next") };
  }
  validateParams(e) {
    if (!e || typeof e != "object") throw new S(S.FeatureInitializationError, `Invalid A-Feature initialization parameters of type: ${typeof e} with value: ${JSON.stringify(e)?.slice(0, 100)}...`);
  }
  getInitializer(e) {
    switch (true) {
      case !("template" in e):
        return this.fromComponent;
      case "template" in e:
        return this.fromTemplate;
      default:
        throw new S(S.FeatureInitializationError, `Invalid A-Feature initialization parameters of type: ${typeof e} with value: ${JSON.stringify(e)?.slice(0, 100)}...`);
    }
  }
  fromTemplate(e) {
    if (!e.template || !Array.isArray(e.template)) throw new S(S.FeatureInitializationError, `Invalid A-Feature template provided of type: ${typeof e.template} with value: ${JSON.stringify(e.template)?.slice(0, 100)}...`);
    if (!e.component && (!e.scope || !(e.scope instanceof R))) throw new S(S.FeatureInitializationError, `Invalid A-Feature scope provided of type: ${typeof e.scope} with value: ${JSON.stringify(e.scope)?.slice(0, 100)}...`);
    this._name = e.name;
    let t4, r8 = e.scope;
    try {
      e.component && (t4 = _.scope(e.component));
    } catch (o3) {
      if (!r8) throw o3;
    }
    t4 && r8 && !r8.isInheritedFrom(t4) && r8.inherit(t4), this._caller = new te(e.component || new O()), this._effectiveScope = t4 || r8;
    let n6 = _.getSortedStepsFor(e.template);
    n6 || (this._SM = new Ee(e.template), n6 = this._SM.toSortedSteps(), _.setSortedStepsFor(e.template, n6)), this._stages = n6.map((o3) => new ne(this, o3)), this._current = this._stages[0];
  }
  fromComponent(e) {
    if (!e.component || !i.isAllowedForFeatureDefinition(e.component)) throw new S(S.FeatureInitializationError, `Invalid A-Feature component provided of type: ${typeof e.component} with value: ${JSON.stringify(e.component)?.slice(0, 100)}...`);
    this._name = e.name;
    let t4, r8 = e.scope;
    try {
      t4 = _.scope(e.component);
    } catch (a4) {
      if (!r8) throw a4;
    }
    t4 && r8 && !r8.isInheritedFrom(t4) && r8.inherit(t4), this._caller = new te(e.component);
    let n6 = t4 || r8, o3 = _.featureTemplate(this._name, this._caller.component, n6), s4 = _.getSortedStepsFor(o3);
    s4 || (this._SM = new Ee(o3), s4 = this._SM.toSortedSteps(), _.setSortedStepsFor(o3, s4)), this._effectiveScope = n6, this._stages = s4.map((a4) => new ne(this, a4)), this._current = this._stages[0];
  }
  process(e) {
    try {
      if (this.isProcessed) return;
      this._state = "PROCESSING";
      for (let t4 of this) {
        if (this.state === "INTERRUPTED") return;
        let r8;
        try {
          r8 = t4.process(e);
        } catch (n6) {
          throw this.createStageError(n6, t4);
        }
        if (i.isPromiseInstance(r8)) return r8.then(() => {
          if (this.state !== "INTERRUPTED") return this.processRemainingStagesAsync(e);
        }).catch((n6) => {
          throw this.createStageError(n6, t4);
        });
      }
      this.state !== "INTERRUPTED" && this.completed();
    } catch (t4) {
      let r8 = t4 instanceof S ? t4 : new S({ title: S.FeatureProcessingError, description: `An error occurred while processing the A-Feature: ${this.name}. Failed at stage: ${this.stage?.name || "N/A"}.`, stage: this.stage, originalError: t4 });
      throw this.failed(r8);
    }
  }
  async processRemainingStagesAsync(e) {
    for (let t4 of this) {
      if (this.state === "INTERRUPTED") return;
      try {
        let r8 = t4.process(e);
        i.isPromiseInstance(r8) && await r8;
      } catch (r8) {
        throw this.createStageError(r8, t4);
      }
    }
    this.state !== "INTERRUPTED" && this.completed();
  }
  createStageError(e, t4) {
    let r8 = e instanceof S ? e : new S({ title: S.FeatureProcessingError, description: `An error occurred while processing the A-Feature: ${this.name}. Failed at stage: ${t4.name}.`, stage: t4, originalError: e });
    return this.failed(r8), r8;
  }
  next(e) {
    let t4 = this._stages.indexOf(e);
    this._index = t4 + 1, this._index >= this._stages.length && this.completed();
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
      case i.isString(e):
        this._error = new _e({ title: S.Interruption, description: e, stage: this.stage });
        break;
      case i.isErrorInstance(e):
        this._error = new _e({ code: S.Interruption, title: e.title || "Feature Interrupted", description: e.description || e.message, stage: this.stage, originalError: e });
        break;
      default:
        this._error = new _e(S.Interruption, "Feature was interrupted");
        break;
    }
    return this._scopeAllocated && this.scope.destroy(), this._error;
  }
  chain(e, t4, r8) {
    let n6, o3;
    e instanceof _a27 ? (n6 = e, o3 = t4 instanceof R ? t4 : void 0) : (n6 = new _a27({ name: t4, component: e }), o3 = r8 instanceof R ? r8 : void 0);
    let s4 = o3 || this.scope;
    n6._caller = this._caller;
    let a4 = n6.process(s4);
    return i.isPromiseInstance(a4) ? a4.catch((c3) => {
      throw c3;
    }) : a4;
  }
  toString() {
    return `A-Feature(${this.caller.component?.constructor?.name || "Unknown"}::${this.name})`;
  }
}, __name(_a27, "he"), _a27);
p(he, "A_Feature");
var N = he;
var _a28;
var nt = (_a28 = class {
  call(e, t4) {
    let r8 = new N({ name: e, component: this });
    if (r8.size !== 0) return r8.process(t4);
  }
}, __name(_a28, "nt"), _a28);
p(nt, "A_Component");
var O = nt;
var ot = ((n6) => (n6.EXTENSIONS = "a-component-extensions", n6.FEATURES = "a-component-features", n6.INJECTIONS = "a-component-injections", n6.ABSTRACTIONS = "a-component-abstractions", n6))(ot || {});
var _a29;
var st = (_a29 = class extends m {
  injections(e) {
    return this.get("a-component-injections")?.get(e) || [];
  }
  extensions(e) {
    let t4 = [];
    return this.get("a-component-extensions")?.find(e).forEach(([n6, o3]) => {
      o3.forEach((s4) => {
        t4.push({ name: s4.name, handler: s4.handler, behavior: s4.behavior, before: s4.before || "", after: s4.after || "", throwOnError: s4.throwOnError || true, override: s4.override || "" });
      });
    }), t4;
  }
  features() {
    return this.get("a-component-features")?.toArray().map(([, t4]) => t4) || [];
  }
  abstractions(e) {
    let t4 = [], r8 = this.get("a-component-abstractions"), n6 = this.get("a-component-injections");
    return r8?.find(`CONCEPT_ABSTRACTION::${e}`).forEach(([o3, s4]) => {
      s4.forEach((a4) => {
        let c3 = n6?.get(a4.handler) || [];
        t4.push({ ...a4, args: c3 });
      });
    }), t4;
  }
}, __name(_a29, "st"), _a29);
p(st, "A_ComponentMeta");
var z = st;
var St = /* @__PURE__ */ new Set();
var ht = /* @__PURE__ */ new Set();
var _a30;
var it = (_a30 = class {
  constructor(e, t4) {
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
    this._subscribers = /* @__PURE__ */ new Set();
    this.getInitializer(e).call(this, e, t4);
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
    let e = this._cachedAggVersion;
    return e === void 0 && (St.clear(), e = this.aggregateVersion(St), this._cachedAggVersion = e), this._cachedFingerprint !== void 0 && this._cachedFingerprintVersion === e ? this._cachedFingerprint : (ht.clear(), this._cachedFingerprint = this.computeFingerprint(ht), this._cachedFingerprintVersion = e, this._cachedFingerprint);
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
    if (this._version++, this._resolveConstructorCache.clear(), this._resolveCache.clear(), this._resolveFlatAllCache.clear(), this._resolveAllCache.clear(), this._cachedFingerprint = void 0, this._cachedAggVersion = void 0, this._subscribers.size !== 0) for (let e of this._subscribers) {
      let t4 = e.deref();
      if (!t4) {
        this._subscribers.delete(e);
        continue;
      }
      t4.bumpVersion();
    }
  }
  _addSubscriber(e) {
    if (this._subscriberTokens || (this._subscriberTokens = /* @__PURE__ */ new WeakMap()), this._subscriberTokens.has(e)) return;
    let t4 = new WeakRef(e);
    this._subscribers.add(t4), this._subscriberTokens.set(e, t4);
  }
  _removeSubscriber(e) {
    let t4 = this._subscriberTokens;
    if (!t4) return;
    let r8 = t4.get(e);
    r8 && (this._subscribers.delete(r8), t4.delete(e));
  }
  aggregateVersion(e) {
    if (e.has(this)) return 0;
    e.add(this);
    let t4 = this._version;
    this._parent && (t4 += this._parent.aggregateVersion(e));
    for (let r8 of this._imports) t4 += r8.aggregateVersion(e);
    return t4;
  }
  computeFingerprint(e) {
    if (e.has(this)) return "~circular~";
    e.add(this);
    let t4 = [];
    if (t4.push("P:" + (this._parent ? this._parent.computeFingerprint(e) : "-")), this._allowedComponents.size) {
      let o3 = Array.from(this._allowedComponents).map((s4) => s4.name).sort();
      t4.push("AC:" + o3.join(","));
    } else t4.push("AC:");
    if (this._allowedEntities.size) {
      let o3 = Array.from(this._allowedEntities).map((s4) => s4.name).sort();
      t4.push("AE:" + o3.join(","));
    } else t4.push("AE:");
    if (this._allowedFragments.size) {
      let o3 = Array.from(this._allowedFragments).map((s4) => s4.name).sort();
      t4.push("AF:" + o3.join(","));
    } else t4.push("AF:");
    if (this._allowedErrors.size) {
      let o3 = Array.from(this._allowedErrors).map((s4) => s4.name).sort();
      t4.push("AR:" + o3.join(","));
    } else t4.push("AR:");
    if (this._imports.size) {
      let o3 = Array.from(this._imports).map((s4) => s4.computeFingerprint(e)).sort();
      t4.push("I:" + o3.join(","));
    } else t4.push("I:");
    let r8 = t4.join("|"), n6 = 5381;
    for (let o3 = 0; o3 < r8.length; o3++) n6 = (n6 << 5) + n6 + r8.charCodeAt(o3) | 0;
    return (n6 >>> 0).toString(16);
  }
  *parents() {
    let e = this._parent;
    for (; e; ) yield e, e = e._parent;
  }
  parentOffset(e) {
    let t4 = this;
    for (; e <= -1 && t4; ) t4 = t4.parent, e++;
    return t4;
  }
  getInitializer(e, t4) {
    switch (true) {
      case (!e && !t4):
        return this.defaultInitialized;
      case !!e:
        return this.defaultInitialized;
      default:
        throw new T(T.ConstructorError, "Invalid parameters provided to A_Scope constructor");
    }
  }
  defaultInitialized(e = {}, t4 = {}) {
    this._name = e.name || this.constructor.name, this.initComponents(e.components), this.initErrors(e.errors), this.initFragments(e.fragments), this.initEntities(e.entities), this.initMeta(e.meta), t4.parent && (this._parent = t4.parent, t4.parent._addSubscriber(this));
  }
  initComponents(e) {
    e?.forEach(this.register.bind(this));
  }
  initErrors(e) {
    e?.forEach(this.register.bind(this));
  }
  initEntities(e) {
    e?.forEach((t4) => this.register(t4));
  }
  initFragments(e) {
    e?.forEach(this.register.bind(this));
  }
  initMeta(e) {
    e && Object.entries(e).forEach(([t4, r8]) => {
      this._meta.set(t4, r8);
    });
  }
  destroy() {
    this._components.forEach((e) => _.deregister(e)), this._fragments.forEach((e) => _.deregister(e)), this._entities.forEach((e) => _.deregister(e)), this._components.clear(), this._errors.clear(), this._fragments.clear(), this._entities.clear(), this._allowedComponents.clear(), this._allowedFragments.clear(), this._allowedEntities.clear(), this._allowedErrors.clear();
    for (let e of this._imports) e._removeSubscriber(this);
    if (this._imports.clear(), this._parent && (this._parent._removeSubscriber(this), this._parent = void 0), this._subscribers.size > 0) {
      for (let e of this._subscribers) {
        let t4 = e.deref();
        t4 && (t4._parent === this && (t4._parent = void 0), t4._imports.has(this) && t4._imports.delete(this), t4.bumpVersion());
      }
      this._subscribers.clear();
    }
    this.issuer() && _.deallocate(this), this.bumpVersion();
  }
  get(e) {
    return this._meta.get(e);
  }
  set(e, t4) {
    this._meta.set(e, t4);
  }
  issuer() {
    return _.issuer(this);
  }
  inherit(e) {
    if (!e) throw new T(T.InitializationError, "Invalid parent scope provided");
    if (e === this) throw new T(T.CircularInheritanceError, `Unable to inherit scope ${this.name} from itself`);
    if (e === this._parent) return this;
    let t4 = this.checkCircularInheritance(e);
    if (t4) throw new T(T.CircularInheritanceError, `Circular inheritance detected: ${[...t4, e.name].join(" -> ")}`);
    return this._parent && this._parent._removeSubscriber(this), this._parent = e, e._addSubscriber(this), this.bumpVersion(), this;
  }
  import(...e) {
    return e.forEach((t4) => {
      if (t4 === this) throw new T(T.CircularImportError, `Unable to import scope ${this.name} into itself`);
      this._imports.has(t4) || (this._imports.add(t4), t4._addSubscriber(this), this.bumpVersion());
    }), this;
  }
  deimport(...e) {
    return e.forEach((t4) => {
      this._imports.has(t4) && (this._imports.delete(t4), t4._removeSubscriber(this), this.bumpVersion());
    }), this;
  }
  has(e) {
    let t4 = this.hasFlat(e);
    if (!t4 && this._parent) try {
      return this._parent.has(e);
    } catch {
      return false;
    }
    return t4;
  }
  hasFlat(e) {
    let t4 = false;
    switch (true) {
      case i.isScopeConstructor(e):
        return true;
      case i.isString(e): {
        Array.from(this.allowedComponents).find((a4) => a4.name === e) && (t4 = true), Array.from(this.allowedFragments).find((a4) => a4.name === e) && (t4 = true), Array.from(this.allowedEntities).find((a4) => a4.name === e) && (t4 = true), Array.from(this.allowedErrors).find((a4) => a4.name === e) && (t4 = true);
        break;
      }
      case i.isComponentConstructor(e): {
        t4 = this.isAllowedComponent(e) || !!_.findDescendantIn(e, this.allowedComponents);
        break;
      }
      case i.isEntityConstructor(e): {
        t4 = this.isAllowedEntity(e) || !!_.findDescendantIn(e, this.allowedEntities);
        break;
      }
      case i.isFragmentConstructor(e): {
        t4 = this.isAllowedFragment(e) || !!_.findDescendantIn(e, this.allowedFragments);
        break;
      }
      case i.isErrorConstructor(e): {
        t4 = this.isAllowedError(e) || !!_.findDescendantIn(e, this.allowedErrors);
        break;
      }
      case (this.issuer() && (this.issuer().constructor === e || _.isIndexedInheritedFrom(this.issuer().constructor, e))): {
        t4 = true;
        break;
      }
    }
    return t4;
  }
  resolveDependency(e) {
    let t4 = [], r8 = this.parentOffset(e.parent) || this;
    switch (true) {
      case (e.flat && !e.all): {
        let l5 = r8.resolveFlatOnce(e.target || e.name);
        l5 && (t4 = [l5]);
        break;
      }
      case (e.flat && e.all): {
        t4 = r8.resolveFlatAll(e.target || e.name);
        break;
      }
      case (!e.flat && !e.all): {
        let l5 = r8.resolveOnce(e.target || e.name);
        l5 && (t4 = [l5]);
        break;
      }
      case (!e.flat && e.all): {
        t4 = r8.resolveAll(e.target || e.name);
        break;
      }
      default:
        t4 = [];
    }
    if (e.create && !t4.length && i.isAllowedForDependencyDefaultCreation(e.target)) {
      let l5 = new e.target(...e.args);
      r8.register(l5), t4.push(l5);
    }
    if (e.require && !t4.length) throw new T(T.ResolutionError, `Dependency ${e.name} is required but could not be resolved in scope ${r8.name}`);
    e.query.aseid ? t4 = t4.filter((l5) => i.hasASEID(l5) && w.compare(l5.aseid, e.query.aseid)) : Object.keys(e.query).length > 0 && (t4 = t4.filter((l5) => {
      let f4 = e.query;
      return f4 ? Object.entries(f4).every(([g5, v6]) => l5[g5] === v6) : true;
    }));
    let n6 = e.pagination.count, o3 = e.pagination.from, s4 = o3 === "end" ? n6 === -1 ? 0 : Math.max(t4.length - n6, 0) : 0, a4 = o3 === "end" || n6 === -1 ? t4.length : Math.min(n6, t4.length), c3 = t4.slice(s4, a4);
    return n6 === -1 ? c3 : c3.length === 1 ? c3[0] : c3.length ? c3 : void 0;
  }
  resolveConstructor(e) {
    switch (true) {
      case i.isComponentConstructor(e):
        return _.findDescendantIn(e, this.allowedComponents);
      case i.isEntityConstructor(e):
        return _.findDescendantIn(e, this.allowedEntities);
      case i.isFragmentConstructor(e):
        return _.findDescendantIn(e, this.allowedFragments);
      case i.isErrorConstructor(e):
        return _.findDescendantIn(e, this.allowedErrors);
    }
    if (!i.isString(e)) throw new T(T.ResolutionError, `Invalid constructor name provided: ${e}`);
    let t4 = e;
    if (this._resolveConstructorCache.has(t4)) {
      let n6 = this._resolveConstructorCache.get(t4);
      return n6 === null ? void 0 : n6;
    }
    let r8 = this._resolveConstructorUncached(e);
    return this._resolveConstructorCache.set(t4, r8 ?? null), r8;
  }
  _resolveConstructorUncached(e) {
    let t4 = Array.from(this.allowedComponents).find((o3) => o3.name === e || o3.name === P.toPascalCase(e));
    if (t4) return t4;
    {
      let o3 = P.toPascalCase(e), s4 = Array.from(this.allowedComponents).find((a4) => {
        let c3 = _.getAncestors(a4);
        if (!c3) return false;
        for (let l5 of c3) if (l5.name === e || l5.name === o3) return true;
        return false;
      });
      if (s4) return s4;
    }
    let r8 = Array.from(this.allowedEntities).find((o3) => o3.name === e || o3.name === P.toPascalCase(e) || o3.entity === e || o3.entity === P.toKebabCase(e));
    if (r8) return r8;
    {
      let o3 = P.toPascalCase(e), s4 = Array.from(this.allowedEntities).find((a4) => {
        let c3 = _.getAncestors(a4);
        if (!c3) return false;
        for (let l5 of c3) if (l5.name === e || l5.name === o3) return true;
        return false;
      });
      if (s4) return s4;
    }
    let n6 = Array.from(this.allowedFragments).find((o3) => o3.name === e || o3.name === P.toPascalCase(e));
    if (n6) return n6;
    {
      let o3 = P.toPascalCase(e), s4 = Array.from(this.allowedFragments).find((a4) => {
        let c3 = _.getAncestors(a4);
        if (!c3) return false;
        for (let l5 of c3) if (l5.name === e || l5.name === o3) return true;
        return false;
      });
      if (s4) return s4;
    }
    for (let o3 of this._imports) {
      let s4 = o3.resolveConstructor(e);
      if (s4) return s4;
    }
    if (this._parent) return this._parent.resolveConstructor(e);
  }
  resolveAll(e) {
    if (this._resolveAllCache.has(e)) return this._resolveAllCache.get(e);
    if (i.isContainerConstructor(e)) {
      let s4 = _.containers(e);
      return this._resolveAllCache.set(e, s4), s4;
    }
    let t4 = /* @__PURE__ */ new Set();
    this.resolveFlatAll(e).forEach((s4) => t4.add(s4)), this._imports.forEach((s4) => {
      s4.has(e) && s4.resolveFlatAll(e).forEach((c3) => t4.add(c3));
    });
    let n6 = this._parent;
    for (; n6 && n6.has(e); ) n6.resolveAll(e).forEach((a4) => t4.add(a4)), n6 = n6._parent;
    let o3 = Array.from(t4);
    return this._resolveAllCache.set(e, o3), o3;
  }
  resolveFlatAll(e) {
    if (this._resolveFlatAllCache.has(e)) return this._resolveFlatAllCache.get(e);
    let t4 = [];
    switch (true) {
      case i.isComponentConstructor(e): {
        this.allowedComponents.forEach((r8) => {
          if (_.isIndexedInheritedFrom(r8, e)) {
            let n6 = this.resolveOnce(r8);
            n6 && t4.push(n6);
          }
        });
        break;
      }
      case i.isFragmentConstructor(e): {
        this.allowedFragments.forEach((r8) => {
          if (_.isIndexedInheritedFrom(r8, e)) {
            let n6 = this.resolveOnce(r8);
            n6 && t4.push(n6);
          }
        });
        break;
      }
      case i.isEntityConstructor(e): {
        this.entities.forEach((r8) => {
          _.isIndexedInheritedFrom(r8.constructor, e) && t4.push(r8);
        });
        break;
      }
      case i.isString(e): {
        let r8 = this.resolveConstructor(e);
        if (!i.isComponentConstructor(r8) && !i.isEntityConstructor(r8) && !i.isFragmentConstructor(r8)) throw new T(T.ResolutionError, `Unable to resolve all instances for name: ${e} in scope ${this.name} as no matching component, entity or fragment constructor found`);
        if (r8) {
          let n6 = this.resolveAll(r8);
          n6 && t4.push(...n6);
        }
        break;
      }
      default:
        throw new T(T.ResolutionError, `Invalid parameter provided to resolveAll method: ${e} in scope ${this.name}`);
    }
    return this._resolveFlatAllCache.set(e, t4), t4;
  }
  resolve(e) {
    let t4 = i.isDependencyInstance(e) ? e : new M(e);
    return this.resolveDependency(t4);
  }
  resolveOnce(e) {
    if (this._resolveCache.has(e)) return this._resolveCache.get(e);
    let t4 = this.resolveFlatOnce(e);
    if (!t4) {
      for (let r8 of this._imports) if (r8.has(e)) {
        let n6 = r8.resolveFlatOnce(e);
        if (n6) return this._resolveCache.set(e, n6), n6;
      }
    }
    if (!t4 && this.parent) {
      let r8 = this.parent.resolveOnce(e);
      if (r8) return this._resolveCache.set(e, r8), r8;
    }
    if (!t4 && i.isContainerConstructor(e)) {
      let n6 = _.containers(e)[0];
      return this._resolveCache.set(e, n6), n6;
    }
    return this._resolveCache.set(e, t4), t4;
  }
  resolveFlat(e) {
    return this.resolveFlatOnce(e);
  }
  resolveFlatOnce(e) {
    let t4;
    if (!(!e || !this.hasFlat(e))) {
      switch (true) {
        case i.isString(e): {
          t4 = this.resolveByName(e);
          break;
        }
        case i.isConstructorAllowedForScopeAllocation(e): {
          t4 = this.resolveIssuer(e);
          break;
        }
        case i.isScopeConstructor(e): {
          t4 = this.resolveScope(e);
          break;
        }
        case i.isEntityConstructor(e): {
          t4 = this.resolveEntity(e);
          break;
        }
        case i.isFragmentConstructor(e): {
          t4 = this.resolveFragment(e);
          break;
        }
        case i.isComponentConstructor(e): {
          t4 = this.resolveComponent(e);
          break;
        }
        case i.isErrorConstructor(e): {
          t4 = this.resolveError(e);
          break;
        }
        default:
          throw new T(T.ResolutionError, `Injected Component ${A.getComponentName(e)} not found in the scope`);
      }
      return t4;
    }
  }
  resolveByName(e) {
    let t4 = Array.from(this.allowedComponents).find((s4) => s4.name === e || s4.name === P.toPascalCase(e));
    if (t4) return this.resolveOnce(t4);
    let r8 = Array.from(this.allowedEntities).find((s4) => s4.name === e || s4.name === P.toPascalCase(e) || s4.entity === e || s4.entity === P.toKebabCase(e));
    if (r8) return this.resolveOnce(r8);
    let n6 = Array.from(this.allowedFragments).find((s4) => s4.name === e || s4.name === P.toPascalCase(e));
    if (n6) return this.resolveOnce(n6);
    let o3 = Array.from(this.allowedErrors).find((s4) => s4.name === e || s4.name === P.toPascalCase(e) || s4.code === e || s4.code === P.toKebabCase(e));
    if (o3) return this.resolveOnce(o3);
  }
  resolveIssuer(e) {
    let t4 = this.issuer();
    if (t4 && (t4.constructor === e || _.isIndexedInheritedFrom(t4?.constructor, e))) return t4;
  }
  resolveEntity(e) {
    return this.entities.find((t4) => t4 instanceof e);
  }
  resolveError(e) {
    return this.errors.find((t4) => t4 instanceof e);
  }
  resolveFragment(e) {
    let t4 = this._fragments.get(e);
    switch (true) {
      case (t4 && this._fragments.has(e)):
        return t4;
      case !t4: {
        let r8 = _.findDescendantIn(e, this._allowedFragments);
        return r8 ? this.resolveFragment(r8) : void 0;
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
        let n6 = (_.meta(e).get("a-component-injections")?.get("constructor") || []).map((s4) => this.resolve(s4)), o3 = new e(...n6);
        return this.register(o3), this._components.get(e);
      }
      case !this.allowedComponents.has(e): {
        let t4 = _.findDescendantIn(e, this.allowedComponents);
        return t4 ? this.resolveComponent(t4) : void 0;
      }
      default:
        return;
    }
  }
  register(e) {
    switch (true) {
      case e instanceof O: {
        _.indexConstructor(e.constructor), _.register(this, e), this.allowedComponents.has(e.constructor) || this.allowedComponents.add(e.constructor), this._components.set(e.constructor, e), this.bumpVersion();
        break;
      }
      case i.isEntityInstance(e): {
        let t4 = e.aseid.toString();
        if (this._entities.has(t4)) throw new T(T.RegistrationError, `Entity with ASEID ${t4} is already registered in the scope ${this.name}`);
        _.indexConstructor(e.constructor), _.register(this, e), this.allowedEntities.has(e.constructor) || this.allowedEntities.add(e.constructor), this._entities.set(t4, e), this.bumpVersion();
        break;
      }
      case i.isFragmentInstance(e): {
        _.indexConstructor(e.constructor), _.register(this, e), this.allowedFragments.has(e.constructor) || this.allowedFragments.add(e.constructor), this._fragments.set(e.constructor, e), this.bumpVersion();
        break;
      }
      case i.isErrorInstance(e): {
        _.indexConstructor(e.constructor), _.register(this, e), this.allowedErrors.has(e.constructor) || this.allowedErrors.add(e.constructor), this._errors.set(e.code, e), this.bumpVersion();
        break;
      }
      case i.isComponentConstructor(e): {
        this.allowedComponents.has(e) || (this.allowedComponents.add(e), _.indexConstructor(e), this.bumpVersion());
        break;
      }
      case i.isFragmentConstructor(e): {
        this.allowedFragments.has(e) || (this.allowedFragments.add(e), _.indexConstructor(e), this.bumpVersion());
        break;
      }
      case i.isEntityConstructor(e): {
        this.allowedEntities.has(e) || (this.allowedEntities.add(e), _.indexConstructor(e), this.bumpVersion());
        break;
      }
      case i.isErrorConstructor(e): {
        this.allowedErrors.has(e) || (this.allowedErrors.add(e), _.indexConstructor(e), this.bumpVersion());
        break;
      }
      default:
        if (e instanceof D) throw new T(T.RegistrationError, `Entity with ASEID ${e.aseid.toString()} is already registered in the scope ${this.name}`);
        if (e instanceof H) throw new T(T.RegistrationError, `Fragment ${e.constructor.name} is already registered in the scope ${this.name}`);
        {
          let t4 = A.getComponentName(e);
          throw new T(T.RegistrationError, `Cannot register ${t4} in the scope ${this.name}`);
        }
    }
  }
  deregister(e) {
    switch (true) {
      case i.isComponentInstance(e): {
        this._components.delete(e.constructor), _.deregister(e), this.bumpVersion();
        break;
      }
      case i.isEntityInstance(e): {
        this._entities.delete(e.aseid.toString()), _.deregister(e), this.bumpVersion();
        break;
      }
      case i.isFragmentInstance(e): {
        this._fragments.delete(e.constructor), _.deregister(e), this.bumpVersion();
        break;
      }
      case i.isErrorInstance(e): {
        this._errors.delete(e.code), _.deregister(e), this.bumpVersion();
        break;
      }
      case i.isComponentConstructor(e): {
        this.allowedComponents.delete(e), this.bumpVersion();
        break;
      }
      case i.isFragmentConstructor(e): {
        this.allowedFragments.delete(e), Array.from(this._fragments.entries()).forEach(([r8, n6]) => {
          _.isIndexedInheritedFrom(r8, e) && (this._fragments.delete(r8), _.deregister(n6));
        }), this.bumpVersion();
        break;
      }
      case i.isEntityConstructor(e): {
        this.allowedEntities.delete(e), Array.from(this._entities.entries()).forEach(([r8, n6]) => {
          _.isIndexedInheritedFrom(n6.constructor, e) && (this._entities.delete(r8), _.deregister(n6));
        }), this.bumpVersion();
        break;
      }
      case i.isErrorConstructor(e): {
        this.allowedErrors.delete(e), Array.from(this._errors.entries()).forEach(([r8, n6]) => {
          _.isIndexedInheritedFrom(n6.constructor, e) && (this._errors.delete(r8), _.deregister(n6));
        }), this.bumpVersion();
        break;
      }
      default:
        let t4 = A.getComponentName(e);
        throw new T(T.DeregistrationError, `Cannot deregister ${t4} from the scope ${this.name}`);
    }
  }
  toJSON() {
    return this.fragments.reduce((e, t4) => {
      let r8 = t4.toJSON();
      return { ...e, [r8.name]: r8 };
    }, {});
  }
  isAllowedComponent(e) {
    return i.isComponentConstructor(e) && this.allowedComponents.has(e);
  }
  isAllowedEntity(e) {
    return i.isEntityConstructor(e) && this.allowedEntities.has(e);
  }
  isAllowedFragment(e) {
    return i.isFragmentConstructor(e) && this.allowedFragments.has(e);
  }
  isAllowedError(e) {
    return i.isErrorConstructor(e) && this.allowedErrors.has(e);
  }
  isInheritedFrom(e) {
    let t4 = this;
    for (; t4; ) {
      if (t4 === e) return true;
      t4 = t4._parent;
    }
    return false;
  }
  checkCircularInheritance(e) {
    let t4 = [], r8 = this._parent;
    for (; r8; ) {
      if (t4.push(r8.name), r8 === e) return t4;
      r8 = r8._parent;
    }
    return false;
  }
  printInheritanceChain() {
    let e = [], t4 = this;
    for (; t4; ) e.push(t4.name), t4 = t4._parent;
    console.log(e.join(" -> "));
  }
}, __name(_a30, "it"), _a30);
p(it, "A_Scope");
var R = it;
var _a31;
var q = (_a31 = class extends b {
}, __name(_a31, "q"), _a31);
p(q, "A_ScopeError"), q.InitializationError = "A-Scope Initialization Error", q.ConstructorError = "Unable to construct A-Scope instance", q.ResolutionError = "A-Scope Resolution Error", q.RegistrationError = "A-Scope Registration Error", q.CircularInheritanceError = "A-Scope Circular Inheritance Error", q.CircularImportError = "A-Scope Circular Import Error", q.DeregistrationError = "A-Scope Deregistration Error";
var T = q;
var _a32;
var Y = (_a32 = class extends b {
}, __name(_a32, "Y"), _a32);
p(Y, "A_ContextError"), Y.NotAllowedForScopeAllocationError = "Component is not allowed for scope allocation", Y.ComponentAlreadyHasScopeAllocatedError = "Component already has scope allocated", Y.InvalidMetaParameterError = "Invalid parameter provided to get meta", Y.InvalidScopeParameterError = "Invalid parameter provided to get scope", Y.ScopeNotFoundError = "Scope not found", Y.InvalidFeatureParameterError = "Invalid parameter provided to get feature", Y.InvalidFeatureDefinitionParameterError = "Invalid parameter provided to define feature", Y.InvalidFeatureTemplateParameterError = "Invalid parameter provided to get feature template", Y.InvalidFeatureExtensionParameterError = "Invalid parameter provided to extend feature", Y.InvalidAbstractionParameterError = "Invalid parameter provided to get abstraction", Y.InvalidAbstractionDefinitionParameterError = "Invalid parameter provided to define abstraction", Y.InvalidAbstractionTemplateParameterError = "Invalid parameter provided to get abstraction template", Y.InvalidAbstractionExtensionParameterError = "Invalid parameter provided to extend abstraction", Y.InvalidInjectionParameterError = "Invalid parameter provided to get injections", Y.InvalidExtensionParameterError = "Invalid parameter provided to get extensions", Y.InvalidRegisterParameterError = "Invalid parameter provided to register component", Y.InvalidComponentParameterError = "Invalid component provided", Y.ComponentNotRegisteredError = "Component not registered in the context", Y.InvalidDeregisterParameterError = "Invalid parameter provided to deregister component", Y.ComponentAlreadyRegisteredInOtherScopeError = "Instance already owned by another scope";
var d = Y;
var _a33;
var x = (_a33 = class {
  constructor() {
    this._registry = /* @__PURE__ */ new WeakMap();
    this._containers = /* @__PURE__ */ new Set();
    this._scopeIssuers = /* @__PURE__ */ new WeakMap();
    this._scopeStorage = /* @__PURE__ */ new WeakMap();
    this._metaStorage = /* @__PURE__ */ new Map();
    this._overrideRegexpCache = /* @__PURE__ */ new Map();
    this._metaVersion = 0;
    this._featureCache = /* @__PURE__ */ new WeakMap();
    this._sortedStepsForTemplate = /* @__PURE__ */ new WeakMap();
    this._ancestors = /* @__PURE__ */ new Map();
    this._descendants = /* @__PURE__ */ new Map();
    this._globals = /* @__PURE__ */ new Map();
    let e = String(J.A_CONCEPT_ROOT_SCOPE) || "root";
    this._root = new R({ name: e });
  }
  static get concept() {
    return J.A_CONCEPT_NAME || "a-concept";
  }
  static get root() {
    return this.getInstance()._root;
  }
  static get environment() {
    return J.A_CONCEPT_RUNTIME_ENVIRONMENT;
  }
  static getInstance() {
    return _a33._instance || (_a33._instance = new _a33()), _a33._instance;
  }
  static has(e) {
    return e ? this.getInstance()._scopeStorage.has(e) : false;
  }
  static register(e, t4) {
    let r8 = this.getInstance();
    if (!t4) throw new d(d.InvalidRegisterParameterError, "Unable to register component. Component cannot be null or undefined.");
    if (!e) throw new d(d.InvalidRegisterParameterError, "Unable to register component. Scope cannot be null or undefined.");
    if (!this.isAllowedToBeRegistered(t4)) throw new d(d.NotAllowedForScopeAllocationError, `Component ${A.getComponentName(t4)} is not allowed for scope allocation.`);
    let n6 = r8._scopeStorage.get(t4);
    if (n6 && n6 !== e) throw new d(d.ComponentAlreadyRegisteredInOtherScopeError, `Unable to register component. Component ${A.getComponentName(t4)} is already registered in scope "${n6.name ?? "<unnamed>"}". An instance can be registered in at most one scope; inherit or import the owning scope instead of re-registering the same instance.`);
    return r8._scopeStorage.set(t4, e), e;
  }
  static deregister(e) {
    if (!e) throw new d(d.InvalidDeregisterParameterError, "Unable to deregister component. Component cannot be null or undefined.");
    if (!this.getInstance()._scopeStorage.delete(e)) {
      let r8 = A.getComponentName(e);
      throw new d(d.ComponentNotRegisteredError, `Unable to deregister component. Component ${r8} is not registered.`);
    }
  }
  static allocate(e, t4) {
    let r8 = A.getComponentName(e);
    if (!this.isAllowedForScopeAllocation(e)) throw new d(d.NotAllowedForScopeAllocationError, `Component of type ${r8} is not allowed for scope allocation. Only A_Container, A_Feature are allowed.`);
    let n6 = this.getInstance();
    if (n6._registry.has(e)) throw new d(d.ComponentAlreadyHasScopeAllocatedError, `Component ${r8} already has a scope allocated.`);
    let o3 = i.isScopeInstance(t4) ? t4 : new R(t4 || { name: r8 + "-scope" }, t4);
    return o3.isInheritedFrom(_a33.root) || o3.inherit(_a33.root), n6._registry.set(e, o3), n6._scopeIssuers.set(o3, e), i.isContainerInstance(e) && n6._containers.add(e), o3;
  }
  static deallocate(e) {
    let t4 = this.getInstance(), r8 = i.isScopeInstance(e) ? e : t4._registry.get(e);
    if (!r8) return;
    let n6 = i.isComponentInstance(e) ? e : this.issuer(r8);
    n6 && t4._registry.delete(n6), r8 && t4._scopeIssuers.delete(r8), n6 && i.isContainerInstance(n6) && t4._containers.delete(n6);
  }
  static meta(e) {
    let t4 = A.getComponentName(e), r8 = this.getInstance();
    if (!e) throw new d(d.InvalidMetaParameterError, "Invalid parameter provided to get meta. Parameter cannot be null or undefined.");
    if (!(this.isAllowedForMeta(e) || this.isAllowedForMetaConstructor(e) || i.isString(e) || i.isFunction(e))) throw new d(d.InvalidMetaParameterError, `Invalid parameter provided to get meta. Component of type ${t4} is not allowed for meta storage. Only A_Container, A_Component and A_Entity are allowed.`);
    let n6, o3;
    switch (true) {
      case i.isContainerInstance(e): {
        n6 = e.constructor, o3 = Q;
        break;
      }
      case i.isContainerConstructor(e): {
        n6 = e, o3 = Q;
        break;
      }
      case i.isComponentInstance(e): {
        n6 = e.constructor, o3 = z;
        break;
      }
      case i.isComponentConstructor(e): {
        n6 = e, o3 = z;
        break;
      }
      case i.isEntityInstance(e): {
        n6 = e.constructor, o3 = z;
        break;
      }
      case i.isEntityConstructor(e): {
        n6 = e, o3 = X;
        break;
      }
      case i.isFragmentInstance(e): {
        n6 = e.constructor, o3 = z;
        break;
      }
      case i.isFragmentConstructor(e): {
        n6 = e, o3 = X;
        break;
      }
      case typeof e == "string": {
        let s4 = Array.from(r8._metaStorage).find(([a4]) => a4.name === e || a4.name === P.toKebabCase(e) || a4.name === P.toPascalCase(e));
        if (!(s4 && s4.length)) throw new d(d.InvalidMetaParameterError, `Invalid parameter provided to get meta. Component with name ${e} not found in the meta storage.`);
        n6 = s4[0], o3 = z;
        break;
      }
      default: {
        n6 = e, o3 = m;
        break;
      }
    }
    if (!r8._metaStorage.has(n6)) {
      let s4, a4 = n6;
      for (; !s4; ) {
        let c3 = Object.getPrototypeOf(a4);
        if (!c3) break;
        s4 = r8._metaStorage.get(c3), a4 = c3;
      }
      s4 || (s4 = new o3()), r8._metaStorage.set(n6, s4.clone()), r8._metaVersion++, this.indexConstructor(n6);
    }
    return r8._metaStorage.get(n6);
  }
  static setMeta(e, t4) {
    let r8 = _a33.getInstance(), n6 = _a33.meta(e), o3 = typeof e == "function" ? e : e.constructor;
    r8._metaStorage.set(o3, n6 ? t4.from(n6) : t4), r8._metaVersion++;
  }
  static issuer(e) {
    let t4 = this.getInstance();
    if (!e) throw new d(d.InvalidComponentParameterError, "Invalid parameter provided to get scope issuer. Parameter cannot be null or undefined.");
    return t4._scopeIssuers.get(e);
  }
  static containers(e) {
    let t4 = this.getInstance();
    if (!e) return Array.from(t4._containers);
    let r8 = [];
    return t4._containers.forEach((n6) => {
      (n6 instanceof e || n6.constructor === e || _a33.isIndexedInheritedFrom(n6.constructor, e)) && r8.push(n6);
    }), r8;
  }
  static container(e) {
    let t4 = this.getInstance();
    for (let r8 of t4._containers) if (r8.name === e) return r8;
  }
  static scope(e) {
    let t4 = e?.constructor?.name || String(e), r8 = this.getInstance();
    if (!e) throw new d(d.InvalidScopeParameterError, "Invalid parameter provided to get scope. Parameter cannot be null or undefined.");
    if (!this.isAllowedForScopeAllocation(e) && !this.isAllowedToBeRegistered(e)) throw new d(d.InvalidScopeParameterError, `Invalid parameter provided to get scope. Component of type ${t4} is not allowed for scope allocation.`);
    switch (true) {
      case this.isAllowedToBeRegistered(e):
        if (!r8._scopeStorage.has(e)) throw new d(d.ScopeNotFoundError, `Invalid parameter provided to get scope. Component of type ${t4} does not have a scope registered. Make sure to register the component using A_Context.register() method before trying to get the scope.`);
        return r8._scopeStorage.get(e);
      case this.isAllowedForScopeAllocation(e):
        if (!r8._registry.has(e)) throw new d(d.ScopeNotFoundError, `Invalid parameter provided to get scope. Component of type ${t4} does not have a scope allocated. Make sure to allocate a scope using A_Context.allocate() method before trying to get the scope.`);
        return r8._registry.get(e);
      default:
        throw new d(d.InvalidScopeParameterError, `Invalid parameter provided to get scope. Component of type ${t4} is not allowed to be registered.`);
    }
  }
  static getSortedStepsFor(e) {
    return this.getInstance()._sortedStepsForTemplate.get(e);
  }
  static setSortedStepsFor(e, t4) {
    this.getInstance()._sortedStepsForTemplate.set(e, t4);
  }
  static hasFeature(e, t4, r8 = this.scope(t4)) {
    return this.featureTemplate(e, t4, r8).length > 0;
  }
  static featureTemplate(e, t4, r8 = this.scope(t4)) {
    if (!t4) throw new d(d.InvalidFeatureTemplateParameterError, "Unable to get feature template. Component cannot be null or undefined.");
    if (!e) throw new d(d.InvalidFeatureTemplateParameterError, "Unable to get feature template. Feature name cannot be null or undefined.");
    if (!i.isAllowedForFeatureDefinition(t4)) throw new d(d.InvalidFeatureTemplateParameterError, `Unable to get feature template. Component of type ${A.getComponentName(t4)} is not allowed for feature definition.`);
    let n6 = this.getInstance(), o3 = typeof t4 == "function" ? t4 : t4.constructor, s4 = n6._featureCache.get(o3);
    if (s4) {
      let f4 = `${String(e)}::s${r8.fingerprint}::m${n6._metaVersion}`, g5 = s4.get(f4);
      if (g5) return g5;
      let v6 = [...this.featureDefinition(e, t4), ...this.featureExtensions(e, t4, r8)];
      return s4.size >= _a33.FEATURE_EXTENSIONS_CACHE_MAX_SIZE && s4.clear(), s4.set(f4, v6), v6;
    }
    let a4 = `${String(e)}::s${r8.fingerprint}::m${n6._metaVersion}`, c3 = [...this.featureDefinition(e, t4), ...this.featureExtensions(e, t4, r8)], l5 = /* @__PURE__ */ new Map();
    return l5.set(a4, c3), n6._featureCache.set(o3, l5), c3;
  }
  static featureExtensions(e, t4, r8) {
    let n6 = this.getInstance();
    if (!t4) throw new d(d.InvalidFeatureExtensionParameterError, "Unable to get feature template. Component cannot be null or undefined.");
    if (!e) throw new d(d.InvalidFeatureExtensionParameterError, "Unable to get feature template. Feature name cannot be null or undefined.");
    if (!i.isAllowedForFeatureDefinition(t4)) throw new d(d.InvalidFeatureExtensionParameterError, `Unable to get feature template. Component of type ${A.getComponentName(t4)} is not allowed for feature definition.`);
    let o3 = A.getClassInheritanceChain(t4).filter((E3) => E3 !== O && E3 !== K && E3 !== D).map((E3) => `${E3.name}.${e}`), s4 = /* @__PURE__ */ new Map(), a4 = /* @__PURE__ */ new Set(), c3 = /* @__PURE__ */ new Map(), l5 = /* @__PURE__ */ new Map(), f4 = p((E3) => {
      let y2 = c3.get(E3);
      return y2 === void 0 && (y2 = A.getComponentName(E3), c3.set(E3, y2)), y2;
    }, "getNameCached"), g5 = p((E3) => {
      let y2 = l5.get(E3);
      return y2 || (y2 = new M(E3), l5.set(E3, y2)), y2;
    }, "getDependencyCached"), v6 = new Set(A.getClassInheritanceChain(t4).filter((E3) => E3 !== O && E3 !== K && E3 !== D)), L2 = p((E3) => {
      if (v6.has(E3)) return false;
      let y2 = _a33.getAncestors(E3);
      if (!y2) return false;
      for (let V2 of v6) if (y2.has(V2)) return true;
      return false;
    }, "isSiblingOrUnrelatedDescendant"), ce = t4 instanceof D, ye = p((E3) => !ce || v6.has(E3) || typeof E3 != "function" ? false : E3.prototype instanceof D || E3 === D, "isForeignEntityClass"), B3 = [];
    for (let [E3, y2] of n6._metaStorage) if (r8.has(E3) && (i.isComponentMetaInstance(y2) || i.isContainerMetaInstance(y2))) {
      if (L2(E3) || ye(E3)) continue;
      B3.push([E3, y2]);
    }
    let Z2 = [];
    for (let E3 of o3) for (let [y2, V2] of B3) {
      a4.has(y2) || (a4.add(y2), Z2.push(y2));
      let ie = V2.extensions(E3), Te = _a33.getAncestors(y2);
      for (let pe = 0; pe < ie.length; pe++) {
        let U = ie[pe], Ce;
        for (let W2 = Z2.length - 1; W2 >= 0; W2--) {
          let ae2 = Z2[W2];
          if (ae2 === y2) continue;
          if (Te ? Te.has(ae2) : _a33.isIndexedInheritedFrom(y2, ae2)) {
            Ce = ae2;
            break;
          }
        }
        if (Ce && s4.delete(`${f4(Ce)}.${U.handler}`), U.override) {
          let W2 = n6._overrideRegexpCache.get(U.override);
          W2 || (W2 = new RegExp(U.override), n6._overrideRegexpCache.set(U.override, W2));
          for (let [ae2, At] of s4) (W2.test(ae2) || W2.test(At.handler)) && s4.delete(ae2);
        }
        s4.set(`${f4(y2)}.${U.handler}`, { dependency: g5(y2), ...U });
      }
    }
    return n6.filterToMostDerived(r8, Array.from(s4.values()));
  }
  filterToMostDerived(e, t4) {
    if (t4.length <= 1) return t4;
    let r8 = /* @__PURE__ */ new Map(), n6 = /* @__PURE__ */ new Set();
    for (let a4 of t4) {
      let c3 = a4.dependency.name;
      r8.has(c3) || r8.set(c3, e.resolveConstructor(c3)), n6.add(c3);
    }
    let o3 = /* @__PURE__ */ new Set(), s4 = /* @__PURE__ */ new Map();
    for (let [a4, c3] of r8) c3 && s4.set(c3, a4);
    for (let [a4, c3] of r8) {
      if (!c3) continue;
      let l5 = _a33.getAncestors(c3);
      if (l5) for (let f4 of l5) {
        let g5 = s4.get(f4);
        g5 && g5 !== a4 && n6.has(g5) && o3.add(g5);
      }
    }
    return t4.filter((a4) => !o3.has(a4.dependency.name));
  }
  static featureDefinition(e, t4) {
    let r8;
    if (!e) throw new d(d.InvalidFeatureTemplateParameterError, "Unable to get feature template. Feature name cannot be null or undefined.");
    if (!t4) throw new d(d.InvalidFeatureTemplateParameterError, "Unable to get feature template. Component cannot be null or undefined.");
    switch (true) {
      case t4 instanceof D:
        r8 = "a-component-features";
        break;
      case t4 instanceof K:
        r8 = "a-container-features";
        break;
      case t4 instanceof O:
        r8 = "a-component-features";
        break;
      default:
        throw new d(d.InvalidFeatureTemplateParameterError, `A-Feature cannot be defined on the ${t4} level`);
    }
    return [...this.meta(t4)?.get(r8)?.get(e)?.template || []];
  }
  static abstractionTemplate(e, t4) {
    let r8 = A.getComponentName(t4);
    if (!t4) throw new d(d.InvalidAbstractionTemplateParameterError, "Unable to get feature template. Component cannot be null or undefined.");
    if (!e) throw new d(d.InvalidAbstractionTemplateParameterError, "Unable to get feature template. Abstraction stage cannot be null or undefined.");
    if (!i.isAllowedForAbstractionDefinition(t4)) throw new d(d.InvalidAbstractionTemplateParameterError, `Unable to get feature template. Component of type ${r8} is not allowed for feature definition.`);
    return [...this.abstractionExtensions(e, t4)];
  }
  static abstractionExtensions(e, t4) {
    let r8 = this.getInstance(), n6 = A.getComponentName(t4);
    if (!t4) throw new d(d.InvalidAbstractionExtensionParameterError, "Unable to get feature template. Component cannot be null or undefined.");
    if (!e) throw new d(d.InvalidAbstractionExtensionParameterError, "Unable to get feature template. Abstraction stage cannot be null or undefined.");
    if (!i.isAllowedForAbstractionDefinition(t4)) throw new d(d.InvalidAbstractionExtensionParameterError, `Unable to get feature template. Component of type ${n6} is not allowed for feature definition.`);
    let o3 = /* @__PURE__ */ new Map(), s4 = this.scope(t4), a4 = /* @__PURE__ */ new Set();
    for (let [c3, l5] of r8._metaStorage) s4.has(c3) && (i.isComponentMetaInstance(l5) || i.isContainerMetaInstance(l5)) && (a4.add(c3), l5.abstractions(e).forEach((f4) => {
      let g5 = Array.from(a4).reverse().find((v6) => _a33.isIndexedInheritedFrom(c3, v6) && v6 !== c3);
      g5 && o3.delete(`${A.getComponentName(g5)}.${f4.handler}`), o3.set(`${A.getComponentName(c3)}.${f4.handler}`, { dependency: new M(c3), ...f4 });
    }));
    return r8.filterToMostDerived(s4, Array.from(o3.values()));
  }
  static reset() {
    let e = _a33.getInstance();
    e._registry = /* @__PURE__ */ new WeakMap(), e._featureCache = /* @__PURE__ */ new WeakMap(), e._scopeStorage = /* @__PURE__ */ new WeakMap(), e._ancestors.clear(), e._descendants.clear(), e._containers.clear(), e._metaVersion++;
    let t4 = String(J.A_CONCEPT_ROOT_SCOPE) || "root";
    e._root = new R({ name: t4 });
  }
  static indexConstructor(e) {
    let t4 = this.getInstance();
    if (t4._ancestors.has(e)) return;
    let r8 = /* @__PURE__ */ new Set(), n6 = Object.getPrototypeOf(e);
    for (; n6 && n6 !== Function.prototype && n6 !== Object; ) {
      r8.add(n6);
      let o3 = t4._descendants.get(n6);
      o3 || (o3 = /* @__PURE__ */ new Set(), t4._descendants.set(n6, o3)), o3.add(e);
      let s4 = t4._ancestors.get(n6);
      if (s4) {
        for (let a4 of s4) {
          r8.add(a4);
          let c3 = t4._descendants.get(a4);
          c3 || (c3 = /* @__PURE__ */ new Set(), t4._descendants.set(a4, c3)), c3.add(e);
        }
        break;
      }
      n6 = Object.getPrototypeOf(n6);
    }
    t4._ancestors.set(e, r8), t4._descendants.has(e) || t4._descendants.set(e, /* @__PURE__ */ new Set());
  }
  static isIndexedInheritedFrom(e, t4) {
    if (e === t4) return true;
    let n6 = this.getInstance()._ancestors.get(e);
    return n6 ? n6.has(t4) : A.isInheritedFrom(e, t4);
  }
  static findDescendantIn(e, t4) {
    let r8 = t4 instanceof Set ? t4.size : t4.length;
    if (t4 instanceof Set) {
      if (t4.has(e)) return e;
    } else if (t4.includes(e)) return e;
    let n6 = this.getInstance(), o3 = n6._descendants.get(e), s4 = o3 ? o3.size : 0;
    if (s4 === 0) {
      if (t4 instanceof Set) for (let a4 of t4) {
        let c3 = n6._ancestors.get(a4);
        if (c3 && c3.has(e)) return a4;
      }
      else for (let a4 of t4) {
        let c3 = n6._ancestors.get(a4);
        if (c3 && c3.has(e)) return a4;
      }
      return;
    }
    if (r8 <= s4) if (t4 instanceof Set) for (let a4 of t4) {
      if (a4 === e) return a4;
      let c3 = n6._ancestors.get(a4);
      if (c3 && c3.has(e)) return a4;
    }
    else for (let a4 of t4) {
      if (a4 === e) return a4;
      let c3 = n6._ancestors.get(a4);
      if (c3 && c3.has(e)) return a4;
    }
    else for (let a4 of o3) if (t4 instanceof Set) {
      if (t4.has(a4)) return a4;
    } else if (t4.includes(a4)) return a4;
  }
  static getAncestors(e) {
    return this.getInstance()._ancestors.get(e);
  }
  static isAllowedForScopeAllocation(e) {
    return i.isContainerInstance(e) || i.isFeatureInstance(e) || i.isEntityInstance(e);
  }
  static isAllowedToBeRegistered(e) {
    return i.isEntityInstance(e) || i.isComponentInstance(e) || i.isFragmentInstance(e) || i.isErrorInstance(e);
  }
  static isAllowedForMeta(e) {
    return i.isContainerInstance(e) || i.isComponentInstance(e) || i.isEntityInstance(e);
  }
  static isAllowedForMetaConstructor(e) {
    return i.isContainerConstructor(e) || i.isComponentConstructor(e) || i.isEntityConstructor(e);
  }
}, __name(_a33, "x"), _a33);
p(x, "A_Context"), x.FEATURE_EXTENSIONS_CACHE_MAX_SIZE = 1024;
var _ = x;
var _a34;
var ve = (_a34 = class extends b {
}, __name(_a34, "ve"), _a34);
p(ve, "A_AbstractionError"), ve.AbstractionExtensionError = "Unable to extend abstraction execution";
var oe = ve;
function at(u2, e = {}) {
  return function(t4, r8, n6) {
    let o3 = A.getComponentName(t4);
    if (!u2) throw new oe(oe.AbstractionExtensionError, `Abstraction name must be provided to extend abstraction for '${o3}'.`);
    if (!i.isConstructorAvailableForAbstraction(t4)) throw new oe(oe.AbstractionExtensionError, `Unable to extend Abstraction '${u2}' for '${o3}'. Only A-Containers and A-Components can extend Abstractions.`);
    let s4, a4 = _.meta(t4);
    switch (true) {
      case (i.isContainerConstructor(t4) || i.isContainerInstance(t4)):
        s4 = "a-container-abstractions";
        break;
      case (i.isComponentConstructor(t4) || i.isComponentInstance(t4)):
        s4 = "a-component-abstractions";
        break;
    }
    let c3 = `CONCEPT_ABSTRACTION::${u2}`, l5 = a4.get(s4) ? new m().from(a4.get(s4)) : new m(), f4 = [...l5.get(c3) || []], g5 = f4.findIndex((L2) => L2.handler === r8), v6 = { name: c3, handler: r8, behavior: e.behavior || "sync", throwOnError: e.throwOnError !== void 0 ? e.throwOnError : true, before: i.isArray(e.before) ? new RegExp(`^${e.before.join("|").replace(/\./g, "\\.")}$`).source : e.before instanceof RegExp ? e.before.source : "", after: i.isArray(e.after) ? new RegExp(`^${e.after.join("|").replace(/\./g, "\\.")}$`).source : e.after instanceof RegExp ? e.after.source : "", override: i.isArray(e.override) ? new RegExp(`^${e.override.join("|").replace(/\./g, "\\.")}$`).source : e.override instanceof RegExp ? e.override.source : "" };
    g5 !== -1 ? f4[g5] = v6 : f4.push(v6), l5.set(c3, f4), _.meta(t4).set(s4, l5);
  };
}
__name(at, "at");
p(at, "A_Abstraction_Extend");
var _a35;
var _t = (_a35 = class {
  constructor(e) {
    this._featuresMap = /* @__PURE__ */ new Map();
    this._index = 0;
    this._name = e.name, e.containers.map((t4) => {
      let r8 = _.abstractionTemplate(this._name, t4), n6 = new N({ name: this._name, component: t4, template: r8 });
      return this._featuresMap.set(t4, n6), n6;
    }), this._current = this._featuresMap.values().next().value;
  }
  static get Extend() {
    return at;
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
    return { next: p(() => this.isDone ? (this._current = void 0, { value: void 0, done: true }) : (this._current = Array.from(this._featuresMap.values())[this._index], { value: this._current, done: false }), "next") };
  }
  next(e) {
    if (this._index >= this._featuresMap.size) return;
    let t4 = Array.from(this._featuresMap.values()).indexOf(e);
    this._index = t4 + 1;
  }
  async process(e) {
    if (!this.isDone) for (let [t4, r8] of this._featuresMap.entries()) await r8.process(e || t4.scope);
  }
}, __name(_a35, "_t"), _a35);
p(_t, "A_Abstraction");
var F = _t;
var It = ((c3) => (c3.Run = "run", c3.Build = "build", c3.Publish = "publish", c3.Deploy = "deploy", c3.Load = "load", c3.Start = "start", c3.Stop = "stop", c3.Debug = "debug", c3))(It || {});
var bt = ((e) => (e.LIFECYCLE = "a-component-extensions", e))(bt || {});
var _a36;
var pt = (_a36 = class {
  constructor(e) {
    this.props = e;
    this._name = e.name || _.root.name, e.components && e.components.length && e.components.forEach((t4) => this.scope.register(t4)), e.fragments && e.fragments.length && e.fragments.forEach((t4) => this.scope.register(t4)), e.entities && e.entities.length && e.entities.forEach((t4) => this.scope.register(t4)), this._containers = e.containers || [];
  }
  static Load(e) {
    return F.Extend("load", e);
  }
  static Publish(e) {
    return F.Extend("publish");
  }
  static Deploy(e) {
    return F.Extend("deploy", e);
  }
  static Build(e) {
    return F.Extend("build", e);
  }
  static Run(e) {
    return F.Extend("run", e);
  }
  static Start(e) {
    return F.Extend("start", e);
  }
  static Stop(e) {
    return F.Extend("stop", e);
  }
  static Debug(e) {
    return F.Extend("debug", e);
  }
  get name() {
    return _.root.name;
  }
  get scope() {
    return _.root;
  }
  get register() {
    return this.scope.register.bind(this.scope);
  }
  get resolve() {
    return this.scope.resolve.bind(this.scope);
  }
  async load(e) {
    await new F({ name: "load", containers: this._containers }).process(e);
  }
  async run(e) {
    await new F({ name: "run", containers: this._containers }).process(e);
  }
  async start(e) {
    await new F({ name: "start", containers: this._containers }).process(e);
  }
  async stop(e) {
    await new F({ name: "stop", containers: this._containers }).process(e);
  }
  async build(e) {
    await new F({ name: "build", containers: this._containers }).process(e);
  }
  async deploy(e) {
    await new F({ name: "deploy", containers: this._containers }).process(e);
  }
  async publish(e) {
    await new F({ name: "publish", containers: this._containers }).process(e);
  }
  async debug(e) {
    await new F({ name: "debug", containers: this._containers }).process(e);
  }
  async call(e, t4) {
    return await new N({ name: e, component: t4 }).process();
  }
}, __name(_a36, "pt"), _a36);
p(pt, "A_Concept");
var ct = pt;
var _a37;
var dt = (_a37 = class extends m {
  constructor(t4) {
    super();
    this.containers = t4;
  }
}, __name(_a37, "dt"), _a37);
p(dt, "A_ConceptMeta");
var _a38;
var ge = (_a38 = class extends b {
}, __name(_a38, "ge"), _a38);
p(ge, "A_InjectError"), ge.InvalidInjectionTarget = "Invalid target for A-Inject decorator", ge.MissingInjectionTarget = "Missing target for A-Inject decorator";
var se = ge;
function Yt(u2, e) {
  if (!u2) throw new se(se.MissingInjectionTarget, "A-Inject decorator is missing the target to inject");
  return function(t4, r8, n6) {
    let o3 = A.getComponentName(t4);
    if (!i.isTargetAvailableForInjection(t4)) throw new se(se.InvalidInjectionTarget, `A-Inject cannot be used on the target of type ${typeof t4} (${o3})`);
    let s4 = r8 ? String(r8) : "constructor", a4;
    switch (true) {
      case (i.isComponentConstructor(t4) || i.isComponentInstance(t4)):
        a4 = "a-component-injections";
        break;
      case i.isContainerInstance(t4):
        a4 = "a-container-injections";
        break;
      case i.isEntityInstance(t4):
        a4 = "a-component-injections";
        break;
    }
    let c3 = _.meta(t4).get(a4), l5 = c3 ? c3.clone() : new m(), f4 = l5.get(s4) ? [...l5.get(s4)] : [];
    f4[n6] = u2 instanceof M ? u2 : new M(u2, e), l5.set(s4, f4), _.meta(t4).set(a4, l5);
  };
}
__name(Yt, "Yt");
p(Yt, "A_Inject");

// node_modules/@adaas/a-utils/dist/browser/chunk-EQQGB2QZ.mjs
var __defProp2 = Object.defineProperty;
var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
var __decorateClass2 = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc2(target, key) : target;
  for (var i6 = decorators.length - 1, decorator; i6 >= 0; i6--)
    if (decorator = decorators[i6])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp2(target, key, result);
  return result;
}, "__decorateClass");
var __decorateParam2 = /* @__PURE__ */ __name((index, decorator) => (target, key) => decorator(target, key, index), "__decorateParam");

// node_modules/@adaas/a-frame/dist/browser/chunk-VBGV4GJ5.mjs
var t = "0.1.16";

// node_modules/@adaas/a-frame/dist/browser/chunk-IKIN4MJV.mjs
var h2 = Object.defineProperty;
var i2 = Object.getOwnPropertyDescriptor;
var j2 = /* @__PURE__ */ __name((c3, a4) => h2(c3, "name", { value: a4, configurable: true }), "j");
var k2 = /* @__PURE__ */ __name((c3, a4, e, d4) => {
  for (var b3 = d4 > 1 ? void 0 : d4 ? i2(a4, e) : a4, f4 = c3.length - 1, g5; f4 >= 0; f4--) (g5 = c3[f4]) && (b3 = (d4 ? g5(a4, e, b3) : g5(b3)) || b3);
  return d4 && b3 && h2(a4, e, b3), b3;
}, "k");
var l = /* @__PURE__ */ __name((c3, a4) => (e, d4) => a4(e, d4, c3), "l");

// node_modules/@adaas/a-frame/dist/browser/chunk-6K7VISNV.mjs
var _a39;
var _2 = (_a39 = class extends H {
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
}, __name(_a39, "_"), _a39);
j2(_2, "A_FrameEnv");
var R2 = _2;

// node_modules/@adaas/a-frame/dist/browser/chunk-HPVKDLXO.mjs
var t2 = { Load: "_A_FRAME_CREDENTIALS_LOAD", Save: "_A_FRAME_CREDENTIALS_SAVE", Destroy: "_A_FRAME_CREDENTIALS_DESTROY" };
var _a40;
var r = (_a40 = class extends D {
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
}, __name(_a40, "r"), _a40);
j2(r, "A_FrameCredentials");
var n = r;

// node_modules/@adaas/a-frame/dist/browser/chunk-7SACDPQD.mjs
var _a41;
var r2 = (_a41 = class extends O {
  static getSubtle() {
    return globalThis.crypto.subtle;
  }
  static bytes(t4) {
    return t4.buffer instanceof ArrayBuffer ? t4 : new Uint8Array(t4);
  }
  static async importKey(t4) {
    let e = _a41.base64ToBytes(t4);
    return _a41.getSubtle().importKey("raw", e.buffer, { name: "AES-GCM", length: 256 }, false, ["encrypt", "decrypt"]);
  }
  static async encryptBytes(t4, e) {
    let n6 = await _a41.importKey(e), s4 = new Uint8Array(12);
    globalThis.crypto.getRandomValues(s4);
    let i6 = new Uint8Array(await _a41.getSubtle().encrypt({ name: "AES-GCM", iv: s4, tagLength: 128 }, n6, _a41.bytes(t4))), a4 = i6.slice(0, i6.length - 16), c3 = i6.slice(i6.length - 16), o3 = new Uint8Array(28 + a4.length);
    return o3.set(s4, 0), o3.set(c3, 12), o3.set(a4, 28), o3;
  }
  static async encrypt(t4, e) {
    let n6 = new TextEncoder().encode(t4), s4 = await _a41.encryptBytes(n6, e);
    return _a41.bytesToBase64(s4);
  }
  static async decryptBytes(t4, e) {
    if (t4.length < 28) throw new Error("Payload too short to decrypt");
    let n6 = await _a41.importKey(e), s4 = t4.slice(0, 12), i6 = t4.slice(12, 28), a4 = t4.slice(28), c3 = new Uint8Array(a4.length + 16);
    c3.set(a4, 0), c3.set(i6, a4.length);
    let o3 = await _a41.getSubtle().decrypt({ name: "AES-GCM", iv: _a41.bytes(s4), tagLength: 128 }, n6, c3);
    return new Uint8Array(o3);
  }
  static async decrypt(t4, e) {
    let n6 = _a41.base64ToBytes(t4), s4 = await _a41.decryptBytes(n6, e);
    return new TextDecoder().decode(s4);
  }
  static async sha256hex(t4) {
    let e = new TextEncoder().encode(t4), n6 = await _a41.getSubtle().digest("SHA-256", e);
    return _a41.bytesToHex(new Uint8Array(n6));
  }
  static bytesToBase64(t4) {
    let e = "";
    for (let n6 of t4) e += String.fromCharCode(n6);
    return btoa(e);
  }
  static base64ToBytes(t4) {
    let e = atob(t4), n6 = new Uint8Array(e.length);
    for (let s4 = 0; s4 < e.length; s4++) n6[s4] = e.charCodeAt(s4);
    return n6;
  }
  static bytesToHex(t4) {
    return Array.from(t4).map((e) => e.toString(16).padStart(2, "0")).join("");
  }
}, __name(_a41, "r"), _a41);
j2(r2, "A_FrameCrypto");
var g = r2;

// node_modules/@adaas/a-frame/dist/browser/chunk-XJFUXWMT.mjs
var s = { debug: 10, info: 20, success: 20, warn: 30, error: 40 };
var p2 = { debug: "\xB7", info: "\u2139", success: "\u2714", warn: "\u26A0", error: "\u2716" };
var u = { reset: "\x1B[0m", bold: "\x1B[1m", dim: "\x1B[2m", gray: "\x1B[90m", red: "\x1B[31m", green: "\x1B[32m", yellow: "\x1B[33m", blue: "\x1B[34m", cyan: "\x1B[36m" };
var L = { debug: "color: #888;", info: "color: #06b;", success: "color: #2a7; font-weight: bold;", warn: "color: #c80;", error: "color: #c33; font-weight: bold;" };
var m2 = { progressBarWidth: 24, summaryTitle: "Summary", progressThrottleMs: 250 };
var _a42;
var i3 = (_a42 = class extends O {
  constructor(e = {}) {
    super();
    this.counters = /* @__PURE__ */ new Map();
    this.startTime = Date.now();
    this.level = e.level ?? "debug", this.prefix = e.prefix ?? "";
  }
  style(e, ...r8) {
    return e;
  }
  print(e = "") {
    console.log(e);
  }
  prompt(e) {
    console.log(e);
  }
  setLevel(e) {
    this.level = e;
  }
  shouldEmit(e) {
    return s[e] >= s[this.level];
  }
  emit(e, r8, t4) {
    this.shouldEmit(e) && this.write({ level: e, message: this.prefix ? `${this.prefix} ${r8}` : r8, timestamp: Date.now(), metadata: t4 });
  }
  debug(e, r8) {
    this.emit("debug", e, r8);
  }
  info(e, r8) {
    this.emit("info", e, r8);
  }
  success(e, r8) {
    this.emit("success", e, r8);
  }
  warn(e, r8) {
    this.emit("warn", e, r8);
  }
  error(e, r8) {
    this.emit("error", e, r8);
  }
  section(e) {
    this.info(`\u2500\u2500 ${e} \u2500\u2500`);
  }
  divider() {
    this.info("\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500");
  }
  increment(e, r8 = 1) {
    this.counters.set(e, (this.counters.get(e) ?? 0) + r8);
  }
  set(e, r8) {
    this.counters.set(e, r8);
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
    let r8 = e / 1e3;
    if (r8 < 60) return `${r8.toFixed(2)}s`;
    let t4 = Math.floor(r8 / 60);
    return `${t4}m ${(r8 - t4 * 60).toFixed(1)}s`;
  }
  summary(e = m2.summaryTitle) {
    this.section(e);
    let r8 = [...this.counters.keys()], t4 = r8.reduce((o3, g5) => Math.max(o3, g5.length), 7);
    for (let o3 of r8) this.info(`  ${o3.padEnd(t4)}  ${this.counters.get(o3)}`);
    this.info(`  ${"elapsed".padEnd(t4)}  ${this.elapsed()}`), this.divider();
  }
}, __name(_a42, "i"), _a42);
j2(i3, "A_FrameLoggerBase");
var c = i3;

// node_modules/@adaas/a-frame/dist/browser/chunk-CMS3MVT4.mjs
var _a43;
var t3 = (_a43 = class extends H {
  constructor(e) {
    if (super({ name: "a-frame-file-store" }), !e || typeof e.filePath != "string" || e.filePath.length === 0) throw new Error("A_FrameFileStore requires `filePath` (non-empty string) \u2014 omit the fragment entirely to fall back to A_FRAME_STORAGE_DIR.");
    this.filePath = e.filePath;
  }
}, __name(_a43, "t"), _a43);
j2(t3, "A_FrameFileStore");
var a = t3;

// node_modules/@adaas/a-frame/dist/browser/chunk-ZMUIUXMW.mjs
var _a44;
var i4 = (_a44 = class {
  static fnv1a(g5) {
    let t4 = 2166136261;
    for (let n6 = 0; n6 < g5.length; n6++) t4 ^= g5.charCodeAt(n6), t4 = t4 * 16777619 >>> 0;
    return t4.toString(16).padStart(8, "0");
  }
}, __name(_a44, "i"), _a44);
j2(i4, "A_FrameHashHelper");
var r3 = i4;

// node_modules/@adaas/a-frame/dist/browser/chunk-N6D4AAGZ.mjs
var _a45;
var n2 = (_a45 = class extends D {
  static get concept() {
    return "a-frame";
  }
  constructor(t4) {
    super(), this.values = t4 instanceof Float32Array ? t4 : new Float32Array(t4);
  }
  get dimensions() {
    return this.values.length;
  }
  get length() {
    return this.values.length;
  }
  isEqualTo(t4) {
    if (this.length !== t4.length) return false;
    for (let e = 0; e < this.length; e++) if (this.values[e] !== t4.values[e]) return false;
    return true;
  }
  magnitude() {
    let t4 = 0;
    for (let e = 0; e < this.values.length; e++) t4 += this.values[e] ** 2;
    return Math.sqrt(t4);
  }
  normalize() {
    let t4 = this.magnitude();
    if (t4 === 0) return this;
    let e = new Float32Array(this.length);
    for (let r8 = 0; r8 < this.length; r8++) e[r8] = this.values[r8] / t4;
    return new _a45(e);
  }
  dot(t4) {
    this.assertSameLength(t4);
    let e = 0;
    for (let r8 = 0; r8 < this.length; r8++) e += this.values[r8] * t4.values[r8];
    return e;
  }
  cosineSimilarity(t4) {
    let e = this.magnitude(), r8 = t4.magnitude();
    return e === 0 || r8 === 0 ? 0 : this.normalize().dot(t4.normalize());
  }
  assertSameLength(t4) {
    if (this.length !== t4.length) throw new Error(`Embedding dimension mismatch: ${this.length} vs ${t4.length}`);
  }
  toArray() {
    return Array.from(this.values);
  }
}, __name(_a45, "n"), _a45);
j2(n2, "A_FrameVector");
var i5 = n2;

// node_modules/@adaas/a-frame/dist/browser/chunk-IOR4CVQW.mjs
var a2 = { ANTARES: "adaas-antares-v1", VEGA: "adaas-vega-v1", RIGEL: "adaas-rigel-v1", RIGEL_SMALL: "adaas-rigel-small-v1", PULSAR: "adaas-pulsar-v1", LYRA: "adaas-lyra-v1", NOVA: "adaas-nova-v1" };

// node_modules/@adaas/a-frame/dist/browser/chunk-AOPOEK3V.mjs
var C2 = "default";
var m3 = { Load: "_A_FRAME_NAMESPACE_LOAD", Save: "_A_FRAME_NAMESPACE_SAVE", Embed: "_A_FRAME_NAMESPACE_EMBED", Destroy: "_A_FRAME_NAMESPACE_DESTROY" };
var V = { debug: u.gray, info: u.cyan, success: u.green, warn: u.yellow, error: u.red };
var _a46;
var f = (_a46 = class extends c {
  constructor(e = {}) {
    super(e), this.useColor = e.color ?? !!(process.stdout && process.stdout.isTTY);
  }
  c(e, r8) {
    return this.useColor ? `${e}${r8}${u.reset}` : r8;
  }
  ansi(e) {
    if (!this.useColor) return "";
    switch (e) {
      case "reset":
        return u.reset;
      case "bold":
        return u.bold;
      case "dim":
        return u.dim;
      case "gray":
        return u.gray;
      case "red":
        return u.red;
      case "green":
        return u.green;
      case "yellow":
        return u.yellow;
      case "blue":
        return u.blue;
      case "cyan":
        return u.cyan;
      case "magenta":
        return "\x1B[35m";
      case "bcyan":
        return "\x1B[96m";
      default:
        return "";
    }
  }
  style(e, ...r8) {
    if (!this.useColor || r8.length === 0) return e;
    let s4 = r8.map((a4) => this.ansi(a4)).join("");
    return s4 ? `${s4}${e}${u.reset}` : e;
  }
  print(e = "") {
    process.stdout.write(e + `
`);
  }
  prompt(e) {
    process.stdout.write(e);
  }
  write(e) {
    let s4 = `${this.c(V[e.level], p2[e.level])} ${e.message}`;
    e.level === "error" ? console.error(s4) : e.level === "warn" ? console.warn(s4) : console.log(s4), e.metadata && Object.keys(e.metadata).length > 0 && console.log(this.c(u.gray, `   ${JSON.stringify(e.metadata)}`));
  }
  section(e) {
    let r8 = "\u2500".repeat(Math.max(2, 60 - e.length - 4)), s4 = `\u2504 ${e} ${r8}`;
    console.log(`
` + this.c(u.bold + u.cyan, s4));
  }
  divider() {
    console.log(this.c(u.gray, "\u2500".repeat(60)));
  }
  summary(e = m2.summaryTitle) {
    this.section(e);
    let r8 = [...this.counters.keys()], s4 = r8.reduce((a4, l5) => Math.max(a4, l5.length), 7);
    for (let a4 of r8) console.log(`  ${this.c(u.gray, a4.padEnd(s4))}  ${this.c(u.bold, String(this.counters.get(a4)))}`);
    console.log(`  ${this.c(u.gray, "elapsed".padEnd(s4))}  ${this.c(u.bold, this.elapsed())}`), this.divider();
  }
  progress(e, r8) {
    let s4 = this.useColor, a$1 = m2.progressBarWidth, l5 = Date.now(), o3 = 0, d$1 = "", c3 = j2((i6) => {
      if (r8 === 0) {
        i6 === "done" && console.log(`${this.c(u.green, "\u2714")} ${e} (0/0)`);
        return;
      }
      let h6 = Math.min(1, o3 / r8), S4 = Math.round(h6 * a$1);
      if (s4) {
        let p5 = this.c(u.green, "\u2588".repeat(S4)) + this.c(u.gray, "\u2591".repeat(a$1 - S4)), N3 = i6 === "done" ? this.c(u.green, "\u2714") : i6 === "fail" ? this.c(u.red, "\u2716") : this.c(u.cyan, "\u27F3"), L2 = d$1 ? this.c(u.dim, ` \u2014 ${d$1}`) : "";
        process.stdout.write(`\r\x1B[2K${N3} ${e} ${p5} ${o3}/${r8} (${(h6 * 100).toFixed(0)}%)${L2}`), i6 && process.stdout.write(`
`);
      } else if (i6 === "done") console.log(`[${e}] done ${o3}/${r8} in ${((Date.now() - l5) / 1e3).toFixed(2)}s`);
      else if (i6 === "fail") console.log(`[${e}] FAILED at ${o3}/${r8}`);
      else {
        let p5 = Math.max(1, Math.floor(r8 / 10));
        (o3 === r8 || o3 % p5 === 0) && console.log(`[${e}] ${o3}/${r8}${d$1 ? ` \u2014 ${d$1}` : ""}`);
      }
    }, "render");
    return c3(), { tick: j2((i6) => {
      o3 = Math.min(r8, o3 + 1), i6 && (d$1 = i6), c3();
    }, "tick"), succeed: j2((i6) => {
      i6 && (d$1 = i6), o3 = r8, c3("done");
    }, "succeed"), fail: j2((i6) => {
      i6 && (d$1 = i6), c3("fail");
    }, "fail"), update: j2((i6, h6) => {
      o3 = Math.min(r8, Math.max(0, i6)), h6 && (d$1 = h6), c3();
    }, "update") };
  }
}, __name(_a46, "f"), _a46);
j2(f, "A_FrameLogger");
var _3 = f;
var _a47;
var v = (_a47 = class extends D {
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
    return this.call(m3.Save, e);
  }
  destroy(e) {
    return this.call(m3.Destroy, e);
  }
  async load(e) {
    return this.call(m3.Load, e);
  }
  async saveTo(e) {
    let r8 = new a({ filePath: e }), s4 = new R({ name: `${this.aseid.id}-save-to`, fragments: [r8] }).inherit(_.scope(this));
    try {
      await this.call(m3.Save, s4);
    } finally {
      s4.destroy();
    }
  }
  async loadFrom(e) {
    let r8 = new a({ filePath: e }), s4 = new R({ name: `${this.aseid.id}-load-from`, fragments: [r8] }).inherit(_.scope(this));
    try {
      await this.call(m3.Load, s4);
    } finally {
      s4.destroy();
    }
  }
  update(e) {
    e.name && (this._name = e.name), e.description !== void 0 && (this._description = e.description), e.metadata !== void 0 && (this._metadata = e.metadata);
  }
  embed(e) {
    return _.scope(this).resolve(_3)?.debug(`Embedding namespace "${this._name}"...`), this.call(m3.Embed, e);
  }
  fromNew(e) {
    this.aseid = this.generateASEID({ id: P.toKebabCase(e.name), scope: "a-frame" }), this._name = e.name;
    let r8 = this._name + (e.description || "") + (e.metadata ? JSON.stringify(e.metadata) : "");
    this._hash = r3.fnv1a(r8), this._description = e.description, this._metadata = e.metadata, this._requestedModel = e.model ?? a2.ANTARES;
  }
  fromJSON(e) {
    this._name = e.name, this._hash = e.hash, this._description = e.description, this._metadata = e.metadata, this._vector = e.embedding ? new i5(e.embedding) : void 0, this._embeddedAt = e.embeddedAt, this._embeddingModel = e.embeddingModel, this._credentialId = e.credentialId, this._aFrameVersion = e.aFrameVersion, this._aFrameServerVersion = e.aFrameServerVersion;
  }
  toJSON() {
    return { ...super.toJSON(), hash: this._hash, name: this._name, description: this._description, metadata: this._metadata, embedding: this._vector?.values, embeddedAt: this._embeddedAt ?? Date.now(), embeddingModel: this._embeddingModel, credentialId: this._credentialId, aFrameVersion: this._aFrameVersion, aFrameServerVersion: this._aFrameServerVersion };
  }
  hydrateFromRecord(e) {
    if (e.hash !== this._hash) throw new Error(`A_FrameNamespace.hydrateFromRecord: hash mismatch for "${this._name}" (expected ${this._hash}, got ${e.hash})`);
    this._vector = new i5(e.embedding), this._embeddedAt = e.embeddedAt;
  }
  hydrateFromEmbedding(e, r8) {
    this._vector = new i5(e), this._embeddedAt = Date.now(), r8 && (this._embeddingModel = r8.model, this._credentialId = r8.credentialId ?? void 0, this._aFrameVersion = r8.aFrameVersion, this._aFrameServerVersion = r8.aFrameServerVersion);
  }
  toString() {
    let e = [`// namespace: ${this._name}`];
    return this._description && e.push(`// ${this._description}`), e.join(`
`);
  }
}, __name(_a47, "v"), _a47);
j2(v, "A_FrameNamespace");
var w2 = v;

// node_modules/@adaas/a-frame/dist/browser/chunk-3MWPOKGL.mjs
var r4 = { Load: "_A_FRAME_DEFINITION_LOAD", Save: "_A_FRAME_DEFINITION_SAVE", Embed: "_A_FRAME_DEFINITION_EMBED", Destroy: "_A_FRAME_DEFINITION_DESTROY" };
var _a48;
var n3 = (_a48 = class extends D {
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
    return new M(this._dependency);
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
    return this.call(r4.Save, e);
  }
  destroy(e) {
    return this.call(r4.Destroy, e);
  }
  load(e) {
    return this.call(r4.Load, e);
  }
  async saveTo(e) {
    let t4 = new a({ filePath: e }), i6 = new R({ name: `${this.aseid.id}-save-to`, fragments: [t4] }).inherit(_.scope(this));
    try {
      await this.call(r4.Save, i6);
    } finally {
      i6.destroy();
    }
  }
  async loadFrom(e) {
    let t4 = new a({ filePath: e }), i6 = new R({ name: `${this.aseid.id}-load-from`, fragments: [t4] }).inherit(_.scope(this));
    try {
      await this.call(r4.Load, i6);
    } finally {
      i6.destroy();
    }
  }
  update(e) {
    e.source && (this._source = e.source), e.description !== void 0 && (this._description = e.description), e.metadata !== void 0 && (this._metadata = e.metadata), e.namespace !== void 0 && (this._namespace = e.namespace);
  }
  embed(e) {
    return this.call(r4.Embed, e);
  }
  fromNew(e) {
    this._type = e.type, this.aseid = this.generateASEID({ id: P.toKebabCase(e.dependency + "-" + e.name), scope: "a-frame" }), this._name = e.name;
    let t4 = this._name + "//" + (e.description || "") + "//" + (e.metadata ? JSON.stringify(e.metadata) : "") + "//" + e.source + "//Namespace: " + e.namespace.id;
    this._hash = r3.fnv1a(t4), this._source = e.source, this._description = e.description, this._namespace = e.namespace, this._metadata = e.metadata, this._dependency = e.dependency, this._requestedModel = e.model ?? a2.ANTARES;
  }
  fromJSON(e) {
    this._name = e.name, this._hash = e.hash, this._source = e.source || "", this._description = e.description, this._metadata = e.metadata, this._vector = e.embedding ? new i5(e.embedding) : void 0, this._date = e.date, this._model = e.model, this._credentialId = e.credentialId, this._aFrameVersion = e.aFrameVersion, this._aFrameServerVersion = e.aFrameServerVersion, this._aFrameMeta = e.aFrameMeta;
  }
  toJSON() {
    return { ...super.toJSON(), hash: this._hash, name: this._name, source: this._source, description: this._description, metadata: this._metadata, namespace: this._namespace.aseid.toString(), embedding: this._vector?.values, date: this._date ?? (/* @__PURE__ */ new Date()).toISOString(), model: this._model, credentialId: this._credentialId, aFrameVersion: this._aFrameVersion, aFrameServerVersion: this._aFrameServerVersion, aFrameMeta: this._aFrameMeta };
  }
  hydrateFromEmbedding(e, t4) {
    this._vector = new i5(e), this._date = (/* @__PURE__ */ new Date()).toISOString(), t4 && (this._model = t4.model, this._credentialId = t4.credentialId ?? void 0, this._aFrameVersion = t4.aFrameVersion, this._aFrameServerVersion = t4.aFrameServerVersion, t4.aFrameMeta && (this._aFrameMeta = t4.aFrameMeta));
  }
  toString() {
    let e = [];
    return e.push(`// ${this._name}`), this._description && e.push(`// ${this._description}`), e.push(this._source), e.join(`
`);
  }
}, __name(_a48, "n"), _a48);
j2(n3, "A_FrameDefinition");
var h3 = n3;

// node_modules/@adaas/a-frame/dist/browser/chunk-3ROGJ3YE.mjs
var _a49;
var z2 = (_a49 = class extends H {
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
    this._credentials = new n(o3.response);
  }
}, __name(_a49, "z"), _a49);
j2(z2, "A_FrameContext");
var v2 = z2;
var S2 = { SaveDefinitions: "_A_FRAME_STORAGE_SAVE", LoadDefinitions: "_A_FRAME_STORAGE_LOAD", DestroyDefinitions: "_A_FRAME_STORAGE_DESTROY", SaveNamespaces: "_A_FRAME_STORAGE_SAVE_NAMESPACES", LoadNamespaces: "_A_FRAME_STORAGE_LOAD_NAMESPACES", DestroyNamespaces: "_A_FRAME_STORAGE_DESTROY_NAMESPACES", SaveKnowledge: "_A_FRAME_STORAGE_SAVE_KNOWLEDGE", LoadKnowledge: "_A_FRAME_STORAGE_LOAD_KNOWLEDGE", DestroyKnowledge: "_A_FRAME_STORAGE_DESTROY_KNOWLEDGE" };
var _a50;
var T2 = (_a50 = class extends H {
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
}, __name(_a50, "T"), _a50);
j2(T2, "A_FrameStorageOperation");
var F2 = T2;
var _a51;
var w3 = (_a51 = class extends b {
}, __name(_a51, "w"), _a51);
j2(w3, "A_FrameStorageError"), w3.SaveDefinitionFailed = "SaveDefinitionFailed", w3.LoadDefinitionsFailed = "LoadDefinitionsFailed", w3.DestroyDefinitionsFailed = "DestroyDefinitionsFailed", w3.SaveNamespaceFailed = "SaveNamespaceFailed", w3.LoadNamespacesFailed = "LoadNamespacesFailed", w3.DestroyNamespacesFailed = "DestroyNamespacesFailed", w3.SaveKnowledgeFailed = "SaveKnowledgeFailed", w3.LoadKnowledgeFailed = "LoadKnowledgeFailed", w3.DestroyKnowledgeFailed = "DestroyKnowledgeFailed", w3.CorruptKnowledgeFile = "CorruptKnowledgeFile";
var A2 = w3;
var _a52;
var G2 = (_a52 = class extends O {
  _resolveFileStore(o3) {
    if (o3) return o3 instanceof a ? o3 : new a(o3);
  }
  _buildExecutionScope(o3, e, a4, r8) {
    let t4 = [e];
    return a4 && !_.has(a4) && t4.push(a4), new R({ name: o3, fragments: t4 }).inherit(r8 || _.scope(this));
  }
  async saveDefinitions(o3, e, a4) {
    let r8 = new F2({ records: o3 }), t4 = this._buildExecutionScope("A_FrameStorage.saveDefinitions", r8, this._resolveFileStore(e), a4);
    try {
      return await this.call(S2.SaveDefinitions, t4), r8;
    } catch {
      return r8.fail(new A2({ title: A2.SaveDefinitionFailed, description: "Failed to save definition records." })), r8;
    } finally {
      t4.destroy();
    }
  }
  async loadDefinitions(o3, e, a4, r8) {
    let t4 = new F2({ namespaceId: o3 }), i6 = this._buildExecutionScope("A_FrameStorage.loadDefinitions", t4, this._resolveFileStore(a4), r8);
    try {
      return await this.call(S2.LoadDefinitions, i6), t4;
    } catch {
      return t4.fail(new A2({ title: A2.LoadDefinitionsFailed, description: "Failed to load definition records." })), t4;
    } finally {
      i6.destroy();
    }
  }
  async destroyDefinitions(o3, e, a4, r8) {
    let t4 = new F2({ namespaceId: o3, definitionId: e }), i6 = this._buildExecutionScope("A_FrameStorage.destroyDefinitions", t4, this._resolveFileStore(a4), r8);
    try {
      return await this.call(S2.DestroyDefinitions, i6), t4;
    } catch {
      return t4.fail(new A2({ title: A2.DestroyDefinitionsFailed, description: "Failed to destroy definition records." })), t4;
    } finally {
      i6.destroy();
    }
  }
  async saveNamespaces(o3, e, a4) {
    let r8 = new F2({ records: o3 }), t4 = this._buildExecutionScope("A_FrameStorage.saveNamespaces", r8, this._resolveFileStore(e), a4);
    try {
      return await this.call(S2.SaveNamespaces, t4), r8;
    } catch {
      return r8.fail(new A2({ title: A2.SaveNamespaceFailed, description: "Failed to save namespace records." })), r8;
    } finally {
      t4.destroy();
    }
  }
  async loadNamespaces(o3, e, a4) {
    let r8 = new F2({ namespaces: o3 }), t4 = this._buildExecutionScope("A_FrameStorage.loadNamespaces", r8, this._resolveFileStore(e), a4);
    try {
      return await this.call(S2.LoadNamespaces, t4), r8;
    } catch {
      return r8.fail(new A2({ title: A2.LoadNamespacesFailed, description: "Failed to load namespace records." })), r8;
    } finally {
      t4.destroy();
    }
  }
  async destroyNamespaces(o3, e, a4) {
    let r8 = new F2({ namespaces: o3 }), t4 = this._buildExecutionScope("A_FrameStorage.destroyNamespaces", r8, this._resolveFileStore(e), a4);
    try {
      return await this.call(S2.DestroyNamespaces, t4), r8;
    } catch {
      return r8.fail(new A2({ title: A2.DestroyNamespacesFailed, description: "Failed to destroy namespace records." })), r8;
    } finally {
      t4.destroy();
    }
  }
  async saveKnowledge(o3, e, a4, r8) {
    let t4 = new F2({ id: o3, record: e }), i6 = this._buildExecutionScope("A_FrameStorage.saveKnowledge", t4, this._resolveFileStore(a4), r8);
    try {
      return await this.call(S2.SaveKnowledge, i6), t4;
    } catch {
      return t4.fail(new A2({ title: A2.SaveKnowledgeFailed, description: `Failed to save knowledge "${o3}".` })), t4;
    } finally {
      i6.destroy();
    }
  }
  async loadKnowledge(o3, e, a4) {
    let r8 = new F2({ id: o3 }), t4 = this._buildExecutionScope("A_FrameStorage.loadKnowledge", r8, this._resolveFileStore(e), a4);
    try {
      return await this.call(S2.LoadKnowledge, t4), r8;
    } catch {
      return r8.fail(new A2({ title: A2.LoadKnowledgeFailed, description: `Failed to load knowledge "${o3}".` })), r8;
    } finally {
      t4.destroy();
    }
  }
  async destroyKnowledge(o3, e, a4) {
    let r8 = new F2({ id: o3 }), t4 = this._buildExecutionScope("A_FrameStorage.destroyKnowledge", r8, this._resolveFileStore(e), a4);
    try {
      return await this.call(S2.DestroyKnowledge, t4), r8;
    } catch {
      return r8.fail(new A2({ title: A2.DestroyKnowledgeFailed, description: `Failed to destroy knowledge "${o3}".` })), r8;
    } finally {
      t4.destroy();
    }
  }
}, __name(_a52, "G"), _a52);
j2(G2, "A_FrameStorage");
var x2 = G2;
var _a53;
var K2 = (_a53 = class extends H {
  constructor() {
    if (_a53._instance) return _a53._instance;
    super({ name: "a-frame-browser-storage-blobs" });
    this.store = /* @__PURE__ */ new Map();
    this.namespaceBlob = null;
    this.plainStore = /* @__PURE__ */ new Map();
    this.plainNamespaceRecords = null;
    this.bundleMeta = null;
  }
  static get instance() {
    return _a53._instance || (_a53._instance = new _a53()), _a53._instance;
  }
  static fromBundle(e) {
    let a4 = _a53.instance;
    return a4.seedFromBundle(e), a4;
  }
  get hasBundleData() {
    return this.plainStore.size > 0 || (this.plainNamespaceRecords?.length ?? 0) > 0;
  }
  seedFromBundle(e) {
    for (let [a4, r8] of Object.entries(e.records ?? {})) this.plainStore.set(a4, r8.map((t4) => ({ ...t4, embedding: t4.embedding.length > 0 ? new Float32Array(t4.embedding) : void 0 })));
    e.namespaceRecords?.length && (this.plainNamespaceRecords = e.namespaceRecords.map((a4) => ({ ...a4, embedding: a4.embedding.length > 0 ? new Float32Array(a4.embedding) : void 0 }))), this.bundleMeta = { aFrameVersion: e.aFrameVersion, serverVersion: e.serverVersion, builtAt: e.builtAt };
  }
}, __name(_a53, "K"), _a53);
j2(K2, "A_FrameBrowserStorageBlobs");
var E = K2;
var C3 = new TextEncoder();
var P2 = new TextDecoder();
var _a54;
var b2 = (_a54 = class extends H {
  constructor() {
    super(...arguments);
    this.enc = new TextEncoder();
    this.dec = new TextDecoder();
    this.A_FRAME_FILE_MAGIC = 1162691147;
    this.A_FRAME_FILE_VERSION = 1;
    this.A_FRAME_KNOWLEDGE_VERSION = 16;
    this.A_FRAME_HEADER_SIZE = 20;
  }
  static get fileExtension() {
    return ".aframe";
  }
  static get definitionsFileExtension() {
    return ".d.aframe";
  }
  static get namespacesFileExtension() {
    return ".n.aframe";
  }
  static get knowledgeFileExtension() {
    return ".k.aframe";
  }
  getDefinitionsFileName(e) {
    return `${e}${_a54.definitionsFileExtension}`;
  }
  getNamespaceFileName() {
    return `${_a54.namespacesFileExtension}`;
  }
  getKnowledgeFileName(e) {
    return `${e}${_a54.knowledgeFileExtension}`;
  }
  static get definitionsFilePattern() {
    return `*${_a54.definitionsFileExtension}`;
  }
  static get knowledgeFilePattern() {
    return `*${_a54.knowledgeFileExtension}`;
  }
  encodePayload(e) {
    let a4 = [];
    if (e.some((n6) => !n6.embedding)) throw new Error("All records must have embeddings to be encoded");
    let r8 = new Uint8Array(this.A_FRAME_HEADER_SIZE), t4 = new DataView(r8.buffer);
    t4.setUint32(0, this.A_FRAME_FILE_MAGIC, true), r8[4] = this.A_FRAME_FILE_VERSION, t4.setUint32(5, e.length, true);
    let i6 = e[0]?.embedding.length ?? 0;
    t4.setUint16(9, i6, true), a4.push(r8);
    for (let n6 of e) {
      let _6 = C3.encode(n6.aseid.toString()), f4 = C3.encode(n6.name), M3 = JSON.stringify({ hash: n6.hash, source: n6.source, type: n6.type, description: n6.description, metadata: n6.metadata, namespace: n6.namespace, date: n6.date, model: n6.model, credentialId: n6.credentialId, aFrameVersion: n6.aFrameVersion, aFrameServerVersion: n6.aFrameServerVersion }), N3 = C3.encode(M3), L2 = 2 + _6.length + 2 + f4.length + n6.embedding.length * 4 + 4 + N3.length, g5 = new Uint8Array(L2), h6 = new DataView(g5.buffer), m7 = 0;
      h6.setUint16(m7, _6.length, true), m7 += 2, g5.set(_6, m7), m7 += _6.length, h6.setUint16(m7, f4.length, true), m7 += 2, g5.set(f4, m7), m7 += f4.length;
      for (let y2 = 0; y2 < n6.embedding.length; y2++) h6.setFloat32(m7, n6.embedding[y2], true), m7 += 4;
      h6.setUint32(m7, N3.length, true), m7 += 4, g5.set(N3, m7), a4.push(g5);
    }
    let c3 = a4.reduce((n6, _6) => n6 + _6.length, 0), p5 = new Uint8Array(c3), s4 = 0;
    for (let n6 of a4) p5.set(n6, s4), s4 += n6.length;
    return p5;
  }
  decodePayload(e) {
    if (e.length < this.A_FRAME_HEADER_SIZE) throw new Error("Corrupt index: too short for header");
    let a4 = new DataView(e.buffer, e.byteOffset, e.byteLength), r8 = a4.getUint32(0, true);
    if (r8 !== this.A_FRAME_FILE_MAGIC) throw new Error(`Corrupt index: bad magic 0x${r8.toString(16)}`);
    let t4 = e[4];
    if (t4 !== this.A_FRAME_FILE_VERSION) throw new Error(`Unsupported index version: ${t4}`);
    let i6 = a4.getUint32(5, true), c3 = a4.getUint16(9, true), p5 = [], s4 = this.A_FRAME_HEADER_SIZE;
    for (let n6 = 0; n6 < i6; n6++) {
      let _6 = a4.getUint16(s4, true);
      s4 += 2;
      let f4 = P2.decode(e.slice(s4, s4 + _6));
      s4 += _6;
      let M3 = a4.getUint16(s4, true);
      s4 += 2;
      let N3 = P2.decode(e.slice(s4, s4 + M3));
      s4 += M3;
      let L2 = new Float32Array(c3);
      for (let y2 = 0; y2 < c3; y2++) L2[y2] = a4.getFloat32(s4, true), s4 += 4;
      let g5 = a4.getUint32(s4, true);
      s4 += 4;
      let h6 = P2.decode(e.slice(s4, s4 + g5));
      s4 += g5;
      let m7 = JSON.parse(h6);
      p5.push({ aseid: f4, hash: m7.hash ?? f4, name: N3, type: m7.type, embedding: L2, source: m7.source, description: m7.description, metadata: m7.metadata, namespace: m7.namespace, date: m7.date, model: m7.model, credentialId: m7.credentialId, aFrameVersion: m7.aFrameVersion, aFrameServerVersion: m7.aFrameServerVersion });
    }
    return p5;
  }
  encodeNamespacePayload(e) {
    let a4 = [];
    if (e.some((n6) => !n6.embedding)) throw new Error("All records must have embeddings to be encoded");
    let r8 = new Uint8Array(this.A_FRAME_HEADER_SIZE), t4 = new DataView(r8.buffer);
    t4.setUint32(0, this.A_FRAME_FILE_MAGIC, true), r8[4] = this.A_FRAME_FILE_VERSION, t4.setUint32(5, e.length, true);
    let i6 = e[0]?.embedding.length ?? 0;
    t4.setUint16(9, i6, true), a4.push(r8);
    for (let n6 of e) {
      let _6 = C3.encode(n6.aseid.toString()), f4 = C3.encode(n6.name), M3 = JSON.stringify({ hash: n6.hash, description: n6.description, metadata: n6.metadata, embeddedAt: n6.embeddedAt, embeddingModel: n6.embeddingModel, credentialId: n6.credentialId, aFrameVersion: n6.aFrameVersion, aFrameServerVersion: n6.aFrameServerVersion }), N3 = C3.encode(M3), L2 = 2 + _6.length + 2 + f4.length + n6.embedding.length * 4 + 4 + N3.length, g5 = new Uint8Array(L2), h6 = new DataView(g5.buffer), m7 = 0;
      h6.setUint16(m7, _6.length, true), m7 += 2, g5.set(_6, m7), m7 += _6.length, h6.setUint16(m7, f4.length, true), m7 += 2, g5.set(f4, m7), m7 += f4.length;
      for (let y2 = 0; y2 < n6.embedding.length; y2++) h6.setFloat32(m7, n6.embedding[y2], true), m7 += 4;
      h6.setUint32(m7, N3.length, true), m7 += 4, g5.set(N3, m7), a4.push(g5);
    }
    let c3 = a4.reduce((n6, _6) => n6 + _6.length, 0), p5 = new Uint8Array(c3), s4 = 0;
    for (let n6 of a4) p5.set(n6, s4), s4 += n6.length;
    return p5;
  }
  decodeNamespacePayload(e) {
    if (e.length < this.A_FRAME_HEADER_SIZE) throw new Error("Corrupt namespace index: too short for header");
    let a4 = new DataView(e.buffer, e.byteOffset, e.byteLength), r8 = a4.getUint32(0, true);
    if (r8 !== this.A_FRAME_FILE_MAGIC) throw new Error(`Corrupt namespace index: bad magic 0x${r8.toString(16)}`);
    let t4 = e[4];
    if (t4 !== this.A_FRAME_FILE_VERSION) throw new Error(`Unsupported namespace index version: ${t4}`);
    let i6 = a4.getUint32(5, true), c3 = a4.getUint16(9, true), p5 = [], s4 = this.A_FRAME_HEADER_SIZE;
    for (let n6 = 0; n6 < i6; n6++) {
      let _6 = a4.getUint16(s4, true);
      s4 += 2;
      let f4 = P2.decode(e.slice(s4, s4 + _6));
      s4 += _6;
      let M3 = a4.getUint16(s4, true);
      s4 += 2;
      let N3 = P2.decode(e.slice(s4, s4 + M3));
      s4 += M3;
      let L2 = new Float32Array(c3);
      for (let y2 = 0; y2 < c3; y2++) L2[y2] = a4.getFloat32(s4, true), s4 += 4;
      let g5 = a4.getUint32(s4, true);
      s4 += 4;
      let h6 = P2.decode(e.slice(s4, s4 + g5));
      s4 += g5;
      let m7 = JSON.parse(h6);
      p5.push({ aseid: f4, hash: m7.hash ?? f4, name: N3, embedding: L2, description: m7.description, metadata: m7.metadata, embeddedAt: m7.embeddedAt, embeddingModel: m7.embeddingModel, credentialId: m7.credentialId, aFrameVersion: m7.aFrameVersion, aFrameServerVersion: m7.aFrameServerVersion });
    }
    return p5;
  }
  encodeKnowledgePayload(e) {
    let a4 = JSON.parse(JSON.stringify(e, (c3, p5) => p5 instanceof Float32Array ? Array.from(p5) : p5)), r8 = C3.encode(JSON.stringify(a4)), t4 = new Uint8Array(this.A_FRAME_HEADER_SIZE + 4 + r8.length), i6 = new DataView(t4.buffer);
    return i6.setUint32(0, this.A_FRAME_FILE_MAGIC, true), t4[4] = this.A_FRAME_KNOWLEDGE_VERSION, i6.setUint32(5, 1, true), i6.setUint16(9, 0, true), i6.setUint32(this.A_FRAME_HEADER_SIZE, r8.length, true), t4.set(r8, this.A_FRAME_HEADER_SIZE + 4), t4;
  }
  decodeKnowledgePayload(e) {
    if (e.length < this.A_FRAME_HEADER_SIZE + 4) throw new Error("Corrupt knowledge file: too short for header");
    let a4 = new DataView(e.buffer, e.byteOffset, e.byteLength), r8 = a4.getUint32(0, true);
    if (r8 !== this.A_FRAME_FILE_MAGIC) throw new Error(`Corrupt knowledge file: bad magic 0x${r8.toString(16)}`);
    let t4 = e[4];
    if (t4 !== this.A_FRAME_KNOWLEDGE_VERSION) throw new Error(`Unsupported knowledge file version: 0x${t4.toString(16)}`);
    let i6 = a4.getUint32(this.A_FRAME_HEADER_SIZE, true), c3 = this.A_FRAME_HEADER_SIZE + 4;
    if (e.length < c3 + i6) throw new Error("Corrupt knowledge file: truncated payload");
    let p5 = P2.decode(e.slice(c3, c3 + i6));
    return JSON.parse(p5);
  }
}, __name(_a54, "b"), _a54);
j2(b2, "A_FrameStorageCodec");
var O2 = b2;
var _a55;
var D2 = (_a55 = class extends x2 {
  onLoad(o3, e) {
    e || o3.register(E.instance);
  }
  async saveDefinitionsToMemory(o3, e, a4, r8, t4) {
    let i6 = e.params.records, c3 = i6[0].namespace, p5 = await this._loadDefinitionsFromMemory(t4.store, c3, a4.encryptionKey, r8), s4 = /* @__PURE__ */ new Map();
    for (let _6 of p5) s4.set(_6.aseid, _6);
    for (let _6 of i6) s4.set(_6.aseid.toString(), _6);
    let n6 = r8.encodePayload(Array.from(s4.values()));
    t4.store.set(c3, await g.encryptBytes(n6, a4.encryptionKey)), e.complete({ saved: i6.length });
  }
  async loadDefinitionsFromMemory(o3, e, a4, r8, t4) {
    let i6 = e.params.namespaceId, c3 = await this._loadDefinitionsFromMemory(t4.store, i6, a4.encryptionKey, r8);
    e.complete({ records: c3 });
  }
  async destroyDefinitionsFromMemory(o3, e, a4, r8, t4) {
    let i6 = e.params.namespaceId, c3 = e.params.definitionId, s4 = (await this._loadDefinitionsFromMemory(t4.store, i6, a4.encryptionKey, r8)).filter((_6) => _6.aseid !== c3), n6 = r8.encodePayload(s4);
    t4.store.set(i6, await g.encryptBytes(n6, a4.encryptionKey)), e.complete({ records: s4 });
  }
  async saveNamespacesToMemory(o3, e, a4, r8, t4) {
    let i6 = e.params.records, c3 = await this._loadNamespacesFromMemory(t4, a4.encryptionKey, r8), p5 = /* @__PURE__ */ new Map();
    for (let n6 of c3) p5.set(n6.aseid, n6);
    for (let n6 of i6) p5.set(n6.aseid.toString(), n6);
    let s4 = r8.encodeNamespacePayload(Array.from(p5.values()));
    t4.namespaceBlob = await g.encryptBytes(s4, a4.encryptionKey), e.complete({ success: true });
  }
  async loadNamespacesFromMemory(o3, e, a4, r8, t4) {
    let i6 = e.params.namespaces, c3 = await this._loadNamespacesFromMemory(t4, a4.encryptionKey, r8);
    e.complete({ records: i6 ? c3.filter((p5) => i6.includes(p5.name)) : c3 });
  }
  async destroyNamespacesFromMemory(o3, e, a4, r8, t4) {
    let i6 = e.params.namespaces, p5 = (await this._loadNamespacesFromMemory(t4, a4.encryptionKey, r8)).filter((n6) => !i6.includes(n6.aseid)), s4 = r8.encodeNamespacePayload(p5);
    t4.namespaceBlob = await g.encryptBytes(s4, a4.encryptionKey);
    try {
      for (let n6 of i6) t4.store.delete(n6);
      e.complete({ success: true });
    } catch {
      e.fail(new A2({ title: A2.DestroyNamespacesFailed, description: "Failed to destroy namespace records." })), e.complete({ success: false });
    }
  }
  async loadDefinitionFromBlobs(o3, e, a4, r8) {
    let t4 = r8.plainStore.get(o3.namespace.id);
    if (t4?.length) {
      let p5 = t4.find((s4) => s4.aseid === o3.aseid.toString());
      if (p5 && p5.hash === o3.hash) {
        o3.fromJSON(p5);
        return;
      }
    }
    if (!e.encryptionKey) return;
    let i6 = await this._loadDefinitionsFromMemory(r8.store, o3.namespace.id, e.encryptionKey, a4);
    if (i6.length === 0) return;
    let c3 = i6.find((p5) => p5.aseid === o3.aseid.toString());
    c3 && c3.hash === o3.hash && c3.aFrameServerVersion === e.serverVersion && o3.fromJSON(c3);
  }
  async loadNamespaceFromBlobs(o3, e, a4, r8) {
    if (r8.plainNamespaceRecords?.length) {
      let c3 = r8.plainNamespaceRecords.find((p5) => p5.aseid === o3.aseid.toString());
      if (c3 && c3.hash === o3.hash) {
        o3.fromJSON(c3);
        return;
      }
    }
    if (!e.encryptionKey) return;
    let t4 = await this._loadNamespacesFromMemory(r8, e.encryptionKey, a4);
    if (t4.length === 0) return;
    let i6 = t4.find((c3) => c3.aseid === o3.aseid.toString());
    i6 && i6.hash === o3.hash && i6.aFrameServerVersion === e.serverVersion && o3.fromJSON(i6);
  }
  async _loadDefinitionsFromMemory(o3, e, a4, r8) {
    let t4 = o3.get(e);
    if (!t4) return [];
    try {
      let i6 = await g.decryptBytes(t4, a4);
      return r8.decodePayload(i6);
    } catch {
      return [];
    }
  }
  async _loadNamespacesFromMemory(o3, e, a4) {
    let r8 = o3.namespaceBlob;
    if (!r8) return [];
    try {
      let t4 = await g.decryptBytes(r8, e);
      return a4.decodeNamespacePayload(t4);
    } catch {
      return [];
    }
  }
}, __name(_a55, "D"), _a55);
j2(D2, "A_FrameBrowserStorageProvider"), k2([ct.Load(), l(0, Yt(R)), l(1, Yt(E))], D2.prototype, "onLoad", 1), k2([N.Extend({ name: S2.SaveDefinitions, scope: [x2] }), l(0, Yt(R2)), l(1, Yt(F2)), l(2, Yt(v2)), l(3, Yt(O2)), l(4, Yt(E))], D2.prototype, "saveDefinitionsToMemory", 1), k2([N.Extend({ name: S2.LoadDefinitions, scope: [x2] }), l(0, Yt(R2)), l(1, Yt(F2)), l(2, Yt(v2)), l(3, Yt(O2)), l(4, Yt(E))], D2.prototype, "loadDefinitionsFromMemory", 1), k2([N.Extend({ name: S2.DestroyDefinitions, scope: [x2] }), l(0, Yt(R2)), l(1, Yt(F2)), l(2, Yt(v2)), l(3, Yt(O2)), l(4, Yt(E))], D2.prototype, "destroyDefinitionsFromMemory", 1), k2([N.Extend({ name: S2.SaveNamespaces, scope: [x2] }), l(0, Yt(R2)), l(1, Yt(F2)), l(2, Yt(v2)), l(3, Yt(O2)), l(4, Yt(E))], D2.prototype, "saveNamespacesToMemory", 1), k2([N.Extend({ name: S2.LoadNamespaces, scope: [x2] }), l(0, Yt(R2)), l(1, Yt(F2)), l(2, Yt(v2)), l(3, Yt(O2)), l(4, Yt(E))], D2.prototype, "loadNamespacesFromMemory", 1), k2([N.Extend({ name: S2.DestroyNamespaces, scope: [x2] }), l(0, Yt(R2)), l(1, Yt(F2)), l(2, Yt(v2)), l(3, Yt(O2)), l(4, Yt(E))], D2.prototype, "destroyNamespacesFromMemory", 1), k2([N.Extend({ name: r4.Load, scope: [h3] }), l(0, Yt(te)), l(1, Yt(v2)), l(2, Yt(O2)), l(3, Yt(E))], D2.prototype, "loadDefinitionFromBlobs", 1), k2([N.Extend({ name: m3.Load, scope: [w2] }), l(0, Yt(te)), l(1, Yt(v2)), l(2, Yt(O2)), l(3, Yt(E))], D2.prototype, "loadNamespaceFromBlobs", 1);
var Y2 = D2;

// node_modules/@adaas/a-frame/dist/browser/chunk-2GSDZE4W.mjs
var _a56;
var d2 = (_a56 = class extends c {
  constructor(e = {}) {
    super(e);
  }
  write(e$1) {
    let o3 = p2[e$1.level], t4 = L[e$1.level], s4 = e$1.level === "error" ? console.error : e$1.level === "warn" ? console.warn : console.log;
    e$1.metadata && Object.keys(e$1.metadata).length > 0 ? s4(`%c${o3} ${e$1.message}`, t4, e$1.metadata) : s4(`%c${o3} ${e$1.message}`, t4);
  }
  section(e) {
    console.log(`%c\u2504 ${e} \u2504`, "color: #06b; font-weight: bold; padding: 2px 0;");
  }
  divider() {
    console.log("%c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500", "color: #aaa;");
  }
  summary(e = m2.summaryTitle) {
    this.section(e);
    let o3 = {};
    for (let [t4, s4] of this.counters) o3[t4] = s4;
    o3.elapsed = this.elapsed(), console.table(o3), this.divider();
  }
  progress(e$1, o3) {
    let t4 = Date.now(), s4 = 0, i6 = "", f$1 = 0, c3 = j2((r8 = false, a4) => {
      let g5 = Date.now();
      if (!r8 && g5 - f$1 < m2.progressThrottleMs) return;
      f$1 = g5;
      let $2 = o3 > 0 ? Math.min(100, Math.round(s4 / o3 * 100)) : 100, A6 = i6 ? ` \u2014 ${i6}` : "";
      a4 === "done" ? console.log(`%c\u2714 ${e$1} ${s4}/${o3} (${$2}%)%c \u2014 ${((g5 - t4) / 1e3).toFixed(2)}s`, L.success, "color: #888;") : a4 === "fail" ? console.log(`%c\u2716 ${e$1} FAILED at ${s4}/${o3}`, L.error) : console.log(`%c\u27F3 ${e$1} ${s4}/${o3} (${$2}%)${A6}`, L.info);
    }, "emit");
    return c3(true), { tick: j2((r8) => {
      s4 = Math.min(o3, s4 + 1), r8 && (i6 = r8), c3();
    }, "tick"), succeed: j2((r8) => {
      r8 && (i6 = r8), s4 = o3, c3(true, "done");
    }, "succeed"), fail: j2((r8) => {
      r8 && (i6 = r8), c3(true, "fail");
    }, "fail"), update: j2((r8, a4) => {
      s4 = Math.min(o3, Math.max(0, r8)), a4 && (i6 = a4), c3();
    }, "update") };
  }
}, __name(_a56, "d"), _a56);
j2(d2, "A_FrameLogger");
var v3 = d2;

// node_modules/@adaas/a-frame/dist/browser/chunk-3NPQJZT7.mjs
var n4 = { Generate: "_A_FRAME_COMPLETION_GENERATE" };
var _a57;
var o = (_a57 = class extends D {
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
    super.fromNew(e), this._prompt = e.prompt, this._options = e.options?.model ? e.options : { model: a2.RIGEL, ...e.options };
  }
  fromJSON(e) {
    this._prompt = e.prompt, this._text = e.text, this._vector = e.embedding ? new i5(e.embedding) : void 0, this._model = e.model, this._date = e.date, this._aFrameVersion = e.aFrameVersion, this._aFrameServerVersion = e.aFrameServerVersion;
  }
  toJSON() {
    return { ...super.toJSON(), prompt: this._prompt, text: this._text, embedding: this._vector?.values, model: this._model, date: this._date, aFrameVersion: this._aFrameVersion, aFrameServerVersion: this._aFrameServerVersion };
  }
  generate(e) {
    return this.call(n4.Generate, e);
  }
  hydrateFromGeneration(e) {
    this._text = e.text, this._vector = new i5(e.embedding), this._model = e.model, this._date = e.date, this._aFrameVersion = e.aFrameVersion, this._aFrameServerVersion = e.aFrameServerVersion;
  }
}, __name(_a57, "o"), _a57);
j2(o, "A_FrameCompletion");
var m4 = o;

// node_modules/@adaas/a-frame/dist/browser/chunk-J5F4MJEB.mjs
var r5 = { Load: "_A_FRAME_SEGMENT_LOAD", Save: "_A_FRAME_SEGMENT_SAVE", Embed: "_A_FRAME_SEGMENT_EMBED", Destroy: "_A_FRAME_SEGMENT_DESTROY" };
var g2 = { summary: "string - one concise sentence describing what the text is about", keywords: "string - comma-separated list of 5-15 lower-case keywords most useful for searching this text; prefer single words or short noun phrases", topics: 'string - comma-separated list of 1-5 higher-level topics or themes this text belongs to (broader than keywords, e.g. "authentication", "dependency injection")' };
function A3(s4) {
  return s4 ? s4.split(/[,;\n]/).map((e) => e.trim().toLowerCase()).filter((e) => e.length > 0).filter((e, t4, m7) => m7.indexOf(e) === t4) : [];
}
__name(A3, "A");
j2(A3, "parseSegmentExtractionList");
var _a58;
var o2 = (_a58 = class extends D {
  static get concept() {
    return "a-frame";
  }
  get id() {
    return this.aseid.id;
  }
  get content() {
    return this._content;
  }
  get index() {
    return this._index;
  }
  get hash() {
    return this._hash;
  }
  get meta() {
    return this._extraction;
  }
  get extraction() {
    return this._extraction;
  }
  get isExtracted() {
    return this._extraction !== void 0;
  }
  get keywords() {
    return this._extraction?.keywords ?? [];
  }
  get topics() {
    return this._extraction?.topics ?? [];
  }
  get summary() {
    return this._extraction?.summary;
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
    return this.call(r5.Save, e);
  }
  destroy(e) {
    return this.call(r5.Destroy, e);
  }
  async load(e) {
    return this.call(r5.Load, e);
  }
  update(e) {
    e.content && (this._content = e.content);
  }
  embed(e) {
    return this.call(r5.Embed, e);
  }
  fromNew(e) {
    super.fromNew(e), this._content = e.content, this._options = { model: a2.ANTARES, ...e.options }, this._index = e.index;
    let t4 = this._content;
    this._hash = r3.fnv1a(t4);
  }
  fromJSON(e) {
    super.fromJSON(e), this._content = e.content, this._hash = e.hash, this._vector = e.embedding ? new i5(e.embedding) : void 0, this._embeddedAt = e.embeddedAt, this._model = e.model, this._credentialId = e.credentialId, this._aFrameVersion = e.aFrameVersion, this._aFrameServerVersion = e.aFrameServerVersion, this._index = e.index, e.task && (this._options = { ...this._options, task: e.task }), this._extraction = e.extraction;
  }
  toJSON() {
    return { ...super.toJSON(), hash: this._hash, content: this._content, embedding: this._vector?.values, embeddedAt: this._embeddedAt ?? (/* @__PURE__ */ new Date()).toISOString(), task: this._options?.task, index: this._index, model: this._model, credentialId: this._credentialId, aFrameVersion: this._aFrameVersion, aFrameServerVersion: this._aFrameServerVersion, extraction: this._extraction };
  }
  hydrateFromRecord(e) {
    if (e.hash !== this._hash) throw new Error(`A_FrameSegment.hydrateFromRecord: hash mismatch for "${this._content}" (expected ${this._hash}, got ${e.hash})`);
    this._vector = new i5(e.embedding), this._embeddedAt = e.embeddedAt, e.task && (this._options = { ...this._options, task: e.task });
  }
  hydrateFromEmbedding(e) {
    this._vector = new i5(e);
  }
  clone(e) {
    let t4 = new _a58(this.toJSON());
    return t4.aseid = t4.generateASEID(e), t4;
  }
  toString() {
    return [`// content: ${this._content}`].join(`
`);
  }
}, __name(_a58, "o"), _a58);
j2(o2, "A_FrameSegment");
var _4 = o2;

// node_modules/@adaas/a-frame/dist/browser/chunk-OVTCNCGJ.mjs
var _a59;
var A4 = (_a59 = class extends D {
  static get concept() {
    return "a-frame";
  }
  fromNew(i6) {
    this.version = i6.version, this.timestamp = i6.timestamp, this.reason = i6.reason, this.encoded = i6.encoded, this.delta = i6.delta;
  }
  toJSON() {
    return { ...super.toJSON(), version: this.version, timestamp: this.timestamp, reason: this.reason, encoded: this.encoded, delta: this.delta };
  }
}, __name(_a59, "A"), _a59);
j2(A4, "A_FrameDynamicPatch");
var l2 = A4;
var F3 = { Generate: "_A_FRAME_DYNAMIC_CONTENT_GENERATE", Patch: "_A_FRAME_DYNAMIC_CONTENT_PATCH" };
var _a60;
var S3 = (_a60 = class extends H {
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
  set(e, t4) {
    this._meta.set(e, t4);
  }
}, __name(_a60, "S"), _a60);
j2(S3, "A_FrameDynamicContentOperation");
var f2 = S3;
var _a61;
var h4 = (_a61 = class extends b {
}, __name(_a61, "h"), _a61);
j2(h4, "A_FrameDynamicContentError"), h4.GenerationFailed = "GenerationFailed", h4.PatchFailed = "PatchFailed", h4.InvalidPatch = "InvalidPatch", h4.PieceNotFound = "PieceNotFound";
var m5 = h4;
var _a62;
var p3 = (_a62 = class extends H {
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
    e.forEach((t4) => {
      this._map.set(t4.id, t4), this._order.includes(t4.id) || this._order.push(t4.id);
    });
  }
  update(e) {
    this._map.set(e.id, e), this._order.includes(e.id) || this._order.push(e.id);
  }
  remove(e) {
    this._map.delete(e);
    let t4 = this._order.indexOf(e);
    t4 !== -1 && this._order.splice(t4, 1);
  }
  clear() {
    this._map.clear(), this._order = [];
  }
  insertBefore(e, t4) {
    this._map.set(t4.id, t4);
    let n6 = this._order.indexOf(e);
    n6 === -1 ? this._order.push(t4.id) : this._order.splice(n6, 0, t4.id);
  }
  insertAfter(e, t4) {
    this._map.set(t4.id, t4);
    let n6 = this._order.indexOf(e);
    n6 === -1 ? this._order.push(t4.id) : this._order.splice(n6 + 1, 0, t4.id);
  }
  replace(e, t4) {
    let n6 = this._order.indexOf(e);
    n6 !== -1 && (this._map.delete(e), this._map.set(t4.id, t4), this._order[n6] = t4.id);
  }
  moveTo(e, t4) {
    let n6 = this._order.indexOf(e);
    if (n6 === -1) return;
    this._order.splice(n6, 1);
    let r8 = Math.max(0, Math.min(t4, this._order.length));
    this._order.splice(r8, 0, e);
  }
  moveBefore(e, t4) {
    let n6 = this._order.indexOf(e);
    if (n6 === -1) return;
    this._order.splice(n6, 1);
    let r8 = this._order.indexOf(t4);
    this._order.splice(r8 === -1 ? 0 : r8, 0, e);
  }
  moveAfter(e, t4) {
    let n6 = this._order.indexOf(e);
    if (n6 === -1) return;
    this._order.splice(n6, 1);
    let r8 = this._order.indexOf(t4);
    this._order.splice(r8 === -1 ? this._order.length : r8 + 1, 0, e);
  }
  applyOperation(e, t4) {
    switch (e.action) {
      case "remove": {
        e.targetId && this.remove(e.targetId);
        break;
      }
      case "replace": {
        e.targetId && t4 && this.replace(e.targetId, t4);
        break;
      }
      case "add": {
        if (!t4) break;
        !e.targetId || e.position === "append" ? this.add(t4) : e.position === "before" ? this.insertBefore(e.targetId, t4) : this.insertAfter(e.targetId, t4);
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
    let e = this.list().filter((r8) => r8.isEmbed && r8.vector);
    if (e.length === 0) return null;
    let t4 = e[0].vector.length, n6 = new Float32Array(t4);
    for (let r8 of e) {
      let o3 = r8.vector.values;
      for (let s4 = 0; s4 < t4; s4++) n6[s4] += o3[s4];
    }
    for (let r8 = 0; r8 < t4; r8++) n6[r8] /= e.length;
    return new i5(n6);
  }
  search(e, t4 = _a62.PATCH_PIECE_LIMIT) {
    let n6 = e.normalize();
    return this.list().filter((r8) => r8.isEmbed && r8.vector).map((r8) => ({ segment: r8, score: n6.dot(r8.vector.normalize()) })).sort((r8, o3) => o3.score - r8.score).slice(0, t4);
  }
  searchByKeywords(e, t4 = _a62.PATCH_PIECE_LIMIT) {
    let n6 = e.toLowerCase().split(/\W+/).filter((r8) => r8.length > 3);
    return n6.length === 0 ? [] : this.list().map((r8) => {
      let o3 = r8.content.toLowerCase(), s4 = n6.reduce((a4, c3) => a4 + (o3.includes(c3) ? 1 : 0), 0);
      return { segment: r8, score: s4 };
    }).filter((r8) => r8.score > 0).sort((r8, o3) => o3.score - r8.score).slice(0, t4);
  }
  selectForPatch(e, t4, n6 = _a62.PATCH_PIECE_LIMIT) {
    let r8 = this.list();
    if (r8.length <= n6) return r8;
    if (e && r8.some((a4) => a4.isEmbed)) {
      let a4 = this.search(e, n6);
      if (a4.length > 0) return a4.map((c3) => c3.segment);
    }
    let o3 = this.searchByKeywords(t4, n6);
    return o3.length > 0 ? o3.map((s4) => s4.segment) : r8.slice(0, n6);
  }
  cosineSimilarity(e, t4) {
    if (!t4) return 0;
    let n6 = e.dot(t4), r8 = e.magnitude() * t4.magnitude();
    return r8 === 0 ? 0 : n6 / r8;
  }
}, __name(_a62, "p"), _a62);
j2(p3, "A_FrameDynamicContentIndex"), p3.PATCH_PIECE_LIMIT = 5;
var _5 = p3;
var _a63;
var g3 = (_a63 = class extends D {
  static get concept() {
    return "a-frame";
  }
  get scope() {
    return this._scope || (this._scope = _.allocate(this, new R({ name: `${this.aseid.id}-scope` }))), this._scope;
  }
  get index() {
    return this.scope.resolve(_5);
  }
  fromNew(i6) {
    super.fromNew(i6);
    let e = new _5({ name: `${this.aseid.id}` });
    this.scope.register(e), this.createdAt = Date.now(), this.prompt = i6.prompt, this.model = i6.options?.model || a2.LYRA, this._system = i6.options?.system, this._patchPieceLimit = i6.options?.patchPieceLimit || _5.PATCH_PIECE_LIMIT, this._splitStrategy = i6.options?.splitStrategy ?? "paragraph", this._history = [], this._version = 0;
  }
  get segments() {
    return this.index.list();
  }
  get content() {
    return this.index.list().map((i6) => i6.content).join(`
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
  get splitStrategy() {
    return this._splitStrategy;
  }
  async generate() {
    let i6 = new f2();
    this.scope.isInheritedFrom(_.scope(this)) || this.scope.inherit(_.scope(this));
    let e = new R({ name: "a-frame-dynamic-content-generate", fragments: [i6] }).inherit(this.scope);
    try {
      await this.call(F3.Generate, e), e.destroy();
    } catch (t4) {
      throw e.destroy(), new m5({ title: m5.GenerationFailed, description: `Failed to generate content: ${t4 instanceof Error ? t4.message : String(t4)}` });
    }
  }
  async patch(i6, e$1) {
    this.scope.isInheritedFrom(_.scope(this)) || this.scope.inherit(_.scope(this));
    let t4 = new R({ name: "a-frame-dynamic-content-patch" }).inherit(this.scope), n6;
    if (e$1 !== void 0) {
      let o3 = Array.isArray(e$1) ? e$1 : [e$1], s4 = o3.filter((a4) => !this.index.get(a4.id));
      if (s4.length > 0) throw t4.destroy(), new m5({ title: m5.PatchFailed, description: "Segment(s) not found in this content's index: " + s4.map((a4) => `"${a4.id}"`).join(", ") + ". Only segments that belong to this DynamicContent instance can be targeted." });
      n6 = o3;
    } else {
      let o3 = new _4({ content: i6, options: { task: "query" } });
      t4.register(o3), await o3.embed(), n6 = this.index.selectForPatch(o3.vector ?? null, i6, this._patchPieceLimit);
    }
    let r8 = new f2({ instruction: i6, segments: n6 });
    t4.register(r8);
    try {
      await this.call(F3.Patch, t4), t4.destroy();
    } catch (o3) {
      throw t4.destroy(), new m5({ title: m5.PatchFailed, description: `Failed to patch content: ${o3 instanceof Error ? o3.message : String(o3)}` });
    }
  }
  compareTo(i6) {
    let e = this.index.centroid(), t4 = i6.index.centroid();
    return !e || !t4 ? 0 : e.cosineSimilarity(t4);
  }
  hydrateFromGeneration(i6, e) {
    i6.forEach((t4) => this.index.add(t4)), this._history.push(new l2({ version: this._version, timestamp: Date.now(), reason: `Generated for: "${this.prompt}"`, encoded: Buffer.from(JSON.stringify(this.index.list())).toString("base64"), delta: this.index.size }));
  }
  _resolveSplitter(i6) {
    return typeof i6 == "function" ? i6 : _a63.SPLITTERS[i6] ?? _a63.SPLITTERS.paragraph;
  }
  hydrateFromText(i6, e$1) {
    if (this.index.size > 0) throw new m5({ title: m5.GenerationFailed, description: `hydrateFromText() called on a non-empty content (${this.index.size} segments). Hydration sources must not be mixed \u2014 create a fresh A_FrameDynamicContent instead.` });
    let n6 = this._resolveSplitter(e$1 ?? this._splitStrategy)(i6 ?? "").filter((r8) => r8.trim().length > 0);
    for (let r8 of n6) {
      let o3 = new _4({ content: r8, options: { task: "document" } });
      this.index.add(o3);
    }
    return this._history.push(new l2({ version: this._version, timestamp: Date.now(), reason: `Hydrated from local text (${n6.length} segments)`, encoded: Buffer.from(JSON.stringify(this.index.list())).toString("base64"), delta: this.index.size })), n6.length;
  }
  hydrateFromPatch(i6, e$1) {
    let t4 = this.index.size, n6 = j2((s4) => s4.toLowerCase().replace(/[^\w\s]/g, "").replace(/\s+/g, " ").trim(), "normalize"), r8 = this.index.list().map((s4) => n6(s4.content)), o3 = j2((s4) => {
      let a4 = n6(s4);
      return a4.length < 8 ? false : r8.some((c3) => c3 === a4 || c3.includes(a4));
    }, "isNearDuplicate");
    for (let s4 of i6.operations) {
      if (!["add", "replace", "remove"].includes(s4.action)) continue;
      let a4;
      if (s4.segment) {
        if ((s4.action === "add" || s4.action === "replace") && o3(s4.segment.content)) continue;
        a4 = new _4({ content: s4.segment.content, options: { task: "document" } }), s4.segment.embedding?.length && a4.hydrateFromEmbedding(new Float32Array(s4.segment.embedding));
      }
      s4.action === "add" && ((/* @__PURE__ */ new Set(["before", "after", "append", void 0])).has(s4.position) || (s4.position = "append", s4.targetId = void 0)), this.index.applyOperation(s4, a4);
    }
    this._version++, this._history.push(new l2({ version: this._version, timestamp: Date.now(), reason: i6.patchSummary, encoded: Buffer.from(JSON.stringify(this.index.list())).toString("base64"), delta: this.index.size - t4 }));
  }
  toJSON() {
    return { ...super.toJSON(), prompt: this.prompt, metadata: { model: this.model, createdAt: this.createdAt }, history: this._history.map((i6) => i6.toJSON()) };
  }
}, __name(_a63, "g"), _a63);
j2(g3, "A_FrameDynamicContent"), g3.SPLITTERS = { paragraph: j2((i6) => i6.split(/\n\s*\n+/).map((e) => e.trim()), "paragraph"), line: j2((i6) => i6.split(/\r?\n/).map((e) => e.trim()), "line"), sentence: j2((i6) => i6.split(/(?<=[.!?])\s+/).map((e) => e.trim()), "sentence"), none: j2((i6) => [i6], "none") };
var w4 = g3;

// node_modules/@adaas/a-frame/dist/browser/chunk-WZPDJK3P.mjs
var r6 = { Extract: "_A_FRAME_SCHEMA_EXTRACT", ExtractMultiple: "_A_FRAME_SCHEMA_EXTRACT_MULTIPLE" };
var _a64;
var a3 = (_a64 = class extends D {
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
  get dataArray() {
    return this._dataArray;
  }
  get isMultipleExtracted() {
    return this._dataArray !== void 0;
  }
  fromNew(e) {
    super.fromNew(e), this._prompt = e.prompt, this._schema = e.schema, this._options = e.options?.model ? e.options : { model: a2.NOVA, ...e.options };
  }
  fromJSON(e) {
    this._prompt = e.prompt, this._schema = e.schema, this._data = e.data, this._model = e.model, this._date = e.date, this._aFrameVersion = e.aFrameVersion, this._aFrameServerVersion = e.aFrameServerVersion;
  }
  toJSON() {
    return { ...super.toJSON(), prompt: this._prompt, schema: this._schema, data: this._data, model: this._model, date: this._date, aFrameVersion: this._aFrameVersion, aFrameServerVersion: this._aFrameServerVersion };
  }
  extract(e) {
    return this.call(r6.Extract, e);
  }
  extractMultiple(e) {
    return this.call(r6.ExtractMultiple, e);
  }
  hydrateFromExtraction(e, t4) {
    this._data = e, this._model = t4.model, this._date = t4.date, this._aFrameVersion = t4.aFrameVersion, this._aFrameServerVersion = t4.aFrameServerVersion;
  }
  hydrateFromMultipleExtraction(e, t4) {
    this._dataArray = e, this._model = t4.model, this._date = t4.date, this._aFrameVersion = t4.aFrameVersion, this._aFrameServerVersion = t4.aFrameServerVersion;
  }
}, __name(_a64, "a"), _a64);
j2(a3, "A_FrameSchema");
var s2 = a3;

// node_modules/@adaas/a-frame/dist/browser/chunk-4KUCX5R6.mjs
var d3 = { Request: "_A_FRAME_REQUEST", Socket: "_A_FRAME_SOCKET", Stream: "_A_FRAME_STREAM", Send: "_A_FRAME_SEND" };
var _a65;
var J2 = (_a65 = class extends H {
  constructor(t4, r8, a4) {
    super({ name: "a-frame-channel-request" });
    this.method = t4;
    this.path = r8;
    this.body = a4;
  }
  complete(t4) {
    this._response = t4;
  }
  fail(t4) {
    this._error = t4;
  }
  get response() {
    return this._response;
  }
  get error() {
    return this._error;
  }
}, __name(_a65, "J"), _a65);
j2(J2, "A_FrameChannelRequest");
var c2 = J2;
var _a66;
var N2 = (_a66 = class extends b {
}, __name(_a66, "N"), _a66);
j2(N2, "A_FrameChannelError"), N2.InvalidRequest = "InvalidRequest", N2.Timeout = "Timeout", N2.RequestFailed = "RequestFailed";
var s3 = N2;
var D3 = { Load: "_A_FRAME_DYNAMIC_STRUCTURE_LOAD", Patch: "_A_FRAME_DYNAMIC_STRUCTURE_PATCH", Generate: "_A_FRAME_DYNAMIC_STRUCTURE_GENERATE", Map: "_A_FRAME_DYNAMIC_STRUCTURE_MAP" };
var _a67;
var R3 = (_a67 = class extends b {
}, __name(_a67, "R"), _a67);
j2(R3, "A_FrameDynamicStructureError"), R3.InvalidPatch = "InvalidPatch", R3.VersionMismatch = "VersionMismatch", R3.ComponentNotFound = "ComponentNotFound", R3.InvalidOperation = "InvalidOperation", R3.GenerationFailed = "GenerationFailed";
var y = R3;
var _a68;
var Y3 = (_a68 = class extends H {
  constructor() {
    super({ name: "a-frame-component-map-index" });
    this._entries = /* @__PURE__ */ new Map();
  }
  set(t4) {
    this._entries.set(t4.prompt, t4);
  }
  get(t4) {
    return this._entries.get(t4);
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
    return this.list().filter((t4) => t4.matchedClass !== null);
  }
  get unmatched() {
    return this.list().filter((t4) => t4.matchedClass === null);
  }
  toResult(t4) {
    let r8 = j2((a4) => {
      let n6 = this._entries.get(a4.prompt);
      return n6 || { prompt: a4.prompt, role: a4.role, class: a4.class, matchedClass: null, matchScore: 0 };
    }, "getEntry");
    return { containers: t4.containers.map((a4) => ({ ...r8(a4), components: (a4.components ?? []).map(r8), fragments: (a4.fragments ?? []).map(r8), entities: (a4.entities ?? []).map(r8) })), components: t4.components.map(r8), fragments: t4.fragments.map(r8), entities: t4.entities.map(r8) };
  }
}, __name(_a68, "Y"), _a68);
j2(Y3, "A_FrameComponentMapIndex");
var G3 = Y3;
var _a69;
var z3 = (_a69 = class extends H {
  constructor(t4 = {}) {
    super({ name: "a-frame-dynamic-structure-operation-context" });
    this._meta = /* @__PURE__ */ new Map();
    this._meta.set("params", t4);
  }
  get params() {
    return this._meta.get("params");
  }
  get(t4) {
    return this._meta.get(t4);
  }
  set(t4, r8) {
    this._meta.set(t4, r8);
  }
}, __name(_a69, "z"), _a69);
j2(z3, "A_FrameDynamicStructureOperation");
var v4 = z3;
var _a70;
var j3 = (_a70 = class extends D {
  static get concept() {
    return "a-frame";
  }
  fromNew(e) {
    super.fromNew(e), this.createdAt = Date.now(), this.prompt = e.prompt, this.model = e.options?.model || a2.PULSAR, this._context = e.options?.context ?? "", this._metaHint = e.options?.metaHint ?? "", this._includeBases = (e.options?.includeBases || []).map((t4) => typeof t4 == "string" ? t4 : A.getComponentName(t4)), this._excludeBases = (e.options?.excludeBases || []).map((t4) => typeof t4 == "string" ? t4 : A.getComponentName(t4)), this._enabledComponents = (e.options?.enabledComponents || []).map((t4) => typeof t4 == "string" ? t4 : A.getComponentName(t4)), this._minScore = e.options?.minScore ?? 0.7, this._maxRetries = e.options?.maxRetries ?? 3, this._candidateCount = e.options?.candidateCount ?? 5, this._definition = null, this._mapResult = null, this._history = [], this._version = 0;
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
    let e = new v4(), t4 = new R({ name: "a-frame-dynamic-structure-generate", fragments: [e] }).inherit(_.scope(this));
    try {
      await this.call(D3.Generate, t4), t4.destroy();
    } catch (r8) {
      throw t4.destroy(), new y({ title: y.GenerationFailed, description: `Failed to generate structure: ${r8 instanceof Error ? r8.message : String(r8)}` });
    }
  }
  async patch(e) {
    let t4 = new v4({ instruction: e }), r8 = new R({ name: "a-frame-dynamic-structure-patch", fragments: [t4] }).inherit(_.scope(this));
    try {
      await this.call(D3.Patch, r8), r8.destroy();
    } catch (a4) {
      throw r8.destroy(), new y({ title: y.GenerationFailed, description: `Failed to patch structure: ${a4 instanceof Error ? a4.message : String(a4)}` });
    }
  }
  async map() {
    let e = new G3(), t4 = new R({ name: "a-frame-dynamic-structure-map", fragments: [e] }).inherit(_.scope(this));
    try {
      await this.call(D3.Map, t4), t4.destroy();
    } catch (r8) {
      throw t4.destroy(), new y({ title: y.GenerationFailed, description: `Failed to map structure: ${r8 instanceof Error ? r8.message : String(r8)}` });
    }
  }
  hydrateFromGeneration(e, t4) {
    this._definition = e, this._mapResult = null, this._history.push(new l2({ version: this._version, timestamp: Date.now(), reason: `Generated for: "${this.prompt}"`, encoded: Buffer.from(JSON.stringify(this._stripEmbeddings(e))).toString("base64"), delta: this._countElements(e) }));
  }
  hydrateFromPatch(e, t4, r8) {
    let a4 = this._definition ? this._countElements(this._definition) : 0;
    this._definition = e, this._mapResult = null, this._version++, this._history.push(new l2({ version: this._version, timestamp: Date.now(), reason: t4, encoded: Buffer.from(JSON.stringify(this._stripEmbeddings(e))).toString("base64"), delta: this._countElements(e) - a4 }));
  }
  hydrateFromMap(e) {
    this._mapResult = e;
  }
  toJSON() {
    let e = this._definition ? this._countElements(this._definition) : 0;
    return { ...super.toJSON(), name: this.prompt, description: `DynamicStructure with ${e} elements and ${this._history.length} patches`, metadata: { model: this.model, context: this._context, metaHint: this._metaHint, includeBases: this._includeBases, excludeBases: this._excludeBases, enabledComponents: this._enabledComponents, candidateCount: this._candidateCount, createdAt: this.createdAt }, history: this._history.map((t4) => t4.toJSON()) };
  }
  _countElements(e) {
    return (e.containers?.length ?? 0) + (e.components?.length ?? 0) + (e.fragments?.length ?? 0) + (e.entities?.length ?? 0);
  }
  _stripEmbeddings(e) {
    let t4 = j2((r8) => {
      let { embedding: a4, ...n6 } = r8;
      return n6;
    }, "strip");
    return { containers: e.containers.map((r8) => ({ ...t4(r8), components: (r8.components ?? []).map(t4), fragments: (r8.fragments ?? []).map(t4), entities: (r8.entities ?? []).map(t4) })), components: e.components.map(t4), fragments: e.fragments.map(t4), entities: e.entities.map(t4) };
  }
}, __name(_a70, "j"), _a70);
j2(j3, "A_FrameDynamicStructure");
var O3 = j3;
var C4 = { Generate: "_A_FRAME_DYNAMIC_FEATURE_GENERATE", Patch: "_A_FRAME_DYNAMIC_FEATURE_PATCH", Map: "_A_FRAME_DYNAMIC_FEATURE_MAP" };
var _a71;
var W = (_a71 = class extends H {
  constructor(t4 = {}) {
    super({ name: "a-frame-dynamic-feature-operation-context" });
    this._meta = /* @__PURE__ */ new Map();
    this._meta.set("params", t4);
  }
  get params() {
    return this._meta.get("params");
  }
  get(t4) {
    return this._meta.get(t4);
  }
  set(t4, r8) {
    this._meta.set(t4, r8);
  }
}, __name(_a71, "W"), _a71);
j2(W, "A_FrameDynamicFeatureOperation");
var w5 = W;
var _a72;
var x3 = (_a72 = class extends b {
}, __name(_a72, "x"), _a72);
j2(x3, "A_FrameDynamicFeatureError"), x3.GenerationFailed = "GenerationFailed", x3.PatchFailed = "PatchFailed", x3.MappingFailed = "MappingFailed", x3.MethodNotFound = "MethodNotFound", x3.InvalidOperation = "InvalidOperation";
var E2 = x3;
var _a73;
var Z = (_a73 = class extends H {
  constructor() {
    super({ name: "a-frame-method-map-index" });
    this._stepEntries = /* @__PURE__ */ new Map();
    this._elementEntries = /* @__PURE__ */ new Map();
  }
  setStep(t4) {
    this._stepEntries.set(t4.prompt, t4);
  }
  getStep(t4) {
    return this._stepEntries.get(t4);
  }
  setElement(t4) {
    this._elementEntries.set(t4.prompt, t4);
  }
  getElement(t4) {
    return this._elementEntries.get(t4);
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
    return Array.from(this._stepEntries.values()).filter((t4) => t4.matchedMethod !== null);
  }
  get unmatchedSteps() {
    return Array.from(this._stepEntries.values()).filter((t4) => t4.matchedMethod === null);
  }
  toResult(t4) {
    let r8 = j2((n6) => {
      let o3 = this._stepEntries.get(n6.prompt);
      return o3 || { prompt: n6.prompt, inputs: n6.inputs, outputs: n6.outputs, matchedClass: null, matchedMethod: null, matchScore: 0 };
    }, "getStep"), a$1 = j2((n6) => {
      let o3 = this._elementEntries.get(n6.prompt);
      return o3 || { prompt: n6.prompt, matchedClass: null, matchScore: 0 };
    }, "getElement");
    return { steps: t4.steps.map(r8), components: t4.components.map(a$1), fragments: t4.fragments.map(a$1), entities: t4.entities.map(a$1) };
  }
}, __name(_a73, "Z"), _a73);
j2(Z, "A_FrameMethodMapIndex");
var B = Z;
var _a74;
var re2 = (_a74 = class extends D {
  static get concept() {
    return "a-frame";
  }
  fromNew(e) {
    super.fromNew(e), this.createdAt = Date.now(), this.prompt = e.prompt, this._model = e.options?.model ?? a2.PULSAR, this._context = e.options?.context ?? "", this._includeBases = (e.options?.includeBases ?? []).map((t4) => typeof t4 == "string" ? t4 : A.getComponentName(t4)), this._excludeBases = (e.options?.excludeBases ?? []).map((t4) => typeof t4 == "string" ? t4 : A.getComponentName(t4)), this._enabledComponents = (e.options?.enabledComponents ?? []).map((t4) => typeof t4 == "string" ? t4 : A.getComponentName(t4)), this._minScore = e.options?.minScore ?? 0.7, this._maxRetries = e.options?.maxRetries ?? 3, this._definition = null, this._mapResult = null, this._history = [], this._version = 0;
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
    let e = new w5(), t4 = new R({ name: "a-frame-dynamic-feature-generate", fragments: [e] }).inherit(_.scope(this));
    try {
      await this.call(C4.Generate, t4), t4.destroy();
    } catch (r8) {
      throw t4.destroy(), new E2({ title: E2.GenerationFailed, description: `Failed to generate feature workflow: ${r8 instanceof Error ? r8.message : String(r8)}` });
    }
  }
  async patch(e) {
    let t4 = new w5({ instruction: e }), r8 = new R({ name: "a-frame-dynamic-feature-patch", fragments: [t4] }).inherit(_.scope(this));
    try {
      await this.call(C4.Patch, r8), r8.destroy();
    } catch (a4) {
      throw r8.destroy(), new E2({ title: E2.PatchFailed, description: `Failed to patch feature workflow: ${a4 instanceof Error ? a4.message : String(a4)}` });
    }
  }
  async map() {
    let e = new B(), t4 = new R({ name: "a-frame-dynamic-feature-map", fragments: [e] }).inherit(_.scope(this));
    try {
      await this.call(C4.Map, t4), t4.destroy();
    } catch (r8) {
      throw t4.destroy(), new E2({ title: E2.MappingFailed, description: `Failed to map feature workflow: ${r8 instanceof Error ? r8.message : String(r8)}` });
    }
  }
  hydrateFromGeneration(e, t4) {
    this._definition = e, this._mapResult = null, this._history.push(new l2({ version: this._version, timestamp: Date.now(), reason: `Generated for: "${this.prompt}"`, encoded: Buffer.from(JSON.stringify(this._stripEmbeddings(e))).toString("base64"), delta: e.steps.length }));
  }
  hydrateFromPatch(e, t4, r8) {
    let a4 = this._definition?.steps.length ?? 0;
    this._definition = e, this._mapResult = null, this._version++, this._history.push(new l2({ version: this._version, timestamp: Date.now(), reason: t4, encoded: Buffer.from(JSON.stringify(this._stripEmbeddings(e))).toString("base64"), delta: e.steps.length - a4 }));
  }
  hydrateFromMap(e) {
    this._mapResult = e;
  }
  toJSON() {
    return { ...super.toJSON(), name: this.prompt, description: `DynamicFeature with ${this._definition?.steps.length ?? 0} steps and ${this._history.length} patches`, metadata: { model: this._model, context: this._context, includeBases: this._includeBases, excludeBases: this._excludeBases, enabledComponents: this._enabledComponents, createdAt: this.createdAt }, history: this._history.map((e) => e.toJSON()) };
  }
  _stripEmbeddings(e) {
    let t4 = j2((r8) => {
      let { embedding: a4, ...n6 } = r8;
      return n6;
    }, "strip");
    return { ...e, steps: e.steps.map(t4), components: e.components.map(t4), fragments: e.fragments.map(t4), entities: e.entities.map(t4) };
  }
}, __name(_a74, "re"), _a74);
j2(re2, "A_FrameDynamicFeature");
var P3 = re2;
var _a75;
var ae = (_a75 = class extends H {
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
    let e = process.env.A_FRAME_REQUEST_TIMEOUT, t4 = e ? parseInt(e, 10) : NaN;
    return isNaN(t4) ? 12e4 : t4;
  }
}, __name(_a75, "ae"), _a75);
j2(ae, "A_FrameEnv");
var f3 = ae;
var _a76;
var l3 = (_a76 = class extends O {
  async generate(e) {
    let t4 = new c2("POST", "/api/v1/completions", { prompt: e, max_tokens: 512 }), r8 = new R({ name: "A_FrameChannel.generate", fragments: [t4] }).inherit(_.scope(this));
    try {
      return await this.call(d3.Request, r8), r8.destroy(), t4;
    } catch (a4) {
      throw r8.destroy(), new s3({ title: s3.RequestFailed, description: `Failed to generate completion: ${a4 instanceof Error ? a4.message : String(a4)}` });
    }
  }
  async embed(e, t4) {
    let r8 = new c2("POST", "/api/v1/embeddings", { input: e, ...t4?.model && { model: t4.model }, ...t4?.task && { task: t4.task } }), a4 = new R({ name: "A_FrameChannel.embed", fragments: [r8] }).inherit(_.scope(this));
    try {
      return await this.call(d3.Request, a4), a4.destroy(), r8;
    } catch (n6) {
      throw a4.destroy(), new s3({ title: s3.RequestFailed, description: `Failed to embed input: ${n6 instanceof Error ? n6.message : String(n6)}` });
    }
  }
  async getCredentials() {
    let e = new c2("GET", "/api/v1/credentials/me"), t4 = new R({ name: "A_FrameChannel.getCredentials", fragments: [e] }).inherit(_.scope(this));
    try {
      return await this.call(d3.Request, t4), t4.destroy(), e;
    } catch (r8) {
      throw t4.destroy(), new s3({ title: s3.RequestFailed, description: `Failed to get credentials: ${r8 instanceof Error ? r8.message : String(r8)}` });
    }
  }
  async ping() {
    let e = new c2("GET", "/health"), t4 = new R({ name: "A_FrameChannel.ping", fragments: [e] }).inherit(_.scope(this));
    try {
      return await this.call(d3.Request, t4), t4.destroy(), e;
    } catch {
      return t4.destroy(), e;
    }
  }
  async embedDefinition(e, t4) {
    let r8 = new c2("POST", "/api/v1/definition/embed", { definition: e.toJSON(), model: e.requestedModel }), a4 = new R({ name: "A_FrameChannel.embedDefinition", fragments: [r8] }).inherit(_.scope(this));
    try {
      await this.call(d3.Request, a4), a4.destroy();
      let n6 = r8.response;
      if (!n6.data || !n6.data[0] || !n6.data[0].embedding) throw new s3({ title: s3.InvalidRequest, description: `Invalid embedding response for definition "${e.name}"` });
      let o3 = new Float32Array(n6.data[0].embedding);
      e.hydrateFromEmbedding(o3, { model: n6.model, dimensions: n6.meta.dimensions, inputCount: n6.meta.input_count, aFrameServerVersion: n6.meta.server_version, aFrameVersion: t4.A_FRAME_VERSION, credentialId: n6.meta.credential_id, date: n6.date, aFrameMeta: n6.aFrameMeta });
    } catch (n6) {
      throw new s3({ title: s3.RequestFailed, description: `Failed to embed definition "${e.name}": ${n6 instanceof Error ? n6.message : String(n6)}` });
    }
  }
  async embedNamespace(e, t4) {
    let r8 = new c2("POST", "/api/v1/namespace/embed", { namespace: e.toJSON(), model: e.requestedModel }), a4 = new R({ name: "A_FrameChannel.embedNamespace", fragments: [r8] }).inherit(_.scope(this));
    try {
      await this.call(d3.Request, a4), a4.destroy();
      let n6 = r8.response;
      if (!n6.data || !n6.data[0] || !n6.data[0].embedding) throw new s3({ title: s3.InvalidRequest, description: `Invalid embedding response for namespace "${e.name}"` });
      let o3 = new Float32Array(n6.data[0].embedding);
      e.hydrateFromEmbedding(o3, { model: n6.model, dimensions: n6.meta.dimensions, inputCount: n6.meta.input_count, aFrameServerVersion: n6.meta.server_version, aFrameVersion: t4.A_FRAME_VERSION, credentialId: n6.meta.credential_id, date: n6.date });
    } catch (n6) {
      throw new s3({ title: s3.RequestFailed, description: `Failed to embed namespace "${e.name}": ${n6 instanceof Error ? n6.message : String(n6)}` });
    }
  }
  async embedSegment(e, t4) {
    let r8 = new c2("POST", "/api/v1/segment/embed", { segment: e.toJSON(), task: e.options?.task, model: e.options?.model }), a4 = new R({ name: "A_FrameChannel.embedNamespace", fragments: [r8] }).inherit(_.scope(this));
    try {
      await this.call(d3.Request, a4), a4.destroy();
      let n6 = r8.response;
      if (!n6.data || !n6.data[0] || !n6.data[0].embedding) throw new s3({ title: s3.InvalidRequest, description: `Error during embed a segment: ${e.content}` });
      let o3 = new Float32Array(n6.data[0].embedding), S4 = await this.extractSegmentMeta(e.content);
      e.fromJSON({ aseid: e.aseid.toString(), content: e.content, hash: e.hash, embedding: o3, model: n6.model, aFrameServerVersion: n6.meta.server_version, aFrameVersion: t4.A_FRAME_VERSION, credentialId: n6.meta.credential_id, embeddedAt: n6.date, extraction: S4 });
    } catch (n6) {
      throw new s3({ title: s3.RequestFailed, description: `Failed to embed segment with content "${e.content}": ${n6 instanceof Error ? n6.message : String(n6)}` });
    }
  }
  async extractSegmentMeta(e) {
    if (!e || e.trim().length === 0) return;
    let t4 = new s2({ prompt: e, schema: g2 }), r8 = new R({ name: "A_FrameChannel.embedSegment.meta" }).inherit(_.scope(this));
    r8.register(t4);
    try {
      await t4.extract();
      let a4 = t4.data;
      return a4 ? { summary: (a4.summary ?? "").trim(), keywords: A3(a4.keywords), topics: A3(a4.topics), extractedAt: t4.date ?? (/* @__PURE__ */ new Date()).toISOString(), model: t4.model } : void 0;
    } catch {
      return;
    } finally {
      r8.destroy();
    }
  }
  async generateDynamicStructure(e, t4) {
    let r8 = new c2("POST", "/api/v1/structure/generate", { prompt: e.prompt, model: e.modelName, context: e.contextHint, metaHint: e.metaHintValue, includeBases: e.includedBases, excludeBases: e.excludedBases, enabledComponents: e.enabledComponentsList }), a4 = new R({ name: "A_FrameChannel.generateDynamicStructure", fragments: [r8] }).inherit(_.scope(this));
    await this.call(d3.Request, a4), a4.destroy();
    let n6 = r8.response;
    e.hydrateFromGeneration(n6.definition, { model: n6.model, serverVersion: n6.meta?.server_version ?? "0.0.0" });
  }
  async patchDynamicStructure(e, t4) {
    let { instruction: r8 } = t4.params, a4 = new c2("POST", "/api/v1/structure/patch", { originalPrompt: e.prompt, definition: this._stripStructureEmbeddings(e.definition ?? { containers: [], components: [], fragments: [], entities: [] }), patchInstruction: r8, model: e.modelName, context: e.contextHint, metaHint: e.metaHintValue, includeBases: e.includedBases, excludeBases: e.excludedBases, enabledComponents: e.enabledComponentsList }), n6 = new R({ name: "A_FrameChannel.patchDynamicStructure", fragments: [a4] }).inherit(_.scope(this));
    await this.call(d3.Request, n6), n6.destroy();
    let o3 = a4.response;
    e.hydrateFromPatch(o3.definition, o3.patchSummary, { model: o3.model, serverVersion: o3.meta?.server_version ?? "0.0.0" });
  }
  _stripStructureEmbeddings(e) {
    let t4 = j2((r8) => {
      let { embedding: a4, ...n6 } = r8;
      return n6;
    }, "strip");
    return { containers: e.containers.map((r8) => ({ ...t4(r8), components: (r8.components ?? []).map(t4), fragments: (r8.fragments ?? []).map(t4), entities: (r8.entities ?? []).map(t4) })), components: e.components.map(t4), fragments: e.fragments.map(t4), entities: e.entities.map(t4) };
  }
  async generateDynamicFeature(e, t4) {
    let r8 = new c2("POST", "/api/v1/feature/generate", { prompt: e.prompt, model: e.modelName, context: e.contextHint }), a4 = new R({ name: "A_FrameChannel.generateDynamicFeature", fragments: [r8] }).inherit(_.scope(this));
    await this.call(d3.Request, a4), a4.destroy();
    let n6 = r8.response;
    e.hydrateFromGeneration(n6.definition, { model: n6.model, serverVersion: n6.meta?.server_version ?? "0.0.0" });
  }
  async patchDynamicFeature(e, t4) {
    let { instruction: r8 } = t4.params, a4 = new c2("POST", "/api/v1/feature/patch", { originalPrompt: e.prompt, definition: this._stripFeatureEmbeddings(e.definition ?? { title: "", description: "", steps: [], components: [], fragments: [], entities: [] }), patchInstruction: r8, model: e.modelName, context: e.contextHint }), n6 = new R({ name: "A_FrameChannel.patchDynamicFeature", fragments: [a4] }).inherit(_.scope(this));
    await this.call(d3.Request, n6), n6.destroy();
    let o3 = a4.response;
    e.hydrateFromPatch(o3.definition, o3.patchSummary, { model: o3.model, serverVersion: o3.meta?.server_version ?? "0.0.0" });
  }
  _stripFeatureEmbeddings(e) {
    let t4 = j2((r8) => {
      let { embedding: a4, ...n6 } = r8;
      return n6;
    }, "strip");
    return { ...e, steps: e.steps.map(t4), components: e.components.map(t4), fragments: e.fragments.map(t4), entities: e.entities.map(t4) };
  }
  async generateDynamicContent(e$1, t4) {
    let r8 = new c2("POST", "/api/v1/content/generate", { prompt: e$1.prompt, model: e$1.modelName, ...e$1.systemPrompt !== void 0 ? { system: e$1.systemPrompt } : {} }), a4 = new R({ name: "A_FrameChannel.generateDynamicContent", fragments: [r8] }).inherit(_.scope(this));
    await this.call(d3.Request, a4), a4.destroy();
    let n6 = r8.response, o3 = (n6.segments ?? []).map((S4) => {
      let b3 = new _4({ content: S4.content, options: { task: "document" } });
      return S4.embedding?.length && b3.hydrateFromEmbedding(new Float32Array(S4.embedding)), b3;
    });
    e$1.hydrateFromGeneration(o3, { model: n6.model, serverVersion: n6.meta?.server_version ?? "0.0.0" });
  }
  async patchDynamicContent(e, t4) {
    let { instruction: r8, segments: a4 } = t4.params, n6 = /* @__PURE__ */ new Map(), o3 = a4.map((g5, se2) => {
      let ie = `s${se2}`;
      return n6.set(ie, String(g5.id)), { id: ie, index: se2, text: g5.content, vector: g5.vector ? Array.from(g5.vector.values) : void 0 };
    }), S4 = new c2("POST", "/api/v1/content/patch", { prompt: e.prompt, segments: o3, instruction: r8, model: e.modelName, ...e.systemPrompt !== void 0 ? { system: e.systemPrompt } : {} }), b3 = new R({ name: "A_FrameChannel.patchDynamicContent", fragments: [S4] }).inherit(_.scope(this));
    await this.call(d3.Request, b3), b3.destroy();
    let T3 = S4.response, Ae2 = T3.operations.map((g5) => ({ ...g5, targetId: g5.targetId ? n6.get(g5.targetId) ?? g5.targetId : g5.targetId }));
    e.hydrateFromPatch({ ...T3, operations: Ae2 }, { model: T3.model, serverVersion: T3.meta?.server_version ?? "0.0.0" });
  }
  async generateCompletion(e, t4) {
    let r8 = new c2("POST", "/api/v1/completions/generate", { prompt: e.prompt, options: e.options }), a4 = new R({ name: "A_FrameChannel.generateCompletion", fragments: [r8] }).inherit(_.scope(this));
    try {
      await this.call(d3.Request, a4), a4.destroy();
      let n6 = r8.response;
      if (!n6.text) throw new s3({ title: s3.InvalidRequest, description: `Invalid completion response for prompt "${e.prompt}"` });
      e.hydrateFromGeneration({ text: n6.text, embedding: new Float32Array(n6.embedding), model: n6.model, date: n6.date, aFrameVersion: t4.A_FRAME_VERSION, aFrameServerVersion: n6.meta.server_version });
    } catch (n6) {
      throw new s3({ title: s3.RequestFailed, description: `Failed to generate completion for prompt "${e.prompt}": ${n6 instanceof Error ? n6.message : String(n6)}` });
    }
  }
  async extractSchema(e, t4) {
    let r8 = new c2("POST", "/api/v1/schema/extract", { prompt: e.prompt, schema: e.schema, options: e.options }), a4 = new R({ name: "A_FrameChannel.extractSchema", fragments: [r8] }).inherit(_.scope(this));
    try {
      await this.call(d3.Request, a4), a4.destroy();
      let n6 = r8.response;
      if (!n6.data) throw new s3({ title: s3.InvalidRequest, description: `Invalid scheme extraction response for prompt "${e.prompt}"` });
      e.hydrateFromExtraction(n6.data, { model: n6.model, date: n6.date, aFrameVersion: t4.A_FRAME_VERSION, aFrameServerVersion: n6.meta.server_version });
    } catch (n6) {
      throw new s3({ title: s3.RequestFailed, description: `Failed to extract scheme for prompt "${e.prompt}": ${n6 instanceof Error ? n6.message : String(n6)}` });
    }
  }
  async extractSchemaMultiple(e, t4) {
    let r8 = new c2("POST", "/api/v1/schema/extract-multiple", { prompt: e.prompt, schema: e.schema, options: e.options }), a4 = new R({ name: "A_FrameChannel.extractSchemaMultiple", fragments: [r8] }).inherit(_.scope(this));
    try {
      await this.call(d3.Request, a4), a4.destroy();
      let n6 = r8.response;
      if (!Array.isArray(n6.data)) throw new s3({ title: s3.InvalidRequest, description: `Invalid extract-multiple response for prompt "${e.prompt}": expected array` });
      e.hydrateFromMultipleExtraction(n6.data, { model: n6.model, date: n6.date, aFrameVersion: t4.A_FRAME_VERSION, aFrameServerVersion: n6.meta.server_version });
    } catch (n6) {
      throw new s3({ title: s3.RequestFailed, description: `Failed to extract-multiple for prompt "${e.prompt}": ${n6 instanceof Error ? n6.message : String(n6)}` });
    }
  }
}, __name(_a76, "l"), _a76);
j2(l3, "A_FrameChannel"), k2([N.Extend({ name: r4.Embed, scope: [h3] }), l(0, Yt(te)), l(1, Yt(f3))], l3.prototype, "embedDefinition", 1), k2([N.Extend({ name: m3.Embed, scope: [w2] }), l(0, Yt(te)), l(1, Yt(f3))], l3.prototype, "embedNamespace", 1), k2([N.Extend({ name: r5.Embed, scope: [_4] }), l(0, Yt(te)), l(1, Yt(f3))], l3.prototype, "embedSegment", 1), k2([N.Extend({ name: D3.Generate, scope: [O3] }), l(0, Yt(te)), l(1, Yt(v4))], l3.prototype, "generateDynamicStructure", 1), k2([N.Extend({ name: D3.Patch, scope: [O3] }), l(0, Yt(te)), l(1, Yt(v4))], l3.prototype, "patchDynamicStructure", 1), k2([N.Extend({ name: C4.Generate, scope: [P3] }), l(0, Yt(te)), l(1, Yt(w5))], l3.prototype, "generateDynamicFeature", 1), k2([N.Extend({ name: C4.Patch, scope: [P3] }), l(0, Yt(te)), l(1, Yt(w5))], l3.prototype, "patchDynamicFeature", 1), k2([N.Extend({ name: F3.Generate, scope: [w4] }), l(0, Yt(te)), l(1, Yt(f2))], l3.prototype, "generateDynamicContent", 1), k2([N.Extend({ name: F3.Patch, scope: [w4] }), l(0, Yt(te)), l(1, Yt(f2))], l3.prototype, "patchDynamicContent", 1), k2([N.Extend({ name: n4.Generate, scope: [m4] }), l(0, Yt(te)), l(1, Yt(f3))], l3.prototype, "generateCompletion", 1), k2([N.Extend({ name: r6.Extract, scope: [s2] }), l(0, Yt(te)), l(1, Yt(f3))], l3.prototype, "extractSchema", 1), k2([N.Extend({ name: r6.ExtractMultiple, scope: [s2] }), l(0, Yt(te)), l(1, Yt(f3))], l3.prototype, "extractSchemaMultiple", 1);
var Fe2 = l3;

// node_modules/@adaas/a-frame/dist/browser/chunk-P6WICUUU.mjs
var _a77;
var r7 = (_a77 = class extends Fe2 {
  async request(e, a4) {
    let R5 = `${a4.A_FRAME_SERVER_URL}${e.path}`, m7 = new AbortController(), _6 = setTimeout(() => {
      m7.abort(), e.fail(new s3({ title: s3.Timeout, description: `Request to ${e.path} timed out after 15 seconds` }));
    }, 15e3);
    try {
      let n6 = await fetch(R5, { method: e.method, headers: { "Content-Type": "application/json", Authorization: `Bearer ${a4.A_FRAME_SERVER_API_KEY}` }, body: e.body !== void 0 ? JSON.stringify(e.body) : void 0, signal: m7.signal });
      e.complete(await n6.json());
    } catch {
      e.fail(new s3({ title: s3.RequestFailed, description: `Request to ${e.path} failed or timed out` }));
    } finally {
      clearTimeout(_6);
    }
  }
}, __name(_a77, "r"), _a77);
j2(r7, "A_FrameBrowserChannel"), k2([N.Extend({ name: d3.Request, scope: [Fe2] }), l(0, Yt(c2)), l(1, Yt(R2))], r7.prototype, "request", 1);
var A5 = r7;

// node_modules/@adaas/a-frame/dist/browser/chunk-V44ZFIUA.mjs
var _a78;
var n5 = (_a78 = class extends H {
  constructor() {
    if (_a78._instance) return _a78._instance;
    super({ name: "A_FrameIndex" });
    this.definitions = /* @__PURE__ */ new Map();
    this.namespaces = /* @__PURE__ */ new Map();
    this.scope = new R({ name: "A_FrameIndexScope" });
  }
  static get instance() {
    return _a78._instance || (_a78._instance = new _a78()), _a78._instance;
  }
  static get indexSize() {
    return _a78.instance.indexSize;
  }
  static get scope() {
    return _.scope(this);
  }
  static inherit(e) {
    _a78.instance.inherit(e);
  }
  static addDefinition(e) {
    _a78.instance.addDefinition(e);
  }
  static getDefinition(e) {
    return _a78.instance.getDefinition(e);
  }
  static listDefinitions(e) {
    return _a78.instance.listDefinitions(e);
  }
  static removeDefinition(e) {
    _a78.instance.removeDefinition(e);
  }
  static addNamespace(e) {
    _a78.instance.addNamespace(e);
  }
  static getDefaultNamespace() {
    return _a78.instance.getDefaultNamespace();
  }
  static getNamespace(e) {
    return _a78.instance.getNamespace(e);
  }
  static listNamespaces() {
    return _a78.instance.listNamespaces();
  }
  static removeNamespace(e) {
    _a78.instance.removeNamespace(e);
  }
  static search(e, i6 = {}) {
    return _a78.instance.search(e, i6);
  }
  static reset() {
    if (!_a78._instance) return;
    let e = _a78._instance, i6 = Array.from(e.namespaces.values()), a4 = Array.from(e.definitions.values());
    e.scope = new R({ name: "A_FrameIndexScope" });
    for (let t4 of i6) e.scope.register(t4);
    for (let t4 of a4) e.scope.register(t4);
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
    for (let i6 of this.definitions.values()) if (i6.name === e) return i6;
  }
  listDefinitions(e = {}) {
    let i6 = e.namespace ? typeof e.namespace == "string" ? w.isASEID(e.namespace) ? new w(e.namespace).id : e.namespace : e.namespace.id : void 0, a4 = e.inherit ? Array.isArray(e.inherit) ? e.inherit : [e.inherit] : void 0;
    return [...this.definitions.values()].filter((t4) => !(i6 && t4.namespace.name !== i6 || a4 && !this.matchesInheritanceFilters(t4, a4)));
  }
  removeDefinition(e) {
    this.scope.deregister(e);
  }
  addNamespace(e) {
    this.scope.register(e), this.namespaces.set(e.id, e);
  }
  getNamespace(e) {
    let i6 = typeof e == "string" ? w.isASEID(e) ? new w(e).id : e : e.id;
    return this.namespaces.get(i6);
  }
  getDefaultNamespace() {
    let e = this.getNamespace(C2);
    return e || (e = new w2({ name: C2 }), this.addNamespace(e)), e;
  }
  listNamespaces() {
    return [...this.namespaces.values()];
  }
  removeNamespace(e) {
    this.scope.deregister(e), this.namespaces.delete(e.id);
  }
  search(e, i6 = {}) {
    let { topK: a4 = 10, namespace: t4, minScore: r8 = 0, inherit: c3 } = i6, d4 = c3 ? Array.isArray(c3) ? c3 : [c3] : void 0;
    return [...this.definitions.values()].filter((s4) => !(t4 && s4.namespace.id !== t4 || d4 && !this.matchesInheritanceFilters(s4, d4))).map((s4) => ({ record: s4, score: this.cosineSimilarity(e, s4.vector) })).filter((s4) => s4.score >= r8).sort((s4, m7) => m7.score - s4.score).slice(0, a4).map(({ record: s4, score: m7 }) => ({ record: s4, score: m7 }));
  }
  matchesInheritanceFilters(e, i6) {
    let a4 = this.scope.resolveConstructor(e.name);
    return a4 ? i6.some((t4) => {
      let r8 = t4.class;
      return t4.strict ? Object.getPrototypeOf(a4) === r8 : _.isIndexedInheritedFrom(a4, r8);
    }) : false;
  }
  cosineSimilarity(e, i6) {
    if (!i6) return 0;
    let a4 = e.dot(i6), t4 = e.magnitude() * i6.magnitude();
    return t4 === 0 ? 0 : a4 / t4;
  }
  euclideanDistance(e, i6) {
    this.assertSameLength(e, i6);
    let a4 = 0;
    for (let t4 = 0; t4 < e.length; t4++) {
      let r8 = e.values[t4] - i6.values[t4];
      a4 += r8 * r8;
    }
    return Math.sqrt(a4);
  }
  nearest(e, i6, a4 = 1) {
    return [...i6].map((t4) => ({ vector: t4, score: this.cosineSimilarity(e, t4) })).sort((t4, r8) => r8.score - t4.score).slice(0, a4).map((t4) => t4.vector);
  }
  rank(e, i6) {
    return i6.map((a4) => ({ vector: a4, score: this.cosineSimilarity(e, a4) })).sort((a4, t4) => t4.score - a4.score);
  }
  assertSameLength(e, i6) {
    if (e.length !== i6.length) throw new Error(`Embedding dimension mismatch: ${e.length} vs ${i6.length}`);
  }
}, __name(_a78, "n"), _a78);
j2(n5, "A_FrameIndex");
var h5 = n5;

// node_modules/@adaas/a-frame/dist/browser/core.mjs
var j4 = ((a4) => (a4.COMPONENT = "component", a4.ENTITY = "entity", a4.CONTAINER = "container", a4.FRAGMENT = "fragment", a4.METHOD = "method", a4))(j4 || {});
var _a79;
var M2 = (_a79 = class {
  static isAllowedTarget(e) {
    return i.isEntityConstructor(e) || i.isComponentConstructor(e) || i.isContainerConstructor(e) || i.isFragmentConstructor(e) || i.isComponentInstance(e) || i.isContainerInstance(e) || i.isEntityInstance(e) || i.isFragmentInstance(e);
  }
  static getTargetName(e) {
    return A.getComponentName(e);
  }
  static getTargetConstructor(e) {
    return typeof e == "function" ? e : e.constructor;
  }
}, __name(_a79, "M"), _a79);
j2(M2, "A_FrameTypeGuard");
var g4 = M2;
var _a80;
var p4 = (_a80 = class extends b {
}, __name(_a80, "p"), _a80);
j2(p4, "A_FrameError"), p4.InvalidTarget = "A-Frame Index Invalid Target Error", p4.InvalidConfiguration = "A-Frame Index Invalid Configuration Error", p4.IndexDefinitionError = "A-Frame Index Definition Error", p4.IndexMetadataError = "A-Frame Index Metadata Error", p4.IndexRegistryError = "A-Frame Index Registry Error", p4.IndexComponentNotFoundError = "A-Frame Index Component Not Found Error";
var m6 = p4;
function k3(n6) {
  return function(e, r8, t4) {
    let o3;
    switch (true) {
      case (!!r8 && !!t4):
        o3 = "method";
        break;
      case (i.isComponentConstructor(e) || i.isComponentInstance(e)):
        o3 = "component";
        break;
      case (i.isContainerConstructor(e) || i.isContainerInstance(e)):
        o3 = "container";
        break;
      case (i.isEntityConstructor(e) || i.isEntityInstance(e)):
        o3 = "entity";
        break;
      case (i.isFragmentConstructor(e) || i.isFragmentInstance(e)):
        o3 = "fragment";
        break;
      default:
        throw new m6(m6.InvalidTarget, `@A_Frame.Define decorator cannot be applied to the target : ${A.getComponentName(e)}. It can only be applied to classes or methods inheriting from allowed base classes.`);
    }
    let a4 = n6.namespace ? n6.namespace instanceof w2 ? n6.namespace : h5.getNamespace(n6.namespace) || new w2({ name: n6.namespace }) : h5.getDefaultNamespace();
    if (r8 && t4) {
      let c3 = e.constructor, H2 = String(r8), $2 = t4.value.toString();
      return h5.addDefinition(new h3({ name: H2, dependency: c3.name, description: n6.description, source: $2, metadata: n6.metadata, type: "method", namespace: a4 })), t4;
    }
    if (!g4.isAllowedTarget(e)) throw new m6(m6.InvalidTarget, `@A_Frame.${o3} decorator cannot be applied to the target : ${A.getComponentName(e)}. It can only be applied to allowed targets.`);
    let F4 = A.getComponentName(e), f4 = g4.getTargetConstructor(e), u2 = e.toString();
    return h5.addDefinition(new h3({ name: F4, description: n6.description, dependency: f4.name, source: u2, metadata: n6.metadata, type: o3, namespace: a4 })), e;
  };
}
__name(k3, "k");
j2(k3, "A_FrameDefineDecorator");
function B2(n6 = {}) {
  return function(e, r8, t4) {
    if (!n6.name) throw new m6(m6.InvalidConfiguration, "@A_Frame.Namespace decorator requires a name in the configuration.");
    let o3 = new w2({ name: n6.name, description: n6.description });
    h5.addNamespace(o3);
  };
}
__name(B2, "B");
j2(B2, "A_FrameNamespaceDecorator");
var _a81;
var v5 = (_a81 = class extends O {
  static Define(e) {
    return k3(e);
  }
  static NameSpace(e) {
    return B2(e);
  }
  get package() {
    return [];
  }
  packDependency(e, r8, t4) {
    e.resolve(r8) || e.register(t4);
  }
}, __name(_a81, "v"), _a81);
j2(v5, "A_FrameBase");
var P4 = v5;
var _a82;
var l4 = (_a82 = class extends P4 {
  get package() {
    return [{ ctor: v2, instance: new v2() }, { ctor: R2, instance: new R2() }, { ctor: O2, instance: new O2() }, { ctor: Y2, instance: Y2 }, { ctor: v3, instance: new v3() }, { ctor: A5, instance: A5 }];
  }
  async injectDependencies() {
    let e = _.root;
    if (this.package.forEach(({ ctor: r8, instance: t4 }) => this.packDependency(e, r8, t4)), e.resolve(E) || e.register(E.instance), !e.resolve(h5)) {
      let r8 = new h5();
      r8.inherit(e), e.register(r8);
    }
  }
  async load(e, r8, t4, o3, a4) {
    if (!t4.encryptionKey && !a4?.hasBundleData) {
      o3.warn("A_Frame (browser): no encryption key and no pre-built bundle data. Seed A_FrameBrowserStorageBlobs.fromBundle(bundle) before concept.load(), or call A_FrameContext.setCredentials({...}) for live-session mode.");
      return;
    }
    a4.bundleMeta && t4.serverVersion && a4.bundleMeta.serverVersion !== t4.serverVersion && o3.warn(`A_Frame bundle was built against server v${a4.bundleMeta.serverVersion} but the current credentials report v${t4.serverVersion}. Hydration may skip records \u2014 rebuild the bundle.`);
    let F4 = r8.listNamespaces(), f4 = r8.listDefinitions();
    await Promise.all([...F4.map((c3) => Promise.resolve(c3.load()).catch(() => {
    })), ...f4.map((c3) => Promise.resolve(c3.load()).catch(() => {
    }))]);
    let u2 = F4.filter((c3) => !c3.isEmbed).length + f4.filter((c3) => !c3.isEmbed).length;
    u2 > 0 && o3.warn(`${u2} A-Frame entit${u2 === 1 ? "y" : "ies"} could not be hydrated from the bundle. Rebuild the bundle on the Node side to include them.`);
  }
  async build(e) {
  }
  async start(e) {
  }
}, __name(_a82, "l"), _a82);
j2(l4, "A_Frame"), k2([ct.Load()], l4.prototype, "injectDependencies", 1), k2([ct.Load(), l(0, Yt(R)), l(1, Yt(h5)), l(2, Yt(v2)), l(3, Yt(v3)), l(4, Yt(E))], l4.prototype, "load", 1), k2([ct.Build(), l(0, Yt(R))], l4.prototype, "build", 1), k2([ct.Start(), l(0, Yt(R))], l4.prototype, "start", 1);
var R4 = l4;

// node_modules/@adaas/a-utils/dist/browser/chunk-ZSD77J3W.mjs
var _a83;
var A_FSPolyfillBase = (_a83 = class {
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
}, __name(_a83, "A_FSPolyfillBase"), _a83);
var _a84;
var A_FSPolyfill = (_a84 = class extends A_FSPolyfillBase {
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
}, __name(_a84, "A_FSPolyfill"), _a84);
var _a85;
var A_CryptoPolyfillBase = (_a85 = class {
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
}, __name(_a85, "A_CryptoPolyfillBase"), _a85);
var _a86;
var A_CryptoPolyfill = (_a86 = class extends A_CryptoPolyfillBase {
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
}, __name(_a86, "A_CryptoPolyfill"), _a86);
var _a87;
var A_HttpPolyfillBase = (_a87 = class {
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
}, __name(_a87, "A_HttpPolyfillBase"), _a87);
var _a88;
var A_HttpPolyfill = (_a88 = class extends A_HttpPolyfillBase {
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
}, __name(_a88, "A_HttpPolyfill"), _a88);
var _a89;
var A_HttpsPolyfillBase = (_a89 = class {
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
}, __name(_a89, "A_HttpsPolyfillBase"), _a89);
var _a90;
var A_HttpsPolyfill = (_a90 = class extends A_HttpsPolyfillBase {
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
}, __name(_a90, "A_HttpsPolyfill"), _a90);
var _a91;
var A_PathPolyfillBase = (_a91 = class {
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
}, __name(_a91, "A_PathPolyfillBase"), _a91);
var _a92;
var A_PathPolyfill = (_a92 = class extends A_PathPolyfillBase {
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
}, __name(_a92, "A_PathPolyfill"), _a92);
var _a93;
var A_UrlPolyfillBase = (_a93 = class {
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
}, __name(_a93, "A_UrlPolyfillBase"), _a93);
var _a94;
var A_UrlPolyfill = (_a94 = class extends A_UrlPolyfillBase {
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
}, __name(_a94, "A_UrlPolyfill"), _a94);
var _a95;
var A_BufferPolyfillBase = (_a95 = class {
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
}, __name(_a95, "A_BufferPolyfillBase"), _a95);
var _a96;
var A_BufferPolyfill = (_a96 = class extends A_BufferPolyfillBase {
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
}, __name(_a96, "A_BufferPolyfill"), _a96);
var _a97;
var A_ProcessPolyfillBase = (_a97 = class {
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
}, __name(_a97, "A_ProcessPolyfillBase"), _a97);
var _a98;
var A_ProcessPolyfill = (_a98 = class extends A_ProcessPolyfillBase {
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
}, __name(_a98, "A_ProcessPolyfill"), _a98);
var _a99;
var A_Polyfill = (_a99 = class extends O {
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
    if (_.environment !== "browser") return;
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
}, __name(_a99, "A_Polyfill"), _a99);
__decorateClass2([
  ct.Load()
], A_Polyfill.prototype, "load", 1);
__decorateClass2([
  ct.Load()
], A_Polyfill.prototype, "attachToWindow", 1);
A_Polyfill = __decorateClass2([
  R4.Define({
    namespace: "A-Utils",
    description: "Polyfill component that provides cross-environment compatibility for Node.js core modules such as fs, crypto, http, https, path, url, buffer, and process. It dynamically loads appropriate polyfills based on the execution environment (Node.js or browser), enabling seamless usage of these modules in different contexts."
  }),
  __decorateParam2(0, Yt("A_Logger"))
], A_Polyfill);

// node_modules/@adaas/a-utils/dist/browser/chunk-SEQJPRV7.mjs
var _a100;
var A_ExecutionContext = (_a100 = class extends H {
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
}, __name(_a100, "A_ExecutionContext"), _a100);
A_ExecutionContext = __decorateClass2([
  R4.Define({
    namespace: "A-Utils",
    description: "Execution context fragment that provides a structured way to manage metadata and serialized data for execution environments. It allows storing and retrieving key-value pairs, facilitating context-aware operations within the application. It useful in cases when it's necessary to share some runtime data across multiple steps of thee features, or components."
  })
], A_ExecutionContext);

// node_modules/@adaas/a-utils/dist/browser/chunk-SJU7LRGF.mjs
var A_CONSTANTS__CONFIG_ENV_VARIABLES_ARRAY = [];
var _a101;
var A_ConfigError = (_a101 = class extends b {
}, __name(_a101, "A_ConfigError"), _a101);
A_ConfigError.InitializationError = "A-Config Initialization Error";
var _a102;
var A_Config = (_a102 = class extends A_ExecutionContext {
  constructor(config) {
    super("a-config");
    this.DEFAULT_ALLOWED_TO_READ_PROPERTIES = [
      ...Re,
      ...A_CONSTANTS__CONFIG_ENV_VARIABLES_ARRAY
    ];
    this._strict = config.strict ?? false;
    this._configProperties = config.variables ?? [];
    for (const key in config.defaults) {
      this.set(
        P.toUpperSnakeCase(key),
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
      return super.get(P.toUpperSnakeCase(property));
    throw new A_ConfigError("Property not exists or not allowed to read");
  }
  set(property, value) {
    const array = Array.isArray(property) ? property : typeof property === "string" ? [{ property, value }] : Object.keys(property).map((key) => ({
      property: key,
      value: property[key]
    }));
    for (const { property: property2, value: value2 } of array) {
      super.set(P.toUpperSnakeCase(property2), value2);
    }
  }
}, __name(_a102, "A_Config"), _a102);
A_Config = __decorateClass2([
  R4.Define({
    namespace: "A-Utils",
    description: "Configuration management context that provides structured access to application configuration variables, supporting defaults and strict mode for enhanced reliability. Default environment variables are included for comprehensive configuration handling."
  })
], A_Config);
var _a103;
var ConfigReader = (_a103 = class extends O {
  constructor(polyfill) {
    super();
    this.polyfill = polyfill;
    this.DEFAULT_ALLOWED_TO_READ_PROPERTIES = [
      ...Re,
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
    config.set("A_CONCEPT_ROOT_FOLDER", J.A_CONCEPT_ROOT_FOLDER);
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
}, __name(_a103, "ConfigReader"), _a103);
__decorateClass2([
  ct.Load(),
  __decorateParam2(0, Yt(K)),
  __decorateParam2(1, Yt(R)),
  __decorateParam2(2, Yt(A_Config))
], ConfigReader.prototype, "attachContext", 1);
__decorateClass2([
  ct.Load(),
  __decorateParam2(0, M.Required()),
  __decorateParam2(0, Yt(A_Config))
], ConfigReader.prototype, "initialize", 1);
ConfigReader = __decorateClass2([
  R4.Define({
    namespace: "A-Utils",
    description: "Abstract component for reading configuration data from various sources such as files, environment variables, or remote services. This component can be extended to implement specific configuration reading strategies."
  }),
  __decorateParam2(0, M.Required()),
  __decorateParam2(0, Yt(A_Polyfill))
], ConfigReader);
var _a104;
var FileConfigReader = (_a104 = class extends ConfigReader {
  constructor() {
    super(...arguments);
    this.FileData = /* @__PURE__ */ new Map();
  }
  /**
   * Get the configuration property Name
   * @param property 
   */
  getConfigurationProperty_File_Alias(property) {
    return P.toCamelCase(property);
  }
  resolve(property) {
    return this.FileData.get(this.getConfigurationProperty_File_Alias(property));
  }
  async read(variables) {
    const fs = await this.polyfill.fs();
    try {
      const data = fs.readFileSync(`${_.concept}.conf.json`, "utf8");
      const config = JSON.parse(data);
      this.FileData = new Map(Object.entries(config));
      return config;
    } catch (error) {
      return {};
    }
  }
}, __name(_a104, "FileConfigReader"), _a104);
FileConfigReader = __decorateClass2([
  R4.Define({
    namespace: "A-Utils",
    description: "Configuration reader that loads configuration data from a JSON file located in the application root directory. It reads the file named after the current concept with a .conf.json extension and parses its contents into the configuration context."
  })
], FileConfigReader);
var _a105;
var ENVConfigReader = (_a105 = class extends ConfigReader {
  async readEnvFile(config, polyfill, feature) {
    const fs = await polyfill.fs();
    if (fs.existsSync(".env"))
      fs.readFileSync(`${config.get("A_CONCEPT_ROOT_FOLDER")}/.env`, "utf-8").split("\n").forEach((line) => {
        const [key, value] = line.split("=");
        if (key && value) {
          J.set(key.trim(), value.trim());
        }
      });
  }
  /**
   * Get the configuration property Name 
   * @param property 
   */
  getConfigurationProperty_ENV_Alias(property) {
    return P.toUpperSnakeCase(property);
  }
  resolve(property) {
    return J.get(this.getConfigurationProperty_ENV_Alias(property));
  }
  async read(variables = []) {
    const allVariables = [
      ...variables,
      ...J.getAllKeys()
    ];
    const config = {};
    allVariables.forEach((variable) => {
      config[variable] = this.resolve(variable);
    });
    return config;
  }
}, __name(_a105, "ENVConfigReader"), _a105);
__decorateClass2([
  ct.Load({
    before: ["ENVConfigReader.initialize"]
  }),
  __decorateParam2(0, Yt(A_Config)),
  __decorateParam2(1, Yt(A_Polyfill)),
  __decorateParam2(2, Yt(N))
], ENVConfigReader.prototype, "readEnvFile", 1);
ENVConfigReader = __decorateClass2([
  R4.Define({
    namespace: "A-Utils",
    description: "Configuration reader that sources configuration data from environment variables. It supports loading variables from a .env file and maps them to the configuration context, making it suitable for applications running in diverse environments such as local development, staging, and production."
  })
], ENVConfigReader);
var _a106;
var A_ConfigLoader = (_a106 = class extends K {
  async prepare(polyfill) {
    if (!this.scope.has(A_Config)) {
      const newConfig = new A_Config({
        variables: [
          ...Re,
          ...A_CONSTANTS__CONFIG_ENV_VARIABLES_ARRAY
        ],
        defaults: {}
      });
      this.scope.register(newConfig);
    }
    const fs = await polyfill.fs();
    try {
      switch (true) {
        case (_.environment === "server" && !!fs.existsSync(`${_.concept}.conf.json`)):
          this.reader = this.scope.resolve(FileConfigReader);
          break;
        case (_.environment === "server" && !fs.existsSync(`${_.concept}.conf.json`)):
          this.reader = this.scope.resolve(ENVConfigReader);
          break;
        case _.environment === "browser":
          this.reader = this.scope.resolve(ENVConfigReader);
          break;
        default:
          throw new A_ConfigError(
            A_ConfigError.InitializationError,
            `Environment ${_.environment} is not supported`
          );
      }
    } catch (error) {
      if (error instanceof T) {
        throw new A_ConfigError({
          title: A_ConfigError.InitializationError,
          description: `Failed to initialize A_ConfigLoader. Reader not found for environment ${_.environment}`,
          originalError: error
        });
      }
    }
  }
}, __name(_a106, "A_ConfigLoader"), _a106);
__decorateClass2([
  ct.Load({
    before: /.*/
  }),
  __decorateParam2(0, Yt(A_Polyfill))
], A_ConfigLoader.prototype, "prepare", 1);
A_ConfigLoader = __decorateClass2([
  R4.Define({
    namespace: "A-Utils",
    description: "Container responsible for loading and initializing the A_Config component based on the environment and available configuration sources. It can be useful for application that need a separated configuration management and sharable across multiple containers."
  })
], A_ConfigLoader);

// node_modules/@adaas/a-utils/dist/browser/chunk-TMI47MXH.mjs
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
var _a107;
var A_LoggerLogContext = (_a107 = class extends H {
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
}, __name(_a107, "A_LoggerLogContext"), _a107);
var _a108;
var A_Logger = (_a108 = class extends O {
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
      return N.Extend({
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
    for (let i6 = 0; i6 < str.length; i6++) {
      const char = str.charCodeAt(i6);
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
      if (_.environment === "browser") {
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
    if (_.environment === "browser") {
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
    for (let i6 = 0; i6 < word.length; i6 += maxLength) {
      chunks.push(word.slice(i6, i6 + maxLength));
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
      ...args.map((arg, i6) => {
        const shouldAddNewline = i6 > 0 || isMultiArg;
        switch (true) {
          case arg instanceof b:
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
    if (_.environment === "browser") {
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
    if (_.environment === "browser") {
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
    const isColor = typeof param1 === "string" && !!this.COLORS[param1];
    const messageArgs = isColor ? args : [param1, ...args];
    const compiled = isColor ? this.compile(param1, ...args) : this.compile(this.DEFAULT_LOG_COLOR, param1, ...args);
    console.log(...compiled);
    if (!_.hasFeature(A_LOGGER_FEATURES.onLog, this)) return;
    const callScope = new R({
      name: this.scope.name + ":debug",
      fragments: [new A_LoggerLogContext("debug", ...messageArgs)]
    }).inherit(this.scope);
    try {
      this.call(A_LOGGER_FEATURES.onLog, callScope);
    } finally {
      callScope.destroy();
    }
  }
  info(param1, ...args) {
    if (!this.shouldLog("info")) return;
    const isColor = typeof param1 === "string" && !!this.COLORS[param1];
    const messageArgs = isColor ? args : [param1, ...args];
    const compiled = isColor ? this.compile(param1, ...args) : this.compile(this.DEFAULT_LOG_COLOR, param1, ...args);
    console.log(...compiled);
    if (!_.hasFeature(A_LOGGER_FEATURES.onLog, this)) return;
    const callScope = new R({
      name: this.scope.name + ":info",
      fragments: [new A_LoggerLogContext("info", ...messageArgs)]
    }).inherit(this.scope);
    try {
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
    let compiled = this.compile("yellow", ...args);
    console.log(...compiled);
    if (!_.hasFeature(A_LOGGER_FEATURES.onLog, this)) return;
    const callScope = new R({
      name: this.scope.name + ":warning",
      fragments: [new A_LoggerLogContext("warning", ...args)]
    }).inherit(this.scope);
    try {
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
    let compiled = this.compile("red", ...args);
    console.log(...compiled);
    if (!_.hasFeature(A_LOGGER_FEATURES.onLog, this)) return;
    const callScope = new R({
      name: this.scope.name + ":error",
      fragments: [new A_LoggerLogContext("error", ...args)]
    }).inherit(this.scope);
    try {
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
   * Format A_Error instances for inline display within compiled messages.
   *
   * Aligned with the structured error-handling strategy:
   *  - Walks the FULL causal chain via `error.chain` so wrapper layers
   *    (A_FeatureError → A_StageError → user error) are all visible.
   *  - Surfaces structured A_FeatureError context (featureName, stageName,
   *    handler, component) when present.
   *  - Prints the outermost A_Error stack ONCE — it already includes a
   *    `Caused by: ...` chain appended by `A_Error.appendCausedByStack()`,
   *    so repeating per-link stacks would duplicate information.
   *  - Shows documentation link only for the outermost error.
   *
   * Visual style mirrors the legacy `log_A_Error`:
   *  - Whole block wrapped in red ANSI; section headers in bold red.
   *  - File:line:col in stack traces highlighted cyan/yellow so they're
   *    easy to spot and stay clickable in VS Code terminal.
   *  - Documentation link underlined in cyan.
   *
   * @param error - The A_Error instance to format
   * @returns Formatted string ready for display
   */
  compile_A_Error(error) {
    const RED = `${A_LOGGER_ANSI.PREFIX}31${A_LOGGER_ANSI.SUFFIX}`;
    const RED_BOLD = `${A_LOGGER_ANSI.PREFIX}1;31${A_LOGGER_ANSI.SUFFIX}`;
    const CYAN = `${A_LOGGER_ANSI.PREFIX}36${A_LOGGER_ANSI.SUFFIX}`;
    const CYAN_UNDERLINE = `${A_LOGGER_ANSI.PREFIX}4;36${A_LOGGER_ANSI.SUFFIX}`;
    const YELLOW = `${A_LOGGER_ANSI.PREFIX}33${A_LOGGER_ANSI.SUFFIX}`;
    const DIM = `${A_LOGGER_ANSI.PREFIX}2${A_LOGGER_ANSI.SUFFIX}`;
    const RESET = A_LOGGER_ANSI.RESET;
    const scopePadding = " ".repeat(this.STANDARD_SCOPE_LENGTH + 3);
    const continuationIndent = `${scopePadding}${A_LOGGER_FORMAT.PIPE}`;
    const separator = `${RED}${continuationIndent}${A_LOGGER_FORMAT.SEPARATOR}${RESET}`;
    const lines = [];
    const pushRow = /* @__PURE__ */ __name((text, color = RED) => {
      const wrapped = this.wrapText(text, continuationIndent, false);
      for (const line of wrapped) {
        lines.push(`${color}${continuationIndent}${line}${RESET}`);
      }
    }, "pushRow");
    const pushSection = /* @__PURE__ */ __name((title) => {
      lines.push(separator);
      lines.push(`${RED_BOLD}${continuationIndent}${title}${RESET}`);
      lines.push(separator);
    }, "pushSection");
    lines.push("");
    pushSection(`A_ERROR: ${error.code}`);
    pushRow(`Title       : ${error.title}`);
    pushRow(`Message     : ${error.message}`);
    pushRow(`Description : ${error.description}`);
    this.appendFeatureContext(error, pushRow);
    const chain = error.chain;
    if (chain.length > 1) {
      pushSection("CAUSED BY:");
      for (let i6 = 1; i6 < chain.length; i6++) {
        const link = chain[i6];
        if (i6 > 1) lines.push(`${RED}${continuationIndent}${RESET}`);
        if (link instanceof b) {
          pushRow(`[${i6}] ${link.constructor.name} (${link.code})`, RED_BOLD);
          pushRow(`    Title   : ${link.title}`);
          pushRow(`    Message : ${link.message}`);
          if (link.description && link.description !== link.message) {
            pushRow(`    Desc    : ${link.description}`);
          }
          this.appendFeatureContext(link, pushRow, "    ");
        } else if (link instanceof Error) {
          pushRow(`[${i6}] ${link.name}: ${link.message}`, RED_BOLD);
        } else {
          pushRow(`[${i6}] ${String(link)}`);
        }
      }
    }
    if (error.stack) {
      pushSection("STACK TRACE:");
      const stackLines = this.formatStackTrace(error.stack, continuationIndent);
      for (const line of stackLines) {
        lines.push(this.colorizeStackLine(line, { RED, RED_BOLD, CYAN, YELLOW, DIM, RESET }));
      }
    }
    if (error.link) {
      lines.push(separator);
      lines.push(`${RED}${continuationIndent}Docs: ${CYAN_UNDERLINE}${error.link}${RESET}`);
    }
    lines.push(separator);
    return lines.join("\n");
  }
  /**
   * Append structured A_FeatureError context (featureName, stageName,
   * handler, component) when the link has those fields.  Silently no-ops
   * for plain A_Error or any other subclass that doesn't expose them.
   */
  appendFeatureContext(error, pushRow, prefix = "") {
    const e = error;
    const hasContext = e.featureName || e.stageName || e.handler || e.component;
    if (!hasContext) return;
    if (e.featureName) pushRow(`${prefix}Feature   : ${e.featureName}`);
    if (e.stageName) pushRow(`${prefix}Stage     : ${e.stageName}`);
    if (e.component) pushRow(`${prefix}Component : ${e.component}`);
    if (e.handler) pushRow(`${prefix}Handler   : ${e.handler}`);
  }
  /**
   * Colorize one stack-trace line:
   *  - "Caused by:" header lines in bold red (preserves the chain visual).
   *  - File locations (path:line:col) in cyan/yellow so they pop out and
   *    stay clickable in VS Code's terminal.
   *  - Everything else in red.
   *
   * The input line is the already-padded/wrapped output of
   * `formatStackTrace` (starts with the scope padding + PIPE).
   */
  colorizeStackLine(line, c3) {
    const locRegex = /(\(?)([^()\s:]+\.(?:ts|tsx|js|jsx|mjs|cjs)):(\d+):(\d+)(\)?)/g;
    const colorized = line.replace(
      locRegex,
      (_6, openP, file, ln, col, closeP) => `${openP}${c3.CYAN}${file}${c3.RESET}${c3.RED}:${c3.YELLOW}${ln}${c3.RED}:${c3.YELLOW}${col}${c3.RED}${closeP}`
    );
    const baseColor = /caused by:/i.test(line) ? c3.RED_BOLD : c3.RED;
    return `${baseColor}${colorized}${c3.RESET}`;
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
}, __name(_a108, "A_Logger"), _a108);
A_Logger = __decorateClass2([
  R4.Define({
    namespace: "A-Utils",
    description: "Advanced Logging Component with Scope-based Output Formatting that provides color-coded console output, multi-type support, and configurable log levels for enhanced debugging and monitoring."
  }),
  __decorateParam2(0, Yt(R)),
  __decorateParam2(1, Yt(A_Config))
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
var _a109;
var A_UtilsHelper = (_a109 = class extends O {
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
      const entries = Array.from(value.entries()).map(([k4, v6]) => `${A_UtilsHelper.serialize(k4)}=>${A_UtilsHelper.serialize(v6)}`).sort().join(",");
      return `Map{${entries}}`;
    }
    if (value instanceof Set) {
      const items = Array.from(value.values()).map((v6) => A_UtilsHelper.serialize(v6)).sort().join(",");
      return `Set{${items}}`;
    }
    if (value instanceof Date) {
      return `Date:${value.toISOString()}`;
    }
    if (value instanceof RegExp) {
      return `RegExp:${value.toString()}`;
    }
    if (Array.isArray(value)) {
      const items = value.map((v6) => A_UtilsHelper.serialize(v6)).join(",");
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
    for (let i6 = 0; i6 < input.length; i6++) {
      h1 ^= input.charCodeAt(i6);
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
}, __name(_a109, "A_UtilsHelper"), _a109);
__decorateClass2([
  R4.Define({
    description: "Instance method wrapper for the static hash function, allowing it to be injected as a dependency."
  }),
  __decorateParam2(0, Yt(te)),
  __decorateParam2(1, Yt(A_ExecutionContext)),
  __decorateParam2(2, Yt(N))
], A_UtilsHelper.prototype, "hash", 1);
__decorateClass2([
  R4.Define({
    description: "Instance method wrapper for the static serialize function, allowing it to be injected as a dependency."
  }),
  __decorateParam2(0, Yt(te)),
  __decorateParam2(1, Yt(A_ExecutionContext)),
  __decorateParam2(2, Yt(N))
], A_UtilsHelper.prototype, "serialize", 1);
__decorateClass2([
  R4.Define({
    description: "Instance method wrapper for the static setByPath function, allowing it to be injected as a dependency."
  }),
  __decorateParam2(0, Yt(te)),
  __decorateParam2(1, Yt(A_ExecutionContext)),
  __decorateParam2(2, Yt(N))
], A_UtilsHelper.prototype, "setByPath", 1);
__decorateClass2([
  R4.Define({
    description: "Instance method wrapper for the static getByPath function, allowing it to be injected as a dependency."
  }),
  __decorateParam2(0, Yt(te)),
  __decorateParam2(1, Yt(A_ExecutionContext)),
  __decorateParam2(2, Yt(N))
], A_UtilsHelper.prototype, "getByPath", 1);
A_UtilsHelper = __decorateClass2([
  R4.Define({
    namespace: "A-Utils",
    description: "Utility helper class providing common functions for A-Utils library, such as hashing and serialization."
  })
], A_UtilsHelper);

// node_modules/@adaas/a-utils/dist/browser/a-signal.mjs
var _a110;
var A_Signal = (_a110 = class extends D {
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
}, __name(_a110, "A_Signal"), _a110);
A_Signal = __decorateClass2([
  R4.Define({
    namespace: "A-Utils",
    description: "A Signal Entity represents an individual signal instance that carries data, used for managing state within an application context. Signals are designed to reflect the current state rather than individual events, making them suitable for scenarios where state monitoring and real-time updates are essential."
  })
], A_Signal);
var _a111;
var A_SignalVector = (_a111 = class extends D {
  constructor(param1, param2) {
    if ("aseid" in param1) {
      super(param1);
    } else {
      super({
        structure: param2 ? param2 : param1.map((s4) => s4.constructor),
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
    return this._structure || this._signals.map((s4) => s4.constructor);
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
      const signalIndex = this._signals.findIndex((s4) => s4.constructor === signalConstructor);
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
    for (let i6 = 0; i6 < this.structure.length; i6++) {
      const thisSignalConstructor = this.structure[i6];
      const otherSignalConstructor = other.structure[i6];
      if (thisSignalConstructor !== otherSignalConstructor) {
        return false;
      }
      const thisSignalIndex = this._signals.findIndex((s4) => s4.constructor === thisSignalConstructor);
      const otherSignalIndex = other._signals.findIndex((s4) => s4.constructor === otherSignalConstructor);
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
    for (let i6 = 0; i6 < this.length; i6++) {
      const thisSignalConstructor = this.structure[i6];
      const otherSignalConstructor = other.structure[i6];
      if (thisSignalConstructor !== otherSignalConstructor) {
        return false;
      }
      const thisSignalIndex = this._signals.findIndex((s4) => s4.constructor === thisSignalConstructor);
      const otherSignalIndex = other._signals.findIndex((s4) => s4.constructor === otherSignalConstructor);
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
   * Matching is data-aware: for every signal in `other`, there must be a signal in this vector with the
   * same constructor type whose data satisfies the comparison (via `conditionSignal.compare(incomingSignal)`).
   *
   * e.g. [UserSignInSignal, UserStatusSignal] includes [UserStatusSignal] with the same data,
   * but not [UserStatusSignal] with different data or [UserActivitySignal].
   *
   * An optional `comparator` can be provided to override the per-signal `compare()` call, enabling
   * externally controlled matching strategies (e.g. loose / strict / custom route matchers).
   *
   * @param other       The vector whose signals must all be present in this one.
   * @param comparator  Optional custom function: (incoming, condition) => boolean.
   *                    Receives the incoming signal first so that symmetric usage is intuitive.
   *                    Defaults to `conditionSignal.compare(incomingSignal)`.
   */
  includes(other, comparator) {
    for (const condSignal of other) {
      if (!condSignal) continue;
      const found = this._signals.some((incomingSignal) => {
        if (!incomingSignal) return false;
        if (incomingSignal.constructor !== condSignal.constructor) return false;
        return comparator ? comparator(incomingSignal, condSignal) : condSignal.compare(incomingSignal);
      });
      if (!found) return false;
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
      const signalIndex = this._signals.findIndex((s4) => s4.constructor === signalConstructor);
      if (signalIndex === -1) {
        return false;
      }
    }
    return true;
  }
  has(param1) {
    let signalConstructor;
    if (i.isEntityInstance(param1)) {
      signalConstructor = param1.constructor;
    } else {
      signalConstructor = param1;
    }
    return this.structure.includes(signalConstructor);
  }
  get(param1) {
    let signalConstructor;
    if (param1 instanceof D) {
      signalConstructor = param1.constructor;
    } else {
      signalConstructor = param1;
    }
    const index = this._signals.findIndex((s4) => s4.constructor === signalConstructor);
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
      const signalIndex = this._signals.findIndex((s4) => s4.constructor === signalConstructor);
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
      const signalIndex = this._signals.findIndex((s4) => s4.constructor === signalConstructor);
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
      const signalIndex = this._signals.findIndex((s4) => s4.constructor === signalConstructor);
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
      structure: this.structure.map((s4) => s4.name),
      values: this._signals.map((s4) => s4.toJSON())
    };
  }
}, __name(_a111, "A_SignalVector"), _a111);
A_SignalVector = __decorateClass2([
  R4.Define({
    namespace: "A-Utils",
    description: "A Signal Vector Entity represents a collection of signals structured in a specific way, allowing for batch processing and transmission of related signals as a unified state representation."
  })
], A_SignalVector);
var _a112;
var A_SignalState = (_a112 = class extends H {
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
}, __name(_a112, "A_SignalState"), _a112);
A_SignalState = __decorateClass2([
  R4.Define({
    namespace: "A-Utils",
    description: "Manages the latest state of all signals within a given scope, maintaining a mapping between signal constructors and their most recently emitted values."
  })
], A_SignalState);
var _a113;
var A_SignalConfig = (_a113 = class extends H {
  get structure() {
    if (this._structure) {
      return this._structure;
    }
    const scope = _.scope(this);
    const constructors = [...scope.allowedEntities].filter((e) => A.isInheritedFrom(e, A_Signal)).sort((a4, b3) => a4.constructor.name.localeCompare(b3.name)).map((s4) => scope.resolveConstructor(s4.name));
    return constructors.filter((s4) => s4);
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
      const stringStructure = this._config.stringStructure.split(",").map((s4) => s4.trim());
      this._structure = stringStructure.map((name) => _.scope(this).resolveConstructor(name)).filter((s4) => s4);
    }
  }
}, __name(_a113, "A_SignalConfig"), _a113);
A_SignalConfig = __decorateClass2([
  R4.Define({
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
var _a114;
var A_SignalBusError = (_a114 = class extends b {
}, __name(_a114, "A_SignalBusError"), _a114);
A_SignalBusError.SignalProcessingError = "Signal processing error";
var _a115;
var _b;
var _c;
var _a116;
var A_SignalBus = (_a116 = class extends O {
  async next(...signals) {
    const scope = new R({
      name: `A_SignalBus-Next-Scope`,
      entities: signals
    }).inherit(_.scope(this));
    try {
      await this.call("_A_SignalBusFeatures_onBeforeNext", _.scope(this));
      await this.call("_A_SignalBusFeatures_onNext", scope);
      scope.destroy();
    } catch (error) {
      let wrappedError;
      switch (true) {
        case error instanceof A_SignalBusError:
          wrappedError = error;
          break;
        case (error instanceof b && error.originalError instanceof A_SignalBusError):
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
    const componentContext = _.scope(this);
    if (!config) {
      const entries = componentContext.allowedEntities.entries();
      const signalTypes = Array.from(entries).filter(([_6, entity]) => A.isInheritedFrom(entity, A_Signal)).map(([ctor, _6]) => ctor);
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
    _a115 = "_A_SignalBusFeatures_onNext"
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
}, __name(_a116, "A_SignalBus"), _a116);
__decorateClass2([
  R4.Define({
    description: "Emit multiple signals through the signal bus."
  })
], A_SignalBus.prototype, "next", 1);
__decorateClass2([
  N.Extend({
    before: /.*/
  }),
  __decorateParam2(0, Yt(b)),
  __decorateParam2(1, Yt(A_Logger))
], A_SignalBus.prototype, _c, 1);
__decorateClass2([
  N.Extend({
    scope: [A_SignalBus],
    before: /.*/
  }),
  __decorateParam2(0, Yt(R)),
  __decorateParam2(1, Yt(A_Config)),
  __decorateParam2(2, Yt(A_SignalState)),
  __decorateParam2(3, Yt(A_Logger)),
  __decorateParam2(4, Yt(A_SignalConfig))
], A_SignalBus.prototype, _b, 1);
__decorateClass2([
  N.Extend({
    scope: [A_SignalBus],
    before: /.*/
  }),
  __decorateParam2(0, M.Flat()),
  __decorateParam2(0, M.All()),
  __decorateParam2(0, Yt(A_Signal)),
  __decorateParam2(1, Yt(R)),
  __decorateParam2(2, M.Required()),
  __decorateParam2(2, Yt(A_SignalState)),
  __decorateParam2(3, Yt(A_Config)),
  __decorateParam2(4, Yt(A_Logger)),
  __decorateParam2(5, Yt(A_SignalConfig))
], A_SignalBus.prototype, _a115, 1);
A_SignalBus = __decorateClass2([
  R4.Define({
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
var _a117;
var A_Service_Error = (_a117 = class extends b {
}, __name(_a117, "A_Service_Error"), _a117);
A_Service_Error.ServiceLoadError = "Service load error";
A_Service_Error.ServiceStartError = "Service start error";
A_Service_Error.ServiceStopError = "Service stop error";
var _a118;
var _b2;
var _c2;
var _d;
var _e2;
var _f;
var _g;
var _h;
var _i;
var _j;
var _a119;
var A_Service = (_a119 = class extends K {
  static get onBeforeLoad() {
    return (target, propertyKey, descriptor) => {
      return N.Extend({
        name: "_A_Service_onBeforeLoad",
        scope: [A_Service]
      })(target, propertyKey, descriptor);
    };
  }
  static get onLoad() {
    return (target, propertyKey, descriptor) => {
      return N.Extend({
        name: "_A_Service_onLoad",
        scope: [A_Service]
      })(target, propertyKey, descriptor);
    };
  }
  static get onAfterLoad() {
    return (target, propertyKey, descriptor) => {
      return N.Extend({
        name: "_A_Service_onAfterLoad",
        scope: [A_Service]
      })(target, propertyKey, descriptor);
    };
  }
  static get onBeforeStart() {
    return (target, propertyKey, descriptor) => {
      return N.Extend({
        name: "_A_Service_onBeforeStart",
        scope: [A_Service]
      })(target, propertyKey, descriptor);
    };
  }
  static get onStart() {
    return (target, propertyKey, descriptor) => {
      return N.Extend({
        name: "_A_Service_onStart",
        scope: [A_Service]
      })(target, propertyKey, descriptor);
    };
  }
  static get onAfterStart() {
    return (target, propertyKey, descriptor) => {
      return N.Extend({
        name: "_A_Service_onAfterStart",
        scope: [A_Service]
      })(target, propertyKey, descriptor);
    };
  }
  static get onBeforeStop() {
    return (target, propertyKey, descriptor) => {
      return N.Extend({
        name: "_A_Service_onBeforeStop",
        scope: [A_Service]
      })(target, propertyKey, descriptor);
    };
  }
  static get onStop() {
    return (target, propertyKey, descriptor) => {
      return N.Extend({
        name: "_A_Service_onStop",
        scope: [A_Service]
      })(target, propertyKey, descriptor);
    };
  }
  static get onAfterStop() {
    return (target, propertyKey, descriptor) => {
      return N.Extend({
        name: "_A_Service_onAfterStop",
        scope: [A_Service]
      })(target, propertyKey, descriptor);
    };
  }
  static get onError() {
    return (target, propertyKey, descriptor) => {
      return N.Extend({
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
        case (error instanceof b && error.originalError instanceof A_Service_Error):
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
        case (error instanceof b && error.originalError instanceof A_Service_Error):
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
        case (error instanceof b && error.originalError instanceof A_Service_Error):
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
    _a118 = "_A_Service_onError"
    /* onError */
  ](error, logger, ...args) {
    logger?.error(error);
  }
}, __name(_a119, "A_Service"), _a119);
__decorateClass2([
  ct.Load()
], A_Service.prototype, "load", 1);
__decorateClass2([
  ct.Start()
], A_Service.prototype, "start", 1);
__decorateClass2([
  ct.Stop()
], A_Service.prototype, "stop", 1);
__decorateClass2([
  N.Extend(),
  __decorateParam2(0, Yt(A_Polyfill))
], A_Service.prototype, _j, 1);
__decorateClass2([
  N.Extend()
], A_Service.prototype, _i, 1);
__decorateClass2([
  N.Extend()
], A_Service.prototype, _h, 1);
__decorateClass2([
  N.Extend()
], A_Service.prototype, _g, 1);
__decorateClass2([
  N.Extend()
], A_Service.prototype, _f, 1);
__decorateClass2([
  N.Extend()
], A_Service.prototype, _e2, 1);
__decorateClass2([
  N.Extend()
], A_Service.prototype, _d, 1);
__decorateClass2([
  N.Extend()
], A_Service.prototype, _c2, 1);
__decorateClass2([
  N.Extend()
], A_Service.prototype, _b2, 1);
__decorateClass2([
  N.Extend({
    before: /.*/
  }),
  __decorateParam2(0, Yt(b)),
  __decorateParam2(1, Yt(A_Logger))
], A_Service.prototype, _a118, 1);
A_Service = __decorateClass2([
  R4.Define({
    namespace: "A-Utils",
    description: "Service container that manages the lifecycle of various types of services, such as HTTP servers and workers or UI loader. It dynamically loads necessary components based on the provided configuration and orchestrates the start and stop processes, ensuring proper error handling and extensibility through feature hooks."
  })
], A_Service);

// node_modules/@adaas/a-utils/dist/browser/a-route.mjs
var _a120;
var A_Route = (_a120 = class extends H {
  constructor(url) {
    super();
    this.url = url instanceof RegExp ? url.source : url;
  }
  /**
   * Returns path only without query and hash
   */
  get path() {
    const p5 = this.url.split("?")[0].split("#")[0];
    if (p5.includes("://")) {
      const pathStartIndex = p5.indexOf("/", p5.indexOf("://") + 3);
      if (pathStartIndex === -1) {
        return "/";
      } else {
        const path = p5.slice(pathStartIndex);
        return path.endsWith("/") ? path.slice(0, -1) : path;
      }
    }
    return p5.endsWith("/") ? p5.slice(0, -1) : p5;
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
    for (let i6 = 0; i6 < maskSegments.length; i6++) {
      const maskSegment = maskSegments[i6];
      const urlSegment = urlSegments[i6];
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
}, __name(_a120, "A_Route"), _a120);
A_Route = __decorateClass2([
  R4.Define({
    namespace: "A-Utils",
    description: "Route fragment that defines URL patterns for routing purposes. It supports dynamic parameters and query extraction, allowing for flexible route definitions. This fragment can be used in routing systems to match incoming URLs against defined routes and extract relevant parameters and query strings."
  })
], A_Route);

// node_modules/@adaas/are/dist/browser/index.mjs
var __defProp3 = Object.defineProperty;
var __getOwnPropDesc3 = Object.getOwnPropertyDescriptor;
var __decorateClass3 = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc3(target, key) : target;
  for (var i6 = decorators.length - 1, decorator; i6 >= 0; i6--)
    if (decorator = decorators[i6])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp3(target, key, result);
  return result;
}, "__decorateClass");
var __decorateParam3 = /* @__PURE__ */ __name((index, decorator) => (target, key) => decorator(target, key, index), "__decorateParam");
var _a121;
var AreContext = (_a121 = class extends A_ExecutionContext {
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
    return _.scope(this);
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
    this._roots = this._roots.filter((r8) => r8.aseid.toString() !== node.aseid.toString());
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
}, __name(_a121, "AreContext"), _a121);
AreContext = __decorateClass3([
  R4.Define({
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
function AreSignalFeatureKey(ctor) {
  const key = ctor.entity || ctor.name;
  return `${AreFeatures.onSignal}:${key}`;
}
__name(AreSignalFeatureKey, "AreSignalFeatureKey");
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
var _a122;
var AreInstruction = (_a122 = class extends D {
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
    return _.scope(this).issuer();
  }
  fromNew(newEntity) {
    this.aseid = this.generateASEID({
      // shard: newEntity.node.id,
      entity: P.toKebabCase(newEntity.name)
      // id: id,
    });
    this._name = newEntity.name;
    this._payload = newEntity.payload;
    this._group = newEntity.group?.aseid.toString();
    this._parent = newEntity.parent?.aseid.toString();
  }
  fromUndefined() {
    throw new b({
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
}, __name(_a122, "AreInstruction"), _a122);
AreInstruction = __decorateClass3([
  R4.Define({
    namespace: "A-ARE",
    description: "AreInstruction is the base entity for all rendering instructions in the ARE framework. It represents a serializable, reversible operation (such as creating or mutating a DOM element) that can be applied to and tracked within the AreScene, enabling deterministic rendering and undo/redo capabilities."
  })
], AreInstruction);
var _a123;
var AreDeclaration = (_a123 = class extends AreInstruction {
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
}, __name(_a123, "AreDeclaration"), _a123);
AreDeclaration = __decorateClass3([
  R4.Define({
    namespace: "A-ARE",
    description: "AreDeclaration is a top-level rendering instruction that represents the creation of a new element in the ARE scene. It carries the target tag name and parent reference needed by the Host to construct the DOM element, and can be applied or reverted to manage element creation and removal deterministically."
  })
], AreDeclaration);
var _a124;
var AreSceneError = (_a124 = class extends b {
}, __name(_a124, "AreSceneError"), _a124);
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
var _a125;
var AreInstructionError = (_a125 = class extends b {
}, __name(_a125, "AreInstructionError"), _a125);
var _a126;
var AreMutation = (_a126 = class extends AreInstruction {
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
}, __name(_a126, "AreMutation"), _a126);
AreMutation = __decorateClass3([
  R4.Define({
    namespace: "A-ARE",
    description: "AreMutation is a rendering instruction that represents a reversible change applied to an existing declaration node in the ARE scene \u2014 such as updating an attribute, modifying content, or altering child structure. It references a parent AreDeclaration and is grouped with related mutations for coordinated apply and revert operations."
  })
], AreMutation);
var AreSceneStatuses = {
  Active: "active",
  Inactive: "inactive",
  Destroyed: "destroyed"
};
var _a127;
var AreScene = (_a127 = class extends H {
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
    return _.scope(this);
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
    return this.scope.resolve(new M(AreDeclaration, {
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
    return this.scope.resolve(new M(AreMutation, {
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
    const toApply = this.planned.filter((i6) => !this.isApplied(i6));
    const toRevert = this.applied.filter((i6) => !this.isInPlan(i6));
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
      const dependentInstructions = this.scope.resolve(new M(AreMutation, {
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
    const beforeIndex = this._plan.findIndex((i6) => i6.aseid.toString() === beforeInstruction.aseid.toString());
    const instructionIndex = this._plan.findIndex((i6) => i6.aseid.toString() === instruction.aseid.toString());
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
    const afterIndex = this._plan.findIndex((i6) => i6.aseid.toString() === afterInstruction.aseid.toString());
    const instructionIndex = this._plan.findIndex((i6) => i6.aseid.toString() === instruction.aseid.toString());
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
    this._plan = this._plan.filter((i6) => i6.aseid.toString() !== instruction.aseid.toString());
  }
  /**
   * Checks if the instruction is already in the plan, so it will be rendered in the next render cycle.
   * 
   * @param instruction 
   * @returns 
   */
  getPlanned(instruction) {
    const found = this._plan.find((i6) => i6.aseid.toString() === instruction.aseid.toString());
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
    this._state = this._state.filter((i6) => i6.aseid.toString() !== instruction.aseid.toString());
  }
  /**
   * Checks if the instruction is already in the state, so it is currently applied to the scene.
   * 
   * @param instruction 
   * @returns 
   */
  getApplied(instruction) {
    const found = this._state.find((i6) => i6.aseid.toString() === instruction.aseid.toString());
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
}, __name(_a127, "AreScene"), _a127);
AreScene = __decorateClass3([
  R4.Define({
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
var _a128;
var AreAttribute = (_a128 = class extends D {
  static get concept() {
    return "are";
  }
  /**
   * The scope where the attribute is defined, which can be used to access other entities and features within the same scope. This is particularly useful for attributes that need to interact with other parts of the scene or component, as it allows them to access shared data and functionality without needing to pass it explicitly through parameters.
   */
  get scope() {
    return _.scope(this);
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
}, __name(_a128, "AreAttribute"), _a128);
__decorateClass3([
  R4.Define({
    description: "Compile the attribute. This method should transform attribute details into a set of SceneInstructions. It may also modify attribute value, since this field is editable during runtime."
  })
], AreAttribute.prototype, "compile", 1);
AreAttribute = __decorateClass3([
  R4.Define({
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
var _a129;
var AreNode = (_a129 = class extends D {
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
      this._scope = _.allocate(this, new R({ name: `${this.aseid.id}-scope` }));
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
    return this.scope.resolve(P.toPascalCase(this.aseid.entity));
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
    const context = this.scope.resolve(AreContext);
    context?.startPerformance("Node Mount");
    this.call(AreNodeFeatures.onBeforeMount, this.scope);
    const onMount = this.call(AreNodeFeatures.onMount, this.scope);
    if (onMount && typeof onMount.then === "function") {
      return onMount.then(() => {
        this.call(AreNodeFeatures.onAfterMount, this.scope);
        context?.endPerformance("Node Mount");
      });
    }
    this.call(AreNodeFeatures.onAfterMount, this.scope);
    context?.endPerformance("Node Mount");
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
    _.deallocate(currentScope);
    const newNode = new this.constructor({
      opening: this._opening,
      closing: this._closing,
      position: this._position,
      payload: this._payload || {},
      content: this._content,
      raw: this._markup
    });
    if (newNode._scope)
      _.deallocate(newNode._scope);
    newNode._scope = currentScope;
    _.allocate(newNode, currentScope);
    this._scope = _.allocate(this);
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
    const eventScope = i.isScopeInstance(eventOrScope) ? eventOrScope.inherit(this.scope) : new R({
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
      attachedScope = _.scope(this);
    } catch (error) {
      throw new b({
        title: `A_UI_Node Scope Inheritance Error`,
        description: `The A_UI_Node entity with ASEID '${this.aseid.toString()}' is not bound to any context scope. Please ensure that the entity is created within a valid context.`,
        originalError: error
      });
    }
  }
}, __name(_a129, "AreNode"), _a129);
AreNode = __decorateClass3([
  R4.Define({
    namespace: "A-ARE",
    description: "An AreNode entity represents a node within the A-Concept Rendering Engine (ARE) framework. It encapsulates content, markup, and styles, and manages its own scope for nested fragments and entities. AreNodes are responsible for handling events, compiling, rendering, updating, and lifecycle management within the ARE context."
  })
], AreNode);
var _a130;
var AreEvent = (_a130 = class extends A_ExecutionContext {
}, __name(_a130, "AreEvent"), _a130);
AreEvent = __decorateClass3([
  R4.Define({
    namespace: "A-ARE",
    description: "Event context for managing events within the A-Concept Rendering Engine (ARE) framework, encapsulating event data and associated nodes to facilitate event-driven interactions."
  })
], AreEvent);
var _a131;
var AreSignalsMeta = (_a131 = class extends z {
  /**
   * Registers a condition vector for a component.
   *
   * @param component The component constructor to render when the condition matches.
   * @param vector    The signal vector that activates the component.
   * @param root      Optional root id. When provided, the condition only
   *                  applies to the outlet with that id (per-root targeting).
   *                  When omitted, the condition applies to ALL roots — this
   *                  is the original, root-agnostic behavior.
   */
  registerCondition(component, vector, root) {
    if (root) {
      const rootScopedConditions = this.get("rootScopedConditions") || /* @__PURE__ */ new Map();
      if (!rootScopedConditions.has(root)) {
        rootScopedConditions.set(root, /* @__PURE__ */ new Map());
      }
      rootScopedConditions.get(root).set(vector, component);
      this.set("rootScopedConditions", rootScopedConditions);
      return;
    }
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
  /**
   * Finds the best registered component whose condition vector matches the
   * provided signal vector.
   *
   * An optional `allowed` set restricts the search to specific component
   * constructors — used by outlets that maintain a pool of admissible
   * components. This prevents a globally-registered component from another
   * outlet (whose condition happens to match the same signals) from being
   * returned and then rejected by the caller, which would otherwise mask a
   * lower-priority but pool-eligible match.
   *
   * @param vector   The incoming signal vector.
   * @param allowed  Optional set/array of component constructors to consider.
   *                 When omitted, every registered component is eligible.
   * @param root     Optional root id. When provided, conditions registered
   *                 specifically for that root (via `@Are.Condition(vector,
   *                 { root })`) are considered FIRST and take priority over
   *                 global, root-agnostic conditions. Conditions scoped to a
   *                 DIFFERENT root are never returned here.
   */
  findComponentByVector(vector, allowed, root) {
    if (!vector) return void 0;
    const allowedSet = allowed ? allowed instanceof Set ? allowed : new Set(allowed) : void 0;
    const isAllowed = /* @__PURE__ */ __name((component) => !allowedSet || allowedSet.has(component), "isAllowed");
    if (root) {
      const rootScoped = this.get("rootScopedConditions")?.get(root);
      if (rootScoped) {
        const match = this.matchInMap(rootScoped, vector, isAllowed);
        if (match) return match;
      }
    }
    const vectorToComponent = this.get("vectorToComponent");
    if (vectorToComponent) {
      return this.matchInMap(vectorToComponent, vector, isAllowed);
    }
    return void 0;
  }
  /**
   * Resolves the best component from a vector→component map using the
   * three-tier priority shared by all condition matching:
   *   1. Simple identity lookup (same vector instance).
   *   2. Full equivalence (`vector.equals`).
   *   3. Logical match (`vector.match`, order-independent).
   *   4. Inclusion (`vector.includes`, provided vector is a subset).
   */
  matchInMap(map, vector, isAllowed) {
    const direct = map.get(vector);
    if (direct && isAllowed(direct)) {
      return direct;
    }
    for (const [registeredVector, component] of map.entries()) {
      if (isAllowed(component) && vector.equals(registeredVector)) {
        return component;
      }
    }
    for (const [registeredVector, component] of map.entries()) {
      if (isAllowed(component) && vector.match(registeredVector)) {
        return component;
      }
    }
    for (const [registeredVector, component] of map.entries()) {
      if (isAllowed(component) && vector.includes(registeredVector)) {
        return component;
      }
    }
    return void 0;
  }
}, __name(_a131, "AreSignalsMeta"), _a131);
var _a132;
var AreSignalsContext = (_a132 = class extends H {
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
    const signalsMeta = _.meta(AreSignals);
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
    if (!vector) return void 0;
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
}, __name(_a132, "AreSignalsContext"), _a132);
AreSignalsContext = __decorateClass3([
  R4.Define({
    namespace: "A-ARE",
    description: "AreSignalsContext is a fragment that manages the set of root nodes subscribed to the signal bus. It tracks which Are components should receive signal vectors from AreSignals and provides the subscriber registry used during signal dispatch."
  })
], AreSignalsContext);
var _a133;
var AreSignals = (_a133 = class extends O {
  async handleSignalVector(vector, context, state, scope, logger) {
    logger?.debug(`Handling Signal Vector with ${context.subscribers.size} root nodes.`, vector);
    try {
      for (const root of context.subscribers) {
        const callScope = new R({
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
        const dispatchedSignals = scope.resolveFlatAll(A_Signal);
        for (const signal of dispatchedSignals) {
          if (!signal) continue;
          const ctor = signal.constructor;
          const typedFeatureName = AreSignalFeatureKey(ctor);
          const typedScope = new R({
            fragments: [new AreEvent(typedFeatureName, {
              vector,
              signal
            })]
          }).import(scope, root.scope);
          await root.emit(typedScope);
          typedScope.destroy();
        }
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
    const context = _.scope(this).resolve(AreContext);
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
    const context = _.scope(this).resolve(AreContext);
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
}, __name(_a133, "AreSignals"), _a133);
__decorateClass3([
  N.Extend({
    name: A_SignalBusFeatures.onNext
  }),
  __decorateParam3(0, Yt(A_SignalVector)),
  __decorateParam3(1, Yt(AreSignalsContext)),
  __decorateParam3(2, Yt(A_SignalState)),
  __decorateParam3(3, Yt(R)),
  __decorateParam3(4, Yt(A_Logger))
], AreSignals.prototype, "handleSignalVector", 1);
__decorateClass3([
  N.Extend({
    name: AreNodeFeatures.onEmit,
    scope: [AreNode]
  }),
  __decorateParam3(0, Yt(te)),
  __decorateParam3(1, Yt(R)),
  __decorateParam3(2, Yt(AreEvent)),
  __decorateParam3(3, Yt(N)),
  __decorateParam3(4, Yt(A_Logger))
], AreSignals.prototype, "propagateEvent", 1);
AreSignals = __decorateClass3([
  R4.Define({
    namespace: "A-ARE",
    description: "AreSignals is the central signal bus component within the ARE framework. It listens for incoming signal vectors and dispatches them to all subscribed root nodes, enabling reactive, event-driven rendering and lifecycle management across the component tree."
  }),
  m.Define(AreSignalsMeta)
], AreSignals);
var _a134;
var AreMeta = (_a134 = class extends z {
}, __name(_a134, "AreMeta"), _a134);
var _a135;
var Are = (_a135 = class extends O {
  constructor() {
    super(...arguments);
    this.props = {};
  }
  static Condition(signals, options) {
    return function(target) {
      const componentMeta = _.meta(target);
      const signalsMeta = _.meta(AreSignals);
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
        signalsMeta.registerCondition(target, vector, options?.root);
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
      return N.Extend({
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
      return N.Extend({
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
      return N.Extend({
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
      return N.Extend({
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
      return N.Extend({
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
      return N.Extend({
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
      return N.Extend({
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
      return N.Extend({
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
      return N.Extend({
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
      return N.Extend({
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
      return N.Extend({
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
      return N.Extend({
        name: AreFeatures.onData,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    };
  }
  static Signal(...args) {
    if (args.length >= 3 && typeof args[1] === "string") {
      const [target, propertyKey, descriptor] = args;
      return N.Extend({
        name: AreFeatures.onSignal,
        scope: [target.constructor]
      })(target, propertyKey, descriptor);
    }
    const ctor = args[0];
    const featureName = AreSignalFeatureKey(ctor);
    return function(target, propertyKey, descriptor) {
      return N.Extend({
        name: featureName,
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
}, __name(_a135, "Are"), _a135);
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
  R4.Define({
    namespace: "A-ARE",
    description: "Base component class for A-Concept Rendering Engine (ARE) components. It provides lifecycle decorators and methods for defining templates, styles, and data, facilitating the creation of dynamic and interactive UI components within the ARE framework."
  }),
  m.Define(AreMeta)
], Are);
var _a136;
var AreSyntax = (_a136 = class extends H {
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
      (a4, b3) => (b3.priority ?? 0) - (a4.priority ?? 0)
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
      has: /* @__PURE__ */ __name((_6, key) => {
        if (typeof key === "string" && this.BLOCKED_GLOBALS.has(key)) return false;
        return true;
      }, "has"),
      get: /* @__PURE__ */ __name((_6, key) => {
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
}, __name(_a136, "AreSyntax"), _a136);
AreSyntax = __decorateClass3([
  R4.Define({
    namespace: "A-ARE",
    description: "Context that defines the syntax rules and structures for the A-Concept Rendering Engine (ARE). It provides mechanisms for parsing and interpreting templates, attributes, directives, interpolations, and event listeners, enabling dynamic and interactive UI rendering within the ARE framework."
  })
], AreSyntax);
var _a137;
var AreCompiler = (_a137 = class extends O {
  static Compile(param1) {
    return (target, propertyKey, descriptor) => {
      return N.Extend({
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
      for (let i6 = 0; i6 < node.attributes.length; i6++) {
        const attribute = node.attributes[i6];
        attribute.compile();
      }
      if (node.children && node.children.length > 0) {
        for (let i6 = 0; i6 < node.children.length; i6++) {
          const child = node.children[i6];
          child.compile();
        }
      }
    } catch (error) {
      logger?.error(error);
    }
  }
}, __name(_a137, "AreCompiler"), _a137);
__decorateClass3([
  N.Extend({
    name: AreNodeFeatures.onCompile,
    scope: [AreNode]
  }),
  __decorateParam3(0, Yt(te)),
  __decorateParam3(1, Yt(AreScene)),
  __decorateParam3(2, Yt(A_Logger))
], AreCompiler.prototype, "compile", 1);
AreCompiler = __decorateClass3([
  R4.Define({
    namespace: "A-ARE",
    description: "Walks the transformed AreNode tree and emits a Scene. Translates each node, binding, directive and interpolation into a typed instruction. Knows nothing about the DOM or any rendering target \u2014 its only concern is producing a complete and ordered set of instructions that fully describes how the tree should be rendered."
  })
], AreCompiler);
var _a138;
var AreTransformer = (_a138 = class extends O {
  transform(node, scope, scene, ...args) {
    const queue = [node];
    while (queue.length > 0) {
      const current = queue.shift();
      for (let i6 = 0; i6 < current.attributes.length; i6++) {
        const attribute = current.attributes[i6];
        attribute.transform();
      }
      queue.push(...current.children);
    }
  }
}, __name(_a138, "AreTransformer"), _a138);
__decorateClass3([
  N.Extend({
    name: AreNodeFeatures.onTransform,
    scope: [AreNode]
  }),
  __decorateParam3(0, Yt(te)),
  __decorateParam3(1, Yt(R)),
  __decorateParam3(2, Yt(AreScene))
], AreTransformer.prototype, "transform", 1);
AreTransformer = __decorateClass3([
  R4.Define({
    namespace: "A-ARE",
    description: "Reshapes the AreNode tree before compilation without changing its abstraction level. Responsible for structural rewrites that would complicate the compiler if left unhandled \u2014 converting $for nodes into AreGroupNode, extracting AreText and AreInterpolation from raw text, sorting directives via TopologicalSorter, and flagging static nodes."
  })
], AreTransformer);
var _a139;
var AreLoader = (_a139 = class extends O {
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
    await Promise.all(node.children.map((childNode) => childNode.load()));
  }
}, __name(_a139, "AreLoader"), _a139);
__decorateClass3([
  N.Extend({
    name: be.LOAD,
    scope: [AreNode]
  }),
  __decorateParam3(0, Yt(te)),
  __decorateParam3(1, Yt(R)),
  __decorateParam3(2, Yt(N)),
  __decorateParam3(3, Yt(A_Logger)),
  __decorateParam3(4, Yt(AreContext))
], AreLoader.prototype, "load", 1);
AreLoader = __decorateClass3([
  R4.Define({
    namespace: "A-ARE",
    description: "Entry point of the pipeline. Accepts a raw template string and orchestrates the initial processing by delegating to Syntax. Returns a structured AreNode tree ready for transformation. Knows nothing about the template content or grammar rules."
  })
], AreLoader);
var AreStoreAreComponentMetaKeys = {
  StoreExtensions: "_AreStore_StoreExtensions"
};
var _a140;
var AreStore = (_a140 = class extends A_ExecutionContext {
  constructor(aseid) {
    super(aseid.toString());
    this.dependencies = /* @__PURE__ */ new Map();
    this.watcherPaths = /* @__PURE__ */ new Map();
    this._keys = /* @__PURE__ */ new Set();
    this._batchDepth = 0;
    this._pendingNotify = /* @__PURE__ */ new Set();
  }
  /**
   * Allows to define a pure function that will be executed in the context of the store, so it can access the store's data and methods, but it won't have access to the component's scope or other features. This can be useful for example for defining a function that will update the store's data based on some logic, without having access to the component's scope or other features, so we can keep the store's logic separate from the component's logic.
   */
  static get Function() {
    return (target, propertyKey, descriptor) => {
      const targetMeta = _.meta(target.constructor);
      const originalMethod = descriptor.value;
      const allExtensions = targetMeta.get(AreStoreAreComponentMetaKeys.StoreExtensions) || {};
      allExtensions[propertyKey] = originalMethod;
      targetMeta.set(AreStoreAreComponentMetaKeys.StoreExtensions, allExtensions);
      return descriptor;
    };
  }
  get owner() {
    return _.scope(this).issuer();
  }
  get parent() {
    return this.owner.parent?.scope.resolve(AreStore);
  }
  get context() {
    return _.scope(this).resolve(AreContext);
  }
  get watchers() {
    return this.context.get("watchers") || /* @__PURE__ */ new Set();
  }
  get keys() {
    return this._keys;
  }
  watch(instruction, reevaluate = false) {
    if (reevaluate) {
      this.pruneWatcher(instruction);
    }
    const watchers = this.context.get("watchers") || /* @__PURE__ */ new Set();
    watchers.add(instruction);
    this.context.set("watchers", watchers);
  }
  unwatch(instruction) {
    const watchers = this.context.get("watchers") || /* @__PURE__ */ new Set();
    watchers.delete(instruction);
    this.context.set("watchers", watchers);
  }
  /**
   * Remove a key (or nested path) from the store and notify every watcher
   * registered against that path — same ancestor/descendant matching rules
   * as {@link set}. Falls through to `A_ExecutionContext.drop()` for the
   * underlying meta cleanup so dependent renders re-evaluate against the
   * now-missing value.
   */
  drop(key) {
    const [firstPart, ...pathPart] = String(key).split(".");
    if (pathPart.length === 0) {
      this._keys.delete(firstPart);
      super.drop(firstPart);
    } else {
      const primaryObject = super.get(firstPart);
      if (primaryObject && typeof primaryObject === "object") {
        const result = A_UtilsHelper.setBypath(primaryObject, pathPart.join("."), void 0);
        super.set(firstPart, result ? result[firstPart] : primaryObject);
      }
    }
    this.dispatch(this.collectAffected(String(key)));
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
        this.watchers.forEach((watcher) => {
          this.dependencies.get(normAncestor).add(watcher);
          let paths = this.watcherPaths.get(watcher);
          if (!paths) {
            paths = /* @__PURE__ */ new Set();
            this.watcherPaths.set(watcher, paths);
          }
          paths.add(normAncestor);
        });
      }
    }
    const primaryObject = super.get(firstPart);
    const value = A_UtilsHelper.getByPath(primaryObject, pathPart.join("."));
    return value;
  }
  setAsObject(values) {
    const entires = Object.entries(values);
    const affected = /* @__PURE__ */ new Set();
    for (const [key, value] of entires) {
      this._keys.add(key);
      super.set(key, value);
      for (const watcher of this.collectAffected(String(key))) {
        affected.add(watcher);
      }
    }
    this.dispatch(affected);
    return this;
  }
  setAsKeyValue(key, value) {
    const [firstPart, ...pathPart] = String(key).split(".");
    this._keys.add(firstPart);
    const primaryObject = super.get(firstPart);
    const result = A_UtilsHelper.setBypath(primaryObject, pathPart.join("."), value);
    super.set(firstPart, result ? result[firstPart] : value);
    this.dispatch(this.collectAffected(String(key)));
    return this;
  }
  /**
   * Force a re-notification of every registered watcher, bypassing the
   * usual key/path dependency tracking. Useful when external state
   * (entities, lists, services) has mutated in place and the store
   * has no way to detect the change through `set()`.
   *
   * If `key` is provided, only watchers registered against that key
   * (or any of its ancestor/descendant paths — same rules as `set()`)
   * are notified.
   */
  forceUpdate(key) {
    if (key === void 0) {
      const all = /* @__PURE__ */ new Set();
      for (const instructions of this.dependencies.values()) {
        for (const watcher of instructions) all.add(watcher);
      }
      this.dispatch(all);
      return this;
    }
    this.dispatch(this.collectAffected(String(key)));
    return this;
  }
  /**
   * Runs `fn` with notifications deferred: every watcher affected by writes
   * performed inside `fn` is collected and notified exactly once when the
   * outermost batch completes. Nested `batch()` calls are coalesced into the
   * outermost flush. Use this to wrap a burst of `set()`/`drop()` calls that
   * logically belong together so each dependent renders only once (#4).
   */
  batch(fn) {
    this._batchDepth++;
    try {
      fn();
    } finally {
      this._batchDepth--;
      if (this._batchDepth === 0 && this._pendingNotify.size > 0) {
        const pending = this._pendingNotify;
        this._pendingNotify = /* @__PURE__ */ new Set();
        this.notify(pending);
      }
    }
    return this;
  }
  /**
   * Builds the deduplicated set of watchers affected by a change to
   * `changedKey`, using the same exact/descendant/ancestor path matching as
   * `set()`. Returning a single union Set guarantees each watcher appears at
   * most once regardless of how many of its registered paths matched (#3).
   */
  collectAffected(changedKey) {
    const normChanged = this.normalizePath(String(changedKey));
    const prefix = normChanged + ".";
    const affected = /* @__PURE__ */ new Set();
    for (const [normRegistered, instructions] of this.dependencies) {
      if (normRegistered === normChanged || // exact
      normRegistered.startsWith(prefix) || // descendant
      normChanged.startsWith(normRegistered + ".")) {
        for (const instruction of instructions) affected.add(instruction);
      }
    }
    return affected;
  }
  /**
   * Notifies the given watchers now, or defers them to the batch flush when a
   * `batch()` is active. The incoming set is already deduplicated by
   * {@link collectAffected}.
   */
  dispatch(affected) {
    if (affected.size === 0) return;
    if (this._batchDepth > 0) {
      for (const watcher of affected) this._pendingNotify.add(watcher);
      return;
    }
    this.notify(affected);
  }
  /**
   * Removes a watcher from every dependency set it holds on THIS store (and,
   * best-effort, on ancestor stores reached via parent delegation in
   * `get()`), clearing the matching reverse-index entries. Called at the
   * start of each tracking window so a re-evaluating watcher does not keep
   * stale subscriptions (#5).
   */
  pruneWatcher(instruction) {
    const paths = this.watcherPaths.get(instruction);
    if (paths) {
      for (const path of paths) {
        const set = this.dependencies.get(path);
        if (set) {
          set.delete(instruction);
          if (set.size === 0) this.dependencies.delete(path);
        }
      }
      this.watcherPaths.delete(instruction);
    }
    try {
      this.parent?.pruneWatcher(instruction);
    } catch {
    }
  }
  /**
   * Notifies instructions — immediately or deferred if inside a batch.
   *
   * A failing watcher is isolated so one bad `update()` cannot abort the rest
   * of the flush, but the error is surfaced (no longer swallowed silently) so
   * render-time failures are diagnosable. Logger resolution is best-effort and
   * confined to this cold error path.
   */
  notify(instructions) {
    for (const instruction of instructions) {
      try {
        instruction.update();
      } catch (error) {
        try {
          const logger = _.scope(this).resolve(A_Logger);
          logger?.error(error);
        } catch {
          console.error("[AreStore] watcher update failed:", error);
        }
      }
    }
  }
  /**
   * Removes an instruction from all dependency sets on this store, clearing
   * its reverse-index entry and any pending batched notification. Called when
   * an instruction is reverted/destroyed so a torn-down node's watcher can
   * never be re-notified by a later `set()` (#1).
   */
  unregister(instruction) {
    for (const [path, instructions] of this.dependencies) {
      instructions.delete(instruction);
      if (instructions.size === 0) this.dependencies.delete(path);
    }
    this.watcherPaths.delete(instruction);
    this._pendingNotify.delete(instruction);
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
    for (let i6 = 0; i6 < parts.length; i6++) {
      const part = parts[i6];
      const isIndex = /^\d+$/.test(part);
      if (i6 === 0) {
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
    const targetMeta = _.meta(component);
    const allExtensions = targetMeta.get(AreStoreAreComponentMetaKeys.StoreExtensions) || {};
    this.set(allExtensions);
  }
}, __name(_a140, "AreStore"), _a140);
AreStore = __decorateClass3([
  R4.Define({
    namespace: "A-ARE",
    description: "Runtime data store scoped to an AreNode. Holds interpolation values, dynamic data bindings, and any per-node state that components need to read or write during rendering. Can be injected into directives, attributes, and lifecycle handlers to share mutable data across the render pipeline without exposing it globally."
  })
], AreStore);
var _a141;
var AreInterpreter = (_a141 = class extends O {
  /**
   * Decorator to mark a method as an instruction Apply handler for the specific instruction type. The method will be called during the render phase of the ARE component when the corresponding instruction needs to be applied. The method should contain logic to perform the necessary operations on the rendering target based on the instruction's content and context.
   * 
   * @param action 
   * @returns 
   */
  static Apply(action) {
    const name = action + AreInstructionFeatures.Apply;
    return (target, propertyKey, descriptor) => {
      return N.Extend({
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
      return N.Extend({
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
      return N.Extend({
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
      store?.watch(instruction);
      feature.chain(interpreter, instruction.name + AreInstructionFeatures.Apply, scope);
      store?.unwatch(instruction);
    } catch (error) {
      store?.unwatch(instruction);
      throw error;
    }
  }
  updateInstruction(instruction, interpreter, store, scope, feature, ...args) {
    try {
      store?.watch(instruction, true);
      feature.chain(interpreter, instruction.name + AreInstructionFeatures.Update, scope);
      store?.unwatch(instruction);
    } catch (error) {
      store?.unwatch(instruction);
      throw error;
    }
  }
  revertInstruction(instruction, interpreter, store, scope, feature, ...args) {
    try {
      feature.chain(interpreter, instruction.name + AreInstructionFeatures.Revert, scope);
      store?.unregister(instruction);
    } catch (error) {
      store?.unregister(instruction);
      throw error;
    }
  }
}, __name(_a141, "AreInterpreter"), _a141);
__decorateClass3([
  N.Extend({
    name: AreNodeFeatures.onInterpret,
    scope: [AreNode]
  }),
  __decorateParam3(0, Yt(AreScene))
], AreInterpreter.prototype, "interpret", 1);
__decorateClass3([
  N.Extend({
    name: AreInstructionFeatures.Apply,
    scope: [AreInstruction]
  }),
  __decorateParam3(0, Yt(te)),
  __decorateParam3(1, Yt(AreInterpreter)),
  __decorateParam3(2, Yt(AreStore)),
  __decorateParam3(3, Yt(R)),
  __decorateParam3(4, Yt(N))
], AreInterpreter.prototype, "applyInstruction", 1);
__decorateClass3([
  N.Extend({
    name: AreInstructionFeatures.Update,
    scope: [AreInstruction]
  }),
  __decorateParam3(0, Yt(te)),
  __decorateParam3(1, Yt(AreInterpreter)),
  __decorateParam3(2, Yt(AreStore)),
  __decorateParam3(3, Yt(R)),
  __decorateParam3(4, Yt(N))
], AreInterpreter.prototype, "updateInstruction", 1);
__decorateClass3([
  N.Extend({
    name: AreInstructionFeatures.Revert,
    scope: [AreInstruction]
  }),
  __decorateParam3(0, Yt(te)),
  __decorateParam3(1, Yt(AreInterpreter)),
  __decorateParam3(2, Yt(AreStore)),
  __decorateParam3(3, Yt(R)),
  __decorateParam3(4, Yt(N))
], AreInterpreter.prototype, "revertInstruction", 1);
AreInterpreter = __decorateClass3([
  R4.Define({
    namespace: "A-ARE",
    description: "Stateless executor that reads the Scene and translates its instructions into operations on a rendering target. Computes the diff between applied and planned, calls revert on removed instructions and apply on added ones. Owns no state of its own \u2014 all state lives in the Scene. Can be swapped for any target implementation (DOMInterpreter, SSRInterpreter, CanvasInterpreter) without touching any other part of the pipeline."
  })
], AreInterpreter);
var _a142;
var AreEngineError = (_a142 = class extends b {
}, __name(_a142, "AreEngineError"), _a142);
AreEngineError.MissedRequiredDependency = "A Required Dependency is missing in AreEngine";
var _a143;
var AreLifecycle = (_a143 = class extends O {
  static Init(param1) {
    return (target, propertyKey, descriptor) => {
      return N.Extend({
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
      for (let i6 = applied.length - 1; i6 >= 0; i6--) {
        const instruction = applied[i6];
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
}, __name(_a143, "AreLifecycle"), _a143);
__decorateClass3([
  N.Extend({
    name: AreNodeFeatures.onBeforeInit,
    before: /.*/,
    scope: [AreNode]
  }),
  __decorateParam3(0, Yt(te)),
  __decorateParam3(1, Yt(R)),
  __decorateParam3(2, Yt(AreScene)),
  __decorateParam3(3, Yt(N))
], AreLifecycle.prototype, "beforeInit", 1);
__decorateClass3([
  N.Extend({
    name: AreNodeFeatures.onInit,
    scope: [AreNode]
  }),
  __decorateParam3(0, Yt(te)),
  __decorateParam3(1, Yt(R)),
  __decorateParam3(2, Yt(AreContext)),
  __decorateParam3(3, Yt(A_Logger))
], AreLifecycle.prototype, "init", 1);
__decorateClass3([
  N.Extend({
    name: AreNodeFeatures.onAfterInit,
    after: /.*/,
    scope: [AreNode]
  }),
  __decorateParam3(0, Yt(te)),
  __decorateParam3(1, Yt(R)),
  __decorateParam3(2, Yt(AreScene)),
  __decorateParam3(3, Yt(N))
], AreLifecycle.prototype, "afterInit", 1);
__decorateClass3([
  N.Extend({
    name: AreNodeFeatures.onBeforeMount,
    before: /.*/,
    scope: [AreNode]
  }),
  __decorateParam3(0, Yt(te)),
  __decorateParam3(1, Yt(R)),
  __decorateParam3(2, Yt(AreScene)),
  __decorateParam3(3, Yt(N))
], AreLifecycle.prototype, "beforeMount", 1);
__decorateClass3([
  N.Extend({
    name: AreNodeFeatures.onMount,
    scope: [AreNode]
  }),
  __decorateParam3(0, Yt(te)),
  __decorateParam3(1, Yt(AreScene)),
  __decorateParam3(2, Yt(A_Logger))
], AreLifecycle.prototype, "mount", 1);
__decorateClass3([
  N.Extend({
    name: AreNodeFeatures.onAfterMount,
    after: /.*/,
    scope: [AreNode]
  }),
  __decorateParam3(0, Yt(te)),
  __decorateParam3(1, Yt(R)),
  __decorateParam3(2, Yt(AreScene)),
  __decorateParam3(3, Yt(N))
], AreLifecycle.prototype, "afterMount", 1);
__decorateClass3([
  N.Extend({
    name: AreNodeFeatures.onUpdate,
    before: /.*/,
    scope: [AreNode]
  }),
  __decorateParam3(0, Yt(te)),
  __decorateParam3(1, Yt(R)),
  __decorateParam3(2, Yt(AreScene)),
  __decorateParam3(3, Yt(N))
], AreLifecycle.prototype, "beforeUpdate", 1);
__decorateClass3([
  N.Extend({
    name: AreNodeFeatures.onUpdate,
    scope: [AreNode]
  }),
  __decorateParam3(0, Yt(te)),
  __decorateParam3(1, Yt(AreContext)),
  __decorateParam3(2, Yt(A_Logger))
], AreLifecycle.prototype, "update", 1);
__decorateClass3([
  N.Extend({
    name: AreNodeFeatures.onUpdate,
    after: /.*/,
    scope: [AreNode]
  }),
  __decorateParam3(0, Yt(te)),
  __decorateParam3(1, Yt(R)),
  __decorateParam3(2, Yt(AreScene)),
  __decorateParam3(3, Yt(N))
], AreLifecycle.prototype, "afterUpdate", 1);
__decorateClass3([
  N.Extend({
    name: AreNodeFeatures.onBeforeUnmount,
    before: /.*/,
    scope: [AreNode]
  }),
  __decorateParam3(0, Yt(te)),
  __decorateParam3(1, Yt(R)),
  __decorateParam3(2, Yt(AreScene)),
  __decorateParam3(3, Yt(N))
], AreLifecycle.prototype, "beforeUnmount", 1);
__decorateClass3([
  N.Extend({
    name: AreNodeFeatures.onUnmount,
    scope: [AreNode]
  }),
  __decorateParam3(0, Yt(te)),
  __decorateParam3(1, Yt(AreScene))
], AreLifecycle.prototype, "unmount", 1);
__decorateClass3([
  N.Extend({
    name: AreNodeFeatures.onAfterUnmount,
    after: /.*/,
    scope: [AreNode]
  }),
  __decorateParam3(0, Yt(te)),
  __decorateParam3(1, Yt(R)),
  __decorateParam3(2, Yt(AreScene)),
  __decorateParam3(3, Yt(N))
], AreLifecycle.prototype, "afterUnmount", 1);
__decorateClass3([
  N.Extend({
    name: AreNodeFeatures.onBeforeDestroy,
    before: /.*/,
    scope: [AreNode]
  }),
  __decorateParam3(0, Yt(te)),
  __decorateParam3(1, Yt(R)),
  __decorateParam3(2, Yt(N))
], AreLifecycle.prototype, "beforeDestroy", 1);
__decorateClass3([
  N.Extend({
    name: be.DESTROY,
    scope: [AreNode]
  }),
  __decorateParam3(0, Yt(te)),
  __decorateParam3(1, Yt(AreScene))
], AreLifecycle.prototype, "destroy", 1);
__decorateClass3([
  N.Extend({
    name: AreNodeFeatures.onAfterDestroy,
    after: /.*/,
    scope: [AreNode]
  }),
  __decorateParam3(0, Yt(te)),
  __decorateParam3(1, Yt(R)),
  __decorateParam3(2, Yt(N))
], AreLifecycle.prototype, "afterDestroy", 1);
AreLifecycle = __decorateClass3([
  R4.Define({
    namespace: "A-ARE",
    description: "Handles the lifecycle of the AreNode and related entities such as interpolations, directives, attributes, and so on. It provides lifecycle hooks for initialization, mounting, updating, and unmounting of the nodes, allowing to manage the state and behavior of the nodes throughout their lifecycle in a structured and consistent way."
  })
], AreLifecycle);
var AreEngineFeatures = {
  Load: "_AreEngine_Load",
  Build: "_AreEngine_Build",
  Execute: "_AreEngine_Execute"
};
var _a144;
var AreTokenizerError = (_a144 = class extends b {
}, __name(_a144, "AreTokenizerError"), _a144);
var _a145;
var AreTokenizer = (_a145 = class extends O {
  /**
   * Get the AreSyntax from the current scope. The AreSyntax defines the syntax rules and structures for tokenizing templates. It provides mechanisms for parsing and interpreting templates, attributes, directives, interpolations, and event listeners, enabling dynamic and interactive UI rendering within the ARE framework. If no AreSyntax is found in the scope, an error is thrown indicating that AreTokenizer requires an AreSyntax to function properly.
   */
  get config() {
    const syntax = _.scope(this).resolve(AreSyntax);
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
        const t4 = this.tryPlainText(rest, index);
        if (t4 && !(this.config.trimWhitespace && !rest.trim())) tokens.push(t4);
        break;
      }
      if (match.position > index) {
        const plain = source.slice(index, match.position);
        const t4 = this.tryPlainText(plain, index);
        if (t4) {
          if (this.config.trimWhitespace && !plain.trim()) {
            if (hasMatchBefore) {
              t4.content = " ";
              tokens.push(t4);
            }
          } else {
            tokens.push(t4);
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
      const m7 = rule.pattern.exec(slice);
      if (!m7) return null;
      return this.buildMatch(rule, m7[0], m7[0], from + m7.index, "");
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
    const rule = this.config.rules.find((r8) => !r8.opening && !r8.closing && !r8.pattern && !r8.matcher);
    if (!rule) return null;
    const match = this.buildMatch(rule, raw, raw, position, "");
    match._rule = rule;
    return match;
  }
  findRuleForMatch(match) {
    if (match._rule) return match._rule;
    return this.config.rules.find((r8) => (r8.opening ?? "") === match.opening && (r8.closing ?? "") === match.closing);
  }
}, __name(_a145, "AreTokenizer"), _a145);
__decorateClass3([
  N.Extend({
    name: AreEngineFeatures.Load
    // scope: [AreEngine]
  }),
  __decorateParam3(0, Yt(AreContext))
], AreTokenizer.prototype, "instantiate", 1);
__decorateClass3([
  N.Extend({
    name: AreNodeFeatures.onTokenize,
    scope: [AreNode]
  }),
  __decorateParam3(0, Yt(te)),
  __decorateParam3(1, Yt(AreContext)),
  __decorateParam3(2, Yt(A_Logger))
], AreTokenizer.prototype, "tokenize", 1);
AreTokenizer = __decorateClass3([
  R4.Define({
    namespace: "A-ARE",
    description: "AreTokenizer is responsible for scanning and tokenizing template source strings using the syntax rules defined in AreSyntax. It converts raw template strings into AreNode instances that represent the structured AST of the template, enabling downstream compilation and rendering within the ARE framework."
  })
], AreTokenizer);
var _a146;
var AreSignal = (_a146 = class extends A_Signal {
  static get concept() {
    return "are";
  }
}, __name(_a146, "AreSignal"), _a146);
AreSignal = __decorateClass3([
  R4.Define({
    namespace: "A-ARE",
    description: "AreSignal is the base class for all signals used within the ARE framework. It extends A_Signal to provide a typed signal entity that components can subscribe to and emit, enabling reactive communication between ARE components and driving lifecycle and rendering updates."
  })
], AreSignal);
var _a147;
var AreInit = (_a147 = class extends AreSignal {
  static default() {
    return new _a147({ data: { ready: false } });
  }
}, __name(_a147, "_AreInit"), _a147);
var _a148;
var AreEngine = (_a148 = class extends O {
  /**
   * Feature decorator for the load method, which is responsible for the initial loading phase of the engine. This method is where the engine reads the source template, tokenizes it, and prepares the initial context for building the scene. The decorator allows for extending or overriding the default loading behavior by attaching additional functionality before or after the load process.
   */
  static get Load() {
    return (target, propertyKey, descriptor) => {
      return N.Extend({
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
      return N.Extend({
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
      return N.Extend({
        name: AreEngineFeatures.Execute,
        scope: [target.constructor],
        override: ["defaultExecute"]
      })(target, propertyKey, descriptor);
    };
  }
  async load(scope) {
    const context = scope?.resolve(AreContext) || _.scope(this).resolve(AreContext);
    context?.startPerformance();
    await this.call(AreEngineFeatures.Load, scope || _.scope(this));
  }
  async build(scope) {
    const context = scope?.resolve(AreContext) || _.scope(this).resolve(AreContext);
    context?.startPerformance("Build Total");
    await this.call(AreEngineFeatures.Build, scope || _.scope(this));
    context?.endPerformance("Build Total");
  }
  async execute(scope) {
    const context = scope?.resolve(AreContext) || _.scope(this).resolve(AreContext);
    context?.startPerformance("Execute Total");
    await this.call(AreEngineFeatures.Execute, scope || _.scope(this));
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
      await root.mount();
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
    const thisName = A.getComponentName(this);
    const scopeIssuerName = A.getComponentName(scope.issuer());
    const dependencyName = A.getComponentName(dependency);
    if (existed) {
      logger?.debug("cyan", `Dependency ${dependencyName} already exists in ${scopeIssuerName} scope. Skipping injection.`);
      return existed;
    } else {
      logger?.debug("cyan", `Injecting ${dependencyName} into ${scopeIssuerName} scope for ${thisName}...`);
      scope.register(dependency);
      return dependency;
    }
  }
}, __name(_a148, "AreEngine"), _a148);
__decorateClass3([
  R4.Define({
    description: "Method does engine loading, first read of the source and tokenization."
  })
], AreEngine.prototype, "load", 1);
__decorateClass3([
  R4.Define({
    description: "Method responsible for building the scene, which includes initializing root nodes, loading necessary data, applying transformations, and compiling the scene into a format that can be executed by the interpreter."
  })
], AreEngine.prototype, "build", 1);
__decorateClass3([
  R4.Define({
    description: "Method responsible for executing the rendering process, which involves mounting the root nodes to the DOM and starting the reactive update cycle based on signals and state changes."
  })
], AreEngine.prototype, "execute", 1);
__decorateClass3([
  N.Extend({
    name: AreEngineFeatures.Build,
    before: /.*/
  }),
  __decorateParam3(0, M.Required()),
  __decorateParam3(0, Yt(AreContext)),
  __decorateParam3(1, Yt(A_Logger))
], AreEngine.prototype, "defaultBuild", 1);
__decorateClass3([
  N.Extend({
    name: AreEngineFeatures.Execute,
    before: /.*/
  }),
  __decorateParam3(0, M.Required()),
  __decorateParam3(0, Yt(AreContext)),
  __decorateParam3(1, Yt(A_SignalBus)),
  __decorateParam3(2, Yt(A_Logger))
], AreEngine.prototype, "defaultExecute", 1);
__decorateClass3([
  N.Extend({
    name: AreEngineFeatures.Load,
    before: /.*/
  }),
  __decorateParam3(0, Yt(R))
], AreEngine.prototype, "init", 1);
__decorateClass3([
  N.Extend({
    name: AreEngineFeatures.Load,
    before: /.*/
  }),
  __decorateParam3(0, Yt(R)),
  __decorateParam3(1, Yt(AreSyntax)),
  __decorateParam3(2, Yt(AreSyntax)),
  __decorateParam3(3, Yt(AreTransformer)),
  __decorateParam3(4, Yt(AreLoader)),
  __decorateParam3(5, Yt(AreCompiler)),
  __decorateParam3(6, Yt(AreInterpreter)),
  __decorateParam3(7, Yt(AreLifecycle)),
  __decorateParam3(8, Yt(A_Logger))
], AreEngine.prototype, "verify", 1);
__decorateClass3([
  R4.Define({
    description: "Method to pack all necessary dependencies for the engine. This method is called during the initialization phase of the engine and ensures that all required components are registered in the container scope, allowing for proper dependency injection and management throughout the engine's lifecycle."
  })
], AreEngine.prototype, "package", 1);
AreEngine = __decorateClass3([
  R4.Define({
    namespace: "A-ARE",
    description: "Core rendering engine for A-Concept Rendering Engine (ARE), responsible for orchestrating the loading, building, and execution of the rendering process. It manages the lifecycle of root nodes, coordinates the interactions between syntax, transformer, loader, compiler, and interpreter components, and ensures the proper initialization and mounting of the UI application."
  })
], AreEngine);
var _a149;
var AreWatcher = (_a149 = class extends O {
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
}, __name(_a149, "AreWatcher"), _a149);
__decorateClass3([
  ct.Stop()
], AreWatcher.prototype, "destroy", 1);
AreWatcher = __decorateClass3([
  R4.Define({
    namespace: "A-ARE",
    description: "Abstract base component that observes external changes and emits A_Signals to drive reactive updates within the ARE pipeline. Subclasses override init() to set up initial state and watch() to begin observing \u2014 for example, polling a data source, listening to DOM events, or subscribing to a store \u2014 and call the appropriate signal methods to notify the engine when a re-render is needed."
  })
], AreWatcher);
var _a150;
var _a151;
var AreContainer = (_a151 = class extends A_Service {
  async [_a150 = A_ServiceFeatures.onStart](engine, context, watchers, logger) {
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
}, __name(_a151, "AreContainer"), _a151);
__decorateClass3([
  N.Extend(),
  __decorateParam3(0, M.Required()),
  __decorateParam3(0, Yt(AreEngine)),
  __decorateParam3(1, M.Required()),
  __decorateParam3(1, Yt(AreContext)),
  __decorateParam3(2, M.All()),
  __decorateParam3(2, M.Flat()),
  __decorateParam3(2, Yt(AreWatcher)),
  __decorateParam3(3, Yt(A_Logger))
], AreContainer.prototype, _a150, 1);
var _a152;
var AreSyntaxError = (_a152 = class extends b {
}, __name(_a152, "AreSyntaxError"), _a152);
AreSyntaxError.SyntaxParseError = "Are Syntax Parse Error";
AreSyntaxError.SyntaxNotSupportedError = "Are Syntax Not Supported Error";
AreSyntaxError.MethodNotImplementedError = "Are Syntax Method Not Implemented Error";
var _a153;
var AreCompilerError = (_a153 = class extends b {
}, __name(_a153, "AreCompilerError"), _a153);
AreCompilerError.RenderError = "Are Compiler Render Error";
AreCompilerError.CompilationError = "Are Compiler Compilation Error";
var _a154;
var AreInterpreterError = (_a154 = class extends b {
}, __name(_a154, "AreInterpreterError"), _a154);
var _a155;
var AreLifecycleError = (_a155 = class extends b {
}, __name(_a155, "AreLifecycleError"), _a155);
AreLifecycleError.InvalidLifecycleMethod = "Invalid lifecycle method. Lifecycle method must be one of the following: onBeforeLoad, onLoad, onUpdate, onDestroy.";
var _a156;
var AreLoaderError = (_a156 = class extends b {
}, __name(_a156, "AreLoaderError"), _a156);
AreLoaderError.SyntaxError = "Are Loader Syntax Error";
AreLoaderError.EmptyTemplateError = "Are Loader Empty Template Error";

// src/lib/AreHTMLAttribute/AreHTML.attribute.ts
var AreHTMLAttribute = class extends AreAttribute {
  get owner() {
    return this.scope.issuer();
  }
};
__name(AreHTMLAttribute, "AreHTMLAttribute");
AreHTMLAttribute = __decorateClass([
  R4.Define({
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
  R4.Define({
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
    const component = this.scope.resolve(`AreDirective${P.toPascalCase(this.name)}`);
    return component;
  }
};
__name(AreDirectiveAttribute, "AreDirectiveAttribute");
AreDirectiveAttribute = __decorateClass([
  R4.Define({
    namespace: "a-are-html",
    description: "Attribute type for directive invocations ($ prefix). Carries the resolved directive component class and a cloned template node. The associated directive uses these during its Compile phase to emit conditional or repeated instruction groups and to manage per-item or per-condition subscopes."
  })
], AreDirectiveAttribute);

// src/attributes/AreEvent.attribute.ts
var AreEventAttribute = class extends AreHTMLAttribute {
};
__name(AreEventAttribute, "AreEventAttribute");
AreEventAttribute = __decorateClass([
  R4.Define({
    namespace: "a-are-html",
    description: "Attribute type for DOM event listeners (@ prefix). Marks the attribute as an event binding \u2014 the compiler emits an AddListener instruction that attaches a handler expression resolved from the store to the specified event name on the host element."
  })
], AreEventAttribute);

// src/attributes/AreStatic.attribute.ts
var AreStaticAttribute = class extends AreHTMLAttribute {
};
__name(AreStaticAttribute, "AreStaticAttribute");
AreStaticAttribute = __decorateClass([
  R4.Define({
    namespace: "a-are-html",
    description: "Attribute type for plain static HTML attributes with no dynamic prefix. Its value is emitted verbatim via an AddAttribute instruction at compile time and does not participate in reactive update cycles."
  })
], AreStaticAttribute);

// src/lib/AreDirective/AreDirective.meta.ts
var _AreDirectiveMeta = class _AreDirectiveMeta extends z {
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
var AreDirective = class extends O {
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
      const meta = _.meta(target);
      meta.priority = priority;
      return target;
    };
  }
  /**
   * Allows to define a custom method for transforming the AreNode tree based on the directive attribute. This method is called during the transformation phase of the ARE component and should perform any necessary transformations on the AreNode tree based on the directive's content and context. This can include tasks such as adding or removing nodes, modifying node properties, or restructuring the tree to ensure that the directive is applied correctly during rendering.
   */
  static get Transform() {
    return (target, propertyKey, descriptor) => {
      return N.Extend({
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
      return N.Extend({
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
      return N.Extend({
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
    const logger = _.scope(this).resolve(A_Logger);
    if (logger) {
      logger.warning(`No transforming logic defined for directive: ${attribute.name} with content: ${attribute.content}`);
    }
  }
  compile(attribute, ...args) {
    const logger = _.scope(this).resolve(A_Logger);
    if (logger) {
      logger.warning(`No compiling logic defined for directive: ${attribute.name} with content: ${attribute.content}`);
    }
  }
  update(attribute, ...args) {
    const logger = _.scope(this).resolve(A_Logger);
    if (logger) {
      logger.warning(`No update logic defined for directive: ${attribute.name} with content: ${attribute.content}`);
    }
  }
};
__name(AreDirective, "AreDirective");
__decorateClass([
  __decorateParam(0, Yt(te))
], AreDirective.prototype, "transform", 1);
__decorateClass([
  N.Extend({
    name: AreDirectiveFeatures.Compile,
    scope: [AreDirective]
  }),
  __decorateParam(0, Yt(te))
], AreDirective.prototype, "compile", 1);
__decorateClass([
  N.Extend({
    name: AreDirectiveFeatures.Update,
    scope: [AreDirective]
  }),
  __decorateParam(0, Yt(te))
], AreDirective.prototype, "update", 1);
AreDirective = __decorateClass([
  R4.Define({
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
  AddComment: "_AreHTML_AddComment",
  AddStaticHTML: "_AreHTML_AddStaticHTML",
  HideElement: "_AreHTML_HideElement"
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
  R4.Define({
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

// src/helpers/AreScheduler.helper.ts
var _AreSchedulerHelper = class _AreSchedulerHelper {
  /**
   * High-resolution wall-clock time in milliseconds. Uses `performance.now()`
   * when available (monotonic, sub-millisecond), falling back to `Date.now()`.
   */
  static now() {
    return typeof performance !== "undefined" && typeof performance.now === "function" ? performance.now() : Date.now();
  }
  /**
   * Schedule `fn` to run on the next macrotask.
   *
   * `MessageChannel` yields a true macrotask without the ~4ms clamp that nested
   * `setTimeout(0)` calls incur, so the browser can paint between chunks with
   * minimal scheduling overhead. Falls back to `setTimeout` in non-DOM
   * environments (e.g. tests / SSR).
   */
  static scheduleMacrotask(fn) {
    if (typeof MessageChannel === "undefined") {
      setTimeout(fn, 0);
      return;
    }
    if (!this._channel) {
      this._channel = new MessageChannel();
      this._channel.port1.onmessage = () => {
        const next = this._queue.shift();
        if (next) next();
      };
    }
    this._queue.push(fn);
    this._channel.port2.postMessage(null);
  }
};
__name(_AreSchedulerHelper, "AreSchedulerHelper");
/** FIFO queue of callbacks waiting for their posted macrotask to fire. */
_AreSchedulerHelper._queue = [];
var AreSchedulerHelper = _AreSchedulerHelper;

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
    for (let i6 = 0; i6 < array.length; i6++) {
      this.spawnItemNode(attribute.template, attribute.owner, key, index, array[i6], i6);
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
    let state = AreDirectiveFor.renderState.get(attribute);
    if (!state) {
      state = { running: false, pending: false };
      AreDirectiveFor.renderState.set(attribute, state);
    }
    if (state.running) {
      state.pending = true;
      return;
    }
    return this.performUpdate(attribute, store, scene, state);
  }
  /**
   * Core of the `$for` update: re-diff the source array against the current
   * children, reconcile reused/removed items, then mount the new ones (small
   * lists synchronously, large lists time-sliced). Never called while another
   * pass for the same `$for` is in flight (see `update`).
   */
  performUpdate(attribute, store, scene, state) {
    const { key, index, arrayExpr, trackExpr } = this.parseExpression(attribute.content);
    const newArray = this.resolveArray(store, arrayExpr, attribute.content);
    const owner = attribute.owner;
    const currentChildren = [...owner.children];
    attribute.value = newArray;
    const attached = this.isAttached(owner);
    const computeKey = this.makeKeyFn(key, index, trackExpr);
    const childByKey = /* @__PURE__ */ new Map();
    const remaining = /* @__PURE__ */ new Set();
    for (let i6 = 0; i6 < currentChildren.length; i6++) {
      const child = currentChildren[i6];
      const ctx = child.scope.resolveFlat(AreDirectiveContext);
      const k4 = ctx ? computeKey(ctx.scope[key], ctx.scope[index || "index"]) : /* @__PURE__ */ Symbol("orphan");
      childByKey.set(k4, child);
      remaining.add(child);
    }
    const toCreate = [];
    for (let i6 = 0; i6 < newArray.length; i6++) {
      const item = newArray[i6];
      const k4 = computeKey(item, i6);
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
          [index || "index"]: i6
        };
      } else {
        toCreate.push({ item, idx: i6 });
      }
    }
    for (const child of remaining) {
      if (attached) child.unmount();
      owner.removeChild(child);
    }
    const createItem = /* @__PURE__ */ __name((desc) => {
      const child = this.spawnItemNode(attribute.template, owner, key, index, desc.item, desc.idx);
      child.transform();
      child.compile();
      if (attached) child.mount();
    }, "createItem");
    if (toCreate.length <= AreDirectiveFor.SYNC_THRESHOLD) {
      for (const desc of toCreate) createItem(desc);
      return this.finishUpdate(attribute, store, scene, state);
    }
    state.running = true;
    let cursor = 0;
    const processChunk = /* @__PURE__ */ __name(() => {
      try {
        const start = AreSchedulerHelper.now();
        while (cursor < toCreate.length) {
          createItem(toCreate[cursor]);
          cursor++;
          if (AreSchedulerHelper.now() - start >= AreDirectiveFor.CHUNK_BUDGET_MS) break;
        }
      } catch (error) {
        state.running = false;
        state.pending = false;
        throw error;
      }
      if (cursor < toCreate.length) {
        return new Promise((resolve) => {
          AreSchedulerHelper.scheduleMacrotask(() => resolve(processChunk()));
        });
      }
      return this.finishUpdate(attribute, store, scene, state);
    }, "processChunk");
    return processChunk();
  }
  /**
   * Completes an update pass. If another update() arrived while a chunked
   * render was streaming, run exactly one more pass now from the latest store
   * value so the final DOM always reflects the most recent data.
   */
  finishUpdate(attribute, store, scene, state) {
    state.running = false;
    if (state.pending) {
      state.pending = false;
      return this.performUpdate(attribute, store, scene, state);
    }
  }
  /**
   * Walks the node's ancestor chain (inclusive) and reports whether the
   * whole path is currently active — i.e. the subtree is actually rendered
   * into the DOM. A single inactive ancestor scene (e.g. a `$if` whose
   * condition is false) means the subtree is detached.
   */
  isAttached(node) {
    let current = node;
    while (current) {
      if (current.scene?.isInactive) return false;
      current = current.parent;
    }
    return true;
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
      return (item, i6) => item ?? i6;
    }
    const path = trackExpr.startsWith(key + ".") ? trackExpr.slice(key.length + 1) : trackExpr;
    return (item, i6) => {
      if (item == null) return i6;
      if (path === key || path === "$index") return path === "$index" ? i6 : item;
      const parts = path.split(".");
      let v6 = item;
      for (const p5 of parts) {
        if (v6 == null) return i6;
        v6 = v6[p5];
      }
      return v6 ?? i6;
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
      const m7 = content.slice(trackIdx).match(/\s+track\s+(.+)$/);
      if (m7) {
        trackExpr = m7[1].trim();
        body = content.slice(0, trackIdx).trim();
      }
    }
    const inIndex = body.lastIndexOf(" in ");
    const keyAndIndex = body.slice(0, inIndex).trim().replace(/^\(|\)$/g, "");
    const arrayExpr = body.slice(inIndex + 4).trim();
    const keyParts = keyAndIndex.split(",").map((p5) => p5.trim());
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
      const rawArgs = callMatch[2].split(",").map((a4) => a4.trim());
      const resolvedArgs = rawArgs.map((arg) => {
        if (arg.startsWith("'") && arg.endsWith("'")) return arg.slice(1, -1);
        if (arg.startsWith('"') && arg.endsWith('"')) return arg.slice(1, -1);
        if (!isNaN(Number(arg))) return Number(arg);
        const stripped = arg.replace(/\?$/, "");
        if (stripped.includes(".")) {
          const parts = stripped.split(".").map((p5) => p5.replace(/\?$/, ""));
          let val = store.get(parts[0]);
          for (let j5 = 1; j5 < parts.length; j5++) {
            if (val == null) return void 0;
            val = val[parts[j5]];
          }
          return val ?? void 0;
        }
        return store.get(stripped);
      });
      result = fn(...resolvedArgs);
    } else if (arrayExpr.includes(".")) {
      const parts = arrayExpr.split(".").map((p5) => p5.replace(/\?$/, ""));
      result = store.get(parts[0]);
      for (let i6 = 1; i6 < parts.length; i6++) {
        if (result == null) break;
        result = result[parts[i6]];
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
  spawnItemNode(template, owner, key, index, item, i6) {
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
      [index || "index"]: i6
    };
    itemNode.scene.activate();
    return itemNode;
  }
};
__name(AreDirectiveFor, "AreDirectiveFor");
/**
 * Lists whose number of NEW item nodes is at or below this threshold render
 * fully synchronously — byte-for-byte the previous behavior. Typical UIs
 * (menus, small tables) are therefore completely unaffected; only genuinely
 * large lists pay the (tiny) scheduling cost to keep the main thread responsive.
 */
AreDirectiveFor.SYNC_THRESHOLD = 100;
/**
 * Per-chunk time budget (ms). During a large-list render we mount item nodes
 * until this much time has elapsed, then yield to the browser so it can paint
 * and process input before the next chunk. ~16ms targets one animation frame.
 */
AreDirectiveFor.CHUNK_BUDGET_MS = 16;
/**
 * Per-attribute serialization state. A new update() that arrives while a
 * chunked render of the SAME `$for` is still in flight does NOT start a second
 * concurrent pass (which could interleave mutations on the shared children
 * list); instead it marks `pending` and the in-flight run re-runs once more
 * with the latest data when it finishes. This guarantees the children list is
 * only ever mutated by one pass at a time and the final state always reflects
 * the most recent store value.
 */
AreDirectiveFor.renderState = /* @__PURE__ */ new WeakMap();
__decorateClass([
  AreDirective.Transform,
  __decorateParam(0, Yt(te)),
  __decorateParam(1, Yt(R)),
  __decorateParam(2, Yt(AreStore)),
  __decorateParam(3, Yt(AreScene)),
  __decorateParam(4, Yt(A_Logger))
], AreDirectiveFor.prototype, "transform", 1);
__decorateClass([
  AreDirective.Compile,
  __decorateParam(0, Yt(te)),
  __decorateParam(1, Yt(AreStore)),
  __decorateParam(2, Yt(AreScene))
], AreDirectiveFor.prototype, "compile", 1);
__decorateClass([
  AreDirective.Update,
  __decorateParam(0, Yt(te)),
  __decorateParam(1, Yt(AreStore)),
  __decorateParam(2, Yt(AreScene))
], AreDirectiveFor.prototype, "update", 1);
AreDirectiveFor = __decorateClass([
  R4.Define({
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
  __decorateParam(0, Yt(te)),
  __decorateParam(1, Yt(R)),
  __decorateParam(2, Yt(AreStore)),
  __decorateParam(3, Yt(AreScene)),
  __decorateParam(4, Yt(A_Logger))
], AreDirectiveIf.prototype, "transform", 1);
__decorateClass([
  AreDirective.Compile,
  __decorateParam(0, Yt(te)),
  __decorateParam(1, Yt(AreStore)),
  __decorateParam(2, Yt(AreScene)),
  __decorateParam(3, Yt(AreSyntax)),
  __decorateParam(4, Yt(AreDirectiveContext))
], AreDirectiveIf.prototype, "compile", 1);
__decorateClass([
  AreDirective.Update,
  __decorateParam(0, Yt(te)),
  __decorateParam(1, Yt(AreStore)),
  __decorateParam(2, Yt(R)),
  __decorateParam(3, Yt(AreSyntax)),
  __decorateParam(4, Yt(AreScene))
], AreDirectiveIf.prototype, "update", 1);
AreDirectiveIf = __decorateClass([
  R4.Define({
    namespace: "a-are-html",
    description: "Built-in $if directive. Conditionally renders a subtree based on a store expression. Replaces the target element with a stable comment anchor when the condition is false and restores the fully rendered subtree when it becomes true, preventing any leaking of the host element between states."
  }),
  AreDirective.Priority(2)
], AreDirectiveIf);

// src/instructions/HideElement.instruction.ts
var HideElementInstruction = class extends AreMutation {
  constructor(parent, props) {
    if ("aseid" in props) {
      super(props);
    } else {
      super(AreHTMLInstructions.HideElement, parent, props);
    }
  }
};
__name(HideElementInstruction, "HideElementInstruction");
HideElementInstruction = __decorateClass([
  R4.Define({
    namespace: "a-are-html",
    description: 'Toggles the visibility of an existing element by setting its inline display to "none" on apply and restoring the previous inline display on revert. Used by the $show directive to hide/show an element without unmounting it, preserving its subtree, listeners and scene state.'
  })
], HideElementInstruction);

// src/directives/AreDirectiveShow.directive.ts
var AreDirectiveShow = class extends AreDirective {
  transform(attribute, logger, ...args) {
    logger.debug(`[Transform] directive $SHOW for <${attribute.owner.aseid.toString()}> (no structural change)`);
  }
  compile(attribute, store, scene, syntax, directiveContext, ...args) {
    const visible = !!syntax.evaluate(attribute.content, store, {
      ...directiveContext?.scope || {}
    });
    attribute.value = visible;
    const hide = new HideElementInstruction(scene.host, {});
    attribute.cache = hide;
    if (!visible)
      scene.plan(hide);
  }
  update(attribute, store, scene, syntax, directiveContext, ...args) {
    const previous = !!attribute.value;
    const next = !!syntax.evaluate(attribute.content, store, {
      ...directiveContext?.scope || {}
    });
    attribute.value = next;
    if (previous === next) return;
    const hide = attribute.cache;
    if (!hide) return;
    if (next)
      scene.unPlan(hide);
    else
      scene.plan(hide);
    attribute.owner.interpret();
  }
};
__name(AreDirectiveShow, "AreDirectiveShow");
__decorateClass([
  AreDirective.Transform,
  __decorateParam(0, Yt(te)),
  __decorateParam(1, Yt(A_Logger))
], AreDirectiveShow.prototype, "transform", 1);
__decorateClass([
  AreDirective.Compile,
  __decorateParam(0, Yt(te)),
  __decorateParam(1, Yt(AreStore)),
  __decorateParam(2, Yt(AreScene)),
  __decorateParam(3, Yt(AreSyntax)),
  __decorateParam(4, Yt(AreDirectiveContext))
], AreDirectiveShow.prototype, "compile", 1);
__decorateClass([
  AreDirective.Update,
  __decorateParam(0, Yt(te)),
  __decorateParam(1, Yt(AreStore)),
  __decorateParam(2, Yt(AreScene)),
  __decorateParam(3, Yt(AreSyntax)),
  __decorateParam(4, Yt(AreDirectiveContext))
], AreDirectiveShow.prototype, "update", 1);
AreDirectiveShow = __decorateClass([
  R4.Define({
    namespace: "a-are-html",
    description: "Built-in $show directive. Toggles an element's visibility by flipping its inline display value based on a store expression, keeping the element mounted (subtree, listeners and scene state preserved) instead of unmounting it like $if."
  }),
  AreDirective.Priority(3)
], AreDirectiveShow);

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
  R4.Define({
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
  R4.Define({
    namespace: "a-are-html",
    description: "Attaches a DOM event listener to an element. Apply calls addEventListener; revert calls removeEventListener."
  })
], AddListenerInstruction);

// src/instructions/AddStaticHTML.instruction.ts
var AddStaticHTMLInstruction = class extends AreMutation {
  constructor(parent, props) {
    if ("aseid" in props) {
      super(props);
    } else {
      super(AreHTMLInstructions.AddStaticHTML, parent, props);
    }
  }
};
__name(AddStaticHTMLInstruction, "AddStaticHTMLInstruction");
AddStaticHTMLInstruction = __decorateClass([
  R4.Define({
    namespace: "a-are-html",
    description: 'Materialises a fully static subtree (a "static island") onto its parent element in a single pass via browser-parsed innerHTML / a cached <template> clone. Apply injects the markup; revert clears it. Decodes HTML entities (e.g. &nbsp;) for free.'
  })
], AddStaticHTMLInstruction);

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
  R4.Define({
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
  R4.Define({
    namespace: "a-are-html",
    description: "Appends a text node to an element. Apply creates the text node; revert removes it. Content can be a static string or a dynamic getter for interpolations."
  })
], AddTextInstruction);

// src/lib/AreStyle/AreStyle.context.ts
var AreStyle = class extends H {
  constructor(styles, aseid) {
    super({
      name: aseid ? aseid.toString() : "default-style"
    });
    this.styles = styles;
  }
};
__name(AreStyle, "AreStyle");
AreStyle = __decorateClass([
  R4.Define({
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
   * The verbatim inner markup captured when this node was identified as a
   * static island, or `undefined` for ordinary (per-node) nodes.
   */
  get staticInnerHTML() {
    return this._staticInnerHTML;
  }
  /**
   * Whether this node is a static-island root (see `_staticInnerHTML`).
   */
  get isStaticIsland() {
    return this._staticInnerHTML !== void 0;
  }
  /**
   * Marks this node as a static-island root, capturing the verbatim inner
   * markup to be materialised in one shot by the interpreter. Called by the
   * tokenizer when the node's inner content is detected to be fully static.
   */
  markStatic(innerHTML) {
    this._staticInnerHTML = innerHTML;
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
    return directives.filter((d4) => d4.component).sort((a4, b3) => {
      const aMeta = _.meta(a4.component);
      const bMeta = _.meta(b3.component);
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
  R4.Define({
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
  R4.Define({
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
    return this.scope.resolve(P.toPascalCase(this.aseid.entity));
  }
};
__name(AreComponentNode, "AreComponentNode");
AreComponentNode = __decorateClass([
  R4.Define({
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
  R4.Define({
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
    return this.scope.resolve(P.toPascalCase(this.aseid.entity));
  }
};
__name(AreRootNode, "AreRootNode");
AreRootNode = __decorateClass([
  R4.Define({
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
  R4.Define({
    namespace: "a-are-html",
    description: "Node type representing a plain or partially-dynamic text segment in the AreHTMLNode tree. Emits an AddText instruction that sets or updates the corresponding DOM text node; the content may carry a store getter for any dynamic portion."
  })
], AreText);

// src/signals/AreRoute.signal.ts
var AreRoute = class extends AreSignal {
  constructor(path) {
    super({
      data: new A_Route(path)
    });
  }
  get route() {
    return this.data;
  }
  static default() {
    return new AreRoute(document.location.pathname || "/");
  }
  compare(other) {
    return this.route.toRegExp().test(other.data.toString());
  }
};
__name(AreRoute, "AreRoute");
AreRoute = __decorateClass([
  R4.Define({
    namespace: "a-are-html",
    description: "ARE signal that carries an A_Route value. Dispatched by AreRouteWatcher on client-side navigation events (pushState, replaceState, popstate). The signal bus delivers it to all subscribed root nodes, triggering route-based conditional rendering across the component tree."
  })
], AreRoute);

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
      const v6 = value[key];
      if (v6 === null || v6 === void 0 || v6 === false) continue;
      const kebab = key.replace(/[A-Z]/g, (m7) => "-" + m7.toLowerCase());
      parts.push(`${kebab}: ${v6}`);
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
var STANDARD_HTML_TAGS = /* @__PURE__ */ new Set([
  // root / sections
  "html",
  "body",
  "header",
  "footer",
  "main",
  "nav",
  "section",
  "article",
  "aside",
  "address",
  "hgroup",
  // headings
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  // grouping
  "div",
  "p",
  "span",
  "pre",
  "blockquote",
  "figure",
  "figcaption",
  "hr",
  "br",
  "wbr",
  // lists
  "ul",
  "ol",
  "li",
  "dl",
  "dt",
  "dd",
  "menu",
  // text-level / phrasing
  "a",
  "b",
  "i",
  "u",
  "s",
  "em",
  "strong",
  "small",
  "mark",
  "abbr",
  "cite",
  "q",
  "code",
  "kbd",
  "samp",
  "var",
  "sub",
  "sup",
  "time",
  "data",
  "dfn",
  "bdi",
  "bdo",
  "ruby",
  "rt",
  "rp",
  "del",
  "ins",
  // media / embedded (no special namespace handling needed)
  "img",
  "picture",
  "source",
  "figure",
  "audio",
  "video",
  "track",
  // tables
  "table",
  "caption",
  "colgroup",
  "col",
  "thead",
  "tbody",
  "tfoot",
  "tr",
  "th",
  "td",
  // forms (display only — these still render fine from innerHTML)
  "label",
  "fieldset",
  "legend",
  "datalist",
  "option",
  "optgroup",
  "output",
  "progress",
  "meter",
  // interactive
  "details",
  "summary",
  "dialog"
]);
function isStaticMarkup(inner) {
  if (!inner) return false;
  if (inner.indexOf("{{") !== -1) return false;
  const n6 = inner.length;
  let i6 = 0;
  while (i6 < n6) {
    const lt = inner.indexOf("<", i6);
    if (lt === -1) break;
    if (inner.startsWith("<!--", lt)) {
      const end = inner.indexOf("-->", lt + 4);
      if (end === -1) return false;
      i6 = end + 3;
      continue;
    }
    if (inner[lt + 1] === "/" || inner[lt + 1] === "!" || inner[lt + 1] === "?") {
      const gt2 = inner.indexOf(">", lt);
      if (gt2 === -1) return false;
      i6 = gt2 + 1;
      continue;
    }
    const nameMatch = /^<([a-zA-Z][a-zA-Z0-9-]*)/.exec(inner.slice(lt));
    if (!nameMatch) {
      i6 = lt + 1;
      continue;
    }
    const tag = nameMatch[1].toLowerCase();
    if (tag.indexOf("-") !== -1 || !STANDARD_HTML_TAGS.has(tag)) return false;
    let j5 = lt + nameMatch[0].length;
    let inSingle = false;
    let inDouble = false;
    let atNameBoundary = true;
    let tagEnd = -1;
    while (j5 < n6) {
      const ch = inner[j5];
      if (inDouble) {
        if (ch === '"') inDouble = false;
      } else if (inSingle) {
        if (ch === "'") inSingle = false;
      } else if (ch === '"') {
        inDouble = true;
        atNameBoundary = false;
      } else if (ch === "'") {
        inSingle = true;
        atNameBoundary = false;
      } else if (ch === ">") {
        tagEnd = j5;
        break;
      } else if (ch === " " || ch === "	" || ch === "\n" || ch === "\r" || ch === "/") {
        atNameBoundary = true;
      } else {
        if (atNameBoundary && (ch === "$" || ch === ":" || ch === "@")) {
          return false;
        }
        atNameBoundary = false;
      }
      j5++;
    }
    if (tagEnd === -1) return false;
    i6 = tagEnd + 1;
  }
  return true;
}
__name(isStaticMarkup, "isStaticMarkup");

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
    /**
     * Parsed-fragment cache for static islands (see AddStaticHTMLInstruction).
     *
     * Keyed by `hostTag\u0000markup`, each entry holds a `DocumentFragment` whose
     * children were parsed by the browser exactly once — in the *correct element
     * context* (the host tag), so table fragments (`<tr>`, `<td>`, …) and other
     * context-sensitive content parse correctly. Repeated static islands with
     * identical markup (e.g. list rows, reused components) clone the pre-parsed
     * fragment instead of re-parsing the HTML string on every mount — turning an
     * O(parse) operation into an O(clone) one.
     */
    this._staticFragmentCache = /* @__PURE__ */ new Map();
    /**
     * Live-DOM attachments deferred while a mount pass is batching.
     *
     * A freshly-mounted subtree is built inside a *detached* root element, so
     * every descendant `appendChild`/`insertBefore` happens off-document and
     * triggers zero layout/paint invalidation. The single mutation that actually
     * connects the built subtree to the live document is deferred and collected
     * here, then flushed once when the batch closes — collapsing O(nodes) reflows
     * into O(1) per mount root.
     */
    this._pendingAttachments = [];
    /**
     * Depth of the currently open batching scopes. Re-entrant so that nested
     * `beginBatch`/`endBatch` pairs flush exactly once, when the outermost scope
     * closes.
     */
    this._batchDepth = 0;
    this._container = props.container;
  }
  get container() {
    return this._container;
  }
  /**
   * `true` while a synchronous mount pass is batching live-DOM attachments.
   * Interpreter handlers consult this to decide whether to attach an element
   * immediately or hand the attachment to {@link deferAttach}.
   */
  get isBatching() {
    return this._batchDepth > 0;
  }
  /**
   * Opens a batching scope. Re-entrant: only the outermost matching
   * {@link endBatch} flushes the deferred attachments, so a single mount pass
   * connects its built subtree to the live DOM exactly once.
   */
  beginBatch() {
    this._batchDepth++;
  }
  /**
   * Registers a live-DOM attachment to run when the current batch flushes. If
   * no batch is active the attachment runs immediately, preserving the original
   * synchronous behaviour for updates that mount outside a batch.
   *
   * @param attach the DOM mutation that connects a built subtree to the document
   */
  deferAttach(attach) {
    if (this._batchDepth > 0) {
      this._pendingAttachments.push(attach);
    } else {
      attach();
    }
  }
  /**
   * Closes a batching scope. When the outermost scope closes, every deferred
   * attachment runs in registration (document) order, connecting the built
   * subtrees to the live DOM in a single pass.
   */
  endBatch() {
    if (this._batchDepth === 0) return;
    this._batchDepth--;
    if (this._batchDepth > 0) return;
    const pending = this._pendingAttachments;
    this._pendingAttachments = [];
    for (let i6 = 0; i6 < pending.length; i6++) {
      pending[i6]();
    }
  }
  /**
   * Returns a `DocumentFragment` containing the parsed form of `html`, parsed
   * once in the context of `hostTag` (so context-sensitive content such as
   * table rows/cells parses correctly) and cached thereafter. Callers should
   * `cloneNode(true)` the returned fragment rather than mutating it, so the
   * cache stays reusable.
   *
   * @param hostTag the tag name of the element the markup will be injected into
   * @param html    verbatim static-island inner markup
   */
  getStaticFragment(hostTag, html) {
    const key = `${hostTag}\0${html}`;
    let fragment = this._staticFragmentCache.get(key);
    if (!fragment) {
      const container = this._container.createElement(hostTag);
      container.innerHTML = html;
      fragment = this._container.createDocumentFragment();
      while (container.firstChild) {
        fragment.appendChild(container.firstChild);
      }
      this._staticFragmentCache.set(key, fragment);
    }
    return fragment;
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
  R4.Define({
    namespace: "a-are-html",
    description: "Runtime index for the HTML rendering engine. Maps each AreNode and instruction ASEID to its corresponding DOM element so that apply and revert handlers on interpreter instructions can look up their DOM node in O(1). Tracks root-element mounts and maintains the group-level index used by structural directives."
  })
], AreHTMLEngineContext);

// src/engine/AreHTML.compiler.ts
var AreHTMLCompiler = class extends AreCompiler {
  compileHTMLNode(node, scene, logger, ...args) {
    super.compile(node, scene, logger, ...args);
    if (node.isStaticIsland && scene.host) {
      scene.plan(new AddStaticHTMLInstruction(scene.host, { html: node.staticInnerHTML }));
    }
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
      logger?.warning(`Directive handler component not found for directive: ${directive.name}. Make sure to create a component named "AreDirective${P.toPascalCase(directive.name)}" to handle this directive.`);
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
        const camel = P.toCamelCase(attribute.name);
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
  __decorateParam(0, Yt(te)),
  __decorateParam(1, Yt(AreScene)),
  __decorateParam(2, Yt(A_Logger))
], AreHTMLCompiler.prototype, "compileHTMLNode", 1);
__decorateClass([
  AreCompiler.Compile(AreInterpolation),
  __decorateParam(0, Yt(te)),
  __decorateParam(1, Yt(AreScene)),
  __decorateParam(2, Yt(AreStore)),
  __decorateParam(3, Yt(A_Logger))
], AreHTMLCompiler.prototype, "compileInterpolation", 1);
__decorateClass([
  AreCompiler.Compile(AreText),
  __decorateParam(0, Yt(te)),
  __decorateParam(1, Yt(AreScene)),
  __decorateParam(2, Yt(A_Logger))
], AreHTMLCompiler.prototype, "compileText", 1);
__decorateClass([
  AreCompiler.Compile(AreStaticAttribute),
  __decorateParam(0, Yt(te)),
  __decorateParam(1, Yt(AreScene))
], AreHTMLCompiler.prototype, "compileStaticAttribute", 1);
__decorateClass([
  AreCompiler.Compile(AreDirectiveAttribute),
  __decorateParam(0, Yt(te)),
  __decorateParam(1, Yt(AreStore)),
  __decorateParam(2, Yt(N)),
  __decorateParam(3, Yt(A_Logger))
], AreHTMLCompiler.prototype, "compileDirectiveAttribute", 1);
__decorateClass([
  AreCompiler.Compile(AreEventAttribute),
  __decorateParam(0, Yt(te)),
  __decorateParam(1, Yt(AreScene))
], AreHTMLCompiler.prototype, "compileEventAttribute", 1);
__decorateClass([
  AreCompiler.Compile(AreBindingAttribute),
  __decorateParam(0, Yt(te)),
  __decorateParam(1, Yt(AreScene)),
  __decorateParam(2, M.Parent()),
  __decorateParam(2, Yt(AreStore)),
  __decorateParam(3, Yt(AreStore)),
  __decorateParam(4, Yt(AreSyntax))
], AreHTMLCompiler.prototype, "compileBindingAttribute", 1);
AreHTMLCompiler = __decorateClass([
  R4.Define({
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
        context.setInstructionElement(declaration, element);
        const attach = mountPoint.nodeType === Node.ELEMENT_NODE ? () => mountPoint.appendChild(element) : () => {
          mountPoint.parentNode?.insertBefore(element, mountPoint);
        };
        if (context.isBatching && mountPoint.isConnected) {
          context.deferAttach(attach);
        } else {
          attach();
        }
      } else {
        const mountPoint = context.container.getElementById(node.id);
        if (!mountPoint) {
          throw new AreInterpreterError({
            title: "Mount Point Not Found",
            description: `Could not find a mount point for the node with id "${node.id}". Ensure that the parent node is rendered before its children, or that a valid root element with the corresponding id exists in the DOM.`
          });
        }
        const element = isSVG ? context.container.createElementNS(SVG_NAMESPACE, tag) : context.container.createElement(tag);
        context.setInstructionElement(declaration, element);
        const attach = /* @__PURE__ */ __name(() => {
          mountPoint.parentNode?.replaceChild(element, mountPoint);
        }, "attach");
        if (context.isBatching && mountPoint.isConnected) {
          context.deferAttach(attach);
        } else {
          attach();
        }
      }
      logger?.debug("green", `Element ${node.aseid.toString()} added to Context:`);
    } catch (error) {
      logger?.error(error);
      throw error;
    }
  }
  removeElement(declaration, context) {
    const element = context.getElementByInstruction(declaration);
    if (element && element.parentNode && element.isConnected) {
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
        const merged = [...existingParts.filter((p5) => !oldParts.has(p5)), ...newParts].join(" ");
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
      if (name && element.nodeType === Node.ELEMENT_NODE && element.isConnected) {
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
  hideElement(mutation, context) {
    const element = context.getElementByInstruction(mutation.parent);
    if (!element || element.nodeType !== Node.ELEMENT_NODE) return;
    const el = element;
    mutation.cache = el.style.display;
    el.style.display = "none";
  }
  showElement(mutation, context) {
    const element = context.getElementByInstruction(mutation.parent);
    if (!element || element.nodeType !== Node.ELEMENT_NODE) return;
    if (!element.isConnected) return;
    const el = element;
    el.style.display = mutation.payload?.display ?? mutation.cache ?? "";
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
          const keyMods = [...modifiers].filter((m7) => m7 in KEY_ALIASES || m7 === "ctrl" || m7 === "alt" || m7 === "shift" || m7 === "meta");
          if (keyMods.length > 0) {
            const keyMatch = keyMods.some((m7) => {
              if (m7 === "ctrl") return e.ctrlKey;
              if (m7 === "alt") return e.altKey;
              if (m7 === "shift") return e.shiftKey;
              if (m7 === "meta") return e.metaKey;
              const aliases = KEY_ALIASES[m7];
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
      if (element.isConnected) {
        element.removeEventListener(eventName, listener);
      }
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
    if (element.isConnected) {
      element.parentNode?.removeChild(element);
    }
    context.removeInstructionElement(declaration);
  }
  addStaticHTML(mutation, context, logger) {
    const element = context.getElementByInstruction(mutation.parent);
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      throw new AreInterpreterError({
        title: "Element Not Found",
        description: `Could not find a DOM element associated with the instruction ASEID "${mutation.parent}". Ensure the host element is rendered before materialising its static island.`
      });
    }
    const el = element;
    const { html } = mutation.payload;
    el.textContent = "";
    const fragment = context.getStaticFragment(el.tagName.toLowerCase(), html);
    el.appendChild(fragment.cloneNode(true));
    logger?.debug("green", `Static island materialised onto <${(mutation.owner.parent ?? mutation.owner)?.aseid?.toString?.()}>`);
  }
  removeStaticHTML(mutation, context) {
    const element = context.getElementByInstruction(mutation.parent);
    if (element && element.nodeType === Node.ELEMENT_NODE && element.isConnected) {
      element.textContent = "";
    }
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
    if (element.isConnected) {
      element.parentNode?.removeChild(element);
    }
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
  R4.Define({
    description: "Create an HTML element based on the provided declaration instruction. Handles both root-level mounting and child element creation based on the structural parent hierarchy."
  }),
  AreInterpreter.Apply(AreInstructionDefaultNames.Default),
  AreInterpreter.Apply(AreHTMLInstructions.AddElement),
  __decorateParam(0, Yt(te)),
  __decorateParam(1, Yt(AreHTMLEngineContext)),
  __decorateParam(2, Yt(A_Logger))
], AreHTMLInterpreter.prototype, "addElement", 1);
__decorateClass([
  R4.Define({
    description: "Remove an HTML element that was created by a CreateElement declaration. Cleans up the DOM and the context index."
  }),
  AreInterpreter.Revert(AreInstructionDefaultNames.Default),
  AreInterpreter.Revert(AreHTMLInstructions.AddElement),
  __decorateParam(0, Yt(te)),
  __decorateParam(1, Yt(AreHTMLEngineContext))
], AreHTMLInterpreter.prototype, "removeElement", 1);
__decorateClass([
  R4.Define({
    description: "Add an attribute to an HTML element based on the provided mutation instruction."
  }),
  AreInterpreter.Apply(AreHTMLInstructions.AddAttribute),
  AreInterpreter.Update(AreHTMLInstructions.AddAttribute),
  __decorateParam(0, Yt(te)),
  __decorateParam(1, Yt(AreHTMLEngineContext)),
  __decorateParam(2, Yt(AreStore)),
  __decorateParam(3, Yt(AreSyntax)),
  __decorateParam(4, Yt(AreDirectiveContext)),
  __decorateParam(5, Yt(A_Logger))
], AreHTMLInterpreter.prototype, "addAttribute", 1);
__decorateClass([
  R4.Define({
    description: "Remove an attribute from an HTML element based on the provided mutation instruction."
  }),
  AreInterpreter.Revert(AreHTMLInstructions.AddAttribute),
  __decorateParam(0, Yt(te)),
  __decorateParam(1, Yt(AreHTMLEngineContext))
], AreHTMLInterpreter.prototype, "removeAttribute", 1);
__decorateClass([
  R4.Define({
    description: "Hide an element by setting inline display:none, caching its previous inline display value for restoration on revert."
  }),
  AreInterpreter.Apply(AreHTMLInstructions.HideElement),
  __decorateParam(0, Yt(te)),
  __decorateParam(1, Yt(AreHTMLEngineContext))
], AreHTMLInterpreter.prototype, "hideElement", 1);
__decorateClass([
  R4.Define({
    description: "Restore an element hidden by a HideElement instruction back to its previous inline display value."
  }),
  AreInterpreter.Revert(AreHTMLInstructions.HideElement),
  __decorateParam(0, Yt(te)),
  __decorateParam(1, Yt(AreHTMLEngineContext))
], AreHTMLInterpreter.prototype, "showElement", 1);
__decorateClass([
  R4.Define({
    description: "Add an event listener to an HTML element based on the provided mutation instruction."
  }),
  AreInterpreter.Apply(AreHTMLInstructions.AddListener),
  __decorateParam(0, Yt(te)),
  __decorateParam(1, Yt(AreHTMLEngineContext)),
  __decorateParam(2, Yt(AreStore)),
  __decorateParam(3, Yt(AreSyntax)),
  __decorateParam(4, Yt(AreDirectiveContext)),
  __decorateParam(5, Yt(A_Logger))
], AreHTMLInterpreter.prototype, "addEventListener", 1);
__decorateClass([
  R4.Define({
    description: "Remove an event listener from an HTML element based on the provided mutation instruction."
  }),
  AreInterpreter.Revert(AreHTMLInstructions.AddListener),
  __decorateParam(0, Yt(te)),
  __decorateParam(1, Yt(AreHTMLEngineContext))
], AreHTMLInterpreter.prototype, "removeEventListener", 1);
__decorateClass([
  R4.Define({
    description: "Add text content to an HTML element based on the provided declaration instruction."
  }),
  AreInterpreter.Apply(AreHTMLInstructions.AddText),
  AreInterpreter.Update(AreHTMLInstructions.AddText),
  __decorateParam(0, Yt(te)),
  __decorateParam(1, Yt(AreHTMLEngineContext)),
  __decorateParam(2, Yt(AreStore)),
  __decorateParam(3, Yt(AreSyntax)),
  __decorateParam(4, Yt(AreDirectiveContext)),
  __decorateParam(5, Yt(A_Logger))
], AreHTMLInterpreter.prototype, "addText", 1);
__decorateClass([
  R4.Define({
    description: "Remove text content from an HTML element based on the provided declaration instruction."
  }),
  AreInterpreter.Revert(AreHTMLInstructions.AddText),
  __decorateParam(0, Yt(te)),
  __decorateParam(1, Yt(AreHTMLEngineContext))
], AreHTMLInterpreter.prototype, "removeText", 1);
__decorateClass([
  R4.Define({
    description: "Inject a static island's inner markup onto its host element in one pass via a cached, browser-parsed <template> clone. Decodes HTML entities natively."
  }),
  AreInterpreter.Apply(AreHTMLInstructions.AddStaticHTML),
  AreInterpreter.Update(AreHTMLInstructions.AddStaticHTML),
  __decorateParam(0, Yt(te)),
  __decorateParam(1, Yt(AreHTMLEngineContext)),
  __decorateParam(2, Yt(A_Logger))
], AreHTMLInterpreter.prototype, "addStaticHTML", 1);
__decorateClass([
  R4.Define({
    description: "Clear a static island's injected markup from its host element on revert."
  }),
  AreInterpreter.Revert(AreHTMLInstructions.AddStaticHTML),
  __decorateParam(0, Yt(te)),
  __decorateParam(1, Yt(AreHTMLEngineContext))
], AreHTMLInterpreter.prototype, "removeStaticHTML", 1);
__decorateClass([
  R4.Define({
    description: "Add a comment node to the DOM based on the provided declaration instruction."
  }),
  AreInterpreter.Apply(AreHTMLInstructions.AddComment),
  AreInterpreter.Update(AreHTMLInstructions.AddComment),
  __decorateParam(0, Yt(te)),
  __decorateParam(1, Yt(AreHTMLEngineContext)),
  __decorateParam(2, Yt(AreStore)),
  __decorateParam(3, Yt(AreSyntax)),
  __decorateParam(4, Yt(AreDirectiveContext)),
  __decorateParam(5, Yt(A_Logger))
], AreHTMLInterpreter.prototype, "addComment", 1);
__decorateClass([
  R4.Define({
    description: "Remove a comment node from the DOM based on the provided declaration instruction."
  }),
  AreInterpreter.Revert(AreHTMLInstructions.AddComment),
  __decorateParam(0, Yt(te)),
  __decorateParam(1, Yt(AreHTMLEngineContext))
], AreHTMLInterpreter.prototype, "removeComment", 1);
__decorateClass([
  R4.Define({
    description: "Inject a <style> element into the document <head> carrying the component CSS. Keyed by instruction ASEID so multiple components with styles do not collide. Subsequent Update calls refresh the textContent in-place."
  }),
  AreInterpreter.Apply(AreHTMLInstructions.AddStyle),
  AreInterpreter.Update(AreHTMLInstructions.AddStyle),
  __decorateParam(0, Yt(te)),
  __decorateParam(1, Yt(AreHTMLEngineContext)),
  __decorateParam(2, Yt(A_Logger))
], AreHTMLInterpreter.prototype, "addStyle", 1);
__decorateClass([
  R4.Define({
    description: "Remove the <style> element that was injected by addStyle, cleaning up the document head."
  }),
  AreInterpreter.Revert(AreHTMLInstructions.AddStyle),
  __decorateParam(0, Yt(te)),
  __decorateParam(1, Yt(AreHTMLEngineContext))
], AreHTMLInterpreter.prototype, "removeStyle", 1);
AreHTMLInterpreter = __decorateClass([
  R4.Define({
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
    const isStaticIsland = node instanceof AreComponentNode && !!node.content && isStaticMarkup(node.content);
    if (isStaticIsland) {
      node.markStatic(node.content);
    } else {
      super.tokenize(node, context, logger);
    }
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
    for (let i6 = 0; i6 < withoutTag.length; i6++) {
      const ch = withoutTag[i6];
      if (ch === '"' && !inSingle) inDouble = !inDouble;
      else if (ch === "'" && !inDouble) inSingle = !inSingle;
      else if (ch === ">" && !inSingle && !inDouble) {
        endIdx = i6;
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
  N.Extend({
    name: AreNodeFeatures.onTokenize,
    scope: [AreComponentNode, AreRootNode]
  }),
  __decorateParam(0, Yt(te)),
  __decorateParam(1, Yt(AreContext)),
  __decorateParam(2, Yt(A_Logger))
], AreHTMLTokenizer.prototype, "tokenize", 1);
AreHTMLTokenizer = __decorateClass([
  R4.Define({
    namespace: "a-are-html",
    description: "HTML-specific tokenizer extending AreTokenizer. Parses raw HTML template strings into AreHTMLNode trees by scanning element tags and resolving directive ($), event (@), binding (:), and static attributes to their typed attribute classes, constructing AreComponentNode and AreRootNode instances where required."
  })
], AreHTMLTokenizer);

// src/engine/AreHTML.lifecycle.ts
var AreHTMLLifecycle = class extends AreLifecycle {
  initComponent(node, scope, context, signalsContext, logger, ...args) {
    if (node.component)
      signalsContext?.subscribe(node);
    super.init(node, scope, context, logger, ...args);
  }
  initRoot(node, scope, context, signalsContext, logger, ...args) {
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
    const context = node.scope.resolve(AreHTMLEngineContext);
    context?.beginBatch();
    const afterMountQueue = [];
    try {
      node.interpret();
      const stack = [];
      for (let i6 = node.children.length - 1; i6 >= 0; i6--) {
        stack.push({ node: node.children[i6], entered: false });
      }
      while (stack.length > 0) {
        const frame = stack[stack.length - 1];
        const current = frame.node;
        if (frame.entered) {
          stack.pop();
          afterMountQueue.push(current);
          continue;
        }
        frame.entered = true;
        current.call(AreNodeFeatures.onBeforeMount, current.scope);
        if (!current.scene.isInactive) {
          current.interpret();
          for (let i6 = current.children.length - 1; i6 >= 0; i6--) {
            stack.push({ node: current.children[i6], entered: false });
          }
        }
      }
    } finally {
      context?.endBatch();
    }
    for (let i6 = 0; i6 < afterMountQueue.length; i6++) {
      const mounted = afterMountQueue[i6];
      mounted.call(AreNodeFeatures.onAfterMount, mounted.scope);
    }
  }
  updateDirectiveAttribute(directive, scope, feature, logger, ...args) {
    if (directive.component) {
      feature.chain(directive.component, AreDirectiveFeatures.Update, directive.owner.scope);
    } else {
      logger?.warning(`Directive handler component not found for directive: ${directive.name}. Make sure to create a component named "AreDirective${P.toPascalCase(directive.name)}" to handle this directive.`);
    }
  }
};
__name(AreHTMLLifecycle, "AreHTMLLifecycle");
__decorateClass([
  AreLifecycle.Init(AreComponentNode),
  __decorateParam(0, Yt(te)),
  __decorateParam(1, Yt(R)),
  __decorateParam(2, Yt(AreHTMLEngineContext)),
  __decorateParam(3, Yt(AreSignalsContext)),
  __decorateParam(4, Yt(A_Logger))
], AreHTMLLifecycle.prototype, "initComponent", 1);
__decorateClass([
  AreLifecycle.Init(AreRootNode),
  __decorateParam(0, Yt(te)),
  __decorateParam(1, Yt(R)),
  __decorateParam(2, Yt(AreHTMLEngineContext)),
  __decorateParam(3, Yt(AreSignalsContext)),
  __decorateParam(4, Yt(A_Logger))
], AreHTMLLifecycle.prototype, "initRoot", 1);
__decorateClass([
  AreLifecycle.Init(AreText),
  __decorateParam(0, Yt(te)),
  __decorateParam(1, Yt(R)),
  __decorateParam(2, Yt(AreHTMLEngineContext)),
  __decorateParam(3, Yt(A_Logger))
], AreHTMLLifecycle.prototype, "initText", 1);
__decorateClass([
  AreLifecycle.Init(AreInterpolation),
  __decorateParam(0, Yt(te)),
  __decorateParam(1, Yt(R)),
  __decorateParam(2, Yt(AreHTMLEngineContext)),
  __decorateParam(3, Yt(A_Logger))
], AreHTMLLifecycle.prototype, "initInterpolation", 1);
__decorateClass([
  N.Extend({
    name: AreNodeFeatures.onMount,
    scope: [AreHTMLNode]
  }),
  __decorateParam(0, Yt(te)),
  __decorateParam(1, Yt(AreScene)),
  __decorateParam(2, Yt(A_Logger))
], AreHTMLLifecycle.prototype, "mount", 1);
__decorateClass([
  N.Extend({
    name: AreAttributeFeatures.Update,
    scope: [AreDirectiveAttribute]
  }),
  __decorateParam(0, Yt(te)),
  __decorateParam(1, Yt(R)),
  __decorateParam(2, Yt(N)),
  __decorateParam(3, Yt(A_Logger))
], AreHTMLLifecycle.prototype, "updateDirectiveAttribute", 1);
AreHTMLLifecycle = __decorateClass([
  R4.Define({
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
      logger?.warning(`Directive handler component not found for directive: ${directive.name}. Make sure to create a component named "AreDirective${P.toPascalCase(directive.name)}" to handle this directive.`);
    }
    store.unwatch(directive);
  }
};
__name(AreHTMLTransformer, "AreHTMLTransformer");
__decorateClass([
  N.Extend({
    name: AreAttributeFeatures.Transform,
    scope: [AreDirectiveAttribute]
  }),
  __decorateParam(0, Yt(te)),
  __decorateParam(1, Yt(AreStore)),
  __decorateParam(2, Yt(N)),
  __decorateParam(3, Yt(A_Logger))
], AreHTMLTransformer.prototype, "transformDirectiveAttribute", 1);
AreHTMLTransformer = __decorateClass([
  R4.Define({
    namespace: "a-are-html",
    description: "HTML-specific transformer extending AreTransformer. Handles directive-attribute structural rewrites before compilation \u2014 sorting directives by declared priority and expanding compound directive expressions \u2014 so the compiler receives a clean, ordered AreHTMLNode tree ready for instruction emission."
  })
], AreHTMLTransformer);

// src/lib/AreRoot/AreRootCache.context.ts
var AreRootCache = class extends H {
  constructor(limit = 10) {
    super({ name: "AreRootCache" });
    /**
     * rootId -> (component tag -> cache entry). The inner Map preserves
     * insertion order which is used as the LRU recency order: the first key is
     * the least-recently-used entry, the last key the most-recently-used.
     */
    this._cache = /* @__PURE__ */ new Map();
    this._limit = Math.max(0, Math.floor(limit));
  }
  /**
   * Maximum number of cached subtrees kept per root.
   */
  get limit() {
    return this._limit;
  }
  bucket(rootId) {
    let bucket = this._cache.get(rootId);
    if (!bucket) {
      bucket = /* @__PURE__ */ new Map();
      this._cache.set(rootId, bucket);
    }
    return bucket;
  }
  /**
   * Whether a subtree for the given component tag is currently cached.
   */
  has(rootId, tag) {
    return this.bucket(rootId).has(tag);
  }
  /**
   * Retrieve AND remove a cached subtree so it can become live again. Returns
   * `undefined` on a cache miss.
   */
  take(rootId, tag) {
    const bucket = this.bucket(rootId);
    const entry = bucket.get(tag);
    if (entry) {
      bucket.delete(tag);
    }
    return entry;
  }
  /**
   * Stash a detached subtree under the given component tag. Returns any entries
   * that were evicted to honour the LRU limit (or replaced for the same tag) so
   * the caller can `destroy()` them.
   */
  put(rootId, tag, entry) {
    const bucket = this.bucket(rootId);
    const evicted = [];
    const existing = bucket.get(tag);
    if (existing) {
      bucket.delete(tag);
      if (existing.node !== entry.node) {
        evicted.push(existing);
      }
    }
    bucket.set(tag, entry);
    while (bucket.size > this._limit) {
      const oldestKey = bucket.keys().next().value;
      if (oldestKey === void 0) {
        break;
      }
      const oldest = bucket.get(oldestKey);
      bucket.delete(oldestKey);
      evicted.push(oldest);
    }
    return evicted;
  }
  /**
   * Remove and return every cached entry for a root (e.g. on teardown) so the
   * caller can destroy them.
   */
  clear(rootId) {
    const bucket = this._cache.get(rootId);
    if (!bucket) {
      return [];
    }
    const entries = [...bucket.values()];
    bucket.clear();
    this._cache.delete(rootId);
    return entries;
  }
};
__name(AreRootCache, "AreRootCache");
AreRootCache = __decorateClass([
  R4.Define({
    namespace: "a-are-html",
    description: "AreRootCache is a fragment that keeps a small per-root LRU of previously rendered are-root subtrees. When an are-root swaps the component it displays, the outgoing subtree is stashed here (unmounted + detached, but not destroyed) so that routing back to it can re-inject the preserved scene instantly instead of rebuilding from scratch."
  })
], AreRootCache);

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
          extract: /* @__PURE__ */ __name((_6, match) => ({ key: match.content }), "extract")
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
  async init(scope, signalContext, rootCache) {
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
    if (!rootCache) {
      rootCache = new AreRootCache();
      scope.register(rootCache);
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
    for (let i6 = from; i6 < source.length; i6++) {
      const ch = source[i6];
      if (ch === '"' && !inSingle) inDouble = !inDouble;
      else if (ch === "'" && !inDouble) inSingle = !inSingle;
      else if (ch === ">" && !inSingle && !inDouble) return i6;
    }
    return -1;
  }
};
__name(AreHTMLEngine, "AreHTMLEngine");
__decorateClass([
  N.Extend({
    name: A_ServiceFeatures.onBeforeLoad,
    before: /.*/
  }),
  __decorateParam(0, Yt(R)),
  __decorateParam(1, Yt(AreSignalsContext)),
  __decorateParam(2, Yt(AreRootCache))
], AreHTMLEngine.prototype, "init", 1);
AreHTMLEngine = __decorateClass([
  R4.Define({
    namespace: "a-are-html",
    description: "Concrete HTML rendering engine that assembles the full ARE pipeline for web environments. Bootstraps and wires AreHTMLTokenizer, AreHTMLTransformer, AreHTMLCompiler, AreHTMLInterpreter, and AreHTMLLifecycle; mounts root nodes from inline or fetched templates; and drives reactive re-renders via the AreSignals bus."
  })
], AreHTMLEngine);

// src/lib/AreRoot/AreRoot.component.ts
var AreRoot = class extends Are {
  async template(root, logger, signalsContext, signalState) {
    const rootId = root.id;
    if (signalsContext && !signalsContext.hasRoot(rootId)) {
      if (!root.content?.trim()) {
        const defaultMatch = root.markup?.match(/\bdefault=["']([^"']*)["']/);
        const defaultComponent = defaultMatch?.[1];
        if (defaultComponent) {
          root.setContent(`<${defaultComponent}></${defaultComponent}>`);
        }
      }
      return;
    }
    const initialVector = this.buildInitialVector(signalState);
    const renderTarget = this.matchComponent(rootId, initialVector, signalsContext);
    let componentName = renderTarget?.name ? P.toKebabCase(renderTarget.name) : void 0;
    if (!componentName) {
      if (root.content?.trim()) {
        return;
      }
    }
    if (!componentName) {
      const defaultComp = signalsContext?.getDefault(rootId);
      if (defaultComp?.name) {
        componentName = P.toKebabCase(defaultComp.name);
      }
    }
    if (!componentName) {
      const defaultMatch = root.markup?.match(/\bdefault=["']([^"']*)["']/);
      componentName = defaultMatch?.[1];
    }
    if (!componentName) {
      logger.warning('AreRoot: No component found for initial render. Provide body content, a route condition, or a "default" attribute.');
      return;
    }
    root.setContent(`<${componentName}></${componentName}>`);
  }
  async onSignal(root, vector, logger, signalsContext, cache) {
    const rootId = root.id;
    if (signalsContext && !signalsContext.hasRoot(rootId)) {
      return;
    }
    const renderTarget = this.matchComponent(rootId, vector, signalsContext);
    const def = signalsContext?.getDefault(rootId);
    const componentName = renderTarget?.name ? P.toKebabCase(renderTarget.name) : def?.name ? P.toKebabCase(def.name) : void 0;
    if (!componentName) {
      for (const child of [...root.children]) {
        this.stashChild(root, child, signalsContext, cache);
      }
      root.setContent("");
      return;
    }
    const currentChild = root.children[0];
    if (currentChild?.type === componentName) {
      return;
    }
    for (const child of [...root.children]) {
      this.stashChild(root, child, signalsContext, cache);
    }
    root.setContent(`<${componentName}></${componentName}>`);
    const cached = cache?.take(root.id, componentName);
    if (cached) {
      this.restoreChild(root, cached, signalsContext);
      return;
    }
    root.tokenize();
    for (let i6 = 0; i6 < root.children.length; i6++) {
      const child = root.children[i6];
      child.init();
      const res = child.load();
      if (res instanceof Promise) {
        await res;
      }
      child.transform();
      child.compile();
      await child.mount();
    }
  }
  /**
   * Resolves the component a vector should render for the given root, mirroring
   * the priority used everywhere in the routing system:
   *   1. Root-specific conditions registered on AreSignalsContext.
   *   2. The global AreSignalsMeta map, restricted to this outlet's pool.
   *
   * Passing the pool *into* the meta lookup is critical: without it, the first
   * globally matching component wins and may belong to a different outlet
   * (e.g. AisRequirementsPanel for the meta-outlet matching
   * AisEditorCursorScope) — the pool check would then reject it and the outlet
   * would fall back to its default, hiding a valid in-pool match (e.g.
   * AisDiagramTab matching AisSetPrimaryDisplay).
   *
   * Returns `undefined` when nothing matches — callers decide whether to use a
   * configured default, body content, or clear the outlet.
   */
  matchComponent(rootId, vector, signalsContext) {
    if (!vector) return void 0;
    let renderTarget = signalsContext?.findComponentByVector(rootId, vector);
    if (!renderTarget) {
      const signalsMeta = _.meta(AreSignals);
      const pool = signalsContext?.getComponentById(rootId);
      const metaTarget = signalsMeta?.findComponentByVector(
        vector,
        pool?.length ? pool : void 0,
        rootId
      );
      if (metaTarget && (!pool?.length || pool.includes(metaTarget))) {
        renderTarget = metaTarget;
      }
    }
    return renderTarget;
  }
  /**
   * Builds the vector used for the INITIAL render. It is seeded from the
   * accumulated signal state (every signal dispatched on the bus so far) so a
   * freshly-mounted outlet reflects the live application state immediately,
   * not just on the next signal tick. The current URL route is appended when
   * no AreRoute is already present in the state, so route-driven outlets still
   * resolve on the very first paint (before AreRouteWatcher has dispatched).
   */
  buildInitialVector(signalState) {
    const signals = [];
    if (signalState) {
      for (const signal of signalState.toVector()) {
        if (signal) signals.push(signal);
      }
    }
    if (!signals.some((signal) => signal instanceof AreRoute)) {
      try {
        const currentRoute = AreRoute.default();
        if (currentRoute) signals.push(currentRoute);
      } catch {
      }
    }
    return new A_SignalVector(signals);
  }
  /**
   * Detach a displayed child subtree from the outlet and stash it in the cache
   * for fast re-injection later. The subtree is unmounted (its scene plan is
   * preserved) and deregistered from the root scope, but NOT destroyed. The
   * nodes that were subscribed to the signal bus are unsubscribed while cached
   * so the detached DOM never reacts to signals, and recorded so they can be
   * re-subscribed verbatim on restore.
   *
   * When no cache is available, or the LRU evicts an entry, the affected
   * subtree is fully destroyed.
   */
  stashChild(root, child, signalsContext, cache) {
    const tag = child.type;
    child.unmount();
    const subscribers = signalsContext ? this.collectSubscribers(child, signalsContext) : [];
    for (const node of subscribers) {
      signalsContext?.unsubscribe(node);
    }
    root.removeChild(child);
    if (!cache) {
      void child.destroy();
      return;
    }
    const evicted = cache.put(root.id, tag, { node: child, subscribers });
    for (const entry of evicted) {
      void entry.node.destroy();
    }
  }
  /**
   * Re-attach a cached subtree to the outlet and re-mount it from its preserved
   * scene plan, re-subscribing exactly the nodes that were subscribed before it
   * was cached.
   */
  restoreChild(root, entry, signalsContext) {
    const child = entry.node;
    root.addChild(child);
    for (const node of entry.subscribers) {
      signalsContext?.subscribe(node);
    }
    child.mount();
  }
  /**
   * Walk a subtree and collect the nodes currently registered as signal
   * subscribers. Mirrors the subscription performed at init time in
   * AreHTMLLifecycle (component nodes and root nodes) without depending on the
   * concrete node classes — it simply intersects the subtree with the live
   * subscriber registry.
   */
  collectSubscribers(node, signalsContext) {
    const result = [];
    const queue = [node];
    while (queue.length > 0) {
      const current = queue.shift();
      if (signalsContext.subscribers.has(current)) {
        result.push(current);
      }
      queue.push(...current.children);
    }
    return result;
  }
};
__name(AreRoot, "AreRoot");
__decorateClass([
  Are.Template,
  __decorateParam(0, Yt(te)),
  __decorateParam(1, Yt(A_Logger)),
  __decorateParam(2, Yt(AreSignalsContext)),
  __decorateParam(3, Yt(A_SignalState))
], AreRoot.prototype, "template", 1);
__decorateClass([
  Are.Signal,
  __decorateParam(0, Yt(te)),
  __decorateParam(1, Yt(A_SignalVector)),
  __decorateParam(2, Yt(A_Logger)),
  __decorateParam(3, Yt(AreSignalsContext)),
  __decorateParam(4, Yt(AreRootCache))
], AreRoot.prototype, "onSignal", 1);
AreRoot = __decorateClass([
  R4.Define({
    namespace: "a-are-html",
    description: "The AreRoot component serves as the foundational entry point for the A-Concept Rendering Engine (ARE). It is responsible for initializing the rendering process, managing the root node of the component tree, and handling signal-based rendering logic. The AreRoot component processes incoming signals to determine which child components to render, allowing for dynamic and responsive UI updates based on application state and user interactions."
  })
], AreRoot);

// src/lib/AreRouteWatcher/AreRouteWatcher.component.ts
var AreRouteWatcher = class extends O {
  constructor() {
    super();
    this.handlers = /* @__PURE__ */ new Set();
    this.current = new URL(window.location.href);
    // ── Listeners ─────────────────────────────────────────────────────────────
    this.onPopState = /* @__PURE__ */ __name(() => {
      this.notify();
    }, "onPopState");
    this.onHashChange = /* @__PURE__ */ __name(() => {
      this.notify();
    }, "onHashChange");
    this.onURLChange = /* @__PURE__ */ __name(() => {
      this.notify();
    }, "onURLChange");
    this.patchHistory();
    this.attachListeners();
  }
  // ── Public ────────────────────────────────────────────────────────────────
  onChange(handler) {
    this.handlers.add(handler);
    return () => this.handlers.delete(handler);
  }
  get url() {
    return this.current;
  }
  destroy() {
    window.removeEventListener("popstate", this.onPopState);
    window.removeEventListener("hashchange", this.onHashChange);
    window.removeEventListener("urlchange", this.onURLChange);
    this.handlers.clear();
  }
  attachListeners() {
    window.addEventListener("popstate", this.onPopState);
    window.addEventListener("hashchange", this.onHashChange);
    window.addEventListener("urlchange", this.onURLChange);
  }
  // ── Patch pushState / replaceState ────────────────────────────────────────
  patchHistory() {
    const patch = /* @__PURE__ */ __name((original) => function(...args) {
      original.apply(this, args);
      window.dispatchEvent(new Event("urlchange"));
    }, "patch");
    history.pushState = patch(history.pushState);
    history.replaceState = patch(history.replaceState);
  }
  // ── Notify ────────────────────────────────────────────────────────────────
  notify() {
    const next = new URL(window.location.href);
    if (next.href === this.current.href) return;
    this.current = next;
    for (const handler of this.handlers) {
      handler(this.current);
    }
  }
};
__name(AreRouteWatcher, "AreRouteWatcher");
AreRouteWatcher = __decorateClass([
  R4.Define({
    namespace: "a-are-html",
    description: "AreRouteWatcher is a component that observes browser navigation events (history pushState, replaceState, and popstate) and notifies registered handlers when the URL changes, enabling client-side routing and reactive route-based rendering within the ARE framework."
  })
], AreRouteWatcher);

// examples/signal-routing/src/components/AppShell.component.ts
var _AppShell = class _AppShell extends Are {
  template(node) {
    node.setContent(`
            <div class="app-shell">
                <nav-bar></nav-bar>
                <main class="app-main">
                    <are-root id="page-outlet"><home-page></home-page></are-root>
                </main>
            </div>
        `);
  }
  styles(node) {
    node.setStyles(`
            .app-shell {
                display: flex;
                flex-direction: column;
                min-height: 100vh;
                background: #09090b;
                color: #f4f4f5;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            }
            .app-main {
                flex: 1;
            }
        `);
  }
};
__name(_AppShell, "AppShell");
__decorateClass([
  Are.Template,
  __decorateParam(0, Yt(te))
], _AppShell.prototype, "template", 1);
__decorateClass([
  Are.Styles,
  __decorateParam(0, Yt(te))
], _AppShell.prototype, "styles", 1);
var AppShell = _AppShell;

// examples/signal-routing/src/components/NavBar.component.ts
var _NavBar = class _NavBar extends Are {
  template(node) {
    node.setContent(`
            <nav class="navbar">
                <div class="navbar-brand">ARE \xB7 Signal Router</div>
                <ul class="navbar-links">
                    <li><a href="/" @click="$navigate('/')">Home</a></li>
                    <li><a href="/about" @click="$navigate('/about')">About</a></li>
                    <li><a href="/settings" @click="$navigate('/settings')">Settings</a></li>
                </ul>
            </nav>
        `);
  }
  styles(node) {
    node.setStyles(`
            .navbar {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 32px;
                height: 56px;
                background: #18181b;
                border-bottom: 1px solid #27272a;
                position: sticky;
                top: 0;
                z-index: 100;
            }
            .navbar-brand {
                font-size: 16px;
                font-weight: 700;
                color: #a78bfa;
                letter-spacing: -0.02em;
            }
            .navbar-links {
                list-style: none;
                display: flex;
                gap: 8px;
                margin: 0;
                padding: 0;
            }
            .navbar-links a {
                display: inline-block;
                padding: 6px 16px;
                border-radius: 6px;
                text-decoration: none;
                color: #a1a1aa;
                font-size: 14px;
                font-weight: 500;
                transition: background 0.15s, color 0.15s;
            }
            .navbar-links a:hover {
                background: #27272a;
                color: #f4f4f5;
            }
        `);
  }
  navigate(event, bus) {
    const e = event.get("native");
    e?.preventDefault();
    const path = event.get("args")?.[0] ?? "/";
    history.pushState({}, "", path);
    bus.next(new AreRoute(path));
  }
  async onSignal(root, vector, store, signalsContext) {
    const rootId = root.id;
    console.log(`NavBar received signal: ${vector.toString()} for rootId: ${rootId}`, root, signalsContext);
  }
};
__name(_NavBar, "NavBar");
__decorateClass([
  Are.Template,
  __decorateParam(0, Yt(te))
], _NavBar.prototype, "template", 1);
__decorateClass([
  Are.Styles,
  __decorateParam(0, Yt(te))
], _NavBar.prototype, "styles", 1);
__decorateClass([
  Are.EventHandler,
  __decorateParam(0, Yt(AreEvent)),
  __decorateParam(1, Yt(A_SignalBus))
], _NavBar.prototype, "navigate", 1);
__decorateClass([
  Are.Signal,
  __decorateParam(0, Yt(te)),
  __decorateParam(1, Yt(A_SignalVector)),
  __decorateParam(2, Yt(AreStore)),
  __decorateParam(3, Yt(AreSignalsContext))
], _NavBar.prototype, "onSignal", 1);
var NavBar = _NavBar;

// examples/signal-routing/src/components/HomePage.component.ts
var HomePage = class extends Are {
  template(node) {
    node.setContent(`
            <section class="page page-home">
                <div class="page-hero">
                    <h1 class="page-title">Welcome to Signal Routing</h1>
                    <p class="page-subtitle">
                        This page is rendered because the current route matched <code>/</code>.<br/>
                        Navigate using the links above \u2014 no full page reload, just signals.
                    </p>
                </div>
                <div class="card-grid">
                    <div class="card">
                        <div class="card-icon">\u26A1</div>
                        <h3>Signal-based</h3>
                        <p>Route changes emit an <code>AreRoute</code> signal on the bus. <code>AreRoot</code> responds and swaps the active component.</p>
                    </div>
                    <div class="card">
                        <div class="card-icon">\u{1F500}</div>
                        <h3>Zero reload</h3>
                        <p>No browser navigation occurs. <code>history.pushState</code> keeps the URL bar in sync so deep-links and back/forward still work.</p>
                    </div>
                    <div class="card">
                        <div class="card-icon">\u{1F9E9}</div>
                        <h3>Component-level</h3>
                        <p>Each page is a plain <code>Are</code> component. Register it in <code>AreSignalsContext</code> and the router does the rest.</p>
                    </div>
                </div>
            </section>
        `);
  }
  styles(node) {
    node.setStyles(`
            .page { padding: 48px 40px; max-width: 960px; margin: 0 auto; }
            .page-hero { margin-bottom: 40px; }
            .page-title { font-size: 32px; font-weight: 800; color: #f4f4f5; margin-bottom: 12px; }
            .page-subtitle { font-size: 16px; color: #a1a1aa; line-height: 1.7; }
            .page-subtitle code { background: #27272a; padding: 2px 6px; border-radius: 4px; color: #a78bfa; font-size: 13px; }
            .card-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 20px; }
            .card { background: #1c1c1f; border: 1px solid #27272a; border-radius: 12px; padding: 24px; }
            .card-icon { font-size: 28px; margin-bottom: 12px; }
            .card h3 { font-size: 16px; font-weight: 600; color: #f4f4f5; margin-bottom: 8px; }
            .card p { font-size: 14px; color: #71717a; line-height: 1.6; }
            .card p code { background: #27272a; padding: 1px 5px; border-radius: 3px; color: #a78bfa; font-size: 12px; }
        `);
  }
  async onSignal(root, vector, store, signalsContext) {
    const rootId = root.id;
    console.log(`HomePage received signal: ${vector.toString()} for rootId: ${rootId}`, root, signalsContext);
  }
};
__name(HomePage, "HomePage");
__decorateClass([
  Are.Template,
  __decorateParam(0, Yt(te))
], HomePage.prototype, "template", 1);
__decorateClass([
  Are.Styles,
  __decorateParam(0, Yt(te))
], HomePage.prototype, "styles", 1);
__decorateClass([
  Are.Signal,
  __decorateParam(0, Yt(te)),
  __decorateParam(1, Yt(A_SignalVector)),
  __decorateParam(2, Yt(AreStore)),
  __decorateParam(3, Yt(AreSignalsContext))
], HomePage.prototype, "onSignal", 1);
HomePage = __decorateClass([
  Are.Condition([new AreRoute("/")])
], HomePage);

// examples/signal-routing/src/components/AboutPage.component.ts
var AboutPage = class extends Are {
  template(node) {
    node.setContent(`
            <section class="page page-about">
                <h1 class="page-title">About this example</h1>
                <p class="page-subtitle">
                    This example demonstrates signal-based SPA routing using the ARE framework.
                </p>

                <div class="about-block">
                    <h2>How it works</h2>
                    <ol class="steps">
                        <li>
                            <strong>Signal emitted</strong> \u2014 clicking a nav link calls
                            <code>bus.emit(new AreRoute('/about'))</code> and updates the browser
                            URL via <code>history.pushState</code>.
                        </li>
                        <li>
                            <strong>AreRoot reacts</strong> \u2014 the root node is subscribed to the
                            signal bus. When the vector matches a registered condition it replaces
                            its inner content with the mapped component.
                        </li>
                        <li>
                            <strong>Page renders</strong> \u2014 the new component goes through the normal
                            ARE lifecycle: <code>@Are.Template</code> \u2192 <code>@Are.Data</code> \u2192
                            <code>@Are.Styles</code> \u2192 mount.
                        </li>
                    </ol>
                </div>

                <div class="about-block">
                    <h2>Key pieces</h2>
                    <table class="info-table">
                        <tr><th>AreRoute(path)</th><td>Signal carrying the new URL path.</td></tr>
                        <tr><th>AreRouteWatcher</th><td>Listens to popstate / pushState and re-emits the signal on browser back/forward.</td></tr>
                        <tr><th>AreSignalsContext</th><td>Fragment that maps (rootId, signal vector) \u2192 component class.</td></tr>
                        <tr><th>A_SignalState</th><td>Persists the last emitted signal so a fresh page load still routes correctly.</td></tr>
                    </table>
                </div>
            </section>
        `);
  }
  styles(node) {
    node.setStyles(`
            .page { padding: 48px 40px; max-width: 860px; margin: 0 auto; }
            .page-title { font-size: 32px; font-weight: 800; color: #f4f4f5; margin-bottom: 12px; }
            .page-subtitle { font-size: 16px; color: #a1a1aa; line-height: 1.7; margin-bottom: 36px; }
            .about-block { margin-bottom: 40px; }
            .about-block h2 { font-size: 18px; font-weight: 700; color: #e4e4e7; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 1px solid #27272a; }
            .steps { padding-left: 24px; color: #a1a1aa; line-height: 2; font-size: 14px; }
            .steps li { margin-bottom: 8px; }
            .steps strong { color: #e4e4e7; }
            .steps code, .info-table code { background: #27272a; padding: 1px 6px; border-radius: 4px; color: #a78bfa; font-size: 12px; }
            .info-table { width: 100%; border-collapse: collapse; font-size: 14px; }
            .info-table tr { border-bottom: 1px solid #27272a; }
            .info-table th { text-align: left; padding: 10px 12px; color: #a78bfa; font-weight: 600; width: 200px; }
            .info-table td { padding: 10px 12px; color: #a1a1aa; }
        `);
  }
};
__name(AboutPage, "AboutPage");
__decorateClass([
  Are.Template,
  __decorateParam(0, Yt(te))
], AboutPage.prototype, "template", 1);
__decorateClass([
  Are.Styles,
  __decorateParam(0, Yt(te))
], AboutPage.prototype, "styles", 1);
AboutPage = __decorateClass([
  Are.Condition([new AreRoute("/about")])
], AboutPage);

// examples/signal-routing/src/components/SettingsPage.component.ts
var SettingsPage = class extends Are {
  template(node) {
    node.setContent(`
            <section class="page page-settings">
                <h1 class="page-title">Settings</h1>
                <p class="page-subtitle">Preferences are stored in the component's local store.</p>

                <div class="settings-group">
                    <h2>Appearance</h2>
                    <label class="setting-row">
                        <span>Dark mode</span>
                        <input type="checkbox" checked disabled />
                    </label>
                    <label class="setting-row">
                        <span>Compact layout</span>
                        <input type="checkbox" @change="$toggleCompact" />
                    </label>
                </div>

                <div class="settings-group">
                    <h2>Directive demo \xB7 <code>$show</code> vs <code>$if</code></h2>
                    <p class="hint">
                        Type something into both boxes below, then toggle <strong>Compact layout</strong>
                        twice. Both panels react to the same <code>compact</code> store flag, but:
                    </p>

                    <div class="demo-panel demo-show" $show="!compact">
                        <span class="demo-tag">$show</span>
                        <p>
                            Toggled with <code>$show</code> \u2014 I stay <strong>mounted</strong> and only my
                            inline <code>display</code> flips. Your text below <strong>survives</strong>
                            the toggle because the DOM node is never destroyed.
                        </p>
                        <input type="text" placeholder="Scratch text (survives toggle)\u2026" />
                    </div>

                    <div class="demo-panel demo-if" $if="!compact">
                        <span class="demo-tag">$if</span>
                        <p>
                            Toggled with <code>$if</code> \u2014 I am <strong>unmounted</strong> and rebuilt
                            each time I reappear. Your text below is <strong>wiped</strong> on every toggle.
                        </p>
                        <input type="text" placeholder="Scratch text (lost on toggle)\u2026" />
                    </div>
                </div>

                <div class="settings-group">
                    <h2>Display name</h2>
                    <div class="input-row">
                        <input
                            id="display-name"
                            type="text"
                            placeholder="Enter your name\u2026"
                            @input="$onNameInput"
                        />
                        <span class="preview">Preview: <strong>{{displayName}}</strong></span>
                    </div>
                </div>

                <div class="settings-group">
                    <h2>Routing state</h2>
                    <p class="hint">
                        Current route is held in <code>A_SignalState</code> so refreshing the page
                        at <code>/settings</code> still lands here \u2014 no extra server config needed.
                    </p>
                </div>
            </section>
        `);
  }
  data(store) {
    store.set({ displayName: "Guest", compact: false });
  }
  styles(node) {
    node.setStyles(`
            .page { padding: 48px 40px; max-width: 720px; margin: 0 auto; }
            .page-title { font-size: 32px; font-weight: 800; color: #f4f4f5; margin-bottom: 12px; }
            .page-subtitle { font-size: 15px; color: #a1a1aa; margin-bottom: 36px; }
            .settings-group { margin-bottom: 36px; }
            .settings-group h2 { font-size: 15px; font-weight: 700; color: #e4e4e7; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 1px solid #27272a; }
            .setting-row { display: flex; align-items: center; justify-content: space-between; padding: 10px 0; color: #a1a1aa; font-size: 14px; cursor: pointer; }
            .input-row { display: flex; align-items: center; gap: 16px; }
            .input-row input[type="text"] { background: #1c1c1f; border: 1px solid #3f3f46; border-radius: 8px; color: #f4f4f5; padding: 8px 14px; font-size: 14px; outline: none; width: 260px; }
            .input-row input[type="text"]:focus { border-color: #a78bfa; }
            .preview { font-size: 14px; color: #71717a; }
            .preview strong { color: #a78bfa; }
            .hint { font-size: 13px; color: #71717a; line-height: 1.7; }
            .hint code { background: #27272a; padding: 1px 6px; border-radius: 4px; color: #a78bfa; font-size: 12px; }
            .settings-group h2 code { background: #27272a; padding: 1px 6px; border-radius: 4px; color: #a78bfa; font-size: 12px; font-weight: 600; }
            .demo-panel { position: relative; background: #1c1c1f; border: 1px solid #27272a; border-radius: 10px; padding: 18px 18px 18px 20px; margin-top: 14px; }
            .demo-panel p { font-size: 13px; color: #a1a1aa; line-height: 1.7; margin: 0 0 12px; }
            .demo-panel p code { background: #27272a; padding: 1px 5px; border-radius: 3px; color: #a78bfa; font-size: 12px; }
            .demo-panel strong { color: #e4e4e7; }
            .demo-panel input[type="text"] { background: #131316; border: 1px solid #3f3f46; border-radius: 8px; color: #f4f4f5; padding: 8px 14px; font-size: 13px; outline: none; width: 100%; box-sizing: border-box; }
            .demo-panel input[type="text"]:focus { border-color: #a78bfa; }
            .demo-tag { display: inline-block; font-family: monospace; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 6px; margin-bottom: 10px; }
            .demo-show { border-left: 3px solid #34d399; }
            .demo-show .demo-tag { background: rgba(52, 211, 153, 0.12); color: #34d399; }
            .demo-if { border-left: 3px solid #f59e0b; }
            .demo-if .demo-tag { background: rgba(245, 158, 11, 0.12); color: #f59e0b; }
        `);
  }
  onNameInput(store, event) {
    const el = event.get("native")?.target;
    store.set("displayName", el?.value || "Guest");
  }
  toggleCompact(store, event) {
    const el = event.get("native")?.target;
    store.set("compact", el?.checked ?? false);
  }
};
__name(SettingsPage, "SettingsPage");
__decorateClass([
  Are.Template,
  __decorateParam(0, Yt(te))
], SettingsPage.prototype, "template", 1);
__decorateClass([
  Are.Data,
  __decorateParam(0, Yt(AreStore))
], SettingsPage.prototype, "data", 1);
__decorateClass([
  Are.Styles,
  __decorateParam(0, Yt(te))
], SettingsPage.prototype, "styles", 1);
__decorateClass([
  Are.EventHandler,
  __decorateParam(0, Yt(AreStore)),
  __decorateParam(1, Yt(AreEvent))
], SettingsPage.prototype, "onNameInput", 1);
__decorateClass([
  Are.EventHandler,
  __decorateParam(0, Yt(AreStore)),
  __decorateParam(1, Yt(AreEvent))
], SettingsPage.prototype, "toggleCompact", 1);
SettingsPage = __decorateClass([
  Are.Condition([new AreRoute("/settings")])
], SettingsPage);

// examples/signal-routing/src/concept.ts
(async () => {
  try {
    const signalsContext = new AreSignalsContext({
      "page-outlet": {
        default: HomePage,
        pool: [HomePage, AboutPage, SettingsPage],
        // Route conditions are registered via @Are.Condition decorators
        // on each page component — no explicit conditions needed here.
        conditions: []
      }
    });
    const container = new AreContainer({
      name: "ARE Signal Routing",
      components: [
        // ── Pages ────────────────────────────────────────────────
        AppShell,
        NavBar,
        HomePage,
        AboutPage,
        SettingsPage,
        // ── Directives ───────────────────────────────────────────
        AreDirectiveIf,
        AreDirectiveFor,
        AreDirectiveShow,
        // ── Engine ───────────────────────────────────────────────
        A_SignalBus,
        AreRoot,
        AreRouteWatcher,
        ConfigReader,
        AreHTMLEngine,
        A_Logger
      ],
      entities: [
        AreInit,
        AreRoute
      ],
      fragments: [
        // Persist the current route so a hard refresh on /about still
        // renders the correct page.  Both AreInit AND AreRouteSignal
        // must be in this structure — if either is missing, state.has()
        // returns false and the bus silently drops the signal.
        new A_SignalState([AreInit, AreRoute]),
        signalsContext,
        new AreHTMLEngineContext({ container: document }),
        new A_Config({
          defaults: {
            [A_LOGGER_ENV_KEYS.LOG_LEVEL]: "info"
          }
        })
      ]
    });
    const concept = new ct({
      name: "adaas-are-example-signal-routing",
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
    const logger = _.root.resolve(A_Logger);
    logger.error(error);
  }
})();
