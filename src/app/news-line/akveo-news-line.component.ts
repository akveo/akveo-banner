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
import { BaseBannerComponent } from '../base-banner.component';


@Component({
  selector: 'akveo-news-line',
  templateUrl: './akveo-news-line.component.html',
  styleUrls: ['./akveo-news-line.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class AkveoNewsLineComponent extends BaseBannerComponent implements OnInit, AfterViewInit {

  bannerClass = 'akveo-news-line';
  bannerKey = 'HIDE_AKVEO_NEWS_LINE';

  @HostBinding('attr.hidden')
  get isHidden() {
    return this.visible ? null : true;
  }

  @HostBinding('attr.dir')
  dir = 'ltr';

  @Input() ctaText = '';
  @Input() ctaLink = '';
  @Input() messageStart = '';
  @Input() messageEnd = '';
  @Input() showClose = true;
  @Input() uniqueId = '';
  @Input() bgGradient = [];

  @HostBinding('style.background-color')
  @Input() bgColor = '';

  @HostBinding('style.background-image')
  get gradient() {
    return this.bgGradient ? `linear-gradient(${this.bgGradient.join(',')})` : '';
  }

  @HostBinding('style.color')
  @Input() textColor = 'white';

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
}
