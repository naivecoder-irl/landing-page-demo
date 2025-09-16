import React from "react";
import Navbar from "@/components/navbar";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://127.0.0.1:1337";

type InsightPageProps = {
  params: {
    documentId: string;
  };
};

async function getInsightByDocumentId(documentId: string) {
  const res = await fetch(
    `${STRAPI_URL}/api/articles/${documentId}?populate=*`,
    {
      next: { revalidate: 300 },
    },
  );

  if (!res.ok) {
    throw new Error(`Failed to load insight with documentId: ${documentId}`);
  }

  return res.json();
}

export default async function InsightDetailPage({ params }: InsightPageProps) {
  const data = await getInsightByDocumentId(params.documentId);

  return (
    <div>
      <Navbar />
      <div className="mx-auto max-w-4xl p-6">
        <h1 className="mb-4 text-2xl font-semibold">Insight Detail</h1>
        <pre className="overflow-auto rounded-lg bg-muted p-4 text-sm">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </div>
  );
}
