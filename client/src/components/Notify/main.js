/*eslint-disable */

import Notify from './notifyCard'

const CNotify = {
    install: function (Vue, options) {
        if (!options) {
            options = {}
        }

        function showNotify(props) {
            return new Promise(function (resolve, reject) {
                const notifyCard = Vue.extend(Notify)
                var propsData = options

                propsData = Object.assign(propsData, props)

                new notifyCard({
                    el: document.createElement('div'),
                    propsData,
                })
            })
        }
        Vue.prototype.$notify = {
            show(props) {
                return showNotify(props)
            }
        }
    }
}

export default CNotify