let lastId = 0;

export default class link{
    constructor({title = '', link = '', image = '', order = 100, tags = []}){
        this.title = title;
        this.link = link;
        this.image = image;
        this.order = order;
        this.tags = tags;
        this.id = `ID_${++lastId}`;
    }
}