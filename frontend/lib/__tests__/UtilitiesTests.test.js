import { Utilities } from '../Utilities';

describe('Utilities Library', () => {
    it('getNextAvailableValue()', () => {
        expect(Utilities.getNextAvailableValue([{ key: 1 }, { key: 2 }, { key: 3 }])).toEqual(4);
        expect(Utilities.getNextAvailableValue([{ key: 1 }, { key: 3 }])).toEqual(4);
        expect(
            Utilities.getNextAvailableValue([{ key: 1 }, { key: 2 }, { key: 7 }, { key: 5 }, { key: 4 }, { key: 3 }])
        ).toEqual(8);
        expect(Utilities.getNextAvailableValue([{ idx: 1 }, { idx: 2 }, { idx: 3 }], 'idx')).toEqual(4);
    });

    it('convertCookingTime()', () => {
        expect(Utilities.convertCookingTime(50)).toEqual('50 minutes');
        expect(Utilities.convertCookingTime(83)).toEqual('1 hour, 23 minutes');
        expect(Utilities.convertCookingTime(301)).toEqual('5 hours, 1 minute');
        expect(Utilities.convertCookingTime(2)).toEqual('2 minutes');
        expect(Utilities.convertCookingTime(125)).toEqual('2 hours, 5 minutes');
    });

    it('convertIDArray()', () => {
        expect(Utilities.convertIDArray([{ id: 1 }, { id: 2 }, { id: 3 }])).toEqual([1, 2, 3]);
        expect(Utilities.convertIDArray([{ id: 1 }, { id: 2 }, { id: 6 }])).toEqual([1, 2, 6]);
        expect(Utilities.convertIDArray([{ id: 4 }, { id: 2 }, { id: 3 }])).toEqual([4, 2, 3]);
    });

    it('toTitleCase()', () => {
        expect(Utilities.toTitleCase('hello world')).toEqual('Hello World');
        expect(Utilities.toTitleCase('helloworld')).toEqual('Helloworld');
        expect(Utilities.toTitleCase('this Is a recipE')).toEqual('This Is A Recipe');
    });

    it('Box Colors Are Correct', () => {
        expect(Utilities.boxColors.length).toEqual(5);
        expect(Utilities.boxColors).toEqual(['gray', 'blue', 'green', 'orange', 'purple']);
    });
});
