export type Place = {
    [holder: string]: string;
};

function placeholder(string: string, place: Place) {
    const placeholders = Object.keys(place).sort(
        (a, b) => b.length - a.length || b.localeCompare(a), // sort by length, if equal then // sort by dictionary order
    );
    let finalString = string;
    placeholders.forEach((holder) => {
        if (place[holder]) {
            const ucFirstHolder = `${holder
                .charAt(0)
                .toUpperCase()}${holder.substr(1)}`;
            const upperHolder = `${holder.toUpperCase()}`;
            const word = place[holder];
            const ucFirstWord = `${word.charAt(0).toUpperCase()}${word.substr(
                1,
            )}`;
            const upperWord = `${word.toUpperCase()}`;
            finalString = finalString.replace(
                new RegExp(`:${upperHolder}`, 'g'),
                upperWord,
            );
            finalString = finalString.replace(
                new RegExp(`:${ucFirstHolder}`, 'g'),
                ucFirstWord,
            );
            finalString = finalString.replace(
                new RegExp(`:${holder}`, 'g'),
                word,
            );
        }
    });
    return finalString;
}

function plainText(string: string, place: Place) {
    const placeholders = Object.keys(place).sort(
        (a, b) => b.length - a.length || b.localeCompare(a), // sort by length, if equal then // sort by dictionary order
    );
    let finalString = string;
    placeholders.forEach((holder) => {
        if (place[holder]) {
            const word = place[holder];
            finalString = finalString.replace(
                new RegExp(`${holder}`, 'gi'),
                word,
            );
        }
    });
    return finalString;
}

export default placeholder;
export {placeholder, plainText};
