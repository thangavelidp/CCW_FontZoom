export class ArticleDetails {
    public articleBanner: Object = {};
     public articleParagraph: Array<object> = [];
     public articleAuthorProfile: Object = {};
     public DynamicArticle: Array<object> = [];
     public articleLatestNews: Object = {};
    // public articleLatestNews: Object = {};
    // public articleOurStorySoFar: Object = {};
    // public articleOverlayPod: Array<object> = [];
    // public articleOverview: Array<object> = [];
    // public articlerelatedImages: Array<object> = [];
    constructor(
        articleBanner: Object = {},
        articleParagraph: Array<object> = [],
        articleAuthorProfile: Object = {},
        DynamicArticle: Array<object> = [],
        articleLatestNews: Object = {}
        // articleLatestNews: Object = {},
        // articleOurStorySoFar: Object = {},
        // articleOverlayPod: Array<object> = [],
        // articleOverview: Array<object> = [],
        // articlerelatedImages: Array<object> = []
    ) {
        this.articleBanner = articleBanner;
        this.articleParagraph = articleParagraph;
        this.articleAuthorProfile = articleAuthorProfile;
        this.DynamicArticle = DynamicArticle;
        this.articleLatestNews = articleLatestNews;
        // this.articleFeaturette = articleFeaturette;
        // this.articleLatestNews = articleLatestNews;
        // this.articleOurStorySoFar = articleOurStorySoFar;
        // this.articleOverlayPod = articleOverlayPod;
        // this.articleOverview = articleOverview;
        // this.articlerelatedImages = articlerelatedImages
    }
}