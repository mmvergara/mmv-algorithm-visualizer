interface props {
  array: number[];
  colors: { [key: number]: string };
}
const Bars = ({ array, colors }: props) => {
  return (
    <section className="flex w-[100vw] h-[720px] py-[50px] items-end justify-center transition-all ease-in">
      {array.map((x, i, arr) => {
        return (
          <div
            key={i}
            className={`arrEl px-auto ${
              arr.length < 140 && "border"
            } text-2xl transition-height ease-in`}
            style={{
              height: `${(x / arr.length) * 100}%`,
              backgroundColor: colors[x] ? colors[x] : "#a7c7e7",
              borderColor: colors[x] ? colors[x] : "#a7c7e7",
              transitionDuration: "0.3s",
            }}
          >
            {arr.length < 25 && x}
          </div>
        );
      })}
    </section>
  );
};

export default Bars;
