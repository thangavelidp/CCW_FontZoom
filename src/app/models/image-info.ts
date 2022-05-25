export class ImageInfo {
    public type = "media";
    public imageId = "";
    public imageAltText : string;
    public imageUrl : string;
    public imageWidth : string;
    public imageHeight : string;
    
    constructor(
        imageId : string,
        imageAltText : string,
        imageUrl : string,
        imageWidth : string,
        imageHeight : string
    ) {
        this.imageId = imageId;
        this.imageAltText = imageAltText;
        this.imageUrl     = imageUrl;
        this.imageWidth   = imageWidth;
        this.imageHeight  = imageHeight;
    }

}