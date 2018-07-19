let lastId = 0;

export default class link{
    constructor({title = '', link = '', image = '', order = 100, tags = [], meta = {}, id = `LinkID_${++lastId}`}){
        this.title = title;
        this.link = link;
        this.image = image;
        this.order = order;
        this.tags = tags;
        this.id = id;
        this.meta = meta;
    }
}