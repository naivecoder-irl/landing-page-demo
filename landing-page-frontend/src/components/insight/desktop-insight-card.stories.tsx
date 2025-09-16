import type { Meta, StoryObj } from "@storybook/nextjs-vite";
// /src/components/insight/desktop-insight-card.stories.tsx
import DesktopInsightCard from "./desktop-insight-card";
import { mockInsightPreview } from "./__mocks__/insight-preview";

const meta: Meta<typeof DesktopInsightCard> = {
  title: "Insight/DesktopInsightCard",
  component: DesktopInsightCard,
  //   parameters: { layout: "padded" },
};
export default meta;

type Story = StoryObj<typeof DesktopInsightCard>;

export const NoCoverImage: Story = {
  args: { article: mockInsightPreview({ coverImage: null }) },
};

export const Default: Story = {
  args: { article: mockInsightPreview() },
};

export const LongTitleAndNoAvatar: Story = {
  args: {
    article: mockInsightPreview({
      title:
        "A very very very very very veryvery very veryvery very veryvery very veryvery very verylong title to test wrapping and leading-tight behavior in the card",
      author: { name: "", avatarImage: null },
    }),
  },
};

export const NoAvatar: Story = {
  args: {
    article: mockInsightPreview({
      author: { name: "Anonymous", avatarImage: null },
    }),
  },
};
