/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // // Deletes ALL existing entries
  // *Just Realized that joke table is not needed, but some of these are amusing so I'm leaving them here.
  // await knex('jokes').del()
  // await knex('jokes').insert([
  //   {joke: "Why did Beethoven get rid of his chickens?", punchline: "All they ever said was, “Bach, Bach, Bach!”", cringe_factor: 3, created_by: 1},
  //   {joke: "What did 20 do when it was hungry?", punchline: "What did 20 do when it was hungry?", cringe_factor: 6, created_by: 1},
  //   {joke: "Why wasn’t the cactus invited to hang out with the mushrooms?", punchline: "He wasn’t a fungi.", cringe_factor: 2, created_by: 1},
  //   {joke: "Why did the crab cross the road?", punchline: "It didn’t—it used the sidewalk.", cringe_factor: 4, created_by: 1},
  //   {joke: "Why does it take pirates a long time to learn the alphabet?", punchline: "Because they can spend years at C!", cringe_factor: 8, created_by: 2},
  //   {joke: "Why can’t you put two half-dollars in your pocket?", punchline: "Because two halves make a hole, and your money will fall out!", cringe_factor: 10, created_by: 2},
  //   {joke: "Why does a moon rock taste better than an Earth rock?", punchline: "It’s a little meteor.", cringe_factor: 6, created_by: 2},
  //   {joke: "How much do rainbows weigh?", punchline: "Not much. They’re actually pretty light.", cringe_factor: 5, created_by: 2}
  // ]);
};
