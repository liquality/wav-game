import { useRef, useState } from "react";

const faqs = [
  {
    id: 1,
    header: "How does the game work? ",
    text: (
      <p>
        wavGAME is a fun burn-to-win on-chain experience made up of 6 levels to
        connect you closer with your favorite music artists.
        <br></br>
        <br></br>
        1. Pick your artist and check out what the levels hold for you. Get as
        many artist-specific collectibles as you want to start the game, at
        minimum 1 to get a song or 2 if you want to trade them for the next
        level. You can buy them with a credit card.
        <br></br>
        <br></br>
        2. Levels 2 and 3 will be a warm-up, and you will get rewarded once you
        trade in the first collectible. The first collectible gets you the
        prize, any additional collectible can be used to level up and claim
        additional prizes.
        <br></br>
        <br></br>
        3. Only gasless trades from Level 2 and up. In order to reach Level 2,
        you will need to buy collectibles in Level 1.
        <br></br>
        <br></br>
        5. Look out for Levels 4 and 5, as they will open at a set time, and
        only the first 20 per artist to level 4 and the first 5 per artist to
        level 5 will be rewarded. Be fast if you are eager to redeem what is
        offered.
        <br></br>
        <br></br>
        6. The first to reach Level 6 will get the main prize of a trip and
        1-on-1 concert with their favorite artist!
        <br></br>
        <br></br>
        7. Good news for all who come after: The game is not over! We will have
        an exclusive reward for all holders of an artist’s full set (holding 1
        collectible of each level at the end of the game).
        <br></br>
        <br></br>
        This means you will need 32 level 1 collectibles of an artist to reach
        their level 6, and 63 level 1 collectibles if you want to collect an
        artist’s full set. Good luck!
      </p>
    ),
  },
  {
    id: 2,
    header: "How do I redeem my prizes?",
    text: (
      <p>
        For the first 2 levels (live song and a top live song), the collectible
        itself is the reward (song + visual). For level 3-6 and the full set
        holder reward, if you collected one of the limited prizes, the wavWRLD
        will be reaching out to you within 2 weeks from the end of the wavGAME
        to coordinate redemption for your specific experience.
      </p>
    ),
  },
  {
    id: 3,
    header:
      "Some limited prizes and the main one are gone. How much longer will the game be open?",
    text: (
      <p>
        This game’s first season will end one (1) week after the main prize
        (level 6 1-on-1 trip) is claimed. You can collect Levels 4-6 even if
        rewards for those levels have been claimed, so that you can get a full
        set (holding 1 of each level 1-6 at the game’s end) and claim the full
        set reward. The full set holder reward pass will be airdropped to your
        wallet and wavWRLD will reach out once the wavGAME ends to coordinate
        reward redemption. Stay tuned for new seasons with more artists and
        prizes.
      </p>
    ),
  },
  {
    id: 4,
    header: "I can’t see my previously played games. Where are they? ",
    text: (
      <p>
        All progress is tracked under the email you originally signed in
        under—please log back in to that same account to access.
      </p>
    ),
  },
  {
    id: 5,
    header: "When does the game end?",
    text: (
      <p>
        This game’s first season will end one (1) week after the main prize is
        claimed, so that you can continue collecting even if the prize is
        claimed. You can collect Levels 4-6 even if prizes for those levels have
        been claimed, so that you can get a full set (holding 1 of each level
        1-6 at the game’s end) and claim the full set holder reward. Stay tuned
        for new seasons with more artists and prizes.
      </p>
    ),
  },
  {
    id: 6,
    header: "How do I listen to the songs I'm collecting?",
    text: (
      <p>
        You can head to an aggregator like Spinamp or Oohlala to listen. We have
        created a playlist with all the artists’ wavROOM tracks. [Link to
        playlist here]
      </p>
    ),
  },

  {
    id: 7,
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
    id: 8,
    header: "How do I send my collectible to my primary web3 wallet?",
    text: (
      <p>
        You can send your collectibles by clicking on “Send” next to your
        collectibles on the Leaderboard section of an artist’s game. You will
        need to copy your external web3 wallet’s address and paste it into the
        send form. If you claimed a Level 4-6 limited prize, that prize is yours
        and wavWRLD will contact you for redemption after the game. Sending the
        claimed collectible to someone else does not transfer ownership of the
        claimed prize.
      </p>
    ),
  },
  {
    id: 9,
    header: "Do I have control over my collectible?",
    text: (
      <p>
        Yes, the wavGAME wallet is powered by the Liquality SDK, which creates a
        self-custodial wallet using your email login and local storage as shares
        of a private key you control. You can also send your collectibles to an
        external wallet with the “Send” function in the Leaderboard section.{" "}
      </p>
    ),
  },
  {
    id: 10,
    header:
      "I love this experience and want to whitelabel the wavGAME. Who should I contact?",
    text: (
      <p>
        Reach out to us at <b>hello@wavwrld.com</b> or via Twitter{" "}
        <b>@wavWRLD_</b>
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
          <i className="fa fa-chevron-down rc-accordion-icon"></i>
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
          <p className="mb-5">{text}</p>
        </div>
      </div>
    </div>
  );
};

const Faq = () => {
  const [active, setActive] = useState(null);
  const [showMoreRows, setShowMoreRows] = useState(4);

  const handleToggle = (index) => {
    if (active === index) {
      setActive(null);
    } else {
      setActive(index);
    }
  };

  const handleShowMoreRows = () => {
    if (showMoreRows === 4) {
      setShowMoreRows(11);
    } else {
      setShowMoreRows(4);
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
        SHOW {showMoreRows === 4 ? "MORE" : "LESS"}
      </button>
    </div>
  );
};
export default Faq;
