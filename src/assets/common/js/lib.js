/*
Created: 2023.11.20
Author: Vladimir Vons <VladVons@gmail.com>
License: GNU, see LICENSE for more details
*/


class TDict {
    constructor() {
        this.data = {}
    }

    getValue(aPath) {
        const keys = aPath.split('/').filter(key => key !== '')
        let obj = this.data
        for (const key of keys) {
            obj = obj[key]
            if (obj == undefined) {
                return obj
            }
        }
        return obj
    }

    setValue(aPath, aVal) {
        const keys = aPath.split('/').filter(key => key !== '')
        let obj = this.data
        for (const key of keys.slice(0, -1)) {
            if (!obj.hasOwnProperty(key)) {
                obj[key] = {}
            }
            obj = obj[key]
        }

        const keyLast = keys[keys.length - 1]
        obj[keyLast] = aVal
    }

    updValue(aPath, aVal) {
        const obj = this.getValue(aPath)
        if (obj != undefined && obj.constructor == Object && aVal.constructor == Object){
            aVal = { ...obj, ...aVal}
        }
        this.setValue(aPath, aVal)
    }
}

function format(aPattern, aValues) {
    return aPattern.replace(/\{(\w+)\}/g, (match, key) => aValues[key] || match)
}

/*
let Redirect = new TRedirect('/admin/?route=product&product_id={id}')
Redirect.To({'id': 12})
*/
class TRedirect {
    constructor(aPattern) {
        this.pattern = aPattern
    }

    To(aValues) {
        const url = Format(this.pattern, aValues)
        window.location.href = url
    }
}

function postJson(aUrl, aData = {}) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
      },
      body: JSON.stringify(aData)
    }

    const Res = fetch(aUrl, requestOptions)
        .then(aResponse => {
            if (!aResponse.ok) {
                throw new Error(`HTTP error. Status: ${aResponse.status}`)
            }
            return aResponse.json()
        })
        .then(aResponseData => {
            return aResponseData
        })
        .catch(aErr => {
            console.error('Err:', aErr)
            //throw error
        })
    return Res
}

function assert(aCond, aMsg = 'Error') {
  if (!aCond) {
    throw new Error(aMsg || " assertion failed")
  }
}

function changeImage(aImg, aId, aHref = false) {
    const element = document.getElementById(aId)
    element.src = aImg.src
    if (aHref) {
        element.parentNode.href = aImg.src
    }
}