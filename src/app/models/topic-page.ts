export class TopicDetails {
    public topicBanner: Object = {};
    public topicAdditionalParagraph: Array<object> = [];
    public topicFeaturette: Array<object> = [];
    public DynamicArticle: Array<object> = [];
    public topicOurStorySoFar: Object = {};
    public topicOverlayPod: Array<object> = [];
    public topicOverview: Array<object> = [];
    public topicrelatedImages: Array<object> = [];
    public topicImageContainer: Array<object> = [];
    public topicImgContainerTitle: Object = {};
    public topicRelatedImageTitle: Object = {};
    public topicRelatedPagesTitle: Object = {};
    public topicNewsSectionTitle: Object = {};
    public topicTestimonialSectionTitle: Object = {};
    public topicRelatedPages: Array<object> = [];
    public topicTestimonials: Array<object> = [];
    public topicStaticMap: Object = {};
    public topicBreadCrumbs: Array<object> = [];
    public topicUspSectionTitle: Object = {};
    public topicUsp: Array<object> = [];
    public topicFeaturetteSectionTitle: Object = {};
    constructor(
        topicBanner: Object = {},
        topicAdditionalParagraph: Array<object> = [],
        topicFeaturette: Array<object> = [],
        DynamicArticle: Array<object> = [],
        topicOurStorySoFar: Object = {},
        topicOverlayPod: Array<object> = [],
        topicOverview: Array<object> = [],
        topicrelatedImages: Array<object> = [],
        topicImageContainer: Array<object> = [],
        topicImgContainerTitle: Object = {},
        topicRelatedImageTitle: Object = {},
        topicRelatedPagesTitle: Object = {},
        topicNewsSectionTitle: Object = {},
        topicTestimonialSectionTitle: Object = {},
        topicRelatedPages: Array<object> = [],
        topicTestimonials: Array<object> = [],
        topicStaticMap:Object = {},
        topicBreadCrumbs: Array<object> = [],
        topicUspSectionTitle:Object = {},
        topicUsp: Array<object> = [],
        topicFeaturetteSectionTitle: Object = {}
    ) {
        this.topicBanner = topicBanner;
        this.topicAdditionalParagraph = topicAdditionalParagraph;
        this.topicFeaturette = topicFeaturette;
        this.DynamicArticle = DynamicArticle;
        this.topicOurStorySoFar = topicOurStorySoFar;
        this.topicOverlayPod = topicOverlayPod;
        this.topicOverview = topicOverview;
        this.topicrelatedImages = topicrelatedImages;
        this.topicImageContainer = topicImageContainer;
        this.topicImgContainerTitle = topicImgContainerTitle;
        this.topicRelatedImageTitle = topicRelatedImageTitle;
        this.topicRelatedPagesTitle = topicRelatedPagesTitle;
        this.topicNewsSectionTitle = topicNewsSectionTitle;
        this.topicTestimonialSectionTitle = topicTestimonialSectionTitle;
        this.topicRelatedPages = topicRelatedPages;
        this.topicTestimonials = topicTestimonials;
        this.topicStaticMap = topicStaticMap;
        this.topicBreadCrumbs = topicBreadCrumbs;
        this.topicUspSectionTitle = topicUspSectionTitle;
        this.topicUsp = topicUsp;
        this.topicFeaturetteSectionTitle = topicFeaturetteSectionTitle;


    }
}