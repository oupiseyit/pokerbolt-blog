export const games = [
  {
    "id": "texas-holdem",
    "num": "01",
    "title": "Texas Hold'em Poker",
    "intro": "The house game. You hold two private cards, five community cards are dealt face up in the middle, and the best five-card hand you can build from those seven takes the pot.",
    "tags": [
      "Cards",
      "2–9 seats",
      "Betting rounds"
    ],
    "steps": [
      {
        "title": "Post the blinds",
        "body": "Two seats left of the dealer button post the small and big blind. The buy-in and blind level are printed in the table header, for example <em>Buy in 200K–1M, blind 5K–10K</em>."
      },
      {
        "title": "Pre-flop",
        "body": "Everyone gets two hole cards. Starting left of the big blind, each seat folds, calls or raises."
      },
      {
        "title": "Flop, turn, river",
        "body": "Three community cards, then one, then one more — with a betting round after each. Check when nobody has bet; call, raise or fold when they have."
      },
      {
        "title": "Showdown",
        "body": "The last aggressor shows first. The client names the winning hand on the table banner (<em>Straight A 2 3 4 5</em>) and pushes the pot."
      }
    ],
    "factsTitle": "Table facts",
    "facts": [
      [
        "Deck",
        "52 cards, no joker"
      ],
      [
        "Your hand",
        "Best 5 of your 7 cards"
      ],
      [
        "Actions",
        "Fold, check, call, raise, all in"
      ],
      [
        "Clock",
        "Slow and fast tables; the label is in the header"
      ],
      [
        "Jackpot",
        "Optional side bet, bought before the deal"
      ]
    ],
    "note": {
      "title": "Beginner tip",
      "body": "Fold most starting hands. Position matters more than pretty cards — acting last on every street is worth more than a suited connector."
    },
    "shots": [
      {
        "src": "sample-data/01-poker.png",
        "alt": "Texas Hold'em table with five community cards and the winning hand banner reading Straight",
        "caption": "Showdown: the banner names the winning hand."
      },
      {
        "src": "sample-data/01-poker04.png",
        "alt": "Portrait phone view of a Hold'em table with the action buttons at the bottom",
        "caption": "Portrait layout — action buttons sit under your cards."
      }
    ],
    "thumb": "assets/games/texas-holdem.jpg",
    "thumbAlt": "01 Texas Hold'em",
    "card": {
      "image": "sample-data/01-poker.png",
      "title": "Texas Hold'em",
      "blurb": "Two hole cards, five on the board, four betting rounds."
    }
  },
  {
    "id": "capsa-banting",
    "num": "02",
    "title": "Capsa Banting",
    "intro": "Known elsewhere as Big Two. Four players, thirteen cards each, and one job: get rid of every card before anyone else does.",
    "tags": [
      "Cards",
      "4 seats",
      "Shedding"
    ],
    "steps": [
      {
        "title": "The whole deck goes out",
        "body": "Fifty-two cards, thirteen to each of the four seats."
      },
      {
        "title": "Lowest card opens",
        "body": "The seat holding the 3 of diamonds leads first and must include that card in the opening play."
      },
      {
        "title": "Follow or pass",
        "body": "Each play must match the shape of the lead — single for single, pair for pair, five-card hand for five-card hand — and must beat it. Otherwise press <em>Pass</em>. Passing locks you out until the round is won and a new lead starts."
      },
      {
        "title": "Empty your hand",
        "body": "First player out wins the round. The others pay on the cards still in hand, and the result board shows each seat's reward and card price."
      }
    ],
    "factsTitle": "Table facts",
    "facts": [
      [
        "Card order",
        "3 4 5 6 7 8 9 10 J Q K A 2 — the 2 is highest"
      ],
      [
        "Suit order",
        "♦ lowest, then ♣, ♥, ♠ highest"
      ],
      [
        "Legal shapes",
        "Single, pair, three of a kind, five-card poker hand"
      ],
      [
        "Five-card rank",
        "Straight &lt; flush &lt; full house &lt; four of a kind &lt; straight flush"
      ],
      [
        "Controls",
        "Play, Pass, Clear, Hint"
      ]
    ],
    "note": {
      "title": "Watch the 2s",
      "body": "Single 2s are unbeatable as singles. Holding one is the cheapest way to take back the lead late in a round."
    },
    "shots": [
      {
        "src": "sample-data/02-capsa-banting01.png",
        "alt": "Capsa Banting result board listing reward, card price and total for each player",
        "caption": "The result board settles rewards and card price."
      },
      {
        "src": "sample-data/02-capsa-banting02.png",
        "alt": "Capsa Banting table in play with a hand of thirteen cards at the bottom",
        "caption": "Your thirteen cards, with Play, Pass and Hint."
      }
    ],
    "thumb": "assets/games/capsa-banding.jpg",
    "thumbAlt": "02 Capsa Banting",
    "card": {
      "image": "sample-data/02-capsa-banting02.png",
      "title": "Capsa Banting",
      "blurb": "Shed all thirteen cards first. Big Two, four seats."
    }
  },
  {
    "id": "capsa-susun",
    "num": "03",
    "title": "Capsa Susun",
    "intro": "Chinese Poker. The same thirteen cards, but instead of playing them out you arrange them into three separate poker hands and compare each line against every opponent.",
    "tags": [
      "Cards",
      "2–4 seats",
      "Arranging"
    ],
    "steps": [
      {
        "title": "Take thirteen cards",
        "body": "Each seat is dealt thirteen cards and gets a fixed timer to sort them."
      },
      {
        "title": "Build three rows",
        "body": "Bottom row five cards, middle row five cards, top row three cards."
      },
      {
        "title": "Keep the order legal",
        "body": "Bottom must be stronger than or equal to middle, and middle stronger than or equal to top. Break that and your hand is fouled — you lose every line for the round."
      },
      {
        "title": "Compare and settle",
        "body": "Rows are compared row against row with every other player. Each row won scores a unit; sweeping all three rows against one opponent scores a bonus."
      }
    ],
    "factsTitle": "Table facts",
    "facts": [
      [
        "Rows",
        "5 bottom · 5 middle · 3 top"
      ],
      [
        "Top row",
        "Three cards only — pairs and trips, no straights"
      ],
      [
        "Foul",
        "Rows out of order; all lines lost"
      ],
      [
        "Bonuses",
        "Paid for premium rows and for sweeping an opponent"
      ],
      [
        "Auto-arrange",
        "The client can sort for you before the timer expires"
      ]
    ],
    "note": {
      "title": "Sort from the bottom up",
      "body": "Place your strongest five first, then check the middle can still legally sit under it. Most fouls happen when a good top row is set too early."
    },
    "shots": [
      {
        "src": "sample-data/03-capsa-susun01.png",
        "alt": "Capsa Susun table showing the three-row arrangement in progress",
        "caption": "Three rows: bottom, middle, top."
      },
      {
        "src": "sample-data/03-capsa-susun02.png",
        "alt": "Capsa Susun hand being arranged with the sorting controls visible",
        "caption": "Arrange before the timer runs out."
      },
      {
        "src": "sample-data/03-capsa-susun03.png",
        "alt": "Capsa Susun showdown comparing every row between players",
        "caption": "Every row is compared with every opponent."
      }
    ],
    "thumb": "assets/games/capsa-susun.jpg",
    "thumbAlt": "03 Capsa Susun",
    "card": {
      "image": "sample-data/03-capsa-susun02.png",
      "title": "Capsa Susun",
      "blurb": "Arrange thirteen cards into three legal hands."
    }
  },
  {
    "id": "baccarat",
    "num": "04",
    "title": "Baccarat",
    "intro": "You are not dealt anything — you bet on which of two hands, Player or Banker, will finish closest to nine. The drawing rules are fixed, so no decisions are left to you after the bet.",
    "tags": [
      "Cards",
      "Unlimited seats",
      "Betting"
    ],
    "steps": [
      {
        "title": "Place your chips",
        "body": "Bet Player, Banker or Tie during the betting window. Side bets on Player Pair and Banker Pair sit beside the main boxes."
      },
      {
        "title": "Two cards each",
        "body": "Player and Banker are dealt two cards face up."
      },
      {
        "title": "Count to nine",
        "body": "Add the card values and drop the tens digit: 7 + 8 = 15, which counts as 5. Aces are 1, and 10, J, Q and K are worth zero."
      },
      {
        "title": "The third card is automatic",
        "body": "A total of 8 or 9 on either side is a natural and stands. Otherwise the fixed drawing rules decide whether a third card comes out. Nothing is left to choose."
      }
    ],
    "factsTitle": "Table facts",
    "facts": [
      [
        "Player bet",
        "Pays even money"
      ],
      [
        "Banker bet",
        "Pays even money, less the standard 5% commission"
      ],
      [
        "Tie bet",
        "Pays at long odds and loses on any non-tie"
      ],
      [
        "Card values",
        "A = 1 · 2–9 face value · 10, J, Q, K = 0"
      ],
      [
        "Roadmaps",
        "The bead and big road track past results"
      ]
    ],
    "note": {
      "title": "About the roads",
      "body": "The roadmaps record history, they do not predict it. Every round is independent of the last."
    },
    "shots": [
      {
        "src": "sample-data/04-baccarat01.png",
        "alt": "Baccarat table with Player, Banker and Tie betting boxes",
        "caption": "Betting boxes and the round timer."
      },
      {
        "src": "sample-data/04-baccarat02.png",
        "alt": "Baccarat result with both hands turned over and the roadmaps below",
        "caption": "Result, with the roadmaps updating underneath."
      }
    ],
    "thumb": "assets/games/bandar-baccarat.jpg",
    "thumbAlt": "04 Baccarat",
    "card": {
      "image": "sample-data/04-baccarat01.png",
      "title": "Baccarat",
      "blurb": "Back Player, Banker or Tie. Closest to nine wins."
    }
  },
  {
    "id": "ceme",
    "num": "05",
    "title": "Ceme",
    "intro": "A domino game played against one dealer seat. You get two tiles, add the pips, and the last digit of that total is your score. Nine is the best you can hold.",
    "tags": [
      "Dominoes",
      "2–8 seats",
      "Versus dealer"
    ],
    "steps": [
      {
        "title": "Bet before the deal",
        "body": "Choose your stake while the betting window is open. One seat at the table holds the dealer position and covers everyone."
      },
      {
        "title": "Take two tiles",
        "body": "Every player and the dealer receive two dominoes from the 28-tile set."
      },
      {
        "title": "Add the pips, drop the tens",
        "body": "A 5-6 and a 3-4 make 18, which scores 8. The highest normal score is 9."
      },
      {
        "title": "Compare with the dealer only",
        "body": "You beat the dealer or you do not; other players are irrelevant to your result. The dealer takes ties."
      }
    ],
    "factsTitle": "Table facts",
    "facts": [
      [
        "Tiles",
        "28-tile double-six set"
      ],
      [
        "Your hand",
        "2 tiles, scored as total pips modulo 10"
      ],
      [
        "Best score",
        "9"
      ],
      [
        "Ties",
        "Go to the dealer"
      ],
      [
        "Special hands",
        "Paid at a multiplier; the table info panel lists the exact set in play"
      ]
    ],
    "note": {
      "title": "Check the info panel",
      "body": "Which special tile combinations pay, and at what multiple, varies by table. Open the table info before you sit rather than assuming the last room's rules."
    },
    "shots": [
      {
        "src": "sample-data/05-ceme01.png",
        "alt": "Ceme table with players holding two dominoes each against the dealer seat",
        "caption": "Every seat plays the dealer, not each other."
      },
      {
        "src": "sample-data/05-ceme02.png",
        "alt": "Ceme round settling with each player's two-tile score shown",
        "caption": "Scores settle tile by tile."
      },
      {
        "src": "sample-data/05-ceme03.png",
        "alt": "Close view of a Ceme hand and the betting controls",
        "caption": "Stake is set before the tiles are dealt."
      }
    ],
    "thumb": "assets/games/bandar-ceme.jpg",
    "thumbAlt": "05 Ceme",
    "card": {
      "image": "sample-data/05-ceme01.png",
      "title": "Ceme",
      "blurb": "Two dominoes against the dealer. Last digit is your score."
    }
  },
  {
    "id": "ceme-keliling",
    "num": "06",
    "title": "Ceme Keliling",
    "intro": "Ceme with a travelling dealer. The rules of the hand are identical; what changes is that the dealer seat moves around the table, so everyone banks in turn.",
    "tags": [
      "Dominoes",
      "2–8 seats",
      "Rotating dealer"
    ],
    "steps": [
      {
        "title": "Learn Ceme first",
        "body": "The deal, the scoring and the tie rule are exactly as in <a href=\"#ceme\">Ceme</a>."
      },
      {
        "title": "The bank moves",
        "body": "After each round the dealer position passes to the next seat. Your turn comes around whether you want it or not."
      },
      {
        "title": "Dealing has a cost",
        "body": "While you hold the bank you pay every player who beats you, so you need enough chips in front of you to cover the table."
      },
      {
        "title": "Banking wins the ties",
        "body": "The dealer takes equal scores — that edge is the compensation for the risk."
      }
    ],
    "factsTitle": "Table facts",
    "facts": [
      [
        "Differs from Ceme",
        "Only in who holds the bank"
      ],
      [
        "Rotation",
        "One round per seat, clockwise"
      ],
      [
        "Requirement",
        "Minimum balance to take the dealer seat"
      ],
      [
        "Ties",
        "Go to whoever is dealing that round"
      ]
    ],
    "note": {
      "title": "Sit with a cushion",
      "body": "Buy in deeper than you would for standard Ceme. A short stack cannot take the bank when the rotation reaches it."
    },
    "shots": [
      {
        "src": "sample-data/06-cemekeliling01.png",
        "alt": "Ceme Keliling table showing the dealer marker on a player seat",
        "caption": "The dealer marker sits with a player, not the house."
      },
      {
        "src": "sample-data/06-cemekeliling02.png",
        "alt": "Ceme Keliling round in progress with tiles dealt to every seat",
        "caption": "Same hand, different bank each round."
      }
    ],
    "thumb": "assets/games/ceme-keliling.jpg",
    "thumbAlt": "06 Ceme Keliling",
    "card": {
      "image": "sample-data/06-cemekeliling01.png",
      "title": "Ceme Keliling",
      "blurb": "Ceme with the dealer seat rotating around the table."
    }
  },
  {
    "id": "super10",
    "num": "07",
    "title": "Super10",
    "intro": "Three cards, counted to ten instead of nine. Picture cards are worth ten each, which makes three of them the best hand on the table.",
    "tags": [
      "Cards",
      "2–6 seats",
      "Versus dealer"
    ],
    "steps": [
      {
        "title": "Stake first",
        "body": "Place your bet while the window is open. One seat deals."
      },
      {
        "title": "Three cards each",
        "body": "Every seat, dealer included, receives three cards."
      },
      {
        "title": "Add and drop the tens",
        "body": "Ace counts 1, number cards count face value, and J, Q and K count 10. A 7, 8 and 9 make 24, which scores 4. Ten is the top score."
      },
      {
        "title": "Beat the dealer",
        "body": "Only your hand versus the dealer's matters. Three picture cards — Super Ten — is the strongest hand and is paid at a multiplier."
      }
    ],
    "factsTitle": "Table facts",
    "facts": [
      [
        "Card values",
        "A = 1 · 2–10 face value · J, Q, K = 10"
      ],
      [
        "Your hand",
        "3 cards, total modulo 10"
      ],
      [
        "Best hand",
        "Super Ten — three picture cards"
      ],
      [
        "Ties",
        "Go to the dealer"
      ],
      [
        "Related",
        "Same family as <a href=\"#samgong\">Samgong</a>"
      ]
    ],
    "note": {
      "title": "Ten is the target, not nine",
      "body": "Coming from Ceme or Baccarat, this is the one number to re-learn. A total of 0 is the worst hand you can hold."
    },
    "shots": [
      {
        "src": "sample-data/07-superten01.png",
        "alt": "Super10 table with three cards dealt to each seat",
        "caption": "Three cards a seat, counted to ten."
      }
    ],
    "thumb": "assets/games/super-10.jpg",
    "thumbAlt": "07 Super10",
    "card": {
      "image": "sample-data/07-superten01.png",
      "title": "Super10",
      "blurb": "Three cards, pictures are worth ten, ten is the top score."
    }
  },
  {
    "id": "niu-niu",
    "num": "08",
    "title": "Niu Niu",
    "intro": "Bull Bull. Five cards, of which three must add to a multiple of ten — that is your bull. The other two decide how much you win.",
    "tags": [
      "Cards",
      "2–6 seats",
      "Versus dealer"
    ],
    "steps": [
      {
        "title": "Bet, then take five cards",
        "body": "Stakes are placed before the deal; every seat gets five cards."
      },
      {
        "title": "Find the bull",
        "body": "Look for any three cards totalling a multiple of ten. If no three cards do, you have no bull and hold the weakest hand."
      },
      {
        "title": "Score the other two",
        "body": "Add the remaining two cards and drop the tens digit. That number, 1 to 9, is your score. Two cards making exactly ten or twenty is Niu Niu — the best hand."
      },
      {
        "title": "Settle against the dealer",
        "body": "Higher scores pay more: the top scores carry a payout multiplier rather than paying flat."
      }
    ],
    "factsTitle": "Table facts",
    "facts": [
      [
        "Card values",
        "A = 1 · 2–10 face value · J, Q, K = 10"
      ],
      [
        "Bull",
        "Any 3 cards summing to a multiple of 10"
      ],
      [
        "Score",
        "Remaining 2 cards, modulo 10"
      ],
      [
        "Best hand",
        "Niu Niu — score of 10"
      ],
      [
        "Worst hand",
        "No bull at all"
      ]
    ],
    "note": {
      "title": "Let the client check",
      "body": "The table highlights your best legal split automatically. Verify it rather than hunting for the combination by hand under the clock."
    },
    "shots": [
      {
        "src": "sample-data/08-niuniu01.png",
        "alt": "Niu Niu hand of five cards split into a bull of three and a score of two",
        "caption": "Three cards form the bull, two form the score."
      },
      {
        "src": "sample-data/08-niuniu02.png",
        "alt": "Niu Niu table with every seat's five cards revealed at settlement",
        "caption": "Settlement against the dealer seat."
      }
    ],
    "thumb": "assets/games/niu-niu.jpg",
    "thumbAlt": "08 Niu Niu",
    "card": {
      "image": "sample-data/08-niuniu02.png",
      "title": "Niu Niu",
      "blurb": "Split five cards into a bull of three and a score of two."
    }
  },
  {
    "id": "omaha",
    "num": "09",
    "title": "Omaha Poker",
    "intro": "Hold'em's bigger sibling. Four hole cards instead of two — but you must use exactly two of them, and exactly three from the board, to make your hand.",
    "tags": [
      "Cards",
      "2–9 seats",
      "Betting rounds"
    ],
    "steps": [
      {
        "title": "Four cards down",
        "body": "Blinds are posted as in Hold'em, then each seat receives four private cards."
      },
      {
        "title": "Same four streets",
        "body": "Pre-flop, flop, turn, river — with a betting round after each."
      },
      {
        "title": "Two from hand, three from board",
        "body": "Always. Four hearts in your hand plus one on the board is not a flush, because only two of your cards may play."
      },
      {
        "title": "Showdown",
        "body": "The banner names the best legal combination — the client applies the two-and-three rule for you."
      }
    ],
    "factsTitle": "Table facts",
    "facts": [
      [
        "Hole cards",
        "4"
      ],
      [
        "Must use",
        "Exactly 2 hole cards + 3 community cards"
      ],
      [
        "Hand ranking",
        "Identical to <a href=\"#hand-ranking\">Hold'em</a>"
      ],
      [
        "Typical result",
        "Stronger hands than Hold'em; two pair wins far less often"
      ]
    ],
    "note": {
      "title": "Read the board twice",
      "body": "The most common beginner loss in Omaha is a flush that was never there. Count two cards from your hand, every time."
    },
    "shots": [
      {
        "src": "sample-data/09-pokeromaha02.png",
        "alt": "Omaha table at showdown with the banner reading Two Pair Q Q K K",
        "caption": "Omaha showdown — the banner shows the legal five."
      }
    ],
    "thumb": "assets/games/pot-limit-omaha.jpg",
    "thumbAlt": "09 Omaha Poker",
    "card": {
      "image": "sample-data/09-pokeromaha02.png",
      "title": "Omaha Poker",
      "blurb": "Four hole cards — use exactly two, plus three from the board."
    }
  },
  {
    "id": "domino-classic",
    "num": "10",
    "title": "Domino Classic",
    "intro": "Gaple. Tiles are played out onto a chain, each one matching an open end, and the first player with nothing left in hand takes the round.",
    "tags": [
      "Dominoes",
      "4 seats",
      "Shedding"
    ],
    "steps": [
      {
        "title": "Seven tiles each",
        "body": "Four players draw seven tiles from the 28-tile set."
      },
      {
        "title": "Open the chain",
        "body": "The opening tile starts the line; play then passes around the table."
      },
      {
        "title": "Match an open end",
        "body": "Your tile must share a number with one of the two ends of the chain. No matching tile means you pass."
      },
      {
        "title": "Win by emptying — or by counting",
        "body": "Play your last tile and the round is yours. If the chain gets blocked and nobody can move, the lowest total pips still in hand wins."
      }
    ],
    "factsTitle": "Table facts",
    "facts": [
      [
        "Tiles",
        "28-tile double-six set"
      ],
      [
        "Hand size",
        "7 tiles"
      ],
      [
        "Turn",
        "Match either open end, or pass"
      ],
      [
        "Blocked game",
        "Fewest pips in hand wins"
      ],
      [
        "Settlement",
        "Losers pay on the pips they are left holding"
      ]
    ],
    "note": {
      "title": "Dump the doubles early",
      "body": "A double only ever matches one number. Left until late it is the tile that strands you with a full hand."
    },
    "shots": [
      {
        "src": "sample-data/10-domino-classic01.png",
        "alt": "Domino Classic table with a chain of tiles and seven tiles in hand",
        "caption": "Match either open end of the chain."
      }
    ],
    "thumb": "assets/games/domino-classic.jpg",
    "thumbAlt": "10 Domino Classic",
    "card": {
      "image": "sample-data/10-domino-classic01.png",
      "title": "Domino Classic",
      "blurb": "Gaple. Match the open ends, empty your hand first."
    }
  },
  {
    "id": "samgong",
    "num": "11",
    "title": "Samgong",
    "intro": "Three-card Samgong, sometimes called Three Pictures. Count your three cards toward a target, and try to hold the three picture cards that beat everything.",
    "tags": [
      "Cards",
      "2–6 seats",
      "Versus dealer"
    ],
    "steps": [
      {
        "title": "Bet, then three cards",
        "body": "Stake before the deal; each seat and the dealer take three cards."
      },
      {
        "title": "Count them",
        "body": "Ace is 1, number cards are face value, and J, Q and K count 10 each."
      },
      {
        "title": "Three pictures is the top hand",
        "body": "J, Q or K in all three slots — thirty — is Samgong and beats every other holding."
      },
      {
        "title": "Otherwise drop the tens",
        "body": "Any other hand scores its total modulo ten, and is compared with the dealer's hand alone."
      }
    ],
    "factsTitle": "Table facts",
    "facts": [
      [
        "Card values",
        "A = 1 · 2–10 face value · J, Q, K = 10"
      ],
      [
        "Top hand",
        "Samgong — three picture cards"
      ],
      [
        "Normal score",
        "Total modulo 10"
      ],
      [
        "Ties",
        "Go to the dealer"
      ],
      [
        "Related",
        "See <a href=\"#super10\">Super10</a> for the ten-target variant"
      ]
    ],
    "note": {
      "title": "Two pictures is not two of anything",
      "body": "J + Q = 20, which scores zero. Picture cards are only worth holding as a complete set of three."
    },
    "shots": [
      {
        "src": "sample-data/11-samgong01.png",
        "alt": "Samgong table with three cards dealt to each player and the dealer",
        "caption": "Three cards, dealer-comparison scoring."
      }
    ],
    "thumb": "assets/games/samgong.jpg",
    "thumbAlt": "11 Samgong",
    "card": {
      "image": "sample-data/11-samgong01.png",
      "title": "Samgong",
      "blurb": "Three cards against the dealer. Three pictures is the nuts."
    }
  },
  {
    "id": "blackjack",
    "num": "12",
    "title": "Blackjack",
    "intro": "Get closer to twenty-one than the dealer without going over. The only game here where you choose how many cards you take.",
    "tags": [
      "Cards",
      "1–7 seats",
      "Versus house"
    ],
    "steps": [
      {
        "title": "Bet and take two cards",
        "body": "You and the dealer each get two cards; one of the dealer's is face up."
      },
      {
        "title": "Hit or stand",
        "body": "Draw more cards while you are under twenty-one, or stand on what you have. Over twenty-one is a bust and the bet is lost immediately."
      },
      {
        "title": "Double or split",
        "body": "Double down for one final card at twice the stake. A pair can be split into two separate hands."
      },
      {
        "title": "The dealer plays last",
        "body": "The dealer draws to a fixed total and stands — no judgement involved. Nearest to twenty-one wins; equal totals push."
      }
    ],
    "factsTitle": "Table facts",
    "facts": [
      [
        "Card values",
        "A = 1 or 11 · 2–10 face value · J, Q, K = 10"
      ],
      [
        "Blackjack",
        "Ace + ten-value card on the first two cards"
      ],
      [
        "Actions",
        "Hit, stand, double, split, insurance"
      ],
      [
        "Push",
        "Equal totals — your stake comes back"
      ],
      [
        "Dealer rule",
        "Fixed; shown on the table felt"
      ]
    ],
    "note": {
      "title": "Never take insurance",
      "body": "It is a separate bet on the dealer's hole card, priced in the house's favour. Skip it and play your own hand."
    },
    "shots": [
      {
        "src": "sample-data/12-blackjack01.png",
        "alt": "Blackjack table with the dealer's up card and hit and stand controls",
        "caption": "Hit, stand, double and split sit under your hand."
      }
    ],
    "thumb": "assets/games/blackjack.jpg",
    "thumbAlt": "12 Blackjack",
    "card": {
      "image": "sample-data/12-blackjack01.png",
      "title": "Blackjack",
      "blurb": "Beat the dealer to twenty-one without going bust."
    }
  },
  {
    "id": "call-break",
    "num": "13",
    "title": "Call Break",
    "intro": "A trick-taking game with a promise attached. You call how many tricks you will win, and you are scored on whether you keep your word.",
    "tags": [
      "Cards",
      "4 seats",
      "Trick taking"
    ],
    "steps": [
      {
        "title": "Thirteen cards, then a call",
        "body": "The full deck is dealt to four players. Each seat calls the number of tricks it expects to take."
      },
      {
        "title": "Spades are always trumps",
        "body": "Any spade beats any card of another suit."
      },
      {
        "title": "Follow suit, and beat it if you can",
        "body": "You must follow the suit led and play higher than the current winning card when possible. Holding none of that suit, you must trump with a spade if you have one."
      },
      {
        "title": "Score the call",
        "body": "Make your call and you score it, with a small bonus per extra trick. Fall short and you lose the full amount you called. Five rounds decide the game."
      }
    ],
    "factsTitle": "Table facts",
    "facts": [
      [
        "Players",
        "4"
      ],
      [
        "Trump",
        "Spades, fixed"
      ],
      [
        "Tricks per round",
        "13"
      ],
      [
        "Rounds",
        "5"
      ],
      [
        "Failing a call",
        "Minus the whole call, not the difference"
      ]
    ],
    "note": {
      "title": "Call low",
      "body": "Overtricks are worth a fraction of a point; a missed call costs the lot. Bid the tricks you are sure of and treat the rest as upside."
    },
    "shots": [
      {
        "src": "sample-data/13-callbreak01.png",
        "alt": "Call Break table during the bidding step",
        "caption": "Every seat calls before the first trick."
      },
      {
        "src": "sample-data/13-callbreak02.png",
        "alt": "Call Break trick in progress with spades trumping the led suit",
        "caption": "Follow suit, or trump with a spade."
      }
    ],
    "thumb": "assets/games/callbreak-quick.jpg",
    "thumbAlt": "13 Call Break",
    "card": {
      "image": "sample-data/13-callbreak01.png",
      "title": "Call Break",
      "blurb": "Bid your tricks, spades are trumps, five rounds."
    }
  },
  {
    "id": "speed-baccarat",
    "num": "14",
    "title": "Speed Baccarat",
    "intro": "Baccarat with the pauses removed. Identical rules, identical payouts, roughly half a minute per round instead of a minute.",
    "tags": [
      "Cards",
      "Unlimited seats",
      "Fast round"
    ],
    "steps": [
      {
        "title": "Rules as standard",
        "body": "Counting, the third-card rule and the payouts are exactly as in <a href=\"#baccarat\">Baccarat</a>."
      },
      {
        "title": "Shorter betting window",
        "body": "Fewer seconds to place chips. Set a repeat or double bet so a stake is ready before the window opens."
      },
      {
        "title": "Cards come face up immediately",
        "body": "There is no squeeze or reveal animation — the result lands as soon as the hand is dealt."
      },
      {
        "title": "Pace yourself",
        "body": "Roughly twice the rounds per hour means roughly twice the turnover. Decide a session limit before you sit."
      }
    ],
    "factsTitle": "Table facts",
    "facts": [
      [
        "Differs from Baccarat",
        "Only in timing"
      ],
      [
        "Round length",
        "About 27 seconds"
      ],
      [
        "Bets",
        "Player, Banker, Tie and the pair side bets"
      ],
      [
        "Helpers",
        "Repeat, double and undo on the bet bar"
      ]
    ],
    "note": {
      "title": "Undo has a deadline",
      "body": "The undo control stops working the instant betting closes. On a speed table that is sooner than the reflex expects."
    },
    "shots": [
      {
        "src": "sample-data/14-speed-baccarat01.png",
        "alt": "Speed Baccarat table with a short countdown on the betting window",
        "caption": "Same table, shorter clock."
      }
    ],
    "thumb": "assets/games/speed-baccarat.jpg",
    "thumbAlt": "14 Speed Baccarat",
    "card": {
      "image": "sample-data/14-speed-baccarat01.png",
      "title": "Speed Baccarat",
      "blurb": "Baccarat rules on a roughly half-minute round clock."
    }
  },
  {
    "id": "tongits-go",
    "num": "15",
    "title": "Tongits Go",
    "intro": "A three-player rummy from the Philippines. Draw, meld, discard — and get out before the other two, or be caught holding cards when someone else does.",
    "tags": [
      "Cards",
      "3 seats",
      "Rummy"
    ],
    "steps": [
      {
        "title": "Twelve cards each",
        "body": "Three players take twelve cards; the dealer takes an extra one and plays first."
      },
      {
        "title": "Draw then discard",
        "body": "On your turn take the top of the stock or the last discard, then throw one card away."
      },
      {
        "title": "Meld to lower your count",
        "body": "Lay down sets of the same rank or runs in one suit. Melded cards no longer count against you, and you can add to melds already on the table."
      },
      {
        "title": "Go out, or call the fight",
        "body": "Discarding your last card is Tongits and wins outright. You can instead challenge for a showdown — the lowest total of unmelded cards wins, and calling it with the higher count is the expensive way to lose."
      }
    ],
    "factsTitle": "Table facts",
    "facts": [
      [
        "Players",
        "3"
      ],
      [
        "Hand size",
        "12, or 13 for the dealer"
      ],
      [
        "Melds",
        "Sets of equal rank, or runs in one suit"
      ],
      [
        "Card points",
        "A = 1 · 2–10 face value · J, Q, K = 10"
      ],
      [
        "Winning",
        "Tongits, a won challenge, or the stock running out"
      ]
    ],
    "note": {
      "title": "Count before you challenge",
      "body": "A challenge is only worth calling when your unmelded total is genuinely the lowest. The client shows your count — read it first."
    },
    "shots": [
      {
        "src": "sample-data/15-tongits-go01.png",
        "alt": "Tongits Go table with melds laid out and a hand of twelve cards",
        "caption": "Melds on the table, unmelded cards against you."
      }
    ],
    "thumb": "assets/games/tongits-go.jpg",
    "thumbAlt": "15 Tongits Go",
    "card": {
      "image": "sample-data/15-tongits-go01.png",
      "title": "Tongits Go",
      "blurb": "Meld, discard, and go out before the other two seats."
    }
  }
];
