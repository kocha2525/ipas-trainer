document.addEventListener("DOMContentLoaded", () => {

    /* ===============================
       1. 用語データ
       =============================== */
    const WORD_GROUPS = {
        group1: [
            { term: "3C分析", meaning: "市場・顧客、競合、自社の3つの視点から分析する方法", detail: "(略称：なし) 市場・顧客（Customer）、競合（Competitor）、自社（Company）の3視点で環境を整理する基本フレームワーク" },
            { term: "ASP", meaning: "インターネット経由でソフトウェアを提供するサービス", detail: "Application Service Provider の略で、アプリケーションをインターネット経由で提供するサービス形態" },
            { term: "BCP", meaning: "事業継続計画", detail: "Business Continuity Plan の略で、災害や緊急事態でも事業を継続・早期復旧するための計画" },
            { term: "BPM", meaning: "業務プロセスを継続的に改善する管理手法", detail: "Business Process Management の略で、業務プロセスを可視化し改善を継続する管理手法" },
            { term: "BPO", meaning: "企業の業務を外部企業に委託する経営手法", detail: "Business Process Outsourcing の略で、業務プロセスの一部または全体を外部専門企業に委託する手法" },
            { term: "BPR", meaning: "業務を根本から見直して再構築する手法", detail: "Business Process Reengineering の略で、既存の枠組みにとらわれず業務を抜本的に再設計する改革手法" },
            { term: "BSC", meaning: "企業の経営戦略を評価・管理するための手法", detail: "Balanced Scorecard の略で、財務・顧客・業務プロセス・学習と成長の4視点で目標管理する手法" },
            { term: "BTO", meaning: "受注生産方式", detail: "Build To Order の略で、注文を受けてから製品を生産する方式" },
            { term: "BYOD", meaning: "個人所有の端末を業務で利用すること", detail: "Bring Your Own Device の略で、個人端末を職場や学校で利用する仕組み" },
            { term: "CA", meaning: "認証局", detail: "Certification Authority の略で、HTTPSなどで使う電子証明書を発行・管理する機関" },
            { term: "CAD", meaning: "コンピュータを使って設計や製図を行うシステム", detail: "Computer Aided Design の略で、設計や製図を効率化するシステム" },
            { term: "CAPTCHA", meaning: "人間とボットを判別する仕組み", detail: "Completely Automated Public Turing test to tell Computers and Humans Apart の略で、人間とボットを判別する技術" },
            { term: "CEO", meaning: "最高経営責任者", detail: "Chief Executive Officer の略で、企業の経営方針や戦略を決定する最高責任者" },
            { term: "CIO", meaning: "最高情報責任者", detail: "Chief Information Officer の略で、企業のIT戦略を統括する役職" },
            { term: "CRM", meaning: "顧客関係管理", detail: "Customer Relationship Management の略で、顧客情報を一元管理し満足度やLTVを最大化する仕組み" },
            { term: "CSF", meaning: "重要成功要因", detail: "Critical Success Factor の略で、最終目標（KGI）達成のために重要となる要因" },
            { term: "CSIRT", meaning: "セキュリティ事故対応チーム", detail: "Computer Security Incident Response Team の略で、インシデント対応や被害最小化を行う専門チーム" },
            { term: "CSR", meaning: "企業の社会的責任", detail: "Corporate Social Responsibility の略で、企業が社会・環境へ責任を果たす取り組み" },
            { term: "DFD", meaning: "データの流れを図式化したもの", detail: "Data Flow Diagram の略で、システム内のデータの流れを視覚的に表す図" },
            { term: "DRAM", meaning: "揮発性の主記憶装置", detail: "Dynamic RAM の略で、PCやスマホのメインメモリとして使われる揮発性メモリ" },
            { term: "EA", meaning: "企業全体の情報システムを最適化する設計手法", detail: "Enterprise Architecture の略で、企業の業務・データ・アプリ・技術を体系化する枠組み" },
            { term: "ERP", meaning: "企業資源を統合管理するシステム", detail: "Enterprise Resource Planning の略で、基幹業務を一元管理し効率化する仕組み" },
            { term: "E-R図", meaning: "データベースの構造を表す図", detail: "Entity–Relationship Diagram の略で、データ同士の関係を図式化する設計図" },
            { term: "FP法", meaning: "ソフトウェアの規模を見積もる手法", detail: "Function Point 法の略で、機能数を基準に開発規模を見積もる方法" },
            { term: "HTML", meaning: "Webページを記述する言語", detail: "HyperText Markup Language の略で、Webページの構造を記述する言語" },
            { term: "ICT", meaning: "情報通信技術", detail: "Information and Communication Technology の略で、ITと通信技術を含む広い概念" },
            { term: "IDS", meaning: "不正侵入を検知する仕組み", detail: "Intrusion Detection System の略で、不正アクセスを検知するセキュリティ機器" },
            { term: "IoT", meaning: "モノがインターネットにつながる仕組み", detail: "Internet of Things の略で、家電や車などがネット接続してデータ活用する技術" },
            { term: "IPS", meaning: "不正侵入を防御する仕組み", detail: "Intrusion Prevention System の略で、攻撃を自動で遮断する仕組み" },
            { term: "IPアドレス", meaning: "ネットワーク上の住所", detail: "Internet Protocol Address の略で、ネット上で機器を識別する番号" }
        ],

        group2: [
            { term: "IrDA", meaning: "赤外線通信規格", detail: "Infrared Data Association の略で、機器同士を赤外線で通信する規格" },
            { term: "ISMS", meaning: "情報セキュリティ管理の仕組み", detail: "Information Security Management System の略で、組織の情報資産を守るための管理体制" },
            { term: "ISO", meaning: "国際標準化機構", detail: "International Organization for Standardization の略で、国際的な標準を策定する機関" },
            { term: "ISO14000", meaning: "環境マネジメント規格", detail: "ISO 14000 シリーズの略で、環境保全や環境負荷低減のための仕組みを定めた規格群" },
            { term: "ISO27000", meaning: "情報セキュリティマネジメント規格", detail: "ISO 27000 シリーズの略で、ISMSの運用・改善に関する国際標準" },
            { term: "ISO9000", meaning: "品質管理規格", detail: "ISO 9000 シリーズの略で、製品やサービスの品質を継続的に改善するための仕組みを定めた規格群" },
            { term: "ITIL", meaning: "ITサービス管理のベストプラクティス", detail: "Information Technology Infrastructure Library の略で、ITサービス運用のベストプラクティス集" },
            { term: "ITガバナンス", meaning: "ITを適切に管理・統制する仕組み", detail: "(略称：なし) 企業のIT投資やシステム運用を経営目標に沿って管理し、リスクを抑える枠組み" },
            { term: "KJ法", meaning: "アイデアを分類・整理する手法", detail: "(略称：なし) 川喜田二郎氏が考案した、カード化→グループ化→構造化で問題の本質を探る発想法" },
            { term: "M&A", meaning: "企業の合併・買収", detail: "Merger and Acquisition の略で、企業を買収・合併して事業拡大を図る戦略" },
            { term: "MACアドレス", meaning: "ネットワーク機器の固有番号", detail: "Media Access Control Address の略で、ネットワーク機器に割り当てられた物理的識別番号" },
            { term: "MBO", meaning: "経営陣による企業買収", detail: "Management Buyout の略で、経営陣が自社を買収し、経営権を取得するM&A手法" },
            { term: "MP3", meaning: "音声圧縮形式", detail: "MPEG-1 Audio Layer-3 の略で、音質を保ちながら高圧縮できる音声フォーマット" },
            { term: "MRP", meaning: "資材所要量計画", detail: "Material Requirements Planning の略で、製造に必要な資材の量やタイミングを計算する仕組み" },
            { term: "MTBF", meaning: "平均故障間隔", detail: "Mean Time Between Failures の略で、機器が故障するまでの平均時間を示す信頼性指標" },
            { term: "MTTR", meaning: "平均修復時間", detail: "Mean Time To Repair の略で、故障から復旧までにかかる平均時間を示す指標" },
            { term: "NDA", meaning: "秘密保持契約", detail: "Non Disclosure Agreement の略で、業務で知った情報を第三者に漏らさないための契約" },
            { term: "OEM", meaning: "他社ブランド製品を製造すること", detail: "Original Equipment Manufacturer の略で、他社ブランドで販売される製品を製造する企業や仕組み" },
            { term: "Off-JT", meaning: "職場外での研修", detail: "Off the Job Training の略で、セミナー・講習など職場外で行う教育訓練" },
            { term: "OJT", meaning: "職場内での実務研修", detail: "On the Job Training の略で、実際の業務を通じてスキルを身につける教育方法" },
            { term: "OSS", meaning: "オープンソースソフトウェア", detail: "Open Source Software の略で、ソースコードが公開され誰でも利用・改良できるソフトウェア" },
            { term: "PDCAサイクル", meaning: "計画→実行→評価→改善のサイクル", detail: "Plan・Do・Check・Act の略で、業務改善を継続的に行う管理手法" },
            { term: "PDF", meaning: "電子文書フォーマット", detail: "Portable Document Format の略で、レイアウトを崩さず文書を共有できる形式" },
            { term: "PKI", meaning: "公開鍵基盤", detail: "Public Key Infrastructure の略で、公開鍵暗号と電子証明書を使い安全な通信を実現する仕組み" },
            { term: "PLC", meaning: "製品ライフサイクル", detail: "Product Life Cycle の略で、製品が市場に登場してから成長・成熟・衰退していく一連の段階を示すマーケティングの考え方" },
            { term: "PL法", meaning: "製造物責任法", detail: "Product Liability Law の略で、製品の欠陥で消費者が被害を受けた場合の製造者責任を定めた法律" },
            { term: "PMBOK", meaning: "プロジェクト管理の知識体系", detail: "Project Management Body of Knowledge の略で、プロジェクト管理の標準的知識をまとめたガイド" },
            { term: "POSシステム", meaning: "販売時点情報管理システム", detail: "Point of Sale の略で、レジでの販売情報を記録し在庫管理や売上分析に活用する仕組み" },
            { term: "PPM", meaning: "製品を市場成長率と占有率で分類する手法", detail: "Product Portfolio Management の略で、花形・金のなる木・問題児・負け犬の4分類で事業を評価する手法" },
            { term: "RAIDシステム", meaning: "複数HDDをまとめて高速化・冗長化する仕組み", detail: "Redundant Array of Independent Disks の略で、複数ディスクをまとめて扱い高速化や安全性向上を図る技術" }
        ]
    };

    /* ===============================
       2. 状態管理
       =============================== */
    let selectedGroups = [];
    let currentWords = [];
    let currentIndex = 0;
    let correctCount = 0;
    let wrongList = [];
    let historyList = [];
    let mode = "typing";

    /* ===============================
       3. 画面切り替え
       =============================== */
    function showScreen(id) {
        document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
        document.getElementById(id).classList.add("active");
    }

    document.getElementById("startBtn").onclick = () => {
        showScreen("groupScreen");
    };
    /* ===============================
       4. グループ複数選択
       =============================== */
    document.querySelectorAll(".group-btn").forEach(btn => {
        btn.onclick = () => {
            const group = btn.dataset.group;

            if (selectedGroups.includes(group)) {
                selectedGroups = selectedGroups.filter(g => g !== group);
                btn.style.background = "#F0FAFF";
                btn.style.color = "#333";
            } else {
                selectedGroups.push(group);
                btn.style.background = "#ff4d8d";
                btn.style.color = "white";
            }
        };
    });

    /* ===============================
       5. スタート → モード選択へ
       =============================== */
    document.getElementById("groupStartBtn").onclick = () => {
        if (selectedGroups.length === 0) {
            alert("グループを選んでね");
            return;
        }
        showScreen("modeScreen");
    };

    /* ===============================
       6. モード選択
       =============================== */
    document.querySelectorAll(".mode-btn").forEach(btn => {
        btn.onclick = () => {
            mode = btn.dataset.mode;

            currentWords = [];
            selectedGroups.forEach(g => {
                currentWords = currentWords.concat(WORD_GROUPS[`group${g}`]);
            });

            shuffle(currentWords);

            currentIndex = 0;
            correctCount = 0;
            wrongList = [];
            historyList = [];

            updateProgress();
            showQuestion();

            showScreen("mainScreen");
        };
    });

    document.getElementById("groupWordListBtn").onclick = () => {
        showWordList();
    };

    /* ===============================
       7. シャッフル
       =============================== */
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    /* ===============================
       8. 進捗バー
       =============================== */
    function updateProgress() {
        const percent = (currentIndex / currentWords.length) * 100;
        document.getElementById("progressFill").style.width = percent + "%";
    }

    /* ===============================
       9. 問題表示（typing / choice / review）
       =============================== */
    function showQuestion() {
        const quizArea = document.getElementById("quizArea");

        // ★クリア判定
        if (currentIndex >= currentWords.length) {
            quizArea.innerHTML = `
            <div class="card">
                <h3>クリア！</h3>

                <button id="showHistoryBtn" class="btn small">正誤履歴</button>
                <button id="showReviewBtn" class="btn small">復習モード</button>

                <button id="backToModeBtn" class="btn small" style="margin-top:10px;">
                    モード選択に戻る
                </button>

                <button id="backToGroupBtn" class="btn small" style="margin-top:10px;">
                    グループ選択に戻る
                </button>
            </div>
        `;

            document.getElementById("showHistoryBtn").onclick = () => showHistory();
            document.getElementById("showReviewBtn").onclick = () => startReviewMode();
            document.getElementById("backToModeBtn").onclick = () => showScreen("modeScreen");
            document.getElementById("backToGroupBtn").onclick = () => showScreen("groupScreen");

            return;
        }

        const item = currentWords[currentIndex];

        if (mode === "typing") {
            showTypingQuestion(item);
        } else if (mode === "choice") {
            showChoiceQuestion(item);
        } else if (mode === "review") {
            showTypingQuestion(item);
        }
    }
    /* ===============================
       10. 入力式（タイピング）
       =============================== */
    function showTypingQuestion(item) {
        const quizArea = document.getElementById("quizArea");

        quizArea.innerHTML = `
        <div class="card" id="questionCard">
            <div class="label">意味</div>
            <div class="term">${item.meaning}</div>

            <input type="text" id="userAnswer" placeholder="ここに用語を入力">

            <button id="checkBtn" class="btn small">答え合わせ</button>

            <div id="detailArea"></div>

            <button id="nextBtn" class="btn small" style="display:none;">次へ</button>
        </div>
        `;

        const input = document.getElementById("userAnswer");
        const nextBtn = document.getElementById("nextBtn");
        const card = document.getElementById("questionCard");

        input.focus();

        function checkAnswer() {
            const user = input.value.trim().toLowerCase();
            const correct = item.term.trim().toLowerCase();

            showCorrectCard(item);
            showDetailCard(item);
            showExtraCard(item);

            nextBtn.style.display = "inline-block";

            if (user !== correct) {
                input.value = "";
            }

            input.focus();

            const alreadyWrong = wrongList.some(w => w.term === item.term);

            if (user === correct) {
                correctEffect(card);

                if (!alreadyWrong) {
                    correctCount++;
                    document.getElementById("score").textContent = `正解数：${correctCount}`;
                }

                historyList.push({ term: item.term, result: "○" });

            } else {
                wrongEffect(card);

                if (!alreadyWrong) {
                    wrongList.push(item);
                }

                historyList.push({ term: item.term, result: "×" });
            }
        }

        document.getElementById("checkBtn").onclick = checkAnswer;

        input.addEventListener("keydown", (e) => {
            if (e.key !== "Enter") return;

            if (nextBtn.style.display === "none") {
                checkAnswer();
                return;
            }

            currentIndex++;
            updateProgress();
            showQuestion();
        });

        nextBtn.onclick = () => {
            currentIndex++;
            updateProgress();
            showQuestion();
        };
    }

    /* ===============================
       11. 四択用選択肢生成
       =============================== */
    function generateChoices(item) {
        const others = currentWords.filter(w => w.term !== item.term);
        const wrongChoices = shuffle(others).slice(0, 3).map(w => w.term);
        const choices = [...wrongChoices, item.term];
        return shuffle(choices);
    }

    /* ===============================
       12. 四択式
       =============================== */
    function showChoiceQuestion(item) {
        const quizArea = document.getElementById("quizArea");

        const choices = generateChoices(item);

        quizArea.innerHTML = `
        <div class="card" id="questionCard">
            <div class="label">意味</div>
            <div class="term">${item.meaning}</div>

            <div class="choice-area">
                ${choices.map(c => `<button class="choice-btn">${c}</button>`).join("")}
            </div>

            <div id="choiceDetailArea"></div>

            <button id="nextBtn" class="btn small" style="display:none;">次へ</button>
        </div>
        `;

        const nextBtn = document.getElementById("nextBtn");
        const card = document.getElementById("questionCard");

        document.querySelectorAll(".choice-btn").forEach(btn => {
            btn.onclick = () => {
                const answer = btn.textContent.trim();
                const correct = item.term.trim();

                const detailArea = document.getElementById("choiceDetailArea");
                detailArea.innerHTML = "";

                showCorrectCard(item);
                showDetailCard(item);
                showExtraCard(item);

                nextBtn.style.display = "inline-block";

                const alreadyWrong = wrongList.some(w => w.term === item.term);

                if (answer === correct) {
                    correctEffect(card);

                    if (!alreadyWrong) {
                        correctCount++;
                        document.getElementById("score").textContent = `正解数：${correctCount}`;
                    }

                    historyList.push({ term: item.term, result: "○" });

                } else {
                    wrongEffect(card);

                    if (!alreadyWrong) {
                        wrongList.push(item);
                    }

                    historyList.push({ term: item.term, result: "×" });
                }
            };
        });

        nextBtn.onclick = () => {
            currentIndex++;
            updateProgress();
            showQuestion();
        };
    }

    /* ===============================
       13. 正解カード
       =============================== */
    function showCorrectCard(item) {
        const detailArea =
            document.getElementById("choiceDetailArea") ||
            document.getElementById("detailArea");

        detailArea.innerHTML += `
        <div class="card" style="margin-top:15px; background:#E0FFE8; border-left:5px solid #4CAF50;">
            <div><strong>正解：</strong> ${item.term}</div>
        </div>
        `;
    }

    /* ===============================
       14. 詳細カード
       =============================== */
    function showDetailCard(item) {
        const detailArea =
            document.getElementById("choiceDetailArea") ||
            document.getElementById("detailArea");

        detailArea.innerHTML += `
        <div class="card" style="margin-top:15px; background:#E8F4FF; border-left:5px solid #2196F3;">
            <div><strong>意味の詳細：</strong> ${item.meaning}</div>
        </div>
        `;
    }

    /* ===============================
       15. 補足カード
       =============================== */
    function showExtraCard(item) {
        const detailArea =
            document.getElementById("choiceDetailArea") ||
            document.getElementById("detailArea");

        if (!item.detail || item.detail.trim() === "") return;

        detailArea.innerHTML += `
        <div class="card" style="margin-top:15px; background:#FFF7D6; border-left:5px solid #FFC107;">
            <div><strong>補足説明：</strong> ${item.detail}</div>
        </div>
        `;
    }

    /* ===============================
       16. 正解エフェクト
       =============================== */
    function correctEffect(card) {
        card.style.animation = "correctFlash 0.6s";
        setTimeout(() => card.style.animation = "", 600);
    }

    /* ===============================
       17. 不正解エフェクト
       =============================== */
    function wrongEffect(card) {
        card.style.animation = "wrongShake 0.4s";
        setTimeout(() => card.style.animation = "", 400);
    }

    /* ===============================
   正誤履歴ボタン（mainScreen）
   =============================== */
    document.getElementById("historyBtn").onclick = () => {
        showHistory();
    };

    /* ===============================
       18. 正誤履歴ページ
       =============================== */
    function showHistory() {
        const list = document.getElementById("historyList");

        list.innerHTML = historyList.map(h =>
            `<div class="word-item">${h.term} → ${h.result}</div>`
        ).join("");

        showScreen("historyScreen");
    }

    document.getElementById("historyBackBtn").onclick = () => {
        showScreen("mainScreen");
        showQuestion();  // 現在の問題を再表示
    };

    /* ===============================
       19. グループ選択に戻るボタン
       =============================== */
    document.getElementById("backBtn").onclick = () => {
        showScreen("groupScreen");
    };

    /* ===============================
       20. 復習モード
       =============================== */
    function startReviewMode() {
        if (wrongList.length === 0) {
            alert("間違えた問題はありません");
            return;
        }

        mode = "review";
        currentWords = [...wrongList];
        currentIndex = 0;
        correctCount = 0;

        updateProgress();
        showQuestion();

        showScreen("mainScreen");
    }

    /* ===============================
       21. 単語一覧ページ
       =============================== */
    function showWordList() {
        const list = document.getElementById("wordList");

        let all = [];
        selectedGroups.forEach(g => {
            all = all.concat(WORD_GROUPS[`group${g}`]);
        });

        list.innerHTML = all.map(w =>
            `
        <div class="card" style="margin-bottom:15px;">
            <div><strong>用語：</strong> ${w.term}</div>
            <div><strong>意味：</strong> ${w.meaning}</div>
            <div><strong>補足：</strong> ${w.detail}</div>
        </div>
        `
        ).join("");

        showScreen("listScreen");
    }

}); // ← DOMContentLoaded の閉じ
