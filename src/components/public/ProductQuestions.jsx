import { useState } from "react";
import { FiMessageCircle, FiMessageSquare, FiSend } from "react-icons/fi";
import Button from "../ui/Button";
import SortDropdown from "./SortDropdown";

const sortOptions = [
  { value: "recent", label: "Most recent" },
  { value: "newest", label: "New to old" },
  { value: "oldest", label: "Old to new" },
];

function getStorageKey(productId) {
  return `classy-missy-product-questions-${productId}`;
}

function getQuestionTime(item) {
  const timestamps = [
    item.createdAt,
    ...item.answers.map((answer) => answer.createdAt),
  ]
    .map((value) => Date.parse(value))
    .filter(Number.isFinite);

  return timestamps.length ? Math.max(...timestamps) : 0;
}

function readQuestions(productId) {
  try {
    const stored = localStorage.getItem(getStorageKey(productId));
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) {
      throw new TypeError("Saved product questions must be an array.");
    }
    return parsed.filter(
      (item) =>
        item &&
        typeof item.id === "string" &&
        typeof item.question === "string" &&
        Array.isArray(item.answers),
    );
  } catch (error) {
    console.error("Could not load product questions.", error);
    return [];
  }
}

export default function ProductQuestions({ productId }) {
  return <ProductQuestionsContent key={productId} productId={productId} />;
}

function ProductQuestionsContent({ productId }) {
  const [questions, setQuestions] = useState(() => readQuestions(productId));
  const [questionText, setQuestionText] = useState("");
  const [answerText, setAnswerText] = useState("");
  const [answeringId, setAnsweringId] = useState(null);
  const [notice, setNotice] = useState("");
  const [sortOrder, setSortOrder] = useState("recent");
  const sortedQuestions = [...questions].sort((first, second) => {
    if (sortOrder === "oldest") {
      return (
        (Date.parse(first.createdAt) || 0) -
        (Date.parse(second.createdAt) || 0)
      );
    }

    const firstTime =
      sortOrder === "recent"
        ? getQuestionTime(first)
        : Date.parse(first.createdAt) || 0;
    const secondTime =
      sortOrder === "recent"
        ? getQuestionTime(second)
        : Date.parse(second.createdAt) || 0;
    return secondTime - firstTime;
  });

  const saveQuestions = (nextQuestions) => {
    try {
      localStorage.setItem(
        getStorageKey(productId),
        JSON.stringify(nextQuestions),
      );
      setQuestions(nextQuestions);
      setNotice("Your update was saved in this browser.");
    } catch (error) {
      console.error("Could not save product questions.", error);
      setNotice("Could not save your question in this browser.");
    }
  };

  const askQuestion = (event) => {
    event.preventDefault();
    const question = questionText.trim();
    if (!question) return;

    saveQuestions([
      {
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        question,
        createdAt: new Date().toISOString(),
        answers: [],
      },
      ...questions,
    ]);
    setQuestionText("");
  };

  const answerQuestion = (event, questionId) => {
    event.preventDefault();
    const answer = answerText.trim();
    if (!answer) return;

    saveQuestions(
      questions.map((item) =>
        item.id === questionId
          ? {
              ...item,
              answers: [
                ...item.answers,
                {
                  id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
                  text: answer,
                  createdAt: new Date().toISOString(),
                },
              ],
            }
          : item,
      ),
    );
    setAnswerText("");
    setAnsweringId(null);
  };

  return (
    <section
      aria-labelledby="product-questions-title"
      className="overflow-hidden rounded-lg border border-border bg-background "
    >
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border px-5 py-5 sm:px-6">
        <div className="flex items-center gap-3.5">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-background-secondary text-foreground">
            <FiMessageSquare size={20} aria-hidden="true" />
          </span>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-secondary">
              Product support
            </p>
            <h2
              id="product-questions-title"
              className="mt-0.5 text-lg font-semibold tracking-tight text-foreground"
            >
              Questions & answers
            </h2>
            <p className="mt-0.5 text-xs text-foreground-secondary">
              {questions.length}{" "}
              {questions.length === 1 ? "question" : "questions"} from shoppers
            </p>
          </div>
        </div>
        <div className="flex w-full items-center justify-between gap-3 sm:w-auto sm:justify-end">
          <span className="text-xs text-foreground-secondary">Sort by</span>
          <SortDropdown
            value={sortOrder}
            onChange={setSortOrder}
            options={sortOptions}
            ariaLabel="Sort questions"
            optionsId={`question-sort-options-${productId}`}
          />
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <form
          onSubmit={askQuestion}
          className="rounded-2xl border border-border bg-background-secondary/70 p-4 sm:p-5"
        >
          <div className="mb-3 flex items-center gap-2">
            <FiMessageCircle
              size={17}
              className="text-foreground-secondary"
              aria-hidden="true"
            />
            <p className="text-sm font-semibold text-foreground">
              Have a question about this product?
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <label className="sr-only" htmlFor={`question-${productId}`}>
              Ask a question
            </label>
            <input
              id={`question-${productId}`}
              value={questionText}
              onChange={(event) => setQuestionText(event.target.value)}
              maxLength={500}
              required
              placeholder="Type your question here..."
              className="h-11 min-w-0 flex-1 rounded-xl border border-input-border bg-input-background px-3.5 text-sm text-input-text outline-none transition placeholder:text-input-placeholder focus:border-input-active-border focus:ring-2 focus:ring-input-active-ring/30"
            />
            <Button type="submit" className="h-11 rounded-xl px-5">
              <FiSend size={15} aria-hidden="true" />
              Ask question
            </Button>
          </div>
          {notice && (
            <p
              className="mt-2 text-xs text-foreground-secondary"
              aria-live="polite"
            >
              {notice}
            </p>
          )}
        </form>

        <div className="mt-5 divide-y divide-border">
          {sortedQuestions.length ? (
            sortedQuestions.map((item) => (
              <article key={item.id} className="py-5 first:pt-0 last:pb-0">
                <div className="flex gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-xs font-semibold text-primary-foreground shadow-xs">
                    Q
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold leading-6 text-foreground">
                      {item.question}
                    </p>
                    <p className="mt-1 text-[11px] text-foreground-secondary">
                      Asked by a customer
                    </p>
                    {item.answers.map((answer) => (
                      <div
                        key={answer.id}
                        className="mt-4 flex gap-3 rounded-xl bg-background-secondary/70 p-3"
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-[10px] font-semibold text-foreground">
                          A
                        </span>
                        <div>
                          <p className="text-sm leading-6 text-foreground-secondary">
                            {answer.text}
                          </p>
                          <p className="mt-1 text-[10px] font-medium text-foreground-secondary">
                            Community answer
                          </p>
                        </div>
                      </div>
                    ))}
                    {answeringId === item.id ? (
                      <form
                        onSubmit={(event) => answerQuestion(event, item.id)}
                        className="mt-3 flex flex-col gap-2 sm:flex-row"
                      >
                        <label
                          className="sr-only"
                          htmlFor={`answer-${item.id}`}
                        >
                          Write an answer
                        </label>
                        <input
                          id={`answer-${item.id}`}
                          value={answerText}
                          onChange={(event) => setAnswerText(event.target.value)}
                          maxLength={500}
                          required
                          placeholder="Write an answer"
                          className="h-10 min-w-0 flex-1 rounded-xl border border-input-border bg-input-background px-3 text-sm text-input-text outline-none focus:border-input-active-border"
                        />
                        <Button
                          type="submit"
                          size="sm"
                          className="rounded-xl"
                        >
                          Post answer
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setAnsweringId(null);
                            setAnswerText("");
                          }}
                          className="rounded-xl"
                        >
                          Cancel
                        </Button>
                      </form>
                    ) : (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setAnsweringId(item.id)}
                        className="mt-2 rounded-xl px-2 text-xs text-foreground-secondary"
                      >
                        Answer
                      </Button>
                    )}
                  </div>
                </div>
              </article>
            ))
          ) : (
            <p className="py-8 text-center text-sm text-foreground-secondary">
              No questions yet. Be the first to ask about this product.
            </p>
          )}
        </div>
      </div>
      <p className="border-t border-border bg-background-secondary/50 px-5 py-3 text-xs leading-5 text-foreground-secondary sm:px-6">
        Questions and answers are saved in this browser on this device.
      </p>
    </section>
  );
}
