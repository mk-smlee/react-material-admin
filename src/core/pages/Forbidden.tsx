import Button from "@material-ui/core/Button";
import { Link as RouterLink } from "react-router-dom";
import { ReactComponent as ForbiddenSvg } from "../assets/403.svg";
import Result from "../components/Result";

const Forbidden = () => {
  return (
    <Result
      extra={
        <Button
          color="secondary"
          component={RouterLink}
          to={`/admin`}
          variant="contained"
        >
          홈으로 돌아가기
        </Button>
      }
      image={<ForbiddenSvg />}
      maxWidth="sm"
      subTitle="이 페이지를 볼 수 있는 권한이 없습니다."
      title="문제가 발생했습니다!"
    />
  );
};

export default Forbidden;
