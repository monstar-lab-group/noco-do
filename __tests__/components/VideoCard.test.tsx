import React from 'react';
import { render, screen } from '@testing-library/react';
import VideoCard from '../../components/VideoCard';
import { formatDate } from '../../lib/utils';

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, className }: { src: string; alt: string; className: string }) => (
    <img src={src} alt={alt} className={className} />
  ),
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

describe('VideoCard', () => {
  const mockVideo = {
    id: '1',
    title: 'Test Video',
    description: 'Test Description',
    videoUrl: 'https://example.com/video.mp4',
    thumbnailUrl: 'https://example.com/thumbnail.jpg',
    type: 'upload',
    publishedAt: new Date('2023-01-01'),
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
    categoryId: '1',
    category: {
      id: '1',
      name: 'Test Category',
      createdAt: new Date('2023-01-01'),
      updatedAt: new Date('2023-01-01'),
    },
  };

  it('renders video title', () => {
    render(<VideoCard video={mockVideo} />);
    expect(screen.getByText('Test Video')).toBeInTheDocument();
  });

  it('renders category name', () => {
    render(<VideoCard video={mockVideo} />);
    expect(screen.getByText('Test Category')).toBeInTheDocument();
  });

  it('renders formatted date', () => {
    render(<VideoCard video={mockVideo} />);
    expect(screen.getByText(formatDate(mockVideo.publishedAt))).toBeInTheDocument();
  });
});
