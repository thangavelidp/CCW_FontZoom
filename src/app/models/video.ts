export class VideoDetails {
    public type="video"
    public videoUrl: string;
    public videoName: string;
    public videoTitle:string;
    public videoThumbnailUrl: string;
    public videoThumbnailWidth: number;
    public videoThumbnailHeight: number;
    constructor(
        videoUrl: string = '',
        videoName:string = '',
        videoTitle: string = '',
        videoThumbnailUrl:string = '',
        videoThumbnailWidth: number,
        videoThumbnailHeight:number,
    ) {
        this.videoUrl = videoUrl;
        this.videoName = videoName;
        this.videoTitle = videoTitle;
        this.videoThumbnailUrl = videoThumbnailUrl;
        this.videoThumbnailWidth = videoThumbnailWidth;
        this.videoThumbnailHeight = videoThumbnailHeight;
    }
}