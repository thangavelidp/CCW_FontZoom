import { ImageInfo } from "./image-info";
import { VideoDetails } from "./video";

export class ImageCard {
    public title: string;
    public card: PeopleCard;
    public ctaName: string;
    public ctaUrl: string;
    public ctaTarget: string;

    constructor(
        title: string = '',
        card: PeopleCard,
        ctaName: string = '',
        ctaUrl: string = '',
        ctaTarget: string = ''

    ) {
        this.title = title;
        this.card = card;
        this.ctaName = ctaName;
        this.ctaUrl = ctaUrl;
        this.ctaTarget = ctaTarget;
    }
}

export class PeopleCard {
    public title: string;
    public image: ImageInfo;
    public video:VideoDetails;
    public ctaUrl: string;
    public ctaName: string;
    public ctaTarget: string;
    public shortDescription: string;
    public date: string;
    public longDescription?: string;
    public subTitle?: string;
    public flip? : string = 'inactive';
    constructor(
        title: string = '',
        image: ImageInfo,
        video: VideoDetails,
        ctaUrl: string = '',
        ctaName: string = '',
        ctaTarget: string = '',
        shortDescription: string = '',
        date: string = '',
        longDescription: string = '',
        subTitle: string = '',
        
        
    ) {
        this.title = title;
        this.image = image;
        this.video = video;
        this.ctaUrl = ctaUrl;
        this.ctaName = ctaName;
        this.ctaTarget = ctaTarget;
        this.shortDescription = shortDescription;
        this.date = date;
        this.longDescription = longDescription;        
        this.subTitle = subTitle;        
    }
}