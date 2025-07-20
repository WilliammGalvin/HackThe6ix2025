enum CardType {
  BLUE = "gradient-card-blue",
  WHITE = "gradient-card-white",
  PURPLE = "gradient-card-purple",
}

export default function ResourcePage() {
  const cards = [
    {
      type: CardType.BLUE,
      text: "IBM REPORTED THAT 82% OF LARGE COMPANIES HAVE DEPLOYED AI OR HAVE EXPERIMENTED WITH THE IDEA.",
    },
    {
      type: CardType.WHITE,
      text: "With this implementation in mind, this creates MANY data centers that support the ai, which need cooling systems to function.",
    },
    {
      type: CardType.WHITE,
      text: "AND AS A RESULT...",
    },
    {
      type: CardType.BLUE,
      text: "GOOGLe’s reported WATER CONSUMPTION HAS JUMPED 22% FROM 2021-2022, REACHING A WHOPPING 5.56 BILLION GALLONS. 5.56 BILLION GALLONS.",
    },
    {
      type: CardType.BLUE,
      text: "MICROSOFT’S REPORTED WATER CONSUMPTION HAS JUMPED 34% BETWEEN THE YEARS OF 2021-2022, REACHING ALMOST 1.7 BILLION GALLONS.",
    },
    {
      type: CardType.WHITE,
      text: "MANY COMPANIES HAVE CREATED SOLUTIONS TO THIS ISSUE, THAT NOT ONLY SAVES THE PLANET, BUT CAN PROVIDE LONG TERM COST BENEFITS.",
    },
    {
      type: CardType.PURPLE,
      text: "Lenovo Neptune’s direct WATER COOLING SYSTEM HAS CONTRIBUTED A 40% REDUCTION IN POWER CONSUMPTION AND A 3.5X IMPROVEMENT TO THERMAL EFFICIENCIES.",
    },
    {
      type: CardType.PURPLE,
      text: "VEOLIA UTILIZES A CONTROLLER TO SIMPLIFY MANAGEMENT FOR DATA CENTERS COOLING SYSTEMS. REDUCING THE AMOUNT OF WATER NEEDED TO OPERATE BY 50%, 12M IN GALLONS OF WATER SAVED ANNUALLY AND $150,000 IN SAVINGS.",
    },
    {
      type: CardType.PURPLE,
      text: "equinix’s data center in toronto uses a dlwc system that reduced the total energy needs by 50%, without increasing water consumption.",
    },
  ];

  return (
    <main className="w-screen h-screen flex flex-col items-center text-white m-12 overflow-y-scroll">
      <h1 className="text-6xl font-bold font-silkscreen">Resources</h1>

      <ul className="max-w-[550px] font-silkscreen">
        {cards.map((card, index) => (
          <li
            key={index}
            className={`my-8 p-6 rounded-lg shadow-lg text-center ${card.type}`}
          >
            <p className="text-xl">{card.text}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
