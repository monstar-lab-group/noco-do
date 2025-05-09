import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Video } from '@/types';

const videosDirectory = path.join(process.cwd(), 'content/videos');

export function getAllVideos(): Video[] {
  const fileNames = fs.readdirSync(videosDirectory);
  const allVideosData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const id = fileName.replace(/\.md$/, '');

      const fullPath = path.join(videosDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      const matterResult = matter(fileContents);

      const publishedAt = new Date(matterResult.data.publishedAt);

      return {
        id,
        title: matterResult.data.title,
        description: matterResult.data.description,
        videoUrl: matterResult.data.videoUrl,
        thumbnailUrl: matterResult.data.thumbnailUrl || '/placeholder.svg?height=720&width=1280',
        type: matterResult.data.type || 'embed',
        publishedAt,
        content: matterResult.content,
      };
    });

  return allVideosData.sort((a, b) => {
    return b.publishedAt.getTime() - a.publishedAt.getTime();
  });
}

export function getVideoById(id: string): Video | null {
  try {
    const fullPath = path.join(videosDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const matterResult = matter(fileContents);

    const publishedAt = new Date(matterResult.data.publishedAt);

    return {
      id,
      title: matterResult.data.title,
      description: matterResult.data.description,
      videoUrl: matterResult.data.videoUrl,
      thumbnailUrl: matterResult.data.thumbnailUrl || '/placeholder.svg?height=720&width=1280',
      type: matterResult.data.type || 'embed',
      publishedAt,
      content: matterResult.content,
    };
  } catch (error) {
    console.error(`Error getting video with id ${id}:`, error);
    return null;
  }
}

export function createVideo(videoData: Omit<Video, 'id'>): Video {
  const id = Date.now().toString();
  
  const frontmatter = {
    title: videoData.title,
    description: videoData.description,
    videoUrl: videoData.videoUrl,
    thumbnailUrl: videoData.thumbnailUrl || '/placeholder.svg?height=720&width=1280',
    type: videoData.type || 'embed',
    publishedAt: videoData.publishedAt.toISOString().split('T')[0],
  };

  const content = videoData.content || `# ${videoData.title}\n\n${videoData.description || ''}`;
  
  const fileContent = matter.stringify(content, frontmatter);
  
  const filePath = path.join(videosDirectory, `${id}.md`);
  fs.writeFileSync(filePath, fileContent);
  
  return {
    id,
    ...videoData,
    thumbnailUrl: videoData.thumbnailUrl || '/placeholder.svg?height=720&width=1280',
  };
}

export function updateVideo(id: string, videoData: Partial<Video>): Video | null {
  try {
    const existingVideo = getVideoById(id);
    if (!existingVideo) {
      return null;
    }
    
    const updatedVideo = {
      ...existingVideo,
      ...videoData,
      id, // Ensure ID remains the same
    };
    
    const frontmatter = {
      title: updatedVideo.title,
      description: updatedVideo.description,
      videoUrl: updatedVideo.videoUrl,
      thumbnailUrl: updatedVideo.thumbnailUrl,
      type: updatedVideo.type,
      publishedAt: updatedVideo.publishedAt.toISOString().split('T')[0],
    };

    const content = videoData.content || existingVideo.content || '';
    
    const fileContent = matter.stringify(content, frontmatter);
    
    const filePath = path.join(videosDirectory, `${id}.md`);
    fs.writeFileSync(filePath, fileContent);
    
    return updatedVideo;
  } catch (error) {
    console.error(`Error updating video with id ${id}:`, error);
    return null;
  }
}

export function deleteVideo(id: string): boolean {
  try {
    const filePath = path.join(videosDirectory, `${id}.md`);
    
    if (!fs.existsSync(filePath)) {
      return false;
    }
    
    fs.unlinkSync(filePath);
    return true;
  } catch (error) {
    console.error(`Error deleting video with id ${id}:`, error);
    return false;
  }
}
