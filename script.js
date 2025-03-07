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
    let dar = parseFloat(document.getElementById("dar").value);
    let ccr = parseFloat(document.getElementById("ccr").value);
    let fprr = parseFloat(document.getElementById("fprr").value);
    let ncr = parseFloat(document.getElementById("ncr").value);
    let gcr = parseFloat(document.getElementById("gcr").value);
    let ar90 = parseFloat(document.getElementById("ar90").value);

    let resultText = `<h3>RCM Performance Analysis</h3>`;

    function checkBenchmark(value, benchmark, condition) {
        return (condition(value, benchmark)) ? `<span style="color: red;">❌ Needs Attention</span>` : `<span style="color: green;">✅ Good</span>`;
    }

    resultText += `<p>DAR: ${dar} ${checkBenchmark(dar, 40, (a, b) => a > b)}</p>`;
    resultText += `<p>CCR: ${ccr}% ${checkBenchmark(ccr, 95, (a, b) => a < b)}</p>`;
    resultText += `<p>FPRR: ${fprr}% ${checkBenchmark(fprr, 90, (a, b) => a < b)}</p>`;
    resultText += `<p>NCR: ${ncr}% ${checkBenchmark(ncr, 95, (a, b) => a < b)}</p>`;
    resultText += `<p>GCR: ${gcr}% ${checkBenchmark(gcr, 95, (a, b) => a < b)}</p>`;
    resultText += `<p>A/R Aging (90+ Days): ${ar90}% ${checkBenchmark(ar90, [15, 20], (a, b) => a < b[0] || a > b[1])}</p>`;

    document.getElementById("results").innerHTML = resultText;
}
