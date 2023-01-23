// eslint-disable-next-line import/prefer-default-export
const winCombination = {
    /*  Xx: [
         [100, 0, 0, 0, 0],
         [0, 0, 0, 0, 0],
         [0, 0, 0, 0, 0],
         [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],

     ],
     Xx2: [
        [0, 0, 0, 0, 100],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
       [0, 0, 0, 0, 0],

    ], */
    /*  Xx3: [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
       [100, 0, 0, 0, 0],

    ], */
    Xx4: [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 100],

    ],
    X: [
        [100, 0, 0, 0, 100],
        [0, 100, 0, 100, 0],
        [0, 0, 0, 0, 0],
        [0, 100, 0, 100, 0],
        [100, 0, 0, 0, 100],

    ],

    l: [
        [100, 100, 100, 100, 100],
        [0, 0, 0, 0, 100],
        [0, 0, 0, 0, 100],
        [0, 0, 0, 0, 100],
        [0, 0, 0, 0, 100],
    ],
    T: [
        [100, 0, 0, 0, 0],
        [100, 0, 0, 0, 0],
        [100, 100, 0, 100, 100],
        [100, 0, 0, 0, 0],
        [100, 0, 0, 0, 0],

    ],
    luckySeven: [

        [100, 0, 0, 0, 100],
        [100, 0, 0, 100, 0],
        [100, 0, 0, 0, 0],
        [100, 100, 0, 0, 0],
        [100, 0, 0, 0, 0],
    ],
    allAroundFree: [
        [0, 0, 0, 0, 0],
        [0, 100, 100, 100, 0],
        [0, 100, 0, 100, 0],
        [0, 100, 100, 100, 0],
        [0, 0, 0, 0, 0],
    ],
    crayzyBingo: [
        [100, 100, 100, 100, 100],
        [0, 100, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 100, 0],
        [0, 0, 0, 0, 100],
    ],
    threeOnTwoSides: [
        [0, 100, 100, 100, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 100, 100, 100, 0],
    ],
    sixPackSe: [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 100, 100, 100],
        [0, 0, 100, 100, 100],
    ],
    sixPackNe: [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [100, 100, 100, 0, 0],
        [100, 100, 100, 0, 0],
    ],
    sixPackSw: [
        [0, 0, 100, 100, 100],
        [0, 0, 100, 100, 100],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],

    ],
    sixPackNw: [
        [100, 100, 100, 0, 0],
        [100, 100, 100, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],

    ],
    fifthColumn: [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [100, 100, 100, 100, 100],
    ],
    fourColumn: [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [100, 100, 100, 100, 100],
        [0, 0, 0, 0, 0],
    ],
    thirdColumn: [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [100, 100, 0, 100, 100],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
    ],

    secondColumn: [
        [0, 0, 0, 0, 0],
        [100, 100, 100, 100, 100],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
    ],
    firstColumn: [
        [100, 100, 100, 100, 100],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
    ],
    fifthRow: [
        [0, 0, 0, 0, 100],
        [0, 0, 0, 0, 100],
        [0, 0, 0, 0, 100],
        [0, 0, 0, 0, 100],
        [0, 0, 0, 0, 100],
    ],
    fourRow: [
        [0, 0, 0, 100, 0],
        [0, 0, 0, 100, 0],
        [0, 0, 0, 100, 0],
        [0, 0, 0, 100, 0],
        [0, 0, 0, 100, 0],
    ],

    thirdRow: [
        [0, 0, 100, 0, 0],
        [0, 0, 100, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 100, 0, 0],
        [0, 0, 100, 0, 0],
    ],

    secondRow: [
        [0, 100, 0, 0, 0],
        [0, 100, 0, 0, 0],
        [0, 100, 0, 0, 0],
        [0, 100, 0, 0, 0],
        [0, 100, 0, 0, 0],
    ],
    firstRow: [
        [100, 0, 0, 0, 0],
        [100, 0, 0, 0, 0],
        [100, 0, 0, 0, 0],
        [100, 0, 0, 0, 0],
        [100, 0, 0, 0, 0],
    ],
    fourCorners: [
        [100, 0, 0, 0, 100],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [100, 0, 0, 0, 100],
    ],
    foursmallCornes: [
        [0, 0, 0, 0, 0],
        [0, 100, 0, 100, 0],
        [0, 0, 0, 0, 0],
        [0, 100, 0, 100, 0],
        [0, 0, 0, 0, 0],
    ],
    fourAroundFree: [
        [0, 0, 0, 0, 0],
        [0, 0, 100, 0, 0],
        [0, 100, 0, 100, 0],
        [0, 0, 100, 0, 0],
        [0, 0, 0, 0, 0],

    ],
    fourSides: [
        [0, 0, 100, 0, 0],
        [0, 0, 0, 0, 0],
        [100, 0, 0, 0, 100],
        [0, 0, 0, 0, 0],
        [0, 0, 100, 0, 0],
    ],
    diagonalNESW: [
        [0, 0, 0, 0, 100],
        [0, 0, 0, 100, 0],
        [0, 0, 0, 0, 0],
        [0, 100, 0, 0, 0],
        [100, 0, 0, 0, 0],
    ],
    diagonalNWSE: [
        [100, 0, 0, 0, 0],
        [0, 100, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 100, 0],
        [0, 0, 0, 0, 100],
    ],
    smallVWest: [
        [100, 0, 0, 0, 100],
        [0, 100, 0, 100, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
    ],
    smallVEast: [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 100, 0, 100, 0],
        [100, 0, 0, 0, 100],
    ],
    smallVSouth: [
        [0, 0, 0, 0, 100],
        [0, 0, 0, 100, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 100, 0],
        [0, 0, 0, 0, 100],
    ],
    smallVNor: [
        [100, 0, 0, 0, 0],
        [0, 100, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 100, 0, 0, 0],
        [100, 0, 0, 0, 0],
    ],
};

export default winCombination;