document.getElementById("lead-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let providerName = document.getElementById("providerName").value;
    let email = document.getElementById("email").value;
    
    if (providerName && email) {
        document.getElementById("calculation-section").style.display = "block";
        document.getElementById("lead-form").style.display = "none";
    }
});

function calculateRCM() {
    let totalAR = parseFloat(document.getElementById("totalAR").value);
    let avgDailyCharges = parseFloat(document.getElementById("avgDailyCharges").value);
    let cleanClaims = parseFloat(document.getElementById("cleanClaims").value);
    let totalClaims = parseFloat(document.getElementById("totalClaims").value);
    let firstPassClaims = parseFloat(document.getElementById("firstPassClaims").value);
    let paymentsReceived = parseFloat(document.getElementById("paymentsReceived").value);
    let paymentsExpected = parseFloat(document.getElementById("paymentsExpected").value);
    let totalBilledCharges = parseFloat(document.getElementById("totalBilledCharges").value);
    let arOver90 = parseFloat(document.getElementById("arOver90").value);

    let dar = totalAR / avgDailyCharges;
    let ccr = (cleanClaims / totalClaims) * 100;
    let fprr = (firstPassClaims / totalClaims) * 100;
    let ncr = (paymentsReceived / paymentsExpected) * 100;
    let gcr = (paymentsReceived / totalBilledCharges) * 100;
    let ar90 = (arOver90 / totalAR) * 100;

    let resultText = `<h3>RCM Performance Analysis</h3>`;

    function checkBenchmark(value, benchmark, condition) {
        return (condition(value, benchmark)) ? `<span class='red-flag'>⚠️ Needs Attention</span>` : `<span class='green-flag'>✅ Good</span>`;
    }

    resultText += `<p>DAR: ${dar.toFixed(2)} days ${checkBenchmark(dar, 40, (a, b) => a > b)}</p>`;
    resultText += `<p>CCR: ${ccr.toFixed(2)}% ${checkBenchmark(ccr, 95, (a, b) => a < b)}</p>`;
    resultText += `<p>FPRR: ${fprr.toFixed(2)}% ${checkBenchmark(fprr, 90, (a, b) => a < b)}</p>`;
    resultText += `<p>NCR: ${ncr.toFixed(2)}% ${checkBenchmark(ncr, 95, (a, b) => a < b)}</p>`;
    resultText += `<p>GCR: ${gcr.toFixed(2)}% ${checkBenchmark(gcr, 95, (a, b) => a < b)}</p>`;
    resultText += `<p>A/R Aging (90+ Days): ${ar90.toFixed(2)}% ${checkBenchmark(ar90, [15, 20], (a, b) => a < b[0] || a > b[1])}</p>`;

    document.getElementById("results").innerHTML = resultText;
}
