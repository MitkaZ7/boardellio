const punctuation = /[!"#$%&'()*+,\-./:;<=>?@[\]^_`{|}~]/g;

export function linkNameCreate(str) {
    return str.replace(punctuation, '').replace(/\s+/g, '-');
}