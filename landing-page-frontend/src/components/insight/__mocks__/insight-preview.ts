import type { InsightPreview } from "@/types/insights";

export function mockInsightPreview(
    overrides: Partial<InsightPreview> = {},
): InsightPreview {
    return {
        id: 1,
        documentId: "doc-1",
        slug: "how-we-shipped-x",
        title: "How we shipped X with Next.js & Strapi",
        description: "A short summary of the article...",
        categoryName: "Press Release",
        publishedAt: { label: "Sep 1, 2025", iso: "2025-09-01T00:00:00.000Z" },
        coverImage: {
            url: "https://picsum.photos/800/600",
            width: 800,
            height: 600,
            alt: "Cover image",
        },
        author: {
            name: "Sam Plane",
            avatarImage: {
                url: "https://i.pravatar.cc/96?img=8",
                width: 96,
                height: 96,
                alt: "Sam avatar",
            },
        },
        ...overrides,
    };
}
