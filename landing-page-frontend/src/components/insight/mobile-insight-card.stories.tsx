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

export const Default: Story = {
  args: { insightPreview: mockInsightPreview() },
};

export const NoCoverImage: Story = {
  args: { insightPreview: mockInsightPreview({ coverImage: null }) },
};