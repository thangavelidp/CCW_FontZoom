import { ChildNavigation } from "./childNavigation";

export class Header {
    public title: string;
    public url: string;
    public target: string;
    public childNavigation: ChildNavigation;
    constructor(
        title: string = '',
        url: string = '',
        target: string = '',
        childNavigation: ChildNavigation
    ) {
        this.title = title;
        this.url = url;
        this.target = target;
        this.childNavigation = childNavigation;
    }
}