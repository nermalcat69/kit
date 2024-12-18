import { expect } from '@playwright/test';
import { test } from '../../../utils.js';

/** @typedef {import('@playwright/test').Response} Response */

test.skip(({ javaScriptEnabled }) => !javaScriptEnabled);

test.describe.configure({ mode: 'parallel' });

test.describe('hash based navigation', () => {
	test('navigation works', async ({ page }) => {
		await page.goto('/');
		await expect(page.locator('p')).toHaveText('home');

		await page.locator('a[href="/a"]').click();
		await expect(page.locator('p')).toHaveText('a');
		let url = new URL(page.url());
		expect(url.pathname).toBe('/');
		expect(url.hash).toBe('#/a');

		await page.locator('button[data-goto]').click();
		await expect(page.locator('p')).toHaveText('b');
		url = new URL(page.url());
		expect(url.pathname).toBe('/');
		expect(url.hash).toBe('#/b');

		await page.locator('a[href="/a#b"]').click();
		await expect(page.locator('p')).toHaveText('a');
		url = new URL(page.url());
		expect(url.pathname).toBe('/');
		expect(url.hash).toBe('#/a#b');

		await page.locator('button[data-push]').click();
		await expect(page.locator('p')).toHaveText('a');
		url = new URL(page.url());
		expect(url.pathname).toBe('/');
		expect(url.hash).toBe('#/b');

		await page.locator('button[data-replace]').click();
		await expect(page.locator('p')).toHaveText('a');
		url = new URL(page.url());
		expect(url.pathname).toBe('/');
		expect(url.hash).toBe('#/a#b');
	});

	test('navigates to correct page on load', async ({ page }) => {
		await page.goto('/#/a');
		await expect(page.locator('p')).toHaveText('a');
	});
});
