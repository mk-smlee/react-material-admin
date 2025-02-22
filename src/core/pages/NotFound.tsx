import Button from "@material-ui/core/Button";
import { Link as RouterLink } from "react-router-dom";
import Result from "../../core/components/Result";
import { ReactComponent as NotFoundSvg } from "../assets/404.svg";

const NotFound = () => {
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
      image={<NotFoundSvg />}
      maxWidth="sm"
      subTitle="찾고 있는 페이지를 찾을 수 없습니다. 입력한 URL을 다시 확인해주세요."
      title="페이지를 찾을 수 없습니다."
    />
  );
};

export default NotFound;
