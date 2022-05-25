import { ImageInfo } from "./image-info";

export class StaticMap {
    public title: string;
    public shortDescription: string;
    public mapTab: StaticMapTab;
    constructor(
        title: string = '',
        shortDescription: string = '',
        mapTab: StaticMapTab,
    ) {
        this.title = title;
        this.shortDescription = shortDescription;
        this.mapTab = mapTab;
    }
}

export class StaticMapTab {
    public title: string;
    public image: ImageInfo;
    constructor(
        title: string = '',
        image: ImageInfo
    ) {
        this.title = title;
        this.image = image;
    }
}
