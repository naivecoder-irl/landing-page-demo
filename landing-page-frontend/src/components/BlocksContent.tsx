"use client";

import { BlocksRenderer, type BlocksContent } from "@strapi/blocks-react-renderer";
import Image from "next/image";
import Link from "next/link";

/**
 * Reference:
 * https://github.com/strapi/blocks-react-renderer
 */
const content: BlocksContent = [
  {
    type: 'paragraph',
    children: [{ type: 'text', text: 'A simple paragraph rendered by strapi blocks renderer' }],
  },
];


export default function BlocksContent() {
  return <BlocksRenderer content={content} />;
};

