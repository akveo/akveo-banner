import { BrowserModule } from '@angular/platform-browser';
import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { AkveoBannerComponent } from './banner/akveo-banner.component';
import { AkveoNewsLineComponent } from './news-line/akveo-news-line.component';

@NgModule({
  declarations: [
    AkveoBannerComponent,
    AkveoNewsLineComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  entryComponents: [AkveoBannerComponent, AkveoNewsLineComponent]
})
export class AppModule {

  constructor(private injector: Injector) {
    const customElementBanner = createCustomElement(AkveoBannerComponent, { injector });
    customElements.define('akveo-banner', customElementBanner);

    const customElementNewsLine = createCustomElement(AkveoNewsLineComponent, { injector });
    customElements.define('akveo-news-line', customElementNewsLine);
  }

  ngDoBootstrap() {}
}
