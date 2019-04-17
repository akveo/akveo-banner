## Akveo Banner Web Component

Akveo News banner built on top of Angular Elements.

For internal usage.


## How To Use

1. Include the script
2. Instantiate the banner component

```js
var banner = this.document.createElement('akveo-banner');
banner.uniqueId = "some-banner-id";
banner.imageUrl = "https://i.imgur.com/8lN9Ivk.png";
banner.heading = "Great news! We released something!";
banner.ctaText = "Check Out";
banner.ctaLink = "https://akveo.com";
banner.message = "to learn more";
banner.bgGradient = ['to left', '#6BD596', '#AEE18F'];
banner.buttonBgColor = '#FC5C89';
banner.buttonTextColor = '#fff'; 
banner.top = '20vh';
banner.right = '1.5rem';

```

or 

```js
var banner = this.document.createElement('akveo-news-line');
banner.uniqueId = "some-banner-id";
banner.ctaText = "Try a beta now!";
banner.ctaLink = "https://akveo.com";
banner.messageStart = "Congrats! You have access to the app.";
banner.bgGradient = ['270deg', '#5B18FF 0%', '#1849FF 100%'];
banner.messageEnd = "We need your feedback.";
````

3. Append to body

```js
document.body.appendChild(banner);
```

## How To Validate

1. make changes
2. build `npm run build:elements`
3. run `http-server ./` and open http://127.0.0.1:8081/test.html

## How To Release

1. make changes, commit
2. update `scripts/package.json` version
3. run `npm run release`
