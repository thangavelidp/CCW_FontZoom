
import { ImageInfo } from "./image-info";
import { VideoDetails } from "./video";

export class FeaturetteDetails {
    public title: string;
    public shortDescription: string;
    public longDescription?: string;
    public subTitle?: string;
    public ctaLabel: string;
    public ctaUrl: string;
    public ctaTarget: string;
    public video: VideoDetails;
    public image: ImageInfo;
    constructor(
        title: string = '',
        shortDescription: string = '',
        longDescription: string = '',
        subTitle: string = '',
        ctaLabel: string = '',
        ctaUrl: string = '',
        ctaTarget: string = '',
        video: VideoDetails,
        image: ImageInfo
    ) {
        this.title = title;
        this.shortDescription = shortDescription;
        this.longDescription = longDescription;
        this.subTitle = subTitle;
        this.ctaLabel = ctaLabel;
        this.ctaUrl = ctaUrl;
        this.ctaTarget = ctaTarget;
        this.video = video;
        this.image = image;
    }
}