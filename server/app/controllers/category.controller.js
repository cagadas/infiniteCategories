const Category = require("../models/category.model.js");

exports.findAll = (req, res) => {
    Category.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving category."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    Category.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found category with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving category with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};

exports.findParentId = (req, res) => {
    Category.findByParentId(req.params.parentId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found category with id ${req.params.parentId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving category with id " + req.params.parentId
                });
            }
        } else res.send(data);
    });
};

exports.create = (req, res) => {
    Category.addCategory(req.body, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found category with id ${req}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving category with id " + req
                });
            }
        } else res.send(data);
    })
};

exports.update = (req, res) => {
    Category.updateCategory(req.body, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found category with id ${req}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving category with id " + req
                });
            }
        } else res.send(data);
    })
};