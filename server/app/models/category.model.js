const sql = require("./db.js");

const Category = function (category) {
    this.id = category.id;
    this.parentId = category.parentId
    this.categoryName = category.categoryName;
}

Category.findById = (id, result) => {
    sql.query(`SELECT * FROM category WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found category: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};

Category.findByParentId = (parentId, result) => {
    sql.query(`SELECT * FROM category WHERE parentId = ${parentId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found category: ", res);
            result(null, res);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};

Category.getAll = result => {
    sql.query("SELECT * FROM category", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("category: ", res);
        result(null, res);
    });
};

Category.addCategory = (category, result) => {
    sql.query(`INSERT INTO category (parentId, categoryName) VALUES (${category.parentId},'${category.categoryName}')`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("category: ", res);
        result(null, res);
    });
}


Category.updateCategory = (category, result) => {
    sql.query(`UPDATE category SET categoryName = '${category.categoryName}' WHERE id = ${category.id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("category: ", res);
        result(null, res);
    });
}

module.exports = Category;