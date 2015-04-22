"use strict";

var PEG = require("pegjs"),
    fs = require("fs"),
    compiler = require("./dist/compiler");
var grammar = fs.readFileSync("grammar.pegjs", { encoding: "utf8" });
var parser = PEG.buildParser(grammar);
var html = fs.readFileSync("test.td", { encoding: "utf8" });
console.log(html);
var ast = parser.parse(html);
console.log(JSON.stringify(ast, null, 2));
console.log("==START COMPILE==\n\n");
var compiledTemplate = compiler.compile(ast, "abc");
console.log("\n\n==END COMPILE==");
console.log("\n\n" + compiledTemplate);
//# sourceMappingURL=test.js.map