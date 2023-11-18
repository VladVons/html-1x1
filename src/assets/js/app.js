function showTooltip(aMsg) {
    var tooltip = document.createElement("div");
    tooltip.classList.add("tooltip");
    tooltip.textContent = aMsg;

    document.body.appendChild(tooltip);

    // apply the initial styles
    tooltip.offsetWidth;

    tooltip.classList.add("active");

    setTimeout(function () {
        tooltip.classList.remove("active");
        setTimeout(function () {
            document.body.removeChild(tooltip);
        }, 300);
    }, 2000);
}
