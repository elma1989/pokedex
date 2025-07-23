export class Pokemon {
    cmHeight;
    kgWeight;
    constructor (name, types, img, id, height, weight) {
        this.name = name;
        this.types = types;
        this.img = img;
        this.id = id;
        this.height = height * 10;
        this.weight = weight / 10;
        this.euroUnits();
    }
    euroUnits() {
        this.cmHeight = new Intl.NumberFormat('de-DE', {style:'unit', unit:'centimeter'}).format(this.height);
        this.kgWeight = new Intl.NumberFormat('de-DE', {style:'unit', unit:'kilogram'}).format(this.weight);
    }
}