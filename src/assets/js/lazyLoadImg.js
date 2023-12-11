/*
Created: 2023.12.11
Author: Vladimir Vons <VladVons@gmail.com>
License: GNU, see LICENSE for more details
*/

function lazyLoadInit() {
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect()
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        )
    }

    function lazyLoad() {
        const thumbnails = document.querySelectorAll('.vLazyImg')
        thumbnails.forEach(thumbnail => {
            if (isElementInViewport(thumbnail)) {
                thumbnail.setAttribute('src', thumbnail.getAttribute('src-data'))
            }
        })
    }

    lazyLoad()
    window.addEventListener('scroll', lazyLoad)
}

lazyLoadInit()
