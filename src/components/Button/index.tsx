type ButtonProps = {
  text: string;
  btnType: string;
};

export default function Button({ text, btnType }: ButtonProps) {
  return <button type={btnType}>{text}</button>;
}
