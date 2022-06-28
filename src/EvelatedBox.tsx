interface Props {
  childern: JSX.Element;
  title: string;
  notBorder?: boolean;
}

const ElevatedBox = ({ childern, title, notBorder = false }: Props) => {
  return (
    <div className="w-full mr-5 mt-10 mb-5">
      <div
        className={`w-full ${
          !notBorder && "border border-white"
        } text-white h-full py-8 rounded-[4rem] px-10 sm:px-20 `}
      >
        <div className="text-xl lg:text-[2vw]">{title}</div>
        <div className="mt-3 sm:ml-4">{childern}</div>
      </div>
    </div>
  );
};

export default ElevatedBox;
