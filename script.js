// ------------------------------
// グローバル変数
// ------------------------------
let words = [];
let currentIndex = 0;

// ------------------------------
// 配列シャッフル（ランダム出題用）
// ------------------------------
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// ------------------------------
// CSV をパースして配列に変換
// ------------------------------
function parseCSV(text) {
    const lines = text.trim().split("\n");

    words = lines.map(line => {
        const [q, a] = line.split(",");
        return { question: q, answer: a };
    });

    // ★ ランダムに並び替え
    shuffle(words);

    currentIndex = 0;
    showQuestion();
}

// ------------------------------
// 問題を表示
// ------------------------------
function showQuestion() {
    if (currentIndex >= words.length) {
        document.getElementById("question").textContent = "全問終了！お疲れ！";
        return;
    }

    document.getElementById("question").textContent =
        `${currentIndex + 1}問目：${words[currentIndex].question}`;
}

// ------------------------------
// 回答チェック
// ------------------------------
function checkAnswer() {
    const input = document.getElementById("answer").value.trim();
    const correct = words[currentIndex].answer.trim();

    if (input === correct) {
        document.getElementById("result").textContent = "正解！";
        currentIndex++;
        document.getElementById("answer").value = "";
        showQuestion();
    } else {
        document.getElementById("result").textContent = "違うで！ヒント：" + correct[0];
    }
}

// ------------------------------
// 次の問題へ（ボタン用）
// ------------------------------
function nextQuestion() {
    currentIndex++;
    document.getElementById("answer").value = "";
    document.getElementById("result").textContent = "";
    showQuestion();
}

// ------------------------------
// アプリ起動時に自動で CSV を読み込む
// ------------------------------
window.addEventListener("load", () => {
    const autoUrl = "https://raw.githubusercontent.com/kocha2525/ipas-trainer/main/Book1.csv";

    fetch(autoUrl)
        .then(res => res.text())
        .then(text => parseCSV(text))
        .catch(() => console.log("自動読み込み失敗"));
});
