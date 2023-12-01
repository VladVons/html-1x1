document.addEventListener('DOMContentLoaded', function() {
    const Min = 200 * 1000
    const Max = 300 * 1000
    const Delay = Math.random() * (Max - Min) + Min
    setTimeout(function() {
        const Modal = new bootstrap.Modal(document.getElementById('viTimerModal'))
        Modal.show()
    }, Delay)
})
