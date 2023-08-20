interface props {
  array: number[];
  colors: { [key: number]: string };
  sorted?: Set<number>;
  customBarHeight?: number;
}
const Bars = ({ array, colors, sorted, customBarHeight }: props) => {
  return (
    <section className="flex h-[520px] py-[20px]  items-end justify-center transition-all ease-in">
      {array.map((x, i, arr) => {
        let color = colors[x] ? colors[x] : "#a7c7e7";
        if (sorted && sorted.has(i)) {
          color = "hsl(112, 49%, 65%)";
        }
        const barHeight = customBarHeight ? customBarHeight : 100;
        return (
          <div
            key={i}
            className={`arrEl px-auto ${
              arr.length < 140 && "border"
            } text-2xl transition-height ease-in`}
            style={{
              height: `${(x / arr.length) * barHeight}%`,
              backgroundColor: color,
              borderColor: color,
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
