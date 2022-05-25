import { ImageInfo } from './image-info';
export class FeaturedImage {
    public type ="featuredimage";
    public sysId : string;
    public title: string;
    public shortDescription: string;
    public image: ImageInfo;
    public ctaLabel : string;
    public ctaLink : string;
    public ctaTarget :string;

    public constructor(
        sysId : string,
        title : string,
        shortDescription : string,
        image : ImageInfo,
        ctaLabel : string,
        ctaLink : string,
        ctaTarget : string
    ) {
        this.sysId = sysId;
        this.title =  title;
        this.shortDescription = shortDescription;
        this.image = image;
        this.ctaLabel = ctaLabel;
        this.ctaLink = ctaLink;
        this.ctaTarget = ctaTarget;
    }
}