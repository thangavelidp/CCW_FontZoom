export class HubDetails {
    public hubBanner: Object = {};
    public hubFeaturette: Array<object> = [];
    public hubLatestNews: Object = {};
    public hubOurStorySoFar: Object = {};
    public hubOverlayPod: Array<object> = [];
    public hubOverview: Array<object> = [];
    public hubrelatedImages: Array<object> = [];
    public hubImageContainer: Array<object> = [];
    public hubImgContainerTitle: Object = {};
    public hubRelatedImageTitle: Object = {};
    public hubRelatedVideoTitle: Object = {};
    public hubNewsSectionTitle: Object = {};
    public hubTestimonialSectionTitle: Object = {};
    public hubRelatedVideos: Array<object> = [];
    public hubTestimonials: Array<object> = [];
    public hubBreadCrumb: Array<object> = [];
    public DynamicArticle: Array<object> = [];
    constructor(
        hubBanner: Object = {},
        hubFeaturette: Array<object> = [],
        hubLatestNews: Object = {},
        hubOurStorySoFar: Object = {},
        hubOverlayPod: Array<object> = [],
        hubOverview: Array<object> = [],
        hubrelatedImages: Array<object> = [],
        hubImageContainer: Array<object> = [],
        hubImgContainerTitle: Object = {},
        hubRelatedImageTitle: Object = {},
        hubRelatedVideoTitle: Object = {},
        hubNewsSectionTitle: Object = {},
        hubTestimonialSectionTitle: Object = {},
        hubRelatedVideos: Array<object> = [],
        hubTestimonials: Array<object> = [],
        hubBreadCrumb: Array<object> = [],
        DynamicArticle: Array<object> = [],
    ) {
        this.hubBanner = hubBanner;
        this.hubFeaturette = hubFeaturette;
        this.hubLatestNews = hubLatestNews;
        this.hubOurStorySoFar = hubOurStorySoFar;
        this.hubOverlayPod = hubOverlayPod;
        this.hubOverview = hubOverview;
        this.hubrelatedImages = hubrelatedImages;
        this.hubImageContainer = hubImageContainer;
        this.hubImgContainerTitle = hubImgContainerTitle;
        this.hubRelatedImageTitle = hubRelatedImageTitle;
        this.hubRelatedVideoTitle = hubRelatedVideoTitle;
        this.hubNewsSectionTitle = hubNewsSectionTitle;
        this.hubTestimonialSectionTitle = hubTestimonialSectionTitle;
        this.hubRelatedVideos = hubRelatedVideos;
        this.hubTestimonials = hubTestimonials;
        this.hubBreadCrumb = hubBreadCrumb;
        this.DynamicArticle = DynamicArticle;


    }
}