import axios, { AxiosInstance } from "axios";

export default class TranslateApi  {
    private static readonly BASE_URL: string = "https://translation.googleapis.com/language/translate/v2";
    private static readonly API_KEY: string = process.env.REACT_APP_GOOGLE_TRANSLATE_API_KEY as string;

    private readonly client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            headers: {
                "Content-Type": "application/json",
            }
        });
    }

    async translate(text: string, targetLanguage: string): Promise<string> {
        const translationCacheKey = `${text}:${targetLanguage}`;
        const cachedTranslation: string | null = localStorage.getItem(translationCacheKey);

        // Return the cached translation if present
        if (cachedTranslation && cachedTranslation.length > 0) {
            return Promise.resolve(cachedTranslation);
        }

        try {
            const response = await this.client.post(`${TranslateApi.BASE_URL}?key=${TranslateApi.API_KEY}`, {
                "q": text,
                "target": targetLanguage,
                "source": "en"
            })

            const translation = response.data.data.translations[0];

            // Save the translation to cache
            localStorage.setItem(translationCacheKey, translation.translatedText);

            return translation.translatedText;
        } catch (error) {
            throw new Error("Error when translating text:" + error);
        }
    }
}