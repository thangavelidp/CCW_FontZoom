import { ImageInfo } from "./image-info";

export class AuthorDetails {
    public firstName: string;
    public lastName: string;
    public image: ImageInfo;
    public date: string;
    public readTime: string;
    constructor(
        firstName: string = '',
        lastName: string = '',
        image: ImageInfo,
        date: string = '',
        readTime: string = '',
    ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.image = image;
        this.date = date;
        this.readTime = readTime;
    }
}