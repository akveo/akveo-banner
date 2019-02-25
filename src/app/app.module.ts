import { BrowserModule } from '@angular/platform-browser';
import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { AkveoBannerComponent } from './akveo-banner.component';

@NgModule({
  declarations: [
    AkveoBannerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  entryComponents: [AkveoBannerComponent]
})
export class AppModule {

  constructor(private injector: Injector) {
    const customElement = createCustomElement(AkveoBannerComponent, { injector });
    customElements.define('akveo-banner', customElement);
  }

  ngDoBootstrap() {}
}
