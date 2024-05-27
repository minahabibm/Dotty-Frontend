export interface StorageInterface {
    setItem: (key: string, value: string) => Promise<void>;
    getItem: (key: string) => Promise<string | null>;
    deleteItem: (key: string) => Promise<void>;
    setSecureItem: (key: string, value: string) => Promise<void>;
    getSecureItem: (key: string) => Promise<string | null>;
    deleteSecureItem: (key: string) => Promise<void>;
}