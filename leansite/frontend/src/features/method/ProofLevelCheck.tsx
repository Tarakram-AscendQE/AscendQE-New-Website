import { useEffect, useReducer, useRef } from 'react';
import { Link } from 'react-router-dom';
import { PROOF_LEVEL_QUESTIONS, PROOF_LEVEL_RESULTS, STAIR_HEIGHTS } from '@/features/method/method-data';

const LAST_QUESTION = PROOF_LEVEL_QUESTIONS.length - 1;
const TOP_LEVEL = PROOF_LEVEL_RESULTS.length - 1;

interface CheckState {
  index: number;
  /** Reached level once the check is finished; null while questions are being asked. */
  level: number | null;
  focus: 'question' | 'result' | null;
}

type CheckAction = { type: 'yes' } | { type: 'no' } | { type: 'back' } | { type: 'restart' };

const INITIAL_STATE: CheckState = { index: 0, level: null, focus: null };

// A reducer keeps every answer in order, even when clicks arrive faster than React re-renders.
function checkReducer(state: CheckState, action: CheckAction): CheckState {
  if (action.type === 'restart') return { index: 0, level: null, focus: 'question' };
  if (state.level !== null) return state;
  switch (action.type) {
    case 'yes':
      return state.index === LAST_QUESTION
        ? { ...state, level: TOP_LEVEL, focus: 'result' }
        : { ...state, index: state.index + 1, focus: null };
    case 'no':
      return { ...state, level: PROOF_LEVEL_QUESTIONS[state.index].level - 1, focus: 'result' };
    case 'back':
      return { ...state, index: Math.max(0, state.index - 1), focus: null };
  }
}

function stairClass(stair: number, level: number): string | undefined {
  if (stair === level) return 'on';
  if (stair < level) return 'past';
  return undefined;
}

/** Ten-question Proof Level self-check on the method page. Nothing is stored or sent. */
export function ProofLevelCheck() {
  const [{ index, level, focus }, dispatch] = useReducer(checkReducer, INITIAL_STATE);
  const questionRef = useRef<HTMLParagraphElement>(null);
  const resultRef = useRef<HTMLElement>(null);

  // Move focus after the view changes (result heading, or the first question on restart).
  useEffect(() => {
    if (focus === 'result') resultRef.current?.focus();
    if (focus === 'question') questionRef.current?.focus();
  }, [focus, level, index]);

  const question = PROOF_LEVEL_QUESTIONS[index];
  const result = level === null ? null : PROOF_LEVEL_RESULTS[level];

  return (
    <div className="check" id="check">
      <div className="ask" hidden={result !== null}>
        <div className="meta">
          <span>
            Question <span>{index + 1}</span> of 10
          </span>
          <b>
            Tests for Level <span>{question.level}</span>
          </b>
        </div>
        <div className="prog" aria-hidden="true">
          <i style={{ width: `${index * 10}%` }}></i>
        </div>
        <p className="q" tabIndex={-1} aria-live="polite" ref={questionRef}>
          {question.question}
        </p>
        <p className="hint">{question.hint}</p>
        <div className="ans">
          <button type="button" className="y" onClick={() => dispatch({ type: 'yes' })}>
            Yes
          </button>
          <button type="button" className="n" onClick={() => dispatch({ type: 'no' })}>
            No
          </button>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '12px',
            marginTop: '10px',
            flexWrap: 'wrap',
          }}
        >
          <button type="button" className="linkbtn" hidden={index === 0} onClick={() => dispatch({ type: 'back' })}>
            ← Previous question
          </button>
          <span className="tiny faint" style={{ marginLeft: 'auto' }}>
            Answer for one system, honestly.
          </span>
        </div>
      </div>
      <div className="res" hidden={result === null}>
        {result && level !== null && (
          <>
            <p className="tiny faint mono">YOUR SYSTEM IS AT</p>
            <div className="lvl">
              <b tabIndex={-1} ref={resultRef}>
                Level {level}
              </b>
              <span>{result.name}</span>
            </div>
            <p className="muted mt8">{result.means}</p>
            <div className="stairs" aria-hidden="true">
              {STAIR_HEIGHTS.map((height, stair) => (
                <i key={height} style={{ height: `${height}%` }} className={stairClass(stair, level)}></i>
              ))}
            </div>
            <div className="next">
              <p className="lab">
                NEXT STEP · <span>{result.offer}</span>
              </p>
              <p className="mt8">{result.next}</p>
            </div>
            <div className="actions" style={{ marginTop: '22px' }}>
              <Link className="btn" to={result.ctaHref}>
                {result.ctaLabel}
              </Link>
              <button type="button" className="linkbtn" onClick={() => dispatch({ type: 'restart' })}>
                Start again
              </button>
            </div>
            <p className="tiny faint mt16">
              {level <= 1
                ? 'Level 0 if tests aren’t run at all; Level 1 if they are run and counted. This is a self-check, not a PS-1 claim.'
                : 'This is a self-check against PS-1 v0.1, not a PS-1 claim.'}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
