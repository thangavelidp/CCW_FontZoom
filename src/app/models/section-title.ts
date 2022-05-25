

export class SectionTitle {
    public title: string;
    public ctaLabel: string;
    public ctaUrl: string;
    public ctaTarget: string;
    public intro?: string;
    constructor(
        title: string = '',
        ctaLabel: string = '',
        ctaUrl: string = '',
        ctaTarget: string = '',
        intro: string = '',
    ) {
        this.title = title;
        this.ctaLabel = ctaLabel;
        this.ctaUrl = ctaUrl;
        this.ctaTarget = ctaTarget;
        this.intro = intro;
    }
}