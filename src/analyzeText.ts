/** @format */

export function analyzeText(text: string) {
	if (text.trim() === '') {
		return {
			totalWords: 0,
			totalLetters: 0,
			totalSpaces: 0,
			repeatedWords: [],
		};
	}

	const words = text.trim().split(/\s+/);
	const totalWords = words.length;
	const totalLetters = text.replace(/\s/g, '').length;
	const totalSpaces = (text.match(/\s/g) || []).length;

	const wordCounts: Record<string, number> = {};

	words.forEach((word) => {
		if (wordCounts[word]) {
			wordCounts[word]++;
		} else {
			wordCounts[word] = 1;
		}
	});

	const repeatedWords = Object.keys(wordCounts)
		.filter((word) => wordCounts[word] > 1)
		.map((word) => ({ word, count: wordCounts[word] }));

	return {
		totalWords,
		totalLetters,
		totalSpaces,
		repeatedWords,
	};
}
