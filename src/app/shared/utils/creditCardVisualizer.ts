import { creditCardNormalizer } from "./creditCardNormalizer";

export function creditCardVisualizer(number: string): string {
    number = creditCardNormalizer(number);
    if (number.length < 5)
        return number;

    if (number.length < 9)
        return number.substring(0, 4) + ' ' +
            number.substring(4, number.length);

    if (number.length < 13)
        return number.substring(0, 4) + ' ' +
            number.substring(4, 8) + ' ' +
            number.substring(8, number.length);

    if (number.length < 17)
        return number.substring(0, 4) + ' ' +
            number.substring(4, 8) + ' ' +
            number.substring(8, 12) + ' ' +
            number.substring(12, number.length);

    // nubmer.length > 16
    return number.substring(0, 4) + ' ' +
        number.substring(4, 8) + ' ' +
        number.substring(8, 12) + ' ' +
        number.substring(12, 16);
    ;

}
