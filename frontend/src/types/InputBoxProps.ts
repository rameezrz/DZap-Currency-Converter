type InputBoxProps = {
  label: "From" | "To";
  amount: number;
  type: "source" | "target";
  amountDisabled?: boolean;
  onChangeAmount?: (newAmount: number) => void;
};

export default InputBoxProps;
