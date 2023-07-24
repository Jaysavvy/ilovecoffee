"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoffeeRefactor1689961976341 = void 0;
class CoffeeRefactor1689961976341 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "coffee" RENAME COLUMN "name" TO "title"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "coffee" RENAME COLUMN "name" TO "title"`);
    }
}
exports.CoffeeRefactor1689961976341 = CoffeeRefactor1689961976341;
//# sourceMappingURL=1689961976341-CoffeeRefactor.js.map