import translate from 'translate'; // or import translate from '@vitalets/google-translate-api';

translate.engine = 'google'; // Use Google Translate
translate.key = 'YOUR_GOOGLE_TRANSLATE_API_KEY'; // Optional: Add your API key for better reliability

const translateText = async (text, from, to) => {
  try {
    const translated = await translate(text, { from, to });
    return translated;
  } catch (error) {
    console.error('Translation error:', error);
    return text; // Return the original text if translation fails
  }
};

export const translated = async (value) => {
  if (value?.trim() !== '') {
    const detectedLanguage = /[\u0600-\u06FF]/.test(value) ? 'ar' : 'en';
    const targetLanguage = detectedLanguage === 'ar' ? 'en' : 'ar';

    const translatedText = await translateText(value, detectedLanguage, targetLanguage);

    return {
      ar: detectedLanguage === 'ar' ? value : translatedText, // Arabic text
      en: detectedLanguage === 'en' ? value : translatedText, // English text
    };
  } else {
    return {
      ar: '', // Empty Arabic text
      en: '', // Empty English text
    };
  }
};