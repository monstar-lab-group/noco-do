import type { Meta, StoryObj } from '@storybook/react';
import VideoCard from './VideoCard';

const meta: Meta<typeof VideoCard> = {
  title: 'Components/VideoCard',
  component: VideoCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof VideoCard>;

export const Default: Story = {
  args: {
    video: {
      id: '1',
      title: 'Getting Started with Operations',
      description: 'A guide to getting started with operations procedures.',
      videoUrl: 'https://example.com/video.mp4',
      thumbnailUrl: 'https://placehold.co/600x400',
      type: 'upload',
      publishedAt: new Date('2023-01-01'),
      createdAt: new Date('2023-01-01'),
      updatedAt: new Date('2023-01-01'),
      categoryId: '1',
      category: {
        id: '1',
        name: 'Onboarding',
        createdAt: new Date('2023-01-01'),
        updatedAt: new Date('2023-01-01'),
      },
    },
  },
};

export const NoThumbnail: Story = {
  args: {
    video: {
      id: '2',
      title: 'Advanced Operations Techniques',
      description: 'Learn advanced techniques for operations.',
      videoUrl: 'https://example.com/video2.mp4',
      thumbnailUrl: null,
      type: 'upload',
      publishedAt: new Date('2023-01-15'),
      createdAt: new Date('2023-01-15'),
      updatedAt: new Date('2023-01-15'),
      categoryId: '2',
      category: {
        id: '2',
        name: 'Advanced',
        createdAt: new Date('2023-01-01'),
        updatedAt: new Date('2023-01-01'),
      },
    },
  },
};
