'use client';

const reviews = [
  {
    quote: "An exquisite alternative to traditional wine. Verji has a permanent place on our menu.",
    name: "Alice Waters",
    company: "Chez Panisse"
  },
  {
    quote: "The most refreshing non-alcoholic drink I've had this year. A true game-changer.",
    name: "Amanda Cuz",
    company: "CNN"
  },
  {
    quote: "Perfectly balanced and endlessly sippable. Verji is a revelation.",
    name: "Jane Smith",
    company: "Bon Appétit"
  }
];

export default function Media() {
  return (
    <section id="media" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Rave Reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div key={index} className="bg-gray-50 p-8 rounded-lg shadow-md">
              <p className="text-lg mb-4">"{review.quote}"</p>
              <p className="font-bold">{review.name}</p>
              <p className="text-sm text-gray-500">{review.company}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
