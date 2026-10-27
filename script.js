
const codeInput = document.getElementById("codeInput");
const analyzeBtn = document.getElementById("analyzeBtn");
const result = document.getElementById("result");

analyzeBtn.addEventListener("click", function () {
    const code = codeInput.value;

    // Check whether input is empty
    if (code.trim() === "") {
        result.textContent = "Please paste your code first!";
        return;
    }

    // Count total lines
    const lines = code.trim().split("\n");
    const totalLines = lines.length;

    // Store detected issues
    let mistakes = [];

    // Check each line for possible missing semicolons
    lines.forEach(function (line, index) {
        const trimmedLine = line.trim();

        if (
            /^(int|double|float|char|boolean|String)\s+\w+/.test(trimmedLine) &&
            trimmedLine.includes("=") &&
            !trimmedLine.endsWith(";")
        ) {
            mistakes.push(
                "Line " + (index + 1) +
                ": Possible missing semicolon (;)"
            );
        }
    });

    // Display analysis summary
    if (mistakes.length === 0) {
        result.textContent =
            "Analysis Complete\n" +
            "Total lines: " + totalLines + "\n" +
            "Issues found: 0\n\n" +
            "No common mistakes detected by current rules!";
    } else {
        result.textContent =
            "Analysis Complete\n" +
            "Total lines: " + totalLines + "\n" +
            "Issues found: " + mistakes.length + "\n" +
            "Please review these possible issues:\n\n" +
            mistakes.map(function (mistake, index) {
                return (index + 1) + ". " + mistake;
            }).join("\n");
    }
});
