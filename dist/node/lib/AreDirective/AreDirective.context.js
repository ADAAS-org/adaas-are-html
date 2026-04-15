'use strict';

var aExecution = require('@adaas/a-utils/a-execution');

class AreDirectiveContext extends aExecution.A_ExecutionContext {
  constructor(aseid) {
    super(aseid.toString());
    this.scope = {};
  }
}

exports.AreDirectiveContext = AreDirectiveContext;
//# sourceMappingURL=AreDirective.context.js.map
//# sourceMappingURL=AreDirective.context.js.map