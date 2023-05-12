import clsx from "clsx";

interface IProps {
  className?: string;
  center?: boolean;
}

const Spinner = (props: IProps) => {
  const { className, center } = props;
  return (
    <span className={clsx({ "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2": center }, className)} data-testid="spinner">
      <svg className={"animate-spin mx-2 text-gray-light h-5 w-5"} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10.5" stroke="currentColor" strokeWidth="3"></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M 12.00939,0 C 8.4596495,1.0013e-4 5.0918133,1.5706083 2.8100876,4.28987 0.05202425,7.5765599 -0.7430524,12.085017 0.72436764,16.11688 1.0005834,16.794301 2.1070563,16.906119 2.6154362,16.659203 3.1423321,16.403293 3.7071537,15.708547 3.545494,15.089793 2.4451148,12.065986 3.0414646,8.6848308 5.1099131,6.2199241 7.1782071,3.7549542 10.404398,2.5805932 13.573292,3.1391816 14.133302,3.2821131 14.938369,2.6313257 15.102112,1.9168878 15.265855,1.2024499 14.714426,0.33115442 14.09511,0.18255844 13.40651,0.06110213 12.70862,1.719e-5 12.00939,0 Z"
        ></path>
      </svg>
    </span>
  );
};

export default Spinner;
