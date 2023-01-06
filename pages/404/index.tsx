import {memo} from "react";
import {Container} from "components/ui";
import Link from "next/link";

type NotFoundPageProps = unknown;

const NotFoundPage: React.FC<NotFoundPageProps> = memo(() => {
  return (
    <Container className="flex items-center justify-center flex-col">
      <p className="font-bold text-[92px]">404: NOT FOUND</p>
      <Link href="/" className="text-[50px] text-blue-500">Go to main page</Link>
    </Container>
  );
});
export default NotFoundPage;
