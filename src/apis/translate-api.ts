import axios, { AxiosInstance } from "axios";

/**
 * API client that interfaces with Google Translate API
 */
export default class TranslateApi {
    /**
     * The base URL for the Google Translate API
     * @private
     */
    private static readonly BASE_URL: string = "https://translation.googleapis.com/language/translate/v2";
    /**
     * The API key to access the Google Translate API
     * @private
     */
    private static readonly API_KEY: string = process.env.REACT_APP_GOOGLE_TRANSLATE_API_KEY as string;

    /**
     * The current axios client instance
     * @private
     */
    private readonly client: AxiosInstance;

    /**
     * Constructs a new {@linkcode TranslateApi} instance
     */
    constructor() {
        this.client = axios.create({
            headers: {
                "Content-Type": "application/json",
            }
        });
    }

    /**
     * Translates the given text to the target language
     * @async
     * @param text - The original text to translate
     * @param targetLanguage - The target language
     * @returns a `Promise` containing the translated text
     */
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