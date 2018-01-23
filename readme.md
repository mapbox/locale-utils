## Locale Utils

A helper library for finding an appropriate locale from a list of available locales given an input locale.

### Installation

```
npm install @mapbox/locale-utils --save
```

### Usage

```js
var locale = require('@mapbox/locale-utils');

var availableLocales = [
    'en-US',
    'en-GB',
    'es-ES',
    'pt-PT',
    'tr',
    'zh-Hans'
];

// Find the best fitting locale given an input locale
var newLocale = locale.bestMatchingLocale('es-MX', availableLocales));
// Returns `es-ES` since `es-MX` is not an available locale.


// Parse a locale into smaller, easier to understand pieces.
var codedLocale = locale.parseLocaleIntoCodes('es-MX');
// Returns:
// {
//     locale: 'es-MX',
//     language: 'es',
//     script: undefined,
//     region: 'MX'
// }

```
