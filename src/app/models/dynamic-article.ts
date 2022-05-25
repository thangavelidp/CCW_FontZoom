

export class DynamicArticle {
    public title: string;
    public shortDescription: string;
    public longDescription: string;
    public date: string;
    public image: {};
    public url: string;
    public flip? : string = 'inactive';
    constructor(
        title: string = '',
        shortDescription: string = '',
        longDescription: string = '',
        date: string = '',
        image: object = {},
        url: string = '',
        flip : string = 'inactive'
        
    ) {
        this.title = title;
        this.shortDescription = shortDescription;
        this.longDescription = longDescription;
        this.date = date;
        this.image = image;
        this.url = url;
        this.flip = flip;
    }
}