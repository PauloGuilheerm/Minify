interface Url {
    id?: number;
    originalUrl: string;
    shortUrl: string;
    userId: number | null;
    clicks: number,
    deletedAt: Date | null
}

export default Url;