// The following dependency crashes the build
import A from "@packages/a";

const a = new A;

console.log("hi", a.bugger);
