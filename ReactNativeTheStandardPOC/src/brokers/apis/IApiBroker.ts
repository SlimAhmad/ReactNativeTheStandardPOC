export interface IApiBroker {
    getAsync<T>(relativeUrl: string): Promise<T>;
    postAsync<T>(relativeUrl: string, content: any): Promise<T>;
    deleteAsync<T>(relativeUrl: string): Promise<T>;
}
