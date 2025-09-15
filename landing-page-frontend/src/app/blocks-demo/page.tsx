import type { Metadata } from "next";
import BlocksContent from "@/components/BlocksContent";
import ArticleContent from "@/components/ArticleContent";
import type { BlocksContent as StrapiBlocks } from "@strapi/blocks-react-renderer";

export const metadata: Metadata = {
  title: "Blocks Demo",
};

// Example content shaped like Strapi's Blocks field
const exampleContent: StrapiBlocks = [
  {
    type: "heading",
    level: 2,
    children: [{ type: "text", text: "Strapi Blocks Demo" }],
  },
  {
    type: "paragraph",
    children: [
      { type: "text", text: "This paragraph contains " },
      { type: "text", text: "bold", bold: true },
      { type: "text", text: ", " },
      { type: "text", text: "italic", italic: true },
      { type: "text", text: ", and a " },
      {
        type: "link",
        url: "https://strapi.io",
        children: [{ type: "text", text: "link to Strapi" }],
      },
      { type: "text", text: "." },
    ],
  },

  {
    type: "code",
    children: [{ type: "text", text: 'console.log("code block");' }],
  },
];

// Integrate Demo Page
// http://127.0.0.1:3000/blocks-demo
// Reference: https://strapi.io/integrations/nextjs-cms
export default function Page() {
  return (
    <main className="mx-auto max-w-2xl p-6 space-y-6">
      <BlocksContent />
      <ArticleContent />
    </main>
  );
}

