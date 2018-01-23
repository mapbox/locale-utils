## Locale Utils

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
var newLocale = locale.bestMatchingLocale('es-MX', availableLocales), 'es-ES');

var localeCodes = locale.parseLocaleIntoCodes('es-MX');
// Returns:
// {
//     locale: 'es-MX',
//     language: 'es',
//     script: undefined,
//     region: 'MX'
// }

```
