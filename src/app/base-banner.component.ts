import { ApplicationRef, ChangeDetectorRef, Renderer2 } from '@angular/core';

declare const dataLayer: any;

function gtm(event: any) {
   if (window['dataLayer']) {
     dataLayer.push(event);
   }
}

export abstract class BaseBannerComponent {

  abstract bannerKey = '';
  abstract bannerClass = '';
  abstract uniqueId = '';

  get id() {
    return `${this.bannerKey}${this.uniqueId}`;
  }

  protected visible = false;
  protected readonly storage: Storage;
  protected readonly openEvent = 'akveo-banner-init';
  protected readonly closeEvent = 'akveo-banner-close';
  protected readonly ctaClickEvent = 'akveo-banner-cta-click';
  protected readonly hideMinWidthMQ = '(min-width: 767px)';


  protected constructor(protected cd: ChangeDetectorRef,
                        protected appRef: ApplicationRef,
                        protected renderer: Renderer2) {
    this.storage = window.localStorage;
  }

  close() {
    this.storage.setItem(this.id, 'true');
    this.changeVisibility(false);

    this.fireEvent(this.closeEvent);
  }

  cta() {
    this.fireEvent(this.ctaClickEvent);
  }

  protected refresh() {
    this.cd.markForCheck();
    this.appRef.tick();
  }

  protected listenToVisibilityChange() {

    const visibilityChange = (mq) => {
      const visible = mq.matches && !this.isHiddenByUser();
      this.changeVisibility(visible);
    };

    const mediaQuery = window.matchMedia(this.hideMinWidthMQ);
    mediaQuery.addListener(visibilityChange);

    visibilityChange(mediaQuery);
  }

  protected changeVisibility(visible: boolean) {
    this.visible = visible;
    if (this.visible) {
      this.renderer.addClass(document.documentElement, this.bannerClass);
    } else {
      this.renderer.removeClass(document.documentElement, this.bannerClass);
    }

    this.refresh();
  }

  protected isHiddenByUser() {
    return this.storage && this.storage.getItem(this.id) ? true : null;
  }

  protected fireEvent(name: string) {
    const event = new CustomEvent(name, { detail: { banner: this } });
    document.dispatchEvent(event);

    this.fireDataLayer(name, this.uniqueId, this);
  }

  protected fireDataLayer(name: string, label: string, data: any) {
    gtm({
      event: 'logEvent',
      eventCategory: 'Akveo Banner',
      eventType: name,
      eventLabel: label,
      eventProperties: data,
    });
  }
}
