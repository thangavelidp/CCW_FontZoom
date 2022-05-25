import { Story } from "./story";
import { VideoDetails } from "./video";

export class OurStory {
    public title: string;
    public ctaLable: string;
    public ctaTarget: string;
    public ctaUrl: string;
    public story: Story;
    constructor(
        title: string = '',
        ctaLable: string = '',
        ctaTarget: string = '',
        ctaUrl: string = '',
        story: Story,
    ) {
        this.title = title;
        this.ctaLable = ctaLable;
        this.ctaTarget = ctaTarget;
        this.ctaUrl = ctaUrl;
        this.story = story;
    }
}