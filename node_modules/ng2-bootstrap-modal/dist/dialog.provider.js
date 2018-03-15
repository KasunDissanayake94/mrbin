"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dialog_service_1 = require("./dialog.service");
var core_1 = require("@angular/core");
exports._config = {
    container: null
};
function dialogFactory(resolver, applicationRef, injector) {
    return new dialog_service_1.DialogService(resolver, applicationRef, injector, exports._config);
}
exports.dialogFactory = dialogFactory;
function dialogProvider(config) {
    exports._config.container = config.container;
    return {
        provide: dialog_service_1.DialogService,
        useFactory: function () { },
        deps: [core_1.ComponentFactoryResolver, core_1.ApplicationRef, core_1.Injector]
    };
}
exports.dialogProvider = dialogProvider;
//# sourceMappingURL=dialog.provider.js.map