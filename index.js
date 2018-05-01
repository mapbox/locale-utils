var deprecatedLocales = require('./lib/deprecated-locales.json');

function bestMatchingLocale (inputLocale, availableLocales) {

    /// Normalize
    inputLocale = inputLocale
        .replace(/_/g, '-')
        .toLowerCase();

    availableLocales = availableLocales.map(function(l) {
        return getStandardLanguage(l.toLowerCase());
    });

    var localeCodes = parseLocaleIntoCodes(inputLocale);
    if (!localeCodes) {
        return null;
    }

    if (availableLocales.indexOf(inputLocale) > -1) return localeCodes.locale;

    var languageCode = localeCodes.language;
    var scriptCode = localeCodes.script;
    var regionCode = localeCodes.region;

    // Same language code and script code (lng-Scpt)
    if (includes(availableLocales, languageCode + '-' + scriptCode)) {
        return languageCode + '-' + scriptCode;
    }

    // Same language code and region code (lng-CC)
    if (includes(availableLocales, languageCode + '-' + regionCode)) {
        return languageCode + '-' + regionCode;
    }

    // Same language code (lng)
    if (includes(availableLocales, languageCode)) {
        return languageCode;
    }

    // All available locales, split up into coded pieces
    var availableLocaleCodes = availableLocales.map(parseLocaleIntoCodes);

    // Same language code and any script code (lng-Scpx) and the found language contains a script
    var anyScript = availableLocaleCodes.find(function (localeCode, idx) {
        if (localeCode === null) {
            throw 'Invalid available locale code "' + availableLocales[idx] + '".';
        }
        return localeCode.language === languageCode && localeCode.script;
    });
    if (anyScript) {
        return anyScript.locale;
    }

    // Same language code and any region code (lng-CX)
    var anyCountry = availableLocaleCodes.find(function (localeCode) {
        return localeCode.language === languageCode && localeCode.region;
    });
    if (anyCountry) {
        return anyCountry.locale;
    }

    return null;
}

function parseLocaleIntoCodes (locale) {
    var match = locale.match(/^(\w\w\w?)(?:-(\w\w\w\w))?(?:-(\w\w))?\b/i);
    if (!match) {
        return null;
    }

    var localeParts = [];
    if (match[1]) {
        match[1] = getStandardLanguage(match[1].toLowerCase());
        localeParts.push(match[1]);
    }
    if (match[2]) {
        match[2] = match[2][0].toUpperCase() + match[2].substring(1).toLowerCase();
        localeParts.push(match[2]);
    }
    if (match[3]) {
        match[3] = match[3].toUpperCase();
        localeParts.push(match[3]);
    }

    return {
        locale: localeParts.join('-'),
        language: match[1],
        script: match[2],
        region: match[3]
    };
}

function getStandardLanguage(language) {
    if (deprecatedLocales[language]) {
        return deprecatedLocales[language]
    } else {
        return language;
    }
}

function includes(inArray, toFind) {
    return inArray.indexOf(toFind) > -1;
}


module.exports = {};
module.exports.bestMatchingLocale = bestMatchingLocale;
module.exports.parseLocaleIntoCodes = parseLocaleIntoCodes;
