export type Post = {
    slug: string;
    title: string;
    thumbnail: string;
    description: string;
    content: string;
    author: string;
    createdAt: string;
    tags: string[];
    source: string;
    url: string;
}

export type PostWithContent = Post & {
    content: string;
};

export type Error = {
    error?: string;
    message: string;
}