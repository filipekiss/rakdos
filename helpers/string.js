function placeholder(string, place) {
    const placeholders = Object.keys(place).sort(
        (a, b) => b.length - a.length || b.localeCompare(a) // sort by length, if equal then // sort by dictionary order
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
                1
            )}`;
            const upperWord = `${word.toUpperCase()}`;
            finalString = finalString.replace(
                new RegExp(`:${upperHolder}`, 'g'),
                upperWord
            );
            finalString = finalString.replace(
                new RegExp(`:${ucFirstHolder}`, 'g'),
                ucFirstWord
            );
            finalString = finalString.replace(
                new RegExp(`:${holder}`, 'g'),
                word
            );
        }
    });
    return finalString;
}

module.exports = {
    placeholder,
};
