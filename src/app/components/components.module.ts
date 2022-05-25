
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HerobannerComponent } from './herobanner/herobanner.component';
import { ImgBannerComponent } from './img-banner/img-banner.component';
import { JoinOurTeamComponent } from './join-our-team/join-our-team.component';
import { OurStoryComponent } from './our-story/our-story.component';
import { PeopleCardComponent } from './people-card/people-card.component';
import { RelatedVideoComponent } from './related-video/related-video.component';
import { VideoLightboxComponent } from './video-lightbox/video-lightbox.component';
import { CarouselComponent } from './carousel/carousel.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { FallbackImgDirective } from '../directive/fallback-img.directive';
import { TopicImageCardComponent } from './topic-image-card/topic-image-card.component';
import { RelatedPagesComponent } from './related-pages/related-pages.component';

import { OverviewComponent } from './overview/overview.component';
import { NavigationComponent } from './navigation/navigation.component';
import { StaticMapComponent } from './static-map/static-map.component';
import { NewCompComponent } from './new-comp/new-comp.component';
import { DirectorsComponent } from './directors/directors.component';
import { LeadersComponent } from './leaders/leaders.component';

import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';

import { ParagraphComponent } from './paragraph/paragraph.component';
import { OurPeopleComponent } from './our-people/our-people.component';
import { ArticleLandingComponent } from './article-landing/article-landing.component';
import { NewsComponent } from './news/news.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { AuthorComponent } from './author/author.component';
import { UspComponent } from './usp/usp.component';
import { Safe } from '../pipes/safehtml.pipe';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
    declarations: [
        HerobannerComponent,
        JoinOurTeamComponent,
        ImgBannerComponent,
        CarouselComponent,
        OurStoryComponent,
        PeopleCardComponent,
        VideoLightboxComponent,
        RelatedVideoComponent,
        TestimonialComponent,
        TopicImageCardComponent,
        RelatedPagesComponent,
        OverviewComponent,
        NavigationComponent,
        StaticMapComponent,
        NewCompComponent,
        DirectorsComponent,
        LeadersComponent,
        TermsOfUseComponent,
        ParagraphComponent,
        OurPeopleComponent,
        ArticleLandingComponent,
        NewsComponent,

        FallbackImgDirective,
        BreadcrumbComponent,
        AuthorComponent,
        UspComponent,
        Safe,
        PageNotFoundComponent



    ],
    imports: [
        CommonModule,
        CarouselModule,
        LazyLoadImageModule,
        NgxPaginationModule,
        

    ],
    providers: [

    ],
    exports: [
        HerobannerComponent,
        JoinOurTeamComponent,
        ImgBannerComponent,
        OurStoryComponent,
        PeopleCardComponent,
        VideoLightboxComponent,
        RelatedVideoComponent,
        TestimonialComponent,
        FallbackImgDirective,
        TopicImageCardComponent,
        RelatedPagesComponent,
        OverviewComponent,
        NavigationComponent,
        StaticMapComponent,
        DirectorsComponent,
        LeadersComponent,
        ParagraphComponent,
        OurPeopleComponent,
        ArticleLandingComponent,
        NewsComponent,
        BreadcrumbComponent,
        AuthorComponent,
        CarouselComponent,
        UspComponent,
        PageNotFoundComponent
    ]

})

export class ComponentsModule { }