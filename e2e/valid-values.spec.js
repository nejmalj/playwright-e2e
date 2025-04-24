import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
});

test.describe('basic operations', () => {
    test('valid sum result', async ({ page }) => {
        await page.locator('#2').click();
        await page.locator('#button-sum').click();
        await page.locator('#3').click();
        await page.locator('.btnEqual').click();
        await expect(page.locator('#banner')).toContainText('5');
    });

    test('valid subtraction result', async ({ page }) => {
        await page.locator('#7').click();
        await page.locator('#button-soustraction').click();
        await page.locator('#4').click();
        await page.locator('.btnEqual').click();
        await expect(page.locator('#banner')).toContainText('3');
    });

    test('valid multiplication result', async ({ page }) => {
        await page.locator('#3').click();
        await page.locator('#button-multiplication').click();
        await page.locator('#2').click();
        await page.locator('.btnEqual').click();
        await expect(page.locator('#banner')).toContainText('6');
    });
});

test.describe('reset button', () => {
    test('reset button is working', async ({ page }) => {
        await page.locator('#2').click();
        await page.locator('#reset-button').click();
        await expect(page.locator('#banner')).toContainText('0');
    });
});

test.describe('error handling', () => {
    test('click on operator before number', async ({ page }) => {
        await page.locator('#button-sum').click();
        await expect(page.locator('#errormessage')).toContainText('You should click on a number first');
    });

    test('click on more than one operator', async ({ page }) => {
        await page.locator('#3').click();
        await page.locator('#button-sum').click();
        await page.locator('#button-soustraction').click();
        await expect(page.locator('#errormessage')).toContainText('Too many operators');
    });
});