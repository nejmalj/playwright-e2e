import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
});

test.describe('numbers', () => {
    test('valid numbers', async ({ page }) => {

    })
    }
)

test.describe('basic operations', () => {
    test('valid sum result', async ({ page }) => {
        await page.locator('.numbers').click();
        await page.locator('#button-sum').click();
        await page.locator('.numbers').click();
        await page.locator('#button-result').click();
        await expect(page.locator('#banner')).toContainText('2');
    });
    test('valid substraction result', async ({ page }) => {
        await page.locator('.numbers').click();
        await page.locator('#button-substraction').click();
        await page.locator('.numbers').click();
        await page.locator('#button-result').click();
        await expect(page.locator('#banner')).toContainText('0');
    });
    test('valid multiplication result', async ({ page }) => {
        await page.locator('.numbers').click();
        await page.locator('#button-multiplication').click();
        await page.locator('.numbers').click();
        await expect(page.locator('#banner')).toContainText('6');
    });
})

test.describe('negative operations', () => {
    test('valid sum result with negative number', async ({ page }) => {
        await page.locator('.numbers').click();
        await page.locator('#button-multiplication').click();
        await page.locator('.numbers').click();
        await page.locator('#button-result').click();
        await expect(page.locator('#banner')).toContainText('0');
    });
    test('valid substraction result with negative number', async ({ page }) => {
        await page.locator('.numbers').click();
        await page.locator('#button-substraction').click();
        await page.locator('.numbers').click();
        await page.locator('#button-result').click();
        await expect(page.locator('#banner')).toContainText('0');
    });
    test('valid multiplication result with negative number', async ({ page }) => {
        await page.locator('.numbers').click();
        await page.locator('#button-multiplication').click();
        await page.locator('.numbers').click();
        await expect(page.locator('#banner')).toContainText('-6');
    });
})

test.describe('reset button', () => {
    test('reset button is working', async ({ page }) => {
        await page.locator('#reset-button').click();
        await expect(page.locator('#banner')).toContainText('0');
    });
})

test.describe('too many operators', () => {
    test('click on more than one operator', async ({ page }) => {
        await page.locator('.operators').click();
        await page.locator('.operators').click();
        await expect(page.locator('#errormessage')).toContainText('Too many operators');
    })
})

test.describe('first value is not a number', () => {
    test('click on an operator first', async ({ page }) => {
        await page.locator('.operators').click();
        await expect(page.locator('#errormessage')).toContainText('You should click on a number first');
    })
})