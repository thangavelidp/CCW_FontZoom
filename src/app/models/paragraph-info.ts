import { ImageInfo } from './image-info';
export class ParagraphInfo{
    public sysId: string;
    public title: string;
    public image: Object;
    public content: string;
    public tableArray: string;
    public titleId : string; 
    public videoDetails : Object;
  
    constructor(
         sysId: string,
         title: string,
         titleId:string,
         image: Object,
         content: string,
         tableArray: string,
         videoDetails: Object = {}
        
    ){
        this.sysId = sysId;
        this.title = title;
        this.titleId = titleId;
        this.image = image;
        this.content = content;
        this.tableArray = tableArray;
        this.videoDetails = videoDetails;
    
    }
}