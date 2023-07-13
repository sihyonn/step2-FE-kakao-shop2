import { useDispatch, useSelector } from "react-redux";
import Container from "../atoms/Conatiner";
import ProductGrid from "../organisms/ProductGrid";
import { getProducts } from "../../store/slices/productSlice"; // 강사님과 다른..?
import { Suspense, useEffect, useState, useRef } from "react";
import Loader from "../atoms/Loader";

const MainProductTemplate = () => {
  const [page, setPage] = useState(0);
  const bottomObserver = useRef(null);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  // const loading = useSelector((state) => state.product.loading);
  // const error = useSelector((state) => state.product.error);
  const isEnd = useSelector((state) => state.product.isEnd);

  const io = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isEnd) {
          setPage((page) => page + 1);
        }
      });
    },
    {
      threshold: 1,
    }
  );

  useEffect(() => {
    io.observe(bottomObserver.current);
  }, []);

  //container안 suspense fallback = {<loader />} 안 productgrid넣어주기
  // 0번페이지 데이터 로드하고 값 products에 뿌려주기
  useEffect(() => {
    dispatch(getProducts(0));
  }, [dispatch, page]);

  return (
    <Container>
      {/* 여기서 로딩과 에러 state처리를 하고싶다 */}
      <Suspense fallback={<Loader />}>
        <ProductGrid products={products} />
      </Suspense>
      <div ref={bottomObserver}></div>
    </Container>
  );
};

export default MainProductTemplate;