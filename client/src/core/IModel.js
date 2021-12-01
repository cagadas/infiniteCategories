
import axios from 'axios'

export default class IStore {
    
    model = "";
    path = "http://localhost:5050";

    constructor(model) {
        this.model = model;
    }


    addToCollection() {
        return this.attributes;
    }

    find(criteria) {
        return new Promise((resolve, reject) => {
            if (criteria !== undefined) {
                axios.get(this.path + "/" + this.model + "/" + Object.keys(criteria)[0] + "/" + criteria[Object.keys(criteria)[0]]).then(res => {
                    resolve(res.data);
                }).catch(err => {
                    reject(err.response);
                });
            } else {
                axios.get(this.path + this.model).then(res => {
                    resolve(res.data);
                }).catch(err => {
                    reject(err.response);
                });
            }

        })
    }

    getModel() {
        return this.model;
    }

    create() {
        return new Promise((resolve, reject) => {
            axios.post(this.path + "/" + this.model + "/new", this.attributes).then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err.response);
            });
        })
    }

    update(criteria) {
        console.log(criteria)
        return new Promise((resolve, reject) => {
            axios.put(this.path + "/" + this.model + "/update/" + criteria, this.attributes).then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err.response);
            });
        })
    }
}