// ===============================
// 変数
// ===============================
let words = [];
let wrongList = [];
let history = [];
let currentIndex = 0;
let correctCount = 0;
let mode = "input"; // input / choice / review
let reviewMode = false;

// ===============================
// 初期処理
// ===============================
document.getElementById("startBtn").addEventListener("click", () => {
    document.getElementById("titleScreen").classList.remove("active");
    document.getElementById("mainScreen").classList.add("active");
});

// ===============================
// CSV読み込み（ファイル）
// ===============================
document.getElementById("csvInput").addEventListener("change", function () {
    const file = this.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        parseCSV(e.target.result);
    };
    reader.readAsText(file, "UTF-8");
});

// ===============================
// CSV読み込み（URL）
// ===============================
document.getElementById("loadUrlBtn").addEventListener("click", async () => {
    const url = document.getElementById("csvUrlInput").value.trim();
    if (!url) {
        alert("URLを入力してください");
        return;
    }

    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("読み込み失敗");

        const text = await res.text();
        parseCSV(text);

        alert("CSVを読み込みました！");
    } catch (e) {
        alert("CSVを読み込めませんでした。URLを確認してください。");
    }
});

// ===============================
// CSV解析
// ===============================
function parseCSV(text) {
    const lines = text.split(/\r?\n/).map(l => l.trim()).filter(l => l);

    const result = [];
    for (const line of lines) {
        const parts = line.split(",");
        if (parts.length >= 2) {
            result.push({
                term: parts[0].trim(),
                meaning: parts.slice(1).join(",").trim()
            });
        }
    }

    words = result;
    wrongList = [];
    history = [];
    currentIndex = 0;
    correctCount = 0;

    updateScore();
    showQuestion();
}

// ===============================
// モード切替
// ===============================
document.querySelectorAll(".mode-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".mode-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        mode = btn.dataset.mode;
        reviewMode = (mode === "review");

        currentIndex = 0;
        showQuestion();
    });
});

// ===============================
// スコア更新
// ===============================
function updateScore() {
    document.getElementById("score").textContent = `正解数：${correctCount}`;
}

// ===============================
// 問題表示
// ===============================
function showQuestion() {
    const quizArea = document.getElementById("quizArea");

    let list = reviewMode ? wrongList : words;

    if (list.length === 0) {
        quizArea.innerHTML = `<div class="empty">問題がありません。</div>`;
        return;
    }

    if (currentIndex >= list.length) currentIndex = 0;

    const item = list[currentIndex];

    document.getElementById("counter").textContent =
        `${currentIndex + 1} / ${list.length}`;

    if (mode === "input") {
        renderInput(item);
    } else if (mode === "choice") {
        renderChoice(item);
    } else if (mode === "review") {
        renderInput(item);
    }
}

// ===============================
// タイピング問題
// ===============================
function renderInput(item) {
    const quizArea = document.getElementById("quizArea");

    quizArea.innerHTML = `
    <div class="card">
      <div class="label">意味</div>
      <div class="term">${item.meaning}</div>

      <input type="text" id="userAnswer" placeholder="ここに用語を入力">

      <button id="showBtn" class="btn small">答えを見る</button>
      <button id="checkBtn" class="btn small">答え合わせ</button>

      <div class="answer" id="answerArea" style="display:none;">
        <strong>正解：</strong> ${item.term}
      </div>

      <div class="message" id="messageArea"></div>
    </div>
  `;

    const input = document.getElementById("userAnswer");
    input.focus();

    const hint = item.term.slice(0, 2) + "…";

    document.getElementById("showBtn").addEventListener("click", () => {
        document.getElementById("answerArea").style.display = "block";
    });

    function check() {
        const user = normalize(input.value);
        const correct = normalize(item.term);

        if (user === correct) {
            correctCount++;
            updateScore();
            addHistory(item, true);

            document.getElementById("messageArea").textContent = "正解！";

            setTimeout(nextQuestion, 800);
        } else {
            addHistory(item, false);
            document.getElementById("messageArea").textContent = `ヒント：${hint}`;

            if (!wrongList.includes(item)) wrongList.push(item);
        }
    }

    document.getElementById("checkBtn").addEventListener("click", check);

    input.addEventListener("keydown", e => {
        if (e.key === "Enter") check();
    });
}

// ===============================
// 四択問題
// ===============================
function renderChoice(item) {
    const quizArea = document.getElementById("quizArea");

    let choices = [item.term];

    while (choices.length < 4) {
        const r = words[Math.floor(Math.random() * words.length)].term;
        if (!choices.includes(r)) choices.push(r);
    }

    choices.sort(() => Math.random() - 0.5);

    quizArea.innerHTML = `
    <div class="card">
      <div class="label">意味</div>
      <div class="term">${item.meaning}</div>

      ${choices.map(c => `<button class="choice-btn">${c}</button>`).join("")}

      <div class="message" id="messageArea"></div>
    </div>
  `;

    document.querySelectorAll(".choice-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const user = normalize(btn.textContent);
            const correct = normalize(item.term);

            if (user === correct) {
                correctCount++;
                updateScore();
                addHistory(item, true);

                document.getElementById("messageArea").textContent = "正解！";
                setTimeout(nextQuestion, 800);
            } else {
                addHistory(item, false);
                document.getElementById("messageArea").textContent = "不正解…";

                if (!wrongList.includes(item)) wrongList.push(item);
            }
        });
    });
}

// ===============================
// 次の問題へ
// ===============================
function nextQuestion() {
    currentIndex++;
    showQuestion();
}

// ===============================
// 履歴
// ===============================
function addHistory(item, isCorrect) {
    history.push({
        term: item.term,
        meaning: item.meaning,
        correct: isCorrect
    });

    renderHistory();
}

function renderHistory() {
    const panel = document.getElementById("historyPanel");

    panel.innerHTML = history.map(h => `
    <div class="history-item ${h.correct ? "correct" : "wrong"}">
      ${h.correct ? "○" : "×"} ${h.term} - ${h.meaning}
    </div>
  `).join("");
}

document.getElementById("historyBtn").addEventListener("click", () => {
    const panel = document.getElementById("historyPanel");
    panel.style.display = panel.style.display === "block" ? "none" : "block";
});

// ===============================
// リセット
// ===============================
document.getElementById("resetBtn").addEventListener("click", () => {
    correctCount = 0;
    history = [];
    wrongList = [];
    updateScore();
    renderHistory();
    alert("リセットしました！");
});

// ===============================
// ゆらぎ吸収
// ===============================
function normalize(str) {
    return str
        .trim()
        .replace(/\s+/g, "")
        .replace(/[Ａ-Ｚａ-ｚ０-９]/g, s => String.fromCharCode(s.charCodeAt(0) - 65248))
        .toLowerCase();
}

// アプリ起動時に自動でcsvを読み込む
window.addEventListener("load", () => {
    const autoUrl = "https://raw.githubusercontent.com/kocha2525/ipas-trainer/main/Book1.csv";

    fetch(autoUrl)
        .then(res => res.text())
        .then(text => parseCSV(text))
        .catch(() => console.log("自動読み込み失敗"));
});
