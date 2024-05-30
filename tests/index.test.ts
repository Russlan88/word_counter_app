/** @format */

import fs from 'fs';
import { analyzeText } from '../src/analyzeText';
import { analyzeFile } from '../src/analyzeFile';

jest.mock('fs', () => ({
	promises: {
		readFile: jest.fn(),
	},
}));

describe('analyzeText', () => {
	test('should return correct counts', () => {
		const text = 'hello world hello';
		const result = analyzeText(text);

		expect(result.totalWords).toBe(3);
		expect(result.totalLetters).toBe(15);
		expect(result.totalSpaces).toBe(2);
		expect(result.repeatedWords).toEqual([{ word: 'hello', count: 2 }]);
	});

	test('should handle empty text', () => {
		const text = '';
		const result = analyzeText(text);

		expect(result.totalWords).toBe(0);
		expect(result.totalLetters).toBe(0);
		expect(result.totalSpaces).toBe(0);
		expect(result.repeatedWords).toEqual([]);
	});
});

describe('analyzeFile', () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});

	test('should analyze local file correctly', async () => {
		const filePath = './path/to/your/test/file.txt';
		const fileContent = 'hello world hello';

		(fs.promises.readFile as jest.Mock).mockResolvedValue(fileContent);

		const result = await analyzeFile(filePath);

		expect(result.totalWords).toBe(3);
		expect(result.totalLetters).toBe(15);
		expect(result.totalSpaces).toBe(2);
		expect(result.repeatedWords).toEqual([{ word: 'hello', count: 2 }]);
	});
});
