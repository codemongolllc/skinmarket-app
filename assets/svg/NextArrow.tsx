import { useTheme } from "@/hooks/useTheme";
import Svg, { Path, SvgProps } from "react-native-svg";

function NextArrow(props: SvgProps) {
  const { colors } = useTheme();
  return (
    <Svg width={11} height={18} viewBox="0 0 11 18" fill="none" {...props}>
      <Path
        d="M2 2L9 9L2 16"
        stroke={props.color || "#484C52"}
        strokeWidth={1.5}
        strokeLinecap="square"
      />
    </Svg>
  );
}
export default NextArrow;
