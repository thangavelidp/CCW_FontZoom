export class Logo {
    public title: string;
    public url: string;
    public width: Number;
    public height: Number;
    constructor(
        title: string = '',
        url: string = '',
        width: Number,
        height: Number
    ) {
        this.title = title;
        this.url = url;
        this.width = width;
        this.height = height;
    }
}