var cors = require('cors')

module.exports = app => {
    const category = require("../controllers/category.controller.js");
    app.options("*", cors({ origin: 'http://localhost:8080', optionsSuccessStatus: 200 }));

    app.use(cors({ origin: "http://localhost:8080", optionsSuccessStatus: 200 }));
    var corsOptions = {
        origin: "http://localhost:8080",
    }

    // Tüm kategoriler
    app.get("/category", cors(corsOptions), category.findAll);
    // CategoryId ile 
    app.get("/category/:id", cors(corsOptions), category.findOne);
    // ParentId ile 
    app.get("/category/parent/:parentId", cors(corsOptions), category.findParentId)
    // Yeni Kategori Oluşturmak
    app.post("/category/new", cors(corsOptions), category.create)
    // Kategori güncellemek
    app.put("/category/update/:id", cors(corsOptions), category.update)
};