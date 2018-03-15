import { DialogService, DialogServiceConfig } from "./dialog.service";
import { Injector, ApplicationRef, ComponentFactoryResolver } from "@angular/core";
export declare const _config: DialogServiceConfig;
export declare function dialogFactory(resolver: ComponentFactoryResolver, applicationRef: ApplicationRef, injector: Injector): DialogService;
export declare function dialogProvider(config: DialogServiceConfig): {
    provide: typeof DialogService;
    useFactory: () => void;
    deps: (typeof Injector | typeof ComponentFactoryResolver | typeof ApplicationRef)[];
};
