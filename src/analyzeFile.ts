/** @format */

import { analyzeText } from './analyzeText';
import fs from 'fs';

export async function analyzeFile(filePath: string) {
	try {
		const content = await fs.promises.readFile(filePath, 'utf8');
		return analyzeText(content);
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(`Error reading file: ${error.message}`);
		} else {
			throw new Error('An unknown error occurred while reading the file');
		}
	}
}
