import { IApiBroker } from './IApiBroker';

export class ApiBroker implements IApiBroker {
    private readonly baseUrl: string = process.env.EXPO_PUBLIC_TMDB_BASE_URL || '';
    private readonly apiKey: string = process.env.EXPO_PUBLIC_TMDB_API_KEY || '';

    public async getAsync<T>(relativeUrl: string): Promise<T> {
        const url = this.buildUrl(relativeUrl);
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json',
            },
        });

        return await response.json();
    }

    public async postAsync<T>(relativeUrl: string, content: any): Promise<T> {
        const url = this.buildUrl(relativeUrl);
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(content),
        });

        return await response.json();
    }

    public async deleteAsync<T>(relativeUrl: string): Promise<T> {
        const url = this.buildUrl(relativeUrl);
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json',
            },
        });

        return await response.json();
    }

    private buildUrl(relativeUrl: string): string {
        const separator = relativeUrl.startsWith('/') ? '' : '/';
        const querySeparator = relativeUrl.includes('?') ? '&' : '?';
        return `${this.baseUrl}${separator}${relativeUrl}`;
    }
}
