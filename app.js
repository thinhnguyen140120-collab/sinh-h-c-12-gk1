// TOÀN BỘ LOGIC ỨNG DỤNG ÔN THI SINH HỌC 12 CHƯƠNG 1 (GDPT 2018)
class BiologyQuizApp {
    constructor() {
        this.db = window.RAW_DATABASE || [];
        this.lessons = window.LESSONS_INFO || {};
        this.diagrams = window.BIO_DIAGRAMS || {};

        // Trạng thái ứng dụng
        this.currentMode = 'home'; // 'home' | 'practice' | 'exam' | 'mistakes' | 'bookmarks' | 'stats'
        this.currentFilter = 'all'; // 'all' | 1 | 2 | 3 | 4 | 5
        this.activeQuestions = [];
        this.searchKeyword = '';
        this.typeFilter = 'all'; // 'all' | 'mcq' | 'tf' | 'short_answer'

        // Trạng thái thi thử (Exam Mode)
        this.examState = {
            isActive: false,
            isSubmitted: false,
            questions: [],
            userAnswers: [],
            timeLeft: 45 * 60, // 45 phút
            timerInterval: null,
            score: null,
            partScores: { p1: 0, p2: 0, p3: 0 }
        };

        // Dữ liệu lưu trữ LocalStorage
        this.userAnswers = JSON.parse(localStorage.getItem('bio12_answers_v3')) || {};
        this.mistakes = JSON.parse(localStorage.getItem('bio12_mistakes_v3')) || [];
        this.bookmarks = JSON.parse(localStorage.getItem('bio12_bookmarks_v3')) || [];
        this.examHistory = JSON.parse(localStorage.getItem('bio12_exam_history_v3')) || [];

        // Làm sạch danh sách câu sai (loại bỏ câu đã làm đúng từ trước)
        this.cleanMistakes();

        this.init();
    }

    init() {
        this.render();
    }

    saveState() {
        localStorage.setItem('bio12_answers_v3', JSON.stringify(this.userAnswers));
        localStorage.setItem('bio12_mistakes_v3', JSON.stringify(this.mistakes));
        localStorage.setItem('bio12_bookmarks_v3', JSON.stringify(this.bookmarks));
        localStorage.setItem('bio12_exam_history_v3', JSON.stringify(this.examHistory));
    }

    shuffleArray(array) {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    normalizeStr(str) {
        return (str || '')
            .toString()
            .trim()
            .toLowerCase()
            .replace(/\s+/g, '');
    }

    // So sánh câu trả lời ngắn thông minh (xử lý dấu phẩy/chấm thập phân, %, phân số)
    isShortAnswerMatch(userInput, acceptableAnswers) {
        if (!userInput || !acceptableAnswers || acceptableAnswers.length === 0) return false;
        const userNorm = this.normalizeStr(userInput);
        if (!userNorm) return false;

        const userNormDot = userNorm.replace(/,/g, '.');

        return acceptableAnswers.some(ans => {
            const ansNorm = this.normalizeStr(ans);
            const ansNormDot = ansNorm.replace(/,/g, '.');

            // 1. So khớp chuỗi trực tiếp
            if (userNorm === ansNorm || userNormDot === ansNormDot) return true;

            // 2. So khớp số thập phân
            const userNum = parseFloat(userNormDot);
            const ansNum = parseFloat(ansNormDot);
            if (!isNaN(userNum) && !isNaN(ansNum) && !userNormDot.includes('%') && !ansNormDot.includes('%')) {
                if (Math.abs(userNum - ansNum) < 0.0001) return true;
            }

            // 3. So khớp phần trăm (VD: 30% vs 0.3)
            if (userNormDot.endsWith('%') && !ansNormDot.endsWith('%')) {
                const pVal = parseFloat(userNormDot.replace('%', '')) / 100;
                if (!isNaN(pVal) && !isNaN(ansNum) && Math.abs(pVal - ansNum) < 0.0001) return true;
            }
            if (!userNormDot.endsWith('%') && ansNormDot.endsWith('%')) {
                const pVal = parseFloat(ansNormDot.replace('%', '')) / 100;
                if (!isNaN(userNum) && !isNaN(pVal) && Math.abs(userNum - pVal) < 0.0001) return true;
            }

            // 4. So khớp phân số (VD: 1/2 vs 0.5)
            if (ansNorm.includes('/')) {
                const parts = ansNorm.split('/');
                if (parts.length === 2) {
                    const fractionVal = parseFloat(parts[0]) / parseFloat(parts[1]);
                    if (!isNaN(fractionVal) && !isNaN(userNum) && Math.abs(fractionVal - userNum) < 0.0001) return true;
                }
            }
            if (userNorm.includes('/')) {
                const parts = userNorm.split('/');
                if (parts.length === 2) {
                    const fractionVal = parseFloat(parts[0]) / parseFloat(parts[1]);
                    if (!isNaN(fractionVal) && !isNaN(ansNum) && Math.abs(fractionVal - ansNum) < 0.0001) return true;
                }
            }

            return false;
        });
    }

    // =========================================================================
    // HỆ THỐNG KIỂM TRA TRẠNG THÁI CÂU HỎI & QUẢN LÝ SỔ TAY CÂU SAI
    // =========================================================================

    // Kiểm tra câu hỏi có đang được trả lời ĐÚNG hay không
    isQuestionCorrect(q) {
        if (!q) return false;
        const uAns = this.userAnswers[q.id];
        if (!uAns) return false;

        if (q.type === 'mcq') {
            return uAns.selected !== undefined && parseInt(uAns.selected) === parseInt(q.answer);
        }
        if (q.type === 'tf') {
            if (!q.items || q.items.length === 0) return false;
            return q.items.every(item => uAns[item.label] !== undefined && uAns[item.label] === item.answer);
        }
        if (q.type === 'short_answer') {
            return uAns.text !== undefined && uAns.text.trim() !== '' && this.isShortAnswerMatch(uAns.text, q.acceptableAnswers);
        }
        return false;
    }

    // Kiểm tra câu hỏi có đang ở trạng thái LÀM SAI hay không
    isQuestionIncorrect(q) {
        if (!q) return false;
        const uAns = this.userAnswers[q.id];

        if (q.type === 'mcq') {
            if (uAns && uAns.selected !== undefined && uAns.selected !== null) {
                return parseInt(uAns.selected) !== parseInt(q.answer);
            }
            return this.mistakes.includes(q.id);
        }

        if (q.type === 'tf') {
            if (uAns && Object.keys(uAns).length > 0) {
                let hasWrongItem = false;
                let answeredAll = true;
                q.items.forEach(item => {
                    if (uAns[item.label] !== undefined) {
                        if (uAns[item.label] !== item.answer) {
                            hasWrongItem = true;
                        }
                    } else {
                        answeredAll = false;
                    }
                });
                if (hasWrongItem) return true;
                if (answeredAll) return false;
            }
            return this.mistakes.includes(q.id);
        }

        if (q.type === 'short_answer') {
            if (uAns && uAns.text !== undefined && uAns.text.trim() !== '') {
                return !this.isShortAnswerMatch(uAns.text, q.acceptableAnswers);
            }
            return this.mistakes.includes(q.id);
        }

        return false;
    }

    // Dọn dẹp sổ tay câu sai: TUYỆT ĐỐI LOẠI BỎ TẤT CẢ CÁC CÂU ĐÃ LÀM ĐÚNG
    cleanMistakes() {
        const prevCount = this.mistakes.length;
        this.mistakes = this.mistakes.filter(id => {
            const q = this.db.find(item => item.id === id);
            if (!q) return false;
            // Nếu người dùng đã sửa đúng -> loại bỏ ngay
            if (this.isQuestionCorrect(q)) return false;
            // Phải thực sự đang sai
            return this.isQuestionIncorrect(q);
        });
        if (this.mistakes.length !== prevCount) {
            this.saveState();
        }
    }

    // Gắn / Bỏ đánh dấu câu hỏi (Bookmark)
    toggleBookmark(qId) {
        const index = this.bookmarks.indexOf(qId);
        if (index > -1) {
            this.bookmarks.splice(index, 1);
        } else {
            this.bookmarks.push(qId);
        }
        this.saveState();
        if (this.currentMode === 'bookmarks') {
            this.activeQuestions = this.db.filter(q => this.bookmarks.includes(q.id));
            this.render();
        } else {
            this.updateQuestionCardUI(qId);
        }
    }

    // Điều hướng giữa các màn hình
    navigateTo(mode, filter = 'all') {
        if (this.examState.isActive && !this.examState.isSubmitted && mode !== 'exam') {
            if (!confirm("Bạn đang trong bài thi thử. Rời đi sẽ hủy kết quả bài thi. Bạn có chắc chắn muốn thoát?")) {
                return;
            }
            this.exitExam();
        }

        this.currentMode = mode;
        this.currentFilter = filter;
        this.searchKeyword = '';

        if (mode === 'practice') {
            if (filter === 'all') {
                this.activeQuestions = [...this.db];
            } else {
                this.activeQuestions = this.db.filter(q => q.lesson === parseInt(filter));
            }
        } else if (mode === 'mistakes') {
            // Lọc chính xác 100%: Chỉ hiển thị câu làm sai, tuyệt đối không hiển thị câu đúng
            this.cleanMistakes();
            this.activeQuestions = this.db.filter(q => this.mistakes.includes(q.id) && !this.isQuestionCorrect(q));
        } else if (mode === 'bookmarks') {
            this.activeQuestions = this.db.filter(q => this.bookmarks.includes(q.id));
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.render();
    }

    // Xử lý tìm kiếm & lọc
    handleSearch(keyword) {
        this.searchKeyword = keyword.toLowerCase().trim();
        this.applyFilters();
    }

    handleTypeFilter(type) {
        this.typeFilter = type;
        this.applyFilters();
    }

    applyFilters() {
        let baseList = [];
        if (this.currentMode === 'practice') {
            baseList = this.currentFilter === 'all' 
                ? [...this.db] 
                : this.db.filter(q => q.lesson === parseInt(this.currentFilter));
        } else if (this.currentMode === 'mistakes') {
            // Sổ tay câu sai: Lọc sạch chỉ giữ câu đang sai, loại bỏ tuyệt đối câu đúng
            this.cleanMistakes();
            baseList = this.db.filter(q => this.mistakes.includes(q.id) && !this.isQuestionCorrect(q));
        } else if (this.currentMode === 'bookmarks') {
            baseList = this.db.filter(q => this.bookmarks.includes(q.id));
        }

        this.activeQuestions = baseList.filter(q => {
            const matchType = this.typeFilter === 'all' || q.type === this.typeFilter;
            const matchText = !this.searchKeyword || 
                q.question?.toLowerCase().includes(this.searchKeyword) ||
                q.context?.toLowerCase().includes(this.searchKeyword) ||
                (q.options && q.options.some(opt => opt.toLowerCase().includes(this.searchKeyword)));
            return matchType && matchText;
        });

        const listEl = document.getElementById('questions-list');
        if (listEl) {
            listEl.innerHTML = this.activeQuestions.length > 0 
                ? this.activeQuestions.map((q, idx) => this.generateQuestionCardHTML(q, idx + 1)).join('')
                : `<div class="bg-white rounded-xl p-8 text-center text-gray-500 border">Không tìm thấy câu hỏi nào phù hợp với bộ lọc hiện tại.</div>`;
            const countEl = document.getElementById('filtered-count');
            if (countEl) countEl.innerText = this.activeQuestions.length;
        }
    }

    // Ghi nhận đáp án câu hỏi nhiều lựa chọn (MCQ) trong chế độ Luyện tập
    setMCQAnswer(qId, optionIdx, isExam = false) {
        if (!this.userAnswers[qId]) {
            this.userAnswers[qId] = {};
        }
        this.userAnswers[qId].selected = optionIdx;

        const q = this.db.find(item => item.id === qId);
        if (q) {
            const isCorrect = parseInt(optionIdx) === parseInt(q.answer);
            if (isCorrect) {
                // Đã làm đúng -> XÓA NGAY LẬP TỨC KHỎI SỔ TAY CÂU SAI
                this.mistakes = this.mistakes.filter(id => id !== qId);
            } else if (!this.mistakes.includes(qId)) {
                this.mistakes.push(qId);
            }
        }

        this.saveState();

        if (this.currentMode === 'mistakes') {
            // Khi đang ở chế độ Sổ tay câu sai và người dùng chọn đúng, cập nhật card và số lượng câu sai
            this.updateQuestionCardUI(qId);
            const countEl = document.getElementById('filtered-count');
            if (countEl) countEl.innerText = this.mistakes.length;
        } else {
            this.updateQuestionCardUI(qId);
        }
    }

    // Ghi nhận đáp án câu hỏi Đúng / Sai (TF) trong chế độ Luyện tập
    setTFAnswer(qId, itemLabel, val, isExam = false) {
        if (!this.userAnswers[qId]) {
            this.userAnswers[qId] = {};
        }
        this.userAnswers[qId][itemLabel] = val;

        const q = this.db.find(item => item.id === qId);
        if (q) {
            if (this.isQuestionCorrect(q)) {
                // Đã làm đúng toàn bộ 4 ý -> Xóa khỏi câu sai
                this.mistakes = this.mistakes.filter(id => id !== qId);
            } else if (this.isQuestionIncorrect(q)) {
                if (!this.mistakes.includes(qId)) this.mistakes.push(qId);
            }
        }

        this.saveState();
        this.updateQuestionCardUI(qId);
        if (this.currentMode === 'mistakes') {
            const countEl = document.getElementById('filtered-count');
            if (countEl) countEl.innerText = this.mistakes.length;
        }
    }

    // Ghi nhận đáp án câu trả lời ngắn (Short Answer) trong chế độ Luyện tập
    submitShortAnswer(qId, isExam = false) {
        const inputEl = document.getElementById(`input-${qId}`);
        if (!inputEl) return;
        const val = inputEl.value.trim();
        if (!val) return;

        if (!this.userAnswers[qId]) {
            this.userAnswers[qId] = {};
        }
        this.userAnswers[qId].text = val;

        const q = this.db.find(item => item.id === qId);
        if (q) {
            const isCorrect = this.isShortAnswerMatch(val, q.acceptableAnswers);
            if (isCorrect) {
                // Đã trả lời đúng -> Xóa khỏi sổ tay câu sai
                this.mistakes = this.mistakes.filter(id => id !== qId);
            } else if (!this.mistakes.includes(qId)) {
                this.mistakes.push(qId);
            }
        }

        this.saveState();
        this.updateQuestionCardUI(qId);
        if (this.currentMode === 'mistakes') {
            const countEl = document.getElementById('filtered-count');
            if (countEl) countEl.innerText = this.mistakes.length;
        }
    }

    // Xóa thủ công khỏi sổ tay câu sai
    removeMistake(qId) {
        this.mistakes = this.mistakes.filter(id => id !== qId);
        this.saveState();
        this.cleanMistakes();
        this.activeQuestions = this.db.filter(q => this.mistakes.includes(q.id) && !this.isQuestionCorrect(q));
        this.render();
    }

    // =========================================================================
    // KHỞI TẠO BÀI THI THỬ GIỮA KỲ 1 (CHUẨN CẤU TRÚC BỘ GD&ĐT 2018)
    // CỐ ĐỊNH CHỈ MỤC (INDEX) CỦA CÂU HỎI VÀ MẢNG LỰA CHỌN TƯƠNG ỨNG TUYỆT ĐỐI
    // =========================================================================
    startExam() {
        const allMCQs = this.shuffleArray(this.db.filter(q => q.type === 'mcq'));
        const allTFs = this.shuffleArray(this.db.filter(q => q.type === 'tf'));
        const allSAs = this.shuffleArray(this.db.filter(q => q.type === 'short_answer'));

        const examMCQs = allMCQs.slice(0, 18);
        const examTFs = allTFs.slice(0, 4);
        const examSAs = allSAs.slice(0, 6);

        // Tạo mảng câu hỏi có examIndex cố định từ 0 đến 27
        const examQuestions = [
            ...examMCQs.map((q, idx) => ({ ...q, examIndex: idx, examPart: 1, indexInPart: idx + 1 })),
            ...examTFs.map((q, idx) => ({ ...q, examIndex: 18 + idx, examPart: 2, indexInPart: idx + 1 })),
            ...examSAs.map((q, idx) => ({ ...q, examIndex: 22 + idx, examPart: 3, indexInPart: idx + 1 }))
        ];

        // Khởi tạo các ô lưu trữ đáp án cố định gắn chặt 100% với examIndex của từng câu hỏi
        const answerSlots = {};
        examQuestions.forEach(q => {
            const slot = {
                examIndex: q.examIndex,
                qId: q.id,
                selected: null,
                tf: {},
                text: ""
            };
            // Gán đồng thời theo examIndex và q.id để tra cứu hai chiều tuyệt đối không bao giờ lệch
            answerSlots[q.examIndex] = slot;
            answerSlots[q.id] = slot;
        });

        this.examState = {
            isActive: true,
            isSubmitted: false,
            questions: examQuestions,
            userAnswers: answerSlots,
            timeLeft: 45 * 60,
            timerInterval: null,
            score: null,
            partScores: { p1: 0, p2: 0, p3: 0 }
        };

        this.currentMode = 'exam';
        this.render();

        if (this.examState.timerInterval) clearInterval(this.examState.timerInterval);
        this.examState.timerInterval = setInterval(() => {
            if (this.examState.timeLeft > 0) {
                this.examState.timeLeft--;
                this.updateExamTimerDisplay();
            } else {
                clearInterval(this.examState.timerInterval);
                alert("Đã hết thời gian làm bài 45 phút! Hệ thống sẽ tự động nộp bài.");
                this.submitExam();
            }
        }, 1000);
    }

    updateExamTimerDisplay() {
        const timerEl = document.getElementById('exam-timer');
        if (!timerEl) return;
        const mins = Math.floor(this.examState.timeLeft / 60);
        const secs = this.examState.timeLeft % 60;
        timerEl.innerText = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        if (this.examState.timeLeft < 300) {
            timerEl.classList.add('text-red-600', 'animate-pulse');
        }
    }

    // Gán đáp án MCQ trong đề thi gắn chặt theo examIndex (Không thay thế DOM, không nhảy câu)
    setExamMCQAnswer(examIndex, optionIdx) {
        if (this.examState.isSubmitted) return;
        const slot = this.examState.userAnswers[examIndex];
        if (!slot) return;

        slot.selected = optionIdx;

        // Cập nhật giao diện in-place (chỉ thay đổi class của nút được chọn, không thay thế card)
        const cardEl = document.getElementById(`exam-card-${examIndex}`);
        if (!cardEl) return;

        const buttons = cardEl.querySelectorAll('.mcq-exam-btn');
        buttons.forEach((btn, idx) => {
            const badge = btn.querySelector('.mcq-badge');
            if (idx === optionIdx) {
                btn.className = "mcq-exam-btn w-full text-left p-3.5 rounded-xl border flex items-start space-x-3 text-sm transition-all border-emerald-600 bg-emerald-50 text-emerald-900 font-bold ring-2 ring-emerald-500 cursor-pointer";
                if (badge) badge.className = "mcq-badge w-6 h-6 rounded-lg shrink-0 flex items-center justify-center font-extrabold text-xs bg-emerald-600 text-white";
            } else {
                btn.className = "mcq-exam-btn w-full text-left p-3.5 rounded-xl border flex items-start space-x-3 text-sm transition-all border-gray-200 hover:bg-emerald-50/50 text-gray-800 cursor-pointer";
                if (badge) badge.className = "mcq-badge w-6 h-6 rounded-lg shrink-0 flex items-center justify-center font-extrabold text-xs bg-gray-100 text-gray-700";
            }
        });
    }

    // Gán đáp án Đúng / Sai trong đề thi gắn chặt theo examIndex
    setExamTFAnswer(examIndex, itemLabel, val) {
        if (this.examState.isSubmitted) return;
        const slot = this.examState.userAnswers[examIndex];
        if (!slot) return;

        if (!slot.tf) slot.tf = {};
        slot.tf[itemLabel] = val;
        slot[itemLabel] = val; // alias

        const cardEl = document.getElementById(`exam-card-${examIndex}`);
        if (!cardEl) return;

        const rowEl = cardEl.querySelector(`.tf-row-${itemLabel}`);
        if (!rowEl) return;

        const btnTrue = rowEl.querySelector('.tf-btn-true');
        const btnFalse = rowEl.querySelector('.tf-btn-false');

        if (btnTrue && btnFalse) {
            if (val === true) {
                btnTrue.className = "tf-btn-true px-3.5 py-1.5 rounded-lg font-bold text-xs bg-purple-700 text-white shadow-sm transition-colors";
                btnFalse.className = "tf-btn-false px-3.5 py-1.5 rounded-lg font-bold text-xs bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors";
            } else if (val === false) {
                btnTrue.className = "tf-btn-true px-3.5 py-1.5 rounded-lg font-bold text-xs bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors";
                btnFalse.className = "tf-btn-false px-3.5 py-1.5 rounded-lg font-bold text-xs bg-purple-700 text-white shadow-sm transition-colors";
            }
        }
    }

    // Gán đáp án Trả lời ngắn trong đề thi gắn chặt theo examIndex
    setExamSAAnswer(examIndex, val) {
        if (this.examState.isSubmitted) return;
        const slot = this.examState.userAnswers[examIndex];
        if (!slot) return;
        slot.text = (val || '').trim();
    }

    // =========================================================================
    // HÀM CHẤM ĐIỂM THI THỬ & ĐỐI CHIẾU KẾT QUẢ ĐÁP ÁN CHUẨN XÁC TUYỆT ĐỐI
    // =========================================================================
    submitExam() {
        if (this.examState.isSubmitted) return;
        if (this.examState.timerInterval) clearInterval(this.examState.timerInterval);

        // Thu thập lại giá trị input phần III trực tiếp từ DOM để tránh sót
        this.examState.questions.filter(q => q.examPart === 3).forEach(q => {
            const inputEl = document.getElementById(`exam-input-${q.examIndex}`);
            if (inputEl && this.examState.userAnswers[q.examIndex]) {
                this.examState.userAnswers[q.examIndex].text = inputEl.value.trim();
            }
        });

        let p1Score = 0; // Tối đa 4.5
        let p2Score = 0; // Tối đa 4.0
        let p3Score = 0; // Tối đa 1.5

        // Lặp qua từng câu hỏi theo đúng examIndex để đối chiếu kết quả với cơ sở dữ liệu gốc
        for (let i = 0; i < this.examState.questions.length; i++) {
            const q = this.examState.questions[i];
            const uAns = this.examState.userAnswers[q.examIndex] || {};
            // Lấy đáp án gốc từ cơ sở dữ liệu để đối chiếu
            const originalQ = this.db.find(item => item.id === q.id) || q;

            // PHẦN I: 18 câu MCQ (0.25đ / câu)
            if (q.examPart === 1) {
                const hasSelected = uAns.selected !== null && uAns.selected !== undefined;
                const isCorrect = hasSelected && parseInt(uAns.selected) === parseInt(originalQ.answer);

                if (isCorrect) {
                    p1Score += 0.25;
                    // Làm đúng câu này -> xóa khỏi câu sai nếu từng có
                    this.mistakes = this.mistakes.filter(id => id !== q.id);
                } else {
                    // Chọn sai hoặc không chọn -> lưu vào sổ tay câu sai
                    if (!this.mistakes.includes(q.id)) {
                        this.mistakes.push(q.id);
                    }
                }
            }
            // PHẦN II: 4 câu Đúng / Sai (Quy chế Bộ: 1 ý: 0.1đ; 2 ý: 0.25đ; 3 ý: 0.5đ; 4 ý: 1.0đ)
            else if (q.examPart === 2) {
                let correctCount = 0;
                originalQ.items.forEach(item => {
                    const userVal = uAns.tf ? uAns.tf[item.label] : uAns[item.label];
                    if (userVal !== undefined && userVal !== null && Boolean(userVal) === Boolean(item.answer)) {
                        correctCount++;
                    }
                });

                if (correctCount === 1) p2Score += 0.1;
                else if (correctCount === 2) p2Score += 0.25;
                else if (correctCount === 3) p2Score += 0.5;
                else if (correctCount === 4) p2Score += 1.0;

                if (correctCount === 4) {
                    this.mistakes = this.mistakes.filter(id => id !== q.id);
                } else if (!this.mistakes.includes(q.id)) {
                    this.mistakes.push(q.id);
                }
            }
            // PHẦN III: 6 câu Trả lời ngắn (0.25đ / câu)
            else if (q.examPart === 3) {
                const userText = uAns.text || '';
                const isCorrect = userText !== '' && this.isShortAnswerMatch(userText, originalQ.acceptableAnswers);

                if (isCorrect) {
                    p3Score += 0.25;
                    this.mistakes = this.mistakes.filter(id => id !== q.id);
                } else if (!this.mistakes.includes(q.id)) {
                    this.mistakes.push(q.id);
                }
            }
        }

        const totalScore = Math.round((p1Score + p2Score + p3Score) * 100) / 100;

        this.examState.isSubmitted = true;
        this.examState.score = totalScore;
        this.examState.partScores = {
            p1: Math.round(p1Score * 100) / 100,
            p2: Math.round(p2Score * 100) / 100,
            p3: Math.round(p3Score * 100) / 100
        };

        this.examHistory.unshift({
            date: new Date().toLocaleString('vi-VN'),
            score: totalScore,
            p1: this.examState.partScores.p1,
            p2: this.examState.partScores.p2,
            p3: this.examState.partScores.p3,
            timeSpent: (45 * 60) - this.examState.timeLeft
        });

        this.cleanMistakes();
        this.saveState();
        this.render();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    exitExam() {
        if (this.examState.timerInterval) clearInterval(this.examState.timerInterval);
        this.examState.isActive = false;
        this.examState.isSubmitted = false;
        this.navigateTo('home');
    }

    // =========================================================================
    // XỬ LÝ GIAO DIỆN CHÍNH
    // =========================================================================
    render() {
        const viewport = document.getElementById('app-viewport');
        if (!viewport) return;
        viewport.innerHTML = '';

        const navBtns = ['home', 'practice', 'exam', 'mistakes', 'bookmarks', 'stats'];
        navBtns.forEach(nav => {
            const btn = document.getElementById(`nav-${nav}-btn`);
            if (btn) {
                if (this.currentMode === nav) {
                    btn.className = "px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-800 text-white shadow-inner flex items-center space-x-1.5";
                } else {
                    btn.className = "px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-emerald-600 text-emerald-100 transition-colors flex items-center space-x-1.5";
                }
            }
        });

        if (this.currentMode === 'home') {
            this.renderHomeView(viewport);
        } else if (this.currentMode === 'practice' || this.currentMode === 'mistakes' || this.currentMode === 'bookmarks') {
            this.renderQuestionsListView(viewport);
        } else if (this.currentMode === 'exam') {
            this.renderExamView(viewport);
        } else if (this.currentMode === 'stats') {
            this.renderStatsView(viewport);
        }
    }

    // A. HOME VIEW
    renderHomeView(container) {
        this.cleanMistakes();
        const mistakeCount = this.mistakes.length;
        const bookmarkCount = this.bookmarks.length;

        container.innerHTML = `
            <div class="space-y-8 animate-fadeIn">
                <!-- Hero Banner -->
                <div class="bg-gradient-to-r from-emerald-700 via-teal-800 to-emerald-900 rounded-3xl p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden">
                    <div class="absolute -right-10 -bottom-10 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
                    <div class="max-w-3xl relative z-10 space-y-4">
                        <div class="inline-flex items-center space-x-2 px-3 py-1 bg-emerald-500/30 text-emerald-200 text-xs font-bold rounded-full border border-emerald-400/20">
                            <i class="fa-solid fa-graduation-cap"></i>
                            <span>CHƯƠNG TRÌNH SINH HỌC 12 - GDPT 2018</span>
                        </div>
                        <h2 class="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                            Hệ Thống Ôn Tập Toàn Diện Giữa Kì 1 (285 Câu Hỏi)
                        </h2>
                        <p class="text-emerald-100 text-sm sm:text-base leading-relaxed">
                            Bao quát toàn bộ 5 bài học Chương 1: Di Truyền Phân Tử. Tích hợp đầy đủ 3 dạng câu hỏi mới của Bộ GD&ĐT: Trắc nghiệm 4 lựa chọn, Trắc nghiệm Đúng/Sai, Trả lời ngắn, có hình vẽ sơ đồ trực quan và lời giải chi tiết.
                        </p>
                        
                        <div class="pt-4 flex flex-wrap gap-3">
                            <button onclick="app.startExam()" class="px-6 py-3 bg-amber-400 hover:bg-amber-500 text-gray-900 font-extrabold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center space-x-2">
                                <i class="fa-solid fa-stopwatch text-base"></i>
                                <span>Thi Thử Bấm Giờ 45 Phút (Đề Chuẩn)</span>
                            </button>
                            <button onclick="app.navigateTo('practice', 'all')" class="px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/20 transition-colors flex items-center space-x-2">
                                <i class="fa-solid fa-layer-group"></i>
                                <span>Luyện Tập Toàn Bộ (285 Câu)</span>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Quick Stats / Shortcuts Bar -->
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div onclick="app.navigateTo('practice', 'all')" class="cursor-pointer bg-white p-4 rounded-2xl border border-gray-200 shadow-sm hover:border-emerald-500 transition-all flex items-center space-x-3">
                        <div class="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center text-xl shrink-0">
                            <i class="fa-solid fa-book-open"></i>
                        </div>
                        <div>
                            <p class="text-xs text-gray-500 font-medium">Ngân hàng câu hỏi</p>
                            <p class="text-lg font-bold text-gray-900">285 Câu</p>
                        </div>
                    </div>

                    <div onclick="app.navigateTo('mistakes')" class="cursor-pointer bg-white p-4 rounded-2xl border border-gray-200 shadow-sm hover:border-red-500 transition-all flex items-center space-x-3">
                        <div class="w-12 h-12 bg-red-100 text-red-700 rounded-xl flex items-center justify-center text-xl shrink-0">
                            <i class="fa-solid fa-circle-exclamation"></i>
                        </div>
                        <div>
                            <p class="text-xs text-gray-500 font-medium">Sổ tay câu sai</p>
                            <p class="text-lg font-bold text-red-600">${mistakeCount} Câu</p>
                        </div>
                    </div>

                    <div onclick="app.navigateTo('bookmarks')" class="cursor-pointer bg-white p-4 rounded-2xl border border-gray-200 shadow-sm hover:border-amber-500 transition-all flex items-center space-x-3">
                        <div class="w-12 h-12 bg-amber-100 text-amber-700 rounded-xl flex items-center justify-center text-xl shrink-0">
                            <i class="fa-solid fa-star"></i>
                        </div>
                        <div>
                            <p class="text-xs text-gray-500 font-medium">Đã đánh dấu</p>
                            <p class="text-lg font-bold text-amber-600">${bookmarkCount} Câu</p>
                        </div>
                    </div>

                    <div onclick="app.navigateTo('stats')" class="cursor-pointer bg-white p-4 rounded-2xl border border-gray-200 shadow-sm hover:border-blue-500 transition-all flex items-center space-x-3">
                        <div class="w-12 h-12 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center text-xl shrink-0">
                            <i class="fa-solid fa-chart-pie"></i>
                        </div>
                        <div>
                            <p class="text-xs text-gray-500 font-medium">Lịch sử thi thử</p>
                            <p class="text-lg font-bold text-blue-700">${this.examHistory.length} Đề</p>
                        </div>
                    </div>
                </div>

                <!-- Danh sách 5 bài học trọng tâm -->
                <div class="space-y-4">
                    <div class="flex items-center justify-between">
                        <h3 class="text-xl font-bold text-gray-900 flex items-center space-x-2">
                            <i class="fa-solid fa-dna text-emerald-600"></i>
                            <span>Nội Dung 5 Bài Học Chương 1 (Di Truyền Phân Tử)</span>
                        </h3>
                        <span class="text-xs text-gray-500 font-medium">Nhấp vào bài để ôn luyện</span>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        ${[1, 2, 3, 4, 5].map(num => {
                            const info = this.lessons[num];
                            const count = this.db.filter(q => q.lesson === num).length;
                            return `
                                <div class="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
                                    <div class="space-y-3">
                                        <div class="flex items-center justify-between">
                                            <span class="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-xs font-extrabold rounded-lg">Bài ${num}</span>
                                            <span class="text-xs text-gray-500 font-medium"><i class="fa-regular fa-file-lines mr-1"></i>${count} câu</span>
                                        </div>
                                        <h4 class="font-bold text-gray-900 group-hover:text-emerald-700 transition-colors leading-snug">${info.title}</h4>
                                        <p class="text-xs text-gray-600 leading-relaxed">${info.desc}</p>
                                    </div>
                                    <div class="pt-5 mt-2 border-t border-gray-100 flex items-center justify-between">
                                        <button onclick="app.navigateTo('practice', ${num})" class="w-full py-2 bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-700 font-bold text-xs rounded-xl transition-all flex items-center justify-center space-x-2">
                                            <span>Làm Bài ${num} (${count} câu)</span>
                                            <i class="fa-solid fa-arrow-right text-[10px]"></i>
                                        </button>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    // B. DANH SÁCH CÂU HỎI (LUYỆN TẬP / CÂU SAI / ĐÁNH DẤU)
    renderQuestionsListView(container) {
        let viewTitle = "";
        let viewDesc = "";
        let isMistakeMode = this.currentMode === 'mistakes';
        let isBookmarkMode = this.currentMode === 'bookmarks';

        if (isMistakeMode) {
            this.cleanMistakes();
            viewTitle = "Sổ Tay Câu Làm Sai (Mistake Bank)";
            viewDesc = "Tập trung ôn luyện chính xác các câu từng làm sai. Khi bạn làm đúng lại, câu hỏi sẽ tự động được xóa khỏi sổ tay.";
        } else if (isBookmarkMode) {
            viewTitle = "Danh Sách Câu Hỏi Đã Đánh Dấu (Bookmarks)";
            viewDesc = "Các câu hỏi khó hoặc quan trọng bạn đã lưu lại để ôn kỹ.";
        } else {
            viewTitle = this.currentFilter === 'all' 
                ? "Ngân Hàng Toàn Bộ 285 Câu Hỏi (Chương 1)" 
                : this.lessons[this.currentFilter]?.title || `Bài ${this.currentFilter}`;
            viewDesc = "Luyện tập kèm phản hồi tức thì và giải thích lý thuyết chi tiết cho từng câu.";
        }

        container.innerHTML = `
            <div class="space-y-6">
                <!-- Top Action & Filter Bar -->
                <div class="sticky top-16 z-30 bg-white/95 backdrop-blur-md border border-gray-200 rounded-2xl p-4 shadow-sm space-y-3">
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div class="flex items-center space-x-3">
                            <button onclick="app.navigateTo('home')" class="p-2 text-gray-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition-colors">
                                <i class="fa-solid fa-arrow-left"></i>
                            </button>
                            <div>
                                <h2 class="text-base sm:text-lg font-bold text-gray-900 leading-snug">${viewTitle}</h2>
                                <p class="text-xs text-gray-500 leading-normal">${viewDesc}</p>
                            </div>
                        </div>

                        <!-- Print & Clear Buttons -->
                        <div class="flex items-center space-x-2 shrink-0">
                            <button onclick="window.print()" class="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-lg text-xs transition-colors flex items-center space-x-1.5">
                                <i class="fa-solid fa-print"></i>
                                <span>In Đề / Xuất PDF</span>
                            </button>
                        </div>
                    </div>

                    <!-- Search & Filter Controls -->
                    <div class="pt-2 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-3">
                        <!-- Search Box -->
                        <div class="relative w-full md:w-72">
                            <input 
                                type="text" 
                                placeholder="Tìm từ khóa: operon, 5-BrU, ligase..." 
                                oninput="app.handleSearch(this.value)"
                                class="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                            <i class="fa-solid fa-magnifying-glass absolute left-3 top-2.5 text-gray-400 text-xs"></i>
                        </div>

                        <!-- Type Filters -->
                        <div class="flex items-center space-x-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
                            <button onclick="app.handleTypeFilter('all')" class="px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${this.typeFilter === 'all' ? 'bg-emerald-700 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}">
                                Tất cả dạng
                            </button>
                            <button onclick="app.handleTypeFilter('mcq')" class="px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${this.typeFilter === 'mcq' ? 'bg-emerald-700 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}">
                                Trắc nghiệm MCQ
                            </button>
                            <button onclick="app.handleTypeFilter('tf')" class="px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${this.typeFilter === 'tf' ? 'bg-emerald-700 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}">
                                Đúng / Sai
                            </button>
                            <button onclick="app.handleTypeFilter('short_answer')" class="px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${this.typeFilter === 'short_answer' ? 'bg-emerald-700 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}">
                                Trả lời ngắn
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Count Info -->
                <div class="flex items-center justify-between text-xs text-gray-500 px-1">
                    <span>Đang hiển thị: <b id="filtered-count" class="text-gray-900 font-bold">${this.activeQuestions.length}</b> câu hỏi</span>
                    <span>Hệ thống chấm điểm tự động & lưu tiến độ</span>
                </div>

                <!-- Questions Container -->
                <div class="space-y-6" id="questions-list">
                    ${this.activeQuestions.length > 0 
                        ? this.activeQuestions.map((q, idx) => this.generateQuestionCardHTML(q, idx + 1)).join('')
                        : `<div class="bg-white rounded-2xl p-10 text-center text-gray-500 border border-gray-200">
                            ${isMistakeMode 
                                ? '<div class="space-y-2"><i class="fa-solid fa-circle-check text-green-500 text-3xl"></i><p class="font-bold text-gray-800">Tuyệt vời! Sổ tay câu sai đang trống.</p><p class="text-xs text-gray-500">Bạn đã làm đúng tất cả các câu hoặc chưa có câu hỏi nào làm sai.</p></div>' 
                                : 'Danh sách hiện tại đang trống.'}
                        </div>`
                    }
                </div>
            </div>
        `;
    }

    // TẠO HTML CHO TỪNG THẺ CÂU HỎI (CHẾ ĐỘ LUYỆN TẬP / SỔ TAY CÂU SAI)
    generateQuestionCardHTML(q, indexNumber) {
        const userAns = this.userAnswers[q.id] || {};
        const isBookmarked = this.bookmarks.includes(q.id);
        const diagramHTML = (q.diagram && this.diagrams[q.diagram]) 
            || (this.diagrams[q.id]) 
            || (q.svgKey && this.diagrams[q.svgKey]) 
            || '';
        const qNum = q.id.split('_')[1];

        // DẠNG 1: TRẮC NGHIỆM NHIỀU LỰA CHỌN (MCQ)
        if (q.type === 'mcq') {
            const hasAnswered = userAns.selected !== undefined && userAns.selected !== null;
            const isCorrect = hasAnswered && parseInt(userAns.selected) === parseInt(q.answer);

            return `
                <div id="card-${q.id}" class="bg-white rounded-2xl border ${hasAnswered ? (isCorrect ? 'border-green-300' : 'border-red-300') : 'border-gray-200'} shadow-sm p-5 sm:p-6 space-y-4 hover:border-emerald-300 transition-colors">
                    <div class="flex items-start justify-between gap-3">
                        <div class="flex items-center space-x-2">
                            <span class="px-3 py-1 bg-emerald-700 text-white text-xs font-extrabold rounded-lg shadow-sm">Bài ${q.lesson} • Câu ${qNum}</span>
                            <span class="text-xs text-gray-500 font-medium">Trắc nghiệm MCQ</span>
                        </div>
                        <div class="flex items-center space-x-2">
                            <button onclick="app.toggleBookmark('${q.id}')" class="p-1.5 rounded-lg text-xs font-semibold ${isBookmarked ? 'text-amber-500 bg-amber-50' : 'text-gray-400 hover:text-amber-500 bg-gray-50'} transition-colors" title="${isBookmarked ? 'Bỏ đánh dấu' : 'Đánh dấu câu khó'}">
                                <i class="fa-${isBookmarked ? 'solid' : 'regular'} fa-star text-sm"></i>
                            </button>
                            ${this.currentMode === 'mistakes' ? `
                                <button onclick="app.removeMistake('${q.id}')" class="p-1.5 text-xs text-gray-400 hover:text-red-500 bg-gray-50 rounded-lg transition-colors" title="Xóa khỏi sổ tay câu sai">
                                    <i class="fa-solid fa-trash-can"></i>
                                </button>
                            ` : ''}
                        </div>
                    </div>

                    <h3 class="text-base sm:text-lg font-semibold text-gray-900 leading-snug">${q.question}</h3>
                    ${diagramHTML}

                    <!-- 4 Lựa chọn A, B, C, D -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        ${q.options.map((opt, oIdx) => {
                            const char = String.fromCharCode(65 + oIdx);
                            let btnStyle = "border-gray-200 hover:border-emerald-400 hover:bg-emerald-50/50 text-gray-800";
                            let badgeStyle = "bg-gray-100 text-gray-700";

                            if (hasAnswered) {
                                if (oIdx === q.answer) {
                                    btnStyle = "border-green-500 bg-green-50 text-green-900 font-semibold ring-1 ring-green-500";
                                    badgeStyle = "bg-green-600 text-white";
                                } else if (parseInt(userAns.selected) === oIdx) {
                                    btnStyle = "border-red-500 bg-red-50 text-red-900 font-semibold ring-1 ring-red-500";
                                    badgeStyle = "bg-red-600 text-white";
                                } else {
                                    btnStyle = "border-gray-200 opacity-60 text-gray-500";
                                }
                            }

                            return `
                                <button onclick="app.setMCQAnswer('${q.id}', ${oIdx})" class="w-full text-left p-3.5 rounded-xl border transition-all flex items-start space-x-3 text-sm focus:outline-none ${btnStyle}">
                                    <span class="w-6 h-6 rounded-lg shrink-0 flex items-center justify-center font-extrabold text-xs ${badgeStyle}">
                                        ${char}
                                    </span>
                                    <span class="mt-0.5 leading-relaxed">${opt}</span>
                                </button>
                            `;
                        }).join('')}
                    </div>

                    <!-- Lời giải & Phản hồi chi tiết -->
                    ${hasAnswered ? `
                        <div class="mt-4 p-4 rounded-xl text-sm ${isCorrect ? 'bg-green-50 border border-green-200 text-green-900' : 'bg-red-50 border border-red-200 text-red-900'} space-y-2 animate-fadeIn">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center space-x-2">
                                    <i class="fa-solid ${isCorrect ? 'fa-circle-check text-green-600' : 'fa-circle-xmark text-red-600'} text-base"></i>
                                    <span class="font-bold">${isCorrect ? 'Chính xác!' : 'Chưa chính xác!'} Đáp án đúng là: ${String.fromCharCode(65 + q.answer)}</span>
                                </div>
                                ${this.currentMode === 'mistakes' && isCorrect ? `
                                    <span class="px-2 py-0.5 bg-green-100 text-green-800 text-[11px] font-bold rounded-md">Đã xóa khỏi câu sai</span>
                                ` : ''}
                            </div>
                            <div class="text-xs pt-1 border-t ${isCorrect ? 'border-green-200 text-green-800' : 'border-red-200 text-red-800'} leading-relaxed">
                                <span class="font-bold">Giải thích:</span> ${q.explanation || 'Xem lại kiến thức lý thuyết tương ứng trong SGK.'}
                            </div>
                        </div>
                    ` : ''}
                </div>
            `;
        }

        // DẠNG 2: TRẮC NGHIỆM ĐÚNG / SAI (TF)
        else if (q.type === 'tf') {
            return `
                <div id="card-${q.id}" class="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sm:p-6 space-y-4 hover:border-purple-300 transition-colors">
                    <div class="flex items-start justify-between gap-3">
                        <div class="flex items-center space-x-2">
                            <span class="px-3 py-1 bg-purple-700 text-white text-xs font-extrabold rounded-lg shadow-sm">Bài ${q.lesson} • Câu ${qNum}</span>
                            <span class="text-xs text-gray-500 font-medium">Trắc nghiệm Đúng / Sai</span>
                        </div>
                        <div class="flex items-center space-x-2">
                            <button onclick="app.toggleBookmark('${q.id}')" class="p-1.5 rounded-lg text-xs font-semibold ${isBookmarked ? 'text-amber-500 bg-amber-50' : 'text-gray-400 hover:text-amber-500 bg-gray-50'} transition-colors">
                                <i class="fa-${isBookmarked ? 'solid' : 'regular'} fa-star text-sm"></i>
                            </button>
                            ${this.currentMode === 'mistakes' ? `
                                <button onclick="app.removeMistake('${q.id}')" class="p-1.5 text-xs text-gray-400 hover:text-red-500 bg-gray-50 rounded-lg transition-colors" title="Xóa khỏi sổ tay câu sai">
                                    <i class="fa-solid fa-trash-can"></i>
                                </button>
                            ` : ''}
                        </div>
                    </div>

                    <div class="bg-purple-50/60 border-l-4 border-purple-500 p-4 rounded-r-xl text-sm italic text-purple-950 leading-relaxed">
                        "${q.context}"
                    </div>
                    ${diagramHTML}

                    <!-- 4 ý a, b, c, d -->
                    <div class="space-y-3 pt-2">
                        ${q.items.map(item => {
                            const userChoice = userAns[item.label];
                            const hasChoice = userChoice !== undefined;
                            const isCorrect = userChoice === item.answer;

                            return `
                                <div class="p-3.5 bg-gray-50 rounded-xl border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm">
                                    <div class="flex items-start space-x-2">
                                        <span class="font-bold text-purple-700 shrink-0">${item.label})</span>
                                        <span class="text-gray-800 leading-relaxed">${item.text}</span>
                                    </div>
                                    
                                    <div class="flex items-center space-x-2 shrink-0 self-end sm:self-center">
                                        <button onclick="app.setTFAnswer('${q.id}', '${item.label}', true)" class="px-4 py-1.5 rounded-lg font-bold text-xs transition-colors flex items-center space-x-1 ${
                                            hasChoice && userChoice === true
                                                ? (isCorrect ? 'bg-green-600 text-white shadow-sm' : 'bg-red-500 text-white')
                                                : (hasChoice && item.answer === true ? 'border-2 border-green-500 text-green-700 bg-green-50' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100')
                                        }">
                                            <i class="fa-solid fa-check text-xs"></i>
                                            <span>Đúng</span>
                                        </button>

                                        <button onclick="app.setTFAnswer('${q.id}', '${item.label}', false)" class="px-4 py-1.5 rounded-lg font-bold text-xs transition-colors flex items-center space-x-1 ${
                                            hasChoice && userChoice === false
                                                ? (isCorrect ? 'bg-green-600 text-white shadow-sm' : 'bg-red-500 text-white')
                                                : (hasChoice && item.answer === false ? 'border-2 border-green-500 text-green-700 bg-green-50' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100')
                                        }">
                                            <i class="fa-solid fa-xmark text-xs"></i>
                                            <span>Sai</span>
                                        </button>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>

                    ${q.explanation ? `
                        <div class="mt-2 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 leading-relaxed">
                            <span class="font-bold text-purple-700"><i class="fa-solid fa-lightbulb mr-1"></i>Giải thích trọng tâm:</span> ${q.explanation}
                        </div>
                    ` : ''}
                </div>
            `;
        }

        // DẠNG 3: TRẢ LỜI NGẮN (SHORT ANSWER)
        else if (q.type === 'short_answer') {
            const hasAnswered = userAns.text !== undefined && userAns.text.trim() !== '';
            const isCorrect = hasAnswered && this.isShortAnswerMatch(userAns.text, q.acceptableAnswers);

            return `
                <div id="card-${q.id}" class="bg-white rounded-2xl border ${hasAnswered ? (isCorrect ? 'border-green-300' : 'border-red-300') : 'border-gray-200'} shadow-sm p-5 sm:p-6 space-y-4 hover:border-teal-300 transition-colors">
                    <div class="flex items-start justify-between gap-3">
                        <div class="flex items-center space-x-2">
                            <span class="px-3 py-1 bg-teal-700 text-white text-xs font-extrabold rounded-lg shadow-sm">Bài ${q.lesson} • Câu ${qNum}</span>
                            <span class="text-xs text-gray-500 font-medium">Trả lời ngắn</span>
                        </div>
                        <div class="flex items-center space-x-2">
                            <button onclick="app.toggleBookmark('${q.id}')" class="p-1.5 rounded-lg text-xs font-semibold ${isBookmarked ? 'text-amber-500 bg-amber-50' : 'text-gray-400 hover:text-amber-500 bg-gray-50'} transition-colors">
                                <i class="fa-${isBookmarked ? 'solid' : 'regular'} fa-star text-sm"></i>
                            </button>
                            ${this.currentMode === 'mistakes' ? `
                                <button onclick="app.removeMistake('${q.id}')" class="p-1.5 text-xs text-gray-400 hover:text-red-500 bg-gray-50 rounded-lg transition-colors" title="Xóa khỏi sổ tay câu sai">
                                    <i class="fa-solid fa-trash-can"></i>
                                </button>
                            ` : ''}
                        </div>
                    </div>

                    <h3 class="text-base sm:text-lg font-semibold text-gray-900 leading-snug">${q.question}</h3>
                    ${diagramHTML}

                    <!-- Ô nhập câu trả lời -->
                    <div class="pt-2 flex flex-col sm:flex-row items-stretch gap-2">
                        <input 
                            type="text" 
                            id="input-${q.id}" 
                            placeholder="Nhập kết quả số hoặc chữ (VD: 12, 0.3, 1235)..." 
                            value="${userAns.text || ''}"
                            onkeydown="if(event.key === 'Enter') app.submitShortAnswer('${q.id}')"
                            class="flex-1 px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 border-gray-300"
                        />
                        <button onclick="app.submitShortAnswer('${q.id}')" class="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm rounded-xl transition-colors shrink-0 shadow-sm cursor-pointer">
                            <i class="fa-solid fa-check mr-1.5"></i>Kiểm tra
                        </button>
                    </div>

                    <!-- Kết quả & Lời giải -->
                    ${hasAnswered ? `
                        <div class="mt-4 p-4 rounded-xl text-sm ${isCorrect ? 'bg-green-50 border border-green-200 text-green-900' : 'bg-red-50 border border-red-200 text-red-900'} space-y-2 animate-fadeIn">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center space-x-2">
                                    <i class="fa-solid ${isCorrect ? 'fa-circle-check text-green-600' : 'fa-circle-xmark text-red-600'} text-base"></i>
                                    <span class="font-bold">${isCorrect ? 'Chính xác!' : 'Chưa đúng!'} Đáp án chuẩn: <span class="underline">${q.acceptableAnswers.join(' hoặc ')}</span></span>
                                </div>
                                ${this.currentMode === 'mistakes' && isCorrect ? `
                                    <span class="px-2 py-0.5 bg-green-100 text-green-800 text-[11px] font-bold rounded-md">Đã xóa khỏi câu sai</span>
                                ` : ''}
                            </div>
                            ${q.explanation ? `
                                <div class="text-xs pt-1 border-t ${isCorrect ? 'border-green-200 text-green-800' : 'border-red-200 text-red-800'} leading-relaxed">
                                    <span class="font-bold">Hướng dẫn giải:</span> ${q.explanation}
                                </div>
                            ` : ''}
                        </div>
                    ` : ''}
                </div>
            `;
        }
    }

    updateQuestionCardUI(qId) {
        const cardEl = document.getElementById(`card-${qId}`);
        if (!cardEl) return;
        const q = this.db.find(item => item.id === qId);
        if (!q) return;
        const indexNumber = this.activeQuestions.findIndex(item => item.id === qId) + 1;
        cardEl.outerHTML = this.generateQuestionCardHTML(q, indexNumber > 0 ? indexNumber : 1);
    }

    // =========================================================================
    // C. GIAO DIỆN THI THỬ (EXAM VIEW)
    // CỐ ĐỊNH CHỈ MỤC INDEX, ĐẢM BẢO CHẤM ĐIỂM CHUẨN XÁC VÀ KHÔNG NHẢY CÂU
    // =========================================================================
    renderExamView(container) {
        if (!this.examState.isActive && !this.examState.isSubmitted) {
            container.innerHTML = `
                <div class="max-w-2xl mx-auto bg-white rounded-3xl border border-gray-200 shadow-xl p-6 sm:p-10 space-y-6 text-center">
                    <div class="w-20 h-20 bg-amber-100 text-amber-600 rounded-3xl flex items-center justify-center mx-auto text-3xl shadow-inner">
                        <i class="fa-solid fa-stopwatch"></i>
                    </div>
                    <div>
                        <h2 class="text-2xl font-extrabold text-gray-900">Thi Thử Giữa Kì 1 Sinh Học 12</h2>
                        <p class="text-sm text-gray-500 mt-1">Cấu trúc chuẩn theo định dạng đề thi mới Bộ GD&ĐT (GDPT 2018)</p>
                    </div>

                    <div class="bg-slate-50 rounded-2xl p-4 text-left text-xs sm:text-sm space-y-2 border border-slate-200">
                        <div class="flex items-center justify-between border-b pb-2">
                            <span class="font-bold text-gray-700">Thời gian làm bài:</span>
                            <span class="font-extrabold text-emerald-700">45 phút</span>
                        </div>
                        <div class="flex items-center justify-between border-b pb-2">
                            <span class="font-bold text-gray-700">Phần I (Trắc nghiệm nhiều lựa chọn):</span>
                            <span>18 câu (4,5 điểm - 0,25đ/câu)</span>
                        </div>
                        <div class="flex items-center justify-between border-b pb-2">
                            <span class="font-bold text-gray-700">Phần II (Trắc nghiệm Đúng/Sai):</span>
                            <span>4 câu (4,0 điểm - 1 ý: 0,1đ; 2 ý: 0,25đ; 3 ý: 0,5đ; 4 ý: 1,0đ)</span>
                        </div>
                        <div class="flex items-center justify-between">
                            <span class="font-bold text-gray-700">Phần III (Trả lời ngắn):</span>
                            <span>6 câu (1,5 điểm - 0,25đ/câu)</span>
                        </div>
                    </div>

                    <div class="pt-2">
                        <button onclick="app.startExam()" class="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-base rounded-2xl shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer">
                            Bắt Đầu Làm Bài Ngay
                        </button>
                    </div>
                </div>
            `;
            return;
        }

        const isSubmitted = this.examState.isSubmitted;

        container.innerHTML = `
            <div class="space-y-6">
                <!-- Exam Header Sticky Bar -->
                <div class="sticky top-16 z-40 bg-white/95 backdrop-blur-md border border-gray-200 rounded-2xl p-4 shadow-md flex items-center justify-between gap-4">
                    <div>
                        <h2 class="text-sm sm:text-base font-extrabold text-gray-900">ĐỀ THI THỬ GIỮA KÌ 1 SINH HỌC 12</h2>
                        <p class="text-xs text-gray-500">Tổng cộng 28 câu hỏi (18 MCQ + 4 TF + 6 Trả lời ngắn)</p>
                    </div>

                    <div class="flex items-center space-x-3">
                        ${!isSubmitted ? `
                            <div class="px-3 py-1.5 bg-red-50 border border-red-200 rounded-xl text-center">
                                <span class="text-[10px] text-red-500 font-bold block uppercase leading-none">Thời gian</span>
                                <span id="exam-timer" class="text-base sm:text-lg font-black text-red-600 font-mono">45:00</span>
                            </div>
                            <button onclick="if(confirm('Bạn có chắc chắn muốn nộp bài ngay?')) app.submitExam()" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all cursor-pointer">
                                Nộp Bài
                            </button>
                        ` : `
                            <button onclick="app.startExam()" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow transition-all cursor-pointer">
                                Làm Đề Khác
                            </button>
                            <button onclick="app.navigateTo('home')" class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-extrabold text-xs sm:text-sm rounded-xl transition-all cursor-pointer">
                                Về Trang Chủ
                            </button>
                        `}
                    </div>
                </div>

                <!-- Bảng Điểm Tổng Kết Nếu Đã Nộp -->
                ${isSubmitted ? `
                    <div class="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl text-center space-y-4 animate-fadeIn">
                        <span class="px-3 py-1 bg-white/20 text-emerald-200 text-xs font-bold rounded-full">KẾT QUẢ BÀI THI</span>
                        <div class="text-4xl sm:text-6xl font-black text-amber-300">
                            ${this.examState.score} <span class="text-xl sm:text-2xl text-emerald-200">/ 10 Điểm</span>
                        </div>
                        <div class="grid grid-cols-3 gap-3 max-w-lg mx-auto pt-2 text-xs">
                            <div class="p-2.5 bg-white/10 rounded-xl">
                                <p class="text-emerald-200">Phần I (MCQ)</p>
                                <p class="text-base font-extrabold">${this.examState.partScores.p1} / 4.5</p>
                            </div>
                            <div class="p-2.5 bg-white/10 rounded-xl">
                                <p class="text-emerald-200">Phần II (Đúng/Sai)</p>
                                <p class="text-base font-extrabold">${this.examState.partScores.p2} / 4.0</p>
                            </div>
                            <div class="p-2.5 bg-white/10 rounded-xl">
                                <p class="text-emerald-200">Phần III (Ngắn)</p>
                                <p class="text-base font-extrabold">${this.examState.partScores.p3} / 1.5</p>
                            </div>
                        </div>
                        <p class="text-xs text-emerald-200 italic pt-1">Các câu làm sai đã được tự động cập nhật vào "Sổ tay câu sai" để bạn ôn luyện lại.</p>
                    </div>
                ` : ''}

                <!-- Danh sách câu hỏi bài thi -->
                <div class="space-y-6">
                    <!-- PHẦN I -->
                    <div class="bg-emerald-50 border-l-4 border-emerald-600 p-4 rounded-r-2xl">
                        <h3 class="font-extrabold text-emerald-900 text-base">PHẦN I. Câu trắc nghiệm nhiều phương án lựa chọn (18 câu - 4,5 điểm)</h3>
                        <p class="text-xs text-emerald-700">Mỗi câu chỉ chọn một phương án.</p>
                    </div>
                    ${this.examState.questions.filter(q => q.examPart === 1).map(q => this.generateExamCardHTML(q)).join('')}

                    <!-- PHẦN II -->
                    <div class="bg-purple-50 border-l-4 border-purple-600 p-4 rounded-r-2xl">
                        <h3 class="font-extrabold text-purple-900 text-base">PHẦN II. Câu trắc nghiệm đúng sai (4 câu - 4,0 điểm)</h3>
                        <p class="text-xs text-purple-700">Trong mỗi ý a), b), c), d) ở mỗi câu, thí sinh chọn đúng hoặc sai.</p>
                    </div>
                    ${this.examState.questions.filter(q => q.examPart === 2).map(q => this.generateExamCardHTML(q)).join('')}

                    <!-- PHẦN III -->
                    <div class="bg-teal-50 border-l-4 border-teal-600 p-4 rounded-r-2xl">
                        <h3 class="font-extrabold text-teal-900 text-base">PHẦN III. Câu trắc nghiệm trả lời ngắn (6 câu - 1,5 điểm)</h3>
                        <p class="text-xs text-teal-700">Thí sinh điền câu trả lời ngắn vào ô trống.</p>
                    </div>
                    ${this.examState.questions.filter(q => q.examPart === 3).map(q => this.generateExamCardHTML(q)).join('')}
                </div>
            </div>
        `;
    }

    generateExamCardHTML(q) {
        const examIndex = q.examIndex;
        const indexNumber = q.indexInPart;
        const uAns = this.examState.userAnswers[examIndex] || {};
        const isSubmitted = this.examState.isSubmitted;
        const diagramHTML = (q.diagram && this.diagrams[q.diagram]) 
            || (this.diagrams[q.id]) 
            || (q.svgKey && this.diagrams[q.svgKey]) 
            || '';

        // Phần I MCQ trong Exam
        if (q.examPart === 1) {
            const hasSelected = uAns.selected !== null && uAns.selected !== undefined;
            const isCorrect = isSubmitted && hasSelected && parseInt(uAns.selected) === parseInt(q.answer);

            return `
                <div id="exam-card-${examIndex}" class="bg-white rounded-2xl border ${isSubmitted ? (isCorrect ? 'border-green-300 bg-green-50/20' : 'border-red-300 bg-red-50/20') : 'border-gray-200'} p-5 sm:p-6 space-y-4 shadow-sm">
                    <div class="flex items-center justify-between">
                        <span class="px-3 py-1 bg-emerald-600 text-white text-xs font-extrabold rounded-lg">Câu ${indexNumber} (P.I)</span>
                        ${isSubmitted ? `
                            <span class="text-xs font-bold ${isCorrect ? 'text-green-700' : 'text-red-700'}">
                                ${isCorrect ? '<i class="fa-solid fa-check mr-1"></i>Đúng (+0.25đ)' : '<i class="fa-solid fa-xmark mr-1"></i>Sai (0đ)'}
                            </span>
                        ` : ''}
                    </div>

                    <h4 class="text-base font-semibold text-gray-900 leading-snug">${q.question}</h4>
                    ${diagramHTML}

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                        ${q.options.map((opt, oIdx) => {
                            const char = String.fromCharCode(65 + oIdx);
                            let style = "border-gray-200 hover:bg-emerald-50/50 text-gray-800";
                            let badge = "bg-gray-100 text-gray-700";

                            if (!isSubmitted) {
                                if (uAns.selected === oIdx) {
                                    style = "border-emerald-600 bg-emerald-50 text-emerald-900 font-bold ring-2 ring-emerald-500";
                                    badge = "bg-emerald-600 text-white";
                                }
                            } else {
                                if (oIdx === q.answer) {
                                    style = "border-green-500 bg-green-100 text-green-900 font-bold ring-2 ring-green-500";
                                    badge = "bg-green-600 text-white";
                                } else if (uAns.selected === oIdx) {
                                    style = "border-red-500 bg-red-100 text-red-900 font-bold";
                                    badge = "bg-red-600 text-white";
                                } else {
                                    style = "border-gray-200 opacity-50";
                                }
                            }

                            return `
                                <button type="button" onclick="${!isSubmitted ? `app.setExamMCQAnswer(${examIndex}, ${oIdx})` : ''}" class="mcq-exam-btn w-full text-left p-3.5 rounded-xl border flex items-start space-x-3 text-sm transition-all ${style} cursor-pointer">
                                    <span class="mcq-badge w-6 h-6 rounded-lg shrink-0 flex items-center justify-center font-extrabold text-xs ${badge}">
                                        ${char}
                                    </span>
                                    <span class="mt-0.5 leading-relaxed">${opt}</span>
                                </button>
                            `;
                        }).join('')}
                    </div>

                    ${isSubmitted ? `
                        <div class="mt-3 p-3 bg-white border border-gray-200 rounded-xl text-xs text-gray-700 space-y-1">
                            <div><span class="font-bold text-emerald-700">Đáp án đúng:</span> <b>${String.fromCharCode(65 + q.answer)}</b></div>
                            <div><span class="font-bold text-gray-800">Giải thích:</span> ${q.explanation || 'Xem lại kiến thức lý thuyết trong SGK.'}</div>
                        </div>
                    ` : ''}
                </div>
            `;
        }

        // Phần II Đúng / Sai trong Exam
        else if (q.examPart === 2) {
            return `
                <div id="exam-card-${examIndex}" class="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 space-y-4 shadow-sm">
                    <span class="px-3 py-1 bg-purple-600 text-white text-xs font-extrabold rounded-lg">Câu ${indexNumber} (P.II)</span>
                    <div class="bg-purple-50/50 p-3.5 rounded-xl text-sm italic text-purple-950 border-l-4 border-purple-500">
                        "${q.context}"
                    </div>
                    ${diagramHTML}

                    <div class="space-y-3 pt-1">
                        ${q.items.map(item => {
                            const choice = uAns.tf ? uAns.tf[item.label] : uAns[item.label];
                            const isCorrect = isSubmitted && choice === item.answer;

                            return `
                                <div class="tf-row-${item.label} p-3 bg-gray-50 rounded-xl border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm">
                                    <div class="flex items-start space-x-2">
                                        <span class="font-bold text-purple-700 shrink-0">${item.label})</span>
                                        <span class="text-gray-800">${item.text}</span>
                                    </div>
                                    <div class="flex items-center space-x-2 shrink-0 self-end sm:self-center">
                                        <button type="button" onclick="${!isSubmitted ? `app.setExamTFAnswer(${examIndex}, '${item.label}', true)` : ''}" class="tf-btn-true px-3.5 py-1.5 rounded-lg font-bold text-xs cursor-pointer ${
                                            choice === true ? 'bg-purple-700 text-white shadow-sm' : 'bg-white border text-gray-700 hover:bg-gray-100'
                                        } ${isSubmitted && item.answer === true ? 'ring-2 ring-green-500' : ''}">
                                            Đúng
                                        </button>
                                        <button type="button" onclick="${!isSubmitted ? `app.setExamTFAnswer(${examIndex}, '${item.label}', false)` : ''}" class="tf-btn-false px-3.5 py-1.5 rounded-lg font-bold text-xs cursor-pointer ${
                                            choice === false ? 'bg-purple-700 text-white shadow-sm' : 'bg-white border text-gray-700 hover:bg-gray-100'
                                        } ${isSubmitted && item.answer === false ? 'ring-2 ring-green-500' : ''}">
                                            Sai
                                        </button>
                                        ${isSubmitted ? `
                                            <span class="text-xs font-bold ${isCorrect ? 'text-green-600' : 'text-red-500'} ml-1">
                                                ${isCorrect ? '<i class="fa-solid fa-check"></i>' : '<i class="fa-solid fa-xmark"></i> (Đ/A: ' + (item.answer ? 'Đúng' : 'Sai') + ')'}
                                            </span>
                                        ` : ''}
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>

                    ${isSubmitted && q.explanation ? `
                        <div class="mt-3 p-3 bg-white border border-gray-200 rounded-xl text-xs text-gray-700">
                            <span class="font-bold text-purple-700">Giải thích:</span> ${q.explanation}
                        </div>
                    ` : ''}
                </div>
            `;
        }

        // Phần III Trả lời ngắn trong Exam
        else if (q.examPart === 3) {
            const hasAns = uAns.text !== undefined && uAns.text.trim() !== '';
            const isCorrect = isSubmitted && hasAns && this.isShortAnswerMatch(uAns.text, q.acceptableAnswers);

            return `
                <div id="exam-card-${examIndex}" class="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 space-y-4 shadow-sm">
                    <span class="px-3 py-1 bg-teal-600 text-white text-xs font-extrabold rounded-lg">Câu ${indexNumber} (P.III)</span>
                    <h4 class="text-base font-semibold text-gray-900 leading-snug">${q.question}</h4>
                    ${diagramHTML}

                    <div class="pt-1 flex gap-2">
                        <input 
                            type="text" 
                            id="exam-input-${examIndex}" 
                            placeholder="Nhập câu trả lời..." 
                            value="${uAns.text || ''}"
                            ${isSubmitted ? 'disabled' : ''}
                            oninput="app.setExamSAAnswer(${examIndex}, this.value)"
                            class="flex-1 px-4 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 border-gray-300"
                        />
                    </div>

                    ${isSubmitted ? `
                        <div class="p-3 bg-slate-50 border rounded-xl text-xs space-y-1">
                            <p class="font-bold ${isCorrect ? 'text-green-700' : 'text-red-600'}">
                                ${isCorrect ? '<i class="fa-solid fa-check mr-1"></i>Chính xác (+0.25đ)' : '<i class="fa-solid fa-xmark mr-1"></i>Chưa chính xác (0đ)'}
                            </p>
                            <p>Đáp án đúng: <b class="underline text-teal-800">${q.acceptableAnswers.join(' / ')}</b></p>
                            ${q.explanation ? `<p class="italic text-gray-600">${q.explanation}</p>` : ''}
                        </div>
                    ` : ''}
                </div>
            `;
        }
    }

    // =========================================================================
    // D. BÁO CÁO & THỐNG KÊ (STATS VIEW)
    // =========================================================================
    renderStatsView(container) {
        let totalQ = this.db.length;
        let answeredQ = 0;
        let correctQ = 0;

        const lessonStats = {};
        for (let i = 1; i <= 5; i++) {
            lessonStats[i] = { total: 0, answered: 0, correct: 0 };
        }

        this.db.forEach(q => {
            const uAns = this.userAnswers[q.id];
            lessonStats[q.lesson].total++;

            if (q.type === 'mcq') {
                if (uAns && uAns.selected !== undefined) {
                    answeredQ++;
                    lessonStats[q.lesson].answered++;
                    if (parseInt(uAns.selected) === parseInt(q.answer)) {
                        correctQ++;
                        lessonStats[q.lesson].correct++;
                    }
                }
            } else if (q.type === 'tf') {
                let allDone = true;
                let allRight = true;
                q.items.forEach(item => {
                    if (!uAns || uAns[item.label] === undefined) allDone = false;
                    else if (uAns[item.label] !== item.answer) allRight = false;
                });
                if (allDone) {
                    answeredQ++;
                    lessonStats[q.lesson].answered++;
                    if (allRight) {
                        correctQ++;
                        lessonStats[q.lesson].correct++;
                    }
                }
            } else if (q.type === 'short_answer') {
                if (uAns && uAns.text !== undefined && uAns.text.trim() !== '') {
                    answeredQ++;
                    lessonStats[q.lesson].answered++;
                    if (this.isShortAnswerMatch(uAns.text, q.acceptableAnswers)) {
                        correctQ++;
                        lessonStats[q.lesson].correct++;
                    }
                }
            }
        });

        const overallAccuracy = answeredQ > 0 ? Math.round((correctQ / answeredQ) * 100) : 0;

        container.innerHTML = `
            <div class="max-w-4xl mx-auto space-y-6 animate-fadeIn">
                <div class="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-6">
                    <div class="flex items-center justify-between border-b pb-4">
                        <div>
                            <h2 class="text-xl sm:text-2xl font-extrabold text-gray-900">Báo Cáo Tiến Độ & Đánh Giá Năng Lực</h2>
                            <p class="text-xs text-gray-500">Phân tích chi tiết quá trình ôn tập trọn bộ 285 câu</p>
                        </div>
                        <button onclick="if(confirm('Bạn có chắc muốn xóa toàn bộ lịch sử ôn tập và làm lại từ đầu?')) { localStorage.clear(); location.reload(); }" class="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold rounded-xl transition-colors cursor-pointer">
                            <i class="fa-solid fa-rotate-left mr-1"></i>Làm Lại Từ Đầu
                        </button>
                    </div>

                    <!-- Top 3 Metric Cards -->
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div class="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 text-center">
                            <p class="text-xs font-bold text-emerald-600 uppercase">Tiến Độ Ôn Tập</p>
                            <p class="text-3xl font-black text-emerald-900 mt-1">${answeredQ} / ${totalQ}</p>
                            <p class="text-xs text-emerald-600 mt-1">${Math.round((answeredQ / totalQ) * 100)}% toàn bộ chương 1</p>
                        </div>
                        <div class="bg-green-50 border border-green-100 rounded-2xl p-4 text-center">
                            <p class="text-xs font-bold text-green-600 uppercase">Số Câu Trả Lời Đúng</p>
                            <p class="text-3xl font-black text-green-900 mt-1">${correctQ}</p>
                            <p class="text-xs text-green-600 mt-1">Câu trả lời chính xác</p>
                        </div>
                        <div class="bg-amber-50 border border-amber-100 rounded-2xl p-4 text-center">
                            <p class="text-xs font-bold text-amber-600 uppercase">Độ Chính Xác Chung</p>
                            <p class="text-3xl font-black text-amber-900 mt-1">${overallAccuracy}%</p>
                            <p class="text-xs text-amber-600 mt-1">Dựa trên các câu đã làm</p>
                        </div>
                    </div>

                    <!-- Đánh giá theo từng bài học (1 đến 5) -->
                    <div class="space-y-4 pt-4 border-t">
                        <h3 class="font-extrabold text-gray-800 text-base">Đánh Giá Từng Bài Học (Tìm Điểm Yếu Cần Ôn Bổ Sung)</h3>
                        <div class="space-y-3">
                            ${[1, 2, 3, 4, 5].map(num => {
                                const s = lessonStats[num];
                                const acc = s.answered > 0 ? Math.round((s.correct / s.answered) * 100) : 0;
                                const isWeak = s.answered >= 5 && acc < 70;
                                return `
                                    <div class="p-3.5 bg-gray-50 border rounded-2xl space-y-2">
                                        <div class="flex items-center justify-between text-xs sm:text-sm">
                                            <span class="font-bold text-gray-800">${this.lessons[num].shortTitle} (${s.answered}/${s.total} câu)</span>
                                            <div class="flex items-center space-x-2">
                                                ${isWeak ? '<span class="px-2 py-0.5 bg-red-100 text-red-700 font-extrabold text-[10px] rounded-full">Cần ôn thêm!</span>' : ''}
                                                <span class="font-extrabold ${acc >= 80 ? 'text-green-600' : (acc >= 50 ? 'text-amber-600' : 'text-gray-500')}">${acc}% đúng</span>
                                            </div>
                                        </div>
                                        <div class="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                            <div class="bg-emerald-600 h-2 rounded-full transition-all duration-500" style="width: ${acc}%"></div>
                                        </div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>

                    <!-- Lịch sử các lần thi thử -->
                    <div class="space-y-4 pt-4 border-t">
                        <h3 class="font-extrabold text-gray-800 text-base">Lịch Sử Thi Thử Bấm Giờ</h3>
                        ${this.examHistory.length > 0 ? `
                            <div class="overflow-x-auto">
                                <table class="w-full text-left text-xs border border-gray-200 rounded-xl overflow-hidden">
                                    <thead class="bg-gray-100 text-gray-700 font-bold uppercase">
                                        <tr>
                                            <th class="p-3">Thời gian thi</th>
                                            <th class="p-3">Điểm tổng (Thang 10)</th>
                                            <th class="p-3">Phần I (MCQ)</th>
                                            <th class="p-3">Phần II (Đ/S)</th>
                                            <th class="p-3">Phần III (Ngắn)</th>
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-gray-100 bg-white">
                                        ${this.examHistory.map(h => `
                                            <tr class="hover:bg-slate-50">
                                                <td class="p-3 text-gray-600">${h.date}</td>
                                                <td class="p-3 font-extrabold text-base ${h.score >= 8.0 ? 'text-green-600' : (h.score >= 5.0 ? 'text-amber-600' : 'text-red-500')}">${h.score} đ</td>
                                                <td class="p-3 font-semibold">${h.p1} / 4.5</td>
                                                <td class="p-3 font-semibold">${h.p2} / 4.0</td>
                                                <td class="p-3 font-semibold">${h.p3} / 1.5</td>
                                            </tr>
                                        `).join('')}
                                    </tbody>
                                </table>
                            </div>
                        ` : `
                            <p class="text-xs text-gray-500 italic">Bạn chưa thực hiện bài thi thử nào. Hãy chọn "Thi Thử 45 Phút" để kiểm tra trình độ!</p>
                        `}
                    </div>
                </div>
            </div>
        `;
    }
}

let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new BiologyQuizApp();
});
