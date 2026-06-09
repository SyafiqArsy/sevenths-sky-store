"use client";

import { useState } from "react";

type FAQItem = {
  question: string;
  answer: string;
};

export default function FAQAccordion({
  items,
}: {
  items: FAQItem[];
}) {
  const [activeIndex, setActiveIndex] =
    useState<number | null>(null);

  function toggle(index: number) {
    setActiveIndex(
      activeIndex === index
        ? null
        : index
    );
  }

  return (
    <div className="space-y-4">

      {items.map(
        (item, index) => (
          <div
            key={index}
            className="
              border
              rounded-2xl
              overflow-hidden
            "
          >
            <button
              onClick={() =>
                toggle(index)
              }
              className="
                w-full
                flex
                justify-between
                items-center
                p-6
                text-left
                font-medium
              "
            >
              <span>
                {item.question}
              </span>

              <span>
                {activeIndex === index
                  ? "−"
                  : "+"}
              </span>
            </button>

            {activeIndex === index && (
              <div
                className="
                  px-6
                  pb-6
                  text-gray-600
                  leading-relaxed
                "
              >
                {item.answer}
              </div>
            )}
          </div>
        )
      )}

    </div>
  );
}