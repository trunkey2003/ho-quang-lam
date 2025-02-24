class Summation {
    static sumIterative(n: number): number {
        if (!this.isValidInput(n)) throw new Error("Invalid input: n must be a positive integer.");
        
        let sum = 0;
        for (let i = 1; i <= n; i++) {
            sum += i;
        }
        return sum;
    }


    static sumFormula(n: number): number {
        if (!this.isValidInput(n)) throw new Error("Invalid input: n must be a positive integer.");
        
        return (n * (n + 1)) / 2;
    }


    static sumRecursive(n: number): number {
        if (!this.isValidInput(n)) throw new Error("Invalid input: n must be a positive integer.");
        
        return n === 1 ? 1 : n + this.sumRecursive(n - 1);
    }

    private static isValidInput(n: number): boolean {
        return Number.isInteger(n) && n > 0;
    }
}

function main(): void {
    try {
        const n = Math.floor(Math.random() * 1000) + 1; 
        console.log(`Sum of 1 to ${n} (Iterative): ${Summation.sumIterative(n)}`);
        console.log(`Sum of 1 to ${n} (Formula)  : ${Summation.sumFormula(n)}`);
        console.log(`Sum of 1 to ${n} (Recursive): ${Summation.sumRecursive(n)}`);
    } catch (error) {
        console.error(`Error: ${(error as Error).message}`);
    }
}

main();
