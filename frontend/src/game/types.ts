enum AIResearchLevel {
  GPT_1 = "GPT-1",
  GPT_2 = "GPT-2",
  GPT_3 = "GPT-3",
  GPT_4 = "GPT-4",
  GPT_5 = "GPT-5",
  GPT_6 = "GPT-6",
}

const AIResearchLadder = [
  AIResearchLevel.GPT_1,
  AIResearchLevel.GPT_2,
  AIResearchLevel.GPT_3,
  AIResearchLevel.GPT_4,
  AIResearchLevel.GPT_5,
  AIResearchLevel.GPT_6,
];

const AIResearchMultipliers = new Map<AIResearchLevel, number>([
  [AIResearchLevel.GPT_1, 0.25],
  [AIResearchLevel.GPT_2, 0.75],
  [AIResearchLevel.GPT_3, 2.5],
  [AIResearchLevel.GPT_4, 4.0],
  [AIResearchLevel.GPT_5, 8.0],
  [AIResearchLevel.GPT_6, 16.0],
]);

const AIResearchRequirements = new Map<AIResearchLevel, number>([
  [AIResearchLevel.GPT_1, 1],
  [AIResearchLevel.GPT_2, 2],
  [AIResearchLevel.GPT_3, 3],
  [AIResearchLevel.GPT_4, 4],
  [AIResearchLevel.GPT_5, 5],
  [AIResearchLevel.GPT_6, 6],
]);

export {
  AIResearchLevel,
  AIResearchLadder,
  AIResearchMultipliers,
  AIResearchRequirements,
};
