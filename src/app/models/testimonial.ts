import { ImageInfo } from "./image-info";

export class Testimonial {
    title: string;
    subTitle: string;
    shortDescription: string;
    longDescription: string;
    image: ImageInfo;
    constructor(
        title: string = '',
        subTitle: string = '',
        shortDescription: string = '',
        longDescription: string,
        image: ImageInfo,
    ) {
        this.title = title;
        this.subTitle = subTitle;
        this.shortDescription = shortDescription;
        this.longDescription = longDescription;
        this.image = image;
    }
}

