export class Social {
    public title: string;
    public ctaUrl: string;
    public ctaTarget: string;
    constructor(
        title: string = '',
        ctaUrl: string = '',
        ctaTarget: string = '',
    ) {
        this.title = title;
        this.ctaUrl = ctaUrl;
        this.ctaTarget = ctaTarget;
    }
}