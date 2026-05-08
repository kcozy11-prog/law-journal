import { useMemo, useState } from 'react'
import { scenes, learningTips } from './data.js'
import './App.css'

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// 정답 비교는 대소문자/공백/구두점에 관대하게
function normalize(s) {
  return (s || '').toLowerCase().trim().replace(/[.,!?;:'"]/g, '')
}

function FillBlankLine({ line, lineIdx, sceneIdx, answers, setAnswers, showAnswers }) {
  // text 안의 "{}" 자리에 input 을 끼워 넣는다
  const parts = line.en.text.split('{}')
  const blanks = line.en.blanks

  return (
    <div className="line">
      <div className="who">{line.who}</div>
      <div className="en">
        {parts.map((part, i) => (
          <span key={i}>
            <span>{part}</span>
            {i < blanks.length && (() => {
              const key = `${sceneIdx}-${lineIdx}-${i}`
              const userValue = answers[key] ?? ''
              const correct = blanks[i]
              const isCorrect =
                userValue.length > 0 && normalize(userValue) === normalize(correct)
              const isWrong =
                userValue.length > 0 && !isCorrect

              return (
                <span className="blank-wrap">
                  <input
                    className={
                      'blank' +
                      (showAnswers ? ' reveal' : '') +
                      (isCorrect ? ' correct' : '') +
                      (isWrong && !showAnswers ? ' wrong' : '')
                    }
                    type="text"
                    value={showAnswers ? correct : userValue}
                    onChange={(e) =>
                      setAnswers((prev) => ({ ...prev, [key]: e.target.value }))
                    }
                    readOnly={showAnswers}
                    placeholder="____"
                    aria-label={`Scene ${sceneIdx + 1} blank ${lineIdx}-${i}`}
                    style={{ width: `${Math.max(correct.length + 2, 6)}ch` }}
                  />
                  {showAnswers && <span className="answer-tag">정답</span>}
                </span>
              )
            })()}
          </span>
        ))}
      </div>
      <div className="ko">{line.ko}</div>
    </div>
  )
}

function Scene({ scene, sceneIdx, answers, setAnswers }) {
  const [showAnswers, setShowAnswers] = useState(false)

  const allBlanks = useMemo(
    () => scene.speakers.flatMap((s) => s.en.blanks),
    [scene]
  )

  // 한 화면에서 단어 상자가 매번 섞이지 않도록 useMemo 로 고정
  const wordBox = useMemo(() => shuffle(allBlanks), [allBlanks])

  // 사용자가 채운 정답 수 / 전체
  const filledCount = scene.speakers.reduce((acc, line, lineIdx) => {
    return (
      acc +
      line.en.blanks.filter((correct, i) => {
        const key = `${sceneIdx}-${lineIdx}-${i}`
        const v = answers[key] ?? ''
        return normalize(v) === normalize(correct)
      }).length
    )
  }, 0)

  const clearScene = () => {
    setAnswers((prev) => {
      const next = { ...prev }
      Object.keys(next).forEach((k) => {
        if (k.startsWith(`${sceneIdx}-`)) delete next[k]
      })
      return next
    })
    setShowAnswers(false)
  }

  return (
    <section className="scene">
      <header className="scene-header">
        <div>
          <h2>{scene.title}</h2>
          <p className="scene-title-ko">{scene.titleKo}</p>
        </div>
        <div className="scene-stats">
          <span className="badge">
            {filledCount} / {allBlanks.length} 정답
          </span>
        </div>
      </header>

      <div className="word-box">
        <div className="word-box-label">단어 상자 · Word Box</div>
        <div className="word-chips">
          {wordBox.map((w, i) => (
            <span className="chip" key={`${w}-${i}`}>
              {w}
            </span>
          ))}
        </div>
      </div>

      <div className="lines">
        {scene.speakers.map((line, idx) => (
          <FillBlankLine
            key={idx}
            line={line}
            lineIdx={idx}
            sceneIdx={sceneIdx}
            answers={answers}
            setAnswers={setAnswers}
            showAnswers={showAnswers}
          />
        ))}
      </div>

      <div className="scene-actions">
        <button
          className={'btn primary' + (showAnswers ? ' active' : '')}
          onClick={() => setShowAnswers((v) => !v)}
        >
          {showAnswers ? '정답 숨기기' : '정답 보기'}
        </button>
        <button className="btn ghost" onClick={clearScene}>
          다시 풀기
        </button>
      </div>
    </section>
  )
}

export default function App() {
  const [activeScene, setActiveScene] = useState(0)
  const [answers, setAnswers] = useState({})

  return (
    <div className="app">
      <header className="app-header">
        <div className="title-cluster">
          <span className="brand">PEANUTS · 스누피와 함께하는 영어</span>
          <h1>
            Hearts For My Sweet Baboo <span className="heart">♥</span>
          </h1>
          <p className="subtitle">
            발렌타인 데이 에피소드로 배우는 영어 빈칸 채우기
          </p>
        </div>
      </header>

      <nav className="scene-tabs">
        {scenes.map((s, i) => (
          <button
            key={s.id}
            className={'tab' + (activeScene === i ? ' active' : '')}
            onClick={() => setActiveScene(i)}
          >
            <span className="tab-num">Scene {s.id}</span>
            <span className="tab-label">{s.titleKo.replace(/^장면 \d+ — /, '')}</span>
          </button>
        ))}
      </nav>

      <main className="main">
        <Scene
          scene={scenes[activeScene]}
          sceneIdx={activeScene}
          answers={answers}
          setAnswers={setAnswers}
        />

        <aside className="tips">
          <h3>학습 팁</h3>
          <ul>
            {learningTips.map((t) => (
              <li key={t.term}>
                <strong>{t.term}</strong> — {t.tip}
              </li>
            ))}
          </ul>
          <a
            className="yt-link"
            href="https://www.youtube.com/watch?v=7EY0gxSAnq8"
            target="_blank"
            rel="noreferrer noopener"
          >
            ▶ 원본 영상 보기 (YouTube)
          </a>
        </aside>
      </main>

      <footer className="app-footer">
        만든 이를 위한 메모: 단어 상자에서 정답 단어를 찾아 빈칸에 입력해 보세요.
        막히면 <em>정답 보기</em> 버튼을 눌러 확인할 수 있어요.
      </footer>
    </div>
  )
}
