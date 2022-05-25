export class ChildNavigation {
    public title: string;
    public url: string;
    public target: string;
    constructor(
        title: string = '',
        url: string = '',
        target: string = '',
    //    image: ImageInfo,
    ) {
        this.title = title;
        this.url = url;
        this.target = target;
     //   this.image = image;
    }
}