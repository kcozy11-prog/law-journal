import { useState } from "react";

const VOCAB = [
  { num: 1, word: "multiple", mean: "다수의, 다양한", sentence: "…evaluating multiple perspectives before reaching a conclusion.", trans: "결론 전에 다수의 관점을 평가하는 것." },
  { num: 3, word: "credible", mean: "믿을 만한", sentence: "…written by someone who is not very credible.", trans: "신뢰할 수 없는 사람이 쓴 설득력 있는 주장." },
  { num: 5, word: "retailer", mean: "소매업자", sentence: "…another specialty Fortune 500 retailer today…", trans: "포춘 500대 소매업체의 리더." },
  { num: 7, word: "flesh and blood", mean: "살아 있는, 현실의", sentence: "…actual flesh-and-blood individual moral agents…", trans: "실제 살아 있는 개인적 도덕 주체들." },
  { num: 9, word: "viewpoint", mean: "관점, 시각", sentence: "We are not set up to double-check our own viewpoints.", trans: "우리 자신의 관점을 재점검하도록 설정되어 있지 않다." },
  { num: 11, word: "be incapable of", mean: "~을 할 수 없다", sentence: "…humans are incapable of processing more than a certain amount of information at a time…", trans: "인간은 한 번에 일정량 이상의 정보를 처리할 수 없다." },
  { num: 12, word: "hydroelectric", mean: "수력 전기의", sentence: "…hydroelectric dams and solar panels are often cited as eco-friendly…", trans: "수력 발전 댐과 태양광 패널이 친환경적이라 언급된다." },
  { num: 15, word: "degrade", mean: "저하시키다", sentence: "People cut the forests, which degraded the soil.", trans: "숲을 베어내 토양을 황폐하게 만들었다." },
  { num: 17, word: "ridiculously", mean: "터무니없이", sentence: "…the options were ridiculously limited.", trans: "선택권이 터무니없이 제한적이었다." },
  { num: 22, word: "instinct", mean: "본능", sentence: "…it has been integrated into the instincts of many species.", trans: "많은 종의 본능 속으로 통합되어 왔다." },
  { num: 33, word: "destructive", mean: "파괴적인", sentence: "It is not just a destructive force; it can also be a catalyst for change.", trans: "파괴적인 힘이 아니라 변화의 촉매가 될 수도 있다." },
  { num: 39, word: "rate", mean: "비율, 속도", sentence: "The rate at which we forget information depends on how we learned it.", trans: "정보를 잊어버리는 속도는 배운 방식에 달려 있다." },
  { num: 41, word: "perspective", mean: "관점, 시각", sentence: "…the perspective of someone who creates a story…", trans: "이야기를 창조하는 사람의 관점." },
  { num: 45, word: "financial", mean: "재정상의", sentence: "They lacked the financial resources to rebuild their lives.", trans: "삶을 재건할 재정적 자원이 부족했다." },
  { num: 47, word: "context", mean: "맥락, 배경", sentence: "Context information is frequently easier to forget than content.", trans: "맥락 정보는 흔히 내용보다 잊어버리기 쉽다." },
  { num: 53, word: "drought", mean: "가뭄", sentence: "Uganda experienced a prolonged drought in 2004 and 2005.", trans: "우간다는 장기적인 가뭄을 겪었다." },
  { num: 57, word: "undesirable", mean: "바람직하지 않은", sentence: "This is not necessarily an undesirable outcome.", trans: "반드시 바람직하지 않은 결과인 것은 아니다." },
  { num: 61, word: "miss out on", mean: "~을 놓치다", sentence: "People worry that they might be missing out on something better.", trans: "더 나은 무언가를 놓치고 있을지도 모른다고 걱정한다." },
  { num: 70, word: "unintentional", mean: "고의가 아닌", sentence: "Sometimes, the most profound changes are unintentional.", trans: "가장 심오한 변화들은 의도치 않게 일어난다." },
  { num: 81, word: "excessively", mean: "지나치게", sentence: "When we focus excessively on one detail, we lose sight of the big picture.", trans: "하나의 세부 사항에 지나치게 집중하면 전체를 놓친다." },
  { num: 89, word: "illusion", mean: "착각, 환상", sentence: "…it is the source of a variety of memory illusions.", trans: "다양한 기억 착각의 원인이 된다." },
  { num: 94, word: "integrate", mean: "통합시키다", sentence: "…it has been integrated into the instincts of many species.", trans: "많은 종의 본능 속으로 통합되어 왔다." },
  { num: 97, word: "empathy", mean: "공감", sentence: "The evidence of empathy and altruism in other species…", trans: "다른 종들의 공감과 이타주의의 증거." },
  { num: 99, word: "conscious", mean: "의식하는", sentence: "…regardless of how conscious the individual might be.", trans: "그 개인이 얼마나 의식하고 있는지와 상관없이." },
  { num: 101, word: "dimension", mean: "차원, 요소", sentence: "This adds a new dimension to the story's emotional impact.", trans: "이야기의 감정적 영향에 새로운 차원을 더한다." },
  { num: 106, word: "underestimate", mean: "과소평가하다", sentence: "…we underestimate what we actually remember.", trans: "실제로 기억하는 것을 과소평가한다." },
  { num: 109, word: "emit", mean: "내뿜다", sentence: "…the heat it emits stays in the atmosphere and warms the earth.", trans: "내뿜는 열이 대기에 머물며 지구를 따뜻하게 한다." },
  { num: 115, word: "bias", mean: "편견", sentence: "This my-side bias acts like a default setting.", trans: "이 내 편향(편견)은 기본 설정처럼 작동한다." },
  { num: 118, word: "fortune", mean: "운, 재산", sentence: "…another specialty Fortune 500 retailer today…", trans: "포춘 500대 소매업체 — fortune은 재산·운을 뜻하는 브랜드명." },
];

const GROUPS = [
  {
    title: "🧠 기억·인지",
    color: "red",
    words: ["illusion", "underestimate", "context", "conscious", "be incapable of", "excessively"],
  },
  {
    title: "💛 감정·관계",
    color: "orange",
    words: ["empathy", "instinct", "betray", "admire", "bias", "interpersonal"],
  },
  {
    title: "🌿 환경·자연",
    color: "green",
    words: ["drought", "degrade", "emit", "hydroelectric", "destructive"],
  },
  {
    title: "💡 생각·판단",
    color: "blue",
    words: ["credible", "perspective", "viewpoint", "multiple", "dimension", "unintentional"],
  },
];

const PAIRS = [
  {
    a: { word: "credible", mean: "믿을 만한" },
    b: { word: "bias", mean: "편견" },
    rel: "↔",
    note: "credible한 사람은 bias 없이 판단한다.",
  },
  {
    a: { word: "conscious", mean: "의식하는" },
    b: { word: "unintentional", mean: "의도치 않은" },
    rel: "↔",
    note: "conscious하게 행동하면 unintentional한 실수가 줄어든다.",
  },
  {
    a: { word: "integrate", mean: "통합" },
    b: { word: "division", mean: "분할" },
    rel: "↔",
    note: "integrate는 합치는 것, division은 나누는 것.",
  },
  {
    a: { word: "empathy", mean: "공감" },
    b: { word: "betray", mean: "배반" },
    rel: "↔",
    note: "empathy가 있는 사람은 betray하지 않는다.",
  },
  {
    a: { word: "underestimate", mean: "과소평가" },
    b: { word: "influential", mean: "영향력이 큰" },
    rel: "↔",
    note: "influential한 사람을 underestimate하면 큰코다친다.",
  },
  {
    chain: [
      { word: "emit", mean: "배출하다" },
      { word: "degrade", mean: "악화시키다" },
      { word: "drought", mean: "가뭄" },
    ],
    rel: "→",
    note: "온실가스를 emit하면 환경을 degrade시키고, 결국 drought가 온다.",
  },
];

const TIPS = [
  {
    icon: "📦",
    title: "하루 10개 이하",
    desc: "43개를 한꺼번에 외우면 역효과. 오늘 10개 → 내일 복습 + 10개 추가.",
  },
  {
    icon: "🌙",
    title: "자기 전 5분 복습",
    desc: "잠들기 직전 복습하면 수면 중 기억이 굳혀진다.",
  },
  {
    icon: "📝",
    title: "빈칸 문장으로 확인",
    desc: "단어를 가리고 빈칸 채우기가 단순 암기보다 오래 기억됨.",
  },
  {
    icon: "🗂️",
    title: "주제별 묶음 활용",
    desc: "관련 단어끼리 묶으면 기억 유지율이 2~3배 높아짐.",
  },
];

const TABS = [
  { id: "flashcards", label: "① 플래시카드", color: "amber" },
  { id: "groups", label: "③ 주제별 묶음", color: "rose" },
  { id: "pairs", label: "④ 짝꿍 단어", color: "violet" },
  { id: "tips", label: "💡 실용 팁", color: "emerald" },
];

const TAB_STYLES = {
  amber: {
    active: "bg-amber-500 text-white shadow-md",
    inactive: "bg-white text-amber-700 hover:bg-amber-50 border-amber-200",
    accent: "text-amber-700",
  },
  rose: {
    active: "bg-rose-500 text-white shadow-md",
    inactive: "bg-white text-rose-700 hover:bg-rose-50 border-rose-200",
    accent: "text-rose-700",
  },
  violet: {
    active: "bg-violet-500 text-white shadow-md",
    inactive: "bg-white text-violet-700 hover:bg-violet-50 border-violet-200",
    accent: "text-violet-700",
  },
  emerald: {
    active: "bg-emerald-500 text-white shadow-md",
    inactive: "bg-white text-emerald-700 hover:bg-emerald-50 border-emerald-200",
    accent: "text-emerald-700",
  },
};

const GROUP_COLORS = {
  red: {
    border: "border-red-300",
    bg: "bg-red-50",
    chip: "bg-red-100 text-red-800",
    title: "text-red-700",
  },
  orange: {
    border: "border-orange-300",
    bg: "bg-orange-50",
    chip: "bg-orange-100 text-orange-800",
    title: "text-orange-700",
  },
  green: {
    border: "border-green-300",
    bg: "bg-green-50",
    chip: "bg-green-100 text-green-800",
    title: "text-green-700",
  },
  blue: {
    border: "border-blue-300",
    bg: "bg-blue-50",
    chip: "bg-blue-100 text-blue-800",
    title: "text-blue-700",
  },
};

function highlight(sentence, word) {
  if (!sentence || !word) return sentence;
  const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`(${escaped})`, "gi");
  const parts = sentence.split(pattern);
  return parts.map((part, i) =>
    pattern.test(part) ? (
      <mark key={i} className="bg-yellow-200 text-gray-900 px-1 rounded">
        {part}
      </mark>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

function Flashcard({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setOpen((v) => !v)}
      className={`w-full text-left rounded-2xl border-2 p-5 transition-all duration-200 ${
        open
          ? "bg-amber-50 border-amber-400 shadow-lg"
          : "bg-white border-gray-200 hover:border-amber-300 hover:shadow-md"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-amber-100 text-amber-700 text-sm font-bold">
            {item.num}
          </span>
          <span className="text-xl font-bold text-gray-900">{item.word}</span>
        </div>
        <span className={`text-amber-600 transition-transform ${open ? "rotate-180" : ""}`}>
          ▼
        </span>
      </div>

      {open && (
        <div className="mt-4 space-y-3 border-t border-amber-200 pt-3">
          <div>
            <span className="text-xs font-semibold text-amber-700 uppercase tracking-wide">
              뜻
            </span>
            <p className="text-base text-gray-800 mt-1">{item.mean}</p>
          </div>
          <div>
            <span className="text-xs font-semibold text-amber-700 uppercase tracking-wide">
              시험 문장
            </span>
            <p className="text-base text-gray-800 mt-1 leading-relaxed">
              {highlight(item.sentence, item.word)}
            </p>
          </div>
          <div>
            <span className="text-xs font-semibold text-amber-700 uppercase tracking-wide">
              한글 번역
            </span>
            <p className="text-base text-gray-700 mt-1">{item.trans}</p>
          </div>
        </div>
      )}
    </button>
  );
}

function FlashcardsTab() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {VOCAB.map((item) => (
        <Flashcard key={item.num} item={item} />
      ))}
    </div>
  );
}

function GroupsTab() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {GROUPS.map((g) => {
        const c = GROUP_COLORS[g.color];
        return (
          <div
            key={g.title}
            className={`rounded-2xl border-2 ${c.border} ${c.bg} p-5 shadow-sm`}
          >
            <h3 className={`text-lg font-bold ${c.title} mb-3`}>{g.title}</h3>
            <div className="flex flex-wrap gap-2">
              {g.words.map((w) => (
                <span
                  key={w}
                  className={`px-3 py-1.5 rounded-full text-sm font-semibold ${c.chip}`}
                >
                  {w}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function PairsTab() {
  return (
    <div className="space-y-4">
      {PAIRS.map((p, idx) => (
        <div
          key={idx}
          className="rounded-2xl border-2 border-violet-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
        >
          {p.chain ? (
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-3">
              {p.chain.map((w, i) => (
                <div key={w.word} className="flex items-center gap-2 md:gap-3">
                  <div className="text-center px-3 py-2 rounded-xl bg-violet-50 border border-violet-200 min-w-[110px]">
                    <div className="text-base font-bold text-violet-800">
                      {w.word}
                    </div>
                    <div className="text-xs text-gray-600 mt-0.5">{w.mean}</div>
                  </div>
                  {i < p.chain.length - 1 && (
                    <span className="text-2xl font-bold text-violet-500">
                      {p.rel}
                    </span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center gap-3 md:gap-4 mb-3">
              <div className="flex-1 text-center px-3 py-2 rounded-xl bg-violet-50 border border-violet-200">
                <div className="text-base md:text-lg font-bold text-violet-800">
                  {p.a.word}
                </div>
                <div className="text-xs md:text-sm text-gray-600 mt-0.5">
                  {p.a.mean}
                </div>
              </div>
              <span className="text-2xl md:text-3xl font-bold text-violet-500">
                {p.rel}
              </span>
              <div className="flex-1 text-center px-3 py-2 rounded-xl bg-violet-50 border border-violet-200">
                <div className="text-base md:text-lg font-bold text-violet-800">
                  {p.b.word}
                </div>
                <div className="text-xs md:text-sm text-gray-600 mt-0.5">
                  {p.b.mean}
                </div>
              </div>
            </div>
          )}
          <p className="text-sm md:text-base text-gray-700 text-center leading-relaxed mt-2">
            {p.note}
          </p>
        </div>
      ))}
    </div>
  );
}

function TipsTab() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {TIPS.map((t) => (
        <div
          key={t.title}
          className="rounded-2xl border-2 border-emerald-300 bg-emerald-50 p-5 shadow-sm"
        >
          <div className="text-3xl mb-2">{t.icon}</div>
          <h3 className="text-lg font-bold text-emerald-800 mb-2">{t.title}</h3>
          <p className="text-sm md:text-base text-gray-700 leading-relaxed">
            {t.desc}
          </p>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState("flashcards");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-3xl mx-auto px-4 py-6 md:py-8">
        <header className="mb-5 md:mb-7 text-center">
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
            Unit 12 단어 학습지
          </h1>
          <p className="text-sm md:text-base text-gray-600 mt-1">
            플래시카드 · 주제별 묶음 · 짝꿍 단어 · 학습 팁
          </p>
        </header>

        <nav className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
          {TABS.map((t) => {
            const styles = TAB_STYLES[t.color];
            const isActive = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-3 py-2.5 rounded-xl border-2 text-sm md:text-base font-bold transition-all ${
                  isActive ? styles.active : styles.inactive
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </nav>

        <main>
          {tab === "flashcards" && <FlashcardsTab />}
          {tab === "groups" && <GroupsTab />}
          {tab === "pairs" && <PairsTab />}
          {tab === "tips" && <TipsTab />}
        </main>

        <footer className="mt-8 text-center text-xs text-gray-500">
          탭을 눌러 다른 학습 모드로 이동하세요.
        </footer>
      </div>
    </div>
  );
}
