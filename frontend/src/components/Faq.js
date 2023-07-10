import { useRef, useState } from "react";
import { ReactComponent as GameWorks } from "../images/game_works.svg";

const faqs = [
  {
    id: 1,
    header: "How does the game work?",
    text: (
      <p>
        <GameWorks className="mb-5" />
        wavGAME is a fun digital trading card experience made up of 6 levels to
        connect you closer with your favorite music artists. Here's a simple way
        to think about it:
        <br></br>
        <br></br>● Start the Game: <br></br>Choose your artist and check out
        what the levels hold for you. Buy as many artist cards to start the
        game, at minimum 1 to get a song or 2 if you want to trade them for the
        next level. You can buy them with a credit card.
        <br></br>
        <br></br>● Climb the Levels: <br></br>Levels 2 and 3 will be a warm-up.
        The first card on these levels gets you the prize. Trade 2-for-1 cards
        to level up and win in the next levels.
        <br></br>
        <br></br>● Buy Level 1 Cards to climb: <br></br>To reach level 2 and up,
        always buy cards in Level 1 and trade 2-for-1 cards. There are no
        additional costs for trades.
        <br></br>
        <br></br>● Be Quick on Levels 4 and 5: <br></br>Look out for Levels 4
        and 5, as they will open at a set time. The first 20 per artist to level
        4 and the first 10 per artist to level 5 will be rewarded. You’ve got to
        be speedy!
        <br></br>
        <br></br>● Special Prize at Level 6: <br></br>Everyone that reaches Level 6 and keeps their card, will win a meet-and-greet with their chosen artist. All Level 6 holders will also enter a raffle to win the main prize of a trip and a 1-on-1 concert with their chosen artist. One lucky Level 6 card holder will win the main prize.
        <br></br>
        <br></br>● Go for the Full Set: <br></br>
        Good news for all who come after: The game is not over! We will have an
        exclusive reward for all holders of an artist’s full set (holding 1
        collectible of each level at the end of the game).
        <br></br>
        <br></br>To make it to Level 6, you'll need 32 Level 1 cards. If you
        want to collect an artist's full set, you'll need 63 Level 1 cards. Good
        luck!
      </p>
    ),
  },
  {
    id: 2,
    header: "How do I redeem my prizes?",
    text: (
      <p>
        For the first 2 levels (live song and a top live song), the card itself
        is the reward (song + visual). For levels 3-6 and the full set holder
        reward, if you collected one of the limited prizes, the wavWRLD will be
        reaching out to you within 2 weeks from the end of the wavGAME to
        coordinate redemption for your specific experience.
      </p>
    ),
  },
  {
    id: 3,
    header:
      "Some limited prizes and the main one are gone. How much longer will the game be open?",
    text: (
      <p>
        This game will end one (1) week after the first player reaches Level 6. All players reaching Level 6 will win a meet & greet with their chosen artist, and an entry in the raffle for the main price of a trip and 1-on-1 concert. You can collect Levels 4-5 even if rewards for those levels have been claimed, so that you can get a full set (holding 1 of each level 1-6 for one artist at the game’s end) and claim the full set reward. The full set holder reward pass will be airdropped to your wallet and wavWRLD will reach out once the wavGAME ends to coordinate reward redemption.
      </p>
    ),
  },
  {
    id: 4,
    header: "I can't see my previously played games. Where are they?",
    text: (
      <p>
        All progress is tracked under the email and browser you originally
        signed in with—please log back in to that same account to access.{" "}
      </p>
    ),
  },
  {
    id: 5,
    header: "What is wavWRLD about?",
    text: (
      <p>
        wavWRLD is a social garden at the intersection of music and web3, giving
        meaning to creators’ collective experiences. wavWRLD creates and builds
        unique musical experiences that connect artists with their true fans.
      </p>
    ),
  },
  {
    id: 6,
    header: "When does the game end?",
    text: (
      <p>
        This game will end one (1) week after the first player has reached level
        6. Continue collecting in the last week to get to a full set (holding 1
        of each level 1-6 at the game’s end) and claim the full set holder
        reward. Keep an eye on wavWRLD Twitter for announcements on when level 6
        has been reached.
      </p>
    ),
  },
  {
    id: 7,
    header: "How do I listen to the songs I'm collecting?",
    text: (
      <p>
        You can head to an aggregator like Spinamp or Oohlala to listen. We have
        created a playlist with all the artists’ wavROOM tracks.{" "}
        <a
          className="hover:no-underline hover:text-decoration-none no-underline lightPink"
          href="https://sound.xyz/"
          target="blank"
        >
          Link to Playlist
        </a>
      </p>
    ),
  },
  {
    id: 8,
    header: "Can I play multiple artists' games at the same time?",
    text: (
      <p>
        Absolutely! You may want to prioritize getting to the top level of your
        favorite artists, but you can progress through the game with as many
        artists as you’d like.
      </p>
    ),
  },
  {
    id: 9,
    header: "HOW DO I SEND MY CARDS TO MY PRIMARY WEB3 WALLET?",
    text: (
      <p>
        You can send your cards by clicking on “Send” next to your cards on the
        Leaderboard section of an artist’s game. You will need to copy your
        external web3 wallet’s address and paste it into the send form. If you
        claimed a Level 4-6 limited prize, that prize is yours and wavWRLD will
        contact you for redemption after the game. Sending the claimed cards to
        someone else does not transfer ownership of the claimed prize
      </p>
    ),
  },
  {
    id: 10,
    header: "DO I HAVE CONTROL OVER MY CARDS?",
    text: (
      <p>
        Yes, the wavGAME wallet is powered by the Liquality SDK, which creates a
        self-custodial wallet using your email login and local storage as shares
        of a private key you control. You can also send your card to an external
        wallet with the “Send” function in the Leaderboard section.
      </p>
    ),
  },
  {
    id: 11,
    header:
      "I love this experience and want to whitelabel the wavGAME. Who should I contact?",
    text: (
      <p>
        {" "}
        Reach out to us at hello@wavwrld.com or via Twitter{" "}
        <a
          className="hover:no-underline hover:text-decoration-none no-underline lightPink"
          href="https://twitter.com/wavWRLD_"
          target="blank"
        >
          @wavWRLD_
        </a>
        !
      </p>
    ),
  },
];

const AccordionItem = (props) => {
  const contentEl = useRef();
  const { handleToggle, active, faq } = props;
  const { header, id, text } = faq;

  return (
    <div className="rc-accordion-card">
      <div className="rc-accordion-header">
        <div
          className={`rc-accordion-toggle p-3 ${active === id ? "active" : ""}`}
          onClick={() => handleToggle(id)}
        >
          <h5 className="rc-accordion-title">{header}</h5>
          <i className="fa fa-chevron-down rc-accordion-icon lightPink"></i>
        </div>
      </div>
      <div
        ref={contentEl}
        className={`rc-collapse ${active === id ? "show" : ""}`}
        style={
          active === id
            ? { height: contentEl.current.scrollHeight }
            : { height: "0px" }
        }
      >
        <div className="rc-accordion-body">
          <p className="mb-5" style={{ fontWeight: "300" }}>
            {text}
          </p>
        </div>
      </div>
    </div>
  );
};

const Faq = () => {
  const [active, setActive] = useState(null);
  const [showMoreRows, setShowMoreRows] = useState(5);

  const handleToggle = (index) => {
    if (active === index) {
      setActive(null);
    } else {
      setActive(index);
    }
  };

  const handleShowMoreRows = () => {
    if (showMoreRows === 5) {
      setShowMoreRows(11);
    } else {
      setShowMoreRows(5);
    }
  };

  return (
    <div className="faqContainer  mt-48 mb-48">
      <h4 className="faq-header-title coral">FAQ's</h4>
      <div style={{ width: "100%" }} className="lineCoral mb-5 mt-2"></div>

      {faqs.slice(0, showMoreRows).map((faq, index) => {
        return (
          <AccordionItem
            key={index}
            active={active}
            handleToggle={handleToggle}
            faq={faq}
          />
        );
      })}
      <button
        onClick={() => handleShowMoreRows()}
        className="lightPink mt-3 ml-3"
      >
        SHOW {showMoreRows === 5 ? "MORE" : "LESS"}
      </button>
    </div>
  );
};
export default Faq;
