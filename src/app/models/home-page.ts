export class HomeDetails {
    public homeBanner: Object = {};
    public homeFeaturette: Array<object> = [];
    public homeLatestNews: Object = {};
    public homeOurStorySoFar: Object = {};
    public homeOverlayPod: Array<object> = [];
    public homeOverview: Array<object> = [];
    public homerelatedImages: Array<object> = [];
    public DynamicArticle: Array<object> = [];
    
    constructor(
        homeBanner: Object = {},
        homeFeaturette: Array<object> = [],
        homeLatestNews: Object = {},
        homeOurStorySoFar: Object = {},
        homeOverlayPod: Array<object> = [],
        homeOverview: Array<object> = [],
        homerelatedImages: Array<object> = [],
        DynamicArticle: Array<object> = []
    ) {
        this.homeBanner = homeBanner;
        this.homeFeaturette = homeFeaturette;
        this.homeLatestNews = homeLatestNews;
        this.homeOurStorySoFar = homeOurStorySoFar;
        this.homeOverlayPod = homeOverlayPod;
        this.homeOverview = homeOverview;
        this.homerelatedImages = homerelatedImages;
        this.DynamicArticle = DynamicArticle


    }
}