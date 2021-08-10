import { ImageInfo } from "@/types";

function purgeImageInfoDate(imageInfo: ImageInfo): ImageInfo {
    imageInfo.timestamp = new Date(imageInfo.timestamp);
    return imageInfo;
}

export async function getImages(apiUrl: string, name: string): Promise<ImageInfo[]> {
    const response = await fetch(`${apiUrl}/albums/${name}/images`);
    const result: ImageInfo[] = await response.json();
    return result.map(el => purgeImageInfoDate(el));
}