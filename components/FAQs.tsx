import FAQ from "./FAQ";

const faqs = [
  {
    q: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas, quis.",
    a: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Et cumque, eum nostrum illo sed mollitia dignissimos minima modi exercitationem laborum! Quidem nostrum dolore commodi quasi, facilis possimus ipsa sit, nesciunt consectetur numquam laborum labore ut odio accusantium aspernatur doloremque animi. Impedit eaque laboriosam dolores ea recusandae error vitae, et maxime?",
  },
  {
    q: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas, quis.",
    a: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Et cumque, eum nostrum illo sed mollitia dignissimos minima modi exercitationem laborum! Quidem nostrum dolore commodi quasi, facilis possimus ipsa sit, nesciunt consectetur numquam laborum labore ut odio accusantium aspernatur doloremque animi. Impedit eaque laboriosam dolores ea recusandae error vitae, et maxime?",
  },
  {
    q: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas, quis.",
    a: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Et cumque, eum nostrum illo sed mollitia dignissimos minima modi exercitationem laborum! Quidem nostrum dolore commodi quasi, facilis possimus ipsa sit, nesciunt consectetur numquam laborum labore ut odio accusantium aspernatur doloremque animi. Impedit eaque laboriosam dolores ea recusandae error vitae, et maxime?",
  },
  {
    q: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas, quis.",
    a: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Et cumque, eum nostrum illo sed mollitia dignissimos minima modi exercitationem laborum! Quidem nostrum dolore commodi quasi, facilis possimus ipsa sit, nesciunt consectetur numquam laborum labore ut odio accusantium aspernatur doloremque animi. Impedit eaque laboriosam dolores ea recusandae error vitae, et maxime?",
  },
  {
    q: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas, quis.",
    a: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Et cumque, eum nostrum illo sed mollitia dignissimos minima modi exercitationem laborum! Quidem nostrum dolore commodi quasi, facilis possimus ipsa sit, nesciunt consectetur numquam laborum labore ut odio accusantium aspernatur doloremque animi. Impedit eaque laboriosam dolores ea recusandae error vitae, et maxime?",
  },
  {
    q: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas, quis.",
    a: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Et cumque, eum nostrum illo sed mollitia dignissimos minima modi exercitationem laborum! Quidem nostrum dolore commodi quasi, facilis possimus ipsa sit, nesciunt consectetur numquam laborum labore ut odio accusantium aspernatur doloremque animi. Impedit eaque laboriosam dolores ea recusandae error vitae, et maxime?",
  },
  {
    q: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas, quis.",
    a: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Et cumque, eum nostrum illo sed mollitia dignissimos minima modi exercitationem laborum! Quidem nostrum dolore commodi quasi, facilis possimus ipsa sit, nesciunt consectetur numquam laborum labore ut odio accusantium aspernatur doloremque animi. Impedit eaque laboriosam dolores ea recusandae error vitae, et maxime?",
  },
  {
    q: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas, quis.",
    a: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Et cumque, eum nostrum illo sed mollitia dignissimos minima modi exercitationem laborum! Quidem nostrum dolore commodi quasi, facilis possimus ipsa sit, nesciunt consectetur numquam laborum labore ut odio accusantium aspernatur doloremque animi. Impedit eaque laboriosam dolores ea recusandae error vitae, et maxime?",
  },
];

const FAQs = () => {
  return (
    <div className="max-w-[1200px] mx-auto flex items-center justify-center flex-col gap-6 p-8 py-12">
      <h2 className="font-bold text-2xl text-primary">FAQs</h2>
      <div className="grid grid-cols-2 items-center gap-x-6 gap-y-4 justify-center transition-all duration-100">
        {faqs.map((faq, i) => (
          <FAQ q={faq.q} a={faq.a} key={"faq-" + i} />
        ))}
      </div>
    </div>
  );
};

export default FAQs;
