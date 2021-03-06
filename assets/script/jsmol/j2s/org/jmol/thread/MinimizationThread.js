Clazz.declarePackage ("org.jmol.thread");
Clazz.load (["org.jmol.thread.JmolThread"], "org.jmol.thread.MinimizationThread", ["org.jmol.util.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.minimizer = null;
Clazz.instantialize (this, arguments);
}, org.jmol.thread, "MinimizationThread", org.jmol.thread.JmolThread);
Clazz.makeConstructor (c$, 
function (minimizer, viewer) {
Clazz.superConstructor (this, org.jmol.thread.MinimizationThread);
this.setViewer (viewer, "MinimizationThread");
this.minimizer = minimizer;
}, "org.jmol.api.MinimizerInterface,org.jmol.viewer.Viewer");
Clazz.overrideMethod (c$, "run1", 
function (mode) {
while (true) switch (mode) {
case -1:
this.lastRepaintTime = this.startTime;
if (!this.minimizer.startMinimization ()) return;
this.viewer.startHoverWatcher (false);
mode = 0;
break;
case 0:
if (!this.minimizer.minimizationOn () || this.checkInterrupted ()) {
mode = -2;
break;
}this.currentTime = System.currentTimeMillis ();
var elapsed = (this.currentTime - this.lastRepaintTime);
var sleepTime = 33 - elapsed;
if (!this.runSleep (sleepTime, 1)) return;
mode = 1;
break;
case 1:
this.lastRepaintTime = this.currentTime = System.currentTimeMillis ();
mode = (this.minimizer.stepMinimization () ? 0 : -2);
break;
case -2:
this.minimizer.endMinimization ();
this.viewer.startHoverWatcher (true);
return;
}

}, "~N");
Clazz.overrideMethod (c$, "oops", 
function (e) {
if (this.minimizer.minimizationOn ()) org.jmol.util.Logger.error (e.toString ());
}, "Exception");
});
