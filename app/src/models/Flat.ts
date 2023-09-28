class Flat {
    id: number;
    title: string;
    location: string;
    price: string;
    tags: string[];
    imageUrls: string[];

    constructor(id: number, title: string, location: string, price: string, tags: string[], imageUrls: string[]) {
        this.id = id;
        this.title = title;
        this.location = location;
        this.price = price;
        this.tags = tags;
        this.imageUrls = imageUrls
    }
}

export default Flat;