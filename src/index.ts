/** @format */

import fs from 'fs';
import path from 'path';
import axios from 'axios';

declare const require: NodeJS.Require & { main: NodeModule | undefined };

async function readFile(filePath: string): Promise<string> {
	if (filePath.startsWith('http://') || filePath.startsWith('https://')) {
		const response = await axios.get(filePath);
		return response.data;
	} else {
		return fs.promises.readFile(path.resolve(filePath), 'utf-8');
	}
}

function analyzeText(text: string) {
	const words = text.match(/\b\w+\b/g) || [];
	const letters = text.replace(/[^a-zA-Z]/g, '');
	const spaces = text.split(' ').length - 1;

	const wordCount: { [key: string]: number } = {};
	words.forEach((word) => {
		word = word.toLowerCase();
		wordCount[word] = (wordCount[word] || 0) + 1;
	});

	const repeatedWords = Object.entries(wordCount)
		.filter(([_, count]) => count > 1) // Modificato per testare con conteggio 1
		.map(([word, count]) => ({ word, count }));

	return {
		totalWords: words.length,
		totalLetters: letters.length,
		totalSpaces: spaces,
		repeatedWords,
	};
}

async function analyzeFile(filePath: string) {
	if (!filePath) {
		throw new Error('Please provide a file path.');
	}

	const text = await readFile(filePath);
	return analyzeText(text);
}

async function main() {
	const filePath = process.argv[2];
	try {
		const analysis = await analyzeFile(filePath);
		console.log(analysis);
	} catch (error) {
		if (error instanceof Error) {
			console.error('Error reading file:', error.message);
		} else {
			console.error('An unknown error occurred');
		}
		process.exit(1);
	}
}

if (require.main === module) {
	main();
}

export { analyzeText, analyzeFile, readFile };
