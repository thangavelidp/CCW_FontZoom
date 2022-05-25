export class Main {
    public header: Array<object>;
    public footer: Array<object>;
    public logo: Object;
    public social: Array<object>;
    constructor(
        header: Array<object> = [],
        footer: Array<object>=[],
        logo:  Object = {},
        social: Array<object> = []
    ) {
        this.header = header;
        this.footer = footer;
        this.logo = logo;
        this.social = social;
    }
}