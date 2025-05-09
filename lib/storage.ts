import { put, del } from "@vercel/blob";
import { nanoid } from "nanoid";

interface StorageProvider {
  uploadFile: (file: File) => Promise<{ url: string | null; success: boolean }>;
  deleteFile: (url: string) => Promise<boolean>;
}

class VercelBlobStorage implements StorageProvider {
  async uploadFile(file: File) {
    try {
      const filename = `${nanoid()}-${file.name}`;
      const blob = await put(filename, file, {
        access: "public",
      });

      return {
        url: blob.url,
        success: true,
      };
    } catch (error) {
      console.error("Error uploading to Vercel Blob:", error);
      return {
        url: null,
        success: false,
      };
    }
  }

  async deleteFile(url: string) {
    try {
      const urlObj = new URL(url);
      const pathname = urlObj.pathname;
      const filename = pathname.substring(pathname.lastIndexOf("/") + 1);

      await del(filename);
      return true;
    } catch (error) {
      console.error("Error deleting from Vercel Blob:", error);
      return false;
    }
  }
}

class NetlifyStorage implements StorageProvider {
  async uploadFile(file: File) {
    try {
      const filename = `${nanoid()}-${file.name}`;
      const url = `/uploads/${filename}`;
      
      console.log("Netlify storage: File would be uploaded to", url);
      
      return {
        url,
        success: true,
      };
    } catch (error) {
      console.error("Error uploading to Netlify storage:", error);
      return {
        url: null,
        success: false,
      };
    }
  }

  async deleteFile(url: string) {
    try {
      console.log("Netlify storage: File would be deleted:", url);
      return true;
    } catch (error) {
      console.error("Error deleting from Netlify storage:", error);
      return false;
    }
  }
}

class S3Storage implements StorageProvider {
  async uploadFile(file: File) {
    try {
      const filename = `${nanoid()}-${file.name}`;
      const url = `https://s3.example.com/bucket/${filename}`;
      
      console.log("S3 storage: File would be uploaded to", url);
      
      return {
        url,
        success: true,
      };
    } catch (error) {
      console.error("Error uploading to S3 storage:", error);
      return {
        url: null,
        success: false,
      };
    }
  }

  async deleteFile(url: string) {
    try {
      console.log("S3 storage: File would be deleted:", url);
      return true;
    } catch (error) {
      console.error("Error deleting from S3 storage:", error);
      return false;
    }
  }
}

export function getStorageProvider(): StorageProvider {
  const storageType = process.env.STORAGE_PROVIDER || 'vercel';
  
  switch (storageType.toLowerCase()) {
    case 'vercel':
      return new VercelBlobStorage();
    case 'netlify':
      return new NetlifyStorage();
    case 's3':
      return new S3Storage();
    default:
      console.warn(`Unknown storage provider: ${storageType}, falling back to Vercel Blob`);
      return new VercelBlobStorage();
  }
}

export async function uploadFile(file: File) {
  const provider = getStorageProvider();
  return provider.uploadFile(file);
}

export async function deleteFile(url: string) {
  const provider = getStorageProvider();
  return provider.deleteFile(url);
}

export async function generateThumbnail(videoFile: File) {
  return "/placeholder.svg?height=720&width=1280";
}
