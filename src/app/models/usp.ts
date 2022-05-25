export class Usp {
    public title: string;
    public subTitle: string;
    public shortDescription: string;
    constructor(
        title: string = '',
        subTitle: string = '',
        shortDescription: string = ''
    ) {
        this.title = title;
        this.subTitle = subTitle;
        this.shortDescription = shortDescription;
     
    }
}