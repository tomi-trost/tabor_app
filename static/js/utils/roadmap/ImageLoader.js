export class ImageLoader {

    constructor({
        deviceIsPhone = False,
    } = {}) {
        this.deviceIsPhone = deviceIsPhone;
    }

    async bufferImages(imageUrls) {
        
        const loadedImages = await Promise.all(imageUrls.map(async image => {
            const url = this.deviceIsPhone ? (image.phone.url || image.other.url) : image.other.url;
            const loadedImage = await this.loadImage(url);
            return ({ name: image.name, img: loadedImage});
        }));
    
        const buffer = {};
        loadedImages.forEach(({ name, img }) => {
            buffer[name] = img;
        });
    
        return buffer;
    }

    loadImage(url) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = url;
            img.onload = () => resolve(img);
            img.onerror = reject;
        });
    }
}