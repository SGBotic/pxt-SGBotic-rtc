

var __main__1 = entryPoint = function (s) {
var r0 = s.r0, step = s.pc;
s.pc = -1;
while (true) {
if (yieldSteps-- < 0 && maybeYield(s, step, r0)) return null;
switch (step) {
  case 0:

    s.lastBrkId = 1;
    r0 = pxsim.Array_.mk(0);
    s.tmp_0 = r0;
    r0 = globals.freqTable___119;
    pxtrt.decr(r0);
    r0 = s.tmp_0;
    globals.freqTable___119 = (r0);
    s.lastBrkId = 2;
    r0 = pxsim.Array_.mk(0);
    s.tmp_0 = r0;
    r0 = pxsim.Array_.push(s.tmp_0, 31);
    r0 = pxsim.Array_.push(s.tmp_0, 28);
    r0 = pxsim.Array_.push(s.tmp_0, 31);
    r0 = pxsim.Array_.push(s.tmp_0, 30);
    r0 = pxsim.Array_.push(s.tmp_0, 31);
    r0 = pxsim.Array_.push(s.tmp_0, 30);
    r0 = pxsim.Array_.push(s.tmp_0, 31);
    r0 = pxsim.Array_.push(s.tmp_0, 31);
    r0 = pxsim.Array_.push(s.tmp_0, 30);
    r0 = pxsim.Array_.push(s.tmp_0, 31);
    r0 = pxsim.Array_.push(s.tmp_0, 30);
    r0 = pxsim.Array_.push(s.tmp_0, 31);
    r0 = globals.DAYS_ARRAY___172;
    pxtrt.decr(r0);
    r0 = s.tmp_0;
    globals.DAYS_ARRAY___172 = (r0);
    s.lastBrkId = 3;
    r0 = pxsim.Array_.mk(0);
    s.tmp_0 = r0;
    r0 = pxsim.Array_.push(s.tmp_0, 0);
    r0 = pxsim.Array_.push(s.tmp_0, 3);
    r0 = pxsim.Array_.push(s.tmp_0, 2);
    r0 = pxsim.Array_.push(s.tmp_0, 5);
    r0 = pxsim.Array_.push(s.tmp_0, 0);
    r0 = pxsim.Array_.push(s.tmp_0, 3);
    r0 = pxsim.Array_.push(s.tmp_0, 5);
    r0 = pxsim.Array_.push(s.tmp_0, 1);
    r0 = pxsim.Array_.push(s.tmp_0, 4);
    r0 = pxsim.Array_.push(s.tmp_0, 6);
    r0 = pxsim.Array_.push(s.tmp_0, 2);
    r0 = pxsim.Array_.push(s.tmp_0, 4);
    r0 = globals.DOW_ARRAY___173;
    pxtrt.decr(r0);
    r0 = s.tmp_0;
    globals.DOW_ARRAY___173 = (r0);
  case 1:
    return leave(s, r0)
  default: oops()
} } }
__main__1.info = {"start":0,"length":0,"line":0,"column":0,"endLine":0,"endColumn":0,"fileName":"pxt_modules/core/dal.d.ts","functionName":"<main>"}
__main__1.continuations = [  ]


setupDebugger(4)

pxsim.setupStringLiterals({})
