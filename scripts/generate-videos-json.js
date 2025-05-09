const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const videosDirectory = path.join(process.cwd(), 'content/videos');
const outputPath = path.join(process.cwd(), 'public/videos.json');

if (!fs.existsSync(path.join(process.cwd(), 'public'))) {
  fs.mkdirSync(path.join(process.cwd(), 'public'));
}

const fileNames = fs.readdirSync(videosDirectory);
const allVideosData = fileNames
  .filter(fileName => fileName.endsWith('.md'))
  .map(fileName => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(videosDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    const publishedAt = new Date(matterResult.data.publishedAt).toISOString();

    return {
      id,
      title: matterResult.data.title,
      description: matterResult.data.description,
      videoUrl: matterResult.data.videoUrl,
      thumbnailUrl: matterResult.data.thumbnailUrl || '/placeholder.svg?height=720&width=1280',
      type: matterResult.data.type || 'embed',
      publishedAt,
      categoryId: matterResult.data.categoryId || null,
    };
  });

const sortedVideos = allVideosData.sort((a, b) => {
  return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
});

fs.writeFileSync(outputPath, JSON.stringify(sortedVideos, null, 2));

console.log(`Generated videos.json with ${sortedVideos.length} videos`);
