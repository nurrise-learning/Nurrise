const quotes = [
    "You are stronger than your fears.",
    "Your healing is coming — step by step.",
    "Every day is a chance to grow.",
    "You are worthy of every good thing.",
    "Don’t rush the process — trust it.",
    "Your pain is turning into power.",
    "You are becoming who you needed.",
    "God is preparing better for you."
];

function newQuote() {
    const box = document.getElementById("quoteBox");
    const random = quotes[Math.floor(Math.random() * quotes.length)];
    box.textContent = random;
}
