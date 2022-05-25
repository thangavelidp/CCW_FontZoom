import { VideoDetails } from "./video";

export class RelatedVideo {
    public title: string;
    public shortDescription: string;
    public video: VideoDetails;
    constructor(
        title: string = '',
        shortDescription: string = '',
        video: VideoDetails,
    ) {
        this.title = title;
        this.shortDescription = shortDescription;
        this.video = video;
    }
}