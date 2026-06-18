import '../chunk-EQQGB2QZ.mjs';

const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
const SVG_ATTRIBUTE_NS = {
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
const VOID_ELEMENTS = /* @__PURE__ */ new Set([
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
const BOOLEAN_ATTRIBUTES = /* @__PURE__ */ new Set([
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
const IDL_FORM_PROPERTIES = {
  INPUT: /* @__PURE__ */ new Set(["value", "checked", "indeterminate"]),
  TEXTAREA: /* @__PURE__ */ new Set(["value"]),
  SELECT: /* @__PURE__ */ new Set(["value"]),
  OPTION: /* @__PURE__ */ new Set(["selected"])
};
function isIDLFormProperty(tagName, attrName) {
  const set = IDL_FORM_PROPERTIES[tagName.toUpperCase()];
  return !!set && set.has(attrName);
}
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
      const v = value[key];
      if (v === null || v === void 0 || v === false) continue;
      const kebab = key.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());
      parts.push(`${kebab}: ${v}`);
    }
    return parts.join("; ");
  }
  return "";
}
function parseEventName(raw) {
  const [event, ...modifiers] = raw.split(".");
  return { event, modifiers: new Set(modifiers) };
}
const LISTENER_OPTION_MODIFIERS = /* @__PURE__ */ new Set(["capture", "once", "passive"]);
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
const STANDARD_HTML_TAGS = /* @__PURE__ */ new Set([
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
  const n = inner.length;
  let i = 0;
  while (i < n) {
    const lt = inner.indexOf("<", i);
    if (lt === -1) break;
    if (inner.startsWith("<!--", lt)) {
      const end = inner.indexOf("-->", lt + 4);
      if (end === -1) return false;
      i = end + 3;
      continue;
    }
    if (inner[lt + 1] === "/" || inner[lt + 1] === "!" || inner[lt + 1] === "?") {
      const gt = inner.indexOf(">", lt);
      if (gt === -1) return false;
      i = gt + 1;
      continue;
    }
    const nameMatch = /^<([a-zA-Z][a-zA-Z0-9-]*)/.exec(inner.slice(lt));
    if (!nameMatch) {
      i = lt + 1;
      continue;
    }
    const tag = nameMatch[1].toLowerCase();
    if (tag.indexOf("-") !== -1 || !STANDARD_HTML_TAGS.has(tag)) return false;
    let j = lt + nameMatch[0].length;
    let inSingle = false;
    let inDouble = false;
    let atNameBoundary = true;
    let tagEnd = -1;
    while (j < n) {
      const ch = inner[j];
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
        tagEnd = j;
        break;
      } else if (ch === " " || ch === "	" || ch === "\n" || ch === "\r" || ch === "/") {
        atNameBoundary = true;
      } else {
        if (atNameBoundary && (ch === "$" || ch === ":" || ch === "@")) {
          return false;
        }
        atNameBoundary = false;
      }
      j++;
    }
    if (tagEnd === -1) return false;
    i = tagEnd + 1;
  }
  return true;
}

export { BOOLEAN_ATTRIBUTES, IDL_FORM_PROPERTIES, LISTENER_OPTION_MODIFIERS, STANDARD_HTML_TAGS, SVG_ATTRIBUTE_NS, SVG_NAMESPACE, VOID_ELEMENTS, isBooleanAttribute, isIDLFormProperty, isStaticMarkup, isVoidElement, normalizeClassValue, normalizeStyleValue, parseEventName, toDOMString };
//# sourceMappingURL=AreHTML.constants.mjs.map
//# sourceMappingURL=AreHTML.constants.mjs.map