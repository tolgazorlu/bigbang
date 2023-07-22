import JumbotronCard from "./JumbotronCard";

const contents = [
    {
      step: "Step 1",
      title: "Register for Bigbang!",
      detail:
        "Static websites are now used to bootstrap lots of websites and are becoming the basis for a variety of tools that even influence both web designers and developers.",
    },
    {
      step: "Step 2",
      title: "Look Bigbang Products!",
      detail:
        "Static websites are now used to bootstrap lots of websites and are becoming the basis for a variety of tools that even influence both web designers and developers.",
    },
    {
      step: "Step 3",
      title: "Enjoy Your New Space Stuffs!",
      detail:
        "Static websites are now used to bootstrap lots of websites and are becoming the basis for a variety of tools that even influence both web designers and developers.",
    },
  ];

const Jumbotron = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
      {/* <div className="px-4 mx-auto max-w-screen-xl lg:py-16">
        <JumbotronCard content={contents[0]} />
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <JumbotronCard content={contents[1]} />
          <JumbotronCard content={contents[2]} />
        </div>
      </div> */}
      <div className="px-4 mx-auto max-w-screen-xl lg:py-16">
        <JumbotronCard content={contents[0]} />
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <JumbotronCard content={contents[1]} />
          <JumbotronCard content={contents[2]} />
        </div>
      </div>
    </section>
  );
};

export default Jumbotron;
