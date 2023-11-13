document.addEventListener('DOMContentLoaded', function() {
    var Min = 2 * 1000;
    var Max = 3 * 1000;
    Delay = Math.random() * (Max - Min) + Min;
    setTimeout(function() {
        var Modal = new bootstrap.Modal(document.getElementById('vTimerModal'));
        Modal.show();
    }, Delay);
});

