(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const JS_EXAMPLE_EL_QUERY$1 = 'code[class*="example-javascript"]';
const HTML_EXAMPLE_EL_QUERY$1 = 'code[class*="example-html"]';
const htmlEscape$1 = (text) => {
  return text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
};
function parseExampleFunctions(code) {
  const example = [];
  let functionLines = [];
  const DEMO_INDICATOR = /^(export(\s*))?function(\s+)demo(\w)+(\s)*\(/gm;
  const state = {
    inFunction: false,
    openCurly: 0,
    closeCurly: 0
  };
  for (const line of code.split("\n")) {
    if (!state.inFunction) {
      const trimmedLine = line.trim();
      if (trimmedLine.search(DEMO_INDICATOR) === 0) {
        state.inFunction = true;
      }
    }
    if (state.inFunction) {
      functionLines.push(line);
      const { openCurly, closeCurly } = countCurly(line);
      state.openCurly += openCurly;
      state.closeCurly += closeCurly;
      if (state.openCurly === state.closeCurly) {
        state.inFunction = false;
        state.openCurly = 0;
        state.closeCurly = 0;
        example.push(parseCode(functionLines));
        functionLines = [];
      }
    }
  }
  return example;
}
function countCurly(line) {
  const length = line.length;
  const openCurly = length - line.replaceAll("{", "").length;
  const closeCurly = length - line.replaceAll("}", "").length;
  return { openCurly, closeCurly };
}
function showExampleCode$1(example, fmt = { js: htmlEscape$1, html: htmlEscape$1 }) {
  const { js, html, elId } = { ...example };
  const el = document.getElementById(elId);
  if (el) {
    try {
      const jsContainer = el.querySelector(JS_EXAMPLE_EL_QUERY$1);
      jsContainer.innerHTML = fmt.js(js);
      const htmlContainer = el.querySelector(HTML_EXAMPLE_EL_QUERY$1);
      htmlContainer.innerHTML = fmt.html(html);
    } catch (e) {
      throw new Error(`Container id ${elId} does not contain ${JS_EXAMPLE_EL_QUERY$1} or ${HTML_EXAMPLE_EL_QUERY$1}`);
    }
  } else {
    throw new Error(`Container element with id="${elId}" not found`);
  }
}
function parseCode(functionLines) {
  const HTML_INDICATOR = "// <";
  const FUNCTION_INDENT_SIZE = 4;
  const js = [];
  const html = [];
  const functionBodyLines = functionLines.slice(2, -1);
  if (functionBodyLines.length === 0) {
    js.push("/* function is minified */");
    html.push("<!-- function is minified -->");
  }
  for (const line of functionBodyLines) {
    const chars = line.trim();
    if (chars.startsWith(HTML_INDICATOR)) {
      html.push(chars.slice(HTML_INDICATOR.length - 1));
    } else {
      js.push(line.slice(FUNCTION_INDENT_SIZE).trimEnd());
    }
  }
  const elId = parseElId(functionLines[1]);
  return { js: js.join("\n"), html: html.join("\n"), elId };
}
function parseElId(line) {
  line = line.trim();
  const EL_ID_INDICATOR = "// tag:";
  if (line.startsWith(EL_ID_INDICATOR)) {
    return line.slice(EL_ID_INDICATOR.length).trim();
  }
  throw new Error(`'${line}' not started with ${EL_ID_INDICATOR}`);
}
const JS_EXAMPLE_EL_QUERY = 'code[class*="example-javascript"]';
const HTML_EXAMPLE_EL_QUERY = 'code[class*="example-html"]';
const htmlEscape = (text) => {
  return text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
};
function showExampleCode(example, fmt = { js: htmlEscape, html: htmlEscape }) {
  const { js, html, elId } = { ...example };
  const el = document.getElementById(elId);
  if (el) {
    try {
      const jsContainer = el.querySelector(JS_EXAMPLE_EL_QUERY);
      jsContainer.innerHTML = fmt.js(js);
      const htmlContainer = el.querySelector(HTML_EXAMPLE_EL_QUERY);
      htmlContainer.innerHTML = fmt.html(html);
    } catch (e) {
      throw new Error(`Container id ${elId} does not contain ${JS_EXAMPLE_EL_QUERY} or ${HTML_EXAMPLE_EL_QUERY}`);
    }
  } else {
    throw new Error(`Container element with id="${elId}" not found`);
  }
}
function formatFancy(text) {
  const escaped = htmlEscape$1(text);
  return `<span style="color:#fe2f33">${escaped}</span>`;
}
function demoUsageFormatFancy() {
  const text = "Funny texts don't need Comic Sans";
  const fancy = formatFancy(text);
  document.getElementById("ff-result").innerHTML = fancy;
}
function demoRunDemoFunction() {
  demoUsageFormatFancy();
}
function demoShowDemoFunction() {
  const demoFn = demoUsageFormatFancy.toString();
  const example = parseExampleFunctions(demoFn)[0];
  showExampleCode(example);
}
function showHowtoPrepareCode() {
  const parsedExample = parseExampleFunctions(demoUsageFormatFancy.toString())[0];
  const jsbody = parsedExample.js.split("\n").map((l) => `    ${l}`).join("\n");
  const howtoPrepareExampleCode = {
    js: `export function ${demoUsageFormatFancy.name}() {
${jsbody}
}`,
    html: parsedExample.html,
    elId: "howto-prepare-demo-function"
  };
  showExampleCode$1(howtoPrepareExampleCode);
}
function showHowtoRunDemonstration() {
  const js = demoRunDemoFunction.toString();
  const example = parseExampleFunctions(js)[0];
  showExampleCode$1(example);
}
function showHowtoMarkNeededHTMLElement() {
  const js = demoUsageFormatFancy.toString();
  const howtoMarkElementExample = {
    js,
    html: `<div id="fancy-demo">
    <pre><code class="example-javascript"></code></pre>
    <pre><code class="example-html"></code></pre>
</div>`,
    elId: "howto-mark-demo-info"
  };
  showExampleCode$1(howtoMarkElementExample);
}
function showDemoCodeInFunction() {
  const js = demoShowDemoFunction.toString();
  const example = parseExampleFunctions(js)[0];
  showExampleCode$1(example);
}
function showDemoFunctionAgain() {
  const demoFn = demoUsageFormatFancy.toString();
  const example = parseExampleFunctions(demoFn)[0];
  example.elId = "duplicate-fancy-demo";
  showExampleCode$1(example);
}
document.addEventListener("DOMContentLoaded", () => {
  demoUsageFormatFancy();
  demoShowDemoFunction();
  showHowtoPrepareCode();
  showHowtoRunDemonstration();
  showHowtoMarkNeededHTMLElement();
  showDemoCodeInFunction();
  showDemoFunctionAgain();
});
