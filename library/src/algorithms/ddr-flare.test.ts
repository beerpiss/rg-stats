import t from "tap";
import {TestCase} from "../test-utils/test-case";
import {ThrowsToSnapshot} from "../test-utils/throw-snapshot";
import {calculate} from "./ddr-flare";

const testCases = [
    [1, 0, 145],
    [1, 1, 153],
    [1, 2, 162],
    [1, 3, 171],
    [1, 4, 179],
    [1, 5, 188],
    [1, 6, 197],
    [1, 7, 205],
    [1, 8, 214],
    [1, 9, 223],
    [1, 10, 232],
    [2, 0, 155],
    [2, 1, 164],
    [2, 2, 173],
    [2, 3, 182],
    [2, 4, 192],
    [2, 5, 201],
    [2, 6, 210],
    [2, 7, 220],
    [2, 8, 229],
    [2, 9, 238],
    [2, 10, 248],
    [3, 0, 170],
    [3, 1, 180],
    [3, 2, 190],
    [3, 3, 200],
    [3, 4, 210],
    [3, 5, 221],
    [3, 6, 231],
    [3, 7, 241],
    [3, 8, 251],
    [3, 9, 261],
    [3, 10, 272],
    [4, 0, 185],
    [4, 1, 196],
    [4, 2, 207],
    [4, 3, 218],
    [4, 4, 229],
    [4, 5, 240],
    [4, 6, 251],
    [4, 7, 262],
    [4, 8, 273],
    [4, 9, 284],
    [4, 10, 296],
    [5, 0, 205],
    [5, 1, 217],
    [5, 2, 229],
    [5, 3, 241],
    [5, 4, 254],
    [5, 5, 266],
    [5, 6, 278],
    [5, 7, 291],
    [5, 8, 303],
    [5, 9, 315],
    [5, 10, 328],
    [6, 0, 230],
    [6, 1, 243],
    [6, 2, 257],
    [6, 3, 271],
    [6, 4, 285],
    [6, 5, 299],
    [6, 6, 312],
    [6, 7, 326],
    [6, 8, 340],
    [6, 9, 354],
    [6, 10, 368],
    [7, 0, 255],
    [7, 1, 270],
    [7, 2, 285],
    [7, 3, 300],
    [7, 4, 316],
    [7, 5, 331],
    [7, 6, 346],
    [7, 7, 362],
    [7, 8, 377],
    [7, 9, 392],
    [7, 10, 408],
    [8, 0, 290],
    [8, 1, 307],
    [8, 2, 324],
    [8, 3, 342],
    [8, 4, 359],
    [8, 5, 377],
    [8, 6, 394],
    [8, 7, 411],
    [8, 8, 429],
    [8, 9, 446],
    [8, 10, 464],
    [9, 0, 335],
    [9, 1, 355],
    [9, 2, 375],
    [9, 3, 395],
    [9, 4, 415],
    [9, 5, 435],
    [9, 6, 455],
    [9, 7, 475],
    [9, 8, 495],
    [9, 9, 515],
    [9, 10, 536],
    [10, 0, 400],
    [10, 1, 424],
    [10, 2, 448],
    [10, 3, 472],
    [10, 4, 496],
    [10, 5, 520],
    [10, 6, 544],
    [10, 7, 568],
    [10, 8, 592],
    [10, 9, 616],
    [10, 10, 640],
    [11, 0, 465],
    [11, 1, 492],
    [11, 2, 520],
    [11, 3, 548],
    [11, 4, 576],
    [11, 5, 604],
    [11, 6, 632],
    [11, 7, 660],
    [11, 8, 688],
    [11, 9, 716],
    [11, 10, 744],
    [12, 0, 510],
    [12, 1, 540],
    [12, 2, 571],
    [12, 3, 601],
    [12, 4, 632],
    [12, 5, 663],
    [12, 6, 693],
    [12, 7, 724],
    [12, 8, 754],
    [12, 9, 785],
    [12, 10, 816],
    [13, 0, 545],
    [13, 1, 577],
    [13, 2, 610],
    [13, 3, 643],
    [13, 4, 675],
    [13, 5, 708],
    [13, 6, 741],
    [13, 7, 773],
    [13, 8, 806],
    [13, 9, 839],
    [13, 10, 872],
    [14, 0, 575],
    [14, 1, 609],
    [14, 2, 644],
    [14, 3, 678],
    [14, 4, 713],
    [14, 5, 747],
    [14, 6, 782],
    [14, 7, 816],
    [14, 8, 851],
    [14, 9, 885],
    [14, 10, 920],
    [15, 0, 600],
    [15, 1, 636],
    [15, 2, 672],
    [15, 3, 708],
    [15, 4, 744],
    [15, 5, 780],
    [15, 6, 816],
    [15, 7, 852],
    [15, 8, 888],
    [15, 9, 924],
    [15, 10, 960],
    [16, 0, 620],
    [16, 1, 657],
    [16, 2, 694],
    [16, 3, 731],
    [16, 4, 768],
    [16, 5, 806],
    [16, 6, 843],
    [16, 7, 880],
    [16, 8, 917],
    [16, 9, 954],
    [16, 10, 992],
    [17, 0, 635],
    [17, 1, 673],
    [17, 2, 711],
    [17, 3, 749],
    [17, 4, 787],
    [17, 5, 825],
    [17, 6, 863],
    [17, 7, 901],
    [17, 8, 939],
    [17, 9, 977],
    [17, 10, 1016],
    [18, 0, 650],
    [18, 1, 689],
    [18, 2, 728],
    [18, 3, 767],
    [18, 4, 806],
    [18, 5, 845],
    [18, 6, 884],
    [18, 7, 923],
    [18, 8, 962],
    [18, 9, 1001],
    [18, 10, 1040],
    [19, 0, 665],
    [19, 1, 704],
    [19, 2, 744],
    [19, 3, 784],
    [19, 4, 824],
    [19, 5, 864],
    [19, 6, 904],
    [19, 7, 944],
    [19, 8, 984],
    [19, 9, 1024],
    [19, 10, 1064],
];

t.test("DDR Flare Tests", (t) => {
    function MakeTestCase(internalChartLevel: number, flareLevel: number, flare: number): TestCase {
        return (t) =>{
            const result = calculate(internalChartLevel, flareLevel)
            t.equal(
                result,
                flare,
                `Flare ${flareLevel} on level ${internalChartLevel} chart should be worth ${flare} flare points. Got ${result} instead.`
            );
        }
    }

    // This is just one big table stolen from bemaniwiki.

    for (const testCase of testCases) {
        MakeTestCase(testCase[0], testCase[1], testCase[2])(t);
    }

    t.end();
});

t.test("DDR Flare Validation Tests", (t) => {
    ThrowsToSnapshot(
        t,
        () => calculate(-1, 0),
        "Should throw if chart level is negative."
    );
    ThrowsToSnapshot(
        t,
        () => calculate(20, 0),
        "Should throw if chart level is greater than 19."
    );
    ThrowsToSnapshot(
        t,
        () => calculate(1, -1),
        "Should throw if flare level is negative."
    );
    ThrowsToSnapshot(
        t,
        () => calculate(1, 11),
        "Should throw if flare level is greater than 10."
    );

    t.end();
});
