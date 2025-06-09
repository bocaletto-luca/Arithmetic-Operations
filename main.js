"use strict";
    // TAB NAVIGATION FUNCTION
    function openTab(evt, tabName) {
      const tabcontents = document.getElementsByClassName("tabcontent");
      for (let i = 0; i < tabcontents.length; i++) {
        tabcontents[i].style.display = "none";
        tabcontents[i].classList.remove("active");
      }
      const tablinks = document.getElementsByClassName("tablinks");
      for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
      }
      document.getElementById(tabName).style.display = "block";
      document.getElementById(tabName).classList.add("active");
      evt.currentTarget.classList.add("active");
    }
    document.getElementById("defaultTab").click();

    /* ----- INFO TAB: Generate Full Multiplication Chart (1 to 10) ----- */
    function generateFullTable() {
      let html = '<table class="multiplication">';
      // Header row
      html += '<tr><th>*</th>';
      for (let i = 1; i <= 10; i++) {
        html += '<th>' + i + '</th>';
      }
      html += '</tr>';
      // Data rows from 1 to 10
      for (let i = 1; i <= 10; i++){
        html += '<tr><th>' + i + '</th>';
        for (let j = 1; j <= 10; j++){
          html += '<td>' + (i * j) + '</td>';
        }
        html += '</tr>';
      }
      html += '</table>';
      document.getElementById("fullTable").innerHTML = html;
    }
    generateFullTable();

    /* ----- ADDITION FUNCTIONS & DIAGRAM ----- */
    function calcAddition() {
      const a = parseFloat(document.getElementById("addA").value);
      const b = parseFloat(document.getElementById("addB").value);
      const resultDiv = document.getElementById("addResult");
      if (isNaN(a) || isNaN(b)) {
        resultDiv.innerHTML = "<p>Please enter valid numbers.</p>";
        return;
      }
      const sum = a + b;
      resultDiv.innerHTML = `<p>${a} + ${b} = ${sum}</p>`;
      drawAdditionDiagram(a, b, sum);
    }
    function drawAdditionDiagram(a, b, sum) {
      const canvas = document.getElementById("additionCanvas");
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Draw a horizontal number line from 0 to sum.
      const margin = 40;
      const width = canvas.width - 2 * margin;
      const scale = width / sum;
      const y = canvas.height / 2;
      ctx.strokeStyle = "#333";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(margin, y);
      ctx.lineTo(canvas.width - margin, y);
      ctx.stroke();
      // Mark 0, a, and sum.
      ctx.fillStyle = "#007BFF";
      const x0 = margin;
      const xA = margin + a * scale;
      const xSum = margin + sum * scale;
      ctx.beginPath();
      ctx.arc(x0, y, 5, 0, 2*Math.PI);
      ctx.fill();
      ctx.fillText("0", x0 - 10, y - 10);
      ctx.beginPath();
      ctx.arc(xA, y, 5, 0, 2*Math.PI);
      ctx.fill();
      ctx.fillText(`${a}`, xA - 10, y - 10);
      ctx.beginPath();
      ctx.arc(xSum, y, 5, 0, 2*Math.PI);
      ctx.fill();
      ctx.fillText(`${sum}`, xSum - 10, y - 10);
      // Draw arrows between 0->a and a->sum
      ctx.strokeStyle = "#FF5722";
      ctx.beginPath();
      ctx.moveTo(x0, y);
      ctx.lineTo(xA, y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(xA, y);
      ctx.lineTo(xSum, y);
      ctx.stroke();
    }

    /* ----- SUBTRACTION FUNCTIONS & DIAGRAM ----- */
    function calcSubtraction() {
      const a = parseFloat(document.getElementById("subA").value);
      const b = parseFloat(document.getElementById("subB").value);
      const resultDiv = document.getElementById("subResult");
      if (isNaN(a) || isNaN(b)) {
        resultDiv.innerHTML = "<p>Please enter valid numbers.</p>";
        return;
      }
      const diff = a - b;
      resultDiv.innerHTML = `<p>${a} - ${b} = ${diff}</p>`;
      drawSubtractionDiagram(a, b, diff);
    }
    function drawSubtractionDiagram(a, b, diff) {
      const canvas = document.getElementById("subtractionCanvas");
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const margin = 40;
      const width = canvas.width - 2 * margin;
      // Determine scale so that difference fits. We consider the number line from diff(minimum) to a.
      const start = Math.min(diff, 0);
      const end = Math.max(a, 0);
      const scale = width / (end - start);
      const y = canvas.height / 2;
      ctx.strokeStyle = "#333";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(margin, y);
      ctx.lineTo(canvas.width - margin, y);
      ctx.stroke();
      // Mark positions for a and diff.
      const xA = margin + (a - start) * scale;
      const xDiff = margin + (diff - start) * scale;
      ctx.fillStyle = "#007BFF";
      ctx.beginPath();
      ctx.arc(xA, y, 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.fillText(`${a}`, xA - 10, y - 10);
      ctx.beginPath();
      ctx.arc(xDiff, y, 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.fillText(`${diff}`, xDiff - 10, y - 10);
      // Draw arrow from a to diff
      ctx.strokeStyle = "#FF5722";
      ctx.beginPath();
      ctx.moveTo(xA, y);
      ctx.lineTo(xDiff, y);
      ctx.stroke();
    }

    /* ----- MULTIPLICATION FUNCTIONS & DIAGRAM ----- */
    function calcMultiplication() {
      const a = parseFloat(document.getElementById("mulA").value);
      const b = parseFloat(document.getElementById("mulB").value);
      const resultDiv = document.getElementById("mulResult");
      if (isNaN(a) || isNaN(b)) {
        resultDiv.innerHTML = "<p>Please enter valid numbers.</p>";
        return;
      }
      const prod = a * b;
      resultDiv.innerHTML = `<p>${a} × ${b} = ${prod}</p>`;
      drawMultiplicationDiagram(a, b, prod);
    }
    function drawMultiplicationDiagram(a, b, prod) {
      // Draw an area model: a rectangle with width = a and height = b.
      const canvas = document.getElementById("multiplicationCanvas");
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Scale rectangle so that it fits into canvas.
      const margin = 40;
      const maxWidth = canvas.width - 2 * margin;
      const maxHeight = canvas.height - 2 * margin;
      const scale = Math.min(maxWidth / a, maxHeight / b);
      const rectWidth = a * scale;
      const rectHeight = b * scale;
      const x = (canvas.width - rectWidth) / 2;
      const y = (canvas.height - rectHeight) / 2;
      ctx.strokeStyle = "#007BFF";
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, rectWidth, rectHeight);
      ctx.fillStyle = "#000";
      ctx.font = "14px Arial";
      ctx.fillText(`Area = ${prod}`, x + rectWidth/2 - 30, y + rectHeight/2);
    }

    /* ----- DIVISION FUNCTIONS & DIAGRAM ----- */
    function calcDivision() {
      const dividend = parseFloat(document.getElementById("dividend").value);
      const divisor = parseFloat(document.getElementById("divisor").value);
      const resultDiv = document.getElementById("divResult");
      if (isNaN(dividend) || isNaN(divisor)) {
        resultDiv.innerHTML = "<p>Please enter valid numbers.</p>";
        return;
      }
      if (divisor === 0) {
        resultDiv.innerHTML = "<p>Division by zero is undefined.</p>";
        return;
      }
      const quotient = dividend / divisor;
      resultDiv.innerHTML = `<p>${dividend} ÷ ${divisor} = ${quotient.toFixed(4)}</p>`;
      drawDivisionDiagram(dividend, divisor, quotient);
    }
    function drawDivisionDiagram(dividend, divisor, quotient) {
      // Draw a number line from 0 to dividend and partition it into equal segments according to divisor.
      const canvas = document.getElementById("divisionCanvas");
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const margin = 40;
      const lineY = canvas.height / 2;
      ctx.strokeStyle = "#333";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(margin, lineY);
      ctx.lineTo(canvas.width - margin, lineY);
      ctx.stroke();
      // Scale: number line from 0 to dividend => available width.
      const width = canvas.width - 2 * margin;
      const scale = width / dividend;
      // Mark the start and end
      ctx.fillStyle = "#007BFF";
      const xStart = margin;
      const xEnd = margin + dividend * scale;
      ctx.beginPath();
      ctx.arc(xStart, lineY, 5, 0, 2*Math.PI);
      ctx.fill();
      ctx.fillText("0", xStart - 10, lineY - 10);
      ctx.beginPath();
      ctx.arc(xEnd, lineY, 5, 0, 2*Math.PI);
      ctx.fill();
      ctx.fillText(dividend, xEnd - 10, lineY - 10);
      // Partition the line into 'divisor' equal parts.
      const partWidth = width / divisor;
      ctx.strokeStyle = "#FF5722";
      for (let i = 1; i < divisor; i++) {
        const xPos = margin + i * partWidth;
        ctx.beginPath();
        ctx.moveTo(xPos, lineY - 10);
        ctx.lineTo(xPos, lineY + 10);
        ctx.stroke();
        ctx.fillText(i, xPos - 5, lineY + 25);
      }
    }

    /* ----- QUIZ FUNCTIONS ----- */
    let quizOp, quizA, quizB, quizAnswer;
    function newQuizQuestion() {
      // Randomly choose an operation among addition, subtraction, multiplication and division.
      const operations = ["+", "-", "*", "/"];
      quizOp = operations[Math.floor(Math.random() * operations.length)];
      quizA = Math.floor(Math.random() * 20) + 1;
      quizB = Math.floor(Math.random() * 20) + 1;
      if (quizOp === "/") {
        // For division, force an integer quotient
        quizB = Math.floor(Math.random() * 9) + 1;
        quizA = quizA * quizB;
      }
      switch (quizOp) {
        case "+":
          quizAnswer = quizA + quizB;
          break;
        case "-":
          quizAnswer = quizA - quizB;
          break;
        case "*":
          quizAnswer = quizA * quizB;
          break;
        case "/":
          quizAnswer = quizA / quizB;
          break;
      }
      document.getElementById("quizQuestion").innerHTML = `<p>What is ${quizA} ${quizOp} ${quizB}?</p>`;
      document.getElementById("quizFeedback").innerHTML = "";
      document.getElementById("quizAnswer").value = "";
    }
    function checkQuizAnswer() {
      const userAns = parseFloat(document.getElementById("quizAnswer").value);
      const feedbackDiv = document.getElementById("quizFeedback");
      if (isNaN(userAns)) {
        feedbackDiv.innerHTML = "<p>Please enter your answer.</p>";
        return;
      }
      if (Math.abs(userAns - quizAnswer) < 1e-9) {
        feedbackDiv.innerHTML = "<p style='color: green;'>Correct!</p>";
      } else {
        feedbackDiv.innerHTML = `<p style='color: red;'>Incorrect! The correct answer is ${quizAnswer}.</p>`;
      }
    }
