var tape = require('tape');
var locale = require('./');

var availableLocales = [
    'en-US',
    'en-GB',
    'es',
    'es-ES',
    'pt-PT',
    'tr',
    'zh-Hans'
];

tape('test bestMatchingLocale', function(t) {
    t.equal(locale.bestMatchingLocale('EN', availableLocales), 'en-US');
    t.equal(locale.bestMatchingLocale('en', availableLocales), 'en-US');
    t.equal(locale.bestMatchingLocale('en-GB', availableLocales), 'en-GB');
    t.equal(locale.bestMatchingLocale('en-gb', availableLocales), 'en-GB');
    t.equal(locale.bestMatchingLocale('en_gb', availableLocales), 'en-GB');
    t.equal(locale.bestMatchingLocale('foobar', availableLocales), null);
    t.equal(locale.bestMatchingLocale('es-MX', availableLocales), 'es');
    t.equal(locale.bestMatchingLocale('es-mx', availableLocales), 'es');
    t.equal(locale.bestMatchingLocale('zh-Hans-region', availableLocales), 'zh-Hans');
    t.equal(locale.bestMatchingLocale('pt-BR', availableLocales), 'pt-PT');
    t.throws(function () {
        locale.bestMatchingLocale('en', ['foobar']);
    }, /foobar/);
    t.end();
});

tape('test parseLocaleIntoCodes', function(t) {
    t.deepEqual(locale.parseLocaleIntoCodes('en'), {
        locale: 'en',
        language: 'en',
        script: undefined,
        region: undefined
    });

    t.deepEqual(locale.parseLocaleIntoCodes('es-MX'), {
        locale: 'es-MX',
        language: 'es',
        script: undefined,
        region: 'MX'
    });

    t.deepEqual(locale.parseLocaleIntoCodes('spa-ES'), {
        locale: 'spa-ES',
        language: 'spa',
        script: undefined,
        region: 'ES'
    });

    t.deepEqual(locale.parseLocaleIntoCodes('zh-hans-HK'), {
        locale: 'zh-Hans-HK',
        language: 'zh',
        script: 'Hans',
        region: 'HK'
    });
    
    t.equal(locale.parseLocaleIntoCodes('foobar'), null);
    
    t.end();
});
