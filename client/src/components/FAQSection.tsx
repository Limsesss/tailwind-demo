import React, { useState } from "react";

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="border-b py-4 cursor-pointer"
      onClick={() => setOpen(!open)}
    >
      <h4 className="text-lg font-semibold text-violet-700 flex justify-between items-center">
        {question}
        <span className="text-xl">{open ? "−" : "+"}</span>
      </h4>
      {open && <p className="text-gray-600 mt-2">{answer}</p>}
    </div>
  );
};

const FAQSection: React.FC = () => {
  const faqData = [
    {
      question: "Сколько времени занимает ремонт?",
      answer: "Обычно 1 день. Если нужны запчасти — до 3 дней.",
    },
    {
      question: "Даете ли вы гарантию?",
      answer: "Да, на все виды работ предоставляется гарантия до 6 месяцев.",
    },
    {
      question: "Можно ли вызвать мастера на дом?",
      answer: "Да, возможен выезд по городу по договорённости.",
    },
    {
      question: "Сколько стоит диагностика?",
      answer: "Предварительная диагностика — бесплатно при дальнейшем ремонте.",
    },
  ];

  return (
    <section className="max-w-4xl mx-auto px-4 my-24">
      <h2 className="text-3xl font-bold text-violet-700 mb-10 text-center">
        Часто задаваемые вопросы
      </h2>
      {faqData.map((faq, idx) => (
        <FAQItem key={idx} question={faq.question} answer={faq.answer} />
      ))}
    </section>
  );
};

export default FAQSection;
