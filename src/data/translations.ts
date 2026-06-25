export interface TranslationPair {
  yoruba: string;
  english: string;
  dialect?: string;
}

export const ASE_AKOKO_DICTIONARY: Record<string, string> = {
  "E kaabo": "Welcome",
  "E nle o": "Hello (to elders/respectful)",
  "Bawo ni?": "How are you?",
  "Dada ni": "I am fine",
  "E se": "Thank you",
  "O dabo": "Goodbye",
  "O rire": "Good luck",
  "Bami": "My father",
  "Yeye mi": "My mother",
  "Omi": "Water",
  "Ounje": "Food",
  "Ife": "Love",
  "Alafia": "Peace",
  "Olohun": "God",
  "Mo nfe o": "I love you",
  "Nibo lo nlo?": "Where are you going?",
  "Mo nlo si ile": "I am going home",
  "Se dada ni?": "Is everything fine?",
  "Beeni": "Yes",
  "Rara": "No",
  "E dakun": "Please",
  "Ma binu": "Don't be angry / Sorry",
  "E pele": "Sorry / Take heart",
  "Ki lo nsele?": "What is happening?",
  "Omo": "Child",
  "Iyawo": "Wife",
  "Oko": "Husband",
  "Ore": "Friend",
  "Ile": "House",
  "Oja": "Market",
  "Eko": "Knowledge / Education",
  "Ase": "Amen / So be it",
  "Akoko": "Time / A specific region in Ondo",
};

export const translateMock = async (text: string): Promise<string> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  const normalizedText = text.trim();
  
  // Direct lookup
  if (ASE_AKOKO_DICTIONARY[normalizedText]) {
    return ASE_AKOKO_DICTIONARY[normalizedText];
  }

  // Case-insensitive lookup
  const key = Object.keys(ASE_AKOKO_DICTIONARY).find(
    (k) => k.toLowerCase() === normalizedText.toLowerCase()
  );
  if (key) return ASE_AKOKO_DICTIONARY[key];

  // If not found, return a simulated translation (or a message)
  // In a real app, this would call an API.
  return "Translation not found in the Ase Akoko dictionary. (Simulated result: " + normalizedText + " translated to English)";
};
