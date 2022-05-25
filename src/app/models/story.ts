import { ImageInfo } from "./image-info";
import { VideoDetails } from "./video";

export class Story {
    public title: string;
    public shortDescription: string;
    public year: Number;
    public image: ImageInfo;
    constructor(
        title: string = '',
        shortDescription: string = '',
        year: Number,
        image: ImageInfo,
    ) {
        this.title = title;
        this.shortDescription = shortDescription;
        this.year = year;
        this.image = image;
    }
}