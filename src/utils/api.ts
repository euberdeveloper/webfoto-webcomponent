export async function getImages(apiUrl: string, name: string): Promise<Date[]> {
    const response = await fetch(`${apiUrl}/api/albums/${name}/images`);
    const result: Date[] = await response.json();
    return result.map(date => new Date(date));
}

export async function fetchImage(url: string): Promise<string> {
    const response = await fetch(url);
    const imageBlob = await response.blob();
    const imageUrl = URL.createObjectURL(imageBlob);
    return imageUrl;
}