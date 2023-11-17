document.addEventListener('DOMContentLoaded', function() {
    var Min = 20 * 1000;
    var Max = 30 * 1000;
    Delay = Math.random() * (Max - Min) + Min;
    setTimeout(function() {
        var Modal = new bootstrap.Modal(document.getElementById('viTimerModal'));
        Modal.show();
    }, Delay);
});
