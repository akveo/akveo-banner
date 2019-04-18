import {
  AfterViewInit,
  ApplicationRef,
  ChangeDetectorRef,
  Component,
  HostBinding,
  Input,
  OnInit,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as tinycolor from 'tinycolor2';
import { BaseBannerComponent } from '../base-banner.component';

@Component({
  selector: 'akveo-banner',
  templateUrl: './akveo-banner.component.html',
  styleUrls: ['./akveo-banner.component.scss'],
  encapsulation: ViewEncapsulation.Native
})
export class AkveoBannerComponent extends BaseBannerComponent implements OnInit, AfterViewInit {

  bannerClass = 'akveo-banner';
  bannerKey = 'HIDE_AKVEO_BANNER';

  @HostBinding('attr.hidden')
  get isHidden() {
    return this.visible ? null : true;
  }

  @HostBinding('attr.dir')
  dir = 'ltr';

  @Input() heading = '';
  @Input() ctaText = '';
  @Input() ctaLink = '';
  @Input() imageUrl = '';
  @Input() imageAlt = '';
  @Input() message = '';
  @Input() showClose = true;
  @Input() uniqueId = '';
  @Input() bgGradient = [];

  @HostBinding('style.top')
  @Input() top = '';

  @HostBinding('style.left')
  @Input() left = '';

  @HostBinding('style.right')
  @Input() right = '';

  @HostBinding('style.bottom')
  @Input() bottom = '';

  @HostBinding('style.background-color')
  @Input() bgColor = '';

  @HostBinding('style.background-image')
  get gradient() {
    return this.bgGradient ? `linear-gradient(${this.bgGradient.join(',')})` : '';
  }

  @HostBinding('style.color')
  @Input() textColor = 'white';

  @Input() buttonBgColor = '#fff';
  @Input() buttonTextColor = '#000';

  @HostBinding('style.box-shadow')
  get shadow() {
    const color = this.bgGradient && this.bgGradient.length ? this.bgGradient[1] : this.bgColor;
    return this.createShadow(color);
  }

  get buttonShadow() {
    return this.createShadow(this.buttonBgColor);
  }

  constructor(protected sanitizer: DomSanitizer,
              protected cd: ChangeDetectorRef,
              protected appRef: ApplicationRef,
              protected renderer: Renderer2) {

    super(cd, appRef, renderer);
  }

  ngOnInit() {
    this.listenToVisibilityChange();
  }

  ngAfterViewInit() {
    this.fireEvent(this.openEvent);
  }

  protected createShadow(color: string) {
    const shadowColor = tinycolor(color).setAlpha(0.5);
    return this.sanitizer.bypassSecurityTrustStyle(`0 2px 4px 0 ${shadowColor}`);
  }
}
