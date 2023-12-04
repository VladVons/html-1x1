/*
Created: 2023.12.01
Author: Vladimir Vons <VladVons@gmail.com>
License: GNU, see LICENSE for more details

as function namespace
*/


function searchNavbar() {
    let currentFocus = 0
    let timeout = null
    const elSearchInput = document.getElementById('viSearchInput')
    const elSearchSuggest = document.getElementById('viSearchSuggest')

    elSearchInput.addEventListener('keydown', function(aEvent) {
        let x = elSearchSuggest.getElementsByTagName('div')
        if (x.length == 0) 
            return
    
        if (aEvent.key == 'ArrowDown') {
            currentFocus++
            setActive(x)
        } else if (aEvent.key == 'ArrowUp') {
            currentFocus--
            setActive(x)
        } else if (aEvent.key == 'Enter') {
            aEvent.preventDefault()
            if (currentFocus >= 0) {
                x[currentFocus].click()
            }
        } else {
            currentFocus = -1
        }
    })

    elSearchInput.addEventListener('input', function(aEvent) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            const value = this.value.trim()
            if (value.length > 0) {
                //const url = 'assets/cgi/search.json'
                const url = 'assets/cgi/search.py?q=' + encodeURIComponent(value)
                fetch(url)
                    .then(response => response.json())
                    .then(data => displayResult(aEvent, data))
                    .catch(error => console.error('Error fetching data:', error))
            } else {
                elSearchSuggest.innerHTML = ''
            }
        }, 500)
    })

    function displayResult(aEvent, aResults) {
        elSearchSuggest.innerHTML = ''

        if (aResults && aResults.length > 0) {
            const keys = aEvent.target.value.split(' ').filter(key => key !== '')
            //const pattern = new RegExp(`\\b(${keys.join('|')})\\b`, 'gi')
            const pattern = new RegExp(`(${keys.join('|')})`, 'gi')

            aResults.forEach(function(aResult) {
                const elDiv = document.createElement('div')
                elDiv.innerHTML = aResult.replace(pattern, '<b>$1</b>') + `<input type='hidden' value='${aResult}'>`
                elDiv.addEventListener("click", function(e) {
                    const value = this.getElementsByTagName("input")[0].value
                    aEvent.target.value = value
                    elSearchSuggest.innerHTML = ''
                    window.location.href = '?route=product0/search&q=' + encodeURIComponent(value)
                })
                elSearchSuggest.appendChild(elDiv)
            })
        }
    }

    function setActive(x) {
        delActive(x)

        if (currentFocus >= x.length) 
            currentFocus = 0
            
        if (currentFocus < 0) 
            currentFocus = (x.length - 1)

        x[currentFocus].classList.add('autocomplete-active')
    }

    function delActive(x) {
        for (let i = 0; i < x.length; i++) {
            x[i].classList.remove('autocomplete-active');
        }
    }
}

searchNavbar()
