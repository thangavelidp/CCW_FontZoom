import { FeaturedImage } from "./featured-image";
import { VideoDetails } from "./video";


export class RelatedPages {
    public title: string;
    public shortDescription: string;
    public image: FeaturedImage;
    public video: VideoDetails;
    public url :string
    constructor(
        title: string = '',
        shortDescription: string = '',
        image: FeaturedImage,
        video: VideoDetails,
        url: string
    ) {
        this.title = title;
        this.shortDescription = shortDescription;
        this.image = image;
        this.video = video;
        this.url = url
    }
}