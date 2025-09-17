import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import MobileInsightCard from "./mobile-insight-card";
import { mockInsightPreview } from "./__mocks__/insight-preview";

const meta: Meta<typeof MobileInsightCard> = {
  title: "Insight/MobileInsightCard",
  component: MobileInsightCard,
  parameters: {
    layout: "padded",
    viewport: { defaultViewport: "mobile1" },
  },
};
export default meta;

type Story = StoryObj<typeof MobileInsightCard>;

/** Existing */
export const Default: Story = {
  args: { insightPreview: mockInsightPreview() },
};

export const NoCoverImage: Story = {
  args: { insightPreview: mockInsightPreview({ coverImage: null }) },
};

/** New: very long title to test wrapping/leading */
export const LongTitle: Story = {
  args: {
    insightPreview: mockInsightPreview({
      title:
        "A very very very very very very very very very long title for testing wrapping and leading in the mobile card",
    }),
  },
};


/** New: no description (should hide the <p> block and keep spacing sane) */
export const NoDescription: Story = {
  args: {
    insightPreview: mockInsightPreview({
      description: "",
    }),
  },
};

/** New: long description to test multi-line overflow/spacing */
export const LongDescription: Story = {
  args: {
    insightPreview: mockInsightPreview({
      description:
        "This is a long description meant to test how the mobile card handles multi-line text wrapping on small screens. It should remain readable, maintain spacing between the title, meta, and the Learn more link, and avoid overflow.",
    }),
  },
};

/** New: dark theme preview (works if your globals define .dark variables) */
export const DarkTheme: Story = {
  args: { insightPreview: mockInsightPreview() },
  decorators: [
    (Story) => (
      <div className="dark bg-background p-4 text-foreground">
        <Story />
      </div>
    ),
  ],
};

/** New: non-Latin title to check font & letter breaking */
export const NonEnglishTitle: Story = {
  args: {
    insightPreview: mockInsightPreview({
      title: "使用 Next.js 与 Strapi 构建高性能内容平台最佳实践",
    }),
  },
};
