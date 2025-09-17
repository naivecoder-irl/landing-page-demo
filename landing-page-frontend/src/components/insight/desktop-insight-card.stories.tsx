import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import DesktopInsightCard from "./desktop-insight-card";
import { mockInsightPreview } from "./__mocks__/insight-preview";

const meta: Meta<typeof DesktopInsightCard> = {
  title: "Insight/DesktopInsightCard",
  component: DesktopInsightCard,
  parameters: { layout: "padded" },
};
export default meta;

type Story = StoryObj<typeof DesktopInsightCard>;

export const Default: Story = {
  args: { insightPreview: mockInsightPreview() },
};

export const NoCoverImage: Story = {
  args: { insightPreview: mockInsightPreview({ coverImage: null }) },
};

export const LongTitle: Story = {
  args: {
    insightPreview: mockInsightPreview({
      title:
        "A very very very very very very very very very long title for testing wrapping and leading in the desktop card",
    }),
  },
};

export const LongTitleAndNoAvatar: Story = {
  args: {
    insightPreview: mockInsightPreview({
      title:
        "A very very very very very veryvery very veryvery very veryvery very veryvery very verylong title to test wrapping and leading-tight behavior in the card",
      author: { name: "", avatarImage: null },
    }),
  },
};

export const NoAvatar: Story = {
  args: {
    insightPreview: mockInsightPreview({
      author: { name: "Anonymous", avatarImage: null },
    }),
  },
};

export const NoDescription: Story = {
  args: {
    insightPreview: mockInsightPreview({
      description: "",
    }),
  },
};

export const LongDescription: Story = {
  args: {
    insightPreview: mockInsightPreview({
      description:
        "This is a long description meant to test how the desktop card handles multi-line text wrapping in its details section. It should remain readable, keep consistent spacing, and avoid overflow even when content grows longer than usual.",
    }),
  },
};

export const NonEnglishTitle: Story = {
  args: {
    insightPreview: mockInsightPreview({
      title: "使用 Next.js 与 Strapi 构建高性能内容平台最佳实践",
    }),
  },
};

export const DarkTheme: Story = {
  args: { insightPreview: mockInsightPreview() },
  decorators: [
    (Story) => (
      <div className="dark bg-background p-6 text-foreground">
        <Story />
      </div>
    ),
  ],
};

/** All fallbacks at once: no cover, no avatar, no description */
export const NoCoverNoAvatarNoDescription: Story = {
  args: {
    insightPreview: mockInsightPreview({
      coverImage: null,
      description: "",
      author: { name: "Anonymous", avatarImage: null },
    }),
  },
};

/** Stress-test author name layout */
export const LongAuthorName: Story = {
  args: {
    insightPreview: mockInsightPreview({
      author: {
        name: "Alexandria-Catherine von Morgenstern the Third of Galway, PhD, FRCSI",
        avatarImage: null,
      },
    }),
  },
};
