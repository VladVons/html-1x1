/*
Created: 2023.11.25
Author: Vladimir Vons <VladVons@gmail.com>
License: GNU, see LICENSE for more details
*/


class TSearch {
    constructor() {
        this.timeout = null

        this.elInput = document.getElementById('viSearchInput')
        this.elInput.addEventListener('input', this.OnInput)

        this.elSuggest = document.getElementById('viSearchSuggest')
    }

    OnInput = function (aEvent) {
        clearTimeout(this.timeout)

        var searchTerm = this.elInput.value.trim()
        if (searchTerm.length > 0) {
            this.timeout = setTimeout(() => {
                //let url = 'assets/cgi/search.json'
                let url = 'assets/cgi/search.py?q=' + encodeURIComponent(searchTerm)
                fetch(url)
                    .then(response => response.json())
                    .then(data => this.displayResults(aEvent, data))
                    .catch(error => console.error('Error fetching data:', error))
            }, 500)
        } else {
            this.elSuggest.innerHTML = ''
        }
    }.bind(this)

    displayResults(aEvent, aResults) {
        this.elSuggest.innerHTML = ''

        if (aResults.length > 0) {
            aResults.forEach(function(aResult) {
                var option = document.createElement('option')
                option.value = aResult
                this.elSuggest.appendChild(option)
            }.bind(this))

            var selectedValue = aEvent.target.value
            if (aResults.includes(selectedValue)) {
                window.location.href = '?route=product0/search&q=' + encodeURIComponent(selectedValue)
            }
        } else {
            this.elSuggest.innerHTML = ''
        }
    }
}

new TSearch()
