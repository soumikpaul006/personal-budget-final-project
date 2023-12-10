const Budget = require('../models/Budget');

describe('Budget Model', () => {
    describe('calculateTotal', () => {
        it('should correctly calculate the total of budget entries', () => {
            // Example budget entries
            const entries = [
                { amount: 100 },
                { amount: 200 },
                { amount: 300 }
            ];

            const budget = new Budget(entries);
            const total = budget.calculateTotal();

            expect(total).toBe(600); 
        });
    });
});
