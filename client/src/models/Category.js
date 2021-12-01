import IModel from "../core/IModel";

export default class Category extends IModel {

    constructor() {
        super("category");
    }

    attributes = {
        id: 0,
        parentId: 0,
        categoryName: "",
    }

}