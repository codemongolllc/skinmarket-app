import { useTheme } from "@/hooks/useTheme";
import Svg, { Path, SvgProps } from "react-native-svg";

function BackArrow(props: SvgProps) {
  const { colors } = useTheme();
  return (
    <Svg {...props} width={24} height={24} fill="none">
      <Path
        fill={props.color || colors.secondary}
        d="m4 12-.707-.707-.707.707.707.707L4 12Zm15 1a1 1 0 1 0 0-2v2ZM9.293 5.293l-6 6 1.414 1.414 6-6-1.414-1.414Zm-6 7.414 6 6 1.414-1.414-6-6-1.414 1.414ZM4 13h15v-2H4v2Z"
      />
    </Svg>
  );
}

export default BackArrow;
